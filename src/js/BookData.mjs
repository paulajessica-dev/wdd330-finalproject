export default class BookData {
    constructor(apiBook, genreFromSearch) {
        this.id = apiBook.key || apiBook.id || crypto.randomUUID();
        this.title = apiBook.title ?? "Untitled";
        this.authors = apiBook.author_name ?? apiBook.authors?.map(a => a.name) ?? ["Unknown author"];
        this.cover = apiBook.cover_i ? `https://covers.openlibrary.org/b/id/${apiBook.cover_i}-M.jpg` : apiBook.covers?.length
                                        ? `https://covers.openlibrary.org/b/id/${apiBook.covers[0]}-M.jpg`
                                        : "/images/no-cover.png";
        this.publishYear = apiBook.first_publish_year ?? null;
        this.genre = genreFromSearch ?? apiBook.subject?.[0] ?? "General";
        this.description =  typeof apiBook.description === "string"
                            ? apiBook.description
                            : apiBook.description?.value ?? "";
        }    
};
