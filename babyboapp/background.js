/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function() {
	  chrome.app.window.create('homeScreen.html', {
		frame: "none", 
		innerBounds: { width: 360, height: 640 },
		resizable: false,
  });
});