'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(Math.ceil(480*window.innerWidth/500) , 500, Phaser.CANVAS, 'plane_fight');

  // Game States
  game.state.add('Level2', require('./states/Level2'));
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('multiplayerRoomDetailView', require('./states/multiplayerRoomDetailView'));
  game.state.add('multiplayerRoomSelect', require('./states/multiplayerRoomSelect'));
  game.state.add('multiplayerUserSignIn', require('./states/multiplayerUserSignIn'));
  game.state.add('play', require('./states/play'));
  game.state.add('playMultiplayer', require('./states/playMultiplayer'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};