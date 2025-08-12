const express = require('express');
const {register,login} = require('../Controller/userController.js');
const {userAuthentication} = require('../middleware/auth.js');
const router = express.Router();

router.post('/register',register);
router.post('/login',login);

module.exports = router;