const express = require("express");
const app = express();
const path = require('path');
const port = 3000
console.log(port)


// app.get('/',(req,res)=>{
//     res.send('Hola The Bridge')
// })

// Para cargar un archivo HTML
// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,'index.html'))
// })

// Cargando Varios Archivos HTML
app.use(express.static(path.join(__dirname, 'public')));



app.listen(port, () => console.log (`Servidor levantado en el puerto ${port}`))
