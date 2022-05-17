const express = require("express");
const app = express();
const port = 3000
app.use(express.json()); 

// Mostrar productos actuales
const productos ={
    description: 'Productos',
    items: [
    { id: 1, nombre: 'Taza de Harry Potter' , precio: 300},
    { id: 2, nombre: 'FIFA 22 PS5' , precio: 1000},
    { id: 3, nombre: 'Figura Goku Super Saiyan' , precio: 100},
    { id: 4, nombre: 'Zelda Breath of the Wild' , precio: 200},
    { id: 5, nombre: 'Skin Valorant' , precio: 120},
    { id: 6, nombre: 'Taza de Star Wars' , precio: 220}
    ]
}
// console.log(productos)
app.get("/products", (req, res) => {
    res.send(productos);
  });
// Crear un nuevo producto
  app.post("/products", (req, res) => {
      const nuevoProducto = {
        id: productos.items.length + 1,
        nombre: req.body.nombre,
        precio: req.body.precio,
      }; 
      if (!req.body.nombre || !req.body.precio) {
        res.status(400).send("Por favor rellena todos los campos");
      } else {
        productos.items.push(nuevoProducto);
        res.status(201).send(nuevoProducto);
      }
    });
// Crear endpoint para poder actualizar un producto, por tanto necesitara un (id)

app.put("/products/:id", (req,res) =>{
const found = productos.items.some(articulo => articulo.id === +req.params.id)
if(found){
    productos.items.forEach(articulo =>{
        if(+req.params.id === articulo.id){


            articulo.nombre = req.body.nombre ? req.body.nombre : articulo.nombre

            articulo.precio = req.body.precio ? req.body.precio : articulo.precio
            res.send(articulo)
        }
    })
}else{
    res.status(404).send(`No se ha encontrado el producto con el id ${req.params.id}`)
}
})


app.listen(port, () => console.log (`Servidor levantado en el puerto ${port} con éxito :D`))
