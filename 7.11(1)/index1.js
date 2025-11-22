let books = [
  "Война и мир",
  "Преступление и наказание",
  "Мастер и Маргарита",
  "1984",
  "Гарри Поттер и философский камень",
];

const bookList = document.getElementById("bookList");
const addBookBtn = document.getElementById("addBookBtn");
const searchBookBtn = document.getElementById("searchBookBtn");

function displayBooks() {
  bookList.innerHTML = "";
  for (let i = 0; i < books.length; i++) {
    const bookItem = document.createElement("li");
    bookItem.className = "book-item";
    bookItem.textContent = books[i];
    bookList.appendChild(bookItem);
  }
}

function addBook() {
  const bookTitle = prompt("Введите название новой книги:");

  if (!bookTitle || bookTitle.trim() === "") {
    alert("Название книги не введено!");
    return;
  }

  books.push(bookTitle.trim());
  displayBooks();
}

function searchBook() {
  const allBookItems = document.querySelectorAll(".book-item");
  allBookItems.forEach((item) => {
    item.classList.remove("highlighted");
  });

  const searchTitle = prompt("Введите название книги для поиска:");

  if (!searchTitle || searchTitle.trim() === "") {
    alert("Название для поиска не введено!");
    return;
  }

  let found = false;
  for (let i = 0; i < books.length; i++) {
    if (books[i].toLowerCase().includes(searchTitle.toLowerCase())) {
      const bookItems = document.querySelectorAll(".book-item");
      bookItems[i].classList.add("highlighted");
      found = true;
    }
  }

  if (!found) {
    alert("Книга не найдена!");
  }
}

addBookBtn.addEventListener("click", addBook);
searchBookBtn.addEventListener("click", searchBook);
displayBooks();
