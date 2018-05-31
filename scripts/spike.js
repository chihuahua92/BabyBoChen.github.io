/*左邊玩家剩餘的牌數,每0.1秒一次*/
function cardsNum(){
	document.getElementById("cardNum").innerHTML = "You have " + myCards.length + " cards";
	setTimeout(function(){
		cardsNum();
	},100)
}
cardsNum();
