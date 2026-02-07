import BookData from "./BookData.mjs";

const baseURL = import.meta.env.VITE_OPEN_LIBRARY_BASE


async function convertToJson(response) {
  if (response.ok) {
    return response.json();
  } else {
    const errorText = await response.text();
    throw new Error(errorText || "Error fetching data");
  }
}

export default class ExternalServices {

  async getData(genre) {
    return this.searchByGenre(genre);
  }

  async searchByGenre(genre) {
    const url = `https://openlibrary.org/search.json?subject=${genre}`;

    console.log("Fetching:", url);

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to fetch books");
    }

    const data = await response.json();

    return data.docs.map(
      book => new BookData(book, genre)
    );
  }
}
