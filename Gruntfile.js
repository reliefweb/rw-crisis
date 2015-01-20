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
        template: 'src/templates/index.handlebars',
        templateData: 'config/config.json',
        output: 'src/index.html'
      }
    },
    watch: {
      config: {
        files: ['src/templates/**/*.handlebars', 'config/config.json'],
        tasks: ['compile-handlebars:config']
      }
    },
    connect: {
      serve: {
        options: {
          base: 'src',
          port: 9001,
          open: true,
          keepalive: true
        }
      }
    },
    copy: {
      base: {
        files: [
          {
            expand: true,
            src: 'bower_components/**',
            dest: 'src'
          },
          {
            src: 'config/config.json',
            dest: 'src/config.json'
          }
        ]
      }
    },
  });

  grunt.registerTask('build', ['copy:base', 'compass:dist', 'compile-handlebars:config']);
  grunt.registerTask('default', ['build', 'watch']);
  grunt.registerTask('serve', ['connect:serve']);
};
