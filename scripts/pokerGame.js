/*發牌鍵*/
var addCardsBt = document.createElement("img");
addCardsBt.src="asset/addCardsBt.png";
addCardsBt.id="addCardsBt";
addCardsBt.className="cards";
$("#div3").append(addCardsBt);

/*出牌鍵*/
var loseCardsBt = document.createElement("img");
loseCardsBt.src="asset/placeCardsBt.png";
loseCardsBt.id="placeCardsBt";
loseCardsBt.className="cards";
$("#div3").append(loseCardsBt);

/*所有牌*/
var cardSet = {
    0:{name:"jackOfSpades",rank:11,suit:"spade"},
    1:{name:"jackOfHearts",rank:11,suit:"heart"},
    2:{name:"jackOfDiamonds",rank:11,suit:"diamond"},
    3:{name:"jackOfClubs",rank:11,suit:"club"},
    4:{name:"queenOfSpades",rank:12,suit:"spade"},
    5:{name:"queenOfHearts",rank:12,suit:"heart"},
    6:{name:"queenOfDiamonds",rank:12,suit:"diamond"},
    7:{name:"queenOfClubs",rank:12,suit:"club"},
    8:{name:"kingOfSpades",rank:13,suit:"spade"},
    9:{name:"kingOfHearts",rank:13,suit:"heart"},
    10:{name:"kingOfDiamonds",rank:13,suit:"diamond"},
    11:{name:"kingOfClubs",rank:13,suit:"club"},
    12:{name:"aceOfSpades",rank:1,suit:"spade"},
    13:{name:"aceOfHearts",rank:1,suit:"heart"},
    14:{name:"aceOfDiamonds",rank:1,suit:"Diamond"},
    15:{name:"aceOfClubs",rank:1,suit:"club"}
}

/*所有牌的編號*/
var pileCards = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

/*左邊玩家的牌*/
var myCards = document.getElementById("div1").childNodes;

/*左邊玩家可以叫的數字,用examCards()來判斷myRank裡該有的項目*/
var myRank = [];

/*左邊玩家選取的牌,在div1中selected=1的element。按出牌鍵時才會get*/
var selectedCards;

/*在div7(叫出牌畫面)中選擇的要叫的數字,由addEventListenerToCallingRank()的handler產生*/
var nowCalling;

/*目前是不是吹牛的狀態，１是沒吹牛，０是吹牛*/
var lie = 1;

/* 先不需要
var nowCardsNum;
*/

/*(eventListener function)讓左邊玩家的牌可以點選(selected)然後會凸出來,另用windowsResize.js做RWD的效果*/
function myCardClick(){
    var thisOffset = $(this).offset();
    var thisOuterWidth = $(this).outerWidth();
    if(this.dataset.selected==1){
        $(this).offset({left:(thisOffset.left+thisOuterWidth*0.25)});
        this.dataset.selected = this.dataset.selected*(-1);
    }else{
        $(this).offset({left:0});
        this.dataset.selected = this.dataset.selected*(-1);
    }
    console.log(this);
}
function addEventListenerToMyCards(element){
	$(element).on('click',myCardClick);
}

/*判斷左邊玩家可以喴的數字和勝利條件*/
function examCards(){
    var newArray = [];
    $(myCards).each(function(index){
        newArray.push(this.dataset.rank);
    })
    sortArray(newArray);
    for (i=0;i<newArray.length;i++){
        if(i==0){
            myRank.push(newArray[i]);
        }else{
            if(newArray[i]!=newArray[i-1]){
                myRank.push(newArray[i]);
            }
        }
    }
    console.log("win condition:")
    console.log(myCards.length<3);
    console.log(myRank.length<2);
}

/*按發牌鍵*/
$("#addCardsBt").on("click",function(){
    if(myCards.length==0){
        for (i=0;i<=15;i++){
			var aRandomInt = getRandomInt(0,pileCards.length);
			/*getRandomInt()宣告在randomFn.js裡*/
            var addCard = document.createElement("img");
            var myDeck = $("#div1");
            var opponentDeck = $("#div5");
            if( i % 2 == 0){
				/*牌發給左邊玩家*/
                myDeck.append(addCard);
                addCard.className="myDeckCards";
            }else{
				/*牌發給右邊玩家*/
                opponentDeck.append(addCard);
                addCard.className="opponentCards";
                addCard.dataset.isCover = -1;
                addEventListenerToOpponentCards(addCard);
            }
            var imgSrc = "asset/" + cardSet[pileCards[aRandomInt]].name + ".png";
            addCard.src = imgSrc;
            addCard.id = cardSet[pileCards[aRandomInt]].name;
            addCard.dataset.selected = 1;
            addCard.dataset.originalOffsetLeft = addCard.offsetLeft;
            addCard.dataset.rank = cardSet[pileCards[aRandomInt]].rank;
            pileCards.splice(aRandomInt,1);
            if(i % 2 == 0){
                addEventListenerToMyCards(addCard);
            }
        }
		examCards();
		/*判斷左邊玩家能喴什麼牌*/
    }
})

/*(eventListener function)右邊玩家的牌可以蓋牌*/
function addEventListenerToOpponentCards(element){
    $(element).on('click',function(){
        var test = $('.opponentCards');
        if(element.dataset.isCover==-1){
            for (i=0;i<test.length;i++){
                test[i].src = "asset/cardBackground.png";
                test[i].dataset.isCover = test[i].dataset.isCover * (-1);
            }
        }else if (element.dataset.isCover == 1){
            for (i=0;i<test.length;i++){
                test[i].src = "asset/" + test[i].id + ".png";
                test[i].dataset.isCover = test[i].dataset.isCover * (-1);
            }
        }
    })
}

/*(eventListener function)在div7(叫出牌畫面)中點選要喴的牌,要喴的數字寫入nowCalling變數*/
function addEventListenerToCallingRank(element){
    $(element).on('click',function(e){
        var selectedCards = $("img[data-selected='-1']");
        /*nowCardsNum = selectedCards.length;*/
        var rankToCall = element.id;
        var numbers = ['one','two','three'];
        nowCalling = element.id;
        document.getElementById("call").innerHTML = "You are calling " + numbers[selectedCards.length-1] + " " + rankToCall + "(s)";
    })
}

/*(eventListener function)在cardPool出牌區的牌可以亮牌和蓋牌*/
function addEventListenerToPlacingCard(element){
	$(element).on('click',function(){
		if(element.dataset.isCover==1){
			element.src = "asset/" + element.id + ".png";
			element.dataset.isCover = element.dataset.isCover * (-1);
		}else if(element.dataset.isCover==-1){
			element.src = "asset/cardBackground.png";
			element.dataset.isCover = element.dataset.isCover * (-1);
		}	
	})
}

/*按出牌鍵,叫出div7(叫出牌畫面)*/
$("#placeCardsBt").on('click',function(){
	selectedCards = $("img[data-selected='-1']");
	if(selectedCards.length > 3){
		alert("You can not place more than three cards a time!");
		/*不能一次出超過3張牌*/
	}else if (selectedCards.length > 0){
		$("#div6").css("display","initial");
		var myNode = document.getElementById("div8");
		var numbers = ['one','two','three'];
		while (myNode.firstChild) { /*如果按了出牌鍵但是又按了取消(cancel)然後又按了出牌鍵*/
    		myNode.removeChild(myNode.firstChild);/*要用removeChild先把div8裡的東西先清空*/
		}
		document.getElementById("call").innerHTML = "You are calling " + numbers[selectedCards.length-1] + " ";
		/*把examCards()判斷出的能喴的數字(myRank)放進喴牌畫面中*/
		for (i=0;i<myRank.length;i++){
			var callingRank = document.createElement("img");
			callingRank.src = "asset/" + myRank[i] + ".png";
			callingRank.id = myRank[i];
			callingRank.className = "callingRank";
			var callingAlert = $('#div8');
			callingAlert.append(callingRank);
			addEventListenerToCallingRank(callingRank);
		}
	}
})

/*在div7中按取消鍵*/
$("#cancelBt").on("click",function(){
    $("#div6").css("display","none");
})

/*在叫出牌畫面(div7)時,按div7以外的地方,效果等同取消鍵*/
$("#div6").on("click",function(e){
    if(e.target.id=="div6"){
        $("#div6").css("display","none");
    }
})

/*按Make Call之後將選好的牌放進cardPool*/
$("#makeCallBt").on('click',function(){
	if(nowCalling!=undefined){
		for(i=0;i<selectedCards.length;i++){
            console.log(selectedCards.length);
			var placingCard = document.createElement("img");
			placingCard.src = "asset/cardBackground.png";
			placingCard.id = selectedCards[i].id;
            placingCard.className = "poolCards";
            placingCard.dataset.rank = selectedCards[i].dataset.rank;
            placingCard.dataset.isCover = 1;
            if(placingCard.dataset.rank==nowCalling){
                lie = 1;
            }
            if(placingCard.dataset.rank!=nowCalling){
                lie = lie * 0;
            }
			var cardPool = $("#div4");
			cardPool.append(placingCard);
            addEventListenerToPlacingCard(placingCard);
            console.log(placingCard);
        }
		selectedCards.remove();
        $("#div6").css("display","none");
        $("#div11").css("display","block");
	}
})
/*按Make Call之後可以選擇confirm或redo*/
$("#redo").on('click',function(){
	var cardPool = document.getElementById("div4").childNodes;
	console.log(cardPool.length);
	for(i=0;i<cardPool.length;i++){
		var resumeCard = document.createElement("img");
		resumeCard.className = "myDeckCards";
		resumeCard.src = "asset/" + cardPool[i].id + ".png";
		resumeCard.id = cardPool[i].id;
		resumeCard.dataset.selected = 1;
		resumeCard.dataset.originalOffsetLeft = resumeCard.offsetLeft;
        resumeCard.dataset.rank = cardPool[i].dataset.rank;
        addEventListenerToMyCards(resumeCard);
		var myDeck = $("#div1");
        myDeck.append(resumeCard);
	}
	var div4 = document.getElementById("div4");
	while(div4.firstChild){
		div4.removeChild(div4.firstChild);
	}
	$("#div11").css("display","none");
})



