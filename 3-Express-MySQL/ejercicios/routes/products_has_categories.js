const express = require('express');
const router = express.Router();
// const db = require('../config/database.js');
const Products_has_categoriesController = require('../controllers/Product_has_CategoryController')

// crear tabla
router.get("/createTable", Products_has_categoriesController.create);
// enlazar tablas
router.post("/add",Products_has_categoriesController.add);
// mostrar relaciones entre tablas
router.get('/show',Products_has_categoriesController.show)
//  Mostrar todos los productos con sus categorias.
router.get('/showAll',Products_has_categoriesController.showAll)

module.exports = router;