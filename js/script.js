window.onload = function() {
    'use strict';
    var canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var context = canvas.getContext('2d');

    var angle, hypot, hypotOrigin, dx, dy, dxOrigin, dyOrigin, v;
    var dmax = 200;
    var vmax = 16;

    function Dot(x, y, color) {
        this.x = x;
        this.y = y;
        this.originX = x;
        this.originY = y;
        this.radius = 8;
        this.color = color;
        this.draw = function() {
            dx = this.x - pointer.x;
            dy = this.y - pointer.y;
            hypot = Math.hypot(dx, dy);

            dxOrigin = this.originX - this.x;
            dyOrigin = this.originY - this.y;
            hypotOrigin = Math.hypot(dxOrigin, dyOrigin);

            if(hypotOrigin > 0) {
                angle = Math.atan2(dyOrigin, dxOrigin);
                v = vmax * (hypotOrigin / dmax);
                this.x += Math.cos(angle) * v;
                this.y += Math.sin(angle) * v;
            }

            if(hypot < dmax) {
                angle = Math.atan2(dy, dx);
                v = vmax * ((dmax - hypot) / dmax);
                this.x += Math.cos(angle) * v;
                this.y += Math.sin(angle) * v;
            }

            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
            context.closePath();
            context.fillStyle = this.color;
            context.fill();
        };

        return this;
    }

    var pointer = {
        x: canvas.width / 2,
        y: canvas.height,
        radius: 8,
        color: 'rgb(40, 80, 100)',
        draw: function() {
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
            context.closePath();
            context.fillStyle = this.color;
            context.fill();
        }
    };

    var dotArray = [];

    var space = 32;
    var xCount = canvas.width / space + 1;
    var yCount = canvas.height / space + 1;
    for(var i = 0; i < xCount; i++) {
        for(var j = 0; j < yCount; j++) {
            dotArray.push(new Dot(i * space, j * space, 'rgb(255, 200, 80)'));
        }
    }

    canvas.onmousemove = function(ev) {
        pointer.x = ev.clientX;
        pointer.y = ev.clientY;
    };

    function animate() {
        context.fillStyle = 'rgb(255, 70, 70)';
        context.fillRect(0, 0, canvas.width, canvas.height);

        dotArray.forEach(function(entry) {
            entry.draw();
        });

        pointer.draw();
        window.requestAnimationFrame(animate);
    }

    animate();
};
