const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

 

   var gameState = 0;
    var readState;

  var bedroom,garden,washroom;



var tommy,happydog,foodS,foodstock;
var database;
var add,feed,foodObj;
var food,lastfed;
var foodS=0;
var currentTime;

function preload(){
hg=loadImage("images/dogImg1.png")
saddog=loadImage("images/dogImg.png")

 bedimg=loadImage("images/Bed Room.png")
  washimg=loadImage("images/Wash Room.png")
   garden=loadImage("images/Garden.png")
   livingroom=loadImage("images/Living Room.png")



}

function setup() {
  database=firebase.database();
 
	createCanvas(800, 700);
  engine = Engine.create();
  world = engine.world;

 tommy=createSprite(600,350,70,70)
  tommy.addImage(saddog)
  tommy.scale=0.2

foodObj=new Food(600,350);



 foodstock=database.ref("food")
  foodstock.on("value",readstock)


  feed=createButton("feed the dog")
  feed.position(800,95);
  feed.mousePressed(feeddog)

  add=createButton("Add Food")
  add.position(700,95);
  add.mousePressed(addfood)


     readState=database.ref('gameState');       
     readState.on("value",function(data){
        gameState=data.val();
     })

     }





function draw() {  
background(46,136,87)
 foodObj.display();
 writestock(foodS)

      if(foodS==0){
        tommy.addImage(hg )
        foodObj.visible=false;
      }
      else{
        tommy.addImage(saddog);
        foodObj.visible=true;
      }


 feedtime=database.ref('feedtime')
  feedtime.on("value",function(data){
    lastfed=data.val()
  })

  
   if(gameState===1){
     tommy.addImage(happydog)
     tommy.scale=0.175;
     tommy.y=250;
   }
   

   if(gameState===2){
    tommy.addImage(saddog)
    tommy.scale=0.175;
    foodObj.visible=false;
    tommy.y=250;
   }
     
    var Bath=createButton("i want to take bath");
    Bath.position(580,125);
    if(Bath.mousePressed(function(){
      gameState=3;
      database.ref('/').update({'gameState':gameState})
    }));
        if(gameState===3){
          tommy.addImage(washimg);
          tommy.scale=1
          foodObj.visible=false;
            }

           var Sleep=createButton("I am very sleepy ")
           Sleep.position(710,125)
           if(Sleep.mousePressed(function(){
             gameState=54;
             database.ref('/').update({'gameState':gameState});
           }))
           if(gameState===4){
             tommy.addImage(bedimg);
             tommy.scale=1;
             foodObj.visible=false;
           }
           var Play=createButton("Lets Play!");
           Play.position(500,160)
           if(Play.mousePressed(function(){
             gameState=5;
             database.ref('/').update({'gameState':gameState})
           }))
           if(gameState===5){
             tommy.addImage(livingroom)
             tommy.scale=1
             foodObj.visible=false
           }
                 var PlayInGarden=createButton("Lets play in park");
                 PlayInGarden.position(585,160);
                 if(PlayInGarden.mousePressed(function(){
                   gameState=6;
                   database.ref('/').update({'gamestate':gameState});
                 }));
                 if(gameState===6){
                 tommy .y=175;
                   tommy.addImage(garden);
                   tommy.scale=1
                   foodObj.visible=false;
                 }
                 var button=createButton("Feed the dog");
                 button.position(400,125)

                 if(button.mousePressed(function(){
                   foodS=foodS-1;
                   gameState=1;
                   database.ref('/').update({'gamestate':gameState})
                 }))

                 
            
    if(gameState!="hungry"){
       feed.hide();
       add.hide();
       tommy.remove();
    }
    else{
      feed.show();
      add.show();
      tommy.addImage(saddog)
    }
    currentTime=hour();
  if(currentTime==(lastfed+1)){
   update("Playing");
    foodObj.garden();
  }
  else if(currentTime==(lastfed+2)){
      update("Sleeping")
      foodObj.bedroom();
  }
    else if(currentTime>(lastfed+2)&&   currentTime<=(lastfed+4)){
        update("Bathing")
        foodObj.washroom();
    }
    else{
        update("Hungry")
        foodObj.display();
    }



 drawSprites();
  

 textSize(20)
 fill("black")
 stroke("blue")
 
 text("Food Remaining: "+foodS,200,200)

 fill(255,255,254);
 textSize(15);
  if(lastfed>=12){
   text("Last Fed :"+lastfed%12 + "PM",350,30)
  }
   else if(lastfed==0){
     text("Last Fed : 12 AM",350,30)
   }
   else{
     text("Last Fed :"+lastfed+"AM",350,30)
   }

  }





function readstock(data){
  foodS=data.val();
  foodObj.updatefoodStock(foodS)
}


function writestock(x){

  if(x<=0){
    x=0
  }else{
    x=x-1
  }





  database.ref("/").update({
    food:x
  })
}

function feeddog(){
  tommy.addImage(hg);
  foodS=foodS-1

  foodObj.updatefoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    food : foodObj.getFoodStock(),
    feedtime:hour()
   
  })
}
  
function addfood(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}
function update(State){
    database.ref('/').update({
      gameState:State
    })    
  }
  function readstock(data){
    foodS=data.val();
  }
  function writestock(x){
    database.ref('/').update({
      food:x
    })
  }