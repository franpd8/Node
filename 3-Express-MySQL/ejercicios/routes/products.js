const express = require("express");
const router = express.Router();
// const db = require('../config/database.js');
const ProductController = require("../controllers/ProductController");

// una vez terminadas las rutas se podrían renombrar de forma sencilla, pues ya van a tener el prefijo de products

// crear tabla productos
router.get("/createTable", ProductController.create);
// Añadir un producto a la tabla
router.post("/newProduct", ProductController.add);

// mostrar todos los productos
router.get("/allProducts", ProductController.showAll);

// mostrar todos los productos descendiente
router.get("/allProductsDesc", ProductController.showAllDesc);

// Buscar un producto por ID
router.get("/searchProduct/id/:id", ProductController.searchById);

//Buscar un producto por su nombre
router.get("/searchProduct/name/:name", ProductController.searchByName);

// Actualizar un producto por ID
router.put("/updateProduct/id/:id", ProductController.updateById);

//  Eliminar un producto por ID
router.delete("/deleteProduct/:id", ProductController.deteleById);

module.exports = router;
