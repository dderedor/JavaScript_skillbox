document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("addButton");
  const removeButton = document.getElementById("removeButton");
  const itemList = document.getElementById("itemList");

  addButton.addEventListener("click", function () {
    const newItem = document.createElement("li");
    newItem.textContent = "Новый элемент списка";
    itemList.appendChild(newItem);
  });

  removeButton.addEventListener("click", function () {
    const items = itemList.getElementsByTagName("li");
    if (items.length > 0) {
      itemList.removeChild(items[items.length - 1]);
    }
  });
});
