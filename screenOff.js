$(function(){
	$("#app1").click(function(){
		$("#lockScreenWallpaper").slideDown("slow");
	});
});

$(function(){
	$("#app1").click(function(){
		$("#homeKeyArea").slideUp("slow");
	});
});


$(function(){
	$("#lockScreenWallpaper").click(function(){
		$("#lockScreenWallpaper").slideUp("slow");
	});
});

$(function(){
	$("#lockScreenWallpaper").click(function(){
		$("#homeKeyArea").slideDown("slow");
	});
});


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


