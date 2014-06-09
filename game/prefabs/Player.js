'use strict';

  var Hammer = require('../plugins/Hammer');   

var Player = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'plane3', frame);

  // initialize your prefab here
    
        this.emitter = this.game.add.emitter(400, 400, 400);

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
    
    
        //Camera
        this.game.camera.follow(this);

        //Controlls initialize
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.game.input.addPointer();
    
    
    /*******************
    * Hammertime
    *******************/
        var element = document.getElementsByTagName('canvas')[0],
        _this = this;
        
        var options = {
          preventDefault: true
        };
        if(typeof Hammer != "undefined"){
            var hammertime = new Hammer(element, options);
            hammertime.on("dragup swipeup", function(ev){ 
                _this.game.physics.arcade.velocityFromAngle(_this.angle, 300, _this.body.velocity);
                _this.body.angularVelocity -= 100;
            });        
            hammertime.on("dragdown swipedown", function(ev){ 
                _this.game.physics.arcade.velocityFromAngle(_this.angle, 300, _this.body.velocity);
                _this.body.angularVelocity += 100;
            });
        }
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
    
        this.body.angularVelocity = 0;
        
        /**
         * Cursor functions starts
         */
        if (this.cursors.up.isDown) {
            this.game.physics.arcade.velocityFromAngle(this.angle, 600, this.body.velocity);
        } 
//        else if(this.cursors.down.isDown){
//            this.body.velocity.setTo(0, 0)
//        }
        if (this.cursors.left.isDown) {
//            this.body.rotateLeft(100);
            this.game.physics.arcade.velocityFromAngle(this.angle, 300, this.body.velocity);
            this.body.angularVelocity -= 100;
        } else if (this.cursors.right.isDown) {
            this.game.physics.arcade.velocityFromAngle(this.angle, 300, this.body.velocity);
            this.body.angularVelocity += 100;
//            this.body.rotateRight(100);
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
        {
            this.fireBullet();
        }
        
        
//        if (this.game.input.mousePointer.isDown || this.game.input.pointer1.isDown) {
//            this.rotation = this.game.physics.arcade.moveToPointer(this, 20, this.game.input.activePointer, 500);
////            this.fireBullet();
//        }
        
        var px = this.body.velocity.x;
        var py = this.body.velocity.y;

        px *= -1;
        py *= -1;

        this.emitter.minParticleSpeed.set(px, py);
        this.emitter.maxParticleSpeed.set(px, py);
        
        this.emitter.emitX = this.x;
        this.emitter.emitY = this.y;

        this.socket.socket.emit("move player", {x: this.x, y:this.y, angle: this.angle});
  
};

     /**
     * player collides with enemy
     * @param enemy enemy collides
     * @param player player collides
     */
    Player.prototype.shootPlayer = function (plane, bullet) {
        // Removes the star from the screen
        bullet.kill();
//        console.log(plane, bullet)
//        gameInitializer.socket.emit("bullet hit player", {playerId: plane.name});
        plane.health --;
        if(plane.health < 1){
            plane.kill(); 
            plane.emitter.kill();
            plane.bullets.removeAll();
        }
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
        bullet.kill()
    };
    
            /**
     * player collides with enemy
     * @param enemy enemy collides
     * @param player player collides
     */
    Player.prototype.playerHitsBird = function (plane, bird) {
        // Removes the star from the screen
        bird.kill();
//        gameInitializer.socket.emit("bullet hit player", {playerId: plane.name});
        plane.health -= 1
        if(plane.health < 1){
            plane.kill();
            plane.emitter.kill();
            plane.bullets.removeAll();
        }
    };

module.exports = Player;
