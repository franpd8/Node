const express = require("express");
const router = express.Router();
const db = require("../config/database.js");

// crear tabla categorias
router.get("/createTableCategories", (req, res) => {
  let sql =
    "CREATE TABLE categories(id int AUTO_INCREMENT,name VARCHAR(255), PRIMARY KEY(id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Categories table created succesfully");
  });
});

// añadir nueva categoria
router.post("/newCategory", (req, res) => {
  let category = {
    genre: req.body.genre,
  };
  let sql = "INSERT INTO categories SET ?";
  db.query(sql, category, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Category added to the database succesfully");
  });
});
// mostrar todas las categorías
router.get("/allGenres", (req, res) => {
  let sql = "SELECT * FROM categories";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
// Buscar una categoria por ID
router.get("/searchCategory/id/:id", (req, res) => {
  let sql = `SELECT * FROM categories WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
// Buscar una categoría por su nombre
router.get("/searchCategory/name/:name", (req, res) => {
  let sql = `SELECT * FROM categories WHERE name LIKE '%${req.params.name}%`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//  Actualizar una categoria por ID
router.put("/updateCategory/id/:id", (req, res) => {
  let newGenre = req.body.genre;
  let sql = `UPDATE categories 
    SET genre = '${newGenre}' 
    WHERE id = ${req.params.id}`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Category updated succesfully");
  });
});

 // Eliminar una categoria por ID 
 router.delete('/deleteCategory/:id',(req,res)=>{
    let sql = `DELETE FROM products WHERE id = ${req.params.id}`;
    db.query(sql, (err,result)=> {
      if(err) throw err;
      res.send('Category deleted')
    })
  })

module.exports = router;
