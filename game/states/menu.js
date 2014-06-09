
'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
      this.background = this.game.add.sprite(0, 0, 'menu_bg');
      
    // add our start button with a callback
    this.startButton = this.game.add.button(this.game.width/2, 300, 'singleplayer', this.startClick, this);
    this.startButton.anchor.setTo(0.5,0.5);
    this.startButton.scale.setTo(0.5,0.5);
      
    this.multiplayerButton = this.game.add.button(this.game.width/2, 400, 'multiplayer', this.multiplayerStartClick, this);
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
  },  
  multiplayerStartClick: function() {  
    // start button click handler
    // start the 'play' state
    this.game.state.start('playMultiplayer');
  }
};

module.exports = Menu;
