function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
       // Edge (IE 12+) => return version number
       return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}


$(function() {
    $(window).scrollTop(0)
    setTimeout(function(){
        $(window).scrollTop(0)
    }, 100)

    if (navigator.platform.indexOf('Win') > -1) {
        $('html').addClass('is-windows')
    }

    ie = false
    if (detectIE()) {
        ie = true
        $('html').addClass('is-ie')
    }

    // scope

    //copied animations

    // graceful degradation

    var gd = false;
    var minh = false

    function defineGD() {
        gd = $(window).width() <= 800;
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
            false,
            false,
            false,
            false,
            false,
            false
        ],
        offsets = [],
        classes = '.update_first, .update_safety, .update_safety-item:nth-child(1), .update_safety-item:nth-child(2), .update_safety-item:nth-child(3), .update_safety-item:nth-child(4), .update_able, .update_able-items, .update_async, .update_add, .update_reviews, .update_choose';

    if (!gd) {
        $(classes).addClass('is-ready');
        // if (!ie) $('.update_safety').addClass('is-before')
    }
    
    if (gd || ie) {
        $('.update_safety').removeClass('is-before').removeClass('is-after')
    }

    function defineOffsets() {
        var wh = $(window).height() * 4 /5;
        var whh = $(window).height()
        minh = $(window).height() < 570
        var last = Math.min($('.update_choose').offset().top - wh, $('#all').height() - $(window).height());

        var safetyTop = $('.update_safety').offset().top
        
        offsets = [
            5, 
            safetyTop - (wh),
            safetyTop,
            whh + 1 * Math.max(wh, 570) - (minh || ie ? wh : 0),
            whh + 2 * Math.max(wh, 570) - (minh || ie ? 2 * wh : 0),
            whh + 3 * Math.max(wh, 570) - (minh || ie ? 3 * wh : 0),
            $('.update_able').offset().top - (wh),
            $('.update_able-items').offset().top - (wh),
            $('.update_async').offset().top - (wh),
            $('.update_add').offset().top - (wh),
            $('.update_reviews').offset().top - (wh),
            last
        ];
    }
    

    function anim1(sct) {
        if (!gd && !anims[0] && sct >= offsets[0]) {
            anims[0] = true;
            $('.update_first').removeClass('is-ready');
        } else
            return;
        }
    ;

    function anim2(sct) {
        if (!gd && !anims[1] && sct >= offsets[1]) {
            anims[1] = true;
            $('.update_safety').removeClass('is-ready');
        } else
            return;
        }
    ;
    function anim3(sct) {
        if (!gd && !anims[2] && sct >= offsets[2]) {
            anims[2] = true;
            $('.update_safety-item:nth-child(1)').removeClass('is-ready');
        }
    };

    function anim4(sct) {
        if (!gd && !anims[3] && sct >= offsets[3]) {
            anims[3] = true;
            $('.update_safety-item:nth-child(2)').removeClass('is-ready');
        } else
            return;
        }
    ;

    function anim5(sct) {
        if (!gd && !anims[4] && sct >= offsets[4]) {
            anims[4] = true;
            $('.update_safety-item:nth-child(3)').removeClass('is-ready');
        } else
            return;
        }
    ;
    function anim6(sct) {
        if (!gd && !anims[5] && sct >= offsets[5]) {
            anims[5] = true;
            $('.update_safety-item:nth-child(4)').removeClass('is-ready');
        } else
            return;
        }
    ;
    function anim7(sct) {
        if (!gd && !anims[6] && sct >= offsets[6]) {
            anims[6] = true;
            $('.update_able').removeClass('is-ready');
        } else
            return;
        }

    ;
    function anim8(sct) {
        if (!gd && !anims[7] && sct >= offsets[7]) {
            anims[7] = true;
            $('.update_able-items').removeClass('is-ready');
        } else
            return;
        }
       
    ;
      function anim9(sct) {
          
        if (!gd && !anims[8] && sct >= offsets[8]) {
            anims[8] = true;
            $('.update_async').removeClass('is-ready');
        } else
            return;
        }
    ;
      function anim10(sct) {
        if (!gd && !anims[9] && sct >= offsets[9]) {
            anims[9] = true;
            $('.update_add').removeClass('is-ready');
        } else
            return;
        }
    ;
      function anim11(sct) {
        if (!gd && !anims[10] && sct >= offsets[10]) {
            anims[10] = true;
            $('.update_reviews').removeClass('is-ready');
        } else
            return;
        }
    ;
    function anim12(sct) {
        if (!gd && !anims[11] && sct >= offsets[11]) {
            anims[11] = true;
            $('.update_choose').removeClass('is-ready');
        } else
            return;
        }
    ;


    function animSafety(sct) {
        if (sct >= offsets[2] && sct < offsets[3]) {
            $('.update_safety-item:nth-child(1)').removeClass('is-before').removeClass('is-after')
            $('.update_safety-item:nth-child(2), .update_safety-item:nth-child(3), .update_safety-item:nth-child(4)').addClass('is-before').removeClass('is-after')
        }
        else if (sct >= offsets[3] && sct < offsets[4]) {
            $('.update_safety-item:nth-child(1)').addClass('is-after').removeClass('is-before')
            $('.update_safety-item:nth-child(2)').removeClass('is-before').removeClass('is-after')
            $('.update_safety-item:nth-child(3), .update_safety-item:nth-child(4)').addClass('is-before').removeClass('is-after')
        }
        else if (sct >= offsets[4] && sct < offsets[5]) {
            $('.update_safety-item:nth-child(2), .update_safety-item:nth-child(1)').addClass('is-after').removeClass('is-before')
            $('.update_safety-item:nth-child(3)').removeClass('is-before').removeClass('is-after')
            $('.update_safety-item:nth-child(4)').addClass('is-before').removeClass('is-after')
        }
        else if (sct >= offsets[5] && sct < offsets[6]) {
            $('.update_safety-item:nth-child(3), .update_safety-item:nth-child(2), .update_safety-item:nth-child(1)').addClass('is-after').removeClass('is-before')
            $('.update_safety-item:nth-child(4)').removeClass('is-before').removeClass('is-after')
        }
        else if (sct >= offsets[6]) {
            $('.update_safety-item').removeClass('is-before')
            $('.update_safety-item:nth-child(3), .update_safety-item:nth-child(2), .update_safety-item:nth-child(1)').addClass('is-after')
        }
        else if (sct < offsets[2]) {
            $('.update_safety-item').removeClass('is-after')
            $('.update_safety-item:nth-child(2), .update_safety-item:nth-child(3), .update_safety-item:nth-child(4)').addClass('is-before')
        }
    }


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
        anim8(sct);
        anim9(sct);
        anim10(sct);
        anim11(sct);
        anim12(sct);
        if (!ie) animSafety(sct)
    });

    $(window).resize(function() {
        defineOffsets();
        // if (!ie) animSafety($(window).scrollTop())

        if (gd) {
            $(classes).removeClass('is-ready');
            $('.update_safety-item').removeClass('is-before').removeClass('is-after')
        }
        }
    )


    // go to the next slide

    var $arrowBtn = $('.update_first-go')
    var $nextSlide = $('.update_safety')

    $arrowBtn.on('click', function(e){
        e.preventDefault();
        $("body, html").animate({
            scrollTop: $nextSlide.offset().top
        }, 500);
    })

    //fotorama

     $(function () {
    // 1. Initialize fotorama manually.
    var $fotoramaDiv = $('.fotorama').fotorama();

    // 2. Get the API object.
    var fotorama = $fotoramaDiv.data('fotorama');

    //get the tallest review
    var height = $('.update_reviews-item').height()

    $(function () {
    $('.fotorama')
        // Listen to the events
        .on(
            'fotorama:showend',
            function (e, fotorama, extra) {
                var height =  $(fotorama.activeFrame.html).outerHeight()
                fotorama.resize({            
                    height: height                   
                }, 300);
            }
        )
        // Initialize fotorama manually
        .fotorama();
        fotorama.show(1);
        fotorama.show(0);

        var waitForFinalEvent = (function () {
        var timers = {};
        return function (callback, ms, uniqueId) {
            if (!uniqueId) uniqueId = "Don't call this twice without a uniqueId";
            if (timers[uniqueId]) clearTimeout (timers[uniqueId]);
            timers[uniqueId] = setTimeout(callback, ms);
        };
        })();

        $(window).resize(function () {
        waitForFinalEvent(function(){
            fotorama.show('<');
            fotorama.show('>');
        }, 500, "some unique string");
        });

  });


});

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

})
