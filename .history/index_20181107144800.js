const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const height = 480
const width = 480

ctx.beginPath();
ctx.rect(0, 0, 30, 60);
ctx.fillStyle = "white";
ctx.fill();
ctx.closePath();