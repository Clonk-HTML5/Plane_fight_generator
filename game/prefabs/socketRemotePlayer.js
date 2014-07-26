'use strict';

var SocketRemotePlayer = function(index, game, player, xStart, yStart, angle) {
  Phaser.Sprite.call(this, game, xStart, yStart, 'plane3', 0);

  // initialize your prefab here

//    this.game = game;
    this.bullets = player.bullets;
    this.alive = true;
    
//    this.emitter = player.emitter;
   this.emitter = this.game.add.emitter(xStart, yStart, 400);

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
    
    this.health = player.health;
    this.name = index.toString();
    
    this.angle = angle;
    this.scale.setTo(player.scale.x, player.scale.y);
//        this.plane.scale.x *= -1;
    this.anchor.setTo(player.anchor.x, player.anchor.y);
//        this.plane.scale.setTo(0.23, 0.23);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
//    this.body.collideWorldBounds = true;
    
    if(GlobalGame.Multiplayer.userName){
        this.username = this.game.add.text(0, -100, GlobalGame.Multiplayer.userName, { fontSize: '22px', fill: '#000' });
        this.addChild(this.username);
    }

      this.hud = Phaser.Plugin.HUDManager.create(this.game, this, 'gamehud');
      this.healthHUD = this.hud.addBar(0,-50, this.width, 10, this.health, 'health', this, '#ffbd55', false);
      this.healthHUD.bar.anchor.setTo(0.5, 0.5);
      this.addChild(this.healthHUD.bar);
  
};

SocketRemotePlayer.prototype = Object.create(Phaser.Sprite.prototype);
SocketRemotePlayer.prototype.constructor = SocketRemotePlayer;

SocketRemotePlayer.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = SocketRemotePlayer;
