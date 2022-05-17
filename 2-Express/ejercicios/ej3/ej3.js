const express = require("express");
const app = express();
const port = 3000
app.use(express.json()); 

// Mostrar productos actuales
const products ={
    description: 'Productos',
    items: [
    { id: 1, name: 'Taza de Harry Potter' , price: 300},
    { id: 2, name: 'FIFA 22 PS5' , price: 1000},
    { id: 3, name: 'Figura Goku Super Saiyan' , price: 100},
    { id: 4, name: 'Zelda Breath of the Wild' , price: 200},
    { id: 5, name: 'Skin Valorant' , price: 120},
    { id: 6, name: 'Taza de Star Wars' , price: 220}
    ]
}
// console.log(productos)
app.get("/products", (req, res) => {
    res.send(products);
  });
// Crear un nuevo producto
  app.post("/products", (req, res) => {
      const newProduct = {
        id: products.items.length + 1,
        name: req.body.name,
        price: req.body.price,
      }; 
      if (!req.body.name || !req.body.price) {
        res.status(400).send("Please enter all fields");
      } else {
        products.items.push(newProduct);
        res.status(201).send(newProduct);
      }
    });
// Crear endpoint para poder actualizar un producto, por tanto necesitara un (id)

app.put("/products/:id", (req,res) =>{
const found = products.items.some(item => item.id === +req.params.id)
if(found){
    products.items.forEach(item =>{
        if(+req.params.id === item.id){

            item.name = req.body.name ? req.body.name : item.name

            item.price = req.body.price ? req.body.price : item.price
            res.send(item)
        }
    })
}else{
    res.status(404).send(`No se ha encontrado el producto con el id ${req.params.id}`)
}
})

// Crear endpoint para poder eliminar un producto

app.delete('/products/:id',(req,res)=>{
    const found = products.items.some(item => item.id === +req.params.id)

    if(found){
        const productsFiltered = products.items.filter(item => item.id !== +req.params.id)
        res.send({msg:`The item with id ${req.params.id} has been deleted`,productsFiltered})
    }else{
        res.status(404).send(`Product with id ${req.params.id} not found`)
    }
})

// * Crear filtro por precio de producto

app.get("/products/price/:price", (req,res)=>{
    const found = products.items.some(item => item.price === +req.params.price)

    if(found){
        const productsFiltered = products.items.filter(item => item.price == +req.params.price)
        res.send(productsFiltered)
        
    }else{
        res.status(404).send(`We could not find any product with price = ${req.params.price} `)
    }
})

// * Crear filtro que muestre los productos con un precio entre 50 y 250.


// app.get("/products/:min/:max", (req,res)=>{
//     const found = products.items.filter(
//         item => 
//          +req.params.min <= item.price && 
//           item.price <= +req.params.max)

//     if(found.length > 0){
    
//         res.send(found)
        
//     }else{
//         res.status(404).send(`We could not find any product with price between ${req.params.min} and ${req.params.max} `)
//     }
// })

// Usando querys gracias a Xavi
app.get("/products2", (req,res)=>{
    const found = products.items.filter(
        item => 
         +req.query.min <= item.price && 
          item.price <= +req.query.max)

        //  console.log(req.params.min)
        //  console.log(req.params.max)

    if(found.length > 0){
    
        res.send(found)
        
    }else{
        res.status(404).send(`We could not find any products with price between ${req.query.min} and ${req.query.max} `)
    }
})




// * Crear un filtro que cuando busque en postman por parámetro el id de un * producto me devuelva ese producto

// nuevo endpoint para que no haya conflicto.
app.get("/products/id/:id", (req,res)=>{
    const found = products.items.some(item => item.id === +req.params.id)

    if(found){
        const productsFiltered = products.items.filter(item => item.id == +req.params.id)
        res.send(productsFiltered)
        
    }else{
        res.status(404).send(`We could not find any product with the id = ${req.params.id} `)
    }
})
// * Crear un filtro que cuando busque en postman por parámetro el nombre de un producto me devuelva ese producto

app.get("/products/search", (req,res)=>{
    const found = products.items.filter(item => item.name == req.query.name)
    console.log(req.query.name)

    if(found.length > 0 ){ 
        res.send(found)
        
    }else{
        res.status(404).send(`We could not find any product with the name = ${req.query.name} `)
    }
})

// localhost:3000/products/name?name=Zelda%20Breathe%20of%20the%20wild

app.listen(port, () => console.log (`Servidor levantado en el puerto ${port} con éxito :D`))
