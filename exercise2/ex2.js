const size = 1000;
const textSize = 0.01;
const objects = [];
let speed = 0.02;

const main = () => {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = size;
  canvas.height = size;
  ctx.scale(size, size);

  animate();
};

function animate() {
  draw();
  window.requestAnimationFrame(animate);
}

function draw() {
  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");

  drawBackground(ctx);
  drawText(ctx);
}

const drawBackground = (ctx) => {
  const grd = ctx.createLinearGradient(0, 0, 1, 1);
  grd.addColorStop(0, "#430255");
  grd.addColorStop(1, "#076460");

  // Fill with gradient
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 1, 1);
};

const drawText = (ctx) => {
  ctx.save();
  ctx.scale(textSize, textSize);
  ctx.font = "3px Verdana"
  ctx.fillStyle = "tomato";
  ctx.fillText("FillText", 1, 95);
  ctx.restore();
}

// Ball class
class Ball {
  constructor(loc, scale, properties) {
    this.location = loc;
    this.scale = scale;
    this.properties = properties;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.save();
    ctx.translate(this.location[0], this.location[1]);
    ctx.scale(this.scale, this.scale);
    ctx.lineWidth = 0.03;
    const grd = ctx.createLinearGradient(0, 0, 1, 1);
    grd.addColorStop(0, this.properties.color1);
    grd.addColorStop(1, this.properties.color2);
    ctx.fillStyle = grd;

    ctx.arc(0.5, 0.25, 0.25, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}


// Utils

const removeOverlay = () => {
  let element = document.getElementById("overlay");
  element.style.display = "none";
};

const getRandomColor = () => {
  let red = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);
  return `rgba(${red},${green},${blue},1)`;
};

const getRandomIntegerBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomNumberBetween = (min, max) => {
  return Math.random() * (max - min) + min;
};

main();
