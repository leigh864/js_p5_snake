var canvasWidth = 400;
var canvasHeight = 400;
var itemSize = 30;
var halfSize = Math.floor(itemSize / 2);
var oneQSize = itemSize * 0.25;
var sizeText = 14;
var startX = halfSize;
var startY = halfSize + sizeText;
var sid;
var gameScore = 0;
var direction = 1;
var foodSeed = true;
var foodScore = 1000;
var gameState = true;
var counter = itemSize;

function setup() {
	createCanvas(canvasWidth, canvasHeight);
	sid = new Snakey(startX, startY);
}

function draw() {
	if (gameState) {
		background(51);
		sid.show();
		sid.update();
		sid.updateTail();
		sid.snakeCrash();
		sid.eaten();
	} else {
		alert('You scored ' + gameScore);
		remove();
	}
}

function keyPressed() {
	if (keyCode === UP_ARROW && direction !== 2) {
		direction = 0;
	} else if (keyCode === DOWN_ARROW && direction !== 0) {
		direction = 2;
	} else if (keyCode === RIGHT_ARROW && direction !== 3) {
		direction = 1;
	} else if (keyCode === LEFT_ARROW && direction !== 1) {
		direction = 3;
	}
}
