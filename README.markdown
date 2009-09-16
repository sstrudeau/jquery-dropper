# dropper: a jQuery plugin

This jQuery plugin uses the HTML5 canvas element to create an "eyedropper"-style color picker for any image.

## Limitations

### Internet Explorer Not Supported

Internet Explorer does not support the HTML5 canvas element natively.  The popular VML hack for simulating canvas in IE will not work.  VML does not give pixel-level access to images.  [See this thread](http://groups.google.com/group/google-excanvas/browse_thread/thread/7d35fa72dbe1487b)

### Images must be in same domain as the web page

In order to get pixel-level access to the image, the image must be hosted on the same domain as the web page. See the [canvas security section of the HTML5 spec](http://dev.w3.org/html5/spec/Overview.html#security-with-canvas-elements)

TODO: Test redirect proxy as a possible workaround

## Usage

Load jquery & the plug-in:
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js"></script>
    <script src="jquery.dropper.js" type="text/javascript"></script>

Select the image or set of images you'd like to be enabled with a dropper:
		<script type="text/javascript" charset="utf-8">
    	jQuery(document).ready(function() {
    		jQuery('img.dropper').dropper();
    	});			
		</script>

This will replace all img elements with a 'class' of 'dropper' with a canvas element and dropper-style color picker.

## Callbacks

The plugin offers three callback methods that can be passed to the .dropper() method:

* clickCallback
* mouseMoveCallback
* mouseOutCallback

Each callback is called with a single argument, a color object.  The color object has has 5 attributes: r, g, b and alpha which are 0-255 integers for the "red", "green", "blue" and "alpha transparency" channel of the image. And "rgbhex" which is the 6 character hexadecimal representation of the color.

Example:

    <script type="text/javascript" charset="utf-8">
    	jQuery(document).ready(function() {
    		jQuery('img.dropper').dropper({
    			clickCallback: function(color) {
    				alert("You clicked on color: #"+ color.rgbhex);
    			};
    		});
    	});			
    </script>

See the included "demo" folder for a simple, more practical example.

TODO: pass more args back to callbacks; investigate callback naming conventions, event propagation

## Author

[Scott Trudeau](http://sstrudeau.com) ([@sstrudeau](http://twitter.com/sstrudeau)) for [Apartment Therapy](http://www.apartmenttherapy.com)

## Demo Image Credits

The demo uses three image from Flickr.  Each is licensed as [Creative Commons, Attribution-Share Alike 2.0](http://creativecommons.org/licenses/by-sa/2.0/deed.en)

* [Colorful Glass](http://www.flickr.com/photos/lexrex/447627949/) by [lexrex](http://www.flickr.com/photos/lexrex)
* [The only way to see the rainbow is to look through the rain!](http://www.flickr.com/photos/somogyibarbara/3229357802/) by [somogyibarbara](http://www.flickr.com/photos/somogyibarbara/)
* [Colorful tulips](http://www.flickr.com/photos/deapeajay/2399982682/) by [deapeajay](http://www.flickr.com/photos/deapeajay/)

## License

Dual licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php) and the [GPL license](http://www.gnu.org/licenses/gpl.html)

Copyright (c) 2009, Scott Trudeau (scott.trudeau@gmail.com)
