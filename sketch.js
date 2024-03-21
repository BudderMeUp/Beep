let numBombs = 50;
let Obombs = [];
let growBomb = [];
let bullets = [];
let cloud1Obj = [];
let cloud2Obj = [];
let numClouds = 10;
let PlayerX = 800;
let PlayerY = 400;
let delay = 0.03;
let enemy;
let player;
let gif;
let Health = 0;
let maxSpeed = 8;
let enemyY = 100;
let mysound;
let GameOver = false; //GAME OVER
let restartDeath = 0;
let HitCooldown = false;
let HitTimer = 0;
let target = true;
let laserTime = 0;
let laserY = 890;
let tracking = true;
let ChargeSound = false;
let LaserSound = false;
let LaserHit = false;
function preload(){
  enemy = loadImage('assets/Enemy.png');
  player = loadImage('assets/PlayerJet.png');
  boom = loadImage('assets/Explode.png');
  cloud1 = loadImage('assets/Cloud1.png');
  cloud2 = loadImage('assets/Cloud2.png');
  enemyBG = loadImage('assets/EnemyBG.png');
  gif = createImg('assets/Ground1.gif');
  gif.hide();
  soundFormats('mp3', 'ogg','wav');
  PlayerShoot = loadSound('assets/PlayerShoot.wav');
  PlayerDead = loadSound('assets/PlayerDead.wav');
  EnemyHit = loadSound('assets/EnemyHit.wav');
  EnemyShoot = loadSound('assets/EnemyShoot.wav');
  Win = loadSound('assets/Victory.wav');
  Laser = loadSound('assets/LaserFire.wav');
  Charge = loadSound('assets/laserCharge.wav');
}

function setup() {
  createCanvas(1200,900);
  enemyBGx = random(50,1150);
  enemyBGy = -10;
  enemyBGsize = random(10,35);
  GameOver = false;
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
    speed: random(.5, 3),
    size: random(150,350)
    };
  }
  for (let i = 0; i < numClouds; i++){
  cloud2Obj[i] = {
    x: random(width), 
    y: random(-200, -100), 
    speed: random(.5, 3),
    size: random(100,450) 
    };
  }
}
function restartGame(){ // R E S T A R T ===================
  location.reload();
}
function draw(){
  background(0,50,180);
  image(gif, width/2, height/2, 1200, 900);
  image(enemyBG,enemyBGx,enemyBGy,enemyBGsize,enemyBGsize);//Background enemy
  enemyBGy += 2;
  if (enemyBGy > 920){
    enemyBGy = -20;
    enemyBGx = random(50,1150);
    enemyBGsize = random(10,35);
  }
  
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
  textSize(20);
  fill(0);
  text("Time: " + time, 20, 40);
  fill(0,255,0);
  stroke(40);
  rect(width/4,20,500,10);
  fill(255,0,0)
  rect(width/4,20,Health,10);
  fill(210,10,10);
  
  if (tracking == true){
    laserY = PlayerY;
  }
  
  if (Health > 175 && target == true){  // L A S E R ============
    rect(0,laserY,20,80);
    rect(1180,laserY,20,80);
    
    if (laserTime >= 15){
      tracking = false;
      if (laserTime >= 17){
        LaserHit = true;
        stroke(255,255,0);
        strokeWeight(5);
        rect(-5,laserY,1200,80);
        console.log("Laser Fired!")
        if (laserTime > 19){
          laserTime = 0;
          tracking = true;
          ChargeSound = false;
          LaserSound = false;
          LaserHit = false;
        }
      }
    }
  
  } else {laserTime = 0;}
  if (laserTime === 12 && ChargeSound == false){
    Charge.play();
    ChargeSound = true;
    console.log("Charging Laser!")
  }
  if (laserTime === 17 && LaserSound == false){
    Laser.play();
    LaserSound = true;
    console.log("Laser Fired!")
  }
  
  image(enemy,dropper,enemyY,80,80); // E N E M Y ****************
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
      time += 1;  // T I M E !!!!!!!!!!!!!!!!!
      loop = 0;
      laserTime += 1;
      dropperSpeed += random(.5,1);
    }
    strokeWeight(2)
    ellipse(bombObj.x,bombObj.y,bombObj.diameter,bombObj.diameter);
    

  if (bombObj.y > height + 50){
      bombObj.y = 100;
      bombObj.x = dropper;
      bombObj.bombSpeed = random(3,8);
      EnemyShoot.play();
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
  for (let i = 0; i < Obombs.length; i++) { //Player Dead BOMBS XXXXXXXXXXXXXX
    let bombObj = Obombs[i];
    if (dist(PlayerX, PlayerY, bombObj.x, bombObj.y) < bombObj.diameter / 2 + 20) {
      console.log("Player hit by bomb!");
      image(boom,PlayerX,PlayerY,100,100);
      PlayerDead.play();
      GameOver = true;
      textSize(50);
      stroke(255,180,180);
      fill(200,40,40);
      text("Click 3 Times to Restart ",width/4, height/2);
      noLoop();
    }
  }
 //Player Dead GROW BOMB XXXXXXXXXXXXXXXXXXXXXX
  if (dist(PlayerX, PlayerY, growBomb.x, growBomb.y) < growBomb.diameter / 2 + 10) {
      console.log("Player hit by bomb!");
      image(boom,PlayerX,PlayerY,100,100);
      PlayerDead.play();
      GameOver = true;
      textSize(50);
      stroke(255,180,180);
      fill(200,40,40);
      text("Click 3 Times to Restart ",width/4, height/2);
      noLoop();
    }
    // Player Dead LASER XXXXXXXXXXXXXXXXXXXXX
    if (PlayerY > laserY && PlayerY < laserY + 80 && LaserHit == true) {
      console.log("Player hit by laser!");
      image(boom, PlayerX, PlayerY, 100, 100);
      PlayerDead.play();
      GameOver = true;
      textSize(50);
      stroke(255, 180, 180);
      fill(200, 40, 40);
      text("Click 3 Times to Restart ", width / 4, height / 2);
      noLoop();
    }
  strokeWeight(0)
  for (let i = bullets.length - 1; i >= 0; i--) { //bullet
    let bullet = bullets[i];
    bullet.y += bullet.bulletSpeed;
    fill(255,255,100);

    ellipse(bullet.x, bullet.y, 5, 10); //ENEMY HIT
    if (HitCooldown === false && dist(bullet.x, bullet.y, dropper, 100) < 40) { //Enemy get hit
      console.log("Enemy hit!");
      HitCooldown = true;
      Health += 4;
      
      EnemyHit.play();
   }
   if (HitCooldown === true){
      HitTimer ++;
      image(boom,dropper,enemyY,70,70);
      if (HitTimer > 30){
        HitCooldown = false;
        HitTimer = 0;
      }
   }
   if (Health > 500){   // G A M E  W I N ==========
    GameOver = true
    textSize(75);
    fill(30,255,80);
    stroke(255,255,0);
    strokeWeight(10);
    text("You WIN! ",width/2.5, height/3);
    text("Click 3 Times to Restart ",width/4, height/2);
    Win.play();
    noLoop();
   }

    if (bullet.y < 0) { 
      bullets.splice(i, 1);
    }
  }
  if (Health > 250){
    maxSpeed = 12;
  }
  if (Health > 450){
    maxSpeed = 15;
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
function mouseClicked(){ //add a cooldown later maybe?
  let bullet = {
    x: PlayerX, 
    y: PlayerY,
    bulletSpeed: -8
  };
  if (!GameOver){
    PlayerShoot.play();
    bullets.push(bullet);
  } else {
    restartDeath += 1;
    
  }
  if (restartDeath > 2){
    restartGame();
  }
}
