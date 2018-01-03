var currentTime2 = new Date();

function changeClock2(){
    var H;
    var M;    
    var currentHours = currentTime2.getHours();
    if (currentHours < 10) { H = ("0" + String(currentHours))}
    else { H = String(currentHours)}
    var currentMinutes = String(currentTime2.getMinutes());
    if (currentMinutes < 10) { M = ("0" + String(currentMinutes))}
    else { M = String(currentMinutes)}
    var timeDisplay = H.concat(":",M)
    document.getElementById("upScreenMenuClock").innerHTML = timeDisplay;
    setTimeout(function() {changeClock()},1000)
}
document.addEventListener("DOMContentLoaded", function(){ changeClock2(); }, false);

function changeDate2(){
	var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	var month = ["Jan", "Feb", "Mar", "Apl", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var date;
	var year;
    var currentDay = day[currentTime2.getDay()];    
    var currentMonth = month[currentTime2.getMonth()];    
	var currentDate = String(currentTime2.getDate());
	var currentYear = String(currentTime2.getFullYear());
    var dateDisplay = currentDay.concat(",", " ", currentMonth, " ", currentDate, ", ", currentYear)
    document.getElementById("upScreenMenuDate").innerHTML = dateDisplay;
    setTimeout(function() {changeDate()},1000)
}
document.addEventListener("DOMContentLoaded", function(){ changeDate2(); }, false);