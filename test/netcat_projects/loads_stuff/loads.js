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
            false, false, false
        ],
        offsets = [],
        classes = '.lds_first, .lds_audit-results, .lds_speed';

    if (!gd) {
        $(classes).addClass('is-ready');
    }

    function defineOffsets() {
        var wh = $(window).height() * 3 / 4;
        var last = Math.min($('.lds_speed').offset().top - wh, $('#all').height() - $(window).height());

        offsets = [
            5, $('.lds_audit-results').offset().top - (wh),
            last
        ];
    }

    function anim1(sct) {
        if (!gd && !anims[0] && sct >= offsets[0]) {
            anims[0] = true;
            $('.lds_first').removeClass('is-ready');
        } else
            return;
        }
    ;

    function anim2(sct) {
        if (!gd && !anims[1] && sct >= offsets[1]) {
            anims[1] = true;
            $('.lds_audit-results').removeClass('is-ready');
        } else
            return;
        }
    ;

    function anim3(sct) {
        if (!gd && !anims[2] && sct >= offsets[2]) {
            anims[2] = true;
            $('.lds_speed').removeClass('is-ready');
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
    });

    $(window).resize(function() {
        defineOffsets();

        if (gd)
            $(classes).removeClass('is-ready');
        }
    )

})
