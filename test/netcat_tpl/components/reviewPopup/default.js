// .tpl-component-reviews-popup

$(document).ready(function() {

  function rateProduct(){
    var $reviewForm = $('.js-review-form');

    $reviewForm.each(function(){
      var $rateBtn = $(this).find('.js-rate-btn');
      var $rateLabel = $(this).find('.js-rating-word');
      var $ratingInput = $(this).find('.js-input-rating');

      $rateBtn.on('click', function(e){
        e.preventDefault();
        var rating = parseInt($(this).attr('data-rating'));
        
        $rateBtn.removeClass('active');
        $rateLabel.removeClass('active');

        $rateBtn.each(function(){
          if(parseInt($(this).attr('data-rating')) <=rating) {
            $(this).addClass('active')
          }
          $ratingInput.val(rating);
          $rateLabel.filter('[data-rating='+ rating+']').addClass('active');
        })
      })
    })
  }
  rateProduct()

  function openPopup(btn){
    var btnClassName = btn; 
    var popupInnerClass = '.js-popup-inner'

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
   openPopup('.js-write-review-btn')  

})