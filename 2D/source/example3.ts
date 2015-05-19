/**
 * As Example 2, with retina scaling
 */
class Example3 {
    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;
    private _width: number;
    private _height: number;

    private _circleX: number;
    private _circleY: number;
    private _circleRadius: number;

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

        this._context.scale(scaleFactor, scaleFactor);
    }

    public draw() {
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
}