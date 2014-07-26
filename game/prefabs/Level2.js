'use strict';

var Level2 = function(game, parent) {
   Phaser.Group.call(this, game, parent);

    this.game.world.setBounds(0, 0, 8000, 2000);
    //fix background to camera
    this.background = this.game.add.sprite(0, 0, 'sky_new');
    this.background.fixedToCamera = true;
    this.background.cameraOffset.x = 0;
    this.background.cameraOffset.y = 0;
  
    //  The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.game.add.group();
    var lastGroundYPos = 0
    
    while (lastGroundYPos < this.game.world.width){
        // Here we create the ground.
        var ground = this.platforms.create(lastGroundYPos, this.game.world.height - 132, 'ground');
        ground.scale.setTo(1, 1);
        ground.name = 'ground';
        this.game.physics.enable(ground, Phaser.Physics.ARCADE);
        //  This stops it from falling away when you jump on it
        ground.body.immovable = true; 

        lastGroundYPos += ground.width;
    }
};

Level2.prototype = Object.create(Phaser.Group.prototype);
Level2.prototype.constructor = Level2;

Level2.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Level2;
