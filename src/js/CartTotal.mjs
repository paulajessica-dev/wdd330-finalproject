import { getLocalStorage, getCartCount} from "./utils.mjs";

const divTotal = document.querySelector(".cart-footer");
const displayTotal = document.querySelector(".cart-total");

//Total in Cart Feature
function GetCartTotal() {
    const cartItems = getLocalStorage("so-cart");
    let total = 0.0;

    cartItems.forEach(item => {
        total += parseFloat(item.FinalPrice * item.quantity);
    });

    return total;
}

//Check if cart is empty
if (getCartCount() === 0) {
    divTotal.classList.toggle("hide");
}
else {
    let subTotal = GetCartTotal();
    divTotal.classList.toggle("cart-footer");
    displayTotal.textContent += `$${subTotal.toFixed(2)}`;
}