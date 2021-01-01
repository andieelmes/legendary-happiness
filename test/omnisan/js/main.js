"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (a) {
	"use strict";
	"function" == typeof define && define.amd ? define(["jquery"], a) : "undefined" != typeof exports ? module.exports = a(require("jquery")) : a(jQuery);
}(function (a) {
	"use strict";
	var b = window.Slick || {};b = function () {
		function c(c, d) {
			var f,
			    e = this;e.defaults = { accessibility: !0, adaptiveHeight: !1, appendArrows: a(c), appendDots: a(c), arrows: !0, asNavFor: null, prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>', nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>', autoplay: !1, autoplaySpeed: 3e3, centerMode: !1, centerPadding: "50px", cssEase: "ease", customPaging: function customPaging(b, c) {
					return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c + 1);
				}, dots: !1, dotsClass: "slick-dots", draggable: !0, easing: "linear", edgeFriction: .35, fade: !1, focusOnSelect: !1, infinite: !0, initialSlide: 0, lazyLoad: "ondemand", mobileFirst: !1, pauseOnHover: !0, pauseOnFocus: !0, pauseOnDotsHover: !1, respondTo: "window", responsive: null, rows: 1, rtl: !1, slide: "", slidesPerRow: 1, slidesToShow: 1, slidesToScroll: 1, speed: 500, swipe: !0, swipeToSlide: !1, touchMove: !0, touchThreshold: 5, useCSS: !0, useTransform: !0, variableWidth: !1, vertical: !1, verticalSwiping: !1, waitForAnimate: !0, zIndex: 1e3 }, e.initials = { animating: !1, dragging: !1, autoPlayTimer: null, currentDirection: 0, currentLeft: null, currentSlide: 0, direction: 1, $dots: null, listWidth: null, listHeight: null, loadIndex: 0, $nextArrow: null, $prevArrow: null, slideCount: null, slideWidth: null, $slideTrack: null, $slides: null, sliding: !1, slideOffset: 0, swipeLeft: null, $list: null, touchObject: {}, transformsEnabled: !1, unslicked: !1 }, a.extend(e, e.initials), e.activeBreakpoint = null, e.animType = null, e.animProp = null, e.breakpoints = [], e.breakpointSettings = [], e.cssTransitions = !1, e.focussed = !1, e.interrupted = !1, e.hidden = "hidden", e.paused = !0, e.positionProp = null, e.respondTo = null, e.rowCount = 1, e.shouldClick = !0, e.$slider = a(c), e.$slidesCache = null, e.transformType = null, e.transitionType = null, e.visibilityChange = "visibilitychange", e.windowWidth = 0, e.windowTimer = null, f = a(c).data("slick") || {}, e.options = a.extend({}, e.defaults, d, f), e.currentSlide = e.options.initialSlide, e.originalSettings = e.options, "undefined" != typeof document.mozHidden ? (e.hidden = "mozHidden", e.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (e.hidden = "webkitHidden", e.visibilityChange = "webkitvisibilitychange"), e.autoPlay = a.proxy(e.autoPlay, e), e.autoPlayClear = a.proxy(e.autoPlayClear, e), e.autoPlayIterator = a.proxy(e.autoPlayIterator, e), e.changeSlide = a.proxy(e.changeSlide, e), e.clickHandler = a.proxy(e.clickHandler, e), e.selectHandler = a.proxy(e.selectHandler, e), e.setPosition = a.proxy(e.setPosition, e), e.swipeHandler = a.proxy(e.swipeHandler, e), e.dragHandler = a.proxy(e.dragHandler, e), e.keyHandler = a.proxy(e.keyHandler, e), e.instanceUid = b++, e.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, e.registerBreakpoints(), e.init(!0);
		}var b = 0;return c;
	}(), b.prototype.activateADA = function () {
		var a = this;a.$slideTrack.find(".slick-active").attr({ "aria-hidden": "false" }).find("a, input, button, select").attr({ tabindex: "0" });
	}, b.prototype.addSlide = b.prototype.slickAdd = function (b, c, d) {
		var e = this;if ("boolean" == typeof c) d = c, c = null;else if (0 > c || c >= e.slideCount) return !1;e.unload(), "number" == typeof c ? 0 === c && 0 === e.$slides.length ? a(b).appendTo(e.$slideTrack) : d ? a(b).insertBefore(e.$slides.eq(c)) : a(b).insertAfter(e.$slides.eq(c)) : d === !0 ? a(b).prependTo(e.$slideTrack) : a(b).appendTo(e.$slideTrack), e.$slides = e.$slideTrack.children(this.options.slide), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.append(e.$slides), e.$slides.each(function (b, c) {
			a(c).attr("data-slick-index", b);
		}), e.$slidesCache = e.$slides, e.reinit();
	}, b.prototype.animateHeight = function () {
		var a = this;if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
			var b = a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.animate({ height: b }, a.options.speed);
		}
	}, b.prototype.animateSlide = function (b, c) {
		var d = {},
		    e = this;e.animateHeight(), e.options.rtl === !0 && e.options.vertical === !1 && (b = -b), e.transformsEnabled === !1 ? e.options.vertical === !1 ? e.$slideTrack.animate({ left: b }, e.options.speed, e.options.easing, c) : e.$slideTrack.animate({ top: b }, e.options.speed, e.options.easing, c) : e.cssTransitions === !1 ? (e.options.rtl === !0 && (e.currentLeft = -e.currentLeft), a({ animStart: e.currentLeft }).animate({ animStart: b }, { duration: e.options.speed, easing: e.options.easing, step: function step(a) {
				a = Math.ceil(a), e.options.vertical === !1 ? (d[e.animType] = "translate(" + a + "px, 0px)", e.$slideTrack.css(d)) : (d[e.animType] = "translate(0px," + a + "px)", e.$slideTrack.css(d));
			}, complete: function complete() {
				c && c.call();
			} })) : (e.applyTransition(), b = Math.ceil(b), e.options.vertical === !1 ? d[e.animType] = "translate3d(" + b + "px, 0px, 0px)" : d[e.animType] = "translate3d(0px," + b + "px, 0px)", e.$slideTrack.css(d), c && setTimeout(function () {
			e.disableTransition(), c.call();
		}, e.options.speed));
	}, b.prototype.getNavTarget = function () {
		var b = this,
		    c = b.options.asNavFor;return c && null !== c && (c = a(c).not(b.$slider)), c;
	}, b.prototype.asNavFor = function (b) {
		var c = this,
		    d = c.getNavTarget();null !== d && "object" == (typeof d === "undefined" ? "undefined" : _typeof(d)) && d.each(function () {
			var c = a(this).slick("getSlick");c.unslicked || c.slideHandler(b, !0);
		});
	}, b.prototype.applyTransition = function (a) {
		var b = this,
		    c = {};b.options.fade === !1 ? c[b.transitionType] = b.transformType + " " + b.options.speed + "ms " + b.options.cssEase : c[b.transitionType] = "opacity " + b.options.speed + "ms " + b.options.cssEase, b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c);
	}, b.prototype.autoPlay = function () {
		var a = this;a.autoPlayClear(), a.slideCount > a.options.slidesToShow && (a.autoPlayTimer = setInterval(a.autoPlayIterator, a.options.autoplaySpeed));
	}, b.prototype.autoPlayClear = function () {
		var a = this;a.autoPlayTimer && clearInterval(a.autoPlayTimer);
	}, b.prototype.autoPlayIterator = function () {
		var a = this,
		    b = a.currentSlide + a.options.slidesToScroll;a.paused || a.interrupted || a.focussed || (a.options.infinite === !1 && (1 === a.direction && a.currentSlide + 1 === a.slideCount - 1 ? a.direction = 0 : 0 === a.direction && (b = a.currentSlide - a.options.slidesToScroll, a.currentSlide - 1 === 0 && (a.direction = 1))), a.slideHandler(b));
	}, b.prototype.buildArrows = function () {
		var b = this;b.options.arrows === !0 && (b.$prevArrow = a(b.options.prevArrow).addClass("slick-arrow"), b.$nextArrow = a(b.options.nextArrow).addClass("slick-arrow"), b.slideCount > b.options.slidesToShow ? (b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.prependTo(b.options.appendArrows), b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.appendTo(b.options.appendArrows), b.options.infinite !== !0 && b.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({ "aria-disabled": "true", tabindex: "-1" }));
	}, b.prototype.buildDots = function () {
		var c,
		    d,
		    b = this;if (b.options.dots === !0 && b.slideCount > b.options.slidesToShow) {
			for (b.$slider.addClass("slick-dotted"), d = a("<ul />").addClass(b.options.dotsClass), c = 0; c <= b.getDotCount(); c += 1) {
				d.append(a("<li />").append(b.options.customPaging.call(this, b, c)));
			}b.$dots = d.appendTo(b.options.appendDots), b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false");
		}
	}, b.prototype.buildOut = function () {
		var b = this;b.$slides = b.$slider.children(b.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), b.slideCount = b.$slides.length, b.$slides.each(function (b, c) {
			a(c).attr("data-slick-index", b).data("originalStyling", a(c).attr("style") || "");
		}), b.$slider.addClass("slick-slider"), b.$slideTrack = 0 === b.slideCount ? a('<div class="slick-track"/>').appendTo(b.$slider) : b.$slides.wrapAll('<div class="slick-track"/>').parent(), b.$list = b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), b.$slideTrack.css("opacity", 0), (b.options.centerMode === !0 || b.options.swipeToSlide === !0) && (b.options.slidesToScroll = 1), a("img[data-lazy]", b.$slider).not("[src]").addClass("slick-loading"), b.setupInfinite(), b.buildArrows(), b.buildDots(), b.updateDots(), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.options.draggable === !0 && b.$list.addClass("draggable");
	}, b.prototype.buildRows = function () {
		var b,
		    c,
		    d,
		    e,
		    f,
		    g,
		    h,
		    a = this;if (e = document.createDocumentFragment(), g = a.$slider.children(), a.options.rows > 1) {
			for (h = a.options.slidesPerRow * a.options.rows, f = Math.ceil(g.length / h), b = 0; f > b; b++) {
				var i = document.createElement("div");for (c = 0; c < a.options.rows; c++) {
					var j = document.createElement("div");for (d = 0; d < a.options.slidesPerRow; d++) {
						var k = b * h + (c * a.options.slidesPerRow + d);g.get(k) && j.appendChild(g.get(k));
					}i.appendChild(j);
				}e.appendChild(i);
			}a.$slider.empty().append(e), a.$slider.children().children().children().css({ width: 100 / a.options.slidesPerRow + "%", display: "inline-block" });
		}
	}, b.prototype.checkResponsive = function (b, c) {
		var e,
		    f,
		    g,
		    d = this,
		    h = !1,
		    i = d.$slider.width(),
		    j = window.innerWidth || a(window).width();if ("window" === d.respondTo ? g = j : "slider" === d.respondTo ? g = i : "min" === d.respondTo && (g = Math.min(j, i)), d.options.responsive && d.options.responsive.length && null !== d.options.responsive) {
			f = null;for (e in d.breakpoints) {
				d.breakpoints.hasOwnProperty(e) && (d.originalSettings.mobileFirst === !1 ? g < d.breakpoints[e] && (f = d.breakpoints[e]) : g > d.breakpoints[e] && (f = d.breakpoints[e]));
			}null !== f ? null !== d.activeBreakpoint ? (f !== d.activeBreakpoint || c) && (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : null !== d.activeBreakpoint && (d.activeBreakpoint = null, d.options = d.originalSettings, b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b), h = f), b || h === !1 || d.$slider.trigger("breakpoint", [d, h]);
		}
	}, b.prototype.changeSlide = function (b, c) {
		var f,
		    g,
		    h,
		    d = this,
		    e = a(b.currentTarget);switch (e.is("a") && b.preventDefault(), e.is("li") || (e = e.closest("li")), h = d.slideCount % d.options.slidesToScroll !== 0, f = h ? 0 : (d.slideCount - d.currentSlide) % d.options.slidesToScroll, b.data.message) {case "previous":
				g = 0 === f ? d.options.slidesToScroll : d.options.slidesToShow - f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide - g, !1, c);break;case "next":
				g = 0 === f ? d.options.slidesToScroll : f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide + g, !1, c);break;case "index":
				var i = 0 === b.data.index ? 0 : b.data.index || e.index() * d.options.slidesToScroll;d.slideHandler(d.checkNavigable(i), !1, c), e.children().trigger("focus");break;default:
				return;}
	}, b.prototype.checkNavigable = function (a) {
		var c,
		    d,
		    b = this;if (c = b.getNavigableIndexes(), d = 0, a > c[c.length - 1]) a = c[c.length - 1];else for (var e in c) {
			if (a < c[e]) {
				a = d;break;
			}d = c[e];
		}return a;
	}, b.prototype.cleanUpEvents = function () {
		var b = this;b.options.dots && null !== b.$dots && a("li", b.$dots).off("click.slick", b.changeSlide).off("mouseenter.slick", a.proxy(b.interrupt, b, !0)).off("mouseleave.slick", a.proxy(b.interrupt, b, !1)), b.$slider.off("focus.slick blur.slick"), b.options.arrows === !0 && b.slideCount > b.options.slidesToShow && (b.$prevArrow && b.$prevArrow.off("click.slick", b.changeSlide), b.$nextArrow && b.$nextArrow.off("click.slick", b.changeSlide)), b.$list.off("touchstart.slick mousedown.slick", b.swipeHandler), b.$list.off("touchmove.slick mousemove.slick", b.swipeHandler), b.$list.off("touchend.slick mouseup.slick", b.swipeHandler), b.$list.off("touchcancel.slick mouseleave.slick", b.swipeHandler), b.$list.off("click.slick", b.clickHandler), a(document).off(b.visibilityChange, b.visibility), b.cleanUpSlideEvents(), b.options.accessibility === !0 && b.$list.off("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().off("click.slick", b.selectHandler), a(window).off("orientationchange.slick.slick-" + b.instanceUid, b.orientationChange), a(window).off("resize.slick.slick-" + b.instanceUid, b.resize), a("[draggable!=true]", b.$slideTrack).off("dragstart", b.preventDefault), a(window).off("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).off("ready.slick.slick-" + b.instanceUid, b.setPosition);
	}, b.prototype.cleanUpSlideEvents = function () {
		var b = this;b.$list.off("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.off("mouseleave.slick", a.proxy(b.interrupt, b, !1));
	}, b.prototype.cleanUpRows = function () {
		var b,
		    a = this;a.options.rows > 1 && (b = a.$slides.children().children(), b.removeAttr("style"), a.$slider.empty().append(b));
	}, b.prototype.clickHandler = function (a) {
		var b = this;b.shouldClick === !1 && (a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault());
	}, b.prototype.destroy = function (b) {
		var c = this;c.autoPlayClear(), c.touchObject = {}, c.cleanUpEvents(), a(".slick-cloned", c.$slider).detach(), c.$dots && c.$dots.remove(), c.$prevArrow && c.$prevArrow.length && (c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.prevArrow) && c.$prevArrow.remove()), c.$nextArrow && c.$nextArrow.length && (c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.nextArrow) && c.$nextArrow.remove()), c.$slides && (c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
			a(this).attr("style", a(this).data("originalStyling"));
		}), c.$slideTrack.children(this.options.slide).detach(), c.$slideTrack.detach(), c.$list.detach(), c.$slider.append(c.$slides)), c.cleanUpRows(), c.$slider.removeClass("slick-slider"), c.$slider.removeClass("slick-initialized"), c.$slider.removeClass("slick-dotted"), c.unslicked = !0, b || c.$slider.trigger("destroy", [c]);
	}, b.prototype.disableTransition = function (a) {
		var b = this,
		    c = {};c[b.transitionType] = "", b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c);
	}, b.prototype.fadeSlide = function (a, b) {
		var c = this;c.cssTransitions === !1 ? (c.$slides.eq(a).css({ zIndex: c.options.zIndex }), c.$slides.eq(a).animate({ opacity: 1 }, c.options.speed, c.options.easing, b)) : (c.applyTransition(a), c.$slides.eq(a).css({ opacity: 1, zIndex: c.options.zIndex }), b && setTimeout(function () {
			c.disableTransition(a), b.call();
		}, c.options.speed));
	}, b.prototype.fadeSlideOut = function (a) {
		var b = this;b.cssTransitions === !1 ? b.$slides.eq(a).animate({ opacity: 0, zIndex: b.options.zIndex - 2 }, b.options.speed, b.options.easing) : (b.applyTransition(a), b.$slides.eq(a).css({ opacity: 0, zIndex: b.options.zIndex - 2 }));
	}, b.prototype.filterSlides = b.prototype.slickFilter = function (a) {
		var b = this;null !== a && (b.$slidesCache = b.$slides, b.unload(), b.$slideTrack.children(this.options.slide).detach(), b.$slidesCache.filter(a).appendTo(b.$slideTrack), b.reinit());
	}, b.prototype.focusHandler = function () {
		var b = this;b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function (c) {
			c.stopImmediatePropagation();var d = a(this);setTimeout(function () {
				b.options.pauseOnFocus && (b.focussed = d.is(":focus"), b.autoPlay());
			}, 0);
		});
	}, b.prototype.getCurrent = b.prototype.slickCurrentSlide = function () {
		var a = this;return a.currentSlide;
	}, b.prototype.getDotCount = function () {
		var a = this,
		    b = 0,
		    c = 0,
		    d = 0;if (a.options.infinite === !0) for (; b < a.slideCount;) {
			++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
		} else if (a.options.centerMode === !0) d = a.slideCount;else if (a.options.asNavFor) for (; b < a.slideCount;) {
			++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
		} else d = 1 + Math.ceil((a.slideCount - a.options.slidesToShow) / a.options.slidesToScroll);return d - 1;
	}, b.prototype.getLeft = function (a) {
		var c,
		    d,
		    f,
		    b = this,
		    e = 0;return b.slideOffset = 0, d = b.$slides.first().outerHeight(!0), b.options.infinite === !0 ? (b.slideCount > b.options.slidesToShow && (b.slideOffset = b.slideWidth * b.options.slidesToShow * -1, e = d * b.options.slidesToShow * -1), b.slideCount % b.options.slidesToScroll !== 0 && a + b.options.slidesToScroll > b.slideCount && b.slideCount > b.options.slidesToShow && (a > b.slideCount ? (b.slideOffset = (b.options.slidesToShow - (a - b.slideCount)) * b.slideWidth * -1, e = (b.options.slidesToShow - (a - b.slideCount)) * d * -1) : (b.slideOffset = b.slideCount % b.options.slidesToScroll * b.slideWidth * -1, e = b.slideCount % b.options.slidesToScroll * d * -1))) : a + b.options.slidesToShow > b.slideCount && (b.slideOffset = (a + b.options.slidesToShow - b.slideCount) * b.slideWidth, e = (a + b.options.slidesToShow - b.slideCount) * d), b.slideCount <= b.options.slidesToShow && (b.slideOffset = 0, e = 0), b.options.centerMode === !0 && b.options.infinite === !0 ? b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2) - b.slideWidth : b.options.centerMode === !0 && (b.slideOffset = 0, b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2)), c = b.options.vertical === !1 ? a * b.slideWidth * -1 + b.slideOffset : a * d * -1 + e, b.options.variableWidth === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow), c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0, b.options.centerMode === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow + 1), c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0, c += (b.$list.width() - f.outerWidth()) / 2)), c;
	}, b.prototype.getOption = b.prototype.slickGetOption = function (a) {
		var b = this;return b.options[a];
	}, b.prototype.getNavigableIndexes = function () {
		var e,
		    a = this,
		    b = 0,
		    c = 0,
		    d = [];for (a.options.infinite === !1 ? e = a.slideCount : (b = -1 * a.options.slidesToScroll, c = -1 * a.options.slidesToScroll, e = 2 * a.slideCount); e > b;) {
			d.push(b), b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
		}return d;
	}, b.prototype.getSlick = function () {
		return this;
	}, b.prototype.getSlideCount = function () {
		var c,
		    d,
		    e,
		    b = this;return e = b.options.centerMode === !0 ? b.slideWidth * Math.floor(b.options.slidesToShow / 2) : 0, b.options.swipeToSlide === !0 ? (b.$slideTrack.find(".slick-slide").each(function (c, f) {
			return f.offsetLeft - e + a(f).outerWidth() / 2 > -1 * b.swipeLeft ? (d = f, !1) : void 0;
		}), c = Math.abs(a(d).attr("data-slick-index") - b.currentSlide) || 1) : b.options.slidesToScroll;
	}, b.prototype.goTo = b.prototype.slickGoTo = function (a, b) {
		var c = this;c.changeSlide({ data: { message: "index", index: parseInt(a) } }, b);
	}, b.prototype.init = function (b) {
		var c = this;a(c.$slider).hasClass("slick-initialized") || (a(c.$slider).addClass("slick-initialized"), c.buildRows(), c.buildOut(), c.setProps(), c.startLoad(), c.loadSlider(), c.initializeEvents(), c.updateArrows(), c.updateDots(), c.checkResponsive(!0), c.focusHandler()), b && c.$slider.trigger("init", [c]), c.options.accessibility === !0 && c.initADA(), c.options.autoplay && (c.paused = !1, c.autoPlay());
	}, b.prototype.initADA = function () {
		var b = this;b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({ "aria-hidden": "true", tabindex: "-1" }).find("a, input, button, select").attr({ tabindex: "-1" }), b.$slideTrack.attr("role", "listbox"), b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function (c) {
			a(this).attr({ role: "option", "aria-describedby": "slick-slide" + b.instanceUid + c });
		}), null !== b.$dots && b.$dots.attr("role", "tablist").find("li").each(function (c) {
			a(this).attr({ role: "presentation", "aria-selected": "false", "aria-controls": "navigation" + b.instanceUid + c, id: "slick-slide" + b.instanceUid + c });
		}).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), b.activateADA();
	}, b.prototype.initArrowEvents = function () {
		var a = this;a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.off("click.slick").on("click.slick", { message: "previous" }, a.changeSlide), a.$nextArrow.off("click.slick").on("click.slick", { message: "next" }, a.changeSlide));
	}, b.prototype.initDotEvents = function () {
		var b = this;b.options.dots === !0 && b.slideCount > b.options.slidesToShow && a("li", b.$dots).on("click.slick", { message: "index" }, b.changeSlide), b.options.dots === !0 && b.options.pauseOnDotsHover === !0 && a("li", b.$dots).on("mouseenter.slick", a.proxy(b.interrupt, b, !0)).on("mouseleave.slick", a.proxy(b.interrupt, b, !1));
	}, b.prototype.initSlideEvents = function () {
		var b = this;b.options.pauseOnHover && (b.$list.on("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.on("mouseleave.slick", a.proxy(b.interrupt, b, !1)));
	}, b.prototype.initializeEvents = function () {
		var b = this;b.initArrowEvents(), b.initDotEvents(), b.initSlideEvents(), b.$list.on("touchstart.slick mousedown.slick", { action: "start" }, b.swipeHandler), b.$list.on("touchmove.slick mousemove.slick", { action: "move" }, b.swipeHandler), b.$list.on("touchend.slick mouseup.slick", { action: "end" }, b.swipeHandler), b.$list.on("touchcancel.slick mouseleave.slick", { action: "end" }, b.swipeHandler), b.$list.on("click.slick", b.clickHandler), a(document).on(b.visibilityChange, a.proxy(b.visibility, b)), b.options.accessibility === !0 && b.$list.on("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), a(window).on("orientationchange.slick.slick-" + b.instanceUid, a.proxy(b.orientationChange, b)), a(window).on("resize.slick.slick-" + b.instanceUid, a.proxy(b.resize, b)), a("[draggable!=true]", b.$slideTrack).on("dragstart", b.preventDefault), a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).on("ready.slick.slick-" + b.instanceUid, b.setPosition);
	}, b.prototype.initUI = function () {
		var a = this;a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.show(), a.$nextArrow.show()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.show();
	}, b.prototype.keyHandler = function (a) {
		var b = this;a.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === a.keyCode && b.options.accessibility === !0 ? b.changeSlide({ data: { message: b.options.rtl === !0 ? "next" : "previous" } }) : 39 === a.keyCode && b.options.accessibility === !0 && b.changeSlide({ data: { message: b.options.rtl === !0 ? "previous" : "next" } }));
	}, b.prototype.lazyLoad = function () {
		function g(c) {
			a("img[data-lazy]", c).each(function () {
				var c = a(this),
				    d = a(this).attr("data-lazy"),
				    e = document.createElement("img");e.onload = function () {
					c.animate({ opacity: 0 }, 100, function () {
						c.attr("src", d).animate({ opacity: 1 }, 200, function () {
							c.removeAttr("data-lazy").removeClass("slick-loading");
						}), b.$slider.trigger("lazyLoaded", [b, c, d]);
					});
				}, e.onerror = function () {
					c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), b.$slider.trigger("lazyLoadError", [b, c, d]);
				}, e.src = d;
			});
		}var c,
		    d,
		    e,
		    f,
		    b = this;b.options.centerMode === !0 ? b.options.infinite === !0 ? (e = b.currentSlide + (b.options.slidesToShow / 2 + 1), f = e + b.options.slidesToShow + 2) : (e = Math.max(0, b.currentSlide - (b.options.slidesToShow / 2 + 1)), f = 2 + (b.options.slidesToShow / 2 + 1) + b.currentSlide) : (e = b.options.infinite ? b.options.slidesToShow + b.currentSlide : b.currentSlide, f = Math.ceil(e + b.options.slidesToShow), b.options.fade === !0 && (e > 0 && e--, f <= b.slideCount && f++)), c = b.$slider.find(".slick-slide").slice(e, f), g(c), b.slideCount <= b.options.slidesToShow ? (d = b.$slider.find(".slick-slide"), g(d)) : b.currentSlide >= b.slideCount - b.options.slidesToShow ? (d = b.$slider.find(".slick-cloned").slice(0, b.options.slidesToShow), g(d)) : 0 === b.currentSlide && (d = b.$slider.find(".slick-cloned").slice(-1 * b.options.slidesToShow), g(d));
	}, b.prototype.loadSlider = function () {
		var a = this;a.setPosition(), a.$slideTrack.css({ opacity: 1 }), a.$slider.removeClass("slick-loading"), a.initUI(), "progressive" === a.options.lazyLoad && a.progressiveLazyLoad();
	}, b.prototype.next = b.prototype.slickNext = function () {
		var a = this;a.changeSlide({ data: { message: "next" } });
	}, b.prototype.orientationChange = function () {
		var a = this;a.checkResponsive(), a.setPosition();
	}, b.prototype.pause = b.prototype.slickPause = function () {
		var a = this;a.autoPlayClear(), a.paused = !0;
	}, b.prototype.play = b.prototype.slickPlay = function () {
		var a = this;a.autoPlay(), a.options.autoplay = !0, a.paused = !1, a.focussed = !1, a.interrupted = !1;
	}, b.prototype.postSlide = function (a) {
		var b = this;b.unslicked || (b.$slider.trigger("afterChange", [b, a]), b.animating = !1, b.setPosition(), b.swipeLeft = null, b.options.autoplay && b.autoPlay(), b.options.accessibility === !0 && b.initADA());
	}, b.prototype.prev = b.prototype.slickPrev = function () {
		var a = this;a.changeSlide({ data: { message: "previous" } });
	}, b.prototype.preventDefault = function (a) {
		a.preventDefault();
	}, b.prototype.progressiveLazyLoad = function (b) {
		b = b || 1;var e,
		    f,
		    g,
		    c = this,
		    d = a("img[data-lazy]", c.$slider);d.length ? (e = d.first(), f = e.attr("data-lazy"), g = document.createElement("img"), g.onload = function () {
			e.attr("src", f).removeAttr("data-lazy").removeClass("slick-loading"), c.options.adaptiveHeight === !0 && c.setPosition(), c.$slider.trigger("lazyLoaded", [c, e, f]), c.progressiveLazyLoad();
		}, g.onerror = function () {
			3 > b ? setTimeout(function () {
				c.progressiveLazyLoad(b + 1);
			}, 500) : (e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), c.$slider.trigger("lazyLoadError", [c, e, f]), c.progressiveLazyLoad());
		}, g.src = f) : c.$slider.trigger("allImagesLoaded", [c]);
	}, b.prototype.refresh = function (b) {
		var d,
		    e,
		    c = this;e = c.slideCount - c.options.slidesToShow, !c.options.infinite && c.currentSlide > e && (c.currentSlide = e), c.slideCount <= c.options.slidesToShow && (c.currentSlide = 0), d = c.currentSlide, c.destroy(!0), a.extend(c, c.initials, { currentSlide: d }), c.init(), b || c.changeSlide({ data: { message: "index", index: d } }, !1);
	}, b.prototype.registerBreakpoints = function () {
		var c,
		    d,
		    e,
		    b = this,
		    f = b.options.responsive || null;if ("array" === a.type(f) && f.length) {
			b.respondTo = b.options.respondTo || "window";for (c in f) {
				if (e = b.breakpoints.length - 1, d = f[c].breakpoint, f.hasOwnProperty(c)) {
					for (; e >= 0;) {
						b.breakpoints[e] && b.breakpoints[e] === d && b.breakpoints.splice(e, 1), e--;
					}b.breakpoints.push(d), b.breakpointSettings[d] = f[c].settings;
				}
			}b.breakpoints.sort(function (a, c) {
				return b.options.mobileFirst ? a - c : c - a;
			});
		}
	}, b.prototype.reinit = function () {
		var b = this;b.$slides = b.$slideTrack.children(b.options.slide).addClass("slick-slide"), b.slideCount = b.$slides.length, b.currentSlide >= b.slideCount && 0 !== b.currentSlide && (b.currentSlide = b.currentSlide - b.options.slidesToScroll), b.slideCount <= b.options.slidesToShow && (b.currentSlide = 0), b.registerBreakpoints(), b.setProps(), b.setupInfinite(), b.buildArrows(), b.updateArrows(), b.initArrowEvents(), b.buildDots(), b.updateDots(), b.initDotEvents(), b.cleanUpSlideEvents(), b.initSlideEvents(), b.checkResponsive(!1, !0), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.setPosition(), b.focusHandler(), b.paused = !b.options.autoplay, b.autoPlay(), b.$slider.trigger("reInit", [b]);
	}, b.prototype.resize = function () {
		var b = this;a(window).width() !== b.windowWidth && (clearTimeout(b.windowDelay), b.windowDelay = window.setTimeout(function () {
			b.windowWidth = a(window).width(), b.checkResponsive(), b.unslicked || b.setPosition();
		}, 50));
	}, b.prototype.removeSlide = b.prototype.slickRemove = function (a, b, c) {
		var d = this;return "boolean" == typeof a ? (b = a, a = b === !0 ? 0 : d.slideCount - 1) : a = b === !0 ? --a : a, d.slideCount < 1 || 0 > a || a > d.slideCount - 1 ? !1 : (d.unload(), c === !0 ? d.$slideTrack.children().remove() : d.$slideTrack.children(this.options.slide).eq(a).remove(), d.$slides = d.$slideTrack.children(this.options.slide), d.$slideTrack.children(this.options.slide).detach(), d.$slideTrack.append(d.$slides), d.$slidesCache = d.$slides, void d.reinit());
	}, b.prototype.setCSS = function (a) {
		var d,
		    e,
		    b = this,
		    c = {};b.options.rtl === !0 && (a = -a), d = "left" == b.positionProp ? Math.ceil(a) + "px" : "0px", e = "top" == b.positionProp ? Math.ceil(a) + "px" : "0px", c[b.positionProp] = a, b.transformsEnabled === !1 ? b.$slideTrack.css(c) : (c = {}, b.cssTransitions === !1 ? (c[b.animType] = "translate(" + d + ", " + e + ")", b.$slideTrack.css(c)) : (c[b.animType] = "translate3d(" + d + ", " + e + ", 0px)", b.$slideTrack.css(c)));
	}, b.prototype.setDimensions = function () {
		var a = this;a.options.vertical === !1 ? a.options.centerMode === !0 && a.$list.css({ padding: "0px " + a.options.centerPadding }) : (a.$list.height(a.$slides.first().outerHeight(!0) * a.options.slidesToShow), a.options.centerMode === !0 && a.$list.css({ padding: a.options.centerPadding + " 0px" })), a.listWidth = a.$list.width(), a.listHeight = a.$list.height(), a.options.vertical === !1 && a.options.variableWidth === !1 ? (a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow), a.$slideTrack.width(Math.ceil(a.slideWidth * a.$slideTrack.children(".slick-slide").length))) : a.options.variableWidth === !0 ? a.$slideTrack.width(5e3 * a.slideCount) : (a.slideWidth = Math.ceil(a.listWidth), a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0) * a.$slideTrack.children(".slick-slide").length)));var b = a.$slides.first().outerWidth(!0) - a.$slides.first().width();a.options.variableWidth === !1 && a.$slideTrack.children(".slick-slide").width(a.slideWidth - b);
	}, b.prototype.setFade = function () {
		var c,
		    b = this;b.$slides.each(function (d, e) {
			c = b.slideWidth * d * -1, b.options.rtl === !0 ? a(e).css({ position: "relative", right: c, top: 0, zIndex: b.options.zIndex - 2, opacity: 0 }) : a(e).css({ position: "relative", left: c, top: 0, zIndex: b.options.zIndex - 2, opacity: 0 });
		}), b.$slides.eq(b.currentSlide).css({ zIndex: b.options.zIndex - 1, opacity: 1 });
	}, b.prototype.setHeight = function () {
		var a = this;if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
			var b = a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.css("height", b);
		}
	}, b.prototype.setOption = b.prototype.slickSetOption = function () {
		var c,
		    d,
		    e,
		    f,
		    h,
		    b = this,
		    g = !1;if ("object" === a.type(arguments[0]) ? (e = arguments[0], g = arguments[1], h = "multiple") : "string" === a.type(arguments[0]) && (e = arguments[0], f = arguments[1], g = arguments[2], "responsive" === arguments[0] && "array" === a.type(arguments[1]) ? h = "responsive" : "undefined" != typeof arguments[1] && (h = "single")), "single" === h) b.options[e] = f;else if ("multiple" === h) a.each(e, function (a, c) {
			b.options[a] = c;
		});else if ("responsive" === h) for (d in f) {
			if ("array" !== a.type(b.options.responsive)) b.options.responsive = [f[d]];else {
				for (c = b.options.responsive.length - 1; c >= 0;) {
					b.options.responsive[c].breakpoint === f[d].breakpoint && b.options.responsive.splice(c, 1), c--;
				}b.options.responsive.push(f[d]);
			}
		}g && (b.unload(), b.reinit());
	}, b.prototype.setPosition = function () {
		var a = this;a.setDimensions(), a.setHeight(), a.options.fade === !1 ? a.setCSS(a.getLeft(a.currentSlide)) : a.setFade(), a.$slider.trigger("setPosition", [a]);
	}, b.prototype.setProps = function () {
		var a = this,
		    b = document.body.style;a.positionProp = a.options.vertical === !0 ? "top" : "left", "top" === a.positionProp ? a.$slider.addClass("slick-vertical") : a.$slider.removeClass("slick-vertical"), (void 0 !== b.WebkitTransition || void 0 !== b.MozTransition || void 0 !== b.msTransition) && a.options.useCSS === !0 && (a.cssTransitions = !0), a.options.fade && ("number" == typeof a.options.zIndex ? a.options.zIndex < 3 && (a.options.zIndex = 3) : a.options.zIndex = a.defaults.zIndex), void 0 !== b.OTransform && (a.animType = "OTransform", a.transformType = "-o-transform", a.transitionType = "OTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.MozTransform && (a.animType = "MozTransform", a.transformType = "-moz-transform", a.transitionType = "MozTransition", void 0 === b.perspectiveProperty && void 0 === b.MozPerspective && (a.animType = !1)), void 0 !== b.webkitTransform && (a.animType = "webkitTransform", a.transformType = "-webkit-transform", a.transitionType = "webkitTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.msTransform && (a.animType = "msTransform", a.transformType = "-ms-transform", a.transitionType = "msTransition", void 0 === b.msTransform && (a.animType = !1)), void 0 !== b.transform && a.animType !== !1 && (a.animType = "transform", a.transformType = "transform", a.transitionType = "transition"), a.transformsEnabled = a.options.useTransform && null !== a.animType && a.animType !== !1;
	}, b.prototype.setSlideClasses = function (a) {
		var c,
		    d,
		    e,
		    f,
		    b = this;d = b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), b.$slides.eq(a).addClass("slick-current"), b.options.centerMode === !0 ? (c = Math.floor(b.options.slidesToShow / 2), b.options.infinite === !0 && (a >= c && a <= b.slideCount - 1 - c ? b.$slides.slice(a - c, a + c + 1).addClass("slick-active").attr("aria-hidden", "false") : (e = b.options.slidesToShow + a, d.slice(e - c + 1, e + c + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === a ? d.eq(d.length - 1 - b.options.slidesToShow).addClass("slick-center") : a === b.slideCount - 1 && d.eq(b.options.slidesToShow).addClass("slick-center")), b.$slides.eq(a).addClass("slick-center")) : a >= 0 && a <= b.slideCount - b.options.slidesToShow ? b.$slides.slice(a, a + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : d.length <= b.options.slidesToShow ? d.addClass("slick-active").attr("aria-hidden", "false") : (f = b.slideCount % b.options.slidesToShow, e = b.options.infinite === !0 ? b.options.slidesToShow + a : a, b.options.slidesToShow == b.options.slidesToScroll && b.slideCount - a < b.options.slidesToShow ? d.slice(e - (b.options.slidesToShow - f), e + f).addClass("slick-active").attr("aria-hidden", "false") : d.slice(e, e + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === b.options.lazyLoad && b.lazyLoad();
	}, b.prototype.setupInfinite = function () {
		var c,
		    d,
		    e,
		    b = this;if (b.options.fade === !0 && (b.options.centerMode = !1), b.options.infinite === !0 && b.options.fade === !1 && (d = null, b.slideCount > b.options.slidesToShow)) {
			for (e = b.options.centerMode === !0 ? b.options.slidesToShow + 1 : b.options.slidesToShow, c = b.slideCount; c > b.slideCount - e; c -= 1) {
				d = c - 1, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d - b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");
			}for (c = 0; e > c; c += 1) {
				d = c, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d + b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");
			}b.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
				a(this).attr("id", "");
			});
		}
	}, b.prototype.interrupt = function (a) {
		var b = this;a || b.autoPlay(), b.interrupted = a;
	}, b.prototype.selectHandler = function (b) {
		var c = this,
		    d = a(b.target).is(".slick-slide") ? a(b.target) : a(b.target).parents(".slick-slide"),
		    e = parseInt(d.attr("data-slick-index"));return e || (e = 0), c.slideCount <= c.options.slidesToShow ? (c.setSlideClasses(e), void c.asNavFor(e)) : void c.slideHandler(e);
	}, b.prototype.slideHandler = function (a, b, c) {
		var d,
		    e,
		    f,
		    g,
		    j,
		    h = null,
		    i = this;return b = b || !1, i.animating === !0 && i.options.waitForAnimate === !0 || i.options.fade === !0 && i.currentSlide === a || i.slideCount <= i.options.slidesToShow ? void 0 : (b === !1 && i.asNavFor(a), d = a, h = i.getLeft(d), g = i.getLeft(i.currentSlide), i.currentLeft = null === i.swipeLeft ? g : i.swipeLeft, i.options.infinite === !1 && i.options.centerMode === !1 && (0 > a || a > i.getDotCount() * i.options.slidesToScroll) ? void (i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function () {
			i.postSlide(d);
		}) : i.postSlide(d))) : i.options.infinite === !1 && i.options.centerMode === !0 && (0 > a || a > i.slideCount - i.options.slidesToScroll) ? void (i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function () {
			i.postSlide(d);
		}) : i.postSlide(d))) : (i.options.autoplay && clearInterval(i.autoPlayTimer), e = 0 > d ? i.slideCount % i.options.slidesToScroll !== 0 ? i.slideCount - i.slideCount % i.options.slidesToScroll : i.slideCount + d : d >= i.slideCount ? i.slideCount % i.options.slidesToScroll !== 0 ? 0 : d - i.slideCount : d, i.animating = !0, i.$slider.trigger("beforeChange", [i, i.currentSlide, e]), f = i.currentSlide, i.currentSlide = e, i.setSlideClasses(i.currentSlide), i.options.asNavFor && (j = i.getNavTarget(), j = j.slick("getSlick"), j.slideCount <= j.options.slidesToShow && j.setSlideClasses(i.currentSlide)), i.updateDots(), i.updateArrows(), i.options.fade === !0 ? (c !== !0 ? (i.fadeSlideOut(f), i.fadeSlide(e, function () {
			i.postSlide(e);
		})) : i.postSlide(e), void i.animateHeight()) : void (c !== !0 ? i.animateSlide(h, function () {
			i.postSlide(e);
		}) : i.postSlide(e))));
	}, b.prototype.startLoad = function () {
		var a = this;a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.hide(), a.$nextArrow.hide()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.hide(), a.$slider.addClass("slick-loading");
	}, b.prototype.swipeDirection = function () {
		var a,
		    b,
		    c,
		    d,
		    e = this;return a = e.touchObject.startX - e.touchObject.curX, b = e.touchObject.startY - e.touchObject.curY, c = Math.atan2(b, a), d = Math.round(180 * c / Math.PI), 0 > d && (d = 360 - Math.abs(d)), 45 >= d && d >= 0 ? e.options.rtl === !1 ? "left" : "right" : 360 >= d && d >= 315 ? e.options.rtl === !1 ? "left" : "right" : d >= 135 && 225 >= d ? e.options.rtl === !1 ? "right" : "left" : e.options.verticalSwiping === !0 ? d >= 35 && 135 >= d ? "down" : "up" : "vertical";
	}, b.prototype.swipeEnd = function (a) {
		var c,
		    d,
		    b = this;if (b.dragging = !1, b.interrupted = !1, b.shouldClick = b.touchObject.swipeLength > 10 ? !1 : !0, void 0 === b.touchObject.curX) return !1;if (b.touchObject.edgeHit === !0 && b.$slider.trigger("edge", [b, b.swipeDirection()]), b.touchObject.swipeLength >= b.touchObject.minSwipe) {
			switch (d = b.swipeDirection()) {case "left":case "down":
					c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide + b.getSlideCount()) : b.currentSlide + b.getSlideCount(), b.currentDirection = 0;break;case "right":case "up":
					c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide - b.getSlideCount()) : b.currentSlide - b.getSlideCount(), b.currentDirection = 1;}"vertical" != d && (b.slideHandler(c), b.touchObject = {}, b.$slider.trigger("swipe", [b, d]));
		} else b.touchObject.startX !== b.touchObject.curX && (b.slideHandler(b.currentSlide), b.touchObject = {});
	}, b.prototype.swipeHandler = function (a) {
		var b = this;if (!(b.options.swipe === !1 || "ontouchend" in document && b.options.swipe === !1 || b.options.draggable === !1 && -1 !== a.type.indexOf("mouse"))) switch (b.touchObject.fingerCount = a.originalEvent && void 0 !== a.originalEvent.touches ? a.originalEvent.touches.length : 1, b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold, b.options.verticalSwiping === !0 && (b.touchObject.minSwipe = b.listHeight / b.options.touchThreshold), a.data.action) {case "start":
				b.swipeStart(a);break;case "move":
				b.swipeMove(a);break;case "end":
				b.swipeEnd(a);}
	}, b.prototype.swipeMove = function (a) {
		var d,
		    e,
		    f,
		    g,
		    h,
		    b = this;return h = void 0 !== a.originalEvent ? a.originalEvent.touches : null, !b.dragging || h && 1 !== h.length ? !1 : (d = b.getLeft(b.currentSlide), b.touchObject.curX = void 0 !== h ? h[0].pageX : a.clientX, b.touchObject.curY = void 0 !== h ? h[0].pageY : a.clientY, b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curX - b.touchObject.startX, 2))), b.options.verticalSwiping === !0 && (b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curY - b.touchObject.startY, 2)))), e = b.swipeDirection(), "vertical" !== e ? (void 0 !== a.originalEvent && b.touchObject.swipeLength > 4 && a.preventDefault(), g = (b.options.rtl === !1 ? 1 : -1) * (b.touchObject.curX > b.touchObject.startX ? 1 : -1), b.options.verticalSwiping === !0 && (g = b.touchObject.curY > b.touchObject.startY ? 1 : -1), f = b.touchObject.swipeLength, b.touchObject.edgeHit = !1, b.options.infinite === !1 && (0 === b.currentSlide && "right" === e || b.currentSlide >= b.getDotCount() && "left" === e) && (f = b.touchObject.swipeLength * b.options.edgeFriction, b.touchObject.edgeHit = !0), b.options.vertical === !1 ? b.swipeLeft = d + f * g : b.swipeLeft = d + f * (b.$list.height() / b.listWidth) * g, b.options.verticalSwiping === !0 && (b.swipeLeft = d + f * g), b.options.fade === !0 || b.options.touchMove === !1 ? !1 : b.animating === !0 ? (b.swipeLeft = null, !1) : void b.setCSS(b.swipeLeft)) : void 0);
	}, b.prototype.swipeStart = function (a) {
		var c,
		    b = this;return b.interrupted = !0, 1 !== b.touchObject.fingerCount || b.slideCount <= b.options.slidesToShow ? (b.touchObject = {}, !1) : (void 0 !== a.originalEvent && void 0 !== a.originalEvent.touches && (c = a.originalEvent.touches[0]), b.touchObject.startX = b.touchObject.curX = void 0 !== c ? c.pageX : a.clientX, b.touchObject.startY = b.touchObject.curY = void 0 !== c ? c.pageY : a.clientY, void (b.dragging = !0));
	}, b.prototype.unfilterSlides = b.prototype.slickUnfilter = function () {
		var a = this;null !== a.$slidesCache && (a.unload(), a.$slideTrack.children(this.options.slide).detach(), a.$slidesCache.appendTo(a.$slideTrack), a.reinit());
	}, b.prototype.unload = function () {
		var b = this;a(".slick-cloned", b.$slider).remove(), b.$dots && b.$dots.remove(), b.$prevArrow && b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.remove(), b.$nextArrow && b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.remove(), b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "");
	}, b.prototype.unslick = function (a) {
		var b = this;b.$slider.trigger("unslick", [b, a]), b.destroy();
	}, b.prototype.updateArrows = function () {
		var b,
		    a = this;b = Math.floor(a.options.slidesToShow / 2), a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && !a.options.infinite && (a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === a.currentSlide ? (a.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - a.options.slidesToShow && a.options.centerMode === !1 ? (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - 1 && a.options.centerMode === !0 && (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")));
	}, b.prototype.updateDots = function () {
		var a = this;null !== a.$dots && (a.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), a.$dots.find("li").eq(Math.floor(a.currentSlide / a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"));
	}, b.prototype.visibility = function () {
		var a = this;a.options.autoplay && (document[a.hidden] ? a.interrupted = !0 : a.interrupted = !1);
	}, a.fn.slick = function () {
		var f,
		    g,
		    a = this,
		    c = arguments[0],
		    d = Array.prototype.slice.call(arguments, 1),
		    e = a.length;for (f = 0; e > f; f++) {
			if ("object" == (typeof c === "undefined" ? "undefined" : _typeof(c)) || "undefined" == typeof c ? a[f].slick = new b(a[f], c) : g = a[f].slick[c].apply(a[f].slick, d), "undefined" != typeof g) return g;
		}return a;
	};
});

$(document).ready(function () {
	function openSearchResults() {
		var searchBlock = $('.header-search');

		searchBlock.each(function () {
			var self = $(this);
			var searchInput = self.find('input');
			var searchResults = self.find('.results');

			searchInput.on('focus', function () {
				//console.log(searchInput, searchResults);
				if (searchResults.hasClass('isOpen')) return;
				searchResults.addClass('isOpen');
			});
			$('body').on('click', function (e) {
				if (searchResults.hasClass('isOpen') && !$(e.target).closest('.header-search').length) {
					searchResults.removeClass('isOpen');
				}
			});

			$('body').on('mouseover', function (e) {
				//console.log(e.target);

				if (searchResults.hasClass('isOpen') && !$(e.target).closest('.header-search').length) {
					searchResults.removeClass('isOpen');
					searchInput.blur();
				}
			});
		});
	}
	//openSearchResults()


	$('.catalog-list-item').eq(0).addClass('_selected');

	if ($('body').hasClass('tece-super-drenazh')) {
		$('.catalog-list-item').removeClass('_selected');
		$('.catalog-list-item').eq(1).addClass('_selected');

		// if($('body').hasClass('tece-sub-2')) {
		// 	$('.catalog-list-item').eq(1).find('li:nth-child(2)')
		// }
	}

	// open menu lists on mouse over
	function openMenuLists() {
		var $listItem = $('.catalog-list-item');

		$($listItem).mousestop(0, function () {
			$(this).siblings('.catalog-list-item').removeClass('_selected');
			$(this).addClass('_selected');
		});
	}
	openMenuLists();
	// when header search is not expanded, first button click expands it

	function expandSearch() {
		var $button = $('.header-search button');
		var $results = $('.results');
		var $input = $('#header-search');
		//console.log($button, $results)

		$button.on('click', function (e) {
			if (!$results.hasClass('isOpen')) {
				e.preventDefault();
				$results.addClass('isOpen');
				$input.focus();
			}
		});
	}
	expandSearch();

	//open mobile menu	
	function toggleMobileMenu() {
		var $buttonOpen = $('.js-open-mobile-menu');
		var $buttonClose = $('.js-close-mobile-menu');
		var $menu = $('.js-mobile-menu');

		$buttonOpen.on('click', function () {
			$menu.fadeIn();
		});

		$buttonClose.on('click', function () {
			$menu.fadeOut();
		});
	}
	toggleMobileMenu();

	//open options in mobile menu

	function toggleOptions() {
		var $options = $('.js-mobile-item');
		$options.each(function () {
			var self = $(this);
			var $optionTitle = self.find('.js-mobile-options-title');
			var $options = self.find('.js-mobile-options');

			$optionTitle.on('click', function () {
				self.toggleClass('active');
				$options.fadeToggle(200);
			});
		});
	}
	toggleOptions();
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
	$(document).ready(function () {

		function initSwiperSlider() {
			var container = '.i__slider .swiper-container';
			var mySwiper = new Swiper(container, {
				loop: true,
				slidesPerView: 1,
				speed: 500,
				autoplay: {
					delay: 3000
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				},
				pagination: {
					el: '.swiper-pagination',
					type: 'bullets'
				}
			});
			makeSwiperArrows(mySwiper, container);
		}
		function initSwiperReview() {
			var container = '.i__reviews .swiper-container';
			var mySwiper = new Swiper(container, {
				loop: true,
				slidesPerView: 2,
				spaceBetween: 13,
				speed: 500,
				autoplay: {
					delay: 3000
				},
				navigation: {
					nextEl: '.i__slider-next',
					prevEl: '.i__slider-prev'
				},
				breakpoints: {
					// when window width is <= 320px
					1000: {
						slidesPerView: 1,
						spaceBetween: 0
					}
				}
			});
			makeSwiperArrows(mySwiper, container);
		}
		function initSwiperItems() {}
		//Swiper plugin initialization
		$(window).load(function () {
			initSwiperSlider();
			initSwiperReview();
			initSwiperItems();
		});

		//Swiper plugin initialization on window resize
		$(window).on('resize', function () {
			initSwiperSlider();
		});
		$(document).ready(function () {
			if (typeof Swiper === 'undefined') return false;

			$('.js-tabs-filter-list').each(function () {
				var self = $(this);
				var mySwiperItems = null;

				function initSwiper() {
					var screenWidth = $(window).width();
					if (screenWidth >= 720 && !mySwiperItems) {
						var container = self.find('.swiper-container');
						makeItemsSwiperArrows(self);
						mySwiperItems = new Swiper(container, {
							loop: true,
							slidesPerView: 4,
							spaceBetween: 21,
							speed: 500,
							breakpoints: {
								1150: {
									slidesPerView: 3,
									spaceBetween: 10
								},
								750: {
									slidesPerView: 2,
									spaceBetween: 10
								}
							}
						});
					}
					// console.log(screenWidth < 720,!!mySwiperItems);
					if (screenWidth < 720 && !!mySwiperItems) {
						//console.log(screenWidth < 720, mySwiperItems != null) 
						mySwiperItems.destroy();
						mySwiperItems = null;
						self.find('.swiper-wrapper').removeAttr('style');
						self.find('.swiper-slide').removeAttr('style');
					}
				}

				//Swiper plugin initialization
				$(window).load(function () {
					initSwiper();
					setTimeout(function () {
						makeItemsSwiperArrows(self);
					}, 0);
				});

				//Swiper plugin initialization on window resize
				$(window).on('resize', function () {
					initSwiper();
				});
			});
		});

		function makeSwiperArrows(mySwiper, container) {
			var $swiper = $(container);
			var $prev = $swiper.find('.i__slider-prev');
			var $next = $swiper.find('.i__slider-next');
			$prev.on('click', function () {
				mySwiper.slidePrev();
			});
			$next.on('click', function () {
				mySwiper.slideNext();
			});
		}

		function initPopup(btn) {
			var btnClassName = btn;
			var popupInnerClass = '.js-popup-inner';

			var $popups = $('.js-popup');

			var $btn = $(btnClassName);

			$btn.each(function () {

				function closePopup() {
					$popup.removeClass('active');
					$popup.fadeOut(200);
				}

				function openPopup() {
					$popups.removeClass('active');
					$popups.fadeOut(200);
					$popup.addClass('active');
					$popup.fadeIn(200);
					var popupHeight = $('body').outerHeight();
					$popup.css('height', popupHeight);
				}

				var self = $(this);

				var popupName = self.attr('data-popup');
				var $popup = $(popupName);
				var $closebtn = $popup.find('.js-popup-close');

				var $autoFocusInput = $popup.find('input:first, textarea:first');

				self.on('click', function (e) {
					if (!$popup.hasClass('active')) {
						e.preventDefault();
						e.stopPropagation();
						openPopup();
						makeAnimation();
						if ($autoFocusInput) $autoFocusInput.focus();
					}
				});

				$('body').on('click', function (e) {
					if (!$(e.target).closest(popupInnerClass).length) {
						closePopup();
					}
				});

				$(document).keydown(function (e) {
					if (e.keyCode == 27) {
						closePopup();
					}
				});
				$closebtn.on('click', function (e) {
					e.preventDefault();
					closePopup();
				});
			});
		}
		initPopup('.js-login-btn');
		initPopup('.js-reg-btn');
		initPopup('.js-forgot-btn');
		initPopup('.js-callback-btn');

		function makeAnimation() {
			$(".popup-outer.active .popup-animation").find('svg').remove();
			var width = 340,
			    height = 340;
			var svg = d3.select(".popup-outer.active .popup-animation").append("svg").attr("class", "rect").attr("width", width).attr("height", height).attr("fill", "transparent");

			svg.append("rect").attr("transform", 'translate(0, 0)').attr("width", 140).attr("height", 140).attr("fill", "transparent");
			function draw() {
				svg.append("rect").attr("width", 140).attr("height", 140)
				// .attr("transform", 'translate('+ (170 - (200/2))+', '+ (170 - (200/2))+')')          
				.attr("transform", 'translate(70, 70)').style("stroke-width", 1).style("stroke", "#5EC0AD").transition().ease("linear").duration(4000).style("stroke-opacity", 1e-6).style("stroke-width", 1).style("stroke", "white")
				// .attr("width", 400)
				// .attr("height", 400)
				.attr("transform", 'scale(2)').remove();
			}
			draw();
			setInterval(function () {
				draw();
			}, 1700);
		}
		//makeAnimation()

		$('input, textarea').on('focus', function () {
			$(this).removeClass('error');
			$(this).removeClass('ok');
			$(this).siblings('.login-error').remove();
			$(this).siblings('.login-message').remove();
		});
		function maskPhone(input) {
			$(input).mask("+7 (999) 999-9999");
		}
		function showInputError(name, text) {
			name.addClass('error');
			showError(text, name, 'login-error', 'login-error-text');
		}
		function showInputMessage(name, text, className) {
			name.addClass(className);
			showError(text, name, 'login-message', 'login-message-text');
		}
		function checkPasswordStrengh(value) {
			var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
			var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

			if (strongRegex.test(value)) {
				return 'strong';
			} else if (mediumRegex.test(value)) {
				return 'medium';
			} else {
				return 'low';
			}
		}
		function validateLoginForms() {
			var $forms = $('.js-login-forms');
			$forms.each(function () {
				var self = $(this);
				var btn = self.find('.js-login-btns');

				var email = self.find('.js-input-email');
				var password = self.find('.js-input-password--1');
				var password2 = self.find('.js-input-password--2');
				var phoneInputs = self.find('.js-input-phone');
				phoneInputs.each(function () {
					maskPhone($(this));
				});

				email.on('blur', function () {
					if (email.val() != '' && !validateEmail(email)) {
						showInputError(email, 'E-mail введен некорректно');
					}
				});

				function checkIfEqual(input1, input2) {
					if (input1.val() !== input2.val() && input1.val() != '' && input2.val() != '') {
						showInputError(input2, 'Проверьте пароли');
						return false;
					} else {
						input2.siblings('.login-error').remove();
						input2.removeClass('error');
						return true;
					}
				}

				if (password2.length) {
					//console.log(password2);
					password2.on('blur', function () {
						checkIfEqual(password, password2);
					});
					password.on('blur', function () {
						checkIfEqual(password, password2);
					});
				}
				if (password.length && self.closest('#regPopup').length) {
					password.on('blur', function () {
						if (checkPasswordStrengh(password) === 'strong') {
							showInputMessage(password, 'Надежный пароль', 'strong');
						} else if (checkPasswordStrengh(password) === 'medium') {
							showInputMessage(password, 'Хороший пароль', 'medium');
						} else if (checkPasswordStrengh(password) === 'low') {
							showInputMessage(password, 'Ненадежный пароль', 'low');
						}
					});
				}

				btn.on('click', function (e) {

					var inputs = self.find('input,textarea,select');

					var requiredInputs = self.find('input,textarea,select').filter('[required]:visible');
					requiredInputs.on("invalid", function (e) {
						e.preventDefault();
					});

					requiredInputs.each(function () {
						var input = $(this);

						if (input.hasClass('js-input-name') && input.val() === '') {
							showInputError(input, 'Введите имя');
						} else if (input.hasClass('js-input-phone') && input.val() === '') {
							showInputError(input, 'Введите телефон');
						} else if (input.hasClass('js-input-email') && input.val() === '') {
							showInputError(input, 'Введите e-mail');
						} else if (input.hasClass('js-input-password') && input.val() === '') {
							showInputError(input, 'Введите пароль');
						} else if (input.hasClass('js-input-email') && input.val() !== '' && !validateEmail(input)) {
							showInputError(input, 'E-mail введен некорректно');
						}
						if (password2.length) {
							if (password.val() == '' || password2.val() == '' || !checkIfEqual(password, password2)) {
								e.preventDefault();
								showInputError(password2, 'Проверьте пароли');
							}
						}
					});
				});
			});
		}
		validateLoginForms();

		function showSelection() {

			var $btns = $('.js-tabs-filter');
			var $blocks = $('.js-tabs-filter-list');

			if (!$btns.length || !$blocks.length) return false;

			$btns.each(function () {

				var $btn = $(this);
				var $block = $($btn.attr('href'));

				if ($btn.hasClass('active')) {
					$block.animate({
						opacity: 1
					}, 500);
					$block.addClass('active');

					//makeItemsSwiperArrows($block)
				}

				$btn.on('click', function (e) {
					e.preventDefault();

					$btns.removeClass('active');
					$btn.addClass('active');

					$blocks.removeClass('active');
					$blocks.css('opacity', 0);

					$block.addClass('active');
					$block.animate({
						opacity: 1
					}, 500);

					makeItemsSwiperArrows($block);
				});
			});
		}
		showSelection();

		function makeItemsSwiperArrows(block) {
			var $block = $(block);
			var container = $block.find('.swiper-container')[0];
			var mySwiper = container.swiper;
			if (!mySwiper) return;

			mySwiper.update();
			var $prev = $block.find('.i__slider-prev');
			var $next = $block.find('.i__slider-next');

			$prev.on('click', function () {
				mySwiper.slidePrev();
			});
			$next.on('click', function () {
				mySwiper.slideNext();
			});
		}

		function makeRating() {
			var $rating = $('.js-rating');
			var $stars = $('.js-rating-star');
			var rating = parseFloat($rating.attr('data-rating'));
			$stars.each(function () {
				var order = parseInt($(this).attr('data-star'));
				var delta = rating - order;
				$(this).css('width', Math.min(delta * 100, 100) + '%');
			});
		}
		makeRating();

		function maskPostalCode(input) {
			$(input).mask("999999");
		}

		function validatePersonalInfoForms() {
			var $forms = $('.js-personal-info-forms');
			$forms.each(function () {
				var self = $(this);
				var btn = self.find('.js-personal-info-btn');

				var email = self.find('.js-input-email');
				var password = self.find('.js-input-password--1');
				var password2 = self.find('.js-input-password--2');
				var phoneInputs = self.find('.js-input-phone');
				var postalCodes = self.find('.js-input-postalcode');
				phoneInputs.each(function () {
					maskPhone($(this));
				});

				postalCodes.each(function () {
					maskPostalCode($(this));
				});

				var checkboxes = self.find('.js-input-checkbox');
				checkboxes.on('click', function () {
					$(this).removeClass('error');
					$(this).siblings('.login-error').remove();
				});

				email.on('blur', function () {
					if (email.val() != '' && !validateEmail(email)) {
						showInputError(email, 'E-mail введен некорректно');
					}
				});

				function checkIfEqual(input1, input2) {
					if (input1.val() !== input2.val() && input1.val() != '' && input2.val() != '') {
						showInputError(input2, 'Проверьте пароли');
						return false;
					} else {
						input2.siblings('.login-error').remove();
						input2.removeClass('error');
						return true;
					}
				}

				if (password2.length) {
					//console.log(password2);
					password2.on('blur', function () {
						checkIfEqual(password, password2);
					});
					password.on('blur', function () {
						checkIfEqual(password, password2);
					});
				}
				if (password.length && self.closest('#regPopup').length) {
					password.on('blur', function () {
						if (checkPasswordStrengh(password) === 'strong') {
							showInputMessage(password, 'Надежный пароль', 'strong');
						} else if (checkPasswordStrengh(password) === 'medium') {
							showInputMessage(password, 'Хороший пароль', 'medium');
						} else if (checkPasswordStrengh(password) === 'low') {
							showInputMessage(password, 'Ненадежный пароль', 'low');
						}
					});
				}

				btn.on('click', function (e) {

					var inputs = self.find('input,textarea,select');

					var requiredInputs = self.find('input,textarea,select').filter('[required]:visible');
					requiredInputs.on("invalid", function (e) {
						e.preventDefault();
					});

					requiredInputs.each(function () {
						var input = $(this);

						if (input.hasClass('js-input-name') && input.val() === '') {
							showInputError(input, 'Введите фамилию');
						} else if (input.hasClass('js-input-phone') && input.val() === '') {
							showInputError(input, 'Введите телефон');
						} else if (input.hasClass('js-input-email') && input.val() === '') {
							showInputError(input, 'Введите e-mail');
						} else if (input.hasClass('js-input-password') && input.val() === '') {
							showInputError(input, 'Введите пароль');
						} else if (input.hasClass('js-input-email') && input.val() !== '' && !validateEmail(input)) {
							showInputError(input, 'E-mail введен некорректно');
						} else if (input.hasClass('js-input-address') && input.val() === '') {
							showInputError(input, 'Введите адрес');
						} else if (input.hasClass('js-input-city') && input.val() === '') {
							showInputError(input, 'Введите город');
						} else if (input.hasClass('js-input-region') && input.val() === '') {
							showInputError(input, 'Введите регион');
						} else if (input.hasClass('js-input-postalcode') && input.val() === '') {
							showInputError(input, 'Введите индекс');
						} else if (input.hasClass('js-input-checkbox') && !input.is(':checked')) {
							showInputError(input, 'Необходимо согласиться');
						} else if (input.hasClass('js-input-textarea') && input.val() === '') {
							//console.log(input);         
							showInputError(input, 'Напишите ваш вопрос');
						} else if (self.hasClass('js-account-feedback-form') && input.hasClass('js-input-textarea') && input.val() !== '') {
							e.preventDefault();
							input.addClass('ok');
							showInputMessage(input, 'Ваш запрос был отправлен');
						}
						if (password2.length) {
							if (password.val() == '' || password2.val() == '' || !checkIfEqual(password, password2)) {
								e.preventDefault();
								showInputError(password2, 'Проверьте пароли');
							}
						}
					});
				});
			});
		}
		validatePersonalInfoForms();
	});
});