import { Delivery } from "./delivery.js";

export class EditDelivery extends Delivery {
  constructor(name, address, distance, status) {
    super(name, address, distance);
    this._status = status;
  }

  get status() {
    return this._status;
  }

  set status(value) {
    this._status = value;
    this._updateCard();
  }

  createCard() {
    const card = super.createCard();

    const buttonDiv = document.createElement("div");
    const editButton = document.createElement("button");
    editButton.textContent = "Изменить";
    editButton.className = "edit-button";
    buttonDiv.appendChild(editButton);
    card.appendChild(buttonDiv);

    editButton.addEventListener("click", () => this.openEditModal());

    card.classList.add(this._status);

    return card;
  }

  _updateCard() {
    super._updateCard();

    if (!this._element) return;

    this._element.classList.remove("delivery", "delivered", "canceled");
    this._element.classList.add(this._status);
  }

  openEditModal() {
    const modal = document.createElement("div");
    modal.className = "modal";

    modal.innerHTML = `
            <div class="modal-content">
                <h2>Редактирование доставки</h2>
                <label>Имя:</label>
                <input type="text" id="edit-name" value="${this._name}">
                
                <label>Адрес:</label>
                <input type="text" id="edit-address" value="${this._address}">
                
                <label>Расстояние (км):</label>
                <input type="number" id="edit-distance" value="${
                  this._distance
                }">
                
                <label>Статус:</label>
                <select id="edit-status">
                    <option value="delivery" ${
                      this._status === "delivery" ? "selected" : ""
                    }>Доставляется</option>
                    <option value="delivered" ${
                      this._status === "delivered" ? "selected" : ""
                    }>Доставлен</option>
                    <option value="canceled" ${
                      this._status === "canceled" ? "selected" : ""
                    }>Отменён</option>
                </select>
                
                <div class="modal-buttons">
                    <button id="save-button">Сохранить</button>
                    <button id="cancel-button">Отмена</button>
                </div>
            </div>
        `;

    document.body.appendChild(modal);

    modal.querySelector("#save-button").addEventListener("click", () => {
      this.name = document.getElementById("edit-name").value;
      this.address = document.getElementById("edit-address").value;
      this.distance = document.getElementById("edit-distance").value;
      this.status = document.getElementById("edit-status").value;
      document.body.removeChild(modal);
    });

    modal.querySelector("#cancel-button").addEventListener("click", () => {
      document.body.removeChild(modal);
    });
  }

  static getTotalDistance(deliveryArray) {
    let total = 0;

    for (const delivery of deliveryArray) {
      if (delivery.status !== "canceled") {
        total += delivery.distance;
      }
    }

    return total;
  }
}
