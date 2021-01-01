// .tpl-component-promo-slider simple

$(document).ready(function() {
  var $fotorama = $('.tpl-component-promo-slider.simple .fotorama');
  
  $fotorama.each(function(i, el){
    var $fotoramaDiv = $(el).fotorama();
    var fotorama = $fotoramaDiv.data('fotorama');
    var $parent = $(el).closest('.tpl-component-promo-slider.simple');
   
    $(window).resize(function(){
      $(el).hide();
      var setWidth = $parent.width();
      $(el).show();
      fotorama.setOptions({
        width: setWidth,
      })
    });
  })
  
})