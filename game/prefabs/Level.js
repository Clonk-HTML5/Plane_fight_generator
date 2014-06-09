'use strict';

var Level = function(game, parent) {
  Phaser.Group.call(this, game, parent);

  // initialize your prefab here
    this.game.world.setBounds(0, 0, 4000, 1000);
    //fix background to camera
    this.background = this.game.add.sprite(0, 0, 'sky_new');
    this.background.fixedToCamera = true;
    this.background.cameraOffset.x = 0;
    this.background.cameraOffset.y = 0;

    this.mountains = this.game.add.sprite(0, 482, 'mountains');
    this.mountains2 = this.game.add.sprite(2560, 482, 'mountains');
  
  //  The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.game.add.group();

    var lastGroundYPos = 0,
        treeName,
        tree,
        lastGroundYPos;

    for(var i = 0; i < 25; i++){

        treeName = 'tree'+Math.round(Math.random() * 4);

        var tree = this.game.add.sprite(Math.random() * this.game.world.width, 716, treeName);
        tree.scale.setTo(0.25, 0.25);

        var clouds = this.game.add.sprite(Math.random() * this.game.world.width, Math.random() * this.game.world.height - 400, 'clouds1');
        var clouds2 = this.game.add.sprite(Math.random() * this.game.world.width, Math.random() * this.game.world.height - 400, 'clouds2');
    }

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

Level.prototype = Object.create(Phaser.Group.prototype);
Level.prototype.constructor = Level;

module.exports = Level;
