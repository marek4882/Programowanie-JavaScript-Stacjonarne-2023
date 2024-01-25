const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const ball = {
  x: 150,
  y: 150,
  radius: 10,
  color: "blue",
  speedX: 0,
  speedY: 0,
};

const hole = {
  x: Math.random() * 80 + 10,
  y: Math.random() * 80 + 10,
  radius: 15,
  color: "black",
};

let timer = 0;
let score = 0;
let interval;

const drawBall = () => {
  ctx.beginPath();
  ctx.fillStyle = ball.color;
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
  ctx.fill();
};

const drawHole = () => {
  ctx.beginPath();
  ctx.fillStyle = hole.color;
  ctx.arc(hole.x, hole.y, hole.radius, 0, Math.PI * 2, true);
  ctx.fill();
};

const updateBall = () => {
  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.speedX = -ball.speedX;
  }
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.speedY = -ball.speedY;
  }
  ball.x += ball.speedX;
  ball.y += ball.speedY;
};

const checkCollision = () => {
  let dx = ball.x - hole.x;
  let dy = ball.y - hole.y;
  let distance = Math.sqrt(dx * dx + dy * dy);
  if (distance < ball.radius + hole.radius) {
    score++;
    document.getElementById("score").textContent = score;
    hole.x = Math.random() * 280 + 10;
    hole.y = Math.random() * 280 + 10;
  }
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawHole();
  updateBall();
  checkCollision();
  requestAnimationFrame(animate);
};

const start = () => {
  document.getElementById("start").disabled = true;
  document.getElementById("reset").disabled = false;
  interval = setInterval(() => {
    timer++;
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    document.getElementById("timer").textContent = minutes + ":" + seconds;
    if (timer === 60) {
      clearInterval(interval);
      document.getElementById("reset").disabled = true;
      alert("Twój wynik to: " + score);
    }
  }, 1000);
  animate();
};

const reset = () => {
  document.getElementById("start").disabled = false;
  document.getElementById("reset").disabled = true;
  clearInterval(interval);
  timer = 0;
  score = 0;
  document.getElementById("timer").textContent = "00:00";
  document.getElementById("score").textContent = "0";
  ball.x = 150;
  ball.y = 150;
  hole.x = Math.random() * 280 + 10;
  hole.y = Math.random() * 280 + 10;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

document.getElementById("start").addEventListener("click", start);
document.getElementById("reset").addEventListener("click", reset);

window.addEventListener("deviceorientation", (event) => {
  let alpha = event.alpha;
  let beta = event.beta;
  let gamma = event.gamma;
  ball.speedX = gamma / 10;
  ball.speedY = beta / 10;
});
