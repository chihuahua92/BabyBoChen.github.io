class BouncingObject extends Image{

	constructor(ctx,card,rank,suit,width,height){
		super();
        this.ctx = ctx;
        this.card = card;
        this.rank = rank;
        this.suit = suit;
        this.color;
        if (this.suit == "spade" || this.suit  == "club"){
            this.color = "black";
        }else if (this.suit == "heart" || this.suit == "diamond"){
            this.color = "red";
        }
        this.seal = "back.png";
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

var cards = [];

var widthLimit = window.innerWidth-172;
var heightLimit = window.innerHeight-99;
function getRandom(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
};

var ks = {
    id:"ks",
    card:"kingOfSpades.png",
    rank:13,
    suit:"spade",
    width:172,
    height:99,
    x:getRandom(0,widthLimit),
    y:getRandom(0,heightLimit),
    xSpeed:getRandom(-5,5),
    ySpeed:getRandom(-5,5)
}
cards.push(ks);

var kh = {
    id:"kh",
    card:"kingOfHearts.png",
    rank:13,
    suit:"heart",
    width:172,
    height:99,
    x:getRandom(0,widthLimit),
    y:getRandom(0,heightLimit),
    xSpeed:getRandom(-5,5),
    ySpeed:getRandom(-5,5)
}
cards.push(kh);

var kd = {
    id:"kd",
    card:"kingOfDiamonds.png",
    rank:13,
    suit:"diamond",
    width:172,
    height:99,
    x:getRandom(0,widthLimit),
    y:getRandom(0,heightLimit),
    xSpeed:getRandom(-5,5),
    ySpeed:getRandom(-5,5)
}
cards.push(kd);

var kc = {
    id:"kc",
    card:"kingOfClubs.png",
    rank:13,
    suit:"club",
    width:172,
    height:99,
    x:getRandom(0,widthLimit),
    y:getRandom(0,heightLimit),
    xSpeed:getRandom(-5,5),
    ySpeed:getRandom(-5,5)
}
cards.push(kc);
/* ----------------------------------------------------- */
var qs = {
    id:"qs",
    card:"queenOfSpades.png",
    rank:12,
    suit:"spade",
    width:172,
    height:99,
    x:getRandom(0,widthLimit),
    y:getRandom(0,heightLimit),
    xSpeed:getRandom(-5,5),
    ySpeed:getRandom(-5,5)
}
cards.push(qs);

var qh = {
    id:"qh",
    card:"queenOfHearts.png",
    rank:12,
    suit:"heart",
    width:172,
    height:99,
    x:getRandom(0,widthLimit),
    y:getRandom(0,heightLimit),
    xSpeed:getRandom(-5,5),
    ySpeed:getRandom(-5,5)
}
cards.push(qh);

var qd = {
    id:"qd",
    card:"queenOfDiamonds.png",
    rank:12,
    suit:"diamond",
    width:172,
    height:99,
    x:getRandom(0,widthLimit),
    y:getRandom(0,heightLimit),
    xSpeed:getRandom(-5,5),
    ySpeed:getRandom(-5,5)
}
cards.push(qd);

var qc = {
    id:"qc",
    card:"queenOfClubs.png",
    rank:12,
    suit:"club",
    width:172,
    height:99,
    x:getRandom(0,widthLimit),
    y:getRandom(0,heightLimit),
    xSpeed:getRandom(-5,5),
    ySpeed:getRandom(-5,5)
}
cards.push(qc);
/* ----------------------------------------------------- */
var js = {
    id:"js",
    card:"jackOfSpades.png",
    rank:11,
    suit:"spade",
    width:172,
    height:99,
    x:getRandom(0,widthLimit),
    y:getRandom(0,heightLimit),
    xSpeed:getRandom(-5,5),
    ySpeed:getRandom(-5,5)
}
cards.push(js);

var jh = {
    id:"jh",
    card:"jackOfHearts.png",
    rank:11,
    suit:"heart",
    width:172,
    height:99,
    x:getRandom(0,widthLimit),
    y:getRandom(0,heightLimit),
    xSpeed:getRandom(-5,5),
    ySpeed:getRandom(-5,5)
}
cards.push(jh);

var jd = {
    id:"jd",
    card:"jackOfDiamonds.png",
    rank:11,
    suit:"diamond",
    width:172,
    height:99,
    x:getRandom(0,widthLimit),
    y:getRandom(0,heightLimit),
    xSpeed:getRandom(-5,5),
    ySpeed:getRandom(-5,5)
}
cards.push(jd);

var jc = {
    id:"jc",
    card:"jackOfClubs.png",
    rank:11,
    suit:"club",
    width:172,
    height:99,
    x:getRandom(0,widthLimit),
    y:getRandom(0,heightLimit),
    xSpeed:getRandom(-5,5),
    ySpeed:getRandom(-5,5)
}
cards.push(jc);
/* ----------------------------------------------------- */
var as = {
    id:"as",
    card:"aceOfSpades.png",
    rank:1,
    suit:"spade",
    width:172,
    height:99,
    x:getRandom(0,widthLimit),
    y:getRandom(0,heightLimit),
    xSpeed:getRandom(-5,5),
    ySpeed:getRandom(-5,5)
}
cards.push(as);

var ah = {
    id:"ah",
    card:"aceOfHearts.png",
    rank:1,
    suit:"heart",
    width:172,
    height:99,
    x:getRandom(0,widthLimit),
    y:getRandom(0,heightLimit),
    xSpeed:getRandom(-5,5),
    ySpeed:getRandom(-5,5)
}
cards.push(ah);

var ad = {
    id:"ad",
    card:"aceOfDiamonds.png",
    rank:1,
    suit:"diamond",
    width:172,
    height:99,
    x:getRandom(0,widthLimit),
    y:getRandom(0,heightLimit),
    xSpeed:getRandom(-5,5),
    ySpeed:getRandom(-5,5)
}
cards.push(ad);

var ac = {
    id:"ac",
    card:"aceOfClubs.png",
    rank:1,
    suit:"club",
    width:172,
    height:99,
    x:getRandom(0,widthLimit),
    y:getRandom(0,heightLimit),
    xSpeed:getRandom(-5,5),
    ySpeed:getRandom(-5,5)
}
cards.push(ac);
/* ----------------------------------------------------- */
