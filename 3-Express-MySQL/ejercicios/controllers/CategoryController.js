const db = require("../config/database.js");

const CategoryController = {
  create(req, res) {
    let sql =
      "CREATE TABLE categories(id int AUTO_INCREMENT,name VARCHAR(255), PRIMARY KEY(id))";
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("Categories table created succesfully");
    });
  },
  add(req, res) {
    let category = {
      genre: req.body.genre,
    };
    let sql = "INSERT INTO categories SET ?";
    db.query(sql, category, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("Category added to the database succesfully");
    });
  },
  showAll(req, res) {
    let sql = "SELECT * FROM categories";
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  },
  searchById(req, res) {
    let sql = `SELECT * FROM categories WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  },
  searchByName(req, res) {
    let sql = `SELECT * FROM categories WHERE name LIKE '%${req.params.name}%`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  },
  updateById(req, res) {
    let newGenre = req.body.genre;
    let sql = `UPDATE categories 
          SET genre = '${newGenre}' 
          WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send("Category updated succesfully");
    });
  },
  deteleById(req, res) {
    let sql = `DELETE FROM products WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send("Category deleted");
    });
  },
};

module.exports = CategoryController;
