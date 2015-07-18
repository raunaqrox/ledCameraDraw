var canvas = document.getElementById('c');
var clearBtn = document.getElementById('clear');
var ctx = canvas.getContext('2d');
var prev = {};
var start = true;
function drawCube(x, y, s){
  if(start){
    prev.x = x;
    prev.y = y;
  }
  start = false;
  drawDrag(prev.x, prev.y, x, y, s);
}

clearBtn.addEventListener('click', clearScreen);

function clearScreen(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawDrag(prevX, prevY, currX, currY, penSize){
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX,currY);
    ctx.lineWidth = penSize;
    ctx.stroke();
    ctx.closePath();
    prev.x = currX;
    prev.y =  currY;
  }
