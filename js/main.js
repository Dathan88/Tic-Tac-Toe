'use strict';
//'let turn' helps with playerTurn function - tracks player's turn
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
	const moves = [];
	const info = () => {
		return name + ' = ' + mark;
	};
	return { name, mark, moves, info };
};

//Players info from userinput object and sends them to Player factory
const player1 = Player(userInput.user1, userInput.mark1);
const player2 = Player(userInput.user2, userInput.mark2);

//Object containing boardArray for gameboard display/moves
const gameBoard = {
	boardArray: ['', '', '', '', '', '', '', '', ''],
};

//Object containing arrays of winning moves
const winningMoves = {
	play1: [0, 1, 2],
	play2: [3, 4, 5],
	play3: [6, 7, 8],
	play4: [0, 3, 6],
	play5: [1, 4, 7],
	play6: [2, 5, 8],
	play7: [0, 4, 8],
	play8: [2, 4, 6],
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
	//Calls playerTurn function
	playerTurn();
}

//create players display
const createPlayerDisplays = (function() {
	const playerDisplay = document.createElement('DIV');

	$('#topDisplay').append(function() {
		$('#topDisplay').html(`<p >~ ${player1.name}'s Turn ~ </p>`);
	});
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
	player1.array = [];
	player2.array = [];
	gameBoard.boardArray = ['', '', '', '', '', '', '', '', ''];
	renderBoard();
	return turn, player1.array, player2.array;
}

//Controls players turn and display above board
function playerTurn() {
	$('p.squareContent').on('click', function() {
		const squareIndex = $('p.squareContent').index(this);
		turn++;
		if (turn % 2 === 0) {
			$(this).text(player1.mark);
			player1.moves.push(squareIndex);
			gameBoard.boardArray.splice(squareIndex, 1, player1.mark);
			$('#topDisplay').html(`<p>~ ${player2.name}'s Turn ~</p>`);
		} else {
			$(this).text(player2.mark);
			player2.moves.push(squareIndex);
			gameBoard.boardArray.splice(squareIndex, 1, player2.mark);
			$('#topDisplay').html(`<p>~ ${player1.name}'s Turn ~</p>`);
		}
		$(this).off('click');

		if (turn === 8) {
			$('#topDisplay').html(`<p> Draw. Game Over. </p>`);
			checkWinner();
		} else if (turn === 7) {
			$('#topDisplay').html(`<p> Last Move. </p>`);
			checkWinner();
		} else if (turn > 3) {
			checkWinner();
		}

		console.log(turn);
	});
	return player1.moves, player2.moves;
}

function checkWinner() {
	let player1Count = 0;
	let player2Count = 0;
	const values = Object.values(winningMoves);

	for (const value of values) {
		player1Count = 0;
		player2Count = 0;
		//console.log(player1.moves);
		for (let i = 0; i < value.length; i++) {
			if (player1.moves.includes(value[i])) {
				player1Count++;
				//console.log(player1Count);
				if (player1Count === 3) {
					$('#topDisplay').html(
						`<p> ${player1.name} Wins!!! Game Over!!! </p>`
					);
					$('p.squareContent').off('click');
				}
			} else if (player2.moves.includes(value[i])) {
				player2Count++;
				if (player2Count === 3) {
					console.log('player 2 Winner!');
					$('#topDisplay').html(
						`<p> ${player2.name} Wins!!! Game Over!!! </p>`
					);
					$('p.squareContent').off('click');
				}
			}
		}
	}
}

renderBoard();
