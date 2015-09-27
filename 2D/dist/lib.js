var Arc = (function () {
    function Arc(context) {
        this._rotation = 0;
        this._alpha = 1;
        this._context = context;
    }
    Object.defineProperty(Arc.prototype, "centerX", {
        get: function () {
            return this._centerX;
        },
        set: function (v) {
            this._centerX = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Arc.prototype, "centerY", {
        get: function () {
            return this._centerY;
        },
        set: function (v) {
            this._centerY = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Arc.prototype, "radius", {
        get: function () {
            return this._radius;
        },
        set: function (v) {
            this._radius = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Arc.prototype, "startAngle", {
        get: function () {
            return this._startAngle;
        },
        set: function (v) {
            this._startAngle = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Arc.prototype, "endAngle", {
        get: function () {
            return this._endAngle;
        },
        set: function (v) {
            this._endAngle = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Arc.prototype, "rotation", {
        get: function () {
            return this._rotation;
        },
        set: function (v) {
            this._rotation = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Arc.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (v) {
            this._color = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Arc.prototype, "alpha", {
        get: function () {
            return this._alpha;
        },
        set: function (v) {
            this._alpha = v;
        },
        enumerable: true,
        configurable: true
    });
    Arc.prototype.draw = function () {
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
    };
    return Arc;
})();

/// <reference path="../typings/tsd.d.ts" />
/// <reference path="arc.ts" />
var Demo = (function () {
    function Demo(canvas, values) {
        this._pieParts = new Array();
        this._canvas = canvas;
        this._context = canvas.getContext('2d');
        this._pieValues = values;
        this._width = canvas.width;
        this._height = canvas.height;
        this.adjustForRetina();
        this.createPieParts();
        this.assignEvents();
    }
    Demo.prototype.getDevicePixelRatio = function () {
        return window.devicePixelRatio || 1;
    };
    Demo.prototype.adjustForRetina = function () {
        var factor;
        if ((factor = this.getDevicePixelRatio()) > 1) {
            var factor = window.devicePixelRatio;
            this._canvas.width = this._width * factor;
            this._canvas.height = this._height * factor;
            this._canvas.style.width = this._width + 'px';
            this._canvas.style.height = this._height + 'px';
            this._context.scale(factor, factor);
        }
    };
    Demo.prototype.getRandomColor = function () {
        return [Math.floor(Math.random() * 254), Math.floor(Math.random() * 254), Math.floor(Math.random() * 254)];
    };
    Demo.prototype.degreesToRadiants = function (degrees) {
        return (degrees * Math.PI) / 180;
    };
    Demo.prototype.createPieParts = function () {
        var _this = this;
        var centerX = this._width / 2;
        var centerY = this._height / 2;
        var radius = this._width / 2 - 50;
        var rotationDeg = 0;
        this._pieValues.forEach(function (value) {
            var arc = new Arc(_this._context);
            arc.color = _this.getRandomColor();
            arc.alpha = 0.5;
            arc.centerX = centerX;
            arc.centerY = centerY;
            arc.radius = radius;
            arc.startAngle = _this.degreesToRadiants(rotationDeg);
            arc.endAngle = arc.startAngle + _this.degreesToRadiants(value * 3.6);
            rotationDeg += value * 3.6;
            _this._pieParts.push(arc);
        });
    };
    Demo.prototype.assignEvents = function () {
        var that = this;
        that._canvas.addEventListener('mousemove', function (event) {
            that.processMove(event.layerX, event.layerY);
        });
    };
    Demo.prototype.processMove = function (x, y) {
        var that = this;
        var factor = this.getDevicePixelRatio();
        var color = this._context.getImageData(x * factor, y * factor, 1, 1).data;
        this._pieParts.forEach(function (part) {
            part.alpha = 0.5;
            if (part.color[0] === color[0] || part.color[0] === color[0] - 1 || part.color[0] === color[0] + 1) {
                part.alpha = 1;
            }
        });
        window.requestAnimationFrame(function () {
            that.draw();
        });
    };
    Demo.prototype.startAnimation = function () {
        var that = this;
        var animationframeCallback = function () {
            that._pieParts.forEach(function (part) {
                part.rotation += that.degreesToRadiants(1);
            });
            that.draw();
            that._animationFrame = window.requestAnimationFrame(animationframeCallback);
        };
        that._animationFrame = window.requestAnimationFrame(animationframeCallback);
    };
    Demo.prototype.stopAnimation = function () {
        window.cancelAnimationFrame(this._animationFrame);
    };
    Demo.prototype.draw = function () {
        var c = this._context;
        c.clearRect(0, 0, this._width, this._height);
        this._pieParts.forEach(function (part) {
            part.draw();
        });
    };
    return Demo;
})();

//# sourceMappingURL=lib.js.map