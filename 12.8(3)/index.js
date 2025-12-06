const promocodeArr = [
  {
    promocode: "PROM10",
    gift: "Скидка 10%",
  },
  {
    promocode: "PROM50",
    gift: "Скидка 50%",
  },
  {
    promocode: "GIFT",
    gift: "Подарок в корзине",
  },
];

function getCookie() {
  return document.cookie.split("; ").reduce((acc, item) => {
    const [name, value] = item.split("=");
    acc[name] = value;
    return acc;
  }, {});
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  const input = document.getElementById("promo");
  const message = document.getElementById("message");

  const cookie = getCookie();
  if (cookie.promocode) {
    const foundPromo = promocodeArr.find(
      (p) => p.promocode === cookie.promocode
    );
    if (foundPromo) {
      input.value = foundPromo.promocode;
      message.textContent = `Промокод применен, ${foundPromo.gift.toLowerCase()}`;
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const enteredCode = input.value.toUpperCase();
    const foundPromo = promocodeArr.find((p) => p.promocode === enteredCode);

    if (foundPromo) {
      message.textContent = `Промокод применен, ${foundPromo.gift.toLowerCase()}`;
      document.cookie = `promocode=${foundPromo.promocode}; max-age=86400`;
    } else {
      message.textContent = "";
      document.cookie = "promocode=; max-age=0";
    }
  });
});
