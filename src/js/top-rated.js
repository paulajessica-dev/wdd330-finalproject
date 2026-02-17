import ExternalServices from "./ExternalServices.mjs";
import BookList from "./BookList.mjs";
import { getTopRatedBooks } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import TopRatedDataSource from "./TopRatedDataSource.mjs";

loadHeaderFooter();
//console.log("TOP RATED:", getTopRatedBooks(5));

const apiService  = new ExternalServices();
const listElement = document.querySelector(".book-list");

async function init() {
  const topRated = getTopRatedBooks(12); // id,  average,  count

  if (!topRated.length) {
    listElement.innerHTML = "<p>No rated books yet.</p>";
    return;
  }

  const ids = topRated.map(b => b.id);
  const books = await apiService.getBooksByIds(ids); // cover, title, authors, description

  const dataSource = new TopRatedDataSource(books);
  const bookList = new BookList("top rated", dataSource, listElement);
  await bookList.init();
}

init();
