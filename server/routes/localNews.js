const express = require('express');

const router = express.Router();

const {
  createLocalNews, getAllLocalNews, addLocalLike, delLocalNews,
} = require('../controllers/localNews');

router
  .route('/new')
  .post(createLocalNews);
router
  .route('/')
  .get(getAllLocalNews);

router
  .route('/like/:id')
  .get(addLocalLike);
router
  .route('/:id')
  .delete(delLocalNews);

module.exports = router;
