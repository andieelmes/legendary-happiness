// .tpl-component-header-top-part

$(document).ready(function() {

  var blocksClassName = '.js-open-block',
      $blocks = $(blocksClassName)

  $blocks.each(function(){
    var $block = $(this),
        $btn = $block.find('.js-open-btn'),
        $autoFocusInput = $block.find('input:first, textarea:first')


    $btn.on('click', function(e) {
      e.preventDefault()
      e.stopPropagation()

      var isOpen = $block.hasClass('active')
      $blocks.removeClass('active')
      
      if (!isOpen) {
        $block.addClass('active')
        if ($autoFocusInput) $autoFocusInput.focus()
      }
    })


    $('body').on('click touchend', function(e){
      if (!$(e.target).closest(blocksClassName).length) {
        $block.removeClass('active')
      }
    })
  })
})