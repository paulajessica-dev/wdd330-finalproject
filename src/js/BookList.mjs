import { renderListWithTemplate, getBookRating } from "./utils.mjs";


export default class BookList {
  constructor(genre, dataSource, listElement) {
    this.genre = genre;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.books = [];
  }

  async init() {
    //console.log("DataSource inside BookList:", this.dataSource);
    

    this.books = await this.dataSource.searchByGenre(this.genre);
    this.updatePageTitle();
    this.renderList(this.books);
    this.addLookupHandler();
    this.initWishlistButtons();
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
    const rating = getBookRating(book.id);
    return `
      <li class="book-card">
        <a href="../book_details/index.html?id=${book.id}">
          <img src="${book.cover}" alt="Cover of ${book.title}" loading="lazy">
          <h3 class="book_title">${book.title}</h3>
          <p class="book_authors">${book.authors.join(", ")}</p>
          <p class="book-genre">${book.genre?.split("--")[0]}</p>   
          ${
            book.publishYear
              ? `<p class="book_year">${book.publishYear}</p>`
              : ""
          }
          ${
          rating
            ? `<p class="book-rating">
                 ⭐ ${rating.average.toFixed(1)}                 
               </p>`
            : ""
          }
          ${
          book.downloadCount
            ? `<p class="book-downloads">
                📈 ${book.downloadCount.toLocaleString()} downloads
              </p>`
            : ""
          }

        </a>
        <a class="btn" href="/book_details/index.html?id=${book.id}"> see details</a>        
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

  initWishlistButtons() {
  const buttons = this.listElement.querySelectorAll(".add-to-wishlist");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;

      let wish = JSON.parse(localStorage.getItem("so-wish")) || [];

      const exists = wish.some(item => item.id === id);
      if (exists) return;

      const book = this.books.find(b => b.id === id);
      if (!book) return;

      wish.push({
        id: book.id,
        title: book.title,
        cover: book.cover,
        authors: book.authors
      });

      localStorage.setItem("so-wish", JSON.stringify(wish));

      btn.textContent = "✓ Added";
      btn.disabled = true;
    });
  });
}

}
