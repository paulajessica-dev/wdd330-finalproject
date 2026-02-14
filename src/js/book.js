import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import BookDetails from "./BookDetails.mjs";

loadHeaderFooter();

async function init() {
  const bookId = getParam("id");
  //console.log("Book ID:", bookId);

  if (!bookId) {
    console.error("Book ID not found in URL");
    return;
  }

  const dataSource = new ExternalServices();
  const bookDetails = new BookDetails(bookId, dataSource);

  await bookDetails.init();
}

init();
