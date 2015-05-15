/**
 * Example for drawing a simple circle
 */
class Example1 {
    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;
    
    constructor(canvas: HTMLCanvasElement) {
        if (!canvas) {
            throw 'No canvas!';
        }
        
        this._canvas = canvas;
        this._context = <CanvasRenderingContext2D> canvas.getContext('2d');
    }    
    
    public draw() {
        // Begin a new path (a new drawing stack)
        this._context.beginPath();
        
        // Draw the circle
        // Center point is 50,50
        // Radius 50
        // Start from angle 0
        // End at angle 2 * Math.Pi (full circle)
        this._context.arc(50, 50, 50, 0, 2 * Math.PI);
        
        // Fill the circle with default settings (black)
        this._context.fill();
    }
}