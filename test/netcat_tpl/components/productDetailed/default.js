//.tpl-component-product-detailed

$(document).ready(function() {

  function changePreview(){
    var $photos = $('.tpl-component-product-detailed .js-color-photos')


    function changeBackground(el, url){
      el.css({
        'background-image': 'url('+ url +')'
       })
       el.attr('href', url)
    }

    $photos.each(function(){
      var $thumbs = $(this).find('.js-thumb')
      var $image = $(this).find('.js-image')

      var currentDataUrl = $thumbs.filter('.active').attr('data-image')

      changeBackground($image, currentDataUrl)
  
      $thumbs.each(function(){
        var $self = $(this);
        var dataUrl = $self.attr('data-image');    
        
        $self.on('click', function(e){
          e.preventDefault();
          var isOpen = $self.hasClass('active');
          if (!isOpen) {     
            $thumbs.removeClass('active')
            $self.addClass('active');

            changeBackground($image, dataUrl)
          }
        })
      })
    })
    
  }
  changePreview();

  function changeColor(){
    var $colorBtns = $('.tpl-component-product-detailed .js-color-btn')
    var $colors = $('.tpl-component-product-detailed  .js-color-photos')
    
    $colorBtns.each(function(){
      var $self = $(this);
      var dataColor = $self.attr('data-color');
      
      $self.on('click', function(e){
        e.preventDefault();
        var isOpen = $self.hasClass('active');
        
        if (!isOpen) {
          $colorBtns.removeClass('active')
          $self.addClass('active');
          
          $colors.removeClass('active');
          $colors.filter('[data-color='+ dataColor+']').addClass('active') 
          mySwiper.destroy(true, false);
          initSwiper();
        }
      })
    })
  }
  changeColor();

  function changeQuantity(){
    var $inputs = $('.js-quantity')
    
    $inputs.each(function(){
      
      var $btnLess = $(this).find('.js-quantity-btn--less')
      var $btnMore = $(this).find('.js-quantity-btn--more')
      var $input = $(this).find('.js-quantity-input')
      
      var val = +$input.val();
      var min = +$input.attr('min')
      var max = +$input.attr('max')
      var step = +$input.attr('step')
      
      $input.on('change', function() {
        val = +$input.val();
      })

      $btnLess.on('click', function(){
        
        if (val - step > min) {
          val = val - step
          $input.val(val);
          $input.trigger("change")
        }
      })

      $btnMore.on('click', function(){
        
        
        if (val + step <= max) {
          val = val +step;
          $input.val(val);
          $input.trigger("change")
        }
      })

      
    })
  }

  var mySwiper;
    
  changeQuantity();
  function initSwiper() {
    mySwiper = new Swiper ('.product-detailed-swiper.active .swiper-container', {
      loop: false,
      slidesPerView: 2,
      spaceBetween: 10,
      grabCursor: true,
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    })
  }
  $('.product-detailed-swiper.active').each(function(){
    initSwiper();  
  });
  
})