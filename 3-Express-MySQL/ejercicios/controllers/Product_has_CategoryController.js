const db = require('../config/database.js');

const Products_has_categoriesController = {
    create(req,res){
        let post = {title:req.body.title, body:req.body.body};
        let sql = 'INSERT INTO posts SET ?'
        db.query(sql,post,(err,result)=> {
          if(err) throw err;
          console.log(result);
          res.send('Post added...')
        })
      }
}

module.exports = Products_has_categoriesController;