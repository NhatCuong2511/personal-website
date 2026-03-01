const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: null, y: null };

window.addEventListener("mousemove", e => {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

class Dot {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.baseX = x;
    this.baseY = y;
    this.size = 1.5;
  }

  draw(){
    ctx.beginPath();
    ctx.shadowColor = "rgba(248,248,255,0.9)";
    ctx.shadowBlur = 12;
    ctx.fillStyle = "rgba(248,248,255,0.9)";
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fill();

    ctx.shadowBlur = 14;
  }

  update(){
    let dx = this.x - mouse.x;
    let dy = this.y - mouse.y;
    let dist = Math.sqrt(dx*dx + dy*dy);
    let radius = 55;

    if(dist < radius){
      let force = (radius - dist) / radius;
      this.x += dx * force * 0.6;
      this.y += dy * force * 0.6;
    } else {
      this.x += (this.baseX - this.x) * 0.05;
      this.y += (this.baseY - this.y) * 0.05;
    }

    this.draw();
  }
}

let dots = [];

function init(){
  dots = [];
  let gap = 60;
  for(let y=0; y<canvas.height; y+=gap){
    for(let x=0; x<canvas.width; x+=gap){
      dots.push(new Dot(x,y));
    }
  }
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  dots.forEach(d => d.update());
  requestAnimationFrame(animate);
}

init();
animate();