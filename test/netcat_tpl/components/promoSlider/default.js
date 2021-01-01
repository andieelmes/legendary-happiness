// .tpl-component-promo-slider

$(document).ready(function() {
  var $fotorama = $('.tpl-component-promo-slider:not(.simple) .fotorama');

  function chooseHeight(width) {
    if (width > 1350) return 485
    else if (width > 1250) return 420
    else if (width > 1000) return 390
    else if (width > 700) return 376
    else if (width > 500) return 550
    else return 491
  }
  
  $fotorama.each(function(i, el){
    var $fotoramaDiv = $(el).fotorama();
    var fotorama = $fotoramaDiv.data('fotorama');

    function checkWidth(){
      var windowWidth = $(window).width();
      fotorama.setOptions({
        height: chooseHeight(windowWidth)
      })
    }

    checkWidth()
    $(window).resize(function(){
      checkWidth();
      // checkWidth(1250, 390, 485);
      // checkWidth(1000, 376, 390);
      // checkWidth(700, 570, 376);
      //checkWidth(500, 495, 570);
    });
  })
  
})