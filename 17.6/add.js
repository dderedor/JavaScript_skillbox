import { addItem } from "./storage.js";

export function render() {
  return `
        <div class="container">
            <div class="header">
                <h1>Добавить запись</h1>
                <a href="#list" class="back-link">Назад</a>
            </div>
            
            <form class="form" id="addForm">
                <label>Название:</label>
                <input type="text" id="name" required>
                <div class="error" id="nameError"></div>
                
                <label>Полка:</label>
                <input type="text" id="shelf" required>
                <div class="error" id="shelfError"></div>
                
                <label>Вес:</label>
                <input type="number" id="weight" step="0.01" min="0.01" required>
                <div class="error" id="weightError"></div>
                
                <label>Время хранения (мес.):</label>
                <input type="number" id="storageTime" min="1" required>
                <div class="error" id="timeError"></div>
                
                <button type="submit" class="btn btn-submit">Добавить запись</button>
            </form>
        </div>
    `;
}

export function initEventListeners() {
  const form = document.getElementById("addForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = true;

    const name = document.getElementById("name");
    const shelf = document.getElementById("shelf");
    const weight = document.getElementById("weight");
    const storageTime = document.getElementById("storageTime");

    if (!name.value.trim()) {
      document.getElementById("nameError").textContent = "Введите название";
      valid = false;
    } else {
      document.getElementById("nameError").textContent = "";
    }

    if (!shelf.value.trim()) {
      document.getElementById("shelfError").textContent = "Введите полку";
      valid = false;
    } else {
      document.getElementById("shelfError").textContent = "";
    }

    if (!weight.value || parseFloat(weight.value) <= 0) {
      document.getElementById("weightError").textContent =
        "Введите вес больше 0";
      valid = false;
    } else {
      document.getElementById("weightError").textContent = "";
    }

    if (!storageTime.value || parseInt(storageTime.value) < 1) {
      document.getElementById("timeError").textContent = "Введите время от 1";
      valid = false;
    } else {
      document.getElementById("timeError").textContent = "";
    }

    if (valid) {
      const item = {
        name: name.value,
        shelf: shelf.value,
        weight: weight.value,
        storageTime: storageTime.value,
      };

      addItem(item);
      window.location.hash = "#list";
    }
  });
}
