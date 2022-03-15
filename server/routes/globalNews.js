const express = require('express');

const router = express.Router();

const { createGlobalNews, getAllGlobalNews, addLike } = require('../controllers/GlobalNews');

router
  .route('/new')
  .post(createGlobalNews);
router
  .route('/')
  .get(getAllGlobalNews);
router
  .route('/like/:id')
  .get(addLike);

module.exports = router;
