const gifts = [
  "Скидка 20% на первую покупку в нашем магазине!",
  "Скидка 10% на всё!",
  "Подарок при первой покупке в нашем магазине!",
  "Бесплатная доставка для вас!",
  "Сегодня день больших скидок!",
];

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

setTimeout(() => {
  const popup = document.getElementById("popup");
  const text = document.getElementById("gift-text");

  const randomIndex = Math.floor(Math.random() * gifts.length);
  text.textContent = gifts[randomIndex];

  popup.style.display = "flex";
}, 3000);
