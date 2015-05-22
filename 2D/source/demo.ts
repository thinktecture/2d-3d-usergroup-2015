/// <reference path="../typings/tsd.d.ts" />

class Demo {
     private _canvas: HTMLCanvasElement;
     private _context: CanvasRenderingContext2D;
     private _width: number;
     private _height: number;

     private _x: number = 200;
     private _y: number = 200;
     private _vx: number = 10;
     private _vy: number = 10;
     private _canBounce: boolean = true;

     constructor(canvas: HTMLCanvasElement) {
          this._canvas = canvas;
          this._context = <CanvasRenderingContext2D> canvas.getContext('2d');

          this._width = canvas.width;
          this._height = canvas.height;

          this.adjustForRetina();
          this.assignEvents();
          this.startAnimation();
     }

     private adjustForRetina(): void {
          if (window.devicePixelRatio && window.devicePixelRatio > 1) {
               var factor = window.devicePixelRatio;

               this._canvas.width = this._width * factor;
               this._canvas.height = this._height * factor;

               this._canvas.style.width = this._width + 'px';
               this._canvas.style.height = this._height + 'px';

               this._context.scale(factor, factor);
          }

     }

     private assignEvents(): void {
          var that = this;
          
          this._canvas.addEventListener('mousemove', function(event: MouseEvent) {
               that._x = event.layerX;
               that._y = event.layerY;
          });
          
          this._canvas.addEventListener('touchmove', function(event: TouchEvent) {
               that._x = event.touches[0].clientX;
               that._y = event.touches[0].clientY;
          });
     }

     private startAnimation(): void {
          var that = this;

          var step = function() {
               that.calculateNewPosition();
               that.draw();
               
               window.requestAnimationFrame(step);
          }
          
          window.requestAnimationFrame(step);
     }

     private calculateNewPosition(): void {
          if (this._x > this._width || this._x < 0) {
               this._vx *= -1;
          }

          if (this._y > this._height || this._y < 0) {
               this._vy *= -1;
          }

          var test = "";          
          this._x += this._vx;
          this._y += this._vy;
     }

     public draw(): void {
          var c: CanvasRenderingContext2D = this._context;
          
          c.clearRect(0, 0, this._width, this._height
              );
          
          c.fillRect(10, 10, 100, 100);
          
          c.beginPath();
          c.arc(this._x, this._y, 50, 0, 2 * Math.PI);
          c.closePath();
          c.fill();
          //c.stroke();
     }
}