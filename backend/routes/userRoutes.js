const express = require('express');
const router = express.Router();
const { userRegister, userLogins } = require('../controllers/userControllers');

//
router.post('/register', userRegister);
router.post('/login', userLogins);

module.exports = router;
