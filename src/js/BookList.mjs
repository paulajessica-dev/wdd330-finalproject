import { renderListWithTemplate } from "./utils.mjs";


export default class BookList {
  constructor(genre, dataSource, listElement) {
    this.genre = genre;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.books = [];
  }

  async init() {
    console.log("DataSource inside BookList:", this.dataSource);

    this.books = await this.dataSource.searchByGenre(this.genre);
    this.updatePageTitle();
    this.renderList(this.books);
    this.addLookupHandler();
  }

  updatePageTitle() {
    const titleElement = document.querySelector(".page-title");
    if (!titleElement) return;

    const formattedGenre = this.genre.charAt(0).toUpperCase() + this.genre.slice(1);

    titleElement.textContent = `${formattedGenre} Books`;
  }

  renderList(books) {
    renderListWithTemplate(this.bookCardTemplate, this.listElement, books);
  }

  bookCardTemplate(book) {
    return `
      <li class="book-card">
        <a href="../book_details/index.html?id=${book.id}">
          <img 
            src="${book.cover}" 
            alt="Cover of ${book.title}" 
            loading="lazy"
          >
          <h3 class="book_title">${book.title}</h3>
          <p class="book_authors">
            ${book.authors.join(", ")}
          </p>
          <p class="book_genre">${book.genre}</p>
          ${
            book.publishYear
              ? `<p class="book_year">${book.publishYear}</p>`
              : ""
          }
        </a>

        <button 
          class="lookup" 
          data-id="${book.id}"
          aria-label="Quick book lookup"
        >
          Quick lookup
        </button>
      </li>
    `;
  }

  addLookupHandler() {
    this.listElement.addEventListener("click", (e) => {
      const button = e.target.closest(".lookup");
      if (!button) return;

      const bookId = button.dataset.id;
      console.log("Lookup book:", bookId);
    });
  }
}
