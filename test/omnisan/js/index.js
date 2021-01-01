'use strict';

$(document).ready(function () {

  function initSwiperSlider() {
    var container = '.i__slider .swiper-container';
    var mySwiper = new Swiper(container, {
      loop: true,
      slidesPerView: 1,
      speed: 500,
      autoplay: {
        delay: 3000
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets'
      }
    });
    makeSwiperArrows(mySwiper, container);
  }
  function initSwiperReview() {
    var container = '.i__reviews .swiper-container';
    var mySwiper = new Swiper(container, {
      loop: true,
      slidesPerView: 2,
      spaceBetween: 13,
      speed: 500,
      autoplay: {
        delay: 3000
      },
      navigation: {
        nextEl: '.i__slider-next',
        prevEl: '.i__slider-prev'
      },
      breakpoints: {
        // when window width is <= 320px
        1000: {
          slidesPerView: 1,
          spaceBetween: 0
        }
      }
    });
    makeSwiperArrows(mySwiper, container);
  }
  function initSwiperItems() {}
  //Swiper plugin initialization
  $(window).load(function () {
    initSwiperSlider();
    initSwiperReview();
    initSwiperItems();
  });

  //Swiper plugin initialization on window resize
  $(window).on('resize', function () {
    initSwiperSlider();
  });
  $(document).ready(function () {
    if (typeof Swiper === 'undefined') return false;

    $('.js-tabs-filter-list').each(function () {
      var self = $(this);
      var mySwiperItems = null;

      function initSwiper() {
        var screenWidth = $(window).width();
        if (screenWidth >= 720 && !mySwiperItems) {
          var container = self.find('.swiper-container');
          makeItemsSwiperArrows(self);
          mySwiperItems = new Swiper(container, {
            loop: true,
            slidesPerView: 4,
            spaceBetween: 21,
            speed: 500,
            breakpoints: {
              1150: {
                slidesPerView: 3,
                spaceBetween: 10
              },
              750: {
                slidesPerView: 2,
                spaceBetween: 10
              }
            }
          });
        }
        // console.log(screenWidth < 720,!!mySwiperItems);
        if (screenWidth < 720 && !!mySwiperItems) {
          //console.log(screenWidth < 720, mySwiperItems != null) 
          mySwiperItems.destroy();
          mySwiperItems = null;
          self.find('.swiper-wrapper').removeAttr('style');
          self.find('.swiper-slide').removeAttr('style');
        }
      }

      //Swiper plugin initialization
      $(window).load(function () {
        initSwiper();
        setTimeout(function () {
          makeItemsSwiperArrows(self);
        }, 0);
      });

      //Swiper plugin initialization on window resize
      $(window).on('resize', function () {
        initSwiper();
      });
    });
  });

  function makeSwiperArrows(mySwiper, container) {
    var $swiper = $(container);
    var $prev = $swiper.find('.i__slider-prev');
    var $next = $swiper.find('.i__slider-next');
    $prev.on('click', function () {
      mySwiper.slidePrev();
    });
    $next.on('click', function () {
      mySwiper.slideNext();
    });
  }

  function initPopup(btn) {
    var btnClassName = btn;
    var popupInnerClass = '.js-popup-inner';

    var $popups = $('.js-popup');

    var $btn = $(btnClassName);

    $btn.each(function () {

      function closePopup() {
        $popup.removeClass('active');
        $popup.fadeOut(200);
      }

      function openPopup() {
        $popups.removeClass('active');
        $popups.fadeOut(200);
        $popup.addClass('active');
        $popup.fadeIn(200);
        var popupHeight = $('body').outerHeight();
        $popup.css('height', popupHeight);
      }

      var self = $(this);

      var popupName = self.attr('data-popup');
      var $popup = $(popupName);
      var $closebtn = $popup.find('.js-popup-close');

      var $autoFocusInput = $popup.find('input:first, textarea:first');

      self.on('click', function (e) {
        if (!$popup.hasClass('active')) {
          e.preventDefault();
          e.stopPropagation();
          openPopup();
          makeAnimation();
          if ($autoFocusInput) $autoFocusInput.focus();
        }
      });

      $('body').on('click', function (e) {
        if (!$(e.target).closest(popupInnerClass).length) {
          closePopup();
        }
      });

      $(document).keydown(function (e) {
        if (e.keyCode == 27) {
          closePopup();
        }
      });
      $closebtn.on('click', function (e) {
        e.preventDefault();
        closePopup();
      });
    });
  }
  initPopup('.js-login-btn');
  initPopup('.js-reg-btn');
  initPopup('.js-forgot-btn');
  initPopup('.js-callback-btn');

  function makeAnimation() {
    $(".popup-outer.active .popup-animation").find('svg').remove();
    var width = 340,
        height = 340;
    var svg = d3.select(".popup-outer.active .popup-animation").append("svg").attr("class", "rect").attr("width", width).attr("height", height).attr("fill", "transparent");

    svg.append("rect").attr("transform", 'translate(0, 0)').attr("width", 140).attr("height", 140).attr("fill", "transparent");
    function draw() {
      svg.append("rect").attr("width", 140).attr("height", 140)
      // .attr("transform", 'translate('+ (170 - (200/2))+', '+ (170 - (200/2))+')')          
      .attr("transform", 'translate(70, 70)').style("stroke-width", 1).style("stroke", "#5EC0AD").transition().ease("linear").duration(4000).style("stroke-opacity", 1e-6).style("stroke-width", 1).style("stroke", "white")
      // .attr("width", 400)
      // .attr("height", 400)
      .attr("transform", 'scale(2)').remove();
    }
    draw();
    setInterval(function () {
      draw();
    }, 1700);
  }
  //makeAnimation()

  $('input, textarea').on('focus', function () {
    $(this).removeClass('error');
    $(this).removeClass('ok');
    $(this).siblings('.login-error').remove();
    $(this).siblings('.login-message').remove();
  });
  function maskPhone(input) {
    $(input).mask("+7 (999) 999-9999");
  }
  function showInputError(name, text) {
    name.addClass('error');
    showError(text, name, 'login-error', 'login-error-text');
  }
  function showInputMessage(name, text, className) {
    name.addClass(className);
    showError(text, name, 'login-message', 'login-message-text');
  }
  function checkPasswordStrengh(value) {
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

    if (strongRegex.test(value)) {
      return 'strong';
    } else if (mediumRegex.test(value)) {
      return 'medium';
    } else {
      return 'low';
    }
  }
  function validateLoginForms() {
    var $forms = $('.js-login-forms');
    $forms.each(function () {
      var self = $(this);
      var btn = self.find('.js-login-btns');

      var email = self.find('.js-input-email');
      var password = self.find('.js-input-password--1');
      var password2 = self.find('.js-input-password--2');
      var phoneInputs = self.find('.js-input-phone');
      phoneInputs.each(function () {
        maskPhone($(this));
      });

      email.on('blur', function () {
        if (email.val() != '' && !validateEmail(email)) {
          showInputError(email, 'E-mail введен некорректно');
        }
      });

      function checkIfEqual(input1, input2) {
        if (input1.val() !== input2.val() && input1.val() != '' && input2.val() != '') {
          showInputError(input2, 'Проверьте пароли');
          return false;
        } else {
          input2.siblings('.login-error').remove();
          input2.removeClass('error');
          return true;
        }
      }

      if (password2.length) {
        //console.log(password2);
        password2.on('blur', function () {
          checkIfEqual(password, password2);
        });
        password.on('blur', function () {
          checkIfEqual(password, password2);
        });
      }
      if (password.length && self.closest('#regPopup').length) {
        password.on('blur', function () {
          if (checkPasswordStrengh(password) === 'strong') {
            showInputMessage(password, 'Надежный пароль', 'strong');
          } else if (checkPasswordStrengh(password) === 'medium') {
            showInputMessage(password, 'Хороший пароль', 'medium');
          } else if (checkPasswordStrengh(password) === 'low') {
            showInputMessage(password, 'Ненадежный пароль', 'low');
          }
        });
      }

      btn.on('click', function (e) {

        var inputs = self.find('input,textarea,select');

        var requiredInputs = self.find('input,textarea,select').filter('[required]:visible');
        requiredInputs.on("invalid", function (e) {
          e.preventDefault();
        });

        requiredInputs.each(function () {
          var input = $(this);

          if (input.hasClass('js-input-name') && input.val() === '') {
            showInputError(input, 'Введите имя');
          } else if (input.hasClass('js-input-phone') && input.val() === '') {
            showInputError(input, 'Введите телефон');
          } else if (input.hasClass('js-input-email') && input.val() === '') {
            showInputError(input, 'Введите e-mail');
          } else if (input.hasClass('js-input-password') && input.val() === '') {
            showInputError(input, 'Введите пароль');
          } else if (input.hasClass('js-input-email') && input.val() !== '' && !validateEmail(input)) {
            showInputError(input, 'E-mail введен некорректно');
          }
          if (password2.length) {
            if (password.val() == '' || password2.val() == '' || !checkIfEqual(password, password2)) {
              e.preventDefault();
              showInputError(password2, 'Проверьте пароли');
            }
          }
        });
      });
    });
  }
  validateLoginForms();

  function showSelection() {

    var $btns = $('.js-tabs-filter');
    var $blocks = $('.js-tabs-filter-list');

    if (!$btns.length || !$blocks.length) return false;

    $btns.each(function () {

      var $btn = $(this);
      var $block = $($btn.attr('href'));

      if ($btn.hasClass('active')) {
        $block.animate({
          opacity: 1
        }, 500);
        $block.addClass('active');

        //makeItemsSwiperArrows($block)
      }

      $btn.on('click', function (e) {
        e.preventDefault();

        $btns.removeClass('active');
        $btn.addClass('active');

        $blocks.removeClass('active');
        $blocks.css('opacity', 0);

        $block.addClass('active');
        $block.animate({
          opacity: 1
        }, 500);

        makeItemsSwiperArrows($block);
      });
    });
  }
  showSelection();

  function makeItemsSwiperArrows(block) {
    var $block = $(block);
    var container = $block.find('.swiper-container')[0];
    var mySwiper = container.swiper;
    if (!mySwiper) return;

    mySwiper.update();
    var $prev = $block.find('.i__slider-prev');
    var $next = $block.find('.i__slider-next');

    $prev.on('click', function () {
      mySwiper.slidePrev();
    });
    $next.on('click', function () {
      mySwiper.slideNext();
    });
  }

  function makeRating() {
    var $rating = $('.js-rating');
    var $stars = $('.js-rating-star');
    var rating = parseFloat($rating.attr('data-rating'));
    $stars.each(function () {
      var order = parseInt($(this).attr('data-star'));
      var delta = rating - order;
      $(this).css('width', Math.min(delta * 100, 100) + '%');
    });
  }
  makeRating();

  function maskPostalCode(input) {
    $(input).mask("999999");
  }

  function validatePersonalInfoForms() {
    var $forms = $('.js-personal-info-forms');
    $forms.each(function () {
      var self = $(this);
      var btn = self.find('.js-personal-info-btn');

      var email = self.find('.js-input-email');
      var password = self.find('.js-input-password--1');
      var password2 = self.find('.js-input-password--2');
      var phoneInputs = self.find('.js-input-phone');
      var postalCodes = self.find('.js-input-postalcode');
      phoneInputs.each(function () {
        maskPhone($(this));
      });

      postalCodes.each(function () {
        maskPostalCode($(this));
      });

      var checkboxes = self.find('.js-input-checkbox');
      checkboxes.on('click', function () {
        $(this).removeClass('error');
        $(this).siblings('.login-error').remove();
      });

      email.on('blur', function () {
        if (email.val() != '' && !validateEmail(email)) {
          showInputError(email, 'E-mail введен некорректно');
        }
      });

      function checkIfEqual(input1, input2) {
        if (input1.val() !== input2.val() && input1.val() != '' && input2.val() != '') {
          showInputError(input2, 'Проверьте пароли');
          return false;
        } else {
          input2.siblings('.login-error').remove();
          input2.removeClass('error');
          return true;
        }
      }

      if (password2.length) {
        //console.log(password2);
        password2.on('blur', function () {
          checkIfEqual(password, password2);
        });
        password.on('blur', function () {
          checkIfEqual(password, password2);
        });
      }
      if (password.length && self.closest('#regPopup').length) {
        password.on('blur', function () {
          if (checkPasswordStrengh(password) === 'strong') {
            showInputMessage(password, 'Надежный пароль', 'strong');
          } else if (checkPasswordStrengh(password) === 'medium') {
            showInputMessage(password, 'Хороший пароль', 'medium');
          } else if (checkPasswordStrengh(password) === 'low') {
            showInputMessage(password, 'Ненадежный пароль', 'low');
          }
        });
      }

      btn.on('click', function (e) {

        var inputs = self.find('input,textarea,select');

        var requiredInputs = self.find('input,textarea,select').filter('[required]:visible');
        requiredInputs.on("invalid", function (e) {
          e.preventDefault();
        });

        requiredInputs.each(function () {
          var input = $(this);

          if (input.hasClass('js-input-name') && input.val() === '') {
            showInputError(input, 'Введите фамилию');
          } else if (input.hasClass('js-input-phone') && input.val() === '') {
            showInputError(input, 'Введите телефон');
          } else if (input.hasClass('js-input-email') && input.val() === '') {
            showInputError(input, 'Введите e-mail');
          } else if (input.hasClass('js-input-password') && input.val() === '') {
            showInputError(input, 'Введите пароль');
          } else if (input.hasClass('js-input-email') && input.val() !== '' && !validateEmail(input)) {
            showInputError(input, 'E-mail введен некорректно');
          } else if (input.hasClass('js-input-address') && input.val() === '') {
            showInputError(input, 'Введите адрес');
          } else if (input.hasClass('js-input-city') && input.val() === '') {
            showInputError(input, 'Введите город');
          } else if (input.hasClass('js-input-region') && input.val() === '') {
            showInputError(input, 'Введите регион');
          } else if (input.hasClass('js-input-postalcode') && input.val() === '') {
            showInputError(input, 'Введите индекс');
          } else if (input.hasClass('js-input-checkbox') && !input.is(':checked')) {
            showInputError(input, 'Необходимо согласиться');
          } else if (input.hasClass('js-input-textarea') && input.val() === '') {
            //console.log(input);         
            showInputError(input, 'Напишите ваш вопрос');
          } else if (self.hasClass('js-account-feedback-form') && input.hasClass('js-input-textarea') && input.val() !== '') {
            e.preventDefault();
            input.addClass('ok');
            showInputMessage(input, 'Ваш запрос был отправлен');
          }
          if (password2.length) {
            if (password.val() == '' || password2.val() == '' || !checkIfEqual(password, password2)) {
              e.preventDefault();
              showInputError(password2, 'Проверьте пароли');
            }
          }
        });
      });
    });
  }
  validatePersonalInfoForms();
});