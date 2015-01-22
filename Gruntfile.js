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
      src: {
        template: 'src/templates/index.handlebars',
        templateData: 'config/config.json',
        output: 'src/index.html'
      }
    },
    watch: {
      config: {
        files: [
          './src/templates/*.handlebars',
          './src/templates/**/*.handlebars',
          './config/config.json'
        ],
        tasks: ['compile-handlebars:src']
      },
      browserify: {
        files: [
          './config/config.js',
          './config/config.json'
        ],
        tasks: ['browserify:config']
      },
      livereload: {
        files: [
          'src/index.html',
          'src/config.json',
          'src/**/*.css',
          'src/**/*.js',
          'src/img/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        options: {
          livereload: true
        }
      }
    },
    browserify: {
      options: {
          browserifyOptions: {
            standalone: "ReliefwebWidgets"
          }
      },
      config: {
        src: './config/config.js',
        dest: './src/js/browserfy.config.js'
      }
    },
    connect: {
      default: {
        options: {
          base: 'src',
          port: 9001,
          open: true,
          livereload: true
        }
      },
      dist: {
        options: {
          base: 'dist',
          port: 9001,
          open: true,
          keepalive: true
        }
      }
    },
    clean: {
      dist: [ 'dist' ]
    },
    copy: {
      base: {
        files: [
          {
            src: 'config/config.json',
            dest: 'src/config.json'
          }
        ]
      },
      dist: {
        files: [
          {
            src: 'config/config.json',
            dest: 'dist/config.json'
          },
          {
            expand: true,
            src: ['bower_components/**', 'img/**', 'fonts/**', 'font-awesome/**', 'less/**', 'index.html' ],
            dest: 'dist',
            cwd: 'src'
          }
        ]
      }
    },
    useminPrepare: {
      html: 'src/index.html',
      options: {
        dest: 'dist'
      }
    },
    usemin: {
      html: ['dist/*.html']
    }
  });

  grunt.registerTask('build', [
    'copy:base',
    'compass:dist',
    'compile-handlebars:src',
    'browserify'
  ]);

  grunt.registerTask('default', [
    'build',
    'connect:default',
    'watch'
  ]);

  grunt.registerTask('serve', [
    'clean',
    'build',
    'useminPrepare',
    'concat',
    'uglify',
    'cssmin',
    'copy:dist',
    'usemin',
    'connect:dist'
  ]);
};
