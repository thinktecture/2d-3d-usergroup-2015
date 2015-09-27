/// <reference path="../typings/tsd.d.ts" />
/// <reference path="arc.ts" />

class Demo {
    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;
    private _width: number;
    private _height: number;

    private _pieParts: Array<Arc> = new Array<Arc>();
    private _pieValues: Array<number>;
    private _animationFrame: number;

    constructor(canvas: HTMLCanvasElement, values: Array<number>) {
        this._canvas = canvas;
        this._context = <CanvasRenderingContext2D> canvas.getContext('2d');
        this._pieValues = values;

        this._width = canvas.width;
        this._height = canvas.height;

        this.adjustForRetina();
        this.createPieParts();

        this.assignEvents();
    }

    private getDevicePixelRatio(): number {
        return window.devicePixelRatio || 1;
    }

    private adjustForRetina(): void {
        var factor: number;
        if ((factor = this.getDevicePixelRatio()) > 1) {
            var factor = window.devicePixelRatio;

            this._canvas.width = this._width * factor;
            this._canvas.height = this._height * factor;

            this._canvas.style.width = this._width + 'px';
            this._canvas.style.height = this._height + 'px';

            this._context.scale(factor, factor);
        }
    }

    private getRandomColor(): Array<number> {
        return [Math.floor(Math.random() * 254), Math.floor(Math.random() * 254), Math.floor(Math.random() * 254)];
    }

    private degreesToRadiants(degrees: number): number {
        return (degrees * Math.PI) / 180;
    }

    private createPieParts(): void {
        var centerX: number = this._width / 2;
        var centerY: number = this._height / 2;
        var radius: number = this._width / 2 - 50;
        var rotationDeg: number = 0;

        this._pieValues.forEach(value => {
            var arc = new Arc(this._context);

            arc.color = this.getRandomColor();
            arc.alpha = 0.5;
            arc.centerX = centerX;
            arc.centerY = centerY;
            arc.radius = radius;
            arc.startAngle = this.degreesToRadiants(rotationDeg);
            arc.endAngle = arc.startAngle + this.degreesToRadiants(value * 3.6);
            rotationDeg += value * 3.6;

            this._pieParts.push(arc);
        });
    }

    private assignEvents(): void {
        var that = this;

        that._canvas.addEventListener('mousemove', event => {
            that.processMove(event.layerX, event.layerY);
        });
    }

    private processMove(x: number, y: number): void {
        var that = this;
        var factor = this.getDevicePixelRatio();
        var color = this._context.getImageData(x * factor, y * factor, 1, 1).data;

        this._pieParts.forEach(part => {
            part.alpha = 0.5;

            if (part.color[0] === color[0] || part.color[0] === color[0] - 1 || part.color[0] === color[0] + 1) {
                part.alpha = 1;
            }
        });

        window.requestAnimationFrame(() => {
            that.draw();
        });
    }

    public startAnimation(): void {
        var that = this;
        var animationframeCallback = function() {
            that._pieParts.forEach(part => {
                part.rotation += that.degreesToRadiants(1);
            });

            that.draw();

            that._animationFrame = window.requestAnimationFrame(animationframeCallback);
        }

        that._animationFrame = window.requestAnimationFrame(animationframeCallback);
    }
    
    public stopAnimation(): void {
        window.cancelAnimationFrame(this._animationFrame);
    }

    public draw(): void {
        var c: CanvasRenderingContext2D = this._context;

        c.clearRect(0, 0, this._width, this._height);

        this._pieParts.forEach(part => {
            part.draw();
        });
    }
}