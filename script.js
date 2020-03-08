var body = document.querySelector("body");


var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize',function(event){
    canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

/** @type {CanvasRenderingContext2D} */
var ctx = canvas.getContext("2d");

var layer = [];
var revealed = [];
var attempt = 0;

class Clock {
	
	constructor(){
		this.a = 0;
		this.b = 0;
		this.c = Date.now();
		this.d = 0;
		this.timecodeMs = 0;
		this.timecode = new Date(0,0,0,0,0,0,this.timecodeMs);
	}

	tick(){
		this.a = Date.now();
		this.b = this.a - this.c;
		this.timecodeMs = this.timecodeMs + this.b + this.d;
		this.timecode = new Date(0,0,0,0,0,0,this.timecodeMs);
		this.c = Date.now();
		var timeString = "";
		for (var i = 0; i < 8; i++){
			timeString += this.timecode.toTimeString().charAt(i);
		}
		return timeString;
	}
}

var clock = new Clock();

for (var i = 0; i < cards.length; i ++){
    var card = cards[i];
    var bo = new BouncingObject(ctx,card.card,card.rank,card.suit,card.width,card.height);
    bo.id - card.id;
    bo.setStartPos(card.x,card.y);
    bo.setSpeed(card.xSpeed,card.ySpeed);
    bo.draw();
}

document.addEventListener("click",function(event){
	var len = layer.length;
	for (var i = 0; i < layer.length; i++){
		if (event.clientX <= layer[len-i-1].prevX + layer[len-i-1].width
			&& event.clientX >= layer[len-i-1].prevX 
			&& event.clientY <= layer[len-i-1].prevY + layer[len-i-1].height
			&& event.clientY >= layer[len-i-1].prevY){
            if (layer[len-i-1].dragged == false){
                if (revealed.length == 2){
                    if (revealed[0].remove == true && revealed[1].remove == true){
                        if (layer.includes(revealed[0])){
                            layer.splice(layer.indexOf(revealed[0]),1);
                        }
                        if (layer.includes(revealed[1])){
                            layer.splice(layer.indexOf(revealed[1]),1);
                        }
                        revealed = [];
                    }else{
                        revealed[0].dragged = false;
                        revealed[0].autoSeal = false;
                        revealed[1].dragged = false;
                        revealed[1].autoSeal = false;
                        revealed = [];
                        layer[len-i-1].dragged = true;
                        revealed.push(layer[len-i-1]);
                    }
                }else{
                    layer[len-i-1].dragged = true;
                    revealed.push(layer[len-i-1]);
                }
            }
            if (revealed.length == 2){
                attempt += 1;
                console.log("You have made " + attempt + " move(s)");
                if (revealed[0].color == revealed[1].color 
                    && revealed[0].rank == revealed[1].rank){
                    revealed[0].remove = true;
                    revealed[0].countdown = 30;
                    revealed[1].remove = true;
                    revealed[1].countdown = 30;
                    layer.push(layer[len-i-1]);
			        layer.splice(len-i-1,1);
                }else{
                    revealed[0].autoSeal = true;
                    revealed[0].countdown = 60;
                    revealed[1].autoSeal = true;
                    revealed[1].countdown = 60;
                    layer.push(layer[len-i-1]);
			        layer.splice(len-i-1,1);
                }
            }else{
                layer.push(layer[len-i-1]);
			    layer.splice(len-i-1,1);
            }
			break;
		}
	}
});

var refreshEvent = new CustomEvent("refresh",null);

var mainloop = setInterval(refresh,1000/30);

function refresh(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if (layer.length == 0){
        clearInterval(mainloop);
    }
    var timeDisplay = clock.tick();
    ctx.font = "20px Georgia";
    ctx.fillText(timeDisplay,10,20);
    layer.forEach(/** @type {BouncingObject} */element => {
        element.dispatchEvent(refreshEvent);
    });
}
