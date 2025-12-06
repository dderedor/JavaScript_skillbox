import { getItems, deleteItem, clearAll } from "./storage.js";

let sortField = null;
let sortDirection = "asc";

// Функция рендеринга страницы списка
export function render() {
  let items = getItems();

  // Сортировка
  if (sortField) {
    items.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (sortField === "weight" || sortField === "storageTime") {
        valA = parseFloat(valA);
        valB = parseFloat(valB);
      }

      if (sortDirection === "asc") {
        return valA > valB ? 1 : -1;
      } else {
        return valA < valB ? 1 : -1;
      }
    });
  }

  return `
        <div class="container">
            <div class="header">
                <h1>Склад</h1>
                <button class="btn btn-add" id="addBtn">Добавить запись</button>
            </div>
            
            ${
              items.length > 0
                ? `
                <div style="margin-bottom: 15px;">
                    <button class="btn btn-delete" id="clearAll" style="margin-right: 10px;">
                        Удалить все записи
                    </button>
                    <span>Всего записей: ${items.length}</span>
                </div>
                
                <table class="table">
                    <thead>
                        <tr>
                            <th data-field="name" ${
                              sortField === "name"
                                ? `class="sort-${sortDirection}"`
                                : ""
                            }>Название</th>
                            <th data-field="shelf" ${
                              sortField === "shelf"
                                ? `class="sort-${sortDirection}"`
                                : ""
                            }>Полка</th>
                            <th data-field="weight" ${
                              sortField === "weight"
                                ? `class="sort-${sortDirection}"`
                                : ""
                            }>Вес</th>
                            <th data-field="storageTime" ${
                              sortField === "storageTime"
                                ? `class="sort-${sortDirection}"`
                                : ""
                            }>Время хранения</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${items
                          .map(
                            (item) => `
                            <tr>
                                <td>${escapeHtml(item.name)}</td>
                                <td>${escapeHtml(item.shelf)}</td>
                                <td>${item.weight}</td>
                                <td>${item.storageTime}</td>
                                <td>
                                    <button class="btn btn-delete" data-id="${
                                      item.id
                                    }">Удалить</button>
                                </td>
                            </tr>
                        `
                          )
                          .join("")}
                    </tbody>
                </table>
            `
                : `
                <div style="text-align: center; padding: 40px;">
                    <p>Нет записей на складе.</p>
                    <p>Нажмите "Добавить запись" чтобы добавить первую запись.</p>
                </div>
            `
            }
        </div>
    `;
}

// Инициализация обработчиков событий
export function initEventListeners() {
  // Кнопка добавления записи
  document.getElementById("addBtn")?.addEventListener("click", () => {
    window.location.hash = "#add";
  });

  // Кнопка удаления всех записей
  document.getElementById("clearAll")?.addEventListener("click", () => {
    if (
      confirm(
        "Вы уверены, что хотите удалить ВСЕ записи? Это действие нельзя отменить."
      )
    ) {
      clearAll();
      window.location.hash = "#list";
    }
  });

  // Сортировка по заголовкам колонок
  document.querySelectorAll(".table th[data-field]").forEach((th) => {
    th.addEventListener("click", () => {
      const field = th.dataset.field;
      if (sortField === field) {
        sortDirection = sortDirection === "asc" ? "desc" : "asc";
      } else {
        sortField = field;
        sortDirection = "asc";
      }
      window.location.hash = "#list";
    });
  });

  // Кнопки удаления отдельных записей
  document.querySelectorAll(".btn-delete[data-id]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      const itemName = e.target
        .closest("tr")
        .querySelector("td:first-child").textContent;

      if (confirm(`Удалить запись "${itemName}"?`)) {
        deleteItem(id);
        window.location.hash = "#list";
      }
    });
  });
}

// Экранирование HTML
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
