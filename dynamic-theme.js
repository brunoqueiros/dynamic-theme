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
      console.log('init');
      if (this.checkOptions() && this.checkDependencies()) {
        var color = this.getDominantColor();
      }
    },

    checkOptions: function () {
      var isValid = true;

      if (!this.isAValidImageSelector(this.options.imageSelector)) {
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

    isAValidImageSelector: function (selector) {
      return selector !== undefined && selector instanceof jQuery && selector.length > 0;
    },

    getDominantColor: function() {
      var colorThief = new ColorThief();

      return colorThief.getColor(this.options.imageSelector[0], this.options.quality);
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
