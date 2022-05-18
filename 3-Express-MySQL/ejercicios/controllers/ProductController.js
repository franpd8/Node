const db = require('../config/database.js');

const ProductController = {
    create(req, res){
        let sql =
          "CREATE TABLE products(id int AUTO_INCREMENT,name VARCHAR(255), description VARCHAR(255), price INT, PRIMARY KEY(id))";
        db.query(sql, (err, result) => {
          if (err) throw err;
          console.log(result);
          res.send("Products table created succesfully");
        });
      },
    add(req, res){
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
      },
      showAll(req,res){
        let sql = 'SELECT * FROM products';
        db.query(sql,(err,result)=> {
          if(err) throw err;
          res.send(result)
        })
      },
      showAllDesc(req,res){
        let sql = 'SELECT * FROM products ORDER BY id DESC';
        db.query(sql,(err,result)=> {
          if(err) throw err;
          res.send(result)
        })
      },
      searchById(req,res){
        let sql = `SELECT * FROM products WHERE id = ${req.params.id}`;
        db.query(sql,(err,result)=> {
          if(err) throw err;
          res.send(result)
        })
      },
      searchByName(req,res){
        let sql = `SELECT * FROM products WHERE name LIKE '%${req.params.name}%'`;
        db.query(sql,(err,result)=> {
          if(err) throw err;
          res.send(result)
        })
      },
      updateById(req,res){
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
      },
      deteleById(req,res){
        let sql = `DELETE FROM products WHERE id = ${req.params.id}`;
        db.query(sql, (err,result)=> {
          if(err) throw err;
          res.send('Product deleted')
        })
      }

}

module.exports = ProductController;

