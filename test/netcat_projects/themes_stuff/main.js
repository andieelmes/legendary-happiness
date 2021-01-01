(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var makeAnim = exports.makeAnim = function makeAnim(anim_classes) {

  if (navigator.platform.indexOf('Win') > -1) $('html').addClass('is-windows');

  var gd = false;

  function defineGD() {
    gd = $(window).width() <= 960;
    if (gd) $('html').addClass('is-gd');else $('html').removeClass('is-gd');
  }

  defineGD();
  $(window).resize(function () {
    defineGD();
  });

  var classes = anim_classes;

  var anims = [];
  anims.length = classes.length;
  anims.fill(false, 0, anims.length);

  var offsets = [];
  offsets.length = classes.length;

  if (!gd) {
    classes.forEach(function (className) {
      $(className).addClass('is-ready');
    });
  }

  function defineOffsets() {
    var wh = $(window).height() * 3 / 4;
    var lastEl = classes[anims.length - 1];
    var last = Math.min($(lastEl).offset().top - wh - 200, $('#all').height() - $(window).height());

    for (var i = 0; i < offsets.length; i++) {
      if (i == 0) offsets[i] = 5;else if (i == offsets.length - 1) offsets[offsets.length - 1] = last;else {
        var el = classes[i];
        offsets[i] = $(el).offset().top - wh;
      }
    }
  }

  var calcAnim = function calcAnim(sct, index) {
    if (!gd && !anims[index] && sct >= offsets[index]) {
      anims[index] = true;
      var className = classes[index];
      $(className).removeClass('is-ready');
    }
  };

  defineOffsets();

  setTimeout(function () {
    calcAnim(6, 0);
  }, 500);

  $(window).scroll(function () {
    var sct = $(this).scrollTop();
    for (var index = 0; index < classes.length; index++) {
      calcAnim(sct, index);
    }
  });

  $(window).resize(function () {
    defineOffsets();
    if (gd) {
      classes.map(function (className) {
        $(className).removeClass('is-ready');
      });
    }
  });
};

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var showSelection = exports.showSelection = function showSelection(btn, block, container) {

  var $container = $(container);
  var $btns = $container.find(btn);
  var $blocks = $container.find(block);

  if (!$btns.length || !$blocks.length) return false;

  $btns.each(function () {

    var $btn = $(this);
    var $block = $container.find($($btn.attr('href')));

    if ($btn.hasClass('active')) {
      $block.addClass('active');
    }

    $btn.on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      $btns.removeClass('active');
      $blocks.removeClass('active');

      $block.addClass('active');
      $btn.addClass('active');
    });
  });
};

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initYoutube = undefined;

var _youtube = require('./youtube');

var initYoutube = exports.initYoutube = function initYoutube() {
  var $btns = $('.js-video-btn');
  var $popup = $('.js-youtube-popup-container');
  var $youtube = $popup.find('.js-youtube-embed');

  var $close = $popup.find('.js-popup-btn');
  $btns.each(function () {
    var self = $(this);
    var embed = self.attr('data-embed');

    self.on('click', function (e) {
      e.preventDefault();
      $youtube.attr('data-embed', embed);
      (0, _youtube.loadYoutube)($youtube);
      $popup.addClass('active');
    });
  });

  var play = '<div class="popup-youtube__play"></div>';
  $close.on('click', function () {
    $popup.removeClass('active');
    $youtube.empty();
    $youtube.append(play);
  });
};

},{"./youtube":7}],4:[function(require,module,exports){
"use strict";

var _select = require("./select");

var _select2 = _interopRequireDefault(_select);

var _swipers = require("./swipers");

var _filter = require("./filter");

var _initYoutube = require("./initYoutube");

var _animation = require("./animation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _select2.default)();

(0, _swipers.initSwipers)();
(0, _swipers.initGallery)();

var colors = (0, _swipers.initColorSwiper)();

$('.js-color-btn').on('click', function () {
  var index = $(this).attr('data-swiper-slide-index');
  colors.slideTo(index);
});

(0, _filter.showSelection)('.js-filter-btn', '.js-filter-block', '.js-filter-container');
(0, _filter.showSelection)('.js-color-btn', '.js-color-block', '.js-color-container');
(0, _filter.showSelection)('.js-toggle-btn', '.js-toggle-block', '.js-toggle-container');

(0, _initYoutube.initYoutube)();

(0, _animation.makeAnim)(animClasses);

// ! edition compare

function editionCompareActions() {

  var $cells = $('.edCompare-cell');
  if (!$cells.length) {
    return false;
  }

  $cells.on('mouseenter', function () {
    var clsnm = $(this).attr('class').split(' ').join('.');
    if (clsnm.indexOf('td1') == -1) $('.' + clsnm).addClass('hoverred');
  }).on('mouseleave', function () {
    var clsnm = $(this).attr('class').split(' ').join('.');
    $('.' + clsnm).removeClass('hoverred');
  });

  var $button = $('#edition-compare-button');

  $button.on('click', function (e) {
    e.preventDefault();
    $('.edCompare').toggleClass('active');

    if (!$('.edCompare').hasClass('active') && $('.prodEditions').length) {
      $('html, body').animate({ scrollTop: $('.prodEditions').offset().top }, 400);
      $button.html('Сравнение редакций');

      if (sticky3) {
        sticky3.update();
        $('.edCompare-header.sticky-fxd, .edCompare-header.sticky-abs').removeClass('active');
      }
    } else {
      $button.html('Свернуть сравнение');

      setTimeout(function () {
        if (sticky3) {
          sticky3.update();
          $('.edCompare-header.sticky-fxd, .edCompare-header.sticky-abs').addClass('active');
        }
      }, 400);
    }
  });
};

editionCompareActions();

// ! main menu open

function mainmenu() {

  var $m = $('.mainmenu'),
      $i = $('.menu-icon'),
      $s = $('.search-icon'),
      at = 'data-list',
      timer = 150,
      clicked = false;

  if (!$m.length) {
    return false;
  }

  $m.find('.mainmenu-link').on('mouseenter', function () {
    if ($i.is(':visible')) return;
    var l = $(this).attr(at);
    $('.sublist').slideUp(timer);
    $('.hvrd').removeClass('hvrd');
    if (l) {
      $('.sublist[' + at + '="' + l + '"]').stop().slideDown(timer);
      $(this).addClass('hvrd');
    }
  });

  $m.find('.mainmenu-link').on('click', function (e) {
    if ($i.is(':visible') && $s.is(':hidden')) {
      var l = $(this).attr(at);
      $('.sublist').removeClass('active');
      $('.taped').removeClass('taped');
      if (l) {
        e.preventDefault();
        $('.sublist[' + at + '="' + l + '"]').addClass('active');
        $(this).addClass('taped');
      }
    }
  });

  $('.header').on('mouseleave', function () {
    if ($i.is(':visible')) return;
    $('.sublist').slideUp(timer);
    $('.hvrd').removeClass('hvrd');
  });
};

mainmenu();

// ! mobile menu

function mobileMenu() {

  var $ic = $('.menu-icon');
  if (!$ic.length) {
    return false;
  }

  var $m = $('.mainmenu');

  $ic.on('click', function (e) {
    e.preventDefault();
    if ($(this).hasClass('active')) {
      $m.removeClass('shown');
      $('.sublist.active').removeClass('active');
      //$('.taped').removeClass('taped');
    } else {
      $('.taped').click();
      $m.addClass('shown');
    }
    $(this).toggleClass('active');
  });
};

mobileMenu();

},{"./animation":1,"./filter":2,"./initYoutube":3,"./select":5,"./swipers":6}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var initSelect = function initSelect() {
  var selector = '.js-themes-select';
  var $selects = $(selector);
  if (!$selects.length) return false;

  $selects.selectric();
};

exports.default = initSelect;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var initGallery = exports.initGallery = function initGallery() {
  $('.js-slider-block').each(function () {
    var id = $(this).attr('id');
    var galleryThumbs = new Swiper('#' + id + ' .js-previews-thumbs .swiper-container', {
      spaceBetween: 6,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      slidesOffsetBefore: 6,
      slidesOffsetAfter: 6,
      observer: true,
      observeParents: true
    });
    var galleryImages = new Swiper('#' + id + ' .js-previews-images .swiper-container', {
      navigation: {
        nextEl: '#' + id + ' .js-previews-images .swiper-button-next',
        prevEl: '#' + id + ' .js-previews-images .swiper-button-prev'
      },
      thumbs: {
        swiper: galleryThumbs
      },
      observer: true,
      observeParents: true
    });
  });
};

var initColorSwiper = exports.initColorSwiper = function initColorSwiper() {
  var $colorBlocks = $('.js-color-block');
  var $colorContainer = $('.js-color-container');

  var colors = new Swiper('.js-theme-colors .swiper-container', {
    loop: true,
    slidesPerView: 'auto',
    navigation: {
      nextEl: '.js-theme-colors .swiper-button-next',
      prevEl: '.js-theme-colors .swiper-button-prev'
    },
    preventClicks: false,
    on: {
      transitionStart: function transitionStart() {
        var href = $('.js-color-btn.swiper-slide-active').attr('href');
        if (!href) href = $('.js-color-btn').first().attr('href');
        var $block = $colorContainer.find(href);
        $colorBlocks.removeClass('active');
        $block.addClass('active');
      }
    }

  });

  return colors;
};

var initSwipers = exports.initSwipers = function initSwipers() {
  var examplesSwiper = new Swiper('.js-theme-examples .swiper-container', {
    spaceBetween: 10,
    navigation: {
      nextEl: '.js-theme-examples .swiper-button-next'
    },
    scrollbar: {
      el: '.js-theme-examples .swiper-scrollbar',
      hide: false,
      draggable: true
    },
    loop: false,
    slidesPerView: 'auto',
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    observer: true,
    observeParents: true
  });

  var notebookSwiper = new Swiper('.js-notebook-slider .swiper-container', {
    spaceBetween: 10,
    navigation: {
      nextEl: '.js-notebook-slider .swiper-button-next',
      prevEl: '.js-notebook-slider .swiper-button-prev'
    },
    loop: true,
    slidesPerView: 1,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    observer: true,
    observeParents: true
  });

  $('.js-filter-block').each(function () {
    var id = $(this).attr('id');
    var phoneSlider = new Swiper('#' + id + ' .js-phone-slider .swiper-container', {
      autoplay: {
        delay: 3000
      },
      slidesPerView: 1,
      loop: true,
      observer: true,
      observeParents: true
    });
  });
};

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
		value: true
});
var loadYoutube = exports.loadYoutube = function loadYoutube(block) {
		var youtube = $(block);

		for (var i = 0; i < youtube.length; i++) {

				var source = "https://img.youtube.com/vi/" + youtube.attr('data-embed') + "/hq720.jpg";

				var bg = $(youtube[i]).append("<div class='youtube-bg' style='background-image:url(" + source + ")'></div>");

				youtube[i].addEventListener("click", function () {

						var iframe = document.createElement("iframe");

						iframe.setAttribute("frameborder", "0");
						iframe.setAttribute("allowfullscreen", "");
						iframe.setAttribute("width", "936");
						iframe.setAttribute("height", "465");
						iframe.setAttribute("src", "https://www.youtube.com/embed/" + youtube.attr('data-embed') + "?rel=0&amp;showinfo=0&amp;autoplay=1");

						this.innerHTML = "";
						this.appendChild(iframe);
				});
		};
};

},{}]},{},[4]);
