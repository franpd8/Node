const express = require("express");
const app = express();
const port = 4000;
const path = require("path");
const cors = require('cors')

app.use(cors())

// Request— En la ruta
// app.get("/", (req, res) => {
//   res.send("Hola the bridge!!!");
// });

// Request— En la Ruta
// app.get("/myName/:name", (req, res) => {
//   res.send("My name is " + req.params.name);
// });
// localhost:3000/myName/nombrequepaso

// Request— Query String
// app.get("/myName", (req, res) => {
//   res.send("My name is " + req.query.name);
// });
// localhost:3000/myName/?name=pedro

// Requeste — Body 
// para que express entienda el req.body como objeto JSON
// app.use(express.json()); 

// app.post("/myName", (req, res) => {
//   res.send("My name is " + req.body.name);
// });

// Cargando Archivos HTML
// segun la descripcion estará en una carpeta public  
// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,'public','index.html'))
// })

// app.get('/about',(req,res)=>{
//     res.sendFile(path.join(__dirname,'public','about.html'))
// })

// Cargando Varios Archivos HTML
app.use(express.static(path.join(__dirname, 'public')));


// Haciendo un CRUD con el servidor.

// const members = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "john@gmail.com",
//     status: "active",
//   },
//   {
//     id: 2,
//     name: "Bob Williams",
//     email: "bob@gmail.com",
//     status: "inactive",
//   },
//   {
//     id: 3,
//     name: "Shannon Jackson",
//     email: "shannon@gmail.com",
//     status: "active",
//   },
// ];

// Mostramos los miembros con la petición .get
// -------------------------------------------

// app.get("/", (req, res) => {
//   res.send(members);
// });

// Mostramos los miembros que coincidan con una id
// -----------------------------------------------

// app.get("/:id", (req, res) => {

//   //con el + delante convertimos una string en un numero para hacer la comparación directamente, sino daria error
//   console.log(typeof +req.params.id);
//   const found = members.some((member) => member.id === +req.params.id);
//   el método .some() nos devuelve true o false
//   console.log(found);
//   if (found) {
//     res.send(members.filter((member) => member.id === +req.params.id));
//   } else {
//     res.status(404).send(`Member with id ${req.params.id} not found`);
//   }
// });

// app.post("/", (req, res) => {
//   const newMember = {
//     id: members.length + 1,
//     name: req.body.name,
//     email: req.body.email,
//     status: "inactive",
//   };
//   if (!req.body.name || !req.body.email) {
//     res.status(400).send("Please enter all fields");
//   } else {
//     members.push(newMember);
//     const response = { newMember, members }
//     res.status(201).send(response);
//   }
// });

// app.put('/:id',(req,res)=>{
//     const found = members.some(member => member.id === +req.params.id)
//     if(found){
//         members.forEach(member =>{
//             if(+req.params.id === member.id){
//                 member.name = req.body.name ? req.body.name : member.name
//                 member.email = req.body.email ? req.body.email : member.email
//                 res.send(member)
//             }
//         })
//     }else{
//         res.status(404).send(`Member with id ${req.params.id} not found`)
//     }
// })

// app.delete('/:id',(req,res)=>{
//     const found = members.some(member => member.id === +req.params.id)

//     if(found){
//         const membersFiltered = members.filter(member => member.id !== +req.params.id)
//         res.send({msg:`Member with id ${req.params.id} a la porra`,membersFiltered})
//     }else{
//         res.status(404).send(`Member with id ${req.params.id} not found`)
//     }
// })
app.listen(port, () => console.log(`servidor levantado en el puerto ${port}`));
