'use strict';

var BasicLayer = function(game, parent) {
  Phaser.Group.call(this, game, parent);

  // initialize your prefab here
    
   // Alpha Layer
    this.b = this.game.add.bitmapData(this.game.width, this.game.height),
    this.b.ctx.fillStyle = "#000", 
    this.b.ctx.fillRect(0, 0,  this.game.width, this.game.height);
    
    this.c = this.game.add.sprite(0, 0, this.b);
    this.c.alpha = .5;
    this.add(this.c);
    
        var button1 = this.game.add.button(this.game.width/2,100, 'singleplayer', this.game.state.getCurrentState().createPlayers,this.game.state.getCurrentState(),0,0,1);
        button1.anchor.setTo(0.5,0.5);
        button1.scale.setTo(.5,.5);
        var button2 = this.game.add.button(this.game.width/2,210, 'multiplayer', this.game.state.getCurrentState().createPlayers,this.game.state.getCurrentState(),0,0,1);
        button2.anchor.setTo(0.5,0.5);
        button2.scale.setTo(.5,.5);
        var button3 = this.game.add.button(this.game.width/2,310, 'singleplayer', this.game.state.getCurrentState().createPlayers,this.game.state.getCurrentState(),0,0,1);
        button3.anchor.setTo(0.5,0.5);
        button3.scale.setTo(.5,.5);
        this.add(button1);
        this.add(button2);
        this.add(button3);
        this.y = -500;
    
         this.game.add.tween(this).to({y:0}, 2000, Phaser.Easing.Back.Out, true);
//            basicLayerTween._lastChild.onComplete.add(function(){this.game.paused = true;}, this.game.state.getCurrentState());
  
};

BasicLayer.prototype = Object.create(Phaser.Group.prototype);
BasicLayer.prototype.constructor = BasicLayer;

BasicLayer.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = BasicLayer;
