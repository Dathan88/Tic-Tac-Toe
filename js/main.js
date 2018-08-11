const game = () => {};


let btn = document.getElementById('btn');
btn.addEventListener('click', gameBoard);

function gameBoard() {
	document.getElementById("btn").style.display = "none";
	let container = document.querySelector("#container");
		container.style.position = "absolute";
		container.style.top = "0";
		container.style.bottom = "0";
		container.style.left = "0";
		container.style.right = "0";
		container.style.width = "40em";
		container.style.height = "40em";
		container.style.display = "grid";
		container.style.margin = "auto";
		container.style.gridTemplateColumns = "repeat(3, 32.5% [col-start])";
		container.style.gridTemplateRows = "repeat(3, 32.5% [row-start])";
		
	for (i = 0; i < 9; i++) {
		let squares = document.createElement('div');
			squares.classList.add('squares');
			squares.addEventListener('click', (e) => {
				if (squares.innerHTML === "X") {
					squares.innerHTML = "O";
				} else {
					squares.innerHTML = "X";
				}
			});
		document.getElementById('container').appendChild(squares);
	};
};

function Player(name, number) {
	this.name = name;
	this.number = number;
	this.title = function() {
		return this.name + " - " + "Player " + this.number;
	}
}

let bob = new Player("Bob", 1);
let george = new Player("George", 2);

console.log(bob.title());
console.log(george.title());

// $(function() {
// 	alert("Hey");
// });