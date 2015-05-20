# .NET UserGroup Karlsruhe 2D & 3D Examples

This repository contains the examples shown in .NET UserGroup Karlsruhe. 

# 2D

Example1 to Example7 are consecutively built. Example1 is the base, Example2 is Example1 with additions and so on. 

## Examples

1. Example: Simple circle
2. Example: Circle with gradient
3. Example: Retina scaling
4. Example: RequestAnimationFrame
5. Example: Time-based animations
6. Example: Mouse Move
7. Example: Touch Move
8. Example: Manipulating a rectangle with HammerJS

## Requirements

* [NodeJS & npm](https://nodejs.org/)
* Optional: cordova, xcode, android-sdk (only if you want to compile the cordova part)

## Build

The examples are written in TypeScript and will be compiled to ES5 using gulp. To get the examples up & running, do the following:

1. Point your terminal to the 2D subfolder.
2. Execute `npm install` to install all necessary packages.
3. Execute `sh build.sh` to start the default gulp task, which will compile the *.ts files, concat them into a single file and outputs it to the dist folder. Sourcemaps are generated, too.
4. Optional: Execute `node_modules/.bin/tsd reinstall --save --overwrite` to install type definitions for better intellisense for the `gulpfile.js`.
5. Open index.html in your browser

By using query parameters you can switch, which example will be used for rendering: 

* examples.html?example1 will run Example 1
* examples.html?example2 will run Example 2
* You get the idea. :)

## Cordova

The 2D examples can be deployed to iOS and Android by cordova. All necessary files are included in the cordova folder. To run, just use the provides `deploy.sh` script by executing `sh deploy.sh`. 
It will use gulp for copying the files to the cordova/www folder and then executes `cordova run --device` which will deploy to all connected devices. 

# 3D

This sample shows the planet Earth, surrounded by little stars. You can interact with the sample using mouse or touch input across several platforms and browsers.

## Requirements

* [NodeJS & npm](https://nodejs.org/)
* Optional: cordova, ionic, xcode, android-sdk, Visual Studio (only if you want to compile the cordova part)

## Run

To run the example, please host the source files in any web server and open `index.html`.

## Ionic/Cordova

The 3D examples can be deployed to iOS (8+), Android, Windows (8.1+) and Windows Phone (8.1+). All necessary files are included in the cordova folder. To run, follow these steps:

1. Point your terminal to the 3D subfolder
2. Run `gulp deploy` to copy www content to the cordova folder
3. Switch to the cordova folder
4. Add the platforms you wish to deploy for (e.g. `ionic platform add ios`)
5. Optional: run `ionic browser add crosswalk` to use Crosswalk when targeting Android

After this initial setup, you can run `sh deploy.sh` in the 3D subfolder in order to deploy the app to all connected devices. 

## Credits
Earth texture: NASA/Goddard Space Flight Center Scientific Visualization Studio The Blue Marble Next Generation data is courtesy of Reto Stockli (NASA/GSFC) and NASA's Earth Observatory.

# Resources

* http://www.typescriptlang.org/ TypeScript
* http://gulpjs.com/ Gulp
* https://cordova.apache.org/ Cordova
* http://ionicframework.com/docs/ Ionic Framework
* http://hammerjs.github.io/ Library for touch and gestures
* http://weblogs.thinktecture.com/christian_liebel/2015/05/enabling-cross-platform-touch-interactions-pointer-vs-touch-events.html Enabling cross-platform touch interactions
* http://www.html5rocks.com/en/ A lot of tutorials about HTML5
* http://www.html5rocks.com/en/search?q=canvas Canvas related articles, tutorials, ...
* http://www.html5rocks.com/en/tutorials/canvas/performance/ Canvas performance
* https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D CanvasRendingContext2D API
* https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame MDN requestAnimationFrame
* http://www.w3.org/TR/2dcontext/ 2D API specification
* https://developer.mozilla.org/en-US/docs/Games/Anatomy Good overview about animations and the loop
* https://gist.github.com/paulirish/1579671 Example for a requestAnimationFrame polyfill
* http://gafferongames.com/game-physics/fix-your-timestep/ Time based animations
* http://threejs.org/ three.js
* https://developer.mozilla.org/de/docs/Web/WebGL WebGL docs in MDN
* https://msdn.microsoft.com/library/dn479430(v=vs.85).aspx three.js tutorial
* http://webglstats.com/ WebGL browser support statistics
* http://codeflow.org/entries/2014/jun/08/some-issues-with-apples-ios-webgl-implementation/ Issues with iOS Web GL implementation
* https://www.khronos.org/registry/webgl/specs/latest/ WebGL specification
* https://luic.github.io/WebGL-Performance-Benchmark/ WebGL Performance Benchmark
* http://www.realtimerendering.com/blog/webgl-debugging-and-profiling-tools/ WebGL Debugging and Profiling tools
* http://blog.teamtreehouse.com/3d-in-the-browser-webgl-versus-css-3d-transforms WebGL vs. CSS 3D
* https://crosswalk-project.org/ Crosswalk: Web Runtime for Android and Cordova apps

# Interesting projects

* http://paperjs.org/ Framework for vector based graphics on top of HTML5 Canvas
* https://playcanvas.com/ HTML5 Game Engine
* https://chandlerprall.github.io/Physijs/ Physics-Plugin for three.js
* https://tparisi.github.io/glam/ GLAM.js – GL And Markup