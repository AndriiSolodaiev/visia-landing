// var canvas = document.getElementById('canvas'),
//   ctx = canvas.getContext('2d'),
//   w = (canvas.width = window.innerWidth),
//   h = (canvas.height = window.innerHeight),
//   hue = 217,
//   stars = [],
//   count = 0,
//   maxStars = 800;

// // Thanks @jackrugile for the performance tip! https://codepen.io/jackrugile/pen/BjBGoM
// // Cache gradient
// var canvas2 = document.createElement('canvas'),
//   ctx2 = canvas2.getContext('2d');
// canvas2.width = 1000;
// canvas2.height = 1000;
// var half = canvas2.width / 2,
//   gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
// gradient2.addColorStop(0.025, '#fff');
// gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
// gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
// gradient2.addColorStop(1, 'transparent');

// ctx2.fillStyle = gradient2;
// ctx2.beginPath();
// ctx2.arc(half, half, half, 0, Math.PI * 2);
// ctx2.fill();

// // End cache

// function random(min, max) {
//   if (arguments.length < 2) {
//     max = min;
//     min = 0;
//   }

//   if (min > max) {
//     var hold = max;
//     max = min;
//     min = hold;
//   }

//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function maxOrbit(x, y) {
//   var max = Math.max(x, y),
//     diameter = Math.round(Math.sqrt(max * max + max * max));
//   return diameter / 2;
// }

// var Star = function() {
//   this.orbitRadius = random(maxOrbit(w, h));
//   this.radius = random(60, this.orbitRadius) / 12;
//   this.orbitX = w / 2;
//   this.orbitY = h / 2;
//   this.timePassed = random(0, maxStars);
//   this.speed = random(this.orbitRadius) / 80000;
//   this.alpha = random(2, 10) / 10;

//   count++;
//   stars[count] = this;
// };

// Star.prototype.draw = function() {
//   var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
//     y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
//     twinkle = random(10);

//   if (twinkle === 1 && this.alpha > 0) {
//     this.alpha -= 0.05;
//   } else if (twinkle === 2 && this.alpha < 1) {
//     this.alpha += 0.05;
//   }

//   ctx.globalAlpha = this.alpha;
//   ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
//   this.timePassed += this.speed;
// };

// for (var i = 0; i < maxStars; i++) {
//   new Star();
// }

// export function animation() {
//   ctx.globalCompositeOperation = 'source-over';
//   ctx.globalAlpha = 0.8;
//   ctx.fillStyle = 'hsla(' + hue + ', 0%, 13%, 1)';
//   ctx.fillRect(0, 0, w, h);

//   ctx.globalCompositeOperation = 'lighter';
//   for (var i = 1, l = stars.length; i < l; i++) {
//     stars[i].draw();
//   }

//   window.requestAnimationFrame(animation);
// }

// // animation();

window.requestAnimFrame = (function() {
  return window.requestAnimationFrame;
})();
var canvas = document.getElementById('space');
var c = canvas.getContext('2d');

var numStars = 1900;
var radius = '0.' + Math.floor(Math.random() * 9) + 1;
var focalLength = canvas.width * 2;
var warp = 0;
var centerX, centerY;

var stars = [],
  star;
var i;

var animate = true;

initializeStars();

export function executeFrame() {
  if (animate) requestAnimFrame(executeFrame);
  moveStars();
  drawStars();
}

function initializeStars() {
  centerX = canvas.width / 2;
  centerY = canvas.height / 2;

  stars = [];
  for (i = 0; i < numStars; i++) {
    star = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * canvas.width,
      o: '0.' + Math.floor(Math.random() * 99) + 1,
    };
    stars.push(star);
  }
}

function moveStars() {
  for (i = 0; i < numStars; i++) {
    star = stars[i];
    star.z--;

    if (star.z <= 0) {
      star.z = canvas.width;
    }
  }
}

function drawStars() {
  var pixelX, pixelY, pixelRadius;

  // Resize to the screen
  if (canvas.width != window.innerWidth || canvas.width != window.innerWidth) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initializeStars();
  }
  if (warp == 0) {
    c.fillStyle = 'rgb(33, 33, 33)';
    c.fillRect(0, 0, canvas.width, canvas.height);
  }
  c.fillStyle = 'rgba(206, 195, 161, ' + radius + ')';
  for (i = 0; i < numStars; i++) {
    star = stars[i];

    pixelX = (star.x - centerX) * (focalLength / star.z);
    pixelX += centerX;
    pixelY = (star.y - centerY) * (focalLength / star.z);
    pixelY += centerY;
    pixelRadius = 1 * (focalLength / star.z);

    c.fillRect(pixelX, pixelY, pixelRadius, pixelRadius);
    c.fillStyle = 'rgba(206, 195, 161, ' + star.o + ')';
    //c.fill();
  }
}

// document.getElementById('warp').addEventListener('click', function(e) {
//   window.warp = window.warp == 1 ? 0 : 1;
//   window.c.clearRect(0, 0, window.canvas.width, window.canvas.height);
//   executeFrame();
// });

executeFrame();
