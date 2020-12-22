  var monkey, monkey_running, diedm;
  var banana, bananaImage, obstacle, obstacleImage, jlbg, jlbgimg, ig;
  var score;
  var PLAY = 1;
  var END = 0;
  var gameState = PLAY;
  var score = 0;
  var bananas = 0;
  var repeat = 1;

  function preload() 
    {

        jlbgimg = loadImage("junglebg.jpg");

        monkey_running = loadAnimation("sprite_0.png", "sprite_1.png",     
                                       "sprite_2.png", "sprite_3.png", 
                                       "sprite_4.png", "sprite_5.png", 
                                       "sprite_6.png", "sprite_7.png", 
                                       "sprite_8.png");

        diedm = loadAnimation("sprite_8.png");
        bananaImage = loadImage("banana.png");
        obstacleImage = loadImage("obstacle.png");

    }



  function setup()
   {
      createCanvas(500, 400);

      //creates the jungle background
      jlbg = createSprite(0, 100, 500, 400);
      jlbg.addImage(jlbgimg);
      jlbg.velocityX = -5;

      //creates an invisible ground
      ig = createSprite(250, 390, 500, 20);
      ig.visible = false;

      //creates the monkey
      monkey = createSprite(80, 345, 20, 20);
      monkey.addAnimation("running", monkey_running);
      monkey.addAnimation("died", diedm);
      monkey.scale = 0.16;
      // monkey.debug = true;
      monkey.setCollider("rectangle", 0, 0, monkey.width, 500);
      console.log(monkey.width);                      
     
      //creates groups
      FRUITS = new Group();
      ROCKS = new Group();
      
      //score
      score = 0;
      bananas = 0;
      repeat = 1;

   }


  function draw() 
    {
        background(220);

      
      
      
        if (gameState === PLAY)
          {
            
            monkey.x = 80;
            
            food();
            obstacles();
            monkey.changeAnimation("running", monkey_running);
            
            if (jlbg.x < 0) 
               {
                 jlbg.x = jlbg.width / 2;
               }

            
            if(keyDown('space') && monkey.y > 255)
               {
                 monkey.velocityY = -16;
               }

            monkey.velocityY = monkey.velocityY + 1.4; 
            
            if (monkey.isTouching(FRUITS))
              {
                FRUITS.destroyEach();
                bananas = bananas + 1;
              }
            
            if (monkey.isTouching(ROCKS))
              {
                gameState = END;
                repeat = 0;
              }
            
            if (repeat === 1)
            {
              score = Math.ceil(frameCount/30);
            }
          }
     
      
        monkey.collide(FRUITS);
        monkey.collide(ROCKS);
        monkey.collide(ig);
        drawSprites();
      
             
      if (gameState === END)
          {
            reset();
            textSize(25)
            fill("black");
            text("You lost , You Suck!",135,200);
            textSize(14);
            text("Press 'r' to Restart", 170,220);
     
            monkey.changeAnimation("died", diedm);
            
            jlbg.velocityX = 0;
            monkey.velocityY = 0;
            monkey.velocityX = 0;
            
            FRUITS.setLifetimeEach(-1);
            ROCKS.setLifetimeEach(-1);
     
            FRUITS.setVelocityXEach(0);
            ROCKS.setVelocityXEach(0); 
            
            
          }
      
      //displays the score
       fill("darkGreen");
       textSize(14);
       text("Survival Time: "+ score, 340,30);
       text("Banana: "+ bananas, 240,30);
       
        
   }


 function reset()
  {
    if (keyDown("r"))
      {
        gameState = PLAY;
        FRUITS.destroyEach();
        ROCKS.destroyEach();
        score = 0;
        bananas = 0;
        repeat = repeat + 1;
      }

    monkey.changeAnimation("died", diedm);
  
  }


 function food()
  {
   
    if(frameCount % 100 === 0)
      {
        var banana = createSprite(510,Math.round(random(125,200)),15,15);
        // banana.debug = true;
        banana.setCollider("rectangle", 0,0,500, 300);
        banana.velocityX = -5;
        banana.addImage(bananaImage);
        banana.scale=0.1;
        banana.lifetime=135; 
        FRUITS.add(banana);
      }

  }


  function obstacles()
  {
    if(frameCount % 140 === 0)
      {
        var obstacles = createSprite(510,370,15,30);
         // obstacles.debug = true;
          
        obstacles.setCollider('circle',0,0,170);
        obstacles.velocityX = -5;
        obstacles.addImage(obstacleImage);
        obstacles.scale = 0.2;
        obstacles.lifetime = 135;
        ROCKS.add(obstacles);


      }



  }