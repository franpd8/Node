const express = require("express");
const router = express.Router();
// const db = require("../config/database.js");
const CategoryController = require("../controllers/CategoryController");

// crear tabla categorias
router.get("/createTable", CategoryController.create);
// añadir nueva categoria
router.post("/add", CategoryController.add);
// mostrar todas las categorías
router.get("/showAll",CategoryController.showAll);
// Buscar una categoria por ID
router.get("/search/id/:id",CategoryController.searchById );
// Buscar una categoría por su nombre
router.get("/search/name/:name",CategoryController.searchByName);
//  Actualizar una categoria por ID
router.put("/update/id/:id",CategoryController.updateById );
 // Eliminar una categoria por ID 
 router.delete('/delete/:id',CategoryController.deteleById)

module.exports = router;
