
'use strict';

  var Level = require('../prefabs/Level');
  var LabelButton = require('../prefabs/labelButton');

function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
//      this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.height, 'menu_bg');

    this.buttonGroup = this.game.add.group();
      this.buttonGroup.x = - this.game.width ;
      this.startButton = this.game.add.button(this.game.width/2, 200, 'sprites', this.startClick, this, 'buttons/button_green_act', 'buttons/button_green_no', 'buttons/button_green_act', 'buttons/button_green_no');
      this.startButton.anchor.setTo(0.5,0.5);
    this.startButton.scale.setTo(0.75,0.75);
    this.buttonGroup.add(this.startButton);
      this.multiplayerButton = this.game.add.button(this.game.width/2, 300, 'sprites', this.multiplayerStartClick, this, 'buttons/button_multiplayer_act', 'buttons/button_multiplayer_no', 'buttons/button_multiplayer_act', 'buttons/button_multiplayer_no');
      this.multiplayerButton.anchor.setTo(0.5,0.5);
    this.multiplayerButton.scale.setTo(0.75,0.75);
      this.buttonGroup.add(this.multiplayerButton);

      this.settingsButton = this.game.add.button(50, this.game.height - 50, 'sprites', this.settingsClick, this, 'buttons/button_settings_act', 'buttons/button_settings_no', 'buttons/button_settings_act', 'buttons/button_settings_no');
      this.settingsButton.anchor.setTo(0.5,0.5);
      this.buttonGroup.add(this.settingsButton);

      this.helpButton = this.game.add.button(150, this.game.height - 50, 'sprites', this.helpClick, this, 'buttons/button_help_act', 'buttons/button_help_no', 'buttons/button_help_act', 'buttons/button_help_no');
      this.helpButton.anchor.setTo(0.5,0.5);
      this.buttonGroup.add(this.helpButton);

      this.game.add.tween(this.buttonGroup).to({ x: 0 }, 1000, Phaser.Easing.Bounce.Out, true);

  },
  update: function() {
  },
  startClick: function() {
    var fadeMenuOut = this.game.add.tween(this.buttonGroup).to({ x: this.game.width }, 1000, Phaser.Easing.Bounce.In, true);
    fadeMenuOut.onComplete.add(function() {
        if(!localStorage.getItem('tutorial_played')){
          localStorage.setItem('tutorial_played', 1);
          this.game.state.start('help');
        } else {
          this.game.state.start('missions');
        }

    }, this);
  },
  multiplayerStartClick: function() {
    var fadeMenuOut = this.game.add.tween(this.buttonGroup).to({ x: this.game.width }, 1000, Phaser.Easing.Bounce.In, true);
    fadeMenuOut.onComplete.add(function() {
        this.game.state.start('multiplayerUserSignIn');
    }, this);
  },
  settingsClick: function() {
    var fadeMenuOut = this.game.add.tween(this.buttonGroup).to({ x: this.game.width }, 1000, Phaser.Easing.Bounce.In, true);
    fadeMenuOut.onComplete.add(function() {
        this.game.state.start('settings');
    }, this);
  },
  helpClick: function() {
    var fadeMenuOut = this.game.add.tween(this.buttonGroup).to({ x: this.game.width }, 1000, Phaser.Easing.Bounce.In, true);
    fadeMenuOut.onComplete.add(function() {
        this.game.state.start('help');
    }, this);
  }
};

module.exports = Menu;
