const express = require('express');
const router = express.Router();
const db = require('../config/database.js');
const Products_has_categoriesController = require('../controllers/Product_has_CategoryController')


// crear tabla
router.get("/createTableProducts_has_Categories", (req, res) => {
    let sql =
      "CREATE TABLE products_has_categories(id int AUTO_INCREMENT, product_id INT, category_id INT, PRIMARY KEY(id), FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE, FOREIGN KEY(category_id) REFERENCES categories(id))";
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("Products_has_categories table created succesfully");
    });
  });

// enlazar tablas
router.post("/linkProduct", (req, res) => {
    let link = {
        product_id: req.body.product_id,
        category_id: req.body.category_id     
    };
    let sql = "INSERT INTO products_has_categories SET ?";
    db.query(sql, link, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("Product linked to a category succesfully");
    });
  });

//   mostrar relaciones entre tablas
router.get('/allRelationships',(req,res)=> {
    let sql = 'SELECT * FROM products_has_categories';
    db.query(sql,(err,result)=> {
      if(err) throw err;
      res.send(result)
    })
  })


//  Mostrar todos los productos con sus categorias.
router.get('/showAll',(req,res)=> {
    let sql = 'SELECT products.name, categories.genre FROM products_has_categories INNER JOIN products ON products_has_categories.product_id = products.id INNER JOIN categories ON products_has_categories.category_id = categories.id;';
    db.query(sql,(err,result)=> {
      if(err) throw err;
      res.send(result)
    })
  })



module.exports = router;