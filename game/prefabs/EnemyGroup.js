'use strict';

var EnemyPlane = require('./EnemyPlane');
var Flak = require('./Flak');
var Solider = require('./Solider');

var EnemyGroup = function(game, player, options) {
  Phaser.Group.call(this, game);
    this.player = player;
    this.options = options ? options : {};
};

EnemyGroup.prototype = Object.create(Phaser.Group.prototype);
EnemyGroup.prototype.constructor = EnemyGroup;

/**
* adds enemy
*/
EnemyGroup.prototype.addEnemy = function () {

//    this.maxElements = 5;
    //    for (var i = 0; i < maxElements; i++){
        // new Player Object
    this.enemyPlane = new EnemyPlane(this.game, Math.random() * this.game.world.width, Math.random() * (this.game.world.height - 250),"sprites/plane3", this.player, this.options);
    this.add(this.enemyPlane);

    this.flak = new Flak(this.game, Math.random() * this.game.world.width, this.game.world.height ,"flak/flak1/turret_1_default", this.player, this.options);
    this.add(this.flak);

    this.options.soliderId = 1;

    this.solider = new Solider(this.game, Math.random() * this.game.world.width, this.game.world.height ,"soliders/solider"+this.options.soliderId+"/Soldier"+this.options.soliderId+"_default", this.player, this.options);
    this.add(this.solider);
    //    }
};

module.exports = EnemyGroup;
