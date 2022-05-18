const express = require("express");
const app = express();
const port = 8080
const mysql = require("mysql2");
app.use(express.json()); 


// 1. conectar base de datos
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "exampleDB"
  });
  db.connect();

// 2. Crear base de datos
  app.get("/createDB", (req, res) => {
    let sql = "CREATE DATABASE exampleDB";
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("Database created succesfully");
    });
  });

//3. Crear tabla de Products
  app.get("/createTableProducts", (req, res) => {
    let sql =
      "CREATE TABLE products(id int AUTO_INCREMENT,name VARCHAR(255), description VARCHAR(255), price INT, PRIMARY KEY(id))";
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("Products table created succesfully");
    });
  });

//4. Crear tabla de Categories
app.get("/createTableCategories", (req, res) => {
    let sql =
      "CREATE TABLE categories(id int AUTO_INCREMENT,name VARCHAR(255), PRIMARY KEY(id))";
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("Categories table created succesfully");
    });
  });

//   5. Crear tabla intermedia de products_has_categories

app.get("/createTableProducts_has_Categories", (req, res) => {
    let sql =
      "CREATE TABLE products_has_categories(id int AUTO_INCREMENT, product_id INT, category_id INT, PRIMARY KEY(id), FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE, FOREIGN KEY(category_id) REFERENCES categories(id))";
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("Products_has_categories table created succesfully");
    });
  });


//6. Añadir un producto a la tabla productos
app.post("/newProduct", (req, res) => {
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

//7. Añadir una categoría a la tabla categories
app.post("/newCategory", (req, res) => {
    let category = {
      genre: req.body.genre     
    };
    let sql = "INSERT INTO categories SET ?";
    db.query(sql, category, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("Category added to the database succesfully");
    });
  });
//8. Añadir relacion a la tabla intermedia products_has_categories
app.post("/linkProduct", (req, res) => {
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

//   9. Mostrar todos los productos de la tabla products.
app.get('/allProducts',(req,res)=> {
    let sql = 'SELECT * FROM products';
    db.query(sql,(err,result)=> {
      if(err) throw err;
      res.send(result)
    })
  })


//   9.5 Mostrar todos los productos de la tabla products descenciente
app.get('/allProductsDesc',(req,res)=> {
    let sql = 'SELECT * FROM products ORDER BY id DESC';
    db.query(sql,(err,result)=> {
      if(err) throw err;
      res.send(result)
    })
  })
//   10. Mostrar todos los generos de la tabla categories.
app.get('/allGenres',(req,res)=> {
    let sql = 'SELECT * FROM categories';
    db.query(sql,(err,result)=> {
      if(err) throw err;
      res.send(result)
    })
  })
//   11. Mostrar todas las relaciones entre producto y categoria.
app.get('/allRelationships',(req,res)=> {
    let sql = 'SELECT * FROM products_has_categories';
    db.query(sql,(err,result)=> {
      if(err) throw err;
      res.send(result)
    })
  })

//   11.5 Mostrar todos los productos con sus categorias.
app.get('/showAll',(req,res)=> {
    let sql = 'SELECT products.name, categories.genre FROM products_has_categories INNER JOIN products ON products_has_categories.product_id = products.id INNER JOIN categories ON products_has_categories.category_id = categories.id;';
    db.query(sql,(err,result)=> {
      if(err) throw err;
      res.send(result)
    })
  })
// 12. Buscar un producto por ID 
app.get('/searchProduct/id/:id',(req,res)=>{
    let sql = `SELECT * FROM products WHERE id = ${req.params.id}`;
    db.query(sql,(err,result)=> {
      if(err) throw err;
      res.send(result)
    })
  })
// 13. Buscar un producto por su nombre
app.get('/searchProduct/name/:name',(req,res)=>{
    let sql = `SELECT * FROM products WHERE name LIKE '%${req.params.name}%'`;
    db.query(sql,(err,result)=> {
      if(err) throw err;
      res.send(result)
    })
  })
// 15. Buscar una categoría por su nombre  
app.get('/searchCategory/name/:name',(req,res)=>{
    let sql = `SELECT * FROM categories WHERE name LIKE '%${req.params.name}%`;
    db.query(sql,(err,result)=> {
      if(err) throw err;
      res.send(result)
    })
  })
// 16. Buscar una categoria por ID 
app.get('/searchCategory/id/:id',(req,res)=>{
    let sql = `SELECT * FROM categories WHERE id = ${req.params.id}`;
    db.query(sql,(err,result)=> {
      if(err) throw err;
      res.send(result)
    })
  })

//  17. Actualizar un producto por ID
app.put('/updateProduct/id/:id',(req,res)=>{
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

  
//  18. Actualizar una categoria por ID
app.put('/updateCategory/id/:id',(req,res)=>{
    let newGenre = req.body.genre;
    let sql =     
    `UPDATE categories 
    SET genre = '${newGenre}' 
    WHERE id = ${req.params.id}`

    db.query(sql, (err,result)=> {
      if(err) throw err;
      res.send('Category updated succesfully')
    })
  })

  // 19. Eliminar un producto por ID 
  app.delete('/deleteProduct/:id',(req,res)=>{
    let sql = `DELETE FROM products WHERE id = ${req.params.id}`;
    db.query(sql, (err,result)=> {
      if(err) throw err;
      res.send('Product deleted')
    })
  })

  // 20. Eliminar una categoria por ID 
  app.delete('/deleteCategory/:id',(req,res)=>{
    let sql = `DELETE FROM products WHERE id = ${req.params.id}`;
    db.query(sql, (err,result)=> {
      if(err) throw err;
      res.send('Category deleted')
    })
  })




app.listen(port, () =>
  console.log(`Server connected at the port number ${port} succesfully :D`)
);
