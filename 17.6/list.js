import { getItems, deleteItem, clearAll } from "./storage.js";

export function render() {
  let items = getItems();

  return `
        <div class="container">
            <div class="header">
                <h1>Склад</h1>
                <button class="btn btn-add" id="addBtn">Добавить запись</button>
            </div>
            
            ${
              items.length > 0
                ? `
                <button class="btn btn-delete" id="clearAll" style="margin-bottom: 10px;">
                    Удалить все записи
                </button>
                
                <table class="table">
                    <thead>
                        <tr>
                            <th>Название</th>
                            <th>Полка</th>
                            <th>Вес</th>
                            <th>Время хранения</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${items
                          .map(
                            (item) => `
                            <tr>
                                <td>${item.name}</td>
                                <td>${item.shelf}</td>
                                <td>${item.weight}</td>
                                <td>${item.storageTime}</td>
                                <td>
                                    <button class="btn btn-delete" data-id="${item.id}">Удалить</button>
                                </td>
                            </tr>
                        `
                          )
                          .join("")}
                    </tbody>
                </table>
            `
                : `
                <div>Нет записей. Добавьте первую запись.</div>
            `
            }
        </div>
    `;
}

export function initEventListeners() {
  document.getElementById("addBtn")?.addEventListener("click", () => {
    window.location.hash = "#add";
  });

  document.getElementById("clearAll")?.addEventListener("click", () => {
    if (confirm("Удалить все записи?")) {
      clearAll();
      window.location.hash = "#list";
    }
  });

  document.querySelectorAll(".btn-delete[data-id]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      if (confirm("Удалить запись?")) {
        deleteItem(id);
        window.location.hash = "#list";
      }
    });
  });
}
