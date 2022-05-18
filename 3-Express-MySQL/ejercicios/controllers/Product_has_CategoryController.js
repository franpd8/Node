const db = require('../config/database.js');

const Products_has_categoriesController = {
    create (req, res){
        let sql =
          "CREATE TABLE products_has_categories(id int AUTO_INCREMENT, product_id INT, category_id INT, PRIMARY KEY(id), FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE, FOREIGN KEY(category_id) REFERENCES categories(id))";
        db.query(sql, (err, result) => {
          if (err) throw err;
          console.log(result);
          res.send("Products_has_categories table created succesfully");
        });
      },
      add(req, res){
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
      },
      show(req,res){
        let sql = 'SELECT * FROM products_has_categories';
        db.query(sql,(err,result)=> {
          if(err) throw err;
          res.send(result)
        })
      },
      showAll(req,res){
        let sql = 'SELECT products.name, categories.genre FROM products_has_categories INNER JOIN products ON products_has_categories.product_id = products.id INNER JOIN categories ON products_has_categories.category_id = categories.id;';
        db.query(sql,(err,result)=> {
          if(err) throw err;
          res.send(result)
        })
      }
}

module.exports = Products_has_categoriesController;