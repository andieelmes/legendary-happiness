//.tpl-component-productList

$(document).ready(function() {
  function showSelection(){

    var $btns = $('.js-tabs-filter');
    var $blocks = $('.js-tabs-filter-list')
    
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

      })
    })
  }
  showSelection();

  $('.product-buy').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
  })
})