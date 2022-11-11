const listaProductos = [

{
    id:1,
    nombre: "Sustrato grow mix multipro 80 L.",
    cantidad: 1,
    desc: "Sustrato profesional Terra Fertil grow mix multipro 80l. 100% orgánico.",
    precio: 3500,
    img: "../images/sustratoGrowmix80.jpg",
},
{
    id:2,
    nombre: "cooler VT 4  pulgadas.",
    cantidad: 1,
    desc: "Turbina cooler fan extractor 220v 4 pulgadas.",
    precio: 2600,
    img: "../images/coolerVt4Pulgadas.jpg",
},
{
    id:3,
    nombre: "Panel led 300w.",
    cantidad: 1,
    desc: "Panel led 300w para cultivo indoor. Floración y ccrecimiento.",
    precio: 25000,
    img: "../images/panelLed300w.jpg",

},
{
    id:4,
    nombre: "Tripack advanced nutrientes 500ml.",
    cantidad: 1,
    desc: "Pack x 3 fertilizantes grow, micro, bloom 500ml.",
    precio: 13000,
    img:  "../images/packfertilizantesX3.jpg"
}

]

const contenedorProductos = document.querySelector("#contenedorProductos")

listaProductos.forEach((productos) => {
    const {id, nombre, cantidad, precio, desc, img} = productos
    contenedorProductos.innerHTML += `
    <div class="card" style="width: 18rem;">
  <img class="card-img-top" src="${img}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${nombre}</h5>
    <p class="card-text">Precio: ${precio}</p>
    <p class="card-text">Descripción: ${desc}</p>
    <p class="card-text">Cantidad: ${cantidad}</p>
    <button id= "${id}" class="btn btn-primary agregar">Agregar al carrito</button>
  </div>
</div>`
});


let carrito = [];

const botonVaciarCarrito = document.querySelector(".botonVaciar");
const iconoCarrito = document.querySelector("#iconoCarrito");
const precioTotal = document.querySelector("#precioTotal");
const botonContinuar = document.querySelector(".botonContinuar");
const totalProceso = document.querySelector("#totalProceso");
const botonAgregarCarrito = document.querySelectorAll(".agregar");

botonAgregarCarrito.forEach(boton=> {
    boton.addEventListener("click", agregarCarrito);

});

function agregarCarrito(e) {
    
    boton = e.target;

    let idProd = boton.getAttribute("id");

    const existe = carrito.some(prod => prod.id == idProd)

    if(existe){
        const prod = carrito.map(prod => {
            if(prod.id == idProd){
                prod.cantidad++
            }
        })
    }else {
        const item = listaProductos.find((prod) => prod.id == idProd );

        carrito.push(item);
    }
    
    mostrarCarrito();

    Toastify({

        text: "El producto se agregó al carrito",
        
        duration: 3000
        
        }).showToast();

    
};




function mostrarCarrito() {

    const contenedorCarrito = document.querySelector("#contenedorCarrito")
    
    contenedorCarrito.innerHTML= ``

    carrito.forEach((productos) => {
        const {id, nombre, cantidad, precio, desc, img} = productos

         contenedorCarrito.innerHTML +=`
         <div class= "contenedorOffcanvas">
         <div>
         <img class= "img-fluid" src= "${img}"></img>
         </div>

         <div>
            <p>Producto:${nombre}</p>
            <p>Precio:$${precio}</p>
            <p>Cantidad:${cantidad}</p>
         </div>
         
         <button id= "${id}" type="button" class="btn btn-warning eliminar">Eliminar producto<button>
         </div>`
    })

    if(carrito == 0){
        contenedorCarrito.innerHTML = `
        <p class= "parrafoCarrito">Tu carrito está vacio<p>
        `
    }

    iconoCarrito.textContent = carrito.length;


    precioTotal.textContent = carrito.reduce((acumulador, prod) => acumulador + prod.cantidad * prod.precio, 0);

    guardarLocalStorage();

};

botonContinuar.addEventListener("click", () => {

    if(carrito.length == 0){
        swal({
            title: "Tu carrito está vacio!",
            text: "Agrega algún producto para continuar la compra",
            icon: "error",
            button: "Aceptar",
          });
    }else{
        location.href = "compra.html"
    }

    continuarCompra();
        
});



        
       
     

    


    
  

    
    




botonVaciarCarrito.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {

        carrito.splice(0, carrito.length);
        
        mostrarCarrito();

};


function guardarLocalStorage(){
        localStorage.setItem("carrito", JSON.stringify(carrito))
};

document.addEventListener("DOMContentLoaded", () => {
        carrito = JSON.parse(localStorage.getItem("carrito")); 

        mostrarCarrito()
});

function continuarCompra() {
    carrito.forEach((prod) => {
      const listaCompra = document.querySelector("#listaCompra tbody");
      const { id, nombre, precio, img, cantidad } = prod;
      if (listaCompra) {
        const row = document.createElement("tr");
        row.innerHTML += `
                <td>
                <img class="img-fluid" src="${img}"/>
                </td>
                <td>${nombre}</td>
              <td>${precio}</td>
              `;
        listaCompra.appendChild(row);
      }
    });
    totalProceso.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }

    








