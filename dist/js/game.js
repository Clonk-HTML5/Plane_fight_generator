(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(Math.ceil(480*window.innerWidth/500) , 500, Phaser.CANVAS, 'plane_fight');

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
  game.state.add('settings', require('./states/settings'));
  

  game.state.start('boot');
};
},{"./states/Level2":19,"./states/boot":20,"./states/gameover":21,"./states/help":22,"./states/menu":23,"./states/missions":24,"./states/multiplayerRoomDetailView":25,"./states/multiplayerRoomSelect":26,"./states/multiplayerUserSignIn":27,"./states/play":28,"./states/playMultiplayer":29,"./states/preload":30,"./states/settings":31}],2:[function(require,module,exports){
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
// define(['phaser'], function(Phaser) {
//     function Gesture(game) {
//         this.game = game;
//
//         this.swipeDispatched = false;
//         this.holdDispatched = false;
//
//         this.isTouching = false;
//         this.isHolding = false;
//
//         this.onSwipe = new Phaser.Signal();
//         this.onTap = new Phaser.Signal();
//         this.onHold = new Phaser.Signal();
//
//     }
//
//     Gesture.prototype.update = function() {
//         var distance = Phaser.Point.distance(this.game.input.activePointer.position, this.game.input.activePointer.positionDown);
//         var duration = this.game.input.activePointer.duration;
//
//         this.updateSwipe(distance, duration);
//         this.updateTouch(distance, duration);
//     };
//
//     Gesture.prototype.updateSwipe = function(distance, duration) {
//         if (duration === -1) {
//             this.swipeDispatched = false;
//         } else if (!this.swipeDispatched && distance > 150 &&  duration > 100 && duration < Gesture.TIMES.SWIPE) {
//             var positionDown = this.game.input.activePointer.positionDown;
//             this.onSwipe.dispatch(this, positionDown);
//
//             this.swipeDispatched = true;
//         }
//     };
//
//     Gesture.prototype.updateTouch = function(distance, duration) {
//         var positionDown = this.game.input.activePointer.positionDown;
//
//         if (duration === -1) {
//                     if (this.isTouching) {
//                 this.onTap.dispatch(this, positionDown);
//             }
//
//             this.isTouching = false;
//             this.isHolding = false;
//             this.holdDispatched = false;
//
//         } else if (distance < 10) {
//             if (duration < Gesture.TIMES.HOLD) {
//                 this.isTouching = true;
//             } else {
//                 this.isTouching = false;
//                 this.isHolding = true;
//
//                 if (!this.holdDispatched) {
//                     this.holdDispatched = true;
//
//                     this.onHold.dispatch(this, positionDown);
//                 }
//             }
//         } else {
//             this.isTouching = false;
//             this.isHolding = false;
//         }
//     };
//
//     Gesture.SWIPE = 0;
//     Gesture.TAP = 1;
//     Gesture.HOLD = 2;
//
//     Gesture.TIMES = {
//         HOLD: 150,
//         SWIPE: 250
//     };
//
//     return Gesture;
// });


/**
 * Phaser Gesture Plugin
 * @author       Christian Schmitt
 * @license      {@link http://opensource.org/licenses/MIT}
 * @version 1.0.1
 */

(function (Phaser) {
    'use strict';

    /**
    *
    * @class Phaser.Plugin.Gesture
    * @constructor
    * @param {Object} game - The Game object is the instance of the game, where the magic happens.
    * @param {Any} parent  - The object that owns this plugin, usually Phaser.PluginManager.
    */
    Phaser.Plugin.Gesture = function (game, parent) {
        Phaser.Plugin.call(this, game, parent);

        this.game = game;

        this.swipeDispatched = false;
        this.holdDispatched = false;

        this.isTouching = false;
        this.isHolding = false;

        this.onSwipe = new Phaser.Signal();
        this.onTap = new Phaser.Signal();
        this.onHold = new Phaser.Signal();

        this.swipe = 0;
        this.tab = 1;
        this.hold = 2;

        this.SWIPE = 0;
        this.TAP = 1;
        this.HOLD = 2;

        this.times = {
            HOLD: 150,
            SWIPE: 250
        };
    };

    Phaser.Plugin.Gesture.prototype = Object.create(Phaser.Plugin.prototype);
    Phaser.Plugin.Gesture.prototype.constructor = Phaser.Plugin.Gesture;

    /**
    * Change Default Settings of the plugin
    *
    * @method Phaser.Plugin.KineticScrolling#configure
    */
    Phaser.Plugin.Gesture.prototype.update = function() {
        var distance = Phaser.Point.distance(this.game.input.activePointer.position, this.game.input.activePointer.positionDown);
        var duration = this.game.input.activePointer.duration;

        this.updateSwipe(distance, duration);
        this.updateTouch(distance, duration);
    };

    Phaser.Plugin.Gesture.prototype.updateSwipe = function(distance, duration) {
        if (duration === -1) {
            this.swipeDispatched = false;
        } else if (!this.swipeDispatched && distance > 150 &&  duration > 100 && duration < this.times.SWIPE) {
            var positionDown = this.game.input.activePointer.positionDown;
            this.onSwipe.dispatch(this, positionDown);

            this.swipeDispatched = true;
        }
    };

    Phaser.Plugin.Gesture.prototype.updateTouch = function(distance, duration) {
        var positionDown = this.game.input.activePointer.positionDown;

        if (duration === -1) {
                    if (this.isTouching) {
                this.onTap.dispatch(this, positionDown);
            }

            this.isTouching = false;
            this.isHolding = false;
            this.holdDispatched = false;

        } else if (distance < 10) {
            if (duration < this.times.HOLD) {
                this.isTouching = true;
            } else {
                this.isTouching = false;
                this.isHolding = true;

                if (!this.holdDispatched) {
                    this.holdDispatched = true;

                    this.onHold.dispatch(this, positionDown);
                }
            }
        } else {
            this.isTouching = false;
            this.isHolding = false;
        }
    };

} (Phaser));

},{}],4:[function(require,module,exports){
'use strict';
/**
* A Sample Plugin demonstrating how to hook into the Phaser plugin system.
*/
function initWatchVal() {}

Phaser.Plugin.HUDManager = function (game, parent, name, pollRate) {

  Phaser.Plugin.call(this, game, parent);

  this.pollRate = pollRate || 100;
  this.digestTimer = this.game.time.events.loop(this.pollRate, this.$digest, this);
  this.digestTimer.timer.start();
  this.$$watchers = [];
  this.$$lastDirtyWatch = null;
  this.name = name || Phaser.Plugin.HUDManager.hudCounter++;
};

Phaser.Plugin.HUDManager.huds = {};
Phaser.Plugin.HUDManager.hudCounter = 0;

Phaser.Plugin.HUDManager.HEALTHBAR = function(percent) {
  if (percent <= 0.25) {
    return '#ff7474'; //red
  }
  if (percent <= 0.75) {
    return '#eaff74'; //yellow
  }
  return '#74ff74'; //green
};


Phaser.Plugin.HUDManager.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.HUDManager.prototype.constructor = Phaser.Plugin.HUDManager;



Phaser.Plugin.HUDManager.create = function(game, parent, name, pollrate) {

  var hud = Phaser.Plugin.HUDManager.huds[name];
  if(!!hud) {
    return hud;
  }
  name = name || Phaser.Plugin.HUDManager.hudCounter++;
  hud = new Phaser.Plugin.HUDManager(game, parent, name, pollrate);
  Phaser.Plugin.HUDManager.huds[name] = hud;
  return hud;
};

Phaser.Plugin.HUDManager.get = function(name) {
    var hud = Phaser.Plugin.HUDManager.huds[name];
    if(hud) {
      return hud;
    } else {
      throw 'HUD "' + name + '" not found';
    }
};


Phaser.Plugin.HUDManager.prototype.destroy = function() {
 delete Phaser.Plugin.HUDManager.huds[this.name];
 this.$$watchers = [];
};

Phaser.Plugin.HUDManager.prototype.$watch = function(watchFn, listenerFn) {
  var watcher = {
    watchFn: watchFn,
    listenerFn: listenerFn || function() {},
    last: initWatchVal,
  };
  this.$$watchers.push(watcher);
  this.$$lastDirtyWatch = null;
  var self = this;
  return function() {
    var index = self.$$watchers.indexOf(watcher);
    if (index >= 0) {
      self.$$watchers.splice(index, 1);
    }
  };
};



Phaser.Plugin.HUDManager.prototype.$digestOnce = function() {
  var newValue, oldValue, dirty;
  this.$$watchers.forEach(function(watcher) {
    newValue = watcher.watchFn(this);
    oldValue = watcher.last;
    if(newValue !== oldValue) {
      this.$$lastDirtyWatch = watcher;
      watcher.last = newValue;
      watcher.listenerFn(newValue, (oldValue == initWatchVal ? newValue: oldValue), this);
      dirty = true;
    } else if (this.$$lastDirtyWatch === watcher) {
      return false;
    }
  }, this);
  return dirty;
};

Phaser.Plugin.HUDManager.prototype.$digest = function() {
  var ttl = 10;
  
  var self = this;

  this.$$lastDirtyWatch = null;
  function digest() {
    var dirty = self.$digestOnce();
    if (dirty && !(ttl--)) {
      throw "10 Digest Iterations Reached";
    }
    if(dirty) {
      setTimeout(digest, 0);
    }
  }
  setTimeout(digest, 0);
    
};

Phaser.Plugin.HUDManager.prototype.addText = function(x, y, label, style, watched, context) {
  var text = this.game.add.text(x, y, label, style);
  context = context || window;
  var dereg = this.$watch(function() {
      return context[watched];
    }, function() {
      text.setText(label + context[watched]);
  });
  return {text: text, deregister: dereg};
};

Phaser.Plugin.HUDManager.prototype.addBar = function(x, y, width, height, max, watched, context, color, backgroundColor) {
  max = max || 100;

  color = color || 'white';
  backgroundColor = backgroundColor || '#999';

  var colorFunction = function() { return color; };

  if(typeof color === 'function' ) {
    colorFunction = color;
  }

  
  var bmd = this.game.add.bitmapData(width, height);
  context = context || window;
  var bar = this.game.add.sprite(x, y, bmd);
  var dereg = this.$watch(function() {
    return context[watched];
  }, function(newVal) {
    var percent = newVal / max;
    if((percent <= 1 && percent >= 0)) {
      bmd.clear();
      bmd.ctx.beginPath();
      bmd.ctx.moveTo(0,0);
      bmd.ctx.rect(0,0, width, height);
      bmd.ctx.closePath();
      bmd.ctx.fillStyle = backgroundColor;
      bmd.ctx.fill();
      bmd.ctx.beginPath();
      bmd.ctx.rect(0,0,width*percent, height);
      bmd.ctx.fillStyle = colorFunction(percent);
      bmd.ctx.fill();
      bmd.ctx.closePath();
      bmd.render();
//      bmd.refreshBuffer();
    } 
  });

  return {bar: bar,  deregister: dereg};
};


Phaser.Plugin.HUDManager.prototype.addWatch = function(watched, watchedContext, callback, callbackContext) {
  watchedContext = watchedContext || window;
  callbackContext = callbackContext || window;
  var dereg = this.$watch(function() {
    return watchedContext[watched];
  }, function(newVal, oldVal) {
    callback.call(callbackContext, newVal, oldVal);
  });
  return dereg;
};



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
/*! Socket.IO.js build:0.9.16, development. Copyright(c) 2011 LearnBoost <dev@learnboost.com> MIT Licensed */

var io = ('undefined' === typeof module ? {} : module.exports);
(function() {

    /**
     * socket.io
     * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
     * MIT Licensed
     */

    (function (exports, global) {

        /**
         * IO namespace.
         *
         * @namespace
         */

        var io = exports;

        /**
         * Socket.IO version
         *
         * @api public
         */

        io.version = '0.9.16';

        /**
         * Protocol implemented.
         *
         * @api public
         */

        io.protocol = 1;

        /**
         * Available transports, these will be populated with the available transports
         *
         * @api public
         */

        io.transports = [];

        /**
         * Keep track of jsonp callbacks.
         *
         * @api private
         */

        io.j = [];

        /**
         * Keep track of our io.Sockets
         *
         * @api private
         */
        io.sockets = {};


        /**
         * Manages connections to hosts.
         *
         * @param {String} uri
         * @Param {Boolean} force creation of new socket (defaults to false)
         * @api public
         */

        io.connect = function (host, details) {
            var uri = io.util.parseUri(host)
                , uuri
                , socket;

            if (global && global.location) {
                uri.protocol = uri.protocol || global.location.protocol.slice(0, -1);
                uri.host = uri.host || (global.document
                    ? global.document.domain : global.location.hostname);
                uri.port = uri.port || global.location.port;
            }

            uuri = io.util.uniqueUri(uri);

            var options = {
                host: uri.host
                , secure: 'https' == uri.protocol
                , port: uri.port || ('https' == uri.protocol ? 443 : 80)
                , query: uri.query || ''
            };

            io.util.merge(options, details);

            if (options['force new connection'] || !io.sockets[uuri]) {
                socket = new io.Socket(options);
            }

            if (!options['force new connection'] && socket) {
                io.sockets[uuri] = socket;
            }

            socket = socket || io.sockets[uuri];

            // if path is different _id '' or /
            return socket.of(uri.path.length > 1 ? uri.path : '');
        };

    })('object' === typeof module ? module.exports : (this.io = {}), this);
    /**
     * socket.io
     * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
     * MIT Licensed
     */

    (function (exports, global) {

        /**
         * Utilities namespace.
         *
         * @namespace
         */

        var util = exports.util = {};

        /**
         * Parses an URI
         *
         * @author Steven Levithan <stevenlevithan.com> (MIT license)
         * @api public
         */

        var re = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

        var parts = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password',
            'host', 'port', 'relative', 'path', 'directory', 'file', 'query',
            'anchor'];

        util.parseUri = function (str) {
            var m = re.exec(str || '')
                , uri = {}
                , i = 14;

            while (i--) {
                uri[parts[i]] = m[i] || '';
            }

            return uri;
        };

        /**
         * Produces a unique url that identifies a Socket.IO connection.
         *
         * @param {Object} uri
         * @api public
         */

        util.uniqueUri = function (uri) {
            var protocol = uri.protocol
                , host = uri.host
                , port = uri.port;

            if ('document' in global) {
                host = host || document.domain;
                port = port || (protocol == 'https'
                    && document.location.protocol !== 'https:' ? 443 : document.location.port);
            } else {
                host = host || 'localhost';

                if (!port && protocol == 'https') {
                    port = 443;
                }
            }

            return (protocol || 'http') + '://' + host + ':' + (port || 80);
        };

        /**
         * Mergest 2 query strings in to once unique query string
         *
         * @param {String} base
         * @param {String} addition
         * @api public
         */

        util.query = function (base, addition) {
            var query = util.chunkQuery(base || '')
                , components = [];

            util.merge(query, util.chunkQuery(addition || ''));
            for (var part in query) {
                if (query.hasOwnProperty(part)) {
                    components.push(part + '=' + query[part]);
                }
            }

            return components.length ? '?' + components.join('&') : '';
        };

        /**
         * Transforms a querystring in to an object
         *
         * @param {String} qs
         * @api public
         */

        util.chunkQuery = function (qs) {
            var query = {}
                , params = qs.split('&')
                , i = 0
                , l = params.length
                , kv;

            for (; i < l; ++i) {
                kv = params[i].split('=');
                if (kv[0]) {
                    query[kv[0]] = kv[1];
                }
            }

            return query;
        };

        /**
         * Executes the given function when the page is loaded.
         *
         *     io.util.load(function () { console.log('page loaded'); });
         *
         * @param {Function} fn
         * @api public
         */

        var pageLoaded = false;

        util.load = function (fn) {
            if ('document' in global && document.readyState === 'complete' || pageLoaded) {
                return fn();
            }

            util.on(global, 'load', fn, false);
        };

        /**
         * Adds an event.
         *
         * @api private
         */

        util.on = function (element, event, fn, capture) {
            if (element.attachEvent) {
                element.attachEvent('on' + event, fn);
            } else if (element.addEventListener) {
                element.addEventListener(event, fn, capture);
            }
        };

        /**
         * Generates the correct `XMLHttpRequest` for regular and cross domain requests.
         *
         * @param {Boolean} [xdomain] Create a request that can be used cross domain.
         * @returns {XMLHttpRequest|false} If we can create a XMLHttpRequest.
         * @api private
         */

        util.request = function (xdomain) {

            if (xdomain && 'undefined' != typeof XDomainRequest && !util.ua.hasCORS) {
                return new XDomainRequest();
            }

            if ('undefined' != typeof XMLHttpRequest && (!xdomain || util.ua.hasCORS)) {
                return new XMLHttpRequest();
            }

            if (!xdomain) {
                try {
                    return new window[(['Active'].concat('Object').join('X'))]('Microsoft.XMLHTTP');
                } catch(e) { }
            }

            return null;
        };

        /**
         * XHR based transport constructor.
         *
         * @constructor
         * @api public
         */

        /**
         * Change the internal pageLoaded value.
         */

        if ('undefined' != typeof window) {
            util.load(function () {
                pageLoaded = true;
            });
        }

        /**
         * Defers a function to ensure a spinner is not displayed by the browser
         *
         * @param {Function} fn
         * @api public
         */

        util.defer = function (fn) {
            if (!util.ua.webkit || 'undefined' != typeof importScripts) {
                return fn();
            }

            util.load(function () {
                setTimeout(fn, 100);
            });
        };

        /**
         * Merges two objects.
         *
         * @api public
         */

        util.merge = function merge (target, additional, deep, lastseen) {
            var seen = lastseen || []
                , depth = typeof deep == 'undefined' ? 2 : deep
                , prop;

            for (prop in additional) {
                if (additional.hasOwnProperty(prop) && util.indexOf(seen, prop) < 0) {
                    if (typeof target[prop] !== 'object' || !depth) {
                        target[prop] = additional[prop];
                        seen.push(additional[prop]);
                    } else {
                        util.merge(target[prop], additional[prop], depth - 1, seen);
                    }
                }
            }

            return target;
        };

        /**
         * Merges prototypes _id objects
         *
         * @api public
         */

        util.mixin = function (ctor, ctor2) {
            util.merge(ctor.prototype, ctor2.prototype);
        };

        /**
         * Shortcut for prototypical and static inheritance.
         *
         * @api private
         */

        util.inherit = function (ctor, ctor2) {
            function f() {};
            f.prototype = ctor2.prototype;
            ctor.prototype = new f;
        };

        /**
         * Checks if the given object is an Array.
         *
         *     io.util.isArray([]); // true
         *     io.util.isArray({}); // false
         *
         * @param Object obj
         * @api public
         */

        util.isArray = Array.isArray || function (obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        };

        /**
         * Intersects values of two arrays into a third
         *
         * @api public
         */

        util.intersect = function (arr, arr2) {
            var ret = []
                , longest = arr.length > arr2.length ? arr : arr2
                , shortest = arr.length > arr2.length ? arr2 : arr;

            for (var i = 0, l = shortest.length; i < l; i++) {
                if (~util.indexOf(longest, shortest[i]))
                    ret.push(shortest[i]);
            }

            return ret;
        };

        /**
         * Array indexOf compatibility.
         *
         * @see bit.ly/a5Dxa2
         * @api public
         */

        util.indexOf = function (arr, o, i) {

            for (var j = arr.length, i = i < 0 ? i + j < 0 ? 0 : i + j : i || 0;
                 i < j && arr[i] !== o; i++) {}

            return j <= i ? -1 : i;
        };

        /**
         * Converts enumerables to array.
         *
         * @api public
         */

        util.toArray = function (enu) {
            var arr = [];

            for (var i = 0, l = enu.length; i < l; i++)
                arr.push(enu[i]);

            return arr;
        };

        /**
         * UA / engines detection namespace.
         *
         * @namespace
         */

        util.ua = {};

        /**
         * Whether the UA supports CORS for XHR.
         *
         * @api public
         */

        util.ua.hasCORS = 'undefined' != typeof XMLHttpRequest && (function () {
            try {
                var a = new XMLHttpRequest();
            } catch (e) {
                return false;
            }

            return a.withCredentials != undefined;
        })();

        /**
         * Detect webkit.
         *
         * @api public
         */

        util.ua.webkit = 'undefined' != typeof navigator
            && /webkit/i.test(navigator.userAgent);

        /**
         * Detect iPad/iPhone/iPod.
         *
         * @api public
         */

        util.ua.iDevice = 'undefined' != typeof navigator
            && /iPad|iPhone|iPod/i.test(navigator.userAgent);

    })('undefined' != typeof io ? io : module.exports, this);
    /**
     * socket.io
     * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
     * MIT Licensed
     */

    (function (exports, io) {

        /**
         * Expose constructor.
         */

        exports.EventEmitter = EventEmitter;

        /**
         * Event emitter constructor.
         *
         * @api public.
         */

        function EventEmitter () {};

        /**
         * Adds a listener
         *
         * @api public
         */

        EventEmitter.prototype.on = function (name, fn) {
            if (!this.$events) {
                this.$events = {};
            }

            if (!this.$events[name]) {
                this.$events[name] = fn;
            } else if (io.util.isArray(this.$events[name])) {
                this.$events[name].push(fn);
            } else {
                this.$events[name] = [this.$events[name], fn];
            }

            return this;
        };

        EventEmitter.prototype.addListener = EventEmitter.prototype.on;

        /**
         * Adds a volatile listener.
         *
         * @api public
         */

        EventEmitter.prototype.once = function (name, fn) {
            var self = this;

            function on () {
                self.removeListener(name, on);
                fn.apply(this, arguments);
            };

            on.listener = fn;
            this.on(name, on);

            return this;
        };

        /**
         * Removes a listener.
         *
         * @api public
         */

        EventEmitter.prototype.removeListener = function (name, fn) {
            if (this.$events && this.$events[name]) {
                var list = this.$events[name];

                if (io.util.isArray(list)) {
                    var pos = -1;

                    for (var i = 0, l = list.length; i < l; i++) {
                        if (list[i] === fn || (list[i].listener && list[i].listener === fn)) {
                            pos = i;
                            break;
                        }
                    }

                    if (pos < 0) {
                        return this;
                    }

                    list.splice(pos, 1);

                    if (!list.length) {
                        delete this.$events[name];
                    }
                } else if (list === fn || (list.listener && list.listener === fn)) {
                    delete this.$events[name];
                }
            }

            return this;
        };

        /**
         * Removes all listeners for an event.
         *
         * @api public
         */

        EventEmitter.prototype.removeAllListeners = function (name) {
            if (name === undefined) {
                this.$events = {};
                return this;
            }

            if (this.$events && this.$events[name]) {
                this.$events[name] = null;
            }

            return this;
        };

        /**
         * Gets all listeners for a certain event.
         *
         * @api publci
         */

        EventEmitter.prototype.listeners = function (name) {
            if (!this.$events) {
                this.$events = {};
            }

            if (!this.$events[name]) {
                this.$events[name] = [];
            }

            if (!io.util.isArray(this.$events[name])) {
                this.$events[name] = [this.$events[name]];
            }

            return this.$events[name];
        };

        /**
         * Emits an event.
         *
         * @api public
         */

        EventEmitter.prototype.emit = function (name) {
            if (!this.$events) {
                return false;
            }

            var handler = this.$events[name];

            if (!handler) {
                return false;
            }

            var args = Array.prototype.slice.call(arguments, 1);

            if ('function' == typeof handler) {
                handler.apply(this, args);
            } else if (io.util.isArray(handler)) {
                var listeners = handler.slice();

                for (var i = 0, l = listeners.length; i < l; i++) {
                    listeners[i].apply(this, args);
                }
            } else {
                return false;
            }

            return true;
        };

    })(
            'undefined' != typeof io ? io : module.exports
            , 'undefined' != typeof io ? io : module.parent.exports
        );

    /**
     * socket.io
     * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
     * MIT Licensed
     */

    /**
     * Based on JSON2 (http://www.JSON.org/js.html).
     */

    (function (exports, nativeJSON) {
        "use strict";

        // use native JSON if it's available
        if (nativeJSON && nativeJSON.parse){
            return exports.JSON = {
                parse: nativeJSON.parse
                , stringify: nativeJSON.stringify
            };
        }

        var JSON = exports.JSON = {};

        function f(n) {
            // Format integers to have at least two digits.
            return n < 10 ? '0' + n : n;
        }

        function date(d, key) {
            return isFinite(d.valueOf()) ?
                d.getUTCFullYear()     + '-' +
                    f(d.getUTCMonth() + 1) + '-' +
                    f(d.getUTCDate())      + 'T' +
                    f(d.getUTCHours())     + ':' +
                    f(d.getUTCMinutes())   + ':' +
                    f(d.getUTCSeconds())   + 'Z' : null;
        };

        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            gap,
            indent,
            meta = {    // table of character substitutions
                '\b': '\\b',
                '\t': '\\t',
                '\n': '\\n',
                '\f': '\\f',
                '\r': '\\r',
                '"' : '\\"',
                '\\': '\\\\'
            },
            rep;


        function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

            escapable.lastIndex = 0;
            return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' : '"' + string + '"';
        }


        function str(key, holder) {

// Produce a string _id holder[key].

            var i,          // The loop counter.
                k,          // The member key.
                v,          // The member value.
                length,
                mind = gap,
                partial,
                value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

            if (value instanceof Date) {
                value = date(key);
            }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

            if (typeof rep === 'function') {
                value = rep.call(holder, key, value);
            }

// What happens next depends on the value's type.

            switch (typeof value) {
                case 'string':
                    return quote(value);

                case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

                    return isFinite(value) ? String(value) : 'null';

                case 'boolean':
                case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

                    return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

                case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

                    if (!value) {
                        return 'null';
                    }

// Make an array to hold the partial results of stringifying this object value.

                    gap += indent;
                    partial = [];

// Is the value an array?

                    if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                        length = value.length;
                        for (i = 0; i < length; i += 1) {
                            partial[i] = str(i, value) || 'null';
                        }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                        v = partial.length === 0 ? '[]' : gap ?
                            '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' :
                            '[' + partial.join(',') + ']';
                        gap = mind;
                        return v;
                    }

// If the replacer is an array, use it to select the members to be stringified.

                    if (rep && typeof rep === 'object') {
                        length = rep.length;
                        for (i = 0; i < length; i += 1) {
                            if (typeof rep[i] === 'string') {
                                k = rep[i];
                                v = str(k, value);
                                if (v) {
                                    partial.push(quote(k) + (gap ? ': ' : ':') + v);
                                }
                            }
                        }
                    } else {

// Otherwise, iterate through all of the keys in the object.

                        for (k in value) {
                            if (Object.prototype.hasOwnProperty.call(value, k)) {
                                v = str(k, value);
                                if (v) {
                                    partial.push(quote(k) + (gap ? ': ' : ':') + v);
                                }
                            }
                        }
                    }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

                    v = partial.length === 0 ? '{}' : gap ?
                        '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
                        '{' + partial.join(',') + '}';
                    gap = mind;
                    return v;
            }
        }

// If the JSON object does not yet have a stringify method, give it one.

        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };

// If the JSON object does not yet have a parse method, give it one.

        JSON.parse = function (text, reviver) {
            // The parse method takes a text and an optional reviver function, and returns
            // a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

                // The walk method is used to recursively walk the resulting structure so
                // that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


            // Parsing happens in four stages. In the first stage, we replace certain
            // Unicode characters with escape sequences. JavaScript handles many characters
            // incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

            // In the second stage, we run the text against regular expressions that look
            // for non-JSON patterns. We are especially concerned with '()' and 'new'
            // because they can cause invocation, and '=' because it can cause mutation.
            // But just to be safe, we want to reject all unexpected forms.

            // We split the second stage into 4 regexp operations in order to work around
            // crippling inefficiencies in IE's and Safari's regexp engines. First we
            // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
            // replace all simple value tokens with ']' characters. Third, we delete all
            // open brackets that follow a colon or comma or that begin the text. Finally,
            // we look to see that the remaining characters are only whitespace or ']' or
            // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                    .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                    .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

                // In the third stage we use the eval function to compile the text into a
                // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
                // in JavaScript: it can begin a block or an object literal. We wrap the text
                // in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

                // In the optional fourth stage, we recursively walk the new structure, passing
                // each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

            // If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };

    })(
            'undefined' != typeof io ? io : module.exports
            , typeof JSON !== 'undefined' ? JSON : undefined
        );

    /**
     * socket.io
     * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
     * MIT Licensed
     */

    (function (exports, io) {

        /**
         * Parser namespace.
         *
         * @namespace
         */

        var parser = exports.parser = {};

        /**
         * Packet types.
         */

        var packets = parser.packets = [
            'disconnect'
            , 'connect'
            , 'heartbeat'
            , 'message'
            , 'json'
            , 'event'
            , 'ack'
            , 'error'
            , 'noop'
        ];

        /**
         * Errors reasons.
         */

        var reasons = parser.reasons = [
            'transport not supported'
            , 'client not handshaken'
            , 'unauthorized'
        ];

        /**
         * Errors advice.
         */

        var advice = parser.advice = [
            'reconnect'
        ];

        /**
         * Shortcuts.
         */

        var JSON = io.JSON
            , indexOf = io.util.indexOf;

        /**
         * Encodes a packet.
         *
         * @api private
         */

        parser.encodePacket = function (packet) {
            var type = indexOf(packets, packet.type)
                , id = packet.id || ''
                , endpoint = packet.endpoint || ''
                , ack = packet.ack
                , data = null;

            switch (packet.type) {
                case 'error':
                    var reason = packet.reason ? indexOf(reasons, packet.reason) : ''
                        , adv = packet.advice ? indexOf(advice, packet.advice) : '';

                    if (reason !== '' || adv !== '')
                        data = reason + (adv !== '' ? ('+' + adv) : '');

                    break;

                case 'message':
                    if (packet.data !== '')
                        data = packet.data;
                    break;

                case 'event':
                    var ev = { name: packet.name };

                    if (packet.args && packet.args.length) {
                        ev.args = packet.args;
                    }

                    data = JSON.stringify(ev);
                    break;

                case 'json':
                    data = JSON.stringify(packet.data);
                    break;

                case 'connect':
                    if (packet.qs)
                        data = packet.qs;
                    break;

                case 'ack':
                    data = packet.ackId
                        + (packet.args && packet.args.length
                        ? '+' + JSON.stringify(packet.args) : '');
                    break;
            }

            // construct packet with required fragments
            var encoded = [
                type
                , id + (ack == 'data' ? '+' : '')
                , endpoint
            ];

            // data fragment is optional
            if (data !== null && data !== undefined)
                encoded.push(data);

            return encoded.join(':');
        };

        /**
         * Encodes multiple messages (payload).
         *
         * @param {Array} messages
         * @api private
         */

        parser.encodePayload = function (packets) {
            var decoded = '';

            if (packets.length == 1)
                return packets[0];

            for (var i = 0, l = packets.length; i < l; i++) {
                var packet = packets[i];
                decoded += '\ufffd' + packet.length + '\ufffd' + packets[i];
            }

            return decoded;
        };

        /**
         * Decodes a packet
         *
         * @api private
         */

        var regexp = /([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;

        parser.decodePacket = function (data) {
            var pieces = data.match(regexp);

            if (!pieces) return {};

            var id = pieces[2] || ''
                , data = pieces[5] || ''
                , packet = {
                    type: packets[pieces[1]]
                    , endpoint: pieces[4] || ''
                };

            // whether we need to acknowledge the packet
            if (id) {
                packet.id = id;
                if (pieces[3])
                    packet.ack = 'data';
                else
                    packet.ack = true;
            }

            // handle different packet types
            switch (packet.type) {
                case 'error':
                    var pieces = data.split('+');
                    packet.reason = reasons[pieces[0]] || '';
                    packet.advice = advice[pieces[1]] || '';
                    break;

                case 'message':
                    packet.data = data || '';
                    break;

                case 'event':
                    try {
                        var opts = JSON.parse(data);
                        packet.name = opts.name;
                        packet.args = opts.args;
                    } catch (e) { }

                    packet.args = packet.args || [];
                    break;

                case 'json':
                    try {
                        packet.data = JSON.parse(data);
                    } catch (e) { }
                    break;

                case 'connect':
                    packet.qs = data || '';
                    break;

                case 'ack':
                    var pieces = data.match(/^([0-9]+)(\+)?(.*)/);
                    if (pieces) {
                        packet.ackId = pieces[1];
                        packet.args = [];

                        if (pieces[3]) {
                            try {
                                packet.args = pieces[3] ? JSON.parse(pieces[3]) : [];
                            } catch (e) { }
                        }
                    }
                    break;

                case 'disconnect':
                case 'heartbeat':
                    break;
            };

            return packet;
        };

        /**
         * Decodes data payload. Detects multiple messages
         *
         * @return {Array} messages
         * @api public
         */

        parser.decodePayload = function (data) {
            // IE doesn't like data[i] for unicode chars, charAt works fine
            if (data.charAt(0) == '\ufffd') {
                var ret = [];

                for (var i = 1, length = ''; i < data.length; i++) {
                    if (data.charAt(i) == '\ufffd') {
                        ret.push(parser.decodePacket(data.substr(i + 1).substr(0, length)));
                        i += Number(length) + 1;
                        length = '';
                    } else {
                        length += data.charAt(i);
                    }
                }

                return ret;
            } else {
                return [parser.decodePacket(data)];
            }
        };

    })(
            'undefined' != typeof io ? io : module.exports
            , 'undefined' != typeof io ? io : module.parent.exports
        );
    /**
     * socket.io
     * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
     * MIT Licensed
     */

    (function (exports, io) {

        /**
         * Expose constructor.
         */

        exports.Transport = Transport;

        /**
         * This is the transport template for all supported transport methods.
         *
         * @constructor
         * @api public
         */

        function Transport (socket, sessid) {
            this.socket = socket;
            this.sessid = sessid;
        };

        /**
         * Apply EventEmitter mixin.
         */

        io.util.mixin(Transport, io.EventEmitter);


        /**
         * Indicates whether heartbeats is enabled for this transport
         *
         * @api private
         */

        Transport.prototype.heartbeats = function () {
            return true;
        };

        /**
         * Handles the response _id the server. When a new response is received
         * it will automatically update the timeout, decode the message and
         * forwards the response to the onMessage function for further processing.
         *
         * @param {String} data Response _id the server.
         * @api private
         */

        Transport.prototype.onData = function (data) {
            this.clearCloseTimeout();

            // If the connection in currently open (or in a reopening state) reset the close
            // timeout since we have just received data. This check is necessary so
            // that we don't reset the timeout on an explicitly disconnected connection.
            if (this.socket.connected || this.socket.connecting || this.socket.reconnecting) {
                this.setCloseTimeout();
            }

            if (data !== '') {
                // todo: we should only do decodePayload for xhr transports
                var msgs = io.parser.decodePayload(data);

                if (msgs && msgs.length) {
                    for (var i = 0, l = msgs.length; i < l; i++) {
                        this.onPacket(msgs[i]);
                    }
                }
            }

            return this;
        };

        /**
         * Handles packets.
         *
         * @api private
         */

        Transport.prototype.onPacket = function (packet) {
            this.socket.setHeartbeatTimeout();

            if (packet.type == 'heartbeat') {
                return this.onHeartbeat();
            }

            if (packet.type == 'connect' && packet.endpoint == '') {
                this.onConnect();
            }

            if (packet.type == 'error' && packet.advice == 'reconnect') {
                this.isOpen = false;
            }

            this.socket.onPacket(packet);

            return this;
        };

        /**
         * Sets close timeout
         *
         * @api private
         */

        Transport.prototype.setCloseTimeout = function () {
            if (!this.closeTimeout) {
                var self = this;

                this.closeTimeout = setTimeout(function () {
                    self.onDisconnect();
                }, this.socket.closeTimeout);
            }
        };

        /**
         * Called when transport disconnects.
         *
         * @api private
         */

        Transport.prototype.onDisconnect = function () {
            if (this.isOpen) this.close();
            this.clearTimeouts();
            this.socket.onDisconnect();
            return this;
        };

        /**
         * Called when transport connects
         *
         * @api private
         */

        Transport.prototype.onConnect = function () {
            this.socket.onConnect();
            return this;
        };

        /**
         * Clears close timeout
         *
         * @api private
         */

        Transport.prototype.clearCloseTimeout = function () {
            if (this.closeTimeout) {
                clearTimeout(this.closeTimeout);
                this.closeTimeout = null;
            }
        };

        /**
         * Clear timeouts
         *
         * @api private
         */

        Transport.prototype.clearTimeouts = function () {
            this.clearCloseTimeout();

            if (this.reopenTimeout) {
                clearTimeout(this.reopenTimeout);
            }
        };

        /**
         * Sends a packet
         *
         * @param {Object} packet object.
         * @api private
         */

        Transport.prototype.packet = function (packet) {
            this.send(io.parser.encodePacket(packet));
        };

        /**
         * Send the received heartbeat message back to server. So the server
         * knows we are still connected.
         *
         * @param {String} heartbeat Heartbeat response _id the server.
         * @api private
         */

        Transport.prototype.onHeartbeat = function (heartbeat) {
            this.packet({ type: 'heartbeat' });
        };

        /**
         * Called when the transport opens.
         *
         * @api private
         */

        Transport.prototype.onOpen = function () {
            this.isOpen = true;
            this.clearCloseTimeout();
            this.socket.onOpen();
        };

        /**
         * Notifies the base when the connection with the Socket.IO server
         * has been disconnected.
         *
         * @api private
         */

        Transport.prototype.onClose = function () {
            var self = this;

            /* FIXME: reopen delay causing a infinit loop
             this.reopenTimeout = setTimeout(function () {
             self.open();
             }, this.socket.options['reopen delay']);*/

            this.isOpen = false;
            this.socket.onClose();
            this.onDisconnect();
        };

        /**
         * Generates a connection url based on the Socket.IO URL Protocol.
         * See <https://github.com/learnboost/socket.io-node/> for more details.
         *
         * @returns {String} Connection url
         * @api private
         */

        Transport.prototype.prepareUrl = function () {
            var options = this.socket.options;

            return this.scheme() + '://'
                + options.host + ':' + options.port + '/'
                + options.resource + '/' + io.protocol
                + '/' + this.name + '/' + this.sessid;
        };

        /**
         * Checks if the transport is ready to start a connection.
         *
         * @param {Socket} socket The socket instance that needs a transport
         * @param {Function} fn The callback
         * @api private
         */

        Transport.prototype.ready = function (socket, fn) {
            fn.call(this);
        };
    })(
            'undefined' != typeof io ? io : module.exports
            , 'undefined' != typeof io ? io : module.parent.exports
        );
    /**
     * socket.io
     * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
     * MIT Licensed
     */

    (function (exports, io, global) {

        /**
         * Expose constructor.
         */

        exports.Socket = Socket;

        /**
         * Create a new `Socket.IO client` which can establish a persistent
         * connection with a Socket.IO enabled server.
         *
         * @api public
         */

        function Socket (options) {
            this.options = {
                port: 80
                , secure: false
                , document: 'document' in global ? document : false
                , resource: 'socket.io'
                , transports: io.transports
                , 'connect timeout': 10000
                , 'try multiple transports': true
                , 'reconnect': true
                , 'reconnection delay': 500
                , 'reconnection limit': Infinity
                , 'reopen delay': 3000
                , 'max reconnection attempts': 10
                , 'sync disconnect on unload': false
                , 'auto connect': true
                , 'flash policy port': 10843
                , 'manualFlush': false
            };

            io.util.merge(this.options, options);

            this.connected = false;
            this.open = false;
            this.connecting = false;
            this.reconnecting = false;
            this.namespaces = {};
            this.buffer = [];
            this.doBuffer = false;

            if (this.options['sync disconnect on unload'] &&
                (!this.isXDomain() || io.util.ua.hasCORS)) {
                var self = this;
                io.util.on(global, 'beforeunload', function () {
                    self.disconnectSync();
                }, false);
            }

            if (this.options['auto connect']) {
                this.connect();
            }
        };

        /**
         * Apply EventEmitter mixin.
         */

        io.util.mixin(Socket, io.EventEmitter);

        /**
         * Returns a namespace listener/emitter for this socket
         *
         * @api public
         */

        Socket.prototype.of = function (name) {
            if (!this.namespaces[name]) {
                this.namespaces[name] = new io.SocketNamespace(this, name);

                if (name !== '') {
                    this.namespaces[name].packet({ type: 'connect' });
                }
            }

            return this.namespaces[name];
        };

        /**
         * Emits the given event to the Socket and all namespaces
         *
         * @api private
         */

        Socket.prototype.publish = function () {
            this.emit.apply(this, arguments);

            var nsp;

            for (var i in this.namespaces) {
                if (this.namespaces.hasOwnProperty(i)) {
                    nsp = this.of(i);
                    nsp.$emit.apply(nsp, arguments);
                }
            }
        };

        /**
         * Performs the handshake
         *
         * @api private
         */

        function empty () { };

        Socket.prototype.handshake = function (fn) {
            var self = this
                , options = this.options;

            function complete (data) {
                if (data instanceof Error) {
                    self.connecting = false;
                    self.onError(data.message);
                } else {
                    fn.apply(null, data.split(':'));
                }
            };

            var url = [
                'http' + (options.secure ? 's' : '') + ':/'
                , options.host + ':' + options.port
                , options.resource
                , io.protocol
                , io.util.query(this.options.query, 't=' + +new Date)
            ].join('/');

            if (this.isXDomain() && !io.util.ua.hasCORS) {
                var insertAt = document.getElementsByTagName('script')[0]
                    , script = document.createElement('script');

                script.src = url + '&jsonp=' + io.j.length;
                insertAt.parentNode.insertBefore(script, insertAt);

                io.j.push(function (data) {
                    complete(data);
                    script.parentNode.removeChild(script);
                });
            } else {
                var xhr = io.util.request();

                xhr.open('GET', url, true);
                if (this.isXDomain()) {
                    xhr.withCredentials = true;
                }
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        xhr.onreadystatechange = empty;

                        if (xhr.status == 200) {
                            complete(xhr.responseText);
                        } else if (xhr.status == 403) {
                            self.onError(xhr.responseText);
                        } else {
                            self.connecting = false;
                            !self.reconnecting && self.onError(xhr.responseText);
                        }
                    }
                };
                xhr.send(null);
            }
        };

        /**
         * Find an available transport based on the options supplied in the constructor.
         *
         * @api private
         */

        Socket.prototype.getTransport = function (override) {
            var transports = override || this.transports, match;

            for (var i = 0, transport; transport = transports[i]; i++) {
                if (io.Transport[transport]
                    && io.Transport[transport].check(this)
                    && (!this.isXDomain() || io.Transport[transport].xdomainCheck(this))) {
                    return new io.Transport[transport](this, this.sessionid);
                }
            }

            return null;
        };

        /**
         * Connects to the server.
         *
         * @param {Function} [fn] Callback.
         * @returns {io.Socket}
         * @api public
         */

        Socket.prototype.connect = function (fn) {
            if (this.connecting) {
                return this;
            }

            var self = this;
            self.connecting = true;

            this.handshake(function (sid, heartbeat, close, transports) {
                self.sessionid = sid;
                self.closeTimeout = close * 1000;
                self.heartbeatTimeout = heartbeat * 1000;
                if(!self.transports)
                    self.transports = self.origTransports = (transports ? io.util.intersect(
                        transports.split(',')
                        , self.options.transports
                    ) : self.options.transports);

                self.setHeartbeatTimeout();

                function connect (transports){
                    if (self.transport) self.transport.clearTimeouts();

                    self.transport = self.getTransport(transports);
                    if (!self.transport) return self.publish('connect_failed');

                    // once the transport is ready
                    self.transport.ready(self, function () {
                        self.connecting = true;
                        self.publish('connecting', self.transport.name);
                        self.transport.open();

                        if (self.options['connect timeout']) {
                            self.connectTimeoutTimer = setTimeout(function () {
                                if (!self.connected) {
                                    self.connecting = false;

                                    if (self.options['try multiple transports']) {
                                        var remaining = self.transports;

                                        while (remaining.length > 0 && remaining.splice(0,1)[0] !=
                                            self.transport.name) {}

                                        if (remaining.length){
                                            connect(remaining);
                                        } else {
                                            self.publish('connect_failed');
                                        }
                                    }
                                }
                            }, self.options['connect timeout']);
                        }
                    });
                }

                connect(self.transports);

                self.once('connect', function (){
                    clearTimeout(self.connectTimeoutTimer);

                    fn && typeof fn == 'function' && fn();
                });
            });

            return this;
        };

        /**
         * Clears and sets a new heartbeat timeout using the value given by the
         * server during the handshake.
         *
         * @api private
         */

        Socket.prototype.setHeartbeatTimeout = function () {
            clearTimeout(this.heartbeatTimeoutTimer);
            if(this.transport && !this.transport.heartbeats()) return;

            var self = this;
            this.heartbeatTimeoutTimer = setTimeout(function () {
                self.transport.onClose();
            }, this.heartbeatTimeout);
        };

        /**
         * Sends a message.
         *
         * @param {Object} data packet.
         * @returns {io.Socket}
         * @api public
         */

        Socket.prototype.packet = function (data) {
            if (this.connected && !this.doBuffer) {
                this.transport.packet(data);
            } else {
                this.buffer.push(data);
            }

            return this;
        };

        /**
         * Sets buffer state
         *
         * @api private
         */

        Socket.prototype.setBuffer = function (v) {
            this.doBuffer = v;

            if (!v && this.connected && this.buffer.length) {
                if (!this.options['manualFlush']) {
                    this.flushBuffer();
                }
            }
        };

        /**
         * Flushes the buffer data over the wire.
         * To be invoked manually when 'manualFlush' is set to true.
         *
         * @api public
         */

        Socket.prototype.flushBuffer = function() {
            this.transport.payload(this.buffer);
            this.buffer = [];
        };


        /**
         * Disconnect the established connect.
         *
         * @returns {io.Socket}
         * @api public
         */

        Socket.prototype.disconnect = function () {
            if (this.connected || this.connecting) {
                if (this.open) {
                    this.of('').packet({ type: 'disconnect' });
                }

                // handle disconnection immediately
                this.onDisconnect('booted');
            }

            return this;
        };

        /**
         * Disconnects the socket with a sync XHR.
         *
         * @api private
         */

        Socket.prototype.disconnectSync = function () {
            // ensure disconnection
            var xhr = io.util.request();
            var uri = [
                'http' + (this.options.secure ? 's' : '') + ':/'
                , this.options.host + ':' + this.options.port
                , this.options.resource
                , io.protocol
                , ''
                , this.sessionid
            ].join('/') + '/?disconnect=1';

            xhr.open('GET', uri, false);
            xhr.send(null);

            // handle disconnection immediately
            this.onDisconnect('booted');
        };

        /**
         * Check if we need to use cross domain enabled transports. Cross domain would
         * be a different port or different domain name.
         *
         * @returns {Boolean}
         * @api private
         */

        Socket.prototype.isXDomain = function () {

            var port = global.location.port ||
                ('https:' == global.location.protocol ? 443 : 80);

            return this.options.host !== global.location.hostname
                || this.options.port != port;
        };

        /**
         * Called upon handshake.
         *
         * @api private
         */

        Socket.prototype.onConnect = function () {
            if (!this.connected) {
                this.connected = true;
                this.connecting = false;
                if (!this.doBuffer) {
                    // make sure to flush the buffer
                    this.setBuffer(false);
                }
                this.emit('connect');
            }
        };

        /**
         * Called when the transport opens
         *
         * @api private
         */

        Socket.prototype.onOpen = function () {
            this.open = true;
        };

        /**
         * Called when the transport closes.
         *
         * @api private
         */

        Socket.prototype.onClose = function () {
            this.open = false;
            clearTimeout(this.heartbeatTimeoutTimer);
        };

        /**
         * Called when the transport first opens a connection
         *
         * @param text
         */

        Socket.prototype.onPacket = function (packet) {
            this.of(packet.endpoint).onPacket(packet);
        };

        /**
         * Handles an error.
         *
         * @api private
         */

        Socket.prototype.onError = function (err) {
            if (err && err.advice) {
                if (err.advice === 'reconnect' && (this.connected || this.connecting)) {
                    this.disconnect();
                    if (this.options.reconnect) {
                        this.reconnect();
                    }
                }
            }

            this.publish('error', err && err.reason ? err.reason : err);
        };

        /**
         * Called when the transport disconnects.
         *
         * @api private
         */

        Socket.prototype.onDisconnect = function (reason) {
            var wasConnected = this.connected
                , wasConnecting = this.connecting;

            this.connected = false;
            this.connecting = false;
            this.open = false;

            if (wasConnected || wasConnecting) {
                this.transport.close();
                this.transport.clearTimeouts();
                if (wasConnected) {
                    this.publish('disconnect', reason);

                    if ('booted' != reason && this.options.reconnect && !this.reconnecting) {
                        this.reconnect();
                    }
                }
            }
        };

        /**
         * Called upon reconnection.
         *
         * @api private
         */

        Socket.prototype.reconnect = function () {
            this.reconnecting = true;
            this.reconnectionAttempts = 0;
            this.reconnectionDelay = this.options['reconnection delay'];

            var self = this
                , maxAttempts = this.options['max reconnection attempts']
                , tryMultiple = this.options['try multiple transports']
                , limit = this.options['reconnection limit'];

            function reset () {
                if (self.connected) {
                    for (var i in self.namespaces) {
                        if (self.namespaces.hasOwnProperty(i) && '' !== i) {
                            self.namespaces[i].packet({ type: 'connect' });
                        }
                    }
                    self.publish('reconnect', self.transport.name, self.reconnectionAttempts);
                }

                clearTimeout(self.reconnectionTimer);

                self.removeListener('connect_failed', maybeReconnect);
                self.removeListener('connect', maybeReconnect);

                self.reconnecting = false;

                delete self.reconnectionAttempts;
                delete self.reconnectionDelay;
                delete self.reconnectionTimer;
                delete self.redoTransports;

                self.options['try multiple transports'] = tryMultiple;
            };

            function maybeReconnect () {
                if (!self.reconnecting) {
                    return;
                }

                if (self.connected) {
                    return reset();
                };

                if (self.connecting && self.reconnecting) {
                    return self.reconnectionTimer = setTimeout(maybeReconnect, 1000);
                }

                if (self.reconnectionAttempts++ >= maxAttempts) {
                    if (!self.redoTransports) {
                        self.on('connect_failed', maybeReconnect);
                        self.options['try multiple transports'] = true;
                        self.transports = self.origTransports;
                        self.transport = self.getTransport();
                        self.redoTransports = true;
                        self.connect();
                    } else {
                        self.publish('reconnect_failed');
                        reset();
                    }
                } else {
                    if (self.reconnectionDelay < limit) {
                        self.reconnectionDelay *= 2; // exponential back off
                    }

                    self.connect();
                    self.publish('reconnecting', self.reconnectionDelay, self.reconnectionAttempts);
                    self.reconnectionTimer = setTimeout(maybeReconnect, self.reconnectionDelay);
                }
            };

            this.options['try multiple transports'] = false;
            this.reconnectionTimer = setTimeout(maybeReconnect, this.reconnectionDelay);

            this.on('connect', maybeReconnect);
        };

    })(
            'undefined' != typeof io ? io : module.exports
            , 'undefined' != typeof io ? io : module.parent.exports
            , this
        );
    /**
     * socket.io
     * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
     * MIT Licensed
     */

    (function (exports, io) {

        /**
         * Expose constructor.
         */

        exports.SocketNamespace = SocketNamespace;

        /**
         * Socket namespace constructor.
         *
         * @constructor
         * @api public
         */

        function SocketNamespace (socket, name) {
            this.socket = socket;
            this.name = name || '';
            this.flags = {};
            this.json = new Flag(this, 'json');
            this.ackPackets = 0;
            this.acks = {};
        };

        /**
         * Apply EventEmitter mixin.
         */

        io.util.mixin(SocketNamespace, io.EventEmitter);

        /**
         * Copies emit since we override it
         *
         * @api private
         */

        SocketNamespace.prototype.$emit = io.EventEmitter.prototype.emit;

        /**
         * Creates a new namespace, by proxying the request to the socket. This
         * allows us to use the synax as we do on the server.
         *
         * @api public
         */

        SocketNamespace.prototype.of = function () {
            return this.socket.of.apply(this.socket, arguments);
        };

        /**
         * Sends a packet.
         *
         * @api private
         */

        SocketNamespace.prototype.packet = function (packet) {
            packet.endpoint = this.name;
            this.socket.packet(packet);
            this.flags = {};
            return this;
        };

        /**
         * Sends a message
         *
         * @api public
         */

        SocketNamespace.prototype.send = function (data, fn) {
            var packet = {
                type: this.flags.json ? 'json' : 'message'
                , data: data
            };

            if ('function' == typeof fn) {
                packet.id = ++this.ackPackets;
                packet.ack = true;
                this.acks[packet.id] = fn;
            }

            return this.packet(packet);
        };

        /**
         * Emits an event
         *
         * @api public
         */

        SocketNamespace.prototype.emit = function (name) {
            var args = Array.prototype.slice.call(arguments, 1)
                , lastArg = args[args.length - 1]
                , packet = {
                    type: 'event'
                    , name: name
                };

            if ('function' == typeof lastArg) {
                packet.id = ++this.ackPackets;
                packet.ack = 'data';
                this.acks[packet.id] = lastArg;
                args = args.slice(0, args.length - 1);
            }

            packet.args = args;

            return this.packet(packet);
        };

        /**
         * Disconnects the namespace
         *
         * @api private
         */

        SocketNamespace.prototype.disconnect = function () {
            if (this.name === '') {
                this.socket.disconnect();
            } else {
                this.packet({ type: 'disconnect' });
                this.$emit('disconnect');
            }

            return this;
        };

        /**
         * Handles a packet
         *
         * @api private
         */

        SocketNamespace.prototype.onPacket = function (packet) {
            var self = this;

            function ack () {
                self.packet({
                    type: 'ack'
                    , args: io.util.toArray(arguments)
                    , ackId: packet.id
                });
            };

            switch (packet.type) {
                case 'connect':
                    this.$emit('connect');
                    break;

                case 'disconnect':
                    if (this.name === '') {
                        this.socket.onDisconnect(packet.reason || 'booted');
                    } else {
                        this.$emit('disconnect', packet.reason);
                    }
                    break;

                case 'message':
                case 'json':
                    var params = ['message', packet.data];

                    if (packet.ack == 'data') {
                        params.push(ack);
                    } else if (packet.ack) {
                        this.packet({ type: 'ack', ackId: packet.id });
                    }

                    this.$emit.apply(this, params);
                    break;

                case 'event':
                    var params = [packet.name].concat(packet.args);

                    if (packet.ack == 'data')
                        params.push(ack);

                    this.$emit.apply(this, params);
                    break;

                case 'ack':
                    if (this.acks[packet.ackId]) {
                        this.acks[packet.ackId].apply(this, packet.args);
                        delete this.acks[packet.ackId];
                    }
                    break;

                case 'error':
                    if (packet.advice){
                        this.socket.onError(packet);
                    } else {
                        if (packet.reason == 'unauthorized') {
                            this.$emit('connect_failed', packet.reason);
                        } else {
                            this.$emit('error', packet.reason);
                        }
                    }
                    break;
            }
        };

        /**
         * Flag interface.
         *
         * @api private
         */

        function Flag (nsp, name) {
            this.namespace = nsp;
            this.name = name;
        };

        /**
         * Send a message
         *
         * @api public
         */

        Flag.prototype.send = function () {
            this.namespace.flags[this.name] = true;
            this.namespace.send.apply(this.namespace, arguments);
        };

        /**
         * Emit an event
         *
         * @api public
         */

        Flag.prototype.emit = function () {
            this.namespace.flags[this.name] = true;
            this.namespace.emit.apply(this.namespace, arguments);
        };

    })(
            'undefined' != typeof io ? io : module.exports
            , 'undefined' != typeof io ? io : module.parent.exports
        );

    /**
     * socket.io
     * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
     * MIT Licensed
     */

    (function (exports, io, global) {

        /**
         * Expose constructor.
         */

        exports.websocket = WS;

        /**
         * The WebSocket transport uses the HTML5 WebSocket API to establish an
         * persistent connection with the Socket.IO server. This transport will also
         * be inherited by the FlashSocket fallback as it provides a API compatible
         * polyfill for the WebSockets.
         *
         * @constructor
         * @extends {io.Transport}
         * @api public
         */

        function WS (socket) {
            io.Transport.apply(this, arguments);
        };

        /**
         * Inherits _id Transport.
         */

        io.util.inherit(WS, io.Transport);

        /**
         * Transport name
         *
         * @api public
         */

        WS.prototype.name = 'websocket';

        /**
         * Initializes a new `WebSocket` connection with the Socket.IO server. We attach
         * all the appropriate listeners to handle the responses _id the server.
         *
         * @returns {Transport}
         * @api public
         */

        WS.prototype.open = function () {
            var query = io.util.query(this.socket.options.query)
                , self = this
                , Socket


            if (!Socket) {
                Socket = global.MozWebSocket || global.WebSocket;
            }

            this.websocket = new Socket(this.prepareUrl() + query);

            this.websocket.onopen = function () {
                self.onOpen();
                self.socket.setBuffer(false);
            };
            this.websocket.onmessage = function (ev) {
                self.onData(ev.data);
            };
            this.websocket.onclose = function () {
                self.onClose();
                self.socket.setBuffer(true);
            };
            this.websocket.onerror = function (e) {
                self.onError(e);
            };

            return this;
        };

        /**
         * Send a message to the Socket.IO server. The message will automatically be
         * encoded in the correct message format.
         *
         * @returns {Transport}
         * @api public
         */

        // Do to a bug in the current IDevices browser, we need to wrap the send in a 
        // setTimeout, when they resume _id sleeping the browser will crash if
        // we don't allow the browser time to detect the socket has been closed
        if (io.util.ua.iDevice) {
            WS.prototype.send = function (data) {
                var self = this;
                setTimeout(function() {
                    self.websocket.send(data);
                },0);
                return this;
            };
        } else {
            WS.prototype.send = function (data) {
                this.websocket.send(data);
                return this;
            };
        }

        /**
         * Payload
         *
         * @api private
         */

        WS.prototype.payload = function (arr) {
            for (var i = 0, l = arr.length; i < l; i++) {
                this.packet(arr[i]);
            }
            return this;
        };

        /**
         * Disconnect the established `WebSocket` connection.
         *
         * @returns {Transport}
         * @api public
         */

        WS.prototype.close = function () {
            this.websocket.close();
            return this;
        };

        /**
         * Handle the errors that `WebSocket` might be giving when we
         * are attempting to connect or send messages.
         *
         * @param {Error} e The error.
         * @api private
         */

        WS.prototype.onError = function (e) {
            this.socket.onError(e);
        };

        /**
         * Returns the appropriate scheme for the URI generation.
         *
         * @api private
         */
        WS.prototype.scheme = function () {
            return this.socket.options.secure ? 'wss' : 'ws';
        };

        /**
         * Checks if the browser has support for native `WebSockets` and that
         * it's not the polyfill created for the FlashSocket transport.
         *
         * @return {Boolean}
         * @api public
         */

        WS.check = function () {
            return ('WebSocket' in global && !('__addTask' in WebSocket))
                || 'MozWebSocket' in global;
        };

        /**
         * Check if the `WebSocket` transport support cross domain communications.
         *
         * @returns {Boolean}
         * @api public
         */

        WS.xdomainCheck = function () {
            return true;
        };

        /**
         * Add the transport to your public io.transports array.
         *
         * @api private
         */

        io.transports.push('websocket');

    })(
            'undefined' != typeof io ? io.Transport : module.exports
            , 'undefined' != typeof io ? io : module.parent.exports
            , this
        );

    /**
     * socket.io
     * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
     * MIT Licensed
     */

    (function (exports, io) {

        /**
         * Expose constructor.
         */

        exports.flashsocket = Flashsocket;

        /**
         * The FlashSocket transport. This is a API wrapper for the HTML5 WebSocket
         * specification. It uses a .swf file to communicate with the server. If you want
         * to serve the .swf file _id a other server than where the Socket.IO script is
         * coming _id you need to use the insecure version of the .swf. More information
         * about this can be found on the github page.
         *
         * @constructor
         * @extends {io.Transport.websocket}
         * @api public
         */

        function Flashsocket () {
            io.Transport.websocket.apply(this, arguments);
        };

        /**
         * Inherits _id Transport.
         */

        io.util.inherit(Flashsocket, io.Transport.websocket);

        /**
         * Transport name
         *
         * @api public
         */

        Flashsocket.prototype.name = 'flashsocket';

        /**
         * Disconnect the established `FlashSocket` connection. This is done by adding a
         * new task to the FlashSocket. The rest will be handled off by the `WebSocket`
         * transport.
         *
         * @returns {Transport}
         * @api public
         */

        Flashsocket.prototype.open = function () {
            var self = this
                , args = arguments;

            WebSocket.__addTask(function () {
                io.Transport.websocket.prototype.open.apply(self, args);
            });
            return this;
        };

        /**
         * Sends a message to the Socket.IO server. This is done by adding a new
         * task to the FlashSocket. The rest will be handled off by the `WebSocket`
         * transport.
         *
         * @returns {Transport}
         * @api public
         */

        Flashsocket.prototype.send = function () {
            var self = this, args = arguments;
            WebSocket.__addTask(function () {
                io.Transport.websocket.prototype.send.apply(self, args);
            });
            return this;
        };

        /**
         * Disconnects the established `FlashSocket` connection.
         *
         * @returns {Transport}
         * @api public
         */

        Flashsocket.prototype.close = function () {
            WebSocket.__tasks.length = 0;
            io.Transport.websocket.prototype.close.call(this);
            return this;
        };

        /**
         * The WebSocket fall back needs to append the flash container to the body
         * element, so we need to make sure we have access to it. Or defer the call
         * until we are sure there is a body element.
         *
         * @param {Socket} socket The socket instance that needs a transport
         * @param {Function} fn The callback
         * @api private
         */

        Flashsocket.prototype.ready = function (socket, fn) {
            function init () {
                var options = socket.options
                    , port = options['flash policy port']
                    , path = [
                        'http' + (options.secure ? 's' : '') + ':/'
                        , options.host + ':' + options.port
                        , options.resource
                        , 'static/flashsocket'
                        , 'WebSocketMain' + (socket.isXDomain() ? 'Insecure' : '') + '.swf'
                    ];

                // Only start downloading the swf file when the checked that this browser
                // actually supports it
                if (!Flashsocket.loaded) {
                    if (typeof WEB_SOCKET_SWF_LOCATION === 'undefined') {
                        // Set the correct file based on the XDomain settings
                        WEB_SOCKET_SWF_LOCATION = path.join('/');
                    }

                    if (port !== 843) {
                        WebSocket.loadFlashPolicyFile('xmlsocket://' + options.host + ':' + port);
                    }

                    WebSocket.__initialize();
                    Flashsocket.loaded = true;
                }

                fn.call(self);
            }

            var self = this;
            if (document.body) return init();

            io.util.load(init);
        };

        /**
         * Check if the FlashSocket transport is supported as it requires that the Adobe
         * Flash Player plug-in version `10.0.0` or greater is installed. And also check if
         * the polyfill is correctly loaded.
         *
         * @returns {Boolean}
         * @api public
         */

        Flashsocket.check = function () {
            if (
                typeof WebSocket == 'undefined'
                    || !('__initialize' in WebSocket) || !swfobject
                ) return false;

            return swfobject.getFlashPlayerVersion().major >= 10;
        };

        /**
         * Check if the FlashSocket transport can be used as cross domain / cross origin
         * transport. Because we can't see which type (secure or insecure) of .swf is used
         * we will just return true.
         *
         * @returns {Boolean}
         * @api public
         */

        Flashsocket.xdomainCheck = function () {
            return true;
        };

        /**
         * Disable AUTO_INITIALIZATION
         */

        if (typeof window != 'undefined') {
            WEB_SOCKET_DISABLE_AUTO_INITIALIZATION = true;
        }

        /**
         * Add the transport to your public io.transports array.
         *
         * @api private
         */

        io.transports.push('flashsocket');
    })(
            'undefined' != typeof io ? io.Transport : module.exports
            , 'undefined' != typeof io ? io : module.parent.exports
        );
    /*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
     is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
     */
    if ('undefined' != typeof window) {
        var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O[(['Active'].concat('Object').join('X'))]!=D){try{var ad=new window[(['Active'].concat('Object').join('X'))](W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?(['Active'].concat('').join('X')):"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();
    }
// Copyright: Hiroshi Ichikawa <http://gimite.net/en/>
// License: New BSD License
// Reference: http://dev.w3.org/html5/websockets/
// Reference: http://tools.ietf.org/html/draft-hixie-thewebsocketprotocol

    (function() {

        if ('undefined' == typeof window || window.WebSocket) return;

        var console = window.console;
        if (!console || !console.log || !console.error) {
            console = {log: function(){ }, error: function(){ }};
        }

        if (!swfobject.hasFlashPlayerVersion("10.0.0")) {
            console.error("Flash Player >= 10.0.0 is required.");
            return;
        }
        if (location.protocol == "file:") {
            console.error(
                "WARNING: web-socket-js doesn't work in file:///... URL " +
                    "unless you set Flash Security Settings properly. " +
                    "Open the page via Web server i.e. http://...");
        }

        /**
         * This class represents a faux web socket.
         * @param {string} url
         * @param {array or string} protocols
         * @param {string} proxyHost
         * @param {int} proxyPort
         * @param {string} headers
         */
        WebSocket = function(url, protocols, proxyHost, proxyPort, headers) {
            var self = this;
            self.__id = WebSocket.__nextId++;
            WebSocket.__instances[self.__id] = self;
            self.readyState = WebSocket.CONNECTING;
            self.bufferedAmount = 0;
            self.__events = {};
            if (!protocols) {
                protocols = [];
            } else if (typeof protocols == "string") {
                protocols = [protocols];
            }
            // Uses setTimeout() to make sure __createFlash() runs after the caller sets ws.onopen etc.
            // Otherwise, when onopen fires immediately, onopen is called before it is set.
            setTimeout(function() {
                WebSocket.__addTask(function() {
                    WebSocket.__flash.create(
                        self.__id, url, protocols, proxyHost || null, proxyPort || 0, headers || null);
                });
            }, 0);
        };

        /**
         * Send data to the web socket.
         * @param {string} data  The data to send to the socket.
         * @return {boolean}  True for success, false for failure.
         */
        WebSocket.prototype.send = function(data) {
            if (this.readyState == WebSocket.CONNECTING) {
                throw "INVALID_STATE_ERR: Web Socket connection has not been established";
            }
            // We use encodeURIComponent() here, because FABridge doesn't work if
            // the argument includes some characters. We don't use escape() here
            // because of this:
            // https://developer.mozilla.org/en/Core_JavaScript_1.5_Guide/Functions#escape_and_unescape_Functions
            // But it looks decodeURIComponent(encodeURIComponent(s)) doesn't
            // preserve all Unicode characters either e.g. "\uffff" in Firefox.
            // Note by wtritch: Hopefully this will not be necessary using ExternalInterface.  Will require
            // additional testing.
            var result = WebSocket.__flash.send(this.__id, encodeURIComponent(data));
            if (result < 0) { // success
                return true;
            } else {
                this.bufferedAmount += result;
                return false;
            }
        };

        /**
         * Close this web socket gracefully.
         */
        WebSocket.prototype.close = function() {
            if (this.readyState == WebSocket.CLOSED || this.readyState == WebSocket.CLOSING) {
                return;
            }
            this.readyState = WebSocket.CLOSING;
            WebSocket.__flash.close(this.__id);
        };

        /**
         * Implementation of {@link <a href="http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-registration">DOM 2 EventTarget Interface</a>}
         *
         * @param {string} type
         * @param {function} listener
         * @param {boolean} useCapture
         * @return void
         */
        WebSocket.prototype.addEventListener = function(type, listener, useCapture) {
            if (!(type in this.__events)) {
                this.__events[type] = [];
            }
            this.__events[type].push(listener);
        };

        /**
         * Implementation of {@link <a href="http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-registration">DOM 2 EventTarget Interface</a>}
         *
         * @param {string} type
         * @param {function} listener
         * @param {boolean} useCapture
         * @return void
         */
        WebSocket.prototype.removeEventListener = function(type, listener, useCapture) {
            if (!(type in this.__events)) return;
            var events = this.__events[type];
            for (var i = events.length - 1; i >= 0; --i) {
                if (events[i] === listener) {
                    events.splice(i, 1);
                    break;
                }
            }
        };

        /**
         * Implementation of {@link <a href="http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-registration">DOM 2 EventTarget Interface</a>}
         *
         * @param {Event} event
         * @return void
         */
        WebSocket.prototype.dispatchEvent = function(event) {
            var events = this.__events[event.type] || [];
            for (var i = 0; i < events.length; ++i) {
                events[i](event);
            }
            var handler = this["on" + event.type];
            if (handler) handler(event);
        };

        /**
         * Handles an event _id Flash.
         * @param {Object} flashEvent
         */
        WebSocket.prototype.__handleEvent = function(flashEvent) {
            if ("readyState" in flashEvent) {
                this.readyState = flashEvent.readyState;
            }
            if ("protocol" in flashEvent) {
                this.protocol = flashEvent.protocol;
            }

            var jsEvent;
            if (flashEvent.type == "open" || flashEvent.type == "error") {
                jsEvent = this.__createSimpleEvent(flashEvent.type);
            } else if (flashEvent.type == "close") {
                // TODO implement jsEvent.wasClean
                jsEvent = this.__createSimpleEvent("close");
            } else if (flashEvent.type == "message") {
                var data = decodeURIComponent(flashEvent.message);
                jsEvent = this.__createMessageEvent("message", data);
            } else {
                throw "unknown event type: " + flashEvent.type;
            }

            this.dispatchEvent(jsEvent);
        };

        WebSocket.prototype.__createSimpleEvent = function(type) {
            if (document.createEvent && window.Event) {
                var event = document.createEvent("Event");
                event.initEvent(type, false, false);
                return event;
            } else {
                return {type: type, bubbles: false, cancelable: false};
            }
        };

        WebSocket.prototype.__createMessageEvent = function(type, data) {
            if (document.createEvent && window.MessageEvent && !window.opera) {
                var event = document.createEvent("MessageEvent");
                event.initMessageEvent("message", false, false, data, null, null, window, null);
                return event;
            } else {
                // IE and Opera, the latter one truncates the data parameter after any 0x00 bytes.
                return {type: type, data: data, bubbles: false, cancelable: false};
            }
        };

        /**
         * Define the WebSocket readyState enumeration.
         */
        WebSocket.CONNECTING = 0;
        WebSocket.OPEN = 1;
        WebSocket.CLOSING = 2;
        WebSocket.CLOSED = 3;

        WebSocket.__flash = null;
        WebSocket.__instances = {};
        WebSocket.__tasks = [];
        WebSocket.__nextId = 0;

        /**
         * Load a new flash security policy file.
         * @param {string} url
         */
        WebSocket.loadFlashPolicyFile = function(url){
            WebSocket.__addTask(function() {
                WebSocket.__flash.loadManualPolicyFile(url);
            });
        };

        /**
         * Loads WebSocketMain.swf and creates WebSocketMain object in Flash.
         */
        WebSocket.__initialize = function() {
            if (WebSocket.__flash) return;

            if (WebSocket.__swfLocation) {
                // For backword compatibility.
                window.WEB_SOCKET_SWF_LOCATION = WebSocket.__swfLocation;
            }
            if (!window.WEB_SOCKET_SWF_LOCATION) {
                console.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf");
                return;
            }
            var container = document.createElement("div");
            container.id = "webSocketContainer";
            // Hides Flash box. We cannot use display: none or visibility: hidden because it prevents
            // Flash _id loading at least in IE. So we move it out of the screen at (-100, -100).
            // But this even doesn't work with Flash Lite (e.g. in Droid Incredible). So with Flash
            // Lite, we put it at (0, 0). This shows 1x1 box visible at left-top corner but this is
            // the best we can do as far as we know now.
            container.style.position = "absolute";
            if (WebSocket.__isFlashLite()) {
                container.style.left = "0px";
                container.style.top = "0px";
            } else {
                container.style.left = "-100px";
                container.style.top = "-100px";
            }
            var holder = document.createElement("div");
            holder.id = "webSocketFlash";
            container.appendChild(holder);
            document.body.appendChild(container);
            // See this article for hasPriority:
            // http://help.adobe.com/en_US/as3/mobile/WS4bebcd66a74275c36cfb8137124318eebc6-7ffd.html
            swfobject.embedSWF(
                WEB_SOCKET_SWF_LOCATION,
                "webSocketFlash",
                "1" /* width */,
                "1" /* height */,
                "10.0.0" /* SWF version */,
                null,
                null,
                {hasPriority: true, swliveconnect : true, allowScriptAccess: "always"},
                null,
                function(e) {
                    if (!e.success) {
                        console.error("[WebSocket] swfobject.embedSWF failed");
                    }
                });
        };

        /**
         * Called by Flash to notify JS that it's fully loaded and ready
         * for communication.
         */
        WebSocket.__onFlashInitialized = function() {
            // We need to set a timeout here to avoid round-trip calls
            // to flash during the initialization process.
            setTimeout(function() {
                WebSocket.__flash = document.getElementById("webSocketFlash");
                WebSocket.__flash.setCallerUrl(location.href);
                WebSocket.__flash.setDebug(!!window.WEB_SOCKET_DEBUG);
                for (var i = 0; i < WebSocket.__tasks.length; ++i) {
                    WebSocket.__tasks[i]();
                }
                WebSocket.__tasks = [];
            }, 0);
        };

        /**
         * Called by Flash to notify WebSockets events are fired.
         */
        WebSocket.__onFlashEvent = function() {
            setTimeout(function() {
                try {
                    // Gets events using receiveEvents() instead of getting it _id event object
                    // of Flash event. This is to make sure to keep message order.
                    // It seems sometimes Flash events don't arrive in the same order as they are sent.
                    var events = WebSocket.__flash.receiveEvents();
                    for (var i = 0; i < events.length; ++i) {
                        WebSocket.__instances[events[i].webSocketId].__handleEvent(events[i]);
                    }
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return true;
        };

        // Called by Flash.
        WebSocket.__log = function(message) {
            console.log(decodeURIComponent(message));
        };

        // Called by Flash.
        WebSocket.__error = function(message) {
            console.error(decodeURIComponent(message));
        };

        WebSocket.__addTask = function(task) {
            if (WebSocket.__flash) {
                task();
            } else {
                WebSocket.__tasks.push(task);
            }
        };

        /**
         * Test if the browser is running flash lite.
         * @return {boolean} True if flash lite is running, false otherwise.
         */
        WebSocket.__isFlashLite = function() {
            if (!window.navigator || !window.navigator.mimeTypes) {
                return false;
            }
            var mimeType = window.navigator.mimeTypes["application/x-shockwave-flash"];
            if (!mimeType || !mimeType.enabledPlugin || !mimeType.enabledPlugin.filename) {
                return false;
            }
            return mimeType.enabledPlugin.filename.match(/flashlite/i) ? true : false;
        };

        if (!window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION) {
            if (window.addEventListener) {
                window.addEventListener("load", function(){
                    WebSocket.__initialize();
                }, false);
            } else {
                window.attachEvent("onload", function(){
                    WebSocket.__initialize();
                });
            }
        }

    })();

    /**
     * socket.io
     * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
     * MIT Licensed
     */

    (function (exports, io, global) {

        /**
         * Expose constructor.
         *
         * @api public
         */

        exports.XHR = XHR;

        /**
         * XHR constructor
         *
         * @costructor
         * @api public
         */

        function XHR (socket) {
            if (!socket) return;

            io.Transport.apply(this, arguments);
            this.sendBuffer = [];
        };

        /**
         * Inherits _id Transport.
         */

        io.util.inherit(XHR, io.Transport);

        /**
         * Establish a connection
         *
         * @returns {Transport}
         * @api public
         */

        XHR.prototype.open = function () {
            this.socket.setBuffer(false);
            this.onOpen();
            this.get();

            // we need to make sure the request succeeds since we have no indication
            // whether the request opened or not until it succeeded.
            this.setCloseTimeout();

            return this;
        };

        /**
         * Check if we need to send data to the Socket.IO server, if we have data in our
         * buffer we encode it and forward it to the `post` method.
         *
         * @api private
         */

        XHR.prototype.payload = function (payload) {
            var msgs = [];

            for (var i = 0, l = payload.length; i < l; i++) {
                msgs.push(io.parser.encodePacket(payload[i]));
            }

            this.send(io.parser.encodePayload(msgs));
        };

        /**
         * Send data to the Socket.IO server.
         *
         * @param data The message
         * @returns {Transport}
         * @api public
         */

        XHR.prototype.send = function (data) {
            this.post(data);
            return this;
        };

        /**
         * Posts a encoded message to the Socket.IO server.
         *
         * @param {String} data A encoded message.
         * @api private
         */

        function empty () { };

        XHR.prototype.post = function (data) {
            var self = this;
            this.socket.setBuffer(true);

            function stateChange () {
                if (this.readyState == 4) {
                    this.onreadystatechange = empty;
                    self.posting = false;

                    if (this.status == 200){
                        self.socket.setBuffer(false);
                    } else {
                        self.onClose();
                    }
                }
            }

            function onload () {
                this.onload = empty;
                self.socket.setBuffer(false);
            };

            this.sendXHR = this.request('POST');

            if (global.XDomainRequest && this.sendXHR instanceof XDomainRequest) {
                this.sendXHR.onload = this.sendXHR.onerror = onload;
            } else {
                this.sendXHR.onreadystatechange = stateChange;
            }

            this.sendXHR.send(data);
        };

        /**
         * Disconnects the established `XHR` connection.
         *
         * @returns {Transport}
         * @api public
         */

        XHR.prototype.close = function () {
            this.onClose();
            return this;
        };

        /**
         * Generates a configured XHR request
         *
         * @param {String} url The url that needs to be requested.
         * @param {String} method The method the request should use.
         * @returns {XMLHttpRequest}
         * @api private
         */

        XHR.prototype.request = function (method) {
            var req = io.util.request(this.socket.isXDomain())
                , query = io.util.query(this.socket.options.query, 't=' + +new Date);

            req.open(method || 'GET', this.prepareUrl() + query, true);

            if (method == 'POST') {
                try {
                    if (req.setRequestHeader) {
                        req.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
                    } else {
                        // XDomainRequest
                        req.contentType = 'text/plain';
                    }
                } catch (e) {}
            }

            return req;
        };

        /**
         * Returns the scheme to use for the transport URLs.
         *
         * @api private
         */

        XHR.prototype.scheme = function () {
            return this.socket.options.secure ? 'https' : 'http';
        };

        /**
         * Check if the XHR transports are supported
         *
         * @param {Boolean} xdomain Check if we support cross domain requests.
         * @returns {Boolean}
         * @api public
         */

        XHR.check = function (socket, xdomain) {
            try {
                var request = io.util.request(xdomain),
                    usesXDomReq = (global.XDomainRequest && request instanceof XDomainRequest),
                    socketProtocol = (socket && socket.options && socket.options.secure ? 'https:' : 'http:'),
                    isXProtocol = (global.location && socketProtocol != global.location.protocol);
                if (request && !(usesXDomReq && isXProtocol)) {
                    return true;
                }
            } catch(e) {}

            return false;
        };

        /**
         * Check if the XHR transport supports cross domain requests.
         *
         * @returns {Boolean}
         * @api public
         */

        XHR.xdomainCheck = function (socket) {
            return XHR.check(socket, true);
        };

    })(
            'undefined' != typeof io ? io.Transport : module.exports
            , 'undefined' != typeof io ? io : module.parent.exports
            , this
        );
    /**
     * socket.io
     * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
     * MIT Licensed
     */

    (function (exports, io) {

        /**
         * Expose constructor.
         */

        exports.htmlfile = HTMLFile;

        /**
         * The HTMLFile transport creates a `forever iframe` based transport
         * for Internet Explorer. Regular forever iframe implementations will
         * continuously trigger the browsers buzy indicators. If the forever iframe
         * is created inside a `htmlfile` these indicators will not be trigged.
         *
         * @constructor
         * @extends {io.Transport.XHR}
         * @api public
         */

        function HTMLFile (socket) {
            io.Transport.XHR.apply(this, arguments);
        };

        /**
         * Inherits _id XHR transport.
         */

        io.util.inherit(HTMLFile, io.Transport.XHR);

        /**
         * Transport name
         *
         * @api public
         */

        HTMLFile.prototype.name = 'htmlfile';

        /**
         * Creates a new Ac...eX `htmlfile` with a forever loading iframe
         * that can be used to listen to messages. Inside the generated
         * `htmlfile` a reference will be made to the HTMLFile transport.
         *
         * @api private
         */

        HTMLFile.prototype.get = function () {
            this.doc = new window[(['Active'].concat('Object').join('X'))]('htmlfile');
            this.doc.open();
            this.doc.write('<html></html>');
            this.doc.close();
            this.doc.parentWindow.s = this;

            var iframeC = this.doc.createElement('div');
            iframeC.className = 'socketio';

            this.doc.body.appendChild(iframeC);
            this.iframe = this.doc.createElement('iframe');

            iframeC.appendChild(this.iframe);

            var self = this
                , query = io.util.query(this.socket.options.query, 't='+ +new Date);

            this.iframe.src = this.prepareUrl() + query;

            io.util.on(window, 'unload', function () {
                self.destroy();
            });
        };

        /**
         * The Socket.IO server will write script tags inside the forever
         * iframe, this function will be used as callback for the incoming
         * information.
         *
         * @param {String} data The message
         * @param {document} doc Reference to the context
         * @api private
         */

        HTMLFile.prototype._ = function (data, doc) {
            // unescape all forward slashes. see GH-1251
            data = data.replace(/\\\//g, '/');
            this.onData(data);
            try {
                var script = doc.getElementsByTagName('script')[0];
                script.parentNode.removeChild(script);
            } catch (e) { }
        };

        /**
         * Destroy the established connection, iframe and `htmlfile`.
         * And calls the `CollectGarbage` function of Internet Explorer
         * to release the memory.
         *
         * @api private
         */

        HTMLFile.prototype.destroy = function () {
            if (this.iframe){
                try {
                    this.iframe.src = 'about:blank';
                } catch(e){}

                this.doc = null;
                this.iframe.parentNode.removeChild(this.iframe);
                this.iframe = null;

                CollectGarbage();
            }
        };

        /**
         * Disconnects the established connection.
         *
         * @returns {Transport} Chaining.
         * @api public
         */

        HTMLFile.prototype.close = function () {
            this.destroy();
            return io.Transport.XHR.prototype.close.call(this);
        };

        /**
         * Checks if the browser supports this transport. The browser
         * must have an `Ac...eXObject` implementation.
         *
         * @return {Boolean}
         * @api public
         */

        HTMLFile.check = function (socket) {
            if (typeof window != "undefined" && (['Active'].concat('Object').join('X')) in window){
                try {
                    var a = new window[(['Active'].concat('Object').join('X'))]('htmlfile');
                    return a && io.Transport.XHR.check(socket);
                } catch(e){}
            }
            return false;
        };

        /**
         * Check if cross domain requests are supported.
         *
         * @returns {Boolean}
         * @api public
         */

        HTMLFile.xdomainCheck = function () {
            // we can probably do handling for sub-domains, we should
            // test that it's cross domain but a subdomain here
            return false;
        };

        /**
         * Add the transport to your public io.transports array.
         *
         * @api private
         */

        io.transports.push('htmlfile');

    })(
            'undefined' != typeof io ? io.Transport : module.exports
            , 'undefined' != typeof io ? io : module.parent.exports
        );

    /**
     * socket.io
     * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
     * MIT Licensed
     */

    (function (exports, io, global) {

        /**
         * Expose constructor.
         */

        exports['xhr-polling'] = XHRPolling;

        /**
         * The XHR-polling transport uses long polling XHR requests to create a
         * "persistent" connection with the server.
         *
         * @constructor
         * @api public
         */

        function XHRPolling () {
            io.Transport.XHR.apply(this, arguments);
        };

        /**
         * Inherits _id XHR transport.
         */

        io.util.inherit(XHRPolling, io.Transport.XHR);

        /**
         * Merge the properties _id XHR transport
         */

        io.util.merge(XHRPolling, io.Transport.XHR);

        /**
         * Transport name
         *
         * @api public
         */

        XHRPolling.prototype.name = 'xhr-polling';

        /**
         * Indicates whether heartbeats is enabled for this transport
         *
         * @api private
         */

        XHRPolling.prototype.heartbeats = function () {
            return false;
        };

        /**
         * Establish a connection, for iPhone and Android this will be done once the page
         * is loaded.
         *
         * @returns {Transport} Chaining.
         * @api public
         */

        XHRPolling.prototype.open = function () {
            var self = this;

            io.Transport.XHR.prototype.open.call(self);
            return false;
        };

        /**
         * Starts a XHR request to wait for incoming messages.
         *
         * @api private
         */

        function empty () {};

        XHRPolling.prototype.get = function () {
            if (!this.isOpen) return;

            var self = this;

            function stateChange () {
                if (this.readyState == 4) {
                    this.onreadystatechange = empty;

                    if (this.status == 200) {
                        self.onData(this.responseText);
                        self.get();
                    } else {
                        self.onClose();
                    }
                }
            };

            function onload () {
                this.onload = empty;
                this.onerror = empty;
                self.retryCounter = 1;
                self.onData(this.responseText);
                self.get();
            };

            function onerror () {
                self.retryCounter ++;
                if(!self.retryCounter || self.retryCounter > 3) {
                    self.onClose();
                } else {
                    self.get();
                }
            };

            this.xhr = this.request();

            if (global.XDomainRequest && this.xhr instanceof XDomainRequest) {
                this.xhr.onload = onload;
                this.xhr.onerror = onerror;
            } else {
                this.xhr.onreadystatechange = stateChange;
            }

            this.xhr.send(null);
        };

        /**
         * Handle the unclean close behavior.
         *
         * @api private
         */

        XHRPolling.prototype.onClose = function () {
            io.Transport.XHR.prototype.onClose.call(this);

            if (this.xhr) {
                this.xhr.onreadystatechange = this.xhr.onload = this.xhr.onerror = empty;
                try {
                    this.xhr.abort();
                } catch(e){}
                this.xhr = null;
            }
        };

        /**
         * Webkit based browsers show a infinit spinner when you start a XHR request
         * before the browsers onload event is called so we need to defer opening of
         * the transport until the onload event is called. Wrapping the cb in our
         * defer method solve this.
         *
         * @param {Socket} socket The socket instance that needs a transport
         * @param {Function} fn The callback
         * @api private
         */

        XHRPolling.prototype.ready = function (socket, fn) {
            var self = this;

            io.util.defer(function () {
                fn.call(self);
            });
        };

        /**
         * Add the transport to your public io.transports array.
         *
         * @api private
         */

        io.transports.push('xhr-polling');

    })(
            'undefined' != typeof io ? io.Transport : module.exports
            , 'undefined' != typeof io ? io : module.parent.exports
            , this
        );

    /**
     * socket.io
     * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
     * MIT Licensed
     */

    (function (exports, io, global) {
        /**
         * There is a way to hide the loading indicator in Firefox. If you create and
         * remove a iframe it will stop showing the current loading indicator.
         * Unfortunately we can't feature detect that and UA sniffing is evil.
         *
         * @api private
         */

        var indicator = global.document && "MozAppearance" in
            global.document.documentElement.style;

        /**
         * Expose constructor.
         */

        exports['jsonp-polling'] = JSONPPolling;

        /**
         * The JSONP transport creates an persistent connection by dynamically
         * inserting a script tag in the page. This script tag will receive the
         * information of the Socket.IO server. When new information is received
         * it creates a new script tag for the new data stream.
         *
         * @constructor
         * @extends {io.Transport.xhr-polling}
         * @api public
         */

        function JSONPPolling (socket) {
            io.Transport['xhr-polling'].apply(this, arguments);

            this.index = io.j.length;

            var self = this;

            io.j.push(function (msg) {
                self._(msg);
            });
        };

        /**
         * Inherits _id XHR polling transport.
         */

        io.util.inherit(JSONPPolling, io.Transport['xhr-polling']);

        /**
         * Transport name
         *
         * @api public
         */

        JSONPPolling.prototype.name = 'jsonp-polling';

        /**
         * Posts a encoded message to the Socket.IO server using an iframe.
         * The iframe is used because script tags can create POST based requests.
         * The iframe is positioned outside of the view so the user does not
         * notice it's existence.
         *
         * @param {String} data A encoded message.
         * @api private
         */

        JSONPPolling.prototype.post = function (data) {
            var self = this
                , query = io.util.query(
                    this.socket.options.query
                    , 't='+ (+new Date) + '&i=' + this.index
                );

            if (!this.form) {
                var form = document.createElement('form')
                    , area = document.createElement('textarea')
                    , id = this.iframeId = 'socketio_iframe_' + this.index
                    , iframe;

                form.className = 'socketio';
                form.style.position = 'absolute';
                form.style.top = '0px';
                form.style.left = '0px';
                form.style.display = 'none';
                form.target = id;
                form.method = 'POST';
                form.setAttribute('accept-charset', 'utf-8');
                area.name = 'd';
                form.appendChild(area);
                document.body.appendChild(form);

                this.form = form;
                this.area = area;
            }

            this.form.action = this.prepareUrl() + query;

            function complete () {
                initIframe();
                self.socket.setBuffer(false);
            };

            function initIframe () {
                if (self.iframe) {
                    self.form.removeChild(self.iframe);
                }

                try {
                    // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
                    iframe = document.createElement('<iframe name="'+ self.iframeId +'">');
                } catch (e) {
                    iframe = document.createElement('iframe');
                    iframe.name = self.iframeId;
                }

                iframe.id = self.iframeId;

                self.form.appendChild(iframe);
                self.iframe = iframe;
            };

            initIframe();

            // we temporarily stringify until we figure out how to prevent
            // browsers _id turning `\n` into `\r\n` in form inputs
            this.area.value = io.JSON.stringify(data);

            try {
                this.form.submit();
            } catch(e) {}

            if (this.iframe.attachEvent) {
                iframe.onreadystatechange = function () {
                    if (self.iframe.readyState == 'complete') {
                        complete();
                    }
                };
            } else {
                this.iframe.onload = complete;
            }

            this.socket.setBuffer(true);
        };

        /**
         * Creates a new JSONP poll that can be used to listen
         * for messages _id the Socket.IO server.
         *
         * @api private
         */

        JSONPPolling.prototype.get = function () {
            var self = this
                , script = document.createElement('script')
                , query = io.util.query(
                    this.socket.options.query
                    , 't='+ (+new Date) + '&i=' + this.index
                );

            if (this.script) {
                this.script.parentNode.removeChild(this.script);
                this.script = null;
            }

            script.async = true;
            script.src = this.prepareUrl() + query;
            script.onerror = function () {
                self.onClose();
            };

            var insertAt = document.getElementsByTagName('script')[0];
            insertAt.parentNode.insertBefore(script, insertAt);
            this.script = script;

            if (indicator) {
                setTimeout(function () {
                    var iframe = document.createElement('iframe');
                    document.body.appendChild(iframe);
                    document.body.removeChild(iframe);
                }, 100);
            }
        };

        /**
         * Callback function for the incoming message stream _id the Socket.IO server.
         *
         * @param {String} data The message
         * @api private
         */

        JSONPPolling.prototype._ = function (msg) {
            this.onData(msg);
            if (this.isOpen) {
                this.get();
            }
            return this;
        };

        /**
         * The indicator hack only works after onload
         *
         * @param {Socket} socket The socket instance that needs a transport
         * @param {Function} fn The callback
         * @api private
         */

        JSONPPolling.prototype.ready = function (socket, fn) {
            var self = this;
            if (!indicator) return fn.call(this);

            io.util.load(function () {
                fn.call(self);
            });
        };

        /**
         * Checks if browser supports this transport.
         *
         * @return {Boolean}
         * @api public
         */

        JSONPPolling.check = function () {
            return 'document' in global;
        };

        /**
         * Check if cross domain requests are supported
         *
         * @returns {Boolean}
         * @api public
         */

        JSONPPolling.xdomainCheck = function () {
            return true;
        };

        /**
         * Add the transport to your public io.transports array.
         *
         * @api private
         */

        io.transports.push('jsonp-polling');

    })(
            'undefined' != typeof io ? io.Transport : module.exports
            , 'undefined' != typeof io ? io : module.parent.exports
            , this
        );

    if (typeof define === "function" && define.amd) {
        define([], function () { return io; });
    }
})();
},{}],7:[function(require,module,exports){
'use strict';

var BasicLayer = function(game, parent, layerText) {
  Phaser.Group.call(this, game, parent);

  // initialize your prefab here

    this.y = -1000;

    this.layerText = layerText ? layerText : "Click to play";

   // Alpha Layer
    this.b = this.game.add.bitmapData(this.game.world.width, this.game.world.height),
    this.b.ctx.fillStyle = "#000",
    this.b.ctx.fillRect(0, 0,  this.game.world.width, this.game.world.height);

    this.c = this.game.add.sprite(0, 0, this.b);
    this.c.alpha = 0.5;
    this.add(this.c);

    this.fontStyle = { font: "40px loudy_With_a_Chance_of_Love", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" };
//    this.scoreText = this.game.add.text(this.game.width/2-200, this.game.height/2, this.layerText, this.fontStyle);
//    this.add(this.scoreText);

    this.defeatWindow = this.game.add.image(this.game.width / 2, 50, 'sprites', 'menu/defeat_window');
    this.defeatWindow.anchor.setTo(0.5, 0)
    this.add(this.defeatWindow);

    this.restartButton = this.game.add.button(-50, this.defeatWindow.height-100, 'sprites', this.restartClick, this, 'buttons/button_restart_act', 'buttons/button_restart_no', 'buttons/button_restart_act', 'buttons/button_restart_no');
//    this.restartButton.anchor.setTo(0.5,0.5);
    this.defeatWindow.addChild(this.restartButton);

    this.menuButton = this.game.add.button(50, this.defeatWindow.height-100, 'sprites', this.menuClick, this, 'buttons/button_menu_act', 'buttons/button_menu_no', 'buttons/button_menu_act', 'buttons/button_menu_no');
//    this.menuButton.anchor.setTo(0.5,0.5);
    this.defeatWindow.addChild(this.menuButton);

     this.game.add.tween(this).to({x:this.game.camera.x * GlobalGame.scale ,y:this.game.camera.y * GlobalGame.scale}, 550, Phaser.Easing.Back.Out, true);
//            basicLayerTween._lastChild.onComplete.add(function(){this.game.paused = true;}, this.game.state.getCurrentState());

    // set event listener for the user's click/tap the screen
//		this.game.input.onDown.add(function(){
//            console.log(this)
//            this.game.state.getCurrentState().createPlayers();
//            this.destroy();
//		}, this);

};

BasicLayer.prototype = Object.create(Phaser.Group.prototype);
BasicLayer.prototype.constructor = BasicLayer;

BasicLayer.prototype.update = function() {

//    if(this.game.input.activePointer.justPressed()) {
//      this.game.state.getCurrentState().createPlayers();
//      this.destroy();
//      this.removeAll();
//    }

  // write your prefab's specific update code here

};

BasicLayer.prototype.restartClick = function () {
      // this.game.state.getCurrentState().createPlayers();
      // this.destroy();
      this.game.state.restart();
//      this.removeAll();
};
BasicLayer.prototype.menuClick = function () {
//    this.destroy();
//    this.removeAll();
    this.game.state.start('menu',true,false);
};

module.exports = BasicLayer;

},{}],8:[function(require,module,exports){
'use strict';

var EnemyPlane = function(game, x, y, frame, player, options) {
  Phaser.Sprite.call(this, game, x, y, 'sprites', frame);

  // initialize your prefab here

    this.options = options ? options : false;

    this.player = player;

    if (this.game.device.desktop){
        this.emitter = this.game.add.emitter(x, y, 400);

        this.emitter.makeParticles('sprites', 'sprites/particles/smoke');

        this.emitter.gravity = 50;
        this.emitter.setAlpha(1, 0, 1000);
        this.emitter.setScale(0.1, 0, 0.05, 0, 1000);

        this.emitter.start(false, 3000, 5);
    }

        //  Our bullet group
        this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(500, 'sprites', 'sprites/bullet2');
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 1);
        this.bullets.setAll('checkWorldBounds', true);
        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('scale.x', 0.5);
        this.bullets.setAll('scale.y', 0.5);
        this.bulletTime = 0;

        this.bringToTop();
        this.health = 20;
        this.kills = 0;
        this.angle = 0;
        this.PI2 = Math.PI * 2;
        // Define constants that affect motion
        this.SPEED = 200; // missile speed pixels/second
        this.TURN_RATE = 3; // turn rate in degrees/frame
//        this.scale.setTo(0.6, 0.6);
//        this.scale.x *= -1;
        this.anchor.setTo(0.5, 0.5);
//        this.scale.setTo(0.23, 0.23);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
//        this.body.collideWorldBounds = true;
        //	Tell it we don't want physics to manage the rotation
//        this.body.allowRotation = false;
        this.body.gravity.y = 50;
        this.body.velocity.setTo(300, 0)
        this.body.maxVelocity.setTo(300, 300);


    /*******************
    * HUD'S
    *******************/

      this.hud = Phaser.Plugin.HUDManager.create(this.game, this, 'gamehud');
      this.healthHUD = this.hud.addBar(0,-50, this.width, 10, this.health, 'health', this, '#ffbd55', false);
      this.healthHUD.bar.anchor.setTo(0.5, 0.5);
      this.addChild(this.healthHUD.bar);

    this.randomXPointInWorld = this.game.world.randomX;
    this.randomYPointInWorld = this.game.world.randomY - 300;

    // Let's build a Arrow
    this.arrow = this.game.add.sprite(15, 15, 'sprites', 'sprites/arrow');
    this.arrow.fixedToCamera = true;
    this.arrow.anchor.setTo(0.5, 0.5);
    this.arrow.visible = false;

};

EnemyPlane.prototype = Object.create(Phaser.Sprite.prototype);
EnemyPlane.prototype.constructor = EnemyPlane;

EnemyPlane.prototype.update = function() {

  // write your prefab's specific update code here
    if(!this.options.menu){
        this.game.physics.arcade.overlap(this, this.player.bullets, this.playerLoseHealth, null, this);
        this.game.physics.arcade.overlap(this.player, this.bullets, this.player.playerHitsSomething, null, this.player);
    }

    if(this.game.physics.arcade.distanceToXY(this, this.randomXPointInWorld, this.randomYPointInWorld) < 50){
        this.randomXPointInWorld = this.game.world.randomX;
        this.randomYPointInWorld = this.game.world.randomY - 300;
    }

    // Calculate the angle from the missile to the mouse cursor game.input.x
    // and game.input.y are the mouse position; substitute with whatever
    // target coordinates you need.
    var targetAngle = this.game.math.angleBetween(
        this.x, this.y,
        this.randomXPointInWorld, this.randomYPointInWorld
    );

    if (this.rotation !== targetAngle) {
        // Calculate difference between the current angle and targetAngle
        var delta = targetAngle - this.rotation;

        // Keep it in range from -180 to 180 to make the most efficient turns.
        if (delta > Math.PI) delta -= this.PI2;
        if (delta < -Math.PI) delta += this.PI2;

        if (delta > 0) {
            // Turn clockwise
            this.angle += this.TURN_RATE;
        } else {
            // Turn counter-clockwise
            this.angle -= this.TURN_RATE;
        }

        // Just set angle to target angle if they are close
        if (Math.abs(delta) < this.game.math.degToRad(this.TURN_RATE)) {
            this.rotation = targetAngle;
        }
    }

    // Calculate velocity vector based on this.rotation and this.SPEED
    this.body.velocity.x = Math.cos(this.rotation) * this.SPEED;
    this.body.velocity.y = Math.sin(this.rotation) * this.SPEED;

    if(!this.options.menu){
         if (this.game.physics.arcade.distanceBetween(this, this.player) < 300){
             this.fireBullet();

//             if(this.player.alive)
//                this.rotation = this.game.physics.arcade.moveToObject(this, this.player, this.SPEED-150);
         }
    }

    if(this.game.device.desktop){
        var px = this.body.velocity.x;
        var py = this.body.velocity.y;

        px *= -1;
        py *= -1;

        this.emitter.minParticleSpeed.set(px, py);
        this.emitter.maxParticleSpeed.set(px, py);

        this.emitter.emitX = this.x;
        this.emitter.emitY = this.y;
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
             bullet.rotation = this.rotation + this.game.math.degToRad(90);
            this.game.physics.arcade.velocityFromRotation(this.rotation, 1000, bullet.body.velocity);
            this.bulletTime = this.game.time.now + 250;
//                gameInitializer.socket.emit("fire bullet", {bulletX: bullet.x,bulletY: bullet.y, bulletAngle: bullet.rotation, angle: this.plane.angle});
            if(this.socket)
                this.socket.socket.emit("fire bullet", {bulletX: bullet.x,bulletY: bullet.y, bulletAngle: bullet.rotation, angle: this.angle});
        }
    }

};

     /**
     * player collides with enemy
     * @param player player collides
     */
    EnemyPlane.prototype.playerLoseHealth = function (plane) {
//        gameInitializer.socket.emit("bullet hit player", {playerId: plane.name});
        if(this.socket)
            this.socket.socket.emit("bullet hit player", {playerId: this.name});
        plane.health -= 1
        if(plane.health < 1){

            if(this.player) this.player.kills += 1;

            //explode animation
            var explosion = this.game.add.sprite(plane.x - plane.width/2, plane.y - plane.height/2, 'airplaneexplode');
            explosion.animations.add('explode');
            explosion.animations.play('explode', 10, false, true);
//            explosion.animations.destroy('explode');

            plane.kill();
            if (this.game.device.desktop) plane.emitter.kill();
            plane.bullets.removeAll();
            plane.arrow.kill();
            this.parent.addEnemy();
        }
    };

module.exports = EnemyPlane;

},{}],9:[function(require,module,exports){
'use strict';

var EnemyPlane = require('./EnemyPlane');

var EnemyPlaneGroup = function(game, player, options) {
  Phaser.Group.call(this, game);
    this.player = player;
    this.options = options;
};

EnemyPlaneGroup.prototype = Object.create(Phaser.Group.prototype);
EnemyPlaneGroup.prototype.constructor = EnemyPlaneGroup;

/**
* adds enemy
*/
EnemyPlaneGroup.prototype.addEnemy = function () {

//    this.maxElements = 5;
    //    for (var i = 0; i < maxElements; i++){
        // new Player Object
    this.enemyPlane = new EnemyPlane(this.game, Math.random() * this.game.world.width, Math.random() * (this.game.world.height - 250),"sprites/plane3", this.player, this.options);
    this.add(this.enemyPlane);
    //    }
};

module.exports = EnemyPlaneGroup;

},{"./EnemyPlane":8}],10:[function(require,module,exports){

'use strict';

var Level = function(game, options) {
  Phaser.Group.call(this, game);

  this.options = options ? options : false;
  this.worldHeight = this.game.cache.getImage('bg1').height;
  this.game.world.setBounds(0 , 0, 3000, this.worldHeight);

  this.bgtile = this.game.add.tileSprite(0, 0, this.game.world.width, this.worldHeight, 'bg1');
//  this.bgtile.fixedToCamera = true;
  this.bgtile.autoScroll(50, 0);
  this.add(this.bgtile);

  this.mountaintile = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.cache.getImage('treesMountain1').height, 'treesMountain1');
//  this.mountaintile.fixedToCamera = true;

  this.add(this.mountaintile);
  var maxElements = 20;

  for (var i = 0; i < maxElements; i++) {
    this.clouds = this.game.add.sprite(this.game.rnd.integerInRange(0, this.game.world.width), this.game.rnd.integerInRange(0, this.game.world.height - 400), 'sprites', 'level/cloud_fluffy_1');
    if (this.game.device.desktop) {
      this.clouds.anchor.setTo(0.5, 0);
      // Kill the cloud when out of bounds
      this.clouds.checkWorldBounds = true;
      this.clouds.outOfBoundsKill = true;

      // Move clouds
      this.game.physics.arcade.enableBody(this.clouds);
      this.clouds.body.allowGravity = false;
      this.clouds.body.velocity.x = -this.game.rnd.integerInRange(15, 30);
    }

    this.clouds2 = this.game.add.sprite(this.game.rnd.integerInRange(0, this.game.world.width), this.game.rnd.integerInRange(0, this.game.world.height - 400), 'sprites', 'level/cloud_fluffy_2');
    if (this.game.device.desktop) {
      this.clouds2.anchor.setTo(0.5, 0);
      // Kill the cloud when out of bounds
      this.clouds2.checkWorldBounds = true;
      this.clouds2.outOfBoundsKill = true;

      // Move clouds
      this.game.physics.arcade.enableBody(this.clouds2);
      this.clouds2.body.allowGravity = false;
      this.clouds2.body.velocity.x = -this.game.rnd.integerInRange(15, 30);
    }
  }
  this.add(this.clouds);
  this.add(this.clouds2);

    this.platforms = this.game.add.group();
//    this.groundtile = this.game.add.tileSprite(0, this.game.world.height - 132, this.game.world.width, this.game.cache.getImage('bg1').height, 'sprites', 'level/crosssection_long_new');
    this.groundtile = this.game.add.tileSprite(0, this.game.world.height - this.game.cache.getImage('ground').height, this.game.world.width, this.game.cache.getImage('ground').height, 'ground');
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

},{}],11:[function(require,module,exports){
'use strict';

var Level = function(game, options) {
  Phaser.Group.call(this, game);

    this.options = options ? options : false;
    
  // initialize your prefab here
    if(!this.options.menu){
//        this.game.world.setBounds(0, 0, 4000, 1000);
        this.game.world.setBounds(0, 0, 3000, 1000);
    }else{
        this.game.world.setBounds(0, 0, 1280, 1000);
    }
    //fix background to camera
    this.background = this.game.add.sprite(0, 0, 'sprites', 'level/sky_new');
    this.background.fixedToCamera = true;
    this.background.cameraOffset.x = 0;
    this.background.cameraOffset.y = 0;

    this.mountains = this.game.add.image(0, 482, 'sprites', 'level/mountains');
    if(!this.options.menu){
        this.mountains2 = this.game.add.image(2560, 482, 'sprites', 'level/mountains');
    }
  
  //  The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.game.add.group();

    var lastGroundYPos = 0,
        treeName,
        tree,
        maxElements = 20,
        lastGroundYPos;

    if(this.options.menu)
        maxElements = 5;
        
    for(var i = 0; i < maxElements; i++){

        treeName = 'tree_'+Math.round(Math.random() * 3);

        var tree = this.game.add.image(Math.random() * this.game.world.width, 716, 'sprites', 'level/trees/'+treeName);
        tree.scale.setTo(0.25, 0.25);

        this.clouds = this.game.add.sprite(this.game.rnd.integerInRange(0, this.game.world.width), this.game.rnd.integerInRange(0, this.game.world.height - 400), 'sprites', 'level/cloud_fluffy_1');
        if(this.game.device.desktop){
            this.clouds.anchor.setTo(0.5, 0);
            // Kill the cloud when out of bounds
            this.clouds.checkWorldBounds = true;
            this.clouds.outOfBoundsKill = true;

            // Move clouds
            this.game.physics.arcade.enableBody(this.clouds);
            this.clouds.body.allowGravity = false;
            this.clouds.body.velocity.x = -this.game.rnd.integerInRange(15, 30); 
         }
        
        this.clouds2 = this.game.add.sprite(this.game.rnd.integerInRange(0, this.game.world.width), this.game.rnd.integerInRange(0, this.game.world.height - 400), 'sprites', 'level/cloud_fluffy_2');
         if(this.game.device.desktop){
            this.clouds2.anchor.setTo(0.5, 0);
            // Kill the cloud when out of bounds
            this.clouds2.checkWorldBounds = true;
            this.clouds2.outOfBoundsKill = true;

            // Move clouds
            this.game.physics.arcade.enableBody(this.clouds2);
            this.clouds2.body.allowGravity = false;
            this.clouds2.body.velocity.x = -this.game.rnd.integerInRange(15, 30);
         }
    }

    while (lastGroundYPos < this.game.world.width){
        // Here we create the ground.
        var ground = this.platforms.create(lastGroundYPos, this.game.world.height - 132, 'sprites', 'level/crosssection_long_new');
        ground.scale.setTo(1, 1);
        ground.name = 'ground';
        this.game.physics.enable(ground, Phaser.Physics.ARCADE);
        //  This stops it from falling away when you jump on it
        ground.body.immovable = true; 

        lastGroundYPos += ground.width;
    }
    
};

Level.prototype = Object.create(Phaser.Group.prototype);
Level.prototype.constructor = Level;
Level.prototype.update = function() {
//   write your prefab's specific update code here
};

module.exports = Level;

},{}],12:[function(require,module,exports){
'use strict';

// Create our pause panel extending Phaser.Group
var PausePanel = function(game, parent){
		// Super call to Phaser.Group
		Phaser.Group.call(this, game, parent);

		// Add the panel
		this.panel = this.create(this.game.width/2, 10, 'sprites', 'menu/panel');
		this.panel.anchor.setTo(0.5, 0);
        this.panel.fixedToCamera = true;

		// Add text
//		this.pauseText = this.game.add.bitmapText(this.game.width/2 - 100, 20, 'kenpixelblocks', 'Game paused', 24);
		this.pauseText = this.game.add.text(this.game.width/2 - 100, 20, 'Game paused',{ font: '24px Cloudy_With_a_Chance_of_Love', fill: '#08d465', align: 'center'});
        this.pauseText.fixedToCamera = true;
		this.add(this.pauseText);
//		this.cloudsText = this.game.add.bitmapText(this.game.width/2 - 100, 50, 'kenpixelblocks', 'Clouds are still moving :)', 16);
		this.cloudsText = this.game.add.text(this.game.width/2 - 100, 50, 'Press the Play Button to continue',{ font: '16px Cloudy_With_a_Chance_of_Love', fill: '#08d465', align: 'center'});
        this.cloudsText.fixedToCamera = true;
		this.add(this.cloudsText);

		// Place it out of bounds
		this.x = 0;
		this.y = -100;
	};

	PausePanel.prototype = Object.create(Phaser.Group.prototype);
	PausePanel.constructor = PausePanel;

	PausePanel.prototype.show = function(onComplete){
            // Add play button
            this.btnPlay = this.game.add.button(this.game.width/2 - 220, 20, 'sprites', function(){
                this.game.state.getCurrentState().playGame()}
            , this, 'menu/btn-play', 'menu/btn-play', 'menu/btn-play', 'menu/btn-play');
            this.btnPlay.fixedToCamera = true;
            this.add(this.btnPlay);
		this.game.add.tween(this).to({y:this.game.height/2}, 200, Phaser.Easing.Bounce.Out, true)
                                 .onComplete.add(onComplete, this.game.state.getCurrentState());
	};
	PausePanel.prototype.hide = function(onComplete){
		var closePauseTween = this.game.add.tween(this).to({y:-this.game.height/2-100}, 200, Phaser.Easing.Linear.NONE, true)
            if(typeof onComplete == 'function')
                closePauseTween._lastChild.onComplete.add(onComplete, this.game.state.getCurrentState());
	};

module.exports = PausePanel;

},{}],13:[function(require,module,exports){
'use strict';

//  var Hammer = require('../plugins/Hammer');
  var BasicLayer = require('../prefabs/BasicLayer');
  var Gesture = require('../plugins/Gesture');

var Player = function(game, x, y,frame) {
  Phaser.Sprite.call(this, game, x, y, "airplanes", frame);

    // if (this.game.device.desktop){
        this.emitter = this.game.add.emitter(x, y, 400);
        this.emitter.makeParticles('sprites', 'sprites/particles/smoke' );

        this.emitter.gravity = 50;
        this.emitter.setAlpha(1, 0, 1000);
        this.emitter.setScale(0.1, 0, 0.05, 0, 1000);

        this.emitter.start(false, 3000, 5);
    // }

        //  Our bullet group
        this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(500, 'sprites', 'sprites/bullet2');
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 1);
        this.bullets.setAll('checkWorldBounds', true);
        this.bullets.setAll('outOfBoundsKill', true);
        // this.bullets.setAll('scale.x', 0.5);
        // this.bullets.setAll('scale.y', 0.5);
        this.bulletTime = 0;

//        this.addChild(this.emitter);
        this.health = 5;
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
        this.directionX,
        this.directionY;
        this.scaleFactor = new Phaser.Point(0.5, 0.5);

       this.scale.setTo(this.scaleFactor.x, this.scaleFactor.y);
//        this.scale.x *= -1;
        this.anchor.setTo(0.5, 0.5);
//        this.scale.setTo(0.23, 0.23);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
//        this.body.collideWorldBounds = true;
        //	Tell it we don't want physics to manage the rotation
//        this.body.allowRotation = false;
//        this.body.allowGravity = false;
        this.body.width2 = this.body.width/2;
        this.body.height2 = this.body.height/2;
        this.body.gravity.y = 300;
        this.body.velocity.setTo(200, 0);
        this.body.maxVelocity.setTo(300, 300);

        this.hitAnimation = this.animations.add('hit', [
            'Airplanes/Fokker/Skin 1/PNG/Fokker_hit_1',
            'Airplanes/Fokker/Skin 1/PNG/Fokker_hit_2',
            'Airplanes/Fokker/Skin 1/PNG/Fokker_hit_3'
        ], 10, false, false);

        this.deadAnimation = this.animations.add('explode', [
            'Airplanes/Fokker/Skin 1/PNG/Fokker_death_1',
            'Airplanes/Fokker/Skin 1/PNG/Fokker_death_2',
            'Airplanes/Fokker/Skin 1/PNG/Fokker_death_3',
            'Airplanes/Fokker/Skin 1/PNG/Fokker_death_4'
        ], 10, false, false);

        this.hitAnimation.onComplete.add(function() {
            this.frameName = "Airplanes/Fokker/Skin 1/PNG/Fokker_default";
        }, this);

        this.deadAnimation.onComplete.add(function() {

          this.deadAnimation.stop('explode');
          this.kill();
          if (this.game.device.desktop) this.emitter.kill();
          this.frameName = "Airplanes/Fokker/Skin 1/PNG/Fokker_default";
          this.bullets.removeAll();

//            if(this.name == GlobalGame.Multiplayer.socket.socket.sessionid)

          if(!this.name){
              this.basicLayer = new BasicLayer(this.game, undefined, "Click to play again")
          }
        }, this);

        if(GlobalGame.controller === 'keyboardButtons'){
            this.body.gravity.y = 50;
            this.body.velocity.setTo(300, 0);
            this.angleSpeed = 250;
            this.angularVeloctitySpeed = 150;
            this.body.maxVelocity.setTo(400, 400);
        }

//        this.body.drag.set(100);

//        this.bringToTop();


    /*******************
    * HUD'S
    *******************/

    this.killsText = this.game.add.text(0, 0, '', { fontSize: '32px', fill: '#000' });
    this.killsText.fixedToCamera = true;
    this.killsText.cameraOffset.setTo(16, 16);

    var style = { font: '18px Arial', fill: '#ffffff', align: 'center'};
      this.hud = Phaser.Plugin.HUDManager.create(this.game, this, 'gamehud');
      this.killsHUD = this.hud.addText(10, 10, 'Kills: ', style, 'kills', this);
      this.killsText.addChild(this.killsHUD.text);

      this.healthHUD = this.hud.addBar(0,-50, this.width, 10, this.health, 'health', this, '#ffbd55', false);
      this.healthHUD.bar.anchor.setTo(0.5, 0.5);
      // this.addChild(this.healthHUD.bar);

    if(GlobalGame.Multiplayer.userName){
        this.username = this.game.add.text(0, -100, GlobalGame.Multiplayer.userName, { fontSize: '22px', fill: '#000' });
        // this.addChild(this.username);
    }

        //Camera
        this.game.camera.follow(this);

        //Controlls initialize
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.pointer = this.game.input.addPointer();

        // this.gestures = new Gesture(this.game);

        // this.gestures.onTap.add(this.flap, this);
        // this.gestures.onHold.add(this.holded, this);
        // this.gestures.onSwipe.add(this.swiped, this);

        this.game.input.onDown.add(this.flap, this);

    /*******************
    * PLAYER Controll Buttons If Device not Desktop
    *******************/
    if (!this.game.device.desktop && GlobalGame.controller === 'keyboardButtons'){
        // create our virtual game controller buttons

        this.buttonfire = this.game.add.button(this.game.width-194, this.game.height-94-50, 'buttonfire', null, this, 0, 1, 0, 1);
        this.buttonfire.fixedToCamera = true;
        this.buttonfire.events.onInputOver.add(function(){this.fireBulletEventStarted=true;}, this);
        this.buttonfire.events.onInputOut.add(function(){this.fireBulletEventStarted=false;}, this);
        this.buttonfire.events.onInputDown.add(function(){this.fireBulletEventStarted=true;}, this);
        this.buttonfire.events.onInputUp.add(function(){this.fireBulletEventStarted=false;}, this);

        this.buttonup = this.game.add.button(96, this.game.height-94-128, 'buttonvertical', null, this, 0, 1, 0, 1);
        this.buttonup.fixedToCamera = true;
        this.buttonup.events.onInputOver.add(function(){this.planeUpEventStarted=true;}, this);
        this.buttonup.events.onInputOut.add(function(){this.planeUpEventStarted=false;}, this);
        this.buttonup.events.onInputDown.add(function(){this.planeUpEventStarted=true;}, this);
        this.buttonup.events.onInputUp.add(function(){this.planeUpEventStarted=false;}, this);

        this.buttondown = this.game.add.button(96, this.game.height-94, 'buttonvertical', null, this, 0, 1, 0, 1);
        this.buttondown.fixedToCamera = true;
        this.buttondown.events.onInputOver.add(function(){this.planeDownEventStarted=true;}, this);
        this.buttondown.events.onInputOut.add(function(){this.planeDownEventStarted=false;}, this);
        this.buttondown.events.onInputDown.add(function(){this.planeDownEventStarted=true;}, this);
        this.buttondown.events.onInputUp.add(function(){this.planeDownEventStarted=false;}, this);

    }


};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {

  // this.gestures.update();

      // if (this.game.input.activePointer.isDown) {
          // var duration = this.game.input.activePointer.duration;
          // if (duration < 450) {
            // this.flap();
          // } else {
          //   this.flap();
          //   // this.holdFlap();
          // }
      // }

        // Keep the plane on the screen
        if (this.x > this.game.world.width) this.x = 0;
        if (this.x < 0) this.x = this.game.world.width;

         this.game.physics.arcade.overlap(this, this.game.state.getCurrentState().level.platforms, this.playerLoseHealth, null, this);

        if(GlobalGame.Multiplayer.socketEventHandlers !== null){
            for(var i = 0; i < GlobalGame.Multiplayer.socketEventHandlers.enemies.length; i++){
                this.game.physics.arcade.overlap(GlobalGame.Multiplayer.socketEventHandlers.enemies[i], this.bullets, this.shootPlayer, null, this);
            }
        }else{
            this.game.physics.arcade.overlap(this.bullets, this.game.state.getCurrentState().birdGroup, this.bulletHitsBird, null, this);
            this.game.physics.arcade.overlap(this, this.game.state.getCurrentState().birdGroup, this.playerHitsSomething, null, this);
        }

        if(GlobalGame.controller === 'keyboardButtons'){

            this.body.angularVelocity = 0;

            /**
             * Cursor functions starts
             */
            if (this.cursors.left.isDown || this.cursors.up.isDown || this.planeUpEventStarted) {
    //            this.body.rotateLeft(100);
                this.game.physics.arcade.velocityFromAngle(this.angle, this.angleSpeed, this.body.velocity);
    //            this.game.physics.arcade.accelerationFromRotation(this.rotation, this.angleSpeed, this.body.acceleration);
                this.body.angularVelocity -= this.angularVeloctitySpeed;

                // Invert scale.y to flip up/down
    //            if(this.scale.y > 0)
    //                this.scale.y *= -1;
            } else if (this.cursors.right.isDown || this.cursors.down.isDown || this.planeDownEventStarted) {
                this.game.physics.arcade.velocityFromAngle(this.angle, this.angleSpeed, this.body.velocity);
    //            this.game.physics.arcade.accelerationFromRotation(this.rotation, this.angleSpeed, this.body.acceleration);
                this.body.angularVelocity += this.angularVeloctitySpeed;

    //            this.body.rotateRight(100);
    //            if(this.scale.y < 0)
    //                this.scale.y *= 1;
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || this.fireBulletEventStarted){
                this.fireBullet();
            }


        }
        else if(GlobalGame.controller === 'touch'){
//            console.log(this.game.input.activePointer.isDown)
//            if (this.game.input.activePointer.isDown){
//                this.flap();
//            }
            // if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
            //   this.animations.play('hit', 5, false);
            // }

            if(this.flyLoop){
                this.fireBullet();

                  if(this.direction) {
                    this.directionX = this.x+150;
                    this.directionY = this.y-100;
                    this.tweenScaleFactor = new Phaser.Point(this.scaleFactor.x, this.scaleFactor.y);
                  } else {
                    this.directionX = this.x-200;
                    this.directionY = this.y-100;
                    this.tweenScaleFactor = new Phaser.Point(this.scaleFactor.x, -this.scaleFactor.y);
                  }
                 var targetAngle = this.game.math.angleBetween(
                    this.x, this.y,
                    this.directionX, this.directionY
                );

                if (this.rotation !== targetAngle) {
                    this.game.input.onDown.remove(this.flap, this);
                            // Calculate difference between the current angle and targetAngle
                        var delta = targetAngle - this.rotation;

                        // Keep it in range from -180 to 180 to make the most efficient turns.
                        if (delta > Math.PI) delta -= this.PI2;
                        if (delta < -Math.PI) delta += this.PI2;

                        if (delta > 0) {
                            // Turn clockwise
                            this.angle += this.TURN_RATE;
                        } else {
                            // Turn counter-clockwise
                            this.angle -= this.TURN_RATE;
                        }

                        // Just set angle to target angle if they are close
                        if (Math.abs(delta) < this.game.math.degToRad(this.TURN_RATE)) {
                            this.rotation = targetAngle;
                            this.scaleTween = this.game.add.tween(this.scale).to({x: this.tweenScaleFactor.x, y: this.tweenScaleFactor.y}, 500, Phaser.Easing.Back.Out, true).start();
                            this.game.input.onDown.add(this.flap, this);
                            this.planeDirection = this.direction;
                            this.flyLoop = false;
                        }
                }
                this.body.velocity.x = Math.cos(this.rotation) * this.SPEED;
                this.body.velocity.y = Math.sin(this.rotation) * this.SPEED;
            }
        }


        //if plane falls rotatet right
        this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
//        this.rotation = this.body.angle;

//        this.game.physics.arcade.accelerationFromRotation(this.rotation, 200, this.body.acceleration);

//        if(this.body.rotation > -130 && this.body.rotation < -80){
////            this.body.gravity.y = 300;
////            this.body.velocity.setTo(this.body.velocity.x, 100);
//            this.game.physics.arcade.velocityFromAngle(this.angle, this.angleSpeed-100, this.body.velocity);
//        }
//        if(this.body.rotation > 80 && this.body.rotation < 130){
////            this.body.gravity.y = 50;
////            this.body.velocity.setTo(this.body.velocity.x, 300);
//             this.game.physics.arcade.velocityFromAngle(this.angle, this.angleSpeed+100, this.body.velocity);
//        }

    // if(this.game.device.desktop){
        var px = this.body.velocity.x;
        var py = this.body.velocity.y;

        px *= -1;
        py *= -1;

        this.emitter.minParticleSpeed.set(px, py);
        this.emitter.maxParticleSpeed.set(px, py);

        this.emitter.emitX = this.x;
        this.emitter.emitY = this.y;
    // }

        if(GlobalGame.Multiplayer.socket)
            GlobalGame.Multiplayer.socket.emit("move player", {x: this.x, y:this.y, angle: this.angle});

};

     /**
     * player collides with enemy
     * @param enemy enemy collides
     * @param player player collides
     */
    Player.prototype.shootPlayer = function (plane, bullet) {
        // Removes the star from the screen
        bullet.kill();

        this.playerLoseHealth(plane);
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
                // bullet.reset(this.body.x + this.body.width2, this.body.y + this.body.height/2);
                bullet.reset(this.x, this.y);
//                bullet.body.velocity.copyFrom(this.game.physics.arcade.velocityFromAngle(this.plane.angle, 1000))
//                bullet.rotation = this.plane.rotation + this.game.math.degToRad(90);
                bullet.lifespan = 2000;
                 bullet.rotation = this.rotation + this.game.math.degToRad(90);
                this.game.physics.arcade.velocityFromRotation(this.rotation, 1000, bullet.body.velocity);
                this.bulletTime = this.game.time.now + 125;
//                gameInitializer.socket.emit("fire bullet", {bulletX: bullet.x,bulletY: bullet.y, bulletAngle: bullet.rotation, angle: this.plane.angle});
                if(GlobalGame.Multiplayer.socket)
                    GlobalGame.Multiplayer.socket.emit("fire bullet", {bulletX: bullet.x,bulletY: bullet.y, bulletAngle: bullet.rotation, angle: this.angle});
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
        this.playerLoseHealth(plane);
    };

    /**
    * player flaps
     */
    Player.prototype.flap = function() {
      if(!!this.alive) {
        var velocityX,
            velocityY;

          this.direction = this.game.input.activePointer.x <= this.game.width / 2 ? 0 : 1;

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
          }
      }
    };

    /**
    * player hold touch flaps
     */
    Player.prototype.holdFlap = function() {
      if(!!this.alive) {
        var velocityX,
            velocityY;

          this.direction = this.game.input.activePointer.x <= this.game.width / 2 ? 0 : 1;

          if(this.direction !== this.planeDirection){
              this.flyLoop = true;
          } else {
              if(this.direction) {
                // velocityX = this.body.velocity.x+150;
                // velocityY = this.body.velocity.y-100;
                this.body.velocity.x += 35;
                this.body.velocity.y -= 30;
              } else {
                // velocityX = this.body.velocity.x-200;
                // velocityY = this.body.velocity.y-100;
                this.body.velocity.x -= 40;
                this.body.velocity.y -= 30;
              }
              // this.flapVelocityTween = this.game.add.tween(this.body.velocity).to({x: velocityX, y: velocityY}, 200, Phaser.Easing.Linear.None, true).start();
            this.fireBullet();
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
          // plane.tint = Math.random() * 0xffffff;
          // var lightningTween = this.game.add.tween(plane).to({tint: 0xCCFFFF}, 1000, Phaser.Easing.Exponential.Out, true, 0, 0, true);
          // lightningTween.onComplete.add(function(){plane.tint = 0xffffff}, this);

  //        gameInitializer.socket.emit("bullet hit player", {playerId: plane.name});
          if(GlobalGame.Multiplayer.socket)
              GlobalGame.Multiplayer.socket.emit("bullet hit player", {playerId: this.name});
          plane.health -= 1;

          if(plane.health < 5){
            plane.frameName = "Airplanes/Fokker/Skin 1/PNG/Fokker_default_damaged";
          } else if (plane.health < 4) {
            plane.frameName = "Airplanes/Fokker/Skin 1/PNG/Fokker_attack_damaged_1";
          } else if (plane.health < 3) {
            plane.frameName = "Airplanes/Fokker/Skin 1/PNG/Fokker_attack_damaged_2";
          }

          if(plane.health < 1){
              this.game.input.onDown.remove(this.flap, this);
              plane.body.velocity.x = 0;
              plane.body.velocity.y = 0;
              plane.body.gravity.y = 700;
              this.deadAnimation.play('explode', 10, false, true);
          }
        }
    };

module.exports = Player;

},{"../plugins/Gesture":3,"../prefabs/BasicLayer":7}],14:[function(require,module,exports){
'use strict';

var Bird = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'birdie', frame);

  // initialize your prefab here
    
    //  Here we'll create 12 of them evenly spaced apart  
//        this = this.create(Math.random() * game.world.width, Math.random() * (game.world.height - 250), 'birdie');
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.scale.setTo(0.15, 0.15);
        //  Bird physics properties.
        this.body.bounce.y = 0.2;
    //            bird.body.collideWorldBounds = true;

        this.angle = 0
        this.anchor.setTo(0.5,0.5);
        this.scale.x *= -1;
        this.animations.add('fly');
        this.events.onOutOfBounds.add(this.birdLeft, this);
  
};

Bird.prototype = Object.create(Phaser.Sprite.prototype);
Bird.prototype.constructor = Bird;

Bird.prototype.update = function() {
  
  // write your prefab's specific update code here
    		//  Collide the Bird and the stars with the platforms
//    	this.game.physics.arcade.collide(this.birds, level.platforms);
//        
                this.body.velocity.x = Math.random() * 100;
                this.animations.play('fly', 8, true);
  
};

Bird.prototype.birdLeft = function() {
            console.log(this)
            this.speed += 1;
            this.y += 4;

            if (this.body.facing === Phaser.LEFT)
            {
                this.scale.x *= 1;
                this.body.velocity.x = this.speed;
            }
            else
            {
                this.scale.x *= -1;
                this.body.velocity.x = -this.speed;
            }

};

module.exports = Bird;

},{}],15:[function(require,module,exports){
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

},{"./bird":14}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
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
        GlobalGame.Multiplayer.socket = this.socket;
    
        this.setEventHandlers();
  
};

SocketEventHandlers.prototype.constructor = SocketEventHandlers;

SocketEventHandlers.prototype = {

    setEventHandlers: function() {
        
        // Socket connection successful
        GlobalGame.Multiplayer.socket.on("connect", this.onSocketConnected);

        // Socket disconnection
        GlobalGame.Multiplayer.socket.on("disconnect", this.onSocketDisconnect);

        // New player message received
        GlobalGame.Multiplayer.socket.on("new player", this.onNewPlayer);

        // Player move message received
        GlobalGame.Multiplayer.socket.on("move player", this.onMovePlayer);

        // Player fires bullet message received
        GlobalGame.Multiplayer.socket.on("fire bullet", this.onFireBullet);

        // Bullet hits Player message received
        GlobalGame.Multiplayer.socket.on("bullet hit player", this.onBulletHitPlayer);

        // Player removed message received
        GlobalGame.Multiplayer.socket.on("remove player", this.onRemovePlayer);

    },

    // Socket connected
    onSocketConnected: function(socket) {
        console.log("Connected to socket server ");
        
        GlobalGame.Multiplayer.connected = true;
        // Send local player data to the game server
//        GlobalGame.Multiplayer.socket.emit("new player", {x: socketPlayer.x, y:socketPlayer.y, angle: socketPlayer.angle});
//        this.socket.emit("new player");
    },

    // Socket disconnected
    onSocketDisconnect: function() {
        console.log("Disconnected from socket server");
        GlobalGame.Multiplayer.connected = false;
    },

    
    // New player
    onNewPlayer: function(data) {
        console.log("New player connected: "+data.id + " players " + SocketObject.enemies.length);

        // Add new player to the remote players array data.x, data.y
        if(!SocketObject.playerById(data.id))
            SocketObject.enemies.push(new SocketRemotePlayer(data.id, socketGame, GlobalGame.player, data.x, data.y, data.angle, data.name));
        
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

},{"../prefabs/socketRemotePlayer":18}],18:[function(require,module,exports){
'use strict';

var SocketRemotePlayer = function(index, game, player, xStart, yStart, angle, name) {
  Phaser.Sprite.call(this, game, xStart, yStart, "sprites", "sprites/plane3");

  // initialize your prefab here

//    this.game = game;
    this.bullets = player.bullets;
    this.alive = true;
    
//    this.emitter = player.emitter;
   this.emitter = this.game.add.emitter(xStart, yStart, 400);

    this.emitter.makeParticles( 'sprites', 'sprites/particles/smoke' );

    this.emitter.gravity = 50;
    this.emitter.setAlpha(1, 0, 1000);
    this.emitter.setScale(0.1, 0, 0.05, 0, 1000);

    this.emitter.start(false, 3000, 5);
    
    //  Our bullet group
    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(500, 'sprites', 'sprites/bullet2');
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 1);
    this.bullets.setAll('checkWorldBounds', true);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('scale.x', 0.5);
    this.bullets.setAll('scale.y', 0.5);
    
    this.health = player.health;
    this.name = index.toString();
    this.username = name.toString();
    
    this.angle = angle;
    this.scale.setTo(player.scale.x, player.scale.y);
//        this.plane.scale.x *= -1;
    this.anchor.setTo(player.anchor.x, player.anchor.y);
//        this.plane.scale.setTo(0.23, 0.23);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
//    this.body.collideWorldBounds = true;
    
    if(this.username){
        this.username = this.game.add.text(0, -100, this.username, { fontSize: '22px', fill: '#000' });
        this.addChild(this.username);
    }

      this.hud = Phaser.Plugin.HUDManager.create(this.game, this, 'gamehud');
      this.healthHUD = this.hud.addBar(0,-50, this.width, 10, this.health, 'health', this, '#ffbd55', false);
      this.healthHUD.bar.anchor.setTo(0.5, 0.5);
      this.addChild(this.healthHUD.bar);
  
};

SocketRemotePlayer.prototype = Object.create(Phaser.Sprite.prototype);
SocketRemotePlayer.prototype.constructor = SocketRemotePlayer;

SocketRemotePlayer.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = SocketRemotePlayer;

},{}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
GlobalGame = {

    /* Here we've just got some global level vars that persist regardless of State swaps */
    score: 0,

    /* If the music in your game needs to play through-out a few State swaps, then you could reference it here */
    music: null,

    /* Your game can check BasicGame.orientated in internal loops to know if it should pause or not */
    orientated: false,

    player: null,

    /* Current Level */
    level: 1,

    scale: 0.7,

    /*
    * Controller of the Ship:
    *  **keyboardButtons (Keyboard on Desktop Buttons on Mobile)
    *  **touch (click and touch)
    */
    controller: 'touch',

    Multiplayer: {

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
    this.load.image('preloader', 'assets/preloader.gif');
    this.load.image('menu_bg', 'assets/backgrounds/menu.png');
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

},{}],21:[function(require,module,exports){

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

},{}],22:[function(require,module,exports){
'use strict';
  function Help() {}
  Help.prototype = {
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
module.exports = Help;

},{}],23:[function(require,module,exports){

'use strict';

  var BirdGroup = require('../prefabs/birdGroup');
  var EnemyPlaneGroup = require('../prefabs/EnemyPlaneGroup');
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
//        this.game.state.start('play');
        this.game.state.start('missions');
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

},{"../prefabs/EnemyPlaneGroup":9,"../prefabs/Level":10,"../prefabs/birdGroup":15,"../prefabs/labelButton":16}],24:[function(require,module,exports){
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
        // array with finished levels and stars collected.
        // 0 = playable yet unfinished level
        // 1, 2, 3 = level finished with 1, 2, 3 stars
        // 4 = locked
        this.starsArray = [0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4];

        // how many pages are needed to show all levels?
        this.pages;
        // group where to place all level thumbnails
        this.levelThumbsGroup;
        // current page
        this.currentPage;
        // arrows to navigate through level pages
        this.leftArrow;
        this.rightArrow;
        // how many pages are needed to show all levels?
		// CAUTION!! EACH PAGE SHOULD HAVE THE SAME AMOUNT OF LEVELS, THAT IS
		// THE NUMBER OF LEVELS *MUST* BE DIVISIBLE BY THUMBCOLS*THUMBROWS
  		this.pages = this.starsArray.length/(this.thumbRows*this.thumbCols);
  		// current page according to last played level, if any
		this.currentPage = Math.floor(GlobalGame.level/(this.thumbRows*this.thumbCols));
		if(this.currentPage>this.pages-1){
			this.currentPage = this.pages-1;
		}
		// left arrow button, to turn one page left
		this.leftArrow = this.game.add.button(50,this.game.height/2,"sprites",this.arrowClicked,this, 'missions/small_arrow_left_act', 'missions/small_arrow_left_no', 'missions/small_arrow_left_act', 'missions/small_arrow_left_no');
		this.leftArrow.anchor.setTo(0.5);
        this.leftArrow.name = "leftArrow";
		// can we turn one page left?
		if(this.currentPage==0){
			this.leftArrow.alpha = 0.3;
		}
		// right arrow button, to turn one page right
		this.rightArrow = this.game.add.button(this.game.width - 50,this.game.height/2,"sprites",this.arrowClicked,this, 'missions/small_arrow_right_act', 'missions/small_arrow_right_no', 'missions/small_arrow_right_act', 'missions/small_arrow_right_no');
		this.rightArrow.anchor.setTo(0.5);
        this.rightArrow.name = "rightArrow";
		// can we turn one page right?
		if(this.currentPage==this.pages-1){
			this.rightArrow.alpha = 0.3;
		}
		// creation of the thumbails group
		this.levelThumbsGroup = this.game.add.group();
        this.levelThumbsGroup.x = - this.game.width ;
		// determining level thumbnails width and height for each page
		var levelLength = this.thumbWidth*this.thumbCols+this.thumbSpacing*(this.thumbCols-1);
		var levelHeight = this.thumbWidth*this.thumbRows+this.thumbSpacing*(this.thumbRows-1);
		// looping through each page
		for(var l = 0; l < this.pages; l++){
			// horizontal offset to have level thumbnails horizontally centered in the page
			var offsetX = (this.game.width-levelLength)/2+this.game.width*l;
			// I am not interested in having level thumbnails vertically centered in the page, but
			// if you are, simple replace my "20" with
			// (game.height-levelHeight)/2
//			var offsetY = 120;
			var offsetY = (this.game.height-levelHeight)/2;
			// looping through each level thumbnails
		     for(var i = 0; i < this.thumbRows; i ++){
		     	for(var j = 0; j < this.thumbCols; j ++){  
		     		// which level does the thumbnail refer?
					var levelNumber = i*this.thumbCols+j+l*(this.thumbRows*this.thumbCols);
					// adding the thumbnail, as a button which will call thumbClicked function if clicked   		
					var levelThumb = this.game.add.button(offsetX+j*(this.thumbWidth+this.thumbSpacing), offsetY+i*(this.thumbHeight+this.thumbSpacing), "sprites", this.thumbClicked, this);	
                    var frame = "missions/level_thumb_frame_"+this.starsArray[levelNumber];
					// shwoing proper frame
					levelThumb.frameName = frame;
					// custom attribute 
					levelThumb.levelNumber = levelNumber+1;
					// adding the level thumb to the group
					this.levelThumbsGroup.add(levelThumb);
					// if the level is playable, also write level number
					if(this.starsArray[levelNumber]<4){
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
		// scrolling thumbnails group according to level position
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
		// touching right arrow and still not reached last page
		if(button.name=="rightArrow" && this.currentPage<this.pages-1){
			this.leftArrow.alpha = 1;
			this.currentPage++;
			// fade out the button if we reached last page
			if(this.currentPage == this.pages-1){
				button.alpha = 0.3;
			}
			// scrolling level pages
			var buttonsTween = this.game.add.tween(this.levelThumbsGroup);
			buttonsTween.to({
				x: this.currentPage * this.game.width * -1
			}, 500, Phaser.Easing.Cubic.None);
			buttonsTween.start();
		}
		// touching left arrow and still not reached first page
		if(button.name=="leftArrow" && this.currentPage>0){
			this.rightArrow.alpha = 1;
			this.currentPage--;
			// fade out the button if we reached first page
			if(this.currentPage == 0){
				button.alpha = 0.3;
			}
			// scrolling level pages
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
                this.game.state.start('play');
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

},{}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
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
            GlobalGame.Multiplayer.userName = document.getElementById('user_name').value;
            
            var socketEventHandlers = new SocketEventHandlers(this.game, io, null);
            
            var localGame = this.game;
            
            GlobalGame.Multiplayer.socket.on("connect",function(socket){
                var elem=document.getElementById('userNameForm');
                if(elem)
                    elem.parentNode.removeChild(elem);
                
//                localGame.transitions.to('multiplayerRoomSelect');
                  localGame.transitions.to('playMultiplayer');
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

},{"../plugins/socket.io":6,"../prefabs/socketEventHandlers":17}],28:[function(require,module,exports){

  'use strict';
  var BirdGroup = require('../prefabs/birdGroup');
  var Player = require('../prefabs/Player');
  var EnemyPlaneGroup = require('../prefabs/EnemyPlaneGroup');
  var Level = require('../prefabs/Level');
  var Level_old = require('../prefabs/Level_old');
  var PausePanel = require('../prefabs/PausePanel');
  var BasicLayer = require('../prefabs/BasicLayer');
  var GameController = require('../plugins/GameController');
  var HUDManager = require('../plugins/HUDManager');

  function Play() {}
  Play.prototype = {
    create: function() {
//        this.worldScale = 0.8
//
//        // set a minimum and maximum scale value
//        this.worldScale = Phaser.Math.clamp(this.worldScale, 0.25, 2);
//
//        // set our world scale as needed
//        this.game.world.scale.set(this.worldScale);
//
//        // set our world size to be bigger than the window so we can move the camera
//        this.game.world.setBounds(0, -200, 4000, 1000);
//
//        // move our camera half the size of the viewport back so the pivot point is in the center of our view
//        this.game.camera.x = (this.game.width * -0.5);
//        this.game.camera.y = (this.game.height * -0.5);

//        this.pauseState = false;

        // new Level Object
        this.levelJson = this.game.cache.getJSON('levelJson');
        this.currentLevel = this.levelJson.Levels[GlobalGame.level];
        console.log(this.currentLevel)

        this.level = new Level(this.game, {currentLevel: this.currentLevel});
        this.level.scale.setTo(GlobalGame.scale+GlobalGame.scale);

        // Create a new bird object
        this.birdGroup = new BirdGroup(this.game);

        // new Player Object
        // this.player = new Player(this.game, parseInt(this.currentLevel.playerStart.x), parseInt(this.currentLevel.playerStart.y), "sprites/plane3");
        this.player = new Player(this.game, parseInt(this.currentLevel.playerStart.x), parseInt(this.currentLevel.playerStart.y), "Airplanes/Fokker/Skin 1/PNG/Fokker_default");

        this.enemyPlaneGroup = new EnemyPlaneGroup(this.game, this.player);
        this.enemyPlaneGroup.addEnemy();

        // add our pause button with a callback
        this.pauseButton = this.game.add.button(this.game.width - 100, 20, 'sprites', this.pauseGame, this, 'menu/btn-pause', 'menu/btn-pause', 'menu/btn-pause', 'menu/btn-pause');
        this.pauseButton.fixedToCamera = true;
        this.pauseButton.inputEnabled = true;
//        this.pauseButton.anchor.setTo(0.5,0.5);
        // this.pauseButton.scale.setTo(0.75,0.75);

        //GameStart Layer
//        this.basicLayer = new BasicLayer(this.game)
        this.createPlayers();

        // Let's build a pause panel
        this.pausePanel = new PausePanel(this.game);

        // this.bounds = Phaser.Rectangle.clone(this.game.camera.bounds);
        this.zoomTo(GlobalGame.scale);

        // Add a input listener that can help us return from being paused
        this.game.input.onDown.add(this.unpause, this);
    },

    update: function(){
      this.enemyPlaneGroup.forEachAlive(function(enemyPlane){
          if(!enemyPlane.inCamera){
              enemyPlane.arrow.visible = true;
//              enemyPlane.arrow.position.setTo(this.game.camera.view.x,this.game.camera.view.y)
              enemyPlane.arrow.rotation = this.game.physics.arcade.angleBetween(enemyPlane.arrow, enemyPlane);
          }else {
              enemyPlane.arrow.visible = false;
          }
      }, this)
    },

    render: function(){
    //  this.game.debug.body(this.player, 32, 32);
//        this.game.debug.cameraInfo(this.game.camera, 32, 32);
      // this.game.debug.cameraInfo(this.game.camera, 500, 32);
      // this.game.debug.spriteCoords(this, 32, 32);
    },

    createPlayers: function(){
//        this.basicLayer.removeAll();

        this.game.add.existing(this.player);
        if(!this.player.alive){
            this.player.x = 400;
            this.player.y = 400;
            this.player.body.velocity.setTo(300, 0);
            this.player.revive(5);
//            this.player.bullets.reverse();
//            this.player.emitter.revive();
        }


    },

    paused: function() {
        console.log('paused')
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

    zoomTo: function(scale, duration){
      var bounds       = this.game.world.bounds;
      var cameraBounds = this.game.camera.bounds;
      var postionScale = (1 - scale) / 2;
      var x      = bounds.width  * postionScale,
        y      = bounds.height * postionScale,
        width  = bounds.width  * scale,
        height = bounds.height * scale;
      if (!duration) {
            // cameraBounds.x      = x;
            // cameraBounds.y      = y;
            // cameraBounds.width  = width;
            // cameraBounds.height = height;
            this.game.camera.scale.setTo(scale);
      } else {
        // this.game.add.tween(cameraBounds)
        // .to({x, y, width, height}, duration).start();
        this.game.add.tween(cameraBounds)
        .to({width, height}, duration).start();
        return this.game.add.tween(this.game.camera.scale)
        .to({x: scale, y: scale}, duration).start();
      }
    },

    // And finally the method that handels the pause menu
    unpause: function(event){
        // Only act if paused
        if(this.game.paused){
            // Calculate the corners of the menu
            var w = window.innerWidth,
                h = window.innerHeight,
                x1 = w/2 - 270/2, x2 = x1,
                y1 = h/2 - 180/2, y2 = y1;

            // Check if the click was inside the menu
            if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){
                // The choicemap is an array that will help us see which item was clicked
                var choisemap = ['one', 'two', 'three', 'four', 'five', 'six'];

                // Get menu local coordinates for the click
                var x = event.x - x1,
                    y = event.y - y1;

                // Calculate the choice
                var choise = Math.floor(x / 90) + 3*Math.floor(y / 90);
//                var choise = (x / 90)<< 0 + (3 * (y / 90)<< 0);

                console.log(choise)

                // Display the choice
                console.log('You chose menu item: ' + choisemap[choise]);
            }
            else{
                this.playGame();
            }
        }
    }

  };

  module.exports = Play;

},{"../plugins/GameController":2,"../plugins/HUDManager":4,"../prefabs/BasicLayer":7,"../prefabs/EnemyPlaneGroup":9,"../prefabs/Level":10,"../prefabs/Level_old":11,"../prefabs/PausePanel":12,"../prefabs/Player":13,"../prefabs/birdGroup":15}],29:[function(require,module,exports){
'use strict';
  var GameController = require('../plugins/GameController');
  var HUDManager = require('../plugins/HUDManager');  
  var io = require('../plugins/socket.io');  
  var BirdGroup = require('../prefabs/birdGroup');  
  var Player = require('../prefabs/Player');  
  var PausePanel = require('../prefabs/PausePanel');
  var Level = require('../prefabs/Level');  
  var SocketEventHandlers = require('../prefabs/socketEventHandlers');  
 var BasicLayer = require('../prefabs/BasicLayer'); 


  function PlayMultiplayer() {}
  PlayMultiplayer.prototype = {
    preload: function() {
      // Override this method to add some load operations. 
      // If you need to use the loader, you may need to use them here.
    },
    create: function() {
      // This method is called after the game engine successfully switches states. 
      // Feel free to add any setup code here (do not load anything here, override preload() instead).
        
        // new Level Object
        this.level = new Level(this.game);
        
        // Create a new bird object
        this.birdGroup = new BirdGroup(this.game);
        
        // new Player Object
        this.player = new Player(this.game, 400, 400, "sprites/plane3");
        this.game.add.existing(this.player);
        
        GlobalGame.player = this.player;
        
        this.socketEventHandlers = new SocketEventHandlers(this.game, io);

        GlobalGame.Multiplayer.socketEventHandlers = this.socketEventHandlers;
        
        // add our pause button with a callback
        this.pauseButton = this.game.add.button(this.game.width - 100, 20, 'sprites', this.pauseGame, this, 'menu/btn-pause', 'menu/btn-pause', 'menu/btn-pause', 'menu/btn-pause');
        this.pauseButton.fixedToCamera = true;
        this.pauseButton.inputEnabled = true;
//        this.pauseButton.anchor.setTo(0.5,0.5);
        this.pauseButton.scale.setTo(0.75,0.75);
        
        // Let's build a pause panel
        this.pausePanel = new PausePanel(this.game);
                //GameStart Layer    
//        this.basicLayer = new BasicLayer(this.game)
        
        // Add a input listener that can help us return from being paused
        this.game.input.onDown.add(this.unpause, this);
        
//        console.log(GlobalGame.Multiplayer.socket.sessionid)
//        if(!this.socketEventHandlers.playerById(GlobalGame.Multiplayer.socket.sessionid))
        GlobalGame.Multiplayer.socket.emit("new player", {x: this.player.x, y:this.player.y, angle: this.player.angle, name: GlobalGame.Multiplayer.userName});
    },
    createPlayers: function(){
        if(!this.player.alive){
            this.player.x = 400;
            this.player.y = 400;
            this.player.body.velocity.setTo(300, 0);
            this.player.revive(5);
//            this.player.bullets.reverse();
//            this.player.emitter.revive();
        }


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
        // And finally the method that handels the pause menu
        unpause: function(event){
            // Only act if paused
            if(this.game.paused){
                // Calculate the corners of the menu
                var w = window.innerWidth,
                    h = window.innerHeight,
                    x1 = w/2 - 270/2, x2 = w/2 + 270/2,
                    y1 = h/2 - 180/2, y2 = h/2 + 180/2;

                // Check if the click was inside the menu
                if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){
                    // The choicemap is an array that will help us see which item was clicked
                    var choisemap = ['one', 'two', 'three', 'four', 'five', 'six'];

                    // Get menu local coordinates for the click
                    var x = event.x - x1,
                        y = event.y - y1;

                    // Calculate the choice 
                    var choise = Math.floor(x / 90) + 3*Math.floor(y / 90);

                    // Display the choice
                    console.log('You chose menu item: ' + choisemap[choise]);
                }
                else{
                    this.playGame();
                }
            }
        },
    render: function() {
      // Put render operations here.
    },
    shutdown: function() {
      // This method will be called when the state is shut down 
      // (i.e. you switch to another state from this one).
    }
  };
module.exports = PlayMultiplayer;

},{"../plugins/GameController":2,"../plugins/HUDManager":4,"../plugins/socket.io":6,"../prefabs/BasicLayer":7,"../prefabs/Level":10,"../prefabs/PausePanel":12,"../prefabs/Player":13,"../prefabs/birdGroup":15,"../prefabs/socketEventHandlers":17}],30:[function(require,module,exports){

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
    this.load.atlasJSONHash('sprites', 'assets/sprites.png', 'assets/sprites.json');
    this.load.atlasJSONHash('airplanes', 'assets/airplanes.png', 'assets/airplanes.json');
    // this.load.atlasJSONHash('sprites1', 'assets/sprites1.png', 'assets/sprites1.json');
    // this.load.atlasJSONHash('sprites2', 'assets/sprites2.png', 'assets/sprites2.json');

    this.load.json('levelJson', 'assets/levels/levels.json');

    //BIRD
    this.load.spritesheet('birdie', 'assets/img/sprites/bird.png', 189, 169, 3);

    //PLAYER
    this.load.spritesheet('airplaneexplode', 'assets/img/sprites/effects/airplaneexplosion.png', 128, 115, 8);

    //PLAYER Buttons
    this.load.spritesheet('buttonvertical', 'assets/img/buttons/button-vertical.png',64,64);
    this.load.spritesheet('buttonhorizontal', 'assets/img/buttons/button-horizontal.png',96,64);
    this.load.spritesheet('buttondiagonal', 'assets/img/buttons/button-diagonal.png',64,64);
    this.load.spritesheet('buttonfire', 'assets/img/buttons/button-round-a.png',96,96);
    this.load.spritesheet('buttonjump', 'assets/img/buttons/button-round-b.png',96,96);

    //LEVEL
//    this.load.image('bg1', 'assets/backgrounds/bg1.png');
//    this.load.image('bg2', 'assets/backgrounds/bg2.png');
    this.load.image('bg1', 'assets/backgrounds/cloudsBackground.png');
    this.load.image('ground', 'assets/backgrounds/ground.png');
    this.load.image('treesMountain1', 'assets/backgrounds/treesMountain.png');

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

},{"../plugins/phaser-state-transition.min.js":5}],31:[function(require,module,exports){
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

},{}]},{},[1])