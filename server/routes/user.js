const express = require('express');
const router = express.Router();
const {
  createUserAndSession,
  destroySession,
  checkUserAndCreateSession,
  checkAuth,
  userInfoEdit,

} = require('../controllers/user');

router.post('/signup', createUserAndSession);

router.post('/signin', checkUserAndCreateSession);

router.get('/checkAuth', checkAuth);
router.put('/userInfoEdit', userInfoEdit);
router.get('/signout', destroySession);

module.exports = router;
