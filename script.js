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

class BouncingObject extends Image{

	constructor(ctx,card,rank,suit,width,height){
		super();
        this.ctx = ctx;
        this.card = card;
        this.rank = rank;
        this.suit = suit;
        this.color;
        if (this.suit == "s" || this.suit  == "c"){
            this.color = "black";
        }else if (this.suit == "h" || this.suit == "d"){
            this.color = "red";
        }
        this.seal = "seal.png";
		this.src = card;
		this.width = width;
		this.height = height;
		this.cursorX;
		this.cursorY;
		this.hit = false;
		this.dragged = false;
		this.vectorX = 1;
		this.vectorY = 1;
		this._x = 0;
		this._y = 0;
		this.prevX = 0;
        this.prevY = 0;
        this.autoSeal = false;
        this.remove = false;
        this.countdown = 60;
		layer.push(this);
		window.addEventListener("resize",this.update.bind(this));
	}

	setStartPos(x,y) {
		this._x = x;
		this._y = y;
	}

	setSpeed(xSpeed,ySpeed){
        if (xSpeed > 10){
			xSpeed = 10;
		}
		else if (xSpeed < -10){
			xSpeed = -10;
		}
		if (ySpeed > 10){
			ySpeed = 10;
		}
		else if (ySpeed < -10){
			ySpeed = -10;
		}
		this.vectorX = xSpeed;
		this.vectorY = ySpeed;
	}

	draw(){
		this.prevX = this._x;
		this.prevY = this._y;
		this.addEventListener("refresh",this.bouncing.bind(this));
	}

	update(){
        if (this.autoSeal == true && this.countdown <= 0){
            revealed = [];
            this.autoSeal = false;
            this.dragged = false;
        }
        if (this.remove == true && this.countdown <= 0){
            revealed = [];
            if (layer.includes(this)){
                layer.splice(layer.indexOf(this),1);
            }
        }
        if (this.dragged == true){
            this.src = this.card;
            if (this.autoSeal == true || this.remove == true){
                this.countdown -= 1;
            }
        }else{
            this.src = this.seal;
        }
		this.ctx.drawImage(this,this._x,this._y);
		this.prevX = this._x;
        this.prevY = this._y;
	}

	bouncing(){
		this._x = this.prevX + this.vectorX;
        this._y = this.prevY + this.vectorY;
        if (this._x + this.width > window.innerWidth){this.vectorX = Math.abs(this.vectorX) * (-1);}
        else if (this._x < 0 ){this.vectorX = Math.abs(this.vectorX);};
        if (this._y + this.height > window.innerHeight){this.vectorY = Math.abs(this.vectorY) * (-1);}
        else if (this._y < 0 ){this.vectorY = Math.abs(this.vectorY);};
        this.update();
	}

}

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

var widthLimit = window.innerWidth-333;
var heightLimit = window.innerHeight-186;
function getRandom(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
};

var ks = new BouncingObject(ctx,"kingOfSpade.png",13,"s",333,186);
ks.id = "ks";
ks.setStartPos(getRandom(0,widthLimit),getRandom(0,heightLimit));
ks.setSpeed(getRandom(-5,5),getRandom(-5,5));
ks.draw();

var kh = new BouncingObject(ctx,"kingOfHeart.png",13,"h",333,186);
kh.id = "kh";
kh.setStartPos(getRandom(0,widthLimit),getRandom(0,heightLimit));
kh.setSpeed(getRandom(-5,5),getRandom(-5,5));
kh.draw();

var kd = new BouncingObject(ctx,"kingOfDiamond.png",13,"d",333,186);
kd.id = "kd";
kd.setStartPos(getRandom(0,widthLimit),getRandom(0,heightLimit));
kd.setSpeed(getRandom(-5,5),getRandom(-5,5));
kd.draw();

var kc = new BouncingObject(ctx,"kingOfClub.png",13,"c",333,186);
kc.id = "kc";
kc.setStartPos(getRandom(0,widthLimit),getRandom(0,heightLimit));
kd.setSpeed(getRandom(-5,5),getRandom(-5,5));
kc.draw();

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
                        revealed[1].dragged = false;
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
