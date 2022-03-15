const express = require("express");

const {
  createProductBaraholka,
  findAllProductAndCategories,
  deleteProduct,
} = require("../controllers/baraholka");

const router = express.Router();

router
  .route("/new")
  //создание нового обьявления о продукте
  .post(createProductBaraholka);

router.route("/allProduct").get(findAllProductAndCategories);

router
  .route("/:id")
  //удаление
  .delete(deleteProduct);

module.exports = router;
