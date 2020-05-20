// Write out all your steps as you plan out this page bitch let's goo
// Remember to remove console.logs at the end


// API Call: Get products to display from Makeup API
    const makeupApi = () => {

        fetch("https://makeup-api.herokuapp.com/api/v1/products.json?product_type=eyeliner&product_category=liquid&price_greater_than=5&price_less_than=20")

        .then( (res) => {
            return res.json()
            // Convert returned information into json
            
        })

        .then ((data) => {
            // Function manipulating data gets called here
            
            getMakeup(data)
            console.log(data)

        })

        // Error handling
        .catch( (err) => {
            console.log("No data to display")
        })
    }

    makeupApi()



// Pull off necessary information from API
    const getMakeup = (data) => {
    
        let makeupArr = []
        
        data.map((item) => {

            // Not all the prices have 2 decimal points so we 
            let decimalPrice = parseInt(item.price).toFixed(2)
            
            const makeup = {
                "name": item.name,
                "price": decimalPrice,
                "brand": item.brand,
                "imgUrl": item.image_link,
                "id": item.id
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

                    <label for="${item.id}" class="add-to-cart" tabindex="0">Add to cart</label>

                    <input type="checkbox" id="${item.id}" class="checkbox"></input>
                </div>
            `
            // Append store products to page
            store.appendChild(product)
            
        })
        
    }

// Smooth scroll 
    scrollTo = (element) => {
        window.scroll({
        behavior: 'smooth',
        duration: 'slow',
        left: 0,
        top: element.offsetTop
        });
        
    }


// Smooth scroll to store section
    const shopNow = document.getElementById("shop-btn")
    const shopLi = document.getElementById("shop")

    shopNow.addEventListener("click", (e) => {
        e.preventDefault()
        scrollTo(document.getElementById("store"))
    })

    shopLi.addEventListener("click", () => {

        scrollTo(document.getElementById("store"))
    })


// Since the products are added dynamically we need to use event delegation to target those elements
const checkboxDelegate = document.getElementById("store-container")

// Events will be delegated to the ul "store-container"
checkboxDelegate.addEventListener("click", (e) => {
    // console.log(e.target)

    // Make sure the target element is the one that triggers the function
    if((e.target.nodeName == "INPUT") && e.target.checked) {
        console.log("added to cart")

        

    } else if (e.target.checked === false) {
        console.log("removed from cart")
    }
})

