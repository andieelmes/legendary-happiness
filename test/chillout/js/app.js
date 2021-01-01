(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _formValidate = require('./formValidate.js');

var _formValidate2 = _interopRequireDefault(_formValidate);

var _initScroller = require('./initScroller.js');

var _initScroller2 = _interopRequireDefault(_initScroller);

var _timeRange = require('./timeRange');

var _timeRange2 = _interopRequireDefault(_timeRange);

var _mansoryCustom = require('./mansoryCustom');

var _mansoryCustom2 = _interopRequireDefault(_mansoryCustom);

var _stickyForm = require('./stickyForm');

var _stickyForm2 = _interopRequireDefault(_stickyForm);

var _loadData = require('./loadData');

var _loadData2 = _interopRequireDefault(_loadData);

var _detectMobileBrowser = require('./detectMobileBrowser');

var _detectMobileBrowser2 = _interopRequireDefault(_detectMobileBrowser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
	(0, _formValidate2.default)();
	(0, _initScroller2.default)();
	(0, _timeRange2.default)();
	(0, _mansoryCustom2.default)();
	(0, _stickyForm2.default)();
	(0, _loadData2.default)();
	(0, _detectMobileBrowser2.default)();
})();

},{"./detectMobileBrowser":2,"./formValidate.js":3,"./initScroller.js":4,"./loadData":5,"./mansoryCustom":6,"./stickyForm":7,"./timeRange":8}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var detectMobileBrowser = function detectMobileBrowser() {
    (function (a) {
        (jQuery.browser = jQuery.browser || {}).mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4));
    })(navigator.userAgent || navigator.vendor || window.opera);
    if (jQuery.browser.mobile) {
        $('html').addClass('is-mobile');
    }
};
exports.default = detectMobileBrowser;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var initFormValidation = function initFormValidation() {

	var valid = void 0;
	var formIsValid = void 0;

	var $form = $('.js-form'),
	    $inpReq = $('.js-input-tel'),
	    $inpName = $('.js-input-name'),
	    $inpText = $('.js-input-text'),
	    $inpSubj = $('.js-input-subj'),
	    $submitBtn = $('.js-submit'),
	    patternTel = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/i,
	    patternEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,7}$/,
	    btnSuccessClsnm = "is-success",
	    formInvalidClsnm = "is-invalid";

	$inpReq.on('keyup change', function () {
		var $this = $(this);
		var $thisVal = $this.val();
		var pattern = $thisVal.indexOf('@') !== -1 ? patternEmail : patternTel;

		valid = pattern.test($thisVal);
		formIsValid = valid;
	});

	function formAnimateShake() {
		$form.addClass(formInvalidClsnm);
		setTimeout(function () {
			$form.removeClass(formInvalidClsnm);
		}, 2000);
	}

	function onFormSubmit(e) {
		e.preventDefault();

		var data = { 'name': $inpName.val(),
			'contact': $inpReq.val(),
			'message': $inpText.val() || null,
			'subj': $inpSubj.val()
		};

		var adress = 'mail.php';
		var gglScript = 'https://script.google.com/macros/s/AKfycbzFrKRXO7EXodYPwzOL8I2AD6RbIdvetuPrsAgvtR5pkJQqrnM/exec';
		var response = {};

		if (formIsValid) {
			$.ajax({
				url: gglScript,
				type: 'post',
				data: data,
				success: function success(response, textStatus, jqXHR) {
					$('.send-success').show();
					$('.bid-form').hide();
					$submitBtn.html('Ждите звонка').addClass(btnSuccessClsnm);
					$inpText.val('');
					$inpName.val('');
					$inpReq.val('');
				},

				error: function error(jqXHR, textStatus, errorThrown) {
					formAnimateShake();
				}
			});
		} else {
			formAnimateShake();
		}
	}

	$submitBtn.on('click', function (e) {
		onFormSubmit(e);

		console.log($inpText.val());
		console.log($inpName.val());
		console.log($inpSubj.val());
	});

	$form.on('submit', function (e) {
		onFormSubmit(e);

		console.log($inpText.val());
		console.log($inpName.val());
		console.log($inpSubj.val());
	});
};

exports.default = initFormValidation;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var initScroller = function initScroller() {
	if (!$('.scrlr').length) return false;

	$('.scrlr').scroller({
		'noscrollbar': true,
		'noanchors': true,
		'leftIfWide': true
	});

	setTimeout(function () {
		$(window).trigger('resize');
	}, 500);
};

exports.default = initScroller;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var loadData = function loadData() {

  var booksURL = 'https://docs.google.com/spreadsheets/d/1N1ay87RSHSvrDwM0fCWjVZVrc8eZ8_QYW6W2AqBB8ZQ/pubhtml';
  var gamesURL = 'https://docs.google.com/spreadsheets/d/1yEz_0wdOfbBQjdBrE6OBFmObXrFEbcQVsvPxlPW9wz4/pubhtml';

  function init() {
    if ($(".section-books")) Tabletop.init({ key: booksURL, callback: showInfoBooks, simpleSheet: true });
    if ($(".section-games")) Tabletop.init({ key: gamesURL, callback: showInfoGames, simpleSheet: true });
  }

  function showInfoBooks(data, tabletop) {
    var template = '';
    var isMobile = $('html').hasClass('is-mobile');

    for (var i = 0; i < data.length; i++) {
      var row = data[i];
      var clsnm = '';
      if (row['Кто взял'] !== '') clsnm = 'is-taken';

      var tpl = '<li class="section-item books">' + '<span class="books-title ' + clsnm + '">' + row['Наименование'] + '</span>' + '<span class="books-author ' + clsnm + '">' + row['Автор'] + '</span>' + '</li>';
      if (isMobile) {
        tpl = '<li class="section-item books">' + '<span class="books-author ' + clsnm + '">' + row['Автор'] + '</span>' + '<span class="books-title ' + clsnm + '">' + row['Наименование'] + '</span>' + '</li>';
      }

      template += tpl;
    }

    $(".section-books").append(template);
  }
  function showInfoGames(data, tabletop) {
    var template = '';
    var gamesForTwo = [];
    var gamesForGroup = [];
    var defaultGames = [];
    var munchkinGames = [];
    var nerdGames = [];

    for (var i = 0; i < data.length; i++) {
      var row = data[i];
      switch (row['Количество игроков']) {
        case '2':
          data[i]['category'] = '2';
          gamesForTwo.push(row);
          break;
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
          data[i]['category'] = 'many';
          gamesForGroup.push(row);
          break;
        case 'м':
          data[i]['category'] = 'm';
          munchkinGames.push(row);
          break;
        case 'з':
          data[i]['category'] = 'n';
          nerdGames.push(row);
          break;
        default:
          data[i]['category'] = 'default';
          defaultGames.push(row);
      }
    }
    var allGames = gamesForTwo.concat(gamesForGroup, munchkinGames, nerdGames, defaultGames);
    for (var i = 0; i < allGames.length; i++) {
      var row = allGames[i];
      var numberOfPeople = '';
      var prev = i > 0 ? i - 1 : 0;
      var next = i < allGames.length - 1 ? i + 1 : i;
      switch (row['category']) {
        case '2':
          numberOfPeople = 'На двоих';
          break;
        case 'many':
          numberOfPeople = 'На компанию';
          break;
        case 'm':
          numberOfPeople = 'Манчкины';
          break;
        case 'n':
          numberOfPeople = 'На любителя';
          break;
        case 'default':
          numberOfPeople = 'Другие игры';
          break;
        default:
          numberOfPeople = 'Другие игры';
      }
      if (allGames[i]['category'] != allGames[prev]['category'] || i == 0) {
        var tpl = '<div class="games-type"><div class="games-category">' + numberOfPeople + '</div><li class="section-item games">' + '<span class="games-title ">' + row['Название настолки'] + '</span>' + '</li>';
      } else if (allGames[i]['category'] != allGames[next]['category'] || i == allGames.length - 1) {
        var tpl = '<li class="section-item games">' + '<span class="games-title ">' + row['Название настолки'] + '</span>' + '</li></div>';
      } else {
        var tpl = '<li class="section-item games">' + '<span class="games-title ">' + row['Название настолки'] + '</span>' + '</li>';
      }

      template += tpl;
    }
    $(".section-games").append(template);
  }

  init();
};

exports.default = loadData;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var initMansoryCustom = function initMansoryCustom() {
	if (!$('.box-for-coworkers').length) return false;

	$('.box-for-coworkers').masonry({
		itemSelector: '.grid-item',
		columnWidth: '.grid-sizer',
		percentPosition: true
	});
};

exports.default = initMansoryCustom;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var initStickyForm1 = function initStickyForm1() {
  // 	const $sform = $('.header-form');
  // 	const $sectQA = $('.qa-sect')
  // 	const sformHeight = $('.sf-form').outerHeight();
  // 	const $sfhead = $('.sf-headerJs');
  //
  //
  // 	let trnslY = getWinHeight() / 2 - sformHeight / 2;
  // 	let ururu = getWinHeight() - 90;
  //
  // 	function getWinHeight() {
  // 		let	wh = $(window).height();
  // 		return wh;
  // 	}
  //
  // 		function getOffsetTop(elem) {
  // 		return elem.offset().top;
  // 	}
  //
  // 	function setFormOffset(offset) {
  // 		$sform.css({
  // 			transform: 'translateY(' + offset +'px)'
  // 		});
  // 	}
  //
  // 	getWinHeight();
  // 	setFormOffset(trnslY);
  //
  //
  // 	$sfhead.on('click', function () {
  // 		let formScrOffsetTop = $sform.position().top;
  //
  // 		formScrOffsetTop == ururu ? setFormOffset(trnslY) : setFormOffset(ururu);
  // 	});
  //
  // $(document).on('scroll', function () {
  // 	ururu = getWinHeight() - 90;
  // 	setFormOffset(ururu);
  //
  // 	let winScrTop = $(window).scrollTop();
  // 	let offsetQA = getOffsetTop($sectQA);
  // 	let offsetForm = getOffsetTop($sform);
  //
  // 	$sform.addClass('fixed');
  //
  // 	if (sformHeight + offsetQA + 0<= winScrTop) {
  // 		setFormOffset(ururu);
  // 	} else if ((offsetQA - 150) <= offsetForm) {
  // 		setFormOffset(getWinHeight());
  // 	}
  //
  // });
  //
  // 	$sfhead.on('click', function () {
  // 		$sform.toggleClass('setFullForm');
  // 	});
  //
  // 	$setFixPos.css({
  // 		'transform': 'translateY(' + getWinHeight() + ')'
  // 	});
  //
  //
  // 	function getOffsetTop(elem) {
  // 		return elem.offset().top;
  // 	}
  //
  // 	function setFixedPos() {
  // 		if ($(window).scrollTop())  {
  // 			$sform.removeClass('setHidePos');
  // 			$sform.addClass('setFixedPos');
  // 		}
  // 	}
  //
  // 	function setHidePos() {
  // 		if ($(window).scrollTop())  {
  // 			$sform.removeClass('setFixedPos');
  // 			$sform.addClass('setHidePos');
  // 		}
  // 	}
  //
  // 	$(window).on('scroll', function() {
  // 		setFixedPos();
  // 		let offsetQA = getOffsetTop($sectQA);
  // 		let offsetForm = getOffsetTop($sform);
  // 		console.log(`form: ${offsetForm} QA: ${offsetQA} WinHeight: ${getWinHeight()}`)
  //
  // 		if (sformHeight + offsetQA <= $(window).scrollTop()) {
  // 			setFixedPos()
  //
  // 		} else if ((offsetQA - 90) <= offsetForm) {
  // 			setHidePos()
  // 		}
  // 	})
};
exports.default = initStickyForm1;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var initTimeRange = function initTimeRange() {

	function getTimeRange() {
		var hours = new Date().getHours();
		var mins = new Date().getMinutes();

		//Переводим время в минуты
		var totalMins = hours * 60 + mins;

		// 11 утра
		var minTime = 659;

		// 11 вечера
		var maxTime = 1380;

		//Получение одного процента времени
		var oneProcent = (maxTime - minTime) / 100;

		//Получение текущего времени в процентах
		var interest = (totalMins - minTime) / oneProcent;

		var $rangeMarker = $('.time-slider');

		if (totalMins < maxTime && totalMins > minTime) {

			$rangeMarker.css({
				'opacity': '1',
				'left': interest + '%'
			});
		} else {
			$rangeMarker.css({
				'left': '0%',
				'opacity': '0'
			});
		}
	}

	getTimeRange();

	setInterval(getTimeRange, 600000);
};

exports.default = initTimeRange;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvanMvYXBwLmpzIiwiZGV2L2pzL2RldGVjdE1vYmlsZUJyb3dzZXIuanMiLCJkZXYvanMvZm9ybVZhbGlkYXRlLmpzIiwiZGV2L2pzL2luaXRTY3JvbGxlci5qcyIsImRldi9qcy9sb2FkRGF0YS5qcyIsImRldi9qcy9tYW5zb3J5Q3VzdG9tLmpzIiwiZGV2L2pzL3N0aWNreUZvcm0uanMiLCJkZXYvanMvdGltZVJhbmdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBSUEsQ0FBQyxZQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxDQVREOzs7Ozs7OztBQ1ZBLElBQU0sc0JBQXNCLFNBQXRCLG1CQUFzQixHQUFXO0FBQ25DLEtBQUMsVUFBUyxDQUFULEVBQVc7QUFBQyxTQUFDLE9BQU8sT0FBUCxHQUFlLE9BQU8sT0FBUCxJQUFnQixFQUFoQyxFQUFvQyxNQUFwQyxHQUEyQywyVEFBMlQsSUFBM1QsQ0FBZ1UsQ0FBaFUsS0FBb1UsMGtEQUEwa0QsSUFBMWtELENBQStrRCxFQUFFLE1BQUYsQ0FBUyxDQUFULEVBQVcsQ0FBWCxDQUEva0QsQ0FBL1c7QUFBNjhELEtBQTE5RCxFQUE0OUQsVUFBVSxTQUFWLElBQXFCLFVBQVUsTUFBL0IsSUFBdUMsT0FBTyxLQUExZ0U7QUFDQSxRQUFJLE9BQU8sT0FBUCxDQUFlLE1BQW5CLEVBQTJCO0FBQ3pCLFVBQUUsTUFBRixFQUFVLFFBQVYsQ0FBbUIsV0FBbkI7QUFDRDtBQUNKLENBTEQ7a0JBTWUsbUI7Ozs7Ozs7O0FDTmYsSUFBTSxxQkFBcUIsU0FBckIsa0JBQXFCLEdBQVc7O0FBRXJDLEtBQUksY0FBSjtBQUNBLEtBQUksb0JBQUo7O0FBRUEsS0FBTSxRQUFRLEVBQUUsVUFBRixD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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0MsQ0E3RkQ7a0JBOEZlLGU7Ozs7Ozs7O0FDOUZmLElBQU0sZ0JBQWdCLFNBQWhCLGFBQWdCLEdBQVk7O0FBRWpDLFVBQVMsWUFBVCxHQUF5QjtBQUN4QixNQUFJLFFBQVEsSUFBSSxJQUFKLEdBQVcsUUFBWCxFQUFaO0FBQ0EsTUFBSSxPQUFPLElBQUksSUFBSixHQUFXLFVBQVgsRUFBWDs7QUFFQTtBQUNBLE1BQUksWUFBWSxRQUFRLEVBQVIsR0FBYSxJQUE3Qjs7QUFFQTtBQUNBLE1BQU0sVUFBVSxHQUFoQjs7QUFFQTtBQUNBLE1BQU0sVUFBVSxJQUFoQjs7QUFFQTtBQUNBLE1BQUksYUFBYSxDQUFDLFVBQVUsT0FBWCxJQUFzQixHQUF2Qzs7QUFFQTtBQUNBLE1BQUksV0FBWSxDQUFDLFlBQVksT0FBYixJQUF3QixVQUF4Qzs7QUFFQSxNQUFJLGVBQWUsRUFBRSxjQUFGLENBQW5COztBQUVBLE1BQUksWUFBWSxPQUFaLElBQXVCLFlBQVksT0FBdkMsRUFBZ0Q7O0FBRS9DLGdCQUFhLEdBQWIsQ0FBaUI7QUFDaEIsZUFBVyxHQURLO0FBRWhCLFlBQVEsV0FBVztBQUZILElBQWpCO0FBS0EsR0FQRCxNQU9PO0FBQ04sZ0JBQWEsR0FBYixDQUFpQjtBQUNoQixZQUFRLElBRFE7QUFFaEIsZUFBVztBQUZLLElBQWpCO0FBS0E7QUFDRDs7QUFFRDs7QUFFQSxhQUFZLFlBQVosRUFBMEIsTUFBMUI7QUFFQSxDQTNDRDs7a0JBNkNlLGEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IGluaXRGb3JtVmFsaWRhdGlvbiBmcm9tICcuL2Zvcm1WYWxpZGF0ZS5qcyc7XG5pbXBvcnQgaW5pdFNjcm9sbGVyIGZyb20gJy4vaW5pdFNjcm9sbGVyLmpzJztcbmltcG9ydCBpbml0VGltZVJhbmdlIGZyb20gJy4vdGltZVJhbmdlJ1xuaW1wb3J0IGluaXRNYW5zb3J5Q3VzdG9tIGZyb20gJy4vbWFuc29yeUN1c3RvbSdcbmltcG9ydCBpbml0U3RpY2t5Rm9ybSBmcm9tICcuL3N0aWNreUZvcm0nXG5pbXBvcnQgbG9hZERhdGEgZnJvbSAnLi9sb2FkRGF0YSdcbmltcG9ydCBkZXRlY3RNb2JpbGVCcm93c2VyIGZyb20gJy4vZGV0ZWN0TW9iaWxlQnJvd3NlcidcblxuXG5cbihmdW5jdGlvbigpIHtcblx0aW5pdEZvcm1WYWxpZGF0aW9uKCk7XG5cdGluaXRTY3JvbGxlcigpO1xuXHRpbml0VGltZVJhbmdlKCk7XG5cdGluaXRNYW5zb3J5Q3VzdG9tKCk7XG5cdGluaXRTdGlja3lGb3JtKCk7XG5cdGxvYWREYXRhKCk7XG5cdGRldGVjdE1vYmlsZUJyb3dzZXIoKTtcblxufSkoKTtcbiIsImNvbnN0IGRldGVjdE1vYmlsZUJyb3dzZXIgPSBmdW5jdGlvbigpIHtcbiAgICAoZnVuY3Rpb24oYSl7KGpRdWVyeS5icm93c2VyPWpRdWVyeS5icm93c2VyfHx7fSkubW9iaWxlPS8oYW5kcm9pZHxiYlxcZCt8bWVlZ28pLittb2JpbGV8YXZhbnRnb3xiYWRhXFwvfGJsYWNrYmVycnl8YmxhemVyfGNvbXBhbHxlbGFpbmV8ZmVubmVjfGhpcHRvcHxpZW1vYmlsZXxpcChob25lfG9kKXxpcmlzfGtpbmRsZXxsZ2UgfG1hZW1vfG1pZHB8bW1wfG1vYmlsZS4rZmlyZWZveHxuZXRmcm9udHxvcGVyYSBtKG9ifGluKWl8cGFsbSggb3MpP3xwaG9uZXxwKGl4aXxyZSlcXC98cGx1Y2tlcnxwb2NrZXR8cHNwfHNlcmllcyg0fDYpMHxzeW1iaWFufHRyZW98dXBcXC4oYnJvd3NlcnxsaW5rKXx2b2RhZm9uZXx3YXB8d2luZG93cyBjZXx4ZGF8eGlpbm8vaS50ZXN0KGEpfHwvMTIwN3w2MzEwfDY1OTB8M2dzb3w0dGhwfDUwWzEtNl1pfDc3MHN8ODAyc3xhIHdhfGFiYWN8YWMoZXJ8b298c1xcLSl8YWkoa298cm4pfGFsKGF2fGNhfGNvKXxhbW9pfGFuKGV4fG55fHl3KXxhcHR1fGFyKGNofGdvKXxhcyh0ZXx1cyl8YXR0d3xhdShkaXxcXC1tfHIgfHMgKXxhdmFufGJlKGNrfGxsfG5xKXxiaShsYnxyZCl8YmwoYWN8YXopfGJyKGV8dil3fGJ1bWJ8YndcXC0obnx1KXxjNTVcXC98Y2FwaXxjY3dhfGNkbVxcLXxjZWxsfGNodG18Y2xkY3xjbWRcXC18Y28obXB8bmQpfGNyYXd8ZGEoaXR8bGx8bmcpfGRidGV8ZGNcXC1zfGRldml8ZGljYXxkbW9ifGRvKGN8cClvfGRzKDEyfFxcLWQpfGVsKDQ5fGFpKXxlbShsMnx1bCl8ZXIoaWN8azApfGVzbDh8ZXooWzQtN10wfG9zfHdhfHplKXxmZXRjfGZseShcXC18Xyl8ZzEgdXxnNTYwfGdlbmV8Z2ZcXC01fGdcXC1tb3xnbyhcXC53fG9kKXxncihhZHx1bil8aGFpZXxoY2l0fGhkXFwtKG18cHx0KXxoZWlcXC18aGkocHR8dGEpfGhwKCBpfGlwKXxoc1xcLWN8aHQoYyhcXC18IHxffGF8Z3xwfHN8dCl8dHApfGh1KGF3fHRjKXxpXFwtKDIwfGdvfG1hKXxpMjMwfGlhYyggfFxcLXxcXC8pfGlicm98aWRlYXxpZzAxfGlrb218aW0xa3xpbm5vfGlwYXF8aXJpc3xqYSh0fHYpYXxqYnJvfGplbXV8amlnc3xrZGRpfGtlaml8a2d0KCB8XFwvKXxrbG9ufGtwdCB8a3djXFwtfGt5byhjfGspfGxlKG5vfHhpKXxsZyggZ3xcXC8oa3xsfHUpfDUwfDU0fFxcLVthLXddKXxsaWJ3fGx5bnh8bTFcXC13fG0zZ2F8bTUwXFwvfG1hKHRlfHVpfHhvKXxtYygwMXwyMXxjYSl8bVxcLWNyfG1lKHJjfHJpKXxtaShvOHxvYXx0cyl8bW1lZnxtbygwMXwwMnxiaXxkZXxkb3x0KFxcLXwgfG98dil8enopfG10KDUwfHAxfHYgKXxtd2JwfG15d2F8bjEwWzAtMl18bjIwWzItM118bjMwKDB8Mil8bjUwKDB8Mnw1KXxuNygwKDB8MSl8MTApfG5lKChjfG0pXFwtfG9ufHRmfHdmfHdnfHd0KXxub2soNnxpKXxuenBofG8yaW18b3AodGl8d3YpfG9yYW58b3dnMXxwODAwfHBhbihhfGR8dCl8cGR4Z3xwZygxM3xcXC0oWzEtOF18YykpfHBoaWx8cGlyZXxwbChheXx1Yyl8cG5cXC0yfHBvKGNrfHJ0fHNlKXxwcm94fHBzaW98cHRcXC1nfHFhXFwtYXxxYygwN3wxMnwyMXwzMnw2MHxcXC1bMi03XXxpXFwtKXxxdGVrfHIzODB8cjYwMHxyYWtzfHJpbTl8cm8odmV8em8pfHM1NVxcL3xzYShnZXxtYXxtbXxtc3xueXx2YSl8c2MoMDF8aFxcLXxvb3xwXFwtKXxzZGtcXC98c2UoYyhcXC18MHwxKXw0N3xtY3xuZHxyaSl8c2doXFwtfHNoYXJ8c2llKFxcLXxtKXxza1xcLTB8c2woNDV8aWQpfHNtKGFsfGFyfGIzfGl0fHQ1KXxzbyhmdHxueSl8c3AoMDF8aFxcLXx2XFwtfHYgKXxzeSgwMXxtYil8dDIoMTh8NTApfHQ2KDAwfDEwfDE4KXx0YShndHxsayl8dGNsXFwtfHRkZ1xcLXx0ZWwoaXxtKXx0aW1cXC18dFxcLW1vfHRvKHBsfHNoKXx0cyg3MHxtXFwtfG0zfG01KXx0eFxcLTl8dXAoXFwuYnxnMXxzaSl8dXRzdHx2NDAwfHY3NTB8dmVyaXx2aShyZ3x0ZSl8dmsoNDB8NVswLTNdfFxcLXYpfHZtNDB8dm9kYXx2dWxjfHZ4KDUyfDUzfDYwfDYxfDcwfDgwfDgxfDgzfDg1fDk4KXx3M2MoXFwtfCApfHdlYmN8d2hpdHx3aShnIHxuY3xudyl8d21sYnx3b251fHg3MDB8eWFzXFwtfHlvdXJ8emV0b3x6dGVcXC0vaS50ZXN0KGEuc3Vic3RyKDAsNCkpfSkobmF2aWdhdG9yLnVzZXJBZ2VudHx8bmF2aWdhdG9yLnZlbmRvcnx8d2luZG93Lm9wZXJhKTtcbiAgICBpZiAoalF1ZXJ5LmJyb3dzZXIubW9iaWxlKSB7XG4gICAgICAkKCdodG1sJykuYWRkQ2xhc3MoJ2lzLW1vYmlsZScpXG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgZGV0ZWN0TW9iaWxlQnJvd3NlclxuIiwiY29uc3QgaW5pdEZvcm1WYWxpZGF0aW9uID0gZnVuY3Rpb24oKSB7XG5cblx0bGV0IHZhbGlkO1xuXHRsZXQgZm9ybUlzVmFsaWQ7XG5cblx0Y29uc3QgJGZvcm0gPSAkKCcuanMtZm9ybScpLFxuXHRcdCRpbnBSZXEgPSAkKCcuanMtaW5wdXQtdGVsJyksXG5cdFx0JGlucE5hbWUgPSAkKCcuanMtaW5wdXQtbmFtZScpLFxuXHRcdCRpbnBUZXh0ID0gJCgnLmpzLWlucHV0LXRleHQnKSxcblx0XHQkaW5wU3ViaiA9ICQoJy5qcy1pbnB1dC1zdWJqJyksXG5cdFx0JHN1Ym1pdEJ0biA9ICQoJy5qcy1zdWJtaXQnKSxcblx0XHRwYXR0ZXJuVGVsID0gIC9eKCg4fFxcKzcpW1xcLSBdPyk/KFxcKD9cXGR7M31cXCk/W1xcLSBdPyk/W1xcZFxcLSBdezcsMTB9JC9pLFxuXHRcdHBhdHRlcm5FbWFpbCA9IC9eW2EtejAtOS5fJSstXStAW2EtejAtOS4tXStcXC5bYS16XXsyLDd9JC8sXG5cdFx0YnRuU3VjY2Vzc0Nsc25tID0gXCJpcy1zdWNjZXNzXCIsXG5cdFx0Zm9ybUludmFsaWRDbHNubSA9IFwiaXMtaW52YWxpZFwiO1xuXG5cdCRpbnBSZXEub24oJ2tleXVwIGNoYW5nZScsIGZ1bmN0aW9uKCkge1xuXHRcdGNvbnN0ICR0aGlzID0gJCh0aGlzKTtcblx0XHRjb25zdCAkdGhpc1ZhbCA9ICR0aGlzLnZhbCgpO1xuXHRcdGxldCBwYXR0ZXJuID0gJHRoaXNWYWwuaW5kZXhPZignQCcpICE9PSAtMSA/ICBwYXR0ZXJuRW1haWwgOiBwYXR0ZXJuVGVsO1xuXG5cdFx0dmFsaWQgPSBwYXR0ZXJuLnRlc3QoJHRoaXNWYWwpO1xuXHRcdGZvcm1Jc1ZhbGlkID0gdmFsaWQ7XG5cdH0pO1xuXG5cdGZ1bmN0aW9uIGZvcm1BbmltYXRlU2hha2UoKSB7XG5cdFx0JGZvcm0uYWRkQ2xhc3MoZm9ybUludmFsaWRDbHNubSk7XG5cdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHQkZm9ybS5yZW1vdmVDbGFzcyhmb3JtSW52YWxpZENsc25tKVxuXHRcdH0sIDIwMDApXG5cblx0fVxuXG5cdGZ1bmN0aW9uIG9uRm9ybVN1Ym1pdChlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0Y29uc3QgZGF0YSAgPVxuXHRcdFx0eyAnbmFtZSc6ICRpbnBOYW1lLnZhbCgpLFxuXHRcdFx0XHQnY29udGFjdCcgOiRpbnBSZXEudmFsKCksXG5cdFx0XHRcdCdtZXNzYWdlJzogJGlucFRleHQudmFsKCkgfHwgbnVsbCxcblx0XHRcdFx0J3N1YmonOiAkaW5wU3Viai52YWwoKSxcblx0XHRcdH07XG5cblx0XHRjb25zdCBhZHJlc3MgPSAnbWFpbC5waHAnO1xuXHRcdGNvbnN0IGdnbFNjcmlwdCA9ICdodHRwczovL3NjcmlwdC5nb29nbGUuY29tL21hY3Jvcy9zL0FLZnljYnpGcktSWE83RVhvZFlQd3pPTDhJMkFENlJiSWR2ZXR1UHJzQWd2dFI1cGtKUXFybk0vZXhlYydcblx0XHRsZXQgcmVzcG9uc2UgPSB7fTtcblxuXHRcdGlmKGZvcm1Jc1ZhbGlkKSB7XG5cdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHR1cmw6IGdnbFNjcmlwdCxcblx0XHRcdFx0dHlwZTogJ3Bvc3QnLFxuXHRcdFx0XHRkYXRhOiBkYXRhLFxuXHRcdFx0XHRzdWNjZXNzOiAocmVzcG9uc2UsIHRleHRTdGF0dXMsIGpxWEhSKSA9PiB7XG5cdFx0XHRcdFx0JCgnLnNlbmQtc3VjY2VzcycpLnNob3coKTtcblx0XHRcdFx0XHQkKCcuYmlkLWZvcm0nKS5oaWRlKCk7XG5cdFx0XHRcdFx0JHN1Ym1pdEJ0bi5odG1sKCfQltC00LjRgtC1INC30LLQvtC90LrQsCcpLmFkZENsYXNzKGJ0blN1Y2Nlc3NDbHNubSk7XG5cdFx0XHRcdFx0JGlucFRleHQudmFsKCcnKTtcblx0XHRcdFx0XHQkaW5wTmFtZS52YWwoJycpO1xuXHRcdFx0XHRcdCRpbnBSZXEudmFsKCcnKTtcblxuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdGVycm9yOiAoanFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSA9PiB7XG5cdFx0XHRcdFx0Zm9ybUFuaW1hdGVTaGFrZSgpXG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRmb3JtQW5pbWF0ZVNoYWtlKClcblx0XHR9XG5cdH1cblxuXHQkc3VibWl0QnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblx0XHRvbkZvcm1TdWJtaXQoZSlcblxuXHRcdGNvbnNvbGUubG9nKCRpbnBUZXh0LnZhbCgpKTtcblx0XHRjb25zb2xlLmxvZygkaW5wTmFtZS52YWwoKSk7XG5cdFx0Y29uc29sZS5sb2coJGlucFN1YmoudmFsKCkpO1xuXHR9KTtcblxuXG5cdCRmb3JtLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XG5cdFx0b25Gb3JtU3VibWl0KGUpXG5cblx0XHRjb25zb2xlLmxvZygkaW5wVGV4dC52YWwoKSk7XG5cdFx0Y29uc29sZS5sb2coJGlucE5hbWUudmFsKCkpO1xuXHRcdGNvbnNvbGUubG9nKCRpbnBTdWJqLnZhbCgpKTtcblx0fSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBpbml0Rm9ybVZhbGlkYXRpb247XG4iLCJjb25zdCBpbml0U2Nyb2xsZXIgPSBmdW5jdGlvbigpIHtcblx0aWYgKCEkKCcuc2NybHInKS5sZW5ndGgpIHJldHVybiBmYWxzZVxuXHRcblx0JCgnLnNjcmxyJykuc2Nyb2xsZXIoe1xuXHRcdCdub3Njcm9sbGJhcic6IHRydWUsXG5cdFx0J25vYW5jaG9ycyc6IHRydWUsXG5cdFx0J2xlZnRJZldpZGUnOiB0cnVlXG5cdH0pO1xuXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0JCh3aW5kb3cpLnRyaWdnZXIoJ3Jlc2l6ZScpO1xuXHR9LCA1MDApXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXRTY3JvbGxlcjtcbiIsImNvbnN0IGxvYWREYXRhID0gZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgYm9va3NVUkwgPSAnaHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vc3ByZWFkc2hlZXRzL2QvMU4xYXk4N1JTSFN2ckR3TTBmQ1dqVlpWcmM4ZVo4X1FZVzZXMkFxQkI4WlEvcHViaHRtbCc7XG4gICAgdmFyIGdhbWVzVVJMID0gJ2h0dHBzOi8vZG9jcy5nb29nbGUuY29tL3NwcmVhZHNoZWV0cy9kLzF5RXpfMHdkT2ZiQlFqZEJyRTZPQkZtT2JYckZFYmNRVnN2UHhsUFc5d3o0L3B1Ymh0bWwnO1xuXG5cbiAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBpZiAoJChcIi5zZWN0aW9uLWJvb2tzXCIpKSBUYWJsZXRvcC5pbml0KHtrZXk6IGJvb2tzVVJMLCBjYWxsYmFjazogc2hvd0luZm9Cb29rcywgc2ltcGxlU2hlZXQ6IHRydWV9KVxuICAgICAgICBpZiAoJChcIi5zZWN0aW9uLWdhbWVzXCIpKSBUYWJsZXRvcC5pbml0KHtrZXk6IGdhbWVzVVJMLCBjYWxsYmFjazogc2hvd0luZm9HYW1lcywgc2ltcGxlU2hlZXQ6IHRydWV9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNob3dJbmZvQm9va3MoZGF0YSwgdGFibGV0b3ApIHtcbiAgICAgICAgdmFyIHRlbXBsYXRlID0gJydcbiAgICAgICAgdmFyIGlzTW9iaWxlID0gJCgnaHRtbCcpLmhhc0NsYXNzKCdpcy1tb2JpbGUnKVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHJvdyA9IGRhdGFbaV1cbiAgICAgICAgICAgIHZhciBjbHNubSA9ICcnXG4gICAgICAgICAgICBpZiAocm93WyfQmtGC0L4g0LLQt9GP0LsnXSAhPT0gJycpIGNsc25tID0gJ2lzLXRha2VuJ1xuXG5cbiAgICAgICAgICAgIHZhciB0cGwgPSAnPGxpIGNsYXNzPVwic2VjdGlvbi1pdGVtIGJvb2tzXCI+JyArXG4gICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImJvb2tzLXRpdGxlICcgKyBjbHNubSArICdcIj4nICsgcm93WyfQndCw0LjQvNC10L3QvtCy0LDQvdC40LUnXSArICc8L3NwYW4+JyArXG4gICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImJvb2tzLWF1dGhvciAnICsgY2xzbm0gKyAnXCI+JyArIHJvd1sn0JDQstGC0L7RgCddICsgJzwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgJzwvbGk+J1xuICAgICAgICAgICAgaWYgKGlzTW9iaWxlKSB7XG4gICAgICAgICAgICAgICAgdHBsID0gJzxsaSBjbGFzcz1cInNlY3Rpb24taXRlbSBib29rc1wiPicgK1xuICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImJvb2tzLWF1dGhvciAnICsgY2xzbm0gKyAnXCI+JyArIHJvd1sn0JDQstGC0L7RgCddICsgJzwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJib29rcy10aXRsZSAnICsgY2xzbm0gKyAnXCI+JyArIHJvd1sn0J3QsNC40LzQtdC90L7QstCw0L3QuNC1J10gKyAnPC9zcGFuPicgK1xuICAgICAgICAgICAgICAgICc8L2xpPidcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB0ZW1wbGF0ZSArPSB0cGxcbiAgICAgICAgfVxuXG4gICAgICAgICQoXCIuc2VjdGlvbi1ib29rc1wiKS5hcHBlbmQodGVtcGxhdGUpXG4gICAgfVxuICAgIGZ1bmN0aW9uIHNob3dJbmZvR2FtZXMoZGF0YSwgdGFibGV0b3ApIHtcbiAgICAgICAgdmFyIHRlbXBsYXRlID0gJydcbiAgICAgICAgdmFyIGdhbWVzRm9yVHdvID0gW11cbiAgICAgICAgdmFyIGdhbWVzRm9yR3JvdXAgPSBbXVxuICAgICAgICB2YXIgZGVmYXVsdEdhbWVzID0gW11cbiAgICAgICAgdmFyIG11bmNoa2luR2FtZXMgPSBbXVxuICAgICAgICB2YXIgbmVyZEdhbWVzID0gW11cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciByb3cgPSBkYXRhW2ldXG4gICAgICAgICAgICBzd2l0Y2ggKHJvd1sn0JrQvtC70LjRh9C10YHRgtCy0L4g0LjQs9GA0L7QutC+0LInXSkge1xuICAgICAgICAgICAgICBjYXNlICcyJzpcbiAgICAgICAgICAgICAgICBkYXRhW2ldWydjYXRlZ29yeSddID0gJzInO1xuICAgICAgICAgICAgICAgIGdhbWVzRm9yVHdvLnB1c2gocm93KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICczJzpcbiAgICAgICAgICAgICAgY2FzZSAnNCc6XG4gICAgICAgICAgICAgIGNhc2UgJzUnOlxuICAgICAgICAgICAgICBjYXNlICc2JzpcbiAgICAgICAgICAgICAgY2FzZSAnNyc6XG4gICAgICAgICAgICAgICAgZGF0YVtpXVsnY2F0ZWdvcnknXSA9ICdtYW55JztcbiAgICAgICAgICAgICAgICBnYW1lc0Zvckdyb3VwLnB1c2gocm93KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICfQvCc6XG4gICAgICAgICAgICAgICAgZGF0YVtpXVsnY2F0ZWdvcnknXSA9ICdtJztcbiAgICAgICAgICAgICAgICBtdW5jaGtpbkdhbWVzLnB1c2gocm93KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICfQtyc6XG4gICAgICAgICAgICAgICAgZGF0YVtpXVsnY2F0ZWdvcnknXSA9ICduJztcbiAgICAgICAgICAgICAgICBuZXJkR2FtZXMucHVzaChyb3cpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgZGF0YVtpXVsnY2F0ZWdvcnknXSA9ICdkZWZhdWx0JztcbiAgICAgICAgICAgICAgICBkZWZhdWx0R2FtZXMucHVzaChyb3cpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICB2YXIgYWxsR2FtZXMgPSBnYW1lc0ZvclR3by5jb25jYXQoZ2FtZXNGb3JHcm91cCwgbXVuY2hraW5HYW1lcywgbmVyZEdhbWVzLCBkZWZhdWx0R2FtZXMpXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWxsR2FtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciByb3cgPSBhbGxHYW1lc1tpXVxuICAgICAgICAgICAgdmFyIG51bWJlck9mUGVvcGxlID0gJydcbiAgICAgICAgICAgIHZhciBwcmV2ID0gaSA+IDA/IGkgLSAxOiAwXG4gICAgICAgICAgICB2YXIgbmV4dCA9IGkgPCBhbGxHYW1lcy5sZW5ndGgtMT8gaSArIDE6IGk7XG4gICAgICAgICAgICBzd2l0Y2ggKHJvd1snY2F0ZWdvcnknXSkge1xuICAgICAgICAgICAgICBjYXNlICcyJzpcbiAgICAgICAgICAgICAgICBudW1iZXJPZlBlb3BsZSA9ICfQndCwINC00LLQvtC40YUnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdtYW55JzpcbiAgICAgICAgICAgICAgICBudW1iZXJPZlBlb3BsZSA9ICfQndCwINC60L7QvNC/0LDQvdC40Y4nO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdtJzpcbiAgICAgICAgICAgICAgICBudW1iZXJPZlBlb3BsZSA9ICfQnNCw0L3Rh9C60LjQvdGLJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAnbic6XG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZQZW9wbGUgPSAn0J3QsCDQu9GO0LHQuNGC0LXQu9GPJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAnZGVmYXVsdCc6XG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZQZW9wbGUgPSAn0JTRgNGD0LPQuNC1INC40LPRgNGLJ1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIG51bWJlck9mUGVvcGxlID0gJ9CU0YDRg9Cz0LjQtSDQuNCz0YDRiydcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbGxHYW1lc1tpXVsnY2F0ZWdvcnknXSAhPSBhbGxHYW1lc1twcmV2XVsnY2F0ZWdvcnknXVxuICAgICAgICAgICAgICAgIHx8IGkgPT0gMCkge1xuICAgICAgICAgICAgICB2YXIgdHBsID0gJzxkaXYgY2xhc3M9XCJnYW1lcy10eXBlXCI+PGRpdiBjbGFzcz1cImdhbWVzLWNhdGVnb3J5XCI+JytudW1iZXJPZlBlb3BsZSArICc8L2Rpdj48bGkgY2xhc3M9XCJzZWN0aW9uLWl0ZW0gZ2FtZXNcIj4nICtcbiAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJnYW1lcy10aXRsZSBcIj4nICsgcm93WyfQndCw0LfQstCw0L3QuNC1INC90LDRgdGC0L7Qu9C60LgnXSArICc8L3NwYW4+JyArXG4gICAgICAgICAgICAgICAgJzwvbGk+J1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYWxsR2FtZXNbaV1bJ2NhdGVnb3J5J10gIT0gYWxsR2FtZXNbbmV4dF1bJ2NhdGVnb3J5J10gfHwgaSA9PSBhbGxHYW1lcy5sZW5ndGgtMSkge1xuICAgICAgICAgICAgICB2YXIgdHBsID0gJzxsaSBjbGFzcz1cInNlY3Rpb24taXRlbSBnYW1lc1wiPicgK1xuICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImdhbWVzLXRpdGxlIFwiPicgKyByb3dbJ9Cd0LDQt9Cy0LDQvdC40LUg0L3QsNGB0YLQvtC70LrQuCddICsgJzwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICAnPC9saT48L2Rpdj4nXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgdmFyIHRwbCA9ICc8bGkgY2xhc3M9XCJzZWN0aW9uLWl0ZW0gZ2FtZXNcIj4nICtcbiAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJnYW1lcy10aXRsZSBcIj4nICsgcm93WyfQndCw0LfQstCw0L3QuNC1INC90LDRgdGC0L7Qu9C60LgnXSArICc8L3NwYW4+JyArXG4gICAgICAgICAgICAgICAgJzwvbGk+J1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHRlbXBsYXRlICs9IHRwbFxuXG4gICAgICAgICAgfVxuICAgICAgICAkKFwiLnNlY3Rpb24tZ2FtZXNcIikuYXBwZW5kKHRlbXBsYXRlKVxuICAgIH1cblxuICAgIGluaXQoKVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGxvYWREYXRhXG4iLCJjb25zdCBpbml0TWFuc29yeUN1c3RvbSAgPSBmdW5jdGlvbigpIHtcblx0aWYgKCEkKCcuYm94LWZvci1jb3dvcmtlcnMnKS5sZW5ndGgpIHJldHVybiBmYWxzZVxuXHRcblx0JCgnLmJveC1mb3ItY293b3JrZXJzJykubWFzb25yeSh7XG5cdFx0aXRlbVNlbGVjdG9yOiAnLmdyaWQtaXRlbScsXG5cdFx0Y29sdW1uV2lkdGg6ICcuZ3JpZC1zaXplcicsXG5cdFx0cGVyY2VudFBvc2l0aW9uOiB0cnVlXG5cdH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgaW5pdE1hbnNvcnlDdXN0b207XG4iLCJjb25zdCBpbml0U3RpY2t5Rm9ybTEgPSBmdW5jdGlvbigpIHtcbi8vIFx0Y29uc3QgJHNmb3JtID0gJCgnLmhlYWRlci1mb3JtJyk7XG4vLyBcdGNvbnN0ICRzZWN0UUEgPSAkKCcucWEtc2VjdCcpXG4vLyBcdGNvbnN0IHNmb3JtSGVpZ2h0ID0gJCgnLnNmLWZvcm0nKS5vdXRlckhlaWdodCgpO1xuLy8gXHRjb25zdCAkc2ZoZWFkID0gJCgnLnNmLWhlYWRlckpzJyk7XG4vL1xuLy9cbi8vIFx0bGV0IHRybnNsWSA9IGdldFdpbkhlaWdodCgpIC8gMiAtIHNmb3JtSGVpZ2h0IC8gMjtcbi8vIFx0bGV0IHVydXJ1ID0gZ2V0V2luSGVpZ2h0KCkgLSA5MDtcbi8vXG4vLyBcdGZ1bmN0aW9uIGdldFdpbkhlaWdodCgpIHtcbi8vIFx0XHRsZXRcdHdoID0gJCh3aW5kb3cpLmhlaWdodCgpO1xuLy8gXHRcdHJldHVybiB3aDtcbi8vIFx0fVxuLy9cbi8vIFx0XHRmdW5jdGlvbiBnZXRPZmZzZXRUb3AoZWxlbSkge1xuLy8gXHRcdHJldHVybiBlbGVtLm9mZnNldCgpLnRvcDtcbi8vIFx0fVxuLy9cbi8vIFx0ZnVuY3Rpb24gc2V0Rm9ybU9mZnNldChvZmZzZXQpIHtcbi8vIFx0XHQkc2Zvcm0uY3NzKHtcbi8vIFx0XHRcdHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoJyArIG9mZnNldCArJ3B4KSdcbi8vIFx0XHR9KTtcbi8vIFx0fVxuLy9cbi8vIFx0Z2V0V2luSGVpZ2h0KCk7XG4vLyBcdHNldEZvcm1PZmZzZXQodHJuc2xZKTtcbi8vXG4vL1xuLy8gXHQkc2ZoZWFkLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbi8vIFx0XHRsZXQgZm9ybVNjck9mZnNldFRvcCA9ICRzZm9ybS5wb3NpdGlvbigpLnRvcDtcbi8vXG4vLyBcdFx0Zm9ybVNjck9mZnNldFRvcCA9PSB1cnVydSA/IHNldEZvcm1PZmZzZXQodHJuc2xZKSA6IHNldEZvcm1PZmZzZXQodXJ1cnUpO1xuLy8gXHR9KTtcbi8vXG4vLyAkKGRvY3VtZW50KS5vbignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xuLy8gXHR1cnVydSA9IGdldFdpbkhlaWdodCgpIC0gOTA7XG4vLyBcdHNldEZvcm1PZmZzZXQodXJ1cnUpO1xuLy9cbi8vIFx0bGV0IHdpblNjclRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbi8vIFx0bGV0IG9mZnNldFFBID0gZ2V0T2Zmc2V0VG9wKCRzZWN0UUEpO1xuLy8gXHRsZXQgb2Zmc2V0Rm9ybSA9IGdldE9mZnNldFRvcCgkc2Zvcm0pO1xuLy9cbi8vIFx0JHNmb3JtLmFkZENsYXNzKCdmaXhlZCcpO1xuLy9cbi8vIFx0aWYgKHNmb3JtSGVpZ2h0ICsgb2Zmc2V0UUEgKyAwPD0gd2luU2NyVG9wKSB7XG4vLyBcdFx0c2V0Rm9ybU9mZnNldCh1cnVydSk7XG4vLyBcdH0gZWxzZSBpZiAoKG9mZnNldFFBIC0gMTUwKSA8PSBvZmZzZXRGb3JtKSB7XG4vLyBcdFx0c2V0Rm9ybU9mZnNldChnZXRXaW5IZWlnaHQoKSk7XG4vLyBcdH1cbi8vXG4vLyB9KTtcbi8vXG4vLyBcdCRzZmhlYWQub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuLy8gXHRcdCRzZm9ybS50b2dnbGVDbGFzcygnc2V0RnVsbEZvcm0nKTtcbi8vIFx0fSk7XG4vL1xuLy8gXHQkc2V0Rml4UG9zLmNzcyh7XG4vLyBcdFx0J3RyYW5zZm9ybSc6ICd0cmFuc2xhdGVZKCcgKyBnZXRXaW5IZWlnaHQoKSArICcpJ1xuLy8gXHR9KTtcbi8vXG4vL1xuLy8gXHRmdW5jdGlvbiBnZXRPZmZzZXRUb3AoZWxlbSkge1xuLy8gXHRcdHJldHVybiBlbGVtLm9mZnNldCgpLnRvcDtcbi8vIFx0fVxuLy9cbi8vIFx0ZnVuY3Rpb24gc2V0Rml4ZWRQb3MoKSB7XG4vLyBcdFx0aWYgKCQod2luZG93KS5zY3JvbGxUb3AoKSkgIHtcbi8vIFx0XHRcdCRzZm9ybS5yZW1vdmVDbGFzcygnc2V0SGlkZVBvcycpO1xuLy8gXHRcdFx0JHNmb3JtLmFkZENsYXNzKCdzZXRGaXhlZFBvcycpO1xuLy8gXHRcdH1cbi8vIFx0fVxuLy9cbi8vIFx0ZnVuY3Rpb24gc2V0SGlkZVBvcygpIHtcbi8vIFx0XHRpZiAoJCh3aW5kb3cpLnNjcm9sbFRvcCgpKSAge1xuLy8gXHRcdFx0JHNmb3JtLnJlbW92ZUNsYXNzKCdzZXRGaXhlZFBvcycpO1xuLy8gXHRcdFx0JHNmb3JtLmFkZENsYXNzKCdzZXRIaWRlUG9zJyk7XG4vLyBcdFx0fVxuLy8gXHR9XG4vL1xuLy8gXHQkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xuLy8gXHRcdHNldEZpeGVkUG9zKCk7XG4vLyBcdFx0bGV0IG9mZnNldFFBID0gZ2V0T2Zmc2V0VG9wKCRzZWN0UUEpO1xuLy8gXHRcdGxldCBvZmZzZXRGb3JtID0gZ2V0T2Zmc2V0VG9wKCRzZm9ybSk7XG4vLyBcdFx0Y29uc29sZS5sb2coYGZvcm06ICR7b2Zmc2V0Rm9ybX0gUUE6ICR7b2Zmc2V0UUF9IFdpbkhlaWdodDogJHtnZXRXaW5IZWlnaHQoKX1gKVxuLy9cbi8vIFx0XHRpZiAoc2Zvcm1IZWlnaHQgKyBvZmZzZXRRQSA8PSAkKHdpbmRvdykuc2Nyb2xsVG9wKCkpIHtcbi8vIFx0XHRcdHNldEZpeGVkUG9zKClcbi8vXG4vLyBcdFx0fSBlbHNlIGlmICgob2Zmc2V0UUEgLSA5MCkgPD0gb2Zmc2V0Rm9ybSkge1xuLy8gXHRcdFx0c2V0SGlkZVBvcygpXG4vLyBcdFx0fVxuLy8gXHR9KVxufTtcbmV4cG9ydCBkZWZhdWx0IGluaXRTdGlja3lGb3JtMTtcbiIsImNvbnN0IGluaXRUaW1lUmFuZ2UgPSBmdW5jdGlvbiAoKSB7XG5cblx0ZnVuY3Rpb24gZ2V0VGltZVJhbmdlICgpIHtcblx0XHRsZXQgaG91cnMgPSBuZXcgRGF0ZSgpLmdldEhvdXJzKCk7XG5cdFx0bGV0IG1pbnMgPSBuZXcgRGF0ZSgpLmdldE1pbnV0ZXMoKTtcblxuXHRcdC8v0J/QtdGA0LXQstC+0LTQuNC8INCy0YDQtdC80Y8g0LIg0LzQuNC90YPRgtGLXG5cdFx0bGV0IHRvdGFsTWlucyA9IGhvdXJzICogNjAgKyBtaW5zO1xuXG5cdFx0Ly8gMTEg0YPRgtGA0LBcblx0XHRjb25zdCBtaW5UaW1lID0gNjU5O1xuXG5cdFx0Ly8gMTEg0LLQtdGH0LXRgNCwXG5cdFx0Y29uc3QgbWF4VGltZSA9IDEzODA7XG5cblx0XHQvL9Cf0L7Qu9GD0YfQtdC90LjQtSDQvtC00L3QvtCz0L4g0L/RgNC+0YbQtdC90YLQsCDQstGA0LXQvNC10L3QuFxuXHRcdGxldCBvbmVQcm9jZW50ID0gKG1heFRpbWUgLSBtaW5UaW1lKSAvIDEwMDtcblxuXHRcdC8v0J/QvtC70YPRh9C10L3QuNC1INGC0LXQutGD0YnQtdCz0L4g0LLRgNC10LzQtdC90Lgg0LIg0L/RgNC+0YbQtdC90YLQsNGFXG5cdFx0bGV0IGludGVyZXN0ID0gKCh0b3RhbE1pbnMgLSBtaW5UaW1lKSAvIG9uZVByb2NlbnQpO1xuXG5cdFx0bGV0ICRyYW5nZU1hcmtlciA9ICQoJy50aW1lLXNsaWRlcicpO1xuXG5cdFx0aWYgKHRvdGFsTWlucyA8IG1heFRpbWUgJiYgdG90YWxNaW5zID4gbWluVGltZSkge1xuXG5cdFx0XHQkcmFuZ2VNYXJrZXIuY3NzKHtcblx0XHRcdFx0J29wYWNpdHknOiAnMScsXG5cdFx0XHRcdCdsZWZ0JzogaW50ZXJlc3QgKyAnJSdcblx0XHRcdH0pXG5cblx0XHR9IGVsc2Uge1xuXHRcdFx0JHJhbmdlTWFya2VyLmNzcyh7XG5cdFx0XHRcdCdsZWZ0JzogJzAlJyxcblx0XHRcdFx0J29wYWNpdHknOiAnMCdcblx0XHRcdH0pO1xuXG5cdFx0fVxuXHR9XG5cblx0Z2V0VGltZVJhbmdlICgpO1xuXG5cdHNldEludGVydmFsKGdldFRpbWVSYW5nZSwgNjAwMDAwKVxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBpbml0VGltZVJhbmdlOyJdfQ==
