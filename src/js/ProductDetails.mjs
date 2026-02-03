import { getCartCount, getLocalStorage, setLocalStorage, initCartCounter } from "./utils.mjs";

export default class productDetails{
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    
    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
        document
            .getElementById('addToCart')
            .addEventListener('click', this.addProductToCart.bind(this));
    }
    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || []; // get cart array of items from local storage if null set to empty array
        // console.log("before push:", getLocalStorage("so-cart"));
        const existsInCart = cartItems.find(item => item.Id === this.product.Id);
        if (existsInCart) {
            existsInCart.quantity += 1;
        } else {
            cartItems.push({...this.product, quantity: 1});
            
        }       
        
        setLocalStorage("so-cart", cartItems);
         initCartCounter();
        
    }
    renderProductDetails() {
        productDetailsTemplate(this.product);
    }
    

}

function productDetailsTemplate(product) {   
   
    //******************Code for Add discount to product detail pages**************/
    //*****************************************************************************/
      
    const retailP = parseFloat(product.SuggestedRetailPrice);
    const finalP = parseFloat(product.FinalPrice);
    
    const finalPriceEl = document.getElementById('productFinalPrice');

    if (finalP !== 0 && retailP > finalP) {
        //Retail Price
        const retailPriceEl = document.createElement('p');
        retailPriceEl.id = "productRetailPrice";
        retailPriceEl.className = "product-card_price";
        retailPriceEl.textContent = `Retail Price: $${retailP.toFixed(2)}`;
        retailPriceEl.style.textDecoration = "line-through";
        retailPriceEl.style.color = "#888";

        //Percent Descont
        const discountEl = document.createElement('p');
        discountEl.id = "productPerc";
        discountEl.className = "product-card_price";
        const discountPercent = Math.round(((retailP - finalP) / retailP) * 100);
        discountEl.textContent = `Discount: ${discountPercent}% OFF`;
        discountEl.style.color = "#e63946";
        
        //Insert Before Final Price
        finalPriceEl.parentNode.insertBefore(retailPriceEl, finalPriceEl);
        finalPriceEl.parentNode.insertBefore(discountEl, finalPriceEl);
        
    }

    productImage.src = product.Images.PrimaryExtraLarge;

    window.addEventListener("resize",()=>{
        const windowWidth = window.innerWidth;
        const productImage = document.getElementById('productImage'); 
            
        if (windowWidth < 600){
            productImage.src = product.Images.PrimaryMedium;
        }else if (windowWidth < 1200) {
            productImage.src = product.Images.PrimaryLarge;
        }else {
            productImage.src = product.Images.PrimaryExtraLarge;
        }
    });
    
    //*****************************************************************************/
    //*****************************************************************************/
    productImage.alt = product.NameWithoutBrand;
    document.getElementById('brand').textContent = product.Brand.Name;
    document.getElementById('name').textContent = product.NameWithoutBrand;    
    document.getElementById('productFinalPrice').textContent = "Final Price: $" + parseFloat(product.FinalPrice).toFixed(2);    
    document.getElementById('productColor').textContent = "Color: " + product.Colors[0].ColorName;
    document.getElementById('productDesc').innerHTML = "Availabillity: " + product.DescriptionHtmlSimple;
    document.getElementById('addToCart').dataset.id = product.Id;
}