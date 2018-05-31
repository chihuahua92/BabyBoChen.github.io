
$(window).on('resize',function(){
    var myCards = document.getElementById("div1");
    for (i=0;i<myCards.childElementCount;i++){
        var selectedCards = myCards.children[i];
        var jqueryObject = $(myCards.children[i]);
        if(myCards.children[i].dataset.selected==-1){
            jqueryObject.offset({left:(selectedCards.dataset.originalOffsetLeft+selectedCards.offsetWidth*0.25)});
        }
    }
})

