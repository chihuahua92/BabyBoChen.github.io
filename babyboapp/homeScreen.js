function changeTime(){
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
    document.getElementById("time").innerHTML = timeDisplay;
    setTimeout(function() {changeTime()},1000)
}

function upBarBorder (){
	document.getElementById("upBar").style.border = "thick solid #0000FF";
}


document.addEventListener("DOMContentLoaded", function(){ changeTime(); }, false);



document.getElementById("app2").addEventListener("click", function(){
	window.open("https://google.com/");
})


document.getElementById("app3").addEventListener("click", function(){
	window.open("https://youtube.com/");
})


