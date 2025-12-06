document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("deliveryForm");
  const tableBody = document.getElementById("productsTable");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    document.getElementById("nameError").style.display = "none";
    document.getElementById("weightError").style.display = "none";
    document.getElementById("distanceError").style.display = "none";

    const name = document.getElementById("productName").value.trim();
    const weight = parseFloat(document.getElementById("weight").value);
    const distance = parseFloat(document.getElementById("distance").value);

    let valid = true;

    if (!name) {
      document.getElementById("nameError").style.display = "block";
      valid = false;
    }

    if (!weight || weight <= 0) {
      document.getElementById("weightError").style.display = "block";
      valid = false;
    }

    if (!distance || distance <= 0) {
      document.getElementById("distanceError").style.display = "block";
      valid = false;
    }

    if (!valid) return;

    const cost = (weight * distance) / 10;

    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${name}</td>
            <td>${weight.toFixed(2)}</td>
            <td>${distance}</td>
            <td>${cost.toFixed(2)}</td>
        `;

    tableBody.appendChild(row);

    document.getElementById("productName").value = "";
    document.getElementById("weight").value = "";
    document.getElementById("distance").value = "";
  });
});
