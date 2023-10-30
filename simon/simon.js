//CONSTANTES Y VARIABLES INICIALES
let simonSays = [];
let playerArray = [];
let currentIndex = 0;

const start = document.getElementById("start");
const green = document.getElementById("green");
const red = document.getElementById("red");
const yellow = document.getElementById("yellow");
const blue = document.getElementById("blue");
const lvl = document.getElementById("level");

const simonTurn = document.getElementById("simon");
const playerTurn = document.getElementById("player");

let level = 0;

//GAME OVER
let endGame = () => {
	start.innerText = "GAME OVER";
	start.classList.add("blink");

	setTimeout(() => {
		start.classList.remove("blink");
		start.style.border = "6px solid #bd40ee";
		start.innerText = "PLAY AGAIN";
	}, 2000);

	simonSays = [];
	level = 1;
	playerArray = [];
};

//TURNO PC

//Generar los números que corresponden a colores
let numGenerator = () => {
	return Math.floor(Math.random() * 4) + 1;
};

let simon = () => {
	setTimeout(() => {
		simonTurn.classList.remove("inactive");
		playerTurn.classList.add("inactive");
		setTimeout(() => {
			console.log(level);
			level++;
			lvl.innerText = level;
			let newNum = numGenerator();
			simonSays.push(newNum);
			console.log("simon says");
			console.log(simonSays);
			let simonIndex = 0;
			currentIndex = 0;

			let colorLoop = () => {
				if (simonIndex == simonSays.length) {
					// Juego terminado
					simonTurn.classList.add("inactive");
					playerTurn.classList.remove("inactive");
					return;
				}

				let element = simonSays[simonIndex];
				let light;
				let newColor;
				let oldColor;
				let audioSource;

				switch (element) {
					case 1:
						light = green;
						newColor = "var(--greenOn)";
						oldColor = "var(--greenOff)";
						audioSource = new Audio("./img/c_sharp.wav");
						break;
					case 2:
						light = red;
						newColor = "var(--redOn)";
						oldColor = "var(--redOff)";
						audioSource = new Audio("./img/d_sharp.wav");
						break;
					case 3:
						light = yellow;
						newColor = "var(--yellowOn)";
						oldColor = "var(--yellowOff)";
						audioSource = new Audio("./img/f_sharp.wav");
						break;
					case 4:
						light = blue;
						newColor = "var(--blueOn)";
						oldColor = "var(--blueOff)";
						audioSource = new Audio("./img/g_sharp.wav");
						break;
				}

				light.style.backgroundColor = newColor;
				light.style.filter = `drop-shadow(0 0 15px ${newColor}) drop-shadow(0 0 50px ${newColor}) contrast(2) brightness(2)`;

				("drop-shadow(0 0 15px #bd40ee) drop-shadow(0 0 50px #bd40ee) contrast(2) brightness(2)");

				audioSource.play();

				setTimeout(() => {
					light.style.filter = "none";
					light.style.backgroundColor = oldColor;
					simonIndex++;
					setTimeout(colorLoop, 500);
				}, 400);
			};

			setTimeout(colorLoop, 400);
		}, 300);
	}, 500);
};

//TURNO JUGADOR

let checkResult = () => {
	console.log("player array");
	console.log(playerArray);
	console.log(currentIndex);
	console.log(simonSays.length);
	console.log(playerArray[currentIndex - 1] == simonSays[currentIndex - 1]);
	//primero mirar si coinciden los valores
	if (playerArray[currentIndex - 1] == simonSays[currentIndex - 1]) {
		audioSource.play();
		//si ya ha clickado las veces que sea se acaba la ronda y llamamos de nuevo a la función simon()
		if (currentIndex == simonSays.length) {
			playerArray = [];
			console.log("OK");
			setTimeout(() => {
				playerTurn.classList.add("inactive");
				simonTurn.classList.remove("inactive");
			}, 300);
			simon();
		}
		// si no coinciden game over
	} else {
		endGame();
	}
};

green.addEventListener("click", (e) => {
	green.style.backgroundColor = "var(--greenOn)";
	green.style.filter = `drop-shadow(0 0 15px var(--greenOn)) drop-shadow(0 0 50px var(--greenOn)) contrast(2) brightness(2)`;
	currentIndex++;
	playerArray.push(1);
	audioSource = new Audio("./img/c_sharp.wav");
	setTimeout(() => {
		green.style.filter = "none";
		green.style.backgroundColor = "var(--greenOff)";
		checkResult();
	}, 500);
});
red.addEventListener("click", (e) => {
	red.style.backgroundColor = "var(--redOn)";
	red.style.filter = `drop-shadow(0 0 15px var(--redOn)) drop-shadow(0 0 50px var(--redOn)) contrast(2) brightness(2)`;
	currentIndex++;
	playerArray.push(2);
	audioSource = new Audio("./img/d_sharp.wav");
	setTimeout(() => {
		red.style.filter = "none";
		red.style.backgroundColor = "var(--redOff)";
		checkResult();
	}, 500);
});
yellow.addEventListener("click", (e) => {
	yellow.style.backgroundColor = "var(--yellowOn)";
	yellow.style.filter = `drop-shadow(0 0 15px var(--yellowOn)) drop-shadow(0 0 50px var(--yellowOn)) contrast(2) brightness(2)`;
	currentIndex++;
	playerArray.push(3);
	audioSource = new Audio("./img/f_sharp.wav");
	setTimeout(() => {
		yellow.style.filter = "none";
		yellow.style.backgroundColor = "var(--yellowOff)";
		checkResult();
	}, 500);
});
blue.addEventListener("click", (e) => {
	blue.style.backgroundColor = "var(--blueOn)";
	blue.style.filter = `drop-shadow(0 0 15px var(--blueOn)) drop-shadow(0 0 50px var(--blueOn)) contrast(2) brightness(2)`;
	currentIndex++;
	playerArray.push(4);
	audioSource = new Audio("./img/g_sharp.wav");
	setTimeout(() => {
		blue.style.filter = "none";
		blue.style.backgroundColor = "var(--blueOff)";
		checkResult();
	}, 500);
});

//INICIAR JUEGO

start.addEventListener("click", (e) => {
	e.preventDefault();
	playerTurn.classList.add("inactive");
	simonTurn.classList.add("inactive");
	simonSays = [];
	playerArray = [];
	currentIndex = 0;
	level = 0;
	simon();
});
