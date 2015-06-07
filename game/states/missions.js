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
        // array with finished levels and stars collected.
        // 0 = playable yet unfinished level
        // 1, 2, 3 = level finished with 1, 2, 3 stars
        // 4 = locked
        this.starsArray = [0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4];

        // how many pages are needed to show all levels?
        this.pages;
        // group where to place all level thumbnails
        this.levelThumbsGroup;
        // current page
        this.currentPage;
        // arrows to navigate through level pages
        this.leftArrow;
        this.rightArrow;
        // how many pages are needed to show all levels?
		// CAUTION!! EACH PAGE SHOULD HAVE THE SAME AMOUNT OF LEVELS, THAT IS
		// THE NUMBER OF LEVELS *MUST* BE DIVISIBLE BY THUMBCOLS*THUMBROWS
  		this.pages = this.starsArray.length/(this.thumbRows*this.thumbCols);
  		// current page according to last played level, if any
		this.currentPage = Math.floor(GlobalGame.level/(this.thumbRows*this.thumbCols));
		if(this.currentPage>this.pages-1){
			this.currentPage = this.pages-1;
		}
		// left arrow button, to turn one page left
		this.leftArrow = this.game.add.button(50,this.game.height/2,"sprites",this.arrowClicked,this, 'missions/small_arrow_left_act', 'missions/small_arrow_left_no', 'missions/small_arrow_left_act', 'missions/small_arrow_left_no');
		this.leftArrow.anchor.setTo(0.5);
        this.leftArrow.name = "leftArrow";
		// can we turn one page left?
		if(this.currentPage==0){
			this.leftArrow.alpha = 0.3;
		}
		// right arrow button, to turn one page right
		this.rightArrow = this.game.add.button(this.game.width - 50,this.game.height/2,"sprites",this.arrowClicked,this, 'missions/small_arrow_right_act', 'missions/small_arrow_right_no', 'missions/small_arrow_right_act', 'missions/small_arrow_right_no');
		this.rightArrow.anchor.setTo(0.5);
        this.rightArrow.name = "rightArrow";
		// can we turn one page right?
		if(this.currentPage==this.pages-1){
			this.rightArrow.alpha = 0.3;
		}
		// creation of the thumbails group
		this.levelThumbsGroup = this.game.add.group();
        this.levelThumbsGroup.x = - this.game.width ;
		// determining level thumbnails width and height for each page
		var levelLength = this.thumbWidth*this.thumbCols+this.thumbSpacing*(this.thumbCols-1);
		var levelHeight = this.thumbWidth*this.thumbRows+this.thumbSpacing*(this.thumbRows-1);
		// looping through each page
		for(var l = 0; l < this.pages; l++){
			// horizontal offset to have level thumbnails horizontally centered in the page
			var offsetX = (this.game.width-levelLength)/2+this.game.width*l;
			// I am not interested in having level thumbnails vertically centered in the page, but
			// if you are, simple replace my "20" with
			// (game.height-levelHeight)/2
//			var offsetY = 120;
			var offsetY = (this.game.height-levelHeight)/2;
			// looping through each level thumbnails
		     for(var i = 0; i < this.thumbRows; i ++){
		     	for(var j = 0; j < this.thumbCols; j ++){  
		     		// which level does the thumbnail refer?
					var levelNumber = i*this.thumbCols+j+l*(this.thumbRows*this.thumbCols);
					// adding the thumbnail, as a button which will call thumbClicked function if clicked   		
					var levelThumb = this.game.add.button(offsetX+j*(this.thumbWidth+this.thumbSpacing), offsetY+i*(this.thumbHeight+this.thumbSpacing), "sprites", this.thumbClicked, this);	
                    var frame = "missions/level_thumb_frame_"+this.starsArray[levelNumber];
					// shwoing proper frame
					levelThumb.frameName = frame;
					// custom attribute 
					levelThumb.levelNumber = levelNumber+1;
					// adding the level thumb to the group
					this.levelThumbsGroup.add(levelThumb);
					// if the level is playable, also write level number
					if(this.starsArray[levelNumber]<4){
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
		// scrolling thumbnails group according to level position
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
		// touching right arrow and still not reached last page
		if(button.name=="rightArrow" && this.currentPage<this.pages-1){
			this.leftArrow.alpha = 1;
			this.currentPage++;
			// fade out the button if we reached last page
			if(this.currentPage == this.pages-1){
				button.alpha = 0.3;
			}
			// scrolling level pages
			var buttonsTween = this.game.add.tween(this.levelThumbsGroup);
			buttonsTween.to({
				x: this.currentPage * this.game.width * -1
			}, 500, Phaser.Easing.Cubic.None);
			buttonsTween.start();
		}
		// touching left arrow and still not reached first page
		if(button.name=="leftArrow" && this.currentPage>0){
			this.rightArrow.alpha = 1;
			this.currentPage--;
			// fade out the button if we reached first page
			if(this.currentPage == 0){
				button.alpha = 0.3;
			}
			// scrolling level pages
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
