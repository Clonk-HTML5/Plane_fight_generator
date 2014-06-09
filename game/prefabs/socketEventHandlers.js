'use strict';
var socketPlayer,
    socketGame,
    socketInGlobalScope,
    socketEnemies = [],
    SocketObject,
    SocketRemotePlayer = require('../prefabs/socketRemotePlayer');  

var SocketEventHandlers = function(game, player, io) {
        // Start listening for events
            //  Create some baddies to waste :)
//        this.enemies = [];
        socketGame = game;
        socketPlayer = player;
        SocketObject = this;
//        this.socket = io.connect("http://localhost", {port: 8120, transports: ["websocket"]});
//        this.socket = io.connect("http://localhost:8120");
//        this.socket = io.connect("http://192.168.1.5:8120");
//        this.socket = io.connect("http://neumic-asnort.codio.io:8120");
         this.socket = io.connect("http://christian-dev.no-ip.biz:8120");
        socketInGlobalScope = this.socket;
        this.setEventHandlers();
  
};

SocketEventHandlers.prototype.constructor = SocketEventHandlers;

SocketEventHandlers.prototype = {

    setEventHandlers: function() {
        
        // Socket connection successful
        socketInGlobalScope.on("connect", this.onSocketConnected);

        // Socket disconnection
        socketInGlobalScope.on("disconnect", this.onSocketDisconnect);

        // New player message received
        socketInGlobalScope.on("new player", this.onNewPlayer);

        // Player move message received
        socketInGlobalScope.on("move player", this.onMovePlayer);

        // Player fires bullet message received
        socketInGlobalScope.on("fire bullet", this.onFireBullet);

        // Bullet hits Player message received
        socketInGlobalScope.on("bullet hit player", this.onBulletHitPlayer);

        // Player removed message received
        socketInGlobalScope.on("remove player", this.onRemovePlayer);

    },

    // Socket connected
    onSocketConnected: function(socket) {
        console.log("Connected to socket server ");
        
        
        var bullet = socketPlayer.bullets.getFirstExists(false)
        // Send local player data to the game server
        socketInGlobalScope.emit("new player", {x: socketPlayer.x, y:socketPlayer.y, angle: socketPlayer.angle, bulletX: bullet.x, bulletY: bullet.y,bulletAngle: bullet.rotation});
//        this.socket.emit("new player");
    },

    // Socket disconnected
    onSocketDisconnect: function() {
        console.log("Disconnected from socket server");
    },

    
    // New player
    onNewPlayer: function(data) {
        console.log("New player connected: "+data.id + " players " + socketEnemies.length);

         var bullet = socketPlayer.bullets.getFirstExists(false);
        // Add new player to the remote players array data.x, data.y
        socketEnemies.push(new SocketRemotePlayer(data.id, socketGame, socketPlayer, data.x, data.y, socketPlayer.angle, socketPlayer.bullets, bullet.x, bullet.y, bullet.rotation));
        
        console.log(" players " + socketEnemies.length)
        
//        this.enemies.push(new Player(this.game, data.id));
    },

    // Move player
    onMovePlayer: function(data) {
        
        var movePlayer = SocketObject.playerById(data.id);

        // Player not found
        if (!movePlayer) {
            console.log("Player not found: "+data.id);
            return;
        };
        // Update player position
        movePlayer.x = data.x;
        movePlayer.y = data.y;
        movePlayer.angle = data.angle;
        
        var px = data.x;
        var py = data.y;

        px *= -1;
        py *= -1;

//        movePlayer.emitter.minParticleSpeed.set(px, py);
//        movePlayer.emitter.maxParticleSpeed.set(px, py);
        
        movePlayer.emitter.emitX = data.x;
        movePlayer.emitter.emitY = data.y;

    },
    // Player fires Bullet
    onFireBullet: function(data) {

        var playerHowFired = SocketObject.playerById(data.id),
            bulletTime = 0;

        // Player not found
        if (!playerHowFired) {
            console.log("Player not found: "+data.id);
            return;
        };
        
       if (game.time.now > bulletTime)
        {
            var bullet = playerHowFired.bullets.getFirstExists(false);
            
//                               console.log(game.time.now, bullet)
            
            if (bullet)
            {
                bullet.reset(data.bulletX, data.bulletY);
//                bullet.body.velocity.copyFrom(this.game.physics.arcade.velocityFromAngle(this.plane.angle, 1000))
//                bullet.rotation = this.plane.rotation + this.game.math.degToRad(90);
                bullet.lifespan = 2000;
                 bullet.rotation = data.bulletAngle;
                bullet.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(data.angle, 1000))
//                game.physics.arcade.velocityFromRotation(data.angle, 1000, bullet.body.velocity);
                bulletTime = game.time.now + 250;
            }
        }
        
        // Update player position
//        playerHowFired.bullet.x = data.bulletX;
//        playerHowFired.bullet.y = data.bulletY;
//        playerHowFired.bullet.rotation = data.bulletAngle;
//        playerHowFired.bullet.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(data.angle, 1000))

    },
    // Player fires Bullet
    onBulletHitPlayer: function(data) {

        var playerGetsHit = SocketObject.playerById(data.playerId);
        
        if(playerGetsHit){
            // an other player was shooted
            playerGetsHit.player.health -= 1;
            if(playerGetsHit.player.health < 1){
                playerGetsHit.player.kill();
            }
        }else{
            // i think me was shooted
            socketPlayer.health -= 1;
            if(socketPlayer.health < 1){
               socketPlayer.kill();
            }
        }
        
//        console.log(data)
//        console.log(bullet.x, data.bulletX, bullet.rotation, data.bulletAngle)
        // Update player position
//        playerHowFired.bullet.x = data.bulletX;
//        playerHowFired.bullet.y = data.bulletY;
//        playerHowFired.bullet.rotation = data.bulletAngle;
//        playerHowFired.bullet.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(data.angle, 1000))

    },

    // Remove player
    onRemovePlayer: function(data) {

        var removePlayer = SocketObject.playerById(data.id);

        // Player not found
        if (!removePlayer) {
            console.log("Player not found: "+data.id);
            return;
        };

        removePlayer.player.kill();

        // Remove player from array
        socketEnemies.splice(socketEnemies.indexOf(removePlayer), 1);

    },
        // Find player by ID
        playerById: function(id) {
            var i;
            for (i = 0; i < socketEnemies.length; i++) {
                if (socketEnemies[i].name == id)
                    return socketEnemies[i];
            };

            return false;
        }
};

module.exports = SocketEventHandlers;
