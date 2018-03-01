google.charts.load('current', {'packages':['corechart']});
var NYforecast = "https://api.myjson.com/bins/9zlnx";
var MOWforecast = "https://api.myjson.com/bins/1ehqvh";
var chartData1 = [['time', 'temp.(°C)']];
var chartData2 = [['time', 'temp.(°C)']];
var flag = "false";


function drawChart1(){
	var dataForChart1 = google.visualization.arrayToDataTable(chartData1);
	var options1 = {
		title: 'Temperature',
		curveType: 'function',
		animation:{
			startup: 'true',
			duration: 1000,
			easing: 'out',
		},
		chartArea:{width:'80%',height:'80%'},
		legend:{position:'top'}
	};
	var chart11 = new google.visualization.LineChart(document.getElementById('curve_chart'));
	chart11.draw(dataForChart1, options1);
}

function drawChart2(){
	var dataForChart2 = google.visualization.arrayToDataTable(chartData2);
	var options2 = {
		title: 'Temperature',
		curveType: 'function',
		legend:{position:'top'},
		chartArea:{width:'80%',height:'80%'},
		animation:{
			startup: 'true',
			duration: 1000,
			easing: 'out',
		},		
		vAxis: { 
        viewWindow: {
            min:0
        }
    }
	};
	var chart22 = new google.visualization.LineChart(document.getElementById('curve_chart'));
	chart22.draw(dataForChart2, options2);
}

function chart1(){	
	$.getJSON(NYforecast).done(function(data) {
		var date = new Date();
		var tempData = [];
		var dateNHour = [];
		var hour = [];
		for ( i = 0; i < 5; i = i+1){
			date.setTime(data.list[i].dt * 1000);
			var dateString = String(date.getMonth() + 1) + "/" + String(date.getDate()) + " " + String(date.getHours()) + ":" + "00";
			dateNHour.push(dateString);
			var hourString = String(date.getHours()) + ":" + "00";
			hour.push(hourString);
			tempData.push(Math.floor(data.list[i].main.temp));
		}
		for ( i = 0; i < tempData.length; i = i+1){
		chartData1.push([hour[i],tempData[i]]);
		}
		$("#tempList").append('<tr>' + '<th>' + 'Time' + '</th>' + '<th>' + 'Temp' + '</th>');
		for ( j = 0; j < dateNHour.length; j = j+1 ) {
		$("#tempList").append('<tr>' + '<td>' + dateNHour[j] + '</td>' + '<td>' + tempData[j] + "°C" + '</td>' + '</tr>');
		}
	})
	
	.done(function(){
		google.charts.setOnLoadCallback(drawChart1);
	})

}

function chart2(){
	var APPID = $("#APIKey").val();
	var inputAPI = "https://api.openweathermap.org/data/2.5/forecast?id=7280290&APPID=" + APPID + "&units=metric";
	$.getJSON(inputAPI).done(function(data) {
		var date = new Date();
		var tempData = [];
		var dateNHour = [];
		var hour = [];
		for ( i = 0; i < 5; i = i+1){
			date.setTime(data.list[i].dt * 1000);
			var dateString = String(date.getMonth() + 1) + "/" + String(date.getDate()) + " " + String(date.getHours()) + ":" + "00";
			dateNHour.push(dateString);
			var hourString = String(date.getHours()) + ":" + "00";
			hour.push(hourString);
			tempData.push(Math.floor(data.list[i].main.temp));
		}
		for ( i = 0; i < tempData.length; i = i+1){
		chartData2.push([hour[i],tempData[i]]);
		}
		$("#tempList").empty();
		$("#tempList").append('<tr>' + '<th>' + 'Time' + '</th>' + '<th>' + 'Temp' + '</th>');
		for ( j = 0; j < dateNHour.length; j = j+1 ) {
		$("#tempList").append('<tr>' + '<td>' + dateNHour[j] + '</td>' + '<td>' + tempData[j] + "°C" + '</td>' + '</tr>');
		}
	})
	
	.done(function(){
		google.charts.setOnLoadCallback(drawChart2);
	})
	.done(function(){
		flag = "true";
	})
	.fail(function(){
		flag = "false";
	})
}

function matchAPI(){
	if (flag==="true"){
		drawChart2();
	}else{
		drawChart1();
	}
}


chart1();

$(window).resize(function(){
	matchAPI();	
});

$("#submitBtn").click(chart2);
$("#submitBtn").click(function(){
	$("#showAPI").html($("#APIKey").val());
});

