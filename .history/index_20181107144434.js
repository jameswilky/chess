const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const height = 480
const width = 480

ctx.beginPath();
ctx.rect(0, 0, 10, 50);
ctx.fillStyle = "Light brown";
ctx.fill();
ctx.closePath();