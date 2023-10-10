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

// window.requestAnimFrame = (function() {
//   return window.requestAnimationFrame;
// })();
// var canvas = document.getElementById('space');
// var c = canvas.getContext('2d');

// var numStars = 1900;
// var radius = '0.' + Math.floor(Math.random() * 9) + 1;
// var focalLength = canvas.width * 2;
// var warp = 0;
// var centerX, centerY;

// var stars = [],
//   star;
// var i;

// var animate = true;

// initializeStars();

// export function executeFrame() {
//   if (animate) requestAnimFrame(executeFrame);
//   moveStars();
//   drawStars();
// }

// function initializeStars() {
//   centerX = canvas.width / 2;
//   centerY = canvas.height / 2;

//   stars = [];
//   for (i = 0; i < numStars; i++) {
//     star = {
//       x: Math.random() * canvas.width,
//       y: Math.random() * canvas.height,
//       z: Math.random() * canvas.width,
//       o: '0.' + Math.floor(Math.random() * 99) + 1,
//     };
//     stars.push(star);
//   }
// }

// function moveStars() {
//   for (i = 0; i < numStars; i++) {
//     star = stars[i];
//     star.z--;

//     if (star.z <= 0) {
//       star.z = canvas.width;
//     }
//   }
// }

// function drawStars() {
//   var pixelX, pixelY, pixelRadius;

//   // Resize to the screen
//   if (canvas.width != window.innerWidth || canvas.width != window.innerWidth) {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     initializeStars();
//   }
//   if (warp == 0) {
//     c.fillStyle = 'rgb(33, 33, 33)';
//     c.fillRect(0, 0, canvas.width, canvas.height);
//   }
//   c.fillStyle = 'rgba(206, 195, 161, ' + radius + ')';
//   for (i = 0; i < numStars; i++) {
//     star = stars[i];

//     pixelX = (star.x - centerX) * (focalLength / star.z);
//     pixelX += centerX;
//     pixelY = (star.y - centerY) * (focalLength / star.z);
//     pixelY += centerY;
//     pixelRadius = 1 * (focalLength / star.z);

//     c.fillRect(pixelX, pixelY, pixelRadius, pixelRadius);
//     c.fillStyle = 'rgba(206, 195, 161, ' + star.o + ')';
//     //c.fill();
//   }
// }

// document.getElementById('warp').addEventListener('click', function(e) {
//   window.warp = window.warp == 1 ? 0 : 1;
//   window.c.clearRect(0, 0, window.canvas.width, window.canvas.height);
//   executeFrame();
// });

//Dust Particles Simulation by bionicoz based on
//Basic Particle Animation
//Author: Brandon John-Freso
$(function() {
  var W,
    H,
    canvas,
    ctx, //ctx stands for context and is the "curso" of our canvas element.
    particleCount = 2000,
    particles = []; //this is an array which will hold our particles Object/Class

  W = 1500;
  H = 2000;

  canvas = $('#dust').get(0); //this "get(0) will pull the underlying non-jquery wrapped dom element from our selection
  canvas.width = W;
  canvas.height = H;

  ctx = canvas.getContext('2d'); // settng the context to 2d rather than the 3d WEBGL
  ctx.globalCompositeOperation = 'lighter';
  console.log(ctx);
  var mouse = {
    x: 0,
    y: 0,
    rx: 0,
    ry: 0,
    speed: 150,
    delta: 0,
  };

  document.addEventListener(
    'mousemove',
    function(e) {
      mouse.x = e.clientX || e.pageX;
      mouse.y = e.clientY || e.pageY;
      mouse.x -= W / 2;
      mouse.y -= H / 2;
    },
    false,
  );

  function randomNorm(mean, stdev) {
    return (
      Math.abs(
        Math.round(Math.random() * 2 - 1 + (Math.random() * 2 - 1) + (Math.random() * 2 - 1)) *
          stdev,
      ) + mean
    );
  }

  //Setup particle class
  function Particle() {
    //using hsl is easier when we need particles with similar colors
    this.h = parseInt(37);
    this.s = parseInt(27 * Math.random() + 30);
    this.l = parseInt(30 * Math.random() + 50);
    this.a = 0.8 * Math.random();

    this.color = 'hsla(' + this.h + ',' + this.s + '%,' + this.l + '%,' + this.a + ')';
    this.shadowcolor =
      'hsla(' + this.h + ',' + this.s + '%,' + this.l + '%,' + parseFloat(this.a - 0.55) + ')';

    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.direction = {
      x: -1 + Math.random() * 15,
      y: -1 + Math.random() * 15,
    };
    //this.radius = 9 * ((Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1)+3);
    this.radius = randomNorm(0, 3);
    this.scale = 0.8 * Math.random() + 0.5;
    this.rotation = Math.PI / 4;

    this.grad = ctx.createRadialGradient(this.x, this.y, this.radius, this.x, this.y, 0);
    this.grad.addColorStop(0, this.color);
    this.grad.addColorStop(1, this.shadowcolor);

    this.vx = (2 * Math.random() + 4) * 0.01 * this.radius;
    this.vy = (2 * Math.random() + 4) * 0.01 * this.radius;

    this.valpha = 0.01 * Math.random() - 0.02;

    this.move = function() {
      this.x += this.vx * this.direction.x;
      this.y += this.vy * this.direction.y;
      this.rotation += this.valpha;
      //this.radius*= Math.abs((this.valpha*0.01+1));
    };
    this.changeDirection = function(axis) {
      this.direction[axis] *= -1;
      this.valpha *= -1;
    };
    this.draw = function() {
      ctx.save();
      ctx.translate(
        this.x + (mouse.rx / -20) * this.radius,
        this.y + (mouse.ry / -20) * this.radius,
      );
      ctx.rotate(this.rotation);
      ctx.scale(1, this.scale);

      this.grad = ctx.createRadialGradient(0, 0, this.radius, 0, 0, 0);
      this.grad.addColorStop(1, this.color);
      this.grad.addColorStop(0, this.shadowcolor);
      ctx.beginPath();
      ctx.fillStyle = this.grad;
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.restore();
    };
    this.boundaryCheck = function() {
      if (this.x >= W * 1.2) {
        this.x = W * 1.2;
        this.changeDirection('x');
      } else if (this.x <= -W * 0.2) {
        this.x = -W * 0.2;
        this.changeDirection('x');
      }
      if (this.y >= H * 1.2) {
        this.y = H * 1.2;
        this.changeDirection('y');
      } else if (this.y <= -H * 0.2) {
        this.y = -H * 0.2;
        this.changeDirection('y');
      }
    };
  } //end particle class

  function clearCanvas() {
    ctx.clearRect(0, 0, W, H);
  } //end clear canvas

  function createParticles() {
    for (var i = particleCount - 1; i >= 0; i--) {
      p = new Particle();
      particles.push(p);
    }
  } // end createParticles

  function drawParticles() {
    for (var i = particleCount - 1; i >= 0; i--) {
      p = particles[i];
      p.draw();
    }
  } //end drawParticles

  function updateParticles() {
    for (var i = particles.length - 1; i >= 0; i--) {
      p = particles[i];
      p.move();
      p.boundaryCheck();
    }
  } //end updateParticles

  function initParticleSystem() {
    createParticles();
    drawParticles();
  }

  function animateParticles() {
    clearCanvas();
    setDelta();
    update();
    drawParticles();
    updateParticles();
    requestAnimationFrame(animateParticles);
  }

  initParticleSystem();
  requestAnimationFrame(animateParticles);

  function setDelta() {
    this.now = new Date().getTime();
    mouse.delta = (this.now - this.then) / 1000;
    this.then = this.now;
  }
  function update() {
    if (isNaN(mouse.delta) || mouse.delta <= 0) {
      return;
    }

    var distX = mouse.x - mouse.rx,
      distY = mouse.y - mouse.ry;

    if (distX !== 0 && distY !== 0) {
      mouse.rx -= (mouse.rx - mouse.x) / mouse.speed;
      mouse.ry -= (mouse.ry - mouse.y) / mouse.speed;
    }
  }
});
