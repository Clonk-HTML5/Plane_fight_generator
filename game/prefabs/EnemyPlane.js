'use strict';

var EnemyPlane = function(game, x, y, frame, player, options) {
  Phaser.Sprite.call(this, game, x, y, 'plane3', frame);

  // initialize your prefab here
    
    this.options = options ? options : false;
    
    this.player = player;
    
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
  
};

EnemyPlane.prototype = Object.create(Phaser.Sprite.prototype);
EnemyPlane.prototype.constructor = EnemyPlane;

EnemyPlane.prototype.update = function() {
  
  // write your prefab's specific update code here
    if(!this.options.menu){
        this.game.physics.arcade.overlap(this, this.player.bullets, this.playerLoseHealth, null, this);
        this.game.physics.arcade.overlap(this.player, this.bullets, this.player.playerHitsSomething, null, this.player);
    }
    
    if(this.game.physics.arcade.distanceToXY(this, this.randomXPointInWorld, this.randomYPointInWorld) < 50){
        this.body.rotation = this.game.physics.arcade.angleToXY(this, this.randomXPointInWorld, this.randomYPointInWorld);
        this.randomXPointInWorld = this.game.world.randomX;
        this.randomYPointInWorld = this.game.world.randomY - 300;
    }
    
    this.rotation = this.game.physics.arcade.moveToXY(this, this.randomXPointInWorld, this.randomYPointInWorld, 300, 2000)
    this.game.physics.arcade.velocityFromAngle(this.angle, 300, this.body.velocity)
    
    if(!this.options.menu){
         if (this.game.physics.arcade.distanceBetween(this, this.player) < 300){
             this.fireBullet();
         }
    }else{
//         if (this.game.physics.arcade.distanceBetween(this, this.player) < 300){
//             this.fireBullet();
//         }
    }
    
    var px = this.body.velocity.x;
    var py = this.body.velocity.y;

    px *= -1;
    py *= -1;

    this.emitter.minParticleSpeed.set(px, py);
    this.emitter.maxParticleSpeed.set(px, py);

    this.emitter.emitX = this.x;
    this.emitter.emitY = this.y;
  
};

EnemyPlane.prototype.fireBullet = function() {

    if (this.game.time.now > this.bulletTime)
    {

        var bullet = this.bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(this.body.x + this.body.width/2, this.body.y + this.body.height/2);
//                bullet.body.velocity.copyFrom(this.game.physics.arcade.velocityFromAngle(this.plane.angle, 1000))
//                bullet.rotation = this.plane.rotation + this.game.math.degToRad(90);
            bullet.lifespan = 2000;
             bullet.rotation = this.rotation + this.game.math.degToRad(90);
            this.game.physics.arcade.velocityFromRotation(this.rotation, 1000, bullet.body.velocity);
            this.bulletTime = this.game.time.now + 250;
//                gameInitializer.socket.emit("fire bullet", {bulletX: bullet.x,bulletY: bullet.y, bulletAngle: bullet.rotation, angle: this.plane.angle});
            if(this.socket)
                this.socket.socket.emit("fire bullet", {bulletX: bullet.x,bulletY: bullet.y, bulletAngle: bullet.rotation, angle: this.angle});
        }
    }

};

     /**
     * player collides with enemy
     * @param player player collides
     */
    EnemyPlane.prototype.playerLoseHealth = function (plane) {
//        gameInitializer.socket.emit("bullet hit player", {playerId: plane.name});
        if(this.socket)
            this.socket.socket.emit("bullet hit player", {playerId: this.name});
        plane.health -= 1
        if(plane.health < 1){
            
            //explode animation
            var explosion = this.game.add.sprite(plane.x - plane.width/2, plane.y - plane.height/2, 'airplaneexplode');
            explosion.animations.add('explode');
            explosion.animations.play('explode', 10, false, true);
//            explosion.animations.destroy('explode');
            
            plane.kill();
            plane.emitter.kill();
            plane.bullets.removeAll();
        }
    };

module.exports = EnemyPlane;
