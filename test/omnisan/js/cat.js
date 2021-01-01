'use strict';

moveBlockInMobile();
addBlockInMobile();

openSearchResults();

function dropDown() {

	var $sel = $('.select');
	if (!$sel.length) {
		return false;
	}

	$sel.each(function () {

		var $self = $(this),
		    $select = $(this).find('select'),
		    $value = $select.val(),
		    $currentValue = $select.find('option:selected').text(),
		    $name = $select.attr('name'),
		    $customClass = $select.attr("class"),
		    listClass = 'select-list',
		    selectClass = 'select';

		$select.attr('name', '_' + $name);

		function appendFakeSelect() {

			var template = '<div class="' + $customClass + '-value select-val">' + $currentValue + '</div> <ul class="' + $customClass + '-list select-list"> ';

			$select.find('option').each(function () {
				var $this = $(this);
				template += '<li class="' + $customClass + '-custom" value="' + $this.attr('value') + '" data-value="' + $this.attr('value') + '">' + $this.text() + '</li>';
			});

			template += '</ul>';

			$select.before(template);
		};
		appendFakeSelect();

		var $list = $self.find('.' + $customClass + '-list');
		var $fakeValue = $self.find('.' + $customClass + '-value');

		function showList() {
			$list.addClass('active');
			$self.addClass('active');
		};

		function hideList() {
			$list.removeClass('active');
			$self.removeClass('active');
		};

		function hideOther() {
			$('.' + selectClass + '.active').removeClass('active').find('.' + listClass).removeClass('active');
		};

		function changeValue($item) {
			var t = $item.text();
			var v = $item.attr('data-value');
			$fakeValue.text(t);
			$select.val(v).trigger('change');
		};

		$select.on('change', function (val) {
			if (val !== $value) {
				$value = val;
				var selValue = $select.find('option:selected').text();
				$fakeValue.text(selValue);
			}
		});

		$self.on('click', function (e) {
			if ($(this).find('select').is(':hidden')) {
				e.preventDefault();
				if ($(e.target).closest('.' + listClass).length) {
					changeValue($(e.target).closest('li'));
					hideList();
				} else if (!$(e.target).closest('.' + selectClass).hasClass('active')) {
					hideOther();
					showList();
				} else {
					hideList();
				}
			}
		});

		$('html').on('click', function (e) {
			if (!$(e.target).closest('.' + selectClass).length) {
				hideOther();
				//hideList();
			}
		});
	});
};
dropDown();

//change pics
function changePics() {
	var previews = $('.cat__photo-preview a');
	var photo = $('.cat__photo img');

	$(previews).on('click', function (e) {
		e.preventDefault();
		var fancyIndex = $(this).data('index');
		previews.removeClass('active');
		$(this).addClass('active');
		$(photo).attr('src', $(this).attr('href')).hide().fadeIn(300);
		return false;
	});
}
changePics();

//make FancyBox
function makeFancybox() {

	var fancyItems = [{ href: 'i/cat-add-0.jpg', thumb: 'i/cat-photo-1--small.png' }, { href: 'i/cat-add-2.png', thumb: 'i/cat-add-2.png' }, { href: 'i/cat-add-3.png', thumb: 'i/cat-add-4.png' }, { href: 'i/cat-add-1.png', thumb: 'i/cat-add-1.png' }, { href: 'i/cat-add-2.png', thumb: 'i/cat-add-2.png' }, { href: 'i/cat-photo-1.png', thumb: 'i/cat-photo-1--small.png' }];
	var fancyIndex = 0;

	$(document).on('click', '.cat__photo img', function () {
		$(".fancybox").fancybox({});
		$.fancybox.open(fancyItems, {
			padding: 0,
			index: fancyIndex,
			helpers: {
				thumbs: {
					width: 68,
					height: 68,
					source: function source(item) {
						return item.thumb;
					}
				}
			},
			fitToView: true,
			maxWidth: 800,
			beforeShow: function beforeShow() {
				this.width = 800;
				this.height = 600;
			}
		});
	});
}

makeFancybox();

function moveBlockInMobile() {

	// item mobile version
	var $card = $('.cat__goods .cat__goods-card:not(.is-copy-m):not(.is-copy-t)').clone().addClass('is-copy-m');
	$('.cat__goods .cat__goods-info').after($card);
	// item mobile version add button to the bottom
	var $addToCartBtn = $('.omnisan-item .cat__goods-card:not(.is-copy-m):not(.is-copy-t) .cat__card-add:not(.is-copy-m):not(.is-copy-t)').clone().addClass('is-copy-m is-copy-footer');
	// console.log($addToCartBtn);
	$('.omnisan-item .footer').before($addToCartBtn);
	$('.omnisan-item .cat__card-add.is-copy-footer').wrap('<div class="cat__button-footer"></div>');

	// item tablet version
	var $card = $('.cat__goods .cat__goods-card:not(.is-copy-m):not(.is-copy-t)').clone().addClass('is-copy-t');
	$('.cat__goods .cat__goods-photos').after($card);

	// item options to the top 
	var $options = $('.cat__goods .cat__info-options:not(.is-copy-m):not(.is-copy-t)').clone().addClass('is-copy-t');
	$('.cat__goods .cat__goods-card.is-copy-t:not(.is-copy-m) .cat__goods-top').after($options);

	// complimental item to the bottom
	var $comp = $('.cat__goods .cat__goods-card:not(.is-copy-m):not(.is-copy-t) .cat__info-complimental:not(.is-copy-m):not(.is-copy-t)').clone().addClass('is-copy-t');
	$('.cat__goods .cat__goods-info').after($comp);

	//header to the top
	var $header = $('.cat__goods .cat__goods-center .cat__goods-header:not(.is-copy-m):not(.is-copy-t)').clone().addClass('is-copy-t');
	$('.cat__goods .cat__goods-left').before($header);

	// item mobile version bottom button
	var $addToCart = $('.cat__goods-card.is-copy .js-add-to-cart').clone().addClass('is-copy');
	$('.footer').before($addToCart);

	// cart mobile version move availability under the image
	$('.cart__items-item').each(function (index, element) {
		var $availability = $(element).find('.cart__items-availability').clone().addClass('is-copy');
		$(element).find('.js-image').append($availability);
	});
	//cart mobile version move delete button under content
	$('.cart__items-item').each(function (index, element) {
		var $delete = $(element).find('.js-delete').clone().addClass('is-copy');
		$(element).find('.cart__items-text').append($delete);
	});

	//fav mobile version add buttons to put items into basket and delete all fav items

	var $addFavToCart = $('.fav__main .js-main-submit').clone().addClass('is-copy js-add-to-cart');
	var $deleteAllFav = $('.fav__main .js-deleteAll').clone().addClass('is-copy');

	$('.fav__main .cart__items').prepend($deleteAllFav).prepend($addFavToCart);

	// fav mobile version change text in bottom button add to cart

	$('.tece-fav .js-main-submit:not(.is-copy)').html('Добавить все в корзину');

	$('.tece-fav .cat__confirm-header').html('Вы уверены, что хотите удалить товар из избранного?');

	// footer tablet version move social down

	// var $social = $('.footer__social').clone().addClass('is-copy')
	// $('.footer__copyright').append($social)

	// account mobile version move desc under the title

	var $orderItems = $('.account__main .cart__items-item');
	$orderItems.each(function () {
		var self = $(this);
		var desc = self.find('.cart__items-outer').clone().addClass('is-copy-m');
		var title = self.find('.cart__items-text');
		title.append(desc);
	});

	// catalog mobile version move filters to the items

	var $catalogFilter = $('.omnisan-catalog .cat__filter').clone().addClass('is-copy');
	$('.omnisan-catalog .cat__sortings').before($catalogFilter);
}

function addBlockInMobile() {
	var cartSummary = '<div class="cart__content-summary cart__summary">Всего <span class="cart__summary-bold">33</span> товара <nobr>на сумму <span class="cart__summary-bold">150 000</span> р.</nobr></div>';
	$('.cart__main .cart__content').before(cartSummary);
	$('.checkout-main .col_wide').before(cartSummary);
}

function position() {
	var $tagsForm = $('.cart__tags');
	var $cartAside = $('.cart__aside');
	var $tagsFormDupl = $('.cart__tags-dupl');
	if (!$tagsFormDupl.length) return false;
	var $cartAsideDupl = $('.cart__aside-dupl');

	var $cartContent = $('.cart__items');

	var fixedStopClsnm = 'is-fixed-stop';
	var fixedClsnm = 'is-fixed';
	var activeClsnm = 'is-active';

	var asideMargin = 10;

	var startFixed = $tagsFormDupl.offset().top > 0 ? $tagsFormDupl.offset().top : $tagsForm.offset().top;

	var contentStart = $cartContent.offset().top;
	var asideHeight = $cartAside.outerHeight();
	var formHeight = $tagsForm.outerHeight();
	var footerHeight = $('.botline').outerHeight();

	var endFixed = $cartContent.offset().top + $cartContent.outerHeight() - asideHeight - formHeight;

	var asideFinishTop = endFixed - formHeight - footerHeight - asideMargin;

	if ($('.cart__items-item:not(.is-deleted)').length <= 1 || $(window).width() < 1190) {
		$(window).off('scroll');

		$cartAside.removeClass(fixedStopClsnm).removeClass(fixedClsnm).removeAttr('style');
		$tagsFormDupl.removeClass(activeClsnm);
		$tagsForm.removeClass(fixedClsnm);
		return;
	}

	var setPosition = function setPosition() {
		var sct = $(window).scrollTop();

		if (sct >= startFixed && sct < endFixed) {
			$tagsFormDupl.addClass(activeClsnm);
			$tagsForm.addClass(fixedClsnm);
			$cartAside.removeClass(fixedStopClsnm).addClass(fixedClsnm).removeAttr('style');
		} else if (sct >= endFixed) {
			$cartAside.removeClass(fixedClsnm).addClass(fixedStopClsnm).css({ top: asideFinishTop + 'px' });
		} else {
			$tagsFormDupl.removeClass(activeClsnm);
			$tagsForm.removeClass(fixedClsnm);
			$cartAside.removeClass(fixedStopClsnm).removeClass(fixedClsnm).removeAttr('style');
		}
	};

	setPosition();
	$(window).off('scroll').on('scroll', setPosition);
}

position();
$(window).load(function () {
	position();
});

$(window).resize(function () {
	position();
});
// promo form

function openPromoForm() {
	var $form = $('.js-cart-promo-form');
	var $buttonSend = $('.js-cart-send-promo-form');
	var $input = $('.js-cart-promo-input');
	$input.on('focus', function () {
		$form.removeClass('success');
		$form.removeClass('error');
	});
	$buttonSend.on('click', function (e) {
		var value = $input.val();
		e.preventDefault();
		if (value.length) {
			$form.addClass('success');
		} else {
			$form.addClass('error');
		}
	});
}

openPromoForm();

// submit main form using external button

function submitExternal() {
	$(".js-main-submit").click(function () {
		$("#form-cart-items").submit();
	});
}

function detectIEAndEdge() {
	var ua = window.navigator.userAgent;

	var msie = ua.indexOf('MSIE ');
	if (msie > 0) {
		// IE 10 or older => return version number
		$('html').addClass('is-ie10orOlder');
	}

	var trident = ua.indexOf('Trident/');
	if (trident > 0) {
		// IE 11 => return version number
		$('html').addClass('is-ie11');
	}

	var edge = ua.indexOf('Edge/');
	if (edge > 0) {
		// Edge (IE 12+) => return version number
		$('html').addClass('is-ieEdge');
	}

	// other browser
	return false;
}

detectIEAndEdge();

function confirmItemDeletion() {
	var $btns = $('.js-delete');
	$btns.each(function () {
		var self = $(this);
		var $item = $(this).closest('.cart__items-item');

		self.on('click', function () {
			//console.log(1);
			// $.alertable.confirm('Вы уверены, что хотите удалить товар из корзины?', {

			// }).then(function() {
			// 	console.log(2);
			// 	$($item).addClass('is-deleted').fadeOut(200, position)
			// })
			$.alertable.confirm('Вы уверены, что хотите удалить товар из корзины?', {
				cancelButton: '<button class="alertable-cancel" type="button">Отмена</button>',
				okButton: '<button class="alertable-ok" type="submit">Удалить</button>'
			}).then(function () {
				//console.log(2);
				$($item).addClass('is-deleted').fadeOut(200, position);
			});
		});
	});
}

confirmItemDeletion();

function validateEmail(email) {
	var email = email.val();
	return email.indexOf('@') !== -1 && email.indexOf('.') !== -1 && email.lastIndexOf('.') - email.indexOf('@') > 1 && email.lastIndexOf('.') < email.length - 1;
}

function showError(message, input) {
	var classOuter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'partner__form-outer';
	var classInner = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'partner__form-error js-partner-form-error';

	var $input = $(input);
	if (!$input.siblings('.' + classOuter).length) {
		var error = '<div class=' + classOuter + '><div class=' + classInner + '>' + message + '</div></div>';
		$input.after(error);
	}
}
function showText(message, status, btn) {
	var $btn = $(btn);
	$btn.siblings('.partner__form-text').remove();

	var text = '<div class="partner__form-text partner__form-text--' + status + '">' + message + '</div>';
	$btn.after(text);
}

function showCountdown() {
	var $btn = $('.js-callback-button');
	var $countdown = $('.js-callback-countdown');

	$btn.addClass('inactive');
	$countdown.addClass('active');

	makeCountdown();
}

function makeCountdown() {
	var $countdownBlock = $('.js-callback-countdown');
	var $numberBlock = $countdownBlock.find('span');
	var number = $numberBlock.html();

	setInterval(function () {
		if (number-- > 0) {
			$numberBlock.html(number);
		} else {
			$countdownBlock.fadeOut(200);
		}
	}, 1000);
}

function validateNumber(number) {
	var number = +number.val().replace(/\D/g, '');
	//console.log(number.toString().length)
	return number.toString().length === 11;
}
function validateCallbackForm() {

	var btn = $('.js-callback-button');
	if (!btn.length) return false;

	var input = $('.js-callback-input');
	$(input).mask('+7 999 999 99 99', { selectOnFocus: false, optional: true });

	input.on("invalid", function (e) {
		e.preventDefault();
	});

	input.on('blur', function () {
		if (input.val() != '' && !validateNumber(input)) {
			showError('Неправильный формат телефона', input, 'callback__form-outer', 'callback__form-error js-callback-form-error');
		}
	});

	btn.on('click', function (e) {
		e.preventDefault();
		if (!validateNumber(input)) {
			showError('Неправильный формат телефона', input, 'callback__form-outer', 'callback__form-error js-callback-form-error');
		} else {
			showCountdown();
		}
	});

	input.on('focus', function () {
		$(this).siblings('.callback__form-outer').remove();
	});
}

validateCallbackForm();

function validateFeedbackForm() {
	var $btn = $('.js-feedback-btn');
	var $form = $('.js-feedback-form');
	var $headerBlock = $('.footer__form-title');

	if (!$btn.length) return false;

	var email = $('.js-feedback-email input');
	var text = $('.js-feedback-textarea textarea');
	var inputs = $form.find('input, textarea');

	inputs.on("invalid", function (e) {
		e.preventDefault();
	});

	email.on('blur', function () {
		if (email.val() != '' && !validateEmail(email)) {
			email.addClass('error');
		}
	});
	$btn.on('click', function (e) {
		e.preventDefault();
		if (email.val() == '') {
			email.addClass('error');
		}
		if (text.val() == '') {
			text.addClass('error');
		}
		if (email.val() != '' && !validateEmail(email)) email.addClass('error');
		if (email.val() != '' && validateEmail(email) && text.val() != '') showText(' Форма успешно отправлена.', 'success', $headerBlock);
	});
	inputs.on('focus', function () {
		$(this).removeClass('error');
	});
}
validateFeedbackForm();