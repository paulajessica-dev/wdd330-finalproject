import { getParam, loadHeaderFooter} from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

loadHeaderFooter();

const params = new URLSearchParams(window.location.search);

const genre = getParam("genre");
const id = getParam("id");

const service = new ExternalServices();

if (genre) {
  service.searchByGenre(genre)
    .then(data => {
      console.log(`Books by genre (${genre}):`, data.docs);
    })
    .catch(error => {
      console.error("Error fetching books by genre:", error);
    });

} else if (id) {
  console.log("Book details page - ID:", id);
  // depois: buscar detalhes do livro

} else {
  console.log("Home page");
  // depois: carregar trending / recomendações
}

// // Testing APIs
// document.addEventListener('DOMContentLoaded', () => {
//     console.log('Testing APIs...');
//     testOpenLibraryAPI();
//     testGutendexAPI();
// });