const scoreDisplay = document.getElementById("score");
const clickBtn = document.getElementById("click-btn");
const resetBtn = document.getElementById("reset-btn");

clickBtn.addEventListener("click", async () => {
  const res = await fetch("/click", { method: "POST" });
  const data = await res.json();
  scoreDisplay.innerText = data.score;
});

resetBtn.addEventListener("click", async () => {
  const res = await fetch("/reset", { method: "POST" });
  const data = await res.json();
  scoreDisplay.innerText = data.score;
});