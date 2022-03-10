const express = require('express');
const router = express.Router();
// const {
//   User, City, Street, Home, Userinfo, Benifit, Bid, Chat, Global_news, Instruction, Like, Local_news, Photolink, Response, Store, Support,
// } = require('../db/models');

const {getAllLocations} = require('../controllers/locationControllers')


  router.get('/signupLocation', getAllLocations)


module.exports = router;
