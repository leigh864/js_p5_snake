class Snakey {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.shellX = 0;
		this.shellY = 0;
		this.foodX = 0;
		this.foodY = 0;
		this.tail = 0;
		this.segments = [];
	}

	show() {
		this.drawSnake();
		if (foodSeed) {
			this.createFood();
		} else {
			this.drawStar();
		}
	}

	drawSnake() {
		fill('#0f0');
		ellipse(this.x, this.y, itemSize, itemSize);
	}

	drawStar() {
		fill('red');
		noStroke();
		beginShape();
		vertex(this.foodX, this.foodY);
		vertex(this.foodX + oneQSize, this.foodY + halfSize);
		vertex(this.foodX - halfSize, this.foodY + oneQSize);
		vertex(this.foodX + halfSize, this.foodY + oneQSize);
		vertex(this.foodX - oneQSize, this.foodY + halfSize);
		endShape(CLOSE);
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
		if (
			this.shellX > canvasWidth ||
			this.shellX < 0 ||
			this.shellY > canvasHeight ||
			this.shellY < 0
		) {
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

	createFood() {
		foodSeed = false;
		this.foodX = Math.floor(Math.random() * (canvasWidth - itemSize));
		this.foodY = Math.floor(Math.random() * (canvasHeight - itemSize));
	}

	eaten() {
		var distance = dist(
			this.x,
			this.y,
			this.foodX + halfSize,
			this.foodY + halfSize
		);
		// console.log(distance);
		if (distance < halfSize + 1) {
			this.tail++;
			gameScore += foodScore;
			console.log('YUMMY ' + distance + ' tail now ' + this.tail);
			console.log(`gamescore=${gameScore}`);
			foodSeed = true;
		}
	}
}
