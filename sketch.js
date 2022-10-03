var PLAY=1;
var END =0;
var gameState = PLAY;
var trex ,trex_running; 
var trex_collided;
var ground,groundImage;
var invisibleGround;
//cargar imagen de nube
var cloud, cloudImage;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score;
var cloudsGroup;
var obstaclesGroup;
var gameOverImg;
var restartImg;
var jumpSound, checkPointSound, dieSound;
var message = "esto es un mensaje";

function preload(){
  
trex_running=loadAnimation("trex1.png","trex3.png","trex4.png")
groundImage=loadImage("ground2.png");
//añadir imagen a la variable 
cloudImage = loadImage("cloud.png");
//cargar imagenes de obstaculos
obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage("obstacle2.png");
obstacle3 = loadImage("obstacle3.png");
obstacle4 = loadImage("obstacle4.png");
obstacle5 = loadImage("obstacle5.png");
obstacle6 = loadImage("obstacle6.png");
gameOverImg = loadImage("gameOver.png");
restartImg = loadImage("restart.png");
trex_collided = loadImage("trex_collided.png");
jumpSound = loadSound("jump.mp3");
checkPointSound = loadSound("checkPoint.mp3");
dieSound = loadSound("die.mp3");

}

function setup(){
  createCanvas(windowWidth, windowHeight);
  
  //crear sprite de Trex
 trex=createSprite(58,height-70,28,50)
trex.addAnimation("runing",trex_running);
trex.scale=0.5;
trex.x=50;

trex.addAnimation("collided",trex_collided);

ground=createSprite(width/2,height-10,width,2);
ground.addImage("ground",groundImage);

gameOver = createSprite(width/2,height/2- 50);
gameOver.addImage(gameOverImg);
gameOver.scale=0.5;

restart = createSprite(width/2,height/2);
restart.addImage(restartImg);
restart.scale=0.5;

invisibleGround=createSprite(width/2,height-10, width,125);
invisibleGround.visible=false;

obstaclesGroup = createGroup();
 cloudsGroup = createGroup();

 trex.setCollider("circle",0,0,40);
 trex.debug = true;

score=0;




var rand=Math.round(random(1,100));


}

function draw(){
  background("white")
  text("puntuacion: "+ score, 500,50);

  
  

if(gameState === PLAY){
  gameOver.visible=false;
  restart.visible=false;

  ground.velocityX=-2;
  score = score + Math.round(frameCount/60);

  //agregar sonido.
  if(score >0 && score%100 === 0){
    checkPointSound.play();
  }

  if(ground.x<0){
    ground.x = ground.width/2;
  }
  

  if(keyDown("space") && trex.y >=100){
    trex.velocityY = -10;
    jumpSound.play();
  }
trex.velocityY = trex.velocityY +0.5;

spawnClouds();
spawnObstacles();

if(obstaclesGroup.isTouching(trex)){
   gameState = END;
   dieSound.play();
 }
}

else if(gameState === END){
  gameOver.visible=true;
  restart.visible=true;

  obstaclesGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);

  ground.velocityX=0;
  trex.velocityY=0;

  trex.changeAnimation("collided",trex_collided);
  obstaclesGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);
}

  
trex.collide(invisibleGround);

if(mousePressedOver(restart)){
  reset();

}


drawSprites();
}
function reset(){
gameState = PLAY;
gameOver.visible=false;
  restart.visible=false;
  cloudsGroup.destroyEach();
  obstaclesGroup.destroyEach();
  score=0;
  trex.changeAnimation("runing",trex_running);


}




function spawnClouds(){
  //codigo para crear nubes 
  if(frameCount % 60 ===0){
    cloud=createSprite(width+20,height-300,40,10);
    //añadir la imagen a las nubes
cloud.addImage("cloud", cloudImage);
    cloud.y = Math.round(random(10,60));
    //darle escala alas nubes 
cloud.scale=0.4;

    cloud.velocityX=-3; 
    //agregar lifeTime
    cloud.lifetime = 200;
    //ajustar la profundidad
  cloud.depth = trex.depth;
  trex.depth = trex.depth+1;
  cloudsGroup.add(cloud);
  }

  }
  function spawnObstacles (){
    if(frameCount %60 === 0){
var obstacle = createSprite(600,height-95,20,30);
obstacle.velocityX=-6;
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;

    }
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
} 