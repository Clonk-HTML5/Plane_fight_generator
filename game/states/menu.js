
'use strict';

  var BirdGroup = require('../prefabs/birdGroup');  
  var EnemyPlaneGroup = require('../prefabs/EnemyPlaneGroup');  
  var Level = require('../prefabs/Level');

function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      			this.game.scale.pageAlignHorizontally = true;
			this.game.scale.pageAlignVertically = true;

      
//      this.background = this.game.add.sprite(0, 0, 'menu_bg');
      
          // new Level Object
//    this.level = new Level(this.game, {menu: true});

    // Create a new bird object
//    this.birdGroup = new BirdGroup(this.game);

    // Create a new bird object
//    this.enemyPlaneGroup = new EnemyPlaneGroup(this.game, this.player, {menu: true});
      
    // add our start button with a callback
    this.startButton = this.game.add.button(this.game.width/2, 200, 'sprites', this.startClick, this, 'menu/Singleplayer', 'menu/Singleplayer', 'menu/Singleplayer', 'menu/Singleplayer');
    this.startButton.anchor.setTo(0.5,0.5);
    this.startButton.scale.setTo(0.5,0.5);
      
    this.multiplayerButton = this.game.add.button(this.game.width/2, 300, 'sprites', this.multiplayerStartClick, this, 'menu/Multiplayer', 'menu/Multiplayer', 'menu/Multiplayer', 'menu/Multiplayer');
    this.multiplayerButton.anchor.setTo(0.5,0.5);
    this.multiplayerButton.scale.setTo(0.5,0.5);
      
  },
  update: function() {
//    if(this.game.input.activePointer.justPressed()) {
//      this.game.state.start('play');
//    }
  },
  startClick: function() {  
    // start button click handler
    // start the 'play' state
    this.game.state.start('play');
//      this.game.transitions.to('play');
  },  
  multiplayerStartClick: function() {  
    // start button click handler
    // start the 'play' state
    this.game.state.start('multiplayerUserSignIn');
//    this.game.state.start('playMultiplayer');
//      this.game.transitions.to('multiplayerUserSignIn');
//      this.game.transitions.to('playMultiplayer');
  }
};

module.exports = Menu;
