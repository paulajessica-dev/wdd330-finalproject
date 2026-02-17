import ExternalServices from "./ExternalServices.mjs";
import BookList from "./BookList.mjs";
import TrendingDataSource from "./TrendingDataSource.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const apiService = new ExternalServices();
const listElement = document.querySelector(".book-list");

async function init() {
  const books = await apiService.getTrendingBooks(12);

  const dataSource = new TrendingDataSource(books);
  const bookList = new BookList("Trending", dataSource, listElement);

  await bookList.init();
}

init();
