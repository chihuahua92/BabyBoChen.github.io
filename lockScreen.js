var currentTime = new Date();

function changeClock(){
    var H;
    var M;    
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
    var currentDay = day[currentTime.getDay()];    
    var currentMonth = month[currentTime.getMonth()];    
	var currentDate = String(currentTime.getDate());
    var dateDisplay = currentDay.concat(",", " ", currentMonth, " ", currentDate, " @ ", "Taipei")
    document.getElementById("lockScreenDate").innerHTML = dateDisplay;
    setTimeout(function() {changeDate()},1000)
}
document.addEventListener("DOMContentLoaded", function(){ changeDate(); }, false);

function weatherAPI(){
	var ourRequest = new XMLHttpRequest();
	ourRequest.open('GET','http://api.openweathermap.org/data/2.5/weather?id=7280290&APPID=' + weatherAPIKey + '&units=metric');
	var ourData;
	ourRequest.onload = function() {
		ourData = JSON.parse(ourRequest.responseText);
		var weatherDescription = document.getElementById("weatherDescription");
		var weatherIcon = document.getElementById("weatherIcon");
		var currentTemp = ourData.main.temp;
		weatherDescription.innerHTML = currentTemp + "°C";
		weatherIcon.src = ("weather-icons-master/weatherIcons/" + "Clouds" + ".gif");
	}
	ourRequest.send();
	setTimeout(function() {weatherAPI()},1800000)
}
document.addEventListener("DOMContentLoaded", function(){ weatherAPI(); }, false);


document.getElementById("lockScreenWallpaper2").addEventListener("click", function(){
    chrome.app.window.create("index.html", {
        innerBounds: { width: 360, height: 640 },
        resizable: false,
    

},close);
})


