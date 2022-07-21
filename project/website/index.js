const travelForm = document.getElementById('travelForm');

travelForm.addEventListener('submit', async function (event) {
    event.preventDefault()
    const location = document.getElementById("location").value
    const category = document.getElementById("category").value
    const quantity = document.getElementById("quantity").value

    try {
        const endpoint = "https://noah-serverless-project.azurewebsites.net/api/googleplaces?code=Gx8MkLrov3FC0UoIIdv3zUc_hIB37epvR6zHUzHseGUXAzFutk99JA==";
        const options = {
            method: "GET",
            headers: {
                'place': location,
                'category': category,
                'quantity': quantity
            }
        };
        const resp = await fetch(endpoint, options);
        const data = await resp.json();
        console.log(data);

        const output = document.getElementById("output");
        output.innerHTML = JSON.stringify(data);

    } catch(err) {
        console.log(err);
    }


    
    
    
    // console.log(location);
    // console.log(category);
    // console.log(quantity);
})