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
		this.moves = [];
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

		for (let i = 0; i < this.tail; i++) {
			fill('#0f0');
			ellipse(this.moves[i].x, this.moves[i].y, itemSize, itemSize);
		}

		textSize(sizeText);
		text('Score=' + gameScore + '  tail=' + this.tail, 5, sizeText);
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

	updateTail() {
		if (this.moves.length > this.tail + 1) {
			this.moves.pop();
			console.log('>>>>>>>>>>>>> tail=' + this.tail);
			for (let i = 0; i < this.moves.length; i++) {
				console.log('i=' + JSON.stringify(this.moves[i]));
			}
		}
		counter++;

		if (counter >= itemSize) {
			this.moves.unshift({ x: this.x, y: this.y });
			counter = 0;
		}

		console.log(
			`counter=${counter} itemSize=${itemSize} this.tail=${
				this.tail
			} this.moves.length=${this.moves.length}`
		);
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
		}

		// check not hit the tail
		for (let i = 1; i < this.tail - 1; i++) {
			var collision = dist(
				this.x,
				this.y,
				this.segments[i].x,
				this.segments[i].y
			);
			if (collision < halfSize) {
				var absX = Math.abs(this.x - this.segments[i].x);
				var absY = Math.abs(this.y - this.segments[i].y);
				if (absX > absY) {
					const a = absX;
					absX = absY;
					absY = a;
				}
				var myHypot = Math.hypot(absX, absY);

				// double hypot(double x,double y)
				// x = abs(x);
				// y = abs(y);
				// if (y > x) swap(x, y);
				// if (x == 0.0) return y;
				// double t = y / x;
				// return x * sqrt(1 + t * t);

				console.log(
					'>>>>>>>>>> ****BOOM***** collision = ',
					collision,
					' i was ',
					i,
					' my hypot=',
					myHypot,
					absX,
					absY
				);
				console.log(
					`this.x=${this.x} this.y=${this.y} this.segments[${i}].x=${
						this.segments[i].x
					} this.segments[${i}].y=${this.segments[i].y}`
				);
				for (let i = 0; i < this.segments.length; i++) {
					console.log('i', i, 'segments=' + JSON.stringify(this.segments[i]));
				}
				for (let i = 0; i < this.moves.length; i++) {
					console.log('i', i, 'moves=' + JSON.stringify(this.moves[i]));
				}
				gameState = false;
			}
		}
		if (gameState) gameScore++;
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
		var distance = dist(this.x, this.y, this.foodX, this.foodY);
		// console.log(distance);
		if (distance < itemSize + 1) {
			this.tail++;
			var newSegment = {
				x: this.moves[0].x,
				y: this.moves[0].y,
			};
			console.log('EATEN >>>>>>>>>>>>>>>>>>> newSegment=', newSegment);
			this.segments.push(newSegment);
			for (let i = 0; i < this.segments.length; i++) {
				console.log('i', i, 'segment=' + JSON.stringify(this.segments[i]));
			}
			for (let i = 0; i < this.moves.length; i++) {
				console.log('i', i, 'moves=' + JSON.stringify(this.moves[i]));
			}
			gameScore += foodScore;
			console.log('YUMMY ' + distance + ' tail now ' + this.tail);
			console.log(`gamescore=${gameScore}`);
			foodSeed = true;
		}
	}
}
