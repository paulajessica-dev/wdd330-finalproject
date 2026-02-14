// wish-listing.mjs
import { renderListWithTemplate } from "./utils.mjs";

export default class WishListing {
  constructor(listElement) {
    this.listElement = listElement;
    this.items = [];
  }

  init(items) {
    this.items = items;
    this.renderList(this.items);
  }

  renderList(items) {
    renderListWithTemplate(
      this.wishCardTemplate,
      this.listElement,
      items
    );
  }

  wishCardTemplate(item) {
    return `
      <li class="book-card">
        <a href="../book_details/index.html?id=${item.id}">
          <img src="${item.cover}" alt="Cover of ${item.title}">
          <h3 class="book_title">${item.title}</h3>
          <p class="book_authors">
            ${item.authors?.join(", ") ?? ""}
          </p>
        </a>
      </li>
    `;
  }
}
