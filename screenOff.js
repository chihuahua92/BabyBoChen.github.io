$(function(){
	$( "#upBarBackgroundColor" ).mouseover(function(){
		$( "#upBarBackgroundColor").css("opacity",".4");
	})
	.mouseout(function() {
		$( "#upBarBackgroundColor").css("opacity","0");
	});
});

$(function(){
	$("#upBarBackgroundColor").click(function(){
		$("#upScreenMenu").slideDown("slow");
	});
});

$(function(){
	$("#closeUpScreenMenu").click(function(){
		$("#upScreenMenu").slideUp("slow");
	});
});



