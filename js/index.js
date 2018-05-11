class Vec2d {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  rotate(radians) {
    let ca = Math.cos(radians);
    let sa = Math.sin(radians);
    return new Vec2d(ca * this.x - sa * this.y, sa * this.x + ca * this.y);
  }
}

class Ripple {

  constructor(x, y, stage) {
    // sprite
    // https://i.imgur.com/kr2RVKW.png
    // http://i.imgur.com/MfPhT1Y.png
    this.sprite = PIXI.Sprite.fromImage("http://i.imgur.com/MfPhT1Y.png");
    this.sprite.anchor.set(0.5);
    this.sprite.position.set(x, y);
    this.sprite.scale.set(8);
    stage.addChild(this.sprite);
    this.filter = new PIXI.filters.DisplacementFilter(this.sprite);
  }

  update() {
    this.sprite.scale.x += 0.1;
    this.sprite.scale.y += 0.1;
  }

}

let imagedrop = document.querySelector(".ripple-image");
let imageWidth = imagedrop.offsetWidth;
let imageHeight = imagedrop.offsetHeight;
var app = new PIXI.Application(imageWidth, imageHeight);

imagedrop.appendChild(app.view);
var world = new PIXI.Container();
app.stage.addChild(world);

//https://i.imgur.com/MLs0b5Q.jpg
//http://i.imgur.com/NSHvIJH.png
var texture = PIXI.Texture.fromImage('img/hero-background.jpg');
var bottom = new PIXI.Sprite(texture);

bottom.width = imageWidth + 20;
bottom.height = imageHeight + 20;

var displacementSprite = PIXI.Sprite.fromImage("http://i.imgur.com/2yYayZk.png");
var displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
displacementFilter.autoFit = true;
displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
displacementSprite.scale.y = 1;
displacementSprite.scale.x = 1;

world.addChild(displacementSprite);
world.addChild(bottom);
world.interactive = true;
world.filters = [displacementFilter];

let ripples = [];
world.filters = [displacementFilter, ...ripples.map(f => f.filter)];

let onClick = ev => {
  var {
    x,
    y
  } = ev.data.getLocalPosition(world);
  ripples.push(new Ripple(x, y, world));
  world.filters = [displacementFilter, ...ripples.map(f => f.filter)];
};

world.on('pointerdown', onClick)
world.on('pointerover', onClick)

let wind = new Vec2d(0, 0.1);

app.ticker.add(() => {
//  displacementSprite.x += wind.x;
//  displacementSprite.y += wind.y;
	ripples.forEach(ripple => ripple.update());
});