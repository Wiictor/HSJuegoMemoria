function allFlipped(){
  var sol = false;
  var cont = 0;
  for(var l=1;l<6;l++){
    var flip = $("#"+l).data("flip-model");
    if(flip.isFlipped == true){
      cont++;
    }
  }
  if(cont==5){
    sol = true;
  }
  return sol;
}
$(document).ready(function(){

  var audio = document.createElement('audio');
  var audio2 = document.createElement('audio');
  var audio3 = document.createElement('audio');
$(".cartahs").flip();
$(".cartahs").mouseenter(function () {
  audio3.src = "sounds/card_mouse_over.ogg";
  audio3.play();
  var flip = $(this).data("flip-model");
  if(flip.isFlipped == false){
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
  $(this).flip(true);
  if(allFlipped() == true){
    $("#nextCard").attr("disabled", false);
  }
  else{
    $("#nextCard").attr("disabled", true);
  }
  // $(this).off(".flip");
});

$('#nextCard').on('click',function(){
    $(this).flip(true);
  });
});
