/// <reference path="../typings/tsd.d.ts" />

/**
 * Manipulating a rect with HammerJS
 */
class Example8 {
    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;
    private _width: number;
    private _height: number;

    private _rectX: number;
    private _rectY: number;
    private _rectWidth: number;
    private _rectHeight: number;
    private _lastRectX: number;
    private _lastRectY: number;
    private _lastRectWidth: number;
    private _lastRectHeight: number;
    private _direction: number;
    
    /**
     * Will be set to true, when rectangle can be manipulated.
     * First touch point has to be within the rectangle boundaries.
     */
    private _canManipulate: boolean = false;

    constructor(canvas: HTMLCanvasElement) {
        if (!canvas) {
            throw 'No canvas!';
        }

        this._canvas = canvas;
        this._width = canvas.width;
        this._height = canvas.height;
        this._context = <CanvasRenderingContext2D> canvas.getContext('2d');

        this.adjustForRetina();
        this.initializeCircleProperties();
        this.assignEvents();
    }

    private assignEvents(): void {
        var that = this;

        var hammer = new Hammer.Manager(this._canvas);
        
        // Add a recognizer for panning which will recognize all directions (per default, it would recognize horizontal panning only)
        hammer.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }));

        hammer.on('panstart', function(event) {
            that.handlePanStart(event);
        });

        hammer.on('panmove', function(event) {
            that.handlePanMove(event);
        });
        
        hammer.on('panend', function(event) {
            that.handlePanEnd(event);
        });
        
        hammer.add(new Hammer.Pinch());
        
        hammer.on('pinchstart', function(event) {
            that.handlePinchStart(event);
        });
        
        hammer.on('pinchmove', function(event) {
            that.handlePinchMove(event);
        });
        
        hammer.on('pinchend', function(event) {
            that.handlePinchEnd(event);
        });
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

        // Adopted for HammerJS        
        x = event.center.x - x;
        y = event.center.y - y;

        return { x: x, y: y };
    }
    
    private isHit(x: number, y: number): boolean {
        // Is the Center of the hammer input within the rect? 
        return x >= this._rectX && x <= this._rectX + this._rectWidth
            && y >= this._rectY && y <= this._rectY + this._rectHeight;
    }
    
    private handlePinchStart(e: HammerInput): void {
        // Don't hit test pinch event. If rectangle is too small, we never can hit it. 
        this._lastRectHeight = this._rectHeight;
        this._lastRectWidth = this._rectWidth;
    }
    
    private handlePinchMove(e: HammerInput): void {
        if (!this._direction) {
            this._direction = e.direction;
        }
        
        var direction = this._direction;
        
        if (direction === Hammer.DIRECTION_DOWN || direction === Hammer.DIRECTION_UP) {
            this._rectHeight = this._lastRectHeight * e.scale;
        }
        
        if (direction === Hammer.DIRECTION_LEFT || direction === Hammer.DIRECTION_RIGHT) {
            this._rectWidth = this._lastRectWidth * e.scale;
        }
    }
    
    private handlePinchEnd(e: HammerInput): void {
        this._canManipulate = false;
        this._direction = undefined;
    }
   
    private handlePanStart(e: HammerInput): void {
        var pos = this.getOffset(e);
        
        if (this.isHit(pos.x, pos.y)) {
            this._canManipulate = true;
        }

        this._lastRectX = this._rectX;
        this._lastRectY = this._rectY;
    }

    private handlePanMove(e: HammerInput): void {
        if (!this._canManipulate) {
            return;
        }
        
        this._rectX = this._lastRectX + e.deltaX;
        this._rectY = this._lastRectY + e.deltaY;
    }

    private handlePanEnd(e: HammerInput): void {
        this._canManipulate = false;
    }
    
    private initializeCircleProperties(): void {
        // Points where the circle will be, so the gradient can be adjusted as well
        this._rectX = 50;
        this._rectY = 150;
        this._rectWidth = 100;
        this._rectHeight = 50;
    }

    private adjustForRetina(): void {
        // Is the devicePixelRatio available? If yes, we use it for scaling the canvas.
        // Scaling is only needed, if the ratio is > 1
        if (!window.devicePixelRatio || window.devicePixelRatio <= 1) {
            return;
        }

        var scaleFactor = window.devicePixelRatio;
        
        // Set the CSS width and height to the original values
        this._canvas.style.width = this._width + 'px';
        this._canvas.style.height = this._height + 'px';
        
        // Set the canvas width and height scaled by the device pixel ratio
        this._canvas.width = this._width * scaleFactor;
        this._canvas.height = this._height * scaleFactor;
        
        // Scale the drawing context
        this._context.scale(scaleFactor, scaleFactor);
    }

    public draw() {
        // Save the canvas context, so we can set our own values
        this._context.save();
        
        // Begin a new path (creates a new path stack)
        this._context.beginPath();
        
        // Draw a simple rect
        this._context.rect(this._rectX, this._rectY, this._rectWidth, this._rectHeight);
        
        // Close the path
        this._context.closePath();
        
        // Fill the rect
        this._context.fill();

        this._context.restore();
    }

    public start(): void {
        // Save the reference, so we can use it inside the animation frame
        var that = this;

        var animationFrame = function(timestamp: number) {
            that._context.clearRect(0, 0, that._width, that._height);
            that.draw();
            
            // Request another frame
            // We have an infinite loop now
            window.requestAnimationFrame(animationFrame);
        }

        // Initial call to request a single animation frame        
        window.requestAnimationFrame(animationFrame);
    }
}