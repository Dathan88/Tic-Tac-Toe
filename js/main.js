"use strict";

const gameBoard = (() => {
	let gameBoardArray = ["", "", "","", "", "","", "", ""];


	const clearGameBoard = () => {
		this.gameBoardArray = ["", "", "","", "", "","", "", ""];
	};

});

const personFactory = (name, position, symbol) => {
	const info = () => { return name + " - " + "Player " + position + " Symbol = " + symbol };
	return { name, position, info }
}

const playGame = () => {};

let bob = personFactory("Bob", 1, "X");
let george = personFactory("George", 2, "O");


console.log(bob.name);
console.log(george.info());