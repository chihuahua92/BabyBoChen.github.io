function changeClock(){
    var H;
    var M;
    var currentTime = new Date();
    var currentHours = currentTime.getHours();
    if (currentHours < 10) { H = ("0" + String(currentHours))}
    else { H = String(currentHours)}
    var currentMinutes = String(currentTime.getMinutes());
    if (currentMinutes < 10) { M = ("0" + String(currentMinutes))}
    else { M = String(currentMinutes)}
    var timeDisplay = H.concat(":",M)
    document.getElementById("clock").innerHTML = timeDisplay;
    setTimeout(function() {changeClock()},1000)
}
document.addEventListener("DOMContentLoaded", function(){ changeClock(); }, false);

function changeDate(){
	var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	var month = ["Jan", "Feb", "Mar", "Apl", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var date;	
    var currentDateTime = new Date();
    var currentDay = day[currentDateTime.getDay()];    
    var currentMonth = month[currentDateTime.getMonth()];    
	var currentDate = String(currentDateTime.getDate());
    var dateDisplay = currentDay.concat(",", " ", currentMonth, " ", currentDate)
    document.getElementById("lockScreenDate").innerHTML = dateDisplay;
    setTimeout(function() {changeDate()},1000)
}
document.addEventListener("DOMContentLoaded", function(){ changeDate(); }, false);

document.getElementById("lockScreenWallpaper2").addEventListener("click", function(){
    chrome.app.window.create("index.html", {
        innerBounds: { width: 360, height: 640 },
        resizable: false,
    

},close);
})


