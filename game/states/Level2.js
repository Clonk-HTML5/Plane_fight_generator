'use strict';
  function Level2() {}
  Level2.prototype = {
    preload: function() {
      // Override this method to add some load operations. 
      // If you need to use the loader, you may need to use them here.
    },
    create: function() {
      // This method is called after the game engine successfully switches states. 
        
        this.game.world.setBounds(0, 0, 8000, 2000);
        //fix background to camera
        this.background = this.game.add.sprite(0, 0, 'sky_new');
        this.background.fixedToCamera = true;
        this.background.cameraOffset.x = 0;
        this.background.cameraOffset.y = 0;
    },
    update: function() {
      // state update code
    },
    paused: function() {
      // This method will be called when game paused.
    },
    render: function() {
      // Put render operations here.
    },
    shutdown: function() {
      // This method will be called when the state is shut down 
      // (i.e. you switch to another state from this one).
    }
  };
module.exports = Level2;
