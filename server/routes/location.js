const express = require('express');
const router = express.Router();


const {getAllLocations} = require('../controllers/locationControllers')


  router.get('/signupLocation', getAllLocations)


module.exports = router;
