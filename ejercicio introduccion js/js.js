/*Ejemplos tipos de variables
    asignado y modificando los valores
*/


//tipo de dato String
let saludo = 'Hola, Mundo';

// tipo number
let edad = 34;

// tipo Boolean
let esDesarrollador = true;

// tipo undefined
let mes;

//tipo null
let variableNull = null;

//Constante

const PI = 3.1416

// tipo BigInit
const bigNumber = 1234567890123456789012345678901234567890n;
const anotherBig = BigInt("987654321098765432109876543210");

//tipo symbol
const id1 = Symbol('id');

//array
let user = {
    name: 'Carlos',
    apellido: 'pava',
    edad: edad
};

console.log("Antes de borrar")
console.clear();

console.groupCollapsed('Tipos de variables y datos primitivos')

console.log('Saludos: ' + saludo);
console.info('Edad: ' + edad)
console.error(mes)
console.error(variableNull)
console.info(typeof (id1))
console.log(typeof (bigNumber));
console.log("Nombre:" + user.name + " Apellido " + user.apellido + " edad " + edad)
console.log("Es desarrollador " + esDesarrollador)
console.log("Valor constante de PI" + PI)

console.groupEnd();

saludo = "nuevo mensaje";
edad = 36;
mes = "enero"
user.edad = edad
esDesarrollador = false;

console.group('Tipos de variables y datos primitivos con asignacion')
console.debug('Saludos: ' + saludo);
console.log('Edad: ' + edad)
console.info("Mes cambio " + mes + " tipo s" + typeof (mes));
console.log(variableNull)
console.log(typeof (id1))
console.error(bigNumber);
console.info("Nombre:" + user.name + " Apellido " + user.apellido + " edad " + edad)
console.info("Es desarrollador " + esDesarrollador)
console.groupEnd