'use strict';
//Helps with gamePlay function
let turn = -1;

//Prompts for user input on player name/mark
const userInput = (() => {
	const user1 = prompt('Player #1 - What is Your Name', 'Bob');
	const mark1 = prompt(
		'Would ' + user1 + ' like to change game letters?',
		'q'
	).toUpperCase();
	const user2 = prompt('Player #2 - What is Your Name', 'Frank');
	const mark2 = prompt(
		'Would ' + user2 + ' like to change game letters?',
		'w'
	).toUpperCase();
	return { user1, user2, mark1, mark2 };
})();

//factory to take the user input to create players
const Player = (name, mark) => {
	(this.name = name), (this.mark = mark);
	const info = () => {
		return name + ' = ' + mark;
	};
	return { name, mark, info };
};

//Players info from userinput object and sends them to Player factory
const player1 = Player(userInput.user1, userInput.mark1);
const player2 = Player(userInput.user2, userInput.mark2);
let player1Array = [];
let player2Array = [];

//Object housing game board array for gameboard moves
const gameBoard = {
	boardArray: ['', '', '', '', '', '', '', '', ''],
};

//Creates/Displays board
function renderBoard() {
	//loops through each element in array to create board
	$.each(gameBoard.boardArray, function(index) {
		const square = document.createElement('DIV');
		const markValue = document.createElement('P');
		//create divs as the squares for the board
		$(square).attr({
			id: 'square' + (index + 1),
			class: 'squares',
		});
		//displays the array elements in game squares
		$(markValue).attr('class', 'squareContent');
		$(markValue).text(this);
		//attaches squares to board and square content
		$('div#board').append(square);
		$(square).append(markValue);

		return index;
	});
	//Calls gamePlay function
	gamePlay();
}

//create players display
const createPlayerDisplays = (function() {
	const playerDisplay = document.createElement('DIV');
	$(playerDisplay).attr('id', 'playerDisplay');
	$('div#board').after(playerDisplay);
	$('#playerDisplay').html(
		`<p id='player1Info'> ${player1.info()} </p>` +
			`<p id='player2Info'> ${player2.info()} </p>`
	);
})();

//clears board - new game
function clearBoard() {
	turn = -1;
	$('.squares').remove();
	$('#topDisplay').empty();
	player1Array = [];
	player2Array = [];
	gameBoard.boardArray = ['', '', '', '', '', '', '', '', ''];
	renderBoard();
	return turn, player1Array, player2Array;
}

//Controls players turn and display above board
function gamePlay() {
	$('#topDisplay').append(function() {
		$('#topDisplay').html(`<p >~ ${player1.name}'s Turn ~ </p>`);
	});

	$('p.squareContent').on('click', function() {
		const squareIndex = $('p.squareContent').index(this);
		turn++;
		if (turn % 2 === 0) {
			$(this).text(player1.mark);
			player1Array.push(squareIndex);
			gameBoard.boardArray.splice(squareIndex, 1, player1.mark);
			$('#topDisplay').html(`<p>~ ${player2.name}'s Turn ~</p>`);
		} else {
			$(this).text(player2.mark);
			player2Array.push(squareIndex);
			gameBoard.boardArray.splice(squareIndex, 1, player2.mark);
			$('#topDisplay').html(`<p>~ ${player1.name}'s Turn ~</p>`);
		}
		$(this).off('click');

		if (turn >= 4) {
			rules();
		}
		// console.log(turn);
		console.log(player1Array, player2Array);
	});
	return player1Array, player2Array;
}

function rules() {
	const winningPlays = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	function winner(play, player) {
		return play === player;
	}

	for (let x of winningPlays) {
		let result = x.map(function(y) {
			return parseInt(y, 10);
		});

		let winningMove = x.sort(function(a, b) {
			return a - b;
		});

		let winPlayer = player1Array.sort(function(a, b) {
			return a - b;
		});

		console.log(winningMove, winPlayer, result);
		winner(winningMove, winPlayer);
	}
}

renderBoard();

//parseInt(winPlayer.join('')) === parseInt(winElement.join(''))
