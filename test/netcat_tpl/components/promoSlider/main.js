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


    $('body').on('click', function(e){
      if (!$(e.target).closest(blocksClassName).length) {
        $block.removeClass('active')
      }
    })
  })
})


// .tpl-component-promo-slider

$(document).ready(function() {
  var $fotorama = $('.tpl-component-promo-slider:not(.simple) .fotorama');

  function chooseHeight(width) {
    if (width > 1350) return 485
    else if (width > 1250) return 420
    else if (width > 1000) return 390
    else if (width > 700) return 376
    else if (width > 500) return 550
    else return 491
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
      // checkWidth(1250, 390, 485);
      // checkWidth(1000, 376, 390);
      // checkWidth(700, 570, 376);
      //checkWidth(500, 495, 570);
    });
  })
  
})

$(document).ready(function() {

  function dropDown() {
    
    var $sel = $('.select');
    if (!$sel.length) return false;
    
    $sel.each(function(){
      
      var $self = $(this),
          $select = $(this).find('select'),
          $value = $select.val(),
          $currentValue = $select.find('option:selected').text(),
          $name = $select.attr('name'),
          $customClass = $select.attr("class"),

          listClass = 'select-list',
          selectClass = 'select';
          
      $select.attr('name', '_'+$name);
      
      function appendFakeSelect()	{
      
        var template = '<div class="'+$customClass+'-value select-val">' + $currentValue+'</div> <ul class="'+$customClass+'-list select-list"> ';

        $select.find('option').each(function(){
          var $this = $(this);	
          template += '<li class="'+$customClass+'-custom" value="'+$this.attr('value')+'" data-value="'+$this.attr('value')+'">'+$this.text()+'</li>';
        });
        
        template += '</ul>';

        
        $select.before(template);
        
      };
      appendFakeSelect();

      var $list = $self.find('.'+$customClass+'-list')
      var $fakeValue = $self.find('.'+$customClass+'-value')
      
      function showList() {
        $list.addClass('active');
        $self.addClass('active');
      };
      
      function hideList() {
        $list.removeClass('active');
        $self.removeClass('active');
      };
      
      function hideOther() {
        $('.'+selectClass+'.active').removeClass('active').find('.'+listClass).removeClass('active');
      };
      
      function changeValue($item) {
        var t = $item.text();
        var v = $item.attr('data-value');
        $fakeValue.text(t);
        $select.val(v).trigger('change');
      };

      
      $select.on('change', function(val){
        if (val !== $value) {
          $value = val
          var selValue = $select.find('option:selected').text()
          $fakeValue.text(selValue);
        }
      })
      
      
      
      $self.on('click', function(e){
        if ($(this).find('select').is(':hidden')) {
          e.preventDefault();
          if ($(e.target).closest('.'+listClass).length) {
            changeValue($(e.target).closest('li'));
            hideList();
          }
          else if (!$(e.target).closest('.'+selectClass).hasClass('active')) {
            hideOther();
            showList();
          }
          else {
            hideList();
          }
        }
      });

      
      $('html').on('click', function(e){
        if (!$(e.target).closest('.'+selectClass).length) {
          hideOther();
        }
      });
    
    });	
    
  };
  dropDown();

})
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
})
//.tpl-component-subscribe

$(document).ready(function() {

  function validateEmail(email){
    var email = email.val()
    return  email.indexOf('@') !== -1 
            && email.indexOf('.') !== -1 
            && email.lastIndexOf('.') - email.indexOf('@') > 1
            && email.lastIndexOf('.') < email.length - 1;
  }

  function showError(message, input, config){
    var classOuter = config.classOuter, 
        classInner = config.classInner
    var $input = $(input)
    if (!$input.siblings('.' + classOuter).length) {
        var error = '<div class='+ classOuter +'><div class='+ classInner +'>'+ message +'</div></div>'
        $input.after(error)
    }
  }
  function showEmailError(email) {
    return showError('Неправильный формат e-mail', email, {
      classOuter: 'subscribe-error', 
      classInner: 'subscribe-error-text'
    })
  }
  function validateSubscribeForm(){
    var btn = $('.js-subscribe-form-btn')
    if (!btn.length) return false;

    var email = $('.js-subscribe-form-email input')

    var inputs = $('.js-subscribe-form-input input')

    inputs.on( "invalid",
		function(e) {
			e.preventDefault();
    });

    email.on('blur', function(){
      if (email.val() != '' && !validateEmail(email) ) {
        showEmailError(email)
        }
    })

    btn.on('click', function(){

      if (email.val() == '' || !validateEmail(email)) showEmailError(email)
    })

    inputs.on('focus', function(){
      $(this).siblings('.subscribe-error').remove();
      btn.siblings('.subscribe-error-text').remove()

    })
  }
  validateSubscribeForm();
})