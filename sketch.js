var PLAY=1;
var END=0;
var gameState=PLAY;
var bird,birdimg;
var gameover;
var arrowimg;
var gameoverimg;
var netimg;
var restart;
//var backgroundImg;
var restartimg;
var ground,ground2;
var score=0;
//var jungle,jungleimg;
function preload(){
birdimg=loadAnimation("sprites/bird1.png","sprites/bird2.png","sprites/bird3.png","sprites/bird4.png")
arrowimg=loadImage("sprites/arrow1.png")
netimg=loadImage("sprites/net1.png")
 backgroundImg=loadImage("sprites/bg1.png")
 gameoverimg=loadImage("sprites/gameover.png")
restartimg=loadImage("sprites/playagain.png")

}

function setup() {
 var canvas = createCanvas(1200,400)
  bird=createSprite(400,200,50,50)
  bird.addAnimation("birdfly",birdimg)
  gameover=createSprite(300,200,50,50)
  gameover.addImage("over",gameoverimg)
  ground=createSprite(600,399,1200,20)
  ground2=createSprite(600,1,1200,20)
  //jungle=createSprite(600,325,2000,400)
  groupArrows=new Group()
  groupNets=new Group()
  restart = createSprite(800,200,20,20);
  restart.addImage("playagain",restartimg)
 
  restart.visible = false;
  gameover.visible = false;
}



function draw() {
  background(0);
 // background.addImage("background",backgroundImg)
 background(backgroundImg)
 //jungle.x = jungle.width/2
 //jungle.scale = 1.0;
 //jungle.velocityX = 4; 
//if (jungle.x > 1300) {
  //jungle.x = jungle.width/2;
//}
 text("Score: "+ score, 600, 100);

  if(gameState===PLAY){

 ground.x = ground.width /2; 
 ground2.x = ground2.width /2;    
    score = score+0.5;
    score=Math.round(score+0.5)
    gameover.visible = false
    restart.visible=false
      
    

   

    if(keyDown(UP_ARROW)){
      bird.y = bird.y-30
    } 
    if(keyDown(DOWN_ARROW)){
      bird.y=bird.y+30
    }
    
    bird.scale=0.3
    spawnarrows()
    spawnnets()
    if(groupArrows.isTouching(bird)|| groupNets.isTouching(bird) || bird.isTouching(ground) || bird.isTouching(ground2)){
     gameState=END
    }

   // restart.visible = false;
  }
  else if(gameState===END){
    

 groupArrows.setVelocityEach(0)
 groupNets.setVelocityEach(0)
 groupArrows.setLifetimeEach(-1)
 groupNets.setLifetimeEach(-1)

 gameover.visible=true
 groupNets.visible=false
 groupArrows.visible=false
 restart.visible = true;
 }


 if(mousePressedOver(restart)) {
  reset();
}

  
  drawSprites();
}
function spawnarrows(){
  if (frameCount % 60 === 0) {
    var arrow = createSprite(0,200,40,10);
    groupArrows.add(arrow)
    arrow.addImage(arrowimg)
    arrow.y = Math.round(random(200,360));
    
    arrow.scale = 0.2;
    arrow.velocityX = 10;
     arrow.lifetime = 267;
}
}
function spawnnets(){
  if (frameCount % 80 === 0) {
    var nets = createSprite(0,200,40,10);
    groupNets.add(nets)
    nets.addImage(netimg)
    nets.y = Math.round(random(0,200));
    //arrow.setAnimation("cloud");
    nets.scale = 0.5;
    nets.velocityX = 10;
    nets.lifetime = 267;
}
}

function reset(){
   
   gameState=PLAY;
  bird.x=400
  bird.y=200
  
   gameover.visible=false;
   restart.visible=false;
   groupNets.destroyEach();
   groupArrows.destroyEach();
  score=0;
  }