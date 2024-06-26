const URL = 'https://api.frankfurter.app';

const fechaElegida = document.querySelector('#fecha-elegida');
const botonAceptar = document.querySelector('#boton-aceptar');
const listaMonedas = document.querySelector('#lista-monedas');
const monedaBase = document.querySelector('#moneda-base');
const botonMostrarMonedas = document.querySelector('#mostrar-monedas');
const listaMonedasNombre = document.querySelector('#lista-monedas-nombres');
const listaErrores = document.querySelector('#errores');
const tituloFechaBase = document.querySelector('.titulo-fecha-base');
 
let fechaActual = new Date().toJSON().slice(0,10);
fechaElegida.max = fechaActual;

function validarFecha(fecha){
    console.log(fecha)
    if(fecha > fechaActual){
        return "hubo error";
    }
    else if(fecha === ""){
        return "hubo error";
    }
    else{
        return "";
    }
}


function buscarValoresMonedas(){
    return  fetch(`${URL}/${fechaElegida.value}?from=${monedaBase.value}`)
                .then(respuesta => respuesta.json())
                .then(data => data)
}


botonAceptar.onclick = function(event){
    if(validarFecha(fechaElegida.value)===""){
        mostrarOcultarElemento(listaErrores,"ocultar");
        mostrarOcultarElemento(listaMonedas, "mostrar");
        listaErrores.innerHTML = "";
        listaMonedas.innerHTML = "";
        const valoresMonedas = buscarValoresMonedas();
        
        valoresMonedas
            .then(data => {
                if(fechaElegida.value != ""){
                    tituloFechaBase.textContent= `Cambios a la fecha ${fechaElegida.value} en base ${monedaBase.value}`;
                    mostrarOcultarElemento(tituloFechaBase,"mostrar");
                }
                Object.keys(data.rates).forEach(moneda => {
                    let elemento = document.createElement('li');
                    elemento.textContent = `${moneda}: ${data.rates[moneda]}`;
                    $(listaMonedas).append(elemento);
            })
        })
    }
    else{
        listaErrores.innerHTML = "";
        const $error = document.createElement('li');
        $error.innerText = "Debe ingresar una fecha valida";
        listaErrores.appendChild($error);
        mostrarOcultarElemento(tituloFechaBase,"ocultar");
        mostrarOcultarElemento(listaMonedas,"ocultar");
        mostrarOcultarElemento(listaErrores,"mostrar");
        
    }
}

function buscarNombresMonedas(){
    return  fetch(`${URL}/currencies`)
                .then(respuesta => respuesta.json())
                .then(data => data)
}


const nombresMonedas = buscarNombresMonedas();

nombresMonedas
    .then(data => {
        Object.keys(data).forEach(moneda => {
            let elemento = document.createElement('li');
            elemento.textContent = `${moneda}: ${data[moneda]}`;
            $(listaMonedasNombre).append(elemento);
        })
    })

botonMostrarMonedas.onclick = function(event){
    if(listaMonedasNombre.classList.contains("oculto")){
        mostrarOcultarElemento(listaMonedasNombre,"mostrar");
        botonMostrarMonedas.innerHTML = "Ocultar monedas";
    }
    else{
        mostrarOcultarElemento(listaMonedasNombre,"ocultar");
        botonMostrarMonedas.innerHTML = "Mostrar monedas";
    }
}


function mostrarOcultarElemento(elemento, accion){
    if(accion==="ocultar"){
        elemento.classList.add("oculto");
    }
    else if(accion==="mostrar"){
        elemento.classList.remove("oculto");
    }
}