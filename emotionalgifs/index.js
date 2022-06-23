const multipart = require('parse-multipart');
const fetch = require('node-fetch');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const boundary = multipart.getBoundary(req.headers['content-type']);
    const body = req.body; // req.body, not req.query.body, query is like the parameters
    const parts = multipart.Parse(body, boundary);
    const result = await analyzeImage(parts[0].data);
    let emotions = result[0].faceAttributes.emotion;

    // find the dominant emotion
    // context.log(emotions);
    let objects = Object.values(emotions);
    const main_emotion = Object.keys(emotions).find(key => emotions[key] === Math.max(...objects));
    // get a gif link from giphy api
    let gifLink = await findGifs(main_emotion);

    context.res = {
        body: gifLink
    };
    console.log(result)
    context.done(); 
}

// async function run in the background
async function findGifs(emotion){
    const apikey = process.env.GIFKEY; // or process.env['the secret name']
    const apiResult = await fetch ("https://api.giphy.com/v1/gifs/translate?api_key=" + apikey + "&limit=1&s=" + emotion); // limit to one gif
    // convert apiResult into JSON format
    const jsonResult = await apiResult.json(); // this includes all the info
    return jsonResult.data.url; // return the url info inside json
}

async function analyzeImage(img){
    const subscriptionKey = process.env.SUBSCRIPTIONKEY;
    const uriBase = process.env.ENDPOINT + '/face/v1.0/detect';

    // specify the parameters for the URL request
    let params = new URLSearchParams({
        'returnFaceId': 'true',
        'returnFaceAttributes': 'emotion'
    })

    // await will wait for the data to come back
    let resp = await fetch(uriBase + '?' + params.toString(), {
        method: 'POST', 
        body: img,  // binary file for image
        headers: {
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': subscriptionKey
        }
    })
    let data = await resp.json();

    return data;
}