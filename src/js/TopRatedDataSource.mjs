import { getBookRating } from "./utils.mjs";

export default class TopRatedDataSource {
  constructor(books) {
    this.books = books;
  }

  async searchByGenre(genre) {
    console.log("TopRatedDataSource called with:", genre);
    console.log("Books inside adapter:", this.books);
    return this.books;
  }

}


