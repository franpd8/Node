const express = require("express");
const app = express();
const port = 3000;
const mysql = require("mysql2");

app.use(express.json());

// Conectamos con la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  // esto se añade después de crearla
  database: "expressDB",
});
db.connect();

// 1. crear base de datos.
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE expressDB";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Database created...");
  });
});

// 2. crear tabla de posts
app.get("/createtable", (req, res) => {
  let sql =
    "CREATE TABLE posts(id int AUTO_INCREMENT,title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Posts table created...");
  });
});

// 3. Añadir un post a la table
// app.post("/post1", (req, res) => {
//   let sql = `INSERT INTO posts (title, body) values
//       ('Post one', 'This is post number one');`;
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send("Post added...");
//   });
// });

//3. Añadir un post a la tabla mejorado
app.post("/post", (req, res) => {
  let post = {
    title: req.body.title,
    body: req.body.body,
  };
  let sql = "INSERT INTO posts SET ?";
  db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post added to the database...");
  });
});

// 4. Mostrar todos los posts.
app.get('/allPosts',(req,res)=> {
    let sql = 'SELECT * FROM posts';
    db.query(sql,(err,result)=> {
      if(err) throw err;
      res.send(result)
    })
  })
  
// 5. Mostrar un post por id (Buscar por ID)
app.get('/id/:id',(req,res)=>{
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    db.query(sql,(err,result)=> {
      if(err) throw err;
      res.send(result)
    })
  })

//  6. Actualizar un post por ID
app.put('/id/:id',(req,res)=>{
    let newTitle = req.body.title;
    let newBody = req.body.body;
    let sql =     
    `UPDATE posts SET title = '${newTitle}', body = '${newBody}'
     WHERE id = ${req.params.id}`

    db.query(sql, (err,result)=> {
      if(err) throw err;
      res.send('Post updated...')
    })
  })
// 7. Eliminar un post por ID 
  app.delete('/:id',(req,res)=>{
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    db.query(sql, (err,result)=> {
      if(err) throw err;
      res.send('Post deleted')
    })
  })
  

app.listen(port, () =>
  console.log(`Server connected at the port number ${port} succesfully :D`)
);
