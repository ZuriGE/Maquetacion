$(document).ready(function () {
	let carrito = [];
	let totalPrice = 0;
	$(".shopItem").on("click", function () {
		const cardBody = $(this).parent();
		const cardName = cardBody.find("h5").text();
		const cardPrice = parseInt(cardBody.find("span").text());
		const strLista = `PRENDA: ${cardName} ${cardPrice}`;
		const prenda = { nombre: cardName, precio: cardPrice, strLista: strLista };

		totalPrice += cardPrice;
		console.log(prenda.strLista);
		carrito.push(prenda);
		$("#totalPriceText").text(`TOTAL COMPRA: ${totalPrice}`);
		$("#list").append($("<li></li>").text(prenda.strLista));
	});

	// let listCart = (a) => {
	// 	console.log(1111);
	// 	let cartStr = a.map((value) => {
	// 		return `PRENDA: ${value.nombre} ${value.precio}`;
	// 	});
	//     ret
	// };

	$("#showCart").on("click", () => {
		$("#myModal").modal("toggle");
	});
	$("#modalClose").on("click", () => {
		$("#myModal").modal("toggle");
	});
	$("#modalBuy").on("click", () => {
		$("#myModal").modal("toggle");
		$("#list").empty();
		totalPrice = 0;
		$("#totalPriceText").text(`TOTAL COMPRA: -`);
		carrito = [];
	});

	$("#showCart").on("shown.bs.modal", function () {
		$("#myModal").trigger("focus");
	});
});
