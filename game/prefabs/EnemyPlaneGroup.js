'use strict';

var EnemyPlane = require('./EnemyPlane');

var EnemyPlaneGroup = function(game, player, options) {
  Phaser.Group.call(this, game);
    this.player = player;
    this.options = options;
};

EnemyPlaneGroup.prototype = Object.create(Phaser.Group.prototype);
EnemyPlaneGroup.prototype.constructor = EnemyPlaneGroup;

/**
* adds enemy
*/
EnemyPlaneGroup.prototype.addEnemy = function () {

//    this.maxElements = 5;
    //    for (var i = 0; i < maxElements; i++){
        // new Player Object
    this.enemyPlane = new EnemyPlane(this.game, Math.random() * this.game.world.width, Math.random() * (this.game.world.height - 250),"sprites/plane3", this.player, this.options);
    this.add(this.enemyPlane);
    //    }
};

module.exports = EnemyPlaneGroup;
