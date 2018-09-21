'use strict';

//'let turn' helps with playerTurn function - tracks player's turn
let turn = -1;
let round = 1;

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
	const wins = [];
	const info = () => {
		return name + ' = ' + mark;
	};
	return { name, mark, moves, info, wins };
};

//Players info from userinput object and sends them to Player factory
const player1 = Player(userInput.user1, userInput.mark1);
const player2 = Player(userInput.user2, userInput.mark2);
console.trace(player1);
console.trace(player2);

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
	$('#newGameBtn').hide();
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
const createPlayerDisplays = (() => {
	const turnDisplay = document.createElement('H1');
	const player1Display = document.createElement('H1');
	const player2Display = document.createElement('H1');

	$(turnDisplay).attr('id', 'turnDisplay');
	$('div#mainContainer').prepend(turnDisplay);
	$('#turnDisplay').html(`~ ${player1.name}'s Turn ~`);

	$(player1Display).attr('id', 'player1Display');
	$('div#leftContainer').prepend(player1Display);
	$('#player1Display').html(`${player1.info()}`);

	$(player2Display).attr('id', 'player2Display');
	$('div#rightContainer').prepend(player2Display);
	$('#player2Display').html(`${player2.info()}`);
})();

//clears board - new game
function clearBoard() {
	$('*').off();
	turn = -1;
	$('#newGameBtn').hide();
	$('.squares').remove();
	$('#turnDisplay').html(`~ ${player1.name}'s Turn ~`);
	player1.moves = [];
	player2.moves = [];
	//$('*').css('color', 'black');
	gameBoard.boardArray = ['', '', '', '', '', '', '', '', ''];
	renderBoard();
	createPlayerDisplays;
	// return turn, player1.moves, player2.moves;
}

//Controls players turn and display above board
function playerTurn() {
	$('p.squareContent').on('click', function() {
		turn++;
		$('#nextRound').show();
		const squareIndex = $('p.squareContent').index(this);

		if (turn % 2 === 0) {
			$(this).text(player1.mark);
			player1.moves.push(squareIndex);
			gameBoard.boardArray.splice(squareIndex, 1, player1.mark);
			$('#turnDisplay').html(`~ ${player2.name}'s Turn ~`);
		} else {
			$(this).text(player2.mark);
			player2.moves.push(squareIndex);
			gameBoard.boardArray.splice(squareIndex, 1, player2.mark);
			$('#turnDisplay').html(`~ ${player1.name}'s Turn ~`);
		}
		$(this).off('click');

		if (turn === 8) {
			$('#turnDisplay').html(`Draw. Game Over.`);
			checkWinner();
		} else if (turn === 7) {
			$('#turnDisplay').html(` Last Move `);
			checkWinner();
		} else if (turn > 3) {
			checkWinner();
		}
	});
	return player1.moves, player2.moves;
}

//Checks player.moves with winningMoves
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
				if (player1Count === 3) {
					player1.wins.push('X');
					$('div#leftContainer > div.wins').html(`${player1.wins.join(' ')}`);
					$('#turnDisplay').html(`${player1.name} Wins Round ${round}!!!`);
					$('p.squareContent').off('click');
					round++;
					console.log(player1.wins.length);
				}
			} else if (player2.moves.includes(value[i])) {
				player2Count++;
				if (player2Count === 3) {
					player2.wins.push('X');
					$('div#rightContainer > div.wins').html(`${player2.wins.join(' ')}`);
					$('#turnDisplay').html(`${player2.name} Wins Round ${round}!!!`);
					$('p.squareContent').off('click');
					round++;
					console.log(player2.wins);
				}
			}
		}
	}
	gameOver();
}

function gameOver() {
	if (player1.wins.length === 3) {
		round = 1;
		$('#turnDisplay').html(`${player1.name} Defeated ${player2.name}!!!`);
		// $('*').addClass('animation');
		$('html').click(function() {
			if ($('*').hasClass('animation')) {
				$('*').removeClass('animation');
			} else {
				$('*').addClass('animation');
			}
		});
		$('#newGameBtn').show();
		$('#nextRound').hide();
	} else if (player2.wins.length === 3) {
		round = 1;
		$('#turnDisplay').html(`${player2.name} Defeated ${player1.name}!!!`);
		$('*').click(function() {
			if ($('*').hasClass('animation')) {
				$('*').removeClass('animation');
			} else {
				$('*').addClass('animation');
			}
		});
		$('#newGameBtn').show();
		$('#nextRound').hide();
	}
}

function newGame() {
	$('*').removeClass('animation');
	player1.wins = [];
	player2.wins = [];
	$('div#leftContainer > div.wins').html(` `);
	$('div#rightContainer > div.wins').html(` `);
	clearBoard();
}

renderBoard();
