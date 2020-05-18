// Write out all your steps as you plan out this page bitch let's goo


// API Call: Get products to display from Makeup API
const makeupPromise = () => {

    fetch("https://makeup-api.herokuapp.com/api/v1/products.json?product_type=eyeliner&product_category=liquid&price_greater_than=5&price_less_than=20")

    .then( (res) => {
        return res.json()
        // Convert returned information into json
    })

    .then ((data) => {
        // Function manipulating data gets called here
        
        getMakeup(data)

    })

    // Error handling
    .catch( (err) => {
        console.log("No data to display")
    })
}

    makeupPromise()




// Pull necessary information from API
const getMakeup = (data) => {
   
    let makeupArr = []
    
    data.map((item) => {
        
        const makeup = {
            "name": item.name,
            "price": item.price,
            "brand": item.brand,
            "imgUrl": item.image_link,

        }
        
        
        return makeupArr.push(makeup)
        
    })
    
    console.log(makeupArr)

    makeupArr.forEach((item) => {

        // Use let to reassign the value of the text and content 
        const store = document.getElementById("store-container")
        let product = document.createElement('li')

        // Build HTML
        product.innerHTML = `

            <div class="image-container">

                <img src="${item.imgUrl}" alt="${item.name}">

            </div>

            <div class="product-text">
                <h3>
                    <a>${item.name}</a>
                </h3>
                <p class="product-price">${item.price}</p>
                <p class="product-brand">${item.brand}</p>
            </div>
        `

        store.appendChild(product)
        

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