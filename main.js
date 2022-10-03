//E-Comerce Black Lion Grow Shop



function precioConDescuento (){
    let montoAbonado = parseInt(prompt("Cual es el monto del producto que elegiste?"));
    let cuotas = parseInt(prompt("En cuantas cuotas quieres hacer el pago? Tenemos 3 cuotas sin interes. 6 con 15% de interes y 12 con 30% de interes!"));
    let precioCuota = montoAbonado / cuotas  
    switch (cuotas){
            case 3:
                alert(`Abonaras 3 cuotas sin interes de ${precioCuota} `)
                break;
        
        
            case 6:
                alert(`En 6 cuotas tenes un 15% de interes. Abonaras cuotas de ${precioCuota + (precioCuota * 15/100)}`)
                break;
        

            case 12:
                alert(`En ${cuotas} tenes un 30% de interes. Abonaras cuotas de ${precioCuota + (precioCuota * 30/100)}`)
                break;

            default:
                alert(`Solamente podemos ofrecerte 3, 6 o 12 cuotas`)
                break; 
        }
        
            
    
}

precioConDescuento ();
