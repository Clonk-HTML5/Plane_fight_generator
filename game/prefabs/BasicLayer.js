'use strict';

var BasicLayer = function(game, parent, options) {
  Phaser.Group.call(this, game, parent);

    var layerText = options.layerText ? options.layerText : "Welcome to the Tutorial!";
    var subLayerText = options.subLayerText ? options.subLayerText : "Here you will learn how to play this game. No Enemies !!! Just flying.";

    this.b = this.game.add.bitmapData(this.game.width, this.game.height),
    this.b.ctx.fillStyle = "#000",
    this.b.ctx.fillRect(0, 0,  this.game.width, this.game.height);

    this.c = this.create(0, 0, this.b);
    this.c.fixedToCamera = true;
    this.c.alpha = 0.5;

    this.fontStyle = { font: "35px loudy_With_a_Chance_of_Love", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" };
    this.smallerfontStyle = { font: "25px loudy_With_a_Chance_of_Love", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" };
    this.layerText = this.game.add.text(this.game.width/2, this.game.height/2 - 180, layerText, this.fontStyle);
    this.layerText.anchor.set(0.5);
    this.layerText.fixedToCamera = true;
    this.add(this.layerText);
    this.subLayerText = this.game.add.text(this.game.width/2, this.game.height/2 - 120, subLayerText, this.smallerfontStyle);
    this.subLayerText.fixedToCamera = true;
    this.subLayerText.anchor.set(0.5);
    this.subLayerText.wordWrap = true;
    this.subLayerText.wordWrapWidth = this.game.width/2;
    this.add(this.subLayerText);
    
    if(options.currentLevel) {
      var waveText = this.game.add.text(this.game.width/2, this.game.height/2 - 80, options.currentLevel.waves.count + ' Waves', this.smallerfontStyle);
          waveText.anchor.set(0.5);
      this.add(waveText);
      
      for (var i = 1; i <= options.currentLevel.waves.count; i++){
        var currentWave = options.currentLevel.waves[i];
          
        var currentWaveText = this.game.add.text(this.game.width/2, i > 1 ? this.game.height/2 + i * 30 : this.game.height/2 - 20, 'Wave ' + i, this.smallerfontStyle);
            currentWaveText.anchor.set(0.5);
        this.add(currentWaveText);
        
        var enemyImagesXPosition = i > 1 ? this.game.height/2 + i * 35 : this.game.height/2 - 10;
        
        if(currentWave.planes) {
          var enemyImageText = this.game.add.text(this.game.width/2 - 170 , enemyImagesXPosition, currentWave.planes.count + 'x', this.smallerfontStyle);
          var enemyImage = this.game.add.image(this.game.width/2 - 110 , enemyImagesXPosition,"airplanes",GlobalGame.enemy);
          this.add(enemyImageText);
          this.add(enemyImage);
        }
    
        if(currentWave.flaks) {
          var enemyFlakImageText = this.game.add.text(this.game.width/2 , enemyImagesXPosition, currentWave.flaks.count + 'x', this.smallerfontStyle);
          var enemyFlakImage = this.game.add.image(this.game.width/2 + 70 , enemyImagesXPosition,"flak","flak/flak1/turret_1_default");
          this.add(enemyFlakImageText);
          this.add(enemyFlakImage);
        }
    
        if(currentWave.soliders) {
          var enemySoliderImageText = this.game.add.text(this.game.width/2 + 30 , enemyImagesXPosition, currentWave.soliders.count + 'x', this.smallerfontStyle);
          var soliderId = currentWave.soliders.type;
          var enemySoliderImage = this.game.add.image(this.game.width/2 + 100 , enemyImagesXPosition,"soliders","soliders/solider"+soliderId+"/Soldier"+soliderId+"_shot_up_6");
          this.add(enemySoliderImageText);
          this.add(enemySoliderImage);
        }
      }
    }
		this.game.input.onDown.add(this.hideLayer, this);

};

BasicLayer.prototype = Object.create(Phaser.Group.prototype);
BasicLayer.prototype.constructor = BasicLayer;

BasicLayer.prototype.show = function () {
  this.y = 0;
};
BasicLayer.prototype.hideLayer = function () {
  var direction = this.game.input.activePointer.x <= this.game.width / 2 ? 0 : 1;
  if(direction) {
    this.game.input.onDown.remove(this.hideLayer, this);
    this.hide(true);
  }
};

BasicLayer.prototype.setOptions = function (options) {
  this.layerText.setText(options.layerText);
  this.subLayerText.setText(options.subLayerText);
};

BasicLayer.prototype.hide = function (createPlayers) {
  if(createPlayers) {
    this.game.state.getCurrentState().createPlayers();
  }
  this.y = -this.game.world.height;
};

module.exports = BasicLayer;
