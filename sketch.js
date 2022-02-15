var trex, trex_running, edges;
var groundImage;
var solo
var solo2
var nuvemImg
var c1
var estadodojogo = "jogar"
var grupodenuvem,grupodecacto
var gameover,gameoverImg
var checkpoint
var die
var jump
var pontuacao=0
var v =5
var trexcolide
var reset, resetImg

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trexcolide = loadAnimation("trex_collided.png")
  groundImage = loadImage("ground2.png")
  nuvemImg= loadImage("cloud.png")
  c1=loadImage("obstacle1.png")
  c2=loadImage("obstacle2.png")
  c3=loadImage("obstacle3.png")
  c4=loadImage("obstacle4.png")
  c5=loadImage("obstacle5.png")
  c6=loadImage("obstacle6.png")
  checkpoint=loadSound("checkPoint.mp3")
  die=loadSound("die.mp3")         
  jump=loadSound("jump.mp3")
  gameoverImg=loadImage("gameOver.png")
  resetImg=loadImage("restart.png")
}

function setup(){
  createCanvas(600,200);
  
  //criando o trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("colide",trexcolide);
  edges = createEdgeSprites();
  solo= createSprite(300,190,600,20)
  solo.addImage ("cacto" ,groundImage);
  solo2 = createSprite(300,200,600,10)
  solo2.visible=false
  grupodenuvem=new Group ()
  grupodecacto=new Group ()
  gameover = createSprite(300,80,20,20)
  gameover.addImage("gameover",gameoverImg)
  gameover.visible=false
  reset = createSprite(300,110,20,20)
  reset.addImage("reset",resetImg)
  reset.scale=0.5
  reset.visible=false
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50
  frameRate(80)
}


function draw(){
  //definir a cor do plano de fundo 
  background("white");
  trex.collide(solo2);
  text("Pontuação: "+pontuacao,500,13)

  if(estadodojogo==="jogar"){
    trex.velocityY = trex.velocityY + 0.5;
    solo.velocityX = -v
    if (solo.x <0) {
      solo.x=solo.width/2

    
    }
    pontuacao=pontuacao+Math.round(frameCount/280)
    if (pontuacao%100===0&&pontuacao>0){
      checkpoint.play()
      v++
    }
    //pular quando tecla de espaço for pressionada
    if(keyDown("space")&&trex.y>170){
      trex.velocityY = -10;
      jump.play()
    }
    //impedir que o trex caia
    
    
    gerarNuvem();
    gerarcacto()
    if(trex.isTouching(grupodecacto)){
      estadodojogo="encerrar"
     die.play()
    }
  } else if(estadodojogo==="encerrar"){
    solo.velocityX = 0
    trex.velocityY = 0
    grupodecacto.setVelocityXEach (0)
    grupodenuvem.setVelocityXEach (0)
    grupodecacto.setLifetimeEach (-1)
    grupodenuvem.setLifetimeEach (-1)
    gameover.visible=true
    reset.visible=true  
    trex.changeAnimation("colide",trexcolide);
    if(mousePressedOver(reset)){
    botao()  
    }
  }
  drawSprites();
}

function gerarNuvem(){
    if(frameCount %60===0) {
      var nuvem=createSprite(610,50,40,10)
      nuvem.velocityX=-4
      nuvem.lifetime=180
      nuvem.y=Math.round(random(10,60))
      nuvem.addImage("nuvem",nuvemImg)
      grupodenuvem.add(nuvem)
    }
 
}
function gerarcacto(){
  if(frameCount %60===0) {
    var cacto=createSprite(610,176,40,10)
    cacto.velocityX=-v
    cacto.scale=0.4
    cacto.lifetime=180
    var rend=Math.round(random(1,6))
     switch(rend){
    case 1: cacto.addImage("cacto",c1)
  break
  case 2: cacto.addImage("cacto",c2)
  break
  case 3: cacto.addImage("cacto",c3)
  break
  case 4: cacto.addImage("cacto",c4)
  break
  case 5: cacto.addImage("cacto",c5)
  break
  case 6: cacto.addImage("cacto",c6)
  break
 
  }
  grupodecacto.add(cacto)
  }
}

function botao ()
{ 
  estadodojogo ="jogar"
  grupodecacto.destroyEach ()
  grupodenuvem.destroyEach ()
  pontuacao=0  
  frameCount=0
  trex.changeAnimation("running",trex_running);
  gameover.visible=false
  reset.visible=false
}