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

// const checkBaraholka = async (res, req, next) => {
//   console.log(
//     "******************************************************************",
//     req.params.id
//   );
//   next();
// };
router.route("/:id").delete(deleteProduct);

module.exports = router;
