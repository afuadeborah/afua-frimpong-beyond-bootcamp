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
        // return data


        // data.forEach((item) => {

        //     const makeup = item.name
        //     console.log(makeup)
        // })
        // Function manipulating data gets called here
        
        getMakeup(data)


    })

    .catch( (err) => {
        console.log("No data to display")
    })
}

makeupPromise()

const getMakeup = (data) => {

    data.forEach((item) => {

        const makeup = item.name
        console.log(makeup)
    })
}







// Create scroll event for button in hero
// Create hover event for cart

// <div class="image-container">

// <img src="${item.image_link}" alt="${item.name}">

// </div>

// <div class="product-text">
// <h3>
//     <a href="${item.name}"></a>
// </h3>
// <p class="product-price">${item.price}</p>
// <p class="product-brand">${item.brand}</p>
// </div>