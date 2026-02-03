import { loadHeaderFooter, qs, renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    const title = document.querySelector("h2");
    title.innerHTML = `Top Products: <span class="title">${product.Category}</span>`;
    return `
    <li class="product-card">
        <a href="../product_pages/?product=${product.Id}">
            <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
            <h2 class="card_brand>${product.Brand.Name}</h2>
            <h3 class= "card_name>${product.Name}</h3>
            <p class="product-card_price">$${product.FinalPrice}</p>
                
        </a>
    </li>
    `;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.products = []; //store products here for sorting
    }
    async init() {
        this.products = await this.dataSource.getData(this.category);
        this.renderList(this.products);
        const formatCategory = this.category.replace(/-/g, " ")
        document.querySelector(".title").textContent = formatCategory;
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }

    sortList(sortRule, order = "asc") {
        this.listElement.innerHTML = ""; //clear HTML contents
        const sortedProducts = this.products.map(item => item); //copy the array
        
        //custom sorting:
        sortedProducts.sort((prodA, prodB) => {
            //store values according to what key in the JSON file (sortRule variable)
            let valueProdA = prodA[sortRule]; 
            let valueProdB = prodB[sortRule];
            let comparison = 0; //comparison value

            //If comparing a string:
            if (typeof valueProdA === "string") {
                let stringProdA = valueProdA.toLowerCase();
                let stringProdB = valueProdB.toLowerCase();

                if (stringProdA < stringProdB) {
                    // stringProdA moves to the left or goes first on the list
                    comparison = -1;
                }
                else if (stringProdA > stringProdB) {
                    // stringProdA moves to the right or goes after stringProdB on the list
                    comparison = 1;
                } else {
                    // both strings are the same, keep their spot in the list
                    comparison = 0;
                }
            }
            //If comparing numbers:
            else{
                comparison = valueProdA - valueProdB; //subtract the numbers
            }

            //Check the order condition:
            if (order === "desc") {
                return comparison * -1; // list in descending order
            }

            return comparison; //list in ascending order
        });

        //render the sorted list on the list.element
        this.renderList(sortedProducts);
    }
    
    searchProductList(inputObject) {
        let filteredProducts = [];
        inputObject.addEventListener("keypress", (e) => {
            this.listElement.innerHTML = "";
            if (e.key === "Enter") {
                e.preventDefault();
            }
            let query = e.target.value.toLowerCase();
            filteredProducts = this.products.filter(prod => prod.Name.toLowerCase().includes(query));
            
            this.renderList(filteredProducts);
        })
    }
}