document.getElementById("homeKey").addEventListener("click", function(){
    chrome.app.window.create("index.html", {
        frame: "none",
		innerBounds: { width: 360, height: 640 },
        resizable: false,
    },close);
})