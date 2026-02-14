// wish.js
import { loadHeaderFooter, getLocalStorage } from "./utils.mjs";
import WishListing from "./WishList.mjs";

loadHeaderFooter();

const listElement = document.querySelector(".book-list");

if (!listElement) {
  throw new Error("Missing .book-list container");
}

const wishlist = getLocalStorage("so-wish") || [];

const wishListing = new WishListing(listElement);
wishListing.init(wishlist);
