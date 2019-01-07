const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.height = 480;
canvas.width = 480;

const N = 8;
const TILE_SIZE = canvas.height / N; // 60
let primary_color = "#a87e2b";
let secondary_color = "#ffdf9e";
