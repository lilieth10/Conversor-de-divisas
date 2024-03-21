function probarValidarFecha(){
    console.assert(
        validarFecha("2500-03-21") === "hubo error",
        "Validar fecha no valido que la fecha elegida sea menor a la fecha actual"
    )
    console.assert(
        validarFecha("") === "hubo error",
        "Validar fecha no valido que se haya seleccionado una fecha"
    )
}