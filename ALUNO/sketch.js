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
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;

var bg_img;
var food;
var rabbit;

//aula 32 - variável do balão blower


var button;
var bunny;
var blink,eat,sad;
var mute_btn;

var fr,rope2;

//Aula 32 - variáveis criadas


function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  //Aula 32 - variáveis recebendo arquivos de som
  

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  createCanvas(500,700);
 
  frameRate(80);

  //play para o som de fundo

  //volume do som de fundo

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);

  //Aula 32 - anexando a imagem do balão com função de click
  

  //Aula 32 - anexando a imagem como botão para mutar.
  
  
  rope = new Rope(7,{x:245,y:30});
  ground = new Ground(200,690,600,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(420,620,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,490,690);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    //Aula 32 - som comendo
    
  }

  //Aula 32 - foi alterado porque como tudo estava true poderia ocorrer erro no som.
  if(collide(fruit,ground.body)==true)//alterar este código
  {
    bunny.changeAnimation('crying');
    //Aula 32 - som de fundo para parar a música
    
    //Aula 32 - som triste - quando a fruta cai e o coelho fica triste
    
    fruit=null;
     
   }
   
}

function drop()
{
  //Aula 32 - som de corte
  
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function keyPressed()
{
  if(keyCode==LEFT_ARROW)
  {
    airblow();
  }
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

//Aula 32 - função da corrente de ar do balão


//Aula 32 - função para mutar os sons



