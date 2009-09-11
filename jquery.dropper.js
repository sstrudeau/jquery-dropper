(function($) {
	$.fn.dropper = function(settings) {

    var config = {
			// TODO what are my configs?
			'foo': 'bar'
		};

		if (settings) $.extend(config, settings);
		
		this.each(function() {
			// TODO make sure this is in image
			$(this).load(function(){ 
				var w = $(this).width();
				var h = $(this).height();
				var offset = $(this).offset();

				// TODO come up with a better unique ID addressing system; do I need it at all?
				$(this).after("<canvas id='dropper"+i+"' width='"+w+"' height='"+h+"'></canvas>")
				var ctx = ($("#dropper"+i)[0]).getContext('2d');
				ctx.drawImage($(this)[0],0,0);
				var imageData=ctx.getImageData(0, 0, w, h);

				$("#dropper"+i).mousemove(function(e){
					// var hoverX = e.pageX - offset.left;
					// var hoverY = e.pageY - offset.top;
					// var canvasIndex = (hoverX + hoverY * w) * 4;
					var canvasIndex = canvasIndexFromClick(e,w,offset);
					var r = imageData.data[canvasIndex];
					var g = imageData.data[canvasIndex+1];
					var b = imageData.data[canvasIndex+2];
					var rgb = rgbToHex(r,g,b);
					// TODO generate this once and only once; don't expect it to exist
					// TODO callback w/ rgb & position
					$('#color2').css({ 
						'background-color': '#'+rgb, 
						'position': 'absolute',
						'top': e.pageY-15, 
						'left': e.pageX+10,
						'display':'block'
					});
				}) // .mousemove
				.mouseout(function(e){
					$('#color2').hide();
					// TODO callback w/ rgb & position
				}) // .mouseout
				.click(function(e){
					// var clickX = e.pageX - offset.left;
					// var clickY = e.pageY - offset.top;
					// var canvasIndex = (clickX + clickY * w) * 4;
					var canvasIndex = canvasIndexFromClick(e,w,offset);
					var r = imageData.data[canvasIndex];
					var g = imageData.data[canvasIndex+1];
					var b = imageData.data[canvasIndex+2];
					var rgb = rgbToHex(r,g,b);
					// TODO callback w/ rgb & position
					$('#color1').css('background-color','#'+rgb);
					return false;
				});
				$(this).hide();

      return this;
    });

  });

	// local helper functions
	
	// e: click event object
	// w: width of canvas element
	// offset: canvas selement offset object
	// returns canvas index
	var canvasIndexFromClick = function(e,w,offset) {
		var x = e.pageX - offset.left;
		var y = e.pageY - offset.top;
		return (x + y * w) * 4;		
	}
	
	// i: color channel value, integer 0-255
	// returns two byte hex representation of a color channel (00-FF)
	var toHex = function(i) {
		var str = i.toString(16);
		while(str.length < 2) { str = '0' + str; }
		return str;
	}
	// r,g,b: color channel value, integer 0-255
	// returns six byte hex representation of a color
	var rgbToHex = function(r,g,b) {
		return toHex(r)+toHex(g)+toHex(b);
	}

})(jQuery);