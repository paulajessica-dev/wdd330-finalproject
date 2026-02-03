import {loadHeaderFooter, getParam, qs, setClick} from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();
const category = getParam('category');
const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");

const productList = new ProductList(category, dataSource, element);

productList.init();

// Search Functionality
const searchInput = qs("#search-input");
setClick("#search-input", productList.searchProductList(searchInput));


//Filter Results Functionality
//Get Buttons:
const brandNamebtnAZ = document.querySelector("#filter-brandNameBtn-AZ"); //Filter Brand name A-Z button
const brandNamebtnZA = document.querySelector("#filter-brandNameBtn-ZA"); //Filter Brand name Z-A button
const pricebtnLH = document.querySelector("#filter-priceBtn-LH"); //Filter price Lowest - Highest button
const pricebtnHL = document.querySelector("#filter-priceBtn-HL"); //Filter price Hightest - Lowest button

brandNamebtnAZ.addEventListener("click", () => {
    //Sort Brand Name from A-Z
    productList.sortList("Name");
});

brandNamebtnZA.addEventListener("click", () => {
    //Sort Brand Name from Z-A
    productList.sortList("Name", "desc");
});

pricebtnLH.addEventListener("click", () => {
    //Sort Price from Lowest - Highest
    productList.sortList("FinalPrice");
});

pricebtnHL.addEventListener("click", () => {
    //Sort Price from Highest - Lowest
    productList.sortList("FinalPrice", "desc");
});

const filterBtnList = document.querySelectorAll(".filterBtn");

filterBtnList.forEach(btn => {
    btn.addEventListener("click", () => {
        //Remove the class "clicked" in all buttons in the list:
        filterBtnList.forEach(button => button.classList.remove("clicked"));
        //and then add the class
        btn.classList.add("clicked");
    });
});