'use strict';

// Create our pause panel extending Phaser.Group
var PausePanel = function(game, parent){
		// Super call to Phaser.Group
		Phaser.Group.call(this, game, parent);

		// Add the panel
		this.panel = this.create(this.game.width/2, 10, 'sprites', 'menu/paused');
		this.panel.anchor.setTo(0.5, 0);
        this.panel.fixedToCamera = true;

		// Add text
		// this.pauseText = this.game.add.text(this.game.width/2 - 100, 20, 'Game paused',{ font: '24px Cloudy_With_a_Chance_of_Love', fill: '#08d465', align: 'center'});
    //     this.pauseText.fixedToCamera = true;
		// this.add(this.pauseText);
		// this.cloudsText = this.game.add.text(this.game.width/2 - 100, 50, 'Press the Play Button to continue',{ font: '16px Cloudy_With_a_Chance_of_Love', fill: '#08d465', align: 'center'});
    //     this.cloudsText.fixedToCamera = true;
		// this.add(this.cloudsText);

		// Place it out of bounds
		this.x = 0;
		this.y = -300;
	};

	PausePanel.prototype = Object.create(Phaser.Group.prototype);
	PausePanel.constructor = PausePanel;

	PausePanel.prototype.show = function(onComplete){
            // Add play button
            this.btnPlay = this.game.add.button(this.game.width/2 - 100, this.panel.height/2 - 20, 'sprites', function(){this.game.state.getCurrentState().playGame()}, this, 'buttons/button_play_act', 'buttons/button_play_no', 'buttons/button_play_act', 'buttons/button_play_no');
						this.restartButton = this.game.add.button(this.game.width/2 -20, this.panel.height/2 - 20, 'sprites', this.game.state.getCurrentState().restart, this, 'buttons/button_restart_new_act', 'buttons/button_restart_new_no', 'buttons/button_restart_new_act', 'buttons/button_restart_new_no');
						this.menuButton = this.game.add.button(this.game.width/2 + 60, this.panel.height/2 - 20, 'sprites', this.game.state.getCurrentState().menu, this, 'buttons/button_menu_new_no', 'buttons/button_menu_new_no', 'buttons/button_menu_new_no', 'buttons/button_menu_new_no');
            this.btnPlay.fixedToCamera = true;
            this.add(this.btnPlay);
            this.restartButton.fixedToCamera = true;
            this.add(this.restartButton);
            this.menuButton.fixedToCamera = true;
            this.add(this.menuButton);
		this.game.add.tween(this).to({y:this.game.height/2}, 200, Phaser.Easing.Bounce.Out, true)
                                 .onComplete.add(onComplete, this.game.state.getCurrentState());
	};
	PausePanel.prototype.hide = function(onComplete){
		var closePauseTween = this.game.add.tween(this).to({y:-this.game.height/2-100}, 200, Phaser.Easing.Linear.NONE, true)
            if(typeof onComplete == 'function')
                closePauseTween._lastChild.onComplete.add(onComplete, this.game.state.getCurrentState());
	};
	PausePanel.prototype.restartClick = function () {
	      this.game.state.restart();
	};
	PausePanel.prototype.menuClick = function () {
	    this.game.state.start('menu',true,false);
	};

module.exports = PausePanel;
