class Food{
  constructor(){
      this.foodStock=0
      this.lastfed
      this.image=loadImage("images/Milk.png");
  }

   updatefoodStock(foodStock){
       this.foodStock=foodStock;
   }

getFedtime(lastfed){
    this.lastfed=lastfed
}

  deductFood(){
      if(this.foodStock>0){
          this.foodStock=this.foodStock-1;
      }
  }



   getFoodStock(){
       return this.foodStock;
   }

 display(){
   
  var x=80,y=100;

  imageMode(CENTER)
  //image(this.image,720,220,70,70)
 
    
  



  if(this.FoodStock!=0){
      for(var i=0;i<this.foodStock;i++){
          if(i%10==0){
            x=80;
            y=y+50  
          }
          image(this.image,x,y,50,50);
          x=x+30;
      }
  }

 }

   bedroom(){
    background(bedimg,800,700);

   }

   garden(){
    background(garden,800,700)
   }

   washroom(){
     background(washimg,800,700)
   }
  
    }
