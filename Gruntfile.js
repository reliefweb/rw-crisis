"use strict";

module.exports = function (grunt) {
  // Load grunt tasks automatically.
  require('load-grunt-tasks')(grunt, {pattern: ['grunt-*']});

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.initConfig({
    compass: {
      build: {
        options: {
          config: "compass.rb",
          bundleExec: true
        }
      }
    },
    'compile-handlebars': {
      src: {
        template: 'src/templates/index.handlebars',
        templateData: 'config/config.json',
        output: 'dist/index.html'
      }
    },
    watch: {
      html: {
        files: [
          'src/templates/index.handlebars'
        ],
        tasks: [ 'compile-handlebars', 'useminPrepare', 'usemin' ]
      },
      css: {
        files: [ 'src/scss/**' ],
        tasks: [
          'compass',
          'copy:css'
        ]
      },
      js: {
        files: [ 'src/js/**' ],
        tasks: [
          'copy:js'
        ]
      },
      livereload: {
        files: [
          'dist/**', 'dist/**/*'
        ],
        options: {
          livereload: true
        }
      }
    },
    jshint: {
      all: [
        'config/config.js'
      ]
    },
    connect: {
      dist: {
        options: {
          base: 'dist',
          port: 9001,
          open: true,
          keepalive: true,
          middleware: function (connect, options, middlewares) {
            middlewares.unshift(function(req, res, next) {
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.setHeader('Access-Control-Allow-Methods', '*');
              next();
            });

            return middlewares;
          }
        }
      },
      develop: {
        options: {
          base: 'dist',
          port: 9001,
          open: true,
          middleware: function (connect, options, middlewares) {
            middlewares.unshift(function(req, res, next) {
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.setHeader('Access-Control-Allow-Methods', '*');
              next();
            });

            return middlewares;
          }
        }
      }
    },
    shell: {
      collect: {
        command: 'bin/collect | node_modules/.bin/bunyan'
      }
    },
    clean: {
      dist: [ 'dist' ]
    },
    copy: {
      dist: {
        files: [
          {
            expand: true,
            src: [ 'bower_components/**', 'img/**', 'fonts/**', 'js/**' ],
            dest: 'dist',
            cwd: 'src'
          }
        ]
      },
      js: {
        files: [
          {
            expand: true,
            src: [ 'js/**' ],
            dest: 'dist',
            cwd: 'src'
          }
        ]
      },
      config: {
        files: [
          {
            src: [ 'config/config.json' ],
            dest: 'dist/config.json'
          },
          {
            expand: true,
            src: [ '*' ],
            dest: 'dist/config',
            cwd: 'config/config'
          }
        ]
      }
    },
    useminPrepare: {
      html: 'dist/index.html',
      options: {
        'dest': 'dist'
      }
    },
    usemin: {
      html: ['dist/*.html']
    }
  });

  grunt.registerTask('default', [
    'compass',
    'shell:collect',
    'compile-handlebars:src',
    'jshint'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'compile-handlebars',
    'copy:dist',
    'compass',
    'shell:collect',
    'copy:config',
    'useminPrepare',
    'concat:generated',
    'cssmin:generated',
    'uglify:generated',
    'usemin'
  ]);

  grunt.registerTask('watchSrc', [
    'build',
    'connect:develop',
    'watch'
  ]);

  grunt.registerTask('release', [ 'build' ]);

  grunt.registerTask('serve', [
    'connect:dist'
  ]);

  grunt.registerTask('start', [
    'release',
    'serve'
  ]);
};
