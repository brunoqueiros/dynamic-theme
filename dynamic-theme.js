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
