const express = require('express');
const ticketController = require('../controllers/ticketController.js');
const ticketRouter = express.Router();

ticketRouter.get('/', ticketController.getTickets, (req, res) => {
  return res.status(200).json(res.locals.tickets);
});

ticketRouter.post('/', ticketController.addTicket, (req, res) => {
  return res.status(200).json('POST Request Success!');
});

ticketRouter.put('/:id', ticketController.updateTicketStatus, (req, res) => {
  return res.status(200).json('PUT Request Success!');
});

ticketRouter.delete('/', (req, res) => {
  return res.status(200).json('DELETE Request Success!');
});

module.exports = ticketRouter;
