GlobalGame = {

    /* Here we've just got some global level vars that persist regardless of State swaps */
    score: 0,

    /* If the music in your game needs to play through-out a few State swaps, then you could reference it here */
    music: null,

    /* Your game can check BasicGame.orientated in internal loops to know if it should pause or not */
    orientated: false,
    
    player: null,
    
    /* 
    * Controller of the Ship: 
    *  **keyboardButtons (Keyboard on Desktop Buttons on Mobile)
    *  **touch (click and touch)
    */
    controller: 'touch',
    
    Multiplayer: {
        
        socket: null,
        
        socketEventHandlers: null,

        userName: null,
        
        connected: false
    }

};

//Clay = {};
//Clay.gameKey = "planefight";
//Clay.readyFunctions = [];
//Clay.ready = function( fn ) {
//    Clay.readyFunctions.push( fn );
//};
//( function() {
//    var clay = document.createElement("script"); clay.async = true;
//    clay.src = ( "https:" == document.location.protocol ? "https://" : "http://" ) + "clay.io/api/api.js"; 
//    var tag = document.getElementsByTagName("script")[0]; tag.parentNode.insertBefore(clay, tag);
//} )();

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.stage.backgroundColor = '#3498db';
      
    this.game.input.maxPointers = 1;
    
    this.stage.disableVisibilityChange = true;
      
    if (this.game.device.desktop)
    {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setMinMax(480, 260, 1024, 768);
//        this.scale.pageAlignHorizontally = true;
//        this.scale.pageAlignVertically = true;
    }
    else
    {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setMinMax(480, 260, 1024, 768);
//        this.scale.pageAlignHorizontally = true;
//        this.scale.pageAlignVertically = true;
        this.scale.forceOrientation(true, false);
        this.scale.setResizeCallback(this.gameResized, this);
//        this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
//        this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
    }
      
    //debug plugin
//    this.game.add.plugin(Phaser.Plugin.Debug);  
//    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  },
};

module.exports = Boot;
