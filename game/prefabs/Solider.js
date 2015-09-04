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

    this.rotation = -0.2;
    this.anchor.setTo(0.5, 0.5);
  //        this.scale.setTo(0.23, 0.23);

  this.walkAnimation = this.animations.add('walk', [
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_walk_1',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_walk_2',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_walk_3',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_walk_4',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_walk_5',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_walk_6',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_walk_7',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_walk_8'
  ]);

  this.shootUpAnimation = this.animations.add('shootUp', [
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_shot_up_1',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_shot_up__2',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_shot_up__3',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_shot_up__4',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_shot_up__5',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_shot_up__6',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_shot_up__7',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_shot_up__8',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_shot_up__9',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_shot_up__10',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_shot_up__11',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_shot_up__12'
  ]);

  // this.walkAnimation.onComplete.add(function() {
  //     this.frameName = 'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_default';
  // }, this);

  this.shootUpAnimation.onComplete.add(function() {
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
    // this.frameName = 'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_default';
  }, this);

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
    this.walkAnimation.stop('walk');
    this.shootUpAnimation.play('shootUp');
};

Solider.prototype.walk = function() {
    if(!this.walkAnimation.isPlaying) {
        this.shootUpAnimation.stop('shootUp');
        this.walkAnimation.play('walk');
        this.flapVelocityTween.isRunning
        if(!this.flapVelocityTween.isRunning) {
          this.flapVelocityTween = this.game.add.tween(this).to({x: Math.random() * this.game.world.width}, 1000, Phaser.Easing.Linear.None, true).start();
        }
    }
};

module.exports = Solider;
