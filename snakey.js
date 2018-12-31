class Snakey {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.shellX = 0;
		this.shellY = 0;
	}

	show() {
		fill('#0f0');
		ellipse(this.x, this.y, snakeSize, snakeSize);
	}

	update() {
		switch (direction) {
			case 0:
				this.y--;
				break;
			case 1:
				this.x++;
				break;
			case 2:
				this.y++;
				break;
			case 3:
				this.x--;
				break;
			default:
				console.log('Unknown direction ' + direction);
		}
	}

	snakeCrash() {
		this.checkEdge();
		if (this.shellX > canvasWidth || this.shellX < 0 || this.shellY > canvasHeight || this.shellY < 0) {
			gameState = false;
		} else {
			gameScore++;
		}
	}

	// x and y are at centre of circle
	checkEdge() {
		this.shellX = this.x;
		this.shellY = this.y;
		if (direction === 0) {
			this.shellY = this.y - halfSize;
		} else if (direction === 1) {
			this.shellX = this.x + halfSize;
		} else if (direction === 2) {
			this.shellY = this.y + halfSize;
		} else if (direction === 3) {
			this.shellX = this.x - halfSize;
		}
	}
}
