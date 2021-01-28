class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(50,500);
    //player1.debug = true;
    player1.setCollider("rectangle",0,0,200,400);
    player1.addImage("player1",player_img);
    player1.scale = 0.2
    
    player2 = createSprite(300,500);
    //player2.debug = true;
    player2.setCollider("rectangle",0,0,200,400);
    player2.addImage("player2", player2_img);
    player2.scale = 0.2
    players=[player1,player2];

        }
    
    play(){
        
                form.hide();

                Player.getPlayerInfo();
                 image(back_img, 0, 0, 1000, 800);
                 var x = 50;
                 var y=200;
                 var index =0;
                 drawSprites();
                 for(var plr in allPlayers){
                    
                    
                     index = index+1;
                     x = x + 400
                     //x = 500-allPlayers[plr].distance;
                     //x=500;
                     y = 500 - allPlayers[plr].distance
                     players[index -1].x = x;
                     players[index - 1].y = y;
                       
                     if(index === player.index){
                         
                         fill("black");
                         textSize(25);
                         text(allPlayers[plr].name ,x-25,y+25);

                         
                     }
                     textSize(25)
                     fill("white")
                     text("player1:"+allPlayers.player1.score,50,50);
                     text("player2:"+allPlayers.player2.score,50,100);
                    
                     
                 
                 }
                
                
                 

                if (keyIsDown(DOWN_ARROW) && player.index !== null) {
                    player.distance -= 10
                    player.update();
                }
                if (keyIsDown(UP_ARROW) && player.index !== null) {
                    player.distance += 10
                    player.update();
                }
            
                 if (frameCount % 20 === 0) {
                     var position = Math.round(random(1,2));
                     //console.log(position);
                    if (position === 1){
                     fruits = createSprite( 0, random(100,1000), 100, 100);
                     //fruits.debug = true;
                     fruits.setCollider("circle",0,0,100)
                     fruits.velocityX = 6;
                    }
                    else if(position === 2){
                        fruits = createSprite( 1000, random(100,1000), 100, 100);
                       //fruits.debug = true;
                        fruits.setCollider("circle",0,0,100)
                     fruits.velocityX = -6;
                    }
                     fruits.scale = 0.2

                     fruits.addImage("fruit1",fruit1_img)
                     //var rand = Math.round(random(1,5));
                     /*switch(rand){
                         case 1: fruits.addImage("fruit1",fruit1_img);
                         break;
                         case 2: fruits.addImage("fruit1", fruit2_img);
                         break;
                         case 3: fruits.addImage("fruit1", fruit3_img);
                         break;
                         case 4: fruits.addImage("fruit1", fruit4_img);
                         break;
                         case 5: fruits.addImage("fruit1", fruit5_img);
                         break;
                     }*/
                     fruitGroup.add(fruits);
                     
                 }
                 
                  if (player.index !== null) {
                    for(var i=0; i<fruitGroup.length;i++){
                        if(fruitGroup.get(i).isTouching(players)){
                            //fruitGroup.get(i).destroy();
                            player.distance = 0;
                            //player.score=player.score+1;
                            player.update();
                        }
                    }

                  }
                

         
         
        
         

    }

    end(){
       console.log("Game Ended");
    }
}