let simonSays = [];

const start = document.getElementById("start");
const green = document.getElementById("green");
const red = document.getElementById("red");
const yellow = document.getElementById("yellow");
const blue = document.getElementById("blue");

let level;
let gameOver = false;

let numGenerator = () => {
	return Math.floor(Math.random() * 4) + 1;
};

let startGame = () => {
	level = 1;

	let newNum = numGenerator();
	simonSays.push(newNum);
	console.log(simonSays);

	let index = 0; // Variable para llevar la cuenta del elemento actual en simonSays

	let colorLoop = () => {
		if (index >= simonSays.length) {
			// Juego terminado
			return;
		}

		let element = simonSays[index];
		let light;
		let newColor;
		let oldColor;

		switch (element) {
			case 1:
				light = green;
				newColor = "#77E53C";
				oldColor = "#059633";
				break;
			case 2:
				light = red;
				newColor = "#F15454";
				oldColor = "#c40808";
				break;
			case 3:
				light = yellow;
				newColor = "#F9F07E";
				oldColor = "#f7fc00";
				break;
			case 4:
				light = blue;
				newColor = "#9ABBF8";
				oldColor = "#0460eb";
				break;
		}

		light.style.backgroundColor = newColor;
		light.style.width = "50%";
		light.style.height = "50%";

		setTimeout(() => {
			light.style.backgroundColor = oldColor;
			light.style.width = "48%";
			light.style.height = "48%";
			index++;
			setTimeout(colorLoop, 500);
		}, 700);
	};

	let playerArray = [];
	let currentIndex = 0;

	let checkResult = () => {
		if (playerArray[currentIndex] != simonSays[currentIndex]) {
			gameOver = true;
			gameOverSeq();
		} else {
			currentIndex++;
			if (currentIndex == simonSays.length) {
				currentIndex = 0;
				playerArray = [];
				setTimeout(colorLoop, 1000);
			}
		}
	};

	green.addEventListener("click", (e) => {
		playerArray.push(1);
		checkResult();
	});
	red.addEventListener("click", (e) => {
		playerArray.push(2);
		checkResult();
	});
	yellow.addEventListener("click", (e) => {
		playerArray.push(3);
		checkResult();
	});
	blue.addEventListener("click", (e) => {
		playerArray.push(4);
		checkResult();
	});

	// 	console.log(playerArray);
	// 	playerArray != simonSays ? (gameOver = true) : colorLoop(); // Inicia el juego
	// };

	// if (gameOver) {
	// 	let newElement = document.createElement("h2");
	// 	document.querySelector("body").appendChild(newElement);
	// 	newElement.textContent = "GAME OVER";
	// }

	// start.addEventListener("click", (e) => {
	// 	e.preventDefault();
	// 	startGame();
	// });

	console.log(playerArray);
	if (playerArray.length === 0) {
		gameOver = true;
		endGame();
	} else {
		gameOver = false;
	}
	colorLoop();
};

let endGame = () => {
	let newElement = document.createElement("h2");
	document.querySelector("body").appendChild(newElement);
	newElement.textContent = "GAME OVER";
};
