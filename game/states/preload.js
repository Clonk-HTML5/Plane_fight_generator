
'use strict';

var Transitions = require('../plugins/phaser-state-transition.min.js');
//var stats = require('../plugins/stats.min.js');
// stats.js - http://github.com/mrdoob/stats.js
var Stats=function(){var l=Date.now(),m=l,g=0,n=Infinity,o=0,h=0,p=Infinity,q=0,r=0,s=0,f=document.createElement("div");f.id="stats";f.addEventListener("mousedown",function(b){b.preventDefault();t(++s%2)},!1);f.style.cssText="width:80px;opacity:0.9;cursor:pointer";var a=document.createElement("div");a.id="fps";a.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#002";f.appendChild(a);var i=document.createElement("div");i.id="fpsText";i.style.cssText="color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";
i.innerHTML="FPS";a.appendChild(i);var c=document.createElement("div");c.id="fpsGraph";c.style.cssText="position:relative;width:74px;height:30px;background-color:#0ff";for(a.appendChild(c);74>c.children.length;){var j=document.createElement("span");j.style.cssText="width:1px;height:30px;float:left;background-color:#113";c.appendChild(j)}var d=document.createElement("div");d.id="ms";d.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#020;display:none";f.appendChild(d);var k=document.createElement("div");
k.id="msText";k.style.cssText="color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";k.innerHTML="MS";d.appendChild(k);var e=document.createElement("div");e.id="msGraph";e.style.cssText="position:relative;width:74px;height:30px;background-color:#0f0";for(d.appendChild(e);74>e.children.length;)j=document.createElement("span"),j.style.cssText="width:1px;height:30px;float:left;background-color:#131",e.appendChild(j);var t=function(b){s=b;switch(s){case 0:a.style.display=
"block";d.style.display="none";break;case 1:a.style.display="none",d.style.display="block"}};return{REVISION:11,domElement:f,setMode:t,begin:function(){l=Date.now()},end:function(){var b=Date.now();g=b-l;n=Math.min(n,g);o=Math.max(o,g);k.textContent=g+" MS ("+n+"-"+o+")";var a=Math.min(30,30-30*(g/200));e.appendChild(e.firstChild).style.height=a+"px";r++;b>m+1E3&&(h=Math.round(1E3*r/(b-m)),p=Math.min(p,h),q=Math.max(q,h),i.textContent=h+" FPS ("+p+"-"+q+")",a=Math.min(30,30-30*(h/100)),c.appendChild(c.firstChild).style.height=
a+"px",m=b,r=0);return b},update:function(){l=this.end()}}};

function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.stage.backgroundColor = '#3498db';
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//    this.game.world.scale.setTo(0.5,0.5);  
    if (this.game.device.desktop)
        {
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.minWidth = 480;
            this.game.scale.minHeight = 260;
            this.game.scale.maxWidth = 1024;
            this.game.scale.maxHeight = 768;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.scale.setScreenSize(true);
        }
        else
        {
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.minWidth = 480;
            this.game.scale.minHeight = 260;
            this.game.scale.maxWidth = 1024;
            this.game.scale.maxHeight = 768;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.scale.forceOrientation(true, false);
//            this.game.scale.hasResized.add(this.gameResized, this);
//            this.game.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
//            this.game.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            this.game.scale.setScreenSize(true);
        }

      
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.asset = this.add.sprite(this.game.width/2 * this.game.world.scale.x,this.game.height/2 * this.game.world.scale.y, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(this.asset);
      
    //MENU
      this.load.image('singleplayer', 'assets/img/menu/Singleplayer.png');
      this.load.image('multiplayer', 'assets/img/menu/Multiplayer.png');
      this.load.image('pause', 'assets/img/menu/pause_64.png');
      this.load.image('btnpause', 'assets/img/menu/btn-pause.png');
      this.load.image('btnplay', 'assets/img/menu/btn-play.png');
      this.load.image('panel', 'assets/img/menu/panel.png');
//      this.load.bitmapFont('kenpixelblocks', 'assets/fonts/kenpixelblocks/kenpixelblocks.png', 'assets/fonts/kenpixelblocks/kenpixelblocks.fnt');
      
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
        //PLAYER Buttons
        this.load.spritesheet('buttonvertical', 'assets/img/buttons/button-vertical.png',64,64);
        this.load.spritesheet('buttonhorizontal', 'assets/img/buttons/button-horizontal.png',96,64);
        this.load.spritesheet('buttondiagonal', 'assets/img/buttons/button-diagonal.png',64,64);
        this.load.spritesheet('buttonfire', 'assets/img/buttons/button-round-a.png',96,96);
        this.load.spritesheet('buttonjump', 'assets/img/buttons/button-round-b.png',96,96);
      
    
    //LEVEL
//        this.load.image('sky', 'assets/img/level/sky.png');
        this.load.image('sky_new', 'assets/img/level/sky_new.png');
//        this.load.image('clouds', 'assets/img/level/whiteclouds.png');
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
        this.load.image('tree3', 'assets/img/level/trees/tree_deciduous3.png');
//        this.load.image('tree4', 'assets/img/level/trees/tree_deciduous3.png');
        this.load.image('mountains', 'assets/img/level/mountains.png');
      
        //BIRD
        this.load.spritesheet('birdie', 'assets/img/sprites/bird.png', 189, 169, 3);

  },
  create: function() {
    this.asset.cropEnabled = false;
    if (this.game.device.desktop){
        var stats = new Stats();
        stats.setMode(0); // 0: fps, 1: ms

        // Align top-left
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';

        document.body.appendChild( stats.domElement );

        setInterval( function () {

            stats.begin();

            // your code goes here

            stats.end();

        }, 1000 / 60 );
    }
  },
  update: function() {
    if(!!this.ready) {
        /* transition handling  */
        this.game.transitions = this.game.plugins.add(Phaser.Plugin.StateTransition);
        this.game.transitions.settings({
            ease: Phaser.Easing.Bounce.Out,
            duration: 1000,
            properties: {
                alpha: 0,
                scale: {
                    x: 0.5,
                    y: 0.5
                }
            }
        }) 
        /* transition handling  */
//        this.game.gameoverTransition = this.game.plugins.add(Phaser.Plugin.StateTransition);
//        this.game.gameoverTransition.settings({
//            duration: 1000,
//            //ease property
////            ease: Phaser.Easing.Exponential.InOut, /* default ease */
//            properties: {
//                alpha: 0,
//                scale: {
//                    x: 0.5,
//                    y: 0.5
//                }
//            }
//        })
        
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
