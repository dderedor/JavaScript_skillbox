import { addItem } from "./storage.js";

// Функция рендеринга страницы добавления
export function render() {
  return `
        <div class="container">
            <div class="header">
                <h1>Добавить запись</h1>
                <a href="#list" class="back-link">← Назад к списку</a>
            </div>
            
            <form class="form" id="addForm">
                <div>
                    <label for="name">Название:</label>
                    <input type="text" id="name" placeholder="Введите название" required>
                    <div class="error" id="nameError"></div>
                </div>
                
                <div>
                    <label for="shelf">Полка:</label>
                    <input type="text" id="shelf" placeholder="Введите номер полки" required>
                    <div class="error" id="shelfError"></div>
                </div>
                
                <div>
                    <label for="weight">Вес (кг):</label>
                    <input type="number" id="weight" step="0.01" min="0.01" placeholder="0.00" required>
                    <div class="error" id="weightError"></div>
                </div>
                
                <div>
                    <label for="storageTime">Время хранения (месяцев):</label>
                    <input type="number" id="storageTime" min="1" placeholder="1" required>
                    <div class="error" id="timeError"></div>
                </div>
                
                <div style="margin-top: 20px;">
                    <button type="submit" class="btn btn-submit">Добавить запись</button>
                </div>
            </form>
        </div>
    `;
}

// Инициализация обработчиков событий
export function initEventListeners() {
  const form = document.getElementById("addForm");

  // Обработчик отправки формы
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Проверяем форму
    if (validateForm()) {
      // Собираем данные
      const item = {
        name: document.getElementById("name").value,
        shelf: document.getElementById("shelf").value,
        weight: document.getElementById("weight").value,
        storageTime: document.getElementById("storageTime").value,
      };

      // Показываем загрузку
      document.getElementById("loader").style.display = "flex";

      // Сохраняем с небольшой задержкой (для показа загрузки)
      setTimeout(() => {
        const success = addItem(item);
        document.getElementById("loader").style.display = "none";

        if (success) {
          // Возвращаемся на страницу списка
          window.location.hash = "#list";
        } else {
          alert("Ошибка при сохранении записи!");
        }
      }, 300);
    }
  });

  // Валидация полей при вводе
  document
    .getElementById("name")
    .addEventListener("blur", () => validateField("name"));
  document
    .getElementById("shelf")
    .addEventListener("blur", () => validateField("shelf"));
  document
    .getElementById("weight")
    .addEventListener("blur", () => validateField("weight"));
  document
    .getElementById("storageTime")
    .addEventListener("blur", () => validateField("storageTime"));
}

// Валидация всей формы
function validateForm() {
  let isValid = true;

  isValid = validateField("name") && isValid;
  isValid = validateField("shelf") && isValid;
  isValid = validateField("weight") && isValid;
  isValid = validateField("storageTime") && isValid;

  return isValid;
}

// Валидация отдельного поля
function validateField(fieldId) {
  const input = document.getElementById(fieldId);
  const error = document.getElementById(fieldId + "Error");
  let isValid = true;
  let message = "";

  // Проверяем наличие значения
  if (!input.value.trim()) {
    message = "Это поле обязательно для заполнения";
    isValid = false;
  }
  // Проверка для поля "Вес"
  else if (fieldId === "weight") {
    const value = parseFloat(input.value);
    if (isNaN(value) || value <= 0) {
      message = "Введите число больше 0";
      isValid = false;
    }
  }
  // Проверка для поля "Время хранения"
  else if (fieldId === "storageTime") {
    const value = parseInt(input.value);
    if (isNaN(value) || value < 1) {
      message = "Введите число от 1";
      isValid = false;
    }
  }
  // Проверка для текстовых полей
  else if (fieldId === "name" && input.value.trim().length < 2) {
    message = "Название должно быть не короче 2 символов";
    isValid = false;
  }

  // Показываем сообщение об ошибке или очищаем его
  error.textContent = message;

  return isValid;
}
