const findButton = document.getElementById('button1');
const petEndpoint = "https://serverlesscamp2022.azurewebsites.net/api/twocatz?code=aDoDZpvJAfGYAw4GLxdSOXOAMTPuzE11cXjPkoWjBGitAzFu_sZxRg=="
// "https://cataas.com/cat/says/"

findButton.addEventListener('click', async function y1k3s(event) {
    console.log("bello")
    // event.preventDefault() // prevent reloading
    name1 = document.getElementById("name1").value
    name2 = document.getElementById("name2").value
    name3 = document.getElementById("name3").value
    name4 = document.getElementById("name4").value
    
    // get fetch url with string interpolation
    const fetch_url = `${petEndpoint}&name1=${name1}&name2=${name2}&name3=${name3}&name4=${name4}`

    let resp = await fetch(fetch_url,{
        method: 'GET'
    })
    let data = await resp.json();

    // transform base64 data back to image
    setSourceFromBase64("image1", data.cat1);
    setSourceFromBase64("image2", data.cat2);
    setSourceFromBase64("image3", data.cat3);
    setSourceFromBase64("image4", data.cat4);

    // Use time stamp to refresh every time we click on the button
    // var timestamp = (new Date()).getTime()
    // var newUrl = petEndpoint + petName + '?_=' + timestamp;
    // document.getElementById("image").src = newUrl
})

// making code easier to understand
function setSourceFromBase64(id, base64) {
    document.getElementById(id).src = "data:image/png;base64," + base64;
}