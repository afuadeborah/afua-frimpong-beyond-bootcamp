// Write out all your steps as you plan out this page bitch let's goo


// API Call
// Get products to display from Makeup API

const makeupPromise = () => {
    fetch("https://makeup-api.herokuapp.com/api/v1/products.json?product_type=eyeliner&product_category=liquid&price_greater_than=5&price_less_than=20")

    .then( (res) => {

        return res.json()
    })

    .then ((data) => {
        console.log(data)
    })

    .catch( (err) => {
        console.log("No data to display")
    })
}

makeupPromise()



// Create scroll event for button in hero
// Create hover event for cart

