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
        checkout: resolve(__dirname, "src/checkout/index.html"),        
        book: resolve(__dirname, "src/book_details/index.html"),
        book_listing: resolve(__dirname, "src/book_listing/index.html"),
      },
    },
  },
});
