
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

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.asset = this.add.sprite(this.game.width/2 * this.game.world.scale.x,this.game.height/2 * this.game.world.scale.y, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(this.asset);

    //all Sprites
    this.load.atlasJSONHash('sprites', 'assets/sprites.png', 'assets/sprites.json');
    this.load.atlasJSONHash('airplanes', 'assets/airplanes.png', 'assets/airplanes.json');
    this.load.atlasJSONHash('soliders', 'assets/soliders.png', 'assets/soliders.json');
    this.load.atlasJSONHash('flak', 'assets/flak.png', 'assets/flak.json');
    // this.load.atlasJSONHash('sprites1', 'assets/sprites1.png', 'assets/sprites1.json');
    // this.load.atlasJSONHash('sprites2', 'assets/sprites2.png', 'assets/sprites2.json');

    this.load.json('levelJson', 'assets/levels/levels.json');

    //BIRD
    this.load.spritesheet('birdie', 'assets/img/sprites/bird.png', 189, 169, 3);

    //PLAYER
    this.load.spritesheet('airplaneexplode', 'assets/img/sprites/effects/airplaneexplosion.png', 128, 115, 8);

    //PLAYER Buttons
    this.load.spritesheet('buttonvertical', 'assets/img/buttons/button-vertical.png',64,64);
    this.load.spritesheet('buttonhorizontal', 'assets/img/buttons/button-horizontal.png',96,64);
    this.load.spritesheet('buttondiagonal', 'assets/img/buttons/button-diagonal.png',64,64);
    this.load.spritesheet('buttonfire', 'assets/img/buttons/button-round-a.png',96,96);
    this.load.spritesheet('buttonjump', 'assets/img/buttons/button-round-b.png',96,96);

    //LEVEL
//    this.load.image('bg1', 'assets/backgrounds/bg1.png');
//    this.load.image('bg2', 'assets/backgrounds/bg2.png');
    this.load.image('bg1', 'assets/backgrounds/cloudsBackground.png');
    this.load.image('ground', 'assets/backgrounds/ground.png');
    this.load.image('treesMountain1', 'assets/backgrounds/treesMountain.png');

  },
  create: function() {
    this.asset.cropEnabled = false;
//    if (this.game.device.desktop){
//        var stats = new Stats();
//        stats.setMode(0); // 0: fps, 1: ms
//
//        // Align top-left
//        stats.domElement.style.position = 'absolute';
//        stats.domElement.style.left = '0px';
//        stats.domElement.style.top = '0px';
//
//        document.body.appendChild( stats.domElement );
//
//        setInterval( function () {
//
//            stats.begin();
//
//            // your code goes here
//
//            stats.end();
//
//        }, 1000 / 60 );
//    }
  },

  update: function() {
    if(!!this.ready) {
        /* transition handling  */
//        this.game.transitions = this.game.plugins.add(Phaser.Plugin.StateTransition);
//        this.game.transitions.settings({
//            ease: Phaser.Easing.Bounce.Out,
//            duration: 1000,
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
