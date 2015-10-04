'use strict';
  function Missions() {}
  Missions.prototype = {
    create: function() {
//        this.background = this.game.add.sprite(0, 0, this.game.world.width, this.game.height, 'menu_bg');

        this.thumbRows = 2;
        // number of thumbnail cololumns
        this.thumbCols = 3;
        // width of a thumbnail, in pixels
        this.thumbWidth = 120;
        // height of a thumbnail, in pixels
        this.thumbHeight = 120;
        // space among thumbnails, in pixels
        this.thumbSpacing = 8;

        if(!localStorage.getItem('levels')){
          this.levelJson = this.game.cache.getJSON('levelJson');
          this.localStorageLevel = {};
          for(var level in this.levelJson.Levels){
             this.localStorageLevel[level] = level == 1 ? 0 : 4;
          }
          localStorage.setItem('levels', JSON.stringify(this.localStorageLevel));
        }
        this.levelsLocalStorageObject = JSON.parse(localStorage.getItem('levels'));

        /**
        /* object with finished levels and stars collected.
        /* 0 = playable yet unfinished level
        /* 1, 2, 3 = level finished with 1, 2, 3 stars
        /* 4 = locked
        */
        // this.starsArray = [0,3,2,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4];
        this.starsArray = this.levelsLocalStorageObject;

        this.pages;

        this.levelThumbsGroup;

        this.currentPage;

        this.leftArrow;
        this.rightArrow;

  		// this.pages = this.starsArray.length/(this.thumbRows*this.thumbCols);
		this.pages = Object.keys(this.starsArray).length/(this.thumbRows*this.thumbCols);

		this.currentPage = Math.floor(GlobalGame.level/(this.thumbRows*this.thumbCols));
		if(this.currentPage>this.pages-1){
			this.currentPage = this.pages-1;
		}

		this.leftArrow = this.game.add.button(50,this.game.height/2,"sprites",this.arrowClicked,this, 'missions/small_arrow_left_act', 'missions/small_arrow_left_no', 'missions/small_arrow_left_act', 'missions/small_arrow_left_no');
		this.leftArrow.anchor.setTo(0.5);
    this.leftArrow.name = "leftArrow";

		if(this.currentPage==0){
			this.leftArrow.alpha = 0.3;
		}

		this.rightArrow = this.game.add.button(this.game.width - 50,this.game.height/2,"sprites",this.arrowClicked,this, 'missions/small_arrow_right_act', 'missions/small_arrow_right_no', 'missions/small_arrow_right_act', 'missions/small_arrow_right_no');
		this.rightArrow.anchor.setTo(0.5);
    this.rightArrow.name = "rightArrow";

		if(this.currentPage==this.pages-1){
			this.rightArrow.alpha = 0.3;
		}

		this.levelThumbsGroup = this.game.add.group();
    this.levelThumbsGroup.x = - this.game.width;

		var levelLength = this.thumbWidth*this.thumbCols+this.thumbSpacing*(this.thumbCols-1);
		var levelHeight = this.thumbWidth*this.thumbRows+this.thumbSpacing*(this.thumbRows-1);

		for(var l = 0; l < this.pages; l++){

			var offsetX = (this.game.width-levelLength)/2+this.game.width*l;

			// (game.height-levelHeight)/2
//			var offsetY = 120;
			var offsetY = (this.game.height-levelHeight)/2;

		     for(var i = 0; i < this.thumbRows; i ++){
		     	for(var j = 0; j < this.thumbCols; j ++){

					var levelNumber = i*this.thumbCols+j+l*(this.thumbRows*this.thumbCols);

					var levelThumb = this.game.add.button(offsetX+j*(this.thumbWidth+this.thumbSpacing), offsetY+i*(this.thumbHeight+this.thumbSpacing), "sprites", this.thumbClicked, this);
          if(typeof this.starsArray[levelNumber+1] !== 'undefined'){
            var frame = "missions/level_thumb_frame_"+this.starsArray[levelNumber+1];
  					levelThumb.frameName = frame;
  					levelThumb.levelNumber = levelNumber+1;
  					this.levelThumbsGroup.add(levelThumb);
          }
					if(this.starsArray[levelNumber+1]<4){
						var style = {
							font: "60px Cloudy_With_a_Chance_of_Love",
							fill: "#ffffff"
						};
						var levelText = this.game.add.text(levelThumb.x+50,levelThumb.y+this.thumbHeight/2-50,levelNumber+1,style);
						levelText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 1);
						this.levelThumbsGroup.add(levelText);
					}
				}
			}
		}
//		this.levelThumbsGroup.x = this.currentPage * this.game.width * -1;

      this.ribbon = this.game.add.image(this.game.width / 2, 50, 'sprites', 'menu/ribbon');
      this.ribbon.anchor.setTo(0.5);
      this.ribbon.scale.setTo(0.75);

        this.ribbonText = this.game.add.text(-200,-40,"Mission Select",style);
        this.ribbonText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 1);
        this.ribbon.addChild(this.ribbonText);


      this.backButton = this.game.add.button(50, this.game.height - 50, 'sprites', this.backClick, this, 'buttons/button_back_act', 'buttons/button_back_no', 'buttons/button_back_act', 'buttons/button_back_no');
      this.backButton.anchor.setTo(0.5);

      this.game.add.tween(this.levelThumbsGroup).to({ x: this.currentPage * this.game.width * -1 }, 800, Phaser.Easing.Cubic.None, true);

    },
    arrowClicked:function(button){
		if(button.name=="rightArrow" && this.currentPage<this.pages-1){
			this.leftArrow.alpha = 1;
			this.currentPage++;

			if(this.currentPage == this.pages-1){
				button.alpha = 0.3;
			}

			var buttonsTween = this.game.add.tween(this.levelThumbsGroup);
			buttonsTween.to({
				x: this.currentPage * this.game.width * -1
			}, 500, Phaser.Easing.Cubic.None);
			buttonsTween.start();
		}

		if(button.name=="leftArrow" && this.currentPage>0){
			this.rightArrow.alpha = 1;
			this.currentPage--;

			if(this.currentPage == 0){
				button.alpha = 0.3;
			}

			var buttonsTween = this.game.add.tween(this.levelThumbsGroup);
			buttonsTween.to({
				x: this.currentPage * this.game.width * -1
			}, 400, Phaser.Easing.Cubic.None);
			buttonsTween.start();
		}
	},
	thumbClicked: function(button){
		if(button.frameName.replace("missions/level_thumb_frame_", "") < 4){
			GlobalGame.level = button.levelNumber;
            var fadeMenuOut = this.game.add.tween(this.levelThumbsGroup).to({ x: this.game.width }, 800, Phaser.Easing.Cubic.None, true);
            fadeMenuOut.onComplete.add(function() {
                this.game.state.start('play');
            }, this);
		}
		else{
			var buttonTween = this.game.add.tween(button)
			buttonTween.to({
				alpha: 0.5
			}, 20, Phaser.Easing.Cubic.None);
			buttonTween.to({
				alpha: 1
			}, 20, Phaser.Easing.Cubic.None);
			buttonTween.to({
				alpha: 0.5
			}, 20, Phaser.Easing.Cubic.None);
			buttonTween.to({
				alpha: 1
			}, 20, Phaser.Easing.Cubic.None);
			buttonTween.start();
		}
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
module.exports = Missions;
