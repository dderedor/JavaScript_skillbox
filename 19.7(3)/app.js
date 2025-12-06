import { EditDelivery } from "./edit-delivery.js";

const deliveryArr = [
  new EditDelivery("Ольга", "ул. Вымыслов, д. 12", 8, "delivery"),
  new EditDelivery("Дмитрий", "ул. Задачная, д. 7", 3, "delivered"),
  new EditDelivery("Светлана", "ул. Ткачей, д. 43", 11, "canceled"),
];

function displayDeliveries() {
  const container = document.getElementById("deliveries");
  container.innerHTML = "";

  deliveryArr.forEach((delivery) => {
    const card = delivery.createCard();
    container.appendChild(card);
  });
}

function calculateTotalDistance() {
  const totalDistance = EditDelivery.getTotalDistance(deliveryArr);
  const totalElement = document.getElementById("total-distance");
  totalElement.textContent = `Общее расстояние: ${totalDistance} км`;
}

document.addEventListener("DOMContentLoaded", () => {
  displayDeliveries();

  const calculateButton = document.getElementById("calculate-distance");
  calculateButton.addEventListener("click", calculateTotalDistance);
});
