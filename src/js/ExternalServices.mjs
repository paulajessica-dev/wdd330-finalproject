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

  async getBookById(id) {
      if (id.startsWith("/gutendex/")) {
        const gutId = id.split("/gutendex/")[1];
        return this.getGutendexBookById(gutId);
      };

      const url = `https://openlibrary.org${id}.json`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch book details");

      const data = await response.json();
      return new BookData(data, "general");
    }
  
  async getBooksByIds(bookIds) {
      const promises = bookIds.map(id =>
        this.getBookById(id)
      );

      return Promise.all(promises);
    }

    async getTrendingBooks(limit = 12) {
      const url = "https://gutendex.com/books/?sort=popular";

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch trending books");
    }
      const data = await response.json();

           

      return data.results.slice(0, limit).map(book => {
        const genreFromApi = book.subjects?.[0] || book.bookshelves?.[0] || "General"; 
        return new BookData(
          {
            key: `/gutendex/${book.id}`,
            title: book.title,
            author_name: book.authors?.map(a => a.name) || ["Unknown"],
            first_publish_year: null,
            cover_i: book.formats?.["image/jpeg"] || book.formats?.["image/png"] || "",
            subjects: book.subjects,
            download_count: book.download_count,
            formats: book.formats
          },
          genreFromApi
        );
      });
    }

    async getGutendexBookById(id) {
      const url = `https://gutendex.com/books/${id}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch Gutendex book");

      const data = await response.json();

      const genreFromApi = data.subjects?.[0] || data.bookshelves?.[0] || "General";

      return new BookData(
        {
          key: `/gutendex/${data.id}`,
          title: data.title,
          author_name: data.authors?.map(a => a.name) || ["Unknown"],
          first_publish_year: null,
          cover_i: data.formats?.["image/jpeg"] || data.formats?.["image/png"] || "",
          download_count: data.download_count,
          subjects: data.subjects,
          description: data.summaries?.[0] || "",
          formats: data.formats
        },
        genreFromApi
      );
    }

    async getTopTrendingBook() {
      const books = await this.getTrendingBooks(1);
      return books.length ? books[0] : null;
    }

}


