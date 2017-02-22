/**/
/*var canvas = document.getElementById('board');

context = canvas.getContext('2d');
context.scale(2,2);

var requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;

window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
	canvas.width = window.innerWidth * 2;
	canvas.height = window.innerWidth;
	canvas.style.width = window.innerWidth + 'px';
	canvas.style.height = (window.innerWidth / 2) + 'px';

	if (board) board.draw();
}

resizeCanvas();


function Board(ctx) {
	this.ctx = ctx;
	this.K = canvas.width / 640;
	this.x = 50*this.K;
	this.y = 40*this.K;
	this.points = 29;
	this.currPoint = 1;
}

Board.prototype.draw = function() {
	var turnPoint = 13;
	var x = this.x;
	var y = this.y;
	this.ctx.clearRect(0, 0, canvas.width, canvas.height);
	this.ctx.save();

	for (var i=0; i < this.currPoint; i++) {
		this.ctx.beginPath();
		this.ctx.fillStyle = '#eee';
		this.ctx.arc(x,y,15*this.K,0,2*Math.PI);
		
		

		if (i < turnPoint) {
			x += 40*this.K;
		} else if (i == turnPoint) {
			x += 30*this.K;
			y += 30*this.K;
		} else if (i == turnPoint+1) {
			x -= 30*this.K;
			y += 30*this.K;
		} else if (i > turnPoint+1) {
			x -= 40*this.K;
		}

		this.ctx.fill();
	}

	if (this.currPoint < this.points) {
		this.currPoint++;
		requestAnimationFrame(this.draw.bind(this));
	} else {
		return;
	}
}

Board.prototype.drawTeam = function(color, offset) {
	this.ctx.beginPath();
	this.ctx.fillStyle = color;
	this.ctx.arc(this.x+offset.x*this.K,this.y+offset.y*this.K,5*this.K,0,2*Math.PI);
	this.ctx.fill();
}

var board = new Board(context);

board.draw();
setTimeout(function() {
	board.drawTeam('#ff551a', {x: 0, y: 0});
	board.drawTeam('#1a8bff', {x: 0, y: -12});
	board.drawTeam('#25b100', {x: 0, y: 12});
	//board.drawTeam('#cd00d4', {x: 6, y: 6});
	
}, 2000);
setTimeout(function() {
	board.draw();
}, 3000);*/



var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("width", window.innerWidth);
svg.setAttribute("height", window.innerWidth / 2);
svg.setAttribute("version", "1.1");
document.getElementById("app").appendChild(svg);


class Board {
	constructor() {
		this.Width = window.innerWidth;
		this.Height = this.Width / 2;
		this.K = this.Width / 320;
	}

	draw() {
		for (var i=0; i<29; i++) {
			var point = this.getPointPosition(i);
			var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
			circle.setAttribute('cx', point.x+(25*this.K));
			circle.setAttribute('cy', point.y);
			circle.setAttribute('r', 8*this.K);
			circle.setAttribute("fill", '#eee');
			svg.appendChild(circle);
		}
	}

	getPointPosition(number) {
		var position = {};
		var turnPoint = 14;

		if (number < turnPoint) {
			position['x'] = 20*number*this.K;
			position['y'] = 20*this.K;
		} else if (number == turnPoint) {
			position['x'] = (20*(number-1)+15)*this.K;
			position['y'] = 35*this.K;
		} else if (number == turnPoint+1) {
			position['x'] = (20*(number-2))*this.K;
			position['y'] = 50*this.K;
		} else if (number > turnPoint+1) {
			position['x'] = (28-number)*20*this.K;
			position['y'] = 50*this.K;
		}

		return position;
	}
}

var board = new Board();
board.draw();

function drawBoard() {

	for (var i=0; i < 29; i++) {
		
	}
}

function getPointPosition(number) {

}






