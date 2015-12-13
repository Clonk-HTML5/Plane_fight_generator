'use strict';
  function Help() {}
  Help.prototype = {
    create: function() {
      this.backButton = this.game.add.button(50, this.game.height - 50, 'sprites', this.backClick, this, 'buttons/button_back_act', 'buttons/button_back_no', 'buttons/button_back_act', 'buttons/button_back_no');
      this.backButton.anchor.setTo(0.5);

      this.howToPlayImage = this.game.add.image(this.game.width/2,this.game.height/2,"sprites","menu/helpScreen");
      this.howToPlayImage.anchor.setTo(0.5);

      this.playTutorialButton = this.game.add.button(this.game.width - 50, this.game.height - 50, 'sprites', this.playTutorialClick, this, 'buttons/button_play_act', 'buttons/button_play_no', 'buttons/button_play_act', 'buttons/button_play_no');
      this.playTutorialButton.anchor.setTo(0.5);
    },
    backClick: function() {
//        var fadeMenuOut = this.game.add.tween(this.buttonGroup).to({ x: this.game.width }, 1000, Phaser.Easing.Bounce.In, true);
//        fadeMenuOut.onComplete.add(function() {
      this.game.state.start('menu',true,false);
//        }, this);
    },
    playTutorialClick: function() {
//        var fadeMenuOut = this.game.add.tween(this.buttonGroup).to({ x: this.game.width }, 1000, Phaser.Easing.Bounce.In, true);
//        fadeMenuOut.onComplete.add(function() {
      this.game.state.start('tutorial',true,false);
//        }, this);
    },
  };
module.exports = Help;
