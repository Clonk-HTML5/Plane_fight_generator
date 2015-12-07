'use strict';

var PausePanel = function(game, parent){
		Phaser.Group.call(this, game, parent);

		this.panel = this.create(this.game.width/2, 10, 'sprites', 'menu/paused');
		this.panel.anchor.setTo(0.5, 0,5);
    this.panel.fixedToCamera = true;

		this.x = 0;
		this.y = -300;

		this.gameWidth2 = this.game.width/2;
		this.gameHeight2 = this.game.height/2;
		this.panelHeight2 = this.panel.height/2;
		this.gameHeight2MinusPanelHeight2 = this.gameHeight2 - this.panelHeight2;
	};

	PausePanel.prototype = Object.create(Phaser.Group.prototype);
	PausePanel.constructor = PausePanel;

	PausePanel.prototype.show = function(onComplete){
    this.btnPlay = this.game.add.button(this.gameWidth2 - 100, this.panelHeight2, 'sprites', this.game.state.getCurrentState().playGame, this, 'buttons/button_play_act', 'buttons/button_play_no', 'buttons/button_play_act', 'buttons/button_play_no');
		this.restartButton = this.game.add.button(this.gameWidth2 -20, this.panelHeight2, 'sprites', this.game.state.getCurrentState().restart, this, 'buttons/button_restart_new_act', 'buttons/button_restart_new_no', 'buttons/button_restart_new_act', 'buttons/button_restart_new_no');
		this.menuButton = this.game.add.button(this.gameWidth2 + 60, this.panelHeight2, 'sprites', this.game.state.getCurrentState().menu, this, 'buttons/button_menu_new_no', 'buttons/button_menu_new_no', 'buttons/button_menu_new_no', 'buttons/button_menu_new_no');
    this.btnPlay.fixedToCamera = true;
    this.add(this.btnPlay);
    this.restartButton.fixedToCamera = true;
    this.add(this.restartButton);
    this.menuButton.fixedToCamera = true;
    this.add(this.menuButton);
		this.game.add.tween(this).to({y:this.gameHeight2MinusPanelHeight2}, 200, Phaser.Easing.Bounce.Out, true)
                                 .onComplete.add(onComplete, this.game.state.getCurrentState());
	};
	PausePanel.prototype.hide = function(onComplete){
		var closePauseTween = this.game.add.tween(this).to({y:-this.gameHeight2MinusPanelHeight2}, 200, Phaser.Easing.Linear.NONE, true)
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
