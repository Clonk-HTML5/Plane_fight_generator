(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'plane_fight');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('playMultiplayer', require('./states/playMultiplayer'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":12,"./states/gameover":13,"./states/menu":14,"./states/play":15,"./states/playMultiplayer":16,"./states/preload":17}],2:[function(require,module,exports){
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
      bmd.refreshBuffer();
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



},{}],4:[function(require,module,exports){
/*! Hammer.JS - v1.0.10 - 2014-03-28
 * http://eightmedia.github.io/hammer.js
 *
 * Copyright (c) 2014 Jorik Tangelder <j.tangelder@gmail.com>;
 * Licensed under the MIT license */


!function(a,b){"use strict";function c(){d.READY||(s.determineEventTypes(),o.each(d.gestures,function(a){u.register(a)}),s.onTouch(d.DOCUMENT,m,u.detect),s.onTouch(d.DOCUMENT,n,u.detect),d.READY=!0)}var d=function(a,b){return new d.Instance(a,b||{})};d.VERSION="1.0.10",d.defaults={stop_browser_behavior:{userSelect:"none",touchAction:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}},d.HAS_POINTEREVENTS=a.navigator.pointerEnabled||a.navigator.msPointerEnabled,d.HAS_TOUCHEVENTS="ontouchstart"in a,d.MOBILE_REGEX=/mobile|tablet|ip(ad|hone|od)|android|silk/i,d.NO_MOUSEEVENTS=d.HAS_TOUCHEVENTS&&a.navigator.userAgent.match(d.MOBILE_REGEX),d.EVENT_TYPES={},d.UPDATE_VELOCITY_INTERVAL=16,d.DOCUMENT=a.document;var e=d.DIRECTION_DOWN="down",f=d.DIRECTION_LEFT="left",g=d.DIRECTION_UP="up",h=d.DIRECTION_RIGHT="right",i=d.POINTER_MOUSE="mouse",j=d.POINTER_TOUCH="touch",k=d.POINTER_PEN="pen",l=d.EVENT_START="start",m=d.EVENT_MOVE="move",n=d.EVENT_END="end";d.plugins=d.plugins||{},d.gestures=d.gestures||{},d.READY=!1;var o=d.utils={extend:function(a,c,d){for(var e in c)a[e]!==b&&d||(a[e]=c[e]);return a},each:function(a,c,d){var e,f;if("forEach"in a)a.forEach(c,d);else if(a.length!==b){for(e=-1;f=a[++e];)if(c.call(d,f,e,a)===!1)return}else for(e in a)if(a.hasOwnProperty(e)&&c.call(d,a[e],e,a)===!1)return},inStr:function(a,b){return a.indexOf(b)>-1},hasParent:function(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1},getCenter:function(a){var b=[],c=[],d=[],e=[],f=Math.min,g=Math.max;return 1===a.length?{pageX:a[0].pageX,pageY:a[0].pageY,clientX:a[0].clientX,clientY:a[0].clientY}:(o.each(a,function(a){b.push(a.pageX),c.push(a.pageY),d.push(a.clientX),e.push(a.clientY)}),{pageX:(f.apply(Math,b)+g.apply(Math,b))/2,pageY:(f.apply(Math,c)+g.apply(Math,c))/2,clientX:(f.apply(Math,d)+g.apply(Math,d))/2,clientY:(f.apply(Math,e)+g.apply(Math,e))/2})},getVelocity:function(a,b,c){return{x:Math.abs(b/a)||0,y:Math.abs(c/a)||0}},getAngle:function(a,b){var c=b.clientX-a.clientX,d=b.clientY-a.clientY;return 180*Math.atan2(d,c)/Math.PI},getDirection:function(a,b){var c=Math.abs(a.clientX-b.clientX),d=Math.abs(a.clientY-b.clientY);return c>=d?a.clientX-b.clientX>0?f:h:a.clientY-b.clientY>0?g:e},getDistance:function(a,b){var c=b.clientX-a.clientX,d=b.clientY-a.clientY;return Math.sqrt(c*c+d*d)},getScale:function(a,b){return a.length>=2&&b.length>=2?this.getDistance(b[0],b[1])/this.getDistance(a[0],a[1]):1},getRotation:function(a,b){return a.length>=2&&b.length>=2?this.getAngle(b[1],b[0])-this.getAngle(a[1],a[0]):0},isVertical:function(a){return a==g||a==e},toggleDefaultBehavior:function(a,b,c){if(b&&a&&a.style){o.each(["webkit","moz","Moz","ms","o",""],function(d){o.each(b,function(b,e){d&&(e=d+e.substring(0,1).toUpperCase()+e.substring(1)),e in a.style&&(a.style[e]=!c&&b)})});var d=function(){return!1};"none"==b.userSelect&&(a.onselectstart=!c&&d),"none"==b.userDrag&&(a.ondragstart=!c&&d)}}};d.Instance=function(a,b){var e=this;return c(),this.element=a,this.enabled=!0,this.options=o.extend(o.extend({},d.defaults),b||{}),this.options.stop_browser_behavior&&o.toggleDefaultBehavior(this.element,this.options.stop_browser_behavior,!1),this.eventStartHandler=s.onTouch(a,l,function(a){e.enabled&&u.startDetect(e,a)}),this.eventHandlers=[],this},d.Instance.prototype={on:function(a,b){var c=a.split(" ");return o.each(c,function(a){this.element.addEventListener(a,b,!1),this.eventHandlers.push({gesture:a,handler:b})},this),this},off:function(a,b){var c,d,e=a.split(" ");return o.each(e,function(a){for(this.element.removeEventListener(a,b,!1),c=-1;d=this.eventHandlers[++c];)d.gesture===a&&d.handler===b&&this.eventHandlers.splice(c,1)},this),this},trigger:function(a,b){b||(b={});var c=d.DOCUMENT.createEvent("Event");c.initEvent(a,!0,!0),c.gesture=b;var e=this.element;return o.hasParent(b.target,e)&&(e=b.target),e.dispatchEvent(c),this},enable:function(a){return this.enabled=a,this},dispose:function(){var a,b;for(this.options.stop_browser_behavior&&o.toggleDefaultBehavior(this.element,this.options.stop_browser_behavior,!0),a=-1;b=this.eventHandlers[++a];)this.element.removeEventListener(b.gesture,b.handler,!1);return this.eventHandlers=[],s.unbindDom(this.element,d.EVENT_TYPES[l],this.eventStartHandler),null}};var p=null,q=!1,r=!1,s=d.event={bindDom:function(a,b,c){var d=b.split(" ");o.each(d,function(b){a.addEventListener(b,c,!1)})},unbindDom:function(a,b,c){var d=b.split(" ");o.each(d,function(b){a.removeEventListener(b,c,!1)})},onTouch:function(a,b,c){var e=this,f=function(f){var g=f.type.toLowerCase();if(!o.inStr(g,"mouse")||!r){o.inStr(g,"touch")||o.inStr(g,"pointerdown")||o.inStr(g,"mouse")&&1===f.which?q=!0:o.inStr(g,"mouse")&&!f.which&&(q=!1),(o.inStr(g,"touch")||o.inStr(g,"pointer"))&&(r=!0);var h=0;q&&(d.HAS_POINTEREVENTS&&b!=n?h=t.updatePointer(b,f):o.inStr(g,"touch")?h=f.touches.length:r||(h=o.inStr(g,"up")?0:1),h>0&&b==n?b=m:h||(b=n),(h||null===p)&&(p=f),c.call(u,e.collectEventData(a,b,e.getTouchList(p,b),f)),d.HAS_POINTEREVENTS&&b==n&&(h=t.updatePointer(b,f))),h||(p=null,q=!1,r=!1,t.reset())}};return this.bindDom(a,d.EVENT_TYPES[b],f),f},determineEventTypes:function(){var a;a=d.HAS_POINTEREVENTS?t.getEvents():d.NO_MOUSEEVENTS?["touchstart","touchmove","touchend touchcancel"]:["touchstart mousedown","touchmove mousemove","touchend touchcancel mouseup"],d.EVENT_TYPES[l]=a[0],d.EVENT_TYPES[m]=a[1],d.EVENT_TYPES[n]=a[2]},getTouchList:function(a){return d.HAS_POINTEREVENTS?t.getTouchList():a.touches?a.touches:(a.identifier=1,[a])},collectEventData:function(a,b,c,d){var e=j;return(o.inStr(d.type,"mouse")||t.matchType(i,d))&&(e=i),{center:o.getCenter(c),timeStamp:Date.now(),target:d.target,touches:c,eventType:b,pointerType:e,srcEvent:d,preventDefault:function(){var a=this.srcEvent;a.preventManipulation&&a.preventManipulation(),a.preventDefault&&a.preventDefault()},stopPropagation:function(){this.srcEvent.stopPropagation()},stopDetect:function(){return u.stopDetect()}}}},t=d.PointerEvent={pointers:{},getTouchList:function(){var a=[];return o.each(this.pointers,function(b){a.push(b)}),a},updatePointer:function(a,b){return a==n?delete this.pointers[b.pointerId]:(b.identifier=b.pointerId,this.pointers[b.pointerId]=b),Object.keys(this.pointers).length},matchType:function(a,b){if(!b.pointerType)return!1;var c=b.pointerType,d={};return d[i]=c===i,d[j]=c===j,d[k]=c===k,d[a]},getEvents:function(){return["pointerdown MSPointerDown","pointermove MSPointerMove","pointerup pointercancel MSPointerUp MSPointerCancel"]},reset:function(){this.pointers={}}},u=d.detection={gestures:[],current:null,previous:null,stopped:!1,startDetect:function(a,b){this.current||(this.stopped=!1,this.current={inst:a,startEvent:o.extend({},b),lastEvent:!1,lastVelocityEvent:!1,velocity:!1,name:""},this.detect(b))},detect:function(a){if(this.current&&!this.stopped){a=this.extendEventData(a);var b=this.current.inst,c=b.options;return o.each(this.gestures,function(d){return this.stopped||c[d.name]===!1||b.enabled===!1||d.handler.call(d,a,b)!==!1?void 0:(this.stopDetect(),!1)},this),this.current&&(this.current.lastEvent=a),a.eventType==n&&!a.touches.length-1&&this.stopDetect(),a}},stopDetect:function(){this.previous=o.extend({},this.current),this.current=null,this.stopped=!0},getVelocityData:function(a,b,c,e){var f=this.current,g=f.lastVelocityEvent,h=f.velocity;g&&a.timeStamp-g.timeStamp>d.UPDATE_VELOCITY_INTERVAL?(h=o.getVelocity(a.timeStamp-g.timeStamp,a.center.clientX-g.center.clientX,a.center.clientY-g.center.clientY),f.lastVelocityEvent=a):f.velocity||(h=o.getVelocity(b,c,e),f.lastVelocityEvent=a),f.velocity=h,a.velocityX=h.x,a.velocityY=h.y},getInterimData:function(a){var b,c,d=this.current.lastEvent;a.eventType==n?(b=d&&d.interimAngle,c=d&&d.interimDirection):(b=d&&o.getAngle(d.center,a.center),c=d&&o.getDirection(d.center,a.center)),a.interimAngle=b,a.interimDirection=c},extendEventData:function(a){var b=this.current,c=b.startEvent;(a.touches.length!=c.touches.length||a.touches===c.touches)&&(c.touches=[],o.each(a.touches,function(a){c.touches.push(o.extend({},a))}));var d=a.timeStamp-c.timeStamp,e=a.center.clientX-c.center.clientX,f=a.center.clientY-c.center.clientY;return this.getVelocityData(a,d,e,f),this.getInterimData(a),o.extend(a,{startEvent:c,deltaTime:d,deltaX:e,deltaY:f,distance:o.getDistance(c.center,a.center),angle:o.getAngle(c.center,a.center),direction:o.getDirection(c.center,a.center),scale:o.getScale(c.touches,a.touches),rotation:o.getRotation(c.touches,a.touches)}),a},register:function(a){var c=a.defaults||{};return c[a.name]===b&&(c[a.name]=!0),o.extend(d.defaults,c,!0),a.index=a.index||1e3,this.gestures.push(a),this.gestures.sort(function(a,b){return a.index<b.index?-1:a.index>b.index?1:0}),this.gestures}};d.gestures.Drag={name:"drag",index:50,defaults:{drag_min_distance:10,correct_for_drag_min_distance:!0,drag_max_touches:1,drag_block_horizontal:!1,drag_block_vertical:!1,drag_lock_to_axis:!1,drag_lock_min_distance:25},triggered:!1,handler:function(a,b){var c=u.current;if(c.name!=this.name&&this.triggered)return b.trigger(this.name+"end",a),void(this.triggered=!1);if(!(b.options.drag_max_touches>0&&a.touches.length>b.options.drag_max_touches))switch(a.eventType){case l:this.triggered=!1;break;case m:if(a.distance<b.options.drag_min_distance&&c.name!=this.name)return;var d=c.startEvent.center;if(c.name!=this.name&&(c.name=this.name,b.options.correct_for_drag_min_distance&&a.distance>0)){var i=Math.abs(b.options.drag_min_distance/a.distance);d.pageX+=a.deltaX*i,d.pageY+=a.deltaY*i,d.clientX+=a.deltaX*i,d.clientY+=a.deltaY*i,a=u.extendEventData(a)}(c.lastEvent.drag_locked_to_axis||b.options.drag_lock_to_axis&&b.options.drag_lock_min_distance<=a.distance)&&(a.drag_locked_to_axis=!0);var j=c.lastEvent.direction;a.drag_locked_to_axis&&j!==a.direction&&(a.direction=o.isVertical(j)?a.deltaY<0?g:e:a.deltaX<0?f:h),this.triggered||(b.trigger(this.name+"start",a),this.triggered=!0),b.trigger(this.name,a),b.trigger(this.name+a.direction,a);var k=o.isVertical(a.direction);(b.options.drag_block_vertical&&k||b.options.drag_block_horizontal&&!k)&&a.preventDefault();break;case n:this.triggered&&b.trigger(this.name+"end",a),this.triggered=!1}}},d.gestures.Hold={name:"hold",index:10,defaults:{hold_timeout:500,hold_threshold:2},timer:null,handler:function(a,b){switch(a.eventType){case l:clearTimeout(this.timer),u.current.name=this.name,this.timer=setTimeout(function(){"hold"==u.current.name&&b.trigger("hold",a)},b.options.hold_timeout);break;case m:a.distance>b.options.hold_threshold&&clearTimeout(this.timer);break;case n:clearTimeout(this.timer)}}},d.gestures.Release={name:"release",index:1/0,handler:function(a,b){a.eventType==n&&b.trigger(this.name,a)}},d.gestures.Swipe={name:"swipe",index:40,defaults:{swipe_min_touches:1,swipe_max_touches:1,swipe_velocity:.7},handler:function(a,b){if(a.eventType==n){if(a.touches.length<b.options.swipe_min_touches||a.touches.length>b.options.swipe_max_touches)return;(a.velocityX>b.options.swipe_velocity||a.velocityY>b.options.swipe_velocity)&&(b.trigger(this.name,a),b.trigger(this.name+a.direction,a))}}},d.gestures.Tap={name:"tap",index:100,defaults:{tap_max_touchtime:250,tap_max_distance:10,tap_always:!0,doubletap_distance:20,doubletap_interval:300},has_moved:!1,handler:function(a,b){var c,d,e;a.eventType==l?this.has_moved=!1:a.eventType!=m||this.moved?a.eventType==n&&"touchcancel"!=a.srcEvent.type&&a.deltaTime<b.options.tap_max_touchtime&&!this.has_moved&&(c=u.previous,d=c&&c.lastEvent&&a.timeStamp-c.lastEvent.timeStamp,e=!1,c&&"tap"==c.name&&d&&d<b.options.doubletap_interval&&a.distance<b.options.doubletap_distance&&(b.trigger("doubletap",a),e=!0),(!e||b.options.tap_always)&&(u.current.name="tap",b.trigger(u.current.name,a))):this.has_moved=a.distance>b.options.tap_max_distance}},d.gestures.Touch={name:"touch",index:-1/0,defaults:{prevent_default:!1,prevent_mouseevents:!1},handler:function(a,b){return b.options.prevent_mouseevents&&a.pointerType==i?void a.stopDetect():(b.options.prevent_default&&a.preventDefault(),void(a.eventType==l&&b.trigger(this.name,a)))}},d.gestures.Transform={name:"transform",index:45,defaults:{transform_min_scale:.01,transform_min_rotation:1,transform_always_block:!1,transform_within_instance:!1},triggered:!1,handler:function(a,b){if(u.current.name!=this.name&&this.triggered)return b.trigger(this.name+"end",a),void(this.triggered=!1);if(!(a.touches.length<2)){if(b.options.transform_always_block&&a.preventDefault(),b.options.transform_within_instance)for(var c=-1;a.touches[++c];)if(!o.hasParent(a.touches[c].target,b.element))return;switch(a.eventType){case l:this.triggered=!1;break;case m:var d=Math.abs(1-a.scale),e=Math.abs(a.rotation);if(d<b.options.transform_min_scale&&e<b.options.transform_min_rotation)return;u.current.name=this.name,this.triggered||(b.trigger(this.name+"start",a),this.triggered=!0),b.trigger(this.name,a),e>b.options.transform_min_rotation&&b.trigger("rotate",a),d>b.options.transform_min_scale&&(b.trigger("pinch",a),b.trigger("pinch"+(a.scale<1?"in":"out"),a));break;case n:this.triggered&&b.trigger(this.name+"end",a),this.triggered=!1}}}},"function"==typeof define&&define.amd?define(function(){return d}):"object"==typeof module&&module.exports?module.exports=d:a.Hammer=d}(window);
//# sourceMappingURL=hammer.min.map
},{}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
'use strict';

var Level = function(game, parent) {
  Phaser.Group.call(this, game, parent);

  // initialize your prefab here
    this.game.world.setBounds(0, 0, 4000, 1000);
    //fix background to camera
    this.background = this.game.add.sprite(0, 0, 'sky_new');
    this.background.fixedToCamera = true;
    this.background.cameraOffset.x = 0;
    this.background.cameraOffset.y = 0;

    this.mountains = this.game.add.sprite(0, 482, 'mountains');
    this.mountains2 = this.game.add.sprite(2560, 482, 'mountains');
  
  //  The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.game.add.group();

    var lastGroundYPos = 0,
        treeName,
        tree,
        lastGroundYPos;

    for(var i = 0; i < 25; i++){

        treeName = 'tree'+Math.round(Math.random() * 4);

        var tree = this.game.add.sprite(Math.random() * this.game.world.width, 716, treeName);
        tree.scale.setTo(0.25, 0.25);

        var clouds = this.game.add.sprite(Math.random() * this.game.world.width, Math.random() * this.game.world.height - 400, 'clouds1');
        var clouds2 = this.game.add.sprite(Math.random() * this.game.world.width, Math.random() * this.game.world.height - 400, 'clouds2');
    }

    while (lastGroundYPos < this.game.world.width){
        // Here we create the ground.
        var ground = this.platforms.create(lastGroundYPos, this.game.world.height - 132, 'ground');
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

module.exports = Level;

},{}],7:[function(require,module,exports){
'use strict';

  var Hammer = require('../plugins/Hammer');   

var Player = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'plane3', frame);

  // initialize your prefab here
    
        this.emitter = this.game.add.emitter(400, 400, 400);

        this.emitter.makeParticles( [ 'smoke' ] );

        this.emitter.gravity = 50;
        this.emitter.setAlpha(1, 0, 1000);
        this.emitter.setScale(0.1, 0, 0.05, 0, 1000);

        this.emitter.start(false, 3000, 5);
        
        //  Our bullet group
        this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(500, 'bullet2');
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 1);
        this.bullets.setAll('checkWorldBounds', true);
        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('scale.x', 0.5);
        this.bullets.setAll('scale.y', 0.5);
        this.bulletTime = 0;
        
        this.health = 5;
        this.kills = 0;
        this.angle = 0;
        this.scale.setTo(0.6, 0.6);
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
      this.addChild(this.healthHUD.bar);
    
    
        //Camera
        this.game.camera.follow(this);

        //Controlls initialize
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.game.input.addPointer();
    
    
    /*******************
    * Hammertime
    *******************/
        var element = document.getElementsByTagName('canvas')[0],
        _this = this;
        
        var options = {
          preventDefault: true
        };
        if(typeof Hammer != "undefined"){
            var hammertime = new Hammer(element, options);
            hammertime.on("dragup swipeup", function(ev){ 
                _this.game.physics.arcade.velocityFromAngle(_this.angle, 300, _this.body.velocity);
                _this.body.angularVelocity -= 100;
            });        
            hammertime.on("dragdown swipedown", function(ev){ 
                _this.game.physics.arcade.velocityFromAngle(_this.angle, 300, _this.body.velocity);
                _this.body.angularVelocity += 100;
            });
        }
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
    
        this.body.angularVelocity = 0;
        
        /**
         * Cursor functions starts
         */
        if (this.cursors.up.isDown) {
            this.game.physics.arcade.velocityFromAngle(this.angle, 600, this.body.velocity);
        } 
//        else if(this.cursors.down.isDown){
//            this.body.velocity.setTo(0, 0)
//        }
        if (this.cursors.left.isDown) {
//            this.body.rotateLeft(100);
            this.game.physics.arcade.velocityFromAngle(this.angle, 300, this.body.velocity);
            this.body.angularVelocity -= 100;
        } else if (this.cursors.right.isDown) {
            this.game.physics.arcade.velocityFromAngle(this.angle, 300, this.body.velocity);
            this.body.angularVelocity += 100;
//            this.body.rotateRight(100);
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
        {
            this.fireBullet();
        }
        
        
//        if (this.game.input.mousePointer.isDown || this.game.input.pointer1.isDown) {
//            this.rotation = this.game.physics.arcade.moveToPointer(this, 20, this.game.input.activePointer, 500);
////            this.fireBullet();
//        }
        
        var px = this.body.velocity.x;
        var py = this.body.velocity.y;

        px *= -1;
        py *= -1;

        this.emitter.minParticleSpeed.set(px, py);
        this.emitter.maxParticleSpeed.set(px, py);
        
        this.emitter.emitX = this.x;
        this.emitter.emitY = this.y;

        this.socket.socket.emit("move player", {x: this.x, y:this.y, angle: this.angle});
  
};

     /**
     * player collides with enemy
     * @param enemy enemy collides
     * @param player player collides
     */
    Player.prototype.shootPlayer = function (plane, bullet) {
        // Removes the star from the screen
        bullet.kill();
//        console.log(plane, bullet)
//        gameInitializer.socket.emit("bullet hit player", {playerId: plane.name});
        this.socket.socket.emit("bullet hit player", {playerId: this.name});
        plane.health --;
        if(plane.health < 1){
            plane.kill(); 
            plane.emitter.kill();
            plane.bullets.removeAll();
        }
    };
    
    Player.prototype.fireBullet = function() {

        if (this.game.time.now > this.bulletTime)
        {
            
            var bullet = this.bullets.getFirstExists(false);

            if (bullet)
            {
                bullet.reset(this.body.x + this.body.width/2, this.body.y + this.body.height/2);
//                bullet.body.velocity.copyFrom(this.game.physics.arcade.velocityFromAngle(this.plane.angle, 1000))
//                bullet.rotation = this.plane.rotation + this.game.math.degToRad(90);
                bullet.lifespan = 2000;
                 bullet.rotation = this.rotation + this.game.math.degToRad(90);
                this.game.physics.arcade.velocityFromRotation(this.rotation, 1000, bullet.body.velocity);
                this.bulletTime = this.game.time.now + 250;
//                gameInitializer.socket.emit("fire bullet", {bulletX: bullet.x,bulletY: bullet.y, bulletAngle: bullet.rotation, angle: this.plane.angle});
                this.socket.socket.emit("fire bullet", {bulletX: bullet.x,bulletY: bullet.y, bulletAngle: bullet.rotation, angle: this.angle});
            }
        }

    };

    /**
     * player collides with enemy
     * @param enemy enemy collides
     * @param player player collides
     */
    Player.prototype.bulletHitsBird = function (bullet, bird) {
        // Removes the star from the screen
        bird.kill();
        bullet.kill()
    };
    
            /**
     * player collides with enemy
     * @param enemy enemy collides
     * @param player player collides
     */
    Player.prototype.playerHitsBird = function (plane, bird) {
        // Removes the star from the screen
        bird.kill();
//        gameInitializer.socket.emit("bullet hit player", {playerId: plane.name});
        this.socket.socket.emit("bullet hit player", {playerId: this.name});
        plane.health -= 1
        if(plane.health < 1){
            plane.kill();
            plane.emitter.kill();
            plane.bullets.removeAll();
        }
    };

module.exports = Player;

},{"../plugins/Hammer":4}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
'use strict';

var Bird = require('./bird');

var BirdGroup = function(game, parent) {
  Phaser.Group.call(this, game, parent);

//    this = game.add.group();
    this.setAll('checkWorldBounds', true);
    this.setAll('outOfBoundsKill', true);
    // create single birds
    for (var i = 0; i < 12; i++){      
        this.bird = new Bird(this.game, Math.random() * game.world.width, Math.random() * (game.world.height - 250), 0);
        this.add(this.bird);
    }
    
  // initialize your prefab here
  
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

module.exports = BirdGroup;
},{"./bird":8}],10:[function(require,module,exports){
'use strict';
var socketPlayer,
    socketGame,
    socketInGlobalScope,
    SocketObject,
    SocketRemotePlayer = require('../prefabs/socketRemotePlayer');  

var SocketEventHandlers = function(game, player, io) {
        // Start listening for events
            //  Create some baddies to waste :)
//        this.enemies = [];
        socketGame = game;
        socketPlayer = player;
        SocketObject = this;
        this.enemies = [];
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
        socketInGlobalScope.emit("new player", {x: socketPlayer.x, y:socketPlayer.y, angle: socketPlayer.angle});
//        this.socket.emit("new player");
    },

    // Socket disconnected
    onSocketDisconnect: function() {
        console.log("Disconnected from socket server");
    },

    
    // New player
    onNewPlayer: function(data) {
        console.log("New player connected: "+data.id + " players " + SocketObject.enemies.length);

        // Add new player to the remote players array data.x, data.y
        SocketObject.enemies.push(new SocketRemotePlayer(data.id, socketGame, socketPlayer, data.x, data.y, socketPlayer.angle));
        
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

},{"../prefabs/socketRemotePlayer":11}],11:[function(require,module,exports){
'use strict';

var SocketRemotePlayer = function(index, game, player, xStart, yStart, angle) {
  Phaser.Sprite.call(this, game, xStart, yStart, 'plane3', 0);

  // initialize your prefab here

//    this.game = game;
    this.bullets = player.bullets;
    this.alive = true;
    
//    this.emitter = player.emitter;
   this.emitter = this.game.add.emitter(xStart, yStart, 400);

    this.emitter.makeParticles( [ 'smoke' ] );

    this.emitter.gravity = 50;
    this.emitter.setAlpha(1, 0, 1000);
    this.emitter.setScale(0.1, 0, 0.05, 0, 1000);

    this.emitter.start(false, 3000, 5);
    
    //  Our bullet group
    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(500, 'bullet2');
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 1);
    this.bullets.setAll('checkWorldBounds', true);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('scale.x', 0.5);
    this.bullets.setAll('scale.y', 0.5);
    
    this.health = player.health;
    this.name = index.toString();
    
    this.angle = angle;
    this.scale.setTo(player.scale.x, player.scale.y);
//        this.plane.scale.x *= -1;
    this.anchor.setTo(player.anchor.x, player.anchor.y);
//        this.plane.scale.setTo(0.23, 0.23);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
//    this.body.collideWorldBounds = true;

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

},{}],12:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],13:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],14:[function(require,module,exports){

'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
      this.background = this.game.add.sprite(0, 0, 'menu_bg');
      
    // add our start button with a callback
    this.startButton = this.game.add.button(this.game.width/2, 300, 'singleplayer', this.startClick, this);
    this.startButton.anchor.setTo(0.5,0.5);
    this.startButton.scale.setTo(0.5,0.5);
      
    this.multiplayerButton = this.game.add.button(this.game.width/2, 400, 'multiplayer', this.multiplayerStartClick, this);
    this.multiplayerButton.anchor.setTo(0.5,0.5);
    this.multiplayerButton.scale.setTo(0.5,0.5);
  },
  update: function() {
//    if(this.game.input.activePointer.justPressed()) {
//      this.game.state.start('play');
//    }
  },
  startClick: function() {  
    // start button click handler
    // start the 'play' state
    this.game.state.start('play');
  },  
  multiplayerStartClick: function() {  
    // start button click handler
    // start the 'play' state
    this.game.state.start('playMultiplayer');
  }
};

module.exports = Menu;

},{}],15:[function(require,module,exports){

  'use strict';
  var BirdGroup = require('../prefabs/birdGroup');  
  var Player = require('../prefabs/Player');  
  var Level = require('../prefabs/Level');  
  var GameController = require('../plugins/GameController');
  var HUDManager = require('../plugins/HUDManager');

  function Play() {}
  Play.prototype = {
    create: function() {
        
        
        // new Level Object
        this.level = new Level(this.game);
        
        // Create a new bird object
        this.birdGroup = new BirdGroup(this.game);
        
        // new Player Object
        this.player = new Player(this.game, 400, 400,0);
        this.game.add.existing(this.player);
        
        // add our pause button with a callback
        this.pauseButton = this.game.add.button(this.game.width - 100, 20, 'pause', this.pauseClick, this);
        this.pauseButton.fixedToCamera = true;
//        this.pauseButton.anchor.setTo(0.5,0.5);
        this.pauseButton.scale.setTo(0.75,0.75);
    },
    update: function() {
        this.game.physics.arcade.overlap(this.player.bullets, this.birdGroup, this.player.bulletHitsBird, null, this);
        this.game.physics.arcade.overlap(this.player, this.birdGroup, this.player.playerHitsBird, null, this);

//        console.log(gameInitializer.enemies)
//        if(gameInitializer.enemies.length){
//            for(var i = 0; i < gameInitializer.enemies.length; i++){
//                this.game.physics.arcade.overlap(gameInitializer.enemies[i].player, this.bullets, this.shootPlayer, null, this);
//            }
//        }
        this.game.physics.arcade.collide(this.player, this.level.platforms, null, null, this);
    },
    pauseClick: function() {  
        // start the 'pause' state
        this.game.state.start('menu');
      },  
  };
  
  module.exports = Play;
},{"../plugins/GameController":2,"../plugins/HUDManager":3,"../prefabs/Level":6,"../prefabs/Player":7,"../prefabs/birdGroup":9}],16:[function(require,module,exports){
'use strict';
  var GameController = require('../plugins/GameController');
  var HUDManager = require('../plugins/HUDManager');  
  var io = require('../plugins/socket.io');  
  var BirdGroup = require('../prefabs/birdGroup');  
  var Player = require('../prefabs/Player');  
  var Level = require('../prefabs/Level');  
  var SocketEventHandlers = require('../prefabs/socketEventHandlers');  


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
        this.player = new Player(this.game, 400, 400,0);
        this.game.add.existing(this.player); 
        
        this.socketEventHandlers = new SocketEventHandlers(this.game, this.player, io);
        
        this.player.socket = this.socketEventHandlers;
        
        // add our pause button with a callback
        this.pauseButton = this.game.add.button(this.game.width - 100, 20, 'pause', this.pauseClick, this);
        this.pauseButton.fixedToCamera = true;
//        this.pauseButton.anchor.setTo(0.5,0.5);
        this.pauseButton.scale.setTo(0.75,0.75);
    },
    update: function() {
      // state update code
        
        this.game.physics.arcade.overlap(this.player.bullets, this.birdGroup, this.player.bulletHitsBird, null, this.player);
        this.game.physics.arcade.overlap(this.player, this.birdGroup, this.player.playerHitsBird, null, this.player);

        if(this.player.socket.enemies.length){
            for(var i = 0; i < this.player.socket.enemies.length; i++){
                this.game.physics.arcade.overlap(this.player.socket.enemies[i], this.player.bullets, this.player.shootPlayer, null, this.player);
            }
        }
        this.game.physics.arcade.collide(this.player, this.level.platforms, null, null, this.player);
    },
    pauseClick: function() {  
        // start the 'pause' state
        this.game.state.start('menu');
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

},{"../plugins/GameController":2,"../plugins/HUDManager":3,"../plugins/socket.io":5,"../prefabs/Level":6,"../prefabs/Player":7,"../prefabs/birdGroup":9,"../prefabs/socketEventHandlers":10}],17:[function(require,module,exports){

'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.asset = this.add.sprite(this.game.width/2,this.game.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(this.asset);
      
    this.load.image('yeoman', 'assets/yeoman-logo.png');
      
    //MENU
      this.load.image('start_button', 'assets/img/menu/start_button.png');
      this.load.image('menu_bg', 'assets/img/menu/menu_bg.jpg');
      this.load.image('singleplayer', 'assets/img/menu/Singleplayer.png');
      this.load.image('multiplayer', 'assets/img/menu/Multiplayer.png');
      this.load.image('pause', 'assets/img/menu/pause_64.png');
      
    //PLAYER
        this.load.image('plane3', 'assets/img/sprites/plane3.png');
//        this.game.load.image('smoke', 'assets/img/sprites/smoke.png');
        this.load.image('smoke_puff', 'assets/img/sprites/particles/smoke-puff.png');
        this.load.image('smoke', 'assets/img/sprites/particles/pump_smoke_04.png');
        this.load.image('bullet', 'assets/img/sprites/bullet.png');
        this.load.image('bullet2', 'assets/img/sprites/bullet2.png');
      
    //LEVEL
        this.load.image('sky', 'assets/img/level/sky.png');
        this.load.image('sky_new', 'assets/img/level/sky_new.png');
        this.load.image('clouds', 'assets/img/level/whiteclouds.png');
        this.load.image('clouds1', 'assets/img/level/cloud_fluffy_1.png');
        this.load.image('clouds2', 'assets/img/level/cloud_fluffy_2.png');
        this.load.image('ground', 'assets/img/level/crosssection_long_new.png');
//        this.load.image('tree0', 'assets/img/level/tree_canopy_single_1.png');
//        this.load.image('tree0', 'assets/img/level/trees/obj_trees1_001.png');
//        this.load.image('tree1', 'assets/img/level/trees/obj_trees1_002.png');
//        this.load.image('tree2', 'assets/img/level/trees/obj_trees1_003.png');
//        this.load.image('tree3', 'assets/img/level/trees/obj_trees1_004.png');
//        this.load.image('tree4', 'assets/img/level/trees/obj_trees1_005.png');
        this.load.image('tree0', 'assets/img/level/trees/tree_coniferous_1.png');
        this.load.image('tree1', 'assets/img/level/trees/tree_coniferous_3.png');
        this.load.image('tree2', 'assets/img/level/trees/tree_coniferous_4.png');
        this.load.image('tree3', 'assets/img/level/trees/tree_coniferous_4.png');
        this.load.image('tree4', 'assets/img/level/trees/tree_deciduous3.png');
        
        
        this.load.image('mountains', 'assets/img/level/mountains.png');
        
        //	Load our physcs data exported from PhysicsEditor
        // 	this.load.physics('terrainPD', 'assets/physics/terrain.json');
//        this.load.physics('bigTerrain', 'assets/physics/bigTerrain.json');
//        this.load.physics('bigTerrainSmaller', 'assets/physics/bigTerrainSmaller.json');
      
    //BIRD
    this.load.spritesheet('birdie', 'assets/img/sprites/bird.png', 189, 169, 3);

  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

},{}]},{},[1])