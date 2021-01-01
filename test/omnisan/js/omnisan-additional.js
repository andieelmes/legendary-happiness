'use strict';

$(document).ready(function () {

	var KEYCODE_ESC = 27;
	var KEYCODE_ENTER = 13;

	function formatNumber(number) {
		return String(number).replace(/(.)(?=(\d{3})+$)/g, '$1 ');
	}

	function addRuble(number) {
		return formatNumber(number) + ' ₽';
	}

	function makeNumber(number) {
		return +number.replace(/\D+/g, '');
	}

	function checkIfNumber(input) {

		return input.match(/^[0-9]+$/);
	}
	function allowOnlyNumbers(input) {
		input.on("keyup", function () {
			if (checkIfNumber(this.value)) {
				this.value = this.value;
			} else {
				var val = parseInt(this.value);
				this.value = isNaN(val) ? "" : val;
			}
		});
	}

	function updateValue(input, rangeValue, inputMin, inputMax) {
		input.off('blur').on("blur", function () {
			var value = makeNumber($(input).val());

			if (input.hasClass('js-range-input-min')) {
				var maxValue = makeNumber($(inputMax).val());
				if (value > +maxValue && +maxValue != 0) {
					$(this).val(+maxValue - 1);
				}
				rangeValue.slider("values", 0, $(this).val());
				$(this).val(addRuble($(this).val()));
			}
			if (input.hasClass('js-range-input-max')) {
				var minValue = makeNumber($(inputMin).val());
				if (value < +minValue && +minValue != 0) {
					$(this).val(+minValue + 1);
				}
				rangeValue.slider("values", 1, $(this).val());
				$(this).val(addRuble($(this).val()));
			}
			value = makeNumber($(input).val());
			var valueChecked = Math.max(Math.min(value, rangeValue.slider("option", "max")), rangeValue.slider("option", "min"));
			if (input.hasClass('js-range-input-min')) {
				rangeValue.slider("values", 0, valueChecked);
			}

			if (input.hasClass('js-range-input-max')) {
				rangeValue.slider("values", 1, valueChecked);
				//console.log(rangeValue.slider( "values", 0));
			}

			this.value = addRuble(valueChecked);
		});
	}
	function makePriceRange(slider, inputMin, inputMax) {
		var $slider = $(slider);
		if (!$slider.length) return false;
		var step = +$slider.attr('data-step');

		var $inputMin = $(inputMin);
		var min = +$inputMin.attr('data-min');
		$inputMin.val(addRuble($inputMin.val()));

		var $inputMax = $(inputMax);
		var max = +$inputMax.attr('data-max');
		$inputMax.val(addRuble($inputMax.val()));

		//console.log($inputMin.val(), $inputMax.val())
		$slider.slider({
			range: true,
			min: min,
			max: max,
			step: step,
			//values: [3000, 5000],
			values: [makeNumber($inputMin.val()), makeNumber($inputMax.val())],
			slide: function slide(event, ui) {
				$inputMin.val(addRuble(ui.values[0])), $inputMax.val(addRuble(ui.values[1]));
			}
		});

		$inputMax.off('focus').on('focus', function () {
			$inputMax.val(makeNumber($inputMax.val()));
		});
		$inputMin.off('focus').on('focus', function () {
			$inputMin.val(makeNumber($inputMin.val()));
		});
		allowOnlyNumbers($inputMax);
		allowOnlyNumbers($inputMin);

		$inputMax.off('keydown').on('keydown', function (e) {
			if (e.keyCode === KEYCODE_ESC || e.keyCode === KEYCODE_ENTER) {
				e.preventDefault();
				this.blur();
			}
		});
		$inputMin.off('keydown').on('keydown', function (e) {
			if (e.keyCode === KEYCODE_ESC || e.keyCode === KEYCODE_ENTER) {
				e.preventDefault();
				this.blur();
			}
		});

		updateValue($inputMax, $slider, '.js-range-input-min', '.js-range-input-max');
		updateValue($inputMin, $slider, '.js-range-input-min', '.js-range-input-max');
	}
	makePriceRange('.js-range-price', '.js-range-input-min', '.js-range-input-max');

	//add to cart and show added to the cart pop up 

	function showPopUpAddToCart() {
		var $addToCartButton = $('.js-add-to-cart');
		var $popupAddToCart = $('.botline__add--card');

		$addToCartButton.on('click', function (e) {
			e.preventDefault();
			e.stopPropagation();
			if ($(this).hasClass('js-add-to-cart-with-remove') && $(this).hasClass('is-chosen')) {
				$(this).removeClass('is-chosen');
				return false;
			}
			if (!$(this).hasClass('is-chosen')) {

				$(this).addClass('is-chosen');

				$popupAddToCart.removeClass('end-animating');
				$popupAddToCart.removeClass('is-hidden');

				setTimeout(function () {
					$popupAddToCart.addClass('is-amimating');
				}, 0);

				setTimeout(function () {
					$popupAddToCart.addClass('end-animating');
				}, 800);
				setTimeout(function () {
					$popupAddToCart.addClass('is-hidden');
				}, 1200);
			}
		});
	}

	showPopUpAddToCart();

	function updateCompareCounter(button, counter) {
		var $btn = $(button);
		var $counter = $(counter);
		var count = $counter.html();
		var $popupAddToCompare = $('.botline__add--compare');

		$btn.each(function () {
			var self = $(this);

			self.on('click', function () {
				if (self.hasClass('is-chosen')) {
					count--;
					$counter.html(count);
					self.removeClass('is-chosen');
				} else {
					count++;
					$counter.html(count);
					self.addClass('is-chosen');

					$popupAddToCompare.removeClass('end-animating');
					$popupAddToCompare.removeClass('is-hidden');

					setTimeout(function () {
						$popupAddToCompare.addClass('is-amimating');
					}, 0);

					setTimeout(function () {
						$popupAddToCompare.addClass('end-animating');
					}, 800);
					setTimeout(function () {
						$popupAddToCompare.addClass('is-hidden');
					}, 1200);
				}
			});
		});
	}
	updateCompareCounter('.js-add-to-compare', '.js-compare-counter');

	function changeQuantity() {
		var $inputs = $('.js-quantity');

		$inputs.each(function () {
			var $btnLess = $(this).find('.js-quantity-btn--less');
			var $btnMore = $(this).find('.js-quantity-btn--more');
			var $input = $(this).find('.js-quantity-input');

			var val = +$input.val();
			var min = +$input.attr('min');
			var max = +$input.attr('max');
			var step = +$input.attr('step');

			//console.log($(this));
			$(this).on('click', function (e) {
				e.stopPropagation();
				e.preventDefault();
			});
			$input.on('change', function () {
				val = +$input.val();
			});

			$btnLess.on('click', function () {

				if (val - step > min) {
					val = val - step;
					$input.val(val);
				}
			});

			$btnMore.on('click', function () {
				if (val + step < max) {
					val = val + step;
					$input.val(val);
				}
			});
		});
	}
	changeQuantity();

	function openFilterList(filter) {
		var $filter = $('.js-filter-item');
		$filter.each(function () {
			var self = $(this);
			var $btn = self.find('.js-filter-btn');
			$btn.on('click', function () {
				if (self.hasClass('closed')) {
					self.removeClass('closed');
				} else {
					self.addClass('closed');
				}
			});
		});
	}
	openFilterList('.js-filter-item');

	function resetFilters(form, btn) {
		var $form = $(form);

		$form.each(function () {
			var self = $(this);
			var $btn = self.find(btn);
			var $inputs = self.find('input[type="radio"], input[type="checkbox"]');
			var $selects = self.find('select');
			var $sliders = self.find('.js-range-price');
			$btn.on('click', function (e) {
				e.preventDefault();
				e.returnValue = false;
				$inputs.prop('checked', false);

				$selects.prop('selectedIndex', 0);
				$selects.trigger('change');
				$sliders.each(function () {
					var self = $(this);
					var options = self.slider('option');
					self.slider('values', [options.min, options.max]);
				});
			});
		});
	}

	resetFilters('.js-filters-form', '.js-reset-filters');

	// on click show additional menu items

	function showMenuItems() {
		var $button = $('.js-show-menu-items-tablet');

		if (!$('.js-show-menu-items-tablet').length) return false;

		var $menu = $('.js-menu-items-tablet');
		$button.on('click', function () {
			$menu.toggleClass('is-closed');
		});

		$('body').on('click', function (e) {
			if (!$menu.hasClass('is-closed') && !$(e.target).closest('.js-show-menu-items-tablet').length && !$(e.target).closest('.js-menu-items-tablet').length) {
				e.preventDefault();
				$menu.addClass('is-closed');
			}
		});
	}
	showMenuItems();

	//header tablet version move last menu item into hidden block;


	function moveLastMenuItems() {

		var elements = '.header-top_item';
		function discardChanges() {
			$(elements).removeClass('is-hidden');
			$('.header-top_showMore').remove();
		}

		function determineWidth() {
			if ($('.header').hasClass('header--sign')) {
				if (window.innerWidth > 720 && window.innerWidth < 770) {
					;
					moving(2, 4);
				}
				if (window.innerWidth > 770 && window.innerWidth < 850) {
					;
					moving(3, 4);
				}
				if (window.innerWidth > 850 && window.innerWidth < 920) {
					;
					moving(4, 5);
				}
				if (window.innerWidth > 920 && window.innerWidth < 1030) {
					;
					moving(5, 4);
				} else if (window.innerWidth > 1030) {
					discardChanges();
				}
			} else {
				if (window.innerWidth > 720 && window.innerWidth < 870) {
					;
					moving(5, 4);
				} else if (window.innerWidth > 870) {
					discardChanges();
				}
			}
		}
		determineWidth();

		$(window).resize(function () {
			determineWidth();
			showMenuItems();
		});

		function moving(toHide, toAppend) {

			discardChanges();

			$(elements + ':nth-child(n+' + toHide + ')').addClass('is-hidden');
			var itemsToMove = $(elements + ':nth-child(n+' + toHide + ')').clone().addClass('is-copy');

			$(elements + ':nth-child(' + toAppend + ')').after('<span class="header-nav-inner is-closed js-menu-items-tablet"></span>');
			$('.js-menu-items-tablet').prepend(itemsToMove).wrap('<span class="header-top_showMore js-show-menu-items-tablet"></span>');
		}
	}

	moveLastMenuItems();
	showMenuItems();

	function openAccountItems() {
		var $items = $('.js-account-item');
		$items.each(function () {
			var self = $(this);
			var btn = self.find('.js-account-btn');
			var select = self.find('.select-list');
			btn.on('click', function () {
				self.toggleClass('active');
				showChangePasswordForm();
				if (select.length) {
					select.toggleClass('active');
				}
			});
			if (select.length) {
				$('html').on('click', function (e) {
					if (!$(e.target).closest(self).length) {
						select.removeClass('active');
						self.removeClass('active');
					}
				});
			}
		});
	}
	openAccountItems();

	function showChangePasswordForm() {
		var $form = $('.js-show-password-form');
		var $passwords = $form.find('.js-input-password');

		if ($form.hasClass('active')) {
			$passwords.prop('required', true);
			console.log($passwords);
		} else {
			$passwords.prop('required', false);
		}
	}
	showChangePasswordForm();

	function determinePaymentOptions() {
		var $deliveryOptions = $('.js-delivery-options input[name=deliveryOptions]');
		var $paymentOptions = $('.js-payment-options input[name=paymentOptions]');

		function disablePaymentOptions(payments) {
			$paymentOptions.attr('disabled', false);

			$paymentOptions.each(function () {
				var self = $(this);
				var val = self.val();
				for (var i = 0; i < payments.length; i++) {
					var payment = payments[i];

					if (val !== payment) {
						self.attr('disabled', true);
						self.prop('checked', false);
					} else {
						self.attr('disabled', false);
						break;
					}
				}
			});
			var paymentToCheck = $('.js-payment-options input:not(:disabled):first');
			paymentToCheck.prop('checked', true).trigger('change');
		}
		$deliveryOptions.each(function () {
			var self = $(this);
			var value = self.val();
			var availablePaymentOptionsString = self.attr('data-available-payments');
			var availablePaymentOptions = availablePaymentOptionsString.split(',');
			disablePaymentOptions(availablePaymentOptions);
			self.on('change', function () {
				disablePaymentOptions(availablePaymentOptions);
			});
		});
	}
	determinePaymentOptions();

	function toggleMobileFilter() {
		var $filter = $('.js-mobile-filter');
		$filter.each(function () {
			var self = $(this);
			var $btn = self.find('.js-open-mobile-filter-btn');
			$btn.on('click', function () {
				self.toggleClass('active');
			});

			$('body').on('click touchstart', function (e) {
				if (!$(e.target).closest('.js-mobile-filter').length) {
					self.removeClass('active');
				}
			});
		});
	}
	toggleMobileFilter();

	function makeCompareHeadTable() {
		var $table = $('.js-compare-table');
		$table.each(function () {
			var $self = $(this);
			var $headCells = $self.find('.js-compare-table-head');
			var $headRows = $('.js-compare-head tr');
			var $tableRows = $self.find('tr');
			$headRows.each(function (i) {
				var $self = $(this);
				var $currentCell = $($headCells[i]);
				var height = $($tableRows[i]).height();
				var $clone = $currentCell.clone();
				$self.html($clone).height(height);
				//console.log($self);
			});
		});
	}
	makeCompareHeadTable();

	// 	function pinCompareCheckboxToTheRight(){
	// 		var $container = $('.compare__items');
	// 		var $checkbox = $('.js-compare-checkbox');
	// 		var right = parseInt($checkbox.css('right'));
	// 		$container.scroll(function(){
	// 			// window.webkitRequestAnimationFrame(function() {
	// 				$checkbox.css({
	// 					'right': -$container.scrollLeft() + right 
	// 				});
	//     	// });
	// 		});	
	// 	}
	// pinCompareCheckboxToTheRight()

	$(window).resize(function () {
		makeCompareHeadTable();
	});

	function deleteCompareItems() {
		var $btn = $('.js-compare-delete');
		var $counter = $('.js-compare-cnt');
		$btn.on('click', function (e) {
			var self = $(this);
			e.preventDefault();
			var $item = self.closest('.cat__add-item');
			var index = $item.index();

			$($item).addClass('is-deleted').fadeOut(200);

			var $diffs = $('.js-compare-table tr');
			$diffs.each(function () {
				var self = $(this);
				var $toDelete = self.find('td:eq(' + (index + 1) + ')');
				$($toDelete).addClass('is-deleted').fadeOut(200);
				makeCompareHeadTable();
			});
			var $indi = $('.js-compare-individual:eq(' + index + ')');
			$indi.addClass('is-deleted').fadeOut(200);

			var count = +$counter.html();
			console.log(count);
			count--;
			$counter.html(count);
		});
	}
	deleteCompareItems();
});