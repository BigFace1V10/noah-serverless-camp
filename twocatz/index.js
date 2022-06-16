const fetch = require('node-fetch')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // request!
    const resp1 = await fetch("https://cataas.com/cat/cute/says/Bitcamp", {   
        method: 'GET'   
    });
    const catpic1 = await resp1.arrayBuffer();
    const resp2 = await fetch("https://cataas.com/cat/cute/says/Bitcamp", {   
        method: 'GET'   
    });
    const catpic2 = await resp2.arrayBuffer();
    // we need to receive it as a buffer since this is an image we are receiving from the API
    // Buffer?? https://developer.mozilla.org/en-US/docs/Web/API/Blob

    // encode!
    base64data1 = Buffer.from(catpic1).toString('base64');
    base64data2 = Buffer.from(catpic2).toString('base64');
    //put what you want to turn into base64 inside "originaldata"
    //"originaldata" will be encoded in base64.

    let name1 = getName();
    let name2 = getName();

    context.res = {
        // need to put brackets to return the data in json format
        body: {
            cat1: base64data1,
            cat2: base64data2,
            names: [name1, name2]
        }
    };
}

function getName() {
    let names = ["Shreya", "Emily", "Fifi", "Beau", "Evelyn", "Julia", "Daniel", "Fardeen"];
    let random_value = Math.floor(names.length * Math.random());
    let resultname = names[random_value];

    return resultname;
}