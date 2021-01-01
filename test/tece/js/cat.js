$(function(){


	moveBlockInMobile();
	addBlockInMobile()
	moveLastMenuItems()

	// ! dropdown
	
	// function dropDown() {
		
	// 	var $sel = $('.select');
	// 	if (!$sel.length) {return false;}
		
	// 	$sel.each(function(){
			
	// 		var $select = $(this),
	// 			$hidden = $select.find('input[type="hidden"]'),
	// 			$value = $select.find('.select-val'),
	// 			$list = $select.find('.select-list'),
					
	// 			listClass = 'select-list',
	// 			selectClass = 'select';

			
	// 		function appendRealSelect()	{
	// 			var template =  '<select data-id="'+$hidden.attr('name')+'">';

	// 			$list.find('li').each(function(){
	// 				var $this = $(this);	
	// 				template += '<option value="'+$this.attr('data-value')+'">'+$this.text()+'</option>';
	// 			});
				
	// 			template += '</select>';
				
	// 			$select.append(template);
				
	// 		};
			
	// 		function showList() {
	// 			$list.addClass('active');
	// 			$select.addClass('active');
	// 		};
			
	// 		function hideList() {
	// 			$list.removeClass('active');
	// 			$select.removeClass('active');
	// 		};
			
	// 		function hideOther() {
	// 			$('.'+selectClass+'.active').removeClass('active').find('.'+listClass).removeClass('active');
	// 		};
			
	// 		function changeValue($item) {
	// 			var t = $item.text();
	// 			var v = $item.attr('data-value');
	// 			$value.text(t);
	// 			$hidden.val(v).trigger('change');
	// 		};
			
			
	// 		appendRealSelect();
			
	// 		$select.on('click', function(e){
	// 			if ($(this).find('select').is(':hidden')) {
	// 				e.preventDefault();
	// 				if ($(e.target).closest('.'+listClass).length) {
	// 					changeValue($(e.target).closest('li'));
	// 					hideList();
	// 				}
	// 				else if (!$(e.target).closest('.'+selectClass).hasClass('active')) {
	// 					hideOther();
	// 					showList();
	// 				}
	// 				else {
	// 					hideList();
	// 				}
	// 			}
	// 		});
			
	// 		$select.find('select').on('change', function(){
	// 			var vl = $(this).val();
	// 			changeValue($select.find('[data-value="'+vl+'"]'));
	// 		});
			
	// 		$('html').on('click', function(e){
	// 			if (!$(e.target).closest('.'+selectClass).length) {
	// 				hideOther();
	// 				//hideList();
	// 			}
	// 		});
		
	// 	});	
		
	// };
	function dropDown() {
		
		var $sel = $('.select');
		if (!$sel.length) {return false;}
		
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
			// for(var i = 0; i < $classList.length; i++) {
			// 	if ($classList[i] != 'select') {
			// 		var $customClass = $classList[i];
			// 	}
			// }
				
			// console.log($customClass)
			
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
			

			// $self.find('select').on('change', function(){
			// 	var vl = $(this).val();
			// 	if (vl !== _value) {
			// 		_value = vl
			// 		changeValue($select.find('[data-value="'+vl+'"]'));
			// 	}
			// });
			
			$('html').on('click', function(e){
				if (!$(e.target).closest('.'+selectClass).length) {
					hideOther();
					//hideList();
				}
			});
		
		});	
		
	};
	dropDown();


//toggle Banners


function toggleBanners() {
	var $button = $('.js-show-rklms-button')
	
	$button.on('click', function() {
		var $content = $(this).siblings('.js-show-rklms-content')
		var $parent = $(this).closest('.js-show-container')
		if (!$content.hasClass('is-closed')) {			
			// $content.slideUp(500)
			$content.addClass('is-closed')
			$parent.addClass('is-closed')

		}
		else {
			// $content.slideDown(500)
			$content.removeClass('is-closed')
			$parent.removeClass('is-closed')
		}
	})
}

toggleBanners()

function toggleComplexes() {
	var open = true
	var $button = $('.js-complexes-button')
	var $content = $('.js-complexes-content')
	var $icon = $('.cat__vars-icon')

	$button.on('click', function() {
		if (open) {
			open = false
			$content.slideUp(500)
			$icon.addClass('is-closed')
			
		}
		else {
			open = true
			$content.slideDown(500)
			$icon.removeClass('is-closed')
		}
	})
}

toggleComplexes()

//change pics
function changePics(){
	var previews = $('.cat__photo-preview a')
	if (!$('.cat__photo-preview a').length) return false;
	var photo = $('.cat__photo img')
	var fancyIndex;
	$(previews).on('click', function(e){
			e.preventDefault()
			fancyIndex = $(this).data('index');
			previews.removeClass('active');
			$(this).addClass('active');
			$(photo).attr('src', $(this).attr('href')).hide().fadeIn(300);
			return false;
		});
	
	$('.cat__photo').swipe({
		swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
			var activeIndex = $('.cat__photo-preview a.active').data('index');
			var next;
			event.preventDefault();
			event.stopPropagation();
			
      if (direction === 'left') {
				activeIndex = activeIndex >= (previews.length - 1) ? -1 : activeIndex;
				next = $('.cat__photo-preview a').eq(activeIndex+1)
			}
			else if (direction === 'right') {
				activeIndex = activeIndex > previews.length ? previews.length : activeIndex;
				next = $('.cat__photo-preview a').eq(activeIndex-1)
			}
			//console.log(direction,activeIndex, previews.length);
			previews.removeClass('active');
			next.addClass('active');
			$(photo).attr('src', next.attr('href')).hide().fadeIn(300);
		},
		tap: function() {
			openFancyBox(fancyIndex)      
		},
		
	})
}
changePics()

function openFancyBox(fancyIndex) {
	$.fancybox.open(fancyItems, {
		padding : 0,
		index: fancyIndex,
		helpers: {
			thumbs : {
				width  : 68,
				height : 68,
				source : function( item ) {
					return item.thumb;
				}
			}
		}
	});
}

//make FancyBox
function makeFancybox(){

	fancyItems = [
		{href : 'i/cat-photo-1.png',thumb:'i/cat-photo-1--small.png'},
		{href : 'i/cat-add-2.png',thumb:'i/cat-add-2.png'},
		{href : 'i/cat-add-3.png',thumb:'i/cat-add-3.png'},
		{href : 'i/cat-add-3.png',thumb:'i/cat-add-4.png'},
		{href : 'i/cat-add-1.png',thumb:'i/cat-add-1.png'},
		{href : 'i/cat-add-2.png',thumb:'i/cat-add-2.png'},
		{href : 'i/cat-photo-1.png',thumb:'i/cat-photo-1--small.png'},
		{href : '#_360',thumb:'i/svg/icon_360.svg'},
		{href : '#video',thumb:'i/svg/icon_video.svg'} 
	]

	var fancyIndex = 0;

	


	// $(document).on('click','.cat__photo img',function(){
	// 	openFancyBox(fancyIndex)          
	// })
		
	
	var $btn = $('.js-open-fancybox-item');
		$btn.each(function(){
			var self = $(this);
			var index = +self.attr('data-index');
			self.on('click', function(){
				openFancyBox(fancyIndex)
				setTimeout(function(){
					$.fancybox.jumpto(index)
					// window.object2vrPlayer('#container')
					// window.object2vrPlayer.setViewerSize(900, 585);
				}, 500);
								
			})
			
		});
}

makeFancybox()


function openFancyBoxItem() {
	
}




//add to cart and show added to the cart pop up 

function showPopUpAddToCart(){
	var $addToCartButton = $('.js-add-to-cart')
	var $popupAddToCart = $('.botline__add--card')

	$addToCartButton.on('click', function(e){
		e.preventDefault()

		if(!$(this).hasClass('is-chosen')) {
			
			$(this).addClass('is-chosen')
			
			$popupAddToCart.removeClass('end-animating')
			$popupAddToCart.removeClass('is-hidden')




			setTimeout(function(){
				$popupAddToCart.addClass('is-amimating')
			},0)
			
			setTimeout(function(){
				$popupAddToCart.addClass('end-animating')
			},800)
			setTimeout(function(){
				$popupAddToCart.addClass('is-hidden')
			},1200)
		}
		
		
	})
	
}

showPopUpAddToCart()

//add to fav and show added to the fav pop up 

function showPopUpAddToFav(){
	var $addToFavButton = $('.js-add-to-fav')
	var $popupAddToFav = $('.botline__add--fav')
	

	$addToFavButton.on('click', function(e){
		e.preventDefault()
		if(!$(this).hasClass('is-chosen')) {
			

			$(this).addClass('is-chosen')
			// var $parent = $(this).closest('.js-fav-container')
			$popupAddToFav.removeClass('end-animating')
			$popupAddToFav.removeClass('is-hidden')
			
			setTimeout(function(){
				$popupAddToFav.addClass('is-amimating')
			},0)

			setTimeout(function(){
				$popupAddToFav.addClass('end-animating')
			},800)
			setTimeout(function(){
				$popupAddToFav.addClass('is-hidden')
			},1200)
		}
		
		
	})
	
}

showPopUpAddToFav()

//open card options
function openCardOptions(){
	var $button = $('.js-show-card-options')
	var $cardOptions = $('.cat__payment')

	if (!$('.cat__payment').length) return false;

	var $body = $('.tece-item')
	var ESCAPE_KEYCODE = 27

	$button.on('click', function(){
			 $cardOptions.removeClass('is-closed')
			 $body.removeClass('overlay-is-closed')

			 var scrollBottom = $(document).height()
			 $cardOptions.css({'height': scrollBottom})	

			 $(document).on('keydown.paymentPopup', function(e) {
				if (e.keyCode == ESCAPE_KEYCODE) {
					e.preventDefault()
					$cardOptions.addClass('is-closed')
					$body.addClass('overlay-is-closed')
					$(document).off( "keydown.paymentPopup" )
				}
			});
			 
	})

	$('body').on('click', function (e) {
			if (!$('.cat__payment').hasClass('is-closed') 
				&& ((!$(e.target).closest('.cat__payment-inner').length
				&& !$(e.target).closest('.js-show-card-options').length)
				|| $(e.target).closest('.cat__payment-close').length)) {
			e.preventDefault()
			$cardOptions.addClass('is-closed')
			$body.addClass('overlay-is-closed')

		}
	});


}
openCardOptions()

// fotorama custom arrows

function createCustomArrows(){
    // 1. Initialize fotorama manually.
    var $fotoramaDiv = $('#fotorama').fotorama();

    // 2. Get the API object.
    var fotorama = $fotoramaDiv.data('fotorama');

    var arrowLeft = $('.cat__view-arrow--left');
    var arrowRight = $('.cat__view-arrow--right');

    arrowLeft.click(function() {
        fotorama.show('<')
    })

    arrowRight.click(function() {
        fotorama.show('>')
    })
}


// fotorama adaptive in quick view

function fotoramaAdaptive(maxWidth,navWidth){
	// 1. Initialize fotorama manually.
    var $fotoramaDiv = $('#fotorama').fotorama();

    // 2. Get the API object.
    var fotorama = $fotoramaDiv.data('fotorama');

	fotorama.resize({
		maxWidth: maxWidth,		
	});

	fotorama.setOptions({
		navwidth: navWidth
	});
}

function determineFotoramaWidth(){
	if (window.innerWidth < 1000) {
		return fotoramaAdaptive(300, 248)
	}
	else {
		return fotoramaAdaptive(400, 332)
	}
}



//open quick view
function openView(){
	var $button = $('.js-button-view')
	var $view = $('.cat__view')

	if (!$('.cat__view').length) return false;

	var $body = $('.all')
	var ESCAPE_KEYCODE = 27

	$button.on('click', function(){
			 $view.removeClass('is-closed')
			 $body.removeClass('overlay-is-closed')
			 var scrollBottom = $(document).height()
			 $view.css({'height': scrollBottom})

			 createCustomArrows()
			 determineFotoramaWidth()

			 $(window).resize(function(){
				determineFotoramaWidth()
			})
			
			 $(document).on('keydown.paymentPopup', function(e) {
				if (e.keyCode == ESCAPE_KEYCODE) {
					e.preventDefault()
					$view.addClass('is-closed')
					$body.addClass('overlay-is-closed')
					$(document).off( "keydown.paymentPopup" )
				}
			});
			 
	})

	$('body').on('click', function (e) {

		if (!$('.cat__view').hasClass('is-closed') 
			&& ((!$(e.target).closest('.cat__view-inner').length
			&& !$(e.target).closest('.js-button-view').length)
			|| $(e.target).closest('.cat__view-close').length)) {
				e.preventDefault()
				$view.addClass('is-closed')
				$body.addClass('overlay-is-closed')

		}
	});


}
openView()


//open fair price
function openFairPrice(){
	var $button = $('.js-fair-price')
	var $view = $('.cat__fair')

	if (!$('.cat__fair').length) return false;

	var $body = $('.tece-item')
	var ESCAPE_KEYCODE = 27

	$button.on('click', function(e){
			e.preventDefault()
			 $view.removeClass('is-closed')
			 $body.removeClass('overlay-is-closed')
			 var scrollBottom = $(document).height()
			 $view.css({'height': scrollBottom})	
			 createCustomArrows()
			 $(document).on('keydown.paymentPopup', function(e) {
				if (e.keyCode == ESCAPE_KEYCODE) {
					e.preventDefault()
					$view.addClass('is-closed')
					$body.addClass('overlay-is-closed')
					$(document).off( "keydown.paymentPopup" )
				}
			});
			 
	})

	$('body').on('click', function (e) {

		if (!$('.cat__fair').hasClass('is-closed') 
			&& ((!$(e.target).closest('.cat__fair-inner').length
			&& !$(e.target).closest('.js-fair-price').length)
			|| $(e.target).closest('.cat__fair-close').length)) {
				e.preventDefault()
				$view.addClass('is-closed')
				$body.addClass('overlay-is-closed')

		}
	});


}
openFairPrice()


// show info popup on scroll
function showInfoPopup(){
	var $button = $('.js-show-info-popup')
	var $popup = $('.js-show-info-container')

	if (!$popup.length) return false;

	var $close = $('.js-show-info-button')

	var whenToOpen = Math.max($(document).height()*0.8-screen.height)



	
	$close.on('click', function(e){
		e.preventDefault()
		e.stopPropagation()
		$popup.addClass('is--animating')
		$popup.addClass('is--closed')
		$popup.addClass('force-closed')
	}) 

	$button.on('click', function(e){
		e.preventDefault()
		e.stopPropagation()
		$popup.addClass('is--animating')
		$popup.removeClass('is-hidden')
		$popup.addClass('is-open')
		setTimeout(function(){
			$popup.toggleClass('is--closed')
		},0)
		
		
	})

	$(window).scroll(function(){
		if($(window).scrollTop() >= whenToOpen 
			&& !$popup.hasClass('force-closed')
			&& !$popup.hasClass('is-open')){

				$popup.removeClass('is-hidden')
				setTimeout(function(){
					$popup.addClass('is--animating')
					$popup.removeClass('is--closed')
				},0)

			}
		if($(window).scrollTop() < whenToOpen 
			&& !$popup.hasClass('force-closed')
			&& !$popup.hasClass('is--closed')
			&& !$popup.hasClass('is-open')){
				$popup.addClass('is--closed')
			}
	})

	$('body').on('click', function (e) {
		if (!$popup.hasClass('is--closed') 
		&& (!$(e.target).closest('.js-show-container').length 
		|| $(e.target).closest('.cat__popup-icon').length)) {
			$popup.addClass('is--closed')
			$popup.addClass('force-closed')

		}
	});

}
showInfoPopup()


//show select options in sub

function showSelectOptions() {
	// var $button = $('.js-show-vars')


	$('.js-vars-container').each(function(){
		var $self = $(this)
		var $button = $self.find('.js-show-vars')	
		var $vars = $self.find('.js-vars')
		var $links = $self.find('.sub__main-item')

		 $button.on('click', function() {
			$self.toggleClass('is-open')

		 })

		$('body').on('click', function (e) {			
			if (!$vars.hasClass('is-closed') 
				&& ((!$(e.target).closest($self).length
				|| $(e.target).closest($links).length)
				&& !$(e.target).closest($button).length)) {
					e.preventDefault()

					$self.removeClass('is-open')
				}
		})
	})
}



showSelectOptions()


function moveBlockInMobile(){

	// item mobile version
	var $card = $('.cat__goods .cat__goods-card:not(.is-copy-m):not(.is-copy-t)').clone().addClass('is-copy-m')
	$('.cat__goods .cat__info-options').after($card)

	// item tablet version
	var $card = $('.cat__goods .cat__goods-card:not(.is-copy-m):not(.is-copy-t)').clone().addClass('is-copy-t')
	$('.cat__goods .cat__goods-photos').after($card)

	// item mobile version bottom button
	var $addToCart = $('.cat__goods-card.is-copy .js-add-to-cart').clone().addClass('is-copy')	
	$('.footer').before($addToCart)

	// cart mobile version move availability under the image
	$('.cart__items-item').each(function(index, element){
		var $availability = $(element).find('.cart__items-availability').clone().addClass('is-copy')
		$(element).find('.js-image').append($availability)
	})
	//cart mobile version move delete button under content
	$('.cart__items-item').each(function(index, element){
		var $delete = $(element).find('.js-delete').clone().addClass('is-copy')
		$(element).find('.cart__items-text').append($delete)
	})

	//sub mobile verstion move category description under the image

	$('.sub__main-cat ').each(function(index,element){
		var $desc = $(element).find('.sub__cat-text').clone().addClass('is-copy')
		$(element).append($desc)
	})
	$('.sub__cat-text.is-copy').wrap('<div class="sub__cat-outer"></div>')


	//fav mobile version add buttons to put items into basket and delete all fav items

	// var $addFavToCart = $('.fav__main .js-main-submit').clone().addClass('is-copy js-add-to-cart')
	// var $deleteAllFav = $('.fav__main .js-deleteAll').clone().addClass('is-copy')

	// $('.fav__main .cart__items').prepend($deleteAllFav).prepend($addFavToCart)

	// fav mobile version change text in bottom button add to cart

	$('.tece-fav .js-main-submit:not(.is-copy)').html('Добавить все в корзину')

	$('.tece-fav .cat__confirm-header').html('Вы уверены, что хотите удалить товар из избранного?')
	
	// footer tablet version move social down

	var $social = $('.footer__social').clone().addClass('is-copy')
	$('.footer__copyright').append($social)
}

//header tablet version move last menu item into hidden block;


function moveLastMenuItems(){

	var elements = '.header-nav li'
	function discardChanges(){
		$(elements).removeClass('is-hidden')
		$('.header-nav-showMore').remove();
	}

	function determineWidth(){
		if (window.innerWidth > 880 && window.innerWidth < 1000) {
			moving(6,5);
		}
		else if(window.innerWidth < 880 && window.innerWidth < 1000) {;
			moving(5,4);
		}
		else if (window.innerWidth > 1000) {
			discardChanges()
		}
	}
	determineWidth()

	$(window).resize(function(){
		determineWidth()
		showMenuItems()
	})

	function moving(toHide, toAppend){

		discardChanges()
		
		$(elements + ':nth-child(n+'+toHide+')').addClass('is-hidden')
		var itemsToMove = $(elements + ':nth-child(n+'+toHide+')').clone().addClass('is-copy')

		$(elements + ':nth-child('+toAppend+')').after('<li class="header-nav-inner is-closed js-menu-items-tablet"></li>')
		$('.js-menu-items-tablet')
			.prepend(itemsToMove)
			.wrap('<li class="header-nav-showMore js-show-menu-items-tablet"></li>');	
	}		
}


function addBlockInMobile(){
	var cartSummary = '<div class="cart__content-summary cart__summary">Всего <span class="cart__summary-bold">33</span> товара <nobr>на сумму <span class="cart__summary-bold">150 000</span> р.</nobr></div>'
	$('.cart__main .cart__content').before(cartSummary);
	$('.checkout-main .col_wide').before(cartSummary)
}



// tags input

function makeTagsInput(){
	// $('.js-tags-input').tagsinput({
	// 	splitOn: ',',
	// 	focusClass: 'is-active'
	// });


	var $tags = $('.bootstrap-tagsinput .tag')

	$tags.each(function(index, element){
		$(element).append('<div class="cat__vars-picture"><img src="i/cat-var-1.png"></div>')
	})

	$('.js-tags-input').on('itemAdded', function(event) {
		var $tagsLast = $('.bootstrap-tagsinput .tag').last()
		$($tagsLast).append('<div class="cat__vars-picture"><img src="i/cat-var-1.png"></div>')

		
		setTimeout(function(){
			var $input = $('.js-tags-input').tagsinput('input');
			$input.val('')
		}, 0)
	});

	// fixed

	var $tagsForm = $('.cart__tags')
	var $cartAside = $('.cart__aside')


	$tagsForm.after('<div class="cart__tags-dupl"></div>')
	$cartAside.after('<div class="cart__aside-dupl"></div>')

	var $tagsFormDupl = $('.cart__tags-dupl')
	var $cartAsideDupl = $('.cart__aside-dupl')

	function setHeight() { 
		$tagsFormDupl.height($tagsForm.outerHeight())
		$cartAsideDupl.height($cartAside.outerHeight()+$tagsForm.outerHeight())
	}

	setHeight()
	$(window).load(setHeight)
	// $cartAsideDupl.css('height', $cartAside.height())
	
	position()
	
	

}

makeTagsInput()


function showPlaceholderInput(){
	$input = $('.bootstrap-tagsinput')
	if (!$input.length) return false;
	$placeholder = $input.find('input')

	$placeholder.addClass('is-hidden')

	$input.on('click', function(){
		$placeholder.removeClass('is-hidden').focus().attr('size', 1);
	})

	$('body').on('click', function (e) {			
		if (!$placeholder.hasClass('is-hidden') 
			&& !$(e.target).closest($input).length) {
				e.preventDefault()
				$placeholder.addClass('is-hidden')
			}
	})
}

showPlaceholderInput();


function position(){
	var $tagsForm = $('.cart__tags')
	var $cartAside = $('.cart__aside')
	var $tagsFormDupl = $('.cart__tags-dupl')
	if (!$tagsFormDupl.length) return false
	var $cartAsideDupl = $('.cart__aside-dupl')

	var $cartContent = $('.cart__items')

	var fixedStopClsnm = 'is-fixed-stop';
	var fixedClsnm = 'is-fixed';
	var activeClsnm = 'is-active';

	var asideMargin = 10

	var startFixed = $tagsFormDupl.offset().top > 0
		? $tagsFormDupl.offset().top
		: $tagsForm.offset().top

	var contentStart = $cartContent.offset().top
	var asideHeight = $cartAside.outerHeight()
	var formHeight = $tagsForm.outerHeight()
	var footerHeight = $('.botline').outerHeight()

	var endFixed = $cartContent.offset().top 
		+ $cartContent.outerHeight() 
		- asideHeight 
		- formHeight
	
	var asideFinishTop =  endFixed - formHeight - footerHeight - asideMargin

	if (($('.cart__items-item:not(.is-deleted)')).length <= 1 || $(window).width() < 1190) {
		$(window).off('scroll')

		$cartAside
			.removeClass(fixedStopClsnm)
			.removeClass(fixedClsnm)
			.removeAttr('style')
		$tagsFormDupl.removeClass(activeClsnm)
		$tagsForm.removeClass(fixedClsnm)
		return
	}


	var setPosition = function() {
		var sct = $(window).scrollTop()

		if (sct >= startFixed && sct < endFixed) {
			$tagsFormDupl.addClass(activeClsnm)
			$tagsForm.addClass(fixedClsnm)
			$cartAside
				.removeClass(fixedStopClsnm)
				.addClass(fixedClsnm)
				.removeAttr('style')
		}
		else if (sct >= endFixed) {
			$cartAside
				.removeClass(fixedClsnm)
				.addClass(fixedStopClsnm)
				.css({ top: asideFinishTop + 'px' })
		}
		else {
			$tagsFormDupl.removeClass(activeClsnm)
			$tagsForm.removeClass(fixedClsnm)
			$cartAside
				.removeClass(fixedStopClsnm)
				.removeClass(fixedClsnm)
				.removeAttr('style')
		}
	}

	setPosition()
	$(window).off('scroll').on('scroll', setPosition)

	

}


position();
$(window).load(function(){
	position();
})

$(window).resize(function(){
	position()
})
// promo form

function openPromoForm(){
	$form = $('.js-cart-promo-form')
	$buttonOpen = $('.js-cart-open-promo-form')
	$buttonSend = $('.js-cart-send-promo-form')
	$confirmMessage = $('.js-cart-confirm-promo')

	$buttonOpen.on('click', function(){
		$form.fadeIn(200, position)
		
	})

	$buttonSend.on('click', function(e){
		var answer = false;
		e.preventDefault()
		if (answer){
			$confirmMessage.addClass('cart__aside-confirm--success')
			$confirmMessage.html('Промокод активирован')
			$confirmMessage.fadeIn(200, position)
			

		}
		else {
			$confirmMessage.addClass('cart__aside-confirm--failure')
			$confirmMessage.html('Промокод недействительный')
			$confirmMessage.fadeIn(200, position)
		}
		
		
	})
}

openPromoForm()


// submit main form using external button

function submitExternal(){
	$(".js-main-submit").click(function() {
		$("#form-cart-items").submit();
	});

	
}


// manually increase item amounts

function manualIncrease(){
	var $manual = $('.js-manual')
	
	
	$manual.each(function(index, element){
		$(element).on('click', function(e){
			e.preventDefault()
			var parent = $(element).closest('.cart__items-buttons')	
			var $amount = $(parent).find('.js-amount')

			var amountVal = +$amount.val()

			if ($(element).hasClass('js-plus')){
				 $amount.val(amountVal+1)
			}
			if ($(element).hasClass('js-minus')){
				 if (amountVal - 1 > 0) $amount.val(amountVal-1)
			}
		})
	})

	
	
}

manualIncrease()


function detectIEAndEdge() {
	var ua = window.navigator.userAgent;

	var msie = ua.indexOf('MSIE ');
	if (msie > 0) {
		// IE 10 or older => return version number
		$('html').addClass('is-ie10orOlder')
	}

	var trident = ua.indexOf('Trident/');
	if (trident > 0) {
		// IE 11 => return version number
		$('html').addClass('is-ie11')
	}

	var edge = ua.indexOf('Edge/');
	if (edge > 0) {
		// Edge (IE 12+) => return version number
		$('html').addClass('is-ieEdge')
	}

	// other browser
	return false;
}

detectIEAndEdge();






//open confirmation popup
function openConfirm(){
	var $button = $('.js-delete')
	var $confirm = $('.js-confirm')
	var $back = $('.js-back')
	var $view = $('.cat__confirm')

	if (!$('.cat__confirm').length) return false;

	var $body = $('.all')
	var ESCAPE_KEYCODE = 27

	var $items = $('.cart__items-item').length
	// console.log($items);
	var deleted = 0;

	$button.on('click', function(e){
		e.preventDefault();
		$view.removeClass('is-closed')
		$body.removeClass('overlay-is-closed')
		var scrollBottom = $(document).height()
		$view.css({'height': scrollBottom})	

		var $item = $(this).closest('.cart__items-item')		

		$confirm.on('click', function(){			
			$($item).addClass('is-deleted').fadeOut(200, position)
			// deleted++;
			// console.log($items, deleted, $('.cart__items-item:not(.is-deleted)').length);
			if ( $('.cart__items-item:not(.is-deleted)').length === 0) {
				$deleteAll.fadeOut(200, position)
				$('.js-fav-full').hide();
				$('.js-fav-empty').css('display', 'flex');
				$('html, body').animate({
					scrollTop: $('.fav-cart-main').offset().top
				}, 400);
			}

			$view.addClass('is-closed')
			$body.addClass('overlay-is-closed')
		})

		$back.on('click', function(){			
			$view.addClass('is-closed')
			$body.addClass('overlay-is-closed')
		})
		
			
		$(document).on('keydown.paymentPopup', function(e) {
		if (e.keyCode == ESCAPE_KEYCODE) {
				e.preventDefault()
				$view.addClass('is-closed')
				$body.addClass('overlay-is-closed')
				$(document).off( "keydown.paymentPopup" )
			}
		});
			 
	})


	var $deleteAll = $('.js-deleteAll')
	

	$deleteAll.on('click', function(e){
		
		e.preventDefault();
		$view.removeClass('is-closed')
		$body.removeClass('overlay-is-closed')
		var scrollBottom = $(document).height()
		$view.css({'height': scrollBottom})	
		
		$('.cat__confirm-header').html('Вы уверены, что хотите удалить все товары из корзины?')
		$('.tece-fav .cat__confirm-header').html('Вы уверены, что хотите удалить все товары из избранного?')



		$confirm.on('click', function(){					
			$('.cart__items-item').addClass('is-deleted').fadeOut(200)
			$deleteAll.fadeOut(200)
			$('.js-fav-full').hide();
			$('.js-fav-empty').css('display', 'flex');

			$('html, body').animate({
				scrollTop: $('.fav-cart-main').offset().top
			}, 400);


			$view.addClass('is-closed')
			$body.addClass('overlay-is-closed')
		})

		$back.on('click', function(){			
			$view.addClass('is-closed')
			$body.addClass('overlay-is-closed')
		})
		
			
		$(document).on('keydown.paymentPopup', function(e) {
		if (e.keyCode == ESCAPE_KEYCODE) {
				e.preventDefault()
				$view.addClass('is-closed')
				$body.addClass('overlay-is-closed')
				$(document).off( "keydown.paymentPopup" )
			}
		});

		

		
	})

	$('body').on('click', function (e) {
		if (!$('.cat__confirm').hasClass('is-closed') 
			&& (!$(e.target).closest('.cat__confirm-inner').length
			&& (!$(e.target).closest('.js-delete').length 
			&& !$(e.target).closest('.js-deleteAll').length))) {
				e.preventDefault()
				$view.addClass('is-closed')
				$body.addClass('overlay-is-closed')

		}
	});

	
}

openConfirm()


function showBigImage(){
	var $images = $('.js-image')

	$(document).on('mouseenter','.js-image',function(){
		var bigImage = $(this).find('img').attr('rel');
		if(typeof bigImage != 'undefined'){
			$(this).before('<div class="cart__items-container"><div class="cart__items-preview"><img src="'+bigImage+'" alt="" /></div></div>');
		}
		
	})
	$(document).on('mouseleave','.js-image',function(){
		$(this).parent().find('.cart__items-container').remove();
	})
}

showBigImage()


// on click show additional menu items

function showMenuItems(){
	var $button = $('.js-show-menu-items-tablet')

	if (!$('.js-show-menu-items-tablet').length) return false

	var $menu = $('.js-menu-items-tablet')
	$button.on('click', function(){
		$menu.toggleClass('is-closed');
	})

	$('body').on('click', function (e) {
		if (!$menu.hasClass('is-closed') 
			&& (!$(e.target).closest('.js-show-menu-items-tablet').length
			&& !$(e.target).closest('.js-menu-items-tablet').length 
			)) {
				e.preventDefault()
				$menu.addClass('is-closed')
		}
	});
}
showMenuItems();


function validateEmail(email){
	var email = email.val()
	return email.indexOf('@') !== -1 && email.indexOf('.') !== -1 && email.lastIndexOf('.') > email.indexOf('@')

}

function showError(message, input, classOuter='partner__form-outer', classInner='partner__form-error js-partner-form-error'){
	var $input = $(input)
	if (!$input.siblings('.' + classOuter).length) {
			var error = '<div class='+ classOuter +'><div class='+ classInner +'>'+ message +'</div></div>'
			$input.after(error)
	}
}
function showText(message, status, btn){
	var $btn = $(btn)
	$btn.siblings('.partner__form-text').remove();

	var text = '<div class="partner__form-text partner__form-text--'+ status+'">'+ message+'</div>'
	$btn.after(text)
}
function validatePartnerForm(){
	var btn = $('.js-partner-form-btn')
	if (!btn.length) return false;

	var email = $('.js-partner-form-email input')
	var name = $('.js-partner-form-name input')
	var text = $('.js-partner-form-text textarea')
	var inputs = $('.partner__form-input, .partner__form-textarea')


	inputs.on( "invalid",
		function(e) {
			e.preventDefault();
	});

	email.on('blur', function(){
		if (email.val() != '' && !validateEmail(email) ) {
				showError('Неправильный формат e-mail', email)
			}
	})

	btn.on('click', function(){

		if (email.val() == '' ) {
			showError('Введите e-mail', email)
			showText('Заполните все поля', 'error', btn)
		}
		if (name.val() == '' ) {
			showError('Введите имя', name)
			showText('Заполните все поля', 'error', btn)
		}
		if (text.val() == '' ) {
			showError('Введите описание вашего бизнеса', text)
			showText('Заполните все поля', 'error', btn)
		}
		if (email.val() != '' && !validateEmail(email)) showError('Неправильный формат e-mail', email);
		if (email.val() != '' && validateEmail(email) && name.val() != '' &&  text.val() != '') showText('Спасибо за запрос. Менеджер партнерского отдела ответит вам в течение часа.','success', btn)
	})

	inputs.on('focus', function(){
		$(this).siblings('.partner__form-outer').remove();
		btn.siblings('.partner__form-text--error').remove()

	})

}
validatePartnerForm();

function moveToPartnerForm(){
	var $btn = $('.js-want-partner')
	var $form = $('.partner__form')

	$btn.on('click', function(){
		$('html, body').animate({
        scrollTop: $form.offset().top - 100
    }, 400, function(){
			$('.js-partner-form-name input').focus();
		});
	})
}
moveToPartnerForm();


//show yandex nav link or yandex map link

function isMobile(){
	(function (a) {
        (jQuery.browser = jQuery.browser || {}).mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4));
		})(navigator.userAgent || navigator.vendor || window.opera);			
    return jQuery.browser.mobile
}

function showMap() {
	var $btn = $('.js-open-map')
	if (!isMobile()) {
		$btn.html('Открыть в Яндекс.Картах')
		
	}
	$btn.attr('href','https://yandex.ru/maps/-/CBQhjSUndA')
}

showMap();

function printPage(){
	var $btn = $('.js-print')
	$btn.on('click', function(){
		window.print();
	})
}

printPage()

function makeRings(){
	var width = 519,
			height = 519;

	var svg = d3.select(".callback-rings").append("svg")
			.attr("width", width)
			.attr("height", height)
			.attr("fill", "white");

	svg.append("circle")
			.attr("class", "dot")
			.attr("transform", 'translate(0, 0)')
			.attr("r", 8);

	function draw(){
		svg.append("circle")
				.attr("class", "ring")
				.attr("transform", 'translate(300,300)')
				.attr("r", 6)
				.style("stroke-width", 1)
				.style("stroke", "#2154A7")
			.transition()
				.ease("linear")
				.duration(6000)
				.style("stroke-opacity", 1e-6)
				.style("stroke-width", 1)
				.style("stroke", "white")
				.attr("r", 200)
				.remove();
	}
	draw();
	setInterval(function() {
		draw();
	}, 750);
}

makeRings();

function showCountdown(){
	var $btn = $('.js-callback-button')
	var $countdown = $('.js-callback-countdown')

	$btn.addClass('inactive')
	$countdown.addClass('active')

	makeCountdown()
	
}



function makeCountdown(){
	var $countdownBlock = $('.js-callback-countdown')
	var $numberBlock = $countdownBlock.find('span')
	var number = $numberBlock.html()
	
	setInterval(function(){
		if (number-- > 0){
			$numberBlock.html(number)
		}
		else {
			$countdownBlock.fadeOut(200)
		}
	}, 1000)
}

function validateNumber(number){
	var number = +number.val().replace(/\D/g,'');
	//console.log(number.toString().length)
	return number.toString().length === 11

}
function validateCallbackForm(){

	var btn = $('.js-callback-button')
	if (!btn.length) return false;

	var input = $('.js-callback-input')
	$(input).mask('+7 999 999 99 99', {selectOnFocus: false, optional: true});

	input.on( "invalid",
		function(e) {
			e.preventDefault();
	});

	input.on('blur', function(){
		if (input.val() != '' && !validateNumber(input) ) {
				showError('Неправильный формат телефона', input, 'callback__form-outer', 'callback__form-error js-callback-form-error')
			}
	})

	btn.on('click', function(e){
		e.preventDefault();
		if (!validateNumber(input) ) {
			showError('Неправильный формат телефона', input, 'callback__form-outer', 'callback__form-error js-callback-form-error')
		}
		else {
			showCountdown();
		}
		
	})

	input.on('focus', function(){
		$(this).siblings('.callback__form-outer').remove();
	})

}

validateCallbackForm();

function openCallBack(){
	var $button = $('.js-button-do-callback')
	var $callback = $('.callback')

	if (!$('.callback').length) return false;

	var $body = $('.all')
	var ESCAPE_KEYCODE = 27

	$button.on('click', function(){
			 $callback.removeClass('is-closed')
			 $body.removeClass('overlay-is-closed')
			 var scrollBottom = $(document).height()
			 $callback.css({'height': scrollBottom})
			
			 $(document).on('keydown.paymentPopup', function(e) {
				if (e.keyCode == ESCAPE_KEYCODE) {
					e.preventDefault()
					$callback.addClass('is-closed')
					$body.addClass('overlay-is-closed')
					$(document).off( "keydown.paymentPopup" )
				}
			});
			 
	})
	$('.callback-close').on('click', function(e){
		//console.log(1)
		e.preventDefault()
		$callback.addClass('is-closed')
		$body.addClass('overlay-is-closed')

	})
	$('body').on('click', function (e) {

		if (!$('.callback').hasClass('is-closed') 
			&& (!$(e.target).closest('.callback-inner').length
			&& !$(e.target).closest('.js-button-do-callback').length)) {
				e.preventDefault()
				$callback.addClass('is-closed')
				$body.addClass('overlay-is-closed')

		}
	});

	

}
openCallBack()

$(document).ready(function () {
	if (typeof Swiper === 'undefined') return false
	
		var mySwiper = null;
		function initSwiper() {
				var screenWidth = $(window).width();
				//console.log(screenWidth)
				if	(screenWidth >= 540 && !mySwiper) { 
					// console.log(screenWidth > 540, mySwiper == null)           
					mySwiper = new Swiper ('.swiper-container', {
						// Optional parameters
						direction: 'horizontal',
						loop: true,
						width: 360,
						spaceBetween: 20,
						loop: true,
						slidesPerView: 'auto',
						loopedSlides: 5,
						pagination: {
							el: '.swiper-pagination',
							type: 'bullets',
							clickable: true,			
						},
						navigation: {
							nextEl: '.swiper-button-next',
							prevEl: '.swiper-button-prev',
						},
					})
				} 

				if (screenWidth < 539 && !!mySwiper) {
					// console.log(screenWidth < 539, mySwiper != null) 
					mySwiper.destroy();
					mySwiper = null;
					$('.swiper-wrapper').removeAttr('style');
					$('.swiper-slide').removeAttr('style');            
				}        
		}

		//Swiper plugin initialization
		$(window).load(function() {
			initSwiper();
		})

		//Swiper plugin initialization on window resize
		$(window).on('resize', function(){
				initSwiper();        
		});
		
	});

	function showAnswers() {
		var $button = $('.js-show-reason-btn')
		if (!$button.length) return false
		$button.on('click', function() {
			var $content = $(this).siblings('.js-show-reason-content')
			var $parent = $(this).closest('.js-show-reason-container')
			if (!$parent.hasClass('active')) {			
				$parent.addClass('active')
				$parent.siblings('.js-show-reason-container').removeClass('active')
	
			}
			else {
				$parent.removeClass('active')
			}
		})
	}
	
	showAnswers()

	function switchColors(){
		var $btn = $('.js-show-color-btn')
		if(!$btn.length) return false
		var $parent = $('.js-show-color-container')
	
		$btn.on('click', function(){
			if(!$(this).hasClass('active')) {
				var color = $(this).attr('data-color');
				$(this).addClass('active')
				$(this).siblings('.js-show-color-btn').removeClass('active')
				$parent.removeClass().addClass('partner__colors js-show-color-container js-show-color--'+color)
			}

		})
	}
	switchColors();

	function openExportFav(){
		var $button = $('.js-show-export-popup')
		var $popup = $('#popUpFav')
	
		if (!$('#popUpFav').length) return false;
	
		var $body = $('.all')
		var ESCAPE_KEYCODE = 27
	
		$button.on('click', function(){
				 $popup.removeClass('is-closed')
				 $body.removeClass('overlay-is-closed')
				 var scrollBottom = $(document).height()
				 $popup.css({'height': scrollBottom})
				
				 $(document).on('keydown.paymentPopup', function(e) {
					if (e.keyCode == ESCAPE_KEYCODE) {
						e.preventDefault()
						$popup.addClass('is-closed')
						$body.addClass('overlay-is-closed')
						$(document).off( "keydown.paymentPopup" )
					}
				});
				 
		})
		$('.close').on('click', function(e){
			e.preventDefault()
			$popup.addClass('is-closed')
			$body.addClass('overlay-is-closed')
	
		})
		$('body').on('click', function (e) {
			
			if (!$('#popUpFav').hasClass('is-closed') 
				&& (!$(e.target).closest('.popUpFav-inner').length
				&& !$(e.target).closest('.js-show-export-popup').length)) {
					e.preventDefault()
					$popup.addClass('is-closed')
					$body.addClass('overlay-is-closed')
	
			}
		});
	
		
	
	}
	openExportFav()


	function openMessagingPopup() {
		var $button = $('.js-show-messaging-popup')
		var $popup = $('#messagingPopup')
	
		if (!$('#messagingPopup').length) return false;
	
		var ESCAPE_KEYCODE = 27
	
		$button.on('click', function(){
				$popup.addClass('active')
				 $(document).on('keydown.messagingPopup', function(e) {
					if (e.keyCode == ESCAPE_KEYCODE) {
						e.preventDefault()
						$popup.removeClass('active')
						$(document).off( "keydown.messagingPopup" )
					}
				});
				 
		})
		$('.js-close-messaging').on('click', function(e){
			
			e.preventDefault()
			$popup.removeClass('active')
	
		})
		$('body').on('click touchend', function (e) {
			
			if (($('#messagingPopup').hasClass('active') 
				&& (!$(e.target).closest('#messagingPopup').length 
				&& !$(e.target).closest('.js-show-messaging-popup').length))
				||$(e.target).closest('.js-close-messaging').length ) {
					e.preventDefault()
					$popup.removeClass('active')	
			}
		});
	}
	openMessagingPopup();
});

