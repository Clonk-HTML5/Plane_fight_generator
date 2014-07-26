'use strict';

  var Hammer = require('../plugins/Hammer');   

var Player = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'plane3', frame);

  // initialize your prefab here
    if (this.game.device.desktop){
        this.emitter = this.game.add.emitter(400, 400, 400);

        this.emitter.makeParticles( [ 'smoke' ] );

        this.emitter.gravity = 50;
        this.emitter.setAlpha(1, 0, 1000);
        this.emitter.setScale(0.1, 0, 0.05, 0, 1000);

        this.emitter.start(false, 3000, 5);
    }
        
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
        this.angleSpeed = 250;
        this.angularVeloctitySpeed = 150;
        
        this.scale.setTo(0.6, 0.6);
//        this.scale.x *= -1;
        this.anchor.setTo(0.5, 0.5);
//        this.scale.setTo(0.23, 0.23);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
//        this.body.collideWorldBounds = true;
        //	Tell it we don't want physics to manage the rotation
//        this.body.allowRotation = false;
        this.body.gravity.y = 50;
        this.body.velocity.setTo(300, 0);
        this.body.maxVelocity.setTo(400, 400);
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
        this.game.input.addPointer();
    
    
    /*******************
    * Hammertime
    *******************/
//        var element = document.getElementsByTagName('canvas')[0],
//        _this = this;
//        
//        var options = {
//          preventDefault: true
//        };
//        if(typeof Hammer != "undefined"){
//            var hammertime = new Hammer(element, options);
//            hammertime.on("dragup swipeup", function(ev){ 
//                _this.game.physics.arcade.velocityFromAngle(_this.angle, this.angleSpeed, _this.body.velocity);
//                _this.body.angularVelocity -= 100;
//            });        
//            hammertime.on("dragdown swipedown", function(ev){ 
//                _this.game.physics.arcade.velocityFromAngle(_this.angle, this.angleSpeed, _this.body.velocity);
//                _this.body.angularVelocity += 100;
//            });
//        }
    
        
    /*******************
    * PLAYER Controll Buttons If Device not Desktop
    *******************/
    if (!this.game.device.desktop){
        // create our virtual game controller buttons 

        this.buttonfire = this.game.add.button(this.game.width-194, this.game.height-94-50, 'buttonfire', null, this, 0, 1, 0, 1);
        this.buttonfire.fixedToCamera = true;      
        this.buttonfire.events.onInputOver.add(function(){this.fireBulletEventStarted=true;}, this);
        this.buttonfire.events.onInputOut.add(function(){this.fireBulletEventStarted=false;}, this);
        this.buttonfire.events.onInputDown.add(function(){this.fireBulletEventStarted=true;}, this);
        this.buttonfire.events.onInputUp.add(function(){this.fireBulletEventStarted=false;}, this);

//        this.buttonleft = this.game.add.button(0, this.game.height-94-64, 'buttonhorizontal', null, this, 0, 1, 0, 1);
//        this.buttonleft.fixedToCamera = true;
//        this.buttonleft.events.onInputOver.add(function(){this.planeUpEventStarted=true;}, this);
//        this.buttonleft.events.onInputOut.add(function(){this.planeUpEventStarted=false;}, this);
//        this.buttonleft.events.onInputDown.add(function(){this.planeUpEventStarted=true;}, this);
//        this.buttonleft.events.onInputUp.add(function(){this.planeUpEventStarted=false;}, this);
//
//        this.buttonright = this.game.add.button(160, this.game.height-94-64, 'buttonhorizontal', null, this, 0, 1, 0, 1);
//        this.buttonright.fixedToCamera = true;
//        this.buttonright.events.onInputOver.add(function(){this.planeDownEventStarted=true;}, this);
//        this.buttonright.events.onInputOut.add(function(){this.planeDownEventStarted=false;}, this);
//        this.buttonright.events.onInputDown.add(function(){this.planeDownEventStarted=true;}, this);
//        this.buttonright.events.onInputUp.add(function(){this.planeDownEventStarted=false;}, this);

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
    
         this.game.physics.arcade.collide(this, this.game.state.getCurrentState().level.platforms, this.playerLoseHealth, null, this);
    
        if(GlobalGame.Multiplayer.socket !== null){
            for(var i = 0; i < GlobalGame.Multiplayer.socket.enemies.length; i++){
                this.game.physics.arcade.overlap(GlobalGame.Multiplayer.socket.enemies[i], this.bullets, this.shootPlayer, null, this);
            }
        }else{
            this.game.physics.arcade.overlap(this.bullets, this.game.state.getCurrentState().birdGroup, this.bulletHitsBird, null, this);
            this.game.physics.arcade.overlap(this, this.game.state.getCurrentState().birdGroup, this.playerHitsSomething, null, this);
        }
    
        this.body.angularVelocity = 0;
        
        /**
         * Cursor functions starts
         */
//        if (this.cursors.up.isDown) {
//            this.game.physics.arcade.velocityFromAngle(this.angle, this.angleSpeed+300, this.body.velocity);
//        } 
//        else if(this.cursors.down.isDown){
//            this.body.velocity.setTo(0, 0)
//        }
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
    
        //if plane falls rotatet right
        this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
    
        if(this.body.rotation > -130 && this.body.rotation < -80){
//            this.body.gravity.y = 300;
//            this.body.velocity.setTo(this.body.velocity.x, 100);
            this.game.physics.arcade.velocityFromAngle(this.angle, this.angleSpeed-100, this.body.velocity);
        }
        if(this.body.rotation > 80 && this.body.rotation < 130){
//            this.body.gravity.y = 50;
//            this.body.velocity.setTo(this.body.velocity.x, 300);
             this.game.physics.arcade.velocityFromAngle(this.angle, this.angleSpeed+100, this.body.velocity);
        }
        
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
            GlobalGame.Multiplayer.socket.socket.emit("move player", {x: this.x, y:this.y, angle: this.angle});
  
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
                bullet.reset(this.body.x + this.body.width/2, this.body.y + this.body.height/2);
//                bullet.body.velocity.copyFrom(this.game.physics.arcade.velocityFromAngle(this.plane.angle, 1000))
//                bullet.rotation = this.plane.rotation + this.game.math.degToRad(90);
                bullet.lifespan = 2000;
                 bullet.rotation = this.rotation + this.game.math.degToRad(90);
                this.game.physics.arcade.velocityFromRotation(this.rotation, 1000, bullet.body.velocity);
                this.bulletTime = this.game.time.now + 250;
//                gameInitializer.socket.emit("fire bullet", {bulletX: bullet.x,bulletY: bullet.y, bulletAngle: bullet.rotation, angle: this.plane.angle});
                if(GlobalGame.Multiplayer.socket)
                    GlobalGame.Multiplayer.socket.socket.emit("fire bullet", {bulletX: bullet.x,bulletY: bullet.y, bulletAngle: bullet.rotation, angle: this.angle});
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
     * player collides with enemy
     * @param player player collides
     */
    Player.prototype.playerLoseHealth = function (plane) {
//        gameInitializer.socket.emit("bullet hit player", {playerId: plane.name});
        if(GlobalGame.Multiplayer.socket)
            GlobalGame.Multiplayer.socket.socket.emit("bullet hit player", {playerId: this.name});
        plane.health -= 1;
        if(plane.health < 1){
            
            //explode animation
            var explosion = this.game.add.sprite(plane.x - plane.width/2, plane.y - plane.height/2, 'airplaneexplode');
            explosion.animations.add('explode');
            explosion.animations.play('explode', 10, false, true);
//            explosion.animations.destroy('explode');
            
            plane.kill();
            if (this.game.device.desktop)
                plane.emitter.kill();
            plane.bullets.removeAll();
            
//            this.game.gameoverTransition.to('gameover');
            this.game.transitions.to('gameover');
        }
    };

module.exports = Player;
