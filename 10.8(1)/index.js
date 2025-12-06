document.addEventListener("DOMContentLoaded", function () {
  const thumbnails = document.querySelectorAll(".thumbnail");
  const fullSizeContainer = document.getElementById("fullSize");

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      fullSizeContainer.innerHTML = "";

      const fullImage = document.createElement("img");
      fullImage.src = this.src;
      fullSizeContainer.appendChild(fullImage);
    });
  });
});
