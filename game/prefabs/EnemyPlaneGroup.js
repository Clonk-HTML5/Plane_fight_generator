'use strict';

var EnemyPlane = require('./EnemyPlane');

var EnemyPlaneGroup = function(game, player, options) {
  Phaser.Group.call(this, game);
    this.player = player;
//    this = game.add.group();
    // create single birds
    for (var i = 0; i < 5; i++){
        // new Player Object
        this.enemyPlane = new EnemyPlane(this.game, Math.random() * game.world.width, Math.random() * (game.world.height - 250),0, player, options);
        this.add(this.enemyPlane);
    }
    
  // initialize your prefab here
  
};

EnemyPlaneGroup.prototype = Object.create(Phaser.Group.prototype);
EnemyPlaneGroup.prototype.constructor = EnemyPlaneGroup;

//BirdGroup.prototype.update = function() {
//    
//        //  Collide the Bird with the platforms
////    this.forEach( function(bird) {
////        //right
////        bird.body.velocity.x = Math.random() * 100;
////        bird.animations.play('fly', 8, true);
////   }, this);
//  
//  // write your prefab's specific update code here
//  
//};

module.exports = EnemyPlaneGroup;