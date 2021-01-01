// иммитация select
function netcatru_sel ( value_id, value, hidden_id, cur_id ) {
	$( '#' + cur_id ).html( netcatru_htmlspecialchars(value) );
	$( '#' + hidden_id ).attr( 'value', netcatru_htmlspecialchars(value_id) );

	if (typeof(add_edit_copy)!='undefined' && add_edit_copy ) {
		netcatru_modules(value_id);
	}
}

function netcatru_htmlspecialchars(text) {
	var chars = Array("&", "<", ">", '"', "'");
	var replacements = Array("&amp;", "&lt;", "&gt;", "&quot;", "&#039");
	for (var i=0; i<chars.length; i++) {
			var re = new RegExp(chars[i], "gi");
			if(re.test(text)) {
					text = text.replace(re, replacements[i]);
			}
	}
	return text;
}

// Функция для добавления в закладки избранного | http://sheensay.ru
function addFav() {
    var isWebkit, isMac;
    var UA = navigator.userAgent.toLowerCase();
    var title = document.title;
    var url = document.location;

    // Webkit (Chrome, Opera), Mac
    if ( (isWebkit = (UA.indexOf('webkit') != -1)) || (isMac = (UA.indexOf('mac') != -1)) ){
        alert('Нажмите "Ctrl/Cmd + D" для добавления страницы в закладки');
        return false;
    }

    // IE
    if (window.external) {
    window.external.AddFavorite(url, title);
    return false;
    }
}
// Очистить список партнеров в куках
function deleteAllTenderCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
    	var cookie = cookies[i];
    	var eqPos = cookie.indexOf("=");
    	var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    	if ( name.indexOf("tender")>-1 ) {
			setCookie(name, 0, { expires: -1, path: "/", domain: ".netcat.ru"});
	   	}
    }
}

// Добавить в куки
function setCookie(name, value, options) {
	options = options || {};

	var expires = options.expires;

	if (typeof expires == "number" && expires) {
		var d = new Date();
		d.setTime(d.getTime() + expires*1000*3600*24);
		expires = options.expires = d;
	}
	if (expires && expires.toUTCString) {
		options.expires = expires.toUTCString();
	}

	value = encodeURIComponent(value);

	var updatedCookie = name + "=" + value;

	for(var propName in options) {
		updatedCookie += "; " + propName;
		var propValue = options[propName];
		if (propValue !== true) {
			updatedCookie += "=" + propValue;
		}
	}

	document.cookie = updatedCookie;
}

$(function(){

	var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
	var isFirefox = typeof InstallTrigger !== 'undefined';
	var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
	var isChrome = !!window.chrome && !isOpera;
	var isIE = /*@cc_on!@*/false || !!document.documentMode;
	var is_touch_device = 'ontouchstart' in document.documentElement;
	var is_windows_touch = false;
	if (navigator.userAgent.toLowerCase().indexOf("windows phone") != -1) {is_windows_touch = true;}
	var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
	if (isOpera) {$('html').addClass('opera')}
	if (isFirefox) {$('html').addClass('ff')}
	if (isSafari) {$('html').addClass('safari')}
	if (isChrome) {$('html').addClass('chrome')}
	if (isIE) {$('html').addClass('ie')}

	if (is_touch_device) {$('html').addClass('touch');}
	if (is_windows_touch) {$('html').addClass('wp');}
	if (isAndroid) {$('html').addClass('android');}

	function isIEVersion() {
		var myNav = navigator.userAgent.toLowerCase();
		return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
	}

	if(isIEVersion() == 9) {$('html').addClass('ie9');}
	var waitForFinalEvent = (function () {
	  var timers = {};
	  return function (callback, ms, uniqueId) {
	    if (!uniqueId) {
	      uniqueId = "Don't call this twice without a uniqueId";
	    }
	    if (timers[uniqueId]) {
	      clearTimeout (timers[uniqueId]);
	    }
	    timers[uniqueId] = setTimeout(callback, ms);
	  };
	})();

// Демо-сайт


	if ( $('.demoOnline-form').length ) {
		$('.demoOnline-form input').focus(function() { $(this).removeClass('error'); });
        $('.demoOnline-form').submit(function(e) {
            e.preventDefault();

            var email_obj = $(this).find('#demo_email'),
            	email = email_obj.val(),
            	error = $(this).find('p.error'),
            	edition = $(this).find('#demo_edition_min').val(),
            	p_success = $('.demoPromo p.success'),
				pattern = /[0-9a-z_]+@[0-9a-z_-]+\.[a-z]{2,5}/i,
				demo_title = $(this).find('#demo_edition').val() +' Demo',
				template = $(this).find('#demo_template').val(),
				load_text = 'Ваш магазин устанавливается, это займёт до 10 минут. Как только всё будет готово, мы пришлём вам письмо с инструкциями на адрес '+ email + '<br/><img src="/netcat/admin/skins/v5/img/loader-20.gif" alt="Loading..." />';

			// Проверка e-mail
			if ( (!pattern.test(email) || email == '') && $('#demo_email').length ) { email_obj.addClass('error'); error.show(); }
			else {
				email_obj.removeClass('error');

				// Заглушка установки
				$('.demoOnline-form-content').hide();
				error.hide();
				p_success.html(load_text).show();

				// Создание демо-сайта
	            $.get( '/demo.php', {'template': template, 'registered': false, 'email': email, 'edition': edition, site_title: demo_title, live_install: 1 },
	                function(data){
	                    var obj = $.parseJSON( data );
	                    if (obj.success == 1) {
	                    	console.log('demo site installed', obj);
	                        demo_registered = true;
	                        p_success.html('<strong>Ваш новый сайт готов!</strong><br/> На почту: '+ email +' было отправлено письмо с&nbsp;инструкциями.<br/><br/>').show();

							// Событие facebook
							try {
								fbq('track', 'DemositeCreated'); console.log('fb: DemositeCreated');
							} catch(e) { console.log('Ошибка ' + e.name + ": " + e.message); }

							// Событие для метрики
							if (typeof yaCounter33990055 == 'object') {
								yaCounter33990055.reachGoal('DEMOSITE_CREATE');
								console.log('yaCounter: DEMOSITE_CREATE');
							}

	                        if (obj.live_install_result) {
	                            demo_url = obj.site_url;
	                            demo_password = obj.password;

		                        p_success.html('\
		                        	<strong>Ваш новый сайт готов!</strong><br/> \
									На вашу почту было отправлено письмо с&nbsp;инструкциями.<br/><br/> \
									Логин: admin<br/> \
									Пароль: '+ demo_password +'<br/><br/> \
									<a href="'+ demo_url +'" target="_blank">Сайт</a>').show();
		                        p_success.append('\
									<form id="form_go_admin" target="_blank" action="'+ demo_url +'netcat/admin/" method="post"> \
										<input type="hidden" name="AuthPhase" value="1"/> \
										<input type="hidden" name="NEW_AUTH_LANG" value="Russian" /> \
										<input type="hidden" name="AUTH_USER" value="admin" /> \
										<input type="hidden" name="AUTH_PW" value="'+ demo_password +'" /> \
										<a href="#" onclick="$(\'#form_go_admin\').submit(); return false;">Панель управления</a> \
									</form>');
		                    }
	                    } else {
	                        error.html('Ошибка установки сайта').show();
	                    }
	                }
	            );

			}
            return false;
        });
	}



    // До конца распродажи осталось
	if ( $('#sale_days').length ) {
		var now = new Date(),
			days = 2 - now.getDate(),
			days_html = days +' '+ declOfNum(days, ['день', 'дня', 'дней']);
		$('#sale_days').html(days_html);
	}

    // Скрол к форме стать партнером
	if ( $('#be_a_partner').length ) {
		$('body,html').animate({scrollTop: $('#be_a_partner').position().top + 40}, 400);
	}


	// Купить редакцию
	$('.buy_edition').click( function(){

		// yandex
		if (typeof yaCounter17835757 == 'object') { yaCounter17835757.reachGoal('PutCart'); }

		window.dataLayer = window.dataLayer || [];

		var Yadata = $('#dataLayer'),
			id = Yadata.data('id'),
			name = Yadata.data('name'),
			price = Yadata.data('price');

		dataLayer.push({
		    "ecommerce": {
		        "add": {
		            "products": [
		                {
		                    "id": id,
		                    "name": name,
		                    "price": price,
		                    "brand": "Netcat",
		                    "category": "Редакция CMS Netcat",
		                    "quantity": 1
		                }
		            ]
		        }
		    }
		});
		console.log('Goal: yaCounter:ecommerce:add');


		// Событие Facebook
		try {
			fbq('track', 'AddToCart'); console.log('fb: AddToCart');
			fbq('track', 'InitiateCheckout'); console.log('fb: InitiateCheckout');
		} catch(e) { console.log('Ошибка ' + e.name + ": " + e.message); }

		// GA
		ga('send', 'pageview', '/AddToCmsCart');
		ga('send', 'event', 'Добавление CMS в корзину', 'Добавление CMS в корзину');
		console.log('Goal: Добавление CMS в корзину');

		if (typeof yaCounter33990055 == 'object') {
			yaCounter33990055.reachGoal('AddToCmsCart');
			console.log('Goal: yaCounter AddToCmsCart');
		}

		$('#form_buy #edition_id').attr('name','cart[134][' + $(this).attr('data-id') + ']');
		$('#form_buy').submit();
		$(this).after('<p>Редакция добавлена в корзину</p>');
		$(this).remove();
		return false;
	});

	// переход к оплате
	$('.go_payment').click( function(){
		try {
			// GA
			ga('send', 'pageview', '/РroceedРayment');
			ga('send', 'event', 'Перешел к оплате', 'Перешел к оплате');
			console.log('Goal: Перешел к оплате');

	        if (typeof yaCounter33990055 == 'object') {
	            yaCounter33990055.reachGoal('РroceedРayment');
	            console.log('Goal: yaCounter РroceedРayment');
	        }
		}
		catch(e) {}
		return true;
	});

	// оплата
	$('#pay').click( function(){
		// Событие facebook
		try {
			fbq('track', 'Purchase', {value: $(this).data('money'), currency: 'RUB'});
			console.log('fb: Purchase', $(this).data('money')); }
		catch(e) { console.log('Ошибка ' + e.name + ": " + e.message); }

		// Событие для метрики
		if (typeof yaCounter33990055 == 'object') {
			yaCounter33990055.reachGoal('ONLINE_PAY');
			console.log('yaCounter: ONLINE_PAY');
		}

		// GA
		ga('send', 'pageview', '/BuyCart');
		ga('send', 'event', 'Заказ оплачен', 'Заказ оплачен');
		console.log('Goal: Заказ оплачен');

		return true;
	});

	// Отмена заказа
	$('.delete_order').click( function(){
		try {
			// GA
			ga('send', 'event', 'Заказ отменен', 'Заказ отменен');
			console.log('Goal: Заказ отменен');

	        if (typeof yaCounter33990055 == 'object') {
	            yaCounter33990055.reachGoal('OrderCancelled');
	            console.log('Goal: yaCounter OrderCancelled');
	        }
		}
		catch(e) {}
		return true;
	});


	// Удалить товар из корзины
	$(document).on('click','.del', function() {

		var Yadata = $('.dataLayer'),
			id = Yadata.data('id'),
			name = Yadata.data('name');

		window.dataLayer = window.dataLayer || [];

		dataLayer.push({
			"ecommerce": {
			    "remove": {
			        "products": [
			            {
		                    "id": id,
		                    "name": name,
			                "category": "Редакция CMS Netcat"
			            }
			        ]
			    }
			}
		});
		console.log('Goal: yaCounter:ecommerce:remove');

		$('#hidden').html('<input type=\'hidden\' name=\'' + this.name + '\' value=\'-1\' />');
		$.post('', $('#netshop_cart_contents').serialize()).done(function(){ location.reload(); });
		return false;
	});



    // Переход к партнерам
	$('#go_to_partners').on('click', function(e){
		e.preventDefault();
		$('body,html').animate({scrollTop: $('#partners').position().top}, 400);
	});
    // Переход к партнерам
	$('#go_rating').on('click', function(e){
		e.preventDefault();
		$('body,html').animate({scrollTop: $('.section.rate').position().top + 10}, 400);
	});

    // Переход к модулям партнеров
	if ( $('#go_catstore').length ) {
		setTimeout(function(){
			$('body,html').animate({scrollTop: $('.section.partWorksFilter').position().top + 10}, 400);
		}, 400);
	};

    // Переход к партнерам
	$('#show_advices').on('click', function(e){
		e.preventDefault();
		$(this).parent().hide();
		$('.advices .advices-item').show();
	});

	// Переход в тендер с выбранными партнерами
	if ( $('.go_tender').length ) {
		$('.go_tender').on('click', function(e){
			e.preventDefault();
			var href = $(this).attr('href'), selected_partners =[];
			$('.tbl-row.checked').each(function(){ selected_partners.push($(this).data('id')); });
			window.location.href = href + '?partners=' + selected_partners.join();
		});
	}

	// Список в истории
	if ( $('.change-full').length ) {
		$('.change-full').on('click', function(e){
			e.preventDefault();

			var text = $(this).text();
			$(this).text(text == "Полный список изменений" ? "Свернуть полный список изменений" : "Полный список изменений");

			$(this).parent().find('.change-full-data').toggle();
			$(this).parent().find('.change-small-data').toggle();
			$('body,html').animate({scrollTop: $(this).parent().position().top + 10}, 400);
		});
	}

	$('.addTenderList').on('click', function(e){
		e.preventDefault();
		if (!$(this).hasClass('disabled')) {
			setCookie('tender['+$(this).data('id')+']', 1, { expires: 365, path: "/", domain: ".netcat.ru"});
			$(this).html('Приглашен в тендер').addClass('disabled');
		}
	});
	$('.cleanTenderList').on('click', function(){
		deleteAllTenderCookies();
		return true;
	});

	if ( $('.post_showText').length ) {
		$('.post_showText').on('click', function(){
			$(this).parents('.post').find('.visibleText').hide();
			$(this).parents('.post').find('.hiddenText').show();
			return false;
		});
	}

	// Подгрузка сообщенией в блоге
	if ( $('#post_load').length ) {
		var ajaxLoading = false;

		$(window).bind('scroll', function() {

			var ws = $(window).scrollTop(),		// Scroll height
				wh = $(window).height(),		// Current window height
				dh = $(document).height(),		// All page height
				ah = 800;						// ~ Header + Footer + Delta

			var url = $('#post_load').data('url'),
				year = $('#post_load').data('year'),
				last_post_date = $('.post').last().data('date');

			if ( ((ws+wh) > (dh-ah)) && !$('#nomore').length && !ajaxLoading ) {

				ajaxLoading = true;
				$('#post_load').show();

				$.post(url, "isNaked=1&date="+last_post_date+"&year="+year ).success(function(data){
					$('.post').last().after(data);
					$('#post_load').hide();
					ajaxLoading = false;
					if (window.pluso) { pluso.start(); }
				});
			}
		});
	}

	// Переход к комментариям блога
	if ( $('.post-comments').length && ""!==document.location.hash && document.location.hash.substr(1) == 'comments') {

		$('body,html').animate({scrollTop: $('.post-comments').position().top + 10}, 400);

		setTimeout(function(){
			$('body,html').animate({scrollTop: $('.post-comments').position().top + 10}, 400);
		}, 400);
	}

	if ( $('.edCompare').length && ""!==document.location.hash && document.location.hash.substr(1) == 'table') {

		$('#edition-compare-button').html('Свернуть сравнение');
		$('.edCompare').addClass('active');

		setTimeout(function(){
			if (sticky3) {
				sticky3.update();
				$('.edCompare-header.sticky-fxd, .edCompare-header.sticky-abs').addClass('active');
				$('body,html').animate({scrollTop: $('#table').position().top + 10}, 400);
			}
		}, 400);
	}

	if ( $('.section.tender').length ) {
	    // Закрыть инфо в тендере
		$('.tender .rateFilter .info .close').on('click', function(e){
			e.preventDefault();
			$(this).parent().fadeOut(300);
		});

	    // Выбрать топ
		$('.tender .select-top').on('click', function(e){
			e.preventDefault();
			$('#tenderList .inner').animate({scrollTop: 0}, 400);
			$('body,html').animate({scrollTop: $('.section.rateFilter').position().top + 80}, 400);

			var top = $(this).attr('id')=='selectTop5' ? 5 : 10,
				cnt = 0;

			$('.tbl-row').each(function(){
				var $inp1 = $(this).find('input.checkbox'),
					$inp2 = $(this).find('input.selected_partner');

				if ($(this).index() < top && $(this).is(':visible')) {
					$inp1.prop('checked','checked');
					$inp2.val(1);
					$(this).addClass('checked');
					cnt++;
				} else {
					$inp1.prop('checked','');
					$inp2.removeAttr('value');
					$(this).removeClass('checked');
				}
			});

			setTenderCount(cnt);
		});
	}

	// Включеные выбранных партнеров (переход из рейтинга)
	if ( $('#selected_partners').length ) {
		var selected_partners_cnt = 0;

		$('.tbl-row').each(function(){
			var $inp1 = $(this).find('input.checkbox'),
				$inp2 = $(this).find('input.selected_partner');

			if ($(this).is(':visible')) {
				$inp1.prop('checked','checked');
				$inp2.val(1);
				$(this).addClass('checked');
				selected_partners_cnt++;
			}
		});

		setTenderCount(selected_partners_cnt);
		hideScrollBar();
	}


	$('.corretPhoto').each(function(){
		if (!$('.corretPhoto img').length) return;
	});

	if ($('.partners-item').length) {
		$('.partners-item').hover(function(){
			var color = $(this).children().attr('data-hover_src'),
				norm  = $(this).children().attr('src');
			$(this).children().attr('src', color).attr('data-hover_src', norm);
		}, function(){
			var norm  = $(this).children().attr('data-hover_src'),
				color = $(this).children().attr('src');
			$(this).children().attr('src', norm).attr('data-hover_src', color);
		});
	}


	// авторизация
	$('#auth_form').submit(function() {
		var data = $(this).serialize() + '&isNaked=1&aj=1';
		$.post("/netcat/add.php", data,"json" ).done(function(resp){ auth_response(resp);});
		$('input').each(function() { $(this).attr('disabled', 'disabled'); });
		return false;
	});

	// регистрация
	$('#reg_form').submit(function() {
		$.post("/netcat/add.php", $(this).serialize() + '&isNaked=1&aj=1',"json" ).done(function(resp){reg_response(resp);});
		$('input').each(function() { $(this).attr('disabled', 'disabled'); });
		return false;
	});


	// перехват ответа по регистрации
	function reg_response ( resp ) {

		var resp = JSON.parse(resp);

		$('input').each ( function() { $(this).removeAttr('disabled'); } );

		if ( resp.status == 'error' ) {
			$('#reg_status').html(resp.text);
			$('#reg_status').css( 'display', 'block');
			return 0;
		}
		if ( resp.status == 'ok' ) {
			$('#reg_status').html(resp.text);
			$('#reg_status').css( 'display', 'block');
			$('#reg_status').css( 'color', '#000000');
			$('#reg_intro').css( 'display', 'none');
			$('#reg_input').css( 'display', 'none');
			window.location.reload();
			return 0;
		}
	}

	// пришел ответ по авторизации
	function auth_response ( resp ) {
		$('input').each ( function() { $(this).removeAttr('disabled'); } );

		if ( resp == "{ 'status' : 'error'}" ) {
			$('#auth_status').html('Не угадали, попробуйте еще раз.');
			$('#auth_status').css( 'display', 'block');
			return false;
		} else {

			var response_json = JSON.parse(resp);

			if ( response_json.status == 'ok' ) {

				$('.header-user').html(response_json.user_link);
				$('.userMenu .userMenu-photo').html(response_json.user_photo);
				$('.userMenu .userMenu-name').html(response_json.user_name);

				// Для партнеров
				if (response_json.is_partner) {
					$('.userMenu').removeClass('userMenu--ordinary').addClass('userMenu--partner');
					$('.userMenu .userMenu-wrap').prepend($('.userMenu .logout'));
					$('.userMenu .userMenu-content').html('<div class="userMenu-col col--1"><a href="/forclients/my/orders/"><strong>Заказы</strong></a><a href="/forclients/my/copies/"><strong>Лицензии</strong></a><a href="/forclients/support/tickets/"><strong>Техническая поддержка</strong></a></div><div class="userMenu-col col--2"><a href="http://partners.netcat.ru/partners/">Партнерский профиль</a><a href="http://partners.netcat.ru/partners/admin/portfolio/">Портфолио</a><a href="http://partners.netcat.ru/partners/admin/sert/">Кейсы</a><a href="http://partners.netcat.ru/partners/admin/tenders/">Входящие заказы</a></div><div class="userMenu-col col--3"><a href="http://partners.netcat.ru/partners/admin/upravlenie-sotrudnikami/">Сотрудники</a><a href="http://partners.netcat.ru/partners/community/blogs/">Блоги</a><a href="http://partners.netcat.ru/partners/met/banners/">Материалы</a><a href="http://partners.netcat.ru/partners/contacts/">Контакты</a></div>');
				}

				$('.userPopup').removeClass('active');

				searchHelpers();
				userMenu();

				return false;
			} else  {
				$('#auth_status').html('Не угадали, попробуйте еще раз.');
				$('#auth_status').css( 'display', 'block');
				return false;
			}
		}
	}


	// Фикс меню
	$('.sublist .sublist-col.col--4 a').each(function(){
		var href = $(this).attr('href');
		if (href == '/products/editions/' || href == '/products/about/' || href == '/products/services/') { $(this).remove(); }
	});


	var MOUSE_WHEEL_SPEED;
	var isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;

	if (!isMac) MOUSE_WHEEL_SPEED = 20;
	else MOUSE_WHEEL_SPEED = 2;


	// ! helpers

	function is_phone() {
		if ($('.detector .l4').is(':visible')) return true;
		else return false;
	}

	function is_tablet() {
		if ($('.detector .l3').is(':visible')) return true;
		else return false;
	}



	// ! search focus delegate

	function searchFocusDelegate() {

		var $s = $('.search:not(".header-search")');
		if (!$s.length) {return false;}

		$s.find('input').on('focus', function(){
			$s.addClass('focus');
		}).on('blur', function(){
			$s.removeClass('focus');
		});

	};

	searchFocusDelegate();


	// ! search dropdown

	function searchHelpers() {

		var $s = $('.header-search');
		if (!$s.length) {return false;}

		var $close = $('.search-close'),
			$i = $('.search-icon'),
			$list = $('.search-list'),
			$items = $('.search-item');

		$s.find('input').on('focus', function(){
			var vl = $(this).val();
			$s.addClass('focus');
			$list.stop(true, true).slideDown(200);
			setTimeout(function(){
				searchStr(vl);
			}, 250);
		}).on('blur', function(){
			$s.removeClass('focus');
			$list.stop(true, true).slideUp(200);
		}).on('keyup change', function(){
			var vl = $(this).val();
			searchStr(vl);
		});


		$('html').on('click', function(e){
			if (!$(e.target).closest('.header-search').length) {
				$s.removeClass('focus');
				$('.search-list').stop(true, true).slideUp(200);
			}
		});

		$i.on('click', function(e){
			e.preventDefault();
			$s.addClass('shwn focus');
			setTimeout(function(){
				$s.find('input').focus();
			}, 250);
		});

		$close.on('click', function(e){
			e.preventDefault();
			$s.removeClass('shwn')
		});

		var $u = $('.header-user'),
			delta = 75;

		function onItemClick() {
			$('.search-item').on('click', function(e){
				e.preventDefault();
				setValue($(this).text());
			});
		};

		function setValue(val) {
			$s.find('input').val(val);
			searchStr(val);
			$s.find('input').focus();
		};

		function setOffset() {
			if ($('.user-login:visible').length) delta = 50;
			var r = $u.width() + parseInt($u.css('right')) + delta;
			$s.removeAttr('style').css({'right':r+'px'});
			if ( $('.header .cart').length ) { $('.header .cart').removeAttr('style').css({'right':r+ 54 +'px'}); }
		};

		function searchStr(str) {
			if (str == '') {
				$list.find('.search-item').show();
				return;
			}

			$items.each(function(){
				var $this = $(this);
				if ($this.text().toLowerCase().indexOf(str.toLowerCase()) < 0) $this.hide();
				else $this.show();
			});

			// hack for scrollpane
			var h = Math.min( ($('.search-item:visible').length * $('.search-item:first').outerHeight()), 170);
			$('.jspContainer').height(h);

			var api = $list.data('jsp');
			if (api) api.reinitialise();
			else $list.jScrollPane({
				mouseWheelSpeed: MOUSE_WHEEL_SPEED
			});

		};

		onItemClick();
		setOffset();
		$(window).resize(function(){setOffset()});

	};


	searchHelpers();


	// ! user menu

	function userMenu() {

		var $link = $('.user-pic, .user-name'),
			$pic = $('.user-pic'),
			$photo = $('.userMenu-photo'),
			timer = 200,
			open = false;
		if (!$link.length) {return false;}

		// fish
		var userType = 'ordinary';
		if ($('.userMenu--partner').length) userType = 'partner';



		$('html').on('click', function(e){
			if (open && !$(e.target).closest('.userMenu').length && !$(e.target).closest('.user').length) {
				$('.userMenu').fadeOut(timer);
				open = false;
			} else if (open && $(e.target).closest('.user').length) {
				$('.userMenu').fadeOut(timer);
				open = false;
			}
			else if (!open && $(e.target).closest('.user').length) {
				e.preventDefault();
				$('.userMenu--'+userType).fadeIn(timer);
				open = true;
			}
		});

		if ($photo.find('img').length) {
			$photo.addClass('contains-img');
			var source = $photo.find('img').attr('src'),
				source2 = $pic.find('img').attr('src'),
				tpl = '<div class="user-avatar" style="background:url('+source+') no-repeat center; background-size:cover;"></div>',
				tpl2 = '<div class="user-avatar" style="background:url('+source2+') no-repeat center; background-size:cover;"></div>';
			$photo.prepend(tpl);
			$pic.prepend(tpl2);
			$photo.find('img').remove();
			$pic.find('img').remove();
		}

	};

	userMenu();


	// ! redats

	function redactsMenu() {

		var $m = $('.redacts');
		if (!$m.length) {return false;}

		var $close = $('.red-close'),
				$link = $('.js-choose-yours'),
				timer = 300;

		$link.on('click', function(e){
			if (!$(e.target).closest('.dashed').length) {
				window.location.href = $(this).data('href');
			}
		});

		$link.find('.dashed').on('click', function(e){
			e.preventDefault();
			$m.fadeIn(timer);
			setTimeout(function(){$m.removeClass('noPointerEvents')}, timer+100);
		});

		$close.on('click', function(e){
			e.preventDefault();
			$m.addClass('noPointerEvents').fadeOut(timer);
		});

		$('html').on('click', function(e){
			if (!$(e.target).closest('.redacts').length && !$(e.target).closest('.promo-box').length) {
				$m.addClass('noPointerEvents').fadeOut(timer);
			}
		});

	};

	redactsMenu();


	// ! dropdown

	function dropDown() {

		var $sel = $('.select');
		if (!$sel.length) {return false;}

		$sel.each(function(){

			var $select = $(this),
				$hidden = $select.find('input[type="hidden"]'),
				$value = $select.find('.select-val'),
				$list = $select.find('.select-list'),

				listClass = 'select-list',
				selectClass = 'select';

			function appendRealSelect()	{
				var template =  '<select id="'+$hidden.attr('name')+'">';

				$list.find('li').each(function(){
					var $this = $(this);
					template += '<option value="'+$this.attr('data-value')+'">'+$this.text()+'</option>';
				});

				template += '</select>';

				$select.append(template);
			};

			function showList() {
				$list.addClass('active');
				$select.addClass('active');
			};
			function hideList() {
				$list.removeClass('active');
				$select.removeClass('active');
			};

			function changeValue($item) {
				var t = $item.text();
				var v = $item.attr('data-city');
				var r = $item.attr('data-reg');

				$value.text(t);
				$hidden.val(v).trigger('change');

				if ($('#feature_select').length) {
					var $panels = $('[data-rel="tabs-3"]'),
						idx = $item.index();
					$panels.find('.tab-panel').hide();
					$panels.find('.tab-panel[data-index="'+idx+'"]').show();
				}

				if ($('.partWorks').length) {
					var val = $item.attr('data-value'),
						sort = $item.attr('data-sort');
					partWorksCols(val, sort);
				}

				if ($('#select_partners').length) {
					$.ajax({
						url: '/ordersite/partners/?nc_ctpl=779&isNaked=1&select_city='+ v + '&select_region=' + r,
						success: function(resp) { $('#select_partners').html(resp); }
					});
				}

				if ($('#tenderList').length) {
					var type = $item.attr('data-type');
					var checkbox = $('.rateFilter-label input:checked').length ? ($('.rateFilter-label input:checked').attr('name')=='ch1' ? 1 : 2 ) : 0;
					var city = $('.ratePopup a.active').attr('data-city');
					var region = $('.ratePopup a.active').attr('data-reg');

					$('#notFound').hide();
					$('#tenderList').attr('data-type', type);

					$.ajax({
						url: window.location.pathname + '?isNaked=1&type_checkbox='+ checkbox +'&select_city='+ city +'&select_region=' + region +'&type=' + type,
						success: function(resp) {
							$('#partners_list').html(resp);
							if ($('#partners_list .tbl-row').length<1) { $('#notFound').show(); }
							setTenderCount(0);
							hideScrollBar();
							check_filters(type);
						}
					});
				}

				if ($('#forum').length) {
					var val = $item.attr('data-value');
					$hidden.val(val);
					url = 'http://' + window.location.hostname + window.location.pathname +'?sort='+ $('#forum_sort_types').val() +'&sortDir=' + $('#forum_sort_order').val();
					window.location.href = url;
				}

				if ($('#forum_search').length) {
					var val = $item.attr('data-value');
					$hidden.val(val);
				}
			};

			function partWorksCols(type, sort) {

				if (sort) {

					var $container = $('.partWorks .cols'),
						$elements = $container.children('.col');

					$elements.sort(function(a,b){
						var attr = sort == 1 ? 'name' : 'price',
							a_sort = a.getAttribute('data-'+attr),
							b_sort = b.getAttribute('data-'+attr);

						if (sort == 1) {

							if (a_sort && b_sort) {
								return a_sort.toUpperCase().localeCompare(b_sort.toUpperCase());
							}

							return 0;

						} else if ( sort == 2 )  {

							return (parseInt(a_sort,10) < parseInt(b_sort,10)) ? -1 : (parseInt(a_sort,10) > parseInt(b_sort,10)) ? 1 : 0;

						} else if ( sort == 3 )  {

							return (parseInt(a_sort,10) > parseInt(b_sort,10)) ? -1 : (parseInt(a_sort,10) < parseInt(b_sort,10)) ? 1 : 0;

						}
					});

					$elements.detach().appendTo($container);

				}

				var hiddens = 0,
					showAll = $('.allModules .button').hasClass('active') ? true : false;

				$('.partWorks .col').removeClass('selected noselected hidden');
				$('.allModules').show();

				if (type=='0') {
					if (!showAll) {
						$('.partWorks .col:gt(9)').addClass('hidden');
					}
				} else {

					$('.partWorks .col').addClass('noselected');
					$('.partWorks .col[data-type="'+ type +'"]').toggleClass('noselected selected');

					if (!showAll) {
						$('.partWorks .col.selected:gt(9)').addClass('hidden');
					}
				}

				hiddens = $('.partWorks .col.hidden').length;
				if ( hiddens  < 1 && !showAll) {
					$('.allModules').hide();
				}
				$('#setMeType li').attr('data-value',type);
				$('.allModules-count').html('Еще ' + hiddens + ' ' + declOfNum(hiddens, ['решение', 'решения', 'решений']));
			};

			appendRealSelect();

			function hideOther() {
				$('.'+selectClass+'.active').removeClass('active').find('.'+listClass).removeClass('active');
			};


			$select.on('click', function(e){
				if ($(this).find('select').is(':hidden') && !$(e.target).closest('li').hasClass('unactive')) {
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

			$select.find('select').on('change', function(){
				var vl = $(this).val();
				changeValue($select.find('[data-value="'+vl+'"]'));
			});

			$('html').on('click', function(e){
				if (!$(e.target).closest('.'+selectClass).length) {
					hideOther();
					//hideList();
				}
			});

		});

	};

	dropDown();


	// Проверка данных для фильтра фасетного поиска
	function check_filters(type){
		if (!$('#filter_city').length) { return false; }

		// Активные города и регионы
		var city_arr = $('#filter_city').html().split(','),
			reg_arr = $('#filter_region').html().split(',');

		$('.ratePopup a').not('.strong').addClass('unactive');
		$('.ratePopup a').each(function(){
			var city = String($(this).data('city')),
				reg = String($(this).data('reg'));
			if ( $.inArray(city, city_arr)!== -1 || $.inArray(reg, reg_arr)!== -1 ) { $(this).removeClass('unactive'); }
		});

		if (type=='0') { $('.ratePopup a').removeClass('unactive'); }

		// Чекбоксы
		var freelance = $('#filter_freelance').is(':empty') ? false : true,
			agency = $('#filter_agency').is(':empty') ? false : true;

		$('.rateFilter-label').addClass('unactive');
		if (agency)    { $('.rateFilter-label label[for="ch1"]').parent().removeClass('unactive'); }
		if (freelance) { $('.rateFilter-label label[for="ch2"]').parent().removeClass('unactive'); }

		// Типы
		var type_arr = $('#filter_types').html().split(',');

		$('.partner-type .select-item').not('[data-type="0"]').addClass('unactive');
		$('.partner-type .select-item').each(function(){
			var type = String($(this).data('type'));
			if ( $.inArray(type, type_arr)!== -1 ) { $(this).removeClass('unactive'); }
		});

		// Топ5/10
		var cnt = Number($('#filter_cnt').html());
		if (cnt<5) { $('#top5_10, .rateFilter .info').hide(); }
		else if (cnt>=5 && cnt<10) { $('#top10, .rateFilter .info').hide(); }
		else { $('#top5_10, #top10').show(); }
	}

	// Склонение от числа // declOfNum(5, ['секунда', 'секунды', 'секунд'])
	function declOfNum(number, titles) {
	    cases = [2, 0, 1, 1, 1, 2];
	    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
	}

	// ! init tooltipster

	function initTooltipster() {
    return false;
    /* отключен */

		$('.medal--black').tooltipster({
	      content: $('<span><img src="/netcat_template/template/169/assets/img/tt1.png" /> <span>Разработчик корпоративных сайтов</span></span>'),
	      position: 'top-left'
	    });

	    $('.medal--yellow').tooltipster({
	      content: $('<span><img src="/netcat_template/template/169/assets/img/tt2.png" /> <span>Золотой партнер<br/>NetCat</span></span>'),
	      position: 'top-left'
	    });

		$('.medal--orange').tooltipster({
	      content: $('<span><img src="/netcat_template/template/169/assets/img/tt3.png" /> <span>Разработчик интернет-магазинов</span></span>'),
	      position: 'bottom-left'
	    });

		$('.medal--green').tooltipster({
	      content: $('<span><img src="/netcat_template/template/169/assets/img/tt4.png" /> <span>Разработчик социальных проектов</span></span>'),
	      position: 'bottom-left'
	    });

		$('.medal--blue').tooltipster({
	      content: $('<span><img src="/netcat_template/template/169/assets/img/tt5.png" /> <span>Технологический партнер</span></span>'),
	      position: 'top-left'
	    });

	};

	initTooltipster();


	// ! number advices

	function numberAdvices() {

		var $adv = $('.advices-item'),
				i = 1;
		if (!$adv.length) {return false;}

		$adv.each(function(){
			var $this = $(this);
			$this.find('h3').prepend('<div class="advices-number">'+i+'</div>');
			++i;
		});
	};

	numberAdvices();


	// ! eaqual height

	function eqHeight() {

		function set() {
			var a_heught = $('.rating').outerHeight(),
				ww = $(window).width(),
				delta = 70,
				delta2 = 125,
				delta3 = 105,
				delta4 = 50;
			$('#advices').removeAttr('style').outerHeight(a_heught);
			$('#advices .inner').height(a_heught - 120);

			if (ww<1260) {
				$('#advices .scroll_container, #advices .container').width(ww/2 - delta);
				$('#advices .scroll_container .inner').width(ww/2 - delta + 30);
			}

			if ( $('#tenderList').length) {

				if (ww<1260 && ww>1150) {
					$('#tenderList .scroll_container, #tenderList .container').width(ww - delta2);
					$('#tenderList .scroll_container .inner').width(ww - delta2 + 35);
				} else if (ww<=1150 && ww>960) {
					$('#tenderList .scroll_container, #tenderList .container').width(ww - delta3);
					$('#tenderList .scroll_container .inner').width(ww - delta3 + 35);
				} else if (ww<=960 && ww>880) {
					$('#tenderList .scroll_container, #tenderList .container').width(ww - delta);
					$('#tenderList .scroll_container .inner').width(ww - delta + 35);
				} else if (ww<=880) {
					$('#tenderList .scroll_container, #tenderList .container').width(ww - delta4);
					$('#tenderList .scroll_container .inner').width(ww - delta4 + 35);
				} else {
					$('#tenderList .scroll_container, #tenderList .container').width(1136);
					$('#tenderList .scroll_container .inner').width(1170);
				}
			}
		};

		set();

		$(window).load(function(){set()});
		$(window).resize(function(){set()});

	};


	function hideScrollBar() {
		if ( !$('#tenderList').length) { return false; }

		var container_height = $('#tenderList .container').height(),
			scrollbar = $('#tenderList .scroller__bar-wrapper'),
			inner = $('#tenderList .inner');

		if (container_height<890) {
			scrollbar.hide();
			inner.height(container_height + 30);
		} else {
			scrollbar.show();
			inner.height(890);
		}
	}

	eqHeight();

	if ($('#partners.section.usefull #advices').length) {
		var advice_scroll = $('#advices').baron({
			scroller: '.inner',
			container: '.container',
			bar: '.scroller__bar'
		});
	}

	if ($('#ratePopup').length) {
		var advice_scroll = $('#ratePopup').baron({
			scroller: '.inner',
			container: '.container',
			bar: '.scroller__bar'
		});
	}

	if ($('#tenderList').length) {
		var advice_scroll = $('#tenderList').baron({
			scroller: '.inner',
			container: '.container',
			bar: '.scroller__bar'
		});
	}


	// ! main menu open

	function mainmenu() {

		var $m = $('.mainmenu'),
			$i = $('.menu-icon'),
			$s = $('.search-icon'),
			timer = 150,
			delay = 500,
			can_show_menu = false,
			clicked = false;

		if (!$m.length) {return false;}

		function showmenu(element){
			var list = Number(element.attr('data-list'))+1;
			if (!$('.sublist.i'+list).length) return;
			if (list && can_show_menu == list) {
				$('.sublist.i'+list).stop().slideDown(timer);
				$(this).addClass('hvrd');
			}
		}

		$m.find('.mainmenu-link').hover(function(){
			if ($i.is(':visible')) return;
			var _this = $(this);
			can_show_menu = Number(_this.attr('data-list'))+1;
			$('.sublist').slideUp(timer);
			$('.hvrd').removeClass('hvrd');
			setTimeout(function(){ showmenu(_this) }, delay);

		},function(){ can_show_menu = false; });

		$m.find('.mainmenu-link').on('click', function(e){
			if ($i.is(':visible') && $s.is(':hidden')) {
				var l = $(this).data('list');
				$('.sublist').removeClass('active');
				$('.taped').removeClass('taped');
				if (l) {
					e.preventDefault();
					$('.sublist.i'+l).addClass('active');
					$(this).addClass('taped');
				}
			}
		});
		$('.header').on('mouseleave', function(){
			if ($i.is(':visible')) return;
			$('.sublist').slideUp(timer);
			$('.hvrd').removeClass('hvrd');
		});

	};

	mainmenu();


	// Высота контента
	var newcontent_height = 0;
	$('#wrap .section').each(function(){
		newcontent_height += $(this).outerHeight();
	});

	// Фикс высоты врапера
	function wrapHeight() {
		var wh = $(window).height(),
			content = newcontent_height + 71 + 160; // Высота секций + header + footer
		if ( wh > content && $('.section.newcontent').length) { $('#wrap').height(wh-170); }
	}

	wrapHeight();
	$(window).resize(function(){
		wrapHeight();
	});

	// ! mobile menu

	function mobileMenu() {

		var $ic = $('.menu-icon');
		if (!$ic.length) {return false;}

		var $m = $('.mainmenu');
		$ic.on('click', function(e){
			e.preventDefault();
			if ($(this).hasClass('active')) {
				$m.removeClass('shown');
				$('.sublist.active').removeClass('active');
				//$('.taped').removeClass('taped');
			}	else {
				$('.taped').click();
				$m.addClass('shown');
			}
			$(this).toggleClass('active');
		});

	};

	mobileMenu();


	// ! user popups

	function userPopups() {

		var $popups = $('.userPopup');
		if (!$popups.length) {return false;}

		var $links = $('.userPopup-bottom a, .user-login, #auth_href_cart, #reg_href_cart');

		function hidePopups() {
			$popups.removeClass('active');
		};

		function showPopup(id) {
			hidePopups();
			$('.userPopup--'+id).addClass('active');
			setTimeout(function(){
				$('.userPopup--'+id+' input:visible:first').focus();
			}, 500);
		};
		$links.on('click', function(e){
			e.preventDefault();
			var id = $(this).attr('href').replace('#', '');
			showPopup(id);
		});

		$('html').on('click', function(e){
			if (!$(e.target).closest('.userPopup, .user-login, #auth_href_cart, #reg_href_cart').length) hidePopups();
		});

	};

	userPopups();

	// ! order items

	function styleOrderCells() {

		var $cells = $('.devs-item');
		if (!$cells.length) {return false;}

		function isSmallScreen() {
			return $('.is_mobile').is(':visible');
		}

		function setOrder() {
			if ($('.test_new_rating').length) {
				$('.devs-item:lt(4)').attr('data-row', '1');
				$('.devs-item:gt(3):lt(8)').attr('data-row', '2');
				$('.devs-item:gt(7)').attr('data-row', '3');
			} else {
				$('.devs-item:lt(3)').attr('data-row', '1');
				$('.devs-item:gt(2):lt(7)').attr('data-row', '2');
				$('.devs-item:gt(6)').attr('data-row', '3');
			}
		}

		function setH() {
			var max = [0,0,0];
			$('[data-row]').removeAttr('style');

			if (!isSmallScreen()) {
				$('[data-row]').each(function(){
					var r = parseInt($(this).attr('data-row')) - 1;
					if ($(this).height() > max[r]) max[r] = $(this).height();
				});

				for (var i = 0; i < max.length; i++) $('[data-row="'+(i+1)+'"]').height(max[i]);
			}
		};

		setOrder();
		setH();
		$(window).load(function(){setH();});
		$(window).resize(function(){setH();});

	};

	styleOrderCells();


	// ! scroll to

	function scrollTo() {

		var $links = $('[data-scrollto]'),
			delta = 20,
			timer = 400;
		if (!$links.length) {return false;}
		$links.on('click', function(e){
			e.preventDefault();
			var $dest = $('#'+$(this).attr('data-scrollto')),
				dlt = parseInt($(this).attr('data-delta')) || delta,
				sct = $dest.offset().top - dlt;
			$('html, body').animate({scrollTop: sct+'px'}, timer);
		});
	};

	scrollTo();


	// ! about ratings

	function aboutRatingsPopup() {

		var $link = $('#aboutRatings'),
			$popup = $('.rate-popup'),
			$close = $popup.find('.rate-close');

		if (!$link.length || !$popup.length) {return false;}

		$link.on('click', function(e){
			e.preventDefault();
			$popup.toggleClass('active');
		});

		$close.on('click', function(e){
			e.preventDefault();
			$popup.toggleClass('active');
		});

	};

	aboutRatingsPopup();


	// ! rating table sticky header

	function stickies() {

		var $window = $(window),
			$sticky = $('.rateFilter'),
			$clone, $clone2;
		if (!$sticky.length || $sticky.parent().hasClass('tender')) {return false;}

		var offt, limit, delta = 30;

		function cloneSticky() {
			// there can be more than one, refact
			var $copy = $sticky.clone();
			$sticky.after('<div class="sticka"></div>');
			$clone = $('.sticka');
			$clone.append($copy);

			var $copy = $sticky.clone();
			$('#all').append('<div class="stk"></div>')
			$clone2 = $('.stk');
			$clone2.append($copy);

			$('.ratePopup:not(:first), .rateOverlay:not(:first)').remove();
		};

		function estimateOffset() {
			offt = $sticky.offset().top;
			limit = $('.rateTable').offset().top + $('.rateTable').outerHeight() - $sticky.height() - delta;
			$('.stk').css({'top':limit+'px'});
		};

		function checkPosition(sct) {
			if (sct < offt+delta) {
				$clone.hide();
				$clone2.hide();
			}
			else if (sct >= (offt+delta) && sct < limit) {
				$clone.show();
				$clone2.hide();
			}
			else {
				$clone2.show();
				$clone.hide();
			}
		}

		cloneSticky();
		estimateOffset();

		$window.resize(function(){
			estimateOffset();
		}).scroll(function(){
			estimateOffset();
			checkPosition($window.scrollTop())
		});

	};

	stickies();


	// ! rating checkboxes

	function ratingChecboxes() {

		var $rows = $('.rateTable .tbl-row');
		if (!$rows.length) {return false;}

		var $but = $('#tender, #print, #tender2, #invite_tender');

		$('.rateFilter-label label').on('click', function(e){
			if ($(this).parent().hasClass('unactive')) { return false; }
			e.preventDefault();
			$('#notFound').hide();
			var nm = $(this).attr('for');
			var city = $('.ratePopup a.active').attr('data-city');
			var region = $('.ratePopup a.active').attr('data-reg');
			var type = $('#tenderList').attr('data-type');
			if (!$('[name="'+nm+'"]:first').prop('checked')) { $('.rateFilter-label input').prop('checked', false); }
			$('[name="'+nm+'"]').prop('checked', !$('[name="'+nm+'"]:first').prop('checked'));

			$.ajax({
				url: window.location.pathname + '?isNaked=1&type_checkbox='+ ( $('[name="'+nm+'"]:first').prop('checked') ? (nm=='ch1' ? 1 : 2 ) : 0)+'&select_city='+ city +'&select_region=' + region +'&type=' + type,
				success: function(resp) {
					$('#partners_list').html(resp);
					if ($('#partners_list .tbl-row').length<1) { $('#notFound').show(); }
					setTenderCount(0);
					hideScrollBar();
					check_filters();
				}
			});
		});

		$(document).on('click', '.rateTable .tbl-row', function(event){
			var $target = $(event.target),
				$row =  $target.hasClass('tbl-row') ? $target : $target.parents('.tbl-row'),
				$inp1 = $row.find('input.checkbox'),
				$inp2 = $row.find('input.selected_partner'),
				$id = $row.data('id');

			if (!$target.closest('a').length && !$target.closest('input').length) {
				event.preventDefault();

				if ($row.hasClass('checked')) {
					$inp1.prop('checked','');
					$inp2.removeAttr('value');
				} else {
					$inp1.prop('checked','checked');
					$inp2.val(1);
				}

				$row.toggleClass('checked');

				var count = $('.tbl-row.checked').length;

				if (count >= 2) $but.addClass('active')
				else $but.removeClass('active');

				setTenderCount(count);
			}
		});
	};

	// Выбор партнера в тендере
	function setTenderCount(count) {
		if (!$('.section.tender').length) {return false;}
		if (count>0) {
			$('.rate_select_count').html(declOfNum(count, ['Выбран', 'Выбрано', 'Выбрано']) + ' ' + count);
			$('.rate_select_count_bottom').html('Вы выбрали '+ count + ' ' + declOfNum(count, ['участника', 'участников', 'участников']));
		} else {
			$('.rate_select_count').html('Выбрать');
			$('.rate_select_count_bottom').html('Нет выбранных');
		}
	}

	ratingChecboxes();

	// Rating list show else
	if ($('#showElse').length) {
		$(document).on('click', '#showElse', function(){
			$('.loading').addClass('active');
			$('#notFound').hide();

			var checkbox = $('.rateFilter-label input:checked').length ? ($('.rateFilter-label input:checked').attr('name')=='ch1' ? 1 : 2 ) : 0;
			var city = $('.ratePopup a.active').attr('data-city');
			var region = $('.ratePopup a.active').attr('data-reg');

			$.ajax({
				url: window.location.pathname + '?isNaked=1&curPos='+ $('#partners_list .tbl-row').length + '&type_checkbox='+checkbox+'&select_city='+ city +'&select_region=' + region,
				success: function(resp) {
					$('.loading').removeClass('active');
					$('#partners_list').append(resp);
					if (resp == '' || resp.indexOf('noMorePartners') + 1) {
						$('#showElse').parent().parent().hide();
						if ($('#partners_list .tbl-row').length<1) { $('#notFound').show(); }
					}
					hideScrollBar();
				}
			});
			return false;
		});
	}

	// ! rating city list

	function ratingCitySelect() {

		var $sel = $('.rateSelect');
		if (!$sel.length) {return false;}

		var $val = $sel.find('.rateSelect-val'),
			$popup = $('.ratePopup'),
			$popupInner = $popup.find('.inner'),
			$links = $popup.find('a'),
			$clear = $popup.find('.clear'),
			$close = $popup.find('.ratePopup-close'),
			$ovrly = $('.rateOverlay'),
			$list = $('.search-list-inrate'),
			timer = 300;

		$popup.find('input').on('focus', function(){
			var vl = $(this).val();
			if (vl.length>0) {
				$list.stop(true, true).slideDown(200);
				setTimeout(function(){
					searchStr(vl);
				}, 250);
			}
		}).on('blur', function(){
			setTimeout(function(){ $list.stop(true, true).slideUp(200);}, 250);
		}).on('keyup change', function(){
			var vl = $(this).val();
			searchStr(vl);

			if (vl.length>0) {
				$list.stop(true, true).slideDown(200);
				setTimeout(function(){
					searchStr(vl);
				}, 250);
			}
		});

		function searchStr(str) {

			$items = $list.find('.search-item');

			$items.each(function(){
				var $this = $(this);
				if ($this.text().toLowerCase().indexOf(str.toLowerCase()) < 0) $this.hide();
				else $this.show();
			});
		}

		function createSelect() {
			var template = '<select id="selectRate">';
			$popup.find('a').each(function(){
				var $this = $(this);
				var city = $this.attr('data-city');
				var region = $this.attr('data-reg');
				template += '<option data-reg="'+ region +'" data-city="'+ city +'">'+ $this.text() +'</option>';
			});
			$popup.find('a').not('.strong').each(function(){
				var $this = $(this);
				$this.clone().addClass('search-item').appendTo(".search-list-inrate");
			});
			template += '</select>';
			$sel.append(template)
		}

		function setOffset() {
			var modHeight = $('#all').outerHeight() - ($sel.offset().top + $sel.outerHeight());
			var delta = $popup.outerHeight() - modHeight;
			if (delta > 0) $popup.css({'margin-top':'-'+(delta+20)+'px'});
			else $popup.css({'margin-top':'0px'});
		}

		function setInnerSize() {
			var wh = $(window).height();
			var ww = $(window).width();
			var rw = $popup.outerWidth();
			if (wh < 900) { $popupInner.height(wh-170); } else { $popupInner.height(720); }
			if (ww < 1380) { $popupInner.width(rw-25).parent().width(rw-60); } else { $popupInner.width(1235).parent().width(1200); }
		}

		setInnerSize();

		$('#searchRateForm').submit(function(){
			$(this).find('.search-item:visible').first().click();
			return false;
		})

		$(window).resize(function(){
			setInnerSize();
		});

		createSelect();

		$sel.on('click', function(e){
			e.preventDefault();
			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
				$('.section.rateFilter').removeClass('active');
				$popup.fadeOut(timer);
				$ovrly.fadeOut(timer);
			}
			else {
				if (!is_phone()) {
					$(this).addClass('active');
					$('.section.rateFilter').addClass('active');
				}
				$ovrly.fadeIn(timer);
				$popup.fadeIn(timer, function(){
					var $th = $(this);
					$th.find('input').focus();
				});
			}
		});

		$close.on('click', function(e){
			e.preventDefault();
			$popup.fadeOut(timer);
			$ovrly.fadeOut(timer);
			$sel.removeClass('active');
			$('.section.rateFilter').removeClass('active');
		});

		$('html').on('click', function(e){
			if (!$(e.target).closest('.ratePopup').length && !$(e.target).closest('.rateSelect').length) {
				$popup.fadeOut(timer);
				$ovrly.fadeOut(timer);
				$sel.removeClass('active');
				$('.section.rateFilter').removeClass('active');
			}
		});

		$(document).on('change','#selectRate', function(e){
			var selected = $("#selectRate option:selected").text();
			$val.html(selected);

			var checkbox = $('.rateFilter-label input:checked').length ? ($('.rateFilter-label input:checked').attr('name')=='ch1' ? 1 : 2 ) : 0;
			var city = $("#selectRate option:selected").attr('data-city');
			var region = $("#selectRate option:selected").attr('data-reg');
			$('#notFound').hide();

			$.ajax({
				url: window.location.pathname + '?isNaked=1&type_checkbox='+ checkbox +'&select_city='+ city +'&select_region=' + region,
				success: function(resp) {
					setTenderCount(0);
					$('#partners_list').html(resp);
					if (resp == '') { $('#showElse').parent().parent().hide(); $('#notFound').show(); }
				}
			});
			return false;
		});


		$(document).on('click','.ratePopup a', function(e){
			if ($(this).hasClass('unactive')) { return false; }
			var selected = $(this).html();
			$val.html(selected);
			$('.ratePopup a').removeClass('active');
			$(this).addClass('active');

			var checkbox = $('.rateFilter-label input:checked').length ? ($('.rateFilter-label input:checked').attr('name')=='ch1' ? 1 : 2 ) : 0;
			var city = $(this).attr('data-city');
			var region = $(this).attr('data-reg');
			var type = $('#tenderList').attr('data-type');
			$('#notFound').hide();

			$.ajax({
				url: window.location.pathname + '?isNaked=1&type_checkbox='+ checkbox +'&select_city='+ city +'&select_region=' + region + '&type=' + type,
				success: function(resp) {
					setTenderCount(0);
					$('#partners_list').html(resp);
					if (resp == '') { $('#showElse').parent().parent().hide(); $('#notFound').show(); }
					if ( $('#noMorePartners').length ) { $('#showElse').parent().parent().hide(); }
					hideScrollBar();
					check_filters(type);
				}
			});

			$popup.fadeOut(timer);
			$ovrly.fadeOut(timer);
			$sel.removeClass('active');
			$('.section.rateFilter').removeClass('active');
			return false;
		});

		$clear.on('click', function(e){
			e.preventDefault();
			$(this).parents('.ratePopup-search').find('input').val('').focus();
		});

	};

	ratingCitySelect();

	$('#tenderForm').submit(function(){

		var error = '';
		$('#errmsg').hide();

		if(!$('#f1').val()) { $('#f1').addClass('error'); error = 1; }
		else { $('#f1').removeClass('error'); }

		if(!$('#f2').val()) { $('#f2').addClass('error'); error = 2; }
		else { $('#f2').removeClass('error'); }

		if(!$('#f3').val()) { $('#f3').addClass('error'); error = 3; }
		else { $('#f3').removeClass('error'); }

		if ($('.checkbox:checked').length==0) { error = 1; }

		var pattern=/[0-9a-z_]+@[0-9a-z_-]+\.[a-z]{2,5}/i;

		if(!pattern.test($('#f4').val())) { $('#f4').addClass('error'); error = 4; }
		else { $('#f4').removeClass('error'); }

		if (error) {
		  $('#errmsg').fadeIn(300);
		  return false;
		}

		// Событие для метрики
		if (typeof yaCounter33990055 == 'object') {
			yaCounter33990055.reachGoal('TENDER_POST');
			console.log('yaCounter: TENDER_POST');
		}

		//console.log( $(this).serialize() );
		return true;
	});

	if ( $('#gibridForm').length ) {
		$('#gibridForm').submit(function(){

			var error = '', pattern=/[0-9a-z_]+@[0-9a-z_-]+\.[a-z]{2,5}/i;

			if (!pattern.test($('#Email').val())) { $('.gibrid .error').show(); $('#Email').addClass('error'); } else {
				$.post($(this).attr('action'), $(this).serialize()).success(function(){
					$('.gibrid .error, #gibridForm').hide();
					$('.gibrid .confirm').show();
				});
			}

			return false;
		});

		$('#gibridForm input').focus(function(){
			$(this).removeClass('error');
		});
	}

	$('#tenderForm input, #tenderForm textarea').focus(function(){
		$(this).removeClass('error');
	});


	// поиск для решений партнеров
	function searchDecition() {

		var $decForm = $('#searchDecition');
		if (!$decForm.length) {return false;}

		var $list = $('.search-list-decition');

		$decForm.find('input').on('focus', function(){
			var vl = $(this).val();
			if (vl.length>0) {
				$list.stop(true, true).slideDown(200);
				setTimeout(function(){
					searchStr(vl);
				}, 250);
			}
		}).on('blur', function(){
			setTimeout(function(){ $list.stop(true, true).slideUp(200);}, 250);
		}).on('keyup change', function(){
			var vl = $(this).val();
			searchStr(vl);

			if (vl.length>0) {
				$list.stop(true, true).slideDown(200);
				setTimeout(function(){
					searchStr(vl);
				}, 250);
			}
		});

		function searchStr(str) {
			$items = $list.find('.search-item');
			$items.each(function(){
				var $this = $(this);
				if ($this.text().toLowerCase().indexOf(str.toLowerCase()) < 0) $this.hide();
				else $this.show();
			});
		}

		$('.partWorks .cols a').each(function(){
			var $this = $(this),
				link = $this.attr('href'),
				name = $this.find('.partWorks-title').text();
			$(".search-list-decition").append('<a class="search-item" href="'+ link +'">'+ name +'</a>');
		});

		$('#searchDecition').submit(function(){
			window.location.href = $(this).find('.search-item:visible').first().attr('href');
			return false;
		});
	};

	searchDecition();


	$(document).on('click','.inner_link.i2', function(e){
		var href = $(this).data('href');
		window.open(href);
		return false;
	});

	$(document).on('mouseenter','.medal', function(e){
		$(this).css('z-index',10).find('.m-description').show();
	}).on('mouseout','.medal', function(e){
		$(this).css('z-index',4).find('.m-description').hide();
	});


	// ! partner mobile fotorama

	function pbPartnerFotorama() {
		//$('.js-phones-group').fotorama()
		$('.js-phones-group').each(function(){
			var $this = $(this);
			var api = $this.data('fotorama');
			if (api) api.setOptions({
				ratio: '800/550',
				width: '100%',
				maxWidth: '340px'
			})
		});
	};

	function partnerByTypes() {

		//object_for_types / group_by_types

		var $obj = $('.object_for_types');
		if (!$obj.length) {return false;}

		$obj.each(function(){
			var $this = $(this);
			var type = $this.data('type');
		});

		$('.object_for_types').append('<div></div>');

	};

	function partnerFotoramaInit() {

		var $groups = $('.partGroup');
		if (!$groups.length) {return false;}

		$groups.each(function(){
			var $this = $(this);
			var $clone = $this.clone().removeClass('partGroup').addClass('js-phones-group');
			$clone.insertAfter($this);
		});
		if (typeof fotoramaVersion !== "undefined") {
			$('.js-phones-group').fotorama({
				nav: false,
				arrows: false,
				ratio: '800/550',
				width: '100%',
				maxWidth: '340px'
			});
		}
	};

	//partnerByTypes();
	partnerFotoramaInit();


	// ! all editions

	function allEditionsPopup() {

		var $but = $('.interMenu-right .button');
		if (!$but.length) {return false;}

		var $popup = $('.interMenu-popup'),
			$close = $('.interMenu-close'),
			timer = 300;

		$but.on('click', function(e){
			e.preventDefault();
			if ($popup.hasClass('active')) $popup.fadeOut(timer);
			else $popup.fadeIn(timer);
			$popup.toggleClass('acive');
		});

		$close.on('click', function(e){
			e.preventDefault();
			$popup.fadeOut(timer);
			$popup.toggleClass('acive');
		});

	};

	allEditionsPopup();




	// ! radio tabs

	function RadioTabs(config) {

		var $list,
			$items,
			$panels,
			self = this,
			i = 0,
			j = 0,
			panelClass,
			fr,
			pp,
			$select = false;

		this.config = config || {};

		this.init = function() {
			if (!config.el || !$(config.el).length) {
				console.error('RadioTabs: no element');
				return;
			}

			fr = config.fr || false;
			pp = config.pp || false;

			if (pp) initPeppermint();

			panelClass = config.panelClass;

			$list = $(config.el);
			$items = $list.find('.tab');
			$panels = $('[data-rel="'+config.rel+'"]');

			$select = $(config.select) || false;

			$items.each(function(){
				var $this = $(this);
				$this.attr('data-index', i).removeClass('active');
				++i;
			});

			$panels.find('.'+panelClass).each(function(){
				var $this = $(this);
				$this.attr('data-index', j).hide();
				++j;
			});

			$items.on('click', function(e){
				e.preventDefault();
				self.changeTab($(this));
				if ( $(this).parent().parent().parent().hasClass('sticky-fxd') ) {
					var item = $('#feature_top').find('.tab:eq('+ $(this).index() +')')
						items2 = $('#feature_top').find('.tab');
					items2.removeClass('active');
					item.addClass('active');
					if ( $(window).scrollTop()>400 ) { $('body,html').animate({scrollTop: $('#feature_top').position().top + 10}, 400); }
				}
			});

			$list.find('[data-index="0"]').click();

			if ($select) {
				$select.on('change', function(){
					var idx = $select.val();
					$list.find('[data-index="'+idx+'"]:not(.active)').click();
				});
			}
		};

		this.changeTab = function($item) {
			$items.removeClass('active');
			$item.addClass('active');

			if ( $('.sticky-fxd.feature_line').length ) {
				var item = $('.sticky-fxd.feature_line').find('.tab:eq('+ $item.index() +')')
					items2 = $('.sticky-fxd.feature_line').find('.tab');
				items2.removeClass('active');
				item.addClass('active');
			}

			var idx = $item.attr('data-index');

			$panels.find('.'+panelClass).hide();
			$panels.find('.'+panelClass+'[data-index="'+idx+'"]').show();

			if (fr) pbPartnerFotorama();
			if ($select) $select.val(idx);
		};


		this.init();

		return this;

	};

	var tabs1;
	if ($('#tabs1').length) tabs1 = new RadioTabs({el:'#tabs1', panelClass: 'tab-panel', rel: 'tabs-1', fr: true});

	var tabs2;
	if ($('#tabs2').length) tabs2 = new RadioTabs({el:'#tabs2', panelClass: 'tab-panel', rel: 'tabs-2', fr: true});

	var tabs3;
	if ($('#tabs3').length) tabs3 = new RadioTabs({el:'#tabs3', panelClass: 'tab-panel', rel: 'tabs-3', pp: true});

	var tabs4;
	if ($('#tabs4').length) tabs4 = new RadioTabs({el:'#tabs4', panelClass: 'tab-panel', rel: 'tabs-4'});

	var tabs5;
	if ($('#tabs5').length) tabs5 = new RadioTabs({el:'#tabs5', panelClass: 'tab-panel', rel: 'tabs-5', select: '.demoInterface .select'});


	// ! sticky emulate

	function StickyEmul(config) {

		var $window = $(window),
			$sticky,
			$clone1,
			$clone2,
			$limit,
			fxdClsNm = 'sticky-fxd',
			absClsNm = 'sticky-abs',
			fxdPrefix = 'fxd-sticky-',
			absPrefix = 'abs-sticky-',
			limit, delta, limitDelta = 0, limitDeltaUpdate = false,
			sw = false, lft = false,
			self = this;

		this.config = config || {};

		this.init = function() {
			if (is_touch_device || is_windows_touch || isAndroid) {
				console.info('StickyEmul: will not start on touch device');
				return;
			}

			if (!config.el || !$(config.el).length) {
				console.error('StickyEmul: no element');
				return;
			}

			if (!config.limitEl) {
				console.info('StickyEmul: no limit element, will estimate like there is no bottom limit');
				$limit = 'noel';
			}
			else $limit = $(config.limitEl);

			if (config.saveWidth) {
				this.sw = config.saveWidth;
			}

			if (config.left) {
				this.lft = config.left;
			}

			if (config.limitDelta) {
				limitDelta = config.limitDelta;
			}

			if (config.limitDeltaUpdate) {
				limitDeltaUpdate = config.limitDeltaUpdate;
			}

			$sticky = $(config.el);

			this.createNewElements();
			this.calcLimits();

			$window.scroll(function(){
				self.checkPosition($(window).scrollTop());
			});

			$(window).resize(function(){
				self.calcLimits();
			})

			// dependencies
			scrollTo();
			allEditionsPopup();
		}

		this.createNewElements = function() {

			var count = $('.'+fxdClsNm).length;

			var $copy1 = $sticky.clone().addClass(fxdClsNm).attr('id', fxdPrefix+count);
			var $copy2 = $sticky.clone().addClass(absClsNm).attr('id', absPrefix+count);

			$('html').append($copy1);
			$('html').append($copy2);

			$clone1 = $('#'+fxdPrefix+count);
			$clone2 = $('#'+absPrefix+count);

		}

		this.calcLimits = function() {
			offt = $sticky.offset().top,
			offl = $sticky.offset().left,
			w = $sticky.width();

			if (limitDeltaUpdate) limitDelta = $(window).height();

			if ($limit == 'noel') limit = 1000000;
			else limit = $limit.offset().top - limitDelta;

			var self = this;

			var styles = {
				'top':limit+'px'
			};

			var styles2 = {
				'left': self.lft ? offl+'px' : 'auto',
				'width': self.sw ? w+'px' : 'auto'
			};

			$clone1.css(styles2);
			$clone2.css(styles).css(styles2);
		}

		this.checkPosition = function(sct) {
			if (sct < offt) {
				$clone1.hide();
				$clone2.hide();
			}
			else if (sct >= (offt) && sct < limit) {
				$clone1.show();
				$clone2.hide();
			}
			else {
				$clone2.show();
				$clone1.hide();
			}
		}

		this.update = function(tmr) {
			var timer = tmr || 10,
				self = this;
			setTimeout(function(){
				self.calcLimits();
				self.checkPosition($(window).scrollTop());
			}, timer)
		}

		this.init();

		return this;

	};

	var sticky1;
	if ($('.interMenu').length) {
		sticky1 = new StickyEmul({el: '#feature_line'});
		var tabs3_1;
		tabs3_1 = new RadioTabs({el:'.sticky-fxd .tabs', panelClass: 'tab-panel', rel: 'tabs-3', pp: true});
	}

	var sticky2;
	if ($('.changeHistory-versions').length) sticky2 = new StickyEmul({el: '.changeHistory-versions', limitEl: '.change-item:last', saveWidth: true, left: true});

	var sticky3;
	if ($('.edCompare-header').length) sticky3 = new StickyEmul({el: '.edCompare-header', limitEl: '.edCompare-row:eq(-3)'});

	var sticky4;
	if ($('.redTests-list').length) sticky4 = new StickyEmul({el: '.redTests-list', limitEl: '.redTests-finalline', saveWidth: true, left: true, limitDelta: $(window).height(), limitDeltaUpdate: true});

	// ! see all buttons

	function WatchAll(config) {

		var $link,
			$rel,
			title,
			oldTitle,
			inlineBlock,
			phones,
			self = this;

		this.config = config || {};

		this.init = function() {
			if (!config.el || !$(config.el).length) {
				console.error('WatchAll: no element');
				return;
			}

			if (!config.rel || !$(config.rel).length) {
				console.error('WatchAll: no relative element');
				return;
			}

			$link = $(config.el);
			//oldTitle = $link.text();
			oldTitle = 'Смотреть все';
			title = config.title || 'Скрыть'
			phones = config.phones || true,
			inlineBlock = config.ib || false;

			$link.on('click', function(e){
				e.preventDefault();
				var $this = $(this);
				if ($this.hasClass('active')) self.hideAll();
				else {
					$rel = $(config.rel+':hidden');
					self.showAll();
				}
			});

			$(window).resize(function(){
				if (phones && !$link.is(':visible')) {
					$(config.rel).removeAttr('style');
					self.hideAll();
					self.changeLinkTitle(oldTitle);
				}
			});
		}

		this.showAll = function() {
			if (!inlineBlock) $rel.show();
			else $rel.css({'display':'inline-block'});
			$link.addClass('active');
			self.changeLinkTitle(title);
		}

		this.hideAll = function() {
			if ($rel) { $rel.hide(); }
			$link.removeClass('active');
			self.changeLinkTitle(oldTitle);
		}

		this.changeLinkTitle = function(ttl) {
			$link.html(ttl);
		}

		this.update = function() {
			this.init();
		}

		this.init();

		return this;

	};

	var watch1;
	if ($('#all-1').length) watch1 = new WatchAll({el: '#all-1', rel: '[data-rel="watch-1"] .col', ib: true});

	var watch2;
	if ($('#all-2').length) watch2 = new WatchAll({el: '#all-2', rel: '[data-rel="watch-2"] .col', ib: true});

	//var watch3;
	//if ($('#all-3').length) watch3 = new WatchAll({el: '#all-3', rel: '[data-rel="watch-3"] .col', ib: true});

	//var watch4;
	//if ($('#all-4').length) watch4 = new WatchAll({el: '#all-4', rel: '[data-rel="watch-4"] ul'});

	var watch5;
	if ($('#all-5').length) watch5 = new WatchAll({el: '#all-5', rel: '[data-rel="watch-5"] .col', ib: true});


	// ! popups global

	function Popup(config) {

		var $link,
			$popup,
			$overlay,
			$close,
			timer,
			delta,
			change,
			changeIdx,
			self = this;

		this.config = config || {};

		this.init = function() {
			if (!config.el || !$(config.el).length) {
				console.error('Popup: no element');
				return;
			}

			if (!config.link || !$(config.link).length) {
				console.error('Popup: no link element');
				return;
			}

			$popup = $(config.el);
			$link = $(config.link);
			timer = config.timer || 300;
			delta = config.delta || 20;
			change = config.changeContent || false;
			if (change && config.toBlock) changeIdx = config.toBlock - 1;

			if (!self.checkOverlayExists()) self.createOverlay();
			$overlay = $('.overlay');

			if (!config.close || !$popup.find(config.close).length) {
				console.info('Popup: no close element, will work like there is only overlay can close popup');
				$close = 'noel';
			}
			else {
				$close = $popup.find(config.close);
			}

			$overlay.on('click', function(e){
				e.preventDefault();
				self.hidePopup();
			});

			if ($close != 'noel') {
				$close.on('click', function(e){
					e.preventDefault();
					self.hidePopup();
				});
			}

			$link.on('click', function(e){
				e.preventDefault();
				if (!self.checkAdaptive()) return false;
				if (change) self.changeContent(changeIdx, true);
				if ($(this).data('change')) self.changeContent($(this).data('change'), true);
				self.openPopup();
			});

			$popup.find('.pop-arrow--left').on('click', function(e){
				e.preventDefault();
				self.prev();
			});

			$popup.find('.pop-arrow--right').on('click', function(e){
				e.preventDefault();
				self.next();
			});

			if (change) {
				this.changeContent(changeIdx, true);

				$popup.find('.bottomline i').on('click', function(e){
					e.preventDefault();
					var idx = $(this).index();
					self.changeContent(idx);
				});
			}

			$(window).resize(function(){
				self.recalcMargins();
				if (!self.checkAdaptive()) self.hidePopup(true);
			});
		}

		this.checkOverlayExists = function() {
			if ($('.overlay').length > 0) {return true;}
		}

		this.createOverlay = function() {
			$('body').append('<div class="overlay" />');
		}

		this.openPopup = function() {
			var ml = $popup.outerWidth() / 2,
				offt = $(window).scrollTop(),
				wh = $(window).height(),
				ph = $popup.outerHeight(),
				mt = wh > ph ? ((wh - ph) / 2 + offt) : (offt + delta);

			$popup.css({
				'margin-left':'-'+ml+'px',
				'top': mt+'px'
			}).fadeIn(timer);
			$overlay.fadeIn(timer);
		};

		this.hidePopup = function(silent) {
			var snt = silent || false;
			if (snt) {
				$popup.hide()
				$overlay.hide();
			}
			else {
				$popup.fadeOut(timer);
				$overlay.fadeOut(timer);
			}
		}

		this.changeContent = function(idx, silent) {
			if (!silent) {
				$popup.find('.imageblock:visible').addClass('ab');
				$popup.find('.imageblock:eq('+idx+')').removeClass('ab').show();
				$popup.find('.imageblock.ab').fadeOut(timer);
			}
			else {
				$popup.find('.imageblock').addClass('ab').hide();
				$popup.find('.imageblock:eq('+idx+')').removeClass('ab').show();
			}

			$popup.find('.bottomline i').removeClass('active');
			$popup.find('.bottomline i:eq('+idx+')').addClass('active');
		}

		this.prev = function() {
			var curIdx = $popup.find('.imageblock:not(".ab")').index();
			var count = $popup.find('.imageblock').length-1;
			var nextIdx = curIdx - 1;
			if (curIdx == 0) nextIdx = count;
			this.changeContent(nextIdx, true);
		}

		this.next = function() {
			var curIdx = $popup.find('.imageblock:not(".ab")').index();
			var count = $popup.find('.imageblock').length-1;
			var nextIdx = curIdx + 1;
			if (curIdx == count) nextIdx = 0;
			this.changeContent(nextIdx, true);
		}

		this.recalcMargins = function() {
			var ml = $popup.outerWidth() / 2;

			$popup.css({
				'margin-left':'-'+ml+'px'
			});
		}

		this.checkAdaptive = function() {
			if ($('.detector .l4').is(':visible')) return false;
			else return true;
		}

		this.init();

		return this;

	};

	if ($('#pop-1').length && $('#pop-link-1').length) { var pop1 = new Popup({el: '#pop-1', link: '#pop-link-1', close: '.pop-close', changeContent: true, toBlock: 1}); }
	if ($('#pop-2').length && $('#pop-link-2').length) { var pop2 = new Popup({el: '#pop-2', link: '#pop-link-2', close: '.pop-close', changeContent: true, toBlock: 1}); }
	if ($('#pop-3').length && $('#pop-link-3').length) { var pop3 = new Popup({el: '#pop-3', link: '#pop-link-3', close: '.pop-close', changeContent: true, toBlock: 1}); }
	if ($('#pop-4').length && $('#pop-link-4').length) { var pop4 = new Popup({el: '#pop-4', link: '#pop-link-4', close: '.pop-close', changeContent: true, toBlock: 1}); }
	if ($('#pop-5').length && $('#pop-link-5').length) { var pop5 = new Popup({el: '#pop-5', link: '#pop-link-5', close: '.pop-close', changeContent: true, toBlock: 1}); }
	if ($('#pop-6').length && $('#pop-link-6').length) { var pop6 = new Popup({el: '#pop-6', link: '#pop-link-6', close: '.pop-close', changeContent: true, toBlock: 1}); }
	if ($('#pop-7').length && $('#pop-link-7').length) { var pop7 = new Popup({el: '#pop-7', link: '#pop-link-7', close: '.pop-close', changeContent: true, toBlock: 1}); }
	if ($('#pop-8').length && $('#pop-link-8').length) { var pop8 = new Popup({el: '#pop-8', link: '#pop-link-8', close: '.pop-close', changeContent: true, toBlock: 1}); }
	if ($('#pop-9').length && $('#pop-link-9').length) { var pop9 = new Popup({el: '#pop-9', link: '#pop-link-9', close: '.pop-close', changeContent: true, toBlock: 1}); }
	if ($('#pop-10').length && $('#pop-link-10').length) { var pop10 = new Popup({el: '#pop-10', link: '#pop-link-10', close: '.pop-close', changeContent: true, toBlock: 1}); }
	if ($('#pop-11').length && $('#pop-link-11').length) { var pop11 = new Popup({el: '#pop-11', link: '#pop-link-11', close: '.pop-close', changeContent: true, toBlock: 1}); }
	if ($('#pop-12').length && $('#pop-link-12').length) { var pop12 = new Popup({el: '#pop-12', link: '#pop-link-12', close: '.pop-close', changeContent: true, toBlock: 1}); }
	if ($('#pop-13').length && $('#pop-link-13').length) { var pop13 = new Popup({el: '#pop-13', link: '#pop-link-13', close: '.pop-close', changeContent: true, toBlock: 1}); }
	if ($('#pop-14').length && $('#pop-link-14').length) { var pop14 = new Popup({el: '#pop-14', link: '#pop-link-14', close: '.pop-close', changeContent: true, toBlock: 1}); }
	if ($('#pop-15').length && $('#pop-link-15').length) { var pop15 = new Popup({el: '#pop-15', link: '#pop-link-15', close: '.pop-close', changeContent: true, toBlock: 1}); }

	if ($('#pop-vacation').length) {
		var pop1 = new Popup({el: '#pop-vacation', link: '#pop-vacation-1', close: '.pop-close', changeContent: true, toBlock: 1});
		var pop2 = new Popup({el: '#pop-vacation', link: '#pop-vacation-2', close: '.pop-close', changeContent: true, toBlock: 2});
		var pop3 = new Popup({el: '#pop-vacation', link: '#pop-vacation-3', close: '.pop-close', changeContent: true, toBlock: 3});
	}

	// demo page
	if ($('#pop-1').length && $('.pop-link-1').length) { var pop1 = new Popup({el: '#pop-1', link: '.pop-link-1', close: '.pop-close', changeContent: true, toBlock: 1}); }
	if ($('#pop-2').length && $('.pop-link-2').length) { var pop1 = new Popup({el: '#pop-2', link: '.pop-link-2', close: '.pop-close', changeContent: true, toBlock: 1}); }
	if ($('#pop-3').length && $('.pop-link-3').length) { var pop1 = new Popup({el: '#pop-3', link: '.pop-link-3', close: '.pop-close', changeContent: true, toBlock: 1}); }
	if ($('#pop-4').length && $('.pop-link-4').length) { var pop1 = new Popup({el: '#pop-4', link: '.pop-link-4', close: '.pop-close', changeContent: true, toBlock: 1}); }
	if ($('#pop-5').length && $('.pop-link-5').length) { var pop1 = new Popup({el: '#pop-5', link: '.pop-link-5', close: '.pop-close', changeContent: true, toBlock: 1}); }


	// ! filter tabs

	function FilterTabs(config) {

		var $list,
			$items,
			$filterItems,
			$select,
			self = this;

		this.config = config || {};

		this.init = function() {
			if (!config.el || !$(config.el).length) {
				console.error('FilterTabs: no element');
				return;
			}

			if (!config.rel || !$(config.rel).length) {
				console.error('FilterTabs: no relative elements');
				return;
			}

			$list = $(config.el);
			$items = $list.find('.tab');
			$filterItems = $(config.rel);

			$select = $(config.select) || false;

			$filterItems.hide();

			$items.on('click', function(e){
				e.preventDefault();
				self.changeTab($(this));
			});

			if ( $list.attr('id') == 'filterTabs4' ) {
				if (""!==document.location.hash && "#undefined"!==document.location.hash) {
					$list.find('a[data-hash="'+ document.location.hash +'"]').parent().click();
				} else {
					$list.find('.tab:first').click();
				}
			} else {
				$list.find('.tab:first').click();
			}


			if ($select) {
				$select.on('change', function(){
					var filterStatement = $select.val();
					$list.find('[href="#'+$('select' + config.select).val()+'"]:not(.active)').click();
				});
			}
		};

		this.changeTab = function($item) {
			$items.removeClass('active');
			$item.addClass('active');

			if (config.el == '#filterTabs2' || config.el == '#filterTabs3' || config.el == '#filterTabs4') {

				var filterStatement = $item.find('a').attr('href').replace('#','');

				if (filterStatement == 'all') { $filterItems.show(); }
				else {
					$filterItems.each(function(){
						var $this = $(this);
						if ($this.attr('data-filter') == filterStatement) $this.show();
						else $this.hide();
					});
				}

			} else {

				var filterStatement = $item.find('a').text();

				if (filterStatement == 'Все редакции') $filterItems.show();
				else {
					$filterItems.hide();
					$filterItems.parent().find(".col[data-filter~='"+ filterStatement +"']" ).show();
				}
			}

			if ($select) {
				if ($item.parent().attr('id') == 'filterTabs4') {
					filterStatement = $item.find('a').text();
					document.location.hash = $item.find('a').data('hash');
				}
				$select.val(filterStatement);
				$select.closest('.select').find('.select-val').html(filterStatement);
			}
		};

		this.init();

		return this;

	};

	var filterTabs1;
	if ($('#filterTabs1').length) filterTabs1 = new FilterTabs({el:'#filterTabs1', rel:'.standartModules:not(".standartModules--2") .col', adaptive: false});

	var filterTabs2;
	if ($('#filterTabs2').length) filterTabs2 = new FilterTabs({el:'#filterTabs2', rel:'#online-manual .docSection-filter', adaptive: false, select: '#filterSelect2'});

	var filterTabs3;
	if ($('#filterTabs3').length) filterTabs3 = new FilterTabs({el:'#filterTabs3', rel:'#fast-start .docSection-filter', adaptive: false, select: '#filterSelect3'});

	var filterTabs4;
	if ($('#filterTabs4').length) filterTabs4 = new FilterTabs({el:'#filterTabs4', rel:'#online-manual .docSection-filter', adaptive: false, select: '#filterSelect4'});



	// ! init peppermints

	function initPeppermint() {

		$('.bigScreen, .nedit-slider').each(function(){
			$this = $(this);
			dots = $this.hasClass('nedit-slider');
			dotsContainer = undefined;

			if ($this.hasClass('nedit-slider')) {
				dotsContainer = $this.find('.nedit-dots').get(0);
			}

			var slider = $this.find('.peppermint');
			slider.Peppermint({
				dots: dots,
				dotsContainer: dotsContainer
			});

			if ($this.find('.right-arr').length) $this.find('.right-arr').click(slider.data('Peppermint').next);
			if ($this.find('.left-arr').length) $this.find('.left-arr').click(slider.data('Peppermint').prev);
		});

	};

	initPeppermint();



	// ! fullscreen

	function textAreaFullscreen() {

		var $t = $('#tz-textarea'),
			$f = $('#tz-fullscreen'),
			$tt = $('#tz-popup-textarea'),
			$p = $('#pop-tz'),
			$o = $('.overlay'),
			$close = $('.overlay, #tz-smallscreen, #tz-save-and-close'),
			timer = 400;

		function showPopup() {
			var text = $t.val();
			$tt.val(text);
			$p.css({'margin-top': '-'+ ($p.outerHeight()/2) +'px'});
			$p.fadeIn(timer, function(){
				var v = $tt.val();
				$tt.focus().val('').val(v);
			});
			$o.fadeIn(timer);
		};

		function hidePopup() {
			var text = $tt.val();
			$t.val(text);
			$p.fadeOut(timer);
			$o.fadeOut(timer);
		};


		$f.on('click', function(e){
			e.preventDefault();
			showPopup();
		});

		$close.on('click', function(e){
			e.preventDefault();
			hidePopup();
		});

	};

	textAreaFullscreen();



	// ! new edition

	function newEditionButtons() {

		$('.nedit-button a').on('click', function(e){
			e.preventDefault();
			$('html, body').animate({scrollTop: $('.contentBlock').offset().top - 50}, 450);
			$('.tab.active').next().find('a').click();
		});

	};

	newEditionButtons();



	function copyNeeded() {

		var counter = 0, counter2 = 0;

		$('.nedit-row').each(function(){
			counter = 0;
			$(this).find('.nedit-col').each(function(){
				if (counter % 2 == 0) {
					$(this).addClass('frst');
				}
				else {
					$(this).addClass('lst');
				}

				counter++;
			});
		});


		$('.nedit-container').each(function(){
			counter2 = 0;

			$(this).find('.nedit-row').each(function(){

				var $this = $(this);
				if (counter2 % 2 !== 0) {
					$(this).addClass('even');
				}
				else {
					$(this).addClass('odd');
				}

				counter2++;
			});
		});


		$('.nedit-row.even .nedit-col.lst').each(function(){
			var $clone = $(this).clone().addClass('more');
			$(this).parents('.nedit-row').prepend($clone);
		});

		initPeppermint();


	};

	copyNeeded();


	function watchModules() {

		$('#modules-watch-button').on('click', function(e){
			e.preventDefault();
			$('html, body').animate({scrollTop: $('#contains').offset().top - 50}, 400);
		});

	};

	watchModules();



	function actEditionMobile() {

		$('.nedit-row').on('click', function(e){
			e.preventDefault();
			if (!$(this).hasClass('act')) $('.nedit-row.act').removeClass('act');
			if ( $(e.target).hasClass('go_link') ) { window.location.href = $(e.target).attr('href'); }
			$(this).toggleClass('act');
		});

	};

	actEditionMobile();



	function featuresMenu() {

		var offt = 0;

		var $menu = $('.ftrs-fixed');
		if (!$menu.length) {return false;}

		function setOffset() {
			offt = $('.contentBlock:first').offset().top;
		};

		setOffset();
		$(window).resize(function(){
			setOffset();
		});

		$(window).scroll(function(){
			if ($(window).scrollTop() >= offt) {
				$menu.fadeIn(100);
			}
			else {
				$menu.fadeOut(100);
			}
		});

	};

	featuresMenu();



	// ! edition compare

	function editionCompareActions() {

		var $cells = $('.edCompare-cell');
		if (!$cells.length) {return false;}

		$cells.on('mouseenter', function(){
			var clsnm = $(this).attr('class').split(' ').join('.');
			if (clsnm.indexOf('td1') == -1) $('.'+clsnm).addClass('hoverred');
		}).on('mouseleave', function(){
			var clsnm = $(this).attr('class').split(' ').join('.');
			$('.'+clsnm).removeClass('hoverred');
		});


		var $button = $('#edition-compare-button');

		$button.on('click', function(e){
			e.preventDefault();
			$('.edCompare').toggleClass('active');

			if (!$('.edCompare').hasClass('active') && $('.prodEditions').length) {
				$('html, body').animate({scrollTop: $('.prodEditions').offset().top}, 400);
				$button.html('Сравнение редакций');

				if (sticky3) {
					sticky3.update();
					$('.edCompare-header.sticky-fxd, .edCompare-header.sticky-abs').removeClass('active');
				}
			}
			else {
				$button.html('Свернуть сравнение');

				setTimeout(function(){
					if (sticky3) {
						sticky3.update();
						$('.edCompare-header.sticky-fxd, .edCompare-header.sticky-abs').addClass('active');
					}
				}, 400);

			}
		});

	};

	editionCompareActions();



	// ! versions

	function versionListAccordeon() {

		var $accord = $('.change-list'),
			$links = $('.change-list > li > a');

		$accord.each(function(){
			var i = 0;
			$(this).find('li').each(function(){
				$(this).attr('data-index', i);
				i++;
			});
		})

		$links.on('click', function(e){
			e.preventDefault();
			if ($(this).hasClass('active')) {
				$('.change-list > li > a, .change-list ul.active').removeClass('active');
			}
			else {
				$('.change-list > li > a, .change-list ul.active').removeClass('active');
				var idx = $(this).closest('li').attr('data-index');
				$('.change-list li[data-index="'+idx+'"]').find('a, ul').addClass('active');
				//$(this).addClass('active');
				//$(this).closest('li').find('ul').addClass('active');
			}
		});

	};

	versionListAccordeon();



	// ! history up

	function historyUpAction() {
		var $up = $('.change-up, .manWrap-up, .tests-up'),

			oft, oft2;
		if (!$up.length) {return false;}

		function defineLimit() {
			oft = 0;
			if ($('.changeHistory-versions:first').length) oft = $('.changeHistory-versions:first').offset().top;
			if ($('.manWrap-nav').length) oft = $('.manWrap-nav').offset().top + $('.manWrap-nav').outerHeight() / 2;
			if ($('.redTests-left').length) oft = $('.redTests-left').offset().top + $('.redTests-list').outerHeight() / 2;
			oft2 = $('#all').height() - $(window).height() - $('footer').height() - 100;
		}

		$(window).scroll(function(){
			var sct = $(window).scrollTop();
			if (sct >= oft && sct < oft2) {
				$up.addClass('active');
			}
			else {
				$up.removeClass('active');
			}
		});

		defineLimit();

		$(window).resize(function(){
			defineLimit();
		})

	};

	historyUpAction();



	// ! undercuts

	function undercutActions() {

		var $undercut = $('.undercut');
		if (!$undercut.length) {return false;}

		var $link = $('.js-undercut-action-link');

		function updateDependencies() {
			if (sticky1) sticky1.update(500);
			if (sticky2) sticky2.update(500);
			setTimeout(function(){
				historyUpAction();
			}, 500);
		};

		$link.on('click', function(e){
			e.preventDefault();
			var $this = $(this);
			if ($this.hasClass('active')) $link.removeClass('active').html('Подробный обзор');
			else $link.addClass('active').html('Свернуть');

			$undercut.toggleClass('active');
			$('.undercut-hide').toggleClass('active');
			updateDependencies();
		});

		$('#undercut-hide').on('click', function(e){
			e.preventDefault();
			$link.removeClass('active').html('Подробный обзор');
			$undercut.toggleClass('active');
			$('.undercut-hide').toggleClass('active');
			updateDependencies();

			if ($('.newVersion').length) $('html, body').animate({scrollTop: $('.newVersion').offset().top}, 400);
		});


	};

	undercutActions();


	// mobile accordeon changelog

	function mobileChangelogAccordeon() {

		var $accitem = $('.change-title');
		if (!$accitem.length) {return false;}

		$accitem.on('click', function(e){
			e.preventDefault();
			if ($(this).closest('.change-item').hasClass('active')) {
				$(this).closest('.change-item').removeClass('active');
			}
			else {
				$('.change-item.active').removeClass('active');
				$(this).closest('.change-item').addClass('active');
			}
		});

	};

	mobileChangelogAccordeon();


	// ! demo

	function demoButtons() {

		$('.arrow-button a').on('click', function(e){
			e.preventDefault();
			$('html, body').animate({scrollTop: $('.demoInterface').offset().top - 50}, 450);
			$('.tab.active').next().find('a').click();
		});

	};

	demoButtons();


	// ! demo boxes

	function demoBoxes() {

		var $box = $('.demoEdition-box');
		if (!$box.length) {return false;}

		$box.on('click', function(e){
			e.preventDefault();
			var system = $(this).data('system'),
				url = window.location.origin + '/'+ window.location.pathname.split('/')[1] + '/' + system + '/';
			$box.removeClass('active');
			$(this).addClass('active');

			if (!!(window.history && history.pushState)) { window.history.pushState(null, null, url);
			} else { window.location = url; return; }

			$('.demoHidden').hide();
			$('.demoHidden[data-system="'+ system +'"]').show();
		});

	};

	demoBoxes();


	$('.demoPromo-manual').on('click', function(e){
		e.preventDefault();
		$('.demoHidden.manual').toggle();
	});


	$('.demoLoadExamples').on('click', function(e){
		e.preventDefault();
		var limit = $(this).parent().parent().find('.demoExamples-col').length,
			edition_id = $(this).data('edition_id'),
			container = $(this).parent();
		$.get('http://netcat.ru/ordersite/partners/sites/?nc_ctpl=826&edition_id='+ edition_id +'&isNaked=1&limit=' + limit).success(function(resp){ container.before(resp); });
	});



	// ! demo examples

	function demoExamples() {

		var $blocks = $('.demoEx');
		if (!$blocks.length) {return false;}

		$blocks.each(function(){
			var $this = $(this),
				$link1 = $this.find('.demoEx-title a'),
				$link2 = $this.find('.demoEx-author a');

			$this.on('click', function(e){
				if (!$(e.target).closest('.demoEx-author a').length && !$(e.target).closest('.demoEx-title a').length) {
					$link1.click();
				}
			});
		});

	};

	demoExamples();



	function setDocsMarkup() {

		var $lists = $('.docsSection-list');
		if (!$lists.length) {return false;}

		var curList = 1;

		$lists.each(function(){
			var $this = $(this),
				$item = $this.find('li');

			var size = $item.length,
				delta = size % 4,
				fc = (size - delta) / 4,
				forCol = [fc, fc, fc, fc],
				colIndex = 0,
				colCount = 0;

			for (var i = 0; i < delta; i++) {
				forCol[i]++;
			}

			$this.after('<ul class="docsSection-listing" data-list="'+curList+'"></ul><ul class="docsSection-listing" data-list="'+curList+'"></ul><ul class="docsSection-listing" data-list="'+curList+'"></ul><ul class="docsSection-listing" data-list="'+curList+'"></ul>');


			$item.each(function(){
				var $this = $(this);
				$('html').find('.docsSection-listing[data-list="'+curList+'"]:eq('+colIndex+')').append($this);
				colCount++;

				if (colCount == forCol[colIndex]) {
					colIndex++;
					colCount = 0;
				}
			});

			curList++;
		});

	};

	setDocsMarkup();



	// ! docs accordeon

	function docsAccordeon() {

		var $accordeon = $('.docsAccordeon');
		if (!$accordeon.length) {return false;}

		$accordeon.each(function(){
			var $this = $(this),
				$section = $this.find('.docsAccordeon-section'),
				$header = $this.find('.docsAccordeon-header');


			$header.on('click', function(e){
				e.preventDefault();
				$(this).closest('.docsAccordeon-section').addClass('current')
				$(this).closest('.docsAccordeon').find('.docsAccordeon-section.active:not(.current)').removeClass('active');
				$(this).closest('.docsAccordeon-section').toggleClass('active').removeClass('current');
			});

		});

	};

	docsAccordeon();



	// ! comments link

	function answerToComment() {

		var $links = $('.mwcom-answer');
		if (!$links.length) {return false;}

		$links.on('click', function(e){
			e.preventDefault();
			$('html, body').animate({scrollTop: $('.mwcom--comment').offset().top - 30}, 300, function(){
				$('.mwcom--comment textarea').focus();
			});
		});

	};

	answerToComment();



	// ! fotorama partners

	function initPartnersFotorama() {

		var $fr = $('.bapReviews .fotorama');
		if (!$fr.length) {return false;}

		function init() {
			$fr.fotorama({
				height: $('.bapReviews-slider').height()
			});

			var dt = $fr.data('fotorama');

			$('.bapReviews-arrow--left, .bapReviews-arrow--right').off('click');

			$('.bapReviews-arrow--left').click(function(){
				dt.show('<');
			});
			$('.bapReviews-arrow--right').click(function(){
				dt.show('>');
			});
		};

		init();

		$(window).resize(function(){
			init();
		})

	};

	initPartnersFotorama();



	// ! partners form

	function partnersFormValidity() {

		var $form = $('.bapForm-form');
		if (!$form.length) {return false;}


		function checkValidity($form) {
			var valid = true;

			$form.find('input[required], textarea').each(function(){
				if ($(this).val() == '' || ($(this).attr('type') == 'email' && $(this).val().indexOf('@') == -1) || ($(this).attr('type') == 'email' && $(this).val().indexOf('.') == -1)) valid = false
			});

			return valid;
		};

		function showError(msg) {
			var $error = $('.bapForm-error');
			$error.html(msg).show();
		};

		function clearErrors() {
			var $error = $('.bapForm-error');
			$error.empty().hide();
		};


		$form.find('button').addClass('disabled').attr('disabled','disabled');
		clearErrors();

		$form.on('keyup change', function(e){
			e.preventDefault();
			if (!checkValidity($(this))) $form.find('button').addClass('disabled').attr('disabled','disabled');
			else $form.find('button').removeClass('disabled').removeAttr('disabled');
		});

		$form.find('input').on('focus', function(){
			clearErrors();
			$(this).removeClass('req').closest('label').removeClass('req');
		})

		$form.on('submit', function(e){
			e.preventDefault();
			if (!checkValidity($(this))) {
				$form.find('input[required]').each(function(){
					if ($(this).val() == '' || ($(this).attr('type') == 'email' && $(this).val().indexOf('@') == -1) || ($(this).attr('type') == 'email' && $(this).val().indexOf('.') == -1)) {
						$(this).addClass('req');
						$(this).closest('label').addClass('req');
					}
				});
				showError('Укажите пожалуйста имя и корректную почту');
			} else {

				var data = $(this).serialize(),
					url = $(this).attr('action');

				$.post(url, data).success(function(resp){

					var $suc = $form.closest('.bapForm').find('.bapForm-success');
					if ( resp.indexOf('вашего адреса уже оставлена заявка') != -1 ) {
						$suc.find('h2, img').remove();
						$suc.find('.bapForm-ok').html('С вашего адреса уже оставлена заявка.<br />Пожалуйста, дождитесь ее обработки, или свяжитесь с нами по адресу <a href=\'mailto:info@netcat.ru\'>info@netcat.ru</a>.');
					}

					$form.find('.bapForm-normal').hide();

					// Событие facebook
					try {
						fbq('track', 'PartnerFormSent'); console.log('fb: PartnerFormSent');
					} catch(e) { console.log('Ошибка ' + e.name + ": " + e.message); }

					// Событие для метрики
					if (typeof yaCounter33990055 == 'object') {
						yaCounter33990055.reachGoal('PARTNERFORM_SENT');
						console.log('yaCounter: PARTNERFORM_SENT');
					}

					$suc.show();
				});
			}
		})
	};

	partnersFormValidity();



	function docsLeftColActions() {

		var $lc = $('.manWrap-menu');
		var $ic = $('.m_menu-icon');
		if (!$lc.length) {return false;}


		$lc.find('.itemrow-arrow').each(function(){
			var $this = $(this);
			$this.after('<span class="itemrow-touchSide"></span>');
		});


		function initScollpane(onlyVert) {

			var vert = onlyVert || false;

			var $sc = $('.scrollpane');
			if (!$sc.length) {return false;}

			var attrs = {mouseWheelSpeed: MOUSE_WHEEL_SPEED}
			if (vert) attrs.contentWidth = '0px';

			$sc.each(function(){
				var $this = $(this);
				$this.jScrollPane(attrs);
			});

		};

		$(window).resize(function(){
			initScollpane(true);
		});

		function setScrollPosition() {
			var sct = $(window).scrollTop() + $(window).height();
			var offt = -1 * Math.max( (sct - $('#all').height() + $('.footer-wrap').height()), 0);

			$lc.css({
				'margin-top':offt+'px'
			});

		};

		$(window).scroll(function(){
			setScrollPosition();
		});

		var w, animRTL, animRTLFinal, animRTLAFinal, animLTR, animLTRFinal, animLTRAFinal;


		function calcAttrs() {
			w = $lc.width();

			animRTL = {
				'-webkit-transform': 'translate('+w+'px)',
				'-moz-transform': 'translate('+w+'px)',
				'-ms-transform': 'translate('+w+'px)',
				'-o-transform': 'translate('+w+'px)',
				'transform': 'translate('+w+'px)',
				'opacity':'1'
			};

			animRTLFinal = {
				'-webkit-transform': 'translate(0px)',
				'-moz-transform': 'translate(0px)',
				'-ms-transform': 'translate(0px)',
				'-o-transform': 'translate(0px)',
				'transform': 'translate(0px)',
				'opacity':'1'
			};

			animRTLAFinal = {
				'-webkit-transform': 'translate(-'+w+'px)',
				'-moz-transform': 'translate(-'+w+'px)',
				'-ms-transform': 'translate(-'+w+'px)',
				'-o-transform': 'translate(-'+w+'px)',
				'transform': 'translate(-'+w+'px)',
				'opacity':'1'
			};

			animLTR = {
				'-webkit-transform': 'translate(-'+w+'px)',
				'-moz-transform': 'translate(-'+w+'px)',
				'-ms-transform': 'translate(-'+w+'px)',
				'-o-transform': 'translate(-'+w+'px)',
				'transform': 'translate(-'+w+'px)',
				'opacity':'1'
			};

			animLTRFinal = {
				'-webkit-transform': 'translate('+w+'px)',
				'-moz-transform': 'translate('+w+'px)',
				'-ms-transform': 'translate('+w+'px)',
				'-o-transform': 'translate('+w+'px)',
				'transform': 'translate('+w+'px)',
				'opacity':'1'
			};

			animLTRAFinal = {
				'-webkit-transform': 'translate(0px)',
				'-moz-transform': 'translate(0px)',
				'-ms-transform': 'translate(0px)',
				'-o-transform': 'translate(0px)',
				'transform': 'translate(0px)',
				'opacity':'1'
			};
		};

		calcAttrs();
		$(window).resize(function(){
			calcAttrs();
		})

		// подготовка к анимации
		function prepareLevels() {
			var $act = $('.manWrap-nav.active'),
				actLevel = parseInt($act.closest('[data-level]').attr('data-level')),
				nextLevel = actLevel + 1,
				prevLevel = actLevel - 1;

			$('[data-level="'+nextLevel+'"]').css(animRTL);
			$('[data-level="'+prevLevel+'"]').css(animLTR);
			$('.manWrap-nav').height(0);
			$act.css({'height':'auto'});
		};


		prepareLevels();

		$('[data-nextlevel]').on('click', function(e){
			if ($(e.target).closest('.itemrow-touchSide').length) {
				e.preventDefault();
				var level = $(this).attr('data-nextlevel'),
					listId = $(this).attr('data-nextlistid');

				var $list = $('[data-listid="'+listId+'"]'),
					$curList = $(this).parents('.manWrap-nav');


				$list.css(animRTLFinal).closest('[data-level]').addClass('active');
				$curList.css(animRTLAFinal).closest('[data-level]').removeClass('active');

				setTimeout(function(){
					$list.removeAttr('style').css({'height':'auto'});
					$curList.removeAttr('style').height(0);
					setScrollPosition();
					prepareLevels();
					initScollpane(true);
				}, 500);
			}
		});


		$('[data-prevlevel]').on('click', function(e){
			e.preventDefault();

			var level = $(this).attr('data-prevlevel'),
				listId = $(this).attr('data-prevlistid');

			var $list = $('[data-listid="'+listId+'"]'),
				$curList = $(this).parents('.manWrap-nav');


			$list.css(animLTRAFinal).closest('[data-level]').addClass('active');
			$curList.css(animLTRFinal).closest('[data-level]').removeClass('active');

			setTimeout(function(){
				$list.removeAttr('style').css({'height':'auto'});
				$curList.removeAttr('style').height(0);
				setScrollPosition();
				prepareLevels();
				initScollpane(true);
			}, 500);
		});


		$ic.on('click', function(e){
			e.preventDefault();
			if ($(this).hasClass('active')) {
				$lc.removeClass('shown');
			}	else {
				$lc.addClass('shown');
			}
			$(this).toggleClass('active');
		});


		$('.manWrap-nav').removeClass('ready');
		initScollpane(true);


		var touchOnPre = false;

		$('.manWrap pre').on('touchstart pointerdown', function(){
			touchOnPre = true;
		}).on('touchend pointerup', function(){
			touchOnPre = false;
		})

		$('.manWrap div').touchwipe({
			wipeLeft: function() {
				if (!touchOnPre) {
					$lc.addClass('shown');
					$ic.addClass('active');
				}
			},
			wipeRight: function() {
				$lc.removeClass('shown');
				$ic.removeClass('active');
			},
			preventDefaultEvents: false
		})

	};

	docsLeftColActions();



	// ! performance mobile menu

	function perfMobMenu() {

		var $menuVal = $('#testsSelect1'),
			$panels = $('.redTests-content'),
			$list = $('.redTests-list'),
			$items = $('.redTests-item'),
			clicked = false;


		function showPanel(panel, silent) {
			$panels.hide();
			$('[data-panel="'+panel+'"]').show();
			historyUpAction();
			clicked = false;
			if (!silent) $('html, body').delay(200).animate({scrollTop: ($('[data-panel]:visible').offset().top - 50)+'px'}, 300);
		};

		$items.on('click', function(e){
			e.preventDefault();
			var panel = $(this).attr('href').replace('#', '');
			$items.removeClass('active');
			$('.redTests-item[href="#'+panel+'"]').addClass('active');

			clicked = true;
			$menuVal.val(panel).trigger('change');
			$('html').find('[data-id="testsSelect1"]').val(panel).trigger('change');

			var silent = false;
			if ($(window).width() <= 880) {
				silent = true;
			}

			showPanel(panel, silent);
			if (sticky4) sticky4.update();
		});

		$menuVal.on('change', function(e){
			var v = $(this).val();
			if (!clicked) $('.redTests-item[href="#'+v+'"]').click();
		});

		showPanel('extra', true);
		$('.redTests-item[href="#extra"]').addClass('active');
		if (sticky4) sticky4.update();
	};

	perfMobMenu();



	// sidemodules

	function wrapSodemodules() {

		var $ms = $('.sidemodule');
		if (!$ms.length) {return false;}

		$ms.each(function(){
			var $this = $(this);
			$this.prev('p').andSelf().wrapAll('<div class="rel" />');
		});

	};

	wrapSodemodules();


	// copy

	function copyToClipboard() {

		var clipboard = new Clipboard('.copy');

	};

	copyToClipboard();


	// ! swiper

	function initSwipers() {

		var swiper = new Swiper('.swiper-container', {
		    speed: 400,
		    loop: true,
		    grabCursor: true,
		    nextButton: '.swiper-button-next',
		    prevButton: '.swiper-button-prev',
		    slidesPerView: 3,

		    breakpoints: {

				700: {
					slidesPerView: 1,
					spaceBetweenSlides: 20
				},

				960: {
					slidesPerView: 2,
					spaceBetweenSlides: 30
				}
			}
		});

	};

	initSwipers();




	// ! filter tabs

	function TagTabs(config) {

		var $list,
			$items,
			$filterItems,
			$select,
			self = this;

		this.config = config || {};

		this.init = function() {
			if (!config.el || !$(config.el).length) {
				console.error('TagTabs: no element');
				return;
			}

			if (!config.rel || !$(config.rel).length) {
				console.error('TagTabs: no relative elements');
				return;
			}

			$list = $(config.el);
			$items = $list.find('.tab');
			$filterItems = $(config.rel);

			$select = $(config.select) || false;

			$filterItems.hide();

			$items.on('click', function(e){
				e.preventDefault();
				self.changeTab($(this));
			});

			$list.find('.tab:first').click();

			if ($select) {
				$select.on('change', function(){
					var filterStatement = $select.val();
					$list.find('[href="#'+filterStatement+'"]:not(.active)').click();
				});
			}
		};

		this.changeTab = function($item) {
			$items.removeClass('active');
			$item.addClass('active');

			var filterStatement = $item.find('a').attr('href').replace('#',''),
				filterVal = $item.text();

			if (filterStatement == 'all') $filterItems.show();
			else {
				$filterItems.each(function(){
					var $this = $(this);
					if ($this.attr('data-tagfilter').indexOf(filterStatement)+1) $this.show();
					else $this.hide();
				});
			}

			if ($select) {
				$select.val(filterStatement);
				$select.closest('.select').find('.select-val').html(filterVal);
			}
		};


		this.init();

		return this;

	};


	var tagTabs1;
	if ($('#tagFilter1').length) tagTabs1 = new TagTabs({el:'#tagFilter1', rel:'.videoLessons .col', select: '#tagFilterSelect1'});




	// about vacations height

	function setAboutVacationsHeight() {

		var $v = $('.vac-wrap');
		if (!$v.length) {return false;}

		function setHeight() {
			var max = 0;

			$v.removeAttr('style').each(function(){
				var $this = $(this);
				if ($this.outerHeight() > max) max = $this.outerHeight();
			});

			$v.outerHeight(max);
		};


		setHeight();
		$(window).resize(function(){
			setHeight();
		});

	};

	setAboutVacationsHeight();



	// about contacts form

	function handlerAboutFormActions() {

		var $form = $('.abForm form');
		if (!$form.length) {return false;}

		function checkValidity($form) {
			var valid = true;

			$form.find('input[required]').each(function(){
				if ($(this).val() == '' || ($(this).attr('type') == 'email' && $(this).val().indexOf('@') == -1) || ($(this).attr('type') == 'email' && $(this).val().indexOf('.') == -1)) valid = false
			});

			return valid;
		};

		function showError(msg) {
			var $error = $('.abForm-error');
			$error.html(msg).show();
		};

		function clearErrors() {
			var $error = $('.abForm-error');
			$error.empty().hide();
		};

		function checkSend() {
			if (!checkValidity($form)) {
				$form.find('input[required]').each(function(){
					if ($(this).val() == '' || ($(this).attr('type') == 'email' && $(this).val().indexOf('@') == -1) || ($(this).attr('type') == 'email' && $(this).val().indexOf('.') == -1)) {
						$(this).addClass('req');
					}
				});
				// emulate error from server
				showError('Пожалуйста, укажите ваши имя и почту');
			}
			else {
				var $suc = $form.closest('.abForm').find('.abForm-success');
				$suc.show().removeClass('ready');
			}
		}


		clearErrors();

		$form.find('input').on('focus', function(){
			clearErrors();
			$(this).removeClass('req').closest('label').removeClass('req');
		})

		$form.on('submit', function(e){
			e.preventDefault();
			checkSend();
		});

		$form.find('button').on('click', function(e){
			e.preventDefault();
			checkSend();
		});

	};

	handlerAboutFormActions();




	// ! map contacts

	function map() {

		var styles = [{featureType:"administrative",elementType:"labels.text.fill",stylers:[{color:"#444444"}]},{featureType:"landscape",elementType:"all",stylers:[{color:"#f2f2f2"}]},{featureType:"poi",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"poi.business",elementType:"geometry.fill",stylers:[{visibility:"on"}]},{featureType:"road",elementType:"all",stylers:[{saturation:-100},{lightness:45}]},{featureType:"road.highway",elementType:"all",stylers:[{visibility:"simplified"}]},{featureType:"road.arterial",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"transit",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"all",stylers:[{color:"#b4d4e1"},{visibility:"on"}]}];;

		var elemId ='map_canvas',
				lat = parseFloat($('#'+elemId).attr('data-lat')) || 55.792140,
				lng = parseFloat($('#'+elemId).attr('data-lng')) || 37.603309,
				zoomDef = parseInt($('#'+elemId).attr('data-zoom')) || 16;

		var drg = true;
		if (is_touch_device || isAndroid) {drg = false;}

		function initMap() {
		    var myLatlng = new google.maps.LatLng(lat, lng);
		    var myOptions = {
		        zoom: zoomDef,
		        center: myLatlng,
		        scrollwheel: false,
		        styles: styles,
		        draggable: drg,
						navigationControl: false,
						mapTypeControl: false,
						scaleControl: false,
						panControl: false,
						streetViewControl: false,
						overviewMapControl: false,
		    }
		    var map = new google.maps.Map(document.getElementById(elemId), myOptions);

		    var marker = new google.maps.Marker({
		    	position: myLatlng,
					map: map,
					icon: 'img/about/i-pin-n.png'
				});
		}

		initMap();

	};

	if ($('#map_canvas').length) { map(); }



	// ! map contacts

	function partmap() {

		// пример данных
		var defaultInfo = {
			lat: 53.792140,
			lng: 37.603309,
			title: "Неткет",
			link: "netcat.ru",
			url: "http://netcat.ru",
			address: "Москва, Улица 1905 года, 8",
			phone: "+7 (495) 248-33-44 ",
			email: "mail@netcat.ru",
			profileLink: "#"
		}

		var info = [
			{
				lat: 53.792140,
				lng: 41.603309,
				title: "Интернет-компания «Инсайт»",
				link: "insite-it.ru",
				url: "http://insite-it.ru",
				address: "Москва, Улица 1905 года, 8",
				phone: "+7 (495) 248-33-44 ",
				email: "mail@insite-it.ru",
				serts: [1,2,3,4],
				sertsTtls: ["Технологический партнёр", "Тех партнёр", "Тех партнёр", "Техно партнёр"],
				profileLink: "#"
			},
			{
				lat: 59.792140,
				lng: 49.603309,
				title: "«Инсайт»",
				link: "insite.com",
				url: "http://insite.com",
				address: "Москва, Садовое кольцо, 18",
				phone: "+7 (495) 333-77-88 ",
				email: "mail@insite.com",
				serts: [1,2],
				sertsTtls: ["Технологический партнёр", "Тех партнёр"],
				profileLink: "#"
			},
			{
				lat: 48.792140,
				lng: 50.603309,
				title: "Нонейм",
				link: "noname.com",
				url: "http://noname.com",
				address: "Москва, какой-то адрес",
				phone: "+7 (495) 333-11-11 ",
				email: "",
				serts: [1],
				sertsTtls: ["Технологический партнёр"],
				profileLink: "#"
			}
		]

		// стили карты
		var styles = [{featureType:"administrative",elementType:"labels.text.fill",stylers:[{color:"#444444"}]},{featureType:"landscape",elementType:"all",stylers:[{color:"#f2f2f2"}]},{featureType:"poi",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"poi.business",elementType:"geometry.fill",stylers:[{visibility:"on"}]},{featureType:"road",elementType:"all",stylers:[{saturation:-100},{lightness:45}]},{featureType:"road.highway",elementType:"all",stylers:[{visibility:"simplified"}]},{featureType:"road.arterial",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"transit",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"all",stylers:[{color:"#b4d4e1"},{visibility:"on"}]}];

		var elemId ='partmap-map_canvas',
			lat = parseFloat($('#'+elemId).attr('data-lat')) || 55.792140,
			lng = parseFloat($('#'+elemId).attr('data-lng')) || 37.603309,
			clat = parseFloat($('#'+elemId).attr('data-lat')) || 55.792140,
			clng = parseFloat($('#'+elemId).attr('data-lng')) || 75.603309,
			zoomDef = parseInt($('#'+elemId).attr('data-zoom')) || 3;

		var drg = true,
			markers = [],
			activeMarker = -1,
			$infoBlock = $('.partmap-info'),
			map;

		var $lar = $('.partmap-arrow--left'),
			$rar = $('.partmap-arrow--right');

		if (is_touch_device || isAndroid) {drg = false;}

		function initMap() {
		    var myLatlng = new google.maps.LatLng(lat, lng);
		    var cLatlng = new google.maps.LatLng(clat, clng);
		    var myOptions = {
		        zoom: zoomDef,
		        center: cLatlng,
		        scrollwheel: false,
		        styles: styles,
		        draggable: drg,
				navigationControl: false,
				mapTypeControl: false,
				scaleControl: false,
				panControl: false,
				streetViewControl: false,
				overviewMapControl: false
		    }

		    map = new google.maps.Map(document.getElementById(elemId), myOptions);

		    // netcat marker
		    var companyMarker = new google.maps.Marker({
		    	position: myLatlng,
				map: map,
				icon: 'img/about/pin.png'
			});

			companyMarker.addListener('click', function(u) {
				activeMarker = -1;
				initMarkers(map);
			})

			// other markers
			initMarkers(map);
		};

		function clearMarkers() {
			for (var i = 0; i < markers.length; i++) {
				markers[i].setMap(null);
			}
		}

		function initMarkers(map) {
			clearMarkers();
			markers = [];

			for (var i = 0; i < info.length; i++) {
				var i = i,
					icon = 'img/about/i-mappin.png';

				// marker
				if (i == activeMarker) {
				    icon = 'img/about/i-mappin-active.png';
				    $infoBlock.find('.partmap-title').html(info[i].title);
				    $infoBlock.find('.partmap-link').html(info[i].link);
				    $infoBlock.find('.partmap-link').attr('href', info[i].url);
				    $infoBlock.find('.partmap-address').html(info[i].address);
				    $infoBlock.find('.partmap-phone').html(info[i].phone);
				    $infoBlock.find('.partmap-email').html(info[i].email);
				    $infoBlock.find('.partmap-email').attr('href', 'mailto:'+info[i].email);

				    var str = '';
				    if (info[i].serts) {
					    for (var j = 0; j < info[i].serts.length; j++) {
						    var sert = info[i].serts[j];
						    if (sert) str += '<div class="medal"><div class="m-ttl" title="'+info[i].sertsTtls[j]+'"></div><div class="m m--'+sert+'"></div></div>';
					    }

					    if (str !== '') {
						    $infoBlock.find('.partmap-serts').show();
						    $infoBlock.find('.medals--big').empty().append(str);
					    }
					    else {
						    $infoBlock.find('.partmap-serts').hide();
					    }
				    }
				    else {
					    $infoBlock.find('.partmap-serts').hide();
				    }

				    $infoBlock.find('.partmap-button').attr('href', info[i].profileLink);
			    }
			    // netcat
			    else if (activeMarker == -1) {
				    $infoBlock.find('.partmap-title').html(defaultInfo.title);
				    $infoBlock.find('.partmap-link').html(defaultInfo.link);
				    $infoBlock.find('.partmap-link').attr('href', defaultInfo.url);
				    $infoBlock.find('.partmap-address').html(defaultInfo.address);
				    $infoBlock.find('.partmap-phone').html(defaultInfo.phone);
				    $infoBlock.find('.partmap-email').html(defaultInfo.email);
				    $infoBlock.find('.partmap-email').attr('href', 'mailto:'+defaultInfo.email);

				    var str = '';
				    if (defaultInfo.serts) {
					    for (var j = 0; j < defaultInfo.serts.length; j++) {
						    var sert = defaultInfo.serts[j];
						    if (sert) str += '<div class="medal"><div class="m-ttl" title="'+defaultInfo.sertsTtls[j]+'"></div><div class="m m--'+sert+'"></div></div>';
					    }

					    if (str !== '') {
						    $infoBlock.find('.partmap-serts').show();
						    $infoBlock.find('.medals--big').empty().append(str);
					    }
					    else {
						    $infoBlock.find('.partmap-serts').hide();
					    }
				    }
				    else {
					    $infoBlock.find('.partmap-serts').hide();
				    }

				    $infoBlock.find('.partmap-button').attr('href', defaultInfo.profileLink);
			    }

				var mark = new google.maps.Marker({
			        position: new google.maps.LatLng(parseFloat(info[i].lat), parseFloat(info[i].lng)),
			        map: map,
			        icon: icon
			    });

			    markers[i] = mark;

			    mark.addListener('click', function(u) {
				    var lat = u.latLng.lat(),
				    	lng = u.latLng.lng(),
				    	_index;

					for (var b = 0; b < markers.length; b++) {
						if (markers[b].getPosition().lat() == lat && markers[b].getPosition().lng() == lng) {
							_index = b;
							break;
						}
					}

					activeMarker = _index;
					initMarkers(map);
				});
			}
		};


		function handleArrowClick(dir) {
			var dir = dir || 'l';
			if (dir == 'l') {
				if (activeMarker > -1) activeMarker--;
				else activeMarker = info.length-1;
			}
			else if (dir == 'r') {
				if (activeMarker < info.length - 1) activeMarker++;
				else activeMarker = -1;
			}

			initMarkers(map);
		};

		$lar.on('click', function(e){
			e.preventDefault();
			handleArrowClick('l');
		});

		$rar.on('click', function(e){
			e.preventDefault();
			handleArrowClick('r');
		});


		initMap();

	};

	if ( $('#partmap-map_canvas').length ) { partmap(); }



	// about statistics animation

	function aboutStatAnimation() {

		var $as = $('.aboutStat'),
			animated = false;
		if (!$as.length) {return false;}

		var $cols = $as.find('.col');
		$cols.addClass('ready');

		function showCols() {
			var delay = 0,
				j = 0;

			if (animated) return;

			var intr = setInterval(function() {
                $as.find('.col:eq('+j+')').removeClass('ready');
                j++;

                if (j == $cols.length) {
	                clearInterval(intr);
	                animated = true;
	            }
            }, 150);
		};

		$(window).load(function(){
			showCols();
		});

		$(window).scroll(function(){
			if ($(window).scrollTop() >= ($as.offset().top - $(window).height() / 2) && !animated) showCols();
		});

	};

	aboutStatAnimation();


});


// Покупка с лендига распродажи
$(document).ready(function(){
	if (document.location.hash == "#buy" && $('.buy_edition').length) {
		$('.buy_edition').trigger('click');
    }

    if ($('.bapForm-form').length) {
		var valid = true,
			$form = $('.bapForm-form');

		$form.find('input[required]').each(function(){
			if ($(this).val() == '' || ($(this).attr('type') == 'email' && $(this).val().indexOf('@') == -1) || ($(this).attr('type') == 'email' && $(this).val().indexOf('.') == -1)) valid = false
		});

		if (!valid) { $form.find('button').addClass('disabled').attr('disabled','disabled'); }
		else { $form.find('button').removeClass('disabled').removeAttr('disabled'); }
	}


	if ($('.fb-login').length) {
		$('.fb-login').on('click',function(e){
			e.preventDefault();

			window.fbAsyncInit = function() {
				FB.init({
				  appId      : '991495307574868',
				  xfbml      : true,
				  cookie     : true,
				  version    : 'v2.5'
				});

				FB.login(function (response) {
					if (response.authResponse) {
						location.href = '/netcat/modules/auth/?nc_fb=1&token=' + response.authResponse.accessToken + '&REQUESTED_FROM=' + document.location.pathname + document.location.search;
					} else {
						//an error occurred
					}
				}, {scope: 'email'});
			};

			(function(d, s, id){
			 var js, fjs = d.getElementsByTagName(s)[0];
			 if (d.getElementById(id)) {return;}
			 js = d.createElement(s); js.id = id;
			 js.src = "//connect.facebook.net/en_US/sdk.js";
			 fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));


		});
	}

	if ($('.fixedmenu').length) {
		$(window).scroll(function(){
			var header = $('.header').height() + parseInt($('#wrap').css('margin-top'), 10);
			if ($(window).scrollTop() >= header) {
				$('.section.newcontent.fixedmenu .aside').addClass('fixed');
			} else {
				$('.section.newcontent.fixedmenu .aside').removeClass('fixed');
			}
		});
	}


	// Фиск размеров видео iframe для блога
	if ($('.post').length) {
		var $allVideos = $("iframe, object, embed"),
			$container = $(".post .post-text .post_content");

		$allVideos.each(function() {

			$(this).attr('data-aspectRatio', this.height / this.width)
				.removeAttr('height')
				.removeAttr('width');
		});

		$(window).resize(function() {
			var newWidth = $container.width();
			$allVideos.each(function() {

				var $el = $(this);
				$el
					.width(newWidth)
					.height(newWidth * $el.attr('data-aspectRatio'));

			});
		}).resize();
	}

});

$.getScript('https://vk.com/js/api/openapi.js', function () {
	VK.init({apiId: 5199048});
});

function nc_vk_login ( is_member ) {
    var is_mem = is_member || 0;
    if ( !is_mem ) VK.Auth.login( nc_vk_login );
    else location.href = '/netcat/modules/auth/?nc_vk=1&REQUESTED_FROM=' + document.location.pathname + document.location.search;
}

/**
 * jQuery Plugin to obtain touch gestures from iPhone, iPod Touch and iPad, should also work with Android mobile phones (not tested yet!)
 * Common usage: wipe images (left and right to show the previous or next image)
 *
 * @author Andreas Waltl, netCU Internetagentur (http://www.netcu.de)
 * @version 1.1.1 (9th December 2010) - fix bug (older IE's had problems)
 * @version 1.1 (1st September 2010) - support wipe up and wipe down
 * @version 1.0 (15th July 2010)
*/
(function($){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft()}else{config.wipeRight()}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown()}else{config.wipeUp()}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);

/*!
 * clipboard.js v1.5.5
 * https://zenorocha.github.io/clipboard.js
 *
 * Licensed MIT © Zeno Rocha
 */
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.Clipboard=t()}}(function(){var t,e,n;return function t(e,n,r){function o(a,c){if(!n[a]){if(!e[a]){var s="function"==typeof require&&require;if(!c&&s)return s(a,!0);if(i)return i(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var l=n[a]={exports:{}};e[a][0].call(l.exports,function(t){var n=e[a][1][t];return o(n?n:t)},l,l.exports,t,e,n,r)}return n[a].exports}for(var i="function"==typeof require&&require,a=0;a<r.length;a++)o(r[a]);return o}({1:[function(t,e,n){var r=t("matches-selector");e.exports=function(t,e,n){for(var o=n?t:t.parentNode;o&&o!==document;){if(r(o,e))return o;o=o.parentNode}}},{"matches-selector":2}],2:[function(t,e,n){function r(t,e){if(i)return i.call(t,e);for(var n=t.parentNode.querySelectorAll(e),r=0;r<n.length;++r)if(n[r]==t)return!0;return!1}var o=Element.prototype,i=o.matchesSelector||o.webkitMatchesSelector||o.mozMatchesSelector||o.msMatchesSelector||o.oMatchesSelector;e.exports=r},{}],3:[function(t,e,n){function r(t,e,n,r){var i=o.apply(this,arguments);return t.addEventListener(n,i),{destroy:function(){t.removeEventListener(n,i)}}}function o(t,e,n,r){return function(n){n.delegateTarget=i(n.target,e,!0),n.delegateTarget&&r.call(t,n)}}var i=t("closest");e.exports=r},{closest:1}],4:[function(t,e,n){n.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},n.nodeList=function(t){var e=Object.prototype.toString.call(t);return void 0!==t&&("[object NodeList]"===e||"[object HTMLCollection]"===e)&&"length"in t&&(0===t.length||n.node(t[0]))},n.string=function(t){return"string"==typeof t||t instanceof String},n.function=function(t){var e=Object.prototype.toString.call(t);return"[object Function]"===e}},{}],5:[function(t,e,n){function r(t,e,n){if(!t&&!e&&!n)throw new Error("Missing required arguments");if(!c.string(e))throw new TypeError("Second argument must be a String");if(!c.function(n))throw new TypeError("Third argument must be a Function");if(c.node(t))return o(t,e,n);if(c.nodeList(t))return i(t,e,n);if(c.string(t))return a(t,e,n);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}function o(t,e,n){return t.addEventListener(e,n),{destroy:function(){t.removeEventListener(e,n)}}}function i(t,e,n){return Array.prototype.forEach.call(t,function(t){t.addEventListener(e,n)}),{destroy:function(){Array.prototype.forEach.call(t,function(t){t.removeEventListener(e,n)})}}}function a(t,e,n){return s(document.body,t,e,n)}var c=t("./is"),s=t("delegate");e.exports=r},{"./is":4,delegate:3}],6:[function(t,e,n){function r(t){var e;if("INPUT"===t.nodeName||"TEXTAREA"===t.nodeName)t.focus(),t.setSelectionRange(0,t.value.length),e=t.value;else{t.hasAttribute("contenteditable")&&t.focus();var n=window.getSelection(),r=document.createRange();r.selectNodeContents(t),n.removeAllRanges(),n.addRange(r),e=n.toString()}return e}e.exports=r},{}],7:[function(t,e,n){function r(){}r.prototype={on:function(t,e,n){var r=this.e||(this.e={});return(r[t]||(r[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){function r(){o.off(t,r),e.apply(n,arguments)}var o=this;return r._=e,this.on(t,r,n)},emit:function(t){var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),r=0,o=n.length;for(r;o>r;r++)n[r].fn.apply(n[r].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),r=n[t],o=[];if(r&&e)for(var i=0,a=r.length;a>i;i++)r[i].fn!==e&&r[i].fn._!==e&&o.push(r[i]);return o.length?n[t]=o:delete n[t],this}},e.exports=r},{}],8:[function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}n.__esModule=!0;var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),a=t("select"),c=r(a),s=function(){function t(e){o(this,t),this.resolveOptions(e),this.initSelection()}return t.prototype.resolveOptions=function t(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];this.action=e.action,this.emitter=e.emitter,this.target=e.target,this.text=e.text,this.trigger=e.trigger,this.selectedText=""},t.prototype.initSelection=function t(){if(this.text&&this.target)throw new Error('Multiple attributes declared, use either "target" or "text"');if(this.text)this.selectFake();else{if(!this.target)throw new Error('Missing required attributes, use either "target" or "text"');this.selectTarget()}},t.prototype.selectFake=function t(){var e=this;this.removeFake(),this.fakeHandler=document.body.addEventListener("click",function(){return e.removeFake()}),this.fakeElem=document.createElement("textarea"),this.fakeElem.style.position="absolute",this.fakeElem.style.left="-9999px",this.fakeElem.style.top=(window.pageYOffset||document.documentElement.scrollTop)+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,document.body.appendChild(this.fakeElem),this.selectedText=c.default(this.fakeElem),this.copyText()},t.prototype.removeFake=function t(){this.fakeHandler&&(document.body.removeEventListener("click"),this.fakeHandler=null),this.fakeElem&&(document.body.removeChild(this.fakeElem),this.fakeElem=null)},t.prototype.selectTarget=function t(){this.selectedText=c.default(this.target),this.copyText()},t.prototype.copyText=function t(){var e=void 0;try{e=document.execCommand(this.action)}catch(n){e=!1}this.handleResult(e)},t.prototype.handleResult=function t(e){e?this.emitter.emit("success",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)}):this.emitter.emit("error",{action:this.action,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})},t.prototype.clearSelection=function t(){this.target&&this.target.blur(),window.getSelection().removeAllRanges()},t.prototype.destroy=function t(){this.removeFake()},i(t,[{key:"action",set:function t(){var e=arguments.length<=0||void 0===arguments[0]?"copy":arguments[0];if(this._action=e,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function t(){return this._action}},{key:"target",set:function t(e){if(void 0!==e){if(!e||"object"!=typeof e||1!==e.nodeType)throw new Error('Invalid "target" value, use a valid Element');this._target=e}},get:function t(){return this._target}}]),t}();n.default=s,e.exports=n.default},{select:6}],9:[function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function a(t,e){var n="data-clipboard-"+t;if(e.hasAttribute(n))return e.getAttribute(n)}n.__esModule=!0;var c=t("./clipboard-action"),s=r(c),u=t("tiny-emitter"),l=r(u),f=t("good-listener"),d=r(f),h=function(t){function e(n,r){o(this,e),t.call(this),this.resolveOptions(r),this.listenClick(n)}return i(e,t),e.prototype.resolveOptions=function t(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];this.action="function"==typeof e.action?e.action:this.defaultAction,this.target="function"==typeof e.target?e.target:this.defaultTarget,this.text="function"==typeof e.text?e.text:this.defaultText},e.prototype.listenClick=function t(e){var n=this;this.listener=d.default(e,"click",function(t){return n.onClick(t)})},e.prototype.onClick=function t(e){var n=e.delegateTarget||e.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new s.default({action:this.action(n),target:this.target(n),text:this.text(n),trigger:n,emitter:this})},e.prototype.defaultAction=function t(e){return a("action",e)},e.prototype.defaultTarget=function t(e){var n=a("target",e);return n?document.querySelector(n):void 0},e.prototype.defaultText=function t(e){return a("text",e)},e.prototype.destroy=function t(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)},e}(l.default);n.default=h,e.exports=n.default},{"./clipboard-action":8,"good-listener":5,"tiny-emitter":7}]},{},[9])(9)});

/**
 * Swiper 3.2.7
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 *
 * http://www.idangero.us/swiper/
 *
 * Copyright 2015, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under MIT
 *
 * Released on: December 7, 2015
 */
!function(){"use strict";function e(e){e.fn.swiper=function(a){var r;return e(this).each(function(){var e=new t(this,a);r||(r=e)}),r}}var a,t=function(e,s){function i(){return"horizontal"===T.params.direction}function n(e){return Math.floor(e)}function o(){T.autoplayTimeoutId=setTimeout(function(){T.params.loop?(T.fixLoop(),T._slideNext()):T.isEnd?s.autoplayStopOnLast?T.stopAutoplay():T._slideTo(0):T._slideNext()},T.params.autoplay)}function l(e,t){var r=a(e.target);if(!r.is(t))if("string"==typeof t)r=r.parents(t);else if(t.nodeType){var s;return r.parents().each(function(e,a){a===t&&(s=t)}),s?t:void 0}if(0!==r.length)return r[0]}function d(e,a){a=a||{};var t=window.MutationObserver||window.WebkitMutationObserver,r=new t(function(e){e.forEach(function(e){T.onResize(!0),T.emit("onObserverUpdate",T,e)})});r.observe(e,{attributes:"undefined"==typeof a.attributes?!0:a.attributes,childList:"undefined"==typeof a.childList?!0:a.childList,characterData:"undefined"==typeof a.characterData?!0:a.characterData}),T.observers.push(r)}function p(e){e.originalEvent&&(e=e.originalEvent);var a=e.keyCode||e.charCode;if(!T.params.allowSwipeToNext&&(i()&&39===a||!i()&&40===a))return!1;if(!T.params.allowSwipeToPrev&&(i()&&37===a||!i()&&38===a))return!1;if(!(e.shiftKey||e.altKey||e.ctrlKey||e.metaKey||document.activeElement&&document.activeElement.nodeName&&("input"===document.activeElement.nodeName.toLowerCase()||"textarea"===document.activeElement.nodeName.toLowerCase()))){if(37===a||39===a||38===a||40===a){var t=!1;if(T.container.parents(".swiper-slide").length>0&&0===T.container.parents(".swiper-slide-active").length)return;var r={left:window.pageXOffset,top:window.pageYOffset},s=window.innerWidth,n=window.innerHeight,o=T.container.offset();T.rtl&&(o.left=o.left-T.container[0].scrollLeft);for(var l=[[o.left,o.top],[o.left+T.width,o.top],[o.left,o.top+T.height],[o.left+T.width,o.top+T.height]],d=0;d<l.length;d++){var p=l[d];p[0]>=r.left&&p[0]<=r.left+s&&p[1]>=r.top&&p[1]<=r.top+n&&(t=!0)}if(!t)return}i()?((37===a||39===a)&&(e.preventDefault?e.preventDefault():e.returnValue=!1),(39===a&&!T.rtl||37===a&&T.rtl)&&T.slideNext(),(37===a&&!T.rtl||39===a&&T.rtl)&&T.slidePrev()):((38===a||40===a)&&(e.preventDefault?e.preventDefault():e.returnValue=!1),40===a&&T.slideNext(),38===a&&T.slidePrev())}}function u(e){e.originalEvent&&(e=e.originalEvent);var a=T.mousewheel.event,t=0,r=T.rtl?-1:1;if(e.detail)t=-e.detail;else if("mousewheel"===a)if(T.params.mousewheelForceToAxis)if(i()){if(!(Math.abs(e.wheelDeltaX)>Math.abs(e.wheelDeltaY)))return;t=e.wheelDeltaX*r}else{if(!(Math.abs(e.wheelDeltaY)>Math.abs(e.wheelDeltaX)))return;t=e.wheelDeltaY}else t=Math.abs(e.wheelDeltaX)>Math.abs(e.wheelDeltaY)?-e.wheelDeltaX*r:-e.wheelDeltaY;else if("DOMMouseScroll"===a)t=-e.detail;else if("wheel"===a)if(T.params.mousewheelForceToAxis)if(i()){if(!(Math.abs(e.deltaX)>Math.abs(e.deltaY)))return;t=-e.deltaX*r}else{if(!(Math.abs(e.deltaY)>Math.abs(e.deltaX)))return;t=-e.deltaY}else t=Math.abs(e.deltaX)>Math.abs(e.deltaY)?-e.deltaX*r:-e.deltaY;if(0!==t){if(T.params.mousewheelInvert&&(t=-t),T.params.freeMode){var s=T.getWrapperTranslate()+t*T.params.mousewheelSensitivity,n=T.isBeginning,o=T.isEnd;if(s>=T.minTranslate()&&(s=T.minTranslate()),s<=T.maxTranslate()&&(s=T.maxTranslate()),T.setWrapperTransition(0),T.setWrapperTranslate(s),T.updateProgress(),T.updateActiveIndex(),(!n&&T.isBeginning||!o&&T.isEnd)&&T.updateClasses(),T.params.freeModeSticky&&(clearTimeout(T.mousewheel.timeout),T.mousewheel.timeout=setTimeout(function(){T.slideReset()},300)),0===s||s===T.maxTranslate())return}else{if((new window.Date).getTime()-T.mousewheel.lastScrollTime>60)if(0>t)if(T.isEnd&&!T.params.loop||T.animating){if(T.params.mousewheelReleaseOnEdges)return!0}else T.slideNext();else if(T.isBeginning&&!T.params.loop||T.animating){if(T.params.mousewheelReleaseOnEdges)return!0}else T.slidePrev();T.mousewheel.lastScrollTime=(new window.Date).getTime()}return T.params.autoplay&&T.stopAutoplay(),e.preventDefault?e.preventDefault():e.returnValue=!1,!1}}function c(e,t){e=a(e);var r,s,n,o=T.rtl?-1:1;r=e.attr("data-swiper-parallax")||"0",s=e.attr("data-swiper-parallax-x"),n=e.attr("data-swiper-parallax-y"),s||n?(s=s||"0",n=n||"0"):i()?(s=r,n="0"):(n=r,s="0"),s=s.indexOf("%")>=0?parseInt(s,10)*t*o+"%":s*t*o+"px",n=n.indexOf("%")>=0?parseInt(n,10)*t+"%":n*t+"px",e.transform("translate3d("+s+", "+n+",0px)")}function m(e){return 0!==e.indexOf("on")&&(e=e[0]!==e[0].toUpperCase()?"on"+e[0].toUpperCase()+e.substring(1):"on"+e),e}if(!(this instanceof t))return new t(e,s);var f={direction:"horizontal",touchEventsTarget:"container",initialSlide:0,speed:300,autoplay:!1,autoplayDisableOnInteraction:!0,iOSEdgeSwipeDetection:!1,iOSEdgeSwipeThreshold:20,freeMode:!1,freeModeMomentum:!0,freeModeMomentumRatio:1,freeModeMomentumBounce:!0,freeModeMomentumBounceRatio:1,freeModeSticky:!1,freeModeMinimumVelocity:.02,autoHeight:!1,setWrapperSize:!1,virtualTranslate:!1,effect:"slide",coverflow:{rotate:50,stretch:0,depth:100,modifier:1,slideShadows:!0},cube:{slideShadows:!0,shadow:!0,shadowOffset:20,shadowScale:.94},fade:{crossFade:!1},parallax:!1,scrollbar:null,scrollbarHide:!0,scrollbarDraggable:!1,scrollbarSnapOnRelease:!1,keyboardControl:!1,mousewheelControl:!1,mousewheelReleaseOnEdges:!1,mousewheelInvert:!1,mousewheelForceToAxis:!1,mousewheelSensitivity:1,hashnav:!1,breakpoints:void 0,spaceBetween:0,slidesPerView:1,slidesPerColumn:1,slidesPerColumnFill:"column",slidesPerGroup:1,centeredSlides:!1,slidesOffsetBefore:0,slidesOffsetAfter:0,roundLengths:!1,touchRatio:1,touchAngle:45,simulateTouch:!0,shortSwipes:!0,longSwipes:!0,longSwipesRatio:.5,longSwipesMs:300,followFinger:!0,onlyExternal:!1,threshold:0,touchMoveStopPropagation:!0,pagination:null,paginationElement:"span",paginationClickable:!1,paginationHide:!1,paginationBulletRender:null,resistance:!0,resistanceRatio:.85,nextButton:null,prevButton:null,watchSlidesProgress:!1,watchSlidesVisibility:!1,grabCursor:!1,preventClicks:!0,preventClicksPropagation:!0,slideToClickedSlide:!1,lazyLoading:!1,lazyLoadingInPrevNext:!1,lazyLoadingOnTransitionStart:!1,preloadImages:!0,updateOnImagesReady:!0,loop:!1,loopAdditionalSlides:0,loopedSlides:null,control:void 0,controlInverse:!1,controlBy:"slide",allowSwipeToPrev:!0,allowSwipeToNext:!0,swipeHandler:null,noSwiping:!0,noSwipingClass:"swiper-no-swiping",slideClass:"swiper-slide",slideActiveClass:"swiper-slide-active",slideVisibleClass:"swiper-slide-visible",slideDuplicateClass:"swiper-slide-duplicate",slideNextClass:"swiper-slide-next",slidePrevClass:"swiper-slide-prev",wrapperClass:"swiper-wrapper",bulletClass:"swiper-pagination-bullet",bulletActiveClass:"swiper-pagination-bullet-active",buttonDisabledClass:"swiper-button-disabled",paginationHiddenClass:"swiper-pagination-hidden",observer:!1,observeParents:!1,a11y:!1,prevSlideMessage:"Previous slide",nextSlideMessage:"Next slide",firstSlideMessage:"This is the first slide",lastSlideMessage:"This is the last slide",paginationBulletMessage:"Go to slide {{index}}",runCallbacksOnInit:!0},h=s&&s.virtualTranslate;s=s||{};var g={};for(var v in s)if(s[v] != null&&("object"!=typeof s[v]||(s[v].nodeType||s[v]===window||s[v]===document||"undefined"!=typeof r&&s[v]instanceof r||"undefined"!=typeof jQuery&&s[v]instanceof jQuery)))g[v]=s[v];else{g[v]={};for(var w in s[v])g[v][w]=s[v][w]}for(var y in f)if("undefined"==typeof s[y])s[y]=f[y];else if("object"==typeof s[y])for(var b in f[y])"undefined"==typeof s[y][b]&&(s[y][b]=f[y][b]);var T=this;if(T.params=s,T.originalParams=g,T.classNames=[],"undefined"!=typeof a&&"undefined"!=typeof r&&(a=r),("undefined"!=typeof a||(a="undefined"==typeof r?window.Dom7||window.Zepto||window.jQuery:r))&&(T.$=a,T.currentBreakpoint=void 0,T.getActiveBreakpoint=function(){if(!T.params.breakpoints)return!1;var e,a=!1,t=[];for(e in T.params.breakpoints)T.params.breakpoints.hasOwnProperty(e)&&t.push(e);t.sort(function(e,a){return parseInt(e,10)>parseInt(a,10)});for(var r=0;r<t.length;r++)e=t[r],e>=window.innerWidth&&!a&&(a=e);return a||"max"},T.setBreakpoint=function(){var e=T.getActiveBreakpoint();if(e&&T.currentBreakpoint!==e){var a=e in T.params.breakpoints?T.params.breakpoints[e]:T.originalParams;for(var t in a)T.params[t]=a[t];T.currentBreakpoint=e}},T.params.breakpoints&&T.setBreakpoint(),T.container=a(e),0!==T.container.length)){if(T.container.length>1)return void T.container.each(function(){new t(this,s)});T.container[0].swiper=T,T.container.data("swiper",T),T.classNames.push("swiper-container-"+T.params.direction),T.params.freeMode&&T.classNames.push("swiper-container-free-mode"),T.support.flexbox||(T.classNames.push("swiper-container-no-flexbox"),T.params.slidesPerColumn=1),T.params.autoHeight&&T.classNames.push("swiper-container-autoheight"),(T.params.parallax||T.params.watchSlidesVisibility)&&(T.params.watchSlidesProgress=!0),["cube","coverflow"].indexOf(T.params.effect)>=0&&(T.support.transforms3d?(T.params.watchSlidesProgress=!0,T.classNames.push("swiper-container-3d")):T.params.effect="slide"),"slide"!==T.params.effect&&T.classNames.push("swiper-container-"+T.params.effect),"cube"===T.params.effect&&(T.params.resistanceRatio=0,T.params.slidesPerView=1,T.params.slidesPerColumn=1,T.params.slidesPerGroup=1,T.params.centeredSlides=!1,T.params.spaceBetween=0,T.params.virtualTranslate=!0,T.params.setWrapperSize=!1),"fade"===T.params.effect&&(T.params.slidesPerView=1,T.params.slidesPerColumn=1,T.params.slidesPerGroup=1,T.params.watchSlidesProgress=!0,T.params.spaceBetween=0,"undefined"==typeof h&&(T.params.virtualTranslate=!0)),T.params.grabCursor&&T.support.touch&&(T.params.grabCursor=!1),T.wrapper=T.container.children("."+T.params.wrapperClass),T.params.pagination&&(T.paginationContainer=a(T.params.pagination),T.params.paginationClickable&&T.paginationContainer.addClass("swiper-pagination-clickable")),T.rtl=i()&&("rtl"===T.container[0].dir.toLowerCase()||"rtl"===T.container.css("direction")),T.rtl&&T.classNames.push("swiper-container-rtl"),T.rtl&&(T.wrongRTL="-webkit-box"===T.wrapper.css("display")),T.params.slidesPerColumn>1&&T.classNames.push("swiper-container-multirow"),T.device.android&&T.classNames.push("swiper-container-android"),T.container.addClass(T.classNames.join(" ")),T.translate=0,T.progress=0,T.velocity=0,T.lockSwipeToNext=function(){T.params.allowSwipeToNext=!1},T.lockSwipeToPrev=function(){T.params.allowSwipeToPrev=!1},T.lockSwipes=function(){T.params.allowSwipeToNext=T.params.allowSwipeToPrev=!1},T.unlockSwipeToNext=function(){T.params.allowSwipeToNext=!0},T.unlockSwipeToPrev=function(){T.params.allowSwipeToPrev=!0},T.unlockSwipes=function(){T.params.allowSwipeToNext=T.params.allowSwipeToPrev=!0},T.params.grabCursor&&(T.container[0].style.cursor="move",T.container[0].style.cursor="-webkit-grab",T.container[0].style.cursor="-moz-grab",T.container[0].style.cursor="grab"),T.imagesToLoad=[],T.imagesLoaded=0,T.loadImage=function(e,a,t,r,s){function i(){s&&s()}var n;e.complete&&r?i():a?(n=new window.Image,n.onload=i,n.onerror=i,t&&(n.srcset=t),a&&(n.src=a)):i()},T.preloadImages=function(){function e(){"undefined"!=typeof T&&null!==T&&(void 0!==T.imagesLoaded&&T.imagesLoaded++,T.imagesLoaded===T.imagesToLoad.length&&(T.params.updateOnImagesReady&&T.update(),T.emit("onImagesReady",T)))}T.imagesToLoad=T.container.find("img");for(var a=0;a<T.imagesToLoad.length;a++)T.loadImage(T.imagesToLoad[a],T.imagesToLoad[a].currentSrc||T.imagesToLoad[a].getAttribute("src"),T.imagesToLoad[a].srcset||T.imagesToLoad[a].getAttribute("srcset"),!0,e)},T.autoplayTimeoutId=void 0,T.autoplaying=!1,T.autoplayPaused=!1,T.startAutoplay=function(){return"undefined"!=typeof T.autoplayTimeoutId?!1:T.params.autoplay?T.autoplaying?!1:(T.autoplaying=!0,T.emit("onAutoplayStart",T),void o()):!1},T.stopAutoplay=function(e){T.autoplayTimeoutId&&(T.autoplayTimeoutId&&clearTimeout(T.autoplayTimeoutId),T.autoplaying=!1,T.autoplayTimeoutId=void 0,T.emit("onAutoplayStop",T))},T.pauseAutoplay=function(e){T.autoplayPaused||(T.autoplayTimeoutId&&clearTimeout(T.autoplayTimeoutId),T.autoplayPaused=!0,0===e?(T.autoplayPaused=!1,o()):T.wrapper.transitionEnd(function(){T&&(T.autoplayPaused=!1,T.autoplaying?o():T.stopAutoplay())}))},T.minTranslate=function(){return-T.snapGrid[0]},T.maxTranslate=function(){return-T.snapGrid[T.snapGrid.length-1]},T.updateAutoHeight=function(){var e=T.slides.eq(T.activeIndex)[0].offsetHeight;e&&T.wrapper.css("height",T.slides.eq(T.activeIndex)[0].offsetHeight+"px")},T.updateContainerSize=function(){var e,a;e="undefined"!=typeof T.params.width?T.params.width:T.container[0].clientWidth,a="undefined"!=typeof T.params.height?T.params.height:T.container[0].clientHeight,0===e&&i()||0===a&&!i()||(e=e-parseInt(T.container.css("padding-left"),10)-parseInt(T.container.css("padding-right"),10),a=a-parseInt(T.container.css("padding-top"),10)-parseInt(T.container.css("padding-bottom"),10),T.width=e,T.height=a,T.size=i()?T.width:T.height)},T.updateSlidesSize=function(){T.slides=T.wrapper.children("."+T.params.slideClass),T.snapGrid=[],T.slidesGrid=[],T.slidesSizesGrid=[];var e,a=T.params.spaceBetween,t=-T.params.slidesOffsetBefore,r=0,s=0;"string"==typeof a&&a.indexOf("%")>=0&&(a=parseFloat(a.replace("%",""))/100*T.size),T.virtualSize=-a,T.rtl?T.slides.css({marginLeft:"",marginTop:""}):T.slides.css({marginRight:"",marginBottom:""});var o;T.params.slidesPerColumn>1&&(o=Math.floor(T.slides.length/T.params.slidesPerColumn)===T.slides.length/T.params.slidesPerColumn?T.slides.length:Math.ceil(T.slides.length/T.params.slidesPerColumn)*T.params.slidesPerColumn,"auto"!==T.params.slidesPerView&&"row"===T.params.slidesPerColumnFill&&(o=Math.max(o,T.params.slidesPerView*T.params.slidesPerColumn)));var l,d=T.params.slidesPerColumn,p=o/d,u=p-(T.params.slidesPerColumn*p-T.slides.length);for(e=0;e<T.slides.length;e++){l=0;var c=T.slides.eq(e);if(T.params.slidesPerColumn>1){var m,f,h;"column"===T.params.slidesPerColumnFill?(f=Math.floor(e/d),h=e-f*d,(f>u||f===u&&h===d-1)&&++h>=d&&(h=0,f++),m=f+h*o/d,c.css({"-webkit-box-ordinal-group":m,"-moz-box-ordinal-group":m,"-ms-flex-order":m,"-webkit-order":m,order:m})):(h=Math.floor(e/p),f=e-h*p),c.css({"margin-top":0!==h&&T.params.spaceBetween&&T.params.spaceBetween+"px"}).attr("data-swiper-column",f).attr("data-swiper-row",h)}"none"!==c.css("display")&&("auto"===T.params.slidesPerView?(l=i()?c.outerWidth(!0):c.outerHeight(!0),T.params.roundLengths&&(l=n(l))):(l=(T.size-(T.params.slidesPerView-1)*a)/T.params.slidesPerView,T.params.roundLengths&&(l=n(l)),i()?T.slides[e].style.width=l+"px":T.slides[e].style.height=l+"px"),T.slides[e].swiperSlideSize=l,T.slidesSizesGrid.push(l),T.params.centeredSlides?(t=t+l/2+r/2+a,0===e&&(t=t-T.size/2-a),Math.abs(t)<.001&&(t=0),s%T.params.slidesPerGroup===0&&T.snapGrid.push(t),T.slidesGrid.push(t)):(s%T.params.slidesPerGroup===0&&T.snapGrid.push(t),T.slidesGrid.push(t),t=t+l+a),T.virtualSize+=l+a,r=l,s++)}T.virtualSize=Math.max(T.virtualSize,T.size)+T.params.slidesOffsetAfter;var g;if(T.rtl&&T.wrongRTL&&("slide"===T.params.effect||"coverflow"===T.params.effect)&&T.wrapper.css({width:T.virtualSize+T.params.spaceBetween+"px"}),(!T.support.flexbox||T.params.setWrapperSize)&&(i()?T.wrapper.css({width:T.virtualSize+T.params.spaceBetween+"px"}):T.wrapper.css({height:T.virtualSize+T.params.spaceBetween+"px"})),T.params.slidesPerColumn>1&&(T.virtualSize=(l+T.params.spaceBetween)*o,T.virtualSize=Math.ceil(T.virtualSize/T.params.slidesPerColumn)-T.params.spaceBetween,T.wrapper.css({width:T.virtualSize+T.params.spaceBetween+"px"}),T.params.centeredSlides)){for(g=[],e=0;e<T.snapGrid.length;e++)T.snapGrid[e]<T.virtualSize+T.snapGrid[0]&&g.push(T.snapGrid[e]);T.snapGrid=g}if(!T.params.centeredSlides){for(g=[],e=0;e<T.snapGrid.length;e++)T.snapGrid[e]<=T.virtualSize-T.size&&g.push(T.snapGrid[e]);T.snapGrid=g,Math.floor(T.virtualSize-T.size)>Math.floor(T.snapGrid[T.snapGrid.length-1])&&T.snapGrid.push(T.virtualSize-T.size)}0===T.snapGrid.length&&(T.snapGrid=[0]),0!==T.params.spaceBetween&&(i()?T.rtl?T.slides.css({marginLeft:a+"px"}):T.slides.css({marginRight:a+"px"}):T.slides.css({marginBottom:a+"px"})),T.params.watchSlidesProgress&&T.updateSlidesOffset()},T.updateSlidesOffset=function(){for(var e=0;e<T.slides.length;e++)T.slides[e].swiperSlideOffset=i()?T.slides[e].offsetLeft:T.slides[e].offsetTop},T.updateSlidesProgress=function(e){if("undefined"==typeof e&&(e=T.translate||0),0!==T.slides.length){"undefined"==typeof T.slides[0].swiperSlideOffset&&T.updateSlidesOffset();var a=-e;T.rtl&&(a=e),T.slides.removeClass(T.params.slideVisibleClass);for(var t=0;t<T.slides.length;t++){var r=T.slides[t],s=(a-r.swiperSlideOffset)/(r.swiperSlideSize+T.params.spaceBetween);if(T.params.watchSlidesVisibility){var i=-(a-r.swiperSlideOffset),n=i+T.slidesSizesGrid[t],o=i>=0&&i<T.size||n>0&&n<=T.size||0>=i&&n>=T.size;o&&T.slides.eq(t).addClass(T.params.slideVisibleClass)}r.progress=T.rtl?-s:s}}},T.updateProgress=function(e){"undefined"==typeof e&&(e=T.translate||0);var a=T.maxTranslate()-T.minTranslate(),t=T.isBeginning,r=T.isEnd;0===a?(T.progress=0,T.isBeginning=T.isEnd=!0):(T.progress=(e-T.minTranslate())/a,T.isBeginning=T.progress<=0,T.isEnd=T.progress>=1),T.isBeginning&&!t&&T.emit("onReachBeginning",T),T.isEnd&&!r&&T.emit("onReachEnd",T),T.params.watchSlidesProgress&&T.updateSlidesProgress(e),T.emit("onProgress",T,T.progress)},T.updateActiveIndex=function(){var e,a,t,r=T.rtl?T.translate:-T.translate;for(a=0;a<T.slidesGrid.length;a++)"undefined"!=typeof T.slidesGrid[a+1]?r>=T.slidesGrid[a]&&r<T.slidesGrid[a+1]-(T.slidesGrid[a+1]-T.slidesGrid[a])/2?e=a:r>=T.slidesGrid[a]&&r<T.slidesGrid[a+1]&&(e=a+1):r>=T.slidesGrid[a]&&(e=a);(0>e||"undefined"==typeof e)&&(e=0),t=Math.floor(e/T.params.slidesPerGroup),t>=T.snapGrid.length&&(t=T.snapGrid.length-1),e!==T.activeIndex&&(T.snapIndex=t,T.previousIndex=T.activeIndex,T.activeIndex=e,T.updateClasses())},T.updateClasses=function(){T.slides.removeClass(T.params.slideActiveClass+" "+T.params.slideNextClass+" "+T.params.slidePrevClass);var e=T.slides.eq(T.activeIndex);if(e.addClass(T.params.slideActiveClass),e.next("."+T.params.slideClass).addClass(T.params.slideNextClass),e.prev("."+T.params.slideClass).addClass(T.params.slidePrevClass),T.bullets&&T.bullets.length>0){T.bullets.removeClass(T.params.bulletActiveClass);var t;T.params.loop?(t=Math.ceil(T.activeIndex-T.loopedSlides)/T.params.slidesPerGroup,t>T.slides.length-1-2*T.loopedSlides&&(t-=T.slides.length-2*T.loopedSlides),t>T.bullets.length-1&&(t-=T.bullets.length)):t="undefined"!=typeof T.snapIndex?T.snapIndex:T.activeIndex||0,T.paginationContainer.length>1?T.bullets.each(function(){a(this).index()===t&&a(this).addClass(T.params.bulletActiveClass)}):T.bullets.eq(t).addClass(T.params.bulletActiveClass)}T.params.loop||(T.params.prevButton&&(T.isBeginning?(a(T.params.prevButton).addClass(T.params.buttonDisabledClass),T.params.a11y&&T.a11y&&T.a11y.disable(a(T.params.prevButton))):(a(T.params.prevButton).removeClass(T.params.buttonDisabledClass),T.params.a11y&&T.a11y&&T.a11y.enable(a(T.params.prevButton)))),T.params.nextButton&&(T.isEnd?(a(T.params.nextButton).addClass(T.params.buttonDisabledClass),T.params.a11y&&T.a11y&&T.a11y.disable(a(T.params.nextButton))):(a(T.params.nextButton).removeClass(T.params.buttonDisabledClass),T.params.a11y&&T.a11y&&T.a11y.enable(a(T.params.nextButton)))))},T.updatePagination=function(){if(T.params.pagination&&T.paginationContainer&&T.paginationContainer.length>0){for(var e="",a=T.params.loop?Math.ceil((T.slides.length-2*T.loopedSlides)/T.params.slidesPerGroup):T.snapGrid.length,t=0;a>t;t++)e+=T.params.paginationBulletRender?T.params.paginationBulletRender(t,T.params.bulletClass):"<"+T.params.paginationElement+' class="'+T.params.bulletClass+'"></'+T.params.paginationElement+">";T.paginationContainer.html(e),T.bullets=T.paginationContainer.find("."+T.params.bulletClass),T.params.paginationClickable&&T.params.a11y&&T.a11y&&T.a11y.initPagination()}},T.update=function(e){function a(){r=Math.min(Math.max(T.translate,T.maxTranslate()),T.minTranslate()),T.setWrapperTranslate(r),T.updateActiveIndex(),T.updateClasses()}if(T.updateContainerSize(),T.updateSlidesSize(),T.updateProgress(),T.updatePagination(),T.updateClasses(),T.params.scrollbar&&T.scrollbar&&T.scrollbar.set(),e){var t,r;T.controller&&T.controller.spline&&(T.controller.spline=void 0),T.params.freeMode?(a(),T.params.autoHeight&&T.updateAutoHeight()):(t=("auto"===T.params.slidesPerView||T.params.slidesPerView>1)&&T.isEnd&&!T.params.centeredSlides?T.slideTo(T.slides.length-1,0,!1,!0):T.slideTo(T.activeIndex,0,!1,!0),t||a())}else T.params.autoHeight&&T.updateAutoHeight()},T.onResize=function(e){T.params.breakpoints&&T.setBreakpoint();var a=T.params.allowSwipeToPrev,t=T.params.allowSwipeToNext;if(T.params.allowSwipeToPrev=T.params.allowSwipeToNext=!0,T.updateContainerSize(),T.updateSlidesSize(),("auto"===T.params.slidesPerView||T.params.freeMode||e)&&T.updatePagination(),T.params.scrollbar&&T.scrollbar&&T.scrollbar.set(),T.controller&&T.controller.spline&&(T.controller.spline=void 0),T.params.freeMode){var r=Math.min(Math.max(T.translate,T.maxTranslate()),T.minTranslate());T.setWrapperTranslate(r),T.updateActiveIndex(),T.updateClasses(),T.params.autoHeight&&T.updateAutoHeight()}else T.updateClasses(),("auto"===T.params.slidesPerView||T.params.slidesPerView>1)&&T.isEnd&&!T.params.centeredSlides?T.slideTo(T.slides.length-1,0,!1,!0):T.slideTo(T.activeIndex,0,!1,!0);T.params.allowSwipeToPrev=a,T.params.allowSwipeToNext=t};var x=["mousedown","mousemove","mouseup"];window.navigator.pointerEnabled?x=["pointerdown","pointermove","pointerup"]:window.navigator.msPointerEnabled&&(x=["MSPointerDown","MSPointerMove","MSPointerUp"]),T.touchEvents={start:T.support.touch||!T.params.simulateTouch?"touchstart":x[0],move:T.support.touch||!T.params.simulateTouch?"touchmove":x[1],end:T.support.touch||!T.params.simulateTouch?"touchend":x[2]},(window.navigator.pointerEnabled||window.navigator.msPointerEnabled)&&("container"===T.params.touchEventsTarget?T.container:T.wrapper).addClass("swiper-wp8-"+T.params.direction),T.initEvents=function(e){var t=e?"off":"on",r=e?"removeEventListener":"addEventListener",i="container"===T.params.touchEventsTarget?T.container[0]:T.wrapper[0],n=T.support.touch?i:document,o=T.params.nested?!0:!1;T.browser.ie?(i[r](T.touchEvents.start,T.onTouchStart,!1),n[r](T.touchEvents.move,T.onTouchMove,o),n[r](T.touchEvents.end,T.onTouchEnd,!1)):(T.support.touch&&(i[r](T.touchEvents.start,T.onTouchStart,!1),i[r](T.touchEvents.move,T.onTouchMove,o),i[r](T.touchEvents.end,T.onTouchEnd,!1)),!s.simulateTouch||T.device.ios||T.device.android||(i[r]("mousedown",T.onTouchStart,!1),document[r]("mousemove",T.onTouchMove,o),document[r]("mouseup",T.onTouchEnd,!1))),window[r]("resize",T.onResize),T.params.nextButton&&(a(T.params.nextButton)[t]("click",T.onClickNext),T.params.a11y&&T.a11y&&a(T.params.nextButton)[t]("keydown",T.a11y.onEnterKey)),T.params.prevButton&&(a(T.params.prevButton)[t]("click",T.onClickPrev),T.params.a11y&&T.a11y&&a(T.params.prevButton)[t]("keydown",T.a11y.onEnterKey)),T.params.pagination&&T.params.paginationClickable&&(a(T.paginationContainer)[t]("click","."+T.params.bulletClass,T.onClickIndex),T.params.a11y&&T.a11y&&a(T.paginationContainer)[t]("keydown","."+T.params.bulletClass,T.a11y.onEnterKey)),(T.params.preventClicks||T.params.preventClicksPropagation)&&i[r]("click",T.preventClicks,!0)},T.attachEvents=function(e){T.initEvents()},T.detachEvents=function(){T.initEvents(!0)},T.allowClick=!0,T.preventClicks=function(e){T.allowClick||(T.params.preventClicks&&e.preventDefault(),T.params.preventClicksPropagation&&T.animating&&(e.stopPropagation(),e.stopImmediatePropagation()))},T.onClickNext=function(e){e.preventDefault(),(!T.isEnd||T.params.loop)&&T.slideNext()},T.onClickPrev=function(e){e.preventDefault(),(!T.isBeginning||T.params.loop)&&T.slidePrev()},T.onClickIndex=function(e){e.preventDefault();var t=a(this).index()*T.params.slidesPerGroup;T.params.loop&&(t+=T.loopedSlides),T.slideTo(t)},T.updateClickedSlide=function(e){var t=l(e,"."+T.params.slideClass),r=!1;if(t)for(var s=0;s<T.slides.length;s++)T.slides[s]===t&&(r=!0);if(!t||!r)return T.clickedSlide=void 0,void(T.clickedIndex=void 0);if(T.clickedSlide=t,T.clickedIndex=a(t).index(),T.params.slideToClickedSlide&&void 0!==T.clickedIndex&&T.clickedIndex!==T.activeIndex){var i,n=T.clickedIndex;if(T.params.loop){if(T.animating)return;i=a(T.clickedSlide).attr("data-swiper-slide-index"),T.params.centeredSlides?n<T.loopedSlides-T.params.slidesPerView/2||n>T.slides.length-T.loopedSlides+T.params.slidesPerView/2?(T.fixLoop(),n=T.wrapper.children("."+T.params.slideClass+'[data-swiper-slide-index="'+i+'"]:not(.swiper-slide-duplicate)').eq(0).index(),setTimeout(function(){T.slideTo(n)},0)):T.slideTo(n):n>T.slides.length-T.params.slidesPerView?(T.fixLoop(),n=T.wrapper.children("."+T.params.slideClass+'[data-swiper-slide-index="'+i+'"]:not(.swiper-slide-duplicate)').eq(0).index(),setTimeout(function(){T.slideTo(n)},0)):T.slideTo(n)}else T.slideTo(n)}};var S,C,M,E,P,k,z,I,L,D,B="input, select, textarea, button",G=Date.now(),A=[];T.animating=!1,T.touches={startX:0,startY:0,currentX:0,currentY:0,diff:0};var O,N;if(T.onTouchStart=function(e){if(e.originalEvent&&(e=e.originalEvent),O="touchstart"===e.type,O||!("which"in e)||3!==e.which){if(T.params.noSwiping&&l(e,"."+T.params.noSwipingClass))return void(T.allowClick=!0);if(!T.params.swipeHandler||l(e,T.params.swipeHandler)){var t=T.touches.currentX="touchstart"===e.type?e.targetTouches[0].pageX:e.pageX,r=T.touches.currentY="touchstart"===e.type?e.targetTouches[0].pageY:e.pageY;if(!(T.device.ios&&T.params.iOSEdgeSwipeDetection&&t<=T.params.iOSEdgeSwipeThreshold)){if(S=!0,C=!1,M=!0,P=void 0,N=void 0,T.touches.startX=t,T.touches.startY=r,E=Date.now(),T.allowClick=!0,T.updateContainerSize(),T.swipeDirection=void 0,T.params.threshold>0&&(I=!1),"touchstart"!==e.type){var s=!0;a(e.target).is(B)&&(s=!1),document.activeElement&&a(document.activeElement).is(B)&&document.activeElement.blur(),s&&e.preventDefault()}T.emit("onTouchStart",T,e)}}}},T.onTouchMove=function(e){if(e.originalEvent&&(e=e.originalEvent),!(O&&"mousemove"===e.type||e.preventedByNestedSwiper)){if(T.params.onlyExternal)return T.allowClick=!1,void(S&&(T.touches.startX=T.touches.currentX="touchmove"===e.type?e.targetTouches[0].pageX:e.pageX,T.touches.startY=T.touches.currentY="touchmove"===e.type?e.targetTouches[0].pageY:e.pageY,E=Date.now()));if(O&&document.activeElement&&e.target===document.activeElement&&a(e.target).is(B))return C=!0,void(T.allowClick=!1);if(M&&T.emit("onTouchMove",T,e),!(e.targetTouches&&e.targetTouches.length>1)){if(T.touches.currentX="touchmove"===e.type?e.targetTouches[0].pageX:e.pageX,T.touches.currentY="touchmove"===e.type?e.targetTouches[0].pageY:e.pageY,"undefined"==typeof P){var t=180*Math.atan2(Math.abs(T.touches.currentY-T.touches.startY),Math.abs(T.touches.currentX-T.touches.startX))/Math.PI;P=i()?t>T.params.touchAngle:90-t>T.params.touchAngle}if(P&&T.emit("onTouchMoveOpposite",T,e),"undefined"==typeof N&&T.browser.ieTouch&&(T.touches.currentX!==T.touches.startX||T.touches.currentY!==T.touches.startY)&&(N=!0),S){if(P)return void(S=!1);if(N||!T.browser.ieTouch){T.allowClick=!1,T.emit("onSliderMove",T,e),e.preventDefault(),T.params.touchMoveStopPropagation&&!T.params.nested&&e.stopPropagation(),C||(s.loop&&T.fixLoop(),z=T.getWrapperTranslate(),T.setWrapperTransition(0),T.animating&&T.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"),T.params.autoplay&&T.autoplaying&&(T.params.autoplayDisableOnInteraction?T.stopAutoplay():T.pauseAutoplay()),D=!1,T.params.grabCursor&&(T.container[0].style.cursor="move",T.container[0].style.cursor="-webkit-grabbing",T.container[0].style.cursor="-moz-grabbin",T.container[0].style.cursor="grabbing")),C=!0;var r=T.touches.diff=i()?T.touches.currentX-T.touches.startX:T.touches.currentY-T.touches.startY;r*=T.params.touchRatio,T.rtl&&(r=-r),T.swipeDirection=r>0?"prev":"next",k=r+z;var n=!0;if(r>0&&k>T.minTranslate()?(n=!1,T.params.resistance&&(k=T.minTranslate()-1+Math.pow(-T.minTranslate()+z+r,T.params.resistanceRatio))):0>r&&k<T.maxTranslate()&&(n=!1,T.params.resistance&&(k=T.maxTranslate()+1-Math.pow(T.maxTranslate()-z-r,T.params.resistanceRatio))),n&&(e.preventedByNestedSwiper=!0),!T.params.allowSwipeToNext&&"next"===T.swipeDirection&&z>k&&(k=z),!T.params.allowSwipeToPrev&&"prev"===T.swipeDirection&&k>z&&(k=z),T.params.followFinger){if(T.params.threshold>0){if(!(Math.abs(r)>T.params.threshold||I))return void(k=z);if(!I)return I=!0,T.touches.startX=T.touches.currentX,T.touches.startY=T.touches.currentY,k=z,void(T.touches.diff=i()?T.touches.currentX-T.touches.startX:T.touches.currentY-T.touches.startY)}(T.params.freeMode||T.params.watchSlidesProgress)&&T.updateActiveIndex(),T.params.freeMode&&(0===A.length&&A.push({position:T.touches[i()?"startX":"startY"],time:E}),A.push({position:T.touches[i()?"currentX":"currentY"],time:(new window.Date).getTime()})),T.updateProgress(k),T.setWrapperTranslate(k)}}}}}},T.onTouchEnd=function(e){if(e.originalEvent&&(e=e.originalEvent),M&&T.emit("onTouchEnd",T,e),M=!1,S){T.params.grabCursor&&C&&S&&(T.container[0].style.cursor="move",T.container[0].style.cursor="-webkit-grab",T.container[0].style.cursor="-moz-grab",T.container[0].style.cursor="grab");var t=Date.now(),r=t-E;if(T.allowClick&&(T.updateClickedSlide(e),T.emit("onTap",T,e),300>r&&t-G>300&&(L&&clearTimeout(L),L=setTimeout(function(){T&&(T.params.paginationHide&&T.paginationContainer.length>0&&!a(e.target).hasClass(T.params.bulletClass)&&T.paginationContainer.toggleClass(T.params.paginationHiddenClass),T.emit("onClick",T,e))},300)),300>r&&300>t-G&&(L&&clearTimeout(L),T.emit("onDoubleTap",T,e))),G=Date.now(),setTimeout(function(){T&&(T.allowClick=!0)},0),!S||!C||!T.swipeDirection||0===T.touches.diff||k===z)return void(S=C=!1);S=C=!1;var s;if(s=T.params.followFinger?T.rtl?T.translate:-T.translate:-k,T.params.freeMode){if(s<-T.minTranslate())return void T.slideTo(T.activeIndex);if(s>-T.maxTranslate())return void(T.slides.length<T.snapGrid.length?T.slideTo(T.snapGrid.length-1):T.slideTo(T.slides.length-1));if(T.params.freeModeMomentum){if(A.length>1){var i=A.pop(),n=A.pop(),o=i.position-n.position,l=i.time-n.time;T.velocity=o/l,T.velocity=T.velocity/2,Math.abs(T.velocity)<T.params.freeModeMinimumVelocity&&(T.velocity=0),(l>150||(new window.Date).getTime()-i.time>300)&&(T.velocity=0)}else T.velocity=0;A.length=0;var d=1e3*T.params.freeModeMomentumRatio,p=T.velocity*d,u=T.translate+p;T.rtl&&(u=-u);var c,m=!1,f=20*Math.abs(T.velocity)*T.params.freeModeMomentumBounceRatio;if(u<T.maxTranslate())T.params.freeModeMomentumBounce?(u+T.maxTranslate()<-f&&(u=T.maxTranslate()-f),c=T.maxTranslate(),m=!0,D=!0):u=T.maxTranslate();else if(u>T.minTranslate())T.params.freeModeMomentumBounce?(u-T.minTranslate()>f&&(u=T.minTranslate()+f),c=T.minTranslate(),m=!0,D=!0):u=T.minTranslate();else if(T.params.freeModeSticky){var h,g=0;for(g=0;g<T.snapGrid.length;g+=1)if(T.snapGrid[g]>-u){h=g;break}u=Math.abs(T.snapGrid[h]-u)<Math.abs(T.snapGrid[h-1]-u)||"next"===T.swipeDirection?T.snapGrid[h]:T.snapGrid[h-1],T.rtl||(u=-u)}if(0!==T.velocity)d=T.rtl?Math.abs((-u-T.translate)/T.velocity):Math.abs((u-T.translate)/T.velocity);else if(T.params.freeModeSticky)return void T.slideReset();T.params.freeModeMomentumBounce&&m?(T.updateProgress(c),T.setWrapperTransition(d),T.setWrapperTranslate(u),T.onTransitionStart(),T.animating=!0,T.wrapper.transitionEnd(function(){T&&D&&(T.emit("onMomentumBounce",T),T.setWrapperTransition(T.params.speed),T.setWrapperTranslate(c),T.wrapper.transitionEnd(function(){T&&T.onTransitionEnd()}))})):T.velocity?(T.updateProgress(u),T.setWrapperTransition(d),T.setWrapperTranslate(u),T.onTransitionStart(),T.animating||(T.animating=!0,T.wrapper.transitionEnd(function(){T&&T.onTransitionEnd()}))):T.updateProgress(u),T.updateActiveIndex()}return void((!T.params.freeModeMomentum||r>=T.params.longSwipesMs)&&(T.updateProgress(),T.updateActiveIndex()))}var v,w=0,y=T.slidesSizesGrid[0];
for(v=0;v<T.slidesGrid.length;v+=T.params.slidesPerGroup)"undefined"!=typeof T.slidesGrid[v+T.params.slidesPerGroup]?s>=T.slidesGrid[v]&&s<T.slidesGrid[v+T.params.slidesPerGroup]&&(w=v,y=T.slidesGrid[v+T.params.slidesPerGroup]-T.slidesGrid[v]):s>=T.slidesGrid[v]&&(w=v,y=T.slidesGrid[T.slidesGrid.length-1]-T.slidesGrid[T.slidesGrid.length-2]);var b=(s-T.slidesGrid[w])/y;if(r>T.params.longSwipesMs){if(!T.params.longSwipes)return void T.slideTo(T.activeIndex);"next"===T.swipeDirection&&(b>=T.params.longSwipesRatio?T.slideTo(w+T.params.slidesPerGroup):T.slideTo(w)),"prev"===T.swipeDirection&&(b>1-T.params.longSwipesRatio?T.slideTo(w+T.params.slidesPerGroup):T.slideTo(w))}else{if(!T.params.shortSwipes)return void T.slideTo(T.activeIndex);"next"===T.swipeDirection&&T.slideTo(w+T.params.slidesPerGroup),"prev"===T.swipeDirection&&T.slideTo(w)}}},T._slideTo=function(e,a){return T.slideTo(e,a,!0,!0)},T.slideTo=function(e,a,t,r){"undefined"==typeof t&&(t=!0),"undefined"==typeof e&&(e=0),0>e&&(e=0),T.snapIndex=Math.floor(e/T.params.slidesPerGroup),T.snapIndex>=T.snapGrid.length&&(T.snapIndex=T.snapGrid.length-1);var s=-T.snapGrid[T.snapIndex];T.params.autoplay&&T.autoplaying&&(r||!T.params.autoplayDisableOnInteraction?T.pauseAutoplay(a):T.stopAutoplay()),T.updateProgress(s);for(var i=0;i<T.slidesGrid.length;i++)-Math.floor(100*s)>=Math.floor(100*T.slidesGrid[i])&&(e=i);return!T.params.allowSwipeToNext&&s<T.translate&&s<T.minTranslate()?!1:!T.params.allowSwipeToPrev&&s>T.translate&&s>T.maxTranslate()&&(T.activeIndex||0)!==e?!1:("undefined"==typeof a&&(a=T.params.speed),T.previousIndex=T.activeIndex||0,T.activeIndex=e,T.rtl&&-s===T.translate||!T.rtl&&s===T.translate?(T.params.autoHeight&&T.updateAutoHeight(),T.updateClasses(),"slide"!==T.params.effect&&T.setWrapperTranslate(s),!1):(T.updateClasses(),T.onTransitionStart(t),0===a?(T.setWrapperTranslate(s),T.setWrapperTransition(0),T.onTransitionEnd(t)):(T.setWrapperTranslate(s),T.setWrapperTransition(a),T.animating||(T.animating=!0,T.wrapper.transitionEnd(function(){T&&T.onTransitionEnd(t)}))),!0))},T.onTransitionStart=function(e){"undefined"==typeof e&&(e=!0),T.params.autoHeight&&T.updateAutoHeight(),T.lazy&&T.lazy.onTransitionStart(),e&&(T.emit("onTransitionStart",T),T.activeIndex!==T.previousIndex&&(T.emit("onSlideChangeStart",T),T.activeIndex>T.previousIndex?T.emit("onSlideNextStart",T):T.emit("onSlidePrevStart",T)))},T.onTransitionEnd=function(e){T.animating=!1,T.setWrapperTransition(0),"undefined"==typeof e&&(e=!0),T.lazy&&T.lazy.onTransitionEnd(),e&&(T.emit("onTransitionEnd",T),T.activeIndex!==T.previousIndex&&(T.emit("onSlideChangeEnd",T),T.activeIndex>T.previousIndex?T.emit("onSlideNextEnd",T):T.emit("onSlidePrevEnd",T))),T.params.hashnav&&T.hashnav&&T.hashnav.setHash()},T.slideNext=function(e,a,t){if(T.params.loop){if(T.animating)return!1;T.fixLoop();T.container[0].clientLeft;return T.slideTo(T.activeIndex+T.params.slidesPerGroup,a,e,t)}return T.slideTo(T.activeIndex+T.params.slidesPerGroup,a,e,t)},T._slideNext=function(e){return T.slideNext(!0,e,!0)},T.slidePrev=function(e,a,t){if(T.params.loop){if(T.animating)return!1;T.fixLoop();T.container[0].clientLeft;return T.slideTo(T.activeIndex-1,a,e,t)}return T.slideTo(T.activeIndex-1,a,e,t)},T._slidePrev=function(e){return T.slidePrev(!0,e,!0)},T.slideReset=function(e,a,t){return T.slideTo(T.activeIndex,a,e)},T.setWrapperTransition=function(e,a){T.wrapper.transition(e),"slide"!==T.params.effect&&T.effects[T.params.effect]&&T.effects[T.params.effect].setTransition(e),T.params.parallax&&T.parallax&&T.parallax.setTransition(e),T.params.scrollbar&&T.scrollbar&&T.scrollbar.setTransition(e),T.params.control&&T.controller&&T.controller.setTransition(e,a),T.emit("onSetTransition",T,e)},T.setWrapperTranslate=function(e,a,t){var r=0,s=0,o=0;i()?r=T.rtl?-e:e:s=e,T.params.roundLengths&&(r=n(r),s=n(s)),T.params.virtualTranslate||(T.support.transforms3d?T.wrapper.transform("translate3d("+r+"px, "+s+"px, "+o+"px)"):T.wrapper.transform("translate("+r+"px, "+s+"px)")),T.translate=i()?r:s;var l,d=T.maxTranslate()-T.minTranslate();l=0===d?0:(e-T.minTranslate())/d,l!==T.progress&&T.updateProgress(e),a&&T.updateActiveIndex(),"slide"!==T.params.effect&&T.effects[T.params.effect]&&T.effects[T.params.effect].setTranslate(T.translate),T.params.parallax&&T.parallax&&T.parallax.setTranslate(T.translate),T.params.scrollbar&&T.scrollbar&&T.scrollbar.setTranslate(T.translate),T.params.control&&T.controller&&T.controller.setTranslate(T.translate,t),T.emit("onSetTranslate",T,T.translate)},T.getTranslate=function(e,a){var t,r,s,i;return"undefined"==typeof a&&(a="x"),T.params.virtualTranslate?T.rtl?-T.translate:T.translate:(s=window.getComputedStyle(e,null),window.WebKitCSSMatrix?(r=s.transform||s.webkitTransform,r.split(",").length>6&&(r=r.split(", ").map(function(e){return e.replace(",",".")}).join(", ")),i=new window.WebKitCSSMatrix("none"===r?"":r)):(i=s.MozTransform||s.OTransform||s.MsTransform||s.msTransform||s.transform||s.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),t=i.toString().split(",")),"x"===a&&(r=window.WebKitCSSMatrix?i.m41:16===t.length?parseFloat(t[12]):parseFloat(t[4])),"y"===a&&(r=window.WebKitCSSMatrix?i.m42:16===t.length?parseFloat(t[13]):parseFloat(t[5])),T.rtl&&r&&(r=-r),r||0)},T.getWrapperTranslate=function(e){return"undefined"==typeof e&&(e=i()?"x":"y"),T.getTranslate(T.wrapper[0],e)},T.observers=[],T.initObservers=function(){if(T.params.observeParents)for(var e=T.container.parents(),a=0;a<e.length;a++)d(e[a]);d(T.container[0],{childList:!1}),d(T.wrapper[0],{attributes:!1})},T.disconnectObservers=function(){for(var e=0;e<T.observers.length;e++)T.observers[e].disconnect();T.observers=[]},T.createLoop=function(){T.wrapper.children("."+T.params.slideClass+"."+T.params.slideDuplicateClass).remove();var e=T.wrapper.children("."+T.params.slideClass);"auto"!==T.params.slidesPerView||T.params.loopedSlides||(T.params.loopedSlides=e.length),T.loopedSlides=parseInt(T.params.loopedSlides||T.params.slidesPerView,10),T.loopedSlides=T.loopedSlides+T.params.loopAdditionalSlides,T.loopedSlides>e.length&&(T.loopedSlides=e.length);var t,r=[],s=[];for(e.each(function(t,i){var n=a(this);t<T.loopedSlides&&s.push(i),t<e.length&&t>=e.length-T.loopedSlides&&r.push(i),n.attr("data-swiper-slide-index",t)}),t=0;t<s.length;t++)T.wrapper.append(a(s[t].cloneNode(!0)).addClass(T.params.slideDuplicateClass));for(t=r.length-1;t>=0;t--)T.wrapper.prepend(a(r[t].cloneNode(!0)).addClass(T.params.slideDuplicateClass))},T.destroyLoop=function(){T.wrapper.children("."+T.params.slideClass+"."+T.params.slideDuplicateClass).remove(),T.slides.removeAttr("data-swiper-slide-index")},T.fixLoop=function(){var e;T.activeIndex<T.loopedSlides?(e=T.slides.length-3*T.loopedSlides+T.activeIndex,e+=T.loopedSlides,T.slideTo(e,0,!1,!0)):("auto"===T.params.slidesPerView&&T.activeIndex>=2*T.loopedSlides||T.activeIndex>T.slides.length-2*T.params.slidesPerView)&&(e=-T.slides.length+T.activeIndex+T.loopedSlides,e+=T.loopedSlides,T.slideTo(e,0,!1,!0))},T.appendSlide=function(e){if(T.params.loop&&T.destroyLoop(),"object"==typeof e&&e.length)for(var a=0;a<e.length;a++)e[a]&&T.wrapper.append(e[a]);else T.wrapper.append(e);T.params.loop&&T.createLoop(),T.params.observer&&T.support.observer||T.update(!0)},T.prependSlide=function(e){T.params.loop&&T.destroyLoop();var a=T.activeIndex+1;if("object"==typeof e&&e.length){for(var t=0;t<e.length;t++)e[t]&&T.wrapper.prepend(e[t]);a=T.activeIndex+e.length}else T.wrapper.prepend(e);T.params.loop&&T.createLoop(),T.params.observer&&T.support.observer||T.update(!0),T.slideTo(a,0,!1)},T.removeSlide=function(e){T.params.loop&&(T.destroyLoop(),T.slides=T.wrapper.children("."+T.params.slideClass));var a,t=T.activeIndex;if("object"==typeof e&&e.length){for(var r=0;r<e.length;r++)a=e[r],T.slides[a]&&T.slides.eq(a).remove(),t>a&&t--;t=Math.max(t,0)}else a=e,T.slides[a]&&T.slides.eq(a).remove(),t>a&&t--,t=Math.max(t,0);T.params.loop&&T.createLoop(),T.params.observer&&T.support.observer||T.update(!0),T.params.loop?T.slideTo(t+T.loopedSlides,0,!1):T.slideTo(t,0,!1)},T.removeAllSlides=function(){for(var e=[],a=0;a<T.slides.length;a++)e.push(a);T.removeSlide(e)},T.effects={fade:{setTranslate:function(){for(var e=0;e<T.slides.length;e++){var a=T.slides.eq(e),t=a[0].swiperSlideOffset,r=-t;T.params.virtualTranslate||(r-=T.translate);var s=0;i()||(s=r,r=0);var n=T.params.fade.crossFade?Math.max(1-Math.abs(a[0].progress),0):1+Math.min(Math.max(a[0].progress,-1),0);a.css({opacity:n}).transform("translate3d("+r+"px, "+s+"px, 0px)")}},setTransition:function(e){if(T.slides.transition(e),T.params.virtualTranslate&&0!==e){var a=!1;T.slides.transitionEnd(function(){if(!a&&T){a=!0,T.animating=!1;for(var e=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],t=0;t<e.length;t++)T.wrapper.trigger(e[t])}})}}},cube:{setTranslate:function(){var e,t=0;T.params.cube.shadow&&(i()?(e=T.wrapper.find(".swiper-cube-shadow"),0===e.length&&(e=a('<div class="swiper-cube-shadow"></div>'),T.wrapper.append(e)),e.css({height:T.width+"px"})):(e=T.container.find(".swiper-cube-shadow"),0===e.length&&(e=a('<div class="swiper-cube-shadow"></div>'),T.container.append(e))));for(var r=0;r<T.slides.length;r++){var s=T.slides.eq(r),n=90*r,o=Math.floor(n/360);T.rtl&&(n=-n,o=Math.floor(-n/360));var l=Math.max(Math.min(s[0].progress,1),-1),d=0,p=0,u=0;r%4===0?(d=4*-o*T.size,u=0):(r-1)%4===0?(d=0,u=4*-o*T.size):(r-2)%4===0?(d=T.size+4*o*T.size,u=T.size):(r-3)%4===0&&(d=-T.size,u=3*T.size+4*T.size*o),T.rtl&&(d=-d),i()||(p=d,d=0);var c="rotateX("+(i()?0:-n)+"deg) rotateY("+(i()?n:0)+"deg) translate3d("+d+"px, "+p+"px, "+u+"px)";if(1>=l&&l>-1&&(t=90*r+90*l,T.rtl&&(t=90*-r-90*l)),s.transform(c),T.params.cube.slideShadows){var m=i()?s.find(".swiper-slide-shadow-left"):s.find(".swiper-slide-shadow-top"),f=i()?s.find(".swiper-slide-shadow-right"):s.find(".swiper-slide-shadow-bottom");0===m.length&&(m=a('<div class="swiper-slide-shadow-'+(i()?"left":"top")+'"></div>'),s.append(m)),0===f.length&&(f=a('<div class="swiper-slide-shadow-'+(i()?"right":"bottom")+'"></div>'),s.append(f));s[0].progress;m.length&&(m[0].style.opacity=-s[0].progress),f.length&&(f[0].style.opacity=s[0].progress)}}if(T.wrapper.css({"-webkit-transform-origin":"50% 50% -"+T.size/2+"px","-moz-transform-origin":"50% 50% -"+T.size/2+"px","-ms-transform-origin":"50% 50% -"+T.size/2+"px","transform-origin":"50% 50% -"+T.size/2+"px"}),T.params.cube.shadow)if(i())e.transform("translate3d(0px, "+(T.width/2+T.params.cube.shadowOffset)+"px, "+-T.width/2+"px) rotateX(90deg) rotateZ(0deg) scale("+T.params.cube.shadowScale+")");else{var h=Math.abs(t)-90*Math.floor(Math.abs(t)/90),g=1.5-(Math.sin(2*h*Math.PI/360)/2+Math.cos(2*h*Math.PI/360)/2),v=T.params.cube.shadowScale,w=T.params.cube.shadowScale/g,y=T.params.cube.shadowOffset;e.transform("scale3d("+v+", 1, "+w+") translate3d(0px, "+(T.height/2+y)+"px, "+-T.height/2/w+"px) rotateX(-90deg)")}var b=T.isSafari||T.isUiWebView?-T.size/2:0;T.wrapper.transform("translate3d(0px,0,"+b+"px) rotateX("+(i()?0:t)+"deg) rotateY("+(i()?-t:0)+"deg)")},setTransition:function(e){T.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),T.params.cube.shadow&&!i()&&T.container.find(".swiper-cube-shadow").transition(e)}},coverflow:{setTranslate:function(){for(var e=T.translate,t=i()?-e+T.width/2:-e+T.height/2,r=i()?T.params.coverflow.rotate:-T.params.coverflow.rotate,s=T.params.coverflow.depth,n=0,o=T.slides.length;o>n;n++){var l=T.slides.eq(n),d=T.slidesSizesGrid[n],p=l[0].swiperSlideOffset,u=(t-p-d/2)/d*T.params.coverflow.modifier,c=i()?r*u:0,m=i()?0:r*u,f=-s*Math.abs(u),h=i()?0:T.params.coverflow.stretch*u,g=i()?T.params.coverflow.stretch*u:0;Math.abs(g)<.001&&(g=0),Math.abs(h)<.001&&(h=0),Math.abs(f)<.001&&(f=0),Math.abs(c)<.001&&(c=0),Math.abs(m)<.001&&(m=0);var v="translate3d("+g+"px,"+h+"px,"+f+"px)  rotateX("+m+"deg) rotateY("+c+"deg)";if(l.transform(v),l[0].style.zIndex=-Math.abs(Math.round(u))+1,T.params.coverflow.slideShadows){var w=i()?l.find(".swiper-slide-shadow-left"):l.find(".swiper-slide-shadow-top"),y=i()?l.find(".swiper-slide-shadow-right"):l.find(".swiper-slide-shadow-bottom");0===w.length&&(w=a('<div class="swiper-slide-shadow-'+(i()?"left":"top")+'"></div>'),l.append(w)),0===y.length&&(y=a('<div class="swiper-slide-shadow-'+(i()?"right":"bottom")+'"></div>'),l.append(y)),w.length&&(w[0].style.opacity=u>0?u:0),y.length&&(y[0].style.opacity=-u>0?-u:0)}}if(T.browser.ie){var b=T.wrapper[0].style;b.perspectiveOrigin=t+"px 50%"}},setTransition:function(e){T.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)}}},T.lazy={initialImageLoaded:!1,loadImageInSlide:function(e,t){if("undefined"!=typeof e&&("undefined"==typeof t&&(t=!0),0!==T.slides.length)){var r=T.slides.eq(e),s=r.find(".swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)");!r.hasClass("swiper-lazy")||r.hasClass("swiper-lazy-loaded")||r.hasClass("swiper-lazy-loading")||(s=s.add(r[0])),0!==s.length&&s.each(function(){var e=a(this);e.addClass("swiper-lazy-loading");var s=e.attr("data-background"),i=e.attr("data-src"),n=e.attr("data-srcset");T.loadImage(e[0],i||s,n,!1,function(){if(s?(e.css("background-image","url("+s+")"),e.removeAttr("data-background")):(n&&(e.attr("srcset",n),e.removeAttr("data-srcset")),i&&(e.attr("src",i),e.removeAttr("data-src"))),e.addClass("swiper-lazy-loaded").removeClass("swiper-lazy-loading"),r.find(".swiper-lazy-preloader, .preloader").remove(),T.params.loop&&t){var a=r.attr("data-swiper-slide-index");if(r.hasClass(T.params.slideDuplicateClass)){var o=T.wrapper.children('[data-swiper-slide-index="'+a+'"]:not(.'+T.params.slideDuplicateClass+")");T.lazy.loadImageInSlide(o.index(),!1)}else{var l=T.wrapper.children("."+T.params.slideDuplicateClass+'[data-swiper-slide-index="'+a+'"]');T.lazy.loadImageInSlide(l.index(),!1)}}T.emit("onLazyImageReady",T,r[0],e[0])}),T.emit("onLazyImageLoad",T,r[0],e[0])})}},load:function(){var e;if(T.params.watchSlidesVisibility)T.wrapper.children("."+T.params.slideVisibleClass).each(function(){T.lazy.loadImageInSlide(a(this).index())});else if(T.params.slidesPerView>1)for(e=T.activeIndex;e<T.activeIndex+T.params.slidesPerView;e++)T.slides[e]&&T.lazy.loadImageInSlide(e);else T.lazy.loadImageInSlide(T.activeIndex);if(T.params.lazyLoadingInPrevNext)if(T.params.slidesPerView>1){for(e=T.activeIndex+T.params.slidesPerView;e<T.activeIndex+T.params.slidesPerView+T.params.slidesPerView;e++)T.slides[e]&&T.lazy.loadImageInSlide(e);for(e=T.activeIndex-T.params.slidesPerView;e<T.activeIndex;e++)T.slides[e]&&T.lazy.loadImageInSlide(e)}else{var t=T.wrapper.children("."+T.params.slideNextClass);t.length>0&&T.lazy.loadImageInSlide(t.index());var r=T.wrapper.children("."+T.params.slidePrevClass);r.length>0&&T.lazy.loadImageInSlide(r.index())}},onTransitionStart:function(){T.params.lazyLoading&&(T.params.lazyLoadingOnTransitionStart||!T.params.lazyLoadingOnTransitionStart&&!T.lazy.initialImageLoaded)&&T.lazy.load()},onTransitionEnd:function(){T.params.lazyLoading&&!T.params.lazyLoadingOnTransitionStart&&T.lazy.load()}},T.scrollbar={isTouched:!1,setDragPosition:function(e){var a=T.scrollbar,t=i()?"touchstart"===e.type||"touchmove"===e.type?e.targetTouches[0].pageX:e.pageX||e.clientX:"touchstart"===e.type||"touchmove"===e.type?e.targetTouches[0].pageY:e.pageY||e.clientY,r=t-a.track.offset()[i()?"left":"top"]-a.dragSize/2,s=-T.minTranslate()*a.moveDivider,n=-T.maxTranslate()*a.moveDivider;s>r?r=s:r>n&&(r=n),r=-r/a.moveDivider,T.updateProgress(r),T.setWrapperTranslate(r,!0)},dragStart:function(e){var a=T.scrollbar;a.isTouched=!0,e.preventDefault(),e.stopPropagation(),a.setDragPosition(e),clearTimeout(a.dragTimeout),a.track.transition(0),T.params.scrollbarHide&&a.track.css("opacity",1),T.wrapper.transition(100),a.drag.transition(100),T.emit("onScrollbarDragStart",T)},dragMove:function(e){var a=T.scrollbar;a.isTouched&&(e.preventDefault?e.preventDefault():e.returnValue=!1,a.setDragPosition(e),T.wrapper.transition(0),a.track.transition(0),a.drag.transition(0),T.emit("onScrollbarDragMove",T))},dragEnd:function(e){var a=T.scrollbar;a.isTouched&&(a.isTouched=!1,T.params.scrollbarHide&&(clearTimeout(a.dragTimeout),a.dragTimeout=setTimeout(function(){a.track.css("opacity",0),a.track.transition(400)},1e3)),T.emit("onScrollbarDragEnd",T),T.params.scrollbarSnapOnRelease&&T.slideReset())},enableDraggable:function(){var e=T.scrollbar,t=T.support.touch?e.track:document;a(e.track).on(T.touchEvents.start,e.dragStart),a(t).on(T.touchEvents.move,e.dragMove),a(t).on(T.touchEvents.end,e.dragEnd)},disableDraggable:function(){var e=T.scrollbar,t=T.support.touch?e.track:document;a(e.track).off(T.touchEvents.start,e.dragStart),a(t).off(T.touchEvents.move,e.dragMove),a(t).off(T.touchEvents.end,e.dragEnd)},set:function(){if(T.params.scrollbar){var e=T.scrollbar;e.track=a(T.params.scrollbar),e.drag=e.track.find(".swiper-scrollbar-drag"),0===e.drag.length&&(e.drag=a('<div class="swiper-scrollbar-drag"></div>'),e.track.append(e.drag)),e.drag[0].style.width="",e.drag[0].style.height="",e.trackSize=i()?e.track[0].offsetWidth:e.track[0].offsetHeight,e.divider=T.size/T.virtualSize,e.moveDivider=e.divider*(e.trackSize/T.size),e.dragSize=e.trackSize*e.divider,i()?e.drag[0].style.width=e.dragSize+"px":e.drag[0].style.height=e.dragSize+"px",e.divider>=1?e.track[0].style.display="none":e.track[0].style.display="",T.params.scrollbarHide&&(e.track[0].style.opacity=0)}},setTranslate:function(){if(T.params.scrollbar){var e,a=T.scrollbar,t=(T.translate||0,a.dragSize);e=(a.trackSize-a.dragSize)*T.progress,T.rtl&&i()?(e=-e,e>0?(t=a.dragSize-e,e=0):-e+a.dragSize>a.trackSize&&(t=a.trackSize+e)):0>e?(t=a.dragSize+e,e=0):e+a.dragSize>a.trackSize&&(t=a.trackSize-e),i()?(T.support.transforms3d?a.drag.transform("translate3d("+e+"px, 0, 0)"):a.drag.transform("translateX("+e+"px)"),a.drag[0].style.width=t+"px"):(T.support.transforms3d?a.drag.transform("translate3d(0px, "+e+"px, 0)"):a.drag.transform("translateY("+e+"px)"),a.drag[0].style.height=t+"px"),T.params.scrollbarHide&&(clearTimeout(a.timeout),a.track[0].style.opacity=1,a.timeout=setTimeout(function(){a.track[0].style.opacity=0,a.track.transition(400)},1e3))}},setTransition:function(e){T.params.scrollbar&&T.scrollbar.drag.transition(e)}},T.controller={LinearSpline:function(e,a){this.x=e,this.y=a,this.lastIndex=e.length-1;var t,r;this.x.length;this.interpolate=function(e){return e?(r=s(this.x,e),t=r-1,(e-this.x[t])*(this.y[r]-this.y[t])/(this.x[r]-this.x[t])+this.y[t]):0};var s=function(){var e,a,t;return function(r,s){for(a=-1,e=r.length;e-a>1;)r[t=e+a>>1]<=s?a=t:e=t;return e}}()},getInterpolateFunction:function(e){T.controller.spline||(T.controller.spline=T.params.loop?new T.controller.LinearSpline(T.slidesGrid,e.slidesGrid):new T.controller.LinearSpline(T.snapGrid,e.snapGrid))},setTranslate:function(e,a){function r(a){e=a.rtl&&"horizontal"===a.params.direction?-T.translate:T.translate,"slide"===T.params.controlBy&&(T.controller.getInterpolateFunction(a),i=-T.controller.spline.interpolate(-e)),i&&"container"!==T.params.controlBy||(s=(a.maxTranslate()-a.minTranslate())/(T.maxTranslate()-T.minTranslate()),i=(e-T.minTranslate())*s+a.minTranslate()),T.params.controlInverse&&(i=a.maxTranslate()-i),a.updateProgress(i),a.setWrapperTranslate(i,!1,T),a.updateActiveIndex()}var s,i,n=T.params.control;if(T.isArray(n))for(var o=0;o<n.length;o++)n[o]!==a&&n[o]instanceof t&&r(n[o]);else n instanceof t&&a!==n&&r(n)},setTransition:function(e,a){function r(a){a.setWrapperTransition(e,T),0!==e&&(a.onTransitionStart(),a.wrapper.transitionEnd(function(){i&&(a.params.loop&&"slide"===T.params.controlBy&&a.fixLoop(),a.onTransitionEnd())}))}var s,i=T.params.control;if(T.isArray(i))for(s=0;s<i.length;s++)i[s]!==a&&i[s]instanceof t&&r(i[s]);else i instanceof t&&a!==i&&r(i)}},T.hashnav={init:function(){if(T.params.hashnav){T.hashnav.initialized=!0;var e=document.location.hash.replace("#","");if(e)for(var a=0,t=0,r=T.slides.length;r>t;t++){var s=T.slides.eq(t),i=s.attr("data-hash");if(i===e&&!s.hasClass(T.params.slideDuplicateClass)){var n=s.index();T.slideTo(n,a,T.params.runCallbacksOnInit,!0)}}}},setHash:function(){T.hashnav.initialized&&T.params.hashnav&&(document.location.hash=T.slides.eq(T.activeIndex).attr("data-hash")||"")}},T.disableKeyboardControl=function(){T.params.keyboardControl=!1,a(document).off("keydown",p)},T.enableKeyboardControl=function(){T.params.keyboardControl=!0,a(document).on("keydown",p)},T.mousewheel={event:!1,lastScrollTime:(new window.Date).getTime()},T.params.mousewheelControl){try{new window.WheelEvent("wheel"),T.mousewheel.event="wheel"}catch(R){}T.mousewheel.event||void 0===document.onmousewheel||(T.mousewheel.event="mousewheel"),T.mousewheel.event||(T.mousewheel.event="DOMMouseScroll")}T.disableMousewheelControl=function(){return T.mousewheel.event?(T.container.off(T.mousewheel.event,u),!0):!1},T.enableMousewheelControl=function(){return T.mousewheel.event?(T.container.on(T.mousewheel.event,u),!0):!1},T.parallax={setTranslate:function(){T.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){c(this,T.progress)}),T.slides.each(function(){var e=a(this);e.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){var a=Math.min(Math.max(e[0].progress,-1),1);c(this,a)})})},setTransition:function(e){"undefined"==typeof e&&(e=T.params.speed),T.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){var t=a(this),r=parseInt(t.attr("data-swiper-parallax-duration"),10)||e;0===e&&(r=0),t.transition(r)})}},T._plugins=[];for(var W in T.plugins){var V=T.plugins[W](T,T.params[W]);V&&T._plugins.push(V)}return T.callPlugins=function(e){for(var a=0;a<T._plugins.length;a++)e in T._plugins[a]&&T._plugins[a][e](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])},T.emitterEventListeners={},T.emit=function(e){T.params[e]&&T.params[e](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);var a;if(T.emitterEventListeners[e])for(a=0;a<T.emitterEventListeners[e].length;a++)T.emitterEventListeners[e][a](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);T.callPlugins&&T.callPlugins(e,arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])},T.on=function(e,a){return e=m(e),T.emitterEventListeners[e]||(T.emitterEventListeners[e]=[]),T.emitterEventListeners[e].push(a),T},T.off=function(e,a){var t;if(e=m(e),"undefined"==typeof a)return T.emitterEventListeners[e]=[],T;if(T.emitterEventListeners[e]&&0!==T.emitterEventListeners[e].length){for(t=0;t<T.emitterEventListeners[e].length;t++)T.emitterEventListeners[e][t]===a&&T.emitterEventListeners[e].splice(t,1);return T}},T.once=function(e,a){e=m(e);var t=function(){a(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]),T.off(e,t)};return T.on(e,t),T},T.a11y={makeFocusable:function(e){return e.attr("tabIndex","0"),e},addRole:function(e,a){return e.attr("role",a),e},addLabel:function(e,a){return e.attr("aria-label",a),e},disable:function(e){return e.attr("aria-disabled",!0),e},enable:function(e){return e.attr("aria-disabled",!1),e},onEnterKey:function(e){13===e.keyCode&&(a(e.target).is(T.params.nextButton)?(T.onClickNext(e),T.isEnd?T.a11y.notify(T.params.lastSlideMessage):T.a11y.notify(T.params.nextSlideMessage)):a(e.target).is(T.params.prevButton)&&(T.onClickPrev(e),T.isBeginning?T.a11y.notify(T.params.firstSlideMessage):T.a11y.notify(T.params.prevSlideMessage)),a(e.target).is("."+T.params.bulletClass)&&a(e.target)[0].click())},liveRegion:a('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),notify:function(e){var a=T.a11y.liveRegion;0!==a.length&&(a.html(""),a.html(e))},init:function(){if(T.params.nextButton){var e=a(T.params.nextButton);T.a11y.makeFocusable(e),T.a11y.addRole(e,"button"),T.a11y.addLabel(e,T.params.nextSlideMessage)}if(T.params.prevButton){var t=a(T.params.prevButton);T.a11y.makeFocusable(t),T.a11y.addRole(t,"button"),T.a11y.addLabel(t,T.params.prevSlideMessage)}a(T.container).append(T.a11y.liveRegion)},initPagination:function(){T.params.pagination&&T.params.paginationClickable&&T.bullets&&T.bullets.length&&T.bullets.each(function(){var e=a(this);T.a11y.makeFocusable(e),T.a11y.addRole(e,"button"),T.a11y.addLabel(e,T.params.paginationBulletMessage.replace(/{{index}}/,e.index()+1))})},destroy:function(){T.a11y.liveRegion&&T.a11y.liveRegion.length>0&&T.a11y.liveRegion.remove()}},T.init=function(){T.params.loop&&T.createLoop(),T.updateContainerSize(),T.updateSlidesSize(),T.updatePagination(),T.params.scrollbar&&T.scrollbar&&(T.scrollbar.set(),T.params.scrollbarDraggable&&T.scrollbar.enableDraggable()),"slide"!==T.params.effect&&T.effects[T.params.effect]&&(T.params.loop||T.updateProgress(),T.effects[T.params.effect].setTranslate()),T.params.loop?T.slideTo(T.params.initialSlide+T.loopedSlides,0,T.params.runCallbacksOnInit):(T.slideTo(T.params.initialSlide,0,T.params.runCallbacksOnInit),0===T.params.initialSlide&&(T.parallax&&T.params.parallax&&T.parallax.setTranslate(),T.lazy&&T.params.lazyLoading&&(T.lazy.load(),T.lazy.initialImageLoaded=!0))),T.attachEvents(),T.params.observer&&T.support.observer&&T.initObservers(),T.params.preloadImages&&!T.params.lazyLoading&&T.preloadImages(),T.params.autoplay&&T.startAutoplay(),T.params.keyboardControl&&T.enableKeyboardControl&&T.enableKeyboardControl(),T.params.mousewheelControl&&T.enableMousewheelControl&&T.enableMousewheelControl(),T.params.hashnav&&T.hashnav&&T.hashnav.init(),T.params.a11y&&T.a11y&&T.a11y.init(),T.emit("onInit",T)},T.cleanupStyles=function(){T.container.removeClass(T.classNames.join(" ")).removeAttr("style"),T.wrapper.removeAttr("style"),T.slides&&T.slides.length&&T.slides.removeClass([T.params.slideVisibleClass,T.params.slideActiveClass,T.params.slideNextClass,T.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"),T.paginationContainer&&T.paginationContainer.length&&T.paginationContainer.removeClass(T.params.paginationHiddenClass),T.bullets&&T.bullets.length&&T.bullets.removeClass(T.params.bulletActiveClass),T.params.prevButton&&a(T.params.prevButton).removeClass(T.params.buttonDisabledClass),T.params.nextButton&&a(T.params.nextButton).removeClass(T.params.buttonDisabledClass),T.params.scrollbar&&T.scrollbar&&(T.scrollbar.track&&T.scrollbar.track.length&&T.scrollbar.track.removeAttr("style"),T.scrollbar.drag&&T.scrollbar.drag.length&&T.scrollbar.drag.removeAttr("style"))},T.destroy=function(e,a){T.detachEvents(),T.stopAutoplay(),T.params.scrollbar&&T.scrollbar&&T.params.scrollbarDraggable&&T.scrollbar.disableDraggable(),T.params.loop&&T.destroyLoop(),a&&T.cleanupStyles(),T.disconnectObservers(),T.params.keyboardControl&&T.disableKeyboardControl&&T.disableKeyboardControl(),T.params.mousewheelControl&&T.disableMousewheelControl&&T.disableMousewheelControl(),T.params.a11y&&T.a11y&&T.a11y.destroy(),T.emit("onDestroy"),e!==!1&&(T=null)},T.init(),T}};t.prototype={isSafari:function(){var e=navigator.userAgent.toLowerCase();return e.indexOf("safari")>=0&&e.indexOf("chrome")<0&&e.indexOf("android")<0}(),isUiWebView:/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),isArray:function(e){return"[object Array]"===Object.prototype.toString.apply(e)},browser:{ie:window.navigator.pointerEnabled||window.navigator.msPointerEnabled,ieTouch:window.navigator.msPointerEnabled&&window.navigator.msMaxTouchPoints>1||window.navigator.pointerEnabled&&window.navigator.maxTouchPoints>1},device:function(){var e=navigator.userAgent,a=e.match(/(Android);?[\s\/]+([\d.]+)?/),t=e.match(/(iPad).*OS\s([\d_]+)/),r=e.match(/(iPod)(.*OS\s([\d_]+))?/),s=!t&&e.match(/(iPhone\sOS)\s([\d_]+)/);return{ios:t||s||r,android:a}}(),support:{touch:window.Modernizr&&Modernizr.touch===!0||function(){return!!("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch)}(),transforms3d:window.Modernizr&&Modernizr.csstransforms3d===!0||function(){var e=document.createElement("div").style;return"webkitPerspective"in e||"MozPerspective"in e||"OPerspective"in e||"MsPerspective"in e||"perspective"in e}(),flexbox:function(){for(var e=document.createElement("div").style,a="alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "),t=0;t<a.length;t++)if(a[t]in e)return!0}(),observer:function(){return"MutationObserver"in window||"WebkitMutationObserver"in window}()},plugins:{}};for(var r=(function(){var e=function(e){var a=this,t=0;for(t=0;t<e.length;t++)a[t]=e[t];return a.length=e.length,this},a=function(a,t){var r=[],s=0;if(a&&!t&&a instanceof e)return a;if(a)if("string"==typeof a){var i,n,o=a.trim();if(o.indexOf("<")>=0&&o.indexOf(">")>=0){var l="div";for(0===o.indexOf("<li")&&(l="ul"),0===o.indexOf("<tr")&&(l="tbody"),(0===o.indexOf("<td")||0===o.indexOf("<th"))&&(l="tr"),0===o.indexOf("<tbody")&&(l="table"),0===o.indexOf("<option")&&(l="select"),n=document.createElement(l),n.innerHTML=a,s=0;s<n.childNodes.length;s++)r.push(n.childNodes[s])}else for(i=t||"#"!==a[0]||a.match(/[ .<>:~]/)?(t||document).querySelectorAll(a):[document.getElementById(a.split("#")[1])],s=0;s<i.length;s++)i[s]&&r.push(i[s])}else if(a.nodeType||a===window||a===document)r.push(a);else if(a.length>0&&a[0].nodeType)for(s=0;s<a.length;s++)r.push(a[s]);return new e(r)};return e.prototype={addClass:function(e){if("undefined"==typeof e)return this;for(var a=e.split(" "),t=0;t<a.length;t++)for(var r=0;r<this.length;r++)this[r].classList.add(a[t]);return this},removeClass:function(e){for(var a=e.split(" "),t=0;t<a.length;t++)for(var r=0;r<this.length;r++)this[r].classList.remove(a[t]);return this},hasClass:function(e){return this[0]?this[0].classList.contains(e):!1},toggleClass:function(e){for(var a=e.split(" "),t=0;t<a.length;t++)for(var r=0;r<this.length;r++)this[r].classList.toggle(a[t]);return this},attr:function(e,a){if(1===arguments.length&&"string"==typeof e)return this[0]?this[0].getAttribute(e):void 0;for(var t=0;t<this.length;t++)if(2===arguments.length)this[t].setAttribute(e,a);else for(var r in e)this[t][r]=e[r],this[t].setAttribute(r,e[r]);return this},removeAttr:function(e){for(var a=0;a<this.length;a++)this[a].removeAttribute(e);return this},data:function(e,a){if("undefined"!=typeof a){for(var t=0;t<this.length;t++){var r=this[t];r.dom7ElementDataStorage||(r.dom7ElementDataStorage={}),r.dom7ElementDataStorage[e]=a}return this}if(this[0]){var s=this[0].getAttribute("data-"+e);return s?s:this[0].dom7ElementDataStorage&&e in this[0].dom7ElementDataStorage?this[0].dom7ElementDataStorage[e]:void 0}},transform:function(e){for(var a=0;a<this.length;a++){var t=this[a].style;t.webkitTransform=t.MsTransform=t.msTransform=t.MozTransform=t.OTransform=t.transform=e}return this},transition:function(e){"string"!=typeof e&&(e+="ms");for(var a=0;a<this.length;a++){var t=this[a].style;t.webkitTransitionDuration=t.MsTransitionDuration=t.msTransitionDuration=t.MozTransitionDuration=t.OTransitionDuration=t.transitionDuration=e}return this},on:function(e,t,r,s){function i(e){var s=e.target;if(a(s).is(t))r.call(s,e);else for(var i=a(s).parents(),n=0;n<i.length;n++)a(i[n]).is(t)&&r.call(i[n],e)}var n,o,l=e.split(" ");for(n=0;n<this.length;n++)if("function"==typeof t||t===!1)for("function"==typeof t&&(r=arguments[1],s=arguments[2]||!1),o=0;o<l.length;o++)this[n].addEventListener(l[o],r,s);else for(o=0;o<l.length;o++)this[n].dom7LiveListeners||(this[n].dom7LiveListeners=[]),this[n].dom7LiveListeners.push({listener:r,liveListener:i}),this[n].addEventListener(l[o],i,s);return this},off:function(e,a,t,r){for(var s=e.split(" "),i=0;i<s.length;i++)for(var n=0;n<this.length;n++)if("function"==typeof a||a===!1)"function"==typeof a&&(t=arguments[1],
r=arguments[2]||!1),this[n].removeEventListener(s[i],t,r);else if(this[n].dom7LiveListeners)for(var o=0;o<this[n].dom7LiveListeners.length;o++)this[n].dom7LiveListeners[o].listener===t&&this[n].removeEventListener(s[i],this[n].dom7LiveListeners[o].liveListener,r);return this},once:function(e,a,t,r){function s(n){t(n),i.off(e,a,s,r)}var i=this;"function"==typeof a&&(a=!1,t=arguments[1],r=arguments[2]),i.on(e,a,s,r)},trigger:function(e,a){for(var t=0;t<this.length;t++){var r;try{r=new window.CustomEvent(e,{detail:a,bubbles:!0,cancelable:!0})}catch(s){r=document.createEvent("Event"),r.initEvent(e,!0,!0),r.detail=a}this[t].dispatchEvent(r)}return this},transitionEnd:function(e){function a(i){if(i.target===this)for(e.call(this,i),t=0;t<r.length;t++)s.off(r[t],a)}var t,r=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],s=this;if(e)for(t=0;t<r.length;t++)s.on(r[t],a);return this},width:function(){return this[0]===window?window.innerWidth:this.length>0?parseFloat(this.css("width")):null},outerWidth:function(e){return this.length>0?e?this[0].offsetWidth+parseFloat(this.css("margin-right"))+parseFloat(this.css("margin-left")):this[0].offsetWidth:null},height:function(){return this[0]===window?window.innerHeight:this.length>0?parseFloat(this.css("height")):null},outerHeight:function(e){return this.length>0?e?this[0].offsetHeight+parseFloat(this.css("margin-top"))+parseFloat(this.css("margin-bottom")):this[0].offsetHeight:null},offset:function(){if(this.length>0){var e=this[0],a=e.getBoundingClientRect(),t=document.body,r=e.clientTop||t.clientTop||0,s=e.clientLeft||t.clientLeft||0,i=window.pageYOffset||e.scrollTop,n=window.pageXOffset||e.scrollLeft;return{top:a.top+i-r,left:a.left+n-s}}return null},css:function(e,a){var t;if(1===arguments.length){if("string"!=typeof e){for(t=0;t<this.length;t++)for(var r in e)this[t].style[r]=e[r];return this}if(this[0])return window.getComputedStyle(this[0],null).getPropertyValue(e)}if(2===arguments.length&&"string"==typeof e){for(t=0;t<this.length;t++)this[t].style[e]=a;return this}return this},each:function(e){for(var a=0;a<this.length;a++)e.call(this[a],a,this[a]);return this},html:function(e){if("undefined"==typeof e)return this[0]?this[0].innerHTML:void 0;for(var a=0;a<this.length;a++)this[a].innerHTML=e;return this},is:function(t){if(!this[0])return!1;var r,s;if("string"==typeof t){var i=this[0];if(i===document)return t===document;if(i===window)return t===window;if(i.matches)return i.matches(t);if(i.webkitMatchesSelector)return i.webkitMatchesSelector(t);if(i.mozMatchesSelector)return i.mozMatchesSelector(t);if(i.msMatchesSelector)return i.msMatchesSelector(t);for(r=a(t),s=0;s<r.length;s++)if(r[s]===this[0])return!0;return!1}if(t===document)return this[0]===document;if(t===window)return this[0]===window;if(t.nodeType||t instanceof e){for(r=t.nodeType?[t]:t,s=0;s<r.length;s++)if(r[s]===this[0])return!0;return!1}return!1},index:function(){if(this[0]){for(var e=this[0],a=0;null!==(e=e.previousSibling);)1===e.nodeType&&a++;return a}},eq:function(a){if("undefined"==typeof a)return this;var t,r=this.length;return a>r-1?new e([]):0>a?(t=r+a,new e(0>t?[]:[this[t]])):new e([this[a]])},append:function(a){var t,r;for(t=0;t<this.length;t++)if("string"==typeof a){var s=document.createElement("div");for(s.innerHTML=a;s.firstChild;)this[t].appendChild(s.firstChild)}else if(a instanceof e)for(r=0;r<a.length;r++)this[t].appendChild(a[r]);else this[t].appendChild(a);return this},prepend:function(a){var t,r;for(t=0;t<this.length;t++)if("string"==typeof a){var s=document.createElement("div");for(s.innerHTML=a,r=s.childNodes.length-1;r>=0;r--)this[t].insertBefore(s.childNodes[r],this[t].childNodes[0])}else if(a instanceof e)for(r=0;r<a.length;r++)this[t].insertBefore(a[r],this[t].childNodes[0]);else this[t].insertBefore(a,this[t].childNodes[0]);return this},insertBefore:function(e){for(var t=a(e),r=0;r<this.length;r++)if(1===t.length)t[0].parentNode.insertBefore(this[r],t[0]);else if(t.length>1)for(var s=0;s<t.length;s++)t[s].parentNode.insertBefore(this[r].cloneNode(!0),t[s])},insertAfter:function(e){for(var t=a(e),r=0;r<this.length;r++)if(1===t.length)t[0].parentNode.insertBefore(this[r],t[0].nextSibling);else if(t.length>1)for(var s=0;s<t.length;s++)t[s].parentNode.insertBefore(this[r].cloneNode(!0),t[s].nextSibling)},next:function(t){return new e(this.length>0?t?this[0].nextElementSibling&&a(this[0].nextElementSibling).is(t)?[this[0].nextElementSibling]:[]:this[0].nextElementSibling?[this[0].nextElementSibling]:[]:[])},nextAll:function(t){var r=[],s=this[0];if(!s)return new e([]);for(;s.nextElementSibling;){var i=s.nextElementSibling;t?a(i).is(t)&&r.push(i):r.push(i),s=i}return new e(r)},prev:function(t){return new e(this.length>0?t?this[0].previousElementSibling&&a(this[0].previousElementSibling).is(t)?[this[0].previousElementSibling]:[]:this[0].previousElementSibling?[this[0].previousElementSibling]:[]:[])},prevAll:function(t){var r=[],s=this[0];if(!s)return new e([]);for(;s.previousElementSibling;){var i=s.previousElementSibling;t?a(i).is(t)&&r.push(i):r.push(i),s=i}return new e(r)},parent:function(e){for(var t=[],r=0;r<this.length;r++)e?a(this[r].parentNode).is(e)&&t.push(this[r].parentNode):t.push(this[r].parentNode);return a(a.unique(t))},parents:function(e){for(var t=[],r=0;r<this.length;r++)for(var s=this[r].parentNode;s;)e?a(s).is(e)&&t.push(s):t.push(s),s=s.parentNode;return a(a.unique(t))},find:function(a){for(var t=[],r=0;r<this.length;r++)for(var s=this[r].querySelectorAll(a),i=0;i<s.length;i++)t.push(s[i]);return new e(t)},children:function(t){for(var r=[],s=0;s<this.length;s++)for(var i=this[s].childNodes,n=0;n<i.length;n++)t?1===i[n].nodeType&&a(i[n]).is(t)&&r.push(i[n]):1===i[n].nodeType&&r.push(i[n]);return new e(a.unique(r))},remove:function(){for(var e=0;e<this.length;e++)this[e].parentNode&&this[e].parentNode.removeChild(this[e]);return this},add:function(){var e,t,r=this;for(e=0;e<arguments.length;e++){var s=a(arguments[e]);for(t=0;t<s.length;t++)r[r.length]=s[t],r.length++}return r}},a.fn=e.prototype,a.unique=function(e){for(var a=[],t=0;t<e.length;t++)-1===a.indexOf(e[t])&&a.push(e[t]);return a},a}()),s=["jQuery","Zepto","Dom7"],i=0;i<s.length;i++)window[s[i]]&&e(window[s[i]]);var n;n="undefined"==typeof r?window.Dom7||window.Zepto||window.jQuery:r,n&&("transitionEnd"in n.fn||(n.fn.transitionEnd=function(e){function a(i){if(i.target===this)for(e.call(this,i),t=0;t<r.length;t++)s.off(r[t],a)}var t,r=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],s=this;if(e)for(t=0;t<r.length;t++)s.on(r[t],a);return this}),"transform"in n.fn||(n.fn.transform=function(e){for(var a=0;a<this.length;a++){var t=this[a].style;t.webkitTransform=t.MsTransform=t.msTransform=t.MozTransform=t.OTransform=t.transform=e}return this}),"transition"in n.fn||(n.fn.transition=function(e){"string"!=typeof e&&(e+="ms");for(var a=0;a<this.length;a++){var t=this[a].style;t.webkitTransitionDuration=t.MsTransitionDuration=t.msTransitionDuration=t.MozTransitionDuration=t.OTransitionDuration=t.transitionDuration=e}return this})),window.Swiper=t}(),"undefined"!=typeof module?module.exports=window.Swiper:"function"==typeof define&&define.amd&&define([],function(){"use strict";return window.Swiper});


/*
 * Blur.js
 * Copyright Jacob Kelley
 * MIT License
 */
// Stackblur, courtesy of Mario Klingemann: http://www.quasimondo.com/StackBlurForCanvas/StackBlurDemo.html
(function(l){l.fn.blurjs=function(e){function O(){this.a=this.b=this.g=this.r=0;this.next=null}var y=document.createElement("canvas"),P=!1,H=l(this).selector.replace(/[^a-zA-Z0-9]/g,"");if(y.getContext){var e=l.extend({source:"body",radius:5,overlay:"",offset:{x:0,y:0},optClass:"",cache:!1,cacheKeyPrefix:"blurjs-",draggable:!1,debug:!1},e),R=[512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512,454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512,482,454,428,405,383,364,345,
328,312,298,284,271,259,496,475,456,437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512,497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328,320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456,446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335,329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512,505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405,399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328,324,320,316,312,309,
305,301,298,294,291,287,284,281,278,274,271,268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456,451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388,385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335,332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292,289,287,285,282,280,278,275,273,271,269,267,265,263,261,259],S=[9,11,12,13,13,14,14,15,15,15,15,16,16,16,16,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,19,19,19,19,19,19,20,
20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,
24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24];return this.each(function(){var A=l(this),I=l(e.source),B=I.css("backgroundImage").replace(/"/g,"").replace(/url\(|\)$/ig,"");ctx=y.getContext("2d");tempImg=new Image;tempImg.onload=function(){if(P)j=tempImg.src;else{y.style.display="none";y.width=tempImg.width;y.height=tempImg.height;ctx.drawImage(tempImg,0,0);var j=y.width,q=y.height,k=e.radius;if(!(isNaN(k)||1>k)){var k=
k|0,M=y.getContext("2d"),l;try{try{l=M.getImageData(0,0,j,q)}catch(L){try{netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead"),l=M.getImageData(0,0,j,q)}catch(T){throw alert("Cannot access local image"),Error("unable to access local image data: "+T);}}}catch(U){throw alert("Cannot access image"),Error("unable to access image data: "+U);}var c=l.data,u,z,a,d,f,J,g,h,i,v,w,x,m,n,o,r,s,t,C;u=k+k+1;var K=j-1,N=q-1,p=k+1,D=p*(p+1)/2,E=new O,b=E;for(a=1;a<u;a++)if(b=b.next=new O,a==
p)var Q=b;b.next=E;b=a=null;J=f=0;var F=R[k],G=S[k];for(z=0;z<q;z++){m=n=o=g=h=i=0;v=p*(r=c[f]);w=p*(s=c[f+1]);x=p*(t=c[f+2]);g+=D*r;h+=D*s;i+=D*t;b=E;for(a=0;a<p;a++)b.r=r,b.g=s,b.b=t,b=b.next;for(a=1;a<p;a++)d=f+((K<a?K:a)<<2),g+=(b.r=r=c[d])*(C=p-a),h+=(b.g=s=c[d+1])*C,i+=(b.b=t=c[d+2])*C,m+=r,n+=s,o+=t,b=b.next;a=E;b=Q;for(u=0;u<j;u++)c[f]=g*F>>G,c[f+1]=h*F>>G,c[f+2]=i*F>>G,g-=v,h-=w,i-=x,v-=a.r,w-=a.g,x-=a.b,d=J+((d=u+k+1)<K?d:K)<<2,m+=a.r=c[d],n+=a.g=c[d+1],o+=a.b=c[d+2],g+=m,h+=n,i+=o,a=a.next,
v+=r=b.r,w+=s=b.g,x+=t=b.b,m-=r,n-=s,o-=t,b=b.next,f+=4;J+=j}for(u=0;u<j;u++){n=o=m=h=i=g=0;f=u<<2;v=p*(r=c[f]);w=p*(s=c[f+1]);x=p*(t=c[f+2]);g+=D*r;h+=D*s;i+=D*t;b=E;for(a=0;a<p;a++)b.r=r,b.g=s,b.b=t,b=b.next;d=j;for(a=1;a<=k;a++)f=d+u<<2,g+=(b.r=r=c[f])*(C=p-a),h+=(b.g=s=c[f+1])*C,i+=(b.b=t=c[f+2])*C,m+=r,n+=s,o+=t,b=b.next,a<N&&(d+=j);f=u;a=E;b=Q;for(z=0;z<q;z++)d=f<<2,c[d]=g*F>>G,c[d+1]=h*F>>G,c[d+2]=i*F>>G,g-=v,h-=w,i-=x,v-=a.r,w-=a.g,x-=a.b,d=u+((d=z+p)<N?d:N)*j<<2,g+=m+=a.r=c[d],h+=n+=a.g=
c[d+1],i+=o+=a.b=c[d+2],a=a.next,v+=r=b.r,w+=s=b.g,x+=t=b.b,m-=r,n-=s,o-=t,b=b.next,f+=j}M.putImageData(l,0,0)}if(!1!=e.overlay)ctx.beginPath(),ctx.rect(0,0,tempImg.width,tempImg.width),ctx.fillStyle=e.overlay,ctx.fill();var j=y.toDataURL();if(e.cache)try{e.debug&&console.log("Cache Set"),localStorage.setItem(e.cacheKeyPrefix+H+"-"+B+"-data-image",j)}catch(V){console.log(V)}}q=I.css("backgroundAttachment");k="fixed"==q?"":"-"+(A.offset().left-I.offset().left-e.offset.x)+"px -"+(A.offset().top-I.offset().top-
e.offset.y)+"px";A.css({"background-image":'url("'+j+'")',"background-repeat":I.css("backgroundRepeat"),"background-position":k,"background-attachment":q});!1!=e.optClass&&A.addClass(e.optClass);e.draggable&&(A.css({"background-attachment":"fixed","background-position":"0 0"}),A.draggable())};Storage.prototype.cacheChecksum=function(j){var q="",k;for(k in j)var l=j[k],q="[object Object]"==l.toString()?q+(l.x.toString()+l.y.toString()+",").replace(/[^a-zA-Z0-9]/g,""):q+(l+",").replace(/[^a-zA-Z0-9]/g,
"");this.getItem(e.cacheKeyPrefix+H+"-"+B+"-options-cache")!=q&&(this.removeItem(e.cacheKeyPrefix+H+"-"+B+"-options-cache"),this.setItem(e.cacheKeyPrefix+H+"-"+B+"-options-cache",q),e.debug&&console.log("Settings Changed, Cache Emptied"))};var L=null;e.cache&&(localStorage.cacheChecksum(e),L=localStorage.getItem(e.cacheKeyPrefix+H+"-"+B+"-data-image"));null!=L?(e.debug&&console.log("Cache Used"),P=!0,tempImg.src=L):(e.debug&&console.log("Source Used"),tempImg.src=B)})}}})(jQuery);

/**
 * @author trixta
 * @version 1.2
 */
(function($){

var mwheelI = {
			pos: [-260, -260]
		},
	minDif 	= 3,
	doc 	= document,
	root 	= doc.documentElement,
	body 	= doc.body,
	longDelay, shortDelay
;

function unsetPos(){
	if(this === mwheelI.elem){
		mwheelI.pos = [-260, -260];
		mwheelI.elem = false;
		minDif = 3;
	}
}

$.event.special.mwheelIntent = {
	setup: function(){
		var jElm = $(this).bind('mousewheel', $.event.special.mwheelIntent.handler);
		if( this !== doc && this !== root && this !== body ){
			jElm.bind('mouseleave', unsetPos);
		}
		jElm = null;
        return true;
    },
	teardown: function(){
        $(this)
			.unbind('mousewheel', $.event.special.mwheelIntent.handler)
			.unbind('mouseleave', unsetPos)
		;
        return true;
    },
    handler: function(e, d){
		var pos = [e.clientX, e.clientY];
		if( this === mwheelI.elem || Math.abs(mwheelI.pos[0] - pos[0]) > minDif || Math.abs(mwheelI.pos[1] - pos[1]) > minDif ){
            mwheelI.elem = this;
			mwheelI.pos = pos;
			minDif = 250;
			clearTimeout(shortDelay);
			shortDelay = setTimeout(function(){
				minDif = 10;
			}, 200);
			clearTimeout(longDelay);
			longDelay = setTimeout(function(){
				minDif = 3;
			}, 1500);
			e = $.extend({}, e, {type: 'mwheelIntent'});
            return ($.event.dispatch || $.event.handle).apply(this, arguments);
		}
    }
};
$.fn.extend({
	mwheelIntent: function(fn) {
		return fn ? this.bind("mwheelIntent", fn) : this.trigger("mwheelIntent");
	},
	unmwheelIntent: function(fn) {
		return this.unbind("mwheelIntent", fn);
	}
});

$(function(){
	body = doc.body;
	//assume that document is always scrollable, doesn't hurt if not
	$(doc).bind('mwheelIntent.mwheelIntentDefault', $.noop);
});
})(jQuery);
/*! Social Likes v3.0.14 by Artem Sapegin - http://sapegin.github.com/social-likes - Licensed MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a,b){"use strict";function c(a,b){this.container=a,this.options=b,this.init()}function d(b,c){this.widget=b,this.options=a.extend({},c),this.detectService(),this.service&&this.init()}function e(a){function b(a,b){return b.toUpper()}var c={},d=a.data();for(var e in d){var f=d[e];"yes"===f?f=!0:"no"===f&&(f=!1),c[e.replace(/-(\w)/g,b)]=f}return c}function f(a,b){return g(a,b,encodeURIComponent)}function g(a,b,c){return a.replace(/\{([^\}]+)\}/g,function(a,d){return d in b?c?c(b[d]):b[d]:a})}function h(a,b){var c=l+a;return c+" "+c+"_"+b}function i(b,c){function d(g){"keydown"===g.type&&27!==g.which||a(g.target).closest(b).length||(b.removeClass(m),e.off(f,d),a.isFunction(c)&&c())}var e=a(document),f="click touchstart keydown";e.on(f,d)}function j(a){var b=10;if(document.documentElement.getBoundingClientRect){var c=parseInt(a.css("left"),10),d=parseInt(a.css("top"),10),e=a[0].getBoundingClientRect();e.left<b?a.css("left",b-e.left+c):e.right>window.innerWidth-b&&a.css("left",window.innerWidth-e.right-b+c),e.top<b?a.css("top",b-e.top+d):e.bottom>window.innerHeight-b&&a.css("top",window.innerHeight-e.bottom-b+d)}a.addClass(m)}var k="social-likes",l=k+"__",m=k+"_opened",n="https:"===location.protocol?"https:":"http:",o="https:"===n,p={facebook:{counterUrl:"https://graph.facebook.com/fql?q=SELECT+total_count+FROM+link_stat+WHERE+url%3D%22{url}%22&callback=?",convertNumber:function(a){return a.data[0].total_count},popupUrl:"https://www.facebook.com/sharer/sharer.php?u={url}",popupWidth:600,popupHeight:500},twitter:{counterUrl:"https://cdn.api.twitter.com/1/urls/count.json?url={url}&callback=?",convertNumber:function(a){return a.count},popupUrl:"https://twitter.com/intent/tweet?url={url}&text={title}",popupWidth:600,popupHeight:450,click:function(){return/[\.\?:\-–—]\s*$/.test(this.options.title)||(this.options.title+=":"),!0}},mailru:{counterUrl:n+"//connect.mail.ru/share_count?url_list={url}&callback=1&func=?",convertNumber:function(a){for(var b in a)if(a.hasOwnProperty(b))return a[b].shares},popupUrl:n+"//connect.mail.ru/share?share_url={url}&title={title}",popupWidth:550,popupHeight:360},vkontakte:{counterUrl:"https://vk.com/share.php?act=count&url={url}&index={index}",counter:function(b,c){var d=p.vkontakte;d._||(d._=[],window.VK||(window.VK={}),window.VK.Share={count:function(a,b){d._[a].resolve(b)}});var e=d._.length;d._.push(c),a.getScript(f(b,{index:e})).fail(c.reject)},popupUrl:n+"//vk.com/share.php?url={url}&title={title}",popupWidth:550,popupHeight:330},odnoklassniki:{counterUrl:o?b:"https://connect.ok.ru/dk?st.cmd=extLike&ref={url}&uid={index}",counter:function(b,c){var d=p.odnoklassniki;d._||(d._=[],window.ODKL||(window.ODKL={}),window.ODKL.updateCount=function(a,b){d._[a].resolve(b)});var e=d._.length;d._.push(c),a.getScript(f(b,{index:e})).fail(c.reject)},popupUrl:"https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&service=odnoklassniki&st.shareUrl={url}",popupWidth:550,popupHeight:360},plusone:{counterUrl:o?b:"https://share.yandex.ru/gpp.xml?url={url}",counter:function(b,c){var d=p.plusone;return d._?void c.reject():(window.services||(window.services={}),window.services.gplus={cb:function(a){"string"==typeof a&&(a=a.replace(/\D/g,"")),d._.resolve(parseInt(a,10))}},d._=c,void a.getScript(f(b)).fail(c.reject))},popupUrl:"https://plus.google.com/share?url={url}",popupWidth:700,popupHeight:500},pinterest:{counterUrl:n+"//api.pinterest.com/v1/urls/count.json?url={url}&callback=?",convertNumber:function(a){return a.count},popupUrl:n+"//pinterest.com/pin/create/button/?url={url}&description={title}",popupWidth:630,popupHeight:270}},q={promises:{},fetch:function(b,c,d){q.promises[b]||(q.promises[b]={});var e=q.promises[b];if(!d.forceUpdate&&e[c])return e[c];var g=a.extend({},p[b],d),h=a.Deferred(),i=g.counterUrl&&f(g.counterUrl,{url:c});return i&&a.isFunction(g.counter)?g.counter(i,h):g.counterUrl?a.getJSON(i).done(function(b){try{var c=b;a.isFunction(g.convertNumber)&&(c=g.convertNumber(b)),h.resolve(c)}catch(d){h.reject()}}).fail(h.reject):h.reject(),e[c]=h.promise(),e[c]}};a.fn.socialLikes=function(b){return this.each(function(){var d=a(this),f=d.data(k);f?a.isPlainObject(b)&&f.update(b):(f=new c(d,a.extend({},a.fn.socialLikes.defaults,b,e(d))),d.data(k,f))})},a.fn.socialLikes.defaults={url:window.location.href.replace(window.location.hash,""),title:document.title,counters:!0,zeroes:!1,wait:500,timeout:1e4,popupCheckInterval:500,singleTitle:"Share"},c.prototype={init:function(){this.container.addClass(k),this.single=this.container.hasClass(k+"_single"),this.initUserButtons(),this.countersLeft=0,this.number=0,this.container.on("counter."+k,a.proxy(this.updateCounter,this));var b=this.container.children();this.makeSingleButton(),this.buttons=[],b.each(a.proxy(function(b,c){var e=new d(a(c),this.options);this.buttons.push(e),e.options.counterUrl&&this.countersLeft++},this)),this.options.counters?(this.timer=setTimeout(a.proxy(this.appear,this),this.options.wait),this.timeout=setTimeout(a.proxy(this.ready,this,!0),this.options.timeout)):this.appear()},initUserButtons:function(){!this.userButtonInited&&window.socialLikesButtons&&a.extend(!0,p,socialLikesButtons),this.userButtonInited=!0},makeSingleButton:function(){if(this.single){var b=this.container;b.addClass(k+"_vertical"),b.wrap(a("<div>",{"class":k+"_single-w"})),b.wrapInner(a("<div>",{"class":k+"__single-container"}));var c=b.parent(),d=a("<div>",{"class":h("widget","single")}),e=a(g('<div class="{buttonCls}"><span class="{iconCls}"></span>{title}</div>',{buttonCls:h("button","single"),iconCls:h("icon","single"),title:this.options.singleTitle}));d.append(e),c.append(d),d.on("click",function(){var a=k+"__widget_active";return d.toggleClass(a),d.hasClass(a)?(b.css({left:-(b.width()-d.width())/2,top:-b.height()}),j(b),i(b,function(){d.removeClass(a)})):b.removeClass(m),!1}),this.widget=d}},update:function(b){if(b.forceUpdate||b.url!==this.options.url){this.number=0,this.countersLeft=this.buttons.length,this.widget&&this.widget.find("."+k+"__counter").remove(),a.extend(this.options,b);for(var c=0;c<this.buttons.length;c++)this.buttons[c].update(b)}},updateCounter:function(a,b,c){c&&(this.number+=c,this.single&&this.getCounterElem().text(this.number)),this.countersLeft--,0===this.countersLeft&&(this.appear(),this.ready())},appear:function(){this.container.addClass(k+"_visible")},ready:function(a){this.timeout&&clearTimeout(this.timeout),this.container.addClass(k+"_ready"),a||this.container.trigger("ready."+k,this.number)},getCounterElem:function(){var b=this.widget.find("."+l+"counter_single");return b.length||(b=a("<span>",{"class":h("counter","single")}),this.widget.append(b)),b}},d.prototype={init:function(){this.detectParams(),this.initHtml(),setTimeout(a.proxy(this.initCounter,this),0)},update:function(b){a.extend(this.options,{forceUpdate:!1},b),this.widget.find("."+k+"__counter").remove(),this.initCounter()},detectService:function(){var b=this.widget.data("service");if(!b){for(var c=this.widget[0],d=c.classList||c.className.split(" "),e=0;e<d.length;e++){var f=d[e];if(p[f]){b=f;break}}if(!b)return}this.service=b,a.extend(this.options,p[b])},detectParams:function(){var a=this.widget.data();if(a.counter){var b=parseInt(a.counter,10);isNaN(b)?this.options.counterUrl=a.counter:this.options.counterNumber=b}a.title&&(this.options.title=a.title),a.url&&(this.options.url=a.url)},initHtml:function(){var b=this.options,c=this.widget,d=c.find("a");d.length&&this.cloneDataAttrs(d,c);var e=a("<span>",{"class":this.getElementClassNames("button"),text:c.text()});if(b.clickUrl){var g=f(b.clickUrl,{url:b.url,title:b.title}),h=a("<a>",{href:g});this.cloneDataAttrs(c,h),c.replaceWith(h),this.widget=c=h}else c.on("click",a.proxy(this.click,this));c.removeClass(this.service),c.addClass(this.getElementClassNames("widget")),e.prepend(a("<span>",{"class":this.getElementClassNames("icon")})),c.empty().append(e),this.button=e},initCounter:function(){if(this.options.counters)if(this.options.counterNumber)this.updateCounter(this.options.counterNumber);else{var b={counterUrl:this.options.counterUrl,forceUpdate:this.options.forceUpdate};q.fetch(this.service,this.options.url,b).always(a.proxy(this.updateCounter,this))}},cloneDataAttrs:function(a,b){var c=a.data();for(var d in c)c.hasOwnProperty(d)&&b.data(d,c[d])},getElementClassNames:function(a){return h(a,this.service)},updateCounter:function(b){b=parseInt(b,10)||0;var c={"class":this.getElementClassNames("counter"),text:b};b||this.options.zeroes||(c["class"]+=" "+k+"__counter_empty",c.text="");var d=a("<span>",c);this.widget.append(d),this.widget.trigger("counter."+k,[this.service,b])},click:function(b){var c=this.options,d=!0;if(a.isFunction(c.click)&&(d=c.click.call(this,b)),d){var e=f(c.popupUrl,{url:c.url,title:c.title});e=this.addAdditionalParamsToUrl(e),this.openPopup(e,{width:c.popupWidth,height:c.popupHeight})}return!1},addAdditionalParamsToUrl:function(b){var c=a.param(a.extend(this.widget.data(),this.options.data));if(a.isEmptyObject(c))return b;var d=-1===b.indexOf("?")?"?":"&";return b+d+c},openPopup:function(b,c){var d=Math.round(screen.width/2-c.width/2),e=0;screen.height>c.height&&(e=Math.round(screen.height/3-c.height/2));var f=window.open(b,"sl_"+this.service,"left="+d+",top="+e+",width="+c.width+",height="+c.height+",personalbar=0,toolbar=0,scrollbars=1,resizable=1");if(f){f.focus(),this.widget.trigger("popup_opened."+k,[this.service,f]);var g=setInterval(a.proxy(function(){f.closed&&(clearInterval(g),this.widget.trigger("popup_closed."+k,this.service))},this),this.options.popupCheckInterval)}else location.href=b}},a(function(){a("."+k).socialLikes()})});
/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-csstransforms-csstransforms3d-csstransitions-shiv-cssclasses-teststyles-testprop-testallprops-prefixes-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function z(a){j.cssText=a}function A(a,b){return z(m.join(a+";")+(b||""))}function B(a,b){return typeof a===b}function C(a,b){return!!~(""+a).indexOf(b)}function D(a,b){for(var d in a){var e=a[d];if(!C(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function E(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:B(f,"function")?f.bind(d||b):f}return!1}function F(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+o.join(d+" ")+d).split(" ");return B(b,"string")||B(b,"undefined")?D(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),E(e,b,c))}var d="2.8.3",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={},r={},s={},t=[],u=t.slice,v,w=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},x={}.hasOwnProperty,y;!B(x,"undefined")&&!B(x.call,"undefined")?y=function(a,b){return x.call(a,b)}:y=function(a,b){return b in a&&B(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=u.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(u.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(u.call(arguments)))};return e}),q.csstransforms=function(){return!!F("transform")},q.csstransforms3d=function(){var a=!!F("perspective");return a&&"webkitPerspective"in g.style&&w("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},q.csstransitions=function(){return F("transition")};for(var G in q)y(q,G)&&(v=G.toLowerCase(),e[v]=q[G](),t.push((e[v]?"":"no-")+v));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)y(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},z(""),i=k=null,function(a,b){function l(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function m(){var a=s.elements;return typeof a=="string"?a.split(" "):a}function n(a){var b=j[a[h]];return b||(b={},i++,a[h]=i,j[i]=b),b}function o(a,c,d){c||(c=b);if(k)return c.createElement(a);d||(d=n(c));var g;return d.cache[a]?g=d.cache[a].cloneNode():f.test(a)?g=(d.cache[a]=d.createElem(a)).cloneNode():g=d.createElem(a),g.canHaveChildren&&!e.test(a)&&!g.tagUrn?d.frag.appendChild(g):g}function p(a,c){a||(a=b);if(k)return a.createDocumentFragment();c=c||n(a);var d=c.frag.cloneNode(),e=0,f=m(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function q(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return s.shivMethods?o(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/[\w\-]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(s,b.frag)}function r(a){a||(a=b);var c=n(a);return s.shivCSS&&!g&&!c.hasCSS&&(c.hasCSS=!!l(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),k||q(a,c),a}var c="3.7.0",d=a.html5||{},e=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,f=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g,h="_html5shiv",i=0,j={},k;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",g="hidden"in a,k=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){g=!0,k=!0}})();var s={elements:d.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:c,shivCSS:d.shivCSS!==!1,supportsUnknownElements:k,shivMethods:d.shivMethods!==!1,type:"default",shivDocument:r,createElement:o,createDocumentFragment:p};a.html5=s,r(b)}(this,b),e._version=d,e._prefixes=m,e._domPrefixes=p,e._cssomPrefixes=o,e.testProp=function(a){return D([a])},e.testAllProps=F,e.testStyles=w,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+t.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 3.1.9
 *
 * Requires: jQuery 1.2.2+
 */

(function (factory) {
    if ( typeof define === 'function' && define.amd ) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
        toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
                    ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
        slice  = Array.prototype.slice,
        nullLowestDeltaTimeout, lowestDelta;

    if ( $.event.fixHooks ) {
        for ( var i = toFix.length; i; ) {
            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
        }
    }

    var special = $.event.special.mousewheel = {
        version: '3.1.9',

        setup: function() {
            if ( this.addEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.addEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
            // Store the line height and page height for this particular element
            $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
            $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
        },

        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.removeEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
        },

        getLineHeight: function(elem) {
            return parseInt($(elem)['offsetParent' in $.fn ? 'offsetParent' : 'parent']().css('fontSize'), 10);
        },

        getPageHeight: function(elem) {
            return $(elem).height();
        },

        settings: {
            adjustOldDeltas: true
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
        },

        unmousewheel: function(fn) {
            return this.unbind('mousewheel', fn);
        }
    });


    function handler(event) {
        var orgEvent   = event || window.event,
            args       = slice.call(arguments, 1),
            delta      = 0,
            deltaX     = 0,
            deltaY     = 0,
            absDelta   = 0;
        event = $.event.fix(orgEvent);
        event.type = 'mousewheel';

        // Old school scrollwheel delta
        if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1;      }
        if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;       }
        if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;      }
        if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }

        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
        if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
            deltaX = deltaY * -1;
            deltaY = 0;
        }

        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
        delta = deltaY === 0 ? deltaX : deltaY;

        // New school wheel delta (wheel event)
        if ( 'deltaY' in orgEvent ) {
            deltaY = orgEvent.deltaY * -1;
            delta  = deltaY;
        }
        if ( 'deltaX' in orgEvent ) {
            deltaX = orgEvent.deltaX;
            if ( deltaY === 0 ) { delta  = deltaX * -1; }
        }

        // No change actually happened, no reason to go any further
        if ( deltaY === 0 && deltaX === 0 ) { return; }

        // Need to convert lines and pages to pixels if we aren't already in pixels
        // There are three delta modes:
        //   * deltaMode 0 is by pixels, nothing to do
        //   * deltaMode 1 is by lines
        //   * deltaMode 2 is by pages
        if ( orgEvent.deltaMode === 1 ) {
            var lineHeight = $.data(this, 'mousewheel-line-height');
            delta  *= lineHeight;
            deltaY *= lineHeight;
            deltaX *= lineHeight;
        } else if ( orgEvent.deltaMode === 2 ) {
            var pageHeight = $.data(this, 'mousewheel-page-height');
            delta  *= pageHeight;
            deltaY *= pageHeight;
            deltaX *= pageHeight;
        }

        // Store lowest absolute delta to normalize the delta values
        absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );

        if ( !lowestDelta || absDelta < lowestDelta ) {
            lowestDelta = absDelta;

            // Adjust older deltas if necessary
            if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
                lowestDelta /= 40;
            }
        }

        // Adjust older deltas if necessary
        if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
            // Divide all the things by 40!
            delta  /= 40;
            deltaX /= 40;
            deltaY /= 40;
        }

        // Get a whole, normalized value for the deltas
        delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
        deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
        deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

        // Add information to the event object
        event.deltaX = deltaX;
        event.deltaY = deltaY;
        event.deltaFactor = lowestDelta;
        // Go ahead and set deltaMode to 0 since we converted to pixels
        // Although this is a little odd since we overwrite the deltaX/Y
        // properties with normalized deltas.
        event.deltaMode = 0;

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        // Clearout lowestDelta after sometime to better
        // handle multiple device types that give different
        // a different lowestDelta
        // Ex: trackpad = 3 and mouse wheel = 120
        if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

    function nullLowestDelta() {
        lowestDelta = null;
    }

    function shouldAdjustOldDeltas(orgEvent, absDelta) {
        // If this is an older event and the delta is divisable by 120,
        // then we are assuming that the browser is treating this as an
        // older mouse wheel event and that we should divide the deltas
        // by 40 to try and get a more usable deltaFactor.
        // Side note, this actually impacts the reported scroll distance
        // in older browsers and can cause scrolling to be slower than native.
        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
    }

}));


/*!
 * Peppermint touch slider
 * v. 1.4.0 | https://github.com/wilddeer/Peppermint
 * Copyright Oleg Korsunsky | http://wd.dizaina.net/
 *
 * Depends on Event Burrito (included) | https://github.com/wilddeer/Event-Burrito
 * MIT License
 */
function Peppermint(a,b){function c(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])}function d(a){var b=["Webkit","Moz","O","ms"],c=document.createElement("div");if(void 0!==c.style[a])return!0;a=a.charAt(0).toUpperCase()+a.slice(1);for(var d in b)if(void 0!==c.style[b[d]+a])return!0;return!1}function e(a,b){new RegExp("(\\s|^)"+b+"(\\s|$)").test(a.className)||(a.className+=" "+b)}function f(a,b){a.className=a.className.replace(new RegExp("(\\s+|^)"+b+"(\\s+|$)","g")," ").replace(/^\s+|\s+$/g,"")}function g(a,b){0>a?a=0:a>v-1&&(a=v-1);for(var c=C.dots.length-1;c>=0;c--)f(C.dots[c],G.activeDot);return e(C.dots[a],G.activeDot),E=a,h(-a*C.width,void 0===b?F.speed:b),o(),F.onSlideChange&&F.onSlideChange(a),a}function h(a,b){var c=b?b+"ms":"";y.style.webkitTransitionDuration=y.style.MozTransitionDuration=y.style.msTransitionDuration=y.style.OTransitionDuration=y.style.transitionDuration=c,j(a)}function i(a,b){if(B&&clearInterval(B),!b)return void j(a);var c=+new Date,d=C.left;B=setInterval(function(){function e(a,b){return(b-a)*i+a}var f,g,h=+new Date-c,i=h/b,k=[0,.7,1,1];return i>=1?(j(a),void clearInterval(B)):(f=a-d,g=e(e(e(k[0],k[1]),e(k[1],k[2])),e(e(k[1],k[2]),e(k[2],k[3]))),void j(Math.floor(g*f+d)))},15)}function j(a){y.style.webkitTransform="translate("+a+"px,0) translateZ(0)",y.style.msTransform=y.style.MozTransform=y.style.OTransform=y.style.transform="translateX("+a+"px)",C.left=a}function k(a){y.style.left=a+"px",C.left=a}function l(){var a=E+1;return a>v-1&&(a=0),g(a)}function m(){var a=E-1;return 0>a&&(a=v-1),g(a)}function n(){A=!0,o()}function o(){A&&(z&&clearTimeout(z),z=setTimeout(function(){l()},F.slideshowInterval))}function p(){z&&clearTimeout(z)}function q(){A=!1,z&&clearTimeout(z)}function r(){C.width=a.offsetWidth,y.style.width=C.width*v+"px";for(var b=0;v>b;b++)C.slides[b].style.width=C.width+"px";h(-E*C.width)}function s(a,b,c,d){b&&(a.addEventListener?a.addEventListener(b,c,!!d):a.attachEvent("on"+b,c))}function t(){EventBurrito(y,{mouse:F.mouseDrag,start:function(){e(a,G.drag)},move:function(a,b,c){p(),c.x=c.x/(!E&&c.x>0||E==v-1&&c.x<0?Math.abs(c.x)/C.width*2+1:1),h(c.x-C.width*E)},end:function(b,c,d){if(d.x){var e=Math.abs(d.x)/C.width,h=Math.floor(e)+(e-Math.floor(e)>.25?1:0),i=d.time<D+D*h/1.8&&Math.abs(d.x)-h*C.width>(h?-C.width/9:20);h+=i?1:0,d.x<0?g(E+h,F.touchSpeed):g(E-h,F.touchSpeed),F.stopSlideshowAfterInteraction&&q()}f(a,G.drag)}})}function u(){var b=F.slidesContainer||a,c=F.dotsContainer||a;if(!(F.disableIfOneSlide&&b.children.length<=1)){(!H.transforms||window.opera)&&(j=k),(!H.transitions||window.opera)&&(h=i),y=F.slidesContainer||document.createElement("div"),e(y,G.slides);for(var d=0,l=b.children.length;l>d;d++){var m=b.children[d],o=document.createElement("li");C.slides.push(m),o.setAttribute("tabindex","0"),o.setAttribute("role","button"),o.innerHTML="<span></span>",function(b,c){s(c,"click",function(){g(b),F.stopSlideshowAfterInteraction&&q()}),s(c,"keyup",function(a){13==a.keyCode&&(g(b),F.stopSlideshowAfterInteraction&&q())}),s(c,"mouseup",function(){e(c,G.mouseClicked)}),s(c,"blur",function(){f(c,G.mouseClicked)},!0),s(m,"focus",m.onfocusin=function(){a.scrollLeft=0,setTimeout(function(){a.scrollLeft=0},0),g(b)},!0)}(d,o),C.dots.push(o)}v=C.slides.length,w=100/v,e(a,G.active),f(a,G.inactive),F.mouseDrag&&e(a,G.mouse),C.width=a.offsetWidth,y.style.width=C.width*v+"px";for(var d=0;v>d;d++)C.slides[d].style.width=C.width+"px",y.appendChild(C.slides[d]);if(F.slidesContainer||a.appendChild(y),F.dots&&v>1){x=document.createElement("ul"),e(x,G.dots);for(var d=0,l=C.dots.length;l>d;d++)x.appendChild(C.dots[d]);F.dotsPrepend?c.insertBefore(x,c.firstChild):c.appendChild(x)}s(window,"resize",r),s(window,"orientationchange",r),setTimeout(function(){g(F.startSlide,0)},0),F.slideshow&&n(),t(),setTimeout(function(){F.onSetup&&F.onSetup(v)},0)}}var v,w,x,y,z,A,B,C={slides:[],dots:[],left:0},D=200,E=0,F={speed:300,touchSpeed:300,slideshow:!1,slideshowInterval:4e3,stopSlideshowAfterInteraction:!1,startSlide:0,mouseDrag:!0,disableIfOneSlide:!0,cssPrefix:"peppermint-",dots:!1,dotsPrepend:!1,dotsContainer:void 0,slidesContainer:void 0,onSlideChange:void 0,onSetup:void 0};b&&c(F,b);var G={inactive:F.cssPrefix+"inactive",active:F.cssPrefix+"active",mouse:F.cssPrefix+"mouse",drag:F.cssPrefix+"drag",slides:F.cssPrefix+"slides",dots:F.cssPrefix+"dots",activeDot:F.cssPrefix+"active-dot",mouseClicked:F.cssPrefix+"mouse-clicked"},H={transforms:d("transform"),transitions:d("transition")};return u(),{slideTo:function(a,b){return g(parseInt(a,10),b)},next:l,prev:m,start:n,stop:q,pause:p,getCurrentPos:function(){return E},getSlidesNumber:function(){return v},recalcWidth:r}}window.jQuery&&!function($){$.fn.Peppermint=function(a){return this.each(function(){$(this).data("Peppermint",Peppermint(this,a))}),this}}(window.jQuery);
function EventBurrito(a,b){function c(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])}function d(a,b,c,d){return b?(a.addEventListener?a.addEventListener(b,c,!!d):a.attachEvent("on"+b,c),{remove:function(){e(a,b,c,d)}}):void 0}function e(a,b,c,d){b&&(a.removeEventListener?a.removeEventListener(b,c,!!d):a.detachEvent("on"+b,c))}function f(a){a.preventDefault?a.preventDefault():a.returnValue=!1}function g(a){if(r={x:(o?a.clientX:a.touches[0].clientX)-q.x,y:(o?a.clientY:a.touches[0].clientY)-q.y,time:Number(new Date)-q.time},r.time-t[t.length-1].time){for(var b=0;b<t.length-1&&r.time-t[b].time>80;b++);s={x:(r.x-t[b].x)/(r.time-t[b].time),y:(r.y-t[b].y)/(r.time-t[b].time)},t.length>=5&&t.shift(),t.push({x:r.x,y:r.y,time:r.time})}}function h(a,b){v=!0,o=b,y[o](a)||(d(document,x[o][1],i),d(document,x[o][2],j),d(document,x[o][3],j),m.preventDefault&&o&&f(a),q={x:o?a.clientX:a.touches[0].clientX,y:o?a.clientY:a.touches[0].clientY,time:Number(new Date)},n=void 0,r={x:0,y:0,time:0},s={x:0,y:0},t=[{x:0,y:0,time:0}],m.start(a,q))}function i(a){!m.preventScroll&&n||y[o](a)||(g(a),(Math.abs(r.x)>m.clickTolerance||Math.abs(r.y)>m.clickTolerance)&&(v=!1),void 0===n&&3!==o&&(n=Math.abs(r.x)<Math.abs(r.y)&&!m.preventScroll)||(m.preventDefault&&f(a),m.move(a,q,r,s)))}function j(a){o&&g(a),!v&&a.target&&a.target.blur&&a.target.blur(),e(document,x[o][1],i),e(document,x[o][2],j),e(document,x[o][3],j),m.end(a,q,r,s)}function k(){u.push(d(a,x[w][0],function(a){h(a,w)})),u.push(d(a,"dragstart",f)),m.mouse&&!w&&u.push(d(a,x[3][0],function(a){h(a,3)})),u.push(d(a,"click",function(a){v?m.click(a):f(a)}))}var l=function(){},m={preventDefault:!0,clickTolerance:0,preventScroll:!1,mouse:!0,start:l,move:l,end:l,click:l};b&&c(m,b);var n,o,p={pointerEvents:!!window.navigator.pointerEnabled,msPointerEvents:!!window.navigator.msPointerEnabled},q={},r={},s={},t=[],u=[],v=!0,w=p.pointerEvents?1:p.msPointerEvents?2:0,x=[["touchstart","touchmove","touchend","touchcancel"],["pointerdown","pointermove","pointerup","pointercancel"],["MSPointerDown","MSPointerMove","MSPointerUp","MSPointerCancel"],["mousedown","mousemove","mouseup",!1]],y=[function(a){return a.touches&&a.touches.length>1||a.scale&&1!==a.scale},function(a){return!a.isPrimary||a.buttons&&1!==a.buttons||!m.mouse&&"touch"!==a.pointerType&&"pen"!==a.pointerType},function(a){return!a.isPrimary||a.buttons&&1!==a.buttons||!m.mouse&&a.pointerType!==a.MSPOINTER_TYPE_TOUCH&&a.pointerType!==a.MSPOINTER_TYPE_PEN},function(a){return a.buttons&&1!==a.buttons}];return k(),{getClicksAllowed:function(){return v},kill:function(){for(var a=u.length-1;a>=0;a--)u[a].remove()}}}



/* scroller.js */

// jTweener
var jTweener=function(){var Q=false;var D=60;var b=navigator.userAgent.toLowerCase();var a=/msie/.test(b)&&!/opera/.test(b);var B={};var W={};var X={time:1,transition:"easeoutexpo",namespace:"default",delay:0,prefix:{},suffix:{},onStart:undefined,onStartParams:undefined,onUpdate:undefined,onUpdateParams:undefined,onComplete:undefined,onCompleteParams:undefined};var J=["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","color","outlineColor","borderColor"];var R=/^\s*([+\-])=\s*(\-?\d+)/;var V=false;var Z={};function U(){for(var c in jTweener.easingFunctions){Z[c.toLowerCase()]=jTweener.easingFunctions[c];}V=true;}function H(c,d){if(typeof c=="function"){if(d){c.apply(window,d);}else{c();}}}function G(f,c){if(f.style[c]){return f.style[c];}else{if(a){var e=f.currentStyle;if(c=="opacity"){f.style.zoom=1;return e.filter&&e.filter.indexOf("opacity=")>=0?parseFloat(e.filter.match(/opacity=([^)]*)/)[1])/100:1;}else{return f.currentStyle[c];}}else{if(document.defaultView&&document.defaultView.getComputedStyle){c=c.replace(/([A-Z])/g,"-$1").toLowerCase();var d=document.defaultView.getComputedStyle(f,"");return d&&d.getPropertyValue(c);}else{return null;}}}}function T(c){return(!(c instanceof Array)&&!c.jquery)?[c]:c;}function S(c){return c.nodeType?true:false;}function C(d){for(var c=0;c<J.length;c++){if(J[c]==d){return true;}}return false;}function A(c){return(typeof c=="function");}function E(d,c){var e=0;if(S(d)){e=G(d,c);}else{if(A(d[c])){e=d[c]();}else{e=d[c];}}return e;}function O(d,c){return parseFloat(E(d,c))||0;}function Y(d,e){if(W[d]&&W[d][e]){var f=W[d][e];for(var c=0;c<f.length;c++){H(f[c].func,f[c].params);}}}function M(i,d,h){var c=(i.suffix[d])?h+i.suffix[d]:h;if(A(i.target[d])){i.target[d].call(i.rawTarget,c);}else{if(i.targetPropeties[d].func){i.targetPropeties[d].func.call(i.rawTarget,h);}else{if(C(d)){var g=i.targetPropeties[d];i.target[d]=jTweener.Utils.Color.blend(g.start_color,g.end_color,h)+"";}else{try{if(a&&d=="opacity"&&S(i.rawTarget)){i.target.filter=(i.target.filter||"").replace(/alpha\([^)]*\)/,"")+(parseFloat(h).toString()=="NaN"?"":"alpha(opacity="+h*100+")");}else{i.target[d]=c;}}catch(f){}}}}}function F(){var c=(new Date()-0);var j=0;for(var l in B){var g=B[l];j++;for(var h=0;h<g.length;h++){var f=g[h];var n=c-f.startTime;var k=f.endTime-f.startTime;if(n>=k){for(var m in f.targetPropeties){var e=f.targetPropeties[m];M(f,m,e.b+e.c);}g.splice(h,1);H(f.onUpdate,f.onUpdateParams);H(f.onComplete,f.onCompleteParams);}else{for(var m in f.targetPropeties){var e=f.targetPropeties[m];M(f,m,f.easing(n,e.b,e.c,k));}H(f.onUpdate,f.onUpdateParams);}}Y(l,"onUpdate");if(!g.length){g=null;delete B[l];j--;Y(l,"onComplete");}}if(j>0){setTimeout(F,1000/D);}else{Q=false;}}function I(f,d){var c=0;if(f&&S(f)){f=f.style;}function e(h){for(var j=h.length-1;j>=0;j--){if(h[j].target==f){h.splice(j,1);c++;}}}if(!f&&d){B[d]=[];}else{if(d&&B[d]){e(B[d]);}else{for(var g in B){e(B[g]);}}}return c;}function K(d){var c={};for(var e in X){c[e]=d[e]||X[e];delete d[e];}if(A(c.transition)){c.easing=c.transition;}else{c.easing=Z[c.transition.toLowerCase()];}delete d.easing;return c;}function L(e){var c={};for(var d in e){if(e.hasOwnProperty(d)){c[d]=e[d];}}return c;}function N(h,k){k=L(k);var d=S(h);var e=K(k);e.rawTarget=h;e.target=(d)?h.style:h;e.targetPropeties={};var g;for(var j in k){if(!e.prefix[j]){e.prefix[j]="";}if(!e.suffix[j]){e.suffix[j]=(d&&j!="opacity")?"px":"";}var i=k[j];if(i===null){continue;}if(d){j=j.replace(/\-(\w)/g,function(m,l){return l.toUpperCase();});}if(C(j)){e.targetPropeties[j]={b:0,c:1,start_color:jTweener.Utils.getRGB(E(h,j)),end_color:jTweener.Utils.getRGB(i)};}else{if(A(i)){e.targetPropeties[j]={func:i,b:0,c:1};}else{var f=O(h,j);var c=i;if((g=R.exec(c))){c=f+(g[1]=="-"?-1:1)*parseFloat(g[2]);}else{c=parseFloat(c);}e.targetPropeties[j]={b:f,c:c-f};}}}return e;}function P(e,d){if(!V){U();}var c=d.delay||X.delay;setTimeout(function(){var f=N(e,d);f.startTime=(new Date()-0);f.endTime=f.time*1000+f.startTime;H(f.onStart,f.onStartParams);if(!B[f.namespace]){B[f.namespace]=[];}B[f.namespace].push(f);if(!Q){Q=true;F();}},c*1000);}return{addTween:function(e,c){e=T(e);for(var d=0;d<e.length;d++){P(e[d],c);}},addPercent:function(c){var d={};if(arguments.length==2){d=arguments[0];c=arguments[1];}P(d,c);return d;},addNSAction:function(f,e){e=e||X.namespace;if(!W[e]){W[e]={};}var c=W[e];for(var d in f){if(d.indexOf("Params")==-1){if(!c[d]){c[d]=[];}c[d].push({func:f[d],params:f[d+"Params"]});}}},removeNSActions:function(){switch(arguments.length){case 0:W={};break;default:var e=arguments[0];var f=[].splice.call(arguments,1);if(W[e]){if(f&&f.length){var c=W[e];for(var d=0;d<f.length;d++){delete c[f[d]];}}else{delete W[e];}}}},removeTween:function(){switch(arguments.length){case 0:B={};break;default:var e,c;if(arguments.length==1){if(typeof arguments[0]=="string"){e=arguments[0];}else{c=arguments[0];}}else{e=arguments[0];c=arguments[1];}if(c&&(c instanceof Array||c.jquery)){for(var d=0;
d<c.length;d++){I(c[d],e);}}else{I(c,e);}}}};}();jTweener.Utils={bezier2:function(A,D,C,B){return(1-A)*(1-A)*D+2*A*(1-A)*C+A*A*B;},bezier3:function(A,E,D,C,B){return Math.pow(1-A,3)*E+3*A*Math.pow(1-A,2)*D+3*A*A*(1-A)*C+A*A*A*B;},mergeObjects:function(){var A={};for(var C=0;C<arguments.length;C++){var D=arguments[C];if(!D){continue;}for(var B in D){A[B]=D[B];}}return A;},getRGB:function(B){var A;if(B&&B.constructor==jTweener.Utils.Color){return B;}if(A=/rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/.exec(B)){return new jTweener.Utils.Color(parseInt(A[1],10),parseInt(A[2],10),parseInt(A[3],10));}if(A=/rgb\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*\)/.exec(B)){return new jTweener.Utils.Color(parseFloat(A[1],10)*2.55,parseFloat(A[2],10)*2.55,parseFloat(A[3],10)*2.55);}if(A=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(B)){return new jTweener.Utils.Color(parseInt(A[1],16),parseInt(A[2],16),parseInt(A[3],16));}if(A=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(B)){return new jTweener.Utils.Color(parseInt(A[1]+A[1],16),parseInt(A[2]+A[2],16),parseInt(A[3]+A[3],16));}return new jTweener.Utils.Color(0,0,0);}};jTweener.Utils.Color=function(C,B,A){this.r=Math.max(Math.min(Math.round(C),255),0);this.g=Math.max(Math.min(Math.round(B),255),0);this.b=Math.max(Math.min(Math.round(A),255),0);};jTweener.Utils.Color.blend=function(B,A,C){C=C||0;return new jTweener.Utils.Color(B.r+(A.r-B.r)*C,B.g+(A.g-B.g)*C,B.b+(A.b-B.b)*C);};jTweener.Utils.Color.prototype={r:0,g:0,b:0,toString:function(){return"rgb("+this.r+","+this.g+","+this.b+")";}};jTweener.easingFunctions={easeNone:function(B,A,D,C){return D*B/C+A;},easeInQuad:function(B,A,D,C){return D*(B/=C)*B+A;},easeOutQuad:function(B,A,D,C){return -D*(B/=C)*(B-2)+A;},easeInOutQuad:function(B,A,D,C){if((B/=C/2)<1){return D/2*B*B+A;}return -D/2*((--B)*(B-2)-1)+A;},easeInCubic:function(B,A,D,C){return D*(B/=C)*B*B+A;},easeOutCubic:function(B,A,D,C){return D*((B=B/C-1)*B*B+1)+A;},easeInOutCubic:function(B,A,D,C){if((B/=C/2)<1){return D/2*B*B*B+A;}return D/2*((B-=2)*B*B+2)+A;},easeInExpo:function(B,A,D,C){return(B==0)?A:D*Math.pow(2,10*(B/C-1))+A-D*0.001;},easeOutExpo:function(B,A,D,C){return(B==C)?A+D:D*1.001*(-Math.pow(2,-10*B/C)+1)+A;},easeInOutExpo:function(B,A,D,C){if(B==0){return A;}if(B==C){return A+D;}if((B/=C/2)<1){return D/2*Math.pow(2,10*(B-1))+A-D*0.0005;}return D/2*1.0005*(-Math.pow(2,-10*--B)+2)+A;},easeInElastic:function(C,A,G,F,B,E){var D;if(C==0){return A;}if((C/=F)==1){return A+G;}if(!E){E=F*0.3;}if(!B||B<Math.abs(G)){B=G;D=E/4;}else{D=E/(2*Math.PI)*Math.asin(G/B);}return -(B*Math.pow(2,10*(C-=1))*Math.sin((C*F-D)*(2*Math.PI)/E))+A;},easeOutElastic:function(C,A,G,F,B,E){var D;if(C==0){return A;}if((C/=F)==1){return A+G;}if(!E){E=F*0.3;}if(!B||B<Math.abs(G)){B=G;D=E/4;}else{D=E/(2*Math.PI)*Math.asin(G/B);}return(B*Math.pow(2,-10*C)*Math.sin((C*F-D)*(2*Math.PI)/E)+G+A);},easeInOutElastic:function(C,A,G,F,B,E){var D;if(C==0){return A;}if((C/=F/2)==2){return A+G;}if(!E){E=F*(0.3*1.5);}if(!B||B<Math.abs(G)){B=G;D=E/4;}else{D=E/(2*Math.PI)*Math.asin(G/B);}if(C<1){return -0.5*(B*Math.pow(2,10*(C-=1))*Math.sin((C*F-D)*(2*Math.PI)/E))+A;}return B*Math.pow(2,-10*(C-=1))*Math.sin((C*F-D)*(2*Math.PI)/E)*0.5+G+A;},easeInBack:function(B,A,E,D,C){if(C==undefined){C=1.70158;}return E*(B/=D)*B*((C+1)*B-C)+A;},easeOutBack:function(B,A,E,D,C){if(C==undefined){C=1.70158;}return E*((B=B/D-1)*B*((C+1)*B+C)+1)+A;},easeInOutBack:function(B,A,E,D,C){if(C==undefined){C=1.70158;}if((B/=D/2)<1){return E/2*(B*B*(((C*=(1.525))+1)*B-C))+A;}return E/2*((B-=2)*B*(((C*=(1.525))+1)*B+C)+2)+A;},easeInBounce:function(B,A,D,C){return D-jTweener.easingFunctions.easeOutBounce(C-B,0,D,C)+A;},easeOutBounce:function(B,A,D,C){if((B/=C)<(1/2.75)){return D*(7.5625*B*B)+A;}else{if(B<(2/2.75)){return D*(7.5625*(B-=(1.5/2.75))*B+0.75)+A;}else{if(B<(2.5/2.75)){return D*(7.5625*(B-=(2.25/2.75))*B+0.9375)+A;}else{return D*(7.5625*(B-=(2.625/2.75))*B+0.984375)+A;}}}},easeInOutBounce:function(B,A,D,C){if(B<C/2){return jTweener.easingFunctions.easeInBounce(B*2,0,D,C)*0.5+A;}else{return jTweener.easingFunctions.easeOutBounce(B*2-C,0,D,C)*0.5+D*0.5+A;}}};jTweener.easingFunctions.linear=jTweener.easingFunctions.easeNone;(function(C){if(window.$t||!C){return ;}function B(G){return(typeof G=="function");}function F(){return C.Utils.mergeObjects.apply(this,arguments);}var A="__jto";var E=function(H,G){return new D(H,Array.prototype.slice.call(arguments,1));};function D(H,G){this.obj=H;this.options={};if(G instanceof Array){this.addOptions.apply(this,G);}else{this.addOptions(G);}}D.prototype={tween:function(){var G;if(arguments.length){G=Array.prototype.slice.call(arguments,0);G.unshift(this.options);G=F.apply(this,G);}else{G=this.options;}C.addTween(this.obj,G);return this;},percent:function(){var G=[];for(var H=0;H<arguments.length;H++){if(B(arguments[H])){var I={};I[A+H]=arguments[H];G.push(I);}else{G.push(arguments[H]);}}C.addPercent(this.obj,F.apply(this,G));return this;},stop:function(){C.removeTween(this.obj);
return this;},addOptions:function(){var G=Array.prototype.slice.call(arguments,0);G.unshift(this.options);this.options=F.apply(this,G);return this;},clearOptions:function(){this.options={};return this;},removeOptions:function(){for(var G=0;G<arguments.length;G++){delete this.options[String(arguments[G])];}return this;}};window.$t=E;})(jTweener);

// mousewheel
(function(c){"function"===typeof define&&define.amd?define(["jquery"],c):"object"===typeof exports?module.exports=c:c(jQuery)})(function(c){function m(b){var a=b||window.event,g=[].slice.call(arguments,1),d=0,e=0,h=0,f=0,f=0;b=c.event.fix(a);b.type="mousewheel";a.wheelDelta&&(d=a.wheelDelta);a.detail&&(d=-1*a.detail);a.deltaY&&(d=h=-1*a.deltaY);a.deltaX&&(e=a.deltaX,d=-1*e);void 0!==a.wheelDeltaY&&(h=a.wheelDeltaY);void 0!==a.wheelDeltaX&&(e=-1*a.wheelDeltaX);f=Math.abs(d);if(!l||f<l)l=f;f=Math.max(Math.abs(h),
Math.abs(e));if(!k||f<k)k=f;a=0<d?"floor":"ceil";d=Math[a](d/l);e=Math[a](e/k);h=Math[a](h/k);g.unshift(b,d,e,h);return(c.event.dispatch||c.event.handle).apply(this,g)}var n=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],g="onwheel"in document||9<=document.documentMode?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],l,k;if(c.event.fixHooks)for(var p=n.length;p;)c.event.fixHooks[n[--p]]=c.event.mouseHooks;c.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var b=
g.length;b;)this.addEventListener(g[--b],m,!1);else this.onmousewheel=m},teardown:function(){if(this.removeEventListener)for(var b=g.length;b;)this.removeEventListener(g[--b],m,!1);else this.onmousewheel=null}};c.fn.extend({mousewheel:function(b){return b?this.bind("mousewheel",b):this.trigger("mousewheel")},unmousewheel:function(b){return this.unbind("mousewheel",b)}})});

// scroller
(function(c){c.fn.scroller=function(S){var l=c.extend({noscrollbar:!1,noanchors:!1,leftIfWide:!1,borderLines:!0,onclick:null},S);return this.each(function(){function S(n){function oa(){var a="";A||(a="display:none");b.append('<div style="'+a+'" class=ab_scroller-leftLine></div><div class="ab_scroller-rightLine"></div>')}function T(a){A||b.find(".ab_scroller-leftLine").delay(a).fadeOut(200)}function U(a){A||b.find(".ab_scroller-leftLine").delay(a).fadeIn(200)}function V(a){A||b.find(".ab_scroller-rightLine").delay(a).fadeOut(200)}
function W(a){A||b.find(".ab_scroller-rightLine").delay(a).fadeIn(200)}function K(a,b){A||(a>=L-5?T(b):U(b),a<=g+5?V(b):W(b))}function J(){B=0;d.find(".ab_scrollerItem").each(function(){B+=c(this).outerWidth(!0)});d.width(B+1)}function ea(){var a=b.width();a>=B?(E=!0,b.addClass("ab_veryWide").find(".ab_scrollbar, .ab_anchors").hide(),a=(a-B)/2,"true"!==b.attr("data-leftIfWide")&&!0!==l.leftIfWide?d.css({left:"0","margin-left":a+"px"}):d.css({"margin-left":"0",right:"auto",left:"0"}),E&&(b.find(".ab_scroller-leftLine").hide(),
b.find(".ab_scroller-rightLine").hide())):(E=!1,b.removeClass("ab_veryWide"),d.css({"margin-left":"0"}),a="true"==b.attr("data-noscrollbar")||1==l.noscrollbar?!1:!0,a&&b.find(".ab_scrollbar").show(),a="true"==b.attr("data-noanchors")||1==l.noanchors?!1:!0,a&&b.find(".ab_scrollbar, .ab_anchors").show(),E||(0!=parseInt(d.css("left"))&&b.find(".ab_scroller-leftLine").show(),b.find(".ab_scroller-rightLine").show()))}function fa(){d.find(".ab_scrollerItem").each(function(){var a=c(this).outerHeight();
a>=F&&(F=a)});d.height(F).parent().height(F);b.height(F);0!=b.parents(".ab_scroller-root").size()&&b.unwrap()}function x(){c("html").removeClass("ab_noselect")}function da(a){return a.hasClass("ab_veryWide")?!0:!1}function ga(){b.find(".ab_scrollbar").width(b.find(".ab_wrapper").width()-parseInt(b.find(".ab_barWrap").css("margin-left"))-parseInt(b.find(".ab_barWrap").css("margin-right")));var a=b.find(".ab_scrollbar").width(),c=Math.ceil(a*b.find(".ab_wrapper").width()/d.width());p=Math.ceil(a-c);
k=b.find(".ab_scrollbar").width()/d.width();b.find(".ab_scrollSlider").width(c);C=c}function pa(){var a=b.find("[data-anchor]").size(),a=b.find(".ab_anchors").width()/a-3;b.find(".ab_anchs").width(a)}function qa(){var a=0;b.find(".ab_anchs").each(function(){var b=c(this).height()+3;b>a&&(a=b)});b.find(".ab_anchors").height(a)}function ha(){X=[];G=[];ia=[];"true"!==b.attr("data-noanchors")&&!0!==l.noanchors&&(b.find(".ab_anchors").detach(),b.append('<div class="ab_anchors"></div>'));d.find("[data-anchor]").each(function(){X.push(c(this).attr("data-anchor"));
var a=c(this).offset().left-d.offset().left;G.push(a);ia.push((a*k).toFixed(0));b.find(".ab_anchors").append('<a style="left:'+(a*k).toFixed(0)+'px;" class="ab_anchs ab_anchs-'+(X.length-1)+'" title="'+c(this).attr("data-anchor")+'"><span>'+c(this).attr("data-anchor")+"</span></a>")});G[0]=0;pa();qa()}function ja(){b.find(".ab_anchs").click(function(){console.log(M);if(M){jTweener.removeTween(H);var a=parseInt(c(this).attr("class").substr(c(this).attr("class").search("-")+1,10)),b=-1*G[a],a=G[a]*
k;b>g?(jTweener.addTween(d,{left:b+"px",time:1,transition:"easeoutexpo"}),jTweener.addTween(e,{left:a+"px",time:1,transition:"easeoutexpo"}),K(b,101)):(jTweener.addTween(d,{left:g,time:1,transition:"easeoutexpo"}),jTweener.addTween(e,{left:p,time:1,transition:"easeoutexpo"}),K(g,101))}})}function ka(){var a=navigator.userAgent.toLowerCase();return-1!=a.indexOf("msie")?parseInt(a.split("msie")[1]):!1}var Y=!1,Z=!1,aa=!1,E=!1,A="ontouchstart"in document.documentElement,b=n,d,N,f,q,v,O,D,y,r,ba=[],ca=
[],u=[],k,p,C,la,P,ma,I,na,M=!0,Q,R,z=[];n.addClass("ab_scroller").attr("data-state","inited");(function(){b.children().each(function(){c(this).addClass("ab_scrollerItem")})})();b.find(".ab_scrollerItem").wrapAll('<div class="ab_draggable"></div>');d=b.find(".ab_draggable");b.find(".ab_draggable").wrap('<div class="ab_wrapper"></div>');var B=0,F=0;J();!1!==l.borderLines&&"false"!==b.attr("data-borderLines")&&oa();fa();c(window).load(function(){fa()});var L=0,g=d.parent().width()-d.width()+1,X=[],
G=[],ia=[];b.append('<div class="ab_barWrap"><div class="ab_scrollbar"><siv class="ab_scrollSlider"></div></div></div>');"true"!=b.attr("data-noscrollbar")&&1!=l.noscrollbar||b.find(".ab_barWrap").hide();ga();ha();ea();0===b.find("[data-anchor]").size()&&b.attr("data-noanchors","true").addClass("scroller-noanchors").find(".ab_anchors").detach();var e=b.find(".ab_scrollSlider"),H=b.find("*");ja();var m="mousedown",t="mousemove",w="mouseup";"ontouchstart"in document?(isTouch=!0,m="touchstart",t="touchmove",
w="touchend"):window.navigator.msPointerEnabled&&10!==ka()&&8!==ka()&&(isTouch=!0,m="pointerdown",t="pointermove",w="pointerup");d.find("a").click(function(a){a.preventDefault()});d.on("contextmenu",function(a){aa=!0});d.on(m,function(a){E||a.metaKey||(z=[],c("html").addClass("ab_noselect"),window.getSelection?window.getSelection().removeAllRanges():document.selection.empty(),d.addClass("grabbing"),jTweener.removeTween(H),O=a.timeStamp,q=parseInt(d.css("left")),"pointerdown"==m?(v=a.originalEvent.pageX,
N=a.originalEvent.pageX-q,Q=a.originalEvent.pageY):"touchstart"!==m&&"pointerstart"!==m?(N=a.pageX-q,v=a.pageX,z=[0,0]):1==a.originalEvent.touches.length&&(N=a.originalEvent.touches[0].pageX-q,v=a.originalEvent.touches[0].pageX,Q=a.originalEvent.touches[0].pageY),Z=Y=!0)});c(document).on(t,function(a){q=parseInt(d.css("left"));D=a.timeStamp;"pointermove"==t?(f=a.originalEvent.pageX-q,y=a.originalEvent.pageX,R=a.originalEvent.pageY,z.push(Math.abs(y-v)-Math.abs(R-Q))):"touchmove"!==t?(f=a.pageX-q,
y=a.pageX):(f=a.originalEvent.touches[0].pageX-q,y=a.originalEvent.touches[0].pageX,R=a.originalEvent.touches[0].pageY,z.push(Math.abs(y-v)-Math.abs(R-Q)));Y&&-3<z[1]&&(r=y-N,"touchmove"!==t&&"pointermove"!==t&&K(r,0),a.preventDefault(),r>L?(d.css("left",Math.round(.2*r)+"px"),e.width(C+Math.round(r*-k*.2)).css("left","0")):r<g?(d.css("left",Math.round(.2*r+.8*g)+"px"),e.width(C+Math.ceil(.2*(r-q)*k)).css({left:"auto",right:"0"})):(d.css("left",r+"px"),e.css("left",-1*r*k+"px")));ba.push(a.timeStamp);
ca.push(f);u.push(y)});c(document).on(w,function(a){if("touchend"!=w&&"pointerup"!==w){d.removeClass("grabbing");if(a.metaKey&&0!=c(a.target).closest("a").size()){a.preventDefault();var b=c(a.target);a=b.closest("a").attr("href");window.open(a,"_blank");return!1}if(da(c(a.target).closest(".ab_scroller"))&&c(a.target).closest("a").length){var b=c(a.target).closest("a"),h=c(a.target);null!==l.onclick?(a.preventDefault(),l.onclick(h.closest(".ab_scrollerItem"))):(a=b.attr("href"),"_blank"!=b.attr("target")?
document.location=a:0==c("html .ab_scrollerHiddenLinkTargetBlank").size()&&(c("html").append('<a href="'+a+'" target="_blank" style="display:none;" class="ab_scrollerHiddenLinkTargetBlank">sdfsdf</a>'),window.open(a,"_blank"),setTimeout(function(){c("html .ab_scrollerHiddenLinkTargetBlank").detach()},1)));return!1}}D=a.timeStamp;h=parseInt(d.css("left"));if(Z){a.preventDefault();Y=!1;if(0<h)jTweener.addTween(d,{left:"0.5px",time:1,transition:"easeoutexpo"}),jTweener.addTween(e,{width:C,left:0,time:1,
transition:"easeoutexpo",onComplete:function(){x()}});else if(h<g)M=!1,jTweener.addTween(d,{left:g+"px",time:1,transition:"easeoutexpo"}),jTweener.addTween(e,{width:C,time:1,transition:"easeoutexpo",onComplete:function(){e.css({left:p+"px",right:"auto"});M=!0;x()}});else{if("pointerup"==w){if(f=a.originalEvent.pageX,b=16*(f-u[u.length-2]),newTime=D-O,h=f-h,-3>=z[1])return!1}else if("touchend"!=w)f=a.pageX,b=4*(u[u.length-1]-u[u.length-5]),newTime=D-O,h=f-h;else if(f=a.originalEvent.changedTouches[0].pageX,
b=16*(f-u[u.length-2]),newTime=D-O,h=f-h,-3>=z[1])return!1;if(f==v&&0!=c(a.target).closest("a").size()&&!aa)return b=c(a.target).closest("a"),h=c(a.target),null!==l.onclick?(a.preventDefault(),l.onclick(h.parents(".ab_scrollerItem"))):(a=b.attr("href"),"_blank"!=b.attr("target")?document.location=a:window.open(a,"_blank")),!1;aa=!1;a=D-ba[ba.length-1];var n=ca[ca.length-2]+7,b=b+q;Math.round(newTime/500);f<v&&n<h&&30>=a?b<g?(jTweener.addTween(d,{left:g+"px",time:Math.round(newTime/500),transition:"easeoutexpo",
onComplete:function(){V(0);x()}}),jTweener.addTween(e,{left:p+"px",time:Math.round(newTime/500),transition:"easeoutexpo"})):(jTweener.addTween(d,{left:b+"px",time:Math.round(newTime/500),transition:"easeoutexpo",onComplete:function(){x()}}),jTweener.addTween(e,{left:-1*b*k+"px",time:Math.round(newTime/500),transition:"easeoutexpo"})):f>v&&n>h&30>=a?0<b?(jTweener.addTween(d,{left:0,time:1,transition:"easeoutexpo",onComplete:function(){T(0);x()}}),jTweener.addTween(e,{left:0,time:1,transition:"easeoutexpo"})):
(jTweener.addTween(d,{left:b+"px",time:Math.round(newTime/500),transition:"easeoutexpo",onComplete:function(){x()}}),jTweener.addTween(e,{left:-1*b*k+"px",time:Math.round(newTime/500),transition:"easeoutexpo"})):x()}Z=!1}});e.on(m,function(a){P=!0;jTweener.removeTween(H);var b=e.position().left;la="pointerdown"==m?a.originalEvent.pageX-b:"touchstart"!=m?a.pageX-b:a.originalEvent.touches[0].pageX-b});c(document).on(t,function(a){P&&(ma="pointermove"==t?a.originalEvent.pageX:"touchmove"!=t?a.pageX:
a.originalEvent.changedTouches[0].pageX,I=ma-la,na=-I/k,K(parseInt(c(".ab_draggable").css("left")),0),0>=I?(e.css("left","0px"),d.css("left","0px")):I>=p?(d.css("left",g+"px"),e.css("left",p+"px")):(e.css("left",I+"px"),d.css("left",na+"px")))});c(document).on(w,function(){P&&(P=!1)});b.find(".ab_scrollbar").on(m,function(a){if(!c(a.target).hasClass("ab_scrollSlider")){jTweener.removeTween(H);a="touchstart"!=m?a.pageX-b.find(".ab_scrollbar").offset().left:a.originalEvent.touches[0].pageX-b.find(".ab_scrollbar").offset().left;
a-=C/2;var f=-a/k;0>=a?(jTweener.addTween(d,{time:1,left:0,transition:"easeoutexpo"}),jTweener.addTween(e,{time:1,left:0,transition:"easeoutexpo"})):a>=p?(jTweener.addTween(d,{time:1,left:g,transition:"easeoutexpo"}),jTweener.addTween(e,{time:1,left:p,transition:"easeoutexpo"})):(jTweener.addTween(d,{time:1,left:f,transition:"easeoutexpo"}),jTweener.addTween(e,{time:1,left:a,transition:"easeoutexpo"}))}});b.find(".ab_wrapper").mousewheel(function(a,c,f,n){!b.hasClass("ab_veryWide")&&Math.abs(f)>Math.abs(n)&&
(jTweener.removeTween(H),a.preventDefault(),a=parseInt(d.css("left"))-f,c=-a*k,a<g?(d.css("left",g+"px"),e.css({left:p+"px",right:"auto"}),U(0),V(0)):a>L?(d.css("left",L+"px"),e.css("left","0px"),T(0),W(0)):(d.css("left",a+"px"),c<p&&(e.css("left",c+"px"),U(0),W(0))))});d.addClass("unselectable").attr("unselectable","on").attr("draggable","false").on("dragstart",function(){return!1});d.find("*").attr("draggable","false").attr("unselectable","on");c(window).resize(function(){J();g=d.parent().width()-
d.width();if(g>=d.position().left){var a=g-d.position().left;d.css("left","+="+a+"px")}ha();ga();a=parseInt(d.css("left"))*-k;e.css({left:a});ea();ja()})}function da(n){var l=n.find(".ab_draggable").html();n.html(l).find(".ab_scrollerItem").each(function(){c(this).removeClass("ab_scrollerItem")})}function J(c){"inited"==c.attr("data-state")&&da(c);0==c.closest(":hidden").size()?S(c):setTimeout(function(){J(c)},100)}c(this).wrap('<div class="ab_scroller-root"></div>');J(c(this))})};c(function(){c(".scroller").scroller()})})(jQuery);
/*
 * jScrollPane - v2.0.20 - 2014-10-23
 * http://jscrollpane.kelvinluck.com/
 *
 * Copyright (c) 2014 Kelvin Luck
 * Dual licensed under the MIT or GPL licenses.
 */
(function(c,b){var a=function(d){return c(d,b)};if(typeof define==="function"&&define.amd){define(["jquery"],a)}else{if(typeof exports==="object"){module.exports=a}else{a(jQuery)}}}(function(b,a,c){b.fn.jScrollPane=function(e){function d(D,O){var ay,Q=this,Y,aj,v,al,T,Z,y,q,az,aE,au,i,I,h,j,aa,U,ap,X,t,A,aq,af,am,G,l,at,ax,x,av,aH,f,L,ai=true,P=true,aG=false,k=false,ao=D.clone(false,false).empty(),ac=b.fn.mwheelIntent?"mwheelIntent.jsp":"mousewheel.jsp";if(D.css("box-sizing")==="border-box"){aH=0;f=0}else{aH=D.css("paddingTop")+" "+D.css("paddingRight")+" "+D.css("paddingBottom")+" "+D.css("paddingLeft");f=(parseInt(D.css("paddingLeft"),10)||0)+(parseInt(D.css("paddingRight"),10)||0)}function ar(aQ){var aL,aN,aM,aJ,aI,aP,aO=false,aK=false;ay=aQ;if(Y===c){aI=D.scrollTop();aP=D.scrollLeft();D.css({overflow:"hidden",padding:0});aj=D.innerWidth()+f;v=D.innerHeight();D.width(aj);Y=b('<div class="jspPane" />').css("padding",aH).append(D.children());al=b('<div class="jspContainer" />').css({width:aj+"px",height:v+"px"}).append(Y).appendTo(D)}else{D.css("width","");aO=ay.stickToBottom&&K();aK=ay.stickToRight&&B();aJ=D.innerWidth()+f!=aj||D.outerHeight()!=v;if(aJ){aj=D.innerWidth()+f;v=D.innerHeight();al.css({width:aj+"px",height:v+"px"})}if(!aJ&&L==T&&Y.outerHeight()==Z){D.width(aj);return}L=T;Y.css("width","");D.width(aj);al.find(">.jspVerticalBar,>.jspHorizontalBar").remove().end()}Y.css("overflow","auto");if(aQ.contentWidth){T=aQ.contentWidth}else{T=Y[0].scrollWidth}Z=Y[0].scrollHeight;Y.css("overflow","");y=T/aj;q=Z/v;az=q>1;aE=y>1;if(!(aE||az)){D.removeClass("jspScrollable");Y.css({top:0,left:0,width:al.width()-f});n();E();R();w()}else{D.addClass("jspScrollable");aL=ay.maintainPosition&&(I||aa);if(aL){aN=aC();aM=aA()}aF();z();F();if(aL){N(aK?(T-aj):aN,false);M(aO?(Z-v):aM,false)}J();ag();an();if(ay.enableKeyboardNavigation){S()}if(ay.clickOnTrack){p()}C();if(ay.hijackInternalLinks){m()}}if(ay.autoReinitialise&&!av){av=setInterval(function(){ar(ay)},ay.autoReinitialiseDelay)}else{if(!ay.autoReinitialise&&av){clearInterval(av)}}aI&&D.scrollTop(0)&&M(aI,false);aP&&D.scrollLeft(0)&&N(aP,false);D.trigger("jsp-initialised",[aE||az])}function aF(){if(az){al.append(b('<div class="jspVerticalBar" />').append(b('<div class="jspCap jspCapTop" />'),b('<div class="jspTrack" />').append(b('<div class="jspDrag" />').append(b('<div class="jspDragTop" />'),b('<div class="jspDragBottom" />'))),b('<div class="jspCap jspCapBottom" />')));U=al.find(">.jspVerticalBar");ap=U.find(">.jspTrack");au=ap.find(">.jspDrag");if(ay.showArrows){aq=b('<a class="jspArrow jspArrowUp" />').bind("mousedown.jsp",aD(0,-1)).bind("click.jsp",aB);af=b('<a class="jspArrow jspArrowDown" />').bind("mousedown.jsp",aD(0,1)).bind("click.jsp",aB);if(ay.arrowScrollOnHover){aq.bind("mouseover.jsp",aD(0,-1,aq));af.bind("mouseover.jsp",aD(0,1,af))}ak(ap,ay.verticalArrowPositions,aq,af)}t=v;al.find(">.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow").each(function(){t-=b(this).outerHeight()});au.hover(function(){au.addClass("jspHover")},function(){au.removeClass("jspHover")}).bind("mousedown.jsp",function(aI){b("html").bind("dragstart.jsp selectstart.jsp",aB);au.addClass("jspActive");var s=aI.pageY-au.position().top;b("html").bind("mousemove.jsp",function(aJ){V(aJ.pageY-s,false)}).bind("mouseup.jsp mouseleave.jsp",aw);return false});o()}}function o(){ap.height(t+"px");I=0;X=ay.verticalGutter+ap.outerWidth();Y.width(aj-X-f);try{if(U.position().left===0){Y.css("margin-left",X+"px")}}catch(s){}}function z(){if(aE){al.append(b('<div class="jspHorizontalBar" />').append(b('<div class="jspCap jspCapLeft" />'),b('<div class="jspTrack" />').append(b('<div class="jspDrag" />').append(b('<div class="jspDragLeft" />'),b('<div class="jspDragRight" />'))),b('<div class="jspCap jspCapRight" />')));am=al.find(">.jspHorizontalBar");
G=am.find(">.jspTrack");h=G.find(">.jspDrag");if(ay.showArrows){ax=b('<a class="jspArrow jspArrowLeft" />').bind("mousedown.jsp",aD(-1,0)).bind("click.jsp",aB);x=b('<a class="jspArrow jspArrowRight" />').bind("mousedown.jsp",aD(1,0)).bind("click.jsp",aB);if(ay.arrowScrollOnHover){ax.bind("mouseover.jsp",aD(-1,0,ax));x.bind("mouseover.jsp",aD(1,0,x))}ak(G,ay.horizontalArrowPositions,ax,x)}h.hover(function(){h.addClass("jspHover")},function(){h.removeClass("jspHover")}).bind("mousedown.jsp",function(aI){b("html").bind("dragstart.jsp selectstart.jsp",aB);h.addClass("jspActive");var s=aI.pageX-h.position().left;b("html").bind("mousemove.jsp",function(aJ){W(aJ.pageX-s,false)}).bind("mouseup.jsp mouseleave.jsp",aw);return false});l=al.innerWidth();ah()}}function ah(){al.find(">.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow").each(function(){l-=b(this).outerWidth()});G.width(l+"px");aa=0}function F(){if(aE&&az){var aI=G.outerHeight(),s=ap.outerWidth();t-=aI;b(am).find(">.jspCap:visible,>.jspArrow").each(function(){l+=b(this).outerWidth()});l-=s;v-=s;aj-=aI;G.parent().append(b('<div class="jspCorner" />').css("width",aI+"px"));o();ah()}if(aE){Y.width((al.outerWidth()-f)+"px")}Z=Y.outerHeight();q=Z/v;if(aE){at=Math.ceil(1/y*l);if(at>ay.horizontalDragMaxWidth){at=ay.horizontalDragMaxWidth}else{if(at<ay.horizontalDragMinWidth){at=ay.horizontalDragMinWidth}}h.width(at+"px");j=l-at;ae(aa)}if(az){A=Math.ceil(1/q*t);if(A>ay.verticalDragMaxHeight){A=ay.verticalDragMaxHeight}else{if(A<ay.verticalDragMinHeight){A=ay.verticalDragMinHeight}}au.height(A+"px");i=t-A;ad(I)}}function ak(aJ,aL,aI,s){var aN="before",aK="after",aM;if(aL=="os"){aL=/Mac/.test(navigator.platform)?"after":"split"}if(aL==aN){aK=aL}else{if(aL==aK){aN=aL;aM=aI;aI=s;s=aM}}aJ[aN](aI)[aK](s)}function aD(aI,s,aJ){return function(){H(aI,s,this,aJ);this.blur();return false}}function H(aL,aK,aO,aN){aO=b(aO).addClass("jspActive");var aM,aJ,aI=true,s=function(){if(aL!==0){Q.scrollByX(aL*ay.arrowButtonSpeed)}if(aK!==0){Q.scrollByY(aK*ay.arrowButtonSpeed)}aJ=setTimeout(s,aI?ay.initialDelay:ay.arrowRepeatFreq);aI=false};s();aM=aN?"mouseout.jsp":"mouseup.jsp";aN=aN||b("html");aN.bind(aM,function(){aO.removeClass("jspActive");aJ&&clearTimeout(aJ);aJ=null;aN.unbind(aM)})}function p(){w();if(az){ap.bind("mousedown.jsp",function(aN){if(aN.originalTarget===c||aN.originalTarget==aN.currentTarget){var aL=b(this),aO=aL.offset(),aM=aN.pageY-aO.top-I,aJ,aI=true,s=function(){var aR=aL.offset(),aS=aN.pageY-aR.top-A/2,aP=v*ay.scrollPagePercent,aQ=i*aP/(Z-v);if(aM<0){if(I-aQ>aS){Q.scrollByY(-aP)}else{V(aS)}}else{if(aM>0){if(I+aQ<aS){Q.scrollByY(aP)}else{V(aS)}}else{aK();return}}aJ=setTimeout(s,aI?ay.initialDelay:ay.trackClickRepeatFreq);aI=false},aK=function(){aJ&&clearTimeout(aJ);aJ=null;b(document).unbind("mouseup.jsp",aK)};s();b(document).bind("mouseup.jsp",aK);return false}})}if(aE){G.bind("mousedown.jsp",function(aN){if(aN.originalTarget===c||aN.originalTarget==aN.currentTarget){var aL=b(this),aO=aL.offset(),aM=aN.pageX-aO.left-aa,aJ,aI=true,s=function(){var aR=aL.offset(),aS=aN.pageX-aR.left-at/2,aP=aj*ay.scrollPagePercent,aQ=j*aP/(T-aj);if(aM<0){if(aa-aQ>aS){Q.scrollByX(-aP)}else{W(aS)}}else{if(aM>0){if(aa+aQ<aS){Q.scrollByX(aP)}else{W(aS)}}else{aK();return}}aJ=setTimeout(s,aI?ay.initialDelay:ay.trackClickRepeatFreq);aI=false},aK=function(){aJ&&clearTimeout(aJ);aJ=null;b(document).unbind("mouseup.jsp",aK)};s();b(document).bind("mouseup.jsp",aK);return false}})}}function w(){if(G){G.unbind("mousedown.jsp")}if(ap){ap.unbind("mousedown.jsp")}}function aw(){b("html").unbind("dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp");if(au){au.removeClass("jspActive")}if(h){h.removeClass("jspActive")}}function V(s,aI){if(!az){return}if(s<0){s=0}else{if(s>i){s=i}}if(aI===c){aI=ay.animateScroll}if(aI){Q.animate(au,"top",s,ad)}else{au.css("top",s);ad(s)}}function ad(aI){if(aI===c){aI=au.position().top}al.scrollTop(0);I=aI||0;var aL=I===0,aJ=I==i,aK=aI/i,s=-aK*(Z-v);if(ai!=aL||aG!=aJ){ai=aL;
aG=aJ;D.trigger("jsp-arrow-change",[ai,aG,P,k])}u(aL,aJ);Y.css("top",s);D.trigger("jsp-scroll-y",[-s,aL,aJ]).trigger("scroll")}function W(aI,s){if(!aE){return}if(aI<0){aI=0}else{if(aI>j){aI=j}}if(s===c){s=ay.animateScroll}if(s){Q.animate(h,"left",aI,ae)}else{h.css("left",aI);ae(aI)}}function ae(aI){if(aI===c){aI=h.position().left}al.scrollTop(0);aa=aI||0;var aL=aa===0,aK=aa==j,aJ=aI/j,s=-aJ*(T-aj);if(P!=aL||k!=aK){P=aL;k=aK;D.trigger("jsp-arrow-change",[ai,aG,P,k])}r(aL,aK);Y.css("left",s);D.trigger("jsp-scroll-x",[-s,aL,aK]).trigger("scroll")}function u(aI,s){if(ay.showArrows){aq[aI?"addClass":"removeClass"]("jspDisabled");af[s?"addClass":"removeClass"]("jspDisabled")}}function r(aI,s){if(ay.showArrows){ax[aI?"addClass":"removeClass"]("jspDisabled");x[s?"addClass":"removeClass"]("jspDisabled")}}function M(s,aI){var aJ=s/(Z-v);V(aJ*i,aI)}function N(aI,s){var aJ=aI/(T-aj);W(aJ*j,s)}function ab(aV,aQ,aJ){var aN,aK,aL,s=0,aU=0,aI,aP,aO,aS,aR,aT;try{aN=b(aV)}catch(aM){return}aK=aN.outerHeight();aL=aN.outerWidth();al.scrollTop(0);al.scrollLeft(0);while(!aN.is(".jspPane")){s+=aN.position().top;aU+=aN.position().left;aN=aN.offsetParent();if(/^body|html$/i.test(aN[0].nodeName)){return}}aI=aA();aO=aI+v;if(s<aI||aQ){aR=s-ay.horizontalGutter}else{if(s+aK>aO){aR=s-v+aK+ay.horizontalGutter}}if(!isNaN(aR)){M(aR,aJ)}aP=aC();aS=aP+aj;if(aU<aP||aQ){aT=aU-ay.horizontalGutter}else{if(aU+aL>aS){aT=aU-aj+aL+ay.horizontalGutter}}if(!isNaN(aT)){N(aT,aJ)}}function aC(){return -Y.position().left}function aA(){return -Y.position().top}function K(){var s=Z-v;return(s>20)&&(s-aA()<10)}function B(){var s=T-aj;return(s>20)&&(s-aC()<10)}function ag(){al.unbind(ac).bind(ac,function(aM,aN,aK,aI){if(!aa){aa=0}if(!I){I=0}var aJ=aa,s=I,aL=aM.deltaFactor||ay.mouseWheelSpeed;Q.scrollBy(aK*aL,-aI*aL,false);return aJ==aa&&s==I})}function n(){al.unbind(ac)}function aB(){return false}function J(){Y.find(":input,a").unbind("focus.jsp").bind("focus.jsp",function(s){ab(s.target,false)})}function E(){Y.find(":input,a").unbind("focus.jsp")}function S(){var s,aI,aK=[];aE&&aK.push(am[0]);az&&aK.push(U[0]);Y.focus(function(){D.focus()});D.attr("tabindex",0).unbind("keydown.jsp keypress.jsp").bind("keydown.jsp",function(aN){if(aN.target!==this&&!(aK.length&&b(aN.target).closest(aK).length)){return}var aM=aa,aL=I;switch(aN.keyCode){case 40:case 38:case 34:case 32:case 33:case 39:case 37:s=aN.keyCode;aJ();break;case 35:M(Z-v);s=null;break;case 36:M(0);s=null;break}aI=aN.keyCode==s&&aM!=aa||aL!=I;return !aI}).bind("keypress.jsp",function(aL){if(aL.keyCode==s){aJ()}return !aI});if(ay.hideFocus){D.css("outline","none");if("hideFocus" in al[0]){D.attr("hideFocus",true)}}else{D.css("outline","");if("hideFocus" in al[0]){D.attr("hideFocus",false)}}function aJ(){var aM=aa,aL=I;switch(s){case 40:Q.scrollByY(ay.keyboardSpeed,false);break;case 38:Q.scrollByY(-ay.keyboardSpeed,false);break;case 34:case 32:Q.scrollByY(v*ay.scrollPagePercent,false);break;case 33:Q.scrollByY(-v*ay.scrollPagePercent,false);break;case 39:Q.scrollByX(ay.keyboardSpeed,false);break;case 37:Q.scrollByX(-ay.keyboardSpeed,false);break}aI=aM!=aa||aL!=I;return aI}}function R(){D.attr("tabindex","-1").removeAttr("tabindex").unbind("keydown.jsp keypress.jsp")}function C(){if(location.hash&&location.hash.length>1){var aK,aI,aJ=escape(location.hash.substr(1));try{aK=b("#"+aJ+', a[name="'+aJ+'"]')}catch(s){return}if(aK.length&&Y.find(aJ)){if(al.scrollTop()===0){aI=setInterval(function(){if(al.scrollTop()>0){ab(aK,true);b(document).scrollTop(al.position().top);clearInterval(aI)}},50)}else{ab(aK,true);b(document).scrollTop(al.position().top)}}}}function m(){if(b(document.body).data("jspHijack")){return}b(document.body).data("jspHijack",true);b(document.body).delegate("a[href*=#]","click",function(s){var aI=this.href.substr(0,this.href.indexOf("#")),aK=location.href,aO,aP,aJ,aM,aL,aN;if(location.href.indexOf("#")!==-1){aK=location.href.substr(0,location.href.indexOf("#"))}if(aI!==aK){return}aO=escape(this.href.substr(this.href.indexOf("#")+1));
aP;try{aP=b("#"+aO+', a[name="'+aO+'"]')}catch(aQ){return}if(!aP.length){return}aJ=aP.closest(".jspScrollable");aM=aJ.data("jsp");aM.scrollToElement(aP,true);if(aJ[0].scrollIntoView){aL=b(a).scrollTop();aN=aP.offset().top;if(aN<aL||aN>aL+b(a).height()){aJ[0].scrollIntoView()}}s.preventDefault()})}function an(){var aJ,aI,aL,aK,aM,s=false;al.unbind("touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick").bind("touchstart.jsp",function(aN){var aO=aN.originalEvent.touches[0];aJ=aC();aI=aA();aL=aO.pageX;aK=aO.pageY;aM=false;s=true}).bind("touchmove.jsp",function(aQ){if(!s){return}var aP=aQ.originalEvent.touches[0],aO=aa,aN=I;Q.scrollTo(aJ+aL-aP.pageX,aI+aK-aP.pageY);aM=aM||Math.abs(aL-aP.pageX)>5||Math.abs(aK-aP.pageY)>5;return aO==aa&&aN==I}).bind("touchend.jsp",function(aN){s=false}).bind("click.jsp-touchclick",function(aN){if(aM){aM=false;return false}})}function g(){var s=aA(),aI=aC();D.removeClass("jspScrollable").unbind(".jsp");D.replaceWith(ao.append(Y.children()));ao.scrollTop(s);ao.scrollLeft(aI);if(av){clearInterval(av)}}b.extend(Q,{reinitialise:function(aI){aI=b.extend({},ay,aI);ar(aI)},scrollToElement:function(aJ,aI,s){ab(aJ,aI,s)},scrollTo:function(aJ,s,aI){N(aJ,aI);M(s,aI)},scrollToX:function(aI,s){N(aI,s)},scrollToY:function(s,aI){M(s,aI)},scrollToPercentX:function(aI,s){N(aI*(T-aj),s)},scrollToPercentY:function(aI,s){M(aI*(Z-v),s)},scrollBy:function(aI,s,aJ){Q.scrollByX(aI,aJ);Q.scrollByY(s,aJ)},scrollByX:function(s,aJ){var aI=aC()+Math[s<0?"floor":"ceil"](s),aK=aI/(T-aj);W(aK*j,aJ)},scrollByY:function(s,aJ){var aI=aA()+Math[s<0?"floor":"ceil"](s),aK=aI/(Z-v);V(aK*i,aJ)},positionDragX:function(s,aI){W(s,aI)},positionDragY:function(aI,s){V(aI,s)},animate:function(aI,aL,s,aK){var aJ={};aJ[aL]=s;aI.animate(aJ,{duration:ay.animateDuration,easing:ay.animateEase,queue:false,step:aK})},getContentPositionX:function(){return aC()},getContentPositionY:function(){return aA()},getContentWidth:function(){return T},getContentHeight:function(){return Z},getPercentScrolledX:function(){return aC()/(T-aj)},getPercentScrolledY:function(){return aA()/(Z-v)},getIsScrollableH:function(){return aE},getIsScrollableV:function(){return az},getContentPane:function(){return Y},scrollToBottom:function(s){V(i,s)},hijackInternalLinks:b.noop,destroy:function(){g()}});ar(O)}e=b.extend({},b.fn.jScrollPane.defaults,e);b.each(["arrowButtonSpeed","trackClickSpeed","keyboardSpeed"],function(){e[this]=e[this]||e.speed});return this.each(function(){var f=b(this),g=f.data("jsp");if(g){g.reinitialise(e)}else{b("script",f).filter('[type="text/javascript"],:not([type])').remove();g=new d(f,e);f.data("jsp",g)}})};b.fn.jScrollPane.defaults={showArrows:false,maintainPosition:true,stickToBottom:false,stickToRight:false,clickOnTrack:true,autoReinitialise:false,autoReinitialiseDelay:500,verticalDragMinHeight:0,verticalDragMaxHeight:99999,horizontalDragMinWidth:0,horizontalDragMaxWidth:99999,contentWidth:c,animateScroll:false,animateDuration:300,animateEase:"linear",hijackInternalLinks:false,verticalGutter:4,horizontalGutter:4,mouseWheelSpeed:3,arrowButtonSpeed:0,arrowRepeatFreq:50,arrowScrollOnHover:false,trackClickSpeed:0,trackClickRepeatFreq:70,verticalArrowPositions:"split",horizontalArrowPositions:"split",enableKeyboardNavigation:true,hideFocus:false,keyboardSpeed:0,initialDelay:300,speed:30,scrollPagePercent:0.8}},this));



/*
 * Thickbox 3.1 - One Box To Rule Them All.
 * By Cody Lindley (http://www.codylindley.com)
 * Copyright (c) 2007 cody lindley
 * Licensed under the MIT License: http://www.opensource.org/licenses/mit-license.php
*/

var tb_pathToImage = "/jquery/loadingAnimation.gif";

//on page load call tb_init
$(document).ready(function(){
		tb_init('a.thickbox, area.thickbox, input.thickbox');//pass where to apply thickbox
		imgLoader = new Image();// preload image
		imgLoader.src = tb_pathToImage;
});

//add thickbox to href & area elements that have a class of .thickbox
function tb_init(domChunk){
		$(domChunk).click(function(){
		var t = this.title || this.name || null;
		var a = this.href || this.alt;
		var g = this.rel || false;
		tb_show(t,a,g);
		this.blur();
		return false;
		});
}

function tb_show(caption, url, imageGroup) {//function called when the user clicks on a thickbox link

		//imageGroup = 'ncscreen';
		try {
				if (typeof document.body.style.maxHeight === "undefined") {//if IE 6
						$("body","html").css({height: "100%", width: "100%"});
						$("html").css("overflow","hidden");
						if (document.getElementById("TB_HideSelect") === null) {//iframe to hide select elements in ie6
								$("body").append("<iframe id='TB_HideSelect'></iframe><div id='TB_overlay'></div><div id='TB_window'></div>");
								$("#TB_overlay").click(tb_remove);
						}
				}else{//all others
						if(document.getElementById("TB_overlay") === null){
								$("body").append("<div id='TB_overlay'></div><div id='TB_window'></div>");
								$("#TB_overlay").click(tb_remove);
						}
				}

				if(tb_detectMacXFF()){
						$("#TB_overlay").addClass("TB_overlayMacFFBGHack");//use png overlay so hide flash
				}else{
						$("#TB_overlay").addClass("TB_overlayBG");//use background and opacity
				}

				if(caption===null){caption="";}
				$("body").append("<div id='TB_load'><img src='"+imgLoader.src+"' /></div>");//add loader to the page
				$('#TB_load').show();//show loader

				var baseURL;
			if(url.indexOf("?")!==-1){ //ff there is a query string involved
						baseURL = url.substr(0, url.indexOf("?"));
			}else{
						baseURL = url;
			}

			var urlString = /\.jpg$|\.jpeg$|\.png$|\.gif$|\.bmp$/;
			var urlType = baseURL.toLowerCase().match(urlString);

				if(urlType == '.jpg' || urlType == '.jpeg' || urlType == '.png' || urlType == '.gif' || urlType == '.bmp'){//code to show images

						TB_PrevCaption = "";
						TB_PrevURL = "";
						TB_PrevHTML = "";
						TB_NextCaption = "";
						TB_NextURL = "";
						TB_NextHTML = "";
						TB_imageCount = "";
						TB_FoundURL = false;
						if(imageGroup){
								TB_TempArray = $("a[rel="+imageGroup+"]").get();
								for (TB_Counter = 0; ((TB_Counter < TB_TempArray.length) && (TB_NextHTML === "")); TB_Counter++) {
										var urlTypeTemp = TB_TempArray[TB_Counter].href.toLowerCase().match(urlString);
												if (!(TB_TempArray[TB_Counter].href == url)) {
														if (TB_FoundURL) {
																TB_NextCaption = TB_TempArray[TB_Counter].title;
																TB_NextURL = TB_TempArray[TB_Counter].href;
																TB_NextHTML = "<span id='TB_next'>&nbsp;&nbsp;<a href='#'>Следующий &gt;</a></span>";
														} else {
																TB_PrevCaption = TB_TempArray[TB_Counter].title;
																TB_PrevURL = TB_TempArray[TB_Counter].href;
																TB_PrevHTML = "<span id='TB_prev'>&nbsp;&nbsp;<a href='#'>&lt; Предыдущий</a></span>";
														}
												} else {
														TB_FoundURL = true;
														TB_imageCount = (TB_Counter + 1) +" / "+ (TB_TempArray.length);
												}
								}
						}

						imgPreloader = new Image();
						imgPreloader.onload = function(){
						imgPreloader.onload = null;

						// Resizing large images - orginal by Christian Montoya edited by me.
						var pagesize = tb_getPageSize();
						var x = pagesize[0] - 150;
						var y = pagesize[1] - 150;
						var imageWidth = imgPreloader.width;
						var imageHeight = imgPreloader.height;
						if (imageWidth > x) {
								imageHeight = imageHeight * (x / imageWidth);
								imageWidth = x;
								if (imageHeight > y) {
										imageWidth = imageWidth * (y / imageHeight);
										imageHeight = y;
								}
						} else if (imageHeight > y) {
								imageWidth = imageWidth * (y / imageHeight);
								imageHeight = y;
								if (imageWidth > x) {
										imageHeight = imageHeight * (x / imageWidth);
										imageWidth = x;
								}
						}
						// End Resizing

						TB_WIDTH = imageWidth + 30;
						TB_HEIGHT = imageHeight + 60;
						$("#TB_window").append("<div id='LinkNext'></div><div id='LinkPrev'></div>");
						$("#TB_window").append("<div style='text-align: right;'><a href='#' id='TB_closeWindowButton' title='Выход'><img style='margin-top: 10px; margin-right: 10px;' src='/nimages/css/img/button_close.gif' alt='Выход'/></a></div>");
						$("#TB_window").append("<a href='' id='TB_ImageOff' title='Close'><img id='TB_Image' src='"+url+"' width='"+imageWidth+"' height='"+imageHeight+"' alt='"+caption+"'/></a>");
						$("#TB_window").append("<div id='TB_caption'>"+caption+"</div>");
						$("#TB_window").append("<div id='TB_secondLine'>" +  TB_imageCount + "</div>");

						$("#TB_closeWindowButton").click(tb_remove);

						$("#LinkNext").css('top', TB_HEIGHT/2 );
						$("#LinkNext").css('left', TB_WIDTH + 30 );
						$("#LinkPrev").css('top', TB_HEIGHT/2 );
						$("#LinkPrev").css('left', -41 );

						if ( TB_NextURL ) {
							$("#LinkNext").html("<img id='TB_next' src='/nimages/img/tb_r.gif' alt='' />");
						}
						if ( TB_PrevURL ) {
							$("#LinkPrev").html("<img id='TB_prev' src='/nimages/img/tb_l.gif' alt='' />");
						}

						if (!(TB_PrevHTML === "")) {
								function goPrev(){
										if($(document).unbind("click",goPrev)){$(document).unbind("click",goPrev);}
										$("#TB_window").remove();
										$("body").append("<div id='TB_window'></div>");
										tb_show(TB_PrevCaption, TB_PrevURL, imageGroup);
										return false;
								}
								$("#TB_prev").click(goPrev);
						}

						if (!(TB_NextHTML === "")) {
								function goNext(){
										$("#TB_window").remove();
										$("body").append("<div id='TB_window'></div>");
										tb_show(TB_NextCaption, TB_NextURL, imageGroup);
										return false;
								}
								$("#TB_next").click(goNext);

						}

						document.onkeydown = function(e){
								if (e == null) { // ie
										keycode = event.keyCode;
								} else { // mozilla
										keycode = e.which;
								}
								if(keycode == 27){ // close
										tb_remove();
								} else if(keycode == 190){ // display previous image
										if(!(TB_NextHTML == "")){
												document.onkeydown = "";
												goNext();
										}
								} else if(keycode == 188){ // display next image
										if(!(TB_PrevHTML == "")){
												document.onkeydown = "";
												goPrev();
										}
								}
						};

						tb_position();
						$("#TB_load").remove();
						$("#TB_ImageOff").click(tb_remove);
						$("#TB_window").css({display:"block"}); //for safari using css instead of show
						};

						imgPreloader.src = url;
				}else{//code to show html

						var queryString = url.replace(/^[^\?]+\??/,'');
						var params = tb_parseQuery( queryString );

						TB_WIDTH = (params['width']*1) + 30 || 630; //defaults to 630 if no paramaters were added to URL
						TB_HEIGHT = (params['height']*1) + 40 || 440; //defaults to 440 if no paramaters were added to URL
						ajaxContentW = TB_WIDTH - 30;
						ajaxContentH = TB_HEIGHT - 45;

						if(url.indexOf('TB_iframe') != -1){// either iframe or ajax window
										urlNoQuery = url.split('TB_');
										$("#TB_iframeContent").remove();
										if(params['modal'] != "true"){//iframe no modal
												$("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>"+caption+"</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton' title='Close'>close</a> or Esc Key</div></div><iframe frameborder='0' hspace='0' src='"+urlNoQuery[0]+"' id='TB_iframeContent' name='TB_iframeContent"+Math.round(Math.random()*1000)+"' onload='tb_showIframe()' style='width:"+(ajaxContentW + 29)+"px;height:"+(ajaxContentH + 17)+"px;' > </iframe>");
										}else{//iframe modal
										$("#TB_overlay").unbind();
												$("#TB_window").append("<iframe frameborder='0' hspace='0' src='"+urlNoQuery[0]+"' id='TB_iframeContent' name='TB_iframeContent"+Math.round(Math.random()*1000)+"' onload='tb_showIframe()' style='width:"+(ajaxContentW + 29)+"px;height:"+(ajaxContentH + 17)+"px;'> </iframe>");
										}
						}else{// not an iframe, ajax
										if($("#TB_window").css("display") != "block"){
												if(params['modal'] != "true"){//ajax no modal
												$("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>"+caption+"</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton'>close</a> or Esc Key</div></div><div id='TB_ajaxContent' style='width:"+ajaxContentW+"px;height:"+ajaxContentH+"px'></div>");
												}else{//ajax modal
												$("#TB_overlay").unbind();
												$("#TB_window").append("<div id='TB_ajaxContent' class='TB_modal' style='width:"+ajaxContentW+"px;height:"+ajaxContentH+"px;'></div>");
												}
										}else{//this means the window is already up, we are just loading new content via ajax
												$("#TB_ajaxContent")[0].style.width = ajaxContentW +"px";
												$("#TB_ajaxContent")[0].style.height = ajaxContentH +"px";
												$("#TB_ajaxContent")[0].scrollTop = 0;
												$("#TB_ajaxWindowTitle").html(caption);
										}
						}

						$("#TB_closeWindowButton").click(tb_remove);

								if(url.indexOf('TB_inline') != -1){
										$("#TB_ajaxContent").append($('#' + params['inlineId']).children());
										$("#TB_window").unload(function () {
												$('#' + params['inlineId']).append( $("#TB_ajaxContent").children() ); // move elements back when you're finished
										});
										tb_position();
										$("#TB_load").remove();
										$("#TB_window").css({display:"block"});
								}else if(url.indexOf('TB_iframe') != -1){
										tb_position();
										if($.browser.safari){//safari needs help because it will not fire iframe onload
												$("#TB_load").remove();
												$("#TB_window").css({display:"block"});
										}
								}else{
										$("#TB_ajaxContent").load(url += "&random=" + (new Date().getTime()),function(){//to do a post change this load method
												tb_position();
												$("#TB_load").remove();
												tb_init("#TB_ajaxContent a.thickbox");
												$("#TB_window").css({display:"block"});
										});
								}

				}

				if(!params['modal']){
						document.onkeyup = function(e){
								if (e == null) { // ie
										keycode = event.keyCode;
								} else { // mozilla
										keycode = e.which;
								}
								if(keycode == 27){ // close
										tb_remove();
								}
						};
				}

		} catch(e) {
				//nothing here
		}
}

//helper functions below
function tb_showIframe(){
		$("#TB_load").remove();
		$("#TB_window").css({display:"block"});
}

function tb_remove() {
		$("#TB_imageOff").unbind("click");
		$("#TB_closeWindowButton").unbind("click");
		$("#TB_window").fadeOut("fast",function(){$('#TB_window,#TB_overlay,#TB_HideSelect').trigger("unload").unbind().remove();});
		$("#TB_load").remove();
		if (typeof document.body.style.maxHeight == "undefined") {//if IE 6
				$("body","html").css({height: "auto", width: "auto"});
				$("html").css("overflow","");
		}
		document.onkeydown = "";
		document.onkeyup = "";
		return false;
}

function tb_position() {
$("#TB_window").css({marginLeft: '-' + parseInt((TB_WIDTH / 2),10) + 'px', width: TB_WIDTH + 'px'});
		//if ( !(jQuery.browser.msie && jQuery.browser.version < 7)) { // take away IE6
				$("#TB_window").css({marginTop: '-' + parseInt((TB_HEIGHT / 2),10) + 'px'});
		//}
}

function tb_parseQuery ( query ) {
	var Params = {};
	if ( ! query ) {return Params;}// return empty object
	var Pairs = query.split(/[;&]/);
	for ( var i = 0; i < Pairs.length; i++ ) {
			var KeyVal = Pairs[i].split('=');
			if ( ! KeyVal || KeyVal.length != 2 ) {continue;}
			var key = unescape( KeyVal[0] );
			var val = unescape( KeyVal[1] );
			val = val.replace(/\+/g, ' ');
			Params[key] = val;
	}
	return Params;
}

function tb_getPageSize(){
		var de = document.documentElement;
		var w = window.innerWidth || self.innerWidth || (de&&de.clientWidth) || document.body.clientWidth;
		var h = window.innerHeight || self.innerHeight || (de&&de.clientHeight) || document.body.clientHeight;
		arrayPageSize = [w,h];
		return arrayPageSize;
}

function tb_detectMacXFF() {
	var userAgent = navigator.userAgent.toLowerCase();
	if (userAgent.indexOf('mac') != -1 && userAgent.indexOf('firefox')!=-1) {
		return true;
	}
}





function load_slider ( block ) {
	$(window).load(function() {
		$('#netcat_slider').nivoSlider({

				directionNav: false, // Next & Prev navigation
				directionNavHide: false, // Only show on hover
				controlNav: false, // 1,2,3... navigation
				pauseTime: 3000,
				keyboardNav: false, // Use left & right arrows
				pauseOnHover: true, // Stop animation while hovering
				manualAdvance: false, // Force manual transitions

		});

		$('#netcat_slider').data('nivoslider').start();
	});


}



$(function(){

    $('#formSubmit').click(function() {
        var url = $('#newmainpage').length ? 'https://netcat.ru/ordersite/partners/' : './';
		var id  = $('#regList option:selected').val();
		if(parseInt(id)) {
				url += '?reg=' + id;
		}
		location.replace(url);
    });

});
function test_load_geo() {
		if(!($('#about').html())) {
				get_info_for_default_location();
		}
}
function get_info_for_location(city_name, region_name, country_name) {
		var uri = '/netcat/modules/default/geo_ip.php';
		uri += '?city_name=' + city_name;
		uri += '&region_name=' + region_name;
		uri += '&country_name=' + country_name;
		uri += '&isAJAX=1';
		$.ajax({
				url: uri,
				cache: false,
				async: true,
				success: function(result) {
						$('#about').html(result);
				}
		});
}
function get_info_for_default_location() {
		get_info_for_location('нет', 'нет', 'Россия');
}

function netcatru_load_banner47 ( product_name ) {
	var pr = new Array('nc47', 'ecm', 'cor', 'soc', 'sb');
	var pr_id = 0;

	var link1 = {}
	link1.nc47 = '/cms/history/';
	link1.ecm = '/products/editions/business/';
	link1.cor = '/products/editions/standard/';
	link1.soc = '/products/editions/community/';
	link1.sb = '/products/editions/sb/';

	var link2 = {}
	link2.nc47 = '/cms/history/';
	link2.ecm = '/products/editions/e-commerce/';
	link2.cor = '/products/editions/corporate/';
	link2.soc = '/products/editions/extra/';
	link2.sb = '/products/editions/sb/';

	// загрузка случайного продукта
	if ( !product_name ) product_name = pr[ Math.floor(Math.random()*5) ];
	var i, id;
	for ( i = 0; i < 5; i++ ) {
		if ( product_name == pr[i] ) pr_id = i;
		id = '#banner47_' + pr[i] + '_li';
	real_name = $('span', $(id)).length ? $('span', $(id)).html() : $('a', $(id)).html();
		$(id).html( product_name == pr[i] ? "<span>" +  real_name + "</span>": "<a href='#' onclick='netcatru_load_banner47(\""+pr[i]+"\"); return false;'>" +  real_name + "</a>" );
	}

	if ( product_name == 'nc47' ) {
	$('#netcat47_link_history').show();
	$('#netcat47_link1').hide();
	$('#netcat47_link2').hide();
	$('#netcat47_link_sb').hide();
	}
	else if (  product_name == 'sb' ) {
		$('#netcat47_link_history').hide();
		$('#netcat47_link1').hide();
		$('#netcat47_link2').hide();
		$('#netcat47_link_sb').show();

	}
	else {
	$('#netcat47_link1').attr('href', link1[product_name]).show();
	$('#netcat47_link2').attr('href', link2[product_name]).show();
	$('#netcat47_link_history').hide();
		$('#netcat47_link_sb').hide();
	}


	$('.banner47').hide();
	$('#banner47_' + product_name).show();


}

/* Tooltipster v3.3.0 */;(function(e,t,n){function s(t,n){this.bodyOverflowX;this.callbacks={hide:[],show:[]};this.checkInterval=null;this.Content;this.$el=e(t);this.$elProxy;this.elProxyPosition;this.enabled=true;this.options=e.extend({},i,n);this.mouseIsOverProxy=false;this.namespace="tooltipster-"+Math.round(Math.random()*1e5);this.Status="hidden";this.timerHide=null;this.timerShow=null;this.$tooltip;this.options.iconTheme=this.options.iconTheme.replace(".","");this.options.theme=this.options.theme.replace(".","");this._init()}function o(t,n){var r=true;e.each(t,function(e,i){if(typeof n[e]==="undefined"||t[e]!==n[e]){r=false;return false}});return r}function f(){return!a&&u}function l(){var e=n.body||n.documentElement,t=e.style,r="transition";if(typeof t[r]=="string"){return true}v=["Moz","Webkit","Khtml","O","ms"],r=r.charAt(0).toUpperCase()+r.substr(1);for(var i=0;i<v.length;i++){if(typeof t[v[i]+r]=="string"){return true}}return false}var r="tooltipster",i={animation:"fade",arrow:true,arrowColor:"",autoClose:true,content:null,contentAsHTML:false,contentCloning:true,debug:true,delay:200,minWidth:0,maxWidth:null,functionInit:function(e,t){},functionBefore:function(e,t){t()},functionReady:function(e,t){},functionAfter:function(e){},hideOnClick:false,icon:"(?)",iconCloning:true,iconDesktop:false,iconTouch:false,iconTheme:"tooltipster-icon",interactive:false,interactiveTolerance:350,multiple:false,offsetX:0,offsetY:0,onlyOne:false,position:"top",positionTracker:false,positionTrackerCallback:function(e){if(this.option("trigger")=="hover"&&this.option("autoClose")){this.hide()}},restoration:"current",speed:350,timer:0,theme:"tooltipster-default",touchDevices:true,trigger:"hover",updateAnimation:true};s.prototype={_init:function(){var t=this;if(n.querySelector){var r=null;if(t.$el.data("tooltipster-initialTitle")===undefined){r=t.$el.attr("title");if(r===undefined)r=null;t.$el.data("tooltipster-initialTitle",r)}if(t.options.content!==null){t._content_set(t.options.content)}else{t._content_set(r)}var i=t.options.functionInit.call(t.$el,t.$el,t.Content);if(typeof i!=="undefined")t._content_set(i);t.$el.removeAttr("title").addClass("tooltipstered");if(!u&&t.options.iconDesktop||u&&t.options.iconTouch){if(typeof t.options.icon==="string"){t.$elProxy=e('<span class="'+t.options.iconTheme+'"></span>');t.$elProxy.text(t.options.icon)}else{if(t.options.iconCloning)t.$elProxy=t.options.icon.clone(true);else t.$elProxy=t.options.icon}t.$elProxy.insertAfter(t.$el)}else{t.$elProxy=t.$el}if(t.options.trigger=="hover"){t.$elProxy.on("mouseenter."+t.namespace,function(){if(!f()||t.options.touchDevices){t.mouseIsOverProxy=true;t._show()}}).on("mouseleave."+t.namespace,function(){if(!f()||t.options.touchDevices){t.mouseIsOverProxy=false}});if(u&&t.options.touchDevices){t.$elProxy.on("touchstart."+t.namespace,function(){t._showNow()})}}else if(t.options.trigger=="click"){t.$elProxy.on("click."+t.namespace,function(){if(!f()||t.options.touchDevices){t._show()}})}}},_show:function(){var e=this;if(e.Status!="shown"&&e.Status!="appearing"){if(e.options.delay){e.timerShow=setTimeout(function(){if(e.options.trigger=="click"||e.options.trigger=="hover"&&e.mouseIsOverProxy){e._showNow()}},e.options.delay)}else e._showNow()}},_showNow:function(n){var r=this;r.options.functionBefore.call(r.$el,r.$el,function(){if(r.enabled&&r.Content!==null){if(n)r.callbacks.show.push(n);r.callbacks.hide=[];clearTimeout(r.timerShow);r.timerShow=null;clearTimeout(r.timerHide);r.timerHide=null;if(r.options.onlyOne){e(".tooltipstered").not(r.$el).each(function(t,n){var r=e(n),i=r.data("tooltipster-ns");e.each(i,function(e,t){var n=r.data(t),i=n.status(),s=n.option("autoClose");if(i!=="hidden"&&i!=="disappearing"&&s){n.hide()}})})}var i=function(){r.Status="shown";e.each(r.callbacks.show,function(e,t){t.call(r.$el)});r.callbacks.show=[]};if(r.Status!=="hidden"){var s=0;if(r.Status==="disappearing"){r.Status="appearing";if(l()){r.$tooltip.clearQueue().removeClass("tooltipster-dying").addClass("tooltipster-"+r.options.animation+"-show");if(r.options.speed>0)r.$tooltip.delay(r.options.speed);r.$tooltip.queue(i)}else{r.$tooltip.stop().fadeIn(i)}}else if(r.Status==="shown"){i()}}else{r.Status="appearing";var s=r.options.speed;r.bodyOverflowX=e("body").css("overflow-x");e("body").css("overflow-x","hidden");var o="tooltipster-"+r.options.animation,a="-webkit-transition-duration: "+r.options.speed+"ms; -webkit-animation-duration: "+r.options.speed+"ms; -moz-transition-duration: "+r.options.speed+"ms; -moz-animation-duration: "+r.options.speed+"ms; -o-transition-duration: "+r.options.speed+"ms; -o-animation-duration: "+r.options.speed+"ms; -ms-transition-duration: "+r.options.speed+"ms; -ms-animation-duration: "+r.options.speed+"ms; transition-duration: "+r.options.speed+"ms; animation-duration: "+r.options.speed+"ms;",f=r.options.minWidth?"min-width:"+Math.round(r.options.minWidth)+"px;":"",c=r.options.maxWidth?"max-width:"+Math.round(r.options.maxWidth)+"px;":"",h=r.options.interactive?"pointer-events: auto;":"";r.$tooltip=e('<div class="tooltipster-base '+r.options.theme+'" style="'+f+" "+c+" "+h+" "+a+'"><div class="tooltipster-content"></div></div>');if(l())r.$tooltip.addClass(o);r._content_insert();r.$tooltip.appendTo("body");r.reposition();r.options.functionReady.call(r.$el,r.$el,r.$tooltip);if(l()){r.$tooltip.addClass(o+"-show");if(r.options.speed>0)r.$tooltip.delay(r.options.speed);r.$tooltip.queue(i)}else{r.$tooltip.css("display","none").fadeIn(r.options.speed,i)}r._interval_set();e(t).on("scroll."+r.namespace+" resize."+r.namespace,function(){r.reposition()});if(r.options.autoClose){e("body").off("."+r.namespace);if(r.options.trigger=="hover"){if(u){setTimeout(function(){e("body").on("touchstart."+r.namespace,function(){r.hide()})},0)}if(r.options.interactive){if(u){r.$tooltip.on("touchstart."+r.namespace,function(e){e.stopPropagation()})}var p=null;r.$elProxy.add(r.$tooltip).on("mouseleave."+r.namespace+"-autoClose",function(){clearTimeout(p);p=setTimeout(function(){r.hide()},r.options.interactiveTolerance)}).on("mouseenter."+r.namespace+"-autoClose",function(){clearTimeout(p)})}else{r.$elProxy.on("mouseleave."+r.namespace+"-autoClose",function(){r.hide()})}if(r.options.hideOnClick){r.$elProxy.on("click."+r.namespace+"-autoClose",function(){r.hide()})}}else if(r.options.trigger=="click"){setTimeout(function(){e("body").on("click."+r.namespace+" touchstart."+r.namespace,function(){r.hide()})},0);if(r.options.interactive){r.$tooltip.on("click."+r.namespace+" touchstart."+r.namespace,function(e){e.stopPropagation()})}}}}if(r.options.timer>0){r.timerHide=setTimeout(function(){r.timerHide=null;r.hide()},r.options.timer+s)}}})},_interval_set:function(){var t=this;t.checkInterval=setInterval(function(){if(e("body").find(t.$el).length===0||e("body").find(t.$elProxy).length===0||t.Status=="hidden"||e("body").find(t.$tooltip).length===0){if(t.Status=="shown"||t.Status=="appearing")t.hide();t._interval_cancel()}else{if(t.options.positionTracker){var n=t._repositionInfo(t.$elProxy),r=false;if(o(n.dimension,t.elProxyPosition.dimension)){if(t.$elProxy.css("position")==="fixed"){if(o(n.position,t.elProxyPosition.position))r=true}else{if(o(n.offset,t.elProxyPosition.offset))r=true}}if(!r){t.reposition();t.options.positionTrackerCallback.call(t,t.$el)}}}},200)},_interval_cancel:function(){clearInterval(this.checkInterval);this.checkInterval=null},_content_set:function(e){if(typeof e==="object"&&e!==null&&this.options.contentCloning){e=e.clone(true)}this.Content=e},_content_insert:function(){var e=this,t=this.$tooltip.find(".tooltipster-content");if(typeof e.Content==="string"&&!e.options.contentAsHTML){t.text(e.Content)}else{t.empty().append(e.Content)}},_update:function(e){var t=this;t._content_set(e);if(t.Content!==null){if(t.Status!=="hidden"){t._content_insert();t.reposition();if(t.options.updateAnimation){if(l()){t.$tooltip.css({width:"","-webkit-transition":"all "+t.options.speed+"ms, width 0ms, height 0ms, left 0ms, top 0ms","-moz-transition":"all "+t.options.speed+"ms, width 0ms, height 0ms, left 0ms, top 0ms","-o-transition":"all "+t.options.speed+"ms, width 0ms, height 0ms, left 0ms, top 0ms","-ms-transition":"all "+t.options.speed+"ms, width 0ms, height 0ms, left 0ms, top 0ms",transition:"all "+t.options.speed+"ms, width 0ms, height 0ms, left 0ms, top 0ms"}).addClass("tooltipster-content-changing");setTimeout(function(){if(t.Status!="hidden"){t.$tooltip.removeClass("tooltipster-content-changing");setTimeout(function(){if(t.Status!=="hidden"){t.$tooltip.css({"-webkit-transition":t.options.speed+"ms","-moz-transition":t.options.speed+"ms","-o-transition":t.options.speed+"ms","-ms-transition":t.options.speed+"ms",transition:t.options.speed+"ms"})}},t.options.speed)}},t.options.speed)}else{t.$tooltip.fadeTo(t.options.speed,.5,function(){if(t.Status!="hidden"){t.$tooltip.fadeTo(t.options.speed,1)}})}}}}else{t.hide()}},_repositionInfo:function(e){return{dimension:{height:e.outerHeight(false),width:e.outerWidth(false)},offset:e.offset(),position:{left:parseInt(e.css("left")),top:parseInt(e.css("top"))}}},hide:function(n){var r=this;if(n)r.callbacks.hide.push(n);r.callbacks.show=[];clearTimeout(r.timerShow);r.timerShow=null;clearTimeout(r.timerHide);r.timerHide=null;var i=function(){e.each(r.callbacks.hide,function(e,t){t.call(r.$el)});r.callbacks.hide=[]};if(r.Status=="shown"||r.Status=="appearing"){r.Status="disappearing";var s=function(){r.Status="hidden";if(typeof r.Content=="object"&&r.Content!==null){r.Content.detach()}r.$tooltip.remove();r.$tooltip=null;e(t).off("."+r.namespace);e("body").off("."+r.namespace).css("overflow-x",r.bodyOverflowX);e("body").off("."+r.namespace);r.$elProxy.off("."+r.namespace+"-autoClose");r.options.functionAfter.call(r.$el,r.$el);i()};if(l()){r.$tooltip.clearQueue().removeClass("tooltipster-"+r.options.animation+"-show").addClass("tooltipster-dying");if(r.options.speed>0)r.$tooltip.delay(r.options.speed);r.$tooltip.queue(s)}else{r.$tooltip.stop().fadeOut(r.options.speed,s)}}else if(r.Status=="hidden"){i()}return r},show:function(e){this._showNow(e);return this},update:function(e){return this.content(e)},content:function(e){if(typeof e==="undefined"){return this.Content}else{this._update(e);return this}},reposition:function(){var n=this;if(e("body").find(n.$tooltip).length!==0){n.$tooltip.css("width","");n.elProxyPosition=n._repositionInfo(n.$elProxy);var r=null,i=e(t).width(),s=n.elProxyPosition,o=n.$tooltip.outerWidth(false),u=n.$tooltip.innerWidth()+1,a=n.$tooltip.outerHeight(false);if(n.$elProxy.is("area")){var f=n.$elProxy.attr("shape"),l=n.$elProxy.parent().attr("name"),c=e('img[usemap="#'+l+'"]'),h=c.offset().left,p=c.offset().top,d=n.$elProxy.attr("coords")!==undefined?n.$elProxy.attr("coords").split(","):undefined;if(f=="circle"){var v=parseInt(d[0]),m=parseInt(d[1]),g=parseInt(d[2]);s.dimension.height=g*2;s.dimension.width=g*2;s.offset.top=p+m-g;s.offset.left=h+v-g}else if(f=="rect"){var v=parseInt(d[0]),m=parseInt(d[1]),y=parseInt(d[2]),b=parseInt(d[3]);s.dimension.height=b-m;s.dimension.width=y-v;s.offset.top=p+m;s.offset.left=h+v}else if(f=="poly"){var w=[],E=[],S=0,x=0,T=0,N=0,C="even";for(var k=0;k<d.length;k++){var L=parseInt(d[k]);if(C=="even"){if(L>T){T=L;if(k===0){S=T}}if(L<S){S=L}C="odd"}else{if(L>N){N=L;if(k==1){x=N}}if(L<x){x=L}C="even"}}s.dimension.height=N-x;s.dimension.width=T-S;s.offset.top=p+x;s.offset.left=h+S}else{s.dimension.height=c.outerHeight(false);s.dimension.width=c.outerWidth(false);s.offset.top=p;s.offset.left=h}}var A=0,O=0,M=0,_=parseInt(n.options.offsetY),D=parseInt(n.options.offsetX),P=n.options.position;function H(){var n=e(t).scrollLeft();if(A-n<0){r=A-n;A=n}if(A+o-n>i){r=A-(i+n-o);A=i+n-o}}function B(n,r){if(s.offset.top-e(t).scrollTop()-a-_-12<0&&r.indexOf("top")>-1){P=n}if(s.offset.top+s.dimension.height+a+12+_>e(t).scrollTop()+e(t).height()&&r.indexOf("bottom")>-1){P=n;M=s.offset.top-a-_-12}}if(P=="top"){var j=s.offset.left+o-(s.offset.left+s.dimension.width);A=s.offset.left+D-j/2;M=s.offset.top-a-_-12;H();B("bottom","top")}if(P=="top-left"){A=s.offset.left+D;M=s.offset.top-a-_-12;H();B("bottom-left","top-left")}if(P=="top-right"){A=s.offset.left+s.dimension.width+D-o;M=s.offset.top-a-_-12;H();B("bottom-right","top-right")}if(P=="bottom"){var j=s.offset.left+o-(s.offset.left+s.dimension.width);A=s.offset.left-j/2+D;M=s.offset.top+s.dimension.height+_+12;H();B("top","bottom")}if(P=="bottom-left"){A=s.offset.left+D;M=s.offset.top+s.dimension.height+_+12;H();B("top-left","bottom-left")}if(P=="bottom-right"){A=s.offset.left+s.dimension.width+D-o;M=s.offset.top+s.dimension.height+_+12;H();B("top-right","bottom-right")}if(P=="left"){A=s.offset.left-D-o-12;O=s.offset.left+D+s.dimension.width+12;var F=s.offset.top+a-(s.offset.top+s.dimension.height);M=s.offset.top-F/2-_;if(A<0&&O+o>i){var I=parseFloat(n.$tooltip.css("border-width"))*2,q=o+A-I;n.$tooltip.css("width",q+"px");a=n.$tooltip.outerHeight(false);A=s.offset.left-D-q-12-I;F=s.offset.top+a-(s.offset.top+s.dimension.height);M=s.offset.top-F/2-_}else if(A<0){A=s.offset.left+D+s.dimension.width+12;r="left"}}if(P=="right"){A=s.offset.left+D+s.dimension.width+12;O=s.offset.left-D-o-12;var F=s.offset.top+a-(s.offset.top+s.dimension.height);M=s.offset.top-F/2-_;if(A+o>i&&O<0){var I=parseFloat(n.$tooltip.css("border-width"))*2,q=i-A-I;n.$tooltip.css("width",q+"px");a=n.$tooltip.outerHeight(false);F=s.offset.top+a-(s.offset.top+s.dimension.height);M=s.offset.top-F/2-_}else if(A+o>i){A=s.offset.left-D-o-12;r="right"}}if(n.options.arrow){var R="tooltipster-arrow-"+P;if(n.options.arrowColor.length<1){var U=n.$tooltip.css("background-color")}else{var U=n.options.arrowColor}if(!r){r=""}else if(r=="left"){R="tooltipster-arrow-right";r=""}else if(r=="right"){R="tooltipster-arrow-left";r=""}else{r="left:"+Math.round(r)+"px;"}if(P=="top"||P=="top-left"||P=="top-right"){var z=parseFloat(n.$tooltip.css("border-bottom-width")),W=n.$tooltip.css("border-bottom-color")}else if(P=="bottom"||P=="bottom-left"||P=="bottom-right"){var z=parseFloat(n.$tooltip.css("border-top-width")),W=n.$tooltip.css("border-top-color")}else if(P=="left"){var z=parseFloat(n.$tooltip.css("border-right-width")),W=n.$tooltip.css("border-right-color")}else if(P=="right"){var z=parseFloat(n.$tooltip.css("border-left-width")),W=n.$tooltip.css("border-left-color")}else{var z=parseFloat(n.$tooltip.css("border-bottom-width")),W=n.$tooltip.css("border-bottom-color")}if(z>1){z++}var X="";if(z!==0){var V="",J="border-color: "+W+";";if(R.indexOf("bottom")!==-1){V="margin-top: -"+Math.round(z)+"px;"}else if(R.indexOf("top")!==-1){V="margin-bottom: -"+Math.round(z)+"px;"}else if(R.indexOf("left")!==-1){V="margin-right: -"+Math.round(z)+"px;"}else if(R.indexOf("right")!==-1){V="margin-left: -"+Math.round(z)+"px;"}X='<span class="tooltipster-arrow-border" style="'+V+" "+J+';"></span>'}n.$tooltip.find(".tooltipster-arrow").remove();var K='<div class="'+R+' tooltipster-arrow" style="'+r+'">'+X+'<span style="border-color:'+U+';"></span></div>';n.$tooltip.append(K)}n.$tooltip.css({top:Math.round(M)+"px",left:Math.round(A)+"px"})}return n},enable:function(){this.enabled=true;return this},disable:function(){this.hide();this.enabled=false;return this},destroy:function(){var t=this;t.hide();if(t.$el[0]!==t.$elProxy[0]){t.$elProxy.remove()}t.$el.removeData(t.namespace).off("."+t.namespace);var n=t.$el.data("tooltipster-ns");if(n.length===1){var r=null;if(t.options.restoration==="previous"){r=t.$el.data("tooltipster-initialTitle")}else if(t.options.restoration==="current"){r=typeof t.Content==="string"?t.Content:e("<div></div>").append(t.Content).html()}if(r){t.$el.attr("title",r)}t.$el.removeClass("tooltipstered").removeData("tooltipster-ns").removeData("tooltipster-initialTitle")}else{n=e.grep(n,function(e,n){return e!==t.namespace});t.$el.data("tooltipster-ns",n)}return t},elementIcon:function(){return this.$el[0]!==this.$elProxy[0]?this.$elProxy[0]:undefined},elementTooltip:function(){return this.$tooltip?this.$tooltip[0]:undefined},option:function(e,t){if(typeof t=="undefined")return this.options[e];else{this.options[e]=t;return this}},status:function(){return this.Status}};e.fn[r]=function(){var t=arguments;if(this.length===0){if(typeof t[0]==="string"){var n=true;switch(t[0]){case"setDefaults":e.extend(i,t[1]);break;default:n=false;break}if(n)return true;else return this}else{return this}}else{if(typeof t[0]==="string"){var r="#*$~&";this.each(function(){var n=e(this).data("tooltipster-ns"),i=n?e(this).data(n[0]):null;if(i){if(typeof i[t[0]]==="function"){var s=i[t[0]](t[1],t[2])}else{throw new Error('Unknown method .tooltipster("'+t[0]+'")')}if(s!==i){r=s;return false}}else{throw new Error("You called Tooltipster's \""+t[0]+'" method on an uninitialized element')}});return r!=="#*$~&"?r:this}else{var o=[],u=t[0]&&typeof t[0].multiple!=="undefined",a=u&&t[0].multiple||!u&&i.multiple,f=t[0]&&typeof t[0].debug!=="undefined",l=f&&t[0].debug||!f&&i.debug;this.each(function(){var n=false,r=e(this).data("tooltipster-ns"),i=null;if(!r){n=true}else if(a){n=true}else if(l){console.log('Tooltipster: one or more tooltips are already attached to this element: ignoring. Use the "multiple" option to attach more tooltips.')}if(n){i=new s(this,t[0]);if(!r)r=[];r.push(i.namespace);e(this).data("tooltipster-ns",r);e(this).data(i.namespace,i)}o.push(i)});if(a)return o;else return this}}};var u=!!("ontouchstart"in t);var a=false;e("body").one("mousemove",function(){a=true})})(jQuery,window,document);


