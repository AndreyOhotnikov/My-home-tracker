const router = require('express').Router();
const {getAllServices}=require('../controllers/BenefitServices');

router
.get('/',getAllServices)
// .post('/new', addNewServices)

// router
// .get('/edit/:id',findServices)
// .patch('/edit/:id',editServices)

module.exports = router;
