'use strict';

var VictoryWindow = function(game, parent, options) {
  Phaser.Group.call(this, game, parent);

  this.fontStyle = { font: "40px loudy_With_a_Chance_of_Love", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" };

  this.defeatWindow = this.game.add.image(this.game.width / 2 , this.game.height / 2, 'sprites', 'menu/victory_window');
  this.defeatWindow.anchor.setTo(0.5, 0.5);
  this.defeatWindow.fixedToCamera = true;
  this.add(this.defeatWindow);
  console.log(options)
  this.secondsToFinishLevel = this.game.add.text()
  this.defeatWindow.addChild(this.secondsToFinishLevel);

  this.restartButton = this.game.add.button(-70, 100, 'sprites', this.restartClick, this, 'buttons/button_restart_act', 'buttons/button_restart_no', 'buttons/button_restart_act', 'buttons/button_restart_no');
  this.defeatWindow.addChild(this.restartButton);

  this.menuButton = this.game.add.button(50, 100, 'sprites', this.menuClick, this, 'buttons/button_menu_act', 'buttons/button_menu_no', 'buttons/button_menu_act', 'buttons/button_menu_no');
  this.defeatWindow.addChild(this.menuButton);
};

VictoryWindow.prototype = Object.create(Phaser.Group.prototype);
VictoryWindow.prototype.constructor = VictoryWindow;

VictoryWindow.prototype.restartClick = function () {
    this.game.state.restart();
};
VictoryWindow.prototype.menuClick = function () {
    this.game.state.start('menu',true,false);
};

module.exports = VictoryWindow;
