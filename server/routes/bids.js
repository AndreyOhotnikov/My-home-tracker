const router = require('express').Router();
const {
  addNewBid, getAllBids, deleteBid, getAllUsers,
} = require('../controllers/bids');

router
  .get('/', getAllBids)
  .get('/users', getAllUsers)
  .post('/add', addNewBid)
  .delete('/:id', deleteBid);

module.exports = router;
