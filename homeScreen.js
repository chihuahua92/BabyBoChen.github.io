function changeTime(){
    var currentTime = new Date();
	var H;
    var M;
    var currentHours = currentTime.getHours();
    if (currentHours < 10) { H = ("0" + String(currentHours))}
    else { H = String(currentHours)}
    var currentMinutes = currentTime.getMinutes();
    if (currentMinutes < 10) { M = ("0" + String(currentMinutes))}
    else { M = String(currentMinutes)}
    var timeDisplay = H.concat(":",M)
    document.getElementById("time").innerHTML = timeDisplay;
    setTimeout(function() {changeTime()},1000)
}
document.addEventListener("DOMContentLoaded", function(){ changeTime(); }, false);


document.getElementById("app1").addEventListener("click", function(){
    chrome.app.window.create("lockScreen.html", {
        frame: "none",
		innerBounds: { width: 360, height: 640 },
        resizable: false,
},close);
})


document.getElementById("app2").addEventListener("click", function(){
	window.open("https://google.com/");
})


/*
document.getElementById("app3").addEventListener("click", function(){
	window.open("https://youtube.com/");
})
*/


