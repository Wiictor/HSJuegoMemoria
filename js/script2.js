var tiempo_corriendo = null;
var puntbasefacil = 1000000;
var segundospunt = 0;
var puntuacion = 0;
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
  $(document).ready(function(){
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
    $("#nextCard").attr("disabled", false);
    clearInterval(tiempo_corriendo);
    segundospunt = (tiempo.hora*3600)+(tiempo.minuto*60)+(tiempo.segundo);
    puntuacion = Math.round(puntbasefacil/(segundospunt/60));
    alert("FELICIDADES, HAS COMPLETADO EL MAPA EN " + segundospunt + " SEGUNDOS.\n LO QUE HACE UN TOTAL DE: "+puntuacion+" PUNTOS!!");
    tiempo.hora = 0;
    tiempo.minuto = 0;
    tiempo.segundo = 0;
  }
  else{
    $("#nextCard").attr("disabled", true);
  }
});

$('#nextCard').on('click',function(){
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
    $(this).flip(true);
  });

});
