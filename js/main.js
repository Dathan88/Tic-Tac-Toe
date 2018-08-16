"use strict";

const gameBoard = (() => {
	let gameBoardArray = ["", "", "","", "", "","", "", "",];

	const clearGameBoard = () => {
		this.gameBoardArray = ["", "", "","", "", "","", "", "",];
	};

	const makeBoard = (() => {

	});
});

function board() {
	let i;
	const gameBoard = document.getElementById("gameBoard");

	const boardLayout = document.createElement("TABLE");
		boardLayout.classList.add("boardLayout");

	gameBoard.appendChild(boardLayout);


	for (i = 0; i < 3; i++) {
		let squares = document.createElement('TR');
			squares.classList.add('squares');

			squares.addEventListener('click', (e) => {
				if (e.target.innerHTML === "X") {
					e.target.innerHTML = "O";
				} else {
					e.target.innerHTML = "X";
				}
			});
		boardLayout.appendChild(squares);
	}
}

function Player(name, number, symbol) {
	this.name = name;
	this.number = number;
	this.symbol = symbol;
	this.title = function() {
		return this.name + " - " + "Player " + this.number + " Symbol = " + this.symbol;
	};
}

let bob = new Player("Bob", 1, "X");
let george = new Player("George", 2, "O");

console.log(bob.title());
console.log(george.title());

document.getElementsByTagName("body").onload = board();


/*$(function() {
	alert("Hey");
});*/

/*var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello There!');
}).listen(8080);*/