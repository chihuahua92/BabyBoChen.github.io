var addCardsBt = document.createElement("img");
addCardsBt.src="asset/addCardsBt.png";
addCardsBt.id="addCardsBt";
addCardsBt.className="cards";
$("#div3").append(addCardsBt);

var loseCardsBt = document.createElement("img");
loseCardsBt.src="asset/placeCardsBt.png";
loseCardsBt.id="placeCardsBt";
loseCardsBt.className="cards";
$("#div3").append(loseCardsBt);

var pileCards = ["jackOfSpades","jackOfHearts","jackOfDiamonds","jackOfClubs",
	"queenOfSpades","queenOfHearts","queenOfDiamonds","queenOfClubs",
	"kingOfSpades","kingOfHearts","kingOfDiamonds","kingOfClubs",
	"aceOfSpades","aceOfHearts","aceOfDiamonds","aceOfClubs"];
var myCardsCount = $("#div1").children().length;

function addEventListenerToAddCard(element){
	$(element).on('click',function(){
		var thisOffset = $(this).offset();
		var thisOffsetWidth = this.offsetWidth;
		if(this.dataset.selected==1){
			$(this).offset({top:thisOffset.top,left:(thisOffset.left+thisOffsetWidth*0.25)});
			this.dataset.selected = this.dataset.selected*(-1);
		}else{
			$(this).offset({top:thisOffset.top,left:0});
			this.dataset.selected = this.dataset.selected*(-1);
		}
	})
}

$("#addCardsBt").on("click",function(){
	if(pileCards.length!=0){
		var aRandomInt = getRandomInt(0,pileCards.length);
		var addCard = document.createElement("img");
		var myDeck = document.getElementById("div1");
		$(myDeck).append(addCard);
		var imgSrc = "asset/" + pileCards[aRandomInt] + ".png";
		addCard.src = imgSrc;
		addCard.id = pileCards[aRandomInt];
		addCard.className="myDeckCards";
		addCard.dataset.selected = 1;
		addCard.dataset.originalOffsetLeft = addCard.offsetLeft;
		myCardsCount += 1;
		pileCards.splice(aRandomInt,1);
		addEventListenerToAddCard(addCard);
		console.log("YourCardsCount is " + myCardsCount);
	}
});

function cardsNum(){
	document.getElementById("cardNum").innerHTML = "You have " + myCardsCount + " cards";
	setTimeout(function(){
		cardsNum();
	},100)
}
cardsNum();

function addEventListenerToPlacingCard(element){
	$(element).on('click',function(){
		pileCards.push(this.id);
		console.log(this.id);
		this.remove();
	})
}

$("#placeCardsBt").on('click',function(){
	var selectedCards = $("img[data-selected='-1']");
	if(selectedCards.length > 3){
		alert("You can not place more than three cards a time!")
	}else{
		for(i=0;i<selectedCards.length;i++){
			var placingCard = document.createElement("img");
			placingCard.src = selectedCards[i].src;
			placingCard.id = selectedCards[i].id;
			placingCard.className = "poolCards";
			$("#div4").append(placingCard);
			addEventListenerToPlacingCard(placingCard);
		}
		selectedCards.remove();
		myCardsCount -= selectedCards.length;
		console.log("YourCardsCount is " + myCardsCount);
	}
})






