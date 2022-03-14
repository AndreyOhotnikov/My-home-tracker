const router = require('express').Router();
const {getAllServices,addNewServices}=require('../controllers/BenefitServices');

router
.get('/',getAllServices)
.post('/add', addNewServices)

// router
// .get('/edit/:id',findServices)
// .patch('/edit/:id',editServices)

module.exports = router;
