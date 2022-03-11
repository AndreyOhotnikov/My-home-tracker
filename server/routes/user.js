const express = require('express');
const router = express.Router();

const {
  createUserAndSession, 
  destroySession, 
  checkUserAndCreateSession, 
  checkAuth,
  
} = require('../controllers/user')



router.post('/signup', createUserAndSession)

router.post('/signin', checkUserAndCreateSession);

router.get('/checkAuth', checkAuth)
 
router.get('/signout', destroySession);

module.exports = router;
