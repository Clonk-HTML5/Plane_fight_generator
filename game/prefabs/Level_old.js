'use strict';

var Level = function(game, options) {
  Phaser.Group.call(this, game);

    this.options = options ? options : false;
    
  // initialize your prefab here
    if(!this.options.menu){
//        this.game.world.setBounds(0, 0, 4000, 1000);
        this.game.world.setBounds(0, 0, 3000, 1000);
    }else{
        this.game.world.setBounds(0, 0, 1280, 1000);
    }
    //fix background to camera
    this.background = this.game.add.sprite(0, 0, 'sprites', 'level/sky_new');
    this.background.fixedToCamera = true;
    this.background.cameraOffset.x = 0;
    this.background.cameraOffset.y = 0;

    this.mountains = this.game.add.image(0, 482, 'sprites', 'level/mountains');
    if(!this.options.menu){
        this.mountains2 = this.game.add.image(2560, 482, 'sprites', 'level/mountains');
    }
  
  //  The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.game.add.group();

    var lastGroundYPos = 0,
        treeName,
        tree,
        maxElements = 20,
        lastGroundYPos;

    if(this.options.menu)
        maxElements = 5;
        
    for(var i = 0; i < maxElements; i++){

        treeName = 'tree_'+Math.round(Math.random() * 3);

        var tree = this.game.add.image(Math.random() * this.game.world.width, 716, 'sprites', 'level/trees/'+treeName);
        tree.scale.setTo(0.25, 0.25);

        this.clouds = this.game.add.sprite(this.game.rnd.integerInRange(0, this.game.world.width), this.game.rnd.integerInRange(0, this.game.world.height - 400), 'sprites', 'level/cloud_fluffy_1');
        if(this.game.device.desktop){
            this.clouds.anchor.setTo(0.5, 0);
            // Kill the cloud when out of bounds
            this.clouds.checkWorldBounds = true;
            this.clouds.outOfBoundsKill = true;

            // Move clouds
            this.game.physics.arcade.enableBody(this.clouds);
            this.clouds.body.allowGravity = false;
            this.clouds.body.velocity.x = -this.game.rnd.integerInRange(15, 30); 
         }
        
        this.clouds2 = this.game.add.sprite(this.game.rnd.integerInRange(0, this.game.world.width), this.game.rnd.integerInRange(0, this.game.world.height - 400), 'sprites', 'level/cloud_fluffy_2');
         if(this.game.device.desktop){
            this.clouds2.anchor.setTo(0.5, 0);
            // Kill the cloud when out of bounds
            this.clouds2.checkWorldBounds = true;
            this.clouds2.outOfBoundsKill = true;

            // Move clouds
            this.game.physics.arcade.enableBody(this.clouds2);
            this.clouds2.body.allowGravity = false;
            this.clouds2.body.velocity.x = -this.game.rnd.integerInRange(15, 30);
         }
    }

    while (lastGroundYPos < this.game.world.width){
        // Here we create the ground.
        var ground = this.platforms.create(lastGroundYPos, this.game.world.height - 132, 'sprites', 'level/crosssection_long_new');
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
Level.prototype.update = function() {
//   write your prefab's specific update code here
};

module.exports = Level;
