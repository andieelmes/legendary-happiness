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
//.tpl-component-cart-page

$(document).ready(function() {

  $('input, textarea').on('focus', function() {
    $(this).siblings('.cart-error').remove();
  })

  function showError(message, input, config){    
    var classOuter = config.classOuter, 
        classInner = config.classInner
    var $input = $(input)
    if (!$input.siblings('.' + classOuter).length) {
        var error = '<div class='+ classOuter +'><div class='+ classInner +'>'+ message +'</div></div>'
        $input.after(error)
    }
  }
  function showInputError(name, text) {    
    return showError(text, name, {
      classOuter: 'cart-error', 
      classInner: 'cart-error-text'
    })
  }

  function maskPhone(input){
    $(input).mask("+7 (999) 999-9999");  
  }
  function validateEmail(email){

    var email = email.val()
    return  email.indexOf('@') !== -1 
            && email.indexOf('.') !== -1 
            && email.lastIndexOf('.') - email.indexOf('@') > 1
            && email.lastIndexOf('.') < email.length - 1;
  }

  function validateNonRequiredInputs(inputs){
    var result = true;
    inputs.each(function(){
      var input = $(this);

      if (input.val() != '') {

        if (input.hasClass('js-input-email') 
            && !validateEmail(input) ){
          showInputError(input, 'Неправильный формат e-mail')
          result = false;
        }
      }   
    })

    return result;
  }

  function validateEmailInput(){
    var btn = $('.js-email-btn');
    var input = $('.js-input-email');

    input.on('blur', function(){  
      if (input.val() != '' && !validateEmail(input) ) {
        showInputError(input, 'Неправильный формат e-mail')
      }
    })

    btn.on('click', function(e){
      if (input.val() != '' && !validateEmail(input) ) {
        e.preventDefault();
        showInputError(input, 'Неправильный формат e-mail')
      }
    })
  }
  validateEmailInput()

  function validateCartForm(){
    var $btns = $('.js-cart-stage-btn');
    var $forms = $('.js-stage-form')
    
    $forms.each(function(){
      var self = $(this);
      var btn = self.find('.js-cart-stage-btn');
      var nextStageId = btn.attr('data-nextStage')
      var nextStage = $(nextStageId);

      var phoneInputs = self.find('.js-input-phone');
      phoneInputs.each(function(){
        maskPhone($(this))
      })
     
      self.on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            //
        });
      });
   
      
      btn.on('click', function(){        
        
        var inputs = self.find('input,textarea,select')
        var nonRequiredInputsValid = validateNonRequiredInputs(inputs)

        if (!nonRequiredInputsValid) return false;

        var requiredInputs = self.find('input,textarea,select').filter('[required]:visible')
        
        if (!requiredInputs.length) {
          self.removeClass('active')
          nextStage.addClass('active');
          changeActiveStateLabel(nextStageId)
          return false
        }
        

        requiredInputs.on( "invalid",
          function(e) {
          e.preventDefault();
        });
        
        requiredInputs.each(function(){
          var input = $(this);

          if (input.hasClass('js-input-name') 
              && input.val() === '' ){
            showInputError(input, 'Введите имя')
          }
          else if (input.hasClass('js-input-city')
              && input.val() !== '' ){
            showInputError(input, 'Выберите город')
          }
          else {
            nextStage.addClass('active');
            self.removeClass('active')
          }       

        })

        
      })
    })

    
  }
  validateCartForm()


  function changeActiveStateLabel(activeStage){
    var labels = $('.js-stage-labels');
    
    labels.each(function(){
      var labelItems = $(this).find('.js-stage-label');
      
      labelItems.each(function(){
        var self = $(this)
        var stage = self.attr('data-stage');


        if (stage == activeStage) {
          labelItems.removeClass('active');
          self.addClass('active')
        }
      })
    })
  }

  function changeCartItemStatus(){
    var items = $('.js-cart-item');

    items.each(function(){
      var self = $(this)
      var changeStatusBtn = self.find('.js-cart-item-changeStatus-btn');
      var status = self.find('.js-cart-item-status');
      changeStatusBtn.on('click', function(){
        
        if (!self.hasClass('deleted')) {
          console.log(self)
          self.addClass('deleted')
          status.val(1);
          updateTotalSum()
        }

        else if (self.hasClass('deleted')) {
          self.removeClass('deleted')
          status.val(0);
          updateTotalSum()
        }
      })
    })
  }

  changeCartItemStatus()

  function formatNumber(number){
    return number.toString().replace(/(.)(?=(\d{3})+$)/g,'$1 ')
  }

  function updateItemCartPrices(){
    var cartItems = $('.js-cart-item:not(.hidden)')
    
    cartItems.each(function(){
      var self = $(this)   
      var quantity = self.find('.js-cart-item-quanity-input');
      var price = self.find('.js-cart-item-price-input')
      var sumField = self.find('.js-cart-item-sum');
      var sumInput = self.find('.js-cart-item-sum-input');
      
      quantity.on("change", function(){
        var newSum = +price.val() * +quantity.val();
        sumInput.val(newSum);
        sumField.html(formatNumber(newSum))   
        updateTotalSum()
       
      })
      
    })
   
  }

  updateItemCartPrices()

  function updateTotalSum(){
    var totalSumField = $('.js-cart-item-sumTotal-input')
    var totalSumInput = $('.js-cart-item-sumTotal')
    var totalSumValue = 0;
    totalSumInput.html(formatNumber(totalSumValue)) 
    totalSumField.val(totalSumValue)

    var cartItems = $('.js-cart-item:not(.deleted)')
    cartItems.each(function(){
      var self = $(this)   
      var sumInput = self.find('.js-cart-item-sum-input');

      totalSumValue += +sumInput.val();
      totalSumField.val(totalSumValue)
      totalSumInput.html(formatNumber(totalSumValue)) 
      
    })
  }
  updateTotalSum()

})
// .tpl-component-catalog-filer

$(document).ready(function() {
  function checkIfNumber(input){
    return input.match(/^[0-9]+$/)		
  }
  function allowOnlyNumbers(input){
    input.on( "keyup", function() {		
      if (checkIfNumber(this.value)) {
        this.value = this.value
      }
      else {
        var val = parseInt(this.value)
        this.value = isNaN(val) ? "" : val
      }
    })
  }
  function validatePriceRangeInputs(){
    var $min = $('.js-price-min');
    var $max = $('.js-price-max');

    allowOnlyNumbers($min);
    allowOnlyNumbers($max);

    $min.on('blur', function(){
      var maxValue = $max.val();
      if ($(this).val() > +maxValue && +maxValue != 0) {
        $(this).val(+maxValue - 1);
      }
    })
    $max.on('blur', function(){
      var minValue = $min.val();
      if ($(this).val() < +minValue && +minValue != 0) {
        $(this).val(+minValue + 1);
      }
    })
  }
  validatePriceRangeInputs()


  function resetFilters(){
    var $btn = $('.js-filter-reset');
    var $filters = $('.js-filter-checkbox');
    $btn.on('click', function(){
     
      $filters.each(function(){
        //console.log($(this))
        $(this).prop('checked', false)
       
      })
      showNumberOfCheckedFilters()
      
    })
  }
  resetFilters()

  function toggleFilters() {
    var $block = $('.js-filter-menu');
    var $outerbtn = $('.js-close-filter-btn')
    
    $block.each(function(){
      var $btn = $block.find('.js-show-filter-menu-btn')
      console.log($btn);
      $block.addClass('hidden');
      $btn.off('click').on('click', function(){
        
        $block.toggleClass('hidden')
      })
      if ($( window ).width() < 750) {
        $outerbtn.off('click').on('click', function(){
          //console.log($outerbtn)
          $block.addClass('hidden')
        })
      }    
    })
  }
  toggleFilters()

  $(window).resize(function() {
    toggleFilters();
  });

  function showNumberOfCheckedFilters() {
    var $filter = $('.js-filter-menu');
    var $options = $filter.find('.js-filter-options');
    $options.each(function(){
      var self = $(this);
      var $checkboxes = self.find('.js-filter-checkbox:checked')
      var number = self.find('.showNumber');
      if (number.length) {
        number.remove();
      }
      if ($checkboxes.length > 1) {
        var tpl = '<div class="catalog-filter-checkbox checkbox showNumber"><span class="checkbox-label">Выбрано '+ $checkboxes.length +'</span></div>'      
        self.prepend(tpl);
      }

    });
  }
  showNumberOfCheckedFilters()

  $('.js-filter-options input').on('change', function(){
    showNumberOfCheckedFilters()
  })


})

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


    $('body').on('click touchend', function(e){
      if (!$(e.target).closest(blocksClassName).length) {
        $block.removeClass('active')
      }
    })
  })
})
//tpl-component-login-popup

$(document).ready(function() {

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
  openPopup('.js-login-btn')
  openPopup('.js-reg-btn')

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
      classOuter: 'login-error', 
      classInner: 'login-error-text'
    })
  }

  
  function validateLoginRegForm(){
    var btn = $('.js-loginReg-form-btn')
    if (!btn.length) return false;
    btn.each(function(){
      var $form = $(this).closest('.js-loginReg-form')

      var email = $form.find('.js-loginReg-form-email input')
      var password = $form.find('.js-loginReg-form-password input')
      var password2 = $form.find('.js-loginReg-form-password2 input')
      var name = $form.find('.js-loginReg-form-name input')
      var inputs = $form.find('.js-loginReg-form-input input')

      inputs.on( "invalid",
        function(e) {
          e.preventDefault();
      });
  
      email.on('blur', function(){
        if (email.val() != '' && !validateEmail(email) ) {
          showEmailError(email)
          }
      })

      function checkIfEqual(input1, input2){
        console.log(input1.val(), input2.val())
        if (input1.val() !== input2.val() && input1.val() != '' && input2.val() != ''){
          showError('Пароли должны быть одинаковыми', input2, {
            classOuter: 'login-error', 
            classInner: 'login-error-text'
          })
          return false;
        } 
        else {
          input2.siblings('.login-error').remove();
          return true;
        }
      }

      if (password2.length) {
        password2.on('blur', function(){
          checkIfEqual(password, password2)
        })
        password.on('blur', function(){
          checkIfEqual(password, password2)
        })
      }

      
  
      $(this).on('click', function(e){
        if (email.val() == '' || !validateEmail(email)) {
          e.preventDefault()
          showEmailError(email)
        }
        if (password2.length) {
          if (password.val() == '' || password2.val() == ''|| !checkIfEqual(password, password2)) {
            e.preventDefault()
            showError('Пароли должны быть одинаковыми', password2, {
              classOuter: 'login-error', 
              classInner: 'login-error-text'
            })
          }
        }
        else {
          if (password.val() == '') {
            e.preventDefault()
            showError('Введите пароль', password, {
              classOuter: 'login-error', 
              classInner: 'login-error-text'
            })
          }
        }
        
        if (name.length && name.val() == '') {
          e.preventDefault()
          showError('Введите имя', name, {
            classOuter: 'login-error', 
            classInner: 'login-error-text'
          })
        }
      })
  
      inputs.on('focus', function(){
        $(this).siblings('.login-error').remove();
        btn.siblings('.login-error-text').remove()
  
      })
  
    })
    
    

    
   
  }
  
  validateLoginRegForm();

})
//tpl-component-login-popup

$(document).ready(function() {
  
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
    openPopup('.js-compare-btn')  
    openPopup('.js-fav-btn')  
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
          $customClass = $select.attr("data-custom-class"),

          listClass = 'select-list',
          selectClass = 'select';
          
      $select.attr('name', '_'+$name);
      
      function appendFakeSelect()	{
      
        var template = '<div class="'+$customClass+'-value select-val">' + $currentValue+'</div> <ul class="'+$customClass+'-list select-list"> ';

        $select.find('option').each(function(){
          var $this = $(this);	
          template += '<li class="'+$customClass+'-item" value="'+$this.attr('value')+'" data-value="'+$this.attr('value')+'">'+$this.text()+'</li>';
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
$(document).ready(function() {
  function changeItemView(btn) {
    var $btns = $(btn);
   
    $btns.each(function(){
      var self = $(this);
      var $parent = self.closest('.tpl-component-product-list');
      var type = self.attr('data-type')
      console.log(type);
      if (type == 'list') {
        self.on('click', function(){
          $btns.removeClass('active');
          self.addClass('active')
          $parent.addClass('detailed')
        })
      }   
      if (type == 'card') {
        self.on('click', function(){
          $btns.removeClass('active');
          self.addClass('active')
          $parent.removeClass('detailed')
        })
      }    
    });
  }
  changeItemView('.js-view-type');
})
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
$(document).ready(function() {
  var $productCoverPromotion = $('.catalog .product-cover--promotion').clone().addClass('copy');
  var $content = $('.content');
  $content.append($productCoverPromotion);
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

  $('.product-buy').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
  })
})
//tpl-component-login-popup

$(document).ready(function() {
  
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
    openPopup('.js-quickOrder-btn')  
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
// .tpl-component-promo-slider simple

$(document).ready(function() {
  var $fotorama = $('.tpl-component-promo-slider.simple .fotorama');
  
  $fotorama.each(function(i, el){
    var $fotoramaDiv = $(el).fotorama();
    var fotorama = $fotoramaDiv.data('fotorama');
    var $parent = $(el).closest('.tpl-component-promo-slider.simple');
   
    $(window).resize(function(){
      $(el).hide();
      var setWidth = $parent.width();
      $(el).show();
      fotorama.setOptions({
        width: setWidth,
      })
    });
  })
  
})
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

    btn.on('click', function(e){
      if (email.val() == '' || !validateEmail(email)) {
        e.preventDefault()
        showEmailError(email)
      }
    })

    inputs.on('focus', function(){
      $(this).siblings('.subscribe-error').remove();
      btn.siblings('.subscribe-error-text').remove()

    })
  }
  
  validateSubscribeForm();
})
$(document).ready(function() {
  var $subsribePromotion = $('.catalog .tpl-component-subscribe.promotion').clone().addClass('copy');
  var $content = $('.content');
  $content.append($subsribePromotion)
  
}) 
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