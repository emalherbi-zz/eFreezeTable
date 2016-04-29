/*!
 * eFreezeTable v1.0.0 (http://emalherbi.github.io/eFreezeTable/)
 * Copyright 2016 emalherbi
 * Licensed under MIT (http://en.wikipedia.org/wiki/MIT_License)
 */
(function($){

  if(!$.eFreezeTable){
    $.eFreezeTable = {};
  }

  $.eFreezeTable = function(el, options) {
    var base = this;

    base.$el = $(el);
    base.el  = el;

    base.initialize = function() {
      base.options = $.extend({},$.eFreezeTable.defaultOptions, options);
    };

    base.freezeHeadFoot = function() {
      var $fixed = null;
      var $el = base.$el;

      function initHeadFoot() {
        $el.wrap('<div class="efreezetable-container" />');

        $fixed = $el.clone();
        $fixed.attr('id', $fixed.attr('id') + '-fixed');
        $fixed.find("tbody").remove().end().addClass("efreezetable-fixed").insertBefore($el);

        resizeFixedHeadFoot();
      }

      function resizeFixedHeadFoot() {
        $fixed.find("th").each(function(index) {
          $(this).css("width", $el.find("th").eq(index).outerWidth() + "px");
        });
      }

      function scrollFixedHeadFoot() {
        var offset = $(this).scrollTop(),
        tableOffsetTop = $el.offset().top,
        tableOffsetBottom = tableOffsetTop + $el.height() - $el.find("thead").height();

        if (offset < tableOffsetTop || offset > tableOffsetBottom) {
          $el.find("tfoot").css('display', 'table-footer-group');
          $fixed.hide();
        } else if (offset >= tableOffsetTop && offset <= tableOffsetBottom && $fixed.is(":hidden")) {
          $el.find("tfoot").css('display', 'none');
          $fixed.show();
        }
      }

      $(window).resize(resizeFixedHeadFoot);
      $(window).scroll(scrollFixedHeadFoot);

      initHeadFoot();
    };

    base.freezeHead = function() {
      var $fixed = null;
      var $el = base.$el;

      function initHead() {
        $el.wrap('<div class="efreezetable-container" />');

        $fixed = $el.clone();
        $fixed.attr('id', $fixed.attr('id') + '-fixed');
        $fixed.find("tbody").remove().end().find("tfoot").remove().end().addClass("efreezetable-fixed").insertBefore($el);

        resizeFixedHead();
      }

      function resizeFixedHead() {
        $fixed.find("th").each(function(index) {
          $(this).css("width", $el.find("th").eq(index).outerWidth() + "px");
        });
      }

      function scrollFixedHead() {
        var offset = $(this).scrollTop(),
        tableOffsetTop = $el.offset().top,
        tableOffsetBottom = tableOffsetTop + $el.height() - $el.find("thead").height();

        if (offset < tableOffsetTop || offset > tableOffsetBottom) {
          $fixed.hide();
        } else if (offset >= tableOffsetTop && offset <= tableOffsetBottom && $fixed.is(":hidden")) {
          $fixed.show();
        }
      }

      $(window).resize(resizeFixedHead);
      $(window).scroll(scrollFixedHead);

      initHead();
    };

    base.initialize();

    var r = null;
    if (base.options.method == 'freezehead' || base.options.method == 'freezeHead') {
      r = base.freezeHead();
    }
    else if (base.options.method == 'freezeheadfoot' || base.options.method == 'freezeHeadFoot') {
      r = base.freezeHeadFoot();
    }

    return r;
  };

  $.eFreezeTable.defaultOptions = {
    method : '',
    params : ''
  };

  $.fn.eFreezeTableHead = function() {
    return this.each(function() {
      $.eFreezeTable(this, { method : 'freezehead' });
    });
  };

  $.fn.eFreezeTableHeadFoot = function() {
    return this.each(function() {
      $.eFreezeTable(this, { method : 'freezeheadfoot' });
    });
  };

})(jQuery);
