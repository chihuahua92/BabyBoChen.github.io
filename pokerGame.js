var addCardsBt = document.createElement("img");
addCardsBt.src="10OfSpades.svg";
addCardsBt.id="addCardsBt";
addCardsBt.className="cards";
$("#div3").append(addCardsBt);

var loseCardsBt = document.createElement("img");
loseCardsBt.src="pokerCardBackground.svg";
loseCardsBt.id="loseCardsBt";
loseCardsBt.className="cards";
$("#div3").append(loseCardsBt);

var myCardsCount = $("#div1").children().length;



$("#addCardsBt").on("click",function(){
	var addCard = document.createElement("img");
	var myDeck = document.getElementById("div1");
	$(myDeck).append(addCard);
	addCard.src="10OfSpades.svg";
	addCard.className="myDeckCards";
	addCard.id="img" + (myCardsCount);
	addCard.dataset.selected = 1;
	addCard.dataset.originalOffsetLeft = addCard.offsetLeft;
	myCardsCount += 1;
	addCard.addEventListener('click',function(){
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
	console.log("myCardsCount is " + myCardsCount);
});

function cardsNum(){
	document.getElementById("cardNum").innerHTML = "You have " + myCardsCount + " cards";
	setTimeout(function(){
		cardsNum();
	},100)
}

cardsNum();

$("#loseCardsBt").on('click',function(){
	var selectedCards = $("img[data-selected='-1']");
	if(selectedCards.length>=4){
		alert("You can not give more than three cards a time!")
	}else{
		selectedCards.remove();
		myCardsCount -= selectedCards.length;
		console.log("myCardsCount is " + myCardsCount);
	}
})


