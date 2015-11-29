'use strict';

var Bird = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'sprites', 'sprites/birds/bird_1');

        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.bounce.y = 0.2;
//      bird.body.collideWorldBounds = true;

        this.angle = 0
        this.anchor.setTo(0.5,0.5);
        // this.scale.x *= -1;

        this.flyAnimation = this.animations.add('fly', [
            'sprites/birds/bird_1',
            'sprites/birds/bird_2'
        ], 10);
        this.flyAnimation.play(10, true);
        this.events.onOutOfBounds.add(this.birdLeft, this);

};

Bird.prototype = Object.create(Phaser.Sprite.prototype);
Bird.prototype.constructor = Bird;

Bird.prototype.update = function() {
    this.body.velocity.x = Math.random() * 100;
};

Bird.prototype.birdLeft = function() {
            this.speed += 1;
            this.y += 4;

            if (this.body.facing === Phaser.LEFT)
            {
                this.scale.x *= -1;
                this.body.velocity.x = this.speed;
            }
            else
            {
                this.scale.x *= 1;
                this.body.velocity.x = -this.speed;
            }

};

module.exports = Bird;
