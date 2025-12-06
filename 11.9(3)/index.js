document.addEventListener("DOMContentLoaded", function () {
  const cardText = document.getElementById("cardText");
  const cardColor = document.getElementById("cardColor");
  const card = document.getElementById("card");

  card.style.width = "300px";
  card.style.height = "180px";
  card.style.border = "1px solid black";
  card.style.padding = "20px";
  card.style.margin = "10px";
  card.textContent = "Текст карты";

  cardText.addEventListener("input", function () {
    card.textContent = this.value;
  });

  cardText.addEventListener("focus", function () {
    this.style.border = "2px solid blue";
    this.style.backgroundColor = "#f0f0f0";
  });

  cardText.addEventListener("blur", function () {
    this.style.border = "";
    this.style.backgroundColor = "";
  });

  cardColor.addEventListener("change", function () {
    card.style.backgroundColor = this.value;
  });
});
