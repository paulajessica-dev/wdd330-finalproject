
// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
};
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));  
  
};

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
};

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
};

export function getParam(param) {
  
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
    
};

export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(template);
  //if clear is true, we need to clear out parent contents
  if (clear) {
    parentElement.innerHTML = "";
  }
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
};



export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
};

export async function loadTemplate(path) {
  const response = await fetch(path);
  return await response.text();
};

export function getWishCount() {
  const wish = JSON.parse(localStorage.getItem("so-wish")) || [];
  // return wish.reduce(
  //   (total, item) => total + (item.quantity ?? 1), 0  );
  return wish.length;
};


export function initWishCounter() {
   
    const wishIcon = document.querySelector(".wish-count");
    if (!wishIcon) return;
    
    let counter = document.getElementById("counter");
 
    if (!counter) {
    counter = document.createElement("div");
    counter.id = "counter";
        wishIcon.prepend(counter);
    }
    
    const count = getWishCount();

    if (count > 0) {
    counter.textContent = count;
    counter.removeAttribute("data-hidden");
}
    else {
    counter.setAttribute("data-hidden", "true");
 }
};

export function getRatings() {
  return getLocalStorage("book-ratings") || {};

};

export function saveRating(bookId, rating) {
  const ratings = getRatings();
  if (!ratings[bookId]) {
    ratings[bookId] = {
    ratings: [],
    average : 0,
    count: 0
    };
  }
    ratings[bookId].ratings.push(rating); //adds new review
    ratings[bookId].count = ratings[bookId].ratings.length; // counts how many ratings there are in the array

    const sum = ratings[bookId].ratings.reduce((a, b) => a + b, 0); //sum all the notes
    ratings[bookId].average = sum / ratings[bookId].count; //average all the notes

    setLocalStorage("book-ratings", ratings);
  
};


//["/works/OL1", { average: 4.5, count: 2 }]
// bookId = "/works/OL1"
// data = { average: 4.5, count: 2 }
// Object.entries
// [
//   { id: "/works/OL1", average: 4.5, count: 2 },
//   { id: "/works/OL2", average: 3, count: 1 }
// ]
//Object.keys(obj),Object.keys(obj), Object.values(obj)

export function getTopRatedBooks(limit = 10) {
  const ratings = getRatings();

  return Object.entries(ratings)
    .map(([bookId, data]) => ({
      id: bookId,
      average: data.average,
      count: data.count
    }))
    .filter(book => book.count > 0)
    .sort((a, b) => b.average - a.average)
    .slice(0, limit);
};

export function getTopRatedBook() {
  const top = getTopRatedBooks(1);
  return top.length ? top[0] : null;
};


export function getBookRating(bookId) {
  const ratings = getRatings();
  return ratings[bookId] || null;
};

export async function loadHeaderFooter(){
  const templateHeader = await loadTemplate("../partials/header.html");
  const templateFooter = await loadTemplate("../partials/footer.html");

  const header = document.querySelector("#dynamic-header");
  const footer = document.querySelector("#dynamic-footer");

  renderWithTemplate(templateHeader, header, null, initWishCounter);
  renderWithTemplate(templateFooter, footer);

  initWishCounter();
};

