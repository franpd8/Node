// Creando un servidor con Node 
// ----------------------------
// let http = require("http");

// http.createServer((req, res) =>{
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.end("Aprendiendo en The Bridge!");
//   })
//   .listen(8080);

// abrir en el navegador la siguiente direccion: http://localhost:8080/
// ejecuta desde terminarl "node index.js"

// Importar un modulo 
// ------------------

// Tenemos esta funcion en un js externo (llamado .math) creado previamente 
// pero con require lo llamamos a nuestro index
// const math = require('./math');

// console.log(math.sum(1,2));

// Leer archivos
// -------------
// const http = require("http");
// const fs = require('fs');

// http.createServer((req, res) => {
//     fs.readFile('./pages/test1.html', (err, data) => {
//       res.writeHead(200, {'Content-Type': 'text/html'});
//       res.write(data);
//       return res.end();
//     });
//   }).listen(8080);

//   Modulo URL para leer direcciones
// -----------------------------------

// const url = require('url');
// const adr = 'http://localhost:8080/default.html?year=2017&month=february';
// const q = url.parse(adr, true);
// // Analizamos una dirección con el método url.parse() y nos devuelve un objeto URL con cada parte de la dirección como propiedades:

// console.log(q.host); //'localhost:8080'
// console.log(q.pathname); //'/default.html'
// console.log(q.search); //'?year=2017&month=february'

// const qdata = q.query; //{ year: 2017, month: 'february' }
// console.log(qdata.month); //'february'

// Leyendo más de un archivo.
// --------------------------

// const http = require("http");
// const url = require("url");
// const fs = require("fs");

// // A traves de filename podemos configurar la ruta de acceso a cada archivo:
// // Ejemplo, Test1 = .pages/Test1.html, que se divide en tres
// http.createServer((req, res) => {
//     const q = url.parse(req.url, true);
//     const filename = "." + q.pathname + ".html";
//     console.log(filename,"esta es la filename")
//     fs.readFile(filename, (err, data) => {
//       try {
//         res.writeHead(200, { "Content-Type": "text/html" });
//         res.write(data);
//         return res.end();
//       } catch (error) {
//         res.writeHead(404, { "Content-Type": "text/html" });
//         console.error(error);
//         return res.end("404 Not Found");
//       }
//     });
//   }).listen(8080);

// Usando un paquete local 
// -----------------------

const http = require('http');
const uc = require('upper-case');

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(uc.upperCase("¡Hola The Bridge!"));
  res.end();
}).listen(8080);
