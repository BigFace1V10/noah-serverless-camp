const findButton = document.getElementById('button1');
const petEndpoint = "https://cataas.com/cat/says/"

findButton.addEventListener('click', async function y1k3s(event) {
    console.log("bello")
    // event.preventDefault() // prevent reloading
    var petName = document.getElementById("petName").value
    // document.getElementById("image").src = petEndpoint + petName
    // Use time stamp to refresh every time we click on the button
    var timestamp = (new Date()).getTime()
    var newUrl = petEndpoint + petName + '?_=' + timestamp;
    document.getElementById("image").src = newUrl
})