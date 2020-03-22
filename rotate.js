var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var centerX = canvas.width/2;
var centerY = canvas.height/2;

/** @type {CanvasRenderingContext2D} */
var ctx = canvas.getContext("2d");

window.addEventListener("resize",function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    centerX = canvas.width/2;
    centerY = canvas.height/2;
    drawAxes(); 
});

var card = new Image();
card.src = "kingOfHearts.png";

var angle = 0;

function rotate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    var centerX = canvas.width/2;
    var centerY = canvas.height/2;
    ctx.translate(centerX,centerY);
    ctx.rotate(angle * Math.PI / 180);
    ctx.translate(-centerX,-centerY);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'low';
    ctx.drawImage(card,-card.naturalWidth/2 + centerX,-card.naturalHeight/2 + centerY);
    ctx.translate(centerX,centerY);
    ctx.rotate(-angle * Math.PI / 180);
    ctx.font = 'bold 24px serif';
    ctx.fillText(angle,0,0);
    ctx.translate(-centerX,-centerY);
    drawAxes();
    assistLine();
    if (angle >= 360){
        angle = 0;
    }
    angle += 5;
}

function drawAxes(){
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.moveTo(0,centerY);
    ctx.lineTo(canvas.width,centerY);
    ctx.stroke();
    ctx.moveTo(centerX,0);
    ctx.lineTo(centerX,canvas.height);
    ctx.stroke();
    ctx.moveTo(0,0);
}

function assistLine(){
    var Radius = 99.228;
    var xPrime1 = Radius * Math.cos((angle + 29.924)/ 180 * Math.PI);
    var yPrime1 = Radius * Math.sin((angle + 29.924)/ 180 * Math.PI);
    var xPrime2 = Radius * Math.cos((angle + 180 - 29.924)/ 180 * Math.PI);
    var yPrime2 = Radius * Math.sin((angle + 180 - 29.924)/ 180 * Math.PI);
    ctx.beginPath();
    ctx.moveTo(centerX,centerY);
    ctx.lineTo(centerX-xPrime1,centerY-yPrime1);//A
    ctx.moveTo(centerX,centerY);
    ctx.lineTo(centerX+xPrime1,centerY+yPrime1);//C
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(centerX,centerY);
    ctx.lineTo(centerX-xPrime2,centerY-yPrime2);//D
    ctx.moveTo(centerX,centerY);
    ctx.lineTo(centerX+xPrime2,centerY+yPrime2);//B
    ctx.stroke();

    var xA = centerX-xPrime1;
    var yA = centerY-yPrime1;
    var pointA = "A(";
    pointA += String(Number.parseFloat(xA).toFixed(0));
    pointA += ",";
    pointA += String(Number.parseFloat(yA).toFixed(0));
    pointA += ")";
    ctx.font = 'bold 12px serif';
    ctx.fillText(pointA,xA,yA);

    var xB = centerX+xPrime2;
    var yB = centerY+yPrime2;
    var pointB = "B(";
    pointB += String(Number.parseFloat(xB).toFixed(0));
    pointB += ",";
    pointB += String(Number.parseFloat(yB).toFixed(0));
    pointB += ")";
    ctx.font = 'bold 12px serif';
    ctx.fillText(pointB,xB,yB);

    var xC = centerX+xPrime1;
    var yC = centerY+yPrime1;
    var pointC = "C(";
    pointC += String(Number.parseFloat(xC).toFixed(0));
    pointC += ",";
    pointC += String(Number.parseFloat(yC).toFixed(0));
    pointC += ")";
    ctx.font = 'bold 12px serif';
    ctx.fillText(pointC,xC,yC);

    var xD = centerX-xPrime2;
    var yD = centerY-yPrime2;
    var pointD = "D(";
    pointD += String(Number.parseFloat(xD).toFixed(0));
    pointD += ",";
    pointD += String(Number.parseFloat(yD).toFixed(0));
    pointD += ")";
    ctx.font = 'bold 12px serif';
    ctx.fillText(pointD,xD,yD);

    ctx.beginPath();
    ctx.moveTo(xA,yA);
    ctx.lineTo(xB,yB);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(xB,yB);
    ctx.lineTo(xC,yC);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(xC,yC);
    ctx.lineTo(xD,yD);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(xD,yD);
    ctx.lineTo(xA,yA);
    ctx.stroke();
}

var rotating = setInterval(rotate,500);