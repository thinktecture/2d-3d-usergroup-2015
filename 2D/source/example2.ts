/**
 * As Example 1, with gradient filling
 */
class Example2 {
    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;
    
    private _circleX: number;
    private _circleY: number;
    private _circleRadius: number;

    constructor(canvas: HTMLCanvasElement) {
        if (!canvas) {
            throw 'No canvas!';
        }

        this._canvas = canvas;
        this._context = <CanvasRenderingContext2D> canvas.getContext('2d');
        
        this.initializeCircleProperties();
    }
    
    private initializeCircleProperties(): void {
        // Points where the circle will be, so the gradient can be adjusted as well
        this._circleX = 50;
        this._circleY = 150;
        this._circleRadius = 50;
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