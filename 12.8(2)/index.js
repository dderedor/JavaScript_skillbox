const promocodeObj = {
  promocode: "PROM50",
  gift: "Скидка 50%",
};

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
  if (cookie.promocode === promocodeObj.promocode) {
    input.value = promocodeObj.promocode;
    message.textContent = "Промокод применен, скидка 50%";
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (input.value === promocodeObj.promocode) {
      message.textContent = "Промокод применен, скидка 50%";
      document.cookie = `promocode=${promocodeObj.promocode}; max-age=86400`;
    } else {
      message.textContent = "";
      document.cookie = "promocode=; max-age=0";
    }
  });
});
