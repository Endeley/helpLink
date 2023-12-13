const express = require('express');
const router = express.Router();
const { userRegister, userLogins, getMe } = require('../controllers/userControllers.js');
const { protect } = require('../middleware/authMiddleware');

//

//

//
router.post('/', userRegister);
router.post('/login', userLogins);
router.get('/me', protect, getMe);

module.exports = router;
