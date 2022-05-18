const express = require('express');
const router = express.Router();
const db = require('../config/database.js');

// crear tabla productos
router.get("/createTableProducts", (req, res) => {
    let sql =
      "CREATE TABLE products(id int AUTO_INCREMENT,name VARCHAR(255), description VARCHAR(255), price INT, PRIMARY KEY(id))";
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("Products table created succesfully");
    });
  });
// Añadir un producto a la tabla productos
router.post("/newProduct", (req, res) => {
    let product = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price
    };
    let sql = "INSERT INTO products SET ?";
    db.query(sql, product, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("Product added to the database succesfully");
    });
  });

//   mostrar todos los productos
router.get('/allProducts',(req,res)=> {
    let sql = 'SELECT * FROM products';
    db.query(sql,(err,result)=> {
      if(err) throw err;
      res.send(result)
    })
  })

// mostrar todos los productos descendiente
  router.get('/allProductsDesc',(req,res)=> {
    let sql = 'SELECT * FROM products ORDER BY id DESC';
    db.query(sql,(err,result)=> {
      if(err) throw err;
      res.send(result)
    })
  })

// Buscar un producto por ID 
router.get('/searchProduct/id/:id',(req,res)=>{
    let sql = `SELECT * FROM products WHERE id = ${req.params.id}`;
    db.query(sql,(err,result)=> {
      if(err) throw err;
      res.send(result)
    })
  })

//Buscar un producto por su nombre
router.get('/searchProduct/name/:name',(req,res)=>{
    let sql = `SELECT * FROM products WHERE name LIKE '%${req.params.name}%'`;
    db.query(sql,(err,result)=> {
      if(err) throw err;
      res.send(result)
    })
  })

// Actualizar un producto por ID
router.put('/updateProduct/id/:id',(req,res)=>{
    let newName = req.body.name;
    let newDescription = req.body.description;
    let newPrice = req.body.price;
    let sql =     
    `UPDATE products 
    SET name = '${newName}', 
    description = '${newDescription}', 
    price ='${newPrice}'
    WHERE id = ${req.params.id}`

    db.query(sql, (err,result)=> {
      if(err) throw err;
      res.send('Product updated succesfully')
    })
  })

  //  Eliminar un producto por ID 
  router.delete('/deleteProduct/:id',(req,res)=>{
    let sql = `DELETE FROM products WHERE id = ${req.params.id}`;
    db.query(sql, (err,result)=> {
      if(err) throw err;
      res.send('Product deleted')
    })
  })


module.exports = router;