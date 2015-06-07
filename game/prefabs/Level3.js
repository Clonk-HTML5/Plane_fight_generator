'use strict';

var Level3 = function(game, options) {
  Phaser.Group.call(this, game);

  this.options = options ? options : false;

  this.game.world.setBounds(0, 0, 3000, this.game.cache.getImage('bg1').height);

  this.bgtile = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.cache.getImage('bg1').height, 'bg1');
//  this.bgtile.fixedToCamera = true;
  this.bgtile.autoScroll(50, 0);

  this.mountaintile = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.cache.getImage('treesMountain1').height, 'treesMountain1');
//  this.mountaintile.fixedToCamera = true;
    
  var maxElements = 20;

  for (var i = 0; i < maxElements; i++) {
    this.clouds = this.game.add.sprite(this.game.rnd.integerInRange(0, this.game.world.width), this.game.rnd.integerInRange(0, this.game.world.height - 400), 'sprites', 'level/cloud_fluffy_1');
    if (this.game.device.desktop) {
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
    if (this.game.device.desktop) {
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
    
    this.platforms = this.game.add.group();
//    this.groundtile = this.game.add.tileSprite(0, this.game.world.height - 132, this.game.world.width, this.game.cache.getImage('bg1').height, 'sprites', 'level/crosssection_long_new');
    this.groundtile = this.game.add.tileSprite(0, this.game.world.height - this.game.cache.getImage('ground').height, this.game.world.width, this.game.cache.getImage('ground').height, 'ground');
    this.groundtile.name = 'ground';
    this.game.physics.enable(this.groundtile, Phaser.Physics.ARCADE);
    this.groundtile.body.immovable = true; 
    this.platforms.add(this.groundtile)
};

Level3.prototype = Object.create(Phaser.Group.prototype);;
Level3.prototype.constructor = Level3;

Level3.prototype.update = function() {
//    this.bgtile.tilePosition.x = this.game.state.getCurrentState().player.x;
//    this.bgtile.tilePosition.y = this.game.state.getCurrentState().player.y;
//    
//    this.mountaintile.tilePosition.x = this.game.state.getCurrentState().player.x;
//    this.mountaintile.tilePosition.y = this.game.state.getCurrentState().player.y;
    
//    this.game.add.tween(this.bgtile.tilePosition).to({x: this.game.state.getCurrentState().player.body.velocity.x , y: this.game.state.getCurrentState().player.body.velocity.y}, 200, Phaser.Easing.Linear.None, true).start();
    
//    if( this.game.state.getCurrentState().player.body.velocity.x > 0){
//        this.bgtile.tilePosition.x += this.game.state.getCurrentState().player.body.velocity.x;
//    } else {
//        this.bgtile.tilePosition.x -= this.game.state.getCurrentState().player.body.velocity.x;
//    }
//    if( this.game.state.getCurrentState().player.body.velocity.y > 0){
//        this.bgtile.tilePosition.y += this.game.state.getCurrentState().player.body.velocity.y;
//    } else {
//        this.bgtile.tilePosition.y -= this.game.state.getCurrentState().player.body.velocity.y;
//    }
    
};

module.exports = Level3;
