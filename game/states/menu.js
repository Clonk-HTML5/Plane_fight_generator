
'use strict';

  var BirdGroup = require('../prefabs/birdGroup');  
  var EnemyPlaneGroup = require('../prefabs/EnemyPlaneGroup');  
  var Level = require('../prefabs/Level');
  var LabelButton = require('../prefabs/labelButton');

function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
      this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.cache.getImage('menu_bg').height, 'menu_bg');
      
          // new Level Object
//    this.level = new Level(this.game, {menu: true});

    // Create a new bird object
//    this.birdGroup = new BirdGroup(this.game);

    // Create a new bird object
//    this.enemyPlaneGroup = new EnemyPlaneGroup(this.game, this.player, {menu: true});
    this.buttonGroup = this.game.add.group();
//    this.button = new LabelButton(this.game, this.game.width/2, 200, 'sprites', 'Singleplayer', this.singleplayerClick, this, 'buttons/button_green_act', 'buttons/button_green_no', 'buttons/button_green_act', 'buttons/button_green_no');
      this.startButton = this.game.add.button(this.game.width/2, 200, 'sprites', this.startClick, this, 'buttons/button_green_act', 'buttons/button_green_no', 'buttons/button_green_act', 'buttons/button_green_no');
      this.startButton.anchor.setTo(0.5,0.5);
    this.startButton.scale.setTo(0.75,0.75);
    this.buttonGroup.add(this.startButton);
      this.multiplayerButton = this.game.add.button(this.game.width/2, 300, 'sprites', this.multiplayerStartClick, this, 'buttons/button_multiplayer_act', 'buttons/button_multiplayer_no', 'buttons/button_multiplayer_act', 'buttons/button_multiplayer_no');
      this.multiplayerButton.anchor.setTo(0.5,0.5);
    this.multiplayerButton.scale.setTo(0.75,0.75);
      this.buttonGroup.add(this.multiplayerButton); 
  },
  update: function() {
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
