'use strict';
  var BirdGroup = require('../prefabs/birdGroup');
  var Player = require('../prefabs/Player');
  var EnemyGroup = require('../prefabs/EnemyGroup');
  var Level = require('../prefabs/Level');
  var PausePanel = require('../prefabs/PausePanel');
  var BasicLayer = require('../prefabs/BasicLayer');

  function Tutorial() {}
  Tutorial.prototype = {
    create: function() {
      this.levelJson = this.game.cache.getJSON('levelJson');
      this.currentLevel = this.levelJson.Levels[GlobalGame.level];

      this.level = new Level(this.game, {currentLevel: this.currentLevel});

      this.birdGroup = new BirdGroup(this.game);

      this.player = new Player(this.game, this.currentLevel.playerStart.x, this.currentLevel.playerStart.y, GlobalGame.player);

      this.enemyGroup = new EnemyGroup(this.game, this.player, {currentLevel: this.currentLevel});
      this.enemyGroup.addEnemy();

      this.basicLayer = new BasicLayer(this.game, undefined, {layerText:'Welcome to the Tutorial',subLayerText:'Here you will learn how to play this game.'})
      // this.createPlayers();

      this.pauseButton = this.game.add.button(this.game.width - 100, 20, 'sprites', this.pauseGame, this, 'buttons/button_pause_act', 'buttons/button_pause_no', 'buttons/button_pause_act', 'buttons/button_pause_no');
      this.pauseButton.fixedToCamera = true;
      this.pauseButton.inputEnabled = true;

      this.pausePanel = new PausePanel(this.game);

      this.game.input.onDown.add(this.unpause, this);
    },
    update: function() {
      this.enemyGroup.forEachAlive(function(enemy){
         this.game.physics.arcade.overlap(enemy, this.player.bullets, enemy.enemyLoseHealth, null, enemy);
         this.game.physics.arcade.overlap(this.player, enemy.bullets, this.player.playerHitsSomething, null, this.player);
          if(!enemy.inCamera){
              enemy.arrow.visible = true;
              enemy.arrow.rotation = this.game.physics.arcade.angleBetween(enemy.arrow, enemy);
          }else {
              enemy.arrow.visible = false;
          }
      }, this)
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
    }
  };
module.exports = Tutorial;
