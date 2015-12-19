'use strict';

var VictoryWindow = function(game, parent, options) {
  Phaser.Group.call(this, game, parent);

  var fontStyle = { font: "40px loudy_With_a_Chance_of_Love", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" };

  this.victoryWindow = this.game.add.image(this.game.width / 2 , this.game.height / 2, 'sprites', 'menu/victory_window');
  this.victoryWindow.anchor.setTo(0.5, 0.5);
  this.victoryWindow.fixedToCamera = true;
  this.add(this.victoryWindow);
  console.log(options)
  this.secondsToFinishLevelText = this.game.add.text(0, 0, options.secondsToFinishLevel, fontStyle);
  this.secondsToFinishLevelText.fixedToCamera = true;
  this.victoryWindow.addChild(this.secondsToFinishLevelText);

  this.restartButton = this.game.add.button(-70, 100, 'sprites', this.restartClick, this, 'buttons/button_restart_act', 'buttons/button_restart_no', 'buttons/button_restart_act', 'buttons/button_restart_no');
  this.victoryWindow.addChild(this.restartButton);

  this.menuButton = this.game.add.button(50, 100, 'sprites', this.menuClick, this, 'buttons/button_menu_act', 'buttons/button_menu_no', 'buttons/button_menu_act', 'buttons/button_menu_no');
  this.victoryWindow.addChild(this.menuButton);
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
