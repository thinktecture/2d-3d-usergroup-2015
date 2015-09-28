declare class Arc {
    private _context;
    constructor(context: CanvasRenderingContext2D);
    private _centerX;
    centerX: number;
    private _centerY;
    centerY: number;
    private _radius;
    radius: number;
    private _startAngle;
    startAngle: number;
    private _endAngle;
    endAngle: number;
    private _rotation;
    rotation: number;
    private _color;
    color: Array<number>;
    private _alpha;
    alpha: number;
    draw(): void;
}

/// <reference path="../typings/tsd.d.ts" />
/// <reference path="arc.d.ts" />
declare class Demo {
    /**
     * The canvas where the chart will be drawn to
     */
    private _canvas;
    /**
     * The 2D context of the canvas
     */
    private _context;
    /**
     * Width in pixel without devicePixelRatio scaling of the canvas
     */
    private _width;
    /**
     * Height in pixel without devicePixelRatio scaling of the canvas
     */
    private _height;
    /**
     * Array of all the pie parts
     */
    private _pieParts;
    /**
     * Will hold the current animation frame is the animation is running
     */
    private _animationFrame;
    constructor(canvas: HTMLCanvasElement, values: Array<number>);
    /**
     * Returns the devicePixelRatio or 1
     */
    private getDevicePixelRatio();
    /**
     * Adjusts the canvas and the context for retina scaling (if devicePixelRatio > 1)
     */
    private adjustForRetina();
    /**
     * Returns a random color
     */
    private getRandomColor();
    /**
     * Calculates radiants from degrees
     */
    private degreesToRadiants(degrees);
    /**
     * Creates the pie parts from the values
     */
    private createPieParts(values);
    /**
     * Assigns mouse and touch events to the canvas
     */
    private assignEvents();
    /**
     * Toggles the animation
     */
    private toggleAnimation();
    /**
     * Returns the correct positions of an event (mouse/touch)
     *
     * See: http://stackoverflow.com/a/10816667/959687
     */
    private getOffset(event);
    /**
     * Handles touch move. Will move the pie chart
     */
    private handleTouchMoveEvent(e);
    /**
     * Handles mouse move. Will simulate a "hover effect"
     */
    private handleMouseMove(x, y);
    /**
     * Starts the animation sequence
     */
    private startAnimation();
    /**
     * Stops the animation sequence
     */
    private stopAnimation();
    /**
     * Draws the chart :)
     */
    draw(): void;
}
