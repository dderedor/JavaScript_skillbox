function progress(bar, timer, time) {
  bar.style.transform = "scaleX(0)";
  timer.textContent = "0";

  const actualTime = Math.max(time, 2);
  bar.style.transition = `transform ${actualTime}s linear`;

  setTimeout(() => {
    bar.style.transform = "scaleX(1)";
  }, 10);

  let seconds = 0;
  const interval = setInterval(() => {
    seconds++;
    timer.textContent = seconds;
  }, 1000);

  setTimeout(() => {
    clearInterval(interval);
  }, actualTime * 1000);

  return new Promise((resolve) => {
    setTimeout(resolve, actualTime * 1000);
  });
}

function getCats() {
  return new Promise((resolve) => {
    const time = Math.random() * 3 + 2;
    setTimeout(() => {
      const images = ["images/cat1.jpg", "images/cat2.jpg", "images/cat3.jpg"];
      resolve({ images, time });
    }, time * 1000);
  });
}

function getDogs() {
  return new Promise((resolve) => {
    const time = Math.random() * 3 + 2;
    setTimeout(() => {
      const images = ["images/dog1.jpg", "images/dog2.jpg", "images/dog3.jpg"];
      resolve({ images, time });
    }, time * 1000);
  });
}

function displayImages(images, container) {
  images.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    container.appendChild(img);
  });
}

async function start() {
  const catsBar = document.getElementById("progress-cats");
  const catsTimer = document.getElementById("timer-cats");
  const catsContainer = document.getElementById("cats");

  const dogsBar = document.getElementById("progress-dogs");
  const dogsTimer = document.getElementById("timer-dogs");
  const dogsContainer = document.getElementById("dogs");

  const catsResult = await getCats();
  await progress(catsBar, catsTimer, catsResult.time);
  displayImages(catsResult.images, catsContainer);

  const dogsResult = await getDogs();
  await progress(dogsBar, dogsTimer, dogsResult.time);
  displayImages(dogsResult.images, dogsContainer);
}

start();
