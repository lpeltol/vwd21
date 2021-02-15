// Canvas globals
const size = 1000;
const textSize = 0.01;
const lineSize = 1;

// Animation globals
const objects = [];
let forward = true;
let stretch = false;

// Sound globals
let audioCtx;
let analyserNode;
let masterGain;

let songNodeMap = [
  261.626,
  261.626,
  261.626,
  327.03,
  294.33,
  294.33,
  294.33,
  348.83,
  327.03,
  327.03,
  294.33,
  294.33,
  261.626,
];
let currentNode = 0;

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
      objects[i].location[0] += 0.03;

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
        if (currentNode < 13) {
          playSound(songNodeMap[currentNode]);
        }
        currentNode++;
        // Pause briefly before starting the song again
        if (currentNode > 14) {
          currentNode = 0;
        }
      }
      objects.splice(1, 1);
    }
  }

  if (!forward) {
    for (let i = 0; i < objects.length; i++) {
      objects[i].location[0] -= 0.03;

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
        if (currentNode < 13) {
          playSound(songNodeMap[currentNode]);
        }
        currentNode++;
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
  ctx.clearRect(0, 0, lineSize, lineSize);

  drawBackground(ctx);
  drawText(ctx);
  
  // By Radu 
  if (analyserNode != null) {
    var dataArray = new Uint8Array(analyserNode.fftSize);
    analyserNode.getByteTimeDomainData(dataArray);

    ctx.lineWidth = 0.002;
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.beginPath();
    var sliceWidth = lineSize / analyserNode.fftSize;
    var x = 0;
    for (var i = 0; i < analyserNode.fftSize; i++) {
      var v = dataArray[i] / 128;
      var y = (0.2 * v * lineSize) / 2;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      x += sliceWidth;
    }
    ctx.stroke();
  }

  // Map through the object array and draw the object
  objects.map((object) => object.draw(ctx));
}

// PlaySound function from lecture materials by Radu
const playSound = (freq, duration = 1.25) => {
  if (audioCtx == null) {
    audioCtx = new (AudioContext ||
      webkitAudioContext ||
      window.webkitAudioContext)();

    analyserNode = audioCtx.createAnalyser();
    analyserNode.fftSize = Math.pow(2, 13);
    masterGain = audioCtx.createGain();
    masterGain.connect(audioCtx.destination);
    masterGain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    masterGain.connect(analyserNode);
  }

  var osc = audioCtx.createOscillator();
  var gainNode = audioCtx.createGain();
  gainNode.gain.setValueAtTime(0, audioCtx.currentTime);

  gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.05);
  gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + duration);

  osc.type = "circle";

  osc.frequency.value = freq;
  osc.start(audioCtx.currentTime);
  osc.stop(audioCtx.currentTime + duration);

  osc.connect(gainNode);
  gainNode.connect(masterGain);
};

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
  ctx.fillText("Squash & stretch", 1, 85);
  ctx.fillText("Secondary action: change color on impact", 1, 90);
  ctx.fillStyle = "purple";
  ctx.fillText("Sound: play Ukko Nooa on impact", 1, 95);
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
