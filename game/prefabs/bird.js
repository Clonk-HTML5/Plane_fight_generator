'use strict';

var Bird = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'birdie', frame);

  // initialize your prefab here
    
    //  Here we'll create 12 of them evenly spaced apart  
//        this = this.create(Math.random() * game.world.width, Math.random() * (game.world.height - 250), 'birdie');
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.scale.setTo(0.15, 0.15);
        //  Bird physics properties.
        this.body.bounce.y = 0.2;
    //            bird.body.collideWorldBounds = true;

        this.angle = 0
        this.anchor.setTo(0.5,0.5);
        this.scale.x *= -1;
        this.animations.add('fly');
        this.events.onOutOfBounds.add(this.birdLeft, this);
  
};

Bird.prototype = Object.create(Phaser.Sprite.prototype);
Bird.prototype.constructor = Bird;

Bird.prototype.update = function() {
  
  // write your prefab's specific update code here
    		//  Collide the Bird and the stars with the platforms
//    	this.game.physics.arcade.collide(this.birds, level.platforms);
//        
                this.body.velocity.x = Math.random() * 100;
                this.animations.play('fly', 8, true);
  
};

Bird.prototype.birdLeft = function() {
            console.log(this)
            this.speed += 1;
            this.y += 4;

            if (this.body.facing === Phaser.LEFT)
            {
                this.scale.x *= 1;
                this.body.velocity.x = this.speed;
            }
            else
            {
                this.scale.x *= -1;
                this.body.velocity.x = -this.speed;
            }

};

module.exports = Bird;
