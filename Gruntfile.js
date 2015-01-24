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
        templateData: 'src/config/config.json',
        output: 'src/index.html'
      }
    },
    watch: {
      bower: {
        files: ['bower.json','./src/index.html'],
        tasks: ['wiredep']
      },
      browserify: {
        files: [
          './src/config/config.js',
          './src/config/config.json'
        ],
        tasks: ['browserify:config']
      },
      config: {
        files: [
          './src/templates/*.handlebars',
          './src/templates/**/*.handlebars',
          './src/config/config.json'
        ],
        tasks: ['compile-handlebars:src']
      },
      compass: {
        files: ['src/**/*.{scss,sass}'],
        tasks: ['compass']
      },
      livereload: {
        files: [
          'src/templates/index.handlebars',
          'src/index.html',
          'src/config/config.json',
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
        src: './src/config/config.js',
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
      dist: {
        files: [
          {
            expand: true,
            src: ['img/**', 'fonts/**', 'index.html' ],
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
    // TODO: Not all bower components are being installed even though the main
    // is set inside the package.
    /*wiredep: {
      task: {
        src: ['./src/index.html']
      }
    }*/
  });

  grunt.registerTask('default', [
    'compass:dist',
    'compile-handlebars:src',
    //'wiredep',
    'browserify',
    'compass'
  ]);

  grunt.registerTask('watch', [
    'default',
    'connect:default',
    'watch'
  ]);

  grunt.registerTask('release', [
    'clean',
    'default',
    'useminPrepare',
    'concat',
    'uglify',
    'cssmin',
    'copy:dist',
    'usemin'
   ]);

  grunt.registerTask('serve', [
    'release',
    'connect:dist'
  ]);
};
