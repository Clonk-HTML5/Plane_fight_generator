'use strict';
var GameController = require('../plugins/GameController');
// var HUDManager = require('../plugins/HUDManager');  
var io = require('../plugins/socket.io');
var BirdGroup = require('../prefabs/birdGroup');
var Player = require('../prefabs/Player');
var PausePanel = require('../prefabs/PausePanel');
var Level = require('../prefabs/Level');
var SocketEventHandlers = require('../prefabs/socketEventHandlers');
var BasicLayer = require('../prefabs/BasicLayer');


function PlayMultiplayer() { }
PlayMultiplayer.prototype = {
    preload: function () {
        // Override this method to add some load operations.
        // If you need to use the loader, you may need to use them here.
    },
    create: function () {

        this.levelJson = this.game.cache.getJSON('levelJson');
        this.currentLevel = this.levelJson.Levels[GlobalGame.level];
        this.level = new Level(this.game, { currentLevel: this.currentLevel });

        this.birdGroup = new BirdGroup(this.game);

        //        this.player = new Player(this.game, 400, 400, "sprites/plane3");
        //        this.game.add.existing(this.player);
        
        this.player = new Player(this.game, parseInt(this.currentLevel.playerStart.x), parseInt(this.currentLevel.playerStart.y), GlobalGame.player);

        GlobalGame.multiplayer.player = this.player;

        this.socketEventHandlers = new SocketEventHandlers(this.game, io);

        GlobalGame.multiplayer.socketEventHandlers = this.socketEventHandlers;

        this.pauseButton = this.game.add.button(this.game.width - 100, 20, 'sprites', this.pauseGame, this, 'buttons/button_pause_act', 'buttons/button_pause_no', 'buttons/button_pause_act', 'buttons/button_pause_no');
        this.pauseButton.fixedToCamera = true;
        this.pauseButton.inputEnabled = true;

        this.pausePanel = new PausePanel(this.game);

        this.createPlayers();

        this.game.input.onDown.add(this.unpause, this);

        //        console.log(GlobalGame.multiplayer.socket.sessionid)
        //        if(!this.socketEventHandlers.playerById(GlobalGame.multiplayer.socket.sessionid))
        GlobalGame.multiplayer.socket.emit("new player", { x: this.player.x, y: this.player.y, angle: this.player.angle, name: GlobalGame.multiplayer.userName });
    },
    createPlayers: function () {
        //        this.basicLayer.removeAll();

        this.game.add.existing(this.player);
        if (!this.player.alive) {
            this.player.x = this.currentLevel.playerStart.x
            this.player.y = this.currentLevel.playerStart.y;
            this.player.body.velocity.setTo(300, 0);
            this.player.revive(5);
            //            this.player.bullets.reverse();
            //            this.player.emitter.revive();
        }

    },

    restart: function () {
        this.game.state.restart();
    },
    menu: function () {
        this.game.state.start('menu', true, false);
    },

    paused: function () {
    },

    pauseGame: function () {
        if (!this.game.paused) {
            // Enter pause
            this.pausePanel.show(function () {
                this.game.paused = true;
                this.pauseButton.visible = false;
            });
        }
    },

    playGame: function () {
        if (this.game.paused) {
            // Leaving pause
            this.pausePanel.hide();
            this.game.paused = false;
            this.pauseButton.visible = true;
        }
    },
    unpause: function (event) {
        if (this.game.paused) {
            var w = this.game.width,
                h = this.game.height,
                x1 = w / 2 - 260 / 2, x2 = w / 2 + 245 / 2,
                y1 = h / 2 - 90 / 2, y2 = h / 2 + 90 / 2;

            // Check if the click was inside the menu
            if (event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2) {
                // Get menu local coordinates for the click
                var x = event.x - x1,
                    y = event.y - y1;

                // Calculate the choice
                var choise = Math.floor(x / 100) + 3 * Math.floor(y / 100);
                //                var choise = (x / 90)<< 0 + (3 * (y / 90)<< 0);

                // console.log(choise)
                switch (choise) {
                    case 0:
                        this.playGame();
                        break;
                    case 1:
                        this.playGame();
                        this.restart();
                        break;
                    case 2:
                        this.playGame();
                        this.menu();
                        break;
                }
            } else {
                this.playGame();
            }
        }
    },
    shutdown: function () {

    }
};
module.exports = PlayMultiplayer;
