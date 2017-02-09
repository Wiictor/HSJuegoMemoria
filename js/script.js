var cards;
var dataPromise;
var a = {};
function getCardData() {
  if(!dataPromise){
    dataPromise = $.ajax({ // Store jQuery promise so that we can return it for subsequent calls ensuring only one AJAX request is made
      // url: 'https://omgvamp-hearthstone-v1.p.mashape.com/cards?collectible=1',
      url: 'datos.json',
      type: 'GET',
      dataType: 'json',
      // beforeSend: function(xhr) {
      //   xhr.setRequestHeader("X-Mashape-Authorization", "mXtnPm3ltOmshc9dQJjtVdKzfnhbp14UZncjsnfzwvp6uLiMwH");
      // },
      async:true
    });
  }

  return dataPromise;
}
function showCardRandom(){
  var string = '';
  var cardNum = 5;
  var listaCartas = [];
  var fila2 = disorderDivs();
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
  showCard(cardNo, fila2[i-1], fila2[i+4]);
}
}
function ImprimirObjeto(o) {
    var salida = "";
    for (var p in o) {
    salida += p + ':' + o[p] +'<br>';
    }
    $("#contenido").html(salida);
}

var repuesto = ["media/REP_1.png","media/REP_2.png","media/REP_3.png","media/REP_4.png","media/REP_5.png"]; //Si alguna imagen falla, tener hasta 5 repuestos alojados en el servidor
var nrepuesto = 0; //Numero auxiliar de carta de repuesto
function showCard(cardNo, string, string2){
  var obj = cards[cardNo];
  $("#"+string).find('.back img').attr('src', obj.img);
  $("#"+string).attr('data-id',obj.cardId);
  $("#"+string).attr('data-rarity',obj.rarity);
  $("#"+string).attr('data-cost',obj.cost);
  $("#"+string2).find('.back img').attr('src', obj.img);
  $("#"+string2).attr('data-id',obj.cardId);
  $("#"+string2).attr('data-rarity',obj.rarity);
  $("#"+string2).attr('data-cost',obj.cost);
  // $("#"+string).html(obj.name);
  // $("#card-type").text(obj.type);
  // $("#card-faction").text(obj.faction);
  // $("#player-class").text(obj.playerClass);
  $("#"+string).find('.back img').on("error",function() {
    $( this ).attr( "src", repuesto[nrepuesto]);
    $("#"+string).attr('data-cost',"0");
    $("#"+string).attr('data-rarity',"Common");
    $("#"+string2).attr('data-cost',"0");
    $("#"+string2).attr('data-rarity',"Common");
    if(nrepuesto==2){
        $("#"+string).attr('data-rarity',"Epic");
        $("#"+string2).attr('data-rarity',"Epic");
    }
    nrepuesto++;
    if(nrepuesto>4){
      nrepuesto = 0;
    }
  });
}

function flattenCards(data){
    // Flatten the object as cards are stored in sets
    var result = [];
    for (var set in data) {
      for (var i = 0; i < data[set].length; i++) {
        if(data[set][i].type != "Hero" && data[set][i].rarity != "Free" ){
        result.push(data[set][i]);
        }
      }
    }
    return result;
}
function disorderDivs(){
  var array = [1,2,3,4,5,6,7,8,9,10];
  var array2 = [];
  for(var i=0; i<10;i++){
    var random = Math.floor(Math.random() * 10)+1;
    while($.inArray(random,array) == -1){
       random = Math.floor(Math.random() * 10)+1;
    }
    array.splice(array.indexOf(random),1);
    array2.push(random);
  }
  return array2;
}
function changeDivposition(div1,div2){
  //alert(div1 + " " + div2);
  $("#"+div1).swap({
    target: ""+div2,
    speed: 0
  });
}
getCardData(); // Start loading card data ASAP - subsequent calls will return the same promise anyway

$(document).ready(function() {
  $("#container").hide();
  $("#nextCard").attr('disabled',true);
  getCardData()
    .done(function(data){
        $("#nextCard").text("Next");
        $(".cartahs").flip();
       cards = flattenCards(data);
       showCardRandom();
       disorderDivs();
       $("#container").slideDown();
    });
  var botonaudio = document.createElement('audio');
  $("#nextCard").mouseenter(function() {
    botonaudio.src = "sounds/Hub_Mouseover.ogg";
    botonaudio.play();
  });
   $('#nextCard').on('click',function(){
     //showCardRandom();
     botonaudio.src = "sounds/Hub_Click.ogg";
     botonaudio.play();
     $(".cartahs").flip(false);
     setTimeout(function(){ showCardRandom(); }, 1000);
     $("#nextCard").attr('disabled',true);
   });
});
