
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
  return wish.reduce(
    (total, item) => total + (item.quantity ?? 1), 0  );
};

export function initWishCounter() {
   
    const wishIcon = document.querySelector(".wish");
    if (!wishIcon) return;
    
    let counter = document.getElementById("counter");
 
    if (!counter) {
    counter = document.createElement("div");
    counter.id = "counter";
        wishtIcon.prepend(counter);
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


export async function loadHeaderFooter(){
  const templateHeader = await loadTemplate("../partials/header.html");
  const templateFooter = await loadTemplate("../partials/footer.html");

  const header = document.querySelector("#dynamic-header");
  const footer = document.querySelector("#dynamic-footer");

  renderWithTemplate(templateHeader, header, null, initWishCounter);
  renderWithTemplate(templateFooter, footer);

  initWishCounter();
};

