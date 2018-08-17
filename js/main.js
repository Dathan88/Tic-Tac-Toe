"use strict";

const gameBoard = (() => {
	let gameBoardArray = ["", "", "","", "", "","", "", ""];

	const clearGameBoard = () => {
		this.gameBoardArray = ["", "", "","", "", "","", "", ""];
	};

	const createGameBoard = () => {
		$.each(gameBoardArray, function(index) {
			let square = document.createElement("DIV");
			$(square).attr({
				"id" : "square" + (index + 1),
				"class" : "squares"
			});

			$("div#board").append(square);
		});

		$(".squares").one("click", function() {
			$(this).append("X");
		});
	};
	createGameBoard();
});

const playerFactory = (name, position, symbol) => {
	const info = () => { return name + " - " + "Player " + position + " Symbol = " + symbol };
	return { name, position, info }
}

const playGame = () => {};

let bob = playerFactory("Bob", 1, "X");
let george = playerFactory("George", 2, "O");

gameBoard();
console.log();
console.log(george.info());


/*gameBoardArray.forEach((item, index) => {
	let squareId = gameBoardArray.indexOf(item) + 1;
	let square = document.createElement("DIV");
		square.setAttribute("class", "squares");
		square.setAttribute("id", "square" + squareId);

		square.addEventListener("click", (e) => {
		if (square.innerHTML === "X") {
			square.innerHTML = "O";
		} else {
			square.innerHTML = "X";
		}
	});
	board.appendChild(square);
	console.log(squareId);
});*/