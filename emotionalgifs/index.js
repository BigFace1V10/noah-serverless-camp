const multipart = require('parse-multipart');
const fetch = require('node-fetch');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const boundary = multipart.getBoundary(req.headers['content-type']);
    const body = req.body; // req.body, not req.query.body, query is like the parameters
    const parts = multipart.Parse(body, boundary);
    const result = await analyzeImage(parts[0].data);
    context.res = {
        body: {
            result
        }
    };
    console.log(result)
    context.done(); 
}

// async function run in the background
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