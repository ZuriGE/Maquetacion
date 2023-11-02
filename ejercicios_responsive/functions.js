const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const field1 = document.getElementById("field1");
const field2 = document.getElementById("field2");

const imgLoop = document.getElementsByClassName("img-loop");
let loop = true;

let passwordHidden = true;

const showPassword = document.getElementById("showPassword");

///cambia el color del elemento padre cuando el focus está en el input hijo, no he conseguido con arrays
let changeBorderColor = (element, color) => {
	element.style.borderColor = color;
};

input1.addEventListener("focus", () => {
	changeBorderColor(field1, "var(--darkBorder)");
});
input1.addEventListener("focusout", () => {
	changeBorderColor(field1, "var(--borderInput)");
});
input2.addEventListener("focus", () => {
	changeBorderColor(field2, "var(--darkBorder)");
});
input2.addEventListener("focusout", () => {
	changeBorderColor(field2, "var(--borderInput)");
});

showPassword.addEventListener("click", (e) => {
	if (passwordHidden) {
		input2.type = "text";
		passwordHidden = false;
		showPassword.innerText = "Ocultar";
	} else if (!passwordHidden) {
		input2.type = "password";
		passwordHidden = true;
		showPassword.innerText = "Mostrar";
	}
});

let imgLoopFunction = () => {
	let changeVisibility = (current, next) => {
		imgLoop[current].classList.remove("visible");

		imgLoop[next].classList.add("visible");
	};

	let i = 0;
	let j;

	let loopInterval = setInterval(() => {
		if (window.innerWidth > 875) {
			i == 3 ? (i = 0) : i++;
			i == 3 ? (j = 0) : (j = i + 1);
			changeVisibility(i, j);
		} else {
			clearInterval(loopInterval);
		}
	}, 3000);
};

document.addEventListener("DOMContentLoaded", imgLoopFunction);

window.addEventListener("resize", imgLoopFunction);
