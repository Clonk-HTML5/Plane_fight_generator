
  'use strict';
  var BirdGroup = require('../prefabs/birdGroup');  
  var Player = require('../prefabs/Player');  
  var EnemyPlaneGroup = require('../prefabs/EnemyPlaneGroup');  
  var Level = require('../prefabs/Level');  
  var Level2 = require('../prefabs/Level2');  
  var PausePanel = require('../prefabs/PausePanel');  
  var BasicLayer = require('../prefabs/BasicLayer');  
  var GameController = require('../plugins/GameController');
  var HUDManager = require('../plugins/HUDManager');

  function Play() {}
  Play.prototype = {
    create: function() {
//        this.worldScale = 0.8
//        
//        // set a minimum and maximum scale value
//        this.worldScale = Phaser.Math.clamp(this.worldScale, 0.25, 2);
//
//        // set our world scale as needed
//        this.game.world.scale.set(this.worldScale);
//        
//        // set our world size to be bigger than the window so we can move the camera
//        this.game.world.setBounds(0, -200, 4000, 1000);
//
//        // move our camera half the size of the viewport back so the pivot point is in the center of our view
//        this.game.camera.x = (this.game.width * -0.5);
//        this.game.camera.y = (this.game.height * -0.5);
        
//        this.pauseState = false;
        
        // new Level Object
        this.level = new Level(this.game);
        //this.level = new Level2(this.game);
        
        // Create a new bird object
        this.birdGroup = new BirdGroup(this.game);
        
        // add our pause button with a callback
        this.pauseButton = this.game.add.button(this.game.width - 100, 20, 'btnpause', this.pauseGame, this);
        this.pauseButton.fixedToCamera = true;
        this.pauseButton.inputEnabled = true;
//        this.pauseButton.anchor.setTo(0.5,0.5);
        this.pauseButton.scale.setTo(0.75,0.75);
        
        // Let's build a pause panel
        this.pausePanel = new PausePanel(this.game);
        this.game.add.existing(this.pausePanel);
        
        //GameStart Layer    
        this.basicLayer = new BasicLayer(this.game)
        
        // Add a input listener that can help us return from being paused
        this.game.input.onDown.add(this.unpause, this);
    },
      
    createPlayers: function(){
        this.basicLayer.removeAll();
        
        // new Player Object
        this.player = new Player(this.game, 400, 400,0);
        this.game.add.existing(this.player);
        this.playerVelocity = 0;
        
        // Create a new bird object
//        this.enemyPlaneGroup = new EnemyPlaneGroup(this.game, this.player);
//        this.enemyPlaneGroup.addEnemy();
    },

    pauseGame: function(){
        if(!this.game.paused){
            // Enter pause
            this.pausePanel.show(function(){
                 this.game.paused = true;
                 this.pauseButton.visible = false;
            });
        }
    },

    playGame: function(){
        if(this.game.paused){
                // Leaving pause
                this.pausePanel.hide();
                this.game.paused =false;
                this.pauseButton.visible = true;
        }
    },
    // And finally the method that handels the pause menu
    unpause: function(event){
        // Only act if paused
        if(this.game.paused){
            // Calculate the corners of the menu
            var w = window.innerWidth,
                h = window.innerHeight,
                x1 = w/2 - 270/2, x2 = x1,
                y1 = h/2 - 180/2, y2 = y1;

            // Check if the click was inside the menu
            if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){
                // The choicemap is an array that will help us see which item was clicked
                var choisemap = ['one', 'two', 'three', 'four', 'five', 'six'];

                // Get menu local coordinates for the click
                var x = event.x - x1,
                    y = event.y - y1;

                // Calculate the choice 
                var choise = Math.floor(x / 90) + 3*Math.floor(y / 90);
//                var choise = (x / 90)<< 0 + (3 * (y / 90)<< 0);

                console.log(choise)
                
                // Display the choice
                console.log('You chose menu item: ' + choisemap[choise]);
            }
            else{
                this.playGame();
            }
        }
    }
      
  };
  
  module.exports = Play;