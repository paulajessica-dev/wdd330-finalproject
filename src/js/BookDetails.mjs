// BookDetails.mjs
import { qs, getLocalStorage, setLocalStorage, initWishCounter } from "./utils.mjs";

export default class BookDetails {
  constructor(bookId, dataSource) {
    this.bookId = bookId;
    this.book = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.book = await this.dataSource.getBookById(this.bookId);
    this.renderBookDetails();
    this.addWishlistHandler();
  }

  addWishlistHandler() {
    const button = document.querySelector(".wishlist-btn");

    if (!button) return;
    button.addEventListener("click", () => {      
      console.log("Add to wishlist:", this.book);

    //   let wish = getLocalStorage("so-wish");
    //   console.log("FROM STORAGE:", wish);
    //   if (!wish) wish = [];
    //   wish.push({
    //     id: this.book.id,
    //     title: this.book.title
    //   });
    //   setLocalStorage("so-wish", wish);
    //   console.log("AFTER SAVE:", getLocalStorage("so-wish"));
    // });
        this.addToWishlist();
        initWishCounter();
      });
    
  }

    addToWishlist() {
    const wish = getLocalStorage("so-wish") || [];

    const exists = wish.find(item => item.id === this.book.id);
    if (exists) return;

    wish.push({
      id: this.book.id,
      title: this.book.title,
      cover: this.book.cover,
      authors: this.book.authors
    });

    setLocalStorage("so-wish", wish);
  }

  renderBookDetails() {
    bookDetailsTemplate(this.book);
  }
}

function bookDetailsTemplate(book) {

  const coverImg = qs(".book-cover");
  coverImg.src = book.cover;
  coverImg.alt = book.title;

  qs(".book-title").textContent = book.title;
  qs(".book-authors").textContent = book.authors.join(", ");
  qs(".book-genre").textContent = `Genre: ${book.genre}`;

  if (book.publishYear) {
    qs(".book-year").textContent = `Published: ${book.publishYear}`;
  }

  if (book.description) {
    qs(".book-description").innerHTML = book.description;
  } else {
    qs(".book-description").textContent = "Description not available.";
  }
}
