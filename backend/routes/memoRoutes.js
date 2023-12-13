const express = require('express');
const router = express.Router();
const { userMemo } = require('../controllers/memoController');

router.post('/create', userMemo);

module.exports = router;
