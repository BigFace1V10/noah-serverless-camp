const fetch = require('node-fetch')

module.exports = async function (context, req) {
    // // request!
    // const resp1 = await fetch("https://cataas.com/cat/cute/says/Bitcamp", {   
    //     method: 'GET'   
    // });
    // const catpic1 = await resp1.arrayBuffer();
    // const resp2 = await fetch("https://cataas.com/cat/cute/says/Bitcamp", {   
    //     method: 'GET'   
    // });
    // const catpic2 = await resp2.arrayBuffer();

    // // encode!
    // base64data1 = Buffer.from(catpic1).toString('base64');
    // base64data2 = Buffer.from(catpic2).toString('base64');
    // //put what you want to turn into base64 inside "originaldata"
    // //"originaldata" will be encoded in base64.

    // alternative: change this into array
    let name1 = req.query.name1;
    let name2 = req.query.name2;
    let name3 = req.query.name3;
    let name4 = req.query.name4;

    const cat1 = await getCatPic(name1);
    const cat2 = await getCatPic(name2);
    const cat3 = await getCatPic(name3);
    const cat4 = await getCatPic(name4);

    context.res = {
        // need to put brackets to return the data in json format
        body: {
            cat1: cat1,
            cat2: cat2,
            cat3: cat3,
            cat4: cat4
        }
    };
}

async function getCatPic(name) {
    const resp = await fetch("https://cataas.com/cat/says/" + name, {
        method: "GET"
    });
    
    // we need to receive it as a buffer since this is an image we are receiving from the API
    // Buffer?? https://developer.mozilla.org/en-US/docs/Web/API/Blob
    const catpic = await resp.arrayBuffer();

    // encode! put what you want to turn into base64 inside "originaldata"
    // "originaldata" will be encoded in base64.
    base64data = Buffer.from(catpic).toString('base64');
    return base64data;
}

// We don't need random name anymore!
// function getName() {
//     let names = ["Shreya", "Emily", "Fifi", "Beau", "Evelyn", "Julia", "Daniel", "Fardeen"];
//     let random_value = Math.floor(names.length * Math.random());
//     let resultname = names[random_value];

//     return resultname;
// }