// .tpl-component-cover-slider

$(document).ready(function() {
  function makeFotoramaArrows(){
    var $fotoramaWithArrows = $('.fotorama-arrow');
    
    $fotoramaWithArrows.each(function(i, el){
      var $fotoramaDiv = $(el).fotorama();
      var fotorama = $fotoramaDiv.data('fotorama');

      var $arrowLeft = $(el).siblings('.js-fotorama-arrow-left')
      var $arrowRight = $(el).siblings('.js-fotorama-arrow-right')
      
      $arrowLeft.on('click', function(){
        fotorama.show('<');
      })
      $arrowRight.on('click', function(){
        fotorama.show('>');
      })
    })
    
  }

  makeFotoramaArrows();

  var $fotorama = $('.tpl-component-cover-slider .fotorama');

  function chooseHeight(width) {
    if (width >= 1000) return 500
    else return 408
  }
  
  $fotorama.each(function(i, el){
    var $fotoramaDiv = $(el).fotorama();
    var fotorama = $fotoramaDiv.data('fotorama');

    function checkWidth(){
      var windowWidth = $(window).width();
      fotorama.setOptions({
        minheight: chooseHeight(windowWidth),
      });
    }
    checkWidth()
    $(window).resize(function(){
      checkWidth() 
    });
  })
})