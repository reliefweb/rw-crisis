'use strict';

module.exports = function (grunt) {
  // Load grunt tasks automatically.
  require('load-grunt-tasks')(grunt, {pattern: ['grunt-*','grunt-contrib-*']});

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.initConfig({
    compass: {
      dist: {
        options: {
          config: "config.rb",
          bundleExec: true
        }
      }
    },
    'compile-handlebars': {
      config: {
        template: 'templates/index.handlebars',
        templateData: 'templates/config.json',
        output: 'index.html'
      }
    }
  });

  grunt.registerTask('default', ['compass:dist', 'compile-handlebars:config']);
};
