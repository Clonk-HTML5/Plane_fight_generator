'use strict';

var EnemyPlane = function(game, x, y, frame, player, options) {
  Phaser.Sprite.call(this, game, x, y, 'sprites', frame);

  // initialize your prefab here

    this.options = options ? options : false;

    this.player = player;

    if (this.game.device.desktop){
        this.emitter = this.game.add.emitter(x, y, 400);

        this.emitter.makeParticles('sprites', 'sprites/particles/smoke');

        this.emitter.gravity = 50;
        this.emitter.setAlpha(1, 0, 1000);
        this.emitter.setScale(0.1, 0, 0.05, 0, 1000);

        this.emitter.start(false, 3000, 5);
    }

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

        this.bringToTop();
        this.health = 20;
        this.kills = 0;
        this.angle = 0;
        this.PI2 = Math.PI * 2;
        // Define constants that affect motion
        this.SPEED = 200; // missile speed pixels/second
        this.TURN_RATE = 3; // turn rate in degrees/frame
//        this.scale.setTo(0.6, 0.6);
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


    /*******************
    * HUD'S
    *******************/

      this.hud = Phaser.Plugin.HUDManager.create(this.game, this, 'gamehud');
      this.healthHUD = this.hud.addBar(0,-50, this.width, 10, this.health, 'health', this, '#ffbd55', false);
      this.healthHUD.bar.anchor.setTo(0.5, 0.5);
      this.addChild(this.healthHUD.bar);

    this.randomXPointInWorld = this.game.world.randomX;
    this.randomYPointInWorld = this.game.world.randomY - 300;

    // Let's build a Arrow
    this.arrow = this.game.add.sprite(15, 15, 'sprites', 'sprites/arrow');
    this.arrow.fixedToCamera = true;
    this.arrow.anchor.setTo(0.5, 0.5);
    this.arrow.visible = false;

};

EnemyPlane.prototype = Object.create(Phaser.Sprite.prototype);
EnemyPlane.prototype.constructor = EnemyPlane;

EnemyPlane.prototype.update = function() {

    // if(!this.options.menu && this.player){
    //     this.game.physics.arcade.overlap(this, this.player.bullets, this.enemyLoseHealth, null, this);
    //     this.game.physics.arcade.overlap(this.player, this.bullets, this.player.playerHitsSomething, null, this.player);
    // }

    if(this.game.physics.arcade.distanceToXY(this, this.randomXPointInWorld, this.randomYPointInWorld) < 50){
        this.randomXPointInWorld = this.game.world.randomX;
        this.randomYPointInWorld = this.game.world.randomY - 300;
    }

    // Calculate the angle from the missile to the mouse cursor game.input.x
    // and game.input.y are the mouse position; substitute with whatever
    // target coordinates you need.
    var targetAngle = this.game.math.angleBetween(
        this.x, this.y,
        this.randomXPointInWorld, this.randomYPointInWorld
    );

    if (this.rotation !== targetAngle) {
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
        }
    }

    // Calculate velocity vector based on this.rotation and this.SPEED
    this.body.velocity.x = Math.cos(this.rotation) * this.SPEED;
    this.body.velocity.y = Math.sin(this.rotation) * this.SPEED;

    if(!this.options.menu && this.player){
         if (this.game.physics.arcade.distanceBetween(this, this.player) < 300){
             this.fireBullet();

//             if(this.player.alive)
//                this.rotation = this.game.physics.arcade.moveToObject(this, this.player, this.SPEED-150);
         }
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
     * enemyLoseHealth collides with enemy
     * @param enemy collides
     */
    EnemyPlane.prototype.enemyLoseHealth = function (enemy) {
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
            if (this.game.device.desktop) enemy.emitter.kill();
            enemy.bullets.removeAll();
            enemy.arrow.kill();
            this.parent.currentWaveCountEnemiesLeft -= 1;
            this.parent.addEnemy();
        }
    };

module.exports = EnemyPlane;
