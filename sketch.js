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

var corda;
var bola;

var novoLink;

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);
  
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
  ground.show();
  
  Engine.update(engine);
  
  corda.show();
  ellipse(bola.position.x, bola.position.y, 20, 20);
   
}
