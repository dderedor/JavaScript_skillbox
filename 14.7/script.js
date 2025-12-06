const STORAGE_KEY = "films";
let films = [];
let editingId = null;

const form = document.getElementById("film-form");
const tbody = document.getElementById("film-tbody");
const sortSelect = document.getElementById("sort");

function loadFilms() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) films = JSON.parse(data);
  renderFilms();
}

function saveFilms() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(films));
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

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!validateForm()) return;

  const film = {
    id: editingId || Date.now().toString(),
    title: document.getElementById("title").value.trim(),
    genre: document.getElementById("genre").value.trim(),
    releaseYear: parseInt(document.getElementById("releaseYear").value),
    isWatched: document.getElementById("isWatched").checked,
  };

  if (editingId) {
    const index = films.findIndex((f) => f.id === editingId);
    films[index] = film;
    editingId = null;
  } else {
    films.push(film);
  }

  saveFilms();
  renderFilms();
  form.reset();
  document.getElementById("edit-id").value = "";
});

function renderFilms() {
  let sortedFilms = [...films];
  const sortBy = sortSelect.value;

  if (sortBy === "title") {
    sortedFilms.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === "genre") {
    sortedFilms.sort((a, b) => a.genre.localeCompare(b.genre));
  } else if (sortBy === "releaseYear") {
    sortedFilms.sort((a, b) => a.releaseYear - b.releaseYear);
  }

  tbody.innerHTML = sortedFilms
    .map(
      (film) => `
        <tr>
            <td>${film.title}</td>
            <td>${film.genre}</td>
            <td>${film.releaseYear}</td>
            <td>${film.isWatched ? "Да" : "Нет"}</td>
            <td>
                <button onclick="editFilm('${film.id}')">Редактировать</button>
                <button onclick="deleteFilm('${film.id}')">Удалить</button>
            </td>
        </tr>
    `
    )
    .join("");
}

function editFilm(id) {
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

function deleteFilm(id) {
  if (confirm("Удалить фильм?")) {
    films = films.filter((f) => f.id !== id);
    saveFilms();
    renderFilms();
    if (editingId === id) {
      form.reset();
      editingId = null;
    }
  }
}

sortSelect.addEventListener("change", renderFilms);

loadFilms();
