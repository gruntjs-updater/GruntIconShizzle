/*
 * grunt-iconshizzle
 * https://github.com/dapenguin/gruntIconShizzle
 *
 * Copyright (c) 2015 Anthony Jeffery
 * Licensed under the MIT license.
 */

'use strict';

var IconShizzle = require('iconshizzle');

module.exports = function(grunt) {
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('iconshizzle', 'Plugin for creating an SVG SASS file, with a fallback to PNG sprites of different sizes.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      svgLocation: '',
      actualSassFile: '',
      sassOptions: {}
    });

    var iShiz = new IconShizzle(options.svgLocation,options.actualSassFile,options.sassOptions);
    iShiz.process();

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      // var src = f.src.filter(function(filepath) {
      //   // Warn on and remove invalid source files (if nonull was set).
      //   if (!grunt.file.exists(filepath)) {
      //     grunt.log.warn('Source file "' + filepath + '" not found.');
      //     return false;
      //   } else {
      //     return true;
      //   }
      // }).map(function(filepath) {
      //   // Read file source.
      //   return grunt.file.read(filepath);
      // }).join(grunt.util.normalizelf(options.separator));

      // // Handle options.
      // src += options.punctuation;

      // // Write the destination file.
      // grunt.file.write(f.dest, src);

      // // Print a success message.
      // grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
