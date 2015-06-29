;(function ($, window, document, undefined) {
  'use strict';

  var pluginName = 'dynamicTheme',
      defaults = {
        'quality': 10
      };

  function Plugin(element, options) {
    this.element = element;

    this.options = $.extend({}, defaults, options);

    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }

  Plugin.prototype = {
    init: function () {
      if (this.checkOptions() && this.checkDependencies()) {
        var color = this.getDominantColor();
        color = this.convertColor(color);

        this.updateMetaTag(color);
      }
    },

    checkOptions: function () {
      var isValid = true;

      if (!this.isAValidImageSelector()) {
        isValid = false;
        console.error('Inform a valid selector, must be a jQuery object');
      }

      if (typeof this.options.quality !== 'number') {
        isValid = false;
        console.error('Inform a valid quality param, must be an integer number');
      }

      return isValid;
    },

    checkDependencies: function () {
      var isValid = true;

      if (typeof ColorThief === 'undefined') {
        isValid = false;
        console.error('Dependencies missing: ColorThief');
      }

      return isValid;
    },

    isAValidImageSelector: function () {
      return $(this.element) !== undefined && $(this.element) instanceof jQuery && $(this.element).length === 1;
    },

    getDominantColor: function() {
      var colorThief = new ColorThief();

      return colorThief.getColor(this.element, this.options.quality);
    },

    convertColor: function (color) {
      return 'rgb(' + color[0] + ', ' + color[1] + ', ' + color[2] + ')';
    },

    updateMetaTag: function (color) {
      $('meta[name="theme-color"]').attr('content', color);
    }
  };

  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
      }
    });
  };
})(jQuery, window, document);
