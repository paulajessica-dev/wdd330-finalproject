import { loadHeaderFooter } from "./utils.mjs";
import CartList from "./ShoppingCart.mjs";



const element = document.querySelector("#cart-list");
const cartList = new CartList(element);


cartList.init();
loadHeaderFooter();