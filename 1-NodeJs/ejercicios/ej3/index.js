// creamos variable para llamar al archivo numeros.js que contiene la funcion
const comprobarNum = require('./numeros')
const numeritos = [2, 3, 101, 201, 202, 100]

numeritos.forEach(num =>{

    //  llamada a la funcion para comprobar valores
    comprobarNum.esPar(num)
})