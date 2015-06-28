module.exports = function (grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'dynamic-theme.js',
        'Gruntfile.js'
      ]
    },

    jscs: {
      options: {
        config: '.jscsrc',
      },
      all: [
        'dynamic-theme.js',
        'Gruntfile.js'
      ]
    }
  });

  grunt.registerTask('test', ['jscs', 'jshint']);
};
