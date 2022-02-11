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
var fundoImg, frutaImg, coelhoImg, piscarImg, comerImg, bravoImg;


var novoLink;

function preload(){
  fundoImg = loadImage("background.png");
  frutaImg = loadImage("melon.png");
  coelhoImg = loadImage("Rabbit-01.png");
  piscarImg = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  comerImg = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png" );
  bravoImg = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");

  piscarImg.playing = true;
  comerImg.playing = true;
  piscarImg.looping = true;
  comerImg.looping = false;

}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,690,600,20);

  piscarImg.frameDelay = 30;
  comerImg.frameDelay = 30;
  bravoImg.frameDelay = 5;


  coelho = createSprite(250,610,100,100);
  coelho.addImage(coelhoImg);
  coelho.scale = 0.2;

  coelho.addAnimation("piscando", piscarImg);
  coelho.addAnimation("comendo", comerImg);
  coelho.addAnimation("bravo", bravoImg);
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

}

function draw() 
{
  background(51);
  image(fundoImg, width/2,height/2,500,700);
  ground.show();
  
  Engine.update(engine);
  
  corda.show();
  image(frutaImg, bola.position.x, bola.position.y, 60, 60);

  drawSprites();
   
}
