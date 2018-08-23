"use strict";

const playGame = () => {
	let player1 = playerFactory("1", "X");
	let player2 = playerFactory("2", "O");

	const gameBoard = (() => {
		let gameBoardArray = ["X", "X", "O","X", "O", "O","O", "X", "O"];

		const clearGameBoard = () => {
			this.gameBoardArray = ["", "", "","", "", "","", "", ""];
		};

		const createGameBoard = () => {
			let input = prompt("Player 1 Name");
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
					console.log(index);
					console.log(element);
			});

		const bottomDisplay = document.createElement("DIV");
			$(bottomDisplay).attr("id", "bottomDisplay");
			$("div#board").after(bottomDisplay);
			$("#bottomDisplay").html(`<p id="player1Info"> ${player1.info()} </p>` + `<p id="player2Info"> ${player2.info()} </p>`);

			$(".squares").one("click", function() {
				$(this).text("X");
			});
		};
		createGameBoard();
	});

	class Player {
		playerFactory(name, mark) {
			this.name = name;
			this.mark = mark;
		}
		//move = () => {

		}
	console.log(playerFactory.name);
	console.log(player1);
	console.log(player2.info());
	gameBoard();
	}

	/*const playerFactory = (name, mark) => {
		const getName = () => name;
		const getMark = () => mark;
		const move = () => {
			$(".squares").one("click", function() {
				$(this).append(name.mark);
				return name + mark;
			});
		}

		const info = () => { return "Player : " + name + " = " + mark };
		console.log();
		return { name, mark, info };
	}*/


playGame();