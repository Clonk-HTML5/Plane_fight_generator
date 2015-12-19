'use strict';

var phaseSlider = require('../plugins/phase-slide.js');

  function SelectPlane() {}
  SelectPlane.prototype = {
    init: function(isMultiplayer) {
      this.isMultiplayer = isMultiplayer ? true : false;
    },
    preload: function() {
      this.slider = new phaseSlider(this.game); //make sure to have slider publicly available
    },
    create: function() {

      this.sliderWidth = 600;
      this.sliderHeight = 400;

      this.sliderWidth2 = this.sliderWidth / 2;
      this.sliderHeight2 = this.sliderHeight / 2;

      this.AEG_C_IV_Skin_1 = this.game.add.image(this.sliderWidth2,this.sliderHeight2,"airplanes","Airplanes/AEG_C_IV/Skin_1/default_big");
      this.AEG_C_IV_Skin_1.anchor.setTo(-0.5, 0.5);
      this.AEG_C_IV_Skin_2 = this.game.add.image(this.sliderWidth2,this.sliderHeight2,"airplanes","Airplanes/AEG_C_IV/Skin_2/default_big");
      this.AEG_C_IV_Skin_2.anchor.setTo(-0.5, 0.5);
      this.Fokker_Skin_1 = this.game.add.image(this.sliderWidth2,this.sliderHeight2,"airplanes","Airplanes/Fokker/Skin_1/default_big");
      this.Fokker_Skin_1.anchor.setTo(-0.5, 0.5);
      this.Fokker_Skin_2 = this.game.add.image(this.sliderWidth2,this.sliderHeight2,"airplanes","Airplanes/Fokker/Skin_2/default_big");
      this.Fokker_Skin_2.anchor.setTo(-0.5, 0.5);

      this.planeArray = [this.AEG_C_IV_Skin_1, this.AEG_C_IV_Skin_2, this.Fokker_Skin_1, this.Fokker_Skin_2];

      this.slider.createSlider({
        customSliderBG: false,
        // sliderBG: '#35d2e0',
        mode: "horizontal",
        sliderBGAlpha: 0.7,
        modal: true,
        modalAlpha: 0.7,
        customHandleFrame: "sprites",
        customHandleNext: "missions/small_arrow_right_no",
        customHandlePrev: "missions/small_arrow_left_no",
        width: this.sliderWidth,
        height: this.sliderHeight,
        x: this.game.width / 2 - this.sliderWidth2,
        y: this.game.height / 2 - this.sliderHeight2,
        objects:this.planeArray
      });

      this.acceptButton = this.game.add.image((this.game.width/2 - 80/2), (this.game.height / 2 - 80 / 2)+180, "sprites", "buttons/button_accept_no");
      this.acceptButton.inputEnabled = true;
      this.acceptButton.events.onInputDown.add(function (e, pointer) {
        var index = this.slider.getCurrentIndex();
        GlobalGame.player = this.planeArray[index].frameName.replace("_big", "");
        if(GlobalGame.multiplayer.socket) {
          GlobalGame.multiplayer.enemySprite = GlobalGame.player;
        }
          
        if(this.isMultiplayer) {
          this.game.state.start('playMultiplayer');
        } else {
          this.game.state.start('play');
        }
      },this);


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
module.exports = SelectPlane;
