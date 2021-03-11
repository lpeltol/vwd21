const size = 1000;

const draw = () => {
  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");
  canvas.width = size;
  canvas.height = size;

  // Yellow Ice Cream
  ctx.beginPath();
  ctx.fillStyle = "#fffc00";
  ctx.lineWidth = 0.01;
  ctx.arc(450, 350, 100, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();

  // Blue Ice Cream
  ctx.beginPath();
  ctx.fillStyle = "#00FFFC";
  ctx.lineWidth = 0.01;
  ctx.arc(500, 250, 100, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();

  // Purple Ice Cream
  ctx.beginPath();
  ctx.fillStyle = "#FC00FF";
  ctx.lineWidth = 0.01;
  ctx.arc(550, 350, 100, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();

  // Cone
  ctx.fillStyle = "#CF9950";
  ctx.beginPath();
  ctx.lineWidth = 0.01;
  ctx.moveTo(350, 375);
  ctx.lineTo(650, 375);
  ctx.lineTo(500, 800);
  ctx.lineTo(350, 375);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
  ctx.restore();
};