import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  root: "src",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        wish: resolve(__dirname, "src/wish/index.html"),              
        book: resolve(__dirname, "src/book_details/index.html"),
        book_listing: resolve(__dirname, "src/book_listing/index.html"),
        trending: resolve(__dirname, "src/trending/index.html"),
        top_rated: resolve(__dirname, "src/top_rated/index.html"),
      },
    },
  },
});
