(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(Math.ceil(480*640/480) , 480, Phaser.CANVAS, 'plane_fight');

  // Game States
  game.state.add('Level2', require('./states/Level2'));
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('help', require('./states/help'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('missions', require('./states/missions'));
  game.state.add('multiplayerRoomDetailView', require('./states/multiplayerRoomDetailView'));
  game.state.add('multiplayerRoomSelect', require('./states/multiplayerRoomSelect'));
  game.state.add('multiplayerUserSignIn', require('./states/multiplayerUserSignIn'));
  game.state.add('play', require('./states/play'));
  game.state.add('playMultiplayer', require('./states/playMultiplayer'));
  game.state.add('preload', require('./states/preload'));
  game.state.add('selectPlane', require('./states/selectPlane'));
  game.state.add('settings', require('./states/settings'));
  game.state.add('tutorial', require('./states/tutorial'));
  

  game.state.start('boot');
};
},{"./states/Level2":22,"./states/boot":23,"./states/gameover":24,"./states/help":25,"./states/menu":26,"./states/missions":27,"./states/multiplayerRoomDetailView":28,"./states/multiplayerRoomSelect":29,"./states/multiplayerUserSignIn":30,"./states/play":31,"./states/playMultiplayer":32,"./states/preload":33,"./states/selectPlane":34,"./states/settings":35,"./states/tutorial":36}],2:[function(require,module,exports){
/**
 * Helpers 
 */
( function(exports) {
	var __slice = [].slice;
	var __hasProp = {}.hasOwnProperty;
	var __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
	/* $.extend functionality */
	function extend( target, src )
	{
		var options, name, copy, copyIsArray, clone,
			i = 1,
			length = 2,
			deep = true;
	
		// Handle a deep copy situation
		if( typeof target === "boolean" )
		{
			deep = target;
			// skip the boolean and the target
			i = 2;
		}
	
		// Handle case when target is a string or something( possible in deep copy )
		if( typeof target !== "object" && !typeof target === 'function' )
		{
			target = {};
		}
		// Only deal with non-null/undefined values
		if( options = src )
		{
			// Extend the base object
			for( name in options )
			{
				src = target[name];
				copy = options[name];
	
				// Prevent never-ending loop
				if( target === copy )
				{
					continue;
				}
				// Recurse if we're merging plain objects or arrays
				if( deep &&( typeof copy == 'object' ||( copyIsArray = Object.prototype.toString.call(  copy  ) === '[object Array]' ) ) ) 
				{
					if( copyIsArray ) 
					{
						copyIsArray = false;
						clone = src && Object.prototype.toString.call(  src  ) === '[object Array]' ? src : [];
	
					} 
					else 
					{
						clone = src && typeof src == 'object' ? src : {};
					}
					// Never move original objects, clone them
					target[name] = extend( clone, copy );
	
					// Don't bring in undefined values
				} 
				else if( typeof copy !== 'undefined' ) 
				{
					target[name] = copy;
				}
			}
		}
		return target;
	}
	
	// Make available to window
	exports.GameController = {
		
		// Default options,
		options: {
			left: { 
				type: 'dpad', 
				position: { left: '13%', bottom: '22%' },
				dpad: {
					up: {
						width: '7%',
						height: '15%',
						stroke: 2,
						touchStart: function() {
							GameController.simulateKeyEvent( 'press', 38 );
							GameController.simulateKeyEvent( 'down', 38 );
						},
						touchEnd: function() {
							GameController.simulateKeyEvent( 'up', 38 );
						}
					},
					left: {
						width: '15%',
						height: '7%',
						stroke: 2,
						touchStart: function() {
							GameController.simulateKeyEvent( 'press', 37 );
							GameController.simulateKeyEvent( 'down', 37 );
						},
						touchEnd: function() {
							GameController.simulateKeyEvent( 'up', 37 );
						}
					},
					down: {
						width: '7%',
						height: '15%',
						stroke: 2,
						touchStart: function() {
							GameController.simulateKeyEvent( 'press', 40 );
							GameController.simulateKeyEvent( 'down', 40 );
						},
						touchEnd: function() {
							GameController.simulateKeyEvent( 'up', 40 );
						}
					},
					right: {
						width: '15%',
						height: '7%',
						stroke: 2,
						touchStart: function() {
							GameController.simulateKeyEvent( 'press', 39 );
							GameController.simulateKeyEvent( 'down', 39 );
						},
						touchEnd: function() {
							GameController.simulateKeyEvent( 'up', 39 );
						}
					}
				},
				joystick: {
					radius: 60,
					touchMove: function( e ) {
						console.log( e );
					}
				}
			},
			right: { 
				type: 'buttons', 
				position: { right: '17%', bottom: '28%' }, 
				buttons: [
					{ offset: { x: '-13%', y: 0 }, label: 'X', radius: '7%', stroke: 2, backgroundColor: 'blue', fontColor: '#fff', touchStart: function() {
						// Blue is currently mapped to up button
						GameController.simulateKeyEvent( 'press', 88 ); // x key
						GameController.simulateKeyEvent( 'down', 88 );
					}, touchEnd: function() {
						GameController.simulateKeyEvent( 'up', 88 );	
					} },
					{ offset: { x: 0, y: '-11%' }, label: 'Y', radius: '7%', stroke: 2, backgroundColor: 'yellow', fontColor: '#fff', touchStart: function() {
						GameController.simulateKeyEvent( 'press', 70 ); // f key
						GameController.simulateKeyEvent( 'down', 70 );
					}, touchEnd: function() {
						GameController.simulateKeyEvent( 'up', 70 );						
					}  },
					{ offset: { x: '13%', y: 0 }, label: 'B', radius: '7%', stroke: 2, backgroundColor: 'red', fontColor: '#fff', touchStart: function() {
						GameController.simulateKeyEvent( 'press', 90 ); // z key
						GameController.simulateKeyEvent( 'down', 90 );
					}, touchEnd: function() {
						GameController.simulateKeyEvent( 'up', 90 );						
					} },
					{ offset: { x: 0, y: '11%' }, label: 'A', radius: '7%', stroke: 2, backgroundColor: 'green', fontColor: '#fff', touchStart: function() {
						GameController.simulateKeyEvent( 'press', 67 ); // a key
						GameController.simulateKeyEvent( 'down', 67 );
					}, touchEnd: function() {
						GameController.simulateKeyEvent( 'up', 67 );	
					}  }
				],
				dpad: {
					up: {
						width: '7%',
						height: '15%',
						stroke: 2
					},
					left: {
						width: '15%',
						height: '7%',
						stroke: 2
					},
					down: {
						width: '7%',
						height: '15%',
						stroke: 2
					},
					right: {
						width: '15%',
						height: '7%',
						stroke: 2
					}
				},
				joystick: {
					radius: 60,
					touchMove: function( e ) {
						console.log( e );
					}
				}
			},
			touchRadius: 45
		},
		
		// Areas (objects) on the screen that can be touched
		touchableAreas: [],
		touchableAreasCount: 0,
		
		// Multi-touch
		touches: [],
		
		// Canvas offset on page (for coverting touch coordinates)
		offsetX: 0,
		offsetY: 0,
		
		// Bounding box - used for clearRect - first we determine which areas of the canvas are actually drawn to
		bound: {
			left: false,
			right: false,
			top: false,
			bottom: false
		},
		
		// Heavy sprites (with gradients) are cached as a canvas to improve performance
		cachedSprites: {},
		
		paused: false,
		
		init: function( options ) {
			
			// Don't do anything if there's no touch support
			if( ! 'ontouchstart' in document.documentElement )
				return;
				
	
			// Merge default options and specified options
			options = options || {};
			extend( this.options, options );	
			
			var userAgent = navigator.userAgent.toLowerCase();
			// See if we should run the performanceFriendly version (for slower CPUs)
			this.performanceFriendly = ( userAgent.indexOf( 'iphone' ) !== -1 || userAgent.indexOf( 'android' ) !== -1 || this.options.forcePerformanceFriendly );
			
			// Grab the canvas if one wasn't passed
			var ele;
			if( !this.options.canvas || !( ele = document.getElementById( this.options.canvas ) ) )
			{
				this.options.canvas = document.getElementsByTagName( 'canvas' )[0];
			}
			else if( ele )
			{
				this.options.canvas = ele;
			}
			
			this.options.ctx = this.options.canvas.getContext( '2d' );
			
			// Create a canvas that goes directly on top of the game canvas
			this.createOverlayCanvas();
		},
		
		/**
		 * Finds the actual 4 corners of canvas that are being used (so we don't have to clear the entire canvas each render) 
		 * Called when each new touchableArea is added in
		 * @param {object} options - x, y, width, height
		 */
		boundingSet: function( options ) {
			var directions = ['left', 'right'];
			
			// Square - pivot is top left
			if( options.width )
			{
				var width = this.getPixels( options.width );
				var height = this.getPixels( options.height );
				var left = this.getPixels( options.x );
				var top = this.getPixels( options.y );
			}
			// Circle - pivot is center
			else
			{
				if( this.options.touchRadius )
					var radius = this.getPixels( options.radius ) * 2 + ( this.getPixels( this.options.touchRadius ) / 2 ); // size of the box the joystick can go to
				else
					var radius = options.radius;
				var width = height = ( radius + this.getPixels( options.stroke ) ) * 2;
				var left = this.getPixels( options.x ) - ( width / 2 );
				var top = this.getPixels( options.y ) - ( height / 2 );
			}
			var right = left + width;
			var bottom = top + height;
			
			if( this.bound.left === false || left < this.bound.left )
				this.bound.left = left;
			if( this.bound.right === false || right > this.bound.right )
				this.bound.right = right;
			if( this.bound.top === false || top < this.bound.top )
				this.bound.top = top;
			if( this.bound.bottom === false || bottom > this.bound.bottom )
				this.bound.bottom = bottom;
		},
		
		/**
		 * Creates the canvas that sits on top of the game's canvas and holds game controls 
		 */
		createOverlayCanvas: function() {
			this.canvas = document.createElement( 'canvas' );
			
			// Scale to same size as original canvas
			this.resize( true );
			
			document.getElementsByTagName( 'body' )[0].appendChild( this.canvas );
			this.ctx = this.canvas.getContext( '2d' );
			
			var _this = this;
			window.addEventListener( 'resize', function() {
				// Wait for any other events to finish
				setTimeout( function() { GameController.resize.call( _this ); }, 1 );
			} );
			
			
			// Set the touch events for this new canvas
			this.setTouchEvents();
			
			// Load in the initial UI elements
			this.loadSide( 'left' );
			this.loadSide( 'right' );
			
			// Starts up the rendering / drawing
			this.render();
			
			if( ! this.touches || this.touches.length == 0 )
				this.paused = true; // pause until a touch event
		},
		
		pixelRatio: 1,
		resize: function( firstTime ) {
			// Scale to same size as original canvas
			this.canvas.width = this.options.canvas.width;
			this.canvas.height = this.options.canvas.height;
			
			this.offsetX = GameController.options.canvas.offsetLeft + document.body.scrollLeft;
			this.offsetY = GameController.options.canvas.offsetTop + document.body.scrollTop;
			
			// Get in on this retina action
			if( this.options.canvas.style.width && this.options.canvas.style.height && this.options.canvas.style.height.indexOf( 'px' ) !== -1 ) 
			{
				this.canvas.style.width = this.options.canvas.style.width;
				this.canvas.style.height = this.options.canvas.style.height;
				this.pixelRatio = this.canvas.width / parseInt( this.canvas.style.width );
			}
			
			this.canvas.style.position = 'absolute';
			this.canvas.style.zIndex = '5';
			this.canvas.style.left = this.options.canvas.offsetLeft + 'px';
			this.canvas.style.top = this.options.canvas.offsetTop + 'px';
			this.canvas.setAttribute( 'style', this.canvas.getAttribute( 'style' ) +' -ms-touch-action: none;' );
			
			if( !firstTime )
			{
				// Remove all current buttons
				this.touchableAreas = [];
				// Clear out the cached sprites
				this.cachedSprites = [];
				// Reload in the initial UI elements
				this.reloadSide( 'left' );
				this.reloadSide( 'right' );
			}
		},
		
		/**
		 * Returns the scaled pixels. Given the value passed
		 * @param {int/string} value - either an integer for # of pixels, or 'x%' for relative
		 * @param {char} axis - x, y
		 */
		getPixels: function( value, axis )
		{
			if( typeof value === 'undefined' )
				return 0
			else if( typeof value === 'number' )
				return value;
			else // a percentage
			{
				if( axis == 'x' )
					return ( parseInt( value ) / 100 ) * this.canvas.width;
				else
					return ( parseInt( value ) / 100 ) * this.canvas.height;
			}
		},
		
		/**
		 * Simulates a key press
		 * @param {string} eventName - 'down', 'up'
		 * @param {char} character
		 */
		simulateKeyEvent: function( eventName, keyCode ) {
			if( typeof window.onkeydown === 'undefined' ) // No keyboard, can't simulate...
				return false;
				
			/* If they have jQuery, use it because it works better for mobile safari */
			if( typeof jQuery !== 'undefined' )
			{
				var press = jQuery.Event( 'key' + eventName );
				press.ctrlKey = false;
				press.which = keyCode;
				press.keyCode = keyCode;
				// Keypress on just the canvas instead of the document
				$( this.options.canvas ).trigger( press );
				return;
			}
	
			var oEvent = document.createEvent( 'KeyboardEvent' );
			
			// Chromium Hack
			if( navigator.userAgent.toLowerCase().indexOf( 'chrome' ) !== -1 )
			{
				Object.defineProperty( oEvent, 'keyCode', {
					get : function() {
						return this.keyCodeVal;
					}
				} );	 
				Object.defineProperty( oEvent, 'which', {
					get : function() {
						return this.keyCodeVal;
					}
				} );
			}
				
			if( oEvent.initKeyboardEvent )
			{
				oEvent.initKeyboardEvent( 'key' + eventName, true, true, document.defaultView, false, false, false, false, keyCode, keyCode );
			}
			else
			{
				oEvent.initKeyEvent( 'key' + eventName, true, true, document.defaultView, false, false, false, false, keyCode, keyCode );
			}
		
			oEvent.keyCodeVal = keyCode;
		
		},
		
		setTouchEvents: function() {
			var _this = this;
			var touchStart = function( e ) {
				if( _this.paused )
				{
					_this.paused = false;
				}
					
				e.preventDefault();
	
				// Microsoft always has to have their own stuff...
				if( window.navigator.msPointerEnabled && e.clientX && e.pointerType == e.MSPOINTER_TYPE_TOUCH )
				{
					_this.touches[ e.pointerId ] = { clientX: e.clientX, clientY: e.clientY };
				}
				else
				{
					_this.touches = e.touches || [];
				}
			};
	
			this.canvas.addEventListener( 'touchstart', touchStart, false );
			
			var touchEnd = function( e ) {			
				e.preventDefault();
			
				if( window.navigator.msPointerEnabled && e.pointerType == e.MSPOINTER_TYPE_TOUCH )
				{
					delete _this.touches[ e.pointerId ];
				}
				else
				{	
					_this.touches = e.touches || [];
				}
				
				if( !e.touches || e.touches.length == 0 )
				{
					// Draw once more to remove the touch area
					_this.render();
					_this.paused = true;
				}
			};
			this.canvas.addEventListener( 'touchend', touchEnd );
	
			var touchMove = function( e ) {
				e.preventDefault();
				
				if( window.navigator.msPointerEnabled && e.clientX && e.pointerType == e.MSPOINTER_TYPE_TOUCH )
				{
					_this.touches[ e.pointerId ] = { clientX: e.clientX, clientY: e.clientY };				
				}
				else
				{
					_this.touches = e.touches || [];
				}
			};
			this.canvas.addEventListener( 'touchmove', touchMove );
			
			if( window.navigator.msPointerEnabled )
			{
				this.canvas.addEventListener( 'MSPointerDown', touchStart );
				this.canvas.addEventListener( 'MSPointerUp', touchEnd );
				this.canvas.addEventListener( 'MSPointerMove', touchMove );
			}
		},
		
		/**
		 * Adds the area to a list of touchable areas, draws
		 * @param {object} options with properties: x, y, width, height, touchStart, touchEnd, touchMove
		 */
		addTouchableDirection: function( options ) {
			
			var direction = new TouchableDirection( options );
			
			direction.id = this.touchableAreas.push( direction );
			this.touchableAreasCount++;
			
			this.boundingSet( options );
		},
		
		/**
		 * Adds the circular area to a list of touchable areas, draws	
		 * @param {object} options with properties: x, y, width, height, touchStart, touchEnd, touchMove
		 */
		addJoystick: function( options ) { //x, y, radius, backgroundColor, touchStart, touchEnd ) {
			
			var joystick = new TouchableJoystick( options );
			
			joystick.id = this.touchableAreas.push( joystick );
			this.touchableAreasCount++;
			
			this.boundingSet( options );
		},
		
		/**
		 * Adds the circular area to a list of touchable areas, draws	 
		 * @param {object} options with properties: x, y, width, height, touchStart, touchEnd, touchMove
		 */
		addButton: function( options ) { //x, y, radius, backgroundColor, touchStart, touchEnd ) {
			
			var button = new TouchableButton( options );
			
			button.id = this.touchableAreas.push( button );
			this.touchableAreasCount++;
			
			this.boundingSet( options );
		},
		
		addTouchableArea: function( check, callback ) {
		},
		
		loadButtons: function( side ) {
			var buttons = this.options[ side ].buttons;
			var _this = this;
			for( var i = 0, j = buttons.length; i < j; i++ )
			{
				if( typeof buttons[i] === 'undefined' || typeof buttons[i].offset === 'undefined' )
					continue;
					
				var posX = this.getPositionX( side );
				var posY = this.getPositionY( side );
							
				buttons[i].x = posX + this.getPixels( buttons[i].offset.x, 'y' );
				buttons[i].y = posY + this.getPixels( buttons[i].offset.y, 'y' );
	
				this.addButton( buttons[i] );
			}
		},
		
		loadDPad: function( side ) {
			var dpad = this.options[ side ].dpad || {};
			
			// Centered value is at this.options[ side ].position
			
			var _this = this;
			
			var posX = this.getPositionX( side );
			var posY = this.getPositionY( side );
			
			
			// If they have all 4 directions, add a circle to the center for looks
			if( dpad.up && dpad.left && dpad.down && dpad.right )
			{
				var options = {
					x: posX,
					y: posY,
					radius: dpad.right.height
				}
				var center = new TouchableCircle( options ); 
				this.touchableAreas.push( center );
				this.touchableAreasCount++;
			}
	
			// Up arrow
			if( dpad.up !== false )
			{
				dpad.up.x = posX - this.getPixels( dpad.up.width, 'y' ) / 2;
				dpad.up.y = posY - ( this.getPixels( dpad.up.height, 'y' ) +  this.getPixels( dpad.left.height, 'y' ) / 2 );
				dpad.up.direction = 'up';
				this.addTouchableDirection( dpad.up );
			}
	
			// Left arrow
			if( dpad.left !== false )
			{
				dpad.left.x = posX - ( this.getPixels( dpad.left.width, 'y' ) + this.getPixels( dpad.up.width, 'y' ) / 2 );
				dpad.left.y = posY - ( this.getPixels( dpad.left.height, 'y' ) / 2 );
				dpad.left.direction = 'left';
				this.addTouchableDirection( dpad.left );
			}
	
			// Down arrow
			if( dpad.down !== false )
			{
				dpad.down.x = posX - this.getPixels( dpad.down.width, 'y' ) / 2;
				dpad.down.y = posY + ( this.getPixels( dpad.left.height, 'y' ) / 2 );
				dpad.down.direction = 'down';
				this.addTouchableDirection( dpad.down );
			}
			
			// Right arrow
			if( dpad.right !== false )
			{
				dpad.right.x = posX + ( this.getPixels( dpad.up.width, 'y' ) / 2 );
				dpad.right.y = posY - this.getPixels( dpad.right.height, 'y' ) / 2;
				dpad.right.direction = 'right';
				this.addTouchableDirection( dpad.right );
			}
			
		},
		
		loadJoystick: function( side ) {
			var joystick = this.options[ side ].joystick;
			joystick.x = this.getPositionX( side );
			joystick.y = this.getPositionY( side );
	
			this.addJoystick( joystick );
		},
		
		/**
		 * Used for resizing. Currently is just an alias for loadSide
		 */
		reloadSide: function( side ) {
			// Load in new ones
			this.loadSide( side );
		},
		
		loadSide: function( side ) {
			if( this.options[ side ].type === 'dpad' )
			{
				this.loadDPad( side );
			}
			else if( this.options[ side ].type === 'joystick' )
			{
				this.loadJoystick( side );
			}
			else if( this.options[ side ].type === 'buttons' )
			{
				this.loadButtons( side );
			}
		},
		
		/**
		 * Normalize touch positions by the left and top offsets
		 * @param {int} x
		 */
		normalizeTouchPositionX: function( x )
		{
			return ( x - this.offsetX ) * ( this.pixelRatio );
		},
		
		/**
		 * Normalize touch positions by the left and top offsets
		 * @param {int} y
		 */
		normalizeTouchPositionY: function( y )
		{
			return ( y - this.offsetY ) * ( this.pixelRatio );
		},
		
		/**
		 * Returns the x position when given # of pixels from right (based on canvas size)
		 * @param {int} right 
		 */
		getXFromRight: function( right ) {
			return this.canvas.width - right;
		},
		
		
		/**
		 * Returns the y position when given # of pixels from bottom (based on canvas size)
		 * @param {int} right 
		 */
		getYFromBottom: function( bottom ) {
			return this.canvas.height - bottom;
		},
		
		/**
		 * Grabs the x position of either the left or right side/controls
		 * @param {string} side - 'left', 'right' 
		 */
		getPositionX: function( side ) {
			if( typeof this.options[ side ].position.left !== 'undefined' )
				return this.getPixels( this.options[ side ].position.left, 'x' );
			else
				return this.getXFromRight( this.getPixels( this.options[ side ].position.right, 'x' ) );
		},
		
		/**
		 * Grabs the y position of either the left or right side/controls
		 * @param {string} side - 'left', 'right' 
		 */
		getPositionY: function( side ) {
			if( typeof this.options[ side ].position.top !== 'undefined' )
				return this.getPixels( this.options[ side ].position.top, 'y' );
			else
				return this.getYFromBottom( this.getPixels( this.options[ side ].position.bottom, 'y' ) );
		},

		/**
		 * Processes the info for each touchableArea 
		 */
		renderAreas: function() {
			for( var i = 0, j = this.touchableAreasCount; i < j; i++ )
			{
				var area = this.touchableAreas[ i ];				
				
				if( typeof area === 'undefined' )
					continue;

				area.draw();
					
				// Go through all touches to see if any hit this area
				var touched = false;
				for( var k = 0, l = this.touches.length; k < l; k++ )
				{
					var touch = this.touches[ k ];
					if( typeof touch === 'undefined' )
						continue;
	
					var x = this.normalizeTouchPositionX( touch.clientX ), y = this.normalizeTouchPositionY( touch.clientY );
													
					// Check that it's in the bounding box/circle
					if( ( area.check( x, y ) ) !== false )
					{
						if( !touched )
							touched = this.touches[ k ];
					}
				}

				if( touched )
				{
					if( !area.active )
						area.touchStartWrapper( touched );
					area.touchMoveWrapper( touched );
				}
				else if( area.active )
				{
					area.touchEndWrapper( touched );
				}
			}
		},
		
		render: function() {
			if( ! this.paused || ! this.performanceFriendly )
				this.ctx.clearRect( this.bound.left, this.bound.top, this.bound.right - this.bound.left, this.bound.bottom - this.bound.top );
	
			// Draw feedback for when screen is being touched
			// When no touch events are happening, this enables 'paused' mode, which skips running this
			// This isn't run at all in performanceFriendly mode
			if( ! this.paused && ! this.performanceFriendly )
			{
				var cacheId = 'touch-circle';
				var cached = this.cachedSprites[ cacheId ];
				
				if( ! cached && this.options.touchRadius )
				{
					var subCanvas = document.createElement( 'canvas' );
					var ctx = subCanvas.getContext( '2d' );
					subCanvas.width = 2 * this.options.touchRadius;
					subCanvas.height = 2 * this.options.touchRadius;
		
					var center = this.options.touchRadius;
					var gradient = ctx.createRadialGradient( center, center, 1, center, center, this.options.touchRadius ); // 10 = end radius
					gradient.addColorStop( 0, 'rgba( 200, 200, 200, 1 )' );
					gradient.addColorStop( 1, 'rgba( 200, 200, 200, 0 )' );
					ctx.beginPath();
					ctx.fillStyle = gradient;
					ctx.arc( center, center, this.options.touchRadius, 0 , 2 * Math.PI, false );
					ctx.fill();
				
					cached = GameController.cachedSprites[ cacheId ] = subCanvas;
				}
				// Draw the current touch positions if any
				for( var i = 0, j = this.touches.length; i < j; i++ )
				{
					var touch = this.touches[ i ];
					if( typeof touch === 'undefined' )
						continue;
					var x = this.normalizeTouchPositionX( touch.clientX ), y = this.normalizeTouchPositionY( touch.clientY );
					if( x - this.options.touchRadius > this.bound.left && x + this.options.touchRadius < this.bound.right &&  
						y - this.options.touchRadius > this.bound.top && y + this.options.touchRadius < this.bound.bottom )
					this.ctx.drawImage( cached, x - this.options.touchRadius, y - this.options.touchRadius );
				}
			}
			
			// Render if the game isn't paused, or we're not in performanceFriendly mode (running when not paused keeps the semi-transparent gradients looking better for some reason)
			if( ! this.paused || ! this.performanceFriendly )
			{
				// Process all the info for each touchable area
				this.renderAreas();
			}

			window.requestAnimationFrame( this.renderWrapper );
		},
		/**
		 * So we can keep scope, and don't have to create a new obj every requestAnimationFrame (bad for garbage collection) 
		 */
		renderWrapper: function() {
			GameController.render();
		},	
	}
	
	/**
	 * Superclass for touchable stuff 
	 */
	var TouchableArea = ( function() {
		
		function TouchableArea() 
		{
		}
		
		// Called when this direction is being touched
		TouchableArea.prototype.touchStart = null;
		
		// Called when this direction is being moved
		TouchableArea.prototype.touchMove = null;
		
		// Called when this direction is no longer being touched
		TouchableArea.prototype.touchEnd = null;
		
		TouchableArea.prototype.type = 'area';
		TouchableArea.prototype.id = false;
		TouchableArea.prototype.active = false;
		
		/**
		 * Sets the user-specified callback for this direction being touched
		 * @param {function} callback 
		 */
		TouchableArea.prototype.setTouchStart = function( callback ) {
			this.touchStart = callback;
		};
		
		/**
		 * Called when this direction is no longer touched 
		 */
		TouchableArea.prototype.touchStartWrapper = function( e ) {
			// Fire the user specified callback
			if( this.touchStart )
				this.touchStart();
			
			// Mark this direction as active
			this.active = true;
		};
		
		/**
		 * Sets the user-specified callback for this direction no longer being touched
		 * @param {function} callback 
		 */
		TouchableArea.prototype.setTouchMove = function( callback ) {
			this.touchMove = callback;
		};
		
		/**
		 * Called when this direction is moved. Make sure it's actually changed before passing to developer
		 */
		TouchableArea.prototype.lastPosX = 0;
		TouchableArea.prototype.lastPosY = 0;
		TouchableArea.prototype.touchMoveWrapper = function( e ) {
			// Fire the user specified callback
			if( this.touchMove && ( e.clientX != TouchableArea.prototype.lastPosX || e.clientY != TouchableArea.prototype.lastPosY ) )
			{
				this.touchMove();
				this.lastPosX = e.clientX;
				this.lastPosY = e.clientY;
			}
			// Mark this direction as active
			this.active = true;
		};
		
		/**
		 * Sets the user-specified callback for this direction no longer being touched
		 * @param {function} callback 
		 */
		TouchableArea.prototype.setTouchEnd = function( callback ) {
			this.touchEnd = callback;
		};
		
		/**
		 * Called when this direction is first touched 
		 */
		TouchableArea.prototype.touchEndWrapper = function( e ) {
			// Fire the user specified callback
			if( this.touchEnd )
				this.touchEnd();
			
			// Mark this direction as inactive
			this.active = false;
			
			GameController.render();
		};
		
		return TouchableArea;
		
	} )();
	
	var TouchableDirection = ( function( __super ) {
		__extends( TouchableDirection, __super );
		
		function TouchableDirection( options ) 
		{
			for( var i in options )
			{
				if( i == 'x' )
					this[i] = GameController.getPixels( options[i], 'x' );
				else if( i == 'y' || i == 'height' || i == 'width' )
					this[i] = GameController.getPixels( options[i], 'y' );
				else
					this[i] = options[i];
			}
			
			this.draw();
		}
	
		TouchableDirection.prototype.type = 'direction';
		
		/**
		 * Checks if the touch is within the bounds of this direction 
		 */
		TouchableDirection.prototype.check = function( touchX, touchY ) {
			var distanceX, distanceY;
			if( ( Math.abs( touchX - this.x ) < ( GameController.options.touchRadius / 2 ) || ( touchX > this.x ) ) && // left
				( Math.abs( touchX - ( this.x + this.width ) ) < ( GameController.options.touchRadius / 2 ) || ( touchX < this.x + this.width ) ) && // right
				( Math.abs( touchY - this.y ) < ( GameController.options.touchRadius / 2 ) || ( touchY > this.y ) ) && // top
				( Math.abs( touchY - ( this.y + this.height ) ) < ( GameController.options.touchRadius / 2 ) || ( touchY < this.y + this.height ) ) // bottom
			)
				return true;
				
			return false;
		};
		
		TouchableDirection.prototype.draw = function() {
			var cacheId = this.type + '' + this.id + '' + this.active;
			var cached = GameController.cachedSprites[ cacheId ];
			if( ! cached )
			{
				var subCanvas = document.createElement( 'canvas' );
				var ctx = subCanvas.getContext( '2d' );
				subCanvas.width = this.width + 2 * this.stroke;
				subCanvas.height = this.height + 2 * this.stroke;
	
				var opacity = this.opacity || 0.9;
				
				if( ! this.active ) // Direction currently being touched
					opacity *= 0.5;
					
				switch( this.direction )
				{
					case 'up':
						var gradient = ctx.createLinearGradient( 0, 0, 0, this.height );
						gradient.addColorStop( 0, 'rgba( 0, 0, 0, ' + ( opacity * 0.5 ) + ' )' );
						gradient.addColorStop( 1, 'rgba( 0, 0, 0, ' + opacity + ' )' );   
						break;
					case 'left':
						var gradient = ctx.createLinearGradient( 0, 0, this.width, 0 );
						gradient.addColorStop( 0, 'rgba( 0, 0, 0, ' + ( opacity * 0.5 ) + ' )' );
						gradient.addColorStop( 1, 'rgba( 0, 0, 0, ' + opacity + ' )' );   
						break;
					case 'right':
						var gradient = ctx.createLinearGradient( 0, 0, this.width, 0 );
						gradient.addColorStop( 0, 'rgba( 0, 0, 0, ' + opacity + ' )' );
						gradient.addColorStop( 1, 'rgba( 0, 0, 0, ' + ( opacity * 0.5 ) + ' )' );  
						break;
					case 'down':
					default:
						var gradient = ctx.createLinearGradient( 0, 0, 0, this.height );
						gradient.addColorStop( 0, 'rgba( 0, 0, 0, ' + opacity + ' )' );
						gradient.addColorStop( 1, 'rgba( 0, 0, 0, ' + ( opacity * 0.5 ) + ' )' );   
				}
				ctx.fillStyle = gradient;
		
				ctx.fillRect( 0, 0, this.width, this.height );
				ctx.lineWidth = this.stroke;
				ctx.strokeStyle = 'rgba( 255, 255, 255, 0.1 )';
				ctx.strokeRect( 0, 0, this.width, this.height );
				
				cached = GameController.cachedSprites[ cacheId ] = subCanvas;
			}
			
			GameController.ctx.drawImage( cached, this.x, this.y );
				
	
		};
		
		return TouchableDirection;
	} )( TouchableArea );
	
	var TouchableButton = ( function( __super ) {
		__extends( TouchableButton, __super );
		
		function TouchableButton( options ) //x, y, radius, backgroundColor )
		{
			for( var i in options )
			{
				if( i == 'x' )
					this[i] = GameController.getPixels( options[i], 'x' );
				else if( i == 'x' || i == 'radius' )
					this[i] = GameController.getPixels( options[i], 'y' );
				else
					this[i] = options[i];
			}
			
			this.draw();
		}
		
		TouchableButton.prototype.type = 'button';
		
		/**
		 * Checks if the touch is within the bounds of this direction 
		 */
		TouchableButton.prototype.check = function( touchX, touchY ) {
			if( 
				( Math.abs( touchX - this.x ) < this.radius + ( GameController.options.touchRadius / 2 ) ) &&
				( Math.abs( touchY - this.y ) < this.radius + ( GameController.options.touchRadius / 2 ) )
			)
				return true;
				
			return false;
		};
		
		TouchableButton.prototype.draw = function() {
			var cacheId = this.type + '' + this.id + '' + this.active;
			var cached = GameController.cachedSprites[ cacheId ];
			if( ! cached )
			{
				var subCanvas = document.createElement( 'canvas' );
				var ctx = subCanvas.getContext( '2d' );
				ctx.lineWidth = this.stroke;
				subCanvas.width = subCanvas.height = 2 * ( this.radius + ctx.lineWidth );
				
				
				var gradient = ctx.createRadialGradient( this.radius, this.radius, 1, this.radius, this.radius, this.radius );
				var textShadowColor;
				switch( this.backgroundColor )
				{
					case 'blue':
						gradient.addColorStop( 0, 'rgba(123, 181, 197, 0.6)' );
						gradient.addColorStop( 1, '#105a78' );
						textShadowColor = '#0A4861';
						break;
					case 'green':
						gradient.addColorStop( 0, 'rgba(29, 201, 36, 0.6)' );
						gradient.addColorStop( 1, '#107814' );
						textShadowColor = '#085C0B';
						break;
					case 'red':
						gradient.addColorStop( 0, 'rgba(165, 34, 34, 0.6)' );
						gradient.addColorStop( 1, '#520101' );
						textShadowColor = '#330000';
						break;
					case 'yellow':
						gradient.addColorStop( 0, 'rgba(219, 217, 59, 0.6)' );
						gradient.addColorStop( 1, '#E8E10E' );
						textShadowColor = '#BDB600';
						break;
					case 'white':
					default:
						gradient.addColorStop( 0, 'rgba( 255,255,255,.3 )' );
						gradient.addColorStop( 1, '#eee' );
						break;
				}
					
				if( this.active )			
					ctx.fillStyle = textShadowColor;
				else	
					ctx.fillStyle = gradient;
	
				ctx.strokeStyle = textShadowColor;			
		
				ctx.beginPath();
				//ctx.arc( this.x, this.y, this.radius, 0 , 2 * Math.PI, false );
				ctx.arc( subCanvas.width / 2, subCanvas.width / 2, this.radius, 0 , 2 * Math.PI, false );
				ctx.fill();
				ctx.stroke();
				
				if( this.label )
				{
					// Text Shadow
					ctx.fillStyle = textShadowColor;
					ctx.font = 'bold ' + ( this.fontSize || subCanvas.height * 0.35 ) + 'px Verdana';
					ctx.textAlign = 'center';
					ctx.textBaseline = 'middle';
					ctx.fillText( this.label, subCanvas.height / 2 + 2, subCanvas.height / 2 + 2 );
		
		
					ctx.fillStyle = this.fontColor;
					ctx.font = 'bold ' + ( this.fontSize || subCanvas.height * 0.35 ) + 'px Verdana';
					ctx.textAlign = 'center';
					ctx.textBaseline = 'middle';
					ctx.fillText( this.label, subCanvas.height / 2, subCanvas.height / 2 );
				}
				
				cached = GameController.cachedSprites[ cacheId ] = subCanvas;
			}

			GameController.ctx.drawImage( cached, this.x, this.y );
			
			
		};
		
		return TouchableButton;
	} )( TouchableArea );
	
	var TouchableJoystick = ( function( __super ) {
		__extends( TouchableJoystick, __super );
		
		function TouchableJoystick( options ) //x, y, radius, backgroundColor )
		{
			for( var i in options )
				this[i] = options[i];
				
			this.currentX = this.currentX || this.x;
			this.currentY = this.currentY || this.y;
		}
		
		TouchableJoystick.prototype.type = 'joystick';
		
		/**
		 * Checks if the touch is within the bounds of this direction 
		 */
		TouchableJoystick.prototype.check = function( touchX, touchY ) {
			if( 
				( Math.abs( touchX - this.x ) < this.radius + ( GameController.getPixels( GameController.options.touchRadius ) / 2 ) ) &&
				( Math.abs( touchY - this.y ) < this.radius + ( GameController.getPixels( GameController.options.touchRadius ) / 2 ) )
			)
				return true;
				
			return false;
		};
		
		/**
		 * details for the joystick move event, stored here so we're not constantly creating new objs for garbage. The object has params:
		 * dx - the number of pixels the current joystick center is from the base center in x direction
		 * dy - the number of pixels the current joystick center is from the base center in y direction
		 * max - the maximum number of pixels dx or dy can be
		 * normalizedX - a number between -1 and 1 relating to how far left or right the joystick is
		 * normalizedY - a number between -1 and 1 relating to how far up or down the joystick is
		 */
		TouchableJoystick.prototype.moveDetails = {};
		
		/**
		 * Called when this joystick is moved
		 */
		TouchableJoystick.prototype.touchMoveWrapper = function( e ) {
			this.currentX = GameController.normalizeTouchPositionX( e.clientX );	
			this.currentY = GameController.normalizeTouchPositionY( e.clientY );
			
			// Fire the user specified callback
			if( this.touchMove )
			{
				if( this.moveDetails.dx != this.currentX - this.x && this.moveDetails.dy != this.y - this.currentY )
				{
					this.moveDetails.dx = this.currentX - this.x; // reverse so right is positive
					this.moveDetails.dy = this.y - this.currentY;
					this.moveDetails.max = this.radius + ( GameController.options.touchRadius / 2 );
					this.moveDetails.normalizedX = this.moveDetails.dx / this.moveDetails.max;
					this.moveDetails.normalizedY = this.moveDetails.dy / this.moveDetails.max;
						
					this.touchMove( this.moveDetails );
				}
			}
				
			
			// Mark this direction as inactive
			this.active = true;
		};
		
		TouchableJoystick.prototype.draw = function() {
			if( ! this.id ) // wait until id is set
				return false;
				
			var cacheId = this.type + '' + this.id + '' + this.active;
			var cached = GameController.cachedSprites[ cacheId ];
			if( ! cached )
			{
				var subCanvas = document.createElement( 'canvas' );
				this.stroke = this.stroke || 2;
				subCanvas.width = subCanvas.height = 2 * ( this.radius + ( GameController.options.touchRadius ) + this.stroke );
				
				var ctx = subCanvas.getContext( '2d' );
				ctx.lineWidth = this.stroke;
				if( this.active ) // Direction currently being touched
				{
					var gradient = ctx.createRadialGradient( 0, 0, 1, 0, 0, this.radius );
					gradient.addColorStop( 0, 'rgba( 200,200,200,.5 )' );
					gradient.addColorStop( 1, 'rgba( 200,200,200,.9 )' );
					ctx.strokeStyle = '#000';
				}	
				else
				{
					// STYLING FOR BUTTONS
					var gradient = ctx.createRadialGradient( 0, 0, 1, 0, 0, this.radius );
					gradient.addColorStop( 0, 'rgba( 200,200,200,.2 )' );
					gradient.addColorStop( 1, 'rgba( 200,200,200,.4 )' );
					ctx.strokeStyle = 'rgba( 0,0,0,.4 )';
				}
				ctx.fillStyle = gradient;
				// Actual joystick part that is being moved
				ctx.beginPath();
				ctx.arc( this.radius, this.radius, this.radius, 0 , 2 * Math.PI, false );
				ctx.fill();
				ctx.stroke();
				
				cached = GameController.cachedSprites[ cacheId ] = subCanvas;
			}
			
			// Draw the base that stays static
			GameController.ctx.fillStyle = '#444';
			GameController.ctx.beginPath();
			GameController.ctx.arc( this.x, this.y, this.radius * 0.7, 0 , 2 * Math.PI, false );
			GameController.ctx.fill();
			GameController.ctx.stroke();
			
			GameController.ctx.drawImage( cached, this.currentX - this.radius, this.currentY - this.radius );
			
			
		};
		
		return TouchableJoystick;
	} )( TouchableArea );
	
	
	var TouchableCircle = ( function( __super ) {
		__extends( TouchableCircle, __super );
		
		function TouchableCircle( options )
		{
			for( var i in options )
			{
				if( i == 'x' )
					this[i] = GameController.getPixels( options[i], 'x' );
				else if( i == 'x' || i == 'radius' )
					this[i] = GameController.getPixels( options[i], 'y' );
				else
					this[i] = options[i];
			}
	
			this.draw();
		}
		
		/**
		 * No touch for this fella 
		 */
		TouchableCircle.prototype.check = function( touchX, touchY ) {
			return false;
		};
		
		TouchableCircle.prototype.draw = function() {
	
			// STYLING FOR BUTTONS
			GameController.ctx.fillStyle = 'rgba( 0, 0, 0, 0.5 )';
			
			// Actual joystick part that is being moved
			GameController.ctx.beginPath();
			GameController.ctx.arc( this.x, this.y, this.radius, 0 , 2 * Math.PI, false );
			GameController.ctx.fill();
	
		};
		
		return TouchableCircle;
	} )( TouchableArea );
	
	/**
	 * Shim for requestAnimationFrame 
	 */
	( function() {
	  if (typeof module !== "undefined") return
		var lastTime = 0;
		var vendors = ['ms', 'moz', 'webkit', 'o'];
		for( var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x )
		{
			window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
			window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
										 || window[vendors[x]+'CancelRequestAnimationFrame'];
		}
	 
		if ( !window.requestAnimationFrame )
			window.requestAnimationFrame = function( callback, element ) {
				var currTime = new Date().getTime();
				var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
				var id = window.setTimeout( function() { callback(currTime + timeToCall); }, 
					timeToCall );
				lastTime = currTime + timeToCall;
				return id;
			};
	 
		if ( !window.cancelAnimationFrame )
			window.cancelAnimationFrame = function( id ) {
				clearTimeout( id );
			};
	}() );
} )(typeof module !== "undefined" ? module.exports : window)
},{}],3:[function(require,module,exports){
/**
   Copyright (c) 2015 Belahcen Marwane (b.marwane@gmail.com)

   Permission is hereby granted, free of charge, to any person obtaining a copy
   of this software and associated documentation files (the "Software"), to deal
   in the Software without restriction, including without limitation the rights
   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   copies of the Software, and to permit persons to whom the Software is
   furnished to do so, subject to the following conditions:

   The above copyright notice and this permission notice shall be included in all
   copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   SOFTWARE.
 */

var HealthBar = function(game, providedConfig) {
  this.game = game;

  this.setupConfiguration(providedConfig);
  this.setPosition(this.config.x, this.config.y);
  this.drawBackground();
  this.drawHealthBar();
};
HealthBar.prototype.constructor = HealthBar;

HealthBar.prototype.setupConfiguration = function (providedConfig) {
  this.config = this.mergeWithDefaultConfiguration(providedConfig);
  this.flipped = this.config.flipped;
};

HealthBar.prototype.mergeWithDefaultConfiguration = function(newConfig) {
  var defaultConfig= {
    width: 250,
    height: 40,
    x: 0,
    y: 0,
    bg: {
      color: '#651828'
    },
    bar: {
      color: '#FEFF03'
    },
    animationDuration: 200,
    flipped: false
  };

  return mergeObjects(defaultConfig, newConfig);
};

function mergeObjects(targetObj, newObj) {
  for (var p in newObj) {
    try {
      targetObj[p] = newObj[p].constructor==Object ? mergeObjects(targetObj[p], newObj[p]) : newObj[p];
    } catch(e) {
      targetObj[p] = newObj[p];
    }
  }
  return targetObj;
}

HealthBar.prototype.drawBackground = function() {

  var bmd = this.game.add.bitmapData(this.config.width, this.config.height);
  bmd.ctx.fillStyle = this.config.bg.color;
  bmd.ctx.beginPath();
  bmd.ctx.rect(0, 0, this.config.width, this.config.height);
  bmd.ctx.fill();

  this.bgSprite = this.game.add.sprite(this.x, this.y, bmd);
  this.bgSprite.anchor.set(0.5);

  if(this.flipped){
    this.bgSprite.scale.x = -1;
  }
};

HealthBar.prototype.drawHealthBar = function() {
  var bmd = this.game.add.bitmapData(this.config.width, this.config.height);
  bmd.ctx.fillStyle = this.config.bar.color;
  bmd.ctx.beginPath();
  bmd.ctx.rect(0, 0, this.config.width, this.config.height);
  bmd.ctx.fill();

  this.barSprite = this.game.add.sprite(this.x - this.bgSprite.width/2, this.y, bmd);
  this.barSprite.anchor.y = 0.5;

  if(this.flipped){
    this.barSprite.scale.x = -1;
  }
};

HealthBar.prototype.setPosition = function (x, y) {
  this.x = x;
  this.y = y;

  if(this.bgSprite !== undefined & this.barSprite !== undefined){
    this.bgSprite.position.x = x;
    this.bgSprite.position.y = y;

    this.barSprite.position.x = x - this.config.width/2;
    this.barSprite.position.y = y;
  }
};


HealthBar.prototype.setPercent = function(newValue){
  if(newValue < 0) newValue = 0;
  if(newValue > 100) newValue = 100;

  var newWidth =  (newValue * this.config.width) / 100;

  this.setWidth(newWidth);
};

HealthBar.prototype.setWidth = function(newWidth){
  if(this.flipped) {
    newWidth = -1 * newWidth;
  }
  this.game.add.tween(this.barSprite).to( { width: newWidth }, this.config.animationDuration, Phaser.Easing.Linear.None, true);
};


module.exports = HealthBar; // for browserify, if not needed

},{}],4:[function(require,module,exports){
/**
 * PHASE-SLIDE IS A UI SLIDER FOR PHASER.IO LIBRARY
 *
 * COPYWRITE-2015
 * AUTHOR: MICHAEL DOBEKIDIS (NETGFX.COM)
 *
 */

var phaseSlider = phaseSlider || {};


phaseSlider = function (game) {

    var _this = this;

    game.phaseSlider = _this;
    _this.game = game;
    _this.locked = false;
    _this.slideIndex = 0;
    _this.slider_timer = null;
    _this.tweenObj = {};

    var chevron_left = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAACACAYAAACP+K52AAAOOUlEQVR4Xu2dBZQlRxWGE9zdEmwWh+CwBCfBQnB3wuDuHgLs4u6acGBxJ0GCwyFYFgsECc6ZAAkWEg4WCPp/c14PPW/nvb5/dVW/em/3nnPP7Ozcqq76u7q6rvbuu+2iogjsXrT3XZ3vtrMBfFbd8yuJLym+gPgsYjD4q/h34p+KjxafmGtt7AwAX1pg3V18S/GVxacKgHeMZD4mfrf4mwH5iSKLDPCNNesDxfv2AWgE8Av08/3i/7p9LSLAFxcIrxHv54LRIf91/f0h7opeNIDvJwBeKT5TZnCb7v6lf2wVPye6mhcFYPZVgH1YIWDHuz1M/8G+fnLX9RYB4NNqkm8T36Vrspn//kX1x4vzT9P6nXeAz6DJvW800cz4hbr7hqRuJv7DJOl5BvjMmtSHxTcMQVFO6PvqmhPLbza6xLwCfHZNhnPqtXvg9h+1PUnMz3OJT92jLxSUG4l/Md7HPAJ8Hk3iU+KrJADyK7V5k/hwMRrbP0Z9nEY/9xo97vfVz0sl9P1ztbnO+EqeN4D31AQ+Lb6cCcDfJH+Q+NXif3a05URygPglo5XtXIo9+XrivzeN5gngJQ36M2IUCYd+KeH9xeyVDl1EwmxDrGyHuImPmDeAsScA7oWcmUr2J2JeQDvsjcF+2Js/Id4clEcMdfoGYo5xc2FNu6LGybZwPmOSiH5PfBPxhm93oy8scB8ZgRZtdpQErw7YtW8R1xitoHNGZzaSwwKGLWLi+dTs74yS/4CYrSZKt+bG1AwwjxkrhxXk0JckfAvxVA3L6XAki8YIyLcKtuWks1+tALNSmAwrxyG2ktuKOTWUIMbzNfHlA51zvt6zRoBvr4G9S3y6wCTaIh/SL9gjmrOt2Twsvrcktwell2sD+F4a+JvFrlbFDeHsijlxCPq4LoINoosOqQlgjNkYyt0xvVFtHiTmkRyKMFW+I3Cx7e5kAn0miTxBrV6Y0PIVavMYse3KSbhWu8mF9UvkbH18DQA/U4N9WsKE8Sqg/s6KTtGFOVlMo5NnDTD6/mMTEHqy2uCInCXh6u9yTZ0yK4AxqLxe/AATIbYC9Hz26lkS8RR/DgzgxFkAjGnwLWJeFA79W8L3F29zGhWSvb76PSLQ9zFDA3x6DYpgDpQBhzAx3kOMe6gGerEG8bjAQA4dEmD2q0PFNw0MrC2CbfWOYozkNdDZNIgVccQ+cuBQADOoj4oxRjv0FwnfRvw5p1FhWey90fCAzUMAjE31k2LMdw79UcI3Fx/pNCosG1UwGAarfFNpgIlgxAATMY60sTlBv7CVfKswYE73d5bw28VdZ9+mT872zy4JMC4XvBCEijp0vITxQvzAaVRY9j7qH5U8EpnJUDCVbhIXO6ZdQp1/VgzIDq1IGPc3HtpaiHM3KrmzGInqfB4TcBpFJ8x2wLbA9uDQjyTMysW1Xgs9RQN5rjkYnKtXFaNKZwf4auqTF9q5zUF9R/L4z4gyr4UAFoAdIhjwmmLms0o5V/B11R9nVY5kDuEhwLZKlE0NBCYvFz/SHAxq/F3F7223ywUwq4+Qzi7jx/iYUTfxcUX0enO+SeK8xHiZ8VJzCHCxZ79hvFEOgFEE3iNGDXYIr8AdxJ0xtk6nPWRTw2CxkWC0whOzA/UFmIM3hhsMOA59UMJ3E6++CCogFgd2jqjHuBkyNpJ7itdtC+359AGYu4bJMXo2bK5LsDSPIHe+BiIMFocpx0OHsJHcSYwJYCKlAvxo9fgyZzQjWW7IQ8VDu3gmDTU1DBZjO4ElnTaSFIBRAXHzuISJD99bLZQaBmvZSFyAcUymgLRF7bbWgqzGkRoGa9tIogAjh5uGo4hLGKZf6jYqKH9R9Y0a74bBJtlIIgATBEJUOIEdDhGnwH67w9nQ6SSzLJHrgOuGwa6oTZKNpAtgwpfeKea86hAnhGUx5r1aiDBYAvLObw6ol41kGsApIZuMnbMtKiPuoVooNQy2t41kEsC4pQkd3cdECK3sdmIMPrVQahjsVzUBojx72Ug2Ahh7AgBhvHEIewKZj19wGhWWxYiE1uiGwWIjYS74BHvROMD8zqONfcEh7jKTwTJWC6WGwWa1kYwD/CSh83wTIWy4WNPWbKBm+xLiqWGw2W0kbYDJPcPJ6AQ+433g+PLjEigl9vlgtXutuOuENN79W/UfJCFmtZG0B8G+6wSF/EzyuHhWEoEo0ezx6vRFCR2/Tm2IdchuI2kAJuf3y8bA8PgCLtpNLYQq/vSEwXBDnpjQLtSkAZh4sWi9hW9Llj0XvbwWSg2DfYYmkGK4Cs8bgPGh8aKKeCRISyVCpxbnJLZoHu8Hhmf8f8FBbCQAjNF4okV+bOAk96Fu1kB4UbaJibp0CBsJL8JDnEapsgD8KvHDAx2gQKAV1UCcdPADumGwZCHdW4x9ZRACYJKWI1obA+MoM2tCK0MZcst2kT+HjQTv92AEwMeJMUB3EZk1s466Ia0WHxgR5g6R+YmNZPDtDYC5s13KBUYcN+bBASAim1JagH4JxMOusFpeYGgC4Mjhmqx1fFizImy4xLtdwRwART7ZSqhEMhOaF4CJdePxJqjOIQDGCEVZxJlQdIsgBsA1+eWeEC52Yt8oPOQQZlTKG8xsi4i+5JY0yGOdmRWQTQ0S4SWH+XJwR4BzTKPwJs7PWVNqmNNMXFkATFHNtSpJU9AjGaVPIbicNwYtjhAszrUOoWgsiyOZ8k6/E2UBGI8xxYcjtFqHJiI4gAx2iIPFPFkODRpOAMA4OH8vptBmF/1aAhh7ajFTMn5i5B7VNfAN/o7tGCtcUWrMlTwy0dxh6pvjxehbLivnxChtQOKJS9iQt7iNHPkGYOIGcFNHqW/Bt+h1HDlKHKxm9pjEKmY1F6G2y4i9FZUySlT8YCVTebQWwirIS9v1xxHeRZhX9rI07YGQMIhnOLIXN4CyTeA6cutClrwhy+qcPAu3sBLbJG2zFlYav9MpgdXYKdD3e31vIjPiOBEALJr22lweUyaus2ypDRs9Shiyyct1CIsViduO49TpP0UW9Zjjp/NEch20PUybWZJzNgIYTYnoln3NWaGOEhFEfnItRPlx8i84ijoUKoAf6XDSyyC1eAa2ZVY/tdVroWtpINQBPoc5IEycbH29vms07W2bWv6FlwTB2lTjq4X4hhHmzvOaA/qu5AlR+K3Zbk286zjTx3NLNT7e5rXQZTUQtq+Ie6w95l5n/i6AuVCfElxU5aMUQC10MQ2EFIIlc0DJZ/4IwM1YSGQBMJdWK3+4jQrKk5/BSqZsuUNJZ34HYAaTWgaRKn2osrUQ5crZk/l4n0P2md8FmMGkFvIkDQy7c8TJ6kw6VZayXBxHqQfsEGd+zthU2u6kFIDpNLUU7Ta1pXpf1hjczllOFkjNReHMT1QRnu6plAownXIUw4Xk6vxktRNP1vXBkK6x5/p7ajYVZ37UahSZidQHYDrFG0KcV1fgyvgA8A5TzW/tiym50ErsJzUfsDPWrS/AzCe1oD2Z6qjWvTN5EkEdb9Yno3VitGYOgBnoPmLsya7OjyMVIxEZ7DUQeFA6EduwS7zAabuOcgFMp7yNeStHima2B0HiDbkhNUXMc6x00wo4HZHdtM5jnRNgQONcyfnS/SxOjTkfKXUxeKcQ2rBWEjI3wICMhoQ6ekHzGaPaHy6oFbNdSXE0V7cUww/Vhm/drb7ASwBMv5vEqKPo/g4Rf4wLigz3WiilNhHZTs8qCTB9Y7UCZKxYDtWYOUqFLKL7o9W1OBmxyE4otYIbQLG/4oJxPw9ZY+4zR0qShaJn/tUUsdIAAzSeBDwKeBYcIuyUOmZHOI0Ky6JYoYlGcMPEuRQRzDFmzse4kVw/H45Hwk75KmEt5Jht9x4KYMDBu4uXF0uUQ7jQ2QPJhK+BWCwr4kiF2YOGBBhwiFPgIE7cgkO11QCKljc7bGiAARWdH1/dsoOwZCdWODX7ySFOXmEkJWHwD5U0k+PGkmEa/VxCG5RBwk477gKpDBEj1UmzWMHtsRMNmeJK2qp2W3IsxR59VP2xqPa8nqpfUpyiRcNOO4BnYfLy7VI8Zv65s2YeRKgTqe4+UcXCTjsA5usKxwZW/3HuhAJ9JouQa0HOhVuPmOqCy+Ih/XyYJSOJ8UfWBDB3hqwhsoe6Hr3xu0j2PW2zhZ12LBNMsoRUddHBtQHMgMlkQuePVGBpTzBr2OkU5Mg0DbnsJXdAjQAzN0yWBENzHHKIoiGkQZT6qgFaHHnPlwkMii1rj1oBZvysFLzP5Cg7VOq7HDxRuOijhUCwn+xfM8CASnY9+11E72/fhN5VU8fuKE8STxRPVpR4kg6vHWAms5eYCJo9ojMbyVGNEBdU3yotKYX02UZIjbPPneYcs4n3+boXq44qhSmUUkgfmwnb2+qHBudhBTfAUDMIZ6r7fTrSf3lcjzIRxp/IOyDyQmt3zXeQ1sJ85wlgJpH6hUXiyAi9xVjeFa6FtY8ARWIj3BfsdrWh9NnaeXzeAAbk1OJItMWhuk2MC4vYBUJRIV5i1APihLAsXmovyeC/STXAjLmuKuI8Asx8Ke/F4+t+5XYcK8JQ2TPd8/Z4P7xQSRmjesw6mleAmURqqllwQYbFph4J5xlgEEgtsRhGr0Ows5D+vAPM/FNTzfqC/Hl1QFjBVM/GIgAMUMwDA3xKFlQK0MRGYLLkdDKVFgXgZpJMmmQbXoIliOMXUZdUzQ4l8ywawIDKx6AoyoHZMydhosRJa31tYREBbkDlCEcdH862feb5FbXn0xdJ1bb6XDjn6ijZFyov3g7U5c3iLm8JZWWOFqOMUDuDhPBk2hkAboNDyhYaG/YMrHMY0MEAFzwZ9dQfAtBGw0sGtmm4swHcGzC3g10Au4iZ8v8DJ5N5L8TCTU0AAAAASUVORK5CYII=";

    var chevron_right = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAACACAYAAACP+K52AAAOeklEQVR4Xu2dB7AlRRWGwZwzZvGZyxzBhCXmhGLO4AMjKuaIioCpFEUwZxdzzhkUMKNiQEyA8tacI0EFlP9b7qyz9917+/w9PTP91j1Vp1jqdfec/u9Mz8mz9VZbqFcEtu519S2Lb1Ua4IsI0+uIryTeRnxe8VnE/xD/Vnyc+HviE/9fsC8B8A0F1v3FdxZfXZxa83SN+bb4E+J3iY/fnMFOgTFv78y7r/gp4ht1AOi/mnuo+AXiIzqsU+3UHIC3025eJd6+8K64o/cUrxRed9TlHIA5S58l3lt8tp6k5mzeQ/yOntYffNkowOeWZO8U32MgCV+m6zxVzBGypikC8AW1w0+JbzbwTt+m6+0u5qW4ZikF8MW0s8+Jrz/SDj+o6z5Q/O+Rrt/5sosAvpRW5w1/jc5X6bbApzX9XuJTui0zzux5AF9O4hwmxmDIJR7tv4p5OV5InHpaFl3ncP3xruI1Z6DM2jR37hfFV85A9iea8xbxZ8Q/Ep86WYOXJMfMTmLO1UtkrH2k5txJ/JeMuaNNmQb4nJLky2LXePiT5jxRjHqVevOfS2OeJH6u+BzmzjGzby/+vTlvtOHTAL9WkjzKlIZNc2f+0pzHj4hx4d7NPCW3zbieKV6Z4W2Ab6klDzeX/drksf2bOa8ZfhX9gxfptub8FY2/jfhn5rzBhzcA89/vivGERekLGng38UnRCXPGAS4gA7ZDv9Zg7mTO+mqpARgL7UOGlJ/U2HuL/2nMWTT0kvrjIeJrmev9QePvIP6OOW+w4Q3A3EE8chFCQ+DObTSEyJzImItq0GfFuD8dQhXEVcpxVR0B8GXFPxdH9NTva9zNxTjQ+6ALaFGejh3MxTmm+NE5tqoiQEUvfXNQKvwRfd8p59E1PixGHXOI4+o+YjSTagiA3ypeDkj08cldEhjaeQj6+HvFO5srcWw9WPw+c15vwwEYCyniPEdwXJZDET7ng8U4exzCRH/45MZx5vUyFoB/J754YHVMaAKXQxJ+jNdNAHOuizX5ePErnUl9jAVgvFSYr4uIR4/HNmUG9yEjax4gxhR3aS9NeJE7qeR4AP6POKVBoDXwhh+T9tPFn5MhAAAD9CgEsIB3vsDVyXE4OTCuzyGEkV6ScYFXaM4TxIM/gQBMMkjENYn++9WMzZWeQlD01YGnbvq6aEsPE/PEDkYAjGKPJZSi/TXgaalBA/19V10Hv/NZzeuh+u0iLm2FzhUDgPHL7hMQ9M8aQ4QD07QGIoxEZpDrU0afxyD51xCbAGAefZzsEeIsQ/2phYhwEBglYuLQ5zUYI6arJzB5TQBG1/yF+NLJ0WcOWBZjANRCO0oQ7srIi7otM+8TjsZcX3Zo/4165qhAnF8k+znuzZAwHQbdWHOJPl/YXAM3Jz6PP5rzwsMbgLHkThDjaIkQ5uhu4rdHBg80hmABPuWIVdoW6Yf6n9uJceAXp7aB4dzFCIJO+WgxpmwtdDUJgm8bF6xDP9Vg/OHrnUmRsW2AeVEQNrpqZGJrDMr/S805fQ5f0uK8xK5oXoSgLSEogqrFaNpEJprwFTF+B4e4+1H3aiFe2NzJJIQ7RDoAx8XRzqRFY2f5IHBLkniX8k9Mr4tD5smlBCuwTm5eHYktdxR/o4AMc0F8rBbPcfW9XvM4lwc1RxcAQWYo2sVNTbDwz5CqdYQ5b9XwRXcpTmteYOjJDpHdsyyuJe0UJ9XHxLd2NqGxuHHvKSbIm02pY4BoAkaFm9FOTA1duZa0U/zd7xeTgeQQ8j9AnK3zpwBGmLuL3yN2X3yE4Mm3qCXt9OyShaeL4h2HOun8EYARBmuHuzJqiDQbIEuTu6avML8DFGM57t4kxkhyKFvnjwKMMLcQExJ3Ixu8jXkr15J2yp4PElPR5JKt8zsAIwwZkTz6VHQ6hF6JfllT2ukLJc8znU1Mxj5P/6XSKkQuwCx6bTE2v5t2eqzmYI66aa6hjWQOAmCAdims8+cAjDBkQmKOUmrg0IoGY45i+9dCHBUcGS4Wb9AcwlcLdX530TYol9f/YI5G4nnteTWmnfLS4+Xn6vwk4iyLT5t3t3QBmDVJRuG4uKZ5O+J/RTOpKe30fpIH9yvqnEMf0WB0/pkhqK4AIwhpp9TS3cCRSmOJJBBRqCFS3YiOSolBkkrEmd4q+0fnX5XWUAJgLobNT3Sa+J5DxMSIjXGe10KY1JjWmNgOkTrLDbPJnVwKYARBoI+Ko4ncjfAIRLZ8TWmnpOlSPsyN4xBpARwXG6kkwCyKOc0jhifKoerSTiU8dX08+rg9HSKDCK1kA5UGmDVxDGHz89JwCHWHzBsycGohyoh5iUcj7siN74X44IZOLn0AzLqoO28Ukz3vUDVppy2hCT3xjlgyNsIZviF5vC+Am7UP1D8eZwjWDB097XRKZoKo6PwEVaOEW+GoPgFuBMm1+UdNO52BIukA3MnRUjN06l2HABhZc23+0dJO59ymnMV0zIr4YdCJtxkKYOTNtfnJoiR8VUuczyna3HlIgAE51+YnokLa6VybP3owFhr3Ta0T6UhwwNAAs79cm583M+GeQdJOEz8EXrTXBH6sw8YAGLkwRDBI3Dgfb3JihL2nnSbAI/spkgG0fiyAkR+TGtPatfnJPLqLuNe00wTAZNbzJKUy7E8aE2D2kGvz8yanyr63tNPA4x8pHjptrQJ81ARgWtmMRRGATx0T4C5HBG7Bv4+F7ORoiBwRJ44FcJeXHDb+2PV6mMw/DvzAJ4wBMGoa3jY3HasmNe0xkp8OtCk6dGiAHyqJiMa6wcXaDA1espF2k/sPCTDlXy8Xu9ekWcgjxLWYyhg7RC4itJO72ciis8bQd/j5GZOJDFBlP3iN8RxZ6ZCFBhOJctAGchBnD27HZ2SAS9vxZ2fM62sKnjQCm1GfMJGZ3fu8g1kbdyPZ8i7xg7zYndTj+CWt7RTW8MRdT3x0XwBjQhIywnvmEILh1qSavhbKKQ37gISnHtp+4UQ2TWYMKUUbLmAQic4EPdcZc/oeel1dgMiyU9yII4qox0ofAJMRw6+HM8YhwvaUKzC3Fsotz8WVubE4s+QRQTE23jG32IR+Z7QmINGjFqJRKokwboE55W8PaW+iFMB0uAYgt1wKVYaOfXTbroVyWyRwlOAC2KTwpwTAfLOIrPeIZdMGkcYebObrtSArOSjberfYbfJBLR5zVzVL7QpwbskqXVNJX6U2uhYi5ofumnKiT8vLe+NB03duM6gLwEtaxNENm2v+Sv8gyz3ijRoKfLp+E2Nz8ThYc/CvzC26dBdsNpyjGzKXnhT4gflvLcQHr2j45BI/CEbUQjM+B+Ac3RDhuWO5c7mDayG3R0YjN73bnh7ZhAtwrm5II33KuDh7ayG+l8TXEFyi+2DYceUAvKMWzmk+hJZAiKeWQkR80XxtAReoS3j2SGgMUxTgXN0Q/RY9t5YvuBBFWSfmre8QvuhHiqlEsigCcG4DOAwP5pZqpG9tbMZgdFsc5SSuOES6Fp0G0Y9tSgGc28IQ3RDfwmAtDBM7px8RxezkUjhE5JgYIi6ALFoEcG4TzqRumCVp/iSK1/ErUMzuEJFrItika2XTPIA5zKnHdSmkG7qLdhhP0TpmfCQTsn0Zci7wCEZbTs4VcRbAzlcJ2gsTgcgJDXXAb+FUkqQpYKF43SGyhThKiL11pmmA0XO/JHbLSS3dsLPU6QUoUseMdz/fQ496jKEfpC8RG9EGmG4m9HVwP9Jn64Yx0bJHUZzOuUmxukN8rAUzvuiHtNsAu8Uq2bqhs2tzLEXpHAsUqTtEF3DApQttUWoA5mNNOGCiRdCddMOiO/jfYhSj4/SmON2hYzQYM76XT1g0AJODEO3Uj8eegCa5YrUQRegUo7u1xd/SHF5odPfuhQAYBzNtXriLU8SxgHVGj4RaiJcShoDbEYuXOe0Lek2DBWAUcNpvRag2VQw/B98tcms95vZ3iIDgjAHgfcWRLkp8kucK4loazdE2gGpKNw2Wpw/zd5CuhABMwI6+Zimy2lmlFuv499w02GSPnY5yrZoOwOh9Ed2X3sLkxY5NuWmwoS5RpTcHwPhqU6VUBPXwSI3tHctNgw33OesD4MjHolBjXP2ytKy5abCjdufmDuauTL0ouMvPXxqx4HrImJsGa/eaDMoUHobwBCIjGdtkGA4dtERHJ0yzHN7RmQOzu6Wa10kOB2DccpGeZ3SG4rM2Q1GXNNjdJGQV3/gA4HXiTTIC5yC4sQ/NAAjnpsF27lhdem8ATNIz2egp4rHbbnLHp8Z2+XtuGmyRnutdBJ81F4AvI8ZNlwqAMp8PV99E3FelZW4abLGvBvQBMGtSPXOr4OJ4rUjVLG1qVvHdiyAG4WHNXQtgzgusdAP83DTY4l9uCSMXHNgATDoRrWbpWBelUg3wl3TBnDRYXKxEIeisXS21z12OCI4Kh7o2wM9Ng6WDNn7gFUfYMcZOv9hIiiMZ2SFefDiuCRo6RAQb1c8pkWL9Xr//5mwgMnYaYPRPki3wnDmEr4JEZrJ6UkXbOI0wYXHcuLUQNbSScXCZqZoRkaXxEM51l3B9UufAS5BgYtOCC92WH41smWUxhTMuDfINTleo1Ph5ui9V5bx43Ab47ethmNAZiheo+3GTabkH+4psCjD374uMC4Kg5BhEm2G6146OH/Q7yFGhouNS1hs+YB5390yOXj81jnxePiBYS0vFlLyr/p4CmAm56Z+2MFMTamsKmrWfCMAszJufz5y72eFZQmkSaVxoGWueogCzUcaS/bOPOBUByQWG8lqKU+hruVmQA3CzYWqSMUgwFEoSoJKpWVMdXef95QDcXBQHEcV423eQAqME7xxHQk1F4R22tOnULgA3K9GbhkwZSr1wFqXWJMh6pBj1Cy1hfbHdVLhQCgxXZLIbAZlEFnwM5FtgcOAQ/42YPFx8F7WUdrn7s8eXBtgWYHOfsAXgnn/hMwDI3H90EUTR0QAAAABJRU5ErkJggg==";

    game.load.image("slider_chevron_left", chevron_left);
    game.load.image("slider_chevron_right", chevron_right);

    _this.goToNext = function () {
        _this.locked = true;
        if (_this.options._mode === "horizontal") {
            var finalX = _this.sliderMainGroup.x + (_this.options._width * -1);

            if ((_this.slideIndex >= _this.options._objects.length - 1) && _this.options.autoAnimate === false) {
                _this.stopSlider();
                return false;
            }

            // animate loop
            if (_this.options.autoAnimate === true) {
                if (_this.slideIndex >= _this.options._objects.length - 1) {
                    _this.slideIndex = 0;
                    _this.sliderMainGroup.x = _this.options._x;
                    this.locked = false;
                    return true;
                }
            }

            _this.tweenObj = game.add.tween(_this.sliderMainGroup).to({
                x: finalX
            }, _this.options.animationDuration, _this.options.animationEasing, true, 0, 0, false);
            _this.tweenObj.onComplete.add(function () {
                this.locked = false;
                this.slideIndex += 1;
                if (_this.options.autoAnimate === false && this.slideIndex >= _this.options._objects.length - 1) {
                    if (_this.options._showHandles === true) {
                        this.sliderControlsGroup.children[0].alpha = 0;
                    }
                }

                // enable prev
                if (_this.options._showHandles === true) {
                    this.sliderControlsGroup.children[1].alpha = 1;
                }
            }, _this);
        } else {

            var finalY;
            if (_this.options._mode === "vertical-from-top") {
                finalY = _this.sliderMainGroup.y + (_this.options._height);
            } else if (_this.options._mode === "vertical-from-bottom") {
                finalY = _this.sliderMainGroup.y + (_this.options._height * -1);
            }

            if ((_this.slideIndex >= _this.options._objects.length - 1) && _this.options.autoAnimate === false) {
                _this.stopSlider();
                return false;
            }

            // animate loop
            if (_this.options.autoAnimate === true) {
                if (_this.slideIndex >= _this.options._objects.length - 1) {
                    _this.slideIndex = 0;
                    _this.sliderMainGroup.y = _this.options._y;
                    this.locked = false;
                    return true;
                }
            }

            _this.tweenObj = game.add.tween(_this.sliderMainGroup).to({
                y: finalY
            }, _this.options.animationDuration, _this.options.animationEasing, true, 0, 0, false);
            _this.tweenObj.onComplete.add(function () {
                this.locked = false;
                this.slideIndex += 1;

                if (_this.options.autoAnimate === false && this.slideIndex >= _this.options._objects.length - 1) {
                    if (_this.options._showHandles === true) {
                        this.sliderControlsGroup.children[0].alpha = 0;
                    }
                }

                // enable prev
                if (_this.options._showHandles === true) {
                    this.sliderControlsGroup.children[1].alpha = 1;
                }
            }, _this);
        }
    };
    _this.goToPrev = function () {
        _this.locked = true;
        if (_this.options._mode === "horizontal") {
            var finalX = _this.sliderMainGroup.x + (_this.options._width);

            if (_this.slideIndex <= 0 && _this.options.autoAnimate === false) {
                _this.stopSlider();
                return false;
            }

            _this.tweenObj = game.add.tween(_this.sliderMainGroup).to({
                x: finalX
            }, _this.options.animationDuration, _this.options.animationEasing, true, 0, 0, false);
            _this.tweenObj.onComplete.add(function () {
                this.locked = false;
                this.slideIndex -= 1;

                if (this.slideIndex < 0) {
                    this.slideIndex = 0;
                }

                if (_this.options.infiniteLoop === false && this.slideIndex <= 0) {
                    // enable prev
                    if (_this.options._showHandles === true) {
                        this.sliderControlsGroup.children[1].alpha = 0;
                    }
                }

                // enable next
                if (_this.options._showHandles === true) {
                    this.sliderControlsGroup.children[0].alpha = 1;
                }

            }, _this);
        } else {
            var finalY;
            if (_this.options._mode === "vertical-from-top") {
                finalY = _this.sliderMainGroup.y + (_this.options._height * -1);
            } else if (_this.options._mode === "vertical-from-bottom") {
                finalY = _this.sliderMainGroup.y + (_this.options._height);
            }
            if (_this.slideIndex <= 0 && _this.options.autoAnimate === false) {
                _this.stopSlider();
                return false;
            }

            _this.tweenObj = game.add.tween(_this.sliderMainGroup).to({
                y: finalY
            }, _this.options.animationDuration, _this.options.animationEasing, true, 0, 0, false);
            _this.tweenObj.onComplete.add(function () {
                this.locked = false;
                this.slideIndex -= 1;

                if (this.slideIndex < 0) {
                    this.slideIndex = 0;
                }

                if (_this.options.autoAnimate === false && this.slideIndex <= 0) {
                    if (_this.options._showHandles === true) {
                        this.sliderControlsGroup.children[1].alpha = 0;
                    }
                }

                // enable prev
                if (_this.options._showHandles === true) {
                    this.sliderControlsGroup.children[0].alpha = 1;
                }
            }, _this);
        }
    };

    _this.startSlider = function () {
        var _timer = game.time.create(false);
        _timer.start();
        _timer.loop(Phaser.Timer.SECOND * _this.options.animationDelay, _this.goToNext, _this);
        _this.slider_timer = _timer;
    };
    _this.stopSlider = function () {
        if (_this.slider_timer !== null) {
            _this.slider_timer.stop(true);
            _this.slider_timer = null;
        } else {
            return false;
        }
    };

    _this.moveToSlide = function (index, animate) {
        var finalX;
        if (index >= _this.options._objects.length) {
            return false;
        }
        if (_this.options._mode === "horizontal") {
            finalX = (_this.options._x - (_this.options._width * (index)));
            if (animate === true) {

                var tweenObj = game.add.tween(_this.sliderMainGroup).to({
                    x: finalX
                }, _this.options.animationDuration, _this.options.animationEasing, true, 0, 0, false);
            } else {
                _this.sliderMainGroup.x = finalX;
            }
        } else if (_this.options._mode === "vertical-from-top") {
            //TODO: ADD VERTICAL-FROM-TOP
        } else if (_this.options._mode === "vertical-from-bottom") {
            //TODO: ADD VERTICAL-FROM-BOTTOM
        }
    };
    /////////////////////////////////////////////////////////////////////////////////////////
    ///
    _this.onDragStart = function (sprite, pointer, dragX, dragY) {
        _this.dragInit = pointer.x;
        _this.lastDrag = pointer.x;
    };

    _this.onDragStop = function (e) {

    };
    _this.dragUpdate = function (sprite, pointer, dragX, dragY) {

        var finalX = dragX; // - _this.options._x;
        // going left
        if (pointer.x < _this.dragInit) {
            var diff = Math.abs(pointer.x) - Math.abs(_this.lastDrag);
            // going right
            if (diff < 0) {
                finalX = _this.sliderMainGroup.x - 1;
            } else {
                finalX = _this.sliderMainGroup.x + 1;
            }
        } else {
            var diff = Math.abs(pointer.x) - Math.abs(_this.lastDrag);
            // going right
            if (diff < 0) {
                finalX = _this.sliderMainGroup.x - 1;
            } else {
                finalX = _this.sliderMainGroup.x + 1;
            }
        }

        if (finalX <= (_this.options._x + (_this.options._width * (_this.options._objects.length - 2))) * -1) {
            finalX = (_this.options._x + (_this.options._width * (_this.options._objects.length - 2))) * -1;
        } else if (finalX >= _this.options._x) {
            finalX = _this.options._x;
        }
        _this.sliderMainGroup.x = finalX;
        _this.lastDrag = pointer.x;
    };

    return {
        createSlider: function (options) {
            // initialize index
            _this.slideIndex = 0;

            _this.options = {
                _mode: options.mode || "horizontal", // horizontal, vertical-from-top, vertical-from-bottom
                _width: options.width || 500,
                _height: options.height || 400,
                _animationEffect: options.animationEffect || "slide", // slide, fade, cover
                autoAnimate: options.autoAnimate || false,
                infiniteLoop: options.infiniteLoop || false,
                animationDelay: options.animationDelay || 2,
                animationDuration: options.animationDuration || 600,
                animationEasing: options.animationEasing || Phaser.Easing.Cubic.Out, //Phaser.Easing.Linear.None,
                _x: options.x || 0,
                _y: options.y || 0,
                _objects: options.objects || [], // can take: single-sprite, single-image, group
                sliderBG: options.sliderBG || 0x35d2e0,
                customSliderBG: options.customSliderBG || false,
                sliderBGAlpha: options.sliderBGAlpha || 1,
                _customHandleFrame: options.customHandleFrame || "",
                _customHandleNext: options.customHandleNext || "",
                _customHandlePrev: options.customHandlePrev || "",
                _showHandles: options.showHandles || true,
                _onNextCallback: options.onNextCallback || false,
                _onPrevCallback: options.onPrevCallback || false,
                _addModal: options.modal || false,
                _modalAlpha: options.modalAlpha || 0.7,
                _staticElements: options.staticElements || []
            };

            //////////////////////////////////////////////////////////////////////////////////////////////

            var bgRect;
            _this._modal = {};
            if(_this.options._addModal ===  true) {
                _this._modal = game.add.graphics(game.width, game.height);
                _this._modal.beginFill(0x000000, _this.options._modalAlpha);
                _this._modal.x = 0;
                _this._modal.y = 0;
                _this._modal.inputEnabled = true;
                _this._modal.drawRect(0, 0, _this.game.width, _this.game.height);
            }
            else {
                _this._modal = false;
            }

            //////// OBJECTS GROUP
            ///
            _this.sliderBGGroup = _this.game.add.group();
            _this.sliderMainGroup = _this.game.add.group();
            _this.sliderBGGroup.width = _this.options._width;
            _this.sliderMainGroup.width = _this.options._width;
            if (_this.options._mode === "horizontal") {
                _this.sliderMainGroup.width = _this.options._width * _this.options._objects.length;

                // if used as a placeholder don't make the width = 0
                if (_this.options._objects.length === 0) {
                    _this.sliderMainGroup.width = _this.options._width;
                }
            } else {
                _this.sliderMainGroup.height = _this.options._height * _this.options._objects.length;

                // if used as a placeholder don't make the height = 0
                if (_this.options._objects.length === 0) {
                    _this.sliderMainGroup.height = _this.options._height;
                }
            }
            _this.sliderMainGroup.height = _this.options._height;
            _this.sliderMainGroup.x = _this.options._x;
            _this.sliderMainGroup.y = _this.options._y;
            //
            _this.sliderBGGroup.height =  _this.options._height;
            _this.sliderBGGroup.x = _this.options._x;
            _this.sliderBGGroup.y = _this.options._y;

            /// DRAG for horizontal
            /*var draggableSprite = _this.game.add.sprite(_this.options._x, _this.options._y);
            draggableSprite.width = (_this.options._objects.length+5) * _this.options._width;
            draggableSprite.height = _this.options._height;
            draggableSprite.y = _this.options._y;
            draggableSprite.inputEnabled = true;
            draggableSprite.input.enableDrag();
            draggableSprite.input.allowVerticalDrag = false;
           // draggableSprite.input.enableSnap(_this.options._width, _this.options._height, true, true);
            draggableSprite.events.onDragStart.add(_this.onDragStart, _this);
            draggableSprite.events.onDragStop.add(_this.onDragStop, _this);
            draggableSprite.events.onDragUpdate.add(_this.dragUpdate, _this);
            _this._draggableSprite = draggableSprite;*/

            /////// END OF OBJECTS GROUP

            //////// CONTROLS GROUP
            _this.sliderControlsGroup = _this.game.add.group();
            _this.sliderControlsGroup.width = _this.options._width;
            _this.sliderControlsGroup.height = _this.options._height;
            _this.sliderControlsGroup.x = _this.options._x;
            _this.sliderControlsGroup.y = _this.options._y;

            //////// END OF CONTROLS GROUP

            //MASK
            var maskGraphics = game.add.graphics(0, 0);
            maskGraphics.beginFill(0xffffff);
            maskGraphics.drawRect(_this.options._x, _this.options._y, _this.options._width, _this.options._height);
            _this.sliderMainGroup.mask = maskGraphics;

            /// create main bg
            if (_this.options.customSliderBG === false) {
                // bgRect = game.add.graphics(_this.options._width, _this.options._height);
                // bgRect.beginFill(_this.options.sliderBG, _this.options.sliderBGAlpha);
                // bgRect.x = _this.options._x;
                // bgRect.y = _this.options._y;
                //
                // bgRect.drawRect(0, 0, _this.options._width, _this.options._height);
                // _this.sliderMainGroup.add(bgRect);
            } else {
                _this.sliderBGGroup.add(_this.options.customSliderBG);
            }
            // add controls
            if (_this.options._showHandles === true) {

                var chevronRight;
                var chevronLeft;

                if (_this.options._customHandleNext === "") {
                    chevronRight = game.add.image(0, 0, "slider_chevron_right");
                    chevronRight.scale.setTo(0.6, 0.6);
                } else {
                  if(_this.options._customHandleFrame !== "") {
                    chevronRight = game.add.image(0, 0, _this.options._customHandleFrame, _this.options._customHandleNext);
                  } else {
                    chevronRight = game.add.image(0, 0, _this.options._customHandleNext);
                  }
                }
                chevronRight.x = _this.options._width - (chevronRight.width + 10); //_this.options._x+_this.options._width - (chevronRight.width+10);
                chevronRight.y = (_this.options._height / 2) - chevronRight.height / 2;
                chevronRight.inputEnabled = true;
                chevronRight.events.onInputDown.add(function (e, pointer) {
                    if (_this.options._onNextCallback) {
                        _this.options._onNextCallback();
                    }

                    if (_this.tweenObj.isRunning !== true) {
                        _this.stopSlider();
                        _this.goToNext();
                    }

                }, _this);


                if (_this.options._customHandlePrev === "") {
                    chevronLeft = game.add.image(0, 0, "slider_chevron_left");
                    chevronLeft.scale.setTo(0.6, 0.6);
                } else {
                    if(_this.options._customHandleFrame !== "") {
                      chevronLeft = game.add.image(0, 0, _this.options._customHandleFrame, _this.options._customHandlePrev);
                    } else {
                      chevronLeft = game.add.image(0, 0, _this.options._customHandlePrev);
                    }
                }
                chevronLeft.x = 10;
                chevronLeft.y = (_this.options._height / 2) - chevronLeft.height / 2;
                chevronLeft.inputEnabled = true;
                chevronLeft.events.onInputDown.add(function (e, pointer) {
                    if (_this.options._onPrevCallback) {
                        _this.options._onPrevCallback();
                    }

                    if (_this.tweenObj.isRunning !== true) {
                        _this.stopSlider();
                        _this.goToPrev();
                    }

                }, _this);



                // if not infinite initialy hide it
                if (_this.options.infiniteLoop === false) {
                    chevronLeft.alpha = 0;
                }
            }


            // ADDING THE BLOCKS
            if (_this.options._objects.length > 0) {
                var objArr = _this.options._objects.slice(0);
                var length = Number(objArr.length) - 1;
                for (var i = 0; i <= length; i++) {
                    var x;
                    var y;
                    // mode
                    if (_this.options._mode === "horizontal") {
                        objArr[i].x = (_this.options._width * i);
                    } else if (_this.options._mode === "vertical-from-top") {
                        objArr[i].y = (_this.options._height * i) * -1;

                    } else if (_this.options._mode === "vertical-from-bottom") {
                        objArr[i].y = (_this.options._height * i);
                    }
                    _this.sliderMainGroup.add(objArr[i]);
                }
                _this.options._objects = _this.sliderMainGroup.children;
                //window.console.log(_this.options._objects.length, _this.options._objects,  _this.sliderMainGroup.children.length);
            }


            // ADDING STATIC ELEMENTS
            if(_this.options._staticElements.length > 0) {
                for (var i = 0;i<_this.options._staticElements.length;i++ ) {
                    game.world.bringToTop(_this.options._staticElements[i]);
                    _this.sliderBGGroup.add(_this.options._staticElements[i]);
                }
            }


            // move the chevrons to top
            if (_this.options._showHandles === true) {
                _this.sliderControlsGroup.add(chevronRight);
                _this.sliderControlsGroup.add(chevronLeft);
            }

            //////////// AUTO ANIMATE
            if (_this.options.autoAnimate === true) {
                _this.startSlider();
            }

        },
        startSlider: function () {
            _this.startSlider();
        },
        stopSlider: function () {
            _this.startSlider();
        },
        moveToSlide: function (index, animate) {

            _this.moveToSlide(index, animate);
        },
        goToNext: function () {
            _this.goToNext();
        },
        goToPrev: function () {
            _this.goToPrev();
        },
        getCurrentIndex: function () {
            return _this.slideIndex;
        },
        hideSlider: function() {
            _this.sliderMainGroup.visible = false;
            _this.sliderControlsGroup.visible = false;
            _this.sliderBGGroup.visible = false;
            if(_this._modal) {
                _this._modal.visible = false;
            }
        },
        showSlider: function() {
            _this.sliderMainGroup.visible = true;
            _this.sliderControlsGroup.visible = true;
            _this.sliderBGGroup.visible = true;
            if(_this._modal) {
                _this._modal.visible = true;
            }
        }
    };
};
module.exports = phaseSlider;

},{}],5:[function(require,module,exports){
/**
  * Phaser State Transition Plugin
  * It adds a little more liveliness to your state changes

	The MIT License (MIT)

	Copyright (c) 2014 Cristian Bote

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.

	Contact: https://github.com/cristianbote, @cristianbote_

  */
  
!function(t,e){function i(){this._cover&&this._cover.bringToTop()}function s(t){if(this.game.paused=!0,this._cover&&this._cover.destroy(),this._texture||(this._texture=new e.RenderTexture(this.game,this.game.width,this.game.height,"cover")),this._texture.renderXY(this.game.stage,-this.game.camera.x,-this.game.camera.y),t){var i=this.game.state.states[t].create,s=this;this._cover=new e.Sprite(this.game,0,0,this._texture),this._cover.fixedToCamera=!0,this._cover.anchor.setTo(.5,.5),this._cover.cameraOffset.x=this.game.width/2,this._cover.cameraOffset.y=this.game.height/2,this.game.state.states[t].create=function(){i.call(s.game.state.states[t]),s.game.add.existing(s._cover),r.call(s)},this.game.state.start(t)}this.game.paused=!1}function r(){if(o&&o.properties){for(var t in o.properties)if("object"!=typeof o.properties[t]){var e={};e[t]=o.properties[t],this._tween=this.game.add.tween(this._cover).to(e,o.duration,o.ease,!0)}else this._tween=this.game.add.tween(this._cover[t]).to(o.properties[t],o.duration,o.ease,!0);this._tween.onComplete.addOnce(a,this)}}function a(){this._cover&&this._cover.destroy(),this._cover=null,this._texture&&this._texture.destroy(),this._texture=null}e.Plugin.StateTransition=function(t,i){e.Plugin.call(this,t,i)},e.Plugin.StateTransition.prototype=Object.create(e.Plugin.prototype),e.Plugin.StateTransition.prototype.constructor=e.Plugin.StateTransition,e.Plugin.StateTransition.prototype.to=function(t){s.call(this,t)},e.Plugin.StateTransition.prototype.bringToTop=function(){i.call(this)},e.Plugin.StateTransition.prototype.settings=function(t){if(!t)return Object.create(o);for(var e in t)o[e]&&(o[e]=t[e])};var o={duration:300,ease:e.Easing.Exponential.InOut,properties:{alpha:0}}}(window,Phaser);
},{}],6:[function(require,module,exports){
(function (global){
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.io=e()}}(function(){var define,module,exports;return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}({1:[function(_dereq_,module,exports){module.exports=_dereq_("./lib/")},{"./lib/":2}],2:[function(_dereq_,module,exports){var url=_dereq_("./url");var parser=_dereq_("socket.io-parser");var Manager=_dereq_("./manager");var debug=_dereq_("debug")("socket.io-client");module.exports=exports=lookup;var cache=exports.managers={};function lookup(uri,opts){if(typeof uri=="object"){opts=uri;uri=undefined}opts=opts||{};var parsed=url(uri);var source=parsed.source;var id=parsed.id;var io;if(opts.forceNew||opts["force new connection"]||false===opts.multiplex){debug("ignoring socket cache for %s",source);io=Manager(source,opts)}else{if(!cache[id]){debug("new io instance for %s",source);cache[id]=Manager(source,opts)}io=cache[id]}return io.socket(parsed.path)}exports.protocol=parser.protocol;exports.connect=lookup;exports.Manager=_dereq_("./manager");exports.Socket=_dereq_("./socket")},{"./manager":3,"./socket":5,"./url":6,debug:10,"socket.io-parser":44}],3:[function(_dereq_,module,exports){var url=_dereq_("./url");var eio=_dereq_("engine.io-client");var Socket=_dereq_("./socket");var Emitter=_dereq_("component-emitter");var parser=_dereq_("socket.io-parser");var on=_dereq_("./on");var bind=_dereq_("component-bind");var object=_dereq_("object-component");var debug=_dereq_("debug")("socket.io-client:manager");var indexOf=_dereq_("indexof");var Backoff=_dereq_("backo2");module.exports=Manager;function Manager(uri,opts){if(!(this instanceof Manager))return new Manager(uri,opts);if(uri&&"object"==typeof uri){opts=uri;uri=undefined}opts=opts||{};opts.path=opts.path||"/socket.io";this.nsps={};this.subs=[];this.opts=opts;this.reconnection(opts.reconnection!==false);this.reconnectionAttempts(opts.reconnectionAttempts||Infinity);this.reconnectionDelay(opts.reconnectionDelay||1e3);this.reconnectionDelayMax(opts.reconnectionDelayMax||5e3);this.randomizationFactor(opts.randomizationFactor||.5);this.backoff=new Backoff({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()});this.timeout(null==opts.timeout?2e4:opts.timeout);this.readyState="closed";this.uri=uri;this.connected=[];this.encoding=false;this.packetBuffer=[];this.encoder=new parser.Encoder;this.decoder=new parser.Decoder;this.autoConnect=opts.autoConnect!==false;if(this.autoConnect)this.open()}Manager.prototype.emitAll=function(){this.emit.apply(this,arguments);for(var nsp in this.nsps){this.nsps[nsp].emit.apply(this.nsps[nsp],arguments)}};Manager.prototype.updateSocketIds=function(){for(var nsp in this.nsps){this.nsps[nsp].id=this.engine.id}};Emitter(Manager.prototype);Manager.prototype.reconnection=function(v){if(!arguments.length)return this._reconnection;this._reconnection=!!v;return this};Manager.prototype.reconnectionAttempts=function(v){if(!arguments.length)return this._reconnectionAttempts;this._reconnectionAttempts=v;return this};Manager.prototype.reconnectionDelay=function(v){if(!arguments.length)return this._reconnectionDelay;this._reconnectionDelay=v;this.backoff&&this.backoff.setMin(v);return this};Manager.prototype.randomizationFactor=function(v){if(!arguments.length)return this._randomizationFactor;this._randomizationFactor=v;this.backoff&&this.backoff.setJitter(v);return this};Manager.prototype.reconnectionDelayMax=function(v){if(!arguments.length)return this._reconnectionDelayMax;this._reconnectionDelayMax=v;this.backoff&&this.backoff.setMax(v);return this};Manager.prototype.timeout=function(v){if(!arguments.length)return this._timeout;this._timeout=v;return this};Manager.prototype.maybeReconnectOnOpen=function(){if(!this.reconnecting&&this._reconnection&&this.backoff.attempts===0){this.reconnect()}};Manager.prototype.open=Manager.prototype.connect=function(fn){debug("readyState %s",this.readyState);if(~this.readyState.indexOf("open"))return this;debug("opening %s",this.uri);this.engine=eio(this.uri,this.opts);var socket=this.engine;var self=this;this.readyState="opening";this.skipReconnect=false;var openSub=on(socket,"open",function(){self.onopen();fn&&fn()});var errorSub=on(socket,"error",function(data){debug("connect_error");self.cleanup();self.readyState="closed";self.emitAll("connect_error",data);if(fn){var err=new Error("Connection error");err.data=data;fn(err)}else{self.maybeReconnectOnOpen()}});if(false!==this._timeout){var timeout=this._timeout;debug("connect attempt will timeout after %d",timeout);var timer=setTimeout(function(){debug("connect attempt timed out after %d",timeout);openSub.destroy();socket.close();socket.emit("error","timeout");self.emitAll("connect_timeout",timeout)},timeout);this.subs.push({destroy:function(){clearTimeout(timer)}})}this.subs.push(openSub);this.subs.push(errorSub);return this};Manager.prototype.onopen=function(){debug("open");this.cleanup();this.readyState="open";this.emit("open");var socket=this.engine;this.subs.push(on(socket,"data",bind(this,"ondata")));this.subs.push(on(this.decoder,"decoded",bind(this,"ondecoded")));this.subs.push(on(socket,"error",bind(this,"onerror")));this.subs.push(on(socket,"close",bind(this,"onclose")))};Manager.prototype.ondata=function(data){this.decoder.add(data)};Manager.prototype.ondecoded=function(packet){this.emit("packet",packet)};Manager.prototype.onerror=function(err){debug("error",err);this.emitAll("error",err)};Manager.prototype.socket=function(nsp){var socket=this.nsps[nsp];if(!socket){socket=new Socket(this,nsp);this.nsps[nsp]=socket;var self=this;socket.on("connect",function(){socket.id=self.engine.id;if(!~indexOf(self.connected,socket)){self.connected.push(socket)}})}return socket};Manager.prototype.destroy=function(socket){var index=indexOf(this.connected,socket);if(~index)this.connected.splice(index,1);if(this.connected.length)return;this.close()};Manager.prototype.packet=function(packet){debug("writing packet %j",packet);var self=this;if(!self.encoding){self.encoding=true;this.encoder.encode(packet,function(encodedPackets){for(var i=0;i<encodedPackets.length;i++){self.engine.write(encodedPackets[i])}self.encoding=false;self.processPacketQueue()})}else{self.packetBuffer.push(packet)}};Manager.prototype.processPacketQueue=function(){if(this.packetBuffer.length>0&&!this.encoding){var pack=this.packetBuffer.shift();this.packet(pack)}};Manager.prototype.cleanup=function(){var sub;while(sub=this.subs.shift())sub.destroy();this.packetBuffer=[];this.encoding=false;this.decoder.destroy()};Manager.prototype.close=Manager.prototype.disconnect=function(){this.skipReconnect=true;this.backoff.reset();this.readyState="closed";this.engine&&this.engine.close()};Manager.prototype.onclose=function(reason){debug("close");this.cleanup();this.backoff.reset();this.readyState="closed";this.emit("close",reason);if(this._reconnection&&!this.skipReconnect){this.reconnect()}};Manager.prototype.reconnect=function(){if(this.reconnecting||this.skipReconnect)return this;var self=this;if(this.backoff.attempts>=this._reconnectionAttempts){debug("reconnect failed");this.backoff.reset();this.emitAll("reconnect_failed");this.reconnecting=false}else{var delay=this.backoff.duration();debug("will wait %dms before reconnect attempt",delay);this.reconnecting=true;var timer=setTimeout(function(){if(self.skipReconnect)return;debug("attempting reconnect");self.emitAll("reconnect_attempt",self.backoff.attempts);self.emitAll("reconnecting",self.backoff.attempts);if(self.skipReconnect)return;self.open(function(err){if(err){debug("reconnect attempt error");self.reconnecting=false;self.reconnect();self.emitAll("reconnect_error",err.data)}else{debug("reconnect success");self.onreconnect()}})},delay);this.subs.push({destroy:function(){clearTimeout(timer)}})}};Manager.prototype.onreconnect=function(){var attempt=this.backoff.attempts;this.reconnecting=false;this.backoff.reset();this.updateSocketIds();this.emitAll("reconnect",attempt)}},{"./on":4,"./socket":5,"./url":6,backo2:7,"component-bind":8,"component-emitter":9,debug:10,"engine.io-client":11,indexof:40,"object-component":41,"socket.io-parser":44}],4:[function(_dereq_,module,exports){module.exports=on;function on(obj,ev,fn){obj.on(ev,fn);return{destroy:function(){obj.removeListener(ev,fn)}}}},{}],5:[function(_dereq_,module,exports){var parser=_dereq_("socket.io-parser");var Emitter=_dereq_("component-emitter");var toArray=_dereq_("to-array");var on=_dereq_("./on");var bind=_dereq_("component-bind");var debug=_dereq_("debug")("socket.io-client:socket");var hasBin=_dereq_("has-binary");module.exports=exports=Socket;var events={connect:1,connect_error:1,connect_timeout:1,disconnect:1,error:1,reconnect:1,reconnect_attempt:1,reconnect_failed:1,reconnect_error:1,reconnecting:1};var emit=Emitter.prototype.emit;function Socket(io,nsp){this.io=io;this.nsp=nsp;this.json=this;this.ids=0;this.acks={};if(this.io.autoConnect)this.open();this.receiveBuffer=[];this.sendBuffer=[];this.connected=false;this.disconnected=true}Emitter(Socket.prototype);Socket.prototype.subEvents=function(){if(this.subs)return;var io=this.io;this.subs=[on(io,"open",bind(this,"onopen")),on(io,"packet",bind(this,"onpacket")),on(io,"close",bind(this,"onclose"))]};Socket.prototype.open=Socket.prototype.connect=function(){if(this.connected)return this;this.subEvents();this.io.open();if("open"==this.io.readyState)this.onopen();return this};Socket.prototype.send=function(){var args=toArray(arguments);args.unshift("message");this.emit.apply(this,args);return this};Socket.prototype.emit=function(ev){if(events.hasOwnProperty(ev)){emit.apply(this,arguments);return this}var args=toArray(arguments);var parserType=parser.EVENT;if(hasBin(args)){parserType=parser.BINARY_EVENT}var packet={type:parserType,data:args};if("function"==typeof args[args.length-1]){debug("emitting packet with ack id %d",this.ids);this.acks[this.ids]=args.pop();packet.id=this.ids++}if(this.connected){this.packet(packet)}else{this.sendBuffer.push(packet)}return this};Socket.prototype.packet=function(packet){packet.nsp=this.nsp;this.io.packet(packet)};Socket.prototype.onopen=function(){debug("transport is open - connecting");if("/"!=this.nsp){this.packet({type:parser.CONNECT})}};Socket.prototype.onclose=function(reason){debug("close (%s)",reason);this.connected=false;this.disconnected=true;delete this.id;this.emit("disconnect",reason)};Socket.prototype.onpacket=function(packet){if(packet.nsp!=this.nsp)return;switch(packet.type){case parser.CONNECT:this.onconnect();break;case parser.EVENT:this.onevent(packet);break;case parser.BINARY_EVENT:this.onevent(packet);break;case parser.ACK:this.onack(packet);break;case parser.BINARY_ACK:this.onack(packet);break;case parser.DISCONNECT:this.ondisconnect();break;case parser.ERROR:this.emit("error",packet.data);break}};Socket.prototype.onevent=function(packet){var args=packet.data||[];debug("emitting event %j",args);if(null!=packet.id){debug("attaching ack callback to event");args.push(this.ack(packet.id))}if(this.connected){emit.apply(this,args)}else{this.receiveBuffer.push(args)}};Socket.prototype.ack=function(id){var self=this;var sent=false;return function(){if(sent)return;sent=true;var args=toArray(arguments);debug("sending ack %j",args);var type=hasBin(args)?parser.BINARY_ACK:parser.ACK;self.packet({type:type,id:id,data:args})}};Socket.prototype.onack=function(packet){debug("calling ack %s with %j",packet.id,packet.data);var fn=this.acks[packet.id];fn.apply(this,packet.data);delete this.acks[packet.id]};Socket.prototype.onconnect=function(){this.connected=true;this.disconnected=false;this.emit("connect");this.emitBuffered()};Socket.prototype.emitBuffered=function(){var i;for(i=0;i<this.receiveBuffer.length;i++){emit.apply(this,this.receiveBuffer[i])}this.receiveBuffer=[];for(i=0;i<this.sendBuffer.length;i++){this.packet(this.sendBuffer[i])}this.sendBuffer=[]};Socket.prototype.ondisconnect=function(){debug("server disconnect (%s)",this.nsp);this.destroy();this.onclose("io server disconnect")};Socket.prototype.destroy=function(){if(this.subs){for(var i=0;i<this.subs.length;i++){this.subs[i].destroy()}this.subs=null}this.io.destroy(this)};Socket.prototype.close=Socket.prototype.disconnect=function(){if(this.connected){debug("performing disconnect (%s)",this.nsp);this.packet({type:parser.DISCONNECT})}this.destroy();if(this.connected){this.onclose("io client disconnect")}return this}},{"./on":4,"component-bind":8,"component-emitter":9,debug:10,"has-binary":36,"socket.io-parser":44,"to-array":48}],6:[function(_dereq_,module,exports){(function(global){var parseuri=_dereq_("parseuri");var debug=_dereq_("debug")("socket.io-client:url");module.exports=url;function url(uri,loc){var obj=uri;var loc=loc||global.location;if(null==uri)uri=loc.protocol+"//"+loc.host;if("string"==typeof uri){if("/"==uri.charAt(0)){if("/"==uri.charAt(1)){uri=loc.protocol+uri}else{uri=loc.hostname+uri}}if(!/^(https?|wss?):\/\//.test(uri)){debug("protocol-less url %s",uri);if("undefined"!=typeof loc){uri=loc.protocol+"//"+uri}else{uri="https://"+uri}}debug("parse %s",uri);obj=parseuri(uri)}if(!obj.port){if(/^(http|ws)$/.test(obj.protocol)){obj.port="80"}else if(/^(http|ws)s$/.test(obj.protocol)){obj.port="443"}}obj.path=obj.path||"/";obj.id=obj.protocol+"://"+obj.host+":"+obj.port;obj.href=obj.protocol+"://"+obj.host+(loc&&loc.port==obj.port?"":":"+obj.port);return obj}}).call(this,typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{debug:10,parseuri:42}],7:[function(_dereq_,module,exports){module.exports=Backoff;function Backoff(opts){opts=opts||{};this.ms=opts.min||100;this.max=opts.max||1e4;this.factor=opts.factor||2;this.jitter=opts.jitter>0&&opts.jitter<=1?opts.jitter:0;this.attempts=0}Backoff.prototype.duration=function(){var ms=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var rand=Math.random();var deviation=Math.floor(rand*this.jitter*ms);ms=(Math.floor(rand*10)&1)==0?ms-deviation:ms+deviation}return Math.min(ms,this.max)|0};Backoff.prototype.reset=function(){this.attempts=0};Backoff.prototype.setMin=function(min){this.ms=min};Backoff.prototype.setMax=function(max){this.max=max};Backoff.prototype.setJitter=function(jitter){this.jitter=jitter}},{}],8:[function(_dereq_,module,exports){var slice=[].slice;module.exports=function(obj,fn){if("string"==typeof fn)fn=obj[fn];if("function"!=typeof fn)throw new Error("bind() requires a function");var args=slice.call(arguments,2);return function(){return fn.apply(obj,args.concat(slice.call(arguments)))}}},{}],9:[function(_dereq_,module,exports){module.exports=Emitter;function Emitter(obj){if(obj)return mixin(obj)}function mixin(obj){for(var key in Emitter.prototype){obj[key]=Emitter.prototype[key]}return obj}Emitter.prototype.on=Emitter.prototype.addEventListener=function(event,fn){this._callbacks=this._callbacks||{};(this._callbacks[event]=this._callbacks[event]||[]).push(fn);return this};Emitter.prototype.once=function(event,fn){var self=this;this._callbacks=this._callbacks||{};function on(){self.off(event,on);fn.apply(this,arguments)}on.fn=fn;this.on(event,on);return this};Emitter.prototype.off=Emitter.prototype.removeListener=Emitter.prototype.removeAllListeners=Emitter.prototype.removeEventListener=function(event,fn){this._callbacks=this._callbacks||{};if(0==arguments.length){this._callbacks={};return this}var callbacks=this._callbacks[event];if(!callbacks)return this;if(1==arguments.length){delete this._callbacks[event];return this}var cb;for(var i=0;i<callbacks.length;i++){cb=callbacks[i];if(cb===fn||cb.fn===fn){callbacks.splice(i,1);break}}return this};Emitter.prototype.emit=function(event){this._callbacks=this._callbacks||{};var args=[].slice.call(arguments,1),callbacks=this._callbacks[event];if(callbacks){callbacks=callbacks.slice(0);for(var i=0,len=callbacks.length;i<len;++i){callbacks[i].apply(this,args)}}return this};Emitter.prototype.listeners=function(event){this._callbacks=this._callbacks||{};return this._callbacks[event]||[]};Emitter.prototype.hasListeners=function(event){return!!this.listeners(event).length}},{}],10:[function(_dereq_,module,exports){module.exports=debug;function debug(name){if(!debug.enabled(name))return function(){};return function(fmt){fmt=coerce(fmt);var curr=new Date;var ms=curr-(debug[name]||curr);debug[name]=curr;fmt=name+" "+fmt+" +"+debug.humanize(ms);window.console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}}debug.names=[];debug.skips=[];debug.enable=function(name){try{localStorage.debug=name}catch(e){}var split=(name||"").split(/[\s,]+/),len=split.length;for(var i=0;i<len;i++){name=split[i].replace("*",".*?");if(name[0]==="-"){debug.skips.push(new RegExp("^"+name.substr(1)+"$"))}else{debug.names.push(new RegExp("^"+name+"$"))}}};debug.disable=function(){debug.enable("")};debug.humanize=function(ms){var sec=1e3,min=60*1e3,hour=60*min;if(ms>=hour)return(ms/hour).toFixed(1)+"h";if(ms>=min)return(ms/min).toFixed(1)+"m";if(ms>=sec)return(ms/sec|0)+"s";return ms+"ms"};debug.enabled=function(name){for(var i=0,len=debug.skips.length;i<len;i++){if(debug.skips[i].test(name)){return false}}for(var i=0,len=debug.names.length;i<len;i++){if(debug.names[i].test(name)){return true}}return false};function coerce(val){if(val instanceof Error)return val.stack||val.message;return val}try{if(window.localStorage)debug.enable(localStorage.debug)}catch(e){}},{}],11:[function(_dereq_,module,exports){module.exports=_dereq_("./lib/")},{"./lib/":12}],12:[function(_dereq_,module,exports){module.exports=_dereq_("./socket");module.exports.parser=_dereq_("engine.io-parser")},{"./socket":13,"engine.io-parser":25}],13:[function(_dereq_,module,exports){(function(global){var transports=_dereq_("./transports");var Emitter=_dereq_("component-emitter");var debug=_dereq_("debug")("engine.io-client:socket");var index=_dereq_("indexof");var parser=_dereq_("engine.io-parser");var parseuri=_dereq_("parseuri");var parsejson=_dereq_("parsejson");var parseqs=_dereq_("parseqs");module.exports=Socket;function noop(){}function Socket(uri,opts){if(!(this instanceof Socket))return new Socket(uri,opts);opts=opts||{};if(uri&&"object"==typeof uri){opts=uri;uri=null}if(uri){uri=parseuri(uri);opts.host=uri.host;opts.secure=uri.protocol=="https"||uri.protocol=="wss";opts.port=uri.port;if(uri.query)opts.query=uri.query}this.secure=null!=opts.secure?opts.secure:global.location&&"https:"==location.protocol;if(opts.host){var pieces=opts.host.split(":");opts.hostname=pieces.shift();if(pieces.length){opts.port=pieces.pop()}else if(!opts.port){opts.port=this.secure?"443":"80"}}this.agent=opts.agent||false;this.hostname=opts.hostname||(global.location?location.hostname:"localhost");this.port=opts.port||(global.location&&location.port?location.port:this.secure?443:80);this.query=opts.query||{};if("string"==typeof this.query)this.query=parseqs.decode(this.query);this.upgrade=false!==opts.upgrade;this.path=(opts.path||"/engine.io").replace(/\/$/,"")+"/";this.forceJSONP=!!opts.forceJSONP;this.jsonp=false!==opts.jsonp;this.forceBase64=!!opts.forceBase64;this.enablesXDR=!!opts.enablesXDR;this.timestampParam=opts.timestampParam||"t";this.timestampRequests=opts.timestampRequests;this.transports=opts.transports||["polling","websocket"];this.readyState="";this.writeBuffer=[];this.callbackBuffer=[];this.policyPort=opts.policyPort||843;this.rememberUpgrade=opts.rememberUpgrade||false;this.binaryType=null;this.onlyBinaryUpgrades=opts.onlyBinaryUpgrades;this.pfx=opts.pfx||null;this.key=opts.key||null;this.passphrase=opts.passphrase||null;this.cert=opts.cert||null;this.ca=opts.ca||null;this.ciphers=opts.ciphers||null;this.rejectUnauthorized=opts.rejectUnauthorized||null;this.open()}Socket.priorWebsocketSuccess=false;Emitter(Socket.prototype);Socket.protocol=parser.protocol;Socket.Socket=Socket;Socket.Transport=_dereq_("./transport");Socket.transports=_dereq_("./transports");Socket.parser=_dereq_("engine.io-parser");Socket.prototype.createTransport=function(name){debug('creating transport "%s"',name);var query=clone(this.query);query.EIO=parser.protocol;query.transport=name;if(this.id)query.sid=this.id;var transport=new transports[name]({agent:this.agent,hostname:this.hostname,port:this.port,secure:this.secure,path:this.path,query:query,forceJSONP:this.forceJSONP,jsonp:this.jsonp,forceBase64:this.forceBase64,enablesXDR:this.enablesXDR,timestampRequests:this.timestampRequests,timestampParam:this.timestampParam,policyPort:this.policyPort,socket:this,pfx:this.pfx,key:this.key,passphrase:this.passphrase,cert:this.cert,ca:this.ca,ciphers:this.ciphers,rejectUnauthorized:this.rejectUnauthorized});return transport};function clone(obj){var o={};for(var i in obj){if(obj.hasOwnProperty(i)){o[i]=obj[i]}}return o}Socket.prototype.open=function(){var transport;if(this.rememberUpgrade&&Socket.priorWebsocketSuccess&&this.transports.indexOf("websocket")!=-1){transport="websocket"}else if(0==this.transports.length){var self=this;setTimeout(function(){self.emit("error","No transports available")},0);return}else{transport=this.transports[0]}this.readyState="opening";var transport;try{transport=this.createTransport(transport)}catch(e){this.transports.shift();this.open();return}transport.open();this.setTransport(transport)};Socket.prototype.setTransport=function(transport){debug("setting transport %s",transport.name);var self=this;if(this.transport){debug("clearing existing transport %s",this.transport.name);this.transport.removeAllListeners()}this.transport=transport;transport.on("drain",function(){self.onDrain()}).on("packet",function(packet){self.onPacket(packet)}).on("error",function(e){self.onError(e)}).on("close",function(){self.onClose("transport close")})};Socket.prototype.probe=function(name){debug('probing transport "%s"',name);var transport=this.createTransport(name,{probe:1}),failed=false,self=this;Socket.priorWebsocketSuccess=false;function onTransportOpen(){if(self.onlyBinaryUpgrades){var upgradeLosesBinary=!this.supportsBinary&&self.transport.supportsBinary;failed=failed||upgradeLosesBinary}if(failed)return;debug('probe transport "%s" opened',name);transport.send([{type:"ping",data:"probe"}]);transport.once("packet",function(msg){if(failed)return;if("pong"==msg.type&&"probe"==msg.data){debug('probe transport "%s" pong',name);self.upgrading=true;self.emit("upgrading",transport);if(!transport)return;Socket.priorWebsocketSuccess="websocket"==transport.name;debug('pausing current transport "%s"',self.transport.name);self.transport.pause(function(){if(failed)return;if("closed"==self.readyState)return;debug("changing transport and sending upgrade packet");cleanup();self.setTransport(transport);transport.send([{type:"upgrade"}]);self.emit("upgrade",transport);transport=null;self.upgrading=false;self.flush()})}else{debug('probe transport "%s" failed',name);var err=new Error("probe error");err.transport=transport.name;self.emit("upgradeError",err)}})}function freezeTransport(){if(failed)return;failed=true;cleanup();transport.close();transport=null}function onerror(err){var error=new Error("probe error: "+err);error.transport=transport.name;freezeTransport();debug('probe transport "%s" failed because of error: %s',name,err);self.emit("upgradeError",error)}function onTransportClose(){onerror("transport closed")}function onclose(){onerror("socket closed")}function onupgrade(to){if(transport&&to.name!=transport.name){debug('"%s" works - aborting "%s"',to.name,transport.name);freezeTransport()}}function cleanup(){transport.removeListener("open",onTransportOpen);transport.removeListener("error",onerror);transport.removeListener("close",onTransportClose);self.removeListener("close",onclose);self.removeListener("upgrading",onupgrade)}transport.once("open",onTransportOpen);transport.once("error",onerror);transport.once("close",onTransportClose);this.once("close",onclose);this.once("upgrading",onupgrade);transport.open()};Socket.prototype.onOpen=function(){debug("socket open");this.readyState="open";Socket.priorWebsocketSuccess="websocket"==this.transport.name;this.emit("open");this.flush();if("open"==this.readyState&&this.upgrade&&this.transport.pause){debug("starting upgrade probes");for(var i=0,l=this.upgrades.length;i<l;i++){this.probe(this.upgrades[i])}}};Socket.prototype.onPacket=function(packet){if("opening"==this.readyState||"open"==this.readyState){debug('socket receive: type "%s", data "%s"',packet.type,packet.data);this.emit("packet",packet);this.emit("heartbeat");switch(packet.type){case"open":this.onHandshake(parsejson(packet.data));break;case"pong":this.setPing();break;case"error":var err=new Error("server error");err.code=packet.data;this.emit("error",err);break;case"message":this.emit("data",packet.data);this.emit("message",packet.data);break}}else{debug('packet received with socket readyState "%s"',this.readyState)}};Socket.prototype.onHandshake=function(data){this.emit("handshake",data);this.id=data.sid;this.transport.query.sid=data.sid;this.upgrades=this.filterUpgrades(data.upgrades);this.pingInterval=data.pingInterval;this.pingTimeout=data.pingTimeout;this.onOpen();if("closed"==this.readyState)return;this.setPing();this.removeListener("heartbeat",this.onHeartbeat);this.on("heartbeat",this.onHeartbeat)};Socket.prototype.onHeartbeat=function(timeout){clearTimeout(this.pingTimeoutTimer);var self=this;self.pingTimeoutTimer=setTimeout(function(){if("closed"==self.readyState)return;self.onClose("ping timeout")},timeout||self.pingInterval+self.pingTimeout)};Socket.prototype.setPing=function(){var self=this;clearTimeout(self.pingIntervalTimer);self.pingIntervalTimer=setTimeout(function(){debug("writing ping packet - expecting pong within %sms",self.pingTimeout);self.ping();self.onHeartbeat(self.pingTimeout)},self.pingInterval)};Socket.prototype.ping=function(){this.sendPacket("ping")};Socket.prototype.onDrain=function(){for(var i=0;i<this.prevBufferLen;i++){if(this.callbackBuffer[i]){this.callbackBuffer[i]()}}this.writeBuffer.splice(0,this.prevBufferLen);this.callbackBuffer.splice(0,this.prevBufferLen);this.prevBufferLen=0;if(this.writeBuffer.length==0){this.emit("drain")}else{this.flush()}};Socket.prototype.flush=function(){if("closed"!=this.readyState&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){debug("flushing %d packets in socket",this.writeBuffer.length);this.transport.send(this.writeBuffer);this.prevBufferLen=this.writeBuffer.length;this.emit("flush")}};Socket.prototype.write=Socket.prototype.send=function(msg,fn){this.sendPacket("message",msg,fn);return this};Socket.prototype.sendPacket=function(type,data,fn){if("closing"==this.readyState||"closed"==this.readyState){return}var packet={type:type,data:data};this.emit("packetCreate",packet);this.writeBuffer.push(packet);this.callbackBuffer.push(fn);this.flush()};Socket.prototype.close=function(){if("opening"==this.readyState||"open"==this.readyState){this.readyState="closing";var self=this;function close(){self.onClose("forced close");debug("socket closing - telling transport to close");self.transport.close()}function cleanupAndClose(){self.removeListener("upgrade",cleanupAndClose);self.removeListener("upgradeError",cleanupAndClose);close()}function waitForUpgrade(){self.once("upgrade",cleanupAndClose);self.once("upgradeError",cleanupAndClose)}if(this.writeBuffer.length){this.once("drain",function(){if(this.upgrading){waitForUpgrade()}else{close()}})}else if(this.upgrading){waitForUpgrade()}else{close()}}return this};Socket.prototype.onError=function(err){debug("socket error %j",err);Socket.priorWebsocketSuccess=false;this.emit("error",err);this.onClose("transport error",err)};Socket.prototype.onClose=function(reason,desc){if("opening"==this.readyState||"open"==this.readyState||"closing"==this.readyState){debug('socket close with reason: "%s"',reason);var self=this;clearTimeout(this.pingIntervalTimer);clearTimeout(this.pingTimeoutTimer);setTimeout(function(){self.writeBuffer=[];self.callbackBuffer=[];self.prevBufferLen=0},0);this.transport.removeAllListeners("close");this.transport.close();this.transport.removeAllListeners();this.readyState="closed";this.id=null;this.emit("close",reason,desc)}};Socket.prototype.filterUpgrades=function(upgrades){var filteredUpgrades=[];for(var i=0,j=upgrades.length;i<j;i++){if(~index(this.transports,upgrades[i]))filteredUpgrades.push(upgrades[i])}return filteredUpgrades}}).call(this,typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{"./transport":14,"./transports":15,"component-emitter":9,debug:22,"engine.io-parser":25,indexof:40,parsejson:32,parseqs:33,parseuri:34}],14:[function(_dereq_,module,exports){var parser=_dereq_("engine.io-parser");var Emitter=_dereq_("component-emitter");module.exports=Transport;function Transport(opts){this.path=opts.path;this.hostname=opts.hostname;this.port=opts.port;this.secure=opts.secure;this.query=opts.query;this.timestampParam=opts.timestampParam;this.timestampRequests=opts.timestampRequests;this.readyState="";this.agent=opts.agent||false;this.socket=opts.socket;this.enablesXDR=opts.enablesXDR;this.pfx=opts.pfx;this.key=opts.key;this.passphrase=opts.passphrase;this.cert=opts.cert;this.ca=opts.ca;this.ciphers=opts.ciphers;this.rejectUnauthorized=opts.rejectUnauthorized}Emitter(Transport.prototype);Transport.timestamps=0;Transport.prototype.onError=function(msg,desc){var err=new Error(msg);err.type="TransportError";err.description=desc;this.emit("error",err);return this};Transport.prototype.open=function(){if("closed"==this.readyState||""==this.readyState){this.readyState="opening";this.doOpen()}return this};Transport.prototype.close=function(){if("opening"==this.readyState||"open"==this.readyState){this.doClose();this.onClose()}return this};Transport.prototype.send=function(packets){if("open"==this.readyState){this.write(packets)}else{throw new Error("Transport not open")}};Transport.prototype.onOpen=function(){this.readyState="open";this.writable=true;this.emit("open")};Transport.prototype.onData=function(data){var packet=parser.decodePacket(data,this.socket.binaryType);this.onPacket(packet)};Transport.prototype.onPacket=function(packet){this.emit("packet",packet)};Transport.prototype.onClose=function(){this.readyState="closed";this.emit("close")}},{"component-emitter":9,"engine.io-parser":25}],15:[function(_dereq_,module,exports){(function(global){var XMLHttpRequest=_dereq_("xmlhttprequest");var XHR=_dereq_("./polling-xhr");var JSONP=_dereq_("./polling-jsonp");var websocket=_dereq_("./websocket");exports.polling=polling;exports.websocket=websocket;function polling(opts){var xhr;var xd=false;var xs=false;var jsonp=false!==opts.jsonp;if(global.location){var isSSL="https:"==location.protocol;var port=location.port;if(!port){port=isSSL?443:80}xd=opts.hostname!=location.hostname||port!=opts.port;xs=opts.secure!=isSSL}opts.xdomain=xd;opts.xscheme=xs;xhr=new XMLHttpRequest(opts);if("open"in xhr&&!opts.forceJSONP){return new XHR(opts)}else{if(!jsonp)throw new Error("JSONP disabled");return new JSONP(opts)}}}).call(this,typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{"./polling-jsonp":16,"./polling-xhr":17,"./websocket":19,xmlhttprequest:20}],16:[function(_dereq_,module,exports){(function(global){var Polling=_dereq_("./polling");var inherit=_dereq_("component-inherit");module.exports=JSONPPolling;var rNewline=/\n/g;var rEscapedNewline=/\\n/g;var callbacks;var index=0;function empty(){}function JSONPPolling(opts){Polling.call(this,opts);
this.query=this.query||{};if(!callbacks){if(!global.___eio)global.___eio=[];callbacks=global.___eio}this.index=callbacks.length;var self=this;callbacks.push(function(msg){self.onData(msg)});this.query.j=this.index;if(global.document&&global.addEventListener){global.addEventListener("beforeunload",function(){if(self.script)self.script.onerror=empty},false)}}inherit(JSONPPolling,Polling);JSONPPolling.prototype.supportsBinary=false;JSONPPolling.prototype.doClose=function(){if(this.script){this.script.parentNode.removeChild(this.script);this.script=null}if(this.form){this.form.parentNode.removeChild(this.form);this.form=null;this.iframe=null}Polling.prototype.doClose.call(this)};JSONPPolling.prototype.doPoll=function(){var self=this;var script=document.createElement("script");if(this.script){this.script.parentNode.removeChild(this.script);this.script=null}script.async=true;script.src=this.uri();script.onerror=function(e){self.onError("jsonp poll error",e)};var insertAt=document.getElementsByTagName("script")[0];insertAt.parentNode.insertBefore(script,insertAt);this.script=script;var isUAgecko="undefined"!=typeof navigator&&/gecko/i.test(navigator.userAgent);if(isUAgecko){setTimeout(function(){var iframe=document.createElement("iframe");document.body.appendChild(iframe);document.body.removeChild(iframe)},100)}};JSONPPolling.prototype.doWrite=function(data,fn){var self=this;if(!this.form){var form=document.createElement("form");var area=document.createElement("textarea");var id=this.iframeId="eio_iframe_"+this.index;var iframe;form.className="socketio";form.style.position="absolute";form.style.top="-1000px";form.style.left="-1000px";form.target=id;form.method="POST";form.setAttribute("accept-charset","utf-8");area.name="d";form.appendChild(area);document.body.appendChild(form);this.form=form;this.area=area}this.form.action=this.uri();function complete(){initIframe();fn()}function initIframe(){if(self.iframe){try{self.form.removeChild(self.iframe)}catch(e){self.onError("jsonp polling iframe removal error",e)}}try{var html='<iframe src="javascript:0" name="'+self.iframeId+'">';iframe=document.createElement(html)}catch(e){iframe=document.createElement("iframe");iframe.name=self.iframeId;iframe.src="javascript:0"}iframe.id=self.iframeId;self.form.appendChild(iframe);self.iframe=iframe}initIframe();data=data.replace(rEscapedNewline,"\\\n");this.area.value=data.replace(rNewline,"\\n");try{this.form.submit()}catch(e){}if(this.iframe.attachEvent){this.iframe.onreadystatechange=function(){if(self.iframe.readyState=="complete"){complete()}}}else{this.iframe.onload=complete}}}).call(this,typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{"./polling":18,"component-inherit":21}],17:[function(_dereq_,module,exports){(function(global){var XMLHttpRequest=_dereq_("xmlhttprequest");var Polling=_dereq_("./polling");var Emitter=_dereq_("component-emitter");var inherit=_dereq_("component-inherit");var debug=_dereq_("debug")("engine.io-client:polling-xhr");module.exports=XHR;module.exports.Request=Request;function empty(){}function XHR(opts){Polling.call(this,opts);if(global.location){var isSSL="https:"==location.protocol;var port=location.port;if(!port){port=isSSL?443:80}this.xd=opts.hostname!=global.location.hostname||port!=opts.port;this.xs=opts.secure!=isSSL}}inherit(XHR,Polling);XHR.prototype.supportsBinary=true;XHR.prototype.request=function(opts){opts=opts||{};opts.uri=this.uri();opts.xd=this.xd;opts.xs=this.xs;opts.agent=this.agent||false;opts.supportsBinary=this.supportsBinary;opts.enablesXDR=this.enablesXDR;opts.pfx=this.pfx;opts.key=this.key;opts.passphrase=this.passphrase;opts.cert=this.cert;opts.ca=this.ca;opts.ciphers=this.ciphers;opts.rejectUnauthorized=this.rejectUnauthorized;return new Request(opts)};XHR.prototype.doWrite=function(data,fn){var isBinary=typeof data!=="string"&&data!==undefined;var req=this.request({method:"POST",data:data,isBinary:isBinary});var self=this;req.on("success",fn);req.on("error",function(err){self.onError("xhr post error",err)});this.sendXhr=req};XHR.prototype.doPoll=function(){debug("xhr poll");var req=this.request();var self=this;req.on("data",function(data){self.onData(data)});req.on("error",function(err){self.onError("xhr poll error",err)});this.pollXhr=req};function Request(opts){this.method=opts.method||"GET";this.uri=opts.uri;this.xd=!!opts.xd;this.xs=!!opts.xs;this.async=false!==opts.async;this.data=undefined!=opts.data?opts.data:null;this.agent=opts.agent;this.isBinary=opts.isBinary;this.supportsBinary=opts.supportsBinary;this.enablesXDR=opts.enablesXDR;this.pfx=opts.pfx;this.key=opts.key;this.passphrase=opts.passphrase;this.cert=opts.cert;this.ca=opts.ca;this.ciphers=opts.ciphers;this.rejectUnauthorized=opts.rejectUnauthorized;this.create()}Emitter(Request.prototype);Request.prototype.create=function(){var opts={agent:this.agent,xdomain:this.xd,xscheme:this.xs,enablesXDR:this.enablesXDR};opts.pfx=this.pfx;opts.key=this.key;opts.passphrase=this.passphrase;opts.cert=this.cert;opts.ca=this.ca;opts.ciphers=this.ciphers;opts.rejectUnauthorized=this.rejectUnauthorized;var xhr=this.xhr=new XMLHttpRequest(opts);var self=this;try{debug("xhr open %s: %s",this.method,this.uri);xhr.open(this.method,this.uri,this.async);if(this.supportsBinary){xhr.responseType="arraybuffer"}if("POST"==this.method){try{if(this.isBinary){xhr.setRequestHeader("Content-type","application/octet-stream")}else{xhr.setRequestHeader("Content-type","text/plain;charset=UTF-8")}}catch(e){}}if("withCredentials"in xhr){xhr.withCredentials=true}if(this.hasXDR()){xhr.onload=function(){self.onLoad()};xhr.onerror=function(){self.onError(xhr.responseText)}}else{xhr.onreadystatechange=function(){if(4!=xhr.readyState)return;if(200==xhr.status||1223==xhr.status){self.onLoad()}else{setTimeout(function(){self.onError(xhr.status)},0)}}}debug("xhr data %s",this.data);xhr.send(this.data)}catch(e){setTimeout(function(){self.onError(e)},0);return}if(global.document){this.index=Request.requestsCount++;Request.requests[this.index]=this}};Request.prototype.onSuccess=function(){this.emit("success");this.cleanup()};Request.prototype.onData=function(data){this.emit("data",data);this.onSuccess()};Request.prototype.onError=function(err){this.emit("error",err);this.cleanup(true)};Request.prototype.cleanup=function(fromError){if("undefined"==typeof this.xhr||null===this.xhr){return}if(this.hasXDR()){this.xhr.onload=this.xhr.onerror=empty}else{this.xhr.onreadystatechange=empty}if(fromError){try{this.xhr.abort()}catch(e){}}if(global.document){delete Request.requests[this.index]}this.xhr=null};Request.prototype.onLoad=function(){var data;try{var contentType;try{contentType=this.xhr.getResponseHeader("Content-Type").split(";")[0]}catch(e){}if(contentType==="application/octet-stream"){data=this.xhr.response}else{if(!this.supportsBinary){data=this.xhr.responseText}else{data="ok"}}}catch(e){this.onError(e)}if(null!=data){this.onData(data)}};Request.prototype.hasXDR=function(){return"undefined"!==typeof global.XDomainRequest&&!this.xs&&this.enablesXDR};Request.prototype.abort=function(){this.cleanup()};if(global.document){Request.requestsCount=0;Request.requests={};if(global.attachEvent){global.attachEvent("onunload",unloadHandler)}else if(global.addEventListener){global.addEventListener("beforeunload",unloadHandler,false)}}function unloadHandler(){for(var i in Request.requests){if(Request.requests.hasOwnProperty(i)){Request.requests[i].abort()}}}}).call(this,typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{"./polling":18,"component-emitter":9,"component-inherit":21,debug:22,xmlhttprequest:20}],18:[function(_dereq_,module,exports){var Transport=_dereq_("../transport");var parseqs=_dereq_("parseqs");var parser=_dereq_("engine.io-parser");var inherit=_dereq_("component-inherit");var debug=_dereq_("debug")("engine.io-client:polling");module.exports=Polling;var hasXHR2=function(){var XMLHttpRequest=_dereq_("xmlhttprequest");var xhr=new XMLHttpRequest({xdomain:false});return null!=xhr.responseType}();function Polling(opts){var forceBase64=opts&&opts.forceBase64;if(!hasXHR2||forceBase64){this.supportsBinary=false}Transport.call(this,opts)}inherit(Polling,Transport);Polling.prototype.name="polling";Polling.prototype.doOpen=function(){this.poll()};Polling.prototype.pause=function(onPause){var pending=0;var self=this;this.readyState="pausing";function pause(){debug("paused");self.readyState="paused";onPause()}if(this.polling||!this.writable){var total=0;if(this.polling){debug("we are currently polling - waiting to pause");total++;this.once("pollComplete",function(){debug("pre-pause polling complete");--total||pause()})}if(!this.writable){debug("we are currently writing - waiting to pause");total++;this.once("drain",function(){debug("pre-pause writing complete");--total||pause()})}}else{pause()}};Polling.prototype.poll=function(){debug("polling");this.polling=true;this.doPoll();this.emit("poll")};Polling.prototype.onData=function(data){var self=this;debug("polling got data %s",data);var callback=function(packet,index,total){if("opening"==self.readyState){self.onOpen()}if("close"==packet.type){self.onClose();return false}self.onPacket(packet)};parser.decodePayload(data,this.socket.binaryType,callback);if("closed"!=this.readyState){this.polling=false;this.emit("pollComplete");if("open"==this.readyState){this.poll()}else{debug('ignoring poll - transport state "%s"',this.readyState)}}};Polling.prototype.doClose=function(){var self=this;function close(){debug("writing close packet");self.write([{type:"close"}])}if("open"==this.readyState){debug("transport open - closing");close()}else{debug("transport not open - deferring close");this.once("open",close)}};Polling.prototype.write=function(packets){var self=this;this.writable=false;var callbackfn=function(){self.writable=true;self.emit("drain")};var self=this;parser.encodePayload(packets,this.supportsBinary,function(data){self.doWrite(data,callbackfn)})};Polling.prototype.uri=function(){var query=this.query||{};var schema=this.secure?"https":"http";var port="";if(false!==this.timestampRequests){query[this.timestampParam]=+new Date+"-"+Transport.timestamps++}if(!this.supportsBinary&&!query.sid){query.b64=1}query=parseqs.encode(query);if(this.port&&("https"==schema&&this.port!=443||"http"==schema&&this.port!=80)){port=":"+this.port}if(query.length){query="?"+query}return schema+"://"+this.hostname+port+this.path+query}},{"../transport":14,"component-inherit":21,debug:22,"engine.io-parser":25,parseqs:33,xmlhttprequest:20}],19:[function(_dereq_,module,exports){var Transport=_dereq_("../transport");var parser=_dereq_("engine.io-parser");var parseqs=_dereq_("parseqs");var inherit=_dereq_("component-inherit");var debug=_dereq_("debug")("engine.io-client:websocket");var WebSocket=_dereq_("ws");module.exports=WS;function WS(opts){var forceBase64=opts&&opts.forceBase64;if(forceBase64){this.supportsBinary=false}Transport.call(this,opts)}inherit(WS,Transport);WS.prototype.name="websocket";WS.prototype.supportsBinary=true;WS.prototype.doOpen=function(){if(!this.check()){return}var self=this;var uri=this.uri();var protocols=void 0;var opts={agent:this.agent};opts.pfx=this.pfx;opts.key=this.key;opts.passphrase=this.passphrase;opts.cert=this.cert;opts.ca=this.ca;opts.ciphers=this.ciphers;opts.rejectUnauthorized=this.rejectUnauthorized;this.ws=new WebSocket(uri,protocols,opts);if(this.ws.binaryType===undefined){this.supportsBinary=false}this.ws.binaryType="arraybuffer";this.addEventListeners()};WS.prototype.addEventListeners=function(){var self=this;this.ws.onopen=function(){self.onOpen()};this.ws.onclose=function(){self.onClose()};this.ws.onmessage=function(ev){self.onData(ev.data)};this.ws.onerror=function(e){self.onError("websocket error",e)}};if("undefined"!=typeof navigator&&/iPad|iPhone|iPod/i.test(navigator.userAgent)){WS.prototype.onData=function(data){var self=this;setTimeout(function(){Transport.prototype.onData.call(self,data)},0)}}WS.prototype.write=function(packets){var self=this;this.writable=false;for(var i=0,l=packets.length;i<l;i++){parser.encodePacket(packets[i],this.supportsBinary,function(data){try{self.ws.send(data)}catch(e){debug("websocket closed before onclose event")}})}function ondrain(){self.writable=true;self.emit("drain")}setTimeout(ondrain,0)};WS.prototype.onClose=function(){Transport.prototype.onClose.call(this)};WS.prototype.doClose=function(){if(typeof this.ws!=="undefined"){this.ws.close()}};WS.prototype.uri=function(){var query=this.query||{};var schema=this.secure?"wss":"ws";var port="";if(this.port&&("wss"==schema&&this.port!=443||"ws"==schema&&this.port!=80)){port=":"+this.port}if(this.timestampRequests){query[this.timestampParam]=+new Date}if(!this.supportsBinary){query.b64=1}query=parseqs.encode(query);if(query.length){query="?"+query}return schema+"://"+this.hostname+port+this.path+query};WS.prototype.check=function(){return!!WebSocket&&!("__initialize"in WebSocket&&this.name===WS.prototype.name)}},{"../transport":14,"component-inherit":21,debug:22,"engine.io-parser":25,parseqs:33,ws:35}],20:[function(_dereq_,module,exports){var hasCORS=_dereq_("has-cors");module.exports=function(opts){var xdomain=opts.xdomain;var xscheme=opts.xscheme;var enablesXDR=opts.enablesXDR;try{if("undefined"!=typeof XMLHttpRequest&&(!xdomain||hasCORS)){return new XMLHttpRequest}}catch(e){}try{if("undefined"!=typeof XDomainRequest&&!xscheme&&enablesXDR){return new XDomainRequest}}catch(e){}if(!xdomain){try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(e){}}}},{"has-cors":38}],21:[function(_dereq_,module,exports){module.exports=function(a,b){var fn=function(){};fn.prototype=b.prototype;a.prototype=new fn;a.prototype.constructor=a}},{}],22:[function(_dereq_,module,exports){exports=module.exports=_dereq_("./debug");exports.log=log;exports.formatArgs=formatArgs;exports.save=save;exports.load=load;exports.useColors=useColors;exports.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"];function useColors(){return"WebkitAppearance"in document.documentElement.style||window.console&&(console.firebug||console.exception&&console.table)||navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31}exports.formatters.j=function(v){return JSON.stringify(v)};function formatArgs(){var args=arguments;var useColors=this.useColors;args[0]=(useColors?"%c":"")+this.namespace+(useColors?" %c":" ")+args[0]+(useColors?"%c ":" ")+"+"+exports.humanize(this.diff);if(!useColors)return args;var c="color: "+this.color;args=[args[0],c,"color: inherit"].concat(Array.prototype.slice.call(args,1));var index=0;var lastC=0;args[0].replace(/%[a-z%]/g,function(match){if("%%"===match)return;index++;if("%c"===match){lastC=index}});args.splice(lastC,0,c);return args}function log(){return"object"==typeof console&&"function"==typeof console.log&&Function.prototype.apply.call(console.log,console,arguments)}function save(namespaces){try{if(null==namespaces){localStorage.removeItem("debug")}else{localStorage.debug=namespaces}}catch(e){}}function load(){var r;try{r=localStorage.debug}catch(e){}return r}exports.enable(load())},{"./debug":23}],23:[function(_dereq_,module,exports){exports=module.exports=debug;exports.coerce=coerce;exports.disable=disable;exports.enable=enable;exports.enabled=enabled;exports.humanize=_dereq_("ms");exports.names=[];exports.skips=[];exports.formatters={};var prevColor=0;var prevTime;function selectColor(){return exports.colors[prevColor++%exports.colors.length]}function debug(namespace){function disabled(){}disabled.enabled=false;function enabled(){var self=enabled;var curr=+new Date;var ms=curr-(prevTime||curr);self.diff=ms;self.prev=prevTime;self.curr=curr;prevTime=curr;if(null==self.useColors)self.useColors=exports.useColors();if(null==self.color&&self.useColors)self.color=selectColor();var args=Array.prototype.slice.call(arguments);args[0]=exports.coerce(args[0]);if("string"!==typeof args[0]){args=["%o"].concat(args)}var index=0;args[0]=args[0].replace(/%([a-z%])/g,function(match,format){if(match==="%%")return match;index++;var formatter=exports.formatters[format];if("function"===typeof formatter){var val=args[index];match=formatter.call(self,val);args.splice(index,1);index--}return match});if("function"===typeof exports.formatArgs){args=exports.formatArgs.apply(self,args)}var logFn=enabled.log||exports.log||console.log.bind(console);logFn.apply(self,args)}enabled.enabled=true;var fn=exports.enabled(namespace)?enabled:disabled;fn.namespace=namespace;return fn}function enable(namespaces){exports.save(namespaces);var split=(namespaces||"").split(/[\s,]+/);var len=split.length;for(var i=0;i<len;i++){if(!split[i])continue;namespaces=split[i].replace(/\*/g,".*?");if(namespaces[0]==="-"){exports.skips.push(new RegExp("^"+namespaces.substr(1)+"$"))}else{exports.names.push(new RegExp("^"+namespaces+"$"))}}}function disable(){exports.enable("")}function enabled(name){var i,len;for(i=0,len=exports.skips.length;i<len;i++){if(exports.skips[i].test(name)){return false}}for(i=0,len=exports.names.length;i<len;i++){if(exports.names[i].test(name)){return true}}return false}function coerce(val){if(val instanceof Error)return val.stack||val.message;return val}},{ms:24}],24:[function(_dereq_,module,exports){var s=1e3;var m=s*60;var h=m*60;var d=h*24;var y=d*365.25;module.exports=function(val,options){options=options||{};if("string"==typeof val)return parse(val);return options.long?long(val):short(val)};function parse(str){var match=/^((?:\d+)?\.?\d+) *(ms|seconds?|s|minutes?|m|hours?|h|days?|d|years?|y)?$/i.exec(str);if(!match)return;var n=parseFloat(match[1]);var type=(match[2]||"ms").toLowerCase();switch(type){case"years":case"year":case"y":return n*y;case"days":case"day":case"d":return n*d;case"hours":case"hour":case"h":return n*h;case"minutes":case"minute":case"m":return n*m;case"seconds":case"second":case"s":return n*s;case"ms":return n}}function short(ms){if(ms>=d)return Math.round(ms/d)+"d";if(ms>=h)return Math.round(ms/h)+"h";if(ms>=m)return Math.round(ms/m)+"m";if(ms>=s)return Math.round(ms/s)+"s";return ms+"ms"}function long(ms){return plural(ms,d,"day")||plural(ms,h,"hour")||plural(ms,m,"minute")||plural(ms,s,"second")||ms+" ms"}function plural(ms,n,name){if(ms<n)return;if(ms<n*1.5)return Math.floor(ms/n)+" "+name;return Math.ceil(ms/n)+" "+name+"s"}},{}],25:[function(_dereq_,module,exports){(function(global){var keys=_dereq_("./keys");var hasBinary=_dereq_("has-binary");var sliceBuffer=_dereq_("arraybuffer.slice");var base64encoder=_dereq_("base64-arraybuffer");var after=_dereq_("after");var utf8=_dereq_("utf8");var isAndroid=navigator.userAgent.match(/Android/i);var isPhantomJS=/PhantomJS/i.test(navigator.userAgent);var dontSendBlobs=isAndroid||isPhantomJS;exports.protocol=3;var packets=exports.packets={open:0,close:1,ping:2,pong:3,message:4,upgrade:5,noop:6};var packetslist=keys(packets);var err={type:"error",data:"parser error"};var Blob=_dereq_("blob");exports.encodePacket=function(packet,supportsBinary,utf8encode,callback){if("function"==typeof supportsBinary){callback=supportsBinary;supportsBinary=false}if("function"==typeof utf8encode){callback=utf8encode;utf8encode=null}var data=packet.data===undefined?undefined:packet.data.buffer||packet.data;if(global.ArrayBuffer&&data instanceof ArrayBuffer){return encodeArrayBuffer(packet,supportsBinary,callback)}else if(Blob&&data instanceof global.Blob){return encodeBlob(packet,supportsBinary,callback)}if(data&&data.base64){return encodeBase64Object(packet,callback)}var encoded=packets[packet.type];if(undefined!==packet.data){encoded+=utf8encode?utf8.encode(String(packet.data)):String(packet.data)}return callback(""+encoded)};function encodeBase64Object(packet,callback){var message="b"+exports.packets[packet.type]+packet.data.data;return callback(message)}function encodeArrayBuffer(packet,supportsBinary,callback){if(!supportsBinary){return exports.encodeBase64Packet(packet,callback)}var data=packet.data;var contentArray=new Uint8Array(data);var resultBuffer=new Uint8Array(1+data.byteLength);resultBuffer[0]=packets[packet.type];for(var i=0;i<contentArray.length;i++){resultBuffer[i+1]=contentArray[i]}return callback(resultBuffer.buffer)}function encodeBlobAsArrayBuffer(packet,supportsBinary,callback){if(!supportsBinary){return exports.encodeBase64Packet(packet,callback)}var fr=new FileReader;fr.onload=function(){packet.data=fr.result;exports.encodePacket(packet,supportsBinary,true,callback)};return fr.readAsArrayBuffer(packet.data)}function encodeBlob(packet,supportsBinary,callback){if(!supportsBinary){return exports.encodeBase64Packet(packet,callback)}if(dontSendBlobs){return encodeBlobAsArrayBuffer(packet,supportsBinary,callback)}var length=new Uint8Array(1);length[0]=packets[packet.type];var blob=new Blob([length.buffer,packet.data]);return callback(blob)}exports.encodeBase64Packet=function(packet,callback){var message="b"+exports.packets[packet.type];if(Blob&&packet.data instanceof Blob){var fr=new FileReader;fr.onload=function(){var b64=fr.result.split(",")[1];callback(message+b64)};return fr.readAsDataURL(packet.data)}var b64data;try{b64data=String.fromCharCode.apply(null,new Uint8Array(packet.data))}catch(e){var typed=new Uint8Array(packet.data);var basic=new Array(typed.length);for(var i=0;i<typed.length;i++){basic[i]=typed[i]}b64data=String.fromCharCode.apply(null,basic)}message+=global.btoa(b64data);return callback(message)};exports.decodePacket=function(data,binaryType,utf8decode){if(typeof data=="string"||data===undefined){if(data.charAt(0)=="b"){return exports.decodeBase64Packet(data.substr(1),binaryType)}if(utf8decode){try{data=utf8.decode(data)}catch(e){return err}}var type=data.charAt(0);if(Number(type)!=type||!packetslist[type]){return err}if(data.length>1){return{type:packetslist[type],data:data.substring(1)}}else{return{type:packetslist[type]}}}var asArray=new Uint8Array(data);var type=asArray[0];var rest=sliceBuffer(data,1);if(Blob&&binaryType==="blob"){rest=new Blob([rest])}return{type:packetslist[type],data:rest}};exports.decodeBase64Packet=function(msg,binaryType){var type=packetslist[msg.charAt(0)];if(!global.ArrayBuffer){return{type:type,data:{base64:true,data:msg.substr(1)}}}var data=base64encoder.decode(msg.substr(1));if(binaryType==="blob"&&Blob){data=new Blob([data])}return{type:type,data:data}};exports.encodePayload=function(packets,supportsBinary,callback){if(typeof supportsBinary=="function"){callback=supportsBinary;supportsBinary=null}var isBinary=hasBinary(packets);if(supportsBinary&&isBinary){if(Blob&&!dontSendBlobs){return exports.encodePayloadAsBlob(packets,callback)}return exports.encodePayloadAsArrayBuffer(packets,callback)}if(!packets.length){return callback("0:")}function setLengthHeader(message){return message.length+":"+message}function encodeOne(packet,doneCallback){exports.encodePacket(packet,!isBinary?false:supportsBinary,true,function(message){doneCallback(null,setLengthHeader(message))})}map(packets,encodeOne,function(err,results){return callback(results.join(""))})};function map(ary,each,done){var result=new Array(ary.length);var next=after(ary.length,done);var eachWithIndex=function(i,el,cb){each(el,function(error,msg){result[i]=msg;cb(error,result)})};for(var i=0;i<ary.length;i++){eachWithIndex(i,ary[i],next)}}exports.decodePayload=function(data,binaryType,callback){if(typeof data!="string"){return exports.decodePayloadAsBinary(data,binaryType,callback)}if(typeof binaryType==="function"){callback=binaryType;binaryType=null}var packet;if(data==""){return callback(err,0,1)}var length="",n,msg;for(var i=0,l=data.length;i<l;i++){var chr=data.charAt(i);if(":"!=chr){length+=chr}else{if(""==length||length!=(n=Number(length))){return callback(err,0,1)}msg=data.substr(i+1,n);if(length!=msg.length){return callback(err,0,1)}if(msg.length){packet=exports.decodePacket(msg,binaryType,true);if(err.type==packet.type&&err.data==packet.data){return callback(err,0,1)}var ret=callback(packet,i+n,l);if(false===ret)return}i+=n;length=""}}if(length!=""){return callback(err,0,1)}};exports.encodePayloadAsArrayBuffer=function(packets,callback){if(!packets.length){return callback(new ArrayBuffer(0))}function encodeOne(packet,doneCallback){exports.encodePacket(packet,true,true,function(data){return doneCallback(null,data)})}map(packets,encodeOne,function(err,encodedPackets){var totalLength=encodedPackets.reduce(function(acc,p){var len;if(typeof p==="string"){len=p.length}else{len=p.byteLength}return acc+len.toString().length+len+2},0);var resultArray=new Uint8Array(totalLength);var bufferIndex=0;encodedPackets.forEach(function(p){var isString=typeof p==="string";var ab=p;if(isString){var view=new Uint8Array(p.length);for(var i=0;i<p.length;i++){view[i]=p.charCodeAt(i)}ab=view.buffer}if(isString){resultArray[bufferIndex++]=0}else{resultArray[bufferIndex++]=1}var lenStr=ab.byteLength.toString();for(var i=0;i<lenStr.length;i++){resultArray[bufferIndex++]=parseInt(lenStr[i])}resultArray[bufferIndex++]=255;var view=new Uint8Array(ab);for(var i=0;i<view.length;i++){resultArray[bufferIndex++]=view[i]}});return callback(resultArray.buffer)})};exports.encodePayloadAsBlob=function(packets,callback){function encodeOne(packet,doneCallback){exports.encodePacket(packet,true,true,function(encoded){var binaryIdentifier=new Uint8Array(1);binaryIdentifier[0]=1;if(typeof encoded==="string"){var view=new Uint8Array(encoded.length);for(var i=0;i<encoded.length;i++){view[i]=encoded.charCodeAt(i)}encoded=view.buffer;binaryIdentifier[0]=0}var len=encoded instanceof ArrayBuffer?encoded.byteLength:encoded.size;var lenStr=len.toString();var lengthAry=new Uint8Array(lenStr.length+1);for(var i=0;i<lenStr.length;i++){lengthAry[i]=parseInt(lenStr[i])}lengthAry[lenStr.length]=255;if(Blob){var blob=new Blob([binaryIdentifier.buffer,lengthAry.buffer,encoded]);doneCallback(null,blob)}})}map(packets,encodeOne,function(err,results){return callback(new Blob(results))})};exports.decodePayloadAsBinary=function(data,binaryType,callback){if(typeof binaryType==="function"){callback=binaryType;binaryType=null}var bufferTail=data;var buffers=[];var numberTooLong=false;while(bufferTail.byteLength>0){var tailArray=new Uint8Array(bufferTail);var isString=tailArray[0]===0;var msgLength="";for(var i=1;;i++){if(tailArray[i]==255)break;if(msgLength.length>310){numberTooLong=true;break}msgLength+=tailArray[i]}if(numberTooLong)return callback(err,0,1);bufferTail=sliceBuffer(bufferTail,2+msgLength.length);msgLength=parseInt(msgLength);var msg=sliceBuffer(bufferTail,0,msgLength);if(isString){try{msg=String.fromCharCode.apply(null,new Uint8Array(msg))}catch(e){var typed=new Uint8Array(msg);msg="";for(var i=0;i<typed.length;i++){msg+=String.fromCharCode(typed[i])}}}buffers.push(msg);bufferTail=sliceBuffer(bufferTail,msgLength)}var total=buffers.length;buffers.forEach(function(buffer,i){callback(exports.decodePacket(buffer,binaryType,true),i,total)})}}).call(this,typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{"./keys":26,after:27,"arraybuffer.slice":28,"base64-arraybuffer":29,blob:30,"has-binary":36,utf8:31}],26:[function(_dereq_,module,exports){module.exports=Object.keys||function keys(obj){var arr=[];var has=Object.prototype.hasOwnProperty;for(var i in obj){if(has.call(obj,i)){arr.push(i)}}return arr}},{}],27:[function(_dereq_,module,exports){module.exports=after;function after(count,callback,err_cb){var bail=false;err_cb=err_cb||noop;proxy.count=count;return count===0?callback():proxy;function proxy(err,result){if(proxy.count<=0){throw new Error("after called too many times")}--proxy.count;if(err){bail=true;callback(err);callback=err_cb}else if(proxy.count===0&&!bail){callback(null,result)}}}function noop(){}},{}],28:[function(_dereq_,module,exports){module.exports=function(arraybuffer,start,end){var bytes=arraybuffer.byteLength;start=start||0;end=end||bytes;if(arraybuffer.slice){return arraybuffer.slice(start,end)}if(start<0){start+=bytes}if(end<0){end+=bytes}if(end>bytes){end=bytes}if(start>=bytes||start>=end||bytes===0){return new ArrayBuffer(0)}var abv=new Uint8Array(arraybuffer);var result=new Uint8Array(end-start);for(var i=start,ii=0;i<end;i++,ii++){result[ii]=abv[i]}return result.buffer}},{}],29:[function(_dereq_,module,exports){(function(chars){"use strict";exports.encode=function(arraybuffer){var bytes=new Uint8Array(arraybuffer),i,len=bytes.length,base64="";for(i=0;i<len;i+=3){base64+=chars[bytes[i]>>2];base64+=chars[(bytes[i]&3)<<4|bytes[i+1]>>4];base64+=chars[(bytes[i+1]&15)<<2|bytes[i+2]>>6];base64+=chars[bytes[i+2]&63]}if(len%3===2){base64=base64.substring(0,base64.length-1)+"="}else if(len%3===1){base64=base64.substring(0,base64.length-2)+"=="}return base64};exports.decode=function(base64){var bufferLength=base64.length*.75,len=base64.length,i,p=0,encoded1,encoded2,encoded3,encoded4;if(base64[base64.length-1]==="="){bufferLength--;if(base64[base64.length-2]==="="){bufferLength--}}var arraybuffer=new ArrayBuffer(bufferLength),bytes=new Uint8Array(arraybuffer);for(i=0;i<len;i+=4){encoded1=chars.indexOf(base64[i]);encoded2=chars.indexOf(base64[i+1]);encoded3=chars.indexOf(base64[i+2]);encoded4=chars.indexOf(base64[i+3]);bytes[p++]=encoded1<<2|encoded2>>4;bytes[p++]=(encoded2&15)<<4|encoded3>>2;bytes[p++]=(encoded3&3)<<6|encoded4&63}return arraybuffer}})("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")},{}],30:[function(_dereq_,module,exports){(function(global){var BlobBuilder=global.BlobBuilder||global.WebKitBlobBuilder||global.MSBlobBuilder||global.MozBlobBuilder;var blobSupported=function(){try{var a=new Blob(["hi"]);return a.size===2}catch(e){return false}}();var blobSupportsArrayBufferView=blobSupported&&function(){try{var b=new Blob([new Uint8Array([1,2])]);return b.size===2}catch(e){return false}}();var blobBuilderSupported=BlobBuilder&&BlobBuilder.prototype.append&&BlobBuilder.prototype.getBlob;function mapArrayBufferViews(ary){for(var i=0;i<ary.length;i++){var chunk=ary[i];if(chunk.buffer instanceof ArrayBuffer){var buf=chunk.buffer;if(chunk.byteLength!==buf.byteLength){var copy=new Uint8Array(chunk.byteLength);copy.set(new Uint8Array(buf,chunk.byteOffset,chunk.byteLength));buf=copy.buffer}ary[i]=buf}}}function BlobBuilderConstructor(ary,options){options=options||{};var bb=new BlobBuilder;mapArrayBufferViews(ary);for(var i=0;i<ary.length;i++){bb.append(ary[i])}return options.type?bb.getBlob(options.type):bb.getBlob()}function BlobConstructor(ary,options){mapArrayBufferViews(ary);return new Blob(ary,options||{})}module.exports=function(){if(blobSupported){return blobSupportsArrayBufferView?global.Blob:BlobConstructor}else if(blobBuilderSupported){return BlobBuilderConstructor}else{return undefined}}()}).call(this,typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{}],31:[function(_dereq_,module,exports){(function(global){(function(root){var freeExports=typeof exports=="object"&&exports;var freeModule=typeof module=="object"&&module&&module.exports==freeExports&&module;var freeGlobal=typeof global=="object"&&global;if(freeGlobal.global===freeGlobal||freeGlobal.window===freeGlobal){root=freeGlobal}var stringFromCharCode=String.fromCharCode;function ucs2decode(string){var output=[];var counter=0;var length=string.length;var value;var extra;while(counter<length){value=string.charCodeAt(counter++);if(value>=55296&&value<=56319&&counter<length){extra=string.charCodeAt(counter++);if((extra&64512)==56320){output.push(((value&1023)<<10)+(extra&1023)+65536)}else{output.push(value);counter--}}else{output.push(value)}}return output}function ucs2encode(array){var length=array.length;var index=-1;var value;var output="";while(++index<length){value=array[index];if(value>65535){value-=65536;output+=stringFromCharCode(value>>>10&1023|55296);value=56320|value&1023}output+=stringFromCharCode(value)}return output}function checkScalarValue(codePoint){if(codePoint>=55296&&codePoint<=57343){throw Error("Lone surrogate U+"+codePoint.toString(16).toUpperCase()+" is not a scalar value")
}}function createByte(codePoint,shift){return stringFromCharCode(codePoint>>shift&63|128)}function encodeCodePoint(codePoint){if((codePoint&4294967168)==0){return stringFromCharCode(codePoint)}var symbol="";if((codePoint&4294965248)==0){symbol=stringFromCharCode(codePoint>>6&31|192)}else if((codePoint&4294901760)==0){checkScalarValue(codePoint);symbol=stringFromCharCode(codePoint>>12&15|224);symbol+=createByte(codePoint,6)}else if((codePoint&4292870144)==0){symbol=stringFromCharCode(codePoint>>18&7|240);symbol+=createByte(codePoint,12);symbol+=createByte(codePoint,6)}symbol+=stringFromCharCode(codePoint&63|128);return symbol}function utf8encode(string){var codePoints=ucs2decode(string);var length=codePoints.length;var index=-1;var codePoint;var byteString="";while(++index<length){codePoint=codePoints[index];byteString+=encodeCodePoint(codePoint)}return byteString}function readContinuationByte(){if(byteIndex>=byteCount){throw Error("Invalid byte index")}var continuationByte=byteArray[byteIndex]&255;byteIndex++;if((continuationByte&192)==128){return continuationByte&63}throw Error("Invalid continuation byte")}function decodeSymbol(){var byte1;var byte2;var byte3;var byte4;var codePoint;if(byteIndex>byteCount){throw Error("Invalid byte index")}if(byteIndex==byteCount){return false}byte1=byteArray[byteIndex]&255;byteIndex++;if((byte1&128)==0){return byte1}if((byte1&224)==192){var byte2=readContinuationByte();codePoint=(byte1&31)<<6|byte2;if(codePoint>=128){return codePoint}else{throw Error("Invalid continuation byte")}}if((byte1&240)==224){byte2=readContinuationByte();byte3=readContinuationByte();codePoint=(byte1&15)<<12|byte2<<6|byte3;if(codePoint>=2048){checkScalarValue(codePoint);return codePoint}else{throw Error("Invalid continuation byte")}}if((byte1&248)==240){byte2=readContinuationByte();byte3=readContinuationByte();byte4=readContinuationByte();codePoint=(byte1&15)<<18|byte2<<12|byte3<<6|byte4;if(codePoint>=65536&&codePoint<=1114111){return codePoint}}throw Error("Invalid UTF-8 detected")}var byteArray;var byteCount;var byteIndex;function utf8decode(byteString){byteArray=ucs2decode(byteString);byteCount=byteArray.length;byteIndex=0;var codePoints=[];var tmp;while((tmp=decodeSymbol())!==false){codePoints.push(tmp)}return ucs2encode(codePoints)}var utf8={version:"2.0.0",encode:utf8encode,decode:utf8decode};if(typeof define=="function"&&typeof define.amd=="object"&&define.amd){define(function(){return utf8})}else if(freeExports&&!freeExports.nodeType){if(freeModule){freeModule.exports=utf8}else{var object={};var hasOwnProperty=object.hasOwnProperty;for(var key in utf8){hasOwnProperty.call(utf8,key)&&(freeExports[key]=utf8[key])}}}else{root.utf8=utf8}})(this)}).call(this,typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{}],32:[function(_dereq_,module,exports){(function(global){var rvalidchars=/^[\],:{}\s]*$/;var rvalidescape=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;var rvalidtokens=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;var rvalidbraces=/(?:^|:|,)(?:\s*\[)+/g;var rtrimLeft=/^\s+/;var rtrimRight=/\s+$/;module.exports=function parsejson(data){if("string"!=typeof data||!data){return null}data=data.replace(rtrimLeft,"").replace(rtrimRight,"");if(global.JSON&&JSON.parse){return JSON.parse(data)}if(rvalidchars.test(data.replace(rvalidescape,"@").replace(rvalidtokens,"]").replace(rvalidbraces,""))){return new Function("return "+data)()}}}).call(this,typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{}],33:[function(_dereq_,module,exports){exports.encode=function(obj){var str="";for(var i in obj){if(obj.hasOwnProperty(i)){if(str.length)str+="&";str+=encodeURIComponent(i)+"="+encodeURIComponent(obj[i])}}return str};exports.decode=function(qs){var qry={};var pairs=qs.split("&");for(var i=0,l=pairs.length;i<l;i++){var pair=pairs[i].split("=");qry[decodeURIComponent(pair[0])]=decodeURIComponent(pair[1])}return qry}},{}],34:[function(_dereq_,module,exports){var re=/^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;var parts=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];module.exports=function parseuri(str){var src=str,b=str.indexOf("["),e=str.indexOf("]");if(b!=-1&&e!=-1){str=str.substring(0,b)+str.substring(b,e).replace(/:/g,";")+str.substring(e,str.length)}var m=re.exec(str||""),uri={},i=14;while(i--){uri[parts[i]]=m[i]||""}if(b!=-1&&e!=-1){uri.source=src;uri.host=uri.host.substring(1,uri.host.length-1).replace(/;/g,":");uri.authority=uri.authority.replace("[","").replace("]","").replace(/;/g,":");uri.ipv6uri=true}return uri}},{}],35:[function(_dereq_,module,exports){var global=function(){return this}();var WebSocket=global.WebSocket||global.MozWebSocket;module.exports=WebSocket?ws:null;function ws(uri,protocols,opts){var instance;if(protocols){instance=new WebSocket(uri,protocols)}else{instance=new WebSocket(uri)}return instance}if(WebSocket)ws.prototype=WebSocket.prototype},{}],36:[function(_dereq_,module,exports){(function(global){var isArray=_dereq_("isarray");module.exports=hasBinary;function hasBinary(data){function _hasBinary(obj){if(!obj)return false;if(global.Buffer&&global.Buffer.isBuffer(obj)||global.ArrayBuffer&&obj instanceof ArrayBuffer||global.Blob&&obj instanceof Blob||global.File&&obj instanceof File){return true}if(isArray(obj)){for(var i=0;i<obj.length;i++){if(_hasBinary(obj[i])){return true}}}else if(obj&&"object"==typeof obj){if(obj.toJSON){obj=obj.toJSON()}for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)&&_hasBinary(obj[key])){return true}}}return false}return _hasBinary(data)}}).call(this,typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{isarray:37}],37:[function(_dereq_,module,exports){module.exports=Array.isArray||function(arr){return Object.prototype.toString.call(arr)=="[object Array]"}},{}],38:[function(_dereq_,module,exports){var global=_dereq_("global");try{module.exports="XMLHttpRequest"in global&&"withCredentials"in new global.XMLHttpRequest}catch(err){module.exports=false}},{global:39}],39:[function(_dereq_,module,exports){module.exports=function(){return this}()},{}],40:[function(_dereq_,module,exports){var indexOf=[].indexOf;module.exports=function(arr,obj){if(indexOf)return arr.indexOf(obj);for(var i=0;i<arr.length;++i){if(arr[i]===obj)return i}return-1}},{}],41:[function(_dereq_,module,exports){var has=Object.prototype.hasOwnProperty;exports.keys=Object.keys||function(obj){var keys=[];for(var key in obj){if(has.call(obj,key)){keys.push(key)}}return keys};exports.values=function(obj){var vals=[];for(var key in obj){if(has.call(obj,key)){vals.push(obj[key])}}return vals};exports.merge=function(a,b){for(var key in b){if(has.call(b,key)){a[key]=b[key]}}return a};exports.length=function(obj){return exports.keys(obj).length};exports.isEmpty=function(obj){return 0==exports.length(obj)}},{}],42:[function(_dereq_,module,exports){var re=/^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;var parts=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];module.exports=function parseuri(str){var m=re.exec(str||""),uri={},i=14;while(i--){uri[parts[i]]=m[i]||""}return uri}},{}],43:[function(_dereq_,module,exports){(function(global){var isArray=_dereq_("isarray");var isBuf=_dereq_("./is-buffer");exports.deconstructPacket=function(packet){var buffers=[];var packetData=packet.data;function _deconstructPacket(data){if(!data)return data;if(isBuf(data)){var placeholder={_placeholder:true,num:buffers.length};buffers.push(data);return placeholder}else if(isArray(data)){var newData=new Array(data.length);for(var i=0;i<data.length;i++){newData[i]=_deconstructPacket(data[i])}return newData}else if("object"==typeof data&&!(data instanceof Date)){var newData={};for(var key in data){newData[key]=_deconstructPacket(data[key])}return newData}return data}var pack=packet;pack.data=_deconstructPacket(packetData);pack.attachments=buffers.length;return{packet:pack,buffers:buffers}};exports.reconstructPacket=function(packet,buffers){var curPlaceHolder=0;function _reconstructPacket(data){if(data&&data._placeholder){var buf=buffers[data.num];return buf}else if(isArray(data)){for(var i=0;i<data.length;i++){data[i]=_reconstructPacket(data[i])}return data}else if(data&&"object"==typeof data){for(var key in data){data[key]=_reconstructPacket(data[key])}return data}return data}packet.data=_reconstructPacket(packet.data);packet.attachments=undefined;return packet};exports.removeBlobs=function(data,callback){function _removeBlobs(obj,curKey,containingObject){if(!obj)return obj;if(global.Blob&&obj instanceof Blob||global.File&&obj instanceof File){pendingBlobs++;var fileReader=new FileReader;fileReader.onload=function(){if(containingObject){containingObject[curKey]=this.result}else{bloblessData=this.result}if(!--pendingBlobs){callback(bloblessData)}};fileReader.readAsArrayBuffer(obj)}else if(isArray(obj)){for(var i=0;i<obj.length;i++){_removeBlobs(obj[i],i,obj)}}else if(obj&&"object"==typeof obj&&!isBuf(obj)){for(var key in obj){_removeBlobs(obj[key],key,obj)}}}var pendingBlobs=0;var bloblessData=data;_removeBlobs(bloblessData);if(!pendingBlobs){callback(bloblessData)}}}).call(this,typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{"./is-buffer":45,isarray:46}],44:[function(_dereq_,module,exports){var debug=_dereq_("debug")("socket.io-parser");var json=_dereq_("json3");var isArray=_dereq_("isarray");var Emitter=_dereq_("component-emitter");var binary=_dereq_("./binary");var isBuf=_dereq_("./is-buffer");exports.protocol=4;exports.types=["CONNECT","DISCONNECT","EVENT","BINARY_EVENT","ACK","BINARY_ACK","ERROR"];exports.CONNECT=0;exports.DISCONNECT=1;exports.EVENT=2;exports.ACK=3;exports.ERROR=4;exports.BINARY_EVENT=5;exports.BINARY_ACK=6;exports.Encoder=Encoder;exports.Decoder=Decoder;function Encoder(){}Encoder.prototype.encode=function(obj,callback){debug("encoding packet %j",obj);if(exports.BINARY_EVENT==obj.type||exports.BINARY_ACK==obj.type){encodeAsBinary(obj,callback)}else{var encoding=encodeAsString(obj);callback([encoding])}};function encodeAsString(obj){var str="";var nsp=false;str+=obj.type;if(exports.BINARY_EVENT==obj.type||exports.BINARY_ACK==obj.type){str+=obj.attachments;str+="-"}if(obj.nsp&&"/"!=obj.nsp){nsp=true;str+=obj.nsp}if(null!=obj.id){if(nsp){str+=",";nsp=false}str+=obj.id}if(null!=obj.data){if(nsp)str+=",";str+=json.stringify(obj.data)}debug("encoded %j as %s",obj,str);return str}function encodeAsBinary(obj,callback){function writeEncoding(bloblessData){var deconstruction=binary.deconstructPacket(bloblessData);var pack=encodeAsString(deconstruction.packet);var buffers=deconstruction.buffers;buffers.unshift(pack);callback(buffers)}binary.removeBlobs(obj,writeEncoding)}function Decoder(){this.reconstructor=null}Emitter(Decoder.prototype);Decoder.prototype.add=function(obj){var packet;if("string"==typeof obj){packet=decodeString(obj);if(exports.BINARY_EVENT==packet.type||exports.BINARY_ACK==packet.type){this.reconstructor=new BinaryReconstructor(packet);if(this.reconstructor.reconPack.attachments===0){this.emit("decoded",packet)}}else{this.emit("decoded",packet)}}else if(isBuf(obj)||obj.base64){if(!this.reconstructor){throw new Error("got binary data when not reconstructing a packet")}else{packet=this.reconstructor.takeBinaryData(obj);if(packet){this.reconstructor=null;this.emit("decoded",packet)}}}else{throw new Error("Unknown type: "+obj)}};function decodeString(str){var p={};var i=0;p.type=Number(str.charAt(0));if(null==exports.types[p.type])return error();if(exports.BINARY_EVENT==p.type||exports.BINARY_ACK==p.type){var buf="";while(str.charAt(++i)!="-"){buf+=str.charAt(i);if(i==str.length)break}if(buf!=Number(buf)||str.charAt(i)!="-"){throw new Error("Illegal attachments")}p.attachments=Number(buf)}if("/"==str.charAt(i+1)){p.nsp="";while(++i){var c=str.charAt(i);if(","==c)break;p.nsp+=c;if(i==str.length)break}}else{p.nsp="/"}var next=str.charAt(i+1);if(""!==next&&Number(next)==next){p.id="";while(++i){var c=str.charAt(i);if(null==c||Number(c)!=c){--i;break}p.id+=str.charAt(i);if(i==str.length)break}p.id=Number(p.id)}if(str.charAt(++i)){try{p.data=json.parse(str.substr(i))}catch(e){return error()}}debug("decoded %s as %j",str,p);return p}Decoder.prototype.destroy=function(){if(this.reconstructor){this.reconstructor.finishedReconstruction()}};function BinaryReconstructor(packet){this.reconPack=packet;this.buffers=[]}BinaryReconstructor.prototype.takeBinaryData=function(binData){this.buffers.push(binData);if(this.buffers.length==this.reconPack.attachments){var packet=binary.reconstructPacket(this.reconPack,this.buffers);this.finishedReconstruction();return packet}return null};BinaryReconstructor.prototype.finishedReconstruction=function(){this.reconPack=null;this.buffers=[]};function error(data){return{type:exports.ERROR,data:"parser error"}}},{"./binary":43,"./is-buffer":45,"component-emitter":9,debug:10,isarray:46,json3:47}],45:[function(_dereq_,module,exports){(function(global){module.exports=isBuf;function isBuf(obj){return global.Buffer&&global.Buffer.isBuffer(obj)||global.ArrayBuffer&&obj instanceof ArrayBuffer}}).call(this,typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{}],46:[function(_dereq_,module,exports){module.exports=_dereq_(37)},{}],47:[function(_dereq_,module,exports){(function(window){var getClass={}.toString,isProperty,forEach,undef;var isLoader=typeof define==="function"&&define.amd;var nativeJSON=typeof JSON=="object"&&JSON;var JSON3=typeof exports=="object"&&exports&&!exports.nodeType&&exports;if(JSON3&&nativeJSON){JSON3.stringify=nativeJSON.stringify;JSON3.parse=nativeJSON.parse}else{JSON3=window.JSON=nativeJSON||{}}var isExtended=new Date(-0xc782b5b800cec);try{isExtended=isExtended.getUTCFullYear()==-109252&&isExtended.getUTCMonth()===0&&isExtended.getUTCDate()===1&&isExtended.getUTCHours()==10&&isExtended.getUTCMinutes()==37&&isExtended.getUTCSeconds()==6&&isExtended.getUTCMilliseconds()==708}catch(exception){}function has(name){if(has[name]!==undef){return has[name]}var isSupported;if(name=="bug-string-char-index"){isSupported="a"[0]!="a"}else if(name=="json"){isSupported=has("json-stringify")&&has("json-parse")}else{var value,serialized='{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';if(name=="json-stringify"){var stringify=JSON3.stringify,stringifySupported=typeof stringify=="function"&&isExtended;if(stringifySupported){(value=function(){return 1}).toJSON=value;try{stringifySupported=stringify(0)==="0"&&stringify(new Number)==="0"&&stringify(new String)=='""'&&stringify(getClass)===undef&&stringify(undef)===undef&&stringify()===undef&&stringify(value)==="1"&&stringify([value])=="[1]"&&stringify([undef])=="[null]"&&stringify(null)=="null"&&stringify([undef,getClass,null])=="[null,null,null]"&&stringify({a:[value,true,false,null,"\x00\b\n\f\r	"]})==serialized&&stringify(null,value)==="1"&&stringify([1,2],null,1)=="[\n 1,\n 2\n]"&&stringify(new Date(-864e13))=='"-271821-04-20T00:00:00.000Z"'&&stringify(new Date(864e13))=='"+275760-09-13T00:00:00.000Z"'&&stringify(new Date(-621987552e5))=='"-000001-01-01T00:00:00.000Z"'&&stringify(new Date(-1))=='"1969-12-31T23:59:59.999Z"'}catch(exception){stringifySupported=false}}isSupported=stringifySupported}if(name=="json-parse"){var parse=JSON3.parse;if(typeof parse=="function"){try{if(parse("0")===0&&!parse(false)){value=parse(serialized);var parseSupported=value["a"].length==5&&value["a"][0]===1;if(parseSupported){try{parseSupported=!parse('"	"')}catch(exception){}if(parseSupported){try{parseSupported=parse("01")!==1}catch(exception){}}if(parseSupported){try{parseSupported=parse("1.")!==1}catch(exception){}}}}}catch(exception){parseSupported=false}}isSupported=parseSupported}}return has[name]=!!isSupported}if(!has("json")){var functionClass="[object Function]";var dateClass="[object Date]";var numberClass="[object Number]";var stringClass="[object String]";var arrayClass="[object Array]";var booleanClass="[object Boolean]";var charIndexBuggy=has("bug-string-char-index");if(!isExtended){var floor=Math.floor;var Months=[0,31,59,90,120,151,181,212,243,273,304,334];var getDay=function(year,month){return Months[month]+365*(year-1970)+floor((year-1969+(month=+(month>1)))/4)-floor((year-1901+month)/100)+floor((year-1601+month)/400)}}if(!(isProperty={}.hasOwnProperty)){isProperty=function(property){var members={},constructor;if((members.__proto__=null,members.__proto__={toString:1},members).toString!=getClass){isProperty=function(property){var original=this.__proto__,result=property in(this.__proto__=null,this);this.__proto__=original;return result}}else{constructor=members.constructor;isProperty=function(property){var parent=(this.constructor||constructor).prototype;return property in this&&!(property in parent&&this[property]===parent[property])}}members=null;return isProperty.call(this,property)}}var PrimitiveTypes={"boolean":1,number:1,string:1,undefined:1};var isHostType=function(object,property){var type=typeof object[property];return type=="object"?!!object[property]:!PrimitiveTypes[type]};forEach=function(object,callback){var size=0,Properties,members,property;(Properties=function(){this.valueOf=0}).prototype.valueOf=0;members=new Properties;for(property in members){if(isProperty.call(members,property)){size++}}Properties=members=null;if(!size){members=["valueOf","toString","toLocaleString","propertyIsEnumerable","isPrototypeOf","hasOwnProperty","constructor"];forEach=function(object,callback){var isFunction=getClass.call(object)==functionClass,property,length;var hasProperty=!isFunction&&typeof object.constructor!="function"&&isHostType(object,"hasOwnProperty")?object.hasOwnProperty:isProperty;for(property in object){if(!(isFunction&&property=="prototype")&&hasProperty.call(object,property)){callback(property)}}for(length=members.length;property=members[--length];hasProperty.call(object,property)&&callback(property));}}else if(size==2){forEach=function(object,callback){var members={},isFunction=getClass.call(object)==functionClass,property;for(property in object){if(!(isFunction&&property=="prototype")&&!isProperty.call(members,property)&&(members[property]=1)&&isProperty.call(object,property)){callback(property)}}}}else{forEach=function(object,callback){var isFunction=getClass.call(object)==functionClass,property,isConstructor;for(property in object){if(!(isFunction&&property=="prototype")&&isProperty.call(object,property)&&!(isConstructor=property==="constructor")){callback(property)}}if(isConstructor||isProperty.call(object,property="constructor")){callback(property)}}}return forEach(object,callback)};if(!has("json-stringify")){var Escapes={92:"\\\\",34:'\\"',8:"\\b",12:"\\f",10:"\\n",13:"\\r",9:"\\t"};var leadingZeroes="000000";var toPaddedString=function(width,value){return(leadingZeroes+(value||0)).slice(-width)};var unicodePrefix="\\u00";var quote=function(value){var result='"',index=0,length=value.length,isLarge=length>10&&charIndexBuggy,symbols;if(isLarge){symbols=value.split("")}for(;index<length;index++){var charCode=value.charCodeAt(index);switch(charCode){case 8:case 9:case 10:case 12:case 13:case 34:case 92:result+=Escapes[charCode];break;default:if(charCode<32){result+=unicodePrefix+toPaddedString(2,charCode.toString(16));break}result+=isLarge?symbols[index]:charIndexBuggy?value.charAt(index):value[index]}}return result+'"'};var serialize=function(property,object,callback,properties,whitespace,indentation,stack){var value,className,year,month,date,time,hours,minutes,seconds,milliseconds,results,element,index,length,prefix,result;try{value=object[property]}catch(exception){}if(typeof value=="object"&&value){className=getClass.call(value);if(className==dateClass&&!isProperty.call(value,"toJSON")){if(value>-1/0&&value<1/0){if(getDay){date=floor(value/864e5);for(year=floor(date/365.2425)+1970-1;getDay(year+1,0)<=date;year++);for(month=floor((date-getDay(year,0))/30.42);getDay(year,month+1)<=date;month++);date=1+date-getDay(year,month);time=(value%864e5+864e5)%864e5;hours=floor(time/36e5)%24;minutes=floor(time/6e4)%60;seconds=floor(time/1e3)%60;milliseconds=time%1e3}else{year=value.getUTCFullYear();month=value.getUTCMonth();date=value.getUTCDate();hours=value.getUTCHours();minutes=value.getUTCMinutes();seconds=value.getUTCSeconds();milliseconds=value.getUTCMilliseconds()}value=(year<=0||year>=1e4?(year<0?"-":"+")+toPaddedString(6,year<0?-year:year):toPaddedString(4,year))+"-"+toPaddedString(2,month+1)+"-"+toPaddedString(2,date)+"T"+toPaddedString(2,hours)+":"+toPaddedString(2,minutes)+":"+toPaddedString(2,seconds)+"."+toPaddedString(3,milliseconds)+"Z"}else{value=null}}else if(typeof value.toJSON=="function"&&(className!=numberClass&&className!=stringClass&&className!=arrayClass||isProperty.call(value,"toJSON"))){value=value.toJSON(property)}}if(callback){value=callback.call(object,property,value)}if(value===null){return"null"}className=getClass.call(value);if(className==booleanClass){return""+value}else if(className==numberClass){return value>-1/0&&value<1/0?""+value:"null"}else if(className==stringClass){return quote(""+value)}if(typeof value=="object"){for(length=stack.length;length--;){if(stack[length]===value){throw TypeError()}}stack.push(value);results=[];prefix=indentation;indentation+=whitespace;if(className==arrayClass){for(index=0,length=value.length;index<length;index++){element=serialize(index,value,callback,properties,whitespace,indentation,stack);results.push(element===undef?"null":element)}result=results.length?whitespace?"[\n"+indentation+results.join(",\n"+indentation)+"\n"+prefix+"]":"["+results.join(",")+"]":"[]"}else{forEach(properties||value,function(property){var element=serialize(property,value,callback,properties,whitespace,indentation,stack);if(element!==undef){results.push(quote(property)+":"+(whitespace?" ":"")+element)}});result=results.length?whitespace?"{\n"+indentation+results.join(",\n"+indentation)+"\n"+prefix+"}":"{"+results.join(",")+"}":"{}"}stack.pop();return result}};JSON3.stringify=function(source,filter,width){var whitespace,callback,properties,className;if(typeof filter=="function"||typeof filter=="object"&&filter){if((className=getClass.call(filter))==functionClass){callback=filter}else if(className==arrayClass){properties={};for(var index=0,length=filter.length,value;index<length;value=filter[index++],(className=getClass.call(value),className==stringClass||className==numberClass)&&(properties[value]=1));}}if(width){if((className=getClass.call(width))==numberClass){if((width-=width%1)>0){for(whitespace="",width>10&&(width=10);whitespace.length<width;whitespace+=" ");}}else if(className==stringClass){whitespace=width.length<=10?width:width.slice(0,10)}}return serialize("",(value={},value[""]=source,value),callback,properties,whitespace,"",[])}}if(!has("json-parse")){var fromCharCode=String.fromCharCode;var Unescapes={92:"\\",34:'"',47:"/",98:"\b",116:"	",110:"\n",102:"\f",114:"\r"};var Index,Source;var abort=function(){Index=Source=null;throw SyntaxError()};var lex=function(){var source=Source,length=source.length,value,begin,position,isSigned,charCode;while(Index<length){charCode=source.charCodeAt(Index);switch(charCode){case 9:case 10:case 13:case 32:Index++;break;case 123:case 125:case 91:case 93:case 58:case 44:value=charIndexBuggy?source.charAt(Index):source[Index];Index++;return value;case 34:for(value="@",Index++;Index<length;){charCode=source.charCodeAt(Index);if(charCode<32){abort()}else if(charCode==92){charCode=source.charCodeAt(++Index);switch(charCode){case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:value+=Unescapes[charCode];Index++;break;case 117:begin=++Index;for(position=Index+4;Index<position;Index++){charCode=source.charCodeAt(Index);if(!(charCode>=48&&charCode<=57||charCode>=97&&charCode<=102||charCode>=65&&charCode<=70)){abort()}}value+=fromCharCode("0x"+source.slice(begin,Index));break;default:abort()}}else{if(charCode==34){break}charCode=source.charCodeAt(Index);begin=Index;while(charCode>=32&&charCode!=92&&charCode!=34){charCode=source.charCodeAt(++Index)}value+=source.slice(begin,Index)}}if(source.charCodeAt(Index)==34){Index++;return value}abort();default:begin=Index;if(charCode==45){isSigned=true;charCode=source.charCodeAt(++Index)}if(charCode>=48&&charCode<=57){if(charCode==48&&(charCode=source.charCodeAt(Index+1),charCode>=48&&charCode<=57)){abort()}isSigned=false;for(;Index<length&&(charCode=source.charCodeAt(Index),charCode>=48&&charCode<=57);Index++);if(source.charCodeAt(Index)==46){position=++Index;for(;position<length&&(charCode=source.charCodeAt(position),charCode>=48&&charCode<=57);position++);if(position==Index){abort()}Index=position}charCode=source.charCodeAt(Index);if(charCode==101||charCode==69){charCode=source.charCodeAt(++Index);if(charCode==43||charCode==45){Index++}for(position=Index;position<length&&(charCode=source.charCodeAt(position),charCode>=48&&charCode<=57);position++);if(position==Index){abort()}Index=position}return+source.slice(begin,Index)}if(isSigned){abort()}if(source.slice(Index,Index+4)=="true"){Index+=4;return true}else if(source.slice(Index,Index+5)=="false"){Index+=5;return false}else if(source.slice(Index,Index+4)=="null"){Index+=4;return null}abort()}}return"$"};var get=function(value){var results,hasMembers;if(value=="$"){abort()}if(typeof value=="string"){if((charIndexBuggy?value.charAt(0):value[0])=="@"){return value.slice(1)}if(value=="["){results=[];for(;;hasMembers||(hasMembers=true)){value=lex();if(value=="]"){break}if(hasMembers){if(value==","){value=lex();if(value=="]"){abort()}}else{abort()}}if(value==","){abort()}results.push(get(value))}return results}else if(value=="{"){results={};for(;;hasMembers||(hasMembers=true)){value=lex();if(value=="}"){break}if(hasMembers){if(value==","){value=lex();if(value=="}"){abort()}}else{abort()}}if(value==","||typeof value!="string"||(charIndexBuggy?value.charAt(0):value[0])!="@"||lex()!=":"){abort()}results[value.slice(1)]=get(lex())}return results}abort()}return value};var update=function(source,property,callback){var element=walk(source,property,callback);if(element===undef){delete source[property]}else{source[property]=element}};var walk=function(source,property,callback){var value=source[property],length;if(typeof value=="object"&&value){if(getClass.call(value)==arrayClass){for(length=value.length;length--;){update(value,length,callback)}}else{forEach(value,function(property){update(value,property,callback)})}}return callback.call(source,property,value)};JSON3.parse=function(source,callback){var result,value;Index=0;Source=""+source;result=get(lex());if(lex()!="$"){abort()}Index=Source=null;return callback&&getClass.call(callback)==functionClass?walk((value={},value[""]=result,value),"",callback):result}}}if(isLoader){define(function(){return JSON3})}})(this)},{}],48:[function(_dereq_,module,exports){module.exports=toArray;function toArray(list,index){var array=[];index=index||0;for(var i=index||0;i<list.length;i++){array[i-index]=list[i]}return array}},{}]},{},[1])(1)});
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(require,module,exports){
'use strict';

var BasicLayer = function(game, parent, options) {
  Phaser.Group.call(this, game, parent);

    var layerText = options.layerText ? options.layerText : "Welcome to the Tutorial!";
    var subLayerText = options.subLayerText ? options.subLayerText : "Here you will learn how to play this game. No Enemies !!! Just flying.";

    this.b = this.game.add.bitmapData(this.game.width, this.game.height),
    this.b.ctx.fillStyle = "#000",
    this.b.ctx.fillRect(0, 0,  this.game.width, this.game.height);

    this.c = this.create(0, 0, this.b);
    this.c.fixedToCamera = true;
    this.c.alpha = 0.5;

    this.fontStyle = { font: "35px loudy_With_a_Chance_of_Love", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" };
    this.smallerfontStyle = { font: "25px loudy_With_a_Chance_of_Love", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" };
    this.layerText = this.game.add.text(this.game.width/2, this.game.height/2 - 180, layerText, this.fontStyle);
    this.layerText.anchor.set(0.5);
    this.layerText.fixedToCamera = true;
    this.add(this.layerText);
    this.subLayerText = this.game.add.text(this.game.width/2, this.game.height/2 - 120, subLayerText, this.smallerfontStyle);
    this.subLayerText.fixedToCamera = true;
    this.subLayerText.anchor.set(0.5);
    this.subLayerText.wordWrap = true;
    this.subLayerText.wordWrapWidth = this.game.width/2;
    this.add(this.subLayerText);
    
    if(options.currentLevel) {
      var waveText = this.game.add.text(this.game.width/2, this.game.height/2 - 80, options.currentLevel.waves.count + ' Waves', this.smallerfontStyle);
          waveText.anchor.set(0.5);
      this.add(waveText);
      
      for (var i = 1; i <= options.currentLevel.waves.count; i++){
        var currentWave = options.currentLevel.waves[i];
          
        var currentWaveText = this.game.add.text(this.game.width/2, i > 1 ? this.game.height/2 + i * 30 : this.game.height/2 - 20, 'Wave ' + i, this.smallerfontStyle);
            currentWaveText.anchor.set(0.5);
        this.add(currentWaveText);
        
        var enemyImagesXPosition = i > 1 ? this.game.height/2 + i * 35 : this.game.height/2 - 10;
        
        if(currentWave.planes) {
          var enemyImageText = this.game.add.text(this.game.width/2 - 170 , enemyImagesXPosition, currentWave.planes.count + 'x', this.smallerfontStyle);
          var enemyImage = this.game.add.image(this.game.width/2 - 110 , enemyImagesXPosition,"airplanes",GlobalGame.enemy);
          this.add(enemyImageText);
          this.add(enemyImage);
        }
    
        if(currentWave.flaks) {
          var enemyFlakImageText = this.game.add.text(this.game.width/2 , enemyImagesXPosition, currentWave.flaks.count + 'x', this.smallerfontStyle);
          var enemyFlakImage = this.game.add.image(this.game.width/2 + 70 , enemyImagesXPosition,"flak","flak/flak1/turret_1_default");
          this.add(enemyFlakImageText);
          this.add(enemyFlakImage);
        }
    
        if(currentWave.soliders) {
          var enemySoliderImageText = this.game.add.text(this.game.width/2 + 30 , enemyImagesXPosition, currentWave.soliders.count + 'x', this.smallerfontStyle);
          var soliderId = currentWave.soliders.type;
          var enemySoliderImage = this.game.add.image(this.game.width/2 + 100 , enemyImagesXPosition,"soliders","soliders/solider"+soliderId+"/Soldier"+soliderId+"_shot_up_6");
          this.add(enemySoliderImageText);
          this.add(enemySoliderImage);
        }
      }
    }
		this.game.input.onDown.add(this.hideLayer, this);

};

BasicLayer.prototype = Object.create(Phaser.Group.prototype);
BasicLayer.prototype.constructor = BasicLayer;

BasicLayer.prototype.show = function () {
  this.y = 0;
};
BasicLayer.prototype.hideLayer = function () {
  var direction = this.game.input.activePointer.x <= this.game.width / 2 ? 0 : 1;
  if(direction) {
    this.game.input.onDown.remove(this.hideLayer, this);
    this.hide(true);
  }
};

BasicLayer.prototype.setOptions = function (options) {
  this.layerText.setText(options.layerText);
  this.subLayerText.setText(options.subLayerText);
};

BasicLayer.prototype.hide = function (createPlayers) {
  if(createPlayers) {
    this.game.state.getCurrentState().createPlayers();
  }
  this.y = -this.game.world.height;
};

module.exports = BasicLayer;

},{}],8:[function(require,module,exports){
'use strict';

var DefeatWindow = function(game, parent, options) {
  Phaser.Group.call(this, game, parent);

  this.fontStyle = { font: "40px loudy_With_a_Chance_of_Love", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" };

  this.defeatWindow = this.game.add.image(this.game.width / 2 , this.game.height / 2, 'sprites', 'menu/defeat_window');
  this.defeatWindow.anchor.setTo(0.5, 0.5);
  this.defeatWindow.fixedToCamera = true;
  this.add(this.defeatWindow);

  this.restartButton = this.game.add.button(-70, 100, 'sprites', this.restartClick, this, 'buttons/button_restart_act', 'buttons/button_restart_no', 'buttons/button_restart_act', 'buttons/button_restart_no');
  this.defeatWindow.addChild(this.restartButton);

  this.menuButton = this.game.add.button(50, 100, 'sprites', this.menuClick, this, 'buttons/button_menu_act', 'buttons/button_menu_no', 'buttons/button_menu_act', 'buttons/button_menu_no');
  this.defeatWindow.addChild(this.menuButton);

};

DefeatWindow.prototype = Object.create(Phaser.Group.prototype);
DefeatWindow.prototype.constructor = DefeatWindow;

DefeatWindow.prototype.update = function() {

};

DefeatWindow.prototype.restartClick = function () {
    this.game.state.restart();
};
DefeatWindow.prototype.menuClick = function () {
    this.game.state.start('menu',true,false);
};

module.exports = DefeatWindow;

},{}],9:[function(require,module,exports){
'use strict';

var EnemyPlane = require('./EnemyPlane');
var Flak = require('./Flak');
var Solider = require('./Solider');
var VictoryWindow = require('../prefabs/VictoryWindow');

var EnemyGroup = function(game, player, options) {
  Phaser.Group.call(this, game);
    this.player = player;
    this.options = options ? options : {};
    this.currentLevel = this.options.currentLevel;
    this.currentWave = 1;
    this.currentWaveCountEnemiesLeft = this.currentLevel.waves[this.currentWave].countEnemies;
};

EnemyGroup.prototype = Object.create(Phaser.Group.prototype);
EnemyGroup.prototype.constructor = EnemyGroup;

/**
* adds enemy
*/
EnemyGroup.prototype.addEnemy = function () {
    if(this.currentWaveCountEnemiesLeft < 1){
      this.currentWave += 1;
    }
    if(this.currentWave <= this.currentLevel.waves.count) {

      if(this.currentLevel.waves[this.currentWave].planes) {
        for (var i = 0; i < this.currentLevel.waves[this.currentWave].planes.count; i++){
          this.enemyPlane = new EnemyPlane(this.game, Math.random() * this.game.world.width, Math.random() * (this.game.world.height - 250),GlobalGame.enemy, this.player, this.options);
          this.add(this.enemyPlane);
        }
      }

      if(this.currentLevel.waves[this.currentWave].flaks) {
        for (var i = 0; i < this.currentLevel.waves[this.currentWave].flaks.count; i++){
          this.flak = new Flak(this.game, Math.random() * this.game.world.width, (this.game.world.height - 50) ,"flak/flak1/turret_1_default", this.player, this.options);
          this.add(this.flak);
        }
      }

      if(this.currentLevel.waves[this.currentWave].soliders) {
        for (var i = 0; i < this.currentLevel.waves[this.currentWave].soliders.count; i++){
          this.options.soliderId = this.currentLevel.waves[this.currentWave].soliders.type;

          // this.solider = new Solider(this.game, Math.random() * this.game.world.width, this.game.world.height ,"soliders/solider"+this.options.soliderId+"/Soldier"+this.options.soliderId+"_default", this.player, this.options);
          this.solider = new Solider(this.game, Math.random() * this.game.world.width, this.game.world.height ,"soliders/solider"+this.options.soliderId+"/Soldier"+this.options.soliderId+"_shot_up_6", this.player, this.options);
          this.add(this.solider);
        }
      }
    } else {
      // alert('Level abgeschlossen');
      this.finishedLevel();
    }
};

/**
* adds enemy
*/
EnemyGroup.prototype.finishedLevel = function () {
    var levelsLocalStorageObject = JSON.parse(localStorage.getItem('levels'));
    var secondsToFinishLevel = this.game.state.getCurrentState().currentTimer.seconds;
    if(secondsToFinishLevel < this.currentLevel.stars[1] ){
      if(secondsToFinishLevel < this.currentLevel.stars[2] ){
        if (secondsToFinishLevel < this.currentLevel.stars[3]) {
           levelsLocalStorageObject[GlobalGame.level] = 3;
        } else {
          levelsLocalStorageObject[GlobalGame.level] = 2;
        }
      } else {
        levelsLocalStorageObject[GlobalGame.level] = 1;
      }
      if(GlobalGame.level === Object.keys(levelsLocalStorageObject).length){
        alert('you finished all Singleplayer Levels replay the Levels or play the Multiplayer')
      }
      levelsLocalStorageObject[GlobalGame.level+1] = 0;
    }
    this.game.state.getCurrentState().currentTimer.remove();
    localStorage.setItem('levels', JSON.stringify(levelsLocalStorageObject));
    // this.game.state.start('missions');
    this.player.killPlayerAndAllProperties();
    this.victoryWindow = new VictoryWindow(this.game, undefined, {secondsToFinishLevel: secondsToFinishLevel,currentLevel: this.currentLevel});
}

module.exports = EnemyGroup;

},{"../prefabs/VictoryWindow":16,"./EnemyPlane":10,"./Flak":11,"./Solider":15}],10:[function(require,module,exports){
'use strict';

var EnemyPlane = function(game, x, y, frame, player, options) {
  Phaser.Sprite.call(this, game, x, y, "airplanes", frame);

  // initialize your prefab here

    this.options = options ? options : false;

    this.player = player;

        this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(500, 'sprites', 'sprites/bullets/bullet_2');
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 1);
        this.bullets.setAll('checkWorldBounds', true);
        this.bullets.setAll('outOfBoundsKill', true);
        // this.bullets.setAll('scale.x', 0.5);
        // this.bullets.setAll('scale.y', 0.5);
        this.bulletTime = 0;

        // this.bringToTop();
        this.health = 20;
        this.kills = 0;
        this.angle = 0;
        this.PI2 = Math.PI * 2;
        // Define constants that affect motion
        this.SPEED = 200; // missile speed pixels/second
        this.TURN_RATE = 3; // turn rate in degrees/frame
//        this.scale.setTo(0.6, 0.6);
//        this.scale.x *= -1;
        // this.scaleFactor = new Phaser.Point(0.5, 0.5);
        this.scaleFactor = new Phaser.Point(1, 1);

        this.scale.setTo(this.scaleFactor.x, this.scaleFactor.y);
        this.anchor.setTo(0.5, 0.5);
//        this.scale.setTo(0.23, 0.23);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
//        this.body.collideWorldBounds = true;
        //	Tell it we don't want physics to manage the rotation
//        this.body.allowRotation = false;
        this.body.gravity.y = 50;
        this.body.velocity.setTo(300, 0)
        this.body.maxVelocity.setTo(300, 300);


      var playerHitString = GlobalGame.enemy.replace('default', 'hit_');
      this.hitAnimation = this.animations.add('hit', [
          playerHitString+'1',
          playerHitString+'2',
          playerHitString+'3'
      ], 10, false, false);

      var playerDeathString = GlobalGame.enemy.replace('default', 'death_');
      this.deadAnimation = this.animations.add('explode', [
          playerDeathString+'1',
          playerDeathString+'2',
          playerDeathString+'3',
          playerDeathString+'4'
      ], 10, false, false);
      
    this.hitAnimation.onComplete.add(function() {
        this.frameName = GlobalGame.enemy;
    }, this);

    this.deadAnimation.onComplete.add(function() {
        this.deadAnimation.stop('explode');
        this.kill();
        this.emitter.kill();
        this.frameName = "Airplanes/AEG_C_IV/Skin_1/default";
        this.bullets.removeAll();
        this.arrow.kill();
        this.parent.currentWaveCountEnemiesLeft -= 1;
        this.parent.addEnemy();
    
            if(this.player) this.player.kills += 1;

    }, this);


    /*******************
    * HUD'S
    *******************/

      // this.hud = Phaser.Plugin.HUDManager.create(this.game, this, 'gamehud');
      // this.healthHUD = this.hud.addBar(0,-50, this.width, 10, this.health, 'health', this, '#ffbd55', false);
      // this.healthHUD.bar.anchor.setTo(0.5, 0.5);
      // this.addChild(this.healthHUD.bar);

    this.randomXPointInWorld = this.game.world.randomX;
    this.randomYPointInWorld = this.game.world.randomY - 300;

    // Let's build a Arrow
    this.arrow = this.game.add.sprite(15, 15, 'sprites', 'sprites/arrow');
    this.arrow.fixedToCamera = true;
    this.arrow.anchor.setTo(0.5, 0.5);
    this.arrow.visible = false;
    
    // this.game.time.events.loop(Phaser.Timer.QUARTER, this.flyToRandomPointInWorld, this);

};

EnemyPlane.prototype = Object.create(Phaser.Sprite.prototype);
EnemyPlane.prototype.constructor = EnemyPlane;

EnemyPlane.prototype.update = function() {
    
    this.flyToRandomPointInWorld();

    this.game.physics.arcade.overlap(this, this.player.bullets, this.enemyLoseHealth, null, this);
    this.game.physics.arcade.overlap(this.player, this.bullets, this.player.playerHitsSomething, null, this.player);

    // Calculate velocity vector based on this.rotation and this.SPEED
    this.body.velocity.x = Math.cos(this.rotation) * this.SPEED;
    this.body.velocity.y = Math.sin(this.rotation) * this.SPEED;

    if(this.player){
         if (this.game.physics.arcade.distanceBetween(this, this.player) < 300){
             this.fireBullet();

//             if(this.player.alive)
//                this.rotation = this.game.physics.arcade.moveToObject(this, this.player, this.SPEED-150);
         }
    }

    this.setParticleToPlayerPosition();

};

     /**
      * Enemy flys to random Point in World
     */
    EnemyPlane.prototype.flyToRandomPointInWorld = function () {
        if(this.game.physics.arcade.distanceToXY(this, this.randomXPointInWorld, this.randomYPointInWorld) < 50){
            this.randomXPointInWorld = this.game.world.randomX;
            this.randomYPointInWorld = this.game.world.randomY;
        }

        // Calculate the angle from the missile to the mouse cursor game.input.x
        // and game.input.y are the mouse position; substitute with whatever
        // target coordinates you need.
        var targetAngle = this.game.math.angleBetween(
            this.x, this.y,
            this.randomXPointInWorld, this.randomYPointInWorld
        );

        if (this.rotation !== targetAngle) {
            var delta = targetAngle - this.rotation;

            if (delta > Math.PI) delta -= this.PI2;
            if (delta < -Math.PI) delta += this.PI2;

            if (delta > 0) {
                this.angle += this.TURN_RATE;
            } else {
                this.angle -= this.TURN_RATE;
            }

            if (Math.abs(delta) < this.game.math.degToRad(this.TURN_RATE)) {
                this.rotation = targetAngle;
            }
        }
    };
    
     /**
      * create Particles for Enemy
     */
    EnemyPlane.prototype.createParticles = function () {
       // if (this.game.device.desktop){
        this.emitter = this.game.add.emitter(0,0,500);
        // this.emitter.makeParticles('sprites', 'sprites/particles/smoke' );
        var particleBaseName = 'sprites/particles/white_puff/whitePuff';
        this.emitter.makeParticles('sprites', [particleBaseName+'01',particleBaseName+'02',particleBaseName+'03',particleBaseName+'04',particleBaseName+'05',particleBaseName+'06',particleBaseName+'07',particleBaseName+'08',particleBaseName+'09',particleBaseName+'10'] );

        this.emitter.gravity = 50;
        this.emitter.setAlpha(1, 0, 500);
        // this.emitter.setScale(0.08, 0, 0.08, 0, 3000);
        // this.emitter.particleAnchor = new Phaser.Point(0.2, 0.5);
        // this.emitter.particleAnchor = new Phaser.Point(0.2, 0.5);
        
        this.addChild(this.emitter);
        this.emitter.y = 0;
        this.emitter.x = -16;
        this.emitter.lifespan = 500;
        this.emitter.maxParticleSpeed = new Phaser.Point(-100,50);
        this.emitter.minParticleSpeed = new Phaser.Point(-200,-50);
    };

     /**
      * Set Particle to Enemy Position
     */
    EnemyPlane.prototype.setParticleToPlayerPosition = function () {
        if(this.emitter) {
//          var px = this.body.velocity.x;
//          var py = this.body.velocity.y;
//  
//          px *= -1;
//          py *= -1;
//  
//          this.emitter.minParticleSpeed.set(px, py);
//          this.emitter.maxParticleSpeed.set(px, py);
//  
//          this.emitter.emitX = this.x;
//          this.emitter.emitY = this.y;
            this.emitter.emitParticle();
        }
    };

EnemyPlane.prototype.fireBullet = function() {

    if (this.game.time.now > this.bulletTime)
    {

        var bullet = this.bullets.getFirstExists(false);

        if (bullet)
        {
            // bullet.reset(this.body.x + this.body.width/2, this.body.y + this.body.height/2);
            bullet.reset(this.x, this.y);
//                bullet.body.velocity.copyFrom(this.game.physics.arcade.velocityFromAngle(this.plane.angle, 1000))
//                bullet.rotation = this.plane.rotation + this.game.math.degToRad(90);
            bullet.lifespan = 2000;
            //  bullet.rotation = this.rotation + this.game.math.degToRad(90);
             bullet.rotation = this.rotation;
            this.game.physics.arcade.velocityFromRotation(this.rotation, 1000, bullet.body.velocity);
            this.bulletTime = this.game.time.now + 250;
//                gameInitializer.socket.emit("fire bullet", {bulletX: bullet.x,bulletY: bullet.y, bulletAngle: bullet.rotation, angle: this.plane.angle});
            if(this.socket)
                this.socket.socket.emit("fire bullet", {bulletX: bullet.x,bulletY: bullet.y, bulletAngle: bullet.rotation, angle: this.angle});
        }
    }

};

     /**
     * enemyLoseHealth collides with enemy
     * @param enemy collides
     */
    EnemyPlane.prototype.enemyLoseHealth = function (plane) {
      if(plane.health >= 0) {
        this.hitAnimation.play('hit', 10, false);

        plane.health -= 1;

        if(plane.health === 15){
            this.createParticles();
        //   this.emitter.start(false, 2000, 50);
          plane.frameName = GlobalGame.enemy.replace('default', 'default_damaged');
        }

        if(plane.health < 1){
            plane.body.velocity.x = 0;
            plane.body.velocity.y = 0;
            plane.body.gravity.y = 700;
            this.deadAnimation.play('explode', 10, false, true);
        }
      }
    };

module.exports = EnemyPlane;

},{}],11:[function(require,module,exports){
'use strict';

var Flak = function(game, x, y, frame, player, options) {
  Phaser.Sprite.call(this, game, x, y, 'flak', frame);

  this.options = options ? options : false;

  this.player = player;

  this.bullets = this.game.add.group();
  this.bullets.enableBody = true;
  this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
  this.bullets.createMultiple(500, 'sprites', 'sprites/bullets/bullet_3');
  this.bullets.setAll('anchor.x', 0.5);
  this.bullets.setAll('anchor.y', 1);
  this.bullets.setAll('checkWorldBounds', true);
  this.bullets.setAll('outOfBoundsKill', true);
  // this.bullets.setAll('scale.x', 0.5);
  // this.bullets.setAll('scale.y', 0.5);
  this.bulletTime = 0;

  this.shotAnimation = this.animations.add('shot', [
      'flak/flak1/turret_1_fire_1',
      'flak/flak1/turret_1_fire_2',
      'flak/flak1/turret_1_fire_3',
      'flak/flak1/turret_1_fire_4',
      'flak/flak1/turret_1_fire_5',
      'flak/flak1/turret_1_fire_6',
      'flak/flak1/turret_1_fire_7',
      'flak/flak1/turret_1_fire_8'
  ], 15);

  this.shotAnimation.enableUpdate = true;
  this.shotAnimation.onUpdate.add(function(anim, frame){
    if(frame.index === 4){
        if (this.game.time.now > this.bulletTime) {
            var bullet = this.bullets.getFirstExists(false);
            if (bullet) {
                bullet.reset(this.x, this.y);
                bullet.lifespan = 2000;
                // bullet.rotation = this.rotation + this.game.math.degToRad(90);
                bullet.rotation = this.rotation;
                this.game.physics.arcade.velocityFromRotation(this.rotation, 1000, bullet.body.velocity);
                this.bulletTime = this.game.time.now + 250;
                if(this.socket)
                    this.socket.socket.emit("fire bullet", {bulletX: bullet.x,bulletY: bullet.y, bulletAngle: bullet.rotation, angle: this.angle});
            }
        }
    }
  }, this);

  this.health = 20;

  // this.rotation = -0.2;
  this.anchor.setTo(0.1, 0.5);
  this.scaleFactor = new Phaser.Point(1, 1);
  // this.scale.setTo(this.scaleFactor.x, this.scaleFactor.y);
// this.player.x = x +150;
// this.player.y = y +150;
  this.base = game.add.sprite(x +35 , y -35, 'flak', 'flak/flak1/base_1_default');
  this.base.anchor.setTo(0.9, 0.5);

  this.game.physics.enable(this, Phaser.Physics.ARCADE);

  this.arrow = this.game.add.sprite(15, 45, 'sprites', 'sprites/arrow');
  this.arrow.fixedToCamera = true;
  this.arrow.anchor.setTo(0.5, 0.5);
  this.arrow.visible = false;
};

Flak.prototype = Object.create(Phaser.Sprite.prototype);
Flak.prototype.constructor = Flak;

Flak.prototype.update = function() {
    
    this.game.physics.arcade.overlap(this, this.player.bullets, this.enemyLoseHealth, null, this);
    this.game.physics.arcade.overlap(this.player, this.bullets, this.player.playerHitsSomething, null, this.player);

      // console.log(this.game.physics.arcade.angleBetween(this, this.player))

    // var currentAngleBetween = this.game.physics.arcade.angleBetween(this, this.player);
    // var dx = this.game.input.activePointer.worldX - this.x;
    // var dy = this.game.input.activePointer.worldY - this.y;
    // this.rotation = Math.atan2(dy, dx);

    // if (currentAngleBetween > -0.2 && currentAngleBetween < 3) {
    // this.rotation = this.game.physics.arcade.angleToPointer(this);
    if( this.player){
       this.rotation = this.game.physics.arcade.angleBetween(this, this.player);
       this.checkIfLookingInTheRightDirection(this.player.x);
       if (this.game.physics.arcade.distanceBetween(this, this.player) < 800){

          // this.shotUpAnimation.play('shot');
          this.fireBullet();
       }
   }
    //  }

};

/**
 * Fires a Bullet
 */
Flak.prototype.fireBullet = function() {
  if(!this.shotAnimation.isPlaying) {
    this.shotAnimation.play('shot');
  }
};

Flak.prototype.checkIfLookingInTheRightDirection = function(directionX) {
  if(directionX > this.x) {
    this.tweenScaleFactor = new Phaser.Point(this.scaleFactor.x, this.scaleFactor.y);
  } else {
    this.tweenScaleFactor = new Phaser.Point(this.scaleFactor.x, -this.scaleFactor.y);
  }
  if(this.scale !== this.tweenScaleFactor) {
     this.scaleTween = this.game.add.tween(this.scale).to({x: this.tweenScaleFactor.x, y: this.tweenScaleFactor.y}, 100, Phaser.Easing.Back.Out, true).start();
  }
};

/**
* enemyLoseHealth collides with enemy
* @param enemy collides
*/
Flak.prototype.enemyLoseHealth = function (enemy) {
//        gameInitializer.socket.emit("bullet hit player", {playerId: plane.name});
   if(this.socket)
       this.socket.socket.emit("bullet hit player", {playerId: this.name});
   enemy.health -= 1
   if(enemy.health < 1){

       if(this.player) this.player.kills += 1;

       //explode animation
       var explosion = this.game.add.sprite(enemy.x - enemy.width/2, enemy.y - enemy.height/2, 'airplaneexplode');
       explosion.animations.add('explode');
       explosion.animations.play('explode', 10, false, true);
//            explosion.animations.destroy('explode');

       enemy.kill();
       enemy.base.kill();
       enemy.bullets.removeAll();
       enemy.arrow.kill();
       this.parent.currentWaveCountEnemiesLeft -= 1;
       this.parent.addEnemy();
   }
};

module.exports = Flak;

},{}],12:[function(require,module,exports){

'use strict';

var Level = function(game, options) {
  Phaser.Group.call(this, game);

  this.options = options ? options : false;

  this.spriteSheet = this.game.cache.getFrameData("sprites");
  var backroundLayerNumber = this.options.currentLevel.levelDesign.BackroundLayerNumber ? this.options.currentLevel.levelDesign.BackroundLayerNumber : 1;
  this.worldHeight = this.spriteSheet.getFrameByName('level/level_'+backroundLayerNumber+'/cloudsBackground').height;
  this.game.world.setBounds(0 , 0, 3000, this.worldHeight);
  
  this.bgtile = this.game.add.tileSprite(0, 0, this.game.world.width, this.worldHeight, 'sprites', 'level/level_'+backroundLayerNumber+'/cloudsBackground');
//  this.bgtile.fixedToCamera = true;
  this.bgtile.autoScroll(50, 0);
  this.add(this.bgtile);

  // this.mountaintile = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.cache.getImage('treesMountain1').height, 'treesMountain1');
  this.mountaintile = this.game.add.tileSprite(0, 0, this.game.world.width, this.worldHeight, 'sprites', 'level/level_'+backroundLayerNumber+'/treesMountain');
//  this.mountaintile.fixedToCamera = true;
  this.add(this.mountaintile);

  // var maxElements = 20;
  //
  // for (var i = 0; i < maxElements; i++) {
  //   this.clouds = this.game.add.sprite(this.game.rnd.integerInRange(0, this.game.world.width), this.game.rnd.integerInRange(0, this.game.world.height - 400), 'sprites', 'level/cloud_fluffy_1');
  //   if (this.game.device.desktop) {
  //     this.clouds.anchor.setTo(0.5, 0);
  //     // Kill the cloud when out of bounds
  //     this.clouds.checkWorldBounds = true;
  //     this.clouds.outOfBoundsKill = true;
  //
  //     // Move clouds
  //     this.game.physics.arcade.enableBody(this.clouds);
  //     this.clouds.body.allowGravity = false;
  //     this.clouds.body.velocity.x = -this.game.rnd.integerInRange(15, 30);
  //   }
  //
  //   this.clouds2 = this.game.add.sprite(this.game.rnd.integerInRange(0, this.game.world.width), this.game.rnd.integerInRange(0, this.game.world.height - 400), 'sprites', 'level/cloud_fluffy_2');
  //   if (this.game.device.desktop) {
  //     this.clouds2.anchor.setTo(0.5, 0);
  //     // Kill the cloud when out of bounds
  //     this.clouds2.checkWorldBounds = true;
  //     this.clouds2.outOfBoundsKill = true;
  //
  //     // Move clouds
  //     this.game.physics.arcade.enableBody(this.clouds2);
  //     this.clouds2.body.allowGravity = false;
  //     this.clouds2.body.velocity.x = -this.game.rnd.integerInRange(15, 30);
  //   }
  // }
  // this.add(this.clouds);
  // this.add(this.clouds2);

    this.platforms = this.game.add.group();
//    this.groundtile = this.game.add.tileSprite(0, this.game.world.height - 132, this.game.world.width, this.game.cache.getImage('bg1').height, 'sprites', 'level/crosssection_long_new');
    var groundHeight = this.spriteSheet.getFrameByName('level/level_'+backroundLayerNumber+'/ground').height;
    this.groundtile = this.game.add.tileSprite(0, this.game.world.height - groundHeight, this.game.world.width, groundHeight, 'sprites', 'level/level_'+backroundLayerNumber+'/ground');
    this.groundtile.name = 'ground';
    this.game.physics.enable(this.groundtile, Phaser.Physics.ARCADE);
    this.groundtile.body.immovable = true;
    this.platforms.add(this.groundtile);
    this.add(this.platforms);
};

Level.prototype = Object.create(Phaser.Group.prototype);;
Level.prototype.constructor = Level;

Level.prototype.update = function() {
};

module.exports = Level;

},{}],13:[function(require,module,exports){
'use strict';

var PausePanel = function(game, parent){
		Phaser.Group.call(this, game, parent);

		this.panel = this.create(this.game.width/2, 10, 'sprites', 'menu/paused');
		this.panel.anchor.setTo(0.5, 0,5);
    this.panel.fixedToCamera = true;

		this.x = 0;
		this.y = -300;

		this.gameWidth2 = this.game.width/2;
		this.gameHeight2 = this.game.height/2;
		this.panelHeight2 = this.panel.height/2;
		this.gameHeight2MinusPanelHeight2 = this.gameHeight2 - this.panelHeight2;
	};

	PausePanel.prototype = Object.create(Phaser.Group.prototype);
	PausePanel.constructor = PausePanel;

	PausePanel.prototype.show = function(onComplete){
    this.btnPlay = this.game.add.button(this.gameWidth2 - 100, this.panelHeight2, 'sprites', this.game.state.getCurrentState().playGame, this, 'buttons/button_play_act', 'buttons/button_play_no', 'buttons/button_play_act', 'buttons/button_play_no');
		this.restartButton = this.game.add.button(this.gameWidth2 -20, this.panelHeight2, 'sprites', this.game.state.getCurrentState().restart, this, 'buttons/button_restart_new_act', 'buttons/button_restart_new_no', 'buttons/button_restart_new_act', 'buttons/button_restart_new_no');
		this.menuButton = this.game.add.button(this.gameWidth2 + 60, this.panelHeight2, 'sprites', this.game.state.getCurrentState().menu, this, 'buttons/button_menu_new_no', 'buttons/button_menu_new_no', 'buttons/button_menu_new_no', 'buttons/button_menu_new_no');
    this.btnPlay.fixedToCamera = true;
    this.add(this.btnPlay);
    this.restartButton.fixedToCamera = true;
    this.add(this.restartButton);
    this.menuButton.fixedToCamera = true;
    this.add(this.menuButton);
		this.game.add.tween(this).to({y:this.gameHeight2MinusPanelHeight2}, 200, Phaser.Easing.Bounce.Out, true)
                                 .onComplete.add(onComplete, this.game.state.getCurrentState());
	};
	PausePanel.prototype.hide = function(onComplete){
		var closePauseTween = this.game.add.tween(this).to({y:-this.gameHeight2MinusPanelHeight2}, 200, Phaser.Easing.Linear.NONE, true)
            if(typeof onComplete == 'function')
                closePauseTween._lastChild.onComplete.add(onComplete, this.game.state.getCurrentState());
	};
	PausePanel.prototype.restartClick = function () {
	      this.game.state.restart();
	};
	PausePanel.prototype.menuClick = function () {
	    this.game.state.start('menu',true,false);
	};

module.exports = PausePanel;

},{}],14:[function(require,module,exports){
'use strict';

  var DefeatWindow = require('../prefabs/DefeatWindow');
  var HealthBar = require('../plugins/HealthBar.js');

var Player = function(game, x, y,frame) {
  Phaser.Sprite.call(this, game, x, y, "airplanes", frame);

        //  Our bullet group
        this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(500, 'sprites', 'sprites/bullets/bullet_2');
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 1);
        this.bullets.setAll('checkWorldBounds', true);
        this.bullets.setAll('outOfBoundsKill', true);
        // this.bullets.setAll('scale.x', 0.5);
        // this.bullets.setAll('scale.y', 0.5);
        this.bulletTime = 0;
        
        this.fullHealth = 20;
        this.health = this.fullHealth;
        this.kills = 0;
        this.angle = 0;
        this.angleSpeed = 150;
        this.angularVeloctitySpeed = 50;
        this.PI2 = Math.PI * 2;
        this.SPEED = 200; // missile speed pixels/second
        this.TURN_RATE = 3; // turn rate in degrees/frame
        this.planeDirection = 1;
        this.direction = 1;
        this.flyLoop = false;
        this.scaleFactor = new Phaser.Point(1, 1);

       this.scale.setTo(this.scaleFactor.x, this.scaleFactor.y);
        this.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        this.body.width2 = this.body.width/2;
        this.body.height2 = this.body.height/2;
        this.body.gravity.y = 300;
        this.body.velocity.setTo(200, 0);
        this.body.maxVelocity.setTo(300, 300);

        var playerHitString = GlobalGame.player.replace('default', 'hit_');
        this.hitAnimation = this.animations.add('hit', [
            playerHitString+'1',
            playerHitString+'2',
            playerHitString+'3'
        ], 10, false, false);

        var playerDeathString = GlobalGame.player.replace('default', 'death_');
        this.deadAnimation = this.animations.add('explode', [
             playerDeathString+'1',
             playerDeathString+'2',
             playerDeathString+'3',
             playerDeathString+'4'
        ], 10, false, false);
        
        // this.deadAnimation = this.animations.add('explode', Phaser.Animation.generateFrameNames('explosion', 0, 199));
        
        this.hitAnimation.onComplete.add(function() {
            this.frameName = GlobalGame.player;
        }, this);

        this.deadAnimation.onComplete.add(function() {

          this.deadAnimation.stop('explode');
          this.killPlayerAndAllProperties();

//            if(this.name == GlobalGame.multiplayer.socket.socket.sessionid)

          // if(!this.name){
          if(this.game.state.getCurrentState().key === "tutorial") {
            GlobalGame.tutorialPlayed = 1;
            this.game.state.getCurrentState().restart(true, false);
          } else {
            this.defeatWindow = new DefeatWindow(this.game, undefined);
          }
          // }
        }, this);

    /*******************
    * HUD'S
    *******************/

    this.healthBarGroup = this.game.add.group();
    this.healthBar = new HealthBar(this.game, {x: 151, y: 70, width: 99, height:17, bg: {color: '#A87436'}, bar:{color: '#EB3B3B'}});
    this.healthBarOverlay = this.game.add.sprite(50, 50, "sprites", "HUD/healthBar");
    this.healthBar.bgSprite.fixedToCamera = true;
    this.healthBar.barSprite.fixedToCamera = true;
    this.healthBarOverlay.fixedToCamera = true;
    this.healthBarGroup.addChild(this.healthBar.bgSprite);
    this.healthBarGroup.addChild(this.healthBar.barSprite);
    this.healthBarGroup.addChild(this.healthBarOverlay);

    if(GlobalGame.multiplayer.userName){
        this.username = this.game.add.text(0, -100, GlobalGame.multiplayer.userName, { fontSize: '22px', fill: '#000' });
        // this.addChild(this.username);
    }

        this.game.camera.follow(this);

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.pointer = this.game.input.addPointer();

        this.game.input.onDown.add(this.flap, this);
        
        this.cursors.left.onDown.add(function(){this.flap(0)}, this);
        this.cursors.up.onDown.add(function(){this.flap(0)}, this);
        this.cursors.right.onDown.add(function(){this.flap(1)}, this);
        this.cursors.down.onDown.add(function(){this.flap(1)}, this);

};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
        // Keep the plane on the screen
        if (this.x > this.game.world.width) this.x = 0;
        if (this.x < 0) this.x = this.game.world.width;

         this.game.physics.arcade.overlap(this, this.game.state.getCurrentState().level.platforms, this.runDeadAnimation, null, this);

        if(GlobalGame.multiplayer.socketEventHandlers !== null){
            for(var i = 0; i < GlobalGame.multiplayer.socketEventHandlers.enemies.length; i++){
                this.game.physics.arcade.overlap(GlobalGame.multiplayer.socketEventHandlers.enemies[i], this.bullets, this.shootPlayer, null, this);
            }
        }else{
            this.game.physics.arcade.overlap(this.bullets, this.game.state.getCurrentState().birdGroup, this.bulletHitsBird, null, this);
            this.game.physics.arcade.overlap(this, this.game.state.getCurrentState().birdGroup, this.playerHitsSomething, null, this);
        }
        
        this.whilePlayerFlysALoop();

        this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);

        this.setParticleToPlayerPosition();

        if(GlobalGame.multiplayer.socket)
            GlobalGame.multiplayer.socket.emit("move player", {x: this.x, y:this.y, angle: this.angle});

};

     /**
     * player collides with enemy
     * @param enemy enemy collides
     * @param player player collides
     */
    Player.prototype.shootPlayer = function (plane, bullet) {
        bullet.kill();

        plane.playerLoseHealth(plane);
    };
    
     /**
      * create Particles for Player
     */
    Player.prototype.createParticles = function () {
    // if (this.game.device.desktop){
        this.emitter = this.game.add.emitter(0,0,500);
        // this.emitter.makeParticles('sprites', 'sprites/particles/smoke' );
        var particleBaseName = 'sprites/particles/white_puff/whitePuff';
        this.emitter.makeParticles('sprites', [particleBaseName+'01',particleBaseName+'02',particleBaseName+'03',particleBaseName+'04',particleBaseName+'05',particleBaseName+'06',particleBaseName+'07',particleBaseName+'08',particleBaseName+'09',particleBaseName+'10'] );

        this.emitter.gravity = 50;
        this.emitter.setAlpha(1, 0, 500);
        // this.emitter.setScale(0.08, 0, 0.08, 0, 3000);
        // this.emitter.particleAnchor = new Phaser.Point(0.2, 0.5);
        // this.emitter.particleAnchor = new Phaser.Point(0.2, 0.5);
        
        this.addChild(this.emitter);
        this.emitter.y = 0;
        this.emitter.x = -16;
        this.emitter.lifespan = 500;
        this.emitter.maxParticleSpeed = new Phaser.Point(-100,50);
        this.emitter.minParticleSpeed = new Phaser.Point(-200,-50);
    };
    
     /**
      * Set Particle to Player Position
     */
    Player.prototype.setParticleToPlayerPosition = function () {
        if(this.emitter) {
//          var px = this.body.velocity.x;
//          var py = this.body.velocity.y;
//  
//          px *= -1;
//          py *= -1;
//  
//          this.emitter.minParticleSpeed.set(px, py);
//          this.emitter.maxParticleSpeed.set(px, py);
//  
//          this.emitter.emitX = this.x;
//          this.emitter.emitY = this.y;
            this.emitter.emitParticle();
        }
    };
    
     /**
      * While Player flys a loop
     */
    Player.prototype.whilePlayerFlysALoop = function () {
            if(this.flyLoop){
                this.fireBullet();

                  if(this.direction) {
                    var directionX = this.x+150;
                    var directionY = this.y-100;
                    var tweenScaleFactor = new Phaser.Point(this.scaleFactor.x, this.scaleFactor.y);
                  } else {
                    var directionX = this.x-200;
                    var directionY = this.y-100;
                    var tweenScaleFactor = new Phaser.Point(this.scaleFactor.x, -this.scaleFactor.y);
                  }
                 var targetAngle = this.game.math.angleBetween(
                    this.x, this.y,
                    directionX, directionY
                );

                if (this.rotation !== targetAngle) {
                    this.game.input.onDown.remove(this.flap, this);
                        var delta = targetAngle - this.rotation;

                        if (delta > Math.PI) delta -= this.PI2;
                        if (delta < -Math.PI) delta += this.PI2;

                        if (delta > 0) {
                            this.angle += this.TURN_RATE;
                        } else {
                            this.angle -= this.TURN_RATE;
                        }

                        if (Math.abs(delta) < this.game.math.degToRad(this.TURN_RATE)) {
                            this.rotation = targetAngle;
                            this.game.add.tween(this.scale).to({x: tweenScaleFactor.x, y: tweenScaleFactor.y}, 500, Phaser.Easing.Back.Out, true).start();
                            this.game.input.onDown.add(this.flap, this);
                            this.planeDirection = this.direction;
                            this.flyLoop = false;
                        }
                }
                this.body.velocity.x = Math.cos(this.rotation) * this.SPEED;
                this.body.velocity.y = Math.sin(this.rotation) * this.SPEED;
            }
    };

  /**
   * Fires a Bullet
   */
    Player.prototype.fireBullet = function() {

        if (this.game.time.now > this.bulletTime)
        {

            var bullet = this.bullets.getFirstExists(false);

            if (bullet)
            {
                bullet.reset(this.x, this.y);
                bullet.lifespan = 2000;
                 bullet.rotation = this.rotation;
                this.game.physics.arcade.velocityFromRotation(this.rotation, 1000, bullet.body.velocity);
                this.bulletTime = this.game.time.now + 125;
                if(GlobalGame.multiplayer.socket)
                    GlobalGame.multiplayer.socket.emit("fire bullet", {bulletX: bullet.x,bulletY: bullet.y, bulletAngle: bullet.rotation, angle: this.angle});
            }
        }

    };

    /**
     * player collides with enemy
     * @param enemy enemy collides
     * @param player player collides
     */
    Player.prototype.bulletHitsBird = function (bullet, bird) {
        bird.kill();
        if(typeof bird.parent.addBird === 'function') bird.parent.addBird();
        bullet.kill();
    };

    /**
    * player collides with enemy
     * @param enemy enemy collides
     * @param player player collides
     */
    Player.prototype.playerHitsSomething = function (plane, something) {
        something.kill();
        if(typeof something.parent.addBird === 'function') something.parent.addBird();
        this.playerLoseHealth(plane, something);
    };

    /**
    * player flaps
     */
    Player.prototype.flap = function(direction) {
      if(!!this.alive) {
        var velocityX,
            velocityY;
          if(direction === 0 || direction === 1) {
            this.direction = direction;
          } else {
            this.direction = this.game.input.activePointer.x <= this.game.width / 2 ? 0 : 1;
          }

          if(this.direction !== this.planeDirection){
              this.flyLoop = true;
          } else {
              if(this.direction) {
                velocityX = this.body.velocity.x+150;
                velocityY = this.body.velocity.y-100;
              } else {
                velocityX = this.body.velocity.x-200;
                velocityY = this.body.velocity.y-100;
              }
              this.flapVelocityTween = this.game.add.tween(this.body.velocity).to({x: velocityX, y: velocityY}, 200, Phaser.Easing.Linear.None, true).start();
            this.fireBullet();
            // this.emitter.emitParticle();
          }
      }
    };

     /**
     * player collides with enemy
     * @param player player collides
     */
    Player.prototype.playerLoseHealth = function (plane) {
      if(plane.health >= 0) {
        this.hitAnimation.play('hit', 10, false);

        if(GlobalGame.multiplayer.socket) {
          GlobalGame.multiplayer.socket.emit("bullet hit player", {playerId: plane.name});
        }

        plane.health -= 1;

        this.healthBar.setPercent(plane.health / plane.fullHealth * 100);

        if(plane.health === 15){
          this.createParticles();
          plane.frameName = GlobalGame.player.replace('default', 'default_damaged');
        }

        if(plane.health < 1){
          this.runDeadAnimation(plane);
        }
      }
    };
    /**
    * player collides with enemy
    * @param player player collides
    */
   Player.prototype.runDeadAnimation = function (plane) {
     this.game.input.onDown.remove(this.flap, this);
     this.deadAnimation.play('explode', 10, false, true);
   };
   
    /**
     * player collides with enemy
     * @param enemy enemy collides
     * @param player player collides
     */
    Player.prototype.killPlayerAndAllProperties = function () {
        this.kill();
        if(this.emitter) {
            this.emitter.kill();
        }
        this.frameName = "Airplanes/AEG_C_IV/Skin_1/default";
        this.bullets.removeAll();
    };

module.exports = Player;

},{"../plugins/HealthBar.js":3,"../prefabs/DefeatWindow":8}],15:[function(require,module,exports){
'use strict';

var Solider = function(game, x, y, frame, player, options) {
  Phaser.Sprite.call(this, game, x, y, 'soliders', frame);

    this.player = player;
    this.options = options;

    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(500, 'sprites', 'sprites/bullets/bullet_4');
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 1);
    this.bullets.setAll('checkWorldBounds', true);
    this.bullets.setAll('outOfBoundsKill', true);
    // this.bullets.setAll('scale.x', 0.5);
    // this.bullets.setAll('scale.y', 0.5);
    this.bulletTime = 0;


    this.soliderId = this.options.soliderId;
    this.health = 3;
    this.direction = 0;

    this.rotation = -0.2;
    this.anchor.setTo(0.5, 0.5);
    this.scaleFactor = new Phaser.Point(1, 1);

    // this.scale.setTo(this.scaleFactor.x, this.scaleFactor.y);

  this.walkAnimation = this.animations.add('walk', [
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_walk_1',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_walk_2',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_walk_3',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_walk_4',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_walk_5',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_walk_6',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_walk_7',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_walk_8'
  ], 15);

  this.shotUpAnimation = this.animations.add('shotUp', [
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_shot_up_1',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_shot_up_2',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_shot_up_3',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_shot_up_4',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_shot_up_5',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_shot_up_6',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_shot_up_7',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_shot_up_8',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_shot_up_9',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_shot_up_10',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_shot_up_11',
      'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_shot_up_12'
  ], 15);

  this.shotUpAnimation.enableUpdate = true;
  this.shotUpAnimation.onUpdate.add(function(anim, frame){
    if(frame.index === 7){
        if (this.game.time.now > this.bulletTime) {
            var bullet = this.bullets.getFirstExists(false);
            if (bullet) {
                var rotation;
                if(this.direction){
                  rotation = -0.8;
                } else {
                  rotation = -2.6;
                }
                bullet.reset(this.x, this.y);
                bullet.lifespan = 2000;
                //  bullet.rotation = rotation + this.game.math.degToRad(90);
                 bullet.rotation = rotation;
                this.game.physics.arcade.velocityFromRotation(rotation, 1000, bullet.body.velocity);
                this.bulletTime = this.game.time.now + 250;
                if(this.socket)
                    this.socket.socket.emit("fire bullet", {bulletX: bullet.x,bulletY: bullet.y, bulletAngle: bullet.rotation, angle: this.angle});
            }
        }
    }
  }, this);

  // this.walkAnimation.onComplete.add(function() {
  //     this.frameName = 'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_default';
  // }, this);

  // this.shotUpAnimation.onComplete.add(function() {
  //   if (this.game.time.now > this.bulletTime) {
  //       var bullet = this.bullets.getFirstExists(false);
  //       console.log(bullet)
  //       if (bullet) {
  //           bullet.reset(this.x, this.y);
  //           bullet.lifespan = 2000;
  //            bullet.rotation = this.rotation + this.game.math.degToRad(90);
  //           this.game.physics.arcade.velocityFromRotation(this.rotation, 1000, bullet.body.velocity);
  //           this.bulletTime = this.game.time.now + 250;
  //           if(this.socket)
  //               this.socket.socket.emit("fire bullet", {bulletX: bullet.x,bulletY: bullet.y, bulletAngle: bullet.rotation, angle: this.angle});
  //       }
  //   }
  //   // this.frameName = 'soliders/solider'+this.soliderId+'/Soldier'+this.soliderId+'_default';
  // }, this);

    // this.base = this.game.add.sprite(x, y, 'soliders', 'flak/flak1/base_1_default');
    // this.base.anchor.setTo(0.5, 0.5);
    // this.turret = this.game.add.sprite(x, y, 'flak', 'turret');
    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    this.body.gravity.y = 300;
    this.flapVelocityTween = this.game.add.tween(this).to({x: Math.random() * this.game.world.width}, 1000, Phaser.Easing.Linear.None, true);
    // this.walkAnimation.play('walk', 12, true);

    this.arrow = this.game.add.sprite(15, 75, 'sprites', 'sprites/arrow');
    this.arrow.fixedToCamera = true;
    this.arrow.anchor.setTo(0.5, 0.5);
    this.arrow.visible = false;
};

Solider.prototype = Object.create(Phaser.Sprite.prototype);
Solider.prototype.constructor = Solider;

Solider.prototype.update = function() {

    this.game.physics.arcade.overlap(this, this.player.bullets, this.enemyLoseHealth, null, this);
    this.game.physics.arcade.overlap(this.player, this.bullets, this.player.playerHitsSomething, null, this.player);


  this.game.physics.arcade.collide(this, this.game.state.getCurrentState().level.platforms);

  if(!this.options.menu && this.player){
       if (this.game.physics.arcade.distanceBetween(this, this.player) < 400){
          this.fireBullet();
       } else {
          this.walk();
       }
  }

};

Solider.prototype.fireBullet = function() {
    if(!this.shotUpAnimation.isPlaying) {
      this.walkAnimation.stop('walk');
      this.shotUpAnimation.play('shotUp');
      if(this.flapVelocityTween && this.flapVelocityTween.isRunning){
        this.flapVelocityTween.stop();
      }
      this.checkIfLookingInTheRightDirection(this.player.x);
    }
};

Solider.prototype.walk = function() {
    if(!this.walkAnimation.isPlaying) {
        this.shotUpAnimation.stop('shotUp');
        this.walkAnimation.play('walk');
        if(!this.flapVelocityTween.isRunning) {
          var nextXPosition = Math.random() * this.game.world.width;

          this.checkIfLookingInTheRightDirection(nextXPosition);

          this.flapVelocityTween = this.game.add.tween(this).to({x: nextXPosition}, 5000, Phaser.Easing.Linear.None, true).start();
        }
    }
};

Solider.prototype.checkIfLookingInTheRightDirection = function(directionX) {
  if(directionX > this.x) {
    this.tweenScaleFactor = new Phaser.Point(-this.scaleFactor.x, this.scaleFactor.y);
    this.direction = 1;
  } else {
    this.tweenScaleFactor = new Phaser.Point(this.scaleFactor.x, this.scaleFactor.y);
    this.direction = 0;
  }
  if(this.scale !== this.tweenScaleFactor) {
     this.scaleTween = this.game.add.tween(this.scale).to({x: this.tweenScaleFactor.x, y: this.tweenScaleFactor.y}, 100, Phaser.Easing.Back.Out, true).start();
  }
};

/**
* enemyLoseHealth collides with enemy
* @param enemy collides
*/
Solider.prototype.enemyLoseHealth = function (enemy) {
//        gameInitializer.socket.emit("bullet hit player", {playerId: plane.name});
   if(this.socket)
       this.socket.socket.emit("bullet hit player", {playerId: this.name});
   enemy.health -= 1
   if(enemy.health < 1){

       if(this.player) this.player.kills += 1;

       //explode animation
       var explosion = this.game.add.sprite(enemy.x - enemy.width/2, enemy.y - enemy.height/2, 'airplaneexplode');
       explosion.animations.add('explode');
       explosion.animations.play('explode', 10, false, true);
//            explosion.animations.destroy('explode');

       enemy.kill();
       enemy.bullets.removeAll();
       enemy.arrow.kill();
       this.parent.currentWaveCountEnemiesLeft -= 1;
       this.parent.addEnemy();
   }
};

module.exports = Solider;

},{}],16:[function(require,module,exports){
'use strict';

var VictoryWindow = function(game, parent, options) {
  Phaser.Group.call(this, game, parent);

  var fontStyle = { font: "40px loudy_With_a_Chance_of_Love", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" };

  this.victoryWindow = this.game.add.image(this.game.width / 2 , this.game.height / 2, 'sprites', 'menu/victory_window');
  this.victoryWindow.anchor.setTo(0.5, 0.5);
  this.victoryWindow.fixedToCamera = true;
  this.add(this.victoryWindow);
  console.log(options)
  this.secondsToFinishLevelText = this.game.add.text(0, 0, options.secondsToFinishLevel, fontStyle);
  this.secondsToFinishLevelText.fixedToCamera = true;
  this.victoryWindow.addChild(this.secondsToFinishLevelText);

  this.restartButton = this.game.add.button(-70, 100, 'sprites', this.restartClick, this, 'buttons/button_restart_act', 'buttons/button_restart_no', 'buttons/button_restart_act', 'buttons/button_restart_no');
  this.victoryWindow.addChild(this.restartButton);

  this.menuButton = this.game.add.button(50, 100, 'sprites', this.menuClick, this, 'buttons/button_menu_act', 'buttons/button_menu_no', 'buttons/button_menu_act', 'buttons/button_menu_no');
  this.victoryWindow.addChild(this.menuButton);
};

VictoryWindow.prototype = Object.create(Phaser.Group.prototype);
VictoryWindow.prototype.constructor = VictoryWindow;

VictoryWindow.prototype.restartClick = function () {
    this.game.state.restart();
};
VictoryWindow.prototype.menuClick = function () {
    this.game.state.start('menu',true,false);
};

module.exports = VictoryWindow;

},{}],17:[function(require,module,exports){
'use strict';

var Bird = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'sprites', 'sprites/birds/bird_1');

        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.bounce.y = 0.2;
//      bird.body.collideWorldBounds = true;

        this.angle = 0
        this.anchor.setTo(0.5,0.5);
        // this.scale.x *= -1;

        this.flyAnimation = this.animations.add('fly', [
            'sprites/birds/bird_1',
            'sprites/birds/bird_2'
        ], 10);
        this.flyAnimation.play(10, true);
        this.events.onOutOfBounds.add(this.birdLeft, this);

};

Bird.prototype = Object.create(Phaser.Sprite.prototype);
Bird.prototype.constructor = Bird;

Bird.prototype.update = function() {
    this.body.velocity.x = Math.random() * 100;
};

Bird.prototype.birdLeft = function() {
            this.speed += 1;
            this.y += 4;

            if (this.body.facing === Phaser.LEFT)
            {
                this.scale.x *= -1;
                this.body.velocity.x = this.speed;
            }
            else
            {
                this.scale.x *= 1;
                this.body.velocity.x = -this.speed;
            }

};

module.exports = Bird;

},{}],18:[function(require,module,exports){
'use strict';

var Bird = require('./bird');

var BirdGroup = function(game, parent) {
  Phaser.Group.call(this, game, parent);

    this.setAll('checkWorldBounds', true);
    this.setAll('outOfBoundsKill', true);
    for (var i = 0; i < 12; i++){
        this.addBird();
    }

};

BirdGroup.prototype = Object.create(Phaser.Group.prototype);
BirdGroup.prototype.constructor = BirdGroup;

//BirdGroup.prototype.update = function() {

        //  Collide the Bird with the platforms
//    game.physics.arcade.collide(this.birds, level.platforms);

//    this.forEach( function(bird) {
//        //right
//        bird.body.velocity.x = Math.random() * 100;
//        bird.animations.play('fly', 8, true);
//   }, this);

  // write your prefab's specific update code here

//};

/**
* add Bird to group
*/
BirdGroup.prototype.addBird = function () {
    this.bird = new Bird(this.game, Math.random() * this.game.world.width, Math.random() * (this.game.world.height - 250), 0);
    this.add(this.bird);
};

module.exports = BirdGroup;

},{"./bird":17}],19:[function(require,module,exports){
'use strict';

var LabelButton = function(game, x, y, key, label, callback, callbackContext, overFrame, outFrame, downFrame, upFrame) {
    Phaser.Button.call(this, game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);
 
    //Style how you wish...
    this.style = {
        'font': '30px Arial',
        'fill': 'white'
    };
    this.anchor.setTo( 0.5, 0.5 );

//    this.label = new Phaser.Text(this.game, 0, 0, label, this.style);
//    this.label.anchor.setTo( 0, 0.5 );
//    this.addChild(this.label);
//    this.setLabel( label );
 

  
};

LabelButton.prototype = Object.create(Phaser.Button.prototype);
LabelButton.prototype.constructor = LabelButton;

LabelButton.prototype.setLabel = function( label ) {
    
   this.label.setText(label);
 
};

module.exports = LabelButton;

},{}],20:[function(require,module,exports){
'use strict';
var socketPlayer,
    socketGame,
    SocketObject,
    SocketRemotePlayer = require('../prefabs/socketRemotePlayer');  

var SocketEventHandlers = function(game, io) {
        // Start listening for events
            //  Create some baddies to waste :)
//        this.enemies = [];
        socketGame = game;
//        socketPlayer = player;
        SocketObject = this;
        this.enemies = [];
//        this.socket = io.connect("http://localhost", {port: 8120, transports: ["websocket"]});
//        this.socket = io.connect("http://localhost:8120");
//        this.socket = io.connect("https://plane_fight_server-c9-clonk-html5.c9.io");
//        this.socket = io.connect("http://192.168.51.67:8120");
        this.socket = io.connect("http://127.0.0.1:8120/");
//        this.socket = io.connect("http://192.168.1.5:8120");
//        this.socket = io.connect("http://server-planefight.rhcloud.com:8000");
//        this.socket = io.connect("http://neumic-asnort.codio.io:8120");
//        this.socket = io.connect("http://christian-dev.no-ip.biz:8120");
        GlobalGame.multiplayer.socket = this.socket;
    
        this.setEventHandlers();
  
};

SocketEventHandlers.prototype.constructor = SocketEventHandlers;

SocketEventHandlers.prototype = {

    setEventHandlers: function() {
        
        // Socket connection successful
        GlobalGame.multiplayer.socket.on("connect", this.onSocketConnected);

        // Socket disconnection
        GlobalGame.multiplayer.socket.on("disconnect", this.onSocketDisconnect);

        // New player message received
        GlobalGame.multiplayer.socket.on("new player", this.onNewPlayer);

        // Player move message received
        GlobalGame.multiplayer.socket.on("move player", this.onMovePlayer);

        // Player fires bullet message received
        GlobalGame.multiplayer.socket.on("fire bullet", this.onFireBullet);

        // Bullet hits Player message received
        GlobalGame.multiplayer.socket.on("bullet hit player", this.onBulletHitPlayer);

        // Player removed message received
        GlobalGame.multiplayer.socket.on("remove player", this.onRemovePlayer);

    },

    // Socket connected
    onSocketConnected: function(socket) {
        console.log("Connected to socket server ");
        
        GlobalGame.multiplayer.connected = true;
        // Send local player data to the game server
//        GlobalGame.multiplayer.socket.emit("new player", {x: socketPlayer.x, y:socketPlayer.y, angle: socketPlayer.angle});
//        this.socket.emit("new player");
    },

    // Socket disconnected
    onSocketDisconnect: function() {
        console.log("Disconnected from socket server");
        GlobalGame.multiplayer.connected = false;
    },

    
    // New player
    onNewPlayer: function(data) {
        console.log("New player connected: "+data.id + " players " + SocketObject.enemies.length);

        // Add new player to the remote players array data.x, data.y
        if(!SocketObject.playerById(data.id))
            SocketObject.enemies.push(new SocketRemotePlayer(data.id, socketGame, GlobalGame.multiplayer.player, data.x, data.y, data.angle, data.name));
        
        if(SocketObject.enemies[SocketObject.enemies.length-1])
            socketGame.add.existing(SocketObject.enemies[SocketObject.enemies.length-1]);
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
        
        if(!socketGame.device.desktop){
            var px = data.x;
            var py = data.y;

            px *= -1;
            py *= -1;

    //        movePlayer.emitter.minParticleSpeed.set(px, py);
    //        movePlayer.emitter.maxParticleSpeed.set(px, py);

            movePlayer.emitter.emitX = data.x;
            movePlayer.emitter.emitY = data.y;
        }

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
        
       if (socketGame.time.now > bulletTime)
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
                bullet.body.velocity.copyFrom(socketGame.physics.arcade.velocityFromAngle(data.angle, 1000))
//                game.physics.arcade.velocityFromRotation(data.angle, 1000, bullet.body.velocity);
                bulletTime = socketGame.time.now + 250;
            }
        }
        
        // Update player position
//        playerHowFired.bullet.x = data.bulletX;
//        playerHowFired.bullet.y = data.bulletY;
//        playerHowFired.bullet.rotation = data.bulletAngle;
//        playerHowFired.bullet.body.velocity.copyFrom(socketGame.physics.arcade.velocityFromAngle(data.angle, 1000))

    },
    // Player fires Bullet
    onBulletHitPlayer: function(data) {

        var playerGetsHit = SocketObject.playerById(data.playerId);
        
        if(playerGetsHit){
            // an other player was shooted
            playerGetsHit.health -= 1;
            if(playerGetsHit.health < 1){
                playerGetsHit.kill();
            }
        }else{
            // i think me was shooted
            GlobalGame.player.health -= 1;
            if(GlobalGame.player.health < 1){
               GlobalGame.player.kill();
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

        removePlayer.kill();

        // Remove player from array
        SocketObject.enemies.splice(SocketObject.enemies.indexOf(removePlayer), 1);

    },
        // Find player by ID
    playerById: function(id) {
            var i;
            for (i = 0; i < SocketObject.enemies.length; i++) {
                if (SocketObject.enemies[i].name == id)
                    return SocketObject.enemies[i];
            };

            return false;
        }
};

module.exports = SocketEventHandlers;

},{"../prefabs/socketRemotePlayer":21}],21:[function(require,module,exports){
'use strict';

var HealthBar = require('../plugins/HealthBar.js');

var SocketRemotePlayer = function(index, game, player, xStart, yStart, angle, name) {
  Phaser.Sprite.call(this, game, xStart, yStart, "airplanes", GlobalGame.multiplayer.enemySprite);

  // initialize your prefab here

//    this.game = game;
    this.bullets = player.bullets;
    this.alive = true;

// //    this.emitter = player.emitter;
//    this.emitter = this.game.add.emitter(xStart, yStart, 400);
// 
//     this.emitter.makeParticles( 'sprites', 'sprites/particles/smoke' );
// 
//     this.emitter.gravity = 50;
//     this.emitter.setAlpha(1, 0, 1000);
//     this.emitter.setScale(0.1, 0, 0.05, 0, 1000);
// 
//     this.emitter.start(false, 3000, 5);

    this.emitter = this.game.add.emitter(xStart, yStart, 400);
    // this.emitter.makeParticles('sprites', 'sprites/particles/smoke' );
    var particleBaseName = 'sprites/particles/white_puff/whitePuff';
    this.emitter.makeParticles('sprites', [particleBaseName+'01',particleBaseName+'02',particleBaseName+'03',particleBaseName+'04',particleBaseName+'05',particleBaseName+'06',particleBaseName+'07',particleBaseName+'08',particleBaseName+'09',particleBaseName+'10'] );

    this.emitter.gravity = 50;
    this.emitter.setAlpha(1, 0, 3000);
    // this.emitter.setScale(0.08, 0, 0.08, 0, 3000);
    this.emitter.particleAnchor = new Phaser.Point(0.2, 0.5);

    //  Our bullet group
    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(500, 'sprites', 'sprites/bullets/bullet_2');
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 1);
    this.bullets.setAll('checkWorldBounds', true);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bulletTime = 0;

    this.health = player.health;
    this.name = index.toString();
    this.username = name.toString();

    this.angle = angle;
    // this.scale.setTo(player.scale.x, player.scale.y);
//        this.plane.scale.x *= -1;
    this.anchor.setTo(player.anchor.x, player.anchor.y);
//        this.plane.scale.setTo(0.23, 0.23);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
//    this.body.collideWorldBounds = true;

    if(this.username){
        this.username = this.game.add.text(0, -100, this.username, { fontSize: '22px', fill: '#000' });
        this.addChild(this.username);
    }

      // this.hud = Phaser.Plugin.HUDManager.create(this.game, this, 'gamehud');
      // this.healthHUD = this.hud.addBar(0,-50, this.width, 10, this.health, 'health', this, '#ffbd55', false);
      // this.healthHUD.bar.anchor.setTo(0.5, 0.5);
      // this.addChild(this.healthHUD.bar);



        var playerHitString = GlobalGame.player.replace('default', 'hit_');
        this.hitAnimation = this.animations.add('hit', [
            playerHitString+'1',
            playerHitString+'2',
            playerHitString+'3'
        ], 10, false, false);

        var playerDeathString = GlobalGame.player.replace('default', 'death_');
        this.deadAnimation = this.animations.add('explode', [
            playerDeathString+'1',
            playerDeathString+'2',
            playerDeathString+'3',
            playerDeathString+'4'
        ], 10, false, false);

        this.hitAnimation.onComplete.add(function() {
            this.frameName = GlobalGame.player;
        }, this);

        this.deadAnimation.onComplete.add(function() {

          this.deadAnimation.stop('explode');
          this.killPlayerAndAllProperties();

//            if(this.name == GlobalGame.multiplayer.socket.socket.sessionid)

          // if(!this.name){
          if(this.game.state.getCurrentState().key === "tutorial") {
            GlobalGame.tutorialPlayed = 1;
            this.game.state.getCurrentState().restart(true, false);
          } else {
            this.defeatWindow = new DefeatWindow(this.game, undefined);
          }
          // }
        }, this);

};

SocketRemotePlayer.prototype = Object.create(Phaser.Sprite.prototype);
SocketRemotePlayer.prototype.constructor = SocketRemotePlayer;

SocketRemotePlayer.prototype.update = function() {

  // write your prefab's specific update code here

};

     /**
     * player collides with enemy
     * @param player player collides
     */
    SocketRemotePlayer.prototype.playerLoseHealth = function (plane) {
      if(plane.health >= 0) {
        this.hitAnimation.play('hit', 10, false);

        if(GlobalGame.multiplayer.socket) {
          GlobalGame.multiplayer.socket.emit("bullet hit player", {playerId: plane.name});
        }

        plane.health -= 1;

        if(plane.health < 15){
          this.emitter.start(false, 3000, 5);
          plane.frameName = GlobalGame.player.replace('default', 'default_damaged');
        } else if (plane.health < 10) {
          // var particleBaseName = 'sprites/particles/black_smoke/blackSmoke';
          // this.emitter.makeParticles('sprites', [particleBaseName+'01',particleBaseName+'02',particleBaseName+'03',particleBaseName+'04',particleBaseName+'05',particleBaseName+'06',particleBaseName+'07',particleBaseName+'08',particleBaseName+'09',particleBaseName+'10'] );
          plane.frameName = GlobalGame.player.replace('default', 'attack_damaged_1');
        } else if (plane.health < 5) {
          plane.frameName = GlobalGame.player.replace('default', 'attack_damaged_2');
        }

        if(plane.health < 1){
          this.runDeadAnimation(plane);
        }
      }
    };
    
    /**
    * player collides with enemy
    * @param player player collides
    */
   SocketRemotePlayer.prototype.runDeadAnimation = function (plane) {
     this.game.input.onDown.remove(this.flap, this);
     this.deadAnimation.play('explode', 10, false, true);
   };
   
    /**
     * player collides with enemy
     * @param enemy enemy collides
     * @param player player collides
     */
    SocketRemotePlayer.prototype.killPlayerAndAllProperties = function () {
        this.kill();
        this.emitter.kill();
        this.frameName = "Airplanes/AEG_C_IV/Skin_1/default";
        this.bullets.removeAll();
    };

module.exports = SocketRemotePlayer;

},{"../plugins/HealthBar.js":3}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    this.stage.backgroundColor = '#3498db';
      
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.width/2,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);
      
    this.congratsText = this.game.add.text(this.game.width/2, 200, 'You Win! (Or Maybe not)', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.width/2, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.transitions.to('play');
    }
  }
};
module.exports = GameOver;

},{}],25:[function(require,module,exports){
'use strict';
  function Help() {}
  Help.prototype = {
    create: function() {
      this.backButton = this.game.add.button(50, this.game.height - 50, 'sprites', this.backClick, this, 'buttons/button_back_act', 'buttons/button_back_no', 'buttons/button_back_act', 'buttons/button_back_no');
      this.backButton.anchor.setTo(0.5);

      this.howToPlayImage = this.game.add.image(this.game.width/2,this.game.height/2,"sprites","menu/helpScreen");
      this.howToPlayImage.anchor.setTo(0.5);

      this.playTutorialButton = this.game.add.button(this.game.width - 50, this.game.height - 50, 'sprites', this.playTutorialClick, this, 'buttons/button_play_act', 'buttons/button_play_no', 'buttons/button_play_act', 'buttons/button_play_no');
      this.playTutorialButton.anchor.setTo(0.5);
    },
    backClick: function() {
//        var fadeMenuOut = this.game.add.tween(this.buttonGroup).to({ x: this.game.width }, 1000, Phaser.Easing.Bounce.In, true);
//        fadeMenuOut.onComplete.add(function() {
      this.game.state.start('menu',true,false);
//        }, this);
    },
    playTutorialClick: function() {
//        var fadeMenuOut = this.game.add.tween(this.buttonGroup).to({ x: this.game.width }, 1000, Phaser.Easing.Bounce.In, true);
//        fadeMenuOut.onComplete.add(function() {
      this.game.state.start('tutorial',true,false);
//        }, this);
    },
  };
module.exports = Help;

},{}],26:[function(require,module,exports){

'use strict';

  var Level = require('../prefabs/Level');
  var LabelButton = require('../prefabs/labelButton');

function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
//      this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.height, 'menu_bg');

    this.buttonGroup = this.game.add.group();
      this.buttonGroup.x = - this.game.width ;
      this.startButton = this.game.add.button(this.game.width/2, 200, 'sprites', this.startClick, this, 'buttons/button_green_act', 'buttons/button_green_no', 'buttons/button_green_act', 'buttons/button_green_no');
      this.startButton.anchor.setTo(0.5,0.5);
    this.startButton.scale.setTo(0.75,0.75);
    this.buttonGroup.add(this.startButton);
      this.multiplayerButton = this.game.add.button(this.game.width/2, 300, 'sprites', this.multiplayerStartClick, this, 'buttons/button_multiplayer_act', 'buttons/button_multiplayer_no', 'buttons/button_multiplayer_act', 'buttons/button_multiplayer_no');
      this.multiplayerButton.anchor.setTo(0.5,0.5);
    this.multiplayerButton.scale.setTo(0.75,0.75);
      this.buttonGroup.add(this.multiplayerButton);

      this.settingsButton = this.game.add.button(50, this.game.height - 50, 'sprites', this.settingsClick, this, 'buttons/button_settings_act', 'buttons/button_settings_no', 'buttons/button_settings_act', 'buttons/button_settings_no');
      this.settingsButton.anchor.setTo(0.5,0.5);
      this.buttonGroup.add(this.settingsButton);

      this.helpButton = this.game.add.button(150, this.game.height - 50, 'sprites', this.helpClick, this, 'buttons/button_help_act', 'buttons/button_help_no', 'buttons/button_help_act', 'buttons/button_help_no');
      this.helpButton.anchor.setTo(0.5,0.5);
      this.buttonGroup.add(this.helpButton);

      this.game.add.tween(this.buttonGroup).to({ x: 0 }, 1000, Phaser.Easing.Bounce.Out, true);

  },
  update: function() {
  },
  startClick: function() {
    var fadeMenuOut = this.game.add.tween(this.buttonGroup).to({ x: this.game.width }, 1000, Phaser.Easing.Bounce.In, true);
    fadeMenuOut.onComplete.add(function() {
        if(!localStorage.getItem('tutorial_played')){
          localStorage.setItem('tutorial_played', 1);
          this.game.state.start('help');
        } else {
          this.game.state.start('missions');
        }

    }, this);
  },
  multiplayerStartClick: function() {
    var fadeMenuOut = this.game.add.tween(this.buttonGroup).to({ x: this.game.width }, 1000, Phaser.Easing.Bounce.In, true);
    fadeMenuOut.onComplete.add(function() {
        this.game.state.start('multiplayerUserSignIn');
    }, this);
  },
  settingsClick: function() {
    var fadeMenuOut = this.game.add.tween(this.buttonGroup).to({ x: this.game.width }, 1000, Phaser.Easing.Bounce.In, true);
    fadeMenuOut.onComplete.add(function() {
        this.game.state.start('settings');
    }, this);
  },
  helpClick: function() {
    var fadeMenuOut = this.game.add.tween(this.buttonGroup).to({ x: this.game.width }, 1000, Phaser.Easing.Bounce.In, true);
    fadeMenuOut.onComplete.add(function() {
        this.game.state.start('help');
    }, this);
  }
};

module.exports = Menu;

},{"../prefabs/Level":12,"../prefabs/labelButton":19}],27:[function(require,module,exports){
'use strict';
  function Missions() {}
  Missions.prototype = {
    create: function() {
//        this.background = this.game.add.sprite(0, 0, this.game.world.width, this.game.height, 'menu_bg');

        this.thumbRows = 2;
        // number of thumbnail cololumns
        this.thumbCols = 3;
        // width of a thumbnail, in pixels
        this.thumbWidth = 120;
        // height of a thumbnail, in pixels
        this.thumbHeight = 120;
        // space among thumbnails, in pixels
        this.thumbSpacing = 8;

        if(!localStorage.getItem('levels')){
          this.levelJson = this.game.cache.getJSON('levelJson');
          this.localStorageLevel = {};
          for(var level in this.levelJson.Levels){
             this.localStorageLevel[level] = level == 1 ? 0 : 4;
          }
          localStorage.setItem('levels', JSON.stringify(this.localStorageLevel));
        }
        this.levelsLocalStorageObject = JSON.parse(localStorage.getItem('levels'));

        /**
        /* object with finished levels and stars collected.
        /* 0 = playable yet unfinished level
        /* 1, 2, 3 = level finished with 1, 2, 3 stars
        /* 4 = locked
        */
        // this.starsArray = [0,3,2,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4];
        this.starsArray = this.levelsLocalStorageObject;

        this.pages;

        this.levelThumbsGroup;

        this.currentPage;

        this.leftArrow;
        this.rightArrow;

  		// this.pages = this.starsArray.length/(this.thumbRows*this.thumbCols);
		this.pages = Object.keys(this.starsArray).length/(this.thumbRows*this.thumbCols);

		this.currentPage = Math.floor(GlobalGame.level/(this.thumbRows*this.thumbCols));
		if(this.currentPage>this.pages-1){
			this.currentPage = this.pages-1;
		}

		this.leftArrow = this.game.add.button(50,this.game.height/2,"sprites",this.arrowClicked,this, 'missions/small_arrow_left_act', 'missions/small_arrow_left_no', 'missions/small_arrow_left_act', 'missions/small_arrow_left_no');
		this.leftArrow.anchor.setTo(0.5);
    this.leftArrow.name = "leftArrow";

		if(this.currentPage==0){
			this.leftArrow.alpha = 0.3;
		}

		this.rightArrow = this.game.add.button(this.game.width - 50,this.game.height/2,"sprites",this.arrowClicked,this, 'missions/small_arrow_right_act', 'missions/small_arrow_right_no', 'missions/small_arrow_right_act', 'missions/small_arrow_right_no');
		this.rightArrow.anchor.setTo(0.5);
    this.rightArrow.name = "rightArrow";

		if(this.currentPage==this.pages-1){
			this.rightArrow.alpha = 0.3;
		}

		this.levelThumbsGroup = this.game.add.group();
    this.levelThumbsGroup.x = - this.game.width;

		var levelLength = this.thumbWidth*this.thumbCols+this.thumbSpacing*(this.thumbCols-1);
		var levelHeight = this.thumbWidth*this.thumbRows+this.thumbSpacing*(this.thumbRows-1);

		for(var l = 0; l < this.pages; l++){

			var offsetX = (this.game.width-levelLength)/2+this.game.width*l;

			// (game.height-levelHeight)/2
//			var offsetY = 120;
			var offsetY = (this.game.height-levelHeight)/2;

		     for(var i = 0; i < this.thumbRows; i ++){
		     	for(var j = 0; j < this.thumbCols; j ++){

					var levelNumber = i*this.thumbCols+j+l*(this.thumbRows*this.thumbCols);

					var levelThumb = this.game.add.button(offsetX+j*(this.thumbWidth+this.thumbSpacing), offsetY+i*(this.thumbHeight+this.thumbSpacing), "sprites", this.thumbClicked, this);
          if(typeof this.starsArray[levelNumber+1] !== 'undefined'){
            var frame = "missions/level_thumb_frame_"+this.starsArray[levelNumber+1];
  					levelThumb.frameName = frame;
  					levelThumb.levelNumber = levelNumber+1;
  					this.levelThumbsGroup.add(levelThumb);
          }
					if(this.starsArray[levelNumber+1]<4){
						var style = {
							font: "60px Cloudy_With_a_Chance_of_Love",
							fill: "#ffffff"
						};
						var levelText = this.game.add.text(levelThumb.x+50,levelThumb.y+this.thumbHeight/2-50,levelNumber+1,style);
						levelText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 1);
						this.levelThumbsGroup.add(levelText);
					}
				}
			}
		}
//		this.levelThumbsGroup.x = this.currentPage * this.game.width * -1;

      this.ribbon = this.game.add.image(this.game.width / 2, 50, 'sprites', 'menu/ribbon');
      this.ribbon.anchor.setTo(0.5);
      this.ribbon.scale.setTo(0.75);

        this.ribbonText = this.game.add.text(-200,-40,"Mission Select",style);
        this.ribbonText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 1);
        this.ribbon.addChild(this.ribbonText);


      this.backButton = this.game.add.button(50, this.game.height - 50, 'sprites', this.backClick, this, 'buttons/button_back_act', 'buttons/button_back_no', 'buttons/button_back_act', 'buttons/button_back_no');
      this.backButton.anchor.setTo(0.5);

      this.game.add.tween(this.levelThumbsGroup).to({ x: this.currentPage * this.game.width * -1 }, 800, Phaser.Easing.Cubic.None, true);

    },
    arrowClicked:function(button){
		if(button.name=="rightArrow" && this.currentPage<this.pages-1){
			this.leftArrow.alpha = 1;
			this.currentPage++;

			if(this.currentPage == this.pages-1){
				button.alpha = 0.3;
			}

			var buttonsTween = this.game.add.tween(this.levelThumbsGroup);
			buttonsTween.to({
				x: this.currentPage * this.game.width * -1
			}, 500, Phaser.Easing.Cubic.None);
			buttonsTween.start();
		}

		if(button.name=="leftArrow" && this.currentPage>0){
			this.rightArrow.alpha = 1;
			this.currentPage--;

			if(this.currentPage == 0){
				button.alpha = 0.3;
			}

			var buttonsTween = this.game.add.tween(this.levelThumbsGroup);
			buttonsTween.to({
				x: this.currentPage * this.game.width * -1
			}, 400, Phaser.Easing.Cubic.None);
			buttonsTween.start();
		}
	},
	thumbClicked: function(button){
		if(button.frameName.replace("missions/level_thumb_frame_", "") < 4){
			GlobalGame.level = button.levelNumber;
            var fadeMenuOut = this.game.add.tween(this.levelThumbsGroup).to({ x: this.game.width }, 800, Phaser.Easing.Cubic.None, true);
            fadeMenuOut.onComplete.add(function() {
                this.game.state.start('selectPlane');
            }, this);
		}
		else{
			var buttonTween = this.game.add.tween(button)
			buttonTween.to({
				alpha: 0.5
			}, 20, Phaser.Easing.Cubic.None);
			buttonTween.to({
				alpha: 1
			}, 20, Phaser.Easing.Cubic.None);
			buttonTween.to({
				alpha: 0.5
			}, 20, Phaser.Easing.Cubic.None);
			buttonTween.to({
				alpha: 1
			}, 20, Phaser.Easing.Cubic.None);
			buttonTween.start();
		}
	},
    backClick: function() {
//        var fadeMenuOut = this.game.add.tween(this.buttonGroup).to({ x: this.game.width }, 1000, Phaser.Easing.Bounce.In, true);
//        fadeMenuOut.onComplete.add(function() {
            this.game.state.start('menu',true,false);
//        }, this);
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
module.exports = Missions;

},{}],28:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
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
            
            GlobalGame.Multiplayer.socket.emit("get room list");
            
            // after the initialize, the server sends a list of
              // all the active rooms
              GlobalGame.Multiplayer.socket.on('roomslist', function(data){
                  console.log(data)
                  for(var i = 0, len = data.rooms.length; i < len; i++){
                       // don't use default room
                       if(data.rooms[i] != ''){
                           var li = document.createElement("li");
                            li.className = "room-list-li";
                            li.innerHTML = data.rooms[i];
                            ul.appendChild(li);
                       }
                  }
              });
            
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
            GlobalGame.Multiplayer.socket.emit('new room', GlobalGame.Multiplayer.room);
            
           var elem=document.getElementsByClassName('room-wrapper')
            elem[0].parentNode.removeChild(elem[0]);
//            this.game.transitions.to('multiplayerRoomDetailView');
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
module.exports = MultiplayerRoomSelect;

},{}],30:[function(require,module,exports){
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

},{"../plugins/socket.io":6,"../prefabs/socketEventHandlers":20}],31:[function(require,module,exports){

'use strict';
var BirdGroup = require('../prefabs/birdGroup');
var Player = require('../prefabs/Player');
var EnemyGroup = require('../prefabs/EnemyGroup');
var Level = require('../prefabs/Level');
var PausePanel = require('../prefabs/PausePanel');
var BasicLayer = require('../prefabs/BasicLayer');

function Play() { }
Play.prototype = {
    preload: function () {
        this.levelJson = this.game.cache.getJSON('levelJson');
        this.currentLevel = this.levelJson.Levels[GlobalGame.level];
        // console.log(this.currentLevel)
    },
    create: function () {
        
        this.level = new Level(this.game, { currentLevel: this.currentLevel });

        this.birdGroup = new BirdGroup(this.game);

        this.player = new Player(this.game, parseInt(this.currentLevel.playerStart.x), parseInt(this.currentLevel.playerStart.y), GlobalGame.player);

        this.enemyGroup = new EnemyGroup(this.game, this.player, { currentLevel: this.currentLevel });
        this.enemyGroup.addEnemy();

        this.pauseButton = this.game.add.button(this.game.width - 100, 20, 'sprites', this.pauseGame, this, 'buttons/button_pause_act', 'buttons/button_pause_no', 'buttons/button_pause_act', 'buttons/button_pause_no');
        this.pauseButton.fixedToCamera = true;
        this.pauseButton.inputEnabled = true;

        // this.createPlayers();
        var basicLayerOptions = {layerText:'Level ' + GlobalGame.level,subLayerText:'Click on the right Side of the Screen to start.', currentLevel: this.currentLevel, currentWave: this.enemyGroup.currentWave};
        var startLayer = new BasicLayer(this.game, undefined, basicLayerOptions);

        this.pausePanel = new PausePanel(this.game);

        // this.zoomTo(GlobalGame.scale);

        this.game.input.onDown.add(this.unpause, this);

        this.currentTimer = this.game.time.create(false);
        this.currentTimer.start();
    },

    update: function () {
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

},{"../prefabs/BasicLayer":7,"../prefabs/EnemyGroup":9,"../prefabs/Level":12,"../prefabs/PausePanel":13,"../prefabs/Player":14,"../prefabs/birdGroup":18}],32:[function(require,module,exports){
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

},{"../plugins/GameController":2,"../plugins/socket.io":6,"../prefabs/BasicLayer":7,"../prefabs/Level":12,"../prefabs/PausePanel":13,"../prefabs/Player":14,"../prefabs/birdGroup":18,"../prefabs/socketEventHandlers":20}],33:[function(require,module,exports){

'use strict';

var Transitions = require('../plugins/phaser-state-transition.min.js');
//var stats = require('../plugins/stats.min.js');
// stats.js - http://github.com/mrdoob/stats.js
var Stats=function(){var l=Date.now(),m=l,g=0,n=Infinity,o=0,h=0,p=Infinity,q=0,r=0,s=0,f=document.createElement("div");f.id="stats";f.addEventListener("mousedown",function(b){b.preventDefault();t(++s%2)},!1);f.style.cssText="width:80px;opacity:0.9;cursor:pointer";var a=document.createElement("div");a.id="fps";a.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#002";f.appendChild(a);var i=document.createElement("div");i.id="fpsText";i.style.cssText="color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";
i.innerHTML="FPS";a.appendChild(i);var c=document.createElement("div");c.id="fpsGraph";c.style.cssText="position:relative;width:74px;height:30px;background-color:#0ff";for(a.appendChild(c);74>c.children.length;){var j=document.createElement("span");j.style.cssText="width:1px;height:30px;float:left;background-color:#113";c.appendChild(j)}var d=document.createElement("div");d.id="ms";d.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#020;display:none";f.appendChild(d);var k=document.createElement("div");
k.id="msText";k.style.cssText="color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";k.innerHTML="MS";d.appendChild(k);var e=document.createElement("div");e.id="msGraph";e.style.cssText="position:relative;width:74px;height:30px;background-color:#0f0";for(d.appendChild(e);74>e.children.length;)j=document.createElement("span"),j.style.cssText="width:1px;height:30px;float:left;background-color:#131",e.appendChild(j);var t=function(b){s=b;switch(s){case 0:a.style.display=
"block";d.style.display="none";break;case 1:a.style.display="none",d.style.display="block"}};return{REVISION:11,domElement:f,setMode:t,begin:function(){l=Date.now()},end:function(){var b=Date.now();g=b-l;n=Math.min(n,g);o=Math.max(o,g);k.textContent=g+" MS ("+n+"-"+o+")";var a=Math.min(30,30-30*(g/200));e.appendChild(e.firstChild).style.height=a+"px";r++;b>m+1E3&&(h=Math.round(1E3*r/(b-m)),p=Math.min(p,h),q=Math.max(q,h),i.textContent=h+" FPS ("+p+"-"+q+")",a=Math.min(30,30-30*(h/100)),c.appendChild(c.firstChild).style.height=
a+"px",m=b,r=0);return b},update:function(){l=this.end()}}};

function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.stage.backgroundColor = '#3498db';

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.asset = this.add.sprite(this.game.width/2 * this.game.world.scale.x,this.game.height/2 * this.game.world.scale.y, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(this.asset);

    //all Sprites
    this.load.atlasJSONHash('sprites', 'assets/spritesheets/sprites.png', 'assets/spritesheets/sprites.json');
    this.load.atlasJSONHash('airplanes', 'assets/spritesheets/airplanes.png', 'assets/spritesheets/airplanes.json');
    this.load.atlasJSONHash('soliders', 'assets/spritesheets/soliders.png', 'assets/spritesheets/soliders.json');
    this.load.atlasJSONHash('flak', 'assets/spritesheets/flak.png', 'assets/spritesheets/flak.json');
    // this.load.atlas('explosion', 'assets/spritesheets/explosion.png', 'assets/spritesheets/explosion.json');

    this.load.json('levelJson', 'assets/levels/levels.json');

    //PLAYER Buttons
    // this.load.spritesheet('buttonvertical', 'assets/img/buttons/button-vertical.png',64,64);
    // this.load.spritesheet('buttonhorizontal', 'assets/img/buttons/button-horizontal.png',96,64);
    // this.load.spritesheet('buttondiagonal', 'assets/img/buttons/button-diagonal.png',64,64);
    // this.load.spritesheet('buttonfire', 'assets/img/buttons/button-round-a.png',96,96);
    // this.load.spritesheet('buttonjump', 'assets/img/buttons/button-round-b.png',96,96);

  },
  create: function() {
    this.asset.cropEnabled = false;
//    if (this.game.device.desktop){
//        var stats = new Stats();
//        stats.setMode(0); // 0: fps, 1: ms
//
//        // Align top-left
//        stats.domElement.style.position = 'absolute';
//        stats.domElement.style.left = '0px';
//        stats.domElement.style.top = '0px';
//
//        document.body.appendChild( stats.domElement );
//
//        setInterval( function () {
//
//            stats.begin();
//
//            // your code goes here
//
//            stats.end();
//
//        }, 1000 / 60 );
//    }
  },

  update: function() {
    if(!!this.ready) {
        /* transition handling  */
//        this.game.transitions = this.game.plugins.add(Phaser.Plugin.StateTransition);
//        this.game.transitions.settings({
//            ease: Phaser.Easing.Bounce.Out,
//            duration: 1000,
//            properties: {
//                alpha: 0,
//                scale: {
//                    x: 0.5,
//                    y: 0.5
//                }
//            }
//        })
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

},{"../plugins/phaser-state-transition.min.js":5}],34:[function(require,module,exports){
'use strict';

var phaseSlider = require('../plugins/phase-slide.js');

  function SelectPlane() {}
  SelectPlane.prototype = {
    init: function(isMultiplayer) {
      this.isMultiplayer = isMultiplayer ? true : false;
    },
    preload: function() {
      this.slider = new phaseSlider(this.game); //make sure to have slider publicly available
    },
    create: function() {

      this.sliderWidth = 600;
      this.sliderHeight = 400;

      this.sliderWidth2 = this.sliderWidth / 2;
      this.sliderHeight2 = this.sliderHeight / 2;

      this.AEG_C_IV_Skin_1 = this.game.add.image(this.sliderWidth2,this.sliderHeight2,"airplanes","Airplanes/AEG_C_IV/Skin_1/default_big");
      this.AEG_C_IV_Skin_1.anchor.setTo(-0.5, 0.5);
      this.AEG_C_IV_Skin_2 = this.game.add.image(this.sliderWidth2,this.sliderHeight2,"airplanes","Airplanes/AEG_C_IV/Skin_2/default_big");
      this.AEG_C_IV_Skin_2.anchor.setTo(-0.5, 0.5);
      this.Fokker_Skin_1 = this.game.add.image(this.sliderWidth2,this.sliderHeight2,"airplanes","Airplanes/Fokker/Skin_1/default_big");
      this.Fokker_Skin_1.anchor.setTo(-0.5, 0.5);
      this.Fokker_Skin_2 = this.game.add.image(this.sliderWidth2,this.sliderHeight2,"airplanes","Airplanes/Fokker/Skin_2/default_big");
      this.Fokker_Skin_2.anchor.setTo(-0.5, 0.5);

      this.planeArray = [this.AEG_C_IV_Skin_1, this.AEG_C_IV_Skin_2, this.Fokker_Skin_1, this.Fokker_Skin_2];

      this.slider.createSlider({
        customSliderBG: false,
        // sliderBG: '#35d2e0',
        mode: "horizontal",
        sliderBGAlpha: 0.7,
        modal: true,
        modalAlpha: 0.7,
        customHandleFrame: "sprites",
        customHandleNext: "missions/small_arrow_right_no",
        customHandlePrev: "missions/small_arrow_left_no",
        width: this.sliderWidth,
        height: this.sliderHeight,
        x: this.game.width / 2 - this.sliderWidth2,
        y: this.game.height / 2 - this.sliderHeight2,
        objects:this.planeArray
      });

      this.acceptButton = this.game.add.image((this.game.width/2 - 80/2), (this.game.height / 2 - 80 / 2)+180, "sprites", "buttons/button_accept_no");
      this.acceptButton.inputEnabled = true;
      this.acceptButton.events.onInputDown.add(function (e, pointer) {
        var index = this.slider.getCurrentIndex();
        GlobalGame.player = this.planeArray[index].frameName.replace("_big", "");
        if(GlobalGame.multiplayer.socket) {
          GlobalGame.multiplayer.enemySprite = GlobalGame.player;
        }
          
        if(this.isMultiplayer) {
          this.game.state.start('playMultiplayer');
        } else {
          this.game.state.start('play');
        }
      },this);


      this.backButton = this.game.add.button(50, this.game.height - 50, 'sprites', this.backClick, this, 'buttons/button_back_act', 'buttons/button_back_no', 'buttons/button_back_act', 'buttons/button_back_no');
      this.backButton.anchor.setTo(0.5);
    },

    backClick: function() {
//        var fadeMenuOut = this.game.add.tween(this.buttonGroup).to({ x: this.game.width }, 1000, Phaser.Easing.Bounce.In, true);
//        fadeMenuOut.onComplete.add(function() {
            this.game.state.start('menu',true,false);
//        }, this);
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
module.exports = SelectPlane;

},{"../plugins/phase-slide.js":4}],35:[function(require,module,exports){
'use strict';
  function Settings() {}
  Settings.prototype = {
    preload: function() {
      // Override this method to add some load operations. 
      // If you need to use the loader, you may need to use them here.
    },
    create: function() {
      this.backButton = this.game.add.button(50, this.game.height - 50, 'sprites', this.backClick, this, 'buttons/button_back_act', 'buttons/button_back_no', 'buttons/button_back_act', 'buttons/button_back_no');
      this.backButton.anchor.setTo(0.5);
    },
    backClick: function() {
//        var fadeMenuOut = this.game.add.tween(this.buttonGroup).to({ x: this.game.width }, 1000, Phaser.Easing.Bounce.In, true);
//        fadeMenuOut.onComplete.add(function() {
            this.game.state.start('menu',true,false);
//        }, this);
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
module.exports = Settings;

},{}],36:[function(require,module,exports){
'use strict';
  var BirdGroup = require('../prefabs/birdGroup');
  var Player = require('../prefabs/Player');
  var EnemyGroup = require('../prefabs/EnemyGroup');
  var Level = require('../prefabs/Level');
  var PausePanel = require('../prefabs/PausePanel');
  var BasicLayer = require('../prefabs/BasicLayer');

  function Tutorial() {}
  Tutorial.prototype = {
    create: function() {
      this.levelJson = this.game.cache.getJSON('levelJson');
      this.currentLevel = this.levelJson.Levels[GlobalGame.level];

      this.level = new Level(this.game, {currentLevel: this.currentLevel});

      this.birdGroup = new BirdGroup(this.game);

      this.player = new Player(this.game, this.currentLevel.playerStart.x, this.currentLevel.playerStart.y, GlobalGame.player);

      this.enemyGroup = new EnemyGroup(this.game, this.player, {currentLevel: this.currentLevel});
      this.enemyGroup.addEnemy();

      if(!GlobalGame.tutorialPlayed) {
        this.basicLayer = new BasicLayer(this.game, undefined, {layerText:'Welcome to the Tutorial',subLayerText:'Here you can practice how to play this game. Click on the right Side of the Screen to start.'})
      } else {
        this.createPlayers();
      }

      this.pauseButton = this.game.add.button(this.game.width - 100, 20, 'sprites', this.pauseGame, this, 'buttons/button_pause_act', 'buttons/button_pause_no', 'buttons/button_pause_act', 'buttons/button_pause_no');
      this.pauseButton.fixedToCamera = true;
      this.pauseButton.inputEnabled = true;

      this.pausePanel = new PausePanel(this.game);
      if(!GlobalGame.tutorialPlayed) {
        this.game.input.onDown.add(this.unpause, this);
      }
    },
    update: function() {
      this.enemyGroup.forEachAlive(function(enemy){
         this.game.physics.arcade.overlap(enemy, this.player.bullets, enemy.enemyLoseHealth, null, enemy);
         this.game.physics.arcade.overlap(this.player, enemy.bullets, this.player.playerHitsSomething, null, this.player);
          if(!enemy.inCamera){
              enemy.arrow.visible = true;
              enemy.arrow.rotation = this.game.physics.arcade.angleBetween(enemy.arrow, enemy);
          }else {
              enemy.arrow.visible = false;
          }
      }, this)
    },
    createPlayers: function(){
//        this.basicLayer.removeAll();

        this.game.add.existing(this.player);
        if(!this.player.alive){
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
  	    this.game.state.start('menu',true,false);
  	},

    paused: function() {
    },

    pauseGame: function(){
        if(!this.game.paused){
            // Enter pause
            this.pausePanel.show(function(){
                 this.game.paused = true;
                 this.pauseButton.visible = false;
            });
        }
    },

    playGame: function(){
        if(this.game.paused){
                // Leaving pause
                this.pausePanel.hide();
                this.game.paused =false;
                this.pauseButton.visible = true;
        }
    },
    unpause: function(event){
        if(this.game.paused){
            var w = this.game.width,
                h = this.game.height,
                x1 = w/2 - 260/2, x2 = w/2 + 245/2,
                y1 = h/2 - 90/2, y2 = h/2 + 90/2;

            // Check if the click was inside the menu
            if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){
                // Get menu local coordinates for the click
                var x = event.x - x1,
                    y = event.y - y1;

                // Calculate the choice
                var choise = Math.floor(x / 100) + 3*Math.floor(y / 100);
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
            } else{
                this.playGame();
            }
        }
    }
  };
module.exports = Tutorial;

},{"../prefabs/BasicLayer":7,"../prefabs/EnemyGroup":9,"../prefabs/Level":12,"../prefabs/PausePanel":13,"../prefabs/Player":14,"../prefabs/birdGroup":18}]},{},[1])