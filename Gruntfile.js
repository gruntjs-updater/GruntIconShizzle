/*
 * grunt-iconshizzle
 * https://github.com/dapenguin/GruntIconShizzle
 *
 * Copyright (c) 2015 Anthony Jeffery
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    iconshizzle: {
      test: {
        options: {
          actualSassFile: 'example/output/result.css',
          svgCssOptions: {
            prefix: ".icon-", // used to prefix the name of the file for the CSS classname, .icon- is the default
            templatePrepend: "/* Start of SVG icons */\n", // this string is prepended to the destinationCSSFile, defaults to ""
            template: 'example/input/templates/default-css.hbs', //template in handlebars, FANCY!
            templateAppend: "/* End of SVG icons */" // this string is appended to the destinationCSSFile, defaults to ""
          },
          pngFileOptions: {
            outputFolder: 'example/output/',
            compress: false,
            optimizationLevel: 3,
            dimensions: [
              {
                width: "400px",
                height: "300px"
              },
              {
                width: "40px",
                height: "40px"
              }
            ]
          },
          pngSpriteOptions: {
            template: 'example/input/templates/pngIconMixin.hbs',
            spriteCssFile: 'example/output/pngSprite.scss'
          }
        },
        files: {
          'tmp/default_options': ['example/input/svg/**/*.svg']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'iconshizzle', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
