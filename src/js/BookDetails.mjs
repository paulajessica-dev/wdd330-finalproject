// BookDetails.mjs
import { qs, getLocalStorage, setLocalStorage, initWishCounter, saveRating, getBookRating } from "./utils.mjs";

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
    this.initRatingStars();
    console.log("BOOK DATA:", this.book);
    console.log("DOWNLOAD URL:", this.book?.downloadUrl);

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
      authors: this.book.authors,
      downloadUrl: this.book.downloadUrl || ""
    });

    setLocalStorage("so-wish", wish);
  }

  renderBookDetails() {
    bookDetailsTemplate(this.book);
  }

  highlightStars(rating) {
      const stars = document.querySelectorAll(".star");

      stars.forEach(star => {
      const value = Number(star.dataset.value);
      const isActive = value <= rating;

      star.classList.toggle("active", isActive);
      star.textContent = isActive ? "★" : "☆";
    });
  }

  initRatingStars() {
    const stars = document.querySelectorAll(".star");
    const info = document.getElementById("rating-info");

    if (!stars.length) return;

    stars.forEach(star => {
      star.addEventListener("click", () => {
        const value = Number(star.dataset.value);

        saveRating(this.book.id, value);
        this.highlightStars(value);

        const rating = getBookRating(this.book.id);
        info.textContent = `Average: ${rating.average.toFixed(1)} (${rating.count} votes)`;
      });
    });

    const existing = getBookRating(this.book.id);
    if (existing) {
        info.textContent = `Average: ${existing.average.toFixed(1)} (${existing.count} votes)`;
        this.highlightStars(Math.round(existing.average));
      }
    }

};

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

};
