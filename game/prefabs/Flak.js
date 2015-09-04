'use strict';

var Flak = function(game, x, y, frame, player, options) {
  Phaser.Sprite.call(this, game, x, y, 'flak', frame);

  this.options = options ? options : false;

  this.player = player;

  this.bullets = this.game.add.group();
  this.bullets.enableBody = true;
  this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
  this.bullets.createMultiple(500, 'sprites', 'sprites/bullet2');
  this.bullets.setAll('anchor.x', 0.5);
  this.bullets.setAll('anchor.y', 1);
  this.bullets.setAll('checkWorldBounds', true);
  this.bullets.setAll('outOfBoundsKill', true);
  this.bullets.setAll('scale.x', 0.5);
  this.bullets.setAll('scale.y', 0.5);
  this.bulletTime = 0;

  this.health = 20;

  this.rotation = -0.2;
  this.anchor.setTo(0.5, 0.5);
//        this.scale.setTo(0.23, 0.23);

  this.base = this.game.add.sprite(x, y, 'flak', 'flak/flak1/base_1_default');
  this.base.anchor.setTo(0.5, 0.5);
  // this.turret = this.game.add.sprite(x, y, 'flak', 'turret');
  this.game.physics.enable(this, Phaser.Physics.ARCADE);

  this.arrow = this.game.add.sprite(15, 45, 'sprites', 'sprites/arrow');
  this.arrow.fixedToCamera = true;
  this.arrow.anchor.setTo(0.5, 0.5);
  this.arrow.visible = false;
};

Flak.prototype = Object.create(Phaser.Sprite.prototype);
Flak.prototype.constructor = Flak;

Flak.prototype.update = function() {
      // console.log(this.game.physics.arcade.angleBetween(this, this.player))

    var currentAngleBetween = this.game.physics.arcade.angleBetween(this, this.player);
    if (currentAngleBetween > -0.2 && currentAngleBetween < 3) {
         this.rotation = this.game.physics.arcade.angleBetween(this, this.player);
     }

};

/**
 * Fires a Bullet
 */
Flak.prototype.fireBullet = function() {

    if (this.game.time.now > this.bulletTime)
    {

        var bullet = this.bullets.getFirstExists(false);

        if (bullet)
        {
            // bullet.reset(this.body.x + this.body.width2, this.body.y + this.body.height/2);
            bullet.reset(this.x, this.y);
//                bullet.body.velocity.copyFrom(this.game.physics.arcade.velocityFromAngle(this.plane.angle, 1000))
//                bullet.rotation = this.plane.rotation + this.game.math.degToRad(90);
            bullet.lifespan = 2000;
             bullet.rotation = this.rotation + this.game.math.degToRad(90);
            this.game.physics.arcade.velocityFromRotation(this.rotation, 1000, bullet.body.velocity);
            this.bulletTime = this.game.time.now + 125;
//                gameInitializer.socket.emit("fire bullet", {bulletX: bullet.x,bulletY: bullet.y, bulletAngle: bullet.rotation, angle: this.plane.angle});
            // if(GlobalGame.Multiplayer.socket)
            //     GlobalGame.Multiplayer.socket.emit("fire bullet", {bulletX: bullet.x,bulletY: bullet.y, bulletAngle: bullet.rotation, angle: this.angle});
        }
    }

};

module.exports = Flak;
