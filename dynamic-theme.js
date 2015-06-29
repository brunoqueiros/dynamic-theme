;(function (defaults, $, window, document, undefined) {
  'use strict';

  var pluginName = 'dynamicTheme',
      defaults = {};

  function Plugin(element, options) {
    this.element = element;

    this.options = $.extend({}, defaults, options);

    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }

  Plugin.prototype = {
    init: function () {}
  };

  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
      }
    });
  };
})(jQuery, window, document);


'use strict';

function DynamicTheme (options) {
  this.defaults = {
    'imageSelector': undefined,
    'quality': 10
  };

  $.extends(this.defaults, options);

  this.getDominantColor(this.defaults.imageSelector, this.defaults.quality);
};

DynamicTheme.prototype.getDominantColor = function() {
  var colorThief = new ColorThief();

  return colorThief.getColor(this.defaults.imageSelector[0], this.defaults.quality);
};
