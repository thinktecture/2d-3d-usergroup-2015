/// <reference path="../typings/tsd.d.ts" />
/// <reference path="arc.ts" />

class Demo {
    /**
     * The canvas where the chart will be drawn to
     */
    private _canvas: HTMLCanvasElement;
    
    /**
     * The 2D context of the canvas
     */
    private _context: CanvasRenderingContext2D;
    
    /**
     * Width in pixel without devicePixelRatio scaling of the canvas
     */
    private _width: number;
    
    /**
     * Height in pixel without devicePixelRatio scaling of the canvas
     */
    private _height: number;

    /**
     * Array of all the pie parts
     */
    private _pieParts: Array<Arc> = new Array<Arc>();
    
    /**
     * Will hold the current animation frame is the animation is running
     */
    private _animationFrame: number;

    constructor(canvas: HTMLCanvasElement, values: Array<number>) {
        // Assign parameters of the constructor to the private variables
        this._canvas = canvas;
        this._context = <CanvasRenderingContext2D> canvas.getContext('2d');

        this._width = canvas.width;
        this._height = canvas.height;

        this.adjustForRetina();
        this.createPieParts(values);
        this.assignEvents();
    }

    /**
     * Returns the devicePixelRatio or 1 
     */    
    private getDevicePixelRatio(): number {
        return window.devicePixelRatio || 1;
    }
    
    /**
     * Adjusts the canvas and the context for retina scaling (if devicePixelRatio > 1)
     */
    private adjustForRetina(): void {
        var factor: number;
        
        if ((factor = this.getDevicePixelRatio()) > 1) {
            this._canvas.width = this._width * factor;
            this._canvas.height = this._height * factor;

            this._canvas.style.width = this._width + 'px';
            this._canvas.style.height = this._height + 'px';

            this._context.scale(factor, factor);
        }
    }
    
    /**
     * Returns a random color
     */
    private getRandomColor(): Array<number> {
        return [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
    }
    
    /**
     * Calculates radiants from degrees
     */
    private degreesToRadiants(degrees: number): number {
        return (degrees * Math.PI) / 180;
    }
    
    /**
     * Creates the pie parts from the values
     */
    private createPieParts(values: Array<number>): void {
        var centerX: number = this._width / 2;
        var centerY: number = this._height / 2;
        var radius: number = this._width / 2 - 50;
        var rotationDeg: number = 0;

        values.forEach(value => {
            var arc = new Arc(this._context);

            arc.color = this.getRandomColor();
            arc.centerX = centerX;
            arc.centerY = centerY;
            arc.radius = radius;
            arc.startAngle = this.degreesToRadiants(rotationDeg);
            arc.endAngle = arc.startAngle + this.degreesToRadiants(value * 3.6);
            rotationDeg += value * 3.6;

            this._pieParts.push(arc);
        });
    }
    
    /**
     * Assigns mouse and touch events to the canvas
     */
    private assignEvents(): void {
        var that = this;

        that._canvas.addEventListener('mousemove', event => {
            event.preventDefault();
            that.handleMouseMove(event.layerX, event.layerY);
        });

        that._canvas.addEventListener('click', event => {
            event.preventDefault();
            that.toggleAnimation();
        });

        that._canvas.addEventListener('touchstart', event => {
            event.preventDefault();
            that.toggleAnimation();
        });

        that._canvas.addEventListener('touchmove', event => {
            event.preventDefault();
            console.log('touchmove');
            that.handleTouchMoveEvent(<TouchEvent>event);
        });
    }

    /**
     * Toggles the animation
     */
    private toggleAnimation(): void {
        if (this._animationFrame) {
            return this.stopAnimation();
        }

        this.startAnimation();
    }
    
    /**
     * Returns the correct positions of an event (mouse/touch)
     * 
     * See: http://stackoverflow.com/a/10816667/959687
     */
    private getOffset(event: any): any {
        var el = event.target,
            x = 0,
            y = 0;

        while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
            x += el.offsetLeft - el.scrollLeft;
            y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }

        x = event.clientX - x;
        y = event.clientY - y;

        return { x: x, y: y };
    }

    /**
     * Handles touch move. Will move the pie chart
     */
    private handleTouchMoveEvent(e: TouchEvent): void {
        var that = this;
        
        // .touches is an array containing one or more touch points for multi-touch scenarios
        var position = this.getOffset(e.touches[0]);

        this._pieParts.forEach(part => {
            part.centerX = position.x;
            part.centerY = position.y;
        });
        
        window.requestAnimationFrame(() => {
            that.draw();
        });
    }

    /**
     * Handles mouse move. Will simulate a "hover effect"
     */
    private handleMouseMove(x: number, y: number): void {
        var that = this;
        var factor = this.getDevicePixelRatio();
        var color = this._context.getImageData(x * factor, y * factor, 1, 1).data;

        this._pieParts.forEach(part => {
            if (part.color[0] === color[0] || part.color[0] === color[0] - 1 || part.color[0] === color[0] + 1) {
                part.alpha = 0.5;
            }
            else {
                part.alpha = 1;
            }
        });

        window.requestAnimationFrame(() => {
            that.draw();
        });
    }

    /**
     * Starts the animation sequence
     */    
    private startAnimation(): void {
        var that = this;
        var animationframeCallback = function() {
            that._pieParts.forEach(part => {
                part.rotation += that.degreesToRadiants(1);
            });

            that.draw();

            that._animationFrame = window.requestAnimationFrame(animationframeCallback);
        }

        that._animationFrame = window.requestAnimationFrame(animationframeCallback);
    }

    /**
     * Stops the animation sequence 
     */    
    private stopAnimation(): void {
        window.cancelAnimationFrame(this._animationFrame);
        this._animationFrame = undefined;
    }

    /**
     * Draws the chart :)
     */    
    public draw(): void {
        var c: CanvasRenderingContext2D = this._context;

        c.clearRect(0, 0, this._width, this._height);

        this._pieParts.forEach(part => {
            part.draw();
        });
    }
}