function progress(time) {
  const bar = document.getElementById("progress-bar");
  const timer = document.getElementById("timer");

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
}

progress(5);
