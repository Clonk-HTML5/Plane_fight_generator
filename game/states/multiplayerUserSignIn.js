'use strict';

  var io = require('../plugins/socket.io');  
  var SocketEventHandlers = require('../prefabs/socketEventHandlers');  

  function MultiplayerUserSignIn() {}
  MultiplayerUserSignIn.prototype = {
    preload: function() {
      // Override this method to add some load operations. 
      // If you need to use the loader, you may need to use them here.
    },
    create: function() {
      // This method is called after the game engine successfully switches states. 
      // Feel free to add any setup code here (do not load anything here, override preload() instead).
        this.stage.backgroundColor = '#3498db';
//        // Access the value with:
//        console.log( this.username.value );
        if(!navigator.isCocoonJS){
            //create a form
            var f = document.createElement("form");
            f.id = "userNameForm";
            f.className = "sign-up";

            //create input element
            var h = document.createElement("h1");
            h.className = "sign-up-title"; 
            h.textContent = "Playername";
            
            //create input element
            var i = document.createElement("input");
            i.type = "text";
            i.name = "user_name";
            i.id = "user_name";
            i.className = "sign-up-input";
            i.placeholder = "What's your username?";
            i.defaultValue = localStorage.getItem('plane_fight_multiplayer_user_name');

            //create a button
            var s = document.createElement("input");
            s.type = "submit";
            s.value = "Submit";
            s.className = "sign-up-button";

            // add all elements to the form
            f.appendChild(h);
            f.appendChild(i);
            f.appendChild(s);

            // add the form inside the body
            document.getElementsByTagName('body')[0].appendChild(f); //pure javascript
            
            f.addEventListener("submit", this.userSubmited.bind(this), false);
        }
    },
    userSubmited: function(evt){
        if (evt && evt.preventDefault) {
            evt.preventDefault();
        }

        if(document.getElementById('user_name').value != ''){
            GlobalGame.multiplayer.userName = document.getElementById('user_name').value;
            localStorage.setItem('plane_fight_multiplayer_user_name', GlobalGame.multiplayer.userName);
            
            var socketEventHandlers = new SocketEventHandlers(this.game, io, null);
            
            var localGame = this.game;
            
            GlobalGame.multiplayer.socket.on("connect",function(socket){
                var elem=document.getElementById('userNameForm');
                if(elem)
                    elem.parentNode.removeChild(elem);
                
//                localGame.transitions.to('multiplayerRoomSelect');
//                  localGame.state.start('playMultiplayer');
                  localGame.state.start('selectPlane', true, false, true);
            });
        }
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
module.exports = MultiplayerUserSignIn;
