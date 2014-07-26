'use strict';
  function MultiplayerRoomDetailView() {}
  MultiplayerRoomDetailView.prototype = {
    create: function() {
      // This method is called after the game engine successfully switches states. 
      // Feel free to add any setup code here (do not load anything here, override preload() instead).
        this.stage.backgroundColor = '#3498db';
//        // Access the value with:
        if(!navigator.isCocoonJS){
            //create a form
            var f = document.createElement("form");
            f.id = "createRoomForm";
            f.className = "create-room sign-up";
            
            //create h element
            var h = document.createElement("h2");
            h.className = "sign-up-title"; 
            h.textContent = "Create Room";
            
            //create input element
            var i = document.createElement("input");
            i.type = "text";
            i.name = "room_name";
            i.id = "room_name";
            i.className = "sign-up-input";
            i.placeholder = "Roomname";

            //create a button
            var s = document.createElement("input");
            s.type = "submit";
            s.value = "Submit";
            s.className = "sign-up-button";

            // add all elements to the form
            f.appendChild(h);
            f.appendChild(i);
            f.appendChild(s);
            
            //create a form
            var rooms = document.createElement("div");
            rooms.className = "room-overview sign-up";
            
            //create h element
            var h2 = document.createElement("h2");
            h2.className = "sign-up-title"; 
            h2.textContent = "Room-Overview";
            
            //create ul element
            var ul = document.createElement("ul");
            ul.className = "room-list-ul";
            
            // array of rooms
            var listData = [ 'Room1' , 'Room2' , 'Room3' , 'CustomRoom' , 'Quickplay'];

            for( var i =  0 ; i < listData.length ; ++i){
                var li = document.createElement("li");
                li.className = "room-list-li";
                li.innerHTML = listData[i];
                
                ul.appendChild(li);
            }
            
            rooms.appendChild(h2);
            rooms.appendChild(ul);
            
            var wrapper = document.createElement("div");
            wrapper.className = "room-wrapper";
            wrapper.appendChild(f);
            wrapper.appendChild(rooms);

            // add the form inside the body
            document.getElementsByTagName('body')[0].appendChild(wrapper); //pure javascript
            
            f.addEventListener("submit", this.userSubmited.bind(this), false);
        }
    },
    userSubmited: function(evt){
        if (evt && evt.preventDefault) {
            evt.preventDefault();
        }
        
        if(document.getElementById('room_name').value != ''){
            GlobalGame.Multiplayer.room = document.getElementById('room_name').value;
            
//           var elem=document.getElementById('createRoomForm')
//            elem.parentNode.removeChild(elem);
            this.game.transitions.to('playMultiplayer');
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
module.exports = MultiplayerRoomDetailView;
