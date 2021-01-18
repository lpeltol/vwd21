const size = 1000;

const main = () => {
  removeOverlay();
  drawScene();
};

const drawScene = () => {
  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");
  canvas.width = size;
  canvas.height = size;

  // Background
  drawBackground(ctx);

  // Sun (ARC)
  drawSun(ctx);

  // Tree
  const treeProps = {
    levels: getRandomIntegerBetween(5, 8),
    wallColor: "brown",
    roofColor: getRandomColor()
  };
  drawTree(ctx, [size * 0.14, size * 0.8], size * 0.4, treeProps);
  drawTree(ctx, [size * 0.9, size * 0.6], size * 0.2, treeProps);

  // Birds (Quadratic curve)
  for (i = 0; i < 3; i++) {
    drawBirds(ctx);
  }

  // House properties
  let properties = {
    levels: getRandomIntegerBetween(5, 8),
    wallColor: "brown",
    roofColor: getRandomColor(),
    door: true
  };

  let properties2 = {
    levels: getRandomIntegerBetween(5, 7),
    wallColor: "brown",
    roofColor: getRandomColor(),
    door: true
  };

  let properties3 = {
    levels: getRandomIntegerBetween(6, 7),
    wallColor: "brown",
    roofColor: getRandomColor(),
    door: true
  };

  // Houses in back
  drawHouse(ctx, [size * 0.7, size * 0.5], size * 0.2, properties);

  // Houses in front
  drawHouse(ctx, [size * 0.6, size * 0.7], size * 0.3, properties2);
  drawHouse(ctx, [size * 0.34, size * 0.8], size * 0.4, properties3);
};

const drawBackground = ctx => {
  ctx.beginPath();
  ctx.fillStyle = "green";
  ctx.rect(0, size * 0.5, size, size * 0.5);
  ctx.fill();

  ctx.beginPath();
  ctx.fillStyle = "skyblue";
  ctx.rect(0, 0, size, size * 0.5);
  ctx.fill();
};

const drawSun = ctx => {
  ctx.beginPath();
  ctx.fillStyle = "yellow";
  ctx.lineWidth = 0.1;
  ctx.arc(
    getRandomIntegerBetween(100, 920),
    getRandomIntegerBetween(100, 100),
    getRandomIntegerBetween(50, 75),
    0,
    2 * Math.PI
  );
  ctx.fill();
  ctx.stroke();
};

const drawTree = (ctx, location, scale, properties) => {
  ctx.beginPath();

  ctx.save();
  ctx.translate(location[0], location[1]);
  ctx.scale(scale, scale);
  ctx.lineWidth = 0.04;

  ctx.fillStyle = properties.wallColor;

  //trunk
  ctx.beginPath();
  ctx.rect(-0.1, -0.2, 0.02, 0.1);
  ctx.stroke();
  ctx.fill();

  ctx.translate(-0.08, -0.1);

  ctx.fillStyle = "rgba(0,255,0,1)";
  ctx.beginPath();
  ctx.moveTo(-0.2, -0.1);
  ctx.lineTo(+0.2, -0.1);
  ctx.lineTo(+0.0, -0.7);
  ctx.lineTo(-0.2, -0.1);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  ctx.restore();
};

const drawBirds = ctx => {
  let r = getRandomIntegerBetween(10, 30);
  let x = getRandomIntegerBetween(100, 900);
  let y = getRandomIntegerBetween(100, 250);
  ctx.lineWidth = getRandomIntegerBetween(2, 3);
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.quadraticCurveTo(x + r, y - r, x + r * 2, y);

  x = x + r * 2;
  y = y;

  ctx.moveTo(x, y);
  ctx.quadraticCurveTo(x + r, y - r, x + r * 2, y);
  ctx.stroke();
};

const drawHouse = (ctx, location, scale, properties) => {
  ctx.beginPath();
  ctx.save();

  ctx.translate(location[0], location[1]);
  ctx.scale(scale, scale);
  ctx.lineWidth = 0.04;

  // Walls of the house
  ctx.fillStyle = properties.wallColor;
  for (let i = 1; i < properties.levels; i++) {
    ctx.beginPath();
    ctx.rect(-0.5, -0.1, 1.0, 0.1);
    ctx.fill();
    ctx.stroke();
    ctx.translate(0, -0.1);
    ctx.rotate((Math.random() - 0.5) * 0.2);
  }

  // Roof of the house
  ctx.fillStyle = properties.roofColor;
  ctx.beginPath();
  ctx.moveTo(-0.5, -0.0);
  ctx.lineTo(0.5, -0.0);
  ctx.lineTo(0.0, -0.4);
  ctx.lineTo(-0.5, -0.0);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
  ctx.restore();

  // Draw door & knob
  if (properties.door) {
    ctx.save();
    ctx.translate(location[0], location[1]);
    ctx.scale(scale * 0.75, scale * 0.75);

    // Door
    ctx.lineWidth = 0.04;
    ctx.fillStyle = "#652121";
    ctx.beginPath();
    ctx.rect(0.1, -0.42, 0.2, 0.4);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fill();

    // Doorknob (ARC)
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(0.28, -0.23, 0.02, 0, 2 * Math.PI);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 0.02;
    ctx.stroke();
    ctx.fill();
    ctx.closePath();

    ctx.restore();
  }
};

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
