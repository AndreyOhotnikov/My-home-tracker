const router = require('express').Router();
const { addNewBid, getAllBids } = require('../controllers/bids');

router
  .get('/', getAllBids)
  .post('/add', addNewBid);
// .delete('/:id', deleteServise);

module.exports = router;
