//tpl-component-subsribe-popup

$(document).ready(function() {
  var popupInnerClass = '.js-popup-inner'
  function openPopup(btn){
    var btnClassName = btn; 
    

    var $popups = $('.js-popup')

    var $btn = $(btnClassName)  

    $btn.each(function(){

      function closePopup(){
        $popup.removeClass('active')
        $popup.fadeOut(200)
      }
  
      function openPopup(){
        $popups.removeClass('active')
        $popups.fadeOut(200)
        $popup.addClass('active');
        $popup.fadeIn(200)
      }

      var self = $(this);

      var popupName = self.attr('data-popup')
      var $popup = $(popupName)
      var $closebtn = $popup.find('.js-popup-close')
  
      var $autoFocusInput = $popup.find('input:first, textarea:first')


      self.on('click', function(e){
        if (!$popup.hasClass('active')) {
          e.preventDefault()
          e.stopPropagation()
          
          openPopup();
          if ($autoFocusInput) $autoFocusInput.focus()
        }
      })
  
      $('body').on('click', function(e){
        if (!$(e.target).closest(popupInnerClass).length) {
          closePopup()
        }
      })
  
      $(document).keydown(function(e) {
        if (e.keyCode == 27) {
          closePopup()
        }
      });
      $closebtn.on('click', function(e){
        e.preventDefault();
        closePopup()
      })
    })

    
    
  }
    openPopup('.js-subscribe-btn')  

    $('.js-popup-close').on('click', function(){
      $('.js-popup').removeClass('active')
      $('.js-popup').fadeOut(200)
    })
    console.log($('.js-popup').hasClass('active'));
    $('body').on('click', function(e){
      if (!$(e.target).closest(popupInnerClass).length) {
        $('.js-popup').removeClass('active')
        $('.js-popup').fadeOut(200)
      }
    })
  })