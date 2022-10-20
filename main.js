class Producto {
	constructor(nombre, precio) {
		this.nombre = nombre;
		this.precio = precio;
	}
}

const productosCarrito = [];

const carrito = () => {
	return productosCarrito.reduce((acumulador, producto) => acumulador + producto.precio,0);
};

let confirmacion = confirm("¿Deseas agregar un producto?");
while (confirmacion) {
	let nombre = prompt("Que producto deseas agregar?");
	let precio = parseFloat(prompt("Indique el valor del producto"));
	let productoAgregado = new Producto(nombre, precio);
	productosCarrito.push(productoAgregado);
	confirmacion = confirm("¿Deseas agregar otro producto?");
}

alert(carrito());


