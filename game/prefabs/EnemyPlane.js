'use strict';

var EnemyPlane = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'plane3', frame);

  // initialize your prefab here
    
        this.emitter = this.game.add.emitter(x, y, 400);

        this.emitter.makeParticles( [ 'smoke' ] );

        this.emitter.gravity = 50;
        this.emitter.setAlpha(1, 0, 1000);
        this.emitter.setScale(0.1, 0, 0.05, 0, 1000);

        this.emitter.start(false, 3000, 5);
        
        //  Our bullet group
        this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(500, 'bullet2');
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 1);
        this.bullets.setAll('checkWorldBounds', true);
        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('scale.x', 0.5);
        this.bullets.setAll('scale.y', 0.5);
        this.bulletTime = 0;
        
        this.health = 5;
        this.kills = 0;
        this.angle = 0;
        this.scale.setTo(0.6, 0.6);
//        this.scale.x *= -1;
        this.anchor.setTo(0.5, 0.5);
//        this.scale.setTo(0.23, 0.23);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
//        this.body.collideWorldBounds = true;
        //	Tell it we don't want physics to manage the rotation
//        this.body.allowRotation = false;
        this.body.gravity.y = 50;
        this.body.velocity.setTo(300, 0)
        this.body.maxVelocity.setTo(300, 300);
//        this.bringToTop();
    
    
    /*******************
    * HUD'S
    *******************/
        
      this.hud = Phaser.Plugin.HUDManager.create(this.game, this, 'gamehud');
      this.healthHUD = this.hud.addBar(0,-50, this.width, 10, this.health, 'health', this, '#ffbd55', false);
      this.healthHUD.bar.anchor.setTo(0.5, 0.5);
      this.addChild(this.healthHUD.bar);
    
    this.randomXPointInWorld = this.game.world.randomX;
    this.randomYPointInWorld = this.game.world.randomY - 300;
    
    console.log(this.randomXPointInWorld, this.randomYPointInWorld)
  
};

EnemyPlane.prototype = Object.create(Phaser.Sprite.prototype);
EnemyPlane.prototype.constructor = EnemyPlane;

EnemyPlane.prototype.update = function() {
  
  // write your prefab's specific update code here
    
    if(this.game.physics.arcade.distanceToXY(this, this.randomXPointInWorld, this.randomYPointInWorld) < 50){
        this.randomXPointInWorld = this.game.world.randomX;
        this.randomYPointInWorld = this.game.world.randomY - 300;
    }
    
    this.rotation = this.game.physics.arcade.moveToXY(this, this.randomXPointInWorld, this.randomYPointInWorld, 300, 2000)
    this.game.physics.arcade.velocityFromAngle(this.angle, 300, this.body.velocity)
    
    var px = this.body.velocity.x;
    var py = this.body.velocity.y;

    px *= -1;
    py *= -1;

    this.emitter.minParticleSpeed.set(px, py);
    this.emitter.maxParticleSpeed.set(px, py);

    this.emitter.emitX = this.x;
    this.emitter.emitY = this.y;
  
};

module.exports = EnemyPlane;
