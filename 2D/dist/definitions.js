/**
 * Example for drawing a simple circle
 */
declare class Example1 {
    private _canvas;
    private _context;
    constructor(canvas: HTMLCanvasElement);
    draw(): void;
}

/**
 * As Example 1, with gradient filling
 */
declare class Example2 {
    private _canvas;
    private _context;
    private _circleX;
    private _circleY;
    private _circleRadius;
    constructor(canvas: HTMLCanvasElement);
    private initializeCircleProperties();
    draw(): void;
}

/**
 * As Example 2, with retina scaling
 */
declare class Example3 {
    private _canvas;
    private _context;
    private _width;
    private _height;
    private _circleX;
    private _circleY;
    private _circleRadius;
    constructor(canvas: HTMLCanvasElement);
    private initializeCircleProperties();
    private adjustForRetina();
    draw(): void;
}

/**
 * As Example 3, with animation
 */
declare class Example4 {
    private _canvas;
    private _context;
    private _width;
    private _height;
    private _circleX;
    private _circleY;
    private _circleRadius;
    private _moveX;
    private _moveY;
    constructor(canvas: HTMLCanvasElement);
    private initializeCircleProperties();
    private adjustForRetina();
    draw(): void;
    private bounceCircle();
    start(): void;
}

/**
 * As Example 4, with time-based animation
 */
declare class Example5 {
    private _canvas;
    private _context;
    private _width;
    private _height;
    private _circleX;
    private _circleY;
    private _circleRadius;
    private _moveX;
    private _moveY;
    constructor(canvas: HTMLCanvasElement);
    private initializeCircleProperties();
    private adjustForRetina();
    draw(): void;
    private bounceCircle();
    start(): void;
}
