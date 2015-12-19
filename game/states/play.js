
'use strict';
var BirdGroup = require('../prefabs/birdGroup');
var Player = require('../prefabs/Player');
var EnemyGroup = require('../prefabs/EnemyGroup');
var Level = require('../prefabs/Level');
var PausePanel = require('../prefabs/PausePanel');
var BasicLayer = require('../prefabs/BasicLayer');
// var Level_old = require('../prefabs/Level_old');
// var GameController = require('../plugins/GameController');
// var HUDManager = require('../plugins/HUDManager');

function Play() { }
Play.prototype = {
    create: function () {

        this.levelJson = this.game.cache.getJSON('levelJson');
        this.currentLevel = this.levelJson.Levels[GlobalGame.level];
        console.log(this.currentLevel)

        this.level = new Level(this.game, { currentLevel: this.currentLevel });

        this.birdGroup = new BirdGroup(this.game);

        this.player = new Player(this.game, parseInt(this.currentLevel.playerStart.x), parseInt(this.currentLevel.playerStart.y), GlobalGame.player);

        this.enemyGroup = new EnemyGroup(this.game, this.player, { currentLevel: this.currentLevel });
        this.enemyGroup.addEnemy();

        this.pauseButton = this.game.add.button(this.game.width - 100, 20, 'sprites', this.pauseGame, this, 'buttons/button_pause_act', 'buttons/button_pause_no', 'buttons/button_pause_act', 'buttons/button_pause_no');
        this.pauseButton.fixedToCamera = true;
        this.pauseButton.inputEnabled = true;

        this.createPlayers();

        this.pausePanel = new PausePanel(this.game);

        // this.zoomTo(GlobalGame.scale);

        this.game.input.onDown.add(this.unpause, this);

        this.currentTimer = this.game.time.create(false);
        this.currentTimer.start();
    },

    update: function () {
        this.enemyGroup.forEachAlive(function (enemy) {
            this.game.physics.arcade.overlap(enemy, this.player.bullets, enemy.enemyLoseHealth, null, enemy);
            this.game.physics.arcade.overlap(this.player, enemy.bullets, this.player.playerHitsSomething, null, this.player);
        }, this);

        var firstAliveEnemy = this.enemyGroup.getFirstAlive();
        if (firstAliveEnemy) {
            if (!firstAliveEnemy.inCamera) {
                firstAliveEnemy.arrow.visible = true;
                firstAliveEnemy.arrow.rotation = this.game.physics.arcade.angleBetween(firstAliveEnemy.arrow, firstAliveEnemy);
            } else {
                firstAliveEnemy.arrow.visible = false;
            }
        }
    },

    render: function () {
        //  this.game.debug.text(this.currentTimer.seconds, 32, 32);
        //  this.game.debug.body(this.player, 32, 32);
        //        this.game.debug.cameraInfo(this.game.camera, 32, 32);
        // this.game.debug.cameraInfo(this.game.camera, 500, 32);
        // this.game.debug.spriteCoords(this, 32, 32);
        // this.game.debug.spriteInfo(this.enemyGroup.flak, 32, 32);
        // this.game.debug.body(this.enemyGroup.solider, 32, 32);
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
        this.currentTimer.pause();
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
            this.currentTimer.resume();
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
    /**
     * This method will be called when the state is shut down
     * (i.e. you switch to another state from this one).
     */
    shutdown: function () {
        this.currentTimer.remove();
    }

};

module.exports = Play;
