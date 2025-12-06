const API_URL = "http://localhost:3000/films";
let editingId = null;

const form = document.getElementById("film-form");
const tbody = document.getElementById("film-tbody");
const deleteAllBtn = document.getElementById("delete-all");

const filterTitle = document.getElementById("filter-title");
const filterGenre = document.getElementById("filter-genre");
const filterYear = document.getElementById("filter-year");
const filterWatched = document.getElementById("filter-watched");

async function fetchFilms(filters = {}) {
  try {
    const params = new URLSearchParams();
    if (filters.title) params.append("title", filters.title);
    if (filters.genre) params.append("genre", filters.genre);
    if (filters.releaseYear) params.append("releaseYear", filters.releaseYear);
    if (filters.isWatched !== undefined)
      params.append("isWatched", filters.isWatched);

    const response = await fetch(`${API_URL}?${params.toString()}`);
    if (!response.ok) throw new Error("Ошибка загрузки фильмов");
    return await response.json();
  } catch (error) {
    console.error("Ошибка:", error);
    alert("Не удалось загрузить фильмы");
    return [];
  }
}

async function addFilm(film) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(film),
    });
    if (!response.ok) throw new Error("Ошибка добавления фильма");
    return await response.json();
  } catch (error) {
    console.error("Ошибка:", error);
    alert("Не удалось добавить фильм");
  }
}

async function updateFilm(id, film) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(film),
    });
    if (!response.ok) throw new Error("Ошибка обновления фильма");
    return await response.json();
  } catch (error) {
    console.error("Ошибка:", error);
    alert("Не удалось обновить фильм");
  }
}

async function deleteFilm(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Ошибка удаления фильма");
    return true;
  } catch (error) {
    console.error("Ошибка:", error);
    alert("Не удалось удалить фильм");
    return false;
  }
}

async function deleteAllFilms() {
  try {
    const response = await fetch(API_URL, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Ошибка удаления всех фильмов");
    return true;
  } catch (error) {
    console.error("Ошибка:", error);
    alert("Не удалось удалить все фильмы");
    return false;
  }
}

function validateForm() {
  let isValid = true;

  const title = document.getElementById("title").value.trim();
  const genre = document.getElementById("genre").value.trim();
  const year = document.getElementById("releaseYear").value.trim();

  if (!title) {
    document.getElementById("title-error").textContent = "Введите название";
    isValid = false;
  } else {
    document.getElementById("title-error").textContent = "";
  }

  if (!genre) {
    document.getElementById("genre-error").textContent = "Введите жанр";
    isValid = false;
  } else {
    document.getElementById("genre-error").textContent = "";
  }

  if (!year || isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
    document.getElementById("year-error").textContent =
      "Введите корректный год";
    isValid = false;
  } else {
    document.getElementById("year-error").textContent = "";
  }

  return isValid;
}

async function handleFormSubmit(e) {
  e.preventDefault();

  if (!validateForm()) return;

  const film = {
    title: document.getElementById("title").value.trim(),
    genre: document.getElementById("genre").value.trim(),
    releaseYear: parseInt(document.getElementById("releaseYear").value),
    isWatched: document.getElementById("isWatched").checked,
  };

  if (editingId) {
    await updateFilm(editingId, film);
    editingId = null;
    document.getElementById("edit-id").value = "";
  } else {
    await addFilm(film);
  }

  form.reset();
  loadFilms();
}

async function loadFilms() {
  const filters = {
    title: filterTitle.value.trim(),
    genre: filterGenre.value.trim(),
    releaseYear: filterYear.value.trim(),
    isWatched: filterWatched.value === "" ? undefined : filterWatched.value,
  };

  const films = await fetchFilms(filters);
  renderFilms(films);
}

function renderFilms(films) {
  tbody.innerHTML = films
    .map(
      (film) => `
        <tr>
            <td>${film.title}</td>
            <td>${film.genre}</td>
            <td>${film.releaseYear}</td>
            <td>${film.isWatched ? "Да" : "Нет"}</td>
            <td>
                <button class="edit-btn" onclick="editFilm('${
                  film.id
                }')">Редактировать</button>
                <button class="delete-btn" onclick="deleteFilmHandler('${
                  film.id
                }')">Удалить</button>
            </td>
        </tr>
    `
    )
    .join("");
}

async function editFilm(id) {
  const films = await fetchFilms({});
  const film = films.find((f) => f.id === id);
  if (film) {
    document.getElementById("title").value = film.title;
    document.getElementById("genre").value = film.genre;
    document.getElementById("releaseYear").value = film.releaseYear;
    document.getElementById("isWatched").checked = film.isWatched;
    document.getElementById("edit-id").value = film.id;
    editingId = film.id;
  }
}

async function deleteFilmHandler(id) {
  if (confirm("Удалить фильм?")) {
    const success = await deleteFilm(id);
    if (success) {
      loadFilms();
      if (editingId === id) {
        form.reset();
        editingId = null;
      }
    }
  }
}

async function deleteAllHandler() {
  if (confirm("Удалить ВСЕ фильмы? Это действие нельзя отменить.")) {
    const success = await deleteAllFilms();
    if (success) {
      loadFilms();
      if (editingId) {
        form.reset();
        editingId = null;
      }
    }
  }
}

function setupEventListeners() {
  form.addEventListener("submit", handleFormSubmit);
  deleteAllBtn.addEventListener("click", deleteAllHandler);

  filterTitle.addEventListener("input", loadFilms);
  filterGenre.addEventListener("input", loadFilms);
  filterYear.addEventListener("input", loadFilms);
  filterWatched.addEventListener("change", loadFilms);
}

document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  loadFilms();
});
