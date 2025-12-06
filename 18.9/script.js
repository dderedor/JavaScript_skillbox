function getCats() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["images/cat1.jpg", "images/cat2.jpg", "images/cat3.jpg"]);
    }, Math.random() * 3000 + 2000);
  });
}

function getDogs() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["images/dog1.jpg", "images/dog2.jpg", "images/dog3.jpg"]);
    }, Math.random() * 3000 + 2000);
  });
}

function showImages(images, containerId) {
  const container = document.getElementById(containerId);

  images.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.style.width = "200px";
    img.style.height = "200px";
    img.style.margin = "5px";
    container.appendChild(img);
  });
}

getCats().then((images) => showImages(images, "cats"));
getDogs().then((images) => showImages(images, "dogs"));
