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