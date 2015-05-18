# .NET UserGroup Karlsruhe 2D & 3D Examples

This repository contains the examples shown in .NET UserGroup Karlsruhe. 

# 2D

All 2D examples are consecutively built. Example1 is the base, Example2 is Example1 with additions and so on. 

## Examples

1. Example: Simple circle
2. Example: Circle with gradient
3. Example: Retina scaling
4. Example: RequestAnimationFrame
5. Example: Time-based animations
6. Example: Mouse Move
7. Example: Touch Move
8. Example: Manipulating a rectangle with HammerJS

## Build

The examples are written in TypeScript and will be compiled to ES5 using gulp. To get the examples up & running, do the following:

1. Point your terminal to the 2D subfolder.
2. Execute `npm install` to install all necessary packages.
3. Execute `sh build.sh` to start the default gulp task, which will compile the *.ts files, concat them into a single file and outputs it to the dist folder. Sourcemaps are generated, too.
4. Optional: Execute `node_modules/.bin/tsd reinstall --save --overwrite` to install type definitions for better intellisense for the `gulpfile.js`.
5. Open index.html in your browser

By using query parameters you can switch, which example will be used for rendering: 

* index.html?example1 will run Example 1
* index.html?example2 will run Example 2
* You get the idea. :)

# Resources

* http://www.typescriptlang.org/ Typescript
* http://gulpjs.com/ Gulp
* https://cordova.apache.org/ Cordova
* http://hammerjs.github.io/ Library for touch and gestures
* http://www.html5rocks.com/en/ A lot of tutorials about HTML5
* http://www.html5rocks.com/en/search?q=canvas Canvas related articles, tutorials, ...
* http://www.html5rocks.com/en/tutorials/canvas/performance/ Canvas performance
* https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D CanvasRendingContext2D API
* https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame MDN requestAnimationFrame
* http://www.w3.org/TR/2dcontext/ 2D API specification
* https://developer.mozilla.org/en-US/docs/Games/Anatomy Good overview about animations and the loop
* https://gist.github.com/paulirish/1579671 Example for a requestAnimationFrame polyfill
* http://gafferongames.com/game-physics/fix-your-timestep/ Time based animations

# Interesting projects

* http://paperjs.org/ Framework for vector based graphics on top of HTML5 Canvas
* https://playcanvas.com/ HTML5 Game Engine