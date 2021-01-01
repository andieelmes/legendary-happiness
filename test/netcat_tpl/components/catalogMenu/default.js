
$(document).ready(function() {
  var blocksClassName = '.js-open-catalog-menu',
  $blocks = $(blocksClassName)

  $blocks.each(function(){
    var $block = $(this),
        $btn = $block.find('.js-open-catalog-btn'),
        $autoFocusInput = $block.find('input:first, textarea:first')


    $btn.on('click', function(e) {
      e.preventDefault()
      e.stopPropagation()

      var isOpen = $block.hasClass('active') && !$block.hasClass('hidden-mobile')
      if (!isOpen) {
        $blocks.removeClass('active-mobile')
        $block.addClass('active')
        $block.addClass('active-mobile')
        $block.removeClass('hidden-mobile')
        if ($autoFocusInput) $autoFocusInput.focus()
      }
      else {
        console.log(1);
        $block.removeClass('active')
        $blocks.removeClass('active-mobile')
        $block.addClass('hidden-mobile')
        $blocks.addClass('hidden-mobile')
      }

      $('body').on('click touchend', function(e){
        if (!$(e.target).closest($block).length) {
          $block.addClass('hidden-mobile')
          $block.removeClass('active-mobile')
        }
      })
    })
    $('.js-close-filter').on('click', function(){
      $block.removeClass('active')
      $blocks.removeClass('active-mobile')
      $block.addClass('hidden-mobile')
    })
  })
})