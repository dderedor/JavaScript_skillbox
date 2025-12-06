import {
  render as renderList,
  initEventListeners as initList,
} from "./list.js";
import { render as renderAdd, initEventListeners as initAdd } from "./add.js";

function showLoader() {
  document.getElementById("loader").style.display = "flex";
}

function hideLoader() {
  document.getElementById("loader").style.display = "none";
}

function loadRoute() {
  showLoader();

  const hash = window.location.hash.substring(1) || "list";

  let html = "";
  let init = () => {};

  if (hash === "list") {
    html = renderList();
    init = initList;
  } else if (hash === "add") {
    html = renderAdd();
    init = initAdd;
  }

  document.getElementById("app").innerHTML = html;
  init();

  setTimeout(() => {
    hideLoader();
  }, 100);
}

document.addEventListener("DOMContentLoaded", () => {
  loadRoute();
});

window.addEventListener("hashchange", () => {
  loadRoute();
});
