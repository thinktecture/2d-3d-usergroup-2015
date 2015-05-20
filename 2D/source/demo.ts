class Demo {
    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;
    private _x: number = 200;
    private _y: number = 200;
    
    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        this._context = <CanvasRenderingContext2D> canvas.getContext('2d');

        this.adjustForRetina();
        this.assignEvents();
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
    }
    
    private handleMouseMove(event: MouseEvent) {
        this._x = event.layerX;
        this._y = event.layerY;
        this.draw();
    }
    
    public draw(): void {
        var c: CanvasRenderingContext2D = this._context;
        
        c.clearRect(0, 0, this._canvas.width, this._canvas.height);
        
        c.fillRect(10, 10, 100, 100);
        
        c.beginPath();
        c.arc(this._x, this._y, 50, 0, 2 * Math.PI);
        c.closePath();
        c.fill();
    }
}