
'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.asset = this.add.sprite(this.game.width/2,this.game.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(this.asset);
      
    this.load.image('yeoman', 'assets/yeoman-logo.png');
      
    //MENU
      this.load.image('start_button', 'assets/img/menu/start_button.png');
      this.load.image('menu_bg', 'assets/img/menu/menu_bg.jpg');
      this.load.image('singleplayer', 'assets/img/menu/Singleplayer.png');
      this.load.image('multiplayer', 'assets/img/menu/Multiplayer.png');
      this.load.image('pause', 'assets/img/menu/pause_64.png');
      
    //PLAYER
        this.load.image('plane3', 'assets/img/sprites/plane3.png');
//        this.game.load.image('smoke', 'assets/img/sprites/smoke.png');
        this.load.image('smoke_puff', 'assets/img/sprites/particles/smoke-puff.png');
        this.load.image('smoke', 'assets/img/sprites/particles/pump_smoke_04.png');
        this.load.image('bullet', 'assets/img/sprites/bullet.png');
        this.load.image('bullet2', 'assets/img/sprites/bullet2.png');
        this.load.spritesheet('explode', 'assets/img/sprites/effects/explode.png', 64, 64, 16 );
        this.load.spritesheet('bombexplode', 'assets/img/sprites/effects/bombexplosion.png', 128, 115, 8);
        this.load.spritesheet('airplaneexplode', 'assets/img/sprites/effects/airplaneexplosion.png', 128, 115, 8);
    //LEVEL
        this.load.image('sky', 'assets/img/level/sky.png');
        this.load.image('sky_new', 'assets/img/level/sky_new.png');
        this.load.image('clouds', 'assets/img/level/whiteclouds.png');
        this.load.image('clouds1', 'assets/img/level/cloud_fluffy_1.png');
        this.load.image('clouds2', 'assets/img/level/cloud_fluffy_2.png');
        this.load.image('ground', 'assets/img/level/crosssection_long_new.png');
//        this.load.image('tree0', 'assets/img/level/tree_canopy_single_1.png');
//        this.load.image('tree0', 'assets/img/level/trees/obj_trees1_001.png');
//        this.load.image('tree1', 'assets/img/level/trees/obj_trees1_002.png');
//        this.load.image('tree2', 'assets/img/level/trees/obj_trees1_003.png');
//        this.load.image('tree3', 'assets/img/level/trees/obj_trees1_004.png');
//        this.load.image('tree4', 'assets/img/level/trees/obj_trees1_005.png');
        this.load.image('tree0', 'assets/img/level/trees/tree_coniferous_1.png');
        this.load.image('tree1', 'assets/img/level/trees/tree_coniferous_3.png');
        this.load.image('tree2', 'assets/img/level/trees/tree_coniferous_4.png');
        this.load.image('tree3', 'assets/img/level/trees/tree_coniferous_4.png');
        this.load.image('tree4', 'assets/img/level/trees/tree_deciduous3.png');
        this.load.image('mountains', 'assets/img/level/mountains.png');
      
        //BIRD
        this.load.spritesheet('birdie', 'assets/img/sprites/bird.png', 189, 169, 3);

  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
