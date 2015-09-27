class Arc {
    private _context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D) {
        this._context = context;
    }

    private _centerX: number;
    public get centerX(): number {
        return this._centerX;
    }
    public set centerX(v: number) {
        this._centerX = v;
    }
    
    private _centerY : number;
    public get centerY() : number {
        return this._centerY;
    }
    public set centerY(v : number) {
        this._centerY = v;
    }
    
    private _radius : number;
    public get radius() : number {
        return this._radius;
    }
    public set radius(v : number) {
        this._radius = v;
    }
    
    private _startAngle : number;
    public get startAngle() : number {
        return this._startAngle;
    }
    public set startAngle(v : number) {
        this._startAngle = v;
    }
    
    private _endAngle : number;
    public get endAngle() : number {
        return this._endAngle;
    }
    public set endAngle(v : number) {
        this._endAngle = v;
    }
    
    private _rotation : number = 0;
    public get rotation() : number {
        return this._rotation;
    }
    public set rotation(v : number) {
        this._rotation = v;
    }
    
    private _color: Array<number>;
    public get color() : Array<number> {
        return this._color;
    }
    public set color(v : Array<number>) {
        this._color = v;
    }
    
    private _alpha : number = 1;
    public get alpha() : number {
        return this._alpha;
    }
    public set alpha(v : number) {
        this._alpha = v;
    }
    
    public draw(): void {
        this._context.save();
        this._context.translate(this.centerX, this.centerY);
        this._context.rotate(this.rotation);
        this._context.fillStyle = 'rgba(' + this._color.join() + ',' + this._alpha + ')';
        this._context.beginPath();
        this._context.moveTo(0, 0);
        this._context.arc(0, 0, this.radius, this.startAngle, this.endAngle);
        this._context.closePath();
        this._context.fill();
        this._context.restore();
    }    
}