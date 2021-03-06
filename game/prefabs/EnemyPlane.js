'use strict';

var EnemyPlane = function(game, x, y, frame, player, options) {
  Phaser.Sprite.call(this, game, x, y, "airplanes", frame);

  // initialize your prefab here

    this.options = options ? options : false;

    this.player = player;

        this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(500, 'sprites', 'sprites/bullets/bullet_2');
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 1);
        this.bullets.setAll('checkWorldBounds', true);
        this.bullets.setAll('outOfBoundsKill', true);
        // this.bullets.setAll('scale.x', 0.5);
        // this.bullets.setAll('scale.y', 0.5);
        this.bulletTime = 0;

        // this.bringToTop();
        this.health = 20;
        this.kills = 0;
        this.angle = 0;
        this.PI2 = Math.PI * 2;
        // Define constants that affect motion
        this.SPEED = 200; // missile speed pixels/second
        this.TURN_RATE = 3; // turn rate in degrees/frame
//        this.scale.setTo(0.6, 0.6);
//        this.scale.x *= -1;
        // this.scaleFactor = new Phaser.Point(0.5, 0.5);
        this.scaleFactor = new Phaser.Point(1, 1);

        this.scale.setTo(this.scaleFactor.x, this.scaleFactor.y);
        this.anchor.setTo(0.5, 0.5);
//        this.scale.setTo(0.23, 0.23);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
//        this.body.collideWorldBounds = true;
        //	Tell it we don't want physics to manage the rotation
//        this.body.allowRotation = false;
        this.body.gravity.y = 50;
        this.body.velocity.setTo(300, 0)
        this.body.maxVelocity.setTo(300, 300);


      var playerHitString = GlobalGame.enemy.replace('default', 'hit_');
      this.hitAnimation = this.animations.add('hit', [
          playerHitString+'1',
          playerHitString+'2',
          playerHitString+'3'
      ], 10, false, false);

      var playerDeathString = GlobalGame.enemy.replace('default', 'death_');
      this.deadAnimation = this.animations.add('explode', [
          playerDeathString+'1',
          playerDeathString+'2',
          playerDeathString+'3',
          playerDeathString+'4'
      ], 10, false, false);
      
    this.hitAnimation.onComplete.add(function() {
        this.frameName = GlobalGame.enemy;
    }, this);

    this.deadAnimation.onComplete.add(function() {
        this.deadAnimation.stop('explode');
        this.kill();
        this.emitter.kill();
        this.frameName = "Airplanes/AEG_C_IV/Skin_1/default";
        this.bullets.removeAll();
        this.arrow.kill();
        this.parent.currentWaveCountEnemiesLeft -= 1;
        this.parent.addEnemy();
    
            if(this.player) this.player.kills += 1;

    }, this);


    /*******************
    * HUD'S
    *******************/

      // this.hud = Phaser.Plugin.HUDManager.create(this.game, this, 'gamehud');
      // this.healthHUD = this.hud.addBar(0,-50, this.width, 10, this.health, 'health', this, '#ffbd55', false);
      // this.healthHUD.bar.anchor.setTo(0.5, 0.5);
      // this.addChild(this.healthHUD.bar);

    this.randomXPointInWorld = this.game.world.randomX;
    this.randomYPointInWorld = this.game.world.randomY - 300;

    // Let's build a Arrow
    this.arrow = this.game.add.sprite(15, 15, 'sprites', 'sprites/arrow');
    this.arrow.fixedToCamera = true;
    this.arrow.anchor.setTo(0.5, 0.5);
    this.arrow.visible = false;
    
    // this.game.time.events.loop(Phaser.Timer.QUARTER, this.flyToRandomPointInWorld, this);

};

EnemyPlane.prototype = Object.create(Phaser.Sprite.prototype);
EnemyPlane.prototype.constructor = EnemyPlane;

EnemyPlane.prototype.update = function() {
    
    this.flyToRandomPointInWorld();

    this.game.physics.arcade.overlap(this, this.player.bullets, this.enemyLoseHealth, null, this);
    this.game.physics.arcade.overlap(this.player, this.bullets, this.player.playerHitsSomething, null, this.player);

    // Calculate velocity vector based on this.rotation and this.SPEED
    this.body.velocity.x = Math.cos(this.rotation) * this.SPEED;
    this.body.velocity.y = Math.sin(this.rotation) * this.SPEED;

    if(this.player){
         if (this.game.physics.arcade.distanceBetween(this, this.player) < 300){
             this.fireBullet();

//             if(this.player.alive)
//                this.rotation = this.game.physics.arcade.moveToObject(this, this.player, this.SPEED-150);
         }
    }

    this.setParticleToPlayerPosition();

};

     /**
      * Enemy flys to random Point in World
     */
    EnemyPlane.prototype.flyToRandomPointInWorld = function () {
        if(this.game.physics.arcade.distanceToXY(this, this.randomXPointInWorld, this.randomYPointInWorld) < 50){
            this.randomXPointInWorld = this.game.world.randomX;
            this.randomYPointInWorld = this.game.world.randomY;
        }

        // Calculate the angle from the missile to the mouse cursor game.input.x
        // and game.input.y are the mouse position; substitute with whatever
        // target coordinates you need.
        var targetAngle = this.game.math.angleBetween(
            this.x, this.y,
            this.randomXPointInWorld, this.randomYPointInWorld
        );

        if (this.rotation !== targetAngle) {
            var delta = targetAngle - this.rotation;

            if (delta > Math.PI) delta -= this.PI2;
            if (delta < -Math.PI) delta += this.PI2;

            if (delta > 0) {
                this.angle += this.TURN_RATE;
            } else {
                this.angle -= this.TURN_RATE;
            }

            if (Math.abs(delta) < this.game.math.degToRad(this.TURN_RATE)) {
                this.rotation = targetAngle;
            }
        }
    };
    
     /**
      * create Particles for Enemy
     */
    EnemyPlane.prototype.createParticles = function () {
       // if (this.game.device.desktop){
        this.emitter = this.game.add.emitter(0,0,500);
        // this.emitter.makeParticles('sprites', 'sprites/particles/smoke' );
        var particleBaseName = 'sprites/particles/white_puff/whitePuff';
        this.emitter.makeParticles('sprites', [particleBaseName+'01',particleBaseName+'02',particleBaseName+'03',particleBaseName+'04',particleBaseName+'05',particleBaseName+'06',particleBaseName+'07',particleBaseName+'08',particleBaseName+'09',particleBaseName+'10'] );

        this.emitter.gravity = 50;
        this.emitter.setAlpha(1, 0, 500);
        // this.emitter.setScale(0.08, 0, 0.08, 0, 3000);
        // this.emitter.particleAnchor = new Phaser.Point(0.2, 0.5);
        // this.emitter.particleAnchor = new Phaser.Point(0.2, 0.5);
        
        this.addChild(this.emitter);
        this.emitter.y = 0;
        this.emitter.x = -16;
        this.emitter.lifespan = 500;
        this.emitter.maxParticleSpeed = new Phaser.Point(-100,50);
        this.emitter.minParticleSpeed = new Phaser.Point(-200,-50);
    };

     /**
      * Set Particle to Enemy Position
     */
    EnemyPlane.prototype.setParticleToPlayerPosition = function () {
        if(this.emitter) {
//          var px = this.body.velocity.x;
//          var py = this.body.velocity.y;
//  
//          px *= -1;
//          py *= -1;
//  
//          this.emitter.minParticleSpeed.set(px, py);
//          this.emitter.maxParticleSpeed.set(px, py);
//  
//          this.emitter.emitX = this.x;
//          this.emitter.emitY = this.y;
            this.emitter.emitParticle();
        }
    };

EnemyPlane.prototype.fireBullet = function() {

    if (this.game.time.now > this.bulletTime)
    {

        var bullet = this.bullets.getFirstExists(false);

        if (bullet)
        {
            // bullet.reset(this.body.x + this.body.width/2, this.body.y + this.body.height/2);
            bullet.reset(this.x, this.y);
//                bullet.body.velocity.copyFrom(this.game.physics.arcade.velocityFromAngle(this.plane.angle, 1000))
//                bullet.rotation = this.plane.rotation + this.game.math.degToRad(90);
            bullet.lifespan = 2000;
            //  bullet.rotation = this.rotation + this.game.math.degToRad(90);
             bullet.rotation = this.rotation;
            this.game.physics.arcade.velocityFromRotation(this.rotation, 1000, bullet.body.velocity);
            this.bulletTime = this.game.time.now + 250;
//                gameInitializer.socket.emit("fire bullet", {bulletX: bullet.x,bulletY: bullet.y, bulletAngle: bullet.rotation, angle: this.plane.angle});
            if(this.socket)
                this.socket.socket.emit("fire bullet", {bulletX: bullet.x,bulletY: bullet.y, bulletAngle: bullet.rotation, angle: this.angle});
        }
    }

};

     /**
     * enemyLoseHealth collides with enemy
     * @param enemy collides
     */
    EnemyPlane.prototype.enemyLoseHealth = function (plane) {
      if(plane.health >= 0) {
        this.hitAnimation.play('hit', 10, false);

        plane.health -= 1;

        if(plane.health === 15){
            this.createParticles();
        //   this.emitter.start(false, 2000, 50);
          plane.frameName = GlobalGame.enemy.replace('default', 'default_damaged');
        }

        if(plane.health < 1){
            plane.body.velocity.x = 0;
            plane.body.velocity.y = 0;
            plane.body.gravity.y = 700;
            this.deadAnimation.play('explode', 10, false, true);
        }
      }
    };

module.exports = EnemyPlane;
