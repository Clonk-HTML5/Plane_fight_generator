'use strict';

var BasicLayer = function(game, parent, options) {
  Phaser.Group.call(this, game, parent);

    var layerText = options.layerText ? options.layerText : "Welcome to the Tutorial!";
    var subLayerText = options.subLayerText ? options.subLayerText : "Here you will learn how to play this game.";

    this.b = this.game.add.bitmapData(this.game.width, this.game.height),
    this.b.ctx.fillStyle = "#000",
    this.b.ctx.fillRect(0, 0,  this.game.width, this.game.height);

    this.c = this.create(0, 0, this.b);
    this.c.fixedToCamera = true;
    this.c.alpha = 0.5;

    this.fontStyle = { font: "35px loudy_With_a_Chance_of_Love", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" };
    this.smallerfontStyle = { font: "25px loudy_With_a_Chance_of_Love", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" };
    this.layerText = this.game.add.text(this.game.width/2-200, this.game.height/2 - 100, layerText, this.fontStyle);
    this.layerText.fixedToCamera = true;;
    this.add(this.layerText);
    this.subLayerText = this.game.add.text(this.game.width/2-230, this.game.height/2, subLayerText, this.smallerfontStyle);
    this.subLayerText.fixedToCamera = true;;
    this.add(this.subLayerText);

		this.game.input.onDown.addOnce(function(){
      this.hide(true);
		}, this);

};

BasicLayer.prototype = Object.create(Phaser.Group.prototype);
BasicLayer.prototype.constructor = BasicLayer;

BasicLayer.prototype.show = function () {
  this.y = 0;
};

BasicLayer.prototype.hide = function (createPlayers) {
  if(createPlayers) {
    this.game.state.getCurrentState().createPlayers();
  }
  this.y = -this.game.world.height;
};

module.exports = BasicLayer;
