/// <reference path="../typings/tsd.d.ts" />

class Demo {
    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;
    private _width: number;
    private _height: number;
    private _x: number = 200;
    private _y: number = 200;
    private _mx: number = 10;
    private _my: number = 10;
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
        if (!window.devicePixelRatio || window.devicePixelRatio <= 1) {
            return;
        }

        var width = this._canvas.width;
        var height = this._canvas.height;
        var factor = window.devicePixelRatio;

        this._canvas.style.width = width + 'px';
        this._canvas.style.height = height + 'px';

        this._canvas.width = width * factor;
        this._canvas.height = height * factor;

        this._context.scale(factor, factor);
    }
    
    private assignEvents(): void {
        var that = this;
        
        this._canvas.addEventListener('mousemove', function(event) {
            that.handleMouseMove(event);
        });
        
        this._canvas.addEventListener('mouseleave', function() {
            that._canBounce = true;
        });
        
        this._canvas.addEventListener('mouseenter', function() {
            that._canBounce = false;
        });
        
        this._canvas.addEventListener('touchmove', function(event) {
            that.handleTouchMove(<TouchEvent>event);
        });
        
        this._canvas.addEventListener('touchstart', function() {
            that._canBounce = false;
        });
        
        this._canvas.addEventListener('touchend', function() {
            that._canBounce = true;
        });
    }
    
    private handleMouseMove(event: MouseEvent) {
        this._x = event.layerX;
        this._y = event.layerY;
    }
    
    private handleTouchMove(event: TouchEvent) {
        this._x = event.touches[0].clientX;
        this._y = event.touches[0].clientY;
        this.draw();
    }
    
    private calculateNewPosition(): void {
        if (this._x > this._width || this._x < 0) {
            this._mx *= -1;
        }
        
        if (this._y > this._height || this._y < 0) {
            this._my *= -1;
        }
        
        this._x += this._mx;
        this._y += this._my;
    }
    
    private startAnimation(): void {
        var that = this;
        
        var animationFrame = function() {
            if (that._canBounce) {
                that.calculateNewPosition();
            }    
            
            that.draw();
            
            window.requestAnimationFrame(animationFrame);
        };
        
        window.requestAnimationFrame(animationFrame);
    }
    
    public draw(): void {
        var c: CanvasRenderingContext2D = this._context;
        
        c.clearRect(0, 0, this._width, this._height);
        
        c.fillRect(10, 10, 100, 100);
        
        c.beginPath();
        c.arc(this._x, this._y, 50, 0, 2 * Math.PI);
        c.closePath();
        c.fill();
    }
}