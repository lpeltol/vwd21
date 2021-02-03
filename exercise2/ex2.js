const size = 1000;
const textSize = 0.01;
const objects = [];
let forward = true;
let stretch = false;

const main = () => {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = size;
  canvas.height = size;
  ctx.scale(size, size);

  animate();
};

function animate() {
  let x = 0;
  let y = 0.7;
  let initialShape = {
    x: 0.5,
    y: 0.25,
    radiusX: 0.25,
    radiusY: 0.25,
    rotation: 0,
    startAngle: 0,
    endAngle: 2 * Math.PI,
  };

  objects.push(
    new Ball([x, y], 0.1, initialShape, {
      color: "tomato",
    })
  );

  if (forward) {
    for (let i = 0; i < objects.length; i++) {
      objects[i].location[0] += 0.01;

      if (stretch && objects[i].shape.radiusX <= 0.35) {
        objects[i].shape.radiusX += 0.01;
        objects[i].shape.radiusY -= 0.01;
        if (objects[i].shape.radiusX >= 0.35) {
          stretch = false;
        }
      }
      if (!stretch && objects[i].shape.radiusX >= 0.25) {
        objects[i].shape.radiusX -= 0.01;
        objects[i].shape.radiusY += 0.01;
      }

      if (objects[i].location[0] > 0.95) {
        forward = false;
        stretch = true;
        objects[i].shape.radiusX = 0.15;
        objects[i].shape.radiusY = 0.35;
        objects[i].properties.color = getRandomColor();
      }
      objects.splice(1, 1);
    }
  }

  if (!forward) {
    for (let i = 0; i < objects.length; i++) {
      objects[i].location[0] -= 0.01;

      if (stretch && objects[i].shape.radiusX <= 0.35) {
        objects[i].shape.radiusX += 0.01;
        objects[i].shape.radiusY -= 0.01;
        if (objects[i].shape.radiusX >= 0.35) {
          stretch = false;
        }
      }
      if (!stretch && objects[i].shape.radiusX >= 0.25) {
        objects[i].shape.radiusX -= 0.01;
        objects[i].shape.radiusY += 0.01;
      }

      if (objects[i].location[0] < -0.05) {
        forward = true;
        stretch = true;
        objects[i].shape.radiusX = 0.15;
        objects[i].shape.radiusY = 0.35;
        objects[i].properties.color = getRandomColor();
      }
      objects.splice(1, 1);
    }
  }
  draw();
  window.requestAnimationFrame(animate);
}

function draw() {
  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");

  drawBackground(ctx);
  drawText(ctx);

  // Map through the object array and draw the object
  objects.map((object) => object.draw(ctx));
}

const drawBackground = (ctx) => {
  ctx.beginPath();
  ctx.fillStyle = "skyblue";
  ctx.rect(0, 0, 1, 0.75);
  ctx.fill();

  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.rect(0, 0.75, 1, 0.25);
  ctx.fill();
};

const drawText = (ctx) => {
  ctx.save();
  ctx.scale(textSize, textSize);
  ctx.font = "3px Verdana";
  ctx.fillStyle = "tomato";
  ctx.fillText("Squash & stretch", 1, 90);
  ctx.fillText("Secondary action: change color on impact", 1, 95);
  ctx.restore();
};

// Ball class
class Ball {
  constructor(loc, scale, shape, properties) {
    this.location = loc;
    this.scale = scale;
    this.shape = shape;
    this.properties = properties;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.save();
    ctx.translate(this.location[0], this.location[1]);
    ctx.scale(this.scale, this.scale);
    ctx.lineWidth = 0.03;
    ctx.fillStyle = this.properties.color;

    ctx.ellipse(
      this.shape.x,
      this.shape.y,
      this.shape.radiusX,
      this.shape.radiusY,
      this.shape.rotation,
      this.shape.startAngle,
      this.shape.endAngle
    );
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
