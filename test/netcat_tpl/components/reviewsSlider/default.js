// .tpl-component-reviews-slider

$(document).ready(function() {
    var $fotorama = $('.tpl-component-reviews-slider .fotorama');
    
    function chooseHeight(width) {
      if (width > 800) return 270
      if (width > 700) return 300
      if (width > 500) return 460
      else return 290
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
      });
    })
  
  function blurReviews(){
    var $reviews = $('.tpl-component-reviews-slider .js-review')
    
    
    $reviews.each(function(){
     
      var $reviewText = $(this).find('.js-review-text');
      var setHeight = $reviews.css('max-height');
      console.log(setHeight)
      var height = $reviewText.height();  
      if (height > setHeight){
        $(this).addClass('blur-review')
      }    
    })

  }
  // blurReviews()

  // $(window).resize(function(){
  //   blurReviews()
  // });
})