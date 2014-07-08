'use strict';

// Create our pause panel extending Phaser.Group
var PausePanel = function(game, parent){
		// Super call to Phaser.Group
		Phaser.Group.call(this, game, parent);

		// Add the panel
		this.panel = this.create(this.game.width/2, 10, 'panel');
		this.panel.anchor.setTo(0.5, 0);
        this.panel.fixedToCamera = true;

		// Add text
//		this.pauseText = this.game.add.bitmapText(this.game.width/2 - 100, 20, 'kenpixelblocks', 'Game paused', 24);
		this.pauseText = this.game.add.text(this.game.width/2 - 100, 20, 'Game paused',{ font: '24px Arial', fill: '#08d465', align: 'center'});
        this.pauseText.fixedToCamera = true;
		this.add(this.pauseText);
//		this.cloudsText = this.game.add.bitmapText(this.game.width/2 - 100, 50, 'kenpixelblocks', 'Clouds are still moving :)', 16);
		this.cloudsText = this.game.add.text(this.game.width/2 - 100, 50, 'Clouds are still moving :)',{ font: '16px Arial', fill: '#08d465', align: 'center'});
        this.cloudsText.fixedToCamera = true;
		this.add(this.cloudsText);

		// Place it out of bounds
		this.x = 0;
		this.y = -100;
	};

	PausePanel.prototype = Object.create(Phaser.Group.prototype);
	PausePanel.constructor = PausePanel;

	PausePanel.prototype.show = function(onComplete){
            // Add play button
            this.btnPlay = this.game.add.button(this.game.width/2 - 220, 20, 'btnplay', function(){
                this.game.state.getCurrentState().playGame()}
            , this);
            this.btnPlay.fixedToCamera = true;
            this.add(this.btnPlay);
		this.game.add.tween(this).to({y:this.game.height/2}, 100, Phaser.Easing.Bounce.Out, true)._lastChild.onComplete.add(onComplete, this.game.state.getCurrentState());
	};
	PausePanel.prototype.hide = function(onComplete){
		var closePauseTween = this.game.add.tween(this).to({y:-this.game.height/2-100}, 200, Phaser.Easing.Linear.NONE, true)
            if(typeof onComplete == 'function')
                closePauseTween._lastChild.onComplete.add(onComplete, this.game.state.getCurrentState());
	};

module.exports = PausePanel;
