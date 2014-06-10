'use strict';
  var GameController = require('../plugins/GameController');
  var HUDManager = require('../plugins/HUDManager');  
  var io = require('../plugins/socket.io');  
  var BirdGroup = require('../prefabs/birdGroup');  
  var Player = require('../prefabs/Player');  
  var Level = require('../prefabs/Level');  
  var SocketEventHandlers = require('../prefabs/socketEventHandlers');  


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
        this.player = new Player(this.game, 400, 400,0);
        this.game.add.existing(this.player); 
        
        this.socketEventHandlers = new SocketEventHandlers(this.game, this.player, io);
        
        this.player.socket = this.socketEventHandlers;
        
        // add our pause button with a callback
        this.pauseButton = this.game.add.button(this.game.width - 100, 20, 'pause', this.pauseClick, this);
        this.pauseButton.fixedToCamera = true;
//        this.pauseButton.anchor.setTo(0.5,0.5);
        this.pauseButton.scale.setTo(0.75,0.75);
    },
    update: function() {
      // state update code
        
        this.game.physics.arcade.overlap(this.player.bullets, this.birdGroup, this.player.bulletHitsBird, null, this.player);
        this.game.physics.arcade.overlap(this.player, this.birdGroup, this.player.playerHitsBird, null, this.player);

        if(this.player.socket.enemies.length){
            for(var i = 0; i < this.player.socket.enemies.length; i++){
                this.game.physics.arcade.overlap(this.player.socket.enemies[i], this.player.bullets, this.player.shootPlayer, null, this.player);
            }
        }
        this.game.physics.arcade.collide(this.player, this.level.platforms, null, null, this.player);
    },
    pauseClick: function() {  
        // start the 'pause' state
        this.game.state.start('menu');
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
