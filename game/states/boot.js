GlobalGame = {

    /* Here we've just got some global level vars that persist regardless of State swaps */
    score: 0,

    /* If the music in your game needs to play through-out a few State swaps, then you could reference it here */
    music: null,

    /* Your game can check BasicGame.orientated in internal loops to know if it should pause or not */
    orientated: false,

    player: 'Airplanes/Fokker/Skin_1/default',

    enemy: 'Airplanes/Fokker/Skin_1/default',

    /* Current Level */
    level: 1,

    // scale: 0.7,
    scale: 1,

    tutorialPlayed: 0,

    /*
    * Controller of the Ship:
    *  **keyboardButtons (Keyboard on Desktop Buttons on Mobile)
    *  **touch (click and touch)
    */
    controller: 'touch',

    multiplayer: {
        
        player: null,
        
        enemySprite: 'Airplanes/Fokker/Skin_1/default',

        socket: null,

        socketEventHandlers: null,

        userName: null,

        connected: false
    }

};

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/img/preloader.gif');
    this.load.image('menu_bg', 'assets/img/menu.png');
  },
  create: function() {
    this.stage.backgroundColor = '#3498db';
    this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.height, 'menu_bg');
    this.stage.addChildAt(this.background,0);

    this.game.input.maxPointers = 1;

    this.stage.disableVisibilityChange = true;

    if (this.game.device.desktop)
    {
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setMinMax(480, 260, 1024, 768);
//        this.scale.pageAlignHorizontally = true;
//        this.scale.pageAlignVertically = true;
    }
    else
    {
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
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
