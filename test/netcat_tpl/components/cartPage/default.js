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