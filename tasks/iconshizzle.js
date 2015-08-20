/*
 * grunt-iconshizzle
 * https://github.com/dapenguin/gruntIconShizzle
 *
 * Copyright (c) 2015 Anthony Jeffery
 * Licensed under the MIT license.
 */

'use strict';

var IconShizzle = require('iconshizzle');
var os = require('os');
var path = require('path');
var fs = require('fs-extra');

module.exports = function(grunt) {
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('iconshizzle', 'Plugin for creating an SVG SASS file, with a fallback to PNG sprites of different sizes.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      actualSassFile: '',
      svgCssOptions: {},
      pngFileOptions: {
        compress: false,
        optimizationLevel: 3,
        dimensions: [
          {
            width: "400px",
            height: "300px"
          }
        ]
      },
      pngSpriteOptions: {
        template: 'lib/pngIconMixin.hbs',
        spriteCssFile: 'example/output/pngSprite.css'
      },
      tmpPath: os.tmpDir(),
      tmpDir: "grunt-iconshizzle-tmp"
    });

    var done = this.async();

    var svgFiles = this.filesSrc;
    var i = 0;
    var il = svgFiles.length;

    // Set the paths in our options to full paths
    var tmpFullPath = path.join(options.tmpPath,options.tmpDir);
    var sassFileFullPath = path.resolve(options.actualSassFile);
    options.svgCssOptions.template = path.resolve(options.svgCssOptions.template);
    options.pngFileOptions.outputFolder = path.resolve(options.pngFileOptions.outputFolder);

    // Remove temp directory if it exists
    if (fs.existsSync(tmpFullPath)){
      fs.removeSync(tmpFullPath);
    }

    // Create tmp directory
    fs.mkdirSync(tmpFullPath);

    // Copy all SVGs to temp directory.
    // Needs to be done by looping through all the files and copying one by one.
    for (;i<il;i++){
      fs.copySync(svgFiles[i],path.join(tmpFullPath,path.basename(svgFiles[i])));
    }

    // Process SVGs
    var iShiz = new IconShizzle(tmpFullPath, options);
    iShiz.process(function(value){
      // Delete temp directory
      fs.removeSync(tmpFullPath);
    });
  });
};
