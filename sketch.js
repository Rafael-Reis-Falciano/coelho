const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;

var corda, corda2, corda3, bola, coelho;
var fundoImg, frutaImg, coelhoImg, piscarImg, comerImg, tristeImg;

var somFundo, somTriste, somAr, somComendo, somCorte;

var botao, botao2, botao3, botaoSom, botaoAr;

var novoLink, novoLink2, novoLink3;

var canW, canH;

function preload(){
  fundoImg = loadImage("background.png");
  frutaImg = loadImage("melon.png");
  coelhoImg = loadImage("Rabbit-01.png");
  piscarImg = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  comerImg = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png" );
  tristeImg = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");

  piscarImg.playing = true;
  comerImg.playing = true;
  piscarImg.looping = true;
  comerImg.looping = false;

  somFundo = loadSound("sound1.mp3");
  somTriste = loadSound("sad.wav");
  somCorte = loadSound("rope_cut.mp3");
  somComendo = loadSound("eating_sound.mp3");
  somAr = loadSound("air.wav");

}

function setup() 
{
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth - 50;
    canH = displayHeight - 50;
    createCanvas(canW,canH);
  }
  else{
    canW = displayWidth - 50;
    canH = displayHeight -50;
    createCanvas(canW,canH);
  }
  frameRate(80);

  somFundo.play();
  somFundo.setVolume(0.1);

  engine = Engine.create();
  world = engine.world;
  ground = new Ground(canW/2,canH-10,canW,20);

  piscarImg.frameDelay = 30;
  comerImg.frameDelay = 30;
  tristeImg.frameDelay = 40;

  coelho = createSprite(canW/2,canH-100,100,100);
  coelho.addImage(coelhoImg);
  coelho.scale = 0.2;

  coelho.addAnimation("piscando", piscarImg);
  coelho.addAnimation("comendo", comerImg);
  coelho.addAnimation("triste", tristeImg);
  coelho.changeAnimation("piscando");

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);
  imageMode(CENTER);
  
  var options = {
    isStatic: false
  }

  corda = new Rope(6, {x:canW/2-115, y:120});
  corda2 = new Rope(5, {x:canW/2+85, y:120});
  corda3 = new Rope(4, {x:canW/2+185, y:235});

  bola = Bodies.circle(canW/2, 300, 20, options);
  Matter.Composite.add(corda.body,bola);

  novoLink = new link (corda,bola);
  novoLink2 = new link (corda2,bola);
  novoLink3 = new link (corda3,bola);
  


  botao = createImg("cut_button.png");
  botao.position(canW/2-150, 120);
  botao.size(70, 70);
  botao.mouseClicked(cair);

  botao2 = createImg("cut_button.png");
  botao2.position(canW/2+50, 120);
  botao2.size(70, 70);
  botao2.mouseClicked(cair2);

  botao3 = createImg("cut_button.png");
  botao3.position(canW/2+150, 200);
  botao3.size(70, 70);
  botao3.mouseClicked(cair3);

  botaoSom = createImg("mute.png");
  botaoSom.position(width-120, 20);
  botaoSom.size(70, 70);
  botaoSom.mouseClicked(mutar);

  botaoAr = createImg("balloon.png");
  botaoAr.position(canW/2-320, 230);
  botaoAr.size(150, 150);
  botaoAr.mouseClicked(soprar);

}

function draw() 
{
  background(51);
  image(fundoImg, width/2,height/2,canW,canH);
  ground.show();
  
  Engine.update(engine);
  
  corda.show();
  corda2.show();
  corda3.show();

  if(bola!=null){
  image(frutaImg, bola.position.x, bola.position.y, 60, 60);
  }

  if(colidir(bola,coelho) === true){
    coelho.changeAnimation("comendo");
    somComendo.play();
  }

  if(bola!=null && bola.position.y >= 660){
    coelho.changeAnimation("triste");
    somTriste.play();
    bola = null;
  }

  drawSprites();
   
}

function cair()
{
  somCorte.play();
  corda.break();
  novoLink.cortar();
  novoLink = null;
}

function cair2()
{
  somCorte.play();
  corda2.break();
  novoLink2.cortar();
  novoLink2 = null;
}

function cair3()
{
  somCorte.play();
  corda3.break();
  novoLink3.cortar();
  novoLink3 = null;
}

function colidir(body,sprite){
  if(body !== null){
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if(d<=60){
      World.remove(engine.world,bola);
      bola = null;
      return true;
    }
    else{
      return false;
    }
  }

}

function mutar()
{
  if(somFundo.isPlaying()){
    somFundo.stop();
  }
  else{
    somFundo.play();
  }
}

function soprar()
{
  Matter.Body.applyForce(bola, {x:0, y:0}, {x:0.03, y:0})
}



