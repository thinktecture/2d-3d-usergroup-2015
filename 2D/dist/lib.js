/**
 * Example for drawing a simple circle
 */
var Example1 = (function () {
    function Example1(canvas) {
        if (!canvas) {
            throw 'No canvas!';
        }
        this._canvas = canvas;
        this._context = canvas.getContext('2d');
    }
    Example1.prototype.draw = function () {
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
    };
    return Example1;
})();

/**
 * As Example 1, with gradient filling
 */
var Example2 = (function () {
    function Example2(canvas) {
        if (!canvas) {
            throw 'No canvas!';
        }
        this._canvas = canvas;
        this._context = canvas.getContext('2d');
        this.initializeCircleProperties();
    }
    Example2.prototype.initializeCircleProperties = function () {
        // Points where the circle will be, so the gradient can be adjusted as well
        this._circleX = 50;
        this._circleY = 150;
        this._circleRadius = 50;
    };
    Example2.prototype.draw = function () {
        // Save the canvas context, so we can set our own values
        this._context.save();
        // Create a linear gradient from black to white
        var gradient = this._context.createLinearGradient(this._circleX - this._circleRadius, this._circleY - this._circleRadius, this._circleX - this._circleRadius, this._circleY + this._circleRadius);
        gradient.addColorStop(0, '#000000');
        gradient.addColorStop(1, '#FFFFFF');
        // Begin a new path (a new drawing stack)
        this._context.beginPath();
        // Draw the circle
        // Start from angle 0
        // End at angle 2 * Math.Pi (full circle)
        this._context.arc(this._circleX, this._circleY, this._circleRadius, 0, 2 * Math.PI);
        // assign the gradient and fill the circle with it
        this._context.fillStyle = gradient;
        this._context.fill();
        this._context.restore();
    };
    return Example2;
})();

/**
 * As Example 2, with retina scaling
 */
var Example3 = (function () {
    function Example3(canvas) {
        if (!canvas) {
            throw 'No canvas!';
        }
        this._canvas = canvas;
        this._width = canvas.width;
        this._height = canvas.height;
        this._context = canvas.getContext('2d');
        this.adjustForRetina();
        this.initializeCircleProperties();
    }
    Example3.prototype.initializeCircleProperties = function () {
        // Points where the circle will be, so the gradient can be adjusted as well
        this._circleX = 50;
        this._circleY = 150;
        this._circleRadius = 50;
    };
    Example3.prototype.adjustForRetina = function () {
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
    };
    Example3.prototype.draw = function () {
        // Save the canvas context, so we can set our own values
        this._context.save();
        // Create a linear gradient from black to white
        var gradient = this._context.createLinearGradient(this._circleX - this._circleRadius, this._circleY - this._circleRadius, this._circleX - this._circleRadius, this._circleY + this._circleRadius);
        gradient.addColorStop(0, '#000000');
        gradient.addColorStop(1, '#FFFFFF');
        // Begin a new path (a new drawing stack)
        this._context.beginPath();
        // Draw the circle
        // Start from angle 0
        // End at angle 2 * Math.Pi (full circle)
        this._context.arc(this._circleX, this._circleY, this._circleRadius, 0, 2 * Math.PI);
        // assign the gradient and fill the circle with it
        this._context.fillStyle = gradient;
        this._context.fill();
        this._context.restore();
    };
    return Example3;
})();

/**
 * As Example 3, with animation
 */
var Example4 = (function () {
    function Example4(canvas) {
        this._moveX = 10;
        this._moveY = 10;
        if (!canvas) {
            throw 'No canvas!';
        }
        this._canvas = canvas;
        this._width = canvas.width;
        this._height = canvas.height;
        this._context = canvas.getContext('2d');
        this.adjustForRetina();
        this.initializeCircleProperties();
    }
    Example4.prototype.initializeCircleProperties = function () {
        // Points where the circle will be, so the gradient can be adjusted as well
        this._circleX = 50;
        this._circleY = 150;
        this._circleRadius = 50;
    };
    Example4.prototype.adjustForRetina = function () {
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
        // Scale the drawing context
        this._context.scale(scaleFactor, scaleFactor);
    };
    Example4.prototype.draw = function () {
        // Save the canvas context, so we can set our own values
        this._context.save();
        // Create a linear gradient from black to white
        var gradient = this._context.createLinearGradient(this._circleX - this._circleRadius, this._circleY - this._circleRadius, this._circleX - this._circleRadius, this._circleY + this._circleRadius);
        gradient.addColorStop(0, '#000000');
        gradient.addColorStop(1, '#FFFFFF');
        // Begin a new path (a new drawing stack)
        this._context.beginPath();
        // Draw the circle
        // Start from angle 0
        // End at angle 2 * Math.Pi (full circle)
        this._context.arc(this._circleX, this._circleY, this._circleRadius, 0, 2 * Math.PI);
        // assign the gradient and fill the circle with it
        this._context.fillStyle = gradient;
        this._context.fill();
        this._context.restore();
    };
    Example4.prototype.bounceCircle = function () {
        // Will the next move hit our boundaries? If yes, revert the direction
        if (this._circleX + this._circleRadius > this._width || this._circleX - this._circleRadius < 0) {
            this._moveX *= -1;
        }
        if (this._circleY + this._circleRadius > this._height || this._circleY - this._circleRadius < 0) {
            this._moveY *= -1;
        }
        // Move the ball
        this._circleX += this._moveX;
        this._circleY += this._moveY;
    };
    Example4.prototype.start = function () {
        // Save the reference, so we can use it inside the animation frame
        var that = this;
        var animationFrame = function () {
            // Clear the area at first
            // The easy version is to the clear complete context by
            // that._context.clearRect(0, 0, that._width, that._height);
            // For demonstration we clear only the circle itself
            that._context.clearRect(that._circleX - that._circleRadius, that._circleY - that._circleRadius, that._circleRadius * 2, that._circleRadius * 2);
            // Calculate the new position
            that.bounceCircle();
            that.draw();
            // Request another frame
            // We have an infinite loop now
            window.requestAnimationFrame(animationFrame);
        };
        // Initial call to request a single animation frame        
        window.requestAnimationFrame(animationFrame);
    };
    return Example4;
})();

/**
 * As Example 4, with time-based animation
 */
var Example5 = (function () {
    function Example5(canvas) {
        this._moveX = 10;
        this._moveY = 10;
        if (!canvas) {
            throw 'No canvas!';
        }
        this._canvas = canvas;
        this._width = canvas.width;
        this._height = canvas.height;
        this._context = canvas.getContext('2d');
        this.adjustForRetina();
        this.initializeCircleProperties();
    }
    Example5.prototype.initializeCircleProperties = function () {
        // Points where the circle will be, so the gradient can be adjusted as well
        this._circleX = 50;
        this._circleY = 150;
        this._circleRadius = 50;
    };
    Example5.prototype.adjustForRetina = function () {
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
        // Scale the drawing context
        this._context.scale(scaleFactor, scaleFactor);
    };
    Example5.prototype.draw = function () {
        // Save the canvas context, so we can set our own values
        this._context.save();
        // Create a linear gradient from black to white
        var gradient = this._context.createLinearGradient(this._circleX - this._circleRadius, this._circleY - this._circleRadius, this._circleX - this._circleRadius, this._circleY + this._circleRadius);
        gradient.addColorStop(0, '#000000');
        gradient.addColorStop(1, '#FFFFFF');
        // Begin a new path (a new drawing stack)
        this._context.beginPath();
        // Draw the circle
        // Start from angle 0
        // End at angle 2 * Math.Pi (full circle)
        this._context.arc(this._circleX, this._circleY, this._circleRadius, 0, 2 * Math.PI);
        // assign the gradient and fill the circle with it
        this._context.fillStyle = gradient;
        this._context.fill();
        this._context.restore();
    };
    Example5.prototype.bounceCircle = function () {
        // Will the next move hit our boundaries? If yes, revert the direction
        if (this._circleX + this._circleRadius > this._width || this._circleX - this._circleRadius < 0) {
            this._moveX *= -1;
        }
        if (this._circleY + this._circleRadius > this._height || this._circleY - this._circleRadius < 0) {
            this._moveY *= -1;
        }
        // Move the ball
        this._circleX += this._moveX;
        this._circleY += this._moveY;
    };
    Example5.prototype.start = function () {
        // Save the reference, so we can use it inside the animation frame
        var that = this;
        var animationFrame = function () {
            // Clear the area at first
            // The easy version is to the clear complete context by
            // that._context.clearRect(0, 0, that._width, that._height);
            // For demonstration we clear only the circle itself
            that._context.clearRect(that._circleX - that._circleRadius, that._circleY - that._circleRadius, that._circleRadius * 2, that._circleRadius * 2);
            // Calculate the new position
            that.bounceCircle();
            that.draw();
            // Request another frame
            // We have an infinite loop now
            window.requestAnimationFrame(animationFrame);
        };
        // Initial call to request a single animation frame        
        window.requestAnimationFrame(animationFrame);
    };
    return Example5;
})();

//# sourceMappingURL=lib.js.map