document.addEventListener("DOMContentLoaded", function () {
  const ascButton = document.getElementById("ascButton");
  const descButton = document.getElementById("descButton");
  const priceList = document.getElementById("priceList");

  const prices = [100, 500, 250, 750, 300];

  function displayPrices(arr) {
    priceList.innerHTML = "";
    arr.forEach((price) => {
      const li = document.createElement("li");
      li.textContent = price;
      priceList.appendChild(li);
    });
  }

  function sortAscending(arr) {
    return arr.slice().sort((a, b) => a - b);
  }

  function sortDescending(arr) {
    return arr.slice().sort((a, b) => b - a);
  }

  displayPrices(prices);

  ascButton.addEventListener("click", function () {
    const sorted = sortAscending(prices);
    displayPrices(sorted);
  });

  descButton.addEventListener("click", function () {
    const sorted = sortDescending(prices);
    displayPrices(sorted);
  });
});
