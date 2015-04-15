"use strict";

module.exports = function (grunt) {
  // Load grunt tasks automatically.
  require('load-grunt-tasks')(grunt, {pattern: ['grunt-*']});

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  var environmentId = process.env.NODE_ENV || 'dev';
  grunt.verbose.writeln('Running grunt for environment "' + environmentId + '"');

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
          'compass'
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
        'src/js/iframe-builder.js',
        'src/js/scrolling-nav.js'
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
          livereload: true,
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
      },
      'collect-local': {
        command: 'bin/collect --local | node_modules/.bin/bunyan'
      },
      'load-stage': {
        command: 'bin/load http://crisis.rwdev.org/ http://embed.rwdev.org/'
      },
      'load-prod': {
        command: 'bin/load http://crisis.rwlabs.org/syria/ http://embed.rwlabs.org/'
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
          },
          {
            src: 'env/' + environmentId + '/robots.txt',
            dest: 'dist/robots.txt',
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
    cacheBust: {
      assets: {
        options: {
          rename: false
        },
        files: [{
          src: ['dist/index.html']
        }]
      }
    },
    usemin: {
      html: ['dist/*.html']
    },
    pagespeed: {
      options: {
        nokey: true
      },
      'prod-desktop': {
        url: 'http://crisis.rwlabs.org/syria',
        locale: 'en_US',
        strategy: 'desktop',
        threshold: 90
      },
      'prod-mobile': {
        url: 'http://crisis.rwlabs.org/syria',
        locale: 'en_US',
        strategy: 'mobile',
        threshold: 75
      },
      'stage-desktop': {
        url: 'http://crisis.rwdev.org',
        locale: 'en_US',
        strategy: 'desktop',
        threshold: 90
      },
      'stage-mobile': {
        url: 'http://crisis.rwdev.org',
        locale: 'en_US',
        strategy: 'mobile',
        threshold: 75
      }
    }
  });

  grunt.registerTask('default', [
    'clean:dist',
    'compile-handlebars',
    'copy:dist',
    'compass',
    'collector',
    'useminPrepare',
    'concat:generated',
    'cssmin:generated',
    'uglify:generated',
    'usemin',
    'cacheBust'
  ]);
  grunt.registerTask('build', [ 'default' ]);
  grunt.registerTask('release', [ 'default' ]);

  grunt.registerTask('validate', [
    'jshint'
  ]);

  grunt.registerTask('collector', 'Collect remote data via API calls and position resulting files in dist.', function() {
    var collect = 'shell:collect';
    if (grunt.option('local'))
      collect = collect + '-local';

    grunt.task.run([
      collect,
      'copy:config'
    ]);
  });

  grunt.registerTask('watchSrc', [
    'default',
    'connect:develop',
    'watch'
  ]);

  grunt.registerTask('serve', [
    'connect:dist'
  ]);

  grunt.registerTask('start', [
    'release',
    'serve'
  ]);

  grunt.registerTask('test-perf', 'Test the Crisis Page performance.', function(env) {
    grunt.task.run([
      'pagespeed:' + env + '-desktop',
      'pagespeed:' + env + '-mobile',
      'shell:load-' + env
    ]);
  });

};
