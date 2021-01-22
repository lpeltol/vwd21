const size = 1000;
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
  let prob = Math.random();
  if (prob < 0.05) {
    let y = getRandomNumberBetween(0.1, 0.9);
    let planetSize = getRandomNumberBetween(0.1, 0.4);
    let asteroidSize = getRandomNumberBetween(0.4, 0.8);
    let asteroidProb = Math.random();
    if (asteroidProb < 0.1) {
      objects.push(new Asteroid([1 + asteroidSize * 0.5, y], asteroidSize));
    } else {
      objects.push(
        new Planet([1 + planetSize * 0.5, y], planetSize, {
          color1: getRandomColor(),
          color2: getRandomColor()
        })
      );
    }
  }

  // Move plantes in canvas
  for (let i = 0; i < objects.length; i++) {
    objects[i].location[0] -= speed * Math.pow(objects[i].location[1], 0.5);
    if (objects[i].location[0] < -objects[i].scale) {
      objects.splice(i, 1); // removing 1 element at index i
      i--;
    }
  }

  drawTheSpace();
  window.requestAnimationFrame(animate);
}

function drawTheSpace() {
  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");

  drawBackground(ctx);

  // Map through the object array and draw the object
  objects.map(object => object.draw(ctx));
}

const drawBackground = ctx => {
  const grd = ctx.createLinearGradient(0, 0, 1, 1);
  grd.addColorStop(0, "#430255");
  grd.addColorStop(1, "#076460");

  // Fill with gradient
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 1, 1);
};

// Planet class
class Planet {
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

class Asteroid {
  constructor(loc, scale) {
    this.location = loc;
    this.scale = scale;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.save();
    ctx.translate(this.location[0], this.location[1]);
    ctx.scale(this.scale, this.scale);
    ctx.lineWidth = 0.02;

    // Asteroid shape
    // https://stackoverflow.com/questions/19541192/how-to-draw-cloud-shape-in-html5-canvas
    ctx.moveTo(0.17, 0.08);
    ctx.bezierCurveTo(0.13, 0.1, 0.13, 0.15, 0.23, 0.15);
    ctx.bezierCurveTo(0.25, 0.18, 0.32, 0.18, 0.34, 0.15);
    ctx.bezierCurveTo(0.42, 0.15, 0.42, 0.12, 0.39, 0.1);
    ctx.bezierCurveTo(0.43, 0.04, 0.37, 0.03, 0.34, 0.05);
    ctx.bezierCurveTo(0.32, 0.005, 0.25, 0.02, 0.25, 0.05);
    ctx.bezierCurveTo(0.2, 0.005, 0.15, 0.02, 0.17, 0.08);

    const grd = ctx.createLinearGradient(0, 0, 1, 1);
    grd.addColorStop(0, "#676767");
    grd.addColorStop(1, "#020007");
    ctx.fillStyle = grd;

    ctx.stroke();
    ctx.fill();
    ctx.closePath();
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
