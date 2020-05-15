// Write out all your steps as you plan out this page bitch let's goo


// API Call
// Get products to display from Makeup API
const getMakeupPromise = (url) => {
    // Creates new object
    return new Promise ((resolve, reject) => {
        const request = new XMLHttpRequest();

        request.open('GET', url)
        // Initializes new request as a GET and takes a url
    
        request.onload = function() {
    
            if(request.status === 200) {
                resolve(JSON.parse(request.responseText));

                // Data that comes back form a server is usually a string so we need to turn it into an JSON object we can pull info from
            } else {
    
                reject('Request failed.  Returned status of ' + xhr.status);
            }
        }

        request.send()

    })

    // Send the info to the server
}

getMakeupPromise("https://makeup-api.herokuapp.com/api/v1/products.json?product_type=eyeliner&product_category=liquid&price_greater_than=5&price_less_than=20").then((res) => {
    console.log(res)
})


// Create scroll event for button in hero
// Create hover event for cart

