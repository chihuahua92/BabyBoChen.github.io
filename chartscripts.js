var ctx1 = $("#canvas1");
var ctx2 = $("#canvas2");



var forecast = "https://api.myjson.com/bins/ybsvh";
var NYforecast = "https://api.myjson.com/bins/9zlnx";

$.getJSON(NYforecast).done(function(data) {
	var date = new Date();
	var tempData = [];
	var dateNHour = [];
	for ( i = 0; i < 5; i = i+1){
		date.setTime(data.list[i].dt * 1000);
		var dateString = String(date.getMonth() + 1) + "/" + String(date.getDate()) + " " + String(date.getHours()) + ":" + "00";
		dateNHour.push(dateString);
		tempData.push(Math.floor(data.list[i].main.temp));
	}
	
	Chart.defaults.global.defaultFontSize = 12;
	
	var myChart1 = new Chart(ctx1, {
		type: 'line',
		data: {
			labels: dateNHour,
			datasets: [{
				label: '°C',
				data: tempData,
				backgroundColor:['rgba(54, 162, 235, 0.2)']
				}]
		},
		options: {
			responsive: false,
			scales: {
				xAxes: [{ticks: {autoSkip:false}}],
				yAxes: [{ticks: {beginAtZero:true}}]
				
			}
		}
	});
	
	for ( j = 0; j < dateNHour.length; j = j+1 ) {
		$("#tempList1").append('<li>' + dateNHour[j] + " " + tempData[j] + "°C" + '</li>')
	}	
});	

function draw(){
	var APPID = $("#APIKey").val();
	var inputAPI = "https://api.openweathermap.org/data/2.5/forecast?id=7280290&APPID=" + APPID + "&units=metric";
	$("#div1").hide("fast");
	$("#div2").show("fast");
	$.getJSON(inputAPI).done(function(data) {
		var date = new Date();
		var tempData = [];
		var dateNHour = [];
		for ( i = 0; i < 5; i = i+1){
			date.setTime(data.list[i].dt * 1000);
			var dateString = String(date.getMonth() + 1) + "/" + String(date.getDate()) + " " + String(date.getHours()) + ":" + "00";
			dateNHour.push(dateString);
			tempData.push(Math.floor(data.list[i].main.temp));
		}
		
		Chart.defaults.global.defaultFontSize = 12;
		
		var myChart2 = new Chart(ctx2, {
			type: 'line',
			data: {
				labels: dateNHour,
				datasets: [{
					label: '°C',
					data: tempData,
					backgroundColor:['rgba(54, 162, 235, 0.2)']
					}]
			},
			options: {
				responsive: false,
				scales: {
					xAxes: [{ticks: {autoSkip:false}}],
					yAxes: [{ticks: {beginAtZero:true}}]
				}
			}
		});
		
		$("#tempList").empty();
		for ( j = 0; j < dateNHour.length; j = j+1 ) {
			$("#tempList").append('<li>' + dateNHour[j] + " " + tempData[j] + "°C" + '</li>')
		}	
	});	
}

$("#submitBtn").click(draw);
$("#submitBtn").click(function(){
	$("#showAPI").html($("#APIKey").val());
});








	