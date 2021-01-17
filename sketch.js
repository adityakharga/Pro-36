//Create variables here
var dog, dI,hDI , happyDog, database, foodS, foodStocks,lastFed;

function preload()
{
 dI = loadImage("images/dogImg.png"); 
 hDI = loadImage("images/dogImg1.png");
}

function setup() 
{
  foodObj = new Milk();

  createCanvas(1000,500);

  database = firebase.database();

  console.log(database);

  dog = createSprite(800,250,20,20);
  dog.addImage(dI) 
  dog.scale = 0.4;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  var feed = createButton("FEED DOG")
  feed.position(600,100)
  feed.mousePressed(feedDog)

  var addFood = createButton("ADD FOOD")
  addFood.position(700,100)
  addFood.mousePressed(addFoods)
}


function draw()
{  
  background(46,139,87);
  
  foodObj.display();
  drawSprites();
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })

  textSize(15);
  fill(255)
  if(lastFed>=12)
  {
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }
   else if(lastFed==0)
   {
     text("Last Feed : 12 AM",350,30);
   }
   else
   {
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
 
  
}


//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog()
{
  dog.addImage(hDI);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);

  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods()
{
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
