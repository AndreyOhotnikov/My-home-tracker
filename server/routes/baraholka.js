const express = require('express');

const {
  createProductBaraholka,
  findAllProductAndCategories,
  deleteProduct,
} = require('../controllers/baraholka');

const router = express.Router();

router
  .route('/new')
  .post(createProductBaraholka);

router.route('/allProduct').get(findAllProductAndCategories);

router.route('/:id').delete(deleteProduct);

module.exports = router;
