//E-Comerce Black Lion Grow Shop

//primero declaro el constructor
class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre; 
        this.precio = precio;
    }
}

//luego declaro el array donde se almacenaran los productos que elijo

const productosCarrito = []; 

//creo una funcion en donde creo los productos y los almaceno en el array ya mencionado

const agregarCarrito = () => {
    let nombre = prompt("Que producto deseas?");
    let precio = parseFloat(prompt("Indique el valor del producto"));

    let productoAgregado = new Producto (nombre, precio);

    productosCarrito.push(productoAgregado);

    let seguirAgregando = prompt("Desea agregar mas productos al carrito de compras?");

    if(seguirAgregando == "si"){
        agregarCarrito();
        
        if(seguirAgregando == "no"){
            carrito();
        }

        else{
            alert("Debe indicar si desea o no seguir agregando productos al carrito");
        }
    }
}

//creo una funcion para sumar los precios de losproductos

const carrito = ()=>{
    const precios = productosCarrito.map(function(prod){
        alert(prod.precio)
    });

    let suma = 0;

    for(const total of precios){
        suma += total;
        alert(suma);
    }

}


agregarCarrito();

carrito();


