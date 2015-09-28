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

  this.shotAnimation = this.animations.add('shot', [
      'flak/flak1/turret_1_fire_1',
      'flak/flak1/turret_1_fire_2',
      'flak/flak1/turret_1_fire_3',
      'flak/flak1/turret_1_fire_4',
      'flak/flak1/turret_1_fire_5',
      'flak/flak1/turret_1_fire_6',
      'flak/flak1/turret_1_fire_7',
      'flak/flak1/turret_1_fire_8'
  ], 15);

  this.shotAnimation.enableUpdate = true;
  this.shotAnimation.onUpdate.add(function(anim, frame){
    if(frame.index === 4){
        if (this.game.time.now > this.bulletTime) {
            var bullet = this.bullets.getFirstExists(false);
            if (bullet) {
                bullet.reset(this.x, this.y);
                bullet.lifespan = 2000;
                bullet.rotation = this.rotation + this.game.math.degToRad(90);
                this.game.physics.arcade.velocityFromRotation(this.rotation, 1000, bullet.body.velocity);
                this.bulletTime = this.game.time.now + 250;
                if(this.socket)
                    this.socket.socket.emit("fire bullet", {bulletX: bullet.x,bulletY: bullet.y, bulletAngle: bullet.rotation, angle: this.angle});
            }
        }
    }
  }, this);

  this.health = 20;

  // this.rotation = -0.2;
  this.anchor.setTo(0.1, 0.5);
  this.scaleFactor = new Phaser.Point(1, 1);
  // this.scale.setTo(this.scaleFactor.x, this.scaleFactor.y);
// this.player.x = x +150;
// this.player.y = y +150;
  this.base = game.add.sprite(x +35 , y -35, 'flak', 'flak/flak1/base_1_default');
  this.base.anchor.setTo(0.9, 0.5);

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

    // var currentAngleBetween = this.game.physics.arcade.angleBetween(this, this.player);
    // var dx = this.game.input.activePointer.worldX - this.x;
    // var dy = this.game.input.activePointer.worldY - this.y;
    // this.rotation = Math.atan2(dy, dx);

    // if (currentAngleBetween > -0.2 && currentAngleBetween < 3) {
    // this.rotation = this.game.physics.arcade.angleToPointer(this);
    if( this.player){
       this.rotation = this.game.physics.arcade.angleBetween(this, this.player);
       this.checkIfLookingInTheRightDirection(this.player.x);
       if (this.game.physics.arcade.distanceBetween(this, this.player) < 800){

          // this.shotUpAnimation.play('shot');
          this.fireBullet();
       }
   }
    //  }

};

/**
 * Fires a Bullet
 */
Flak.prototype.fireBullet = function() {
  if(!this.shotAnimation.isPlaying) {
    this.shotAnimation.play('shot');
  }
};

Flak.prototype.checkIfLookingInTheRightDirection = function(directionX) {
  if(directionX > this.x) {
    this.tweenScaleFactor = new Phaser.Point(this.scaleFactor.x, this.scaleFactor.y);
  } else {
    this.tweenScaleFactor = new Phaser.Point(this.scaleFactor.x, -this.scaleFactor.y);
  }
  if(this.scale !== this.tweenScaleFactor) {
     this.scaleTween = this.game.add.tween(this.scale).to({x: this.tweenScaleFactor.x, y: this.tweenScaleFactor.y}, 100, Phaser.Easing.Back.Out, true).start();
  }
};

/**
* enemyLoseHealth collides with enemy
* @param enemy collides
*/
Flak.prototype.enemyLoseHealth = function (enemy) {
//        gameInitializer.socket.emit("bullet hit player", {playerId: plane.name});
   if(this.socket)
       this.socket.socket.emit("bullet hit player", {playerId: this.name});
   enemy.health -= 1
   if(enemy.health < 1){

       if(this.player) this.player.kills += 1;

       //explode animation
       var explosion = this.game.add.sprite(enemy.x - enemy.width/2, enemy.y - enemy.height/2, 'airplaneexplode');
       explosion.animations.add('explode');
       explosion.animations.play('explode', 10, false, true);
//            explosion.animations.destroy('explode');

       enemy.kill();
       enemy.base.kill();
       enemy.bullets.removeAll();
       enemy.arrow.kill();
       this.parent.currentWaveCountEnemiesLeft -= 1;
       this.parent.addEnemy();
   }
};

module.exports = Flak;
