let numBombs = 20;
let Obombs = [];
let bullets = [];
let mySound;
let PlayerX = 0;
let delay = 0.04;

function setup() {
  createCanvas(800,800);
  time = 0;
  dropper = 15;
  dropperSpeed = 5;
  dropperFlip = false
  loop = 0;
  bombs = 100;
  for (let i = 0; i < numBombs; i++){
    Obombs[i] = {
      x: dropper,
      y: 100,
      diameter: 10,
      bombSpeed: random(3,8)
    }
  }
}

function draw(){
  background(200);
  textSize(20);
  fill(0);
  text("Time: " + time, 20, 40);

  fill(210,10,10);
  ellipse(dropper,100,30,30);
  dropper += dropperSpeed;
  if (dropper > 785 || dropper < 15){
    dropperSpeed *= -1;
  }
  fill(255,10,10);
  stroke(250,200,100);
  for (let i = 0; i < ellipse.length; i++){
    let bombObj = Obombs[i];
    bombObj.y += bombObj.bombSpeed;
    loop += 1;
    if (loop > 200){
      time += 1;
      loop = 0;
    }
    ellipse(bombObj.x,bombObj.y,bombObj.diameter,bombObj.diameter);

  if (bombObj.y > height + 50){
      bombObj.y = 100;
      bombObj.x = dropper;
      bombObj.bombSpeed = random(3,8);
    }
  }
  for (let i = bullets.length - 1; i >= 0; i--) {
    let bullet = bullets[i];
    bullet.y += bullet.bulletSpeed;
    fill(255,255,100);
    ellipse(bullet.x, bullet.y, 5, 10);
    if (bullet.y < 0) {
      bullets.splice(i, 1);
    }
  }
  mouseMove();
}
function mouseMove(){
  let pX = mouseX - PlayerX;
  PlayerX += pX * delay;
  fill(30,220,50);
  ellipse(PlayerX,769,20,20);
}
function mouseClicked(){ //add a cooldown later
  let bullet = {
    x: PlayerX, 
    y: 789,
    bulletSpeed: -8
  };
  
  bullets.push(bullet);
}
