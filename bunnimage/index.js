const bunnForm = document.getElementById('bunnForm');

bunnForm.addEventListener('submit', function (event) {
    event.preventDefault() // prevent reloading
    const username = document.getElementById("username").value
    if (username == "") {
        alert("No name error.")
    }
    const output = document.getElementById("output")
    output.textContent = "Thanks!"
  }); // listen to event type called "submit"; get value of text box


// bunnForm.addEventListener('change', function (event) {
//     const username = document.getElementById("username").value
//     const filename = username.split(/(\\|\/)/g).pop()
//     var re = /(\.jpg|\.jpeg|\.bmp|\.gif|\.png)$/i;
//     if (!re.exec(filename)) {
//         alert("File extension not supported!");
//     }
// });