
  'use strict';
  var BirdGroup = require('../prefabs/birdGroup');  
  var Player = require('../prefabs/Player');  
  var Level = require('../prefabs/Level');  
  var GameController = require('../plugins/GameController');
  var HUDManager = require('../plugins/HUDManager');

  function Play() {}
  Play.prototype = {
    create: function() {
        
        
        // new Level Object
        this.level = new Level(this.game);
        
        // Create a new bird object
        this.birdGroup = new BirdGroup(this.game);
        
        // new Player Object
        this.player = new Player(this.game, 400, 400,0);
        this.game.add.existing(this.player);
        
        // add our pause button with a callback
        this.pauseButton = this.game.add.button(this.game.width - 100, 20, 'pause', this.pauseClick, this);
        this.pauseButton.fixedToCamera = true;
//        this.pauseButton.anchor.setTo(0.5,0.5);
        this.pauseButton.scale.setTo(0.75,0.75);
    },
    update: function() {
        this.game.physics.arcade.overlap(this.player.bullets, this.birdGroup, this.player.bulletHitsBird, null, this);
        this.game.physics.arcade.overlap(this.player, this.birdGroup, this.player.playerHitsBird, null, this);

//        console.log(gameInitializer.enemies)
//        if(gameInitializer.enemies.length){
//            for(var i = 0; i < gameInitializer.enemies.length; i++){
//                this.game.physics.arcade.overlap(gameInitializer.enemies[i].player, this.bullets, this.shootPlayer, null, this);
//            }
//        }
        this.game.physics.arcade.collide(this.player, this.level.platforms, null, null, this);
    },
    pauseClick: function() {  
        // start the 'pause' state
        this.game.state.start('menu');
      },  
  };
  
  module.exports = Play;