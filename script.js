var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize',function(event){
    canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

/** @type {CanvasRenderingContext2D} */
var ctx = canvas.getContext("2d");

var canvasObj = [];

class BouncingObject extends Image{

	constructor(ctx,src,width,height){
		super();
		this.ctx = ctx;
		this.src = src;
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
		canvasObj.push(this);
		document.addEventListener("mouseup",this.mouseupHandler.bind(this));
		document.addEventListener("mousemove",this.mousemoveHandler.bind(this));
		window.addEventListener("resize",this.update.bind(this));
	}

	setStartPos(x,y) {
		this._x = x;
		this._y = y;
	}

	setSpeed(speed){
		if (speed > 10){
			speed = 10;
		}
		else if (speed < 0){
			speed = 0;
		}
		this.vectorX = speed;
		this.vectorY = speed;
	}

	draw(){
		this.prevX = this._x;
		this.prevY = this._y;
		this.addEventListener("refresh",this.bouncing.bind(this));
	}

	update(){
		this.ctx.drawImage(this,this._x,this._y);
		this.prevX = this._x;
		this.prevY = this._y;
	}

	bouncing(){
		if (this.dragged == false){
			this._x = this.prevX + this.vectorX;
			this._y = this.prevY + this.vectorY;
			if (this._x + this.width > window.innerWidth){this.vectorX = Math.abs(this.vectorX) * (-1);}
			else if (this._x < 0 ){this.vectorX = Math.abs(this.vectorX);};
			if (this._y + this.height > window.innerHeight){this.vectorY = Math.abs(this.vectorY) * (-1);}
			else if (this._y < 0 ){this.vectorY = Math.abs(this.vectorY);};
			this.update();
		}else{
			this.update();
		}
	}

	/* deprecated! */
	mousedownHandler(/** @type {MouseEvent} */event){
		if (event.clientX <= this.prevX + this.width && event.clientX >= this.prevX && 
			event.clientY <= this.prevY + this.height && event.clientY >= this.prevY){
			this.dragged = true;
		}
	}

	mouseupHandler(/** @type {MouseEvent} */event){
		this.dragged = false;
	}

	mousemoveHandler(/** @type {MouseEvent} */event){
		if (this.dragged == true){
			this.cursorX = event.clientX;
			this.cursorY = event.clientY;
			this._x = this.cursorX-this.width/2;
			this._y = this.cursorY-this.height/2;
			if (this._x + this.width > window.innerWidth){this._x = window.innerWidth - this.width;}
			else if (this._x < 0){this._x = 0;}
			if (this._y + this.height > window.innerHeight){this._y = window.innerHeight - this.height;}
			else if (this._y < 0){this._y = 0;}
			
		}
	}

}

var ks = new BouncingObject(ctx,"kingOfSpade.png",333,186);
ks.id = "ks";
ks.setStartPos(0,0);
ks.draw();

var kh = new BouncingObject(ctx,"kingOfHeart.png",333,186);
kh.id = "kh";
kh.setStartPos(0,window.innerHeight-kh.height);
kh.draw();

var kd = new BouncingObject(ctx,"kingOfDiamond.png",333,186);
kd.id = "kd";
kd.setStartPos(window.innerWidth-kd.width,0);
kd.draw();

var kc = new BouncingObject(ctx,"kingOfClub.png",333,186);
kc.id = "kc";
kc.setStartPos(window.innerWidth-kc.width,window.innerHeight-kc.height);
kc.draw();

document.addEventListener("mousedown",function(event){
	var len = canvasObj.length;
	for (var i = 0; i < canvasObj.length; i++){
		if (event.clientX <= canvasObj[len-i-1].prevX + canvasObj[len-i-1].width
			&& event.clientX >= canvasObj[len-i-1].prevX 
			&& event.clientY <= canvasObj[len-i-1].prevY + canvasObj[len-i-1].height
			&& event.clientY >= canvasObj[len-i-1].prevY){
			canvasObj[len-i-1].dragged = true;
			canvasObj.push(canvasObj[len-i-1]);
			canvasObj.splice(len-i-1,1);
			break;
		}
	}
});

var a = 0;
var b = 0;
var c = Date.now();
var d = 0;
var nowMs = 0;
var nowDate = new Date(0,0,0,0,0,0,0);

setInterval(function(){
    a = Date.now();
    b = a - c;
    nowMs = nowMs + b + d;
    nowDate = new Date(0,0,0,0,0,0,nowMs);
    c = Date.now();
    d = c - a;
},100);

var refreshEvent = new CustomEvent("refresh",null);
function refresh(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	var timeString = nowDate.toTimeString();
	var timeDisplay = "";
	for (var i = 0; i < 8; i++){
		timeDisplay += timeString.charAt(i);
	}
	ctx.font = "20px Georgia";
	ctx.fillText(timeDisplay,10,20);
	canvasObj.forEach(/** @type {BouncingObject} */element => {
		element.dispatchEvent(refreshEvent);
	});
}

setInterval(refresh,1000/30);
