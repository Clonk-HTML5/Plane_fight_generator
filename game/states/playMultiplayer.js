'use strict';
  var GameController = require('../plugins/GameController');
  var HUDManager = require('../plugins/HUDManager');  
  var io = require('../plugins/socket.io');  
  var BirdGroup = require('../prefabs/birdGroup');  
  var Player = require('../prefabs/Player');  
  var PausePanel = require('../prefabs/PausePanel');
  var Level = require('../prefabs/Level');  
  var SocketEventHandlers = require('../prefabs/socketEventHandlers');  
 var BasicLayer = require('../prefabs/BasicLayer'); 


  function PlayMultiplayer() {}
  PlayMultiplayer.prototype = {
    preload: function() {
      // Override this method to add some load operations. 
      // If you need to use the loader, you may need to use them here.
    },
    create: function() {
      // This method is called after the game engine successfully switches states. 
      // Feel free to add any setup code here (do not load anything here, override preload() instead).
        
        // new Level Object
        this.level = new Level(this.game);
        
        // Create a new bird object
        this.birdGroup = new BirdGroup(this.game);
        
        // new Player Object
        this.player = new Player(this.game, 400, 400, "sprites/plane3");
        this.game.add.existing(this.player);
        
        GlobalGame.player = this.player;
        
        this.socketEventHandlers = new SocketEventHandlers(this.game, io);

        GlobalGame.Multiplayer.socketEventHandlers = this.socketEventHandlers;
        
        // add our pause button with a callback
        this.pauseButton = this.game.add.button(this.game.width - 100, 20, 'sprites', this.pauseGame, this, 'menu/btn-pause', 'menu/btn-pause', 'menu/btn-pause', 'menu/btn-pause');
        this.pauseButton.fixedToCamera = true;
        this.pauseButton.inputEnabled = true;
//        this.pauseButton.anchor.setTo(0.5,0.5);
        this.pauseButton.scale.setTo(0.75,0.75);
        
        // Let's build a pause panel
        this.pausePanel = new PausePanel(this.game);
                //GameStart Layer    
//        this.basicLayer = new BasicLayer(this.game)
        
        // Add a input listener that can help us return from being paused
        this.game.input.onDown.add(this.unpause, this);
        
//        console.log(GlobalGame.Multiplayer.socket.sessionid)
//        if(!this.socketEventHandlers.playerById(GlobalGame.Multiplayer.socket.sessionid))
        GlobalGame.Multiplayer.socket.emit("new player", {x: this.player.x, y:this.player.y, angle: this.player.angle, name: GlobalGame.Multiplayer.userName});
    },
    createPlayers: function(){
        if(!this.player.alive){
            this.player.x = 400;
            this.player.y = 400;
            this.player.body.velocity.setTo(300, 0);
            this.player.revive(5);
//            this.player.bullets.reverse();
//            this.player.emitter.revive();
        }


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
                    x1 = w/2 - 270/2, x2 = w/2 + 270/2,
                    y1 = h/2 - 180/2, y2 = h/2 + 180/2;

                // Check if the click was inside the menu
                if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){
                    // The choicemap is an array that will help us see which item was clicked
                    var choisemap = ['one', 'two', 'three', 'four', 'five', 'six'];

                    // Get menu local coordinates for the click
                    var x = event.x - x1,
                        y = event.y - y1;

                    // Calculate the choice 
                    var choise = Math.floor(x / 90) + 3*Math.floor(y / 90);

                    // Display the choice
                    console.log('You chose menu item: ' + choisemap[choise]);
                }
                else{
                    this.playGame();
                }
            }
        },
    render: function() {
      // Put render operations here.
    },
    shutdown: function() {
      // This method will be called when the state is shut down 
      // (i.e. you switch to another state from this one).
    }
  };
module.exports = PlayMultiplayer;
