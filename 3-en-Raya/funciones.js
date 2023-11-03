const a1 = document.getElementById("a1");
const b1 = document.getElementById("b1");
const c1 = document.getElementById("c1");
const a2 = document.getElementById("a2");
const b2 = document.getElementById("b2");
const c2 = document.getElementById("c2");
const a3 = document.getElementById("a3");
const b3 = document.getElementById("b3");
const c3 = document.getElementById("c3");

const closeMsg = document.getElementById("closeMsg");

const finalText = document.getElementById("finalText");

/* TODA ESTA PARTE ES POR SI PUEDO LUEGO PONER MODO 1P
    let popUp = () => {
        const popup = window.open("", "popup", "width=400, height=200");

        // Crea el contenido de la ventana emergente
        const popupContent = `<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="stylesheet" href="style.css" />
        
                <title></title>
            </head>
            <body>
                <div class="popup">
                    <h2>Elige un modo de juego:</h2>
                    <button class="popup__button">1 jugador</button>
                    <button class="popup__button">Multijugador</button>
                </div>
            </body>
        </html>

        `;
        popup.document.write(popupContent);
        const popUpButtons = document.getElementsByClassName("popup__button")
        [].forEach.call(popUpButtons, (button) => {
            button.addEventListener("click", () => {
                button.setAttribute("id", "gameMode");
                window.close();
            });
        });
        
        const gameMode = document.getElementById("gameMode");
        console.log(gameMode)
    };

    window.addEventListener("load", popUp);
    */

const checkBoxArr = document.getElementsByClassName("checkBox");

const totalGameCount = document.getElementById("totalGameCount");
const scoreCountP1 = document.getElementById("scoreCountP1");
const scoreCountP2 = document.getElementById("scoreCountP2");
const scoreCountTie = document.getElementById("scoreCountTie");
const endGameMsg = document.getElementById("endGame");
const start = document.getElementById("button--start");
const reset = document.getElementById("button--reset");
const scoreBoardP1 = document.getElementById("score--p1");
const scoreBoardP2 = document.getElementById("score--p2");

let scoreP1 = 0;
let scoreP2 = 0;
let scoreTie = 0;
let totalGames = 0;
let usedBoxCount = 0;

let player1 = true;

let m = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
];

console.log(Array.from(checkBoxArr));

let changePlayer = () => {
	player1 = !player1;
	if (player1) {
		scoreBoardP1.classList.add("activePlayer");
		scoreBoardP2.classList.remove("activePlayer");
	} else {
		scoreBoardP2.classList.add("activePlayer");
		scoreBoardP1.classList.remove("activePlayer");
	}
};

let checkWin = (a) => {
	return a[0] == a[1] && a[1] == a[2] && a[2] != 0;
};

let playerWin = (m) => {
	let checkArrays = [
		[m[0][0], m[0][1], m[0][2]],
		[m[1][0], m[1][1], m[1][2]],
		[m[2][0], m[2][1], m[2][2]],
		[m[0][0], m[1][0], m[2][0]],
		[m[0][1], m[1][1], m[2][1]],
		[m[0][2], m[1][2], m[2][2]],
		[m[0][0], m[1][1], m[2][2]],
		[m[2][0], m[1][1], m[0][2]],
	];
	let win = false;

	for (let i = 0; i < checkArrays.length && !win; i++) {
		win = checkWin(checkArrays[i]);
		console.log(win);
	}

	if (win) {
		endGameMsg.style.zIndex = 1;
		endGameMsg.style.display = "flex";
		player1 ? scoreP2++ : scoreP1++;
		totalGames++;
		totalGameCount.innerText = totalGames;
		scoreCountP1.innerText = scoreP1;
		scoreCountP2.innerText = scoreP2;
		finalText.innerText = `¡El jugador ${!player1 ? 1 : 2} ha ganado la partida!`;
		i = checkArrays.length;
	} else if (usedBoxCount == 9) {
		totalGames++;
		scoreTie++;
		i = checkArrays.length;
		finalText.innerText = "¡Es un empate!";
		endGameMsg.style.zIndex = 1;
		endGameMsg.style.display = "flex";
		scoreCountTie.innerText = scoreTie;
	}

	return win;
};

let boxChecked = (element) => {
	let ficha;
	let pFicha;
	if (player1) {
		ficha = "fa-xmark";
		pFicha = 1;
	} else {
		ficha = "fa-circle";
		pFicha = 2;
	}

	child = element.querySelector("i");

	if (element.classList.contains("disabled")) {
		child.classList.remove("shake");
		child.classList.add("shake");
		setTimeout(() => {
			child.classList.remove("shake");
		}, 500);
	} else {
		let coord = element.id;
		let row = parseInt(coord[1]) - 1;
		let col;
		switch (coord[0]) {
			case "a":
				col = 0;
				break;
			case "b":
				col = 1;
				break;
			case "c":
				col = 2;
				break;
		}
		m[row][col] = pFicha;

		child.classList.add(ficha);
		element.classList.add("disabled");
		usedBoxCount++;

		changePlayer();

		playerWin(m);
	}
};

[].forEach.call(checkBoxArr, (element) => {
	element.addEventListener("click", () => {
		boxChecked(element);
	});
});

closeMsg.addEventListener("click", () => {
	endGameMsg.style.zIndex = -1;
	endGameMsg.style.display = "none";
	m = [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
	];
	usedBoxCount = 0;
	[].forEach.call(checkBoxArr, (element) => {
		child = element.querySelector("i");
		element.classList.remove("disabled");
		child.classList.remove("fa-xmark");
		child.classList.remove("fa-circle");
	});
});

start.addEventListener("click", () => {
	m = [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
	];
	usedBoxCount = 0;
	[].forEach.call(checkBoxArr, (element) => {
		child = element.querySelector("i");
		element.classList.remove("disabled");
		child.classList.remove("fa-xmark");
		child.classList.remove("fa-circle");
	});
});

reset.addEventListener("click", () => {
	location.reload();
});
