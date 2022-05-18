const express = require("express")
const app = express();
const port = 3000
const mysql = require('mysql2');

app.use(express.json()); 

// Conectamos con la base de datos
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '12345678',
    // esto se añade después de crearla
    database : 'expressDB'
  });
db.connect();


// 1. crear base de datos.
app.get('/createdb',(req,res)=>{
    let sql ='CREATE DATABASE expressDB';
    db.query(sql,(err,result)=>{
      if(err)throw err;
      console.log(result);
      res.send('Database created...')
    })
  })

// 2. crear tabla de posts
app.get('/createtable',(req,res)=>{
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT,title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))'
      db.query(sql,(err,result)=> {
        if(err) throw err;
        console.log(result);
        res.send('Posts table created...')
      })
    })
    
// 3. Añadir un post a la table
app.post("/post", (req, res) => {
    let sql = `INSERT INTO posts (title, body) values
      ('Post one', 'This is post number one');`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("Post added...");
    });
  });
  


app.listen(port, () => console.log (`Servidor levantado en el puerto ${port} con éxito :D`))
