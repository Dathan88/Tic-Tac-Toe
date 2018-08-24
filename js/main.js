"use strict";

const playGame = (() => {
	//Function that loops through array & sets up gameboard
	const createGameBoard = (() => {
		//Array for storage of player moves
		let gameBoardArray = ["X", "X", "O","X", "O", "O","O", "X", "O"];
		//loops through each element in array/displays values on board
		$.each(gameBoardArray, function(index, element) {
			const square = document.createElement("DIV");
			const markValue = document.createElement("P");
			//create divs as the squares for the board
			$(square).attr({
				"id" : "square" + (index + 1),
				"class" : "squares"
			});
			//displays the array elements in game squares
			$(markValue).attr( "class", "squareContent");
			$(markValue).text(this);
			//attaches squares to board and square content
			$("div#board").append(square);
			$(square).append(markValue);
		});
	})();

	//prompts and conditions for user input - names and symbols and creates display for player info below gameboard
	const createPlayers = (() => {
		const user1 = prompt("Player #1 - What is Your Name", "Bob");
		const mark1 = prompt("Would " + user1 + " like to change your game letter?", "e").toUpperCase();
		const user2 = prompt("Player #2 - What is Your Name", "Frank");
		const mark2 = prompt("Would " + user2 + " like to change your game letter?", "v").toUpperCase();
		//factory to take the user input to create players
		const Player = ({ name, mark }) => ({
			name,
			mark,
			info: () => { return name + "'s" + " sign is " + mark }
		});
		const player1 = Player({ name: user1, mark: mark1 });
		const player2 = Player({ name: user2, mark: mark2 });
		let playersList = [];

			console.log(player2.info());
			console.log(player1.info());

		const bottomDisplay = document.createElement("DIV");
			$(bottomDisplay).attr("id", "bottomDisplay");
			$("div#board").after(bottomDisplay);
			$("#bottomDisplay").html(`<p id="player1Info"> ${player1.info()} </p>` + `<p id="player2Info"> ${player2.info()} </p>`);
			/*$(".squares").toggle("click", function() {
					$(this).text();
			});*/
			console.log(Player instanceof Object);
			/*for() {
				console.log();
			}*/
			console.log($("Player").find("Object"));
	})();
	//clears board
	const clearGameBoard = () => {
		this.gameBoardArray = ["", "", "","", "", "","", "", ""];
	};
})();