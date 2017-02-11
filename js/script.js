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
    $(this).attr( "src", repuesto[nrepuesto]);
    $("#"+string2).find('.back img').attr( "src", repuesto[nrepuesto]);
    $("#"+string).attr('data-cost',"0");
    $("#"+string2).attr('data-cost',"0");
    $("#"+string).attr('data-rarity',"Common");
    $("#"+string2).attr('data-rarity',"Common");
    if(nrepuesto==2){
        $("#"+string).attr('data-rarity',"Epic");
        $("#"+string2).attr('data-rarity',"Epic");
    }
    nrepuesto++;
    if(nrepuesto>=4){
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

var height = window.screen.availHeight;
var width = window.screen.availWidth;
var widthcarta = (width*7)/100;
// var heightcarta = (height*20)/100;
$(".cartahs").css("width",widthcarta);
$(".front").css("width",widthcarta);
$(".back").css("width",widthcarta);
// $(".cartahs").css("height",heightcarta);
// $(".front").css("height",heightcarta);
// $(".back").css("height",heightcarta);
// $(document).css("width",width);
// $(document).css("overflow-y","auto");
// $("body").css("width",width);
var modojuego = 0;
var tiempo_corriendo = null;
var puntbase = [1000000,3000000,6000000];
var porcenjusta = [0,0.10,0.25];
var puntbasefacil = 1000000;
var puntbasenormal = 3000000;
var puntbasedificil = 6000000;
var segundospunt = 0;
var puntuacion = 0;
var vida = 0;
var justasganadas = 0;
var tiempo = {
    hora: 0,
    minuto: 0,
    segundo: 0
};
function allFlipped(){
  var sol = false;
  var cont = 0;
  for(var l=1;l<=10;l++){
    var flip = $("#"+l).data("flip-model");
    if(flip.isFlipped == true){
      cont++;
    }
  }
  if(cont==10){
    sol = true;
  }
  return sol;
}
function resetCards(){
  for(var l=1;l<=10;l++){
    $("#"+l).attr("data-lev","N");
  }
}
function formatNum(num, separator, fraction) {
var str = num.toLocaleString('es-ES');
str = str.replace(/\./, fraction);
str = str.replace(/,/g, separator);
return str;
}
$("#buttonmusic").on("click",function(){
  $(this).toggleClass("mdi-volume-off");
  // $(this).removeClass("mdi-volume-high");
  if($(this).hasClass("mdi-volume-off")){
  // alert("SIN VOLUMEN GILIPOLLAS");
  $("#boardmusic")[0].pause();
}
  else{
    // alert("DALE CAÑA AL MUSICOTE");
    $("#boardmusic")[0].play();
  }
});
$(document).ready(function() {
  $("#container").hide();
  $("#container").css("width",width);
  $("#container").css("height",height);
  $("#nextCard").attr('disabled',true);
  $( window ).resize(function() {
    width = window.screen.width;
    height = window.screen.height;
    widthcarta = (width*7)/100;
    heightcarta = (height*20)/100;
    $("#container").css("width",width);
    $("#container").css("height",height);
    $("#nextCard").attr('disabled',true);
    $(".cartahs").css("width",widthcarta);
    $(".front").css("width",widthcarta);
    $(".back").css("width",widthcarta);
  });
  getCardData()
    .done(function(data){
        // $("#timer").attr('background-image','url("media/timer.gif")')
        $("#blockcards").hide();
        $(".cartahs").flip();
       cards = flattenCards(data);
       showCardRandom();
       disorderDivs();
       tiempo_corriendo = setInterval(function(){
           // Segundos
           tiempo.segundo++;
           if(tiempo.segundo >= 60)
           {
               tiempo.segundo = 0;
               tiempo.minuto++;
           }

           // Minutos
           if(tiempo.minuto >= 60)
           {
               tiempo.minuto = 0;
               tiempo.hora++;
           }

           $("#horas").text(tiempo.hora < 10 ? '0' + tiempo.hora : tiempo.hora);
           $("#minutos").text(tiempo.minuto < 10 ? '0' + tiempo.minuto : tiempo.minuto);
           $("#segundos").text(tiempo.segundo < 10 ? '0' + tiempo.segundo : tiempo.segundo);
       }, 1000);
       $("#container").slideDown();
    });
  resetCards();
  var audio = document.createElement('audio');
  var audio2 = document.createElement('audio');
  var audio3 = document.createElement('audio');
$(".cartahs").flip();
$(".cartahs").mouseenter(function () {
  audio3.src = "sounds/card_mouse_over.ogg";
  audio3.play();
  var flip = $(this).data("flip-model");
  if(flip.isFlipped == false){
  audio.play();
  }
  else{
    audio.src = '';
    audio.loop = false;
  }
});
$(".cartahs").mouseout(function () {
  audio.src = '';
  audio3.src = "sounds/card_mouse_away.ogg";
  audio3.play();
});
var ncartaslevantadas = 0;
var cartaslevantadas = [];
$(".cartahs").on('click',function () {
  var flip = $(this).data("flip-model");
  if(flip.isFlipped == true){
    audio.src = '';
    if($(this).attr('data-rarity') == "Common" || $(this).attr('data-rarity') == "Free"){
    audio2.src = 'sounds/card_turn_over_normal.ogg';
  }
    if($(this).attr('data-rarity') == "Rare"){
    audio2.src = 'sounds/card_turn_over_rare.ogg';
  }
    if($(this).attr('data-rarity') == "Epic"){
    audio2.src = 'sounds/card_turn_over_epic.ogg';
  }
    if($(this).attr('data-rarity') == "Legendary"){
      audio2.src = 'sounds/card_turn_over_legendary.ogg';
  }
  audio2.play();
  }
  else{
  $(this).flip(true);
  }
  if(flip.isFlipped == true && $(this).attr('data-lev')!="S"){ // COMPRUEBA SI LA CARTA ESTA GIRADA
  if(ncartaslevantadas==0){
  cartaslevantadas.push($(this));
  ncartaslevantadas++;
  }
  if(ncartaslevantadas==1){
        if(cartaslevantadas[0].attr('id') != $(this).attr('id')){
          cartaslevantadas.push($(this));
          ncartaslevantadas++;
        }
      }
  if(ncartaslevantadas==2){
    $("#blockcards").show();
    if(cartaslevantadas[0].attr('data-id') != cartaslevantadas[1].attr('data-id')){
      var id1 = cartaslevantadas[0].attr('id').toString();
      var id2 = cartaslevantadas[1].attr('id').toString();
      setTimeout(function(){
        $("#"+id1).flip(false);
        $("#"+id2).flip(false);
      },600);
    }
    else{
      cartaslevantadas[0].attr('data-lev','S');
      cartaslevantadas[1].attr('data-lev','S');
    }
    setTimeout(function(){$("#blockcards").hide();},600);
    ncartaslevantadas = 0;
    cartaslevantadas = [];
  }
  }
  if(allFlipped() == true){
    clearInterval(tiempo_corriendo);
    segundospunt = (tiempo.hora*3600)+(tiempo.minuto*60)+(tiempo.segundo);
    puntuacion = Math.round((puntbase[modojuego]/(segundospunt/60))*(1+(porcenjusta[modojuego]*justasganadas)));
    var puntuacionfix = formatNum(puntuacion,".",",");
    var audiowin = document.createElement('audio');
    audiowin.src = "sounds/victory.ogg";
    audiowin.play();
    showDialog({
        title: 'FELICIDADES!',
        text: 'Has completado el mapa en '+segundospunt+' segundos.<br/> Lo que hace un total de: <bolder>'+ puntuacionfix +'</bolder> puntos!',
        positive: {
            title: 'CONTINUAR',
              onClick: function (e) {
              botonaudio.src = "sounds/Hub_Click.ogg";
              botonaudio.play();
              $(".cartahs").flip(false);
              showCardRandom();
              resetCards();
              tiempo_corriendo = setInterval(function(){
                  // Segundos
                  tiempo.segundo++;
                  if(tiempo.segundo >= 60)
                  {
                      tiempo.segundo = 0;
                      tiempo.minuto++;
                  }

                  // Minutos
                  if(tiempo.minuto >= 60)
                  {
                      tiempo.minuto = 0;
                      tiempo.hora++;
                  }

                  $("#horas").text(tiempo.hora < 10 ? '0' + tiempo.hora : tiempo.hora);
                  $("#minutos").text(tiempo.minuto < 10 ? '0' + tiempo.minuto : tiempo.minuto);
                  $("#segundos").text(tiempo.segundo < 10 ? '0' + tiempo.segundo : tiempo.segundo);
              }, 1000);
            }
        },
        cancelable: false
    });
    // alert("FELICIDADES, HAS COMPLETADO EL MAPA EN " + segundospunt + " SEGUNDOS.\n LO QUE HACE UN TOTAL DE: "+puntuacion+" PUNTOS!!");
    tiempo.hora = 0;
    tiempo.minuto = 0;
    tiempo.segundo = 0;
  }
});
  var botonaudio = document.createElement('audio');
  // $("#nextCard").mouseenter(function() {
  //   botonaudio.src = "sounds/Hub_Mouseover.ogg";
  //   botonaudio.play();
  // });
  //  $('#nextCard').on('click',function(){
  //    //showCardRandom();
  //    botonaudio.src = "sounds/Hub_Click.ogg";
  //    botonaudio.play();
  //    $(".cartahs").flip(false);
  //    setTimeout(function(){ showCardRandom(); }, 1000);
  //    resetCards();
  //    tiempo_corriendo = setInterval(function(){
  //        // Segundos
  //        tiempo.segundo++;
  //        if(tiempo.segundo >= 60)
  //        {
  //            tiempo.segundo = 0;
  //            tiempo.minuto++;
  //        }
   //
  //        // Minutos
  //        if(tiempo.minuto >= 60)
  //        {
  //            tiempo.minuto = 0;
  //            tiempo.hora++;
  //        }
   //
  //        $("#horas").text(tiempo.hora < 10 ? '0' + tiempo.hora : tiempo.hora);
  //        $("#minutos").text(tiempo.minuto < 10 ? '0' + tiempo.minuto : tiempo.minuto);
  //        $("#segundos").text(tiempo.segundo < 10 ? '0' + tiempo.segundo : tiempo.segundo);
  //    }, 1000);
  //    $(this).flip(true);
  //  });
});
