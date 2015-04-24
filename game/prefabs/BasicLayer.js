'use strict';

var BasicLayer = function(game, parent, layerText) {
  Phaser.Group.call(this, game, parent);

  // initialize your prefab here
    
    this.y = -1000;
    
    this.layerText = layerText ? layerText : "Click to play";
    
   // Alpha Layer
    this.b = this.game.add.bitmapData(this.game.width, this.game.height),
    this.b.ctx.fillStyle = "#000", 
    this.b.ctx.fillRect(0, 0,  this.game.width, this.game.height);
    
    this.c = this.game.add.sprite(0, 0, this.b);
    this.c.alpha = 0.5;
    this.add(this.c);

    this.fontStyle = { font: "40px Arial", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" };
    this.scoreText = this.game.add.text(this.game.width/2-200, this.game.height/2, this.layerText, this.fontStyle);
    this.add(this.scoreText);

     this.game.add.tween(this).to({x:this.game.camera.x ,y:this.game.camera.y}, 550, Phaser.Easing.Back.Out, true);
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
    
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.getCurrentState().createPlayers();
      this.destroy();
      this.removeAll();
    }
  
  // write your prefab's specific update code here
  
};

module.exports = BasicLayer;
