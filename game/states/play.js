
  'use strict';
  var BirdGroup = require('../prefabs/birdGroup');
  var Player = require('../prefabs/Player');
  var EnemyGroup = require('../prefabs/EnemyGroup');
  var Level = require('../prefabs/Level');
  var PausePanel = require('../prefabs/PausePanel');
  var BasicLayer = require('../prefabs/BasicLayer');
  // var Level_old = require('../prefabs/Level_old');
  // var GameController = require('../plugins/GameController');
  // var HUDManager = require('../plugins/HUDManager');

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
        this.levelJson = this.game.cache.getJSON('levelJson');
        this.currentLevel = this.levelJson.Levels[GlobalGame.level];
        console.log(this.currentLevel)

        this.level = new Level(this.game, {currentLevel: this.currentLevel});
        // this.level.scale.setTo(GlobalGame.scale+GlobalGame.scale+0.1);

        // Create a new bird object
        this.birdGroup = new BirdGroup(this.game);

        // new Player Object
        // this.player = new Player(this.game, parseInt(this.currentLevel.playerStart.x), parseInt(this.currentLevel.playerStart.y), "sprites/plane3");
        this.player = new Player(this.game, parseInt(this.currentLevel.playerStart.x), parseInt(this.currentLevel.playerStart.y), GlobalGame.player);

        this.enemyGroup = new EnemyGroup(this.game, this.player, {currentLevel: this.currentLevel});
        this.enemyGroup.addEnemy();

        // add our pause button with a callback
        this.pauseButton = this.game.add.button(this.game.width - 100, 20, 'sprites', this.pauseGame, this, 'buttons/button_pause_act', 'buttons/button_pause_no', 'buttons/button_pause_act', 'buttons/button_pause_no');
        this.pauseButton.fixedToCamera = true;
        this.pauseButton.inputEnabled = true;
//        this.pauseButton.anchor.setTo(0.5,0.5);
        // this.pauseButton.scale.setTo(0.75,0.75);

        //GameStart Layer
//        this.basicLayer = new BasicLayer(this.game)
        this.createPlayers();

        // Let's build a pause panel
        this.pausePanel = new PausePanel(this.game);

        // this.bounds = Phaser.Rectangle.clone(this.game.camera.bounds);
        this.zoomTo(GlobalGame.scale);

        // Add a input listener that can help us return from being paused
        this.game.input.onDown.add(this.unpause, this);

        this.currentTimer = this.game.time.create(false);
        // this.currentTimer.loop(Phaser.Timer.SECOND, updateTimer, this);
        this.currentTimer.start();
    },

    update: function(){
      this.enemyGroup.forEachAlive(function(enemy){
         this.game.physics.arcade.overlap(enemy, this.player.bullets, enemy.enemyLoseHealth, null, enemy);
         this.game.physics.arcade.overlap(this.player, enemy.bullets, this.player.playerHitsSomething, null, this.player);
          if(!enemy.inCamera){
              enemy.arrow.visible = true;
//              enemyPlane.arrow.position.setTo(this.game.camera.view.x,this.game.camera.view.y)
              // var arrowPositionX = 0;
              // var arrowPositionY = 0;
              // if(enemy.x > this.game.camera.width){
              //   arrowPositionX = this.game.camera.width;
              // } else if(enemy.x < this.game.camera.x) {
              //   arrowPositionX = 0;
              // } else {
              //   arrowPositionX = enemy.x;
              // }
              // if(enemy.y > this.game.camera.height){
              //   arrowPositionY = this.game.camera.height;
              // } else if(enemy.y < this.game.camera.y){
              //   arrowPositionY = 0;
              // } else {
              //   arrowPositionY = enemy.y;
              // }
              // this.arrowTween = this.game.add.tween(enemy.arrow.cameraOffset).to({x: arrowPositionX, y: arrowPositionY}, 1000, Phaser.Easing.Linear.None).start();
              enemy.arrow.rotation = this.game.physics.arcade.angleBetween(enemy.arrow, enemy);
          }else {
              enemy.arrow.visible = false;
          }
      }, this)
    },

    render: function(){
    //  this.game.debug.text(this.currentTimer.seconds, 32, 32);
    //  this.game.debug.body(this.player, 32, 32);
//        this.game.debug.cameraInfo(this.game.camera, 32, 32);
      // this.game.debug.cameraInfo(this.game.camera, 500, 32);
      // this.game.debug.spriteCoords(this, 32, 32);
      // this.game.debug.spriteInfo(this.enemyGroup.flak, 32, 32);
      // this.game.debug.body(this.enemyGroup.solider, 32, 32);
    },

    createPlayers: function(){
//        this.basicLayer.removeAll();

        this.game.add.existing(this.player);
        if(!this.player.alive){
            this.player.x = this.currentLevel.playerStart.x
            this.player.y = this.currentLevel.playerStart.y;
            this.player.body.velocity.setTo(300, 0);
            this.player.revive(5);
//            this.player.bullets.reverse();
//            this.player.emitter.revive();
        }


    },
    restart: function () {
	      this.game.state.restart();
  	},
  	menu: function () {
  	    this.game.state.start('menu',true,false);
  	},

    paused: function() {
        this.currentTimer.pause();
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
                this.currentTimer.resume();
        }
    },

    zoomTo: function(scale, duration){
      var bounds       = this.game.world.bounds;
      var cameraBounds = this.game.camera.bounds;
      var postionScale = (1 - scale) / 2;
      var x      = bounds.width  * postionScale,
        y      = bounds.height * postionScale,
        width  = bounds.width  * scale,
        height = bounds.height * scale;
      if (!duration) {
            // cameraBounds.x      = x;
            // cameraBounds.y      = y;
            // cameraBounds.width  = width;
            // cameraBounds.height = height;
            this.game.camera.scale.setTo(scale);
      } else {
        // this.game.add.tween(cameraBounds)
        // .to({x, y, width, height}, duration).start();
        this.game.add.tween(cameraBounds)
        .to({width, height}, duration).start();
        return this.game.add.tween(this.game.camera.scale)
        .to({x: scale, y: scale}, duration).start();
      }
    },

    unpause: function(event){
        if(this.game.paused){
            var w = this.game.width,
                h = this.game.height,
                x1 = w/2 - 260/2, x2 = w/2 + 245/2,
                y1 = h/2 - 90/2, y2 = h/2 + 90/2;

            // Check if the click was inside the menu
            if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){
                // Get menu local coordinates for the click
                var x = event.x - x1,
                    y = event.y - y1;

                // Calculate the choice
                var choise = Math.floor(x / 100) + 3*Math.floor(y / 100);
//                var choise = (x / 90)<< 0 + (3 * (y / 90)<< 0);

                // console.log(choise)
                switch (choise) {
                  case 0:
                      this.playGame();
                    break;
                  case 1:
                      this.playGame();
                      this.restart();
                    break;
                  case 2:
                      this.playGame();
                      this.menu();
                    break;
                }
            } else{
                this.playGame();
            }
        }
    },
    /**
     * This method will be called when the state is shut down
     * (i.e. you switch to another state from this one).
     */
    shutdown: function() {
        this.currentTimer.remove();
        // this.zoomTo(1);
    }

  };

  module.exports = Play;
