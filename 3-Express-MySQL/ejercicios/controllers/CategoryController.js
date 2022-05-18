const db = require('../config/database.js');

const CategoryController = {
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



module.exports = CategoryController;