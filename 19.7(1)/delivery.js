export class Delivery {
  constructor(name, address, distance) {
    this._name = name;
    this._address = address;
    this._distance = distance;
    this._element = null;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
    this._updateCard();
  }

  get address() {
    return this._address;
  }

  set address(value) {
    this._address = value;
    this._updateCard();
  }

  get distance() {
    return this._distance;
  }

  set distance(value) {
    this._distance = value;
    this._updateCard();
  }

  createCard() {
    const card = document.createElement("div");
    card.className = "delivery-card";

    const nameDiv = document.createElement("div");
    nameDiv.innerHTML =
      '<span class="label">Имя:</span> <span class="value name-value"></span>';

    const addressDiv = document.createElement("div");
    addressDiv.innerHTML =
      '<span class="label">Адрес:</span> <span class="value address-value"></span>';

    const distanceDiv = document.createElement("div");
    distanceDiv.innerHTML =
      '<span class="label">Расстояние:</span> <span class="value distance-value"></span> км';

    card.appendChild(nameDiv);
    card.appendChild(addressDiv);
    card.appendChild(distanceDiv);

    this._element = card;
    this._updateCard();

    return card;
  }

  _updateCard() {
    if (!this._element) return;

    const nameValue = this._element.querySelector(".name-value");
    const addressValue = this._element.querySelector(".address-value");
    const distanceValue = this._element.querySelector(".distance-value");

    if (nameValue) nameValue.textContent = this._name;
    if (addressValue) addressValue.textContent = this._address;
    if (distanceValue) distanceValue.textContent = this._distance;
  }
}
