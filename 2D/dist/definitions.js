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
    private _canvas;
    private _context;
    private _width;
    private _height;
    private _pieParts;
    private _pieValues;
    private _animationFrame;
    constructor(canvas: HTMLCanvasElement, values: Array<number>);
    private getDevicePixelRatio();
    private adjustForRetina();
    private getRandomColor();
    private degreesToRadiants(degrees);
    private createPieParts();
    private assignEvents();
    private processMove(x, y);
    startAnimation(): void;
    stopAnimation(): void;
    draw(): void;
}
