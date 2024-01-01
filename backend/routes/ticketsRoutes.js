const express = require('express');
const router = express.Router();
const { userTicket, createTickets, getTicket, deleteTicket, updateTicket } = require('../controllers/ticketsController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, userTicket).post(protect, createTickets);

router.route('/:id').get(protect, getTicket).delete(protect, deleteTicket).put(protect, updateTicket);
module.exports = router;
