$(function() {
    if (navigator.platform.indexOf('Win') > -1) {
        $('html').addClass('is-windows')
    }

    // scope

    //copied animations

    // graceful degradation

    var gd = false;

    function defineGD() {
        gd = $(window).width() <= 960;
        if (gd)
            $('html').addClass('is-gd');
        else
            $('html').removeClass('is-gd');
        }
    ;

    defineGD();
    $(window).resize(function() {
        defineGD()
    });

    // animations

    var anims = [
            false,
            false,
            false,
            false,
            false,
            false,
            false
        ],
        offsets = [],
        classes = '.portf_first, .portf_history-main, .portf_history-items, .portf_history-buttons, .portf_stores, .portf_corp, .portf_social';

    if (!gd) {
        $(classes).addClass('is-ready');
    }

    function defineOffsets() {
        var wh = $(window).height() * 3 / 4;
        var last = Math.min($('.portf_social').offset().top - wh, $('#all').height() - $(window).height());

        offsets = [
            5, $('.portf_history-main').offset().top - (wh),
            $('.portf_history-items').offset().top - (wh),
            $('.portf_history-buttons').offset().top - (wh),
            $('.portf_stores').offset().top - (wh),
            $('.portf_corp').offset().top - (wh),
            last
        ];
    }

    function anim1(sct) {
        if (!gd && !anims[0] && sct >= offsets[0]) {
            anims[0] = true;
            $('.portf_first').removeClass('is-ready');
        } else
            return;
        }
    ;

    function anim2(sct) {
        if (!gd && !anims[1] && sct >= offsets[1]) {
            anims[1] = true;
            $('.portf_history-main').removeClass('is-ready');
        } else
            return;
        }
    ;
    function anim3(sct) {
        if (!gd && !anims[2] && sct >= offsets[2]) {
            anims[2] = true;
            $('.portf_history-items').removeClass('is-ready');
        } else
            return;
        }
    ;
    function anim4(sct) {
        if (!gd && !anims[3] && sct >= offsets[3]) {
            anims[3] = true;
            $('.portf_history-buttons').removeClass('is-ready');
        } else
            return;
        }
    ;

    function anim5(sct) {
        if (!gd && !anims[4] && sct >= offsets[4]) {
            anims[4] = true;
            $('.portf_stores').removeClass('is-ready');
        } else
            return;
        }
    ;
    function anim6(sct) {
        if (!gd && !anims[5] && sct >= offsets[5]) {
            anims[5] = true;
            $('.portf_corp').removeClass('is-ready');
        } else
            return;
        }
    ;
    function anim7(sct) {
        if (!gd && !anims[6] && sct >= offsets[6]) {
            anims[6] = true;
            $('.portf_social').removeClass('is-ready');
        } else
            return;
        }
    ;

    defineOffsets();

    setTimeout(function() {
        anim1(6);
    }, 500);

    $(window).scroll(function() {
        var sct = $(this).scrollTop();
        anim1(sct);
        anim2(sct);
        anim3(sct);
        anim4(sct);
        anim5(sct);
        anim6(sct);
        anim7(sct);

    });

    $(window).resize(function() {
        defineOffsets();

        if (gd)
            $(classes).removeClass('is-ready');
        }
    )

    // fotorama custom arrows
    var fotorama = $('.fotorama').data('fotorama');
    var arrowLeft = $('.portf_first-arrow--left');
    var arrowRight = $('.portf_first-arrow--right');

    arrowLeft.click(function() {
        fotorama.show('<')
    })

    arrowRight.click(function() {
        fotorama.show('>')
    })

    //cases opening

    var $all = $('.portf_history-showMore'),
        $btn = $('.portf_history .js-show-all'),
        $topHistory = $('.portf_history'),
        $showMoreHistory = $('.portf_history-showMore')

    $btn.on('click', function(e) {
        var whereToScroll;
        e.preventDefault();
        $all.toggleClass('is-active');
        $btn.toggleClass('is-active');

        if ($all.hasClass('is-active')) {
            whereToScroll = $topHistory
        } else {
            whereToScroll = $showMoreHistory
        }
        $("body, html").animate({
            scrollTop: $(whereToScroll).offset().top
        }, 600);

    });

    //show more stores
    var $showMoreButton_stores = $('.portf_stores .js-show-all');
    var $showMoreButtonArea_stores = $('.portf_stores .js-show-all').closest('.portf_project-buttons')
    var $showLessButton_stores = $('.portf_stores .portf_project-showLess');
    var $projectsShowMore_stores = $('.portf_stores .portf_project-showMore')
    var $stores = $('.portf_stores')
    var $dataURL_stores = $stores.attr("dataURL")

    //show more corp

    var $showMoreButton_corp = $('.portf_corp .js-show-all');
    var $showMoreButtonArea_corp = $('.portf_corp .js-show-all').closest('.portf_project-buttons')
    var $showLessButton_corp = $('.portf_corp .portf_project-showLess');
    var $projectsShowMore_corp = $('.portf_corp .portf_project-showMore')
    var $corp = $('.portf_corp')
    var $dataURL_corp = $corp.attr("dataURL")

    //show more social

    var $showMoreButton_social = $('.portf_social .js-show-all');
    var $showMoreButtonArea_social = $('.portf_social .js-show-all').closest('.portf_project-buttons')
    var $showLessButton_social = $('.portf_social .portf_project-showLess');
    var $projectsShowMore_social = $('.portf_social .portf_project-showMore')
    var $social = $('.portf_social')
    var $dataURL_social = $social.attr("dataURL")

    function showMoreSites(showMoreButton, showMoreButtonArea, showLessButton, projectsShowMore, parentElement, dataURL) {
        var state = {
            clickCount: 0,
            hiddenCount: 0
        }
        var maxClicks = 4;

        showMoreButton.on('click', function(e) {

            if (state.clickCount >= maxClicks) {
                showMoreButton.addClass('is-hidden')
                showMoreButtonArea.addClass('is-hidden')
                showLessButton.addClass('is-single')
            } else {

                showLessButton.removeClass('is-single')
            }

            state.clickCount++;
            e.preventDefault();
            var toScroll = $(showMoreButton).offset().top

            if (state.hiddenCount) {
                for (var i = 0; i < 3; i++) {
                    projectsShowMore.find('.is-hidden:first').removeClass('is-hidden')
                }
                state.hiddenCount--;

            } else {
                // TODO: add AJAX request to dataURL, and append HTML-response to page like this:
                projectsShowMore.append('<a href="#" class="portf_project-item"><div class="portf_project-picture"><div class="portf_project-wrapper"><img class="portf_project-image" src="portfolio_stuff/social.png"/></div></div><div class="portf_project-caption"><div class="portf_project-name">Оптовые поставки ТД «Калинов Мост»</div><div class="portf_project-copy">Создан <span href="#" class="portf_link portf_project-link">Super Studio Web</span></div></div></a><a href="#" class="portf_project-item"><div class="portf_project-picture"><div class="portf_project-wrapper"><img class="portf_project-image" src="portfolio_stuff/social.png"/></div></div><div class="portf_project-caption"><div class="portf_project-name">Оптовые поставки ТД «Калинов Мост»</div><div class="portf_project-copy">Создан <span href="#" class="portf_link portf_project-link">Super Studio Web</span></div></div></a><a href="#" class="portf_project-item"><div class="portf_project-picture"><div class="portf_project-wrapper"><img class="portf_project-image" src="portfolio_stuff/social.png"/></div></div><div class="portf_project-caption"><div class="portf_project-name">Кратко</div><div class="portf_project-copy">Создан <span href="#" class="portf_link portf_project-link">Super Studio Web</span></div></div></a>')
                equalHeights()
            }

            $("body, html").animate({
                scrollTop: toScroll
            }, 600);

            showLessButton.removeClass('is-hidden')
        })
        showLessButton.on('click', function(e) {
            state.clickCount = 0;
            state.hiddenCount = projectsShowMore.children().length / 3;

            e.preventDefault();

            projectsShowMore.children().addClass('is-hidden')
            showLessButton.addClass('is-hidden')
            showMoreButtonArea.removeClass('is-hidden')
            showMoreButton.removeClass('is-hidden')

            var toScroll = $(parentElement).offset().top;

            $("body, html").animate({
                scrollTop: toScroll
            }, 600);
        })

    }

    showMoreSites($showMoreButton_stores, $showMoreButtonArea_stores, $showLessButton_stores, $projectsShowMore_stores, $stores, $dataURL_stores);
    showMoreSites($showMoreButton_corp, $showMoreButtonArea_corp, $showLessButton_corp, $projectsShowMore_corp, $corp, $dataURL_corp);
    showMoreSites($showMoreButton_social, $showMoreButtonArea_social, $showLessButton_social, $projectsShowMore_social, $social, $dataURL_social)

    // detect IE and Edge

    function detectIEAndEdge() {
        var ua = window.navigator.userAgent;

        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            $('html').addClass('is-ieOrEdge')
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            $('html').addClass('is-ieOrEdge')
        }

        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            $('html').addClass('is-ieOrEdge')
        }

        // other browser
        return false;
    }

    detectIEAndEdge();

    //making sites height the same on one row

    function equalHeights() {
        var $projectItems = $('.portf_project-item')
        $projectItems.each(function() {
            $(this).removeAttr('style')
        })

        function changeHeight(index, element) {
            if (index % 3 === 0) {
                var set = [$(element), $(element).next(), $(element).next().next()]

                var height = []
                $.each(set, function(i, el) {
                    height.push($(el).height())
                })

                var max = Math.max.apply(null, height)
                set.forEach(function(element) {
                    element.height(max)
                })

            }

        };
        $projectItems.each(changeHeight)
    }
    equalHeights();

    $(window).resize(function() {
        equalHeights()
    })

})
