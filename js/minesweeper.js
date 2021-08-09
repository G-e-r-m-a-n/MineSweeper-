const canvas = document.getElementById('field');
const ctx = canvas.getContext('2d');

const tilesImage = new Image();
tilesImage.src = "img/tiles.jpg"

var C_S = 32;
var M = 5;
var N = 5;

var mines = [];
var grid = [];
var grid_open = [];
var close_count = 0;

function gameOver() {
	for (var i = 0; i < M; i++) {
		for (var j = 0; j < N; j++) {
			ctx.drawImage(tilesImage, C_S*grid[i][j], 0, C_S, C_S, j*C_S, i*C_S, C_S, C_S);
		}
	}

	ctx.fillStyle = "red"
	ctx.font = "40px Arial";
	ctx.fillText("GAME OVER", 41, 170);	
}

function youWin() {
	ctx.fillStyle = "red"
	ctx.font = "40px Arial";
	ctx.fillText("You Win", 41, 170);
}

function init() {

	for (var i = 0; i < M; i++) {
		grid.push([]);
		grid_open.push([]);
		for (var j = 0; j < N; j++) {
			if (Math.random()*100 < 10) {
				grid[i].push(9);
				mines.push({i: i,j: j});
			} else {
				grid[i].push(0);
			}
			grid_open[i].push(0);
			close_count++;
		}
	}

	for(var k = 0; k < mines.length; k++) {
		if(mines[k].i != 0) {
			if(mines[k].j != 0) {
				if(grid[mines[k].i - 1][mines[k].j - 1] != 9) grid[mines[k].i - 1][mines[k].j - 1] += 1;
			}
			if(grid[mines[k].i - 1][mines[k].j] != 9) grid[mines[k].i - 1][mines[k].j] += 1;
			if(mines[k].j != 9) {
				if(grid[mines[k].i - 1][mines[k].j + 1] != 9) grid[mines[k].i - 1][mines[k].j + 1] += 1;
			}
		}

		if(mines[k].j != 0) {
			if(grid[mines[k].i][mines[k].j - 1] != 9) grid[mines[k].i][mines[k].j - 1] += 1;
		}
		if(mines[k].j != 9) {
			if(grid[mines[k].i][mines[k].j + 1] != 9) grid[mines[k].i][mines[k].j + 1] += 1;
		}

		if(mines[k].i != 9) {
			if(mines[k].j != 0) {
				if(grid[mines[k].i + 1][mines[k].j - 1] != 9) grid[mines[k].i + 1][mines[k].j - 1] += 1;
			}
			if(grid[mines[k].i + 1][mines[k].j] != 9) grid[mines[k].i + 1][mines[k].j] += 1;
			if(mines[k].j != 9) {
				if(grid[mines[k].i + 1][mines[k].j + 1] != 9) grid[mines[k].i + 1][mines[k].j + 1] += 1;
			}
		}
	}


	for (var i = 0; i < M; i++) {
		for (var j = 0; j < N; j++) {
			ctx.drawImage(tilesImage, 10*C_S, 0, C_S, C_S, j*C_S, i*C_S, C_S, C_S);
		}
	}
}

function zero(i, j) {
	ctx.drawImage(tilesImage, C_S*grid[i][j], 0, C_S, C_S, i*C_S, j*C_S, C_S, C_S);
	grid_open[i][j] = 1;

	if(i != 0) {
		if(j != 0) {
			if (grid_open[i-1][j-1] == 0) {
				if (grid[i-1][j-1] == 0) {
					zero(i-1, j-1);
				} else {
					ctx.drawImage(tilesImage, C_S*grid[i-1][j-1], 0, C_S, C_S, (j-1)*C_S, (i-1)*C_S, C_S, C_S);
					grid_open[i-1][j-1] = 1;
				}
			}
		}
		if (grid_open[i-1][j] == 0) {
			if (grid[i-1][j] == 0) {
				zero(i-1, j);
			} else {
				ctx.drawImage(tilesImage, C_S*grid[i-1][j], 0, C_S, C_S, j*C_S, (i-1)*C_S, C_S, C_S);
				grid_open[i-1][j] = 1;
			}
		}
		if(j != 9) {
			if (grid_open[i-1][j+1] == 0) {
				if (grid[i-1][j+1] == 0) {
					zero(i-1, j+1);
				} else {
					ctx.drawImage(tilesImage, C_S*grid[i-1][j+1], 0, C_S, C_S, (j+1)*C_S, (i-1)*C_S, C_S, C_S);
					grid_open[i-1][j+1] = 1;
				}
			}
		}
	}

	if(j != 0) {
		if (grid_open[i][j-1] == 0) {
			if (grid[i][j-1] == 0) {
				zero(i, j-1);
			} else {
				ctx.drawImage(tilesImage, C_S*grid[i][j-1], 0, C_S, C_S, (j-1)*C_S, i*C_S, C_S, C_S);
				grid_open[i][j-1] = 1;
			}
		}
	}
	if(j != 9) {
		if (grid_open[i][j+1] == 0) {
			if (grid[i][j+1] == 0) {
				zero(i, j+1);
			} else {
				ctx.drawImage(tilesImage, C_S*grid[i][j+1], 0, C_S, C_S, (j+1)*C_S, i*C_S, C_S, C_S);
				grid_open[i][j+1] = 1;
			}
		}
	}

	if(i != 9) {
		if(j != 0) {
			if (grid_open[i+1][j-1] == 0) {
				if (grid[i+1][j-1] == 0) {
					zero(i+1, j-1);
				} else {
					ctx.drawImage(tilesImage, C_S*grid[i+1][j-1], 0, C_S, C_S, (j-1)*C_S, (i+1)*C_S, C_S, C_S);
					grid_open[i+1][j-1] = 1;
				}
			}
		}
		if (grid_open[i+1][j] == 0) {
			if (grid[i+1][j] == 0) {
				zero(i+1, j);
			} else {
				ctx.drawImage(tilesImage, C_S*grid[i+1][j], 0, C_S, C_S, j*C_S, (i-1)*C_S, C_S, C_S);
				grid_open[i+1][j] = 1;
			}
		}
		if(j != 9) {
			if (grid_open[i+1][j+1] == 0) {
				if (grid[i+1][j+1] == 0) {
					zero(i+1, j+1);
				} else {
					ctx.drawImage(tilesImage, C_S*grid[i+1][j+1], 0, C_S, C_S, (j+1)*C_S, (i+1)*C_S, C_S, C_S);
					grid_open[i+1][j+1] = 1;
				}
			}
		}
	}

}

function check() {
	var rect = canvas.getBoundingClientRect();
	var newX = Math.floor((event.clientX - rect.left) / C_S);
	var newY = Math.floor((event.clientY - rect.top) / C_S);

	if(grid_open[newY][newX] == 0) {
		if(grid[newY][newX] == 9) gameOver();
//		if(grid[newY][newX] == 0) zero(newY, newX);

		ctx.drawImage(tilesImage, C_S*grid[newY][newX], 0, C_S, C_S, newX*C_S, newY*C_S, C_S, C_S);
		grid_open[newY][newX] = 1;
		close_count--;

		if(close_count == mines.length) {
			youWin();
		}
	}
}

function flag(event) {
	var rect = canvas.getBoundingClientRect();
	var newX = Math.floor((event.clientX - rect.left) / C_S);
	var newY = Math.floor((event.clientY - rect.top) / C_S);

	if(grid_open[newY][newX] == 0) {
		ctx.drawImage(tilesImage, C_S*11, 0, C_S, C_S, newX*C_S, newY*C_S, C_S, C_S);
		grid_open[newY][newX] = 2;
	} else if(grid_open[newY][newX] == 2) {
		ctx.drawImage(tilesImage, C_S*10, 0, C_S, C_S, newX*C_S, newY*C_S, C_S, C_S);
		grid_open[newY][newX] = 0;
	}

}

function main() {
	setTimeout(init, 200);
}

canvas.addEventListener("click", function temp(event) {
	check(event);
})

canvas.addEventListener("contextmenu", function temp(event) {
	flag(event);
})

main()