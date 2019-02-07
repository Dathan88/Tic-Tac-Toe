'use strict';

//'let turn' helps with playerTurn function - tracks player's turn
let turn = -1;
let round = 1;

//factory to take the user input to create players
const Player = (name, mark) => {
	const moves = [];
	const wins = [];
	const info = () => {
		return name + ' = ' + mark;
	};
	return { name, mark, moves, wins, info };
};

//Players info from userinput object and sends them to Player factory
const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O');

//Gameboard factory
const gameBoard = () => {
	//Tracks player moves
	const boardArray = ['', '', '', '', '', '', '', '', ''];
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

	return { boardArray, winningMoves };
};

//Creates/Displays board
function renderBoard() {
	$('#newGameBtn').hide();
	//loops through each element in array to create board
	$.each(gameBoard().boardArray, function(i) {
		const square = document.createElement('DIV');
		const markValue = document.createElement('P');
		//create divs as the squares for the board
		$(square).attr({
			id: 'square' + (i + 1),
			class: 'squares',
		});
		//displays the array elements in game squares
		$(markValue).attr('class', 'squareContent');
		$(markValue).text(this);
		//attaches squares to board and square content
		$('div#board').append(square);
		$(square).append(markValue);

		// return i;
	});
	//Calls playerTurn function
	playerTurn();
}

//create players display
function createPlayerDisplays() {
	const turnDisplay = document.createElement('p');
	const player1Display = document.createElement('p');
	const player2Display = document.createElement('p');

	$(turnDisplay).attr('id', 'turnDisplay');
	$('div#mainContainer').prepend(turnDisplay);
	$('#turnDisplay').html(`~ ${player1.name}'s Turn ~`);

	$(player1Display).attr('id', 'player1Display');
	$('div#leftContainer').prepend(player1Display);
	$('#player1Display').html(`${player1.info()}`);

	$(player2Display).attr('id', 'player2Display');
	$('div#rightContainer').prepend(player2Display);
	$('#player2Display').html(`${player2.info()}`);
}

//clears board - new game
function clearBoard() {
	$('*').off();
	turn = -1;
	$('#newGameBtn').hide();
	$('#nextRound').hide();
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
		$('#newGameBtn').show();
		const squareIndex = $('p.squareContent').index(this);

		if (turn % 2 === 0) {
			$(this).text(player1.mark);
			player1.moves.push(squareIndex);
			gameBoard().boardArray.splice(squareIndex, 1, player1.mark);
			$('#turnDisplay').html(`~ ${player2.name}'s Turn ~`);
		} else {
			$(this).text(player2.mark);
			player2.moves.push(squareIndex);
			gameBoard().boardArray.splice(squareIndex, 1, player2.mark);
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
	const values = Object.values(gameBoard().winningMoves);

	for (const value of values) {
		player1Count = 0;
		player2Count = 0;
		//console.log(player1.moves);
		for (let i = 0; i < value.length; i++) {
			if (player1.moves.includes(value[i])) {
				player1Count++;
				if (player1Count === 3) {
					player1.wins.push('X');
					$('div#leftContainer > p.wins').html(`${player1.wins.join(' ')}`);
					$('#turnDisplay').html(`X marks the spot for Player 1!!!`);
					$('p.squareContent').off('click');
					$('#newGameBtn').hide();
					$('#nextRound').show();
					round++;
					console.log(player1.wins.length);
				}
			} else if (player2.moves.includes(value[i])) {
				player2Count++;
				if (player2Count === 3) {
					player2.wins.push('O');
					$('div#rightContainer > p.wins').html(`${player2.wins.join(' ')}`);
					$('#turnDisplay').html(`The O's win it for Player 2!!!`);
					$('p.squareContent').off('click');
					$('#newGameBtn').hide();
					$('#nextRound').show();
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
		return $('#turnDisplay').html(
			`${player1.name} Defeated ${player2.name}!!!`
		);
	} else if (player2.wins.length === 3) {
		round = 1;
		$('*').click(function() {
			if ($('*').hasClass('animation')) {
				$('*').removeClass('animation');
			} else {
				$('*').addClass('animation');
			}
		});
		$('#newGameBtn').show();
		$('#nextRound').hide();
		return $('#turnDisplay').html(
			`${player2.name} Defeated ${player1.name}!!!`
		);
	}
}

function newGame() {
	$('*').removeClass('animation');
	player1.wins = [];
	player2.wins = [];
	$('div#leftContainer > p.wins').html(` `);
	$('div#rightContainer > p.wins').html(` `);
	clearBoard();
}

window.onload = function() {
	renderBoard(), createPlayerDisplays();
};
