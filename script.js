// Global Variables
const makeupApp = {}

    makeupApp.makeupArr = []

    makeupApp.cart = []

    makeupApp.price = []

// Elements
    makeupApp.overlay = document.getElementById("cart-overlay")

    makeupApp.cartIcon =  document.getElementById("cart")
    
    makeupApp.cartBtn = document.getElementById("view-cart")

    makeupApp.closeBtn = document.getElementById("close-cart")




// API Call: Get products to display from Makeup API
    makeupApp.makeupPromise = () => {

        fetch("https://makeup-api.herokuapp.com/api/v1/products.json?product_type=eyeliner&product_category=liquid&price_greater_than=5&price_less_than=20")

        .then( (res) => {
            return res.json()
            // Convert returned information into json
            
        })

        .then ((data) => {
            // Function manipulating data gets called here
            
            makeupApp.getMakeup(data)
            
        })

        // Error handling
        .catch( (err) => {
            console.log("No data to display")
        })
    }

    makeupApp.makeupPromise()



// Pull off necessary information from API
    makeupApp.getMakeup = (data) => {
     
        data.map((item) => {

            // Not all the prices have 2 decimal points so we 
            let decimalPrice = parseFloat(item.price)
            
            const makeup = {
                "name": item.name,
                "price": decimalPrice,
                "brand": item.brand,
                "imgUrl": item.image_link,
                "id": item.id
            }
    
            return makeupApp.makeupArr.push(makeup)
            
        })
               
        makeupApp.displayMakeup(makeupApp.makeupArr)

        makeupApp.addToCart()
    
    }



// Put the products on the page
    makeupApp.displayMakeup = (array) => {

        array.forEach((item) => {

            // Use let to reassign the value of the text and content 
            const store = document.getElementById("store-container")
            let product = document.createElement('li')
            
            const price = item.price.toFixed(2)

            // Build HTML
            product.innerHTML = `

                <div class="image-container">
                    <img src="${item.imgUrl}" alt="${item.name}">
                </div>

                <div class="product-text">
                    <h3>
                        <a>${item.name}</a>
                    </h3>

                    <p class="product-price">${price}</p>

                    <p class="product-brand">${item.brand}</p>

                    <label for="${item.id}" class="add-to-cart" tabindex="0">Add to cart</label>

                    <input type="checkbox" id="${item.id}" class="checkbox"></input>
                </div>
            `
            // Append store products to page
            store.appendChild(product)
            
        })
    }




// Add to Cart
    makeupApp.addToCart = (e) => {
        // Since the products are added dynamically we need to use event delegation to target those elements
        
        let checkboxDelegate = document.getElementById("store-container")

        // Events will be delegated to the ul "store-container"
        checkboxDelegate.addEventListener("click", (e) => {
         
            const targetId = e.target.id
            
            // Make sure the target element is the one that triggers the function
            if (e.target.nodeName === "INPUT" && e.target.checked) {
                
                e.stopPropagation();
                
                
                // Push item name and price into cart
                makeupApp.makeupArr.forEach((name)=>{

                    if (targetId == name.id){

                        makeupApp.cartPush(name.name, name.price)
 
                    }
                })
                
                
            } else if (e.target.checked === false) {
                e.stopPropagation();

                // Remove item name and price from cart
                makeupApp.makeupArr.forEach((name)=>{
                    
                    if (targetId == name.id){
                        
                        makeupApp.removeItem(name.name, name.price)
                    }
                })
                
            }
   
        })
    }



// Push products to cart
    makeupApp.cartPush = (item, price) => {

        makeupApp.cart.push(item)
        makeupApp.price.push(price)

        // Push items to cart panel
        makeupApp.showInCart(item, price)
 
        // Add price to total
        makeupApp.totalPrice(price)
          
    }

    // Display Added Items to Cart
    makeupApp.showInCart = (item, price) => {
        // Use let to reassign the value of the text and content
        const slideCart = document.getElementById("cart-list")
        let addedItem = document.createElement("li")

        const cartPrice = price.toFixed(2)

        // Build HTML
        addedItem.innerHTML = `
 
            <div class="cart-price">
                <h4>${item}</h4>
                <span>${cartPrice}</span>
            </div>

        `
        
        slideCart.appendChild(addedItem)

    }




// Remove from cart
    makeupApp.removeItem = (item, price) => {

        makeupApp.cart.shift(item)
        makeupApp.price.shift(price)

        makeupApp.subtractPrice(price)

    }



// Tally total of cart
    makeupApp.totalPrice = () => {

        // When each item is added to the cart, add up the total cost of the cart
        return makeupApp.price.reduce((acc, currentPrice) => {
            
            return  acc + currentPrice

        }, 0)


    }



// Subtract items removed from cart
    makeupApp.subtractPrice = () => {

        // When each item is removed from the cart, add up the total cost of the cart
        return makeupApp.price.reduce((acc, currentPrice) => {

            // Multiply by -1 to prevent a negative price when subtracting prices from cart
            return ((acc - currentPrice) * -1)

        }, 0)

    }
   
    

// Smooth scroll 
    makeupApp.scrollTo = (element) => {
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




// Open Cart
    makeupApp.openCart = () => {
        
        makeupApp.cartIcon.classList.toggle("cart-open")
        makeupApp.overlay.classList.toggle("overlay-open")

    }

makeupApp.cartBtn.addEventListener('click', makeupApp.openCart)

makeupApp.closeBtn.addEventListener('click', makeupApp.openCart)
    

