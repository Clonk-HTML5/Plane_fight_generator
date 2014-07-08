'use strict';

  function MultiplayerRoomSelect() {}
  MultiplayerRoomSelect.prototype = {
    preload: function() {
      // Override this method to add some load operations. 
      // If you need to use the loader, you may need to use them here.
    },
    create: function() {
      // This method is called after the game engine successfully switches states. 
      // Feel free to add any setup code here (do not load anything here, override preload() instead).
        this.stage.backgroundColor = '#3498db';
//        // Access the value with:
        console.log(BasicGame.userName);
        if(!navigator.isCocoonJS){
            //create a form
            var f = document.createElement("form");
            f.id = "userNameForm";
            f.className = "sign-up";

            //create input element
            var h = document.createElement("h1");
            h.className = "sign-up-title"; 
            h.textContent = "Playername";
            
//            //create input element
//            var i = document.createElement("input");
//            i.type = "text";
//            i.name = "user_name";
//            i.id = "user_name";
//            i.className = "sign-up-input";
//            i.placeholder = "What's your username?";

            //create a button
            var s = document.createElement("input");
            s.type = "submit";
            s.value = "Submit";
            s.className = "sign-up-button";

            // add all elements to the form
            f.appendChild(h);
//            f.appendChild(i);
            f.appendChild(s);

            // add the form inside the body
            document.getElementsByTagName('body')[0].appendChild(f); //pure javascript
            
            f.addEventListener("submit", this.userSubmited);
        }
    },
    userSubmited: function(evt){
        if (evt && evt.preventDefault) {
            evt.preventDefault();
        }

        if(document.getElementById('user_name').value != ''){
            console.log(document.getElementById('user_name').value)
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
module.exports = MultiplayerRoomSelect;
