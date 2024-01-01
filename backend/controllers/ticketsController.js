const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');
const asyncHandler = require('express-async-handler');

//
// <=======GET USER TICKETS===========>
// @ route GET/api/tickets
//  and this is a private route
const userTicket = asyncHandler(async (req, res) => {
    // Get user tickets, using the id and jwt
    const user = await User.findById(req.user.id);

    //
    if (!user) {
        res.status(401);
        throw new Error('User Not Found');
    }

    const tickets = await Ticket.find({ user: req.user.id });
    res.status(200).json(tickets);
});

// <=======GET SINGLE USER TICKET===========>
// @ route GET/api/tickets/:id
//  and this is a private route

const getTicket = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        res.status(404);
        throw new Error('ticket not found');
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('ticket not found');
    }
    res.status(200).json(ticket);
});

// <=======DELETE USER TICKET===========>
// @ route DELETE/api/tickets/:id
//  and this is a private route

const deleteTicket = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        res.status(404);
        throw new Error('ticket not found');
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not Authorized');
    }

    await ticket.deleteOne();

    //
    res.status(200).json({ success: 'ticket deleted' });
});

// <=======UPDATE USER TICKET===========>
// @ route GET/api/tickets/:id
//  and this is a private route

const updateTicket = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        res.status(404);
        throw new Error('ticket not found');
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('ticket not found');
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json(updatedTicket);
});

// <=======CREATE NEW TICKET===========>
// @ route POST/api/tickets
//  and this is a private route
const createTickets = asyncHandler(async (req, res) => {
    const { product, description } = req.body;

    if (!product || !description) {
        res.status(400);
        throw new Error('please fill in all fields');
    }

    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const tickets = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: 'new',
    });

    res.status(201).json(tickets);
});

module.exports = {
    userTicket,
    createTickets,
    getTicket,
    deleteTicket,
    updateTicket,
};
