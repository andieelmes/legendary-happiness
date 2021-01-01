$(function() {
    if (navigator.platform.indexOf('Win') > -1) {
        $('html').addClass('is-windows')
    }

    // scope
    var $sprt_questions = $('.sprt_questions');
    var $sprt_support = $('.sprt_support')
    $sprt_questions.clone().appendTo($sprt_support).addClass('is-copy')

    function createAdaptiveLabels() {
        var $tables = $('.sprt_supportTable')

        $tables.each(function() {
            var $self = $(this);
            var labels = [];

            $self.find('.sprt_supportTable-head .sprt_supportTable-cell').each(function() {
                labels.push($(this).text().trim())
            });

            $self.find('.sprt_supportTable-body .sprt_supportTable-row').each(function() {
                for (i = 0; i < $(this).find('.sprt_supportTable-cell').length; i++) {
                    $(this).find('.sprt_supportTable-cell:eq(' + i + ')').prepend('<div class="is-prepended">' + labels[i] + '</div>')
                }
            })

        })

    }
    createAdaptiveLabels();

    function showHiddenSites() {
        var sitesAreHidden = true;
        var numberOfSites = $('.sprt_supportTable-more').children().length;
        $('.text-link--action').html("еще " + numberOfSites);
        $('.text-link--action').on('click', function(e) {
            e.preventDefault();
            if (sitesAreHidden) {
                $('.sprt_supportTable-more').removeClass('isHidden')
                sitesAreHidden = false;
                $('.text-link--action').html("скрыть " + numberOfSites)
            } else {
                $('.sprt_supportTable-more').addClass('isHidden')
                sitesAreHidden = true;
                $('.text-link--action').html("еще " + numberOfSites)
            }
        })
    }
    showHiddenSites();

    function limitRowsCount() {
        var limit = 3;

        var $tables = $('.sprt_supportTable')
        var tableCount = 0;

        var rowsAreHidden = true;

        $tables.each(function() {
            var $self = $(this);
            var rowsCountToHide = 0;

            $self.attr('data-tableid', tableCount)
            var $rows = $self.find('.sprt_supportTable-body .sprt_supportTable-row')

            $self.find('.sprt_supportTable-body .sprt_supportTable-row').each(function() {

                if ($(this).index() > 2) {
                    $(this).addClass('isHidden')
                    rowsCountToHide++
                }

            });

            if (rowsCountToHide > 0) {
                var toRender = rowsCountToHide > limit
                    ? limit
                    : rowsCountToHide
                $self.after('<a class="supportTable-showMore js-support-showMore" href="#" data-buttonid = "' + tableCount + '">Показать еще <span> ' + toRender + '</span></a > ')
            }

            tableCount++;
        })
        var $showMoreButton = $('.js-support-showMore');
        $showMoreButton.on('click', function(e) {
            e.preventDefault()
            var $self = $(this);
            var id = $(this).attr('data-buttonid');
            var $table = $('[data-tableid="' + id + '"]')
            var $rows = $table.find('.sprt_supportTable-row.isHidden');
            var visibleRowsCount = $table.find('.sprt_supportTable-row').length - $rows.length;

            $rows.each(function() {
                if ($(this).index() - visibleRowsCount < limit) {
                    $(this).removeClass('isHidden')
                }
            })

            var hiddenRowsCount = $table.find('.sprt_supportTable-row.isHidden').length;
            if (hiddenRowsCount > 0) {
                var toRender = hiddenRowsCount > limit
                    ? limit
                    : hiddenRowsCount
                $self.html('Показать еще <span> ' + toRender + '</span>')
            } else {
                $self.remove()
            }
        })

    }
    limitRowsCount()

    function handleChangeSelection() {
        // ?ver=1 — should be in the end ot URL
        var $button = $('.js-support-check-button')
        $('.sUpdate-select input[type="hidden"]').on('change', function() {
            var newHref = ''
            var value = $(this).val();
            var initialHref = $button.attr('href')
            if (initialHref.indexOf('ver=') > -1) {
                var parts = initialHref.split('ver=')
                newHref = parts[0] + 'ver=' + value
            } else {
                newHref = initialHref + '?ver=' + value
            }
            $button.attr('href', newHref)
        })
    }
    handleChangeSelection()

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

    var anims = [false],
        offsets = [],
        classes = '.sThings-item';

    if (!gd) {
        $(classes).addClass('is-ready');
    } else {
        var $cols = $('.third-col'),
            $iboxes = $('.third-imagebox');

        $cols.removeClass('is-ready');
        $cols.removeClass('is-animating');
        $iboxes.addClass('is-animated');
        $cols.addClass('anim');
    }

    function defineOffsets() {
        var wh = $(window).height() * 3 / 4;
        offsets = [5];
    }

    function anim1(sct) {
        if (!gd && !anims[0] && sct >= offsets[0]) {
            anims[0] = true;
            $('.sThings-item').removeClass('is-ready');
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
    });

    $(window).resize(function() {
        defineOffsets();

        if (gd)
            $(classes).removeClass('is-ready');
        }
    )

    // for inner pages
    function showAnswer() {
      var $answerHeader = $('.sAnswer-header')

      $answerHeader.on('click', function(){
        $(this).parents('.sAnswer').toggleClass('is-active')
      })
    }

    showAnswer();

})
