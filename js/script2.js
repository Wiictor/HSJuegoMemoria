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
  resetCards();
  var audio = document.createElement('audio');
  var audio2 = document.createElement('audio');
  var audio3 = document.createElement('audio');
$(".cartahs").flip();
$(".cartahs").mouseenter(function () {
  audio3.src = "sounds/card_mouse_over.ogg";
  audio3.play();
  var flip = $(this).data("flip-model");
  if(flip.isFlipped == false){ // AÑADE BRILLO A LAS CARTAS SEGÚN SU RAREZA, LO DESACTIVAREMOS PORQUE NO TIENE MUCHO SENTIDO EN EL JUEGO, PERO SE PODRÍA ACTIVAR
  //   if($(this).attr('data-rarity') == "Common" || $(this).attr('data-rarity') == "Free"){
  //   $(this).addClass("glowCommon");
  // }
  //   if($(this).attr('data-rarity') == "Rare"){
    // $(this).addClass("glowRare");
    // audio.src = 'sounds/card_aura_rare_lp.ogg';
    // audio.loop = true;
  // }
  //   if($(this).attr('data-rarity') == "Epic"){
  //   $(this).addClass("glowEpic");
  //   audio.src = 'sounds/card_aura_epic_lp.ogg';
  //   audio.loop = true;
  // }
    // if($(this).attr('data-rarity') == "Legendary"){
    // $(this).addClass("glowLegendary");
    //   audio.src = 'sounds/card_aura_legendary_lp.ogg';
    //   audio.loop = true;
  // }
  audio.play();
  }
  else{
    // $(this).removeClass("glowCommon");
    // $(this).removeClass("glowRare");
    // $(this).removeClass("glowEpic");
    // $(this).removeClass("glowLegendary");
    audio.src = '';
    audio.loop = false;
  }
});
$(".cartahs").mouseout(function () {
  // $(this).removeClass("glowCommon");
  // $(this).removeClass("glowRare");
  // $(this).removeClass("glowEpic");
  // $(this).removeClass("glowLegendary");
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
  }
  else{
    $("#nextCard").attr("disabled", true);
  }
});

$('#nextCard').on('click',function(){
    resetCards();
    $(this).flip(true);
  });

});
