let heights = [150, 165, 170, 155, 180, 160];

const heightList = document.getElementById("heightList");
const addHeightBtn = document.getElementById("addHeightBtn");
const filterBtn = document.getElementById("filterBtn");

let filterValue = null;

function displayHeights() {
  heightList.innerHTML = "";

  const heightsToShow = filterValue
    ? heights.filter((height) => height >= filterValue)
    : heights;

  for (let i = 0; i < heightsToShow.length; i++) {
    const heightItem = document.createElement("li");
    heightItem.className = "height-item";
    heightItem.textContent = heightsToShow[i] + " см";
    heightList.appendChild(heightItem);
  }
}

function addHeight() {
  const heightInput = prompt("Введите рост ученика:");

  if (!heightInput || heightInput.trim() === "") {
    alert("Рост не введён!");
    return;
  }

  const height = Number(heightInput);

  if (isNaN(height)) {
    alert("Введите числовое значение!");
    return;
  }

  heights.push(height);
  displayHeights();
}

function filterHeights() {
  const filterInput = prompt("Введите минимальный рост для фильтрации:");

  if (!filterInput || filterInput.trim() === "") {
    filterValue = null;
  } else {
    filterValue = Number(filterInput);

    if (isNaN(filterValue)) {
      alert("Введите числовое значение!");
      filterValue = null;
    }
  }

  displayHeights();
}

addHeightBtn.addEventListener("click", addHeight);
filterBtn.addEventListener("click", filterHeights);
displayHeights();
