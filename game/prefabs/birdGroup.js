'use strict';

var Bird = require('./bird');

var BirdGroup = function(game, parent) {
  Phaser.Group.call(this, game, parent);

//    this = game.add.group();
    this.setAll('checkWorldBounds', true);
    this.setAll('outOfBoundsKill', true);
    // create single birds
    for (var i = 0; i < 12; i++){      
        this.bird = new Bird(this.game, Math.random() * game.world.width, Math.random() * (game.world.height - 250), 0);
        this.add(this.bird);
    }
    
  // initialize your prefab here
  
};

BirdGroup.prototype = Object.create(Phaser.Group.prototype);
BirdGroup.prototype.constructor = BirdGroup;

//BirdGroup.prototype.update = function() {
    
        //  Collide the Bird with the platforms
//    game.physics.arcade.collide(this.birds, level.platforms);
    
//    this.forEach( function(bird) {
//        //right
//        bird.body.velocity.x = Math.random() * 100;
//        bird.animations.play('fly', 8, true);
//   }, this);
  
  // write your prefab's specific update code here
  
//};

module.exports = BirdGroup;