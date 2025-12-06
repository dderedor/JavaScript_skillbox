import {
  render as renderList,
  initEventListeners as initList,
} from "./list.js";
import { render as renderAdd, initEventListeners as initAdd } from "./add.js";

// Функция показа загрузки
function showLoader() {
  document.getElementById("loader").style.display = "flex";
}

// Функция скрытия загрузки
function hideLoader() {
  document.getElementById("loader").style.display = "none";
}

// Загрузка нужной страницы
async function loadRoute() {
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

  // Небольшая задержка для плавности
  setTimeout(() => {
    hideLoader();
  }, 100);
}

// Загружаем начальную страницу при загрузке
document.addEventListener("DOMContentLoaded", () => {
  loadRoute();
});

// Обработчик изменения hash (переход между страницами)
window.addEventListener("hashchange", () => {
  loadRoute();
});
