'use strict';

var Solider = function(game, x, y, frame, player, options) {
  Phaser.Sprite.call(this, game, x, y, 'soliders', frame);

    this.player = player;
    this.options = options;

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


    this.soliderId = this.options.soliderId;
    this.health = 3;
    this.direction = 0;

    this.rotation = -0.2;
    this.anchor.setTo(0.5, 0.5);
    this.scaleFactor = new Phaser.Point(1, 1);

    // this.scale.setTo(this.scaleFactor.x, this.scaleFactor.y);

  this.walkAnimation = this.animations.add('walk', [
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_walk_1',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_walk_2',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_walk_3',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_walk_4',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_walk_5',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_walk_6',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_walk_7',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_walk_8'
  ], 15);

  this.shotUpAnimation = this.animations.add('shotUp', [
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_shot_up_1',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_shot_up_2',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_shot_up_3',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_shot_up_4',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_shot_up_5',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_shot_up_6',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_shot_up_7',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_shot_up_8',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_shot_up_9',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_shot_up_10',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_shot_up_11',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_shot_up_12'
  ], 15);

  this.shotUpAnimation.enableUpdate = true;
  this.shotUpAnimation.onUpdate.add(function(anim, frame){
    if(frame.index === 7){
        if (this.game.time.now > this.bulletTime) {
            var bullet = this.bullets.getFirstExists(false);
            if (bullet) {
                var rotation;
                if(this.direction){
                  rotation = -0.8;
                } else {
                  rotation = -2.6;
                }
                bullet.reset(this.x, this.y);
                bullet.lifespan = 2000;
                 bullet.rotation = rotation + this.game.math.degToRad(90);
                this.game.physics.arcade.velocityFromRotation(rotation, 1000, bullet.body.velocity);
                this.bulletTime = this.game.time.now + 250;
                if(this.socket)
                    this.socket.socket.emit("fire bullet", {bulletX: bullet.x,bulletY: bullet.y, bulletAngle: bullet.rotation, angle: this.angle});
            }
        }
    }
  }, this);

  // this.walkAnimation.onComplete.add(function() {
  //     this.frameName = 'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_default';
  // }, this);

  // this.shotUpAnimation.onComplete.add(function() {
  //   if (this.game.time.now > this.bulletTime) {
  //       var bullet = this.bullets.getFirstExists(false);
  //       console.log(bullet)
  //       if (bullet) {
  //           bullet.reset(this.x, this.y);
  //           bullet.lifespan = 2000;
  //            bullet.rotation = this.rotation + this.game.math.degToRad(90);
  //           this.game.physics.arcade.velocityFromRotation(this.rotation, 1000, bullet.body.velocity);
  //           this.bulletTime = this.game.time.now + 250;
  //           if(this.socket)
  //               this.socket.socket.emit("fire bullet", {bulletX: bullet.x,bulletY: bullet.y, bulletAngle: bullet.rotation, angle: this.angle});
  //       }
  //   }
  //   // this.frameName = 'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_default';
  // }, this);

    // this.base = this.game.add.sprite(x, y, 'soliders', 'flak/flak1/base_1_default');
    // this.base.anchor.setTo(0.5, 0.5);
    // this.turret = this.game.add.sprite(x, y, 'flak', 'turret');
    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    this.body.gravity.y = 300;
    this.flapVelocityTween = this.game.add.tween(this).to({x: Math.random() * this.game.world.width}, 1000, Phaser.Easing.Linear.None, true);
    // this.walkAnimation.play('walk', 12, true);

    this.arrow = this.game.add.sprite(15, 75, 'sprites', 'sprites/arrow');
    this.arrow.fixedToCamera = true;
    this.arrow.anchor.setTo(0.5, 0.5);
    this.arrow.visible = false;
};

Solider.prototype = Object.create(Phaser.Sprite.prototype);
Solider.prototype.constructor = Solider;

Solider.prototype.update = function() {

  this.game.physics.arcade.collide(this, this.game.state.getCurrentState().level.platforms);

  if(!this.options.menu && this.player){
       if (this.game.physics.arcade.distanceBetween(this, this.player) < 400){
          this.fireBullet();
       } else {
          this.walk();
       }
  }

};

Solider.prototype.fireBullet = function() {
    if(!this.shotUpAnimation.isPlaying) {
      this.walkAnimation.stop('walk');
      this.shotUpAnimation.play('shotUp');
      if(this.flapVelocityTween && this.flapVelocityTween.isRunning){
        this.flapVelocityTween.stop();
      }
      this.checkIfLookingInTheRightDirection(this.player.x);
    }
};

Solider.prototype.walk = function() {
    if(!this.walkAnimation.isPlaying) {
        this.shotUpAnimation.stop('shotUp');
        this.walkAnimation.play('walk');
        if(!this.flapVelocityTween.isRunning) {
          var nextXPosition = Math.random() * this.game.world.width;

          this.checkIfLookingInTheRightDirection(nextXPosition);

          this.flapVelocityTween = this.game.add.tween(this).to({x: nextXPosition}, 5000, Phaser.Easing.Linear.None, true).start();
        }
    }
};

Solider.prototype.checkIfLookingInTheRightDirection = function(directionX) {
  if(directionX > this.x) {
    this.tweenScaleFactor = new Phaser.Point(-this.scaleFactor.x, this.scaleFactor.y);
    this.direction = 1;
  } else {
    this.tweenScaleFactor = new Phaser.Point(this.scaleFactor.x, this.scaleFactor.y);
    this.direction = 0;
  }
  if(this.scale !== this.tweenScaleFactor) {
     this.scaleTween = this.game.add.tween(this.scale).to({x: this.tweenScaleFactor.x, y: this.tweenScaleFactor.y}, 100, Phaser.Easing.Back.Out, true).start();
  }
};

/**
* enemyLoseHealth collides with enemy
* @param enemy collides
*/
Solider.prototype.enemyLoseHealth = function (enemy) {
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
       enemy.bullets.removeAll();
       enemy.arrow.kill();
       this.parent.currentWaveCountEnemiesLeft -= 1;
       this.parent.addEnemy();
   }
};

module.exports = Solider;
