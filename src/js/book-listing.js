import {loadHeaderFooter, getParam} from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import BookList from "./BookList.mjs";

loadHeaderFooter();
const genre = getParam("genre");

const listElement = document.querySelector(".book-list");

if (!genre) {
  console.error("Genre not found in URL");
};

if (!listElement) {
  throw new Error("Missing .book-list container in HTML");
}

const dataSource = new ExternalServices();
const bookList = new BookList(genre, dataSource, listElement);

bookList.init();

