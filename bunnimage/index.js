const bunnForm = document.getElementById('bunnForm');

bunnForm.addEventListener('submit', function (event) {
    event.preventDefault() // prevent reloading
    const username = document.getElementById("username").value
    const output = document.getElementById("output")
    output.textContent = username + "❤"
  }); // listen to event type called "submit"; get value of text box