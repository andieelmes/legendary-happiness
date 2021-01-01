//.tpl-component-productList

$(document).ready(function() {
  function showTabSelection(){

    var $btns = $('.js-tab-select-btn');
    var $blocks = $('.js-tab-select-list')
    
    if(!$btns.length || !$blocks.length) return false


    $btns.each(function(){

      var $btn = $(this);
      var $block = $($btn.attr('href'));
      
      if ($btn.hasClass('active')){
        $block.addClass('active')
      }

      $btn.on('click', function(e) {
        e.preventDefault()
        e.stopPropagation()
  
        $btns.removeClass('active')
        $blocks.removeClass('active')
  
        $block.addClass('active')
        $btn.addClass('active')

        var $heightScrollTo = $block.offset().top - 122;      

        $('html, body').animate({
            scrollTop: $heightScrollTo
        }, 300);

      })
    })
  }
  showTabSelection();

})