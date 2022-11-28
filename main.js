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
    desc: "Panel led 300w para cultivo indoor. Floración y crecimiento.",
    precio: 25000,
    img: "../images/panelLed300w.jpg",

},
{
    id:4,
    nombre: "Tripack advanced nutrientes 500ml.",
    cantidad: 1,
    desc: "Pack x 3 fertilizantes grow, micro, bloom 500ml.",
    precio: 13000,
    img:  "../images/packfertilizantesX3.jpg",
},
{
    id:5,
    nombre: "Maceta geotextil Eden 10 litros.",
    cantidad: 1,
    desc: "Maceta para cultivo de tela geotextil Eden 10 litros.",
    precio: 800,
    img: "../images/maceta_geotextil_eden_10litros.jpg",
},

]

const contenedorProductos = document.querySelector("#contenedorProductos");

listaProductos.forEach((productos) => {
    const {id, nombre, cantidad, precio, desc, img} = productos
    if(contenedorProductos){
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
</div>`}
});



let carrito = [];


const botonVaciarCarrito = document.querySelector(".botonVaciar");
const iconoCarrito = document.querySelector("#iconoCarrito");
const precioTotal = document.querySelector("#precioTotal");
const botonContinuar = document.querySelector(".botonContinuar");
const totalProceso = document.querySelector("#totalProceso");
const botonAgregarCarrito = document.querySelectorAll(".agregar");
const activarFuncion = document.querySelector("#activarFuncion");
const formulario = document.querySelector("#formulario");

if (activarFuncion) {
    activarFuncion.addEventListener("click", continuarCompra);
  }


botonAgregarCarrito.forEach(boton => {
    boton.addEventListener("click", agregarCarrito);

});

function agregarCarrito(e) {
    
    boton = e.target;

    let idProd = boton.getAttribute("id");

    const existe = carrito.some(prod => prod.id == idProd)
    

    if (existe) {
        const prod = carrito.map(prod => {
            if (prod.id == idProd) {
                prod.cantidad++
            }
        });
        
    }else{
        const item = listaProductos.find((prod) => prod.id == idProd);
        
        carrito.push(item);
    }

    console.log(carrito)

        if (mostrarCarrito) {
            mostrarCarrito();
        }

        Toastify({

         text: "El producto se agregó al carrito",
        
         duration: 3000
        
         }).showToast();
        
}

function mostrarCarrito() {

    const contenedorCarrito = document.querySelector("#contenedorCarrito")
    if(contenedorCarrito){
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

    }

};

if(botonContinuar){
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
}

if(botonVaciarCarrito){
botonVaciarCarrito.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {

        carrito.length = []
        
        mostrarCarrito();

};
}


function guardarLocalStorage(){
        localStorage.setItem("carrito", JSON.stringify(carrito))
};

document.addEventListener("DOMContentLoaded", () => {
        carrito = JSON.parse(localStorage.getItem("carrito")) || []; 

        mostrarCarrito()
           
        
        if(activarFuncion){
        document.querySelector("#activarFuncion").click(activarFuncion)
        }
});


function continuarCompra() {
    carrito.forEach((prod) => {
      const listaCompra = document.querySelector("#listaCompra tbody");
      const { id, nombre, precio, img, cantidad } = prod;
      if (listaCompra) {
        const row = document.createElement("tr");
        row.innerHTML += `
                <td>
                <img class="img-fluid imagenCarrito" src="${img}"/>
                </td>
                <td>${nombre}</td>
                <td>${cantidad}</td>
              <td>${precio}</td>
              `;
        listaCompra.appendChild(row);
      }
    });

    totalProceso.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio, 0);
};




if(formulario){
formulario.addEventListener("submit", comprar)
}

function comprar(e) {
    e.preventDefault()
    console.log(e)
    const nombreYapellido = document.querySelector("#nombreYapellido").value
    const domicilio = document.querySelector("#domicilio").value
    const localidad = document.querySelector("#localidad").value
    const provincia = document.querySelector("#provincia").value
    const correo = document.querySelector("#correo").value


    if (nombreYapellido == "" || domicilio == "" || localidad == "" || provincia == "" || correo == "") {
        swal({
            title: "¡Debes completar todos los campos!",
            text: "Completa con tus datos",
            icon: "error",
            button: "Aceptar",
        });
    }else{
        const botonComprar = document.querySelector("#botonComprar")
        
        botonComprar.value = 'Enviando...';

        const serviceID = 'default_service';
        const templateID = 'template_bzqhtng';

     emailjs.sendForm(serviceID, templateID, this)
     .then(() => {
      botonComprar.value = 'Send Email';
      swal({
        title: "Su compra se realizó correctamente",
        text: "Recibiras un mail con la confirmación",
        icon: "success",  
      });
     
      }, (err) => {
      botonComprar.value = 'Send Email';
      alert(JSON.stringify(err));
      });

      localStorage.clear()

      setTimeout(() => {
        location.href = "productos.html"
      }, 5000)
  
    }
   
};




