"use strict";

const gameBoard = (() => {
	let gameBoardArray = ["X", "X", "O","X", "O", "O","O", "X", "O"];

	const createGameBoard = () => {
		$.each(gameBoardArray, function(index) {
			const square = document.createElement("DIV");
			$(square).attr({
				"id" : "square" + (index + 1),
				"class" : "squares"
			});
			$("div#board").append(square);
		});

		const bottomDisplay = document.createElement("DIV");
			$(bottomDisplay).attr("id", "bottomDisplay");
			$("div#board").after(bottomDisplay);
			$("#bottomDisplay").html(`<p id="player1Info"> ${player1.info()} </p>` + `<p id="player2Info"> ${player2.info()} </p>`);

			$(".squares").one("click", function() {
				$(this).text();
			});
	};

	const clearGameBoard = () => {
		this.gameBoardArray = ["", "", "","", "", "","", "", ""];
	};
	createGameBoard();
});

const playerFactory = (name, mark) => {
	const getName = () => name;
	const getMark = () => mark;
	const move = () => {
		$(".squares").one("click", function() {
			$(this).append(name.mark);
			return name + mark;
		});
	}
	/*const win;
	const lose;*/

	const info = () => { return "Player : " + name + " = " + mark };
	console.log();
	return { name, mark, info };
}

let player1 = playerFactory("1", "X");
let player2 = playerFactory("2", "O");

const playGame = () => {};

gameBoard();
console.log(playerFactory.name);
console.log(player1);
console.log(player2.info());