"use strict";
const playGame = () => {};
let input1 = prompt("Player #1 - What is Your Name", "Bob");
let input2 = prompt("Player #2 - What is Your Name", "Frank");

const gameBoard = (() => {
	let gameBoardArray = ["X", "X", "O","X", "O", "O","O", "X", "O"];

	const createGameBoard = () => {
		$.each(gameBoardArray, function(index, element) {
			const square = document.createElement("DIV");
			const markValue = document.createElement("P");
			$(square).attr({
				"id" : "square" + (index + 1),
				"class" : "squares"
			});
			$(markValue).attr( "class", "squareContent");
			$(markValue).html(this);

			$("div#board").append(square);
			$(square).append(markValue);
					//console.log(index);
					//console.log(element);
		});

		const bottomDisplay = document.createElement("DIV");
			$(bottomDisplay).attr("id", "bottomDisplay");
			$("div#board").after(bottomDisplay);
			$("#bottomDisplay").html(`<p id="player1Info"> ${player1.info()} </p>` + `<p id="player2Info"> ${player2.info()} </p>`);

			/*$(".squares").one("click", function() {
				$(this).text(`${player1.mark}`);
				$(this).text(`${player2.mark}`);
			});*/
	};

	const clearGameBoard = () => {
		this.gameBoardArray = ["", "", "","", "", "","", "", ""];
	};


	const playerFactory = (name, mark) => {
		const player = {};
		player.name = () => name;
		player.mark = () => mark;
		player.info = () => { return name + " is the " + mark };
		const move = () => {
			console.log(this.mark);
			/*$(".squares").one("click", function() {
				$(this).text(mark);
			});*/
		}
		return player;
	}

	let player1 = playerFactory(input1, "Y");
	let player2 = playerFactory(input2, "Z");
	player1.move();

	console.log(input1);
	console.log(player2.info());
	createGameBoard();
});

gameBoard();