"use strict";
//Helps with playersTurn function
let turn = 0;

//Prompts for user input on player name/mark
const userInput = (() => {
	const user1 = prompt("Player #1 - What is Your Name", "Bob");
	const mark1 = prompt("Would " + user1 + " like to change game letters?", "q").toUpperCase();
	const user2 = prompt("Player #2 - What is Your Name", "Frank");
	const mark2 = prompt("Would " + user2 + " like to change game letters?", "w").toUpperCase();
	console.log(user1, user2)
	return { user1, user2, mark1, mark2 };
})();
console.log(typeof userInput);

//factory to take the user input to create players
const Player = ( name, mark ) => {
	this.name = name,
	this.mark = mark
	const info = () => { return name + " = " + mark }
	return { name, mark, info }
};

//Players info from userinput object and sends them to Player factory
const player1 = Player(userInput.user1, userInput.mark1);
const player2 = Player(userInput.user2, userInput.mark2);
	console.log( player1.info(), player2.info() );

//Object housing game board array for gameboard moves
const gameBoard = {
	boardArray : ["", "", "","", "", "","", "", ""]
};
console.log( gameBoard );

//Creates/Displays game board
function creategameBoard() {
	//loops through each element in array/displays values on board
	$.each(gameBoard.boardArray, function(index) {
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
		//gameBoard.boardArray.push(player1.mark);
		$(this).text(function() {
			console.log( $(".squareContent").index(this) );
			$(this).text(player1.mark),
			playersTurn(),
			$(this).off("click");
		})
	});
};

//create players display
const createDisplays = (function() {
	const playerDisplay = document.createElement("DIV");
	$(playerDisplay).attr("id", "playerDisplay");
	$("div#board").after(playerDisplay);
	$("#playerDisplay").html(`<p id="player1Info"> ${player1.info()} </p>` + `<p id="player2Info"> ${player2.info()} </p>`);
})();

//clears board - new game
function clearBoard() {
	$(".squares").remove();
	gameBoard.boardArray = ["", "", "","", "", "","", "", ""];
	creategameBoard();
};

//Controls who's turn is it
const playersTurn = () => {
	turn++;
	$("p.squareContent").each(function(index) {
		//console.log(index)
		if(turn % 2 === 0) {
			$("p.squareContent").one("click", function() {
				$(this).off("click");
				$(this).text(player1.mark)
				console.log( $(".squareContent").index(this) );
				//gameBoard.boardArray.push(player1.mark);
				//console.log(gameBoard.boardArray);
			})
		} else {
			$("p.squareContent").one("click", function() {
				$(this).off("click");
				$(this).text(player2.mark)
				console.log( $(".squareContent").index(this) );
				//gameBoard.boardArray.push(player2.mark);
				//console.log(gameBoard.boardArray);
			})
		}
	})
	console.log( turn );
	return turn;
};

const rules = () => {}

creategameBoard()