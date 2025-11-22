let products = ["Молоко", "Хлеб", "Яблоки", "Сыр"];

const productList = document.getElementById("productList");
const addProductBtn = document.getElementById("addProductBtn");

// Сортируем начальный массив
products.sort();

function displayProducts() {
  productList.innerHTML = "";

  for (let i = 0; i < products.length; i++) {
    const productItem = document.createElement("li");
    productItem.className = "product-item";
    productItem.textContent = products[i];
    productList.appendChild(productItem);
  }
}

function addProduct() {
  const productName = prompt("Введите название товара:");

  if (!productName || productName.trim() === "") {
    alert("Название товара не введено!");
    return;
  }

  products.push(productName.trim());

  // Сортируем массив после добавления
  products.sort();

  displayProducts();
}

addProductBtn.addEventListener("click", addProduct);
displayProducts();
