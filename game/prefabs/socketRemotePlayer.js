'use strict';

var HealthBar = require('../plugins/HealthBar.js');

var SocketRemotePlayer = function(index, game, player, xStart, yStart, angle, name) {
  Phaser.Sprite.call(this, game, xStart, yStart, "airplanes", GlobalGame.multiplayer.enemySprite);

  // initialize your prefab here

//    this.game = game;
    this.bullets = player.bullets;
    this.alive = true;

// //    this.emitter = player.emitter;
//    this.emitter = this.game.add.emitter(xStart, yStart, 400);
// 
//     this.emitter.makeParticles( 'sprites', 'sprites/particles/smoke' );
// 
//     this.emitter.gravity = 50;
//     this.emitter.setAlpha(1, 0, 1000);
//     this.emitter.setScale(0.1, 0, 0.05, 0, 1000);
// 
//     this.emitter.start(false, 3000, 5);

    this.emitter = this.game.add.emitter(xStart, yStart, 400);
    // this.emitter.makeParticles('sprites', 'sprites/particles/smoke' );
    var particleBaseName = 'sprites/particles/white_puff/whitePuff';
    this.emitter.makeParticles('sprites', [particleBaseName+'01',particleBaseName+'02',particleBaseName+'03',particleBaseName+'04',particleBaseName+'05',particleBaseName+'06',particleBaseName+'07',particleBaseName+'08',particleBaseName+'09',particleBaseName+'10'] );

    this.emitter.gravity = 50;
    this.emitter.setAlpha(1, 0, 3000);
    // this.emitter.setScale(0.08, 0, 0.08, 0, 3000);
    this.emitter.particleAnchor = new Phaser.Point(0.2, 0.5);

    //  Our bullet group
    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(500, 'sprites', 'sprites/bullets/bullet_2');
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 1);
    this.bullets.setAll('checkWorldBounds', true);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bulletTime = 0;

    this.health = player.health;
    this.name = index.toString();
    this.username = name.toString();

    this.angle = angle;
    // this.scale.setTo(player.scale.x, player.scale.y);
//        this.plane.scale.x *= -1;
    this.anchor.setTo(player.anchor.x, player.anchor.y);
//        this.plane.scale.setTo(0.23, 0.23);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
//    this.body.collideWorldBounds = true;

    if(this.username){
        this.username = this.game.add.text(0, -100, this.username, { fontSize: '22px', fill: '#000' });
        this.addChild(this.username);
    }

      // this.hud = Phaser.Plugin.HUDManager.create(this.game, this, 'gamehud');
      // this.healthHUD = this.hud.addBar(0,-50, this.width, 10, this.health, 'health', this, '#ffbd55', false);
      // this.healthHUD.bar.anchor.setTo(0.5, 0.5);
      // this.addChild(this.healthHUD.bar);



        var playerHitString = GlobalGame.player.replace('default', 'hit_');
        this.hitAnimation = this.animations.add('hit', [
            playerHitString+'1',
            playerHitString+'2',
            playerHitString+'3'
        ], 10, false, false);

        var playerDeathString = GlobalGame.player.replace('default', 'death_');
        this.deadAnimation = this.animations.add('explode', [
            playerDeathString+'1',
            playerDeathString+'2',
            playerDeathString+'3',
            playerDeathString+'4'
        ], 10, false, false);

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

};

SocketRemotePlayer.prototype = Object.create(Phaser.Sprite.prototype);
SocketRemotePlayer.prototype.constructor = SocketRemotePlayer;

SocketRemotePlayer.prototype.update = function() {

  // write your prefab's specific update code here

};

     /**
     * player collides with enemy
     * @param player player collides
     */
    SocketRemotePlayer.prototype.playerLoseHealth = function (plane) {
      if(plane.health >= 0) {
        this.hitAnimation.play('hit', 10, false);

        if(GlobalGame.multiplayer.socket) {
          GlobalGame.multiplayer.socket.emit("bullet hit player", {playerId: plane.name});
        }

        plane.health -= 1;

        if(plane.health < 15){
          this.emitter.start(false, 3000, 5);
          plane.frameName = GlobalGame.player.replace('default', 'default_damaged');
        } else if (plane.health < 10) {
          // var particleBaseName = 'sprites/particles/black_smoke/blackSmoke';
          // this.emitter.makeParticles('sprites', [particleBaseName+'01',particleBaseName+'02',particleBaseName+'03',particleBaseName+'04',particleBaseName+'05',particleBaseName+'06',particleBaseName+'07',particleBaseName+'08',particleBaseName+'09',particleBaseName+'10'] );
          plane.frameName = GlobalGame.player.replace('default', 'attack_damaged_1');
        } else if (plane.health < 5) {
          plane.frameName = GlobalGame.player.replace('default', 'attack_damaged_2');
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
   SocketRemotePlayer.prototype.runDeadAnimation = function (plane) {
     this.game.input.onDown.remove(this.flap, this);
     this.deadAnimation.play('explode', 10, false, true);
   };
   
    /**
     * player collides with enemy
     * @param enemy enemy collides
     * @param player player collides
     */
    SocketRemotePlayer.prototype.killPlayerAndAllProperties = function () {
        this.kill();
        this.emitter.kill();
        this.frameName = "Airplanes/AEG_C_IV/Skin_1/default";
        this.bullets.removeAll();
    };

module.exports = SocketRemotePlayer;
