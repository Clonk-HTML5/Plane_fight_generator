'use strict';

var BasicLayer = function(game, parent, layerText) {
  Phaser.Group.call(this, game, parent);

  // initialize your prefab here

    this.y = -1000;

    this.layerText = layerText ? layerText : "Click to play";

   // Alpha Layer
    this.b = this.game.add.bitmapData(this.game.world.width, this.game.world.height),
    this.b.ctx.fillStyle = "#000",
    this.b.ctx.fillRect(0, 0,  this.game.world.width, this.game.world.height);

    this.c = this.game.add.sprite(0, 0, this.b);
    this.c.alpha = 0.5;
    this.add(this.c);

    this.fontStyle = { font: "40px loudy_With_a_Chance_of_Love", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" };
//    this.scoreText = this.game.add.text(this.game.width/2-200, this.game.height/2, this.layerText, this.fontStyle);
//    this.add(this.scoreText);

    this.defeatWindow = this.game.add.image(this.game.width / 2, 50, 'sprites', 'menu/defeat_window');
    this.defeatWindow.anchor.setTo(0.5, 0)
    this.add(this.defeatWindow);

    this.restartButton = this.game.add.button(-50, this.defeatWindow.height-100, 'sprites', this.restartClick, this, 'buttons/button_restart_act', 'buttons/button_restart_no', 'buttons/button_restart_act', 'buttons/button_restart_no');
//    this.restartButton.anchor.setTo(0.5,0.5);
    this.defeatWindow.addChild(this.restartButton);

    this.menuButton = this.game.add.button(50, this.defeatWindow.height-100, 'sprites', this.menuClick, this, 'buttons/button_menu_act', 'buttons/button_menu_no', 'buttons/button_menu_act', 'buttons/button_menu_no');
//    this.menuButton.anchor.setTo(0.5,0.5);
    this.defeatWindow.addChild(this.menuButton);

     this.game.add.tween(this).to({x:this.game.camera.x * GlobalGame.scale ,y:this.game.camera.y * GlobalGame.scale}, 550, Phaser.Easing.Back.Out, true);
//            basicLayerTween._lastChild.onComplete.add(function(){this.game.paused = true;}, this.game.state.getCurrentState());

    // set event listener for the user's click/tap the screen
//		this.game.input.onDown.add(function(){
//            console.log(this)
//            this.game.state.getCurrentState().createPlayers();
//            this.destroy();
//		}, this);

};

BasicLayer.prototype = Object.create(Phaser.Group.prototype);
BasicLayer.prototype.constructor = BasicLayer;

BasicLayer.prototype.update = function() {

//    if(this.game.input.activePointer.justPressed()) {
//      this.game.state.getCurrentState().createPlayers();
//      this.destroy();
//      this.removeAll();
//    }

  // write your prefab's specific update code here

};

BasicLayer.prototype.restartClick = function () {
      // this.game.state.getCurrentState().createPlayers();
      // this.destroy();
      this.game.state.restart();
//      this.removeAll();
};
BasicLayer.prototype.menuClick = function () {
//    this.destroy();
//    this.removeAll();
    this.game.state.start('menu',true,false);
};

module.exports = BasicLayer;
