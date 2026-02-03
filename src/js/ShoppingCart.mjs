import { getLocalStorage, renderListWithTemplate, setLocalStorage, initCartCounter, updateCartFooter } from "./utils.mjs";

    


function cartCardTemplate(product) {

    return `
        <li class="cart-card divider" data-id=${product.Id}>
            <a href="/product_pages/?product=${product.Id}" class="cart-card__image">
              <img
                src="${product.Images.PrimarySmall}"
                alt="${product.Name}"
              />
            </a>
            <a href="/product_pages/?product=${product.Id}">
              <h2 class="card__name">${product.Name}</h2>
            </a>
            <p class="cart-card__color">${product.Colors[0].ColorName}</p>
            <section class = "cart-card__quantity">
                <button class="add">+</button>
                <span class= "quantity"> ${product.quantity ?? 1}</span>
                <button class = "subtract">-</button>
                </section>
            <p class="cart-card__price">$${((product.FinalPrice) * (product.quantity ?? 1)).toFixed(2)}</p>
            <button class="remove">X</button>
        </li>
    `;
}



export default class CartList {
    constructor(listElement, totalElement) {
       
        this.listElement = listElement;
        this.totalElement = totalElement;
    }
    async init() {
        const list = getLocalStorage("so-cart") || [];
        this.renderList(list);
        updateCartFooter();
    }
    
    
    renderList(list) {
        this.listElement.innerHTML = "";
        renderListWithTemplate(cartCardTemplate, this.listElement, list);

        this.listElement.querySelectorAll(".cart-card").forEach(card => {
            const id = card.dataset.id;

            card.querySelector(".add").addEventListener("click", () => this.changeQuantity(id, 1));
            card.querySelector(".subtract").addEventListener("click", () => this.changeQuantity(id, -1));
            card.querySelector(".remove").addEventListener("click", () => this.removeItem(id));

            
        });
    }

    changeQuantity(productId, delta) {
    const cartItems = getLocalStorage("so-cart") || [];
    const item = cartItems.find(i => i.Id === productId);
        if (!item) return;

        item.quantity += delta;

        if (item.quantity < 1) {
            this.removeItem(productId);
            return;
        }
        
    setLocalStorage("so-cart", cartItems);
        this.renderList(cartItems);
        initCartCounter();
        updateCartFooter();
    }
    
    removeItem(productID) {
        let cartItems = getLocalStorage("so-cart") || [];
        cartItems = cartItems.filter(item => item.Id !== productID);
        setLocalStorage("so-cart", cartItems);
        this.renderList(cartItems);
        initCartCounter();
        updateCartFooter();
    }

    updateTotal(list) {
        if (!this.totalElement) return;

        const total = list.reduce(
            (sum, item) => sum + (item.FinalPrice * (item.quantity ?? 1))
        
        ); 
        this.totalElement.textContent = `$${total.toFixed(2)}`;
        return total
    }

}