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
        templateData: 'config/config.json',
        output: 'index.html'
      }
    },
    watch: {
      config: {
        files: ['templates/**/*.handlebars', 'config/config.json'],
        tasks: ['compile-handlebars:config']
      }
    }
  });

  grunt.registerTask('build', ['compass:dist', 'compile-handlebars:config']);
  grunt.registerTask('default', ['build', 'watch']);
};
