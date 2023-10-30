let solicitudes = [];
let solicitud = {};

const form = document.querySelector("form");
const nombre = document.getElementById("nombre");
const tel = document.getElementById("telefono");
const destino = document.getElementById("destinoViaje");
const fechaInicio = document.getElementById("fecha");
const nPersonas = document.getElementById("nPersonas");

const botonInfo = document.getElementById("info");
const botonFiltro = document.getElementById("filtro");
const filterInfo = document.getElementById("filterInfo");

botonInfo.addEventListener("click", (e) => {
	e.preventDefault();
	solicitud = {
		nombre: nombre.value,
		tel: tel.value,
		destino: destino.value,
		fechaInicio: fechaInicio.value,
		nPersonas: nPersonas.value,
	};
	solicitudes.push(solicitud);
	console.log(solicitudes);
});

botonFiltro.addEventListener("click", (e) => {
	e.preventDefault();
	let filtrado = solicitudes.filter((consultas) => consultas.destino.toLowerCase() == "mallorca" || consultas.destino.toLowerCase() == "canarias" || consultas.destino.toLowerCase() == "galicia");
	console.log(filtrado);

	filterInfo.innerText = "";
	let text = "";

	filtrado.forEach((consulta) => {
		text = text + `Nombre: ${consulta.nombre[0].toUpperCase() + consulta.nombre.slice(1)}, teléfono: ${consulta.tel}, viaje para ${consulta.nPersonas} persona(s) a ${consulta.destino[0].toUpperCase() + consulta.destino.slice(1)} el día ${consulta.fechaInicio}.\n`;
	});

	filterInfo.innerText = text;
});
