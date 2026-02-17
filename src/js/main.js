import { getParam, loadHeaderFooter, getTopRatedBook} from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { topRatedFeatureTemplate } from "./TopRatedFeature.mjs";
import TrendingFeature from "./TrendingFeature.mjs";


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
    

  } else {
    console.log("Home page");
    
  };

async function loadTopRatedFeature() {
  const container = document.getElementById("top-rated-feature");
  if (!container) return;

  const top = getTopRatedBook();
  if (!top) {
    container.innerHTML = "<p>No ratings yet.</p>";
    return;
  }
  try {
    const service = new ExternalServices();
    const book = await service.getBookById(top.id);    
    container.innerHTML = topRatedFeatureTemplate(book, top);
  } catch (error) {
    console.error("Error loading top rated feature:", error);
    container.innerHTML = "<p>Unable to load featured book.</p>";
  }
};

loadTopRatedFeature();

async function loadTrendingFeature() {
  const container = document.getElementById("trending-feature");
  if (!container) return;

  try {
    const service = new ExternalServices();
    const book = await service.getTopTrendingBook();

    if (!book) {
      container.innerHTML = "<p>No trending books available.</p>";
      return;
    }

    const feature = new TrendingFeature(container);
    feature.render(book);
  } catch (error) {
    console.error("Error loading trending feature:", error);
    container.innerHTML = "<p>Unable to load trending books.</p>";
  }
};

loadTrendingFeature();


// // Testing APIs
// document.addEventListener('DOMContentLoaded', () => {
//     console.log('Testing APIs...');
//     testOpenLibraryAPI();
//     testGutendexAPI();
// });