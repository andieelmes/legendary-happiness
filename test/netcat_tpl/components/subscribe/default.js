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