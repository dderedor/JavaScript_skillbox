import { Delivery } from "./delivery.js";

const deliveryArr = [
  new Delivery("Ольга", "ул. Вымыслов, д. 12", 8),
  new Delivery("Дмитрий", "ул. Задачная, д. 7", 3),
  new Delivery("Светлана", "ул. Ткачей, д. 43", 11),
];

function displayDeliveries() {
  const container = document.getElementById("deliveries");
  container.innerHTML = "";

  deliveryArr.forEach((delivery) => {
    const card = delivery.createCard();
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  displayDeliveries();
});
