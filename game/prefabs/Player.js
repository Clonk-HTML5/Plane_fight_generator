'use strict';

//  var Hammer = require('../plugins/Hammer');
  var BasicLayer = require('../prefabs/BasicLayer');

var Player = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, "sprites", frame);

  // initialize your prefab here
    if (this.game.device.desktop){
        this.emitter = this.game.add.emitter(x, y, 400);
        this.emitter.makeParticles('sprites', 'sprites/particles/smoke' );

        this.emitter.gravity = 50;
        this.emitter.setAlpha(1, 0, 1000);
        this.emitter.setScale(0.1, 0, 0.05, 0, 1000);

        this.emitter.start(false, 3000, 5);
    }
        
        //  Our bullet group
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
        
//        this.addChild(this.emitter);
        this.health = 5;
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
        
//        this.scale.setTo(0.6, 0.6);
//        this.scale.x *= -1;
        this.anchor.setTo(0.5, 0.5);
//        this.scale.setTo(0.23, 0.23);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
//        this.body.collideWorldBounds = true;
        //	Tell it we don't want physics to manage the rotation
//        this.body.allowRotation = false;
//        this.body.allowGravity = false;
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
    
//        this.body.drag.set(100);
    
//        this.bringToTop();
    
    
    /*******************
    * HUD'S
    *******************/
        
    this.killsText = this.game.add.text(0, 0, '', { fontSize: '32px', fill: '#000' });
    this.killsText.fixedToCamera = true;
    this.killsText.cameraOffset.setTo(16, 16);

    var style = { font: '18px Arial', fill: '#ffffff', align: 'center'};
      this.hud = Phaser.Plugin.HUDManager.create(this.game, this, 'gamehud');
      this.killsHUD = this.hud.addText(10, 10, 'Kills: ', style, 'kills', this);
      this.killsText.addChild(this.killsHUD.text);
    
      this.healthHUD = this.hud.addBar(0,-50, this.width, 10, this.health, 'health', this, '#ffbd55', false);
      this.healthHUD.bar.anchor.setTo(0.5, 0.5);
      this.addChild(this.healthHUD.bar);    
    
    if(GlobalGame.Multiplayer.userName){
        this.username = this.game.add.text(0, -100, GlobalGame.Multiplayer.userName, { fontSize: '22px', fill: '#000' });
        this.addChild(this.username);
    }
    
        //Camera
        this.game.camera.follow(this);

        //Controlls initialize
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.pointer = this.game.input.addPointer();
    
    if(GlobalGame.controller === 'touch') {
        this.game.input.onDown.add(this.flap, this);
        
//        this.game.input.onHold.add(this.flap, this);
    }

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
    
        // Keep the plane on the screen
        if (this.x > this.game.world.width) this.x = 0;
        if (this.x < 0) this.x = this.game.world.width;
    
         this.game.physics.arcade.collide(this, this.game.state.getCurrentState().level.platforms, this.playerLoseHealth, null, this);
    
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
            if(this.flyLoop){
                  if(this.direction) {
                    this.directionX = this.x+150;
                    this.directionY = this.y-100;
                  } else {
                    this.directionX = this.x-200;
                    this.directionY = this.y-100;    
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
        
    if(this.game.device.desktop){
        var px = this.body.velocity.x;
        var py = this.body.velocity.y;

        px *= -1;
        py *= -1;

        this.emitter.minParticleSpeed.set(px, py);
        this.emitter.maxParticleSpeed.set(px, py);
        
        this.emitter.emitX = this.x;
        this.emitter.emitY = this.y;
    }

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
    
    Player.prototype.fireBullet = function() {

        if (this.game.time.now > this.bulletTime)
        {
            
            var bullet = this.bullets.getFirstExists(false);

            if (bullet)
            {
                bullet.reset(this.body.x + this.body.width2, this.body.y + this.body.height/2);
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
        // Removes the star from the screen
        bird.kill();
        bullet.kill();
    };
    
    /**
    * player collides with enemy
     * @param enemy enemy collides
     * @param player player collides
     */
    Player.prototype.playerHitsSomething = function (plane, something) {
        // Removes the star from the screen
        something.kill();
        
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
     * player collides with enemy
     * @param player player collides
     */
    Player.prototype.playerLoseHealth = function (plane) {
//        gameInitializer.socket.emit("bullet hit player", {playerId: plane.name});
        if(GlobalGame.Multiplayer.socket)
            GlobalGame.Multiplayer.socket.emit("bullet hit player", {playerId: this.name});
        plane.health -= 1;
        if(plane.health < 1){
            
            //explode animation
            var explosion = this.game.add.sprite(plane.x - plane.width/2, plane.y - plane.height/2, 'airplaneexplode');
            explosion.animations.add('explode');
            explosion.animations.play('explode', 10, false, true);
//            explosion.animations.destroy('explode');
            
            plane.kill();
            if (this.game.device.desktop) plane.emitter.kill();
//            plane.bullets.removeAll();
            
//            this.game.gameoverTransition.to('gameover');
//            this.game.transitions.to('gameover');
              
            //GameStart Layer
//            if(plane.name == GlobalGame.Multiplayer.socket.socket.sessionid)
            
//            if(!plane.name) this.basicLayer = new BasicLayer(this.game, undefined, "Click to play again")
            if(!plane.name){
                this.basicLayer = new BasicLayer(this.game, undefined, "Click to play again")
            }
        }
    };

module.exports = Player;
