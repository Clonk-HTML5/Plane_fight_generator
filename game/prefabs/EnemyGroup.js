'use strict';

var EnemyPlane = require('./EnemyPlane');
var Flak = require('./Flak');
var Solider = require('./Solider');

var EnemyGroup = function(game, player, options) {
  Phaser.Group.call(this, game);
    this.player = player;
    this.options = options ? options : {};
    this.currentLevel = this.options.currentLevel;
    this.currentWave = 1;
    this.currentWaveCountEnemiesLeft = this.currentLevel.waves[this.currentWave].countEnemies;
};

EnemyGroup.prototype = Object.create(Phaser.Group.prototype);
EnemyGroup.prototype.constructor = EnemyGroup;

/**
* adds enemy
*/
EnemyGroup.prototype.addEnemy = function () {
    if(this.currentWaveCountEnemiesLeft < 1){
      this.currentWave += 1;
    }
    if(this.currentWave <= this.currentLevel.waves.count) {

      if(this.currentLevel.waves[this.currentWave].planes) {
        for (var i = 0; i < this.currentLevel.waves[this.currentWave].planes.count; i++){
          this.enemyPlane = new EnemyPlane(this.game, Math.random() * this.game.world.width, Math.random() * (this.game.world.height - 250),"Airplanes/Fokker/Skin 2/PNG/Fokker_default", this.player, this.options);
          this.add(this.enemyPlane);
        }
      }

      if(this.currentLevel.waves[this.currentWave].flaks) {
        for (var i = 0; i < this.currentLevel.waves[this.currentWave].flaks.count; i++){
          this.flak = new Flak(this.game, Math.random() * this.game.world.width, this.game.cache.getImage('bg1').height ,"flak/flak1/turret_1_default", this.player, this.options);
          this.add(this.flak);
        }
      }

      if(this.currentLevel.waves[this.currentWave].soliders) {
        for (var i = 0; i < this.currentLevel.waves[this.currentWave].soliders.count; i++){
          this.options.soliderId = this.currentLevel.waves[this.currentWave].soliders.type;

          // this.solider = new Solider(this.game, Math.random() * this.game.world.width, this.game.world.height ,"soliders/solider"+this.options.soliderId+"/Soldier"+this.options.soliderId+"_default", this.player, this.options);
          this.solider = new Solider(this.game, Math.random() * this.game.world.width, this.game.world.height ,"soliders/solider"+this.options.soliderId+"/Soldier"+this.options.soliderId+"_shot_up_6", this.player, this.options);
          this.add(this.solider);
        }
      }
    } else {
      // alert('Level abgeschlossen');
      this.finishedLevel();
    }
};

/**
* adds enemy
*/
EnemyGroup.prototype.finishedLevel = function () {
    var levelsLocalStorageObject = JSON.parse(localStorage.getItem('levels'));
    if(this.game.state.getCurrentState().currentTimer.seconds < this.currentLevel.stars[1] ){
      if(this.game.state.getCurrentState().currentTimer.seconds < this.currentLevel.stars[2] ){
        if (this.game.state.getCurrentState().currentTimer.seconds < this.currentLevel.stars[3]) {
           levelsLocalStorageObject[GlobalGame.level] = 3;
        } else {
          levelsLocalStorageObject[GlobalGame.level] = 2;
        }
      } else {
        levelsLocalStorageObject[GlobalGame.level] = 1;
      }
      if(GlobalGame.level === Object.keys(levelsLocalStorageObject).length){
        alert('you finished all Singleplayer Levels replay the Levels or play the Multiplayer')
      }
      levelsLocalStorageObject[GlobalGame.level+1] = 0;
    }
    this.game.state.getCurrentState().currentTimer.remove();
    localStorage.setItem('levels', JSON.stringify(levelsLocalStorageObject));
    this.game.state.start('missions');
}

module.exports = EnemyGroup;
