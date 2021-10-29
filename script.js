function HoverEffect(nav) {
  this.nav = nav;
  this.borderConfig = {
    x: 1, y: 1,
    radius: 3,
    vx: 0, vy: 0,
    speed: 3
  };
  this.globalID = 0;
}

HoverEffect.prototype = {
  constructor: HoverEffect,
  attachEvent: function(btn) {
    var currentCanvas, canvas, ctx, width, height, that;

    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    width = parseInt(getComputedStyle(btn.parentNode).width);
    height = parseInt(getComputedStyle(btn.parentNode).height);
    that = this;

    if (this.globalID > 0) window.cancelAnimationFrame(this.globalID);

    canvas.width = width;
    canvas.height = height;

    this.borderConfig.x = 0;
    this.borderConfig.y = 0;
    this.borderConfig.vx = this.borderConfig.speed;
    this.borderConfig.vy = 0;

    currentCanvas = this.nav.querySelector('canvas');

    if (currentCanvas) {
      currentCanvas.parentNode.removeChild(currentCanvas);
    }

    (function drawFrame() {
      that.globalID = window.requestAnimationFrame(drawFrame, canvas);
      ctx.fillStyle = 'rgba(23, 51, 48, 0.0065)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (width - that.borderConfig.x < 4.5 && height - that.borderConfig.y > 4) {
        that.borderConfig.vx = 0;
        that.borderConfig.vy = that.borderConfig.speed;
      } else if (width - that.borderConfig.x < 4.6 && height - that.borderConfig.y < 4) {
        that.borderConfig.vx = -that.borderConfig.speed;
        that.borderConfig.vy = 0;
      } else if (that.borderConfig.x < 1 && height - that.borderConfig.y < 4) {
        that.borderConfig.vx = 0;
        that.borderConfig.vy = -that.borderConfig.speed;
      } else if (that.borderConfig.x < 4 && that.borderConfig.y < 1) {
        that.borderConfig.vx = that.borderConfig.speed;
        that.borderConfig.vy = 0;
      }
      that.borderConfig.x += that.borderConfig.vx;
      that.borderConfig.y += that.borderConfig.vy;

      ctx.save();
      ctx.fillStyle = '#27ae60';
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillRect(that.borderConfig.x, that.borderConfig.y, that.borderConfig.radius, that.borderConfig.radius);
      ctx.restore();
    }());

    btn.parentNode.appendChild(canvas);
  }
}

var effect = new HoverEffect(document.querySelector('nav'));

 effect.attachEvent(document.querySelector('ul li:nth-of-type(4) a'));

document.querySelector('nav').addEventListener('mousedown', function(e) {
  e.preventDefault();
  if (e.target.className === 'nav-link') {
    effect.attachEvent(e.target);
  }
}, false);
