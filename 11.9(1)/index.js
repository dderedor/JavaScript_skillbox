document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("surveyForm");
  const rating = document.getElementById("rating");
  const ratingValue = document.getElementById("ratingValue");
  const result = document.getElementById("result");
  const resultContent = document.getElementById("resultContent");

  rating.addEventListener("input", function () {
    ratingValue.textContent = rating.value;
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    document.getElementById("usernameError").style.display = "none";
    document.getElementById("emailError").style.display = "none";
    document.getElementById("genderError").style.display = "none";

    const username = document.getElementById("username").value.trim();
    if (!username) {
      document.getElementById("usernameError").style.display = "block";
      return;
    }

    const email = document.getElementById("email").value.trim();
    if (!email.includes("@") || !email.includes(".")) {
      document.getElementById("emailError").style.display = "block";
      return;
    }

    const gender = document.querySelector('input[name="gender"]:checked');
    if (!gender) {
      document.getElementById("genderError").style.display = "block";
      return;
    }

    const interests = Array.from(
      document.querySelectorAll('input[type="checkbox"]:checked')
    ).map((cb) => cb.value);

    const comments = document.getElementById("comments").value.trim();

    resultContent.innerHTML = `
            <p>Имя: ${username}</p>
            <p>Email: ${email}</p>
            <p>Пол: ${gender.value}</p>
            <p>Оценка сервиса: ${rating.value}</p>
            <p>Интересы: ${interests.join(", ") || "нет"}</p>
            <p>Комментарии: ${comments || "нет"}</p>
        `;

    result.style.display = "block";
  });
});
