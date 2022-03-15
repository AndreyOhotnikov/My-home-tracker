const router = require('express').Router();
const { getAllServices, addNewServices, deleteServise } = require('../controllers/BenefitServices');

router
  .get('/', getAllServices)
  .post('/add', addNewServices)
  .delete('/:id', deleteServise);

module.exports = router;
