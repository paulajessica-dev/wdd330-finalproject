import { getParam, getCartCount, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ExternalServices.mjs";
import productDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const dataSource = new ProductData();
const productId = getParam("product");

console.log("Product ID:", productId);

const product = new productDetails(productId, dataSource);
product.init();


// add to cart button event handler

//following commented out because it was competing with the product.init()--JM

// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   console.log(product)
//   addProductToCart(product);
// }

// // add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
