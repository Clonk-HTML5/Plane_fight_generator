
'use strict';

var Level = function(game, options) {
  Phaser.Group.call(this, game);

  this.options = options ? options : false;
  this.worldHeight = this.game.cache.getImage('bg1').height;
  this.game.world.setBounds(0 , 0, 4000, this.worldHeight);

  this.bgtile = this.game.add.tileSprite(0, 0, this.game.world.width, this.worldHeight, 'bg1');
//  this.bgtile.fixedToCamera = true;
  this.bgtile.autoScroll(50, 0);
  this.add(this.bgtile);

  this.mountaintile = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.cache.getImage('treesMountain1').height, 'treesMountain1');
//  this.mountaintile.fixedToCamera = true;

  this.add(this.mountaintile);
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
  this.add(this.clouds);
  this.add(this.clouds2);

    this.platforms = this.game.add.group();
//    this.groundtile = this.game.add.tileSprite(0, this.game.world.height - 132, this.game.world.width, this.game.cache.getImage('bg1').height, 'sprites', 'level/crosssection_long_new');
    this.groundtile = this.game.add.tileSprite(0, this.game.world.height - this.game.cache.getImage('ground').height, this.game.world.width, this.game.cache.getImage('ground').height, 'ground');
    this.groundtile.name = 'ground';
    this.game.physics.enable(this.groundtile, Phaser.Physics.ARCADE);
    this.groundtile.body.immovable = true;
    this.platforms.add(this.groundtile);
    this.add(this.platforms);
};

Level.prototype = Object.create(Phaser.Group.prototype);;
Level.prototype.constructor = Level;

Level.prototype.update = function() {
};

module.exports = Level;
