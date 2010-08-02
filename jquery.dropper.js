/*
* jQuery dropper plug-in
*
* Copyright 2009 Scott Trudeau
* 
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*/
(function($) {
	$.fn.dropper = function(settings) {

		// TODO Q: pass other args to callbacks? Event propagation in callbacks?
    var config = {
			clickCallback: function(color) { },
			mouseMoveCallback: function(color) { },
			mouseOutCallback: function(color) { }
		};

		if (settings) $.extend(config, settings);
		
		// generate div for hover color floater
		// TODO Q: Is there a better way to handle the hover chip? Make it optional? Configurable w/ a class?
		$('body').append("<div id='jquery-dropper-hover-chip' style='width:10px; height: 10px; border: 1px solid #000; display:none'> </div>");

		this.each(function(i) {
			// make sure it's an image
			if(this.tagName !== "IMG") {
				return this;
			};
			// var w = $(this).width();
			// var h = $(this).height();
			// Thanks to alistair potts: http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
			// use load & readystatechange AND this.src=src trick to make sure this always fires after the image is loaded

			$(this).bind('load readystatechange', function(e){
				// Get width & height of image
				var w = $(this).width();
				var h = $(this).height();
				// Use DOM methods to create the canvas element
				// TODO Q: is there a to create & insert this element w/ jquery & get a DOM element reference w/o assigning an ID? This seems inelegant.
				var imgElement = $(this)[0];
				var containerElement = ($(this).parent())[0];
				var canvasElement = document.createElement('canvas');
				canvasElement.width = w;
				canvasElement.height = h;
				containerElement.insertBefore(canvasElement,imgElement);
				// Get canvas context, draw canvas, get image data		
				// if fails we don't support canvas, so give up
				try {
					var canvasContext = canvasElement.getContext('2d');
					canvasContext.drawImage(imgElement,0,0);
					var imageData=canvasContext.getImageData(0, 0, w, h);
				}
				catch(e) {
					// canvas not supported
					return this;
				}

				$(this).hide(); // hide the original image, since we've replaced it w/ a canvas element

				// mousemove (hover) event
				$(canvasElement).mousemove(function(e){
					var canvasIndex = canvasIndexFromEvent(e,$(this).width(),$(this).offset());
					var color = colorFromData(canvasIndex,imageData.data);

					$('#jquery-dropper-hover-chip').css({ 
						'background-color': '#'+color.rgbhex, 
						'position': 'absolute',
						'top': e.pageY-15, 
						'left': e.pageX+10
					}).show();

					config.mouseMoveCallback(color);

				}) // /.mousemove

				// mouseout event
				.mouseout(function(e){
					$('#jquery-dropper-hover-chip').hide();

					var canvasIndex = canvasIndexFromEvent(e,$(this).width(),$(this).offset());
					var color = colorFromData(canvasIndex,imageData.data);

					config.mouseOutCallback(color);

				}) // /.mouseout

				// click event
				.click(function(e){
					var canvasIndex = canvasIndexFromEvent(e,$(this).width(),$(this).offset());
					var color = colorFromData(canvasIndex,imageData.data);

					config.clickCallback(color);

					return false;
				});
			}); // .load()
			// force load/readystatechange to trigger (see above)
			var src = this.src;
			this.src = '#';
			this.src = src;
		  return this;
		}); // .each()


		// helper functions
		
		// colorData: array containing canvas-style data for a pixel in order: r, g, b, alpha transparency
		// return color object
		var colorFromData = function(canvasIndex,data) {
			var color = {
				r: data[canvasIndex],
				g: data[canvasIndex+1],
				b: data[canvasIndex+2],
				alpha: data[canvasIndex+3]
			};
			color.rgbhex = rgbToHex(color.r,color.g,color.b);
			return color;
		};

		// e: click event object
		// w: width of canvas element
		// offset: canvas selement offset object
		// returns canvas index
		var canvasIndexFromEvent = function(e,w,offset) {
			var x = e.pageX - parseInt(offset.left);
			var y = e.pageY - parseInt(offset.top);
			return (x + y * w) * 4;		
		};

		// i: color channel value, integer 0-255
		// returns two character string hex representation of a color channel (00-FF)
		var toHex = function(i) {
			if(i === undefined) return 'FF'; // TODO this shouldn't happen; looks like offset/x/y might be off by one
			var str = i.toString(16);
			while(str.length < 2) { str = '0' + str; }
			return str;
		};
		
		// r,g,b: color channel value, integer 0-255
		// returns six character string hex representation of a color
		var rgbToHex = function(r,g,b) {
			return toHex(r)+toHex(g)+toHex(b);
		};

  };

})(jQuery);