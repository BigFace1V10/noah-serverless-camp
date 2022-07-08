const bunnForm = document.getElementById('bunnForm');

bunnForm.addEventListener('submit', async function (event) {
    event.preventDefault() // prevent reloading
    const username = document.getElementById("username").value
    if (username == "") {
        alert("No name error.")
        return
    }

    try {
        // extract the file
        let fileInput = document.getElementById("image");
        const file = fileInput.files[0]; // fileInput is the file upload input element
        var payload = new FormData();
        payload.append("file", file);
        // payload.append("key1", "value1")
        for (const value of payload.values())
            console.log(value)
        // fetch call
        const endpoint = "https://serverlesscamp2022.azurewebsites.net/api/bunnimage-upload?code=G38z0lFB_-_BLjFizn4AwzUcBBVwTJdGqtqMI4N2WnnYAzFuOUftzQ=="
        const options = {
            method: "POST",
            body: payload,
            headers: {
                "codename": username,
                "Content-Type": "multipart/form-data"
            }
        };
        const resp = await fetch(endpoint, options);
        const data = await resp.text();
        console.log(data)
    } catch(err) {
        console.log(err)
        alert("Something's wrong")
    }
    
    // console.log(data)
    // const output = document.getElementById("output")
    output.textContent = "Your image has been stored successfully!"

}); // listen to event type called "submit"; get value of text box


// bunnForm.addEventListener('change', function (event) {
//     const username = document.getElementById("username").value
//     const filename = username.split(/(\\|\/)/g).pop()
//     var re = /(\.jpg|\.jpeg|\.bmp|\.gif|\.png)$/i;
//     if (!re.exec(filename)) {
//         alert("File extension not supported!");
//     }
// });