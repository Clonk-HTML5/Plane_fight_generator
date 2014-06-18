
  'use strict';
  var BirdGroup = require('../prefabs/birdGroup');  
  var Player = require('../prefabs/Player');  
  var EnemyPlane = require('../prefabs/EnemyPlane');  
  var Level = require('../prefabs/Level');  
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
        
        // new Level Object
        this.level = new Level(this.game);
        
        // Create a new bird object
        this.birdGroup = new BirdGroup(this.game);
        
        // new Player Object
        this.player = new Player(this.game, 400, 400,0);
        this.game.add.existing(this.player);
        
        // new Player Object
        this.enemyPlane = new EnemyPlane(this.game, 1600, 400,0);
        this.game.add.existing(this.enemyPlane);
        
        // add our pause button with a callback
        this.pauseButton = this.game.add.button(this.game.width - 100, 20, 'pause', this.pauseClick, this);
        this.pauseButton.fixedToCamera = true;
//        this.pauseButton.anchor.setTo(0.5,0.5);
        this.pauseButton.scale.setTo(0.75,0.75);
    },
    update: function() {
        this.game.physics.arcade.overlap(this.player.bullets, this.birdGroup, this.player.bulletHitsBird, null, this.player);
        this.game.physics.arcade.overlap(this.player, this.birdGroup, this.player.playerHitsBird, null, this.player);

//        console.log(gameInitializer.enemies)
//        if(gameInitializer.enemies.length){
//            for(var i = 0; i < gameInitializer.enemies.length; i++){
//                this.game.physics.arcade.overlap(gameInitializer.enemies[i].player, this.bullets, this.shootPlayer, null, this);
//            }
//        }
        this.game.physics.arcade.collide(this.player, this.level.platforms, this.player.playerLoseHealth, null, this.player);
    },
    pauseClick: function() {  
        // start the 'pause' state
        this.game.state.start('menu');
      },  
  };
  
  module.exports = Play;