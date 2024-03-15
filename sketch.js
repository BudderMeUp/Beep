let numBombs = 50;
let Obombs = [];
let growBomb = [];
let bullets = [];
let cloud1Obj = [];
let cloud2Obj = [];
let numClouds = 5;
let mySound;
let PlayerX = 0;
let PlayerY = 0;
let delay = 0.03;
let enemy;
let player;
let gif;
let Health = 0;
let maxSpeed = 8;
let enemyY = 100;
let mysound;

function preload(){
  enemy = loadImage('assets/Enemy.png');
  player = loadImage('assets/PlayerJet.png');
  boom = loadImage('assets/Explode.png');
  cloud1 = loadImage('assets/Cloud1.png');
  cloud2 = loadImage('assets/Cloud2.png');
  gif = createImg('assets/Ground1.gif');
  gif.hide();
  soundFormats('mp3', 'ogg','wav');
  mySound = loadSound('assets/bonk.wav');
}

function setup() {
  createCanvas(1200,900);
  
  time = 0;
  dropper = 15;
  dropperSpeed = 5;
  dropperFlip = false
  loop = 0;
  bombs = 100;
  for (let i = 0; i < numBombs; i++){ //Red Bomb
    Obombs[i] = {
      x: dropper,
      y: 100,
      diameter: random(10,80),
      bombSpeed: random(3,maxSpeed)
    }
  }
BombSize = 10;
growRate = 2; //Grow Bomb Rate
growBomb = {
    x: dropper,
    y: 100,
    diameter: BombSize,
    bombSpeed: random(3, maxSpeed)
  };
  for (let i = 0; i < numClouds; i++){
  cloud1Obj[i] = {
    x: random(width), 
    y: random(-200, -100), 
    speed: random(1, 3),
    size: random(100,250)
  };
}
for (let i = 0; i < numClouds; i++){
  cloud2Obj[i] = {
    x: random(width), 
    y: random(-200, -100), 
    speed: random(1, 3),
    size: random(100,250) 
    };
  }
}

function draw(){
  background(0,50,180);
  image(gif, width/2, height/2, 1200, 900);
  textSize(20);
  fill(0);
  text("Time: " + time, 20, 40);
  fill(0,255,0);
  stroke(40);
  rect(width/4,20,500,10);
  fill(255,0,0)
  rect(width/4,20,Health,10);
  fill(210,10,10);
  imageMode(CENTER);
  //Cloud 1
  for (let i = 0; i < numClouds; i++){
  image(cloud1, cloud1Obj[i].x, cloud1Obj[i].y, cloud1Obj[i].size, cloud1Obj[i].size / 2);
  cloud1Obj[i].y += cloud1Obj[i].speed;
  if (cloud1Obj[i].y > height) {
    cloud1Obj[i].x = random(width);
    cloud1Obj[i].y = random(-200, -100);
    cloud1Obj[i].speed = random(1, 3);
    cloud1Obj[i].size = random(100, 150);
    }
  }
  //Cloud 2
  for (let i = 0; i < numClouds; i++){
    image(cloud2, cloud2Obj[i].x, cloud2Obj[i].y, cloud2Obj[i].size, cloud2Obj[i].size / 2);
    cloud2Obj[i].y += cloud2Obj[i].speed;
    if (cloud2Obj[i].y > height) {
      cloud2Obj[i].x = random(width);
      cloud2Obj[i].y = random(-200, -100);
      cloud2Obj[i].speed = random(1, 3);
      cloud2Obj[i].size = random(100, 150);
      }
    }
  image(enemy,dropper,enemyY,80,80); //Enemy image
  dropper += dropperSpeed;
  if (dropper > 1185 || dropper < 15){
    dropperSpeed *= -1;
  }
  fill(255,10,10);
  stroke(240,220,80);
  for (let i = 0; i < ellipse.length; i++){
    let bombObj = Obombs[i];
    bombObj.y += bombObj.bombSpeed;
    loop += 1;
    if (loop > 200){
      time += 1;
      loop = 0;
      dropperSpeed += random(.5,1);
    }
    strokeWeight(2)
    ellipse(bombObj.x,bombObj.y,bombObj.diameter,bombObj.diameter);

  if (bombObj.y > height + 50){
      bombObj.y = 100;
      bombObj.x = dropper;
      bombObj.bombSpeed = random(3,8);
    }
  }

  growBomb.y += growBomb.bombSpeed; //grow bomb
  fill(0,100,250);
  stroke(40,180,200);
  strokeWeight(5)
  growBomb.diameter = BombSize
  ellipse(growBomb.x, growBomb.y, growBomb.diameter, growBomb.diameter);
  BombSize += growRate;

  if (growBomb.y > 980) {
    BombSize = 10;
    growBomb.y = 100; 
    growBomb.x = dropper; 
    growBomb.diameter = random(10, 20); 
    growBomb.bombSpeed = random(3, maxSpeed); 
  }
strokeWeight(0)
  for (let i = bullets.length - 1; i >= 0; i--) { //bullet
    let bullet = bullets[i];
    bullet.y += bullet.bulletSpeed;
    fill(255,255,100);
    
    ellipse(bullet.x, bullet.y, 5, 10);
    if (dist(bullet.x, bullet.y, dropper, 100) < 40) { //Enemy get hit
      console.log("Enemy hit!");
      Health ++;
      image(boom,dropper,enemyY,70,70);
   }
    if (bullet.y < 0) { 
      bullets.splice(i, 1);
    }
  }
  if (Health > 250){
    maxSpeed = 12;
  }
  mouseMove();
  
}

function mouseMove(){
  let pX = mouseX - PlayerX;
  PlayerX += pX * delay;
  let pY = mouseY - PlayerY;
  PlayerY += pY * delay;
  fill(30,220,50);
  image(player,PlayerX,PlayerY,100,100);
  if (PlayerX > 1185){
    PlayerX = 1184;
  }
  if (PlayerY > 870){ //Bottom Screen Restriction
    PlayerY = 869;
  }
  if (PlayerY < 400){
    PlayerY = 401;
  }
}
function mouseClicked(){ //add a cooldown later
  let bullet = {
    x: PlayerX, 
    y: PlayerY,
    bulletSpeed: -8
  };
  mySound.play();
  bullets.push(bullet);
}
