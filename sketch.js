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

var corda, bola, coelho;
var fundoImg, frutaImg, coelhoImg, piscarImg, comerImg, tristeImg;

var somFundo, somTriste, somAr, somComendo, somCorte;

var botao, botaoSom;

var novoLink;

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
  createCanvas(500,700);
  frameRate(80);

  somFundo.play();
  somFundo.setVolume(0.1);

  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,690,600,20);

  piscarImg.frameDelay = 30;
  comerImg.frameDelay = 30;
  tristeImg.frameDelay = 5;


  coelho = createSprite(250,610,100,100);
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

  corda = new Rope(6, {x:250, y:100});
  bola = Bodies.circle(250, 300, 20, options);
  Matter.Composite.add(corda.body,bola);

  novoLink = new link (corda,bola);

  botao = createImg("cut_button.png");
  botao.position(70, 120);
  botao.size(70, 70);
  botao.mouseClicked(cair);

  botaoSom = createImg("mute.png");
  botaoSom.position(width-120, 120);
  botaoSom.size(70, 70);
  botaoSom.mouseClicked(mutar);
  
}

function draw() 
{
  background(51);
  image(fundoImg, width/2,height/2,500,700);
  ground.show();
  
  Engine.update(engine);
  
  corda.show();

  if(bola!=null){
  image(frutaImg, bola.position.x, bola.position.y, 60, 60);
  }

  if(colidir(bola,coelho) === true){
    coelho.changeAnimation("comendo");
  }

  if(colidir(bola,ground.body) === true){
    coelho.changeAnimation("triste");
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

function mutar(){
  if(somFundo.isPlaying()){
    somFundo.stop();
  }
  else{
    somFundo.play();
  }
}





