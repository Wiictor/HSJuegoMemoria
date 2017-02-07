var cards;
var dataPromise;
var a = {};
function getCardData() {
  if(!dataPromise){
    dataPromise = $.ajax({ // Store jQuery promise so that we can return it for subsequent calls ensuring only one AJAX request is made
      url: 'https://omgvamp-hearthstone-v1.p.mashape.com/cards?collectible=1',
      type: 'GET',
      dataType: 'json',
      beforeSend: function(xhr) {
        xhr.setRequestHeader("X-Mashape-Authorization", "mXtnPm3ltOmshc9dQJjtVdKzfnhbp14UZncjsnfzwvp6uLiMwH");
      },
      async:true
    });
  }
  return dataPromise;
}
function showCardRandom(){
  var string = '';
  var cardNum = 5;
  var listaCartas = [];

  for(var i=1;i<cardNum+1;i++){
  var cardNo = Math.floor(Math.random() * cards.length); // Select a random card number
  // var obj = cards[cardNo];
  // while(obj.cardSet != "Mean Streets of Gadgetzan"){
  //  cardNo = Math.floor(Math.random() * cards.length); // Select a random card number
  //  obj = cards[cardNo];
  // }
  if(i==1){listaCartas.push(cardNo);}
   else{
    while($.inArray(cardNo,listaCartas) != -1){ // Si el valor es distinto de -1, es decir, si encuentra un elemento en el array igual que el random, vuelve a hacer otro hasta que sea distinto.
      // while(obj.cardSet != "Mean Streets of Gadgetzan"){
       cardNo = Math.floor(Math.random() * cards.length); // Select a random card number
      //  obj = cards[cardNo];
      // }
    }
    if($.inArray(cardNo,listaCartas) != -1){
    }
     listaCartas.push(cardNo);
   }
  showCard(cardNo, i);
}
}
function ImprimirObjeto(o) {
    var salida = "";
    for (var p in o) {
    salida += p + ':' + o[p] +'<br>';
    }
    $("#contenido").html(salida);
}
function showCard(cardNo, string){
  var obj = cards[cardNo];
  var img = "#card-image"+string;
  alert(obj.imgGold);
  $("#"+string).find('.back img').attr('src', obj.img);
  // $("#"+string).html(obj.name);
  // $("#card-type").text(obj.type);
  // $("#card-faction").text(obj.faction);
  // $("#card-rarity").text(obj.rarity);
  // $("#player-class").text(obj.playerClass);
   $("#"+string).attr('data-cost',obj.cost);
}

function flattenCards(data){
    // Flatten the object as cards are stored in sets
    var result = [];
    for (var set in data) {
      for (var i = 0; i < data[set].length; i++) {
        result.push(data[set][i]);
      }
    }
    return result;
}

getCardData(); // Start loading card data ASAP - subsequent calls will return the same promise anyway

$(document).ready(function() {
  $("#container").hide();
  getCardData()
    .done(function(data){
        $("#nextCard").text("Next");
       cards = flattenCards(data);
       showCardRandom();
       $("#container").slideDown();
    });
   $('#nextCard').on('click',function(){
     showCardRandom();
     $(".cartahs").flip(false);

     setTimeout(function(){ $(".cartahs").flip(true); }, 1000);
   });
});
