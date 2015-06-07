'use strict';
  function Settings() {}
  Settings.prototype = {
    preload: function() {
      // Override this method to add some load operations. 
      // If you need to use the loader, you may need to use them here.
    },
    create: function() {
      this.backButton = this.game.add.button(50, this.game.height - 50, 'sprites', this.backClick, this, 'buttons/button_back_act', 'buttons/button_back_no', 'buttons/button_back_act', 'buttons/button_back_no');
      this.backButton.anchor.setTo(0.5);
    },
    backClick: function() {
//        var fadeMenuOut = this.game.add.tween(this.buttonGroup).to({ x: this.game.width }, 1000, Phaser.Easing.Bounce.In, true);
//        fadeMenuOut.onComplete.add(function() {
            this.game.state.start('menu',true,false);
//        }, this);
    },
    update: function() {
      // state update code
    },
    paused: function() {
      // This method will be called when game paused.
    },
    render: function() {
      // Put render operations here.
    },
    shutdown: function() {
      // This method will be called when the state is shut down 
      // (i.e. you switch to another state from this one).
    }
  };
module.exports = Settings;
