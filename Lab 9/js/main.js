const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const X = 50;
const Y = 100;

const balls = [];

class Ball {
  constructor(x, y, vx, vy, radius, color) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.fill();
  }

  update() {
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.vx = -this.vx;
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.vy = -this.vy;
    }
    this.x += this.vx;
    this.y += this.vy;
  }
}

for (let i = 0; i < X; i++) {
  let x = Math.random() * canvas.width;
  let y = Math.random() * canvas.height;
  let vx = Math.random() * 10 - 5;
  let vy = Math.random() * 10 - 5;
  let radius = Math.random() * 20 + 10;
  let color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
    Math.random() * 255
  })`;

  let ball = new Ball(x, y, vx, vy, radius, color);

  balls.push(ball);
}

const drawLines = () => {
  for (let i = 0; i < balls.length; i++) {
    let ball1 = balls[i];
    for (let j = i + 1; j < balls.length; j++) {
      let ball2 = balls[j];
      let dx = ball1.x - ball2.x;
      let dy = ball1.y - ball2.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < Y) {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.moveTo(ball1.x, ball1.y);
        ctx.lineTo(ball2.x, ball2.y);
        ctx.stroke();
      }
    }
  }
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let ball of balls) {
    ball.draw();
    ball.update();
  }
  drawLines();
  requestAnimationFrame(animate);
};

const start = () => {
  document.getElementById("start").disabled = true;
  document.getElementById("reset").disabled = false;
  animate();
};

const reset = () => {
  document.getElementById("start").disabled = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let ball of balls) {
    ball.x = Math.random() * canvas.width;
    ball.y = Math.random() * canvas.height;
    ball.vx = Math.random() * 10 - 5;
    ball.vy = Math.random() * 10 - 5;
  }
};

document.getElementById("start").addEventListener("click", start);
document.getElementById("reset").addEventListener("click", reset);
