"use strict";
let turn = 0;
const user1 = prompt("Player #1 - What is Your Name", "Bob");
const mark1 = prompt("Would " + user1 + " like to change game letters?", "e").toUpperCase();
const user2 = prompt("Player #2 - What is Your Name", "Frank");
const mark2 = prompt("Would " + user2 + " like to change game letters?", "v").toUpperCase();

//factory to take the user input to create players
const Player = ( name, mark ) => {
	this.name = name,
	this.mark = mark
	const info = () => { return name + " = " + mark }
	return { name, mark, info }
};

const player1 = Player(user1, mark1);
const player2 = Player(user2, mark2);
console.log(player1.info());

//Controls who's turn it is
const playersTurn = (name, mark) => {
	turn++;
	$("p.squareContent").each(function() {
		if(turn % 2 === 0) {
			$("p.squareContent").one("click", function() {
				$(this).off("click");
				$(this).text(player1.mark)
			})
		} else {
			$("p.squareContent").one("click", function() {
				$(this).off("click");
				$(this).text(player2.mark)
			})
		}
	})
	console.log( turn );
	return turn;
};

//Creates game board
(function createGameBoard() {
	//Array for storage of player moves
	let gameBoardArray = ["", "", "","", "", "","", "", ""];
	//loops through each element in array/displays values on board
	$.each(gameBoardArray, function(index) {
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
	//Makes first move and triggers playersTurn function
	$("p.squareContent").click(function() {
		$(this).text(function() {
			$(this).text(player1.mark),
			playersTurn(),
			$(this).off("click")
		})
	});
	//create bottom player display
	const bottomDisplay = document.createElement("DIV");
	$(bottomDisplay).attr("id", "bottomDisplay");
		$("div#board").after(bottomDisplay);
		$("#bottomDisplay").html(`<p id="player1Info"> ${player1.info()} </p>` + `<p id="player2Info"> ${player2.info()} </p>`);
		
	//clears board - new game
	const clearGameBoard = () => {
		this.gameBoardArray = ["", "", "","", "", "","", "", ""];
	};
}());