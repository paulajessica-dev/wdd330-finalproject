export default class TrendingDataSource {
  constructor(books) {
    this.books = books;
  }

  async searchByGenre() {
    return this.books;
  }
}
