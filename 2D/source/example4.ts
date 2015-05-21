/**
 * As Example 3, with animation
 */
class Example4 {
    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;
    private _width: number;
    private _height: number;

    private _circleX: number;
    private _circleY: number;
    private _circleRadius: number;
    private _moveX: number = 10;
    private _moveY: number = 10;

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
    }

    private initializeCircleProperties(): void {
        // Points where the circle will be, so the gradient can be adjusted as well
        this._circleX = 50;
        this._circleY = 150;
        this._circleRadius = 50;
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

    public draw(): void {
        // Save the canvas context, so we can set our own values
        this._context.save();
        
        // Create a linear gradient from black to white
        var gradient = this._context.createLinearGradient(this._circleX - this._circleRadius, this._circleY - this._circleRadius,
            this._circleX - this._circleRadius, this._circleY + this._circleRadius);
        gradient.addColorStop(0, '#000000');
        gradient.addColorStop(1, '#FFFFFF');
        
        // Begin a new path (creates a new path stack)
        this._context.beginPath();
        
        // Draw the circle
        // Start from angle 0
        // End at angle 2 * Math.Pi (full circle)
        this._context.arc(this._circleX, this._circleY, this._circleRadius, 0, 2 * Math.PI);
        
        // Close the path
        this._context.closePath();
        
        // assign the gradient and fill the circle with it
        this._context.fillStyle = gradient;
        this._context.fill();

        this._context.restore();
    }
    
    private bounceCircle(): void {
        
        // Will the next move hit our boundaries? If yes, revert the direction
        if (this._circleX + this._circleRadius > this._width || this._circleX - this._circleRadius < 0) {
            this._moveX *= -1;
        }
        
        if (this._circleY + this._circleRadius > this._height || this._circleY - this._circleRadius < 0) {
            this._moveY *= -1;
        }
        
        // Move the ball
        this._circleX += this._moveX;
        this._circleY += this._moveY;
    }

    public start(): void {
        // Save the reference, so we can use it inside the animation frame
        var that = this;
        
        var animationFrame = function() {
            // Clear the area at first
            // The easy version is to the clear complete context by
            // that._context.clearRect(0, 0, that._width, that._height);
            // For demonstration we clear only the circle itself
            that._context.clearRect(that._circleX - that._circleRadius, that._circleY - that._circleRadius,
                that._circleRadius * 2, that._circleRadius * 2);
            
            // Calculate the new position
            that.bounceCircle();
            
            that.draw();
           
            // Request another frame
            // We have an infinite loop now
            window.requestAnimationFrame(animationFrame);
        }

        // Initial call to request a single animation frame        
        window.requestAnimationFrame(animationFrame);
    }
}