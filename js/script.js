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
function showCardRandomModo(array){
  var string = '';
  var cardNum = 5;
  var listaCartas = [];
  for(var i=0;i<(array.length/2);i++){
  var cardNo = Math.floor(Math.random() * cards.length);
  if(i==1){listaCartas.push(cardNo);}
   else{
    while($.inArray(cardNo,listaCartas) != -1){ // Si el valor es distinto de -1, es decir, si encuentra un elemento en el array igual que el random, vuelve a hacer otro hasta que sea distinto.
       cardNo = Math.floor(Math.random() * cards.length); // Select a random card number
    }
    if($.inArray(cardNo,listaCartas) != -1){
    }
     listaCartas.push(cardNo);
   }
  showCard(cardNo, array[i], array[array.length-1-i]);
}
}
function showCardRandom2(id){
  var cardNo = Math.floor(Math.random() * cards.length);
  var cardNo2 = Math.floor(Math.random() * cards.length); // Select a random card number
  showCard2(cardNo,cardNo2, id);
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
function showCard2(cardNo,cardNo2, string){
  var obj = cards[cardNo];
  var obj2 = cards[cardNo2];
  $("#a"+string).find('.back img').attr('src', obj.img);
  $("#a"+string).attr('data-id',obj.cardId);
  $("#a"+string).attr('data-rarity',obj.rarity);
  $("#a"+string).attr('data-cost',obj.cost);
  $("#b"+string).find('.back img').attr('src', obj2.img);
  $("#b"+string).attr('data-id',obj2.cardId);
  $("#b"+string).attr('data-rarity',obj2.rarity);
  $("#b"+string).attr('data-cost',obj2.cost);
  // $("#"+string).html(obj.name);
  // $("#card-type").text(obj.type);
  // $("#card-faction").text(obj.faction);
  // $("#player-class").text(obj.playerClass);
  $("#a"+string).find('.back img').on("error",function() {
    $(this).attr( "src", repuesto[nrepuesto]);
    $("#b"+string).find('.back img').attr( "src", repuesto[nrepuesto]);
    $("#a"+string).attr('data-cost',"0");
    $("#b"+string).attr('data-cost',"0");
    $("#a"+string).attr('data-rarity',"Common");
    $("#b"+string).attr('data-rarity',"Common");
    if(nrepuesto==2){
        $("#a"+string).attr('data-rarity',"Epic");
        $("#b"+string).attr('data-rarity',"Epic");
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

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function changeDivposition(div1,div2){
  //alert(div1 + " " + div2);
  $("#"+div1).swap({
    target: ""+div2,
    speed: 0
  });
}
function generaCartas(ncartas){
  var contenedora = "";
  var contenedorb = "";
  for(var i=ncartas;i>0;i--){
    if(i==ncartas){
    contenedora += "<div  id='a"+(i+1)+"' class='cartahs2 ultimacarta'><div class='front'><div><img src='media/fatigue.png' class='pruebaimg' alt=''></div></div><div class='back'><img src='media/cardblank.png' class='pruebaimg' alt=''></div></div>";
    contenedorb += "<div  id='b"+(i+1)+"' class='cartahs2 ultimacarta'><div class='front'><div><img src='media/fatigue.png' class='pruebaimg' alt=''></div></div><div class='back'><img src='media/cardblank.png' class='pruebaimg' alt=''></div></div>";
    contenedora += "<div  id='a"+i+"' class='cartahs2 cartas'><div class='front'><div><img src='media/cardleg.jpg' class='pruebaimg' alt=''></div></div><div class='back'><img src='media/cardblank.png' class='pruebaimg' alt=''></div></div>";
    contenedorb += "<div  id='b"+i+"' class='cartahs2 cartas'><div class='front'><div><img src='media/card.png' class='pruebaimg' alt=''></div></div><div class='back'><img src='media/cardblank.png' class='pruebaimg' alt=''></div></div>";
    }
    else{
      contenedora += "<div  id='a"+i+"' class='cartahs2 cartas'><div class='front'><div><img src='media/cardleg.jpg' class='pruebaimg' alt=''></div></div><div class='back'><img src='media/cardblank.png' class='pruebaimg' alt=''></div></div>";
      contenedorb += "<div  id='b"+i+"' class='cartahs2 cartas'><div class='front'><div><img src='media/card.png' class='pruebaimg' alt=''></div></div><div class='back'><img src='media/cardblank.png' class='pruebaimg' alt=''></div></div>";
    }
  }
  $("#contenedora").html(contenedora);
  $("#contenedorb").html(contenedorb);
  $(".cartahs2").flip({trigger: 'manual'});
}
function tooltipCartas(cartasr){
  if(cartasr!=0){
  $("#tooltipa").text("Hay "+cartasr+" cartas en el mazo del tabernero.");
  $("#tooltipb").text("Hay "+cartasr+" cartas en tu mazo.");
  }
  else{
    $("#tooltipa").text("No quedan cartas.");
    $("#tooltipb").text("No quedan cartas.");
  }
}
function funcionJusta(){
  if(haycartas<=numerocartas){
  var costea = parseInt($("#a"+haycartas).attr('data-cost'));
  var costeb = parseInt($("#b"+haycartas).attr('data-cost'));
  $("#a"+haycartas).flip('true');
  $("#b"+haycartas).flip('true');
  $("#a"+haycartas).addClass('cartahs2active');
  $("#b"+haycartas).addClass('cartahs2active');
  var numero = haycartas+1;
  if(costea>costeb){
      $("#a"+numero).addClass('glowLegendary');
      var sonidojustaperdida = document.createElement('audio');
      sonidojustaperdida.src = "sounds/losejusta.mp3";
      sonidojustaperdida.play();
      setTimeout(function(){
        var sonidorayos = document.createElement('audio');
        sonidorayos.src = "sounds/strike.wav";
        sonidorayos.play();
        $("#blockcards img").attr('src', "media/rayos.gif")
        $("#blockcards").addClass('rayos');
      },1500);

  }
  if(costeb>costea){
    $("#b"+numero).addClass('glowLegendary');
    var sonidojustaganada = document.createElement('audio');
    sonidojustaganada.src = "sounds/winjusta2.wav";
    sonidojustaganada.play();
    justasganadas++;
  }
  $("#flip").attr('disabled',true);
  setTimeout(function(){
    if(modojuego == 0 && costea>costeb){
      resetCards();
      $(".cartahs").flip(false);
    }
    if(modojuego == 1 && costea>costeb){
      var cartastumbadas = [];
      for(var l=1;l<=10;l++){
        if($("#"+l).attr('data-lev') == 'N'){
          cartastumbadas.push(l);
        }
      }
      cartastumbadas = shuffle(cartastumbadas);
      showCardRandomModo(cartastumbadas);
    }
    if(modojuego == 2 && costea>costeb){
      $(".cartahs").flip(false);
      resetCards();
      showCardRandom();
    }
    $("#a"+haycartas).remove();
    $("#b"+haycartas).remove();
    haycartas++;
    showCardRandom2(""+haycartas);
    $("#a"+numero).removeClass('glowLegendary');
    $("#b"+numero).removeClass('glowLegendary');

    $("#flip").attr('disabled',false);
    tooltipCartas(numerocartas-(haycartas-1));
  },3000);
  setTimeout(function(){
    // $("#blockcards").text("");
    $("#blockcards").removeClass('rayos');
    $("#blockcards img").attr('src','media/invisible.png');
},3200);
  }
  else{
    if(vida > 0 ){
    fatiga++;
    vida = vida - fatiga;
    if(modojuego!=0){
    $("#spanvida").text(vida);
    }
    if(vida<0){
      muerto=true;
    }
    }
    else{
      muerto=true;
    }
  }
}
getCardData(); // Start loading card data ASAP - subsequent calls will return the same promise anyway
var botonaudio = document.createElement('audio');
var height = window.screen.availHeight;
var width = window.screen.availWidth;
var widthcarta = (width*7)/100;
$(".cartahs").css("width",widthcarta);
$(".front").css("width",widthcarta);
$(".back").css("width",widthcarta);
$("div.outer").css("width",widthcarta);
var puntbase = [1000000,3000000,6000000];
var vidastat = [9999999999,30,30];
var porcenjusta = [0.05,0.10,0.25];
var numerocartastat = [20,20,10];
var numerocartas = 0;
var justasganadas = 0;
var segundospunt = 0;
var puntuacion = 0;
var modojuego = 0;
var fatiga = 0;
var vida = 0;
var haycartas = 1;
var muerto = false;
var gameactive = false;
var tiempo_corriendo = null;
var tiempo = {
    hora: 0,
    minuto: 0,
    segundo: 0
};
function resetGame(){
  // modojuego = 0;
  tiempo_corriendo = null;
  segundospunt = 0;
  puntuacion = 0;
  justasganadas = 0;
  haycartas = 1;
  vida = 0;
  fatiga = 0;
  muerto = false;
  tiempo_corriendo = null;

}
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
var str = num.toLocaleString('en-US');
str = str.replace(/\./, fraction);
str = str.replace(/,/g, separator);
return str;
}
function sueltaFicha(modo){
$("#spanvida").text("0");
$("#blockcards2").html("<p style='margin-top:25%;font-size:60px;'>EL JUEGO COMIENZA EN 3 SEGUNDOS...</p>");
modojuego = modo;
var counter = 4;
var sonidojuego = document.createElement('audio');
sonidojuego.src = "sounds/box_center_disk_flip.ogg";
sonidojuego.play();
// alert(modojuego);
            if ($('#contenedormenu').is(':hidden')) {
               $('#userNav2').show('slide',{direction:'right'},1000);
               $('#userNav').show('slide',{direction:'left'},1000);
            }
            else {
               $('#userNav2').hide('slide',{direction:'right'},1000);
               $('#userNav').hide('slide',{direction:'left'},1000);
               $("#blockcards2").show();
             var tt=setInterval(function(){startTime()},1000);
             function startTime()
             {
                 if(counter == 0) {
                     clearInterval(tt);
                 } else {
                     counter--;
                 }

                 $("#blockcards2").html("<p style='margin-top:25%;font-size:60px;'>EL JUEGO COMIENZA EN " + counter + " SEGUNDOS...</p>");
             }
               setTimeout(function(){
                 $("#contenedormenu,#contenedormenu2").hide();
                 empiezaJuego();
                 $("#blockcards2").hide();
                 $("#blockcards2").html("");
               },4000);
               counter = 4;
            }

}
$("#buttonmusic").on("click",function(){
  $(this).toggleClass("mdi-volume-off");
  if($(this).hasClass("mdi-volume-off")){
  $("#boardmusic")[0].pause();
}
  else{
    $("#boardmusic")[0].play();
  }
});
function empiezaJuego(){
  // document.getElementById("boardmusic").play();
  if($(".musica i").hasClass("mdi-volume-off")){
  $("#boardmusic")[0].pause();
}
  else{
    $("#boardmusic")[0].play();
  }
  resetCards();
  resetGame();
  gameactive = true;
    numerocartas = numerocartastat[modojuego];
    vida = vidastat[modojuego];
    if(modojuego!=0){
    $("#spanvida").text(vida);
    }
    else{
    $("#spanvida").text("0");
    }
    generaCartas(numerocartas);
    tooltipCartas(numerocartas-(haycartas-1));
    showCardRandom();
    showCardRandom2(""+haycartas);
    botonaudio.src = "sounds/Hub_Click.ogg";
    // botonaudio.play();
    $(".cartahs").flip(false);
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
    tiempo.hora = 0;
    tiempo.minuto = 0;
    tiempo.segundo = 0;
  }
  $(".volvermenu").on('click',function(){
    botonaudio.src = "sounds/Hub_Click.ogg";
    botonaudio.play();
    $(".cartahs").flip(false);
    $("#contenedormenu,#contenedormenu2").show();
       $('#userNav2').show('slide',{direction:'right'},1000);
       $('#userNav').show('slide',{direction:'left'},1000);
  });
$(window).bind("load", function() {
  $('#load').fadeOut(2000);
});
$(document).ready(function() {
  $('.draggable').draggable({ scroll: true, cursor: "move", revert: true,scroll: false,stack: "div",containment: "document",revertDuration: 1000});
  $('#iconaccept').droppable( {
    drop: handleDropEvent,
    hoverClass: 'glowLegendary'
  } );

  function handleDropEvent( event, ui ) {
  var draggable = ui.draggable;
  sueltaFicha(draggable.attr('value'));
  }
  $("#container").hide();
  $("#container").css("width",width);
  $("#container").css("height",height);
  $("#orrsDiag").css("width",width);
  $("#orrsDiag").css("height",height);
  $("#orrsDiag").css("overflow","hidden");
  $("#nextCard").attr('disabled',true);
  $( window ).resize(function() {
    width = window.screen.width;
    height = window.screen.height;
    widthcarta = (width*7)/100;
    heightcarta = (height*20)/100;
    $("#container").css("width",width);
    $("#container").css("height",height);
    $("#orrsDiag").css("width",width);
    $("#orrsDiag").css("height",height);
    $("#nextCard").attr('disabled',true);
    $(".cartahs").css("width",widthcarta);
    $(".front").css("width",widthcarta);
    $(".back").css("width",widthcarta);
    $("div.outer").css("width",widthcarta);
  });
  getCardData()
    .done(function(data){
      // gameactive = true;
        // $("#timer").attr('background-image','url("media/timer.gif")')
        $("#blockcards").hide();
        $(".cartahs").flip();
       cards = flattenCards(data);
       showCardRandom();
       showCardRandom2(""+haycartas);
      //  if(gameactive == true){
      //  tiempo_corriendo = setInterval(function(){
      //      // Segundos
      //      tiempo.segundo++;
      //      if(tiempo.segundo >= 60)
      //      {
      //          tiempo.segundo = 0;
      //          tiempo.minuto++;
      //      }
      //
      //      // Minutos
      //      if(tiempo.minuto >= 60)
      //      {
      //          tiempo.minuto = 0;
      //          tiempo.hora++;
      //      }
      //
      //      $("#horas").text(tiempo.hora < 10 ? '0' + tiempo.hora : tiempo.hora);
      //      $("#minutos").text(tiempo.minuto < 10 ? '0' + tiempo.minuto : tiempo.minuto);
      //      $("#segundos").text(tiempo.segundo < 10 ? '0' + tiempo.segundo : tiempo.segundo);
      //  }, 1000);
      // }
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
      funcionJusta();
      setTimeout(function(){
        $("#"+id1).flip(false);
        $("#"+id2).flip(false);
      },3000);
      setTimeout(function(){$("#blockcards").hide();},3000);
    }
    else{
      cartaslevantadas[0].attr('data-lev','S');
      cartaslevantadas[1].attr('data-lev','S');
      setTimeout(function(){$("#blockcards").hide();},1100);
    }
    ncartaslevantadas = 0;
    cartaslevantadas = [];
    if(muerto==true){
      clearInterval(tiempo_corriendo);
      $("#boardmusic")[0].pause();
      gameactive = false;
      var puntuacionfix = formatNum(puntuacion,".",",");
      var audiolose = document.createElement('audio');
      audiolose.src = "sounds/defeat.ogg";
      audiolose.play();
      showDialog({
          title: 'DERROTA!',
          text: 'Oh no! Has caido en la batalla...',
          positive: {
              title: 'CONTINUAR',
                onClick: function (e) {
                botonaudio.src = "sounds/Hub_Click.ogg";
                $(".cartahs").flip(false);
                $("#contenedormenu,#contenedormenu2").show();
                   $('#userNav2').show('slide',{direction:'right'},1000);
                   $('#userNav').show('slide',{direction:'left'},1000);
              //   var numerocartas = numerocartastat[modojuego];
              //   resetCards();
              //   resetGame();
              //   vida = vidastat[modojuego];
              //   generaCartas(numerocartas);
              //   tooltipCartas(numerocartas-(haycartas-1));
              //   showCardRandom();
              //   showCardRandom2(""+haycartas);
              //   gameactive = true;
              //   tiempo_corriendo = setInterval(function(){
              //     // Segundos
              //     tiempo.segundo++;
              //     if(tiempo.segundo >= 60)
              //     {
              //       tiempo.segundo = 0;
              //       tiempo.minuto++;
              //     }
              //
              //     // Minutos
              //     if(tiempo.minuto >= 60)
              //     {
              //       tiempo.minuto = 0;
              //       tiempo.hora++;
              //     }
              //
              //     $("#horas").text(tiempo.hora < 10 ? '0' + tiempo.hora : tiempo.hora);
              //     $("#minutos").text(tiempo.minuto < 10 ? '0' + tiempo.minuto : tiempo.minuto);
              //     $("#segundos").text(tiempo.segundo < 10 ? '0' + tiempo.segundo : tiempo.segundo);
              //   }, 1000);
              //   botonaudio.play();
              }
          },
          cancelable: false
      });
      // alert("FELICIDADES, HAS COMPLETADO EL MAPA EN " + segundospunt + " SEGUNDOS.\n LO QUE HACE UN TOTAL DE: "+puntuacion+" PUNTOS!!");
      tiempo.hora = 0;
      tiempo.minuto = 0;
      tiempo.segundo = 0;
    }
  }
  }
  if(allFlipped() == true){
    clearInterval(tiempo_corriendo);
    gameactive = false;
    $("#boardmusic")[0].pause();
    segundospunt = (tiempo.hora*3600)+(tiempo.minuto*60)+(tiempo.segundo);
    puntuacion = Math.round((puntbase[modojuego]/(segundospunt/60))*(1+(porcenjusta[modojuego]*justasganadas)));
    var puntuacionfix = formatNum(puntuacion,".",",").toString();
    var audiowin = document.createElement('audio');
    audiowin.src = "sounds/victory.ogg";
    audiowin.play();
    showDialog({
        title: 'FELICIDADES!',
        text: 'Has completado el mapa en '+segundospunt+' segundos<br/> Lo que hace un total de: <br/><bolder>'+ puntuacionfix +'</bolder> puntos!',
        positive: {
            title: 'CONTINUAR',
              onClick: function (e) {
              botonaudio.src = "sounds/Hub_Click.ogg";
              botonaudio.play();
              $(".cartahs").flip(false);
              $("#contenedormenu,#contenedormenu2").show();
                 $('#userNav2').show('slide',{direction:'right'},1000);
                 $('#userNav').show('slide',{direction:'left'},1000);
            //   var numerocartas = numerocartastat[modojuego];
            //   resetCards();
            //   resetGame();
            //   vida = vidastat[modojuego];
            //   generaCartas(numerocartas);
            //   tooltipCartas(numerocartas-(haycartas-1));
            //   showCardRandom();
            //   showCardRandom2(""+haycartas);
            //   gameactive = true;
            //   tiempo_corriendo = setInterval(function(){
            //       // Segundos
            //       tiempo.segundo++;
            //       if(tiempo.segundo >= 60)
            //       {
            //           tiempo.segundo = 0;
            //           tiempo.minuto++;
            //       }
            //
            //       // Minutos
            //       if(tiempo.minuto >= 60)
            //       {
            //           tiempo.minuto = 0;
            //           tiempo.hora++;
            //       }
            //
            //       $("#horas").text(tiempo.hora < 10 ? '0' + tiempo.hora : tiempo.hora);
            //       $("#minutos").text(tiempo.minuto < 10 ? '0' + tiempo.minuto : tiempo.minuto);
            //       $("#segundos").text(tiempo.segundo < 10 ? '0' + tiempo.segundo : tiempo.segundo);
            //   }, 1000);
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

  $("#ajustes").mouseenter(function() {
    botonaudio.src = "sounds/Hub_Mouseover.ogg";
    botonaudio.play();
  });

  $("#ajustes").on('click',function(){
    gameactive = false;
    clearInterval(tiempo_corriendo);
    showDialog({
        title: 'MENU',
        text: 'El juego se encuentra en pausa! </br>',
        button: '<img src="media/botonrendirse.png" width="100%"></img>',
        negative: {
            title: '            ',
              onClick: function (e) {
              gameactive = true;
              botonaudio.src = "sounds/Hub_Click.ogg";
              botonaudio.play();
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
  });
  $(window).blur(function(){
    if(gameactive==true){
    clearInterval(tiempo_corriendo);
    showDialog({
        title: 'MENU',
        text: 'El juego se encuentra en pausa!',
        positive: {
            title: 'CONTINUAR',
              onClick: function (e) {
              botonaudio.src = "sounds/Hub_Click.ogg";
              botonaudio.play();
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
  }
});
});
