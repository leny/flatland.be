// Generated by CoffeeScript 1.6.3
/*
 * flatLand! - code design things.
 *
 * COFFEE Document - /js/class.range-inspector.coffee
 *
 * coded by leny @ flatLand!
 *
 * start: 2013-03-26
*/


(function() {
  var $codeLangagesHolder, $splash, $splashLogo, $stickyHeader, $stickyHeaderBox, RangeInspector, bIsIpad, bIsMobile, bStickyHeaderIsVisible, changeHistory, changeSection, computeScrollPositions, iStickyHeaderStep, internalLinkClicked, langageHolderAnimationStart, oSectionStepsInspector, phoneLinkClicked, prepareLangageAnimation, sCurrentSection, scrollToSelector, scrolling, statePopped;

  RangeInspector = (function() {
    function RangeInspector() {}

    RangeInspector.prototype.aRanges = [];

    RangeInspector.prototype.add = function(iStart, iStop, sKey) {
      return this.aRanges.push({
        start: iStart >> 0,
        stop: iStop >> 0,
        key: sKey
      });
    };

    RangeInspector.prototype.clear = function() {
      return this.aRanges = [];
    };

    RangeInspector.prototype.getKey = function(iPosition) {
      var oRange, sReturnValue, _i, _len, _ref;
      sReturnValue = null;
      _ref = this.aRanges;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        oRange = _ref[_i];
        if ((oRange.start <= iPosition && iPosition <= oRange.stop)) {
          sReturnValue = oRange.key;
        }
      }
      return sReturnValue;
    };

    return RangeInspector;

  })();

  /* --------------------------------------------
       Begin script.coffee
  --------------------------------------------
  */


  /*
   * flatLand! - code design things.
   *
   * COFFEE Document - /js/script.js
   *
   * coded by leny @ flatLand!
   *
   * start: 2013-03-25
  */


  bStickyHeaderIsVisible = false;

  $splash = null;

  $splashLogo = null;

  $stickyHeader = null;

  $stickyHeaderBox = null;

  iStickyHeaderStep = 0;

  $codeLangagesHolder = null;

  oSectionStepsInspector = new RangeInspector();

  sCurrentSection = null;

  bIsMobile = !!navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i);

  bIsIpad = !!navigator.userAgent.match(/iPad/i);

  computeScrollPositions = function() {
    iStickyHeaderStep = $splash.find('span.name').offset().top - 9;
    oSectionStepsInspector.clear();
    return $('section:has( .content )').each(function() {
      var iStart, iStop, sName;
      iStart = $(this).offset().top - 100;
      iStop = $(this).height() + iStart + 200;
      sName = $(this).attr('id');
      return oSectionStepsInspector.add(iStart, iStop, sName);
    });
  };

  scrolling = function() {
    var iCurrentScrollPosition;
    iCurrentScrollPosition = document.body.scrollTop > document.documentElement.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop;
    if (iCurrentScrollPosition >= iStickyHeaderStep && bStickyHeaderIsVisible === false) {
      bStickyHeaderIsVisible = true;
      $stickyHeader.show();
      $splashLogo.hide();
      $stickyHeaderBox.fadeIn('slow');
      $splash.find('.message').fadeOut('slow');
    }
    if (iCurrentScrollPosition < iStickyHeaderStep && bStickyHeaderIsVisible === true) {
      bStickyHeaderIsVisible = false;
      $splashLogo.show();
      $stickyHeader.hide();
      $stickyHeaderBox.hide();
    }
    if (oSectionStepsInspector.getKey(iCurrentScrollPosition) !== sCurrentSection) {
      sCurrentSection = oSectionStepsInspector.getKey(iCurrentScrollPosition);
      return changeSection(sCurrentSection);
    }
  };

  changeSection = function(sNewSection) {
    $stickyHeaderBox.find('a.active').removeClass('active');
    return $stickyHeaderBox.find('a[href="#' + sNewSection + '"]').addClass('active');
  };

  prepareLangageAnimation = function(bLaunchAnimation) {
    var $langage, aLangageWidths, iBiggestLangageWidth;
    aLangageWidths = (function() {
      var _i, _len, _ref, _results;
      _ref = $codeLangagesHolder.find('span');
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        $langage = _ref[_i];
        _results.push($($langage).width());
      }
      return _results;
    })();
    iBiggestLangageWidth = Math.max.apply(Math, aLangageWidths);
    $codeLangagesHolder.find('strong').width(iBiggestLangageWidth).end().find('span').hide().first().show();
    if (bLaunchAnimation) {
      return langageHolderAnimationStart();
    }
  };

  langageHolderAnimationStart = function(e) {
    if (e != null) {
      if (typeof e.preventDefault === "function") {
        e.preventDefault();
      }
    }
    return $codeLangagesHolder.find('span:visible').fadeOut('fast', function() {
      if ($(this).next().size()) {
        return $(this).next().fadeIn('fast', langageHolderAnimationStart);
      } else {
        return $(this).siblings().first().fadeIn('fast', langageHolderAnimationStart);
      }
    });
  };

  statePopped = function(e) {
    e.preventDefault();
    if (e.state != null) {
      return scrollToSelector('#' + e.state);
    }
  };

  changeHistory = function(sSection) {
    sSection = sSection.replace('#', '');
    return history.pushState(sSection, null, sSection);
  };

  scrollToSelector = function(sSelector) {
    $('html, body').animate({
      scrollTop: $(sSelector).offset().top
    }, 'slow', function() {
      return scrolling();
    });
    return scrolling();
  };

  internalLinkClicked = function(e) {
    var sTarget;
    e.preventDefault();
    sTarget = $(this).attr('href');
    scrollToSelector(sTarget);
    if (!window.isLessThanIE9) {
      return changeHistory(sTarget);
    }
  };

  phoneLinkClicked = function(e) {
    e.preventDefault();
    return $(this).find('span').fadeToggle('fast');
  };

  $(function() {
    $splash = $('#splash');
    $splashLogo = $splash.find('span.logo');
    $stickyHeader = $('header#main');
    $stickyHeaderBox = $stickyHeader.find('nav');
    $codeLangagesHolder = $('#code .content blockquote');
    $('a[rel="external"]').attr('target', '_new');
    $('a[rel="internal"]').on('click', internalLinkClicked);
    $('#splash .message').on('click', function() {
      return scrollToSelector('#intro');
    });
    prepareLangageAnimation(!window.isLessThanIE9);
    $(window).on('popstate', statePopped);
    if (!(location.pathname === '' || location.pathname === '/' || location.pathname === '/index.html')) {
      scrollToSelector(location.pathname.replace('/', '#'));
    }
    if (bIsMobile === false) {
      computeScrollPositions();
      $(window).on('scroll', scrolling);
      $(window).on('resize', computeScrollPositions);
      return $('#phone').on('click', phoneLinkClicked);
    } else {
      return setTimeout(function() {
        return window.scrollTo(0, 1);
      }, 0);
    }
  });

}).call(this);
