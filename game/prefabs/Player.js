'use strict';

  var DefeatWindow = require('../prefabs/DefeatWindow');
  var HealthBar = require('../plugins/HealthBar.js');

var Player = function(game, x, y,frame) {
  Phaser.Sprite.call(this, game, x, y, "airplanes", frame);

        //  Our bullet group
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
        
        this.fullHealth = 20;
        this.health = this.fullHealth;
        this.kills = 0;
        this.angle = 0;
        this.angleSpeed = 150;
        this.angularVeloctitySpeed = 50;
        this.PI2 = Math.PI * 2;
        this.SPEED = 200; // missile speed pixels/second
        this.TURN_RATE = 3; // turn rate in degrees/frame
        this.planeDirection = 1;
        this.direction = 1;
        this.flyLoop = false;
        this.scaleFactor = new Phaser.Point(1, 1);

       this.scale.setTo(this.scaleFactor.x, this.scaleFactor.y);
        this.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        this.body.width2 = this.body.width/2;
        this.body.height2 = this.body.height/2;
        this.body.gravity.y = 300;
        this.body.velocity.setTo(200, 0);
        this.body.maxVelocity.setTo(300, 300);

        var playerHitString = GlobalGame.player.replace('default', 'hit_');
        this.hitAnimation = this.animations.add('hit', [
            playerHitString+'1',
            playerHitString+'2',
            playerHitString+'3'
        ], 10, false, false);

        // var playerDeathString = GlobalGame.player.replace('default', 'death_');
        // this.deadAnimation = this.animations.add('explode', [
        //     playerDeathString+'1',
        //     playerDeathString+'2',
        //     playerDeathString+'3',
        //     playerDeathString+'4'
        // ], 10, false, false);
        
        this.deadAnimation = this.animations.add('explode', Phaser.Animation.generateFrameNames('explosion', 0, 199));
        
        this.hitAnimation.onComplete.add(function() {
            this.frameName = GlobalGame.player;
        }, this);

        this.deadAnimation.onComplete.add(function() {

          this.deadAnimation.stop('explode');
          this.killPlayerAndAllProperties();

//            if(this.name == GlobalGame.multiplayer.socket.socket.sessionid)

          // if(!this.name){
          if(this.game.state.getCurrentState().key === "tutorial") {
            GlobalGame.tutorialPlayed = 1;
            this.game.state.getCurrentState().restart(true, false);
          } else {
            this.defeatWindow = new DefeatWindow(this.game, undefined);
          }
          // }
        }, this);

    /*******************
    * HUD'S
    *******************/

    this.healthBarGroup = this.game.add.group();
    this.healthBar = new HealthBar(this.game, {x: 151, y: 70, width: 99, height:17, bg: {color: '#A87436'}, bar:{color: '#EB3B3B'}});
    this.healthBarOverlay = this.game.add.sprite(50, 50, "sprites", "HUD/healthBar");
    this.healthBar.bgSprite.fixedToCamera = true;
    this.healthBar.barSprite.fixedToCamera = true;
    this.healthBarOverlay.fixedToCamera = true;
    this.healthBarGroup.addChild(this.healthBar.bgSprite);
    this.healthBarGroup.addChild(this.healthBar.barSprite);
    this.healthBarGroup.addChild(this.healthBarOverlay);

    if(GlobalGame.multiplayer.userName){
        this.username = this.game.add.text(0, -100, GlobalGame.multiplayer.userName, { fontSize: '22px', fill: '#000' });
        // this.addChild(this.username);
    }

        this.game.camera.follow(this);

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.pointer = this.game.input.addPointer();

        this.game.input.onDown.add(this.flap, this);
        
        this.cursors.left.onDown.add(function(){this.flap(0)}, this);
        this.cursors.up.onDown.add(function(){this.flap(0)}, this);
        this.cursors.right.onDown.add(function(){this.flap(1)}, this);
        this.cursors.down.onDown.add(function(){this.flap(1)}, this);

};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
        // Keep the plane on the screen
        if (this.x > this.game.world.width) this.x = 0;
        if (this.x < 0) this.x = this.game.world.width;

         this.game.physics.arcade.overlap(this, this.game.state.getCurrentState().level.platforms, this.runDeadAnimation, null, this);

        if(GlobalGame.multiplayer.socketEventHandlers !== null){
            for(var i = 0; i < GlobalGame.multiplayer.socketEventHandlers.enemies.length; i++){
                this.game.physics.arcade.overlap(GlobalGame.multiplayer.socketEventHandlers.enemies[i], this.bullets, this.shootPlayer, null, this);
            }
        }else{
            this.game.physics.arcade.overlap(this.bullets, this.game.state.getCurrentState().birdGroup, this.bulletHitsBird, null, this);
            this.game.physics.arcade.overlap(this, this.game.state.getCurrentState().birdGroup, this.playerHitsSomething, null, this);
        }
        
        this.whilePlayerFlysALoop();

        this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);

        this.setParticleToPlayerPosition();

        if(GlobalGame.multiplayer.socket)
            GlobalGame.multiplayer.socket.emit("move player", {x: this.x, y:this.y, angle: this.angle});

};

     /**
     * player collides with enemy
     * @param enemy enemy collides
     * @param player player collides
     */
    Player.prototype.shootPlayer = function (plane, bullet) {
        bullet.kill();

        plane.playerLoseHealth(plane);
    };
    
     /**
      * create Particles for Player
     */
    Player.prototype.createParticles = function () {
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
      * Set Particle to Player Position
     */
    Player.prototype.setParticleToPlayerPosition = function () {
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
    
     /**
      * While Player flys a loop
     */
    Player.prototype.whilePlayerFlysALoop = function () {
            if(this.flyLoop){
                this.fireBullet();

                  if(this.direction) {
                    var directionX = this.x+150;
                    var directionY = this.y-100;
                    var tweenScaleFactor = new Phaser.Point(this.scaleFactor.x, this.scaleFactor.y);
                  } else {
                    var directionX = this.x-200;
                    var directionY = this.y-100;
                    var tweenScaleFactor = new Phaser.Point(this.scaleFactor.x, -this.scaleFactor.y);
                  }
                 var targetAngle = this.game.math.angleBetween(
                    this.x, this.y,
                    directionX, directionY
                );

                if (this.rotation !== targetAngle) {
                    this.game.input.onDown.remove(this.flap, this);
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
                            this.game.add.tween(this.scale).to({x: tweenScaleFactor.x, y: tweenScaleFactor.y}, 500, Phaser.Easing.Back.Out, true).start();
                            this.game.input.onDown.add(this.flap, this);
                            this.planeDirection = this.direction;
                            this.flyLoop = false;
                        }
                }
                this.body.velocity.x = Math.cos(this.rotation) * this.SPEED;
                this.body.velocity.y = Math.sin(this.rotation) * this.SPEED;
            }
    };

  /**
   * Fires a Bullet
   */
    Player.prototype.fireBullet = function() {

        if (this.game.time.now > this.bulletTime)
        {

            var bullet = this.bullets.getFirstExists(false);

            if (bullet)
            {
                bullet.reset(this.x, this.y);
                bullet.lifespan = 2000;
                 bullet.rotation = this.rotation;
                this.game.physics.arcade.velocityFromRotation(this.rotation, 1000, bullet.body.velocity);
                this.bulletTime = this.game.time.now + 125;
                if(GlobalGame.multiplayer.socket)
                    GlobalGame.multiplayer.socket.emit("fire bullet", {bulletX: bullet.x,bulletY: bullet.y, bulletAngle: bullet.rotation, angle: this.angle});
            }
        }

    };

    /**
     * player collides with enemy
     * @param enemy enemy collides
     * @param player player collides
     */
    Player.prototype.bulletHitsBird = function (bullet, bird) {
        bird.kill();
        if(typeof bird.parent.addBird === 'function') bird.parent.addBird();
        bullet.kill();
    };

    /**
    * player collides with enemy
     * @param enemy enemy collides
     * @param player player collides
     */
    Player.prototype.playerHitsSomething = function (plane, something) {
        something.kill();
        if(typeof something.parent.addBird === 'function') something.parent.addBird();
        this.playerLoseHealth(plane, something);
    };

    /**
    * player flaps
     */
    Player.prototype.flap = function(direction) {
      if(!!this.alive) {
        var velocityX,
            velocityY;
          if(direction === 0 || direction === 1) {
            this.direction = direction;
          } else {
            this.direction = this.game.input.activePointer.x <= this.game.width / 2 ? 0 : 1;
          }

          if(this.direction !== this.planeDirection){
              this.flyLoop = true;
          } else {
              if(this.direction) {
                velocityX = this.body.velocity.x+150;
                velocityY = this.body.velocity.y-100;
              } else {
                velocityX = this.body.velocity.x-200;
                velocityY = this.body.velocity.y-100;
              }
              this.flapVelocityTween = this.game.add.tween(this.body.velocity).to({x: velocityX, y: velocityY}, 200, Phaser.Easing.Linear.None, true).start();
            this.fireBullet();
            // this.emitter.emitParticle();
          }
      }
    };

     /**
     * player collides with enemy
     * @param player player collides
     */
    Player.prototype.playerLoseHealth = function (plane) {
      if(plane.health >= 0) {
        this.hitAnimation.play('hit', 10, false);

        if(GlobalGame.multiplayer.socket) {
          GlobalGame.multiplayer.socket.emit("bullet hit player", {playerId: plane.name});
        }

        plane.health -= 1;

        this.healthBar.setPercent(plane.health / plane.fullHealth * 100);

        if(plane.health === 15){
          this.createParticles();
          plane.frameName = GlobalGame.player.replace('default', 'default_damaged');
        }

        if(plane.health < 1){
          this.runDeadAnimation(plane);
        }
      }
    };
    /**
    * player collides with enemy
    * @param player player collides
    */
   Player.prototype.runDeadAnimation = function (plane) {
     this.game.input.onDown.remove(this.flap, this);
     this.deadAnimation.play('explode', 10, false, true);
   };
   
    /**
     * player collides with enemy
     * @param enemy enemy collides
     * @param player player collides
     */
    Player.prototype.killPlayerAndAllProperties = function () {
        this.kill();
        if(this.emitter) {
            this.emitter.kill();
        }
        this.frameName = "Airplanes/AEG_C_IV/Skin_1/default";
        this.bullets.removeAll();
    };

module.exports = Player;
