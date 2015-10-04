'use strict';

//  var Hammer = require('../plugins/Hammer');
  var BasicLayer = require('../prefabs/BasicLayer');
  var Gesture = require('../plugins/Gesture');
  var HealthBar = require('../plugins/HealthBar.js');

var Player = function(game, x, y,frame) {
  Phaser.Sprite.call(this, game, x, y, "airplanes", frame);

    // if (this.game.device.desktop){
        this.emitter = this.game.add.emitter(x, y, 400);
        this.emitter.makeParticles('sprites', 'sprites/particles/smoke' );

        this.emitter.gravity = 50;
        this.emitter.setAlpha(1, 0, 1000);
        this.emitter.setScale(0.1, 0, 0.06, 0, 1000);

        this.emitter.start(false, 3000, 5);
    // }

        //  Our bullet group
        this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(500, 'sprites', 'sprites/bullet2');
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 1);
        this.bullets.setAll('checkWorldBounds', true);
        this.bullets.setAll('outOfBoundsKill', true);
        // this.bullets.setAll('scale.x', 0.5);
        // this.bullets.setAll('scale.y', 0.5);
        this.bulletTime = 0;

//        this.addChild(this.emitter);
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
        this.directionX,
        this.directionY;
        this.scaleFactor = new Phaser.Point(0.5, 0.5);

       this.scale.setTo(this.scaleFactor.x, this.scaleFactor.y);
        this.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        this.body.width2 = this.body.width/2;
        this.body.height2 = this.body.height/2;
        this.body.gravity.y = 300;
        this.body.velocity.setTo(200, 0);
        this.body.maxVelocity.setTo(300, 300);

        if(GlobalGame.controller === 'keyboardButtons'){
            this.body.gravity.y = 50;
            this.body.velocity.setTo(300, 0);
            this.angleSpeed = 250;
            this.angularVeloctitySpeed = 150;
            this.body.maxVelocity.setTo(400, 400);
        }

        this.hitAnimation = this.animations.add('hit', [
            'Airplanes/Fokker/Skin 1/PNG/Fokker_hit_1',
            'Airplanes/Fokker/Skin 1/PNG/Fokker_hit_2',
            'Airplanes/Fokker/Skin 1/PNG/Fokker_hit_3'
        ], 10, false, false);

        this.deadAnimation = this.animations.add('explode', [
            'Airplanes/Fokker/Skin 1/PNG/Fokker_death_1',
            'Airplanes/Fokker/Skin 1/PNG/Fokker_death_2',
            'Airplanes/Fokker/Skin 1/PNG/Fokker_death_3',
            'Airplanes/Fokker/Skin 1/PNG/Fokker_death_4'
        ], 10, false, false);

        this.hitAnimation.onComplete.add(function() {
            this.frameName = "Airplanes/Fokker/Skin 1/PNG/Fokker_default";
        }, this);

        this.deadAnimation.onComplete.add(function() {

          this.deadAnimation.stop('explode');
          this.kill();
          if (this.game.device.desktop) this.emitter.kill();
          this.frameName = "Airplanes/Fokker/Skin 1/PNG/Fokker_default";
          this.bullets.removeAll();

//            if(this.name == GlobalGame.Multiplayer.socket.socket.sessionid)

          if(!this.name){
              this.basicLayer = new BasicLayer(this.game, undefined, "Click to play again")
          }
        }, this);

    /*******************
    * HUD'S
    *******************/
    // this.killsText = this.game.add.text(0, 0, '', { fontSize: '32px', fill: '#000' });
    // this.killsText.fixedToCamera = true;
    // this.killsText.cameraOffset.setTo(16, 16);

    // var style = { font: '18px Arial', fill: '#ffffff', align: 'center'};
    //   this.hud = Phaser.Plugin.HUDManager.create(this.game, this, 'gamehud');
    //   this.killsHUD = this.hud.addText(10, 10, 'Kills: ', style, 'kills', this);
    //   this.killsText.addChild(this.killsHUD.text);
    //
    //   this.healthHUD = this.hud.addBar(0,-50, this.width, 10, this.health, 'health', this, '#ffbd55', false);
    //   this.healthHUD.bar.anchor.setTo(0.5, 0.5);

    this.healthBarGroup = this.game.add.group();
    this.healthBar = new HealthBar(this.game, {x: 151, y: 74, width: 143, height:34, bg: {color: '#A87436'}, bar:{color: '#EB3B3B'}});
    this.healthBarOverlay = this.game.add.sprite(50, 50, "sprites", "HUD/healthBar");
    this.healthBar.bgSprite.fixedToCamera = true;
    this.healthBar.barSprite.fixedToCamera = true;
    this.healthBarOverlay.fixedToCamera = true;
    this.healthBarGroup.addChild(this.healthBar.bgSprite);
    this.healthBarGroup.addChild(this.healthBar.barSprite);
    this.healthBarGroup.addChild(this.healthBarOverlay);

    if(GlobalGame.Multiplayer.userName){
        this.username = this.game.add.text(0, -100, GlobalGame.Multiplayer.userName, { fontSize: '22px', fill: '#000' });
        // this.addChild(this.username);
    }

        //Camera
        this.game.camera.follow(this);

        //Controlls initialize
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.pointer = this.game.input.addPointer();

        // this.gestures = new Gesture(this.game);

        // this.gestures.onTap.add(this.flap, this);
        // this.gestures.onHold.add(this.holded, this);
        // this.gestures.onSwipe.add(this.swiped, this);

        this.game.input.onDown.add(this.flap, this);

    /*******************
    * PLAYER Controll Buttons If Device not Desktop
    *******************/
    if (!this.game.device.desktop && GlobalGame.controller === 'keyboardButtons'){
        // create our virtual game controller buttons

        this.buttonfire = this.game.add.button(this.game.width-194, this.game.height-94-50, 'buttonfire', null, this, 0, 1, 0, 1);
        this.buttonfire.fixedToCamera = true;
        this.buttonfire.events.onInputOver.add(function(){this.fireBulletEventStarted=true;}, this);
        this.buttonfire.events.onInputOut.add(function(){this.fireBulletEventStarted=false;}, this);
        this.buttonfire.events.onInputDown.add(function(){this.fireBulletEventStarted=true;}, this);
        this.buttonfire.events.onInputUp.add(function(){this.fireBulletEventStarted=false;}, this);

        this.buttonup = this.game.add.button(96, this.game.height-94-128, 'buttonvertical', null, this, 0, 1, 0, 1);
        this.buttonup.fixedToCamera = true;
        this.buttonup.events.onInputOver.add(function(){this.planeUpEventStarted=true;}, this);
        this.buttonup.events.onInputOut.add(function(){this.planeUpEventStarted=false;}, this);
        this.buttonup.events.onInputDown.add(function(){this.planeUpEventStarted=true;}, this);
        this.buttonup.events.onInputUp.add(function(){this.planeUpEventStarted=false;}, this);

        this.buttondown = this.game.add.button(96, this.game.height-94, 'buttonvertical', null, this, 0, 1, 0, 1);
        this.buttondown.fixedToCamera = true;
        this.buttondown.events.onInputOver.add(function(){this.planeDownEventStarted=true;}, this);
        this.buttondown.events.onInputOut.add(function(){this.planeDownEventStarted=false;}, this);
        this.buttondown.events.onInputDown.add(function(){this.planeDownEventStarted=true;}, this);
        this.buttondown.events.onInputUp.add(function(){this.planeDownEventStarted=false;}, this);

    }


};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {

  if (this.cursors.up.isDown)
  {
      this.game.camera.y -= 4;
  }
  else if (this.cursors.down.isDown)
  {
      this.game.camera.y += 4;
  }

  if (this.cursors.left.isDown)
  {
      this.game.camera.x -= 4;
  }
  else if (this.cursors.right.isDown)
  {
      this.game.camera.x += 4;
  }

  // this.gestures.update();

      // if (this.game.input.activePointer.isDown) {
          // var duration = this.game.input.activePointer.duration;
          // if (duration < 450) {
            // this.flap();
          // } else {
          //   this.flap();
          //   // this.holdFlap();
          // }
      // }

        // Keep the plane on the screen
        if (this.x > this.game.world.width) this.x = 0;
        if (this.x < 0) this.x = this.game.world.width;

         this.game.physics.arcade.overlap(this, this.game.state.getCurrentState().level.platforms, this.playerLoseHealth, null, this);

        if(GlobalGame.Multiplayer.socketEventHandlers !== null){
            for(var i = 0; i < GlobalGame.Multiplayer.socketEventHandlers.enemies.length; i++){
                this.game.physics.arcade.overlap(GlobalGame.Multiplayer.socketEventHandlers.enemies[i], this.bullets, this.shootPlayer, null, this);
            }
        }else{
            this.game.physics.arcade.overlap(this.bullets, this.game.state.getCurrentState().birdGroup, this.bulletHitsBird, null, this);
            this.game.physics.arcade.overlap(this, this.game.state.getCurrentState().birdGroup, this.playerHitsSomething, null, this);
        }

        if(GlobalGame.controller === 'keyboardButtons'){

            this.body.angularVelocity = 0;

            /**
             * Cursor functions starts
             */
            if (this.cursors.left.isDown || this.cursors.up.isDown || this.planeUpEventStarted) {
    //            this.body.rotateLeft(100);
                this.game.physics.arcade.velocityFromAngle(this.angle, this.angleSpeed, this.body.velocity);
    //            this.game.physics.arcade.accelerationFromRotation(this.rotation, this.angleSpeed, this.body.acceleration);
                this.body.angularVelocity -= this.angularVeloctitySpeed;

                // Invert scale.y to flip up/down
    //            if(this.scale.y > 0)
    //                this.scale.y *= -1;
            } else if (this.cursors.right.isDown || this.cursors.down.isDown || this.planeDownEventStarted) {
                this.game.physics.arcade.velocityFromAngle(this.angle, this.angleSpeed, this.body.velocity);
    //            this.game.physics.arcade.accelerationFromRotation(this.rotation, this.angleSpeed, this.body.acceleration);
                this.body.angularVelocity += this.angularVeloctitySpeed;

    //            this.body.rotateRight(100);
    //            if(this.scale.y < 0)
    //                this.scale.y *= 1;
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || this.fireBulletEventStarted){
                this.fireBullet();
            }


        }
        else if(GlobalGame.controller === 'touch'){
//            console.log(this.game.input.activePointer.isDown)
//            if (this.game.input.activePointer.isDown){
//                this.flap();
//            }
            // if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
            //   this.animations.play('hit', 5, false);
            // }

            if(this.flyLoop){
                this.fireBullet();

                  if(this.direction) {
                    this.directionX = this.x+150;
                    this.directionY = this.y-100;
                    this.tweenScaleFactor = new Phaser.Point(this.scaleFactor.x, this.scaleFactor.y);
                  } else {
                    this.directionX = this.x-200;
                    this.directionY = this.y-100;
                    this.tweenScaleFactor = new Phaser.Point(this.scaleFactor.x, -this.scaleFactor.y);
                  }
                 var targetAngle = this.game.math.angleBetween(
                    this.x, this.y,
                    this.directionX, this.directionY
                );

                if (this.rotation !== targetAngle) {
                    this.game.input.onDown.remove(this.flap, this);
                            // Calculate difference between the current angle and targetAngle
                        var delta = targetAngle - this.rotation;

                        // Keep it in range from -180 to 180 to make the most efficient turns.
                        if (delta > Math.PI) delta -= this.PI2;
                        if (delta < -Math.PI) delta += this.PI2;

                        if (delta > 0) {
                            // Turn clockwise
                            this.angle += this.TURN_RATE;
                        } else {
                            // Turn counter-clockwise
                            this.angle -= this.TURN_RATE;
                        }

                        // Just set angle to target angle if they are close
                        if (Math.abs(delta) < this.game.math.degToRad(this.TURN_RATE)) {
                            this.rotation = targetAngle;
                            this.scaleTween = this.game.add.tween(this.scale).to({x: this.tweenScaleFactor.x, y: this.tweenScaleFactor.y}, 500, Phaser.Easing.Back.Out, true).start();
                            this.game.input.onDown.add(this.flap, this);
                            this.planeDirection = this.direction;
                            this.flyLoop = false;
                        }
                }
                this.body.velocity.x = Math.cos(this.rotation) * this.SPEED;
                this.body.velocity.y = Math.sin(this.rotation) * this.SPEED;
            }
        }


        //if plane falls rotatet right
        this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
//        this.rotation = this.body.angle;

//        this.game.physics.arcade.accelerationFromRotation(this.rotation, 200, this.body.acceleration);

//        if(this.body.rotation > -130 && this.body.rotation < -80){
////            this.body.gravity.y = 300;
////            this.body.velocity.setTo(this.body.velocity.x, 100);
//            this.game.physics.arcade.velocityFromAngle(this.angle, this.angleSpeed-100, this.body.velocity);
//        }
//        if(this.body.rotation > 80 && this.body.rotation < 130){
////            this.body.gravity.y = 50;
////            this.body.velocity.setTo(this.body.velocity.x, 300);
//             this.game.physics.arcade.velocityFromAngle(this.angle, this.angleSpeed+100, this.body.velocity);
//        }

    // if(this.game.device.desktop){
        var px = this.body.velocity.x;
        var py = this.body.velocity.y;

        px *= -1;
        py *= -1;

        this.emitter.minParticleSpeed.set(px, py);
        this.emitter.maxParticleSpeed.set(px, py);

        this.emitter.emitX = this.x;
        this.emitter.emitY = this.y;
    // }

        if(GlobalGame.Multiplayer.socket)
            GlobalGame.Multiplayer.socket.emit("move player", {x: this.x, y:this.y, angle: this.angle});

};

     /**
     * player collides with enemy
     * @param enemy enemy collides
     * @param player player collides
     */
    Player.prototype.shootPlayer = function (plane, bullet) {
        // Removes the star from the screen
        bullet.kill();

        this.playerLoseHealth(plane);
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
                // bullet.reset(this.body.x + this.body.width2, this.body.y + this.body.height/2);
                bullet.reset(this.x, this.y);
//                bullet.body.velocity.copyFrom(this.game.physics.arcade.velocityFromAngle(this.plane.angle, 1000))
//                bullet.rotation = this.plane.rotation + this.game.math.degToRad(90);
                bullet.lifespan = 2000;
                 bullet.rotation = this.rotation + this.game.math.degToRad(90);
                this.game.physics.arcade.velocityFromRotation(this.rotation, 1000, bullet.body.velocity);
                this.bulletTime = this.game.time.now + 125;
//                gameInitializer.socket.emit("fire bullet", {bulletX: bullet.x,bulletY: bullet.y, bulletAngle: bullet.rotation, angle: this.plane.angle});
                if(GlobalGame.Multiplayer.socket)
                    GlobalGame.Multiplayer.socket.emit("fire bullet", {bulletX: bullet.x,bulletY: bullet.y, bulletAngle: bullet.rotation, angle: this.angle});
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
        this.playerLoseHealth(plane);
    };

    /**
    * player flaps
     */
    Player.prototype.flap = function() {
      if(!!this.alive) {
        var velocityX,
            velocityY;

          this.direction = this.game.input.activePointer.x <= this.game.width / 2 ? 0 : 1;

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
          }
      }
    };

    /**
    * player hold touch flaps
     */
    Player.prototype.holdFlap = function() {
      if(!!this.alive) {
        var velocityX,
            velocityY;

          this.direction = this.game.input.activePointer.x <= this.game.width / 2 ? 0 : 1;

          if(this.direction !== this.planeDirection){
              this.flyLoop = true;
          } else {
              if(this.direction) {
                // velocityX = this.body.velocity.x+150;
                // velocityY = this.body.velocity.y-100;
                this.body.velocity.x += 35;
                this.body.velocity.y -= 30;
              } else {
                // velocityX = this.body.velocity.x-200;
                // velocityY = this.body.velocity.y-100;
                this.body.velocity.x -= 40;
                this.body.velocity.y -= 30;
              }
              // this.flapVelocityTween = this.game.add.tween(this.body.velocity).to({x: velocityX, y: velocityY}, 200, Phaser.Easing.Linear.None, true).start();
            this.fireBullet();
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
          // plane.tint = Math.random() * 0xffffff;
          // var lightningTween = this.game.add.tween(plane).to({tint: 0xCCFFFF}, 1000, Phaser.Easing.Exponential.Out, true, 0, 0, true);
          // lightningTween.onComplete.add(function(){plane.tint = 0xffffff}, this);

  //        gameInitializer.socket.emit("bullet hit player", {playerId: plane.name});
          if(GlobalGame.Multiplayer.socket)
              GlobalGame.Multiplayer.socket.emit("bullet hit player", {playerId: this.name});
          plane.health -= 1;

          this.healthBar.setPercent(plane.health / plane.fullHealth * 100);

          if(plane.health < 5){
            plane.frameName = "Airplanes/Fokker/Skin 1/PNG/Fokker_default_damaged";
          } else if (plane.health < 4) {
            plane.frameName = "Airplanes/Fokker/Skin 1/PNG/Fokker_attack_damaged_1";
          } else if (plane.health < 3) {
            plane.frameName = "Airplanes/Fokker/Skin 1/PNG/Fokker_attack_damaged_2";
          }

          if(plane.health < 1){
              this.game.input.onDown.remove(this.flap, this);
              plane.body.velocity.x = 0;
              plane.body.velocity.y = 0;
              plane.body.gravity.y = 700;
              this.deadAnimation.play('explode', 10, false, true);
          }
        }
    };

module.exports = Player;
