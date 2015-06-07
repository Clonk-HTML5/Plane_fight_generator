'use strict';

var LabelButton = function(game, x, y, key, label, callback, callbackContext, overFrame, outFrame, downFrame, upFrame) {
    Phaser.Button.call(this, game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);
 
    //Style how you wish...
    this.style = {
        'font': '30px Arial',
        'fill': 'white'
    };
    this.anchor.setTo( 0.5, 0.5 );

//    this.label = new Phaser.Text(this.game, 0, 0, label, this.style);
//    this.label.anchor.setTo( 0, 0.5 );
//    this.addChild(this.label);
//    this.setLabel( label );
 

  
};

LabelButton.prototype = Object.create(Phaser.Button.prototype);
LabelButton.prototype.constructor = LabelButton;

LabelButton.prototype.setLabel = function( label ) {
    
   this.label.setText(label);
 
};

module.exports = LabelButton;
