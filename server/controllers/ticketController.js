const Ticket = require('../models/ticketModel');

const ticketController = {};

ticketController.getTickets = (req, res, next) => {
  Ticket.find({})
    .exec()
    .then((tickets) => {
      res.locals.tickets = tickets;
      return next();
    })
    .catch((error) => {
      return next({
        log: 'Error: Couldn\t find tickets.',
        message: {
          error: `ticketController.getTickets error: ${error}`,
        },
      });
    });
};

ticketController.addTicket = (req, res, next) => {
  const { name, email, description } = req.body;

  const ticketInfo = {
    name: name,
    email: email,
    description: description,
    status: 'new',
  };

  Ticket.create(ticketInfo)
    .then(() => {
      return next();
    })
    .catch((error) => {
      return next({
        log: 'Error: Couldn\t add ticket.',
        message: {
          error: `ticketController.addTicket error: ${error}`,
        },
      });
    });
};

ticketController.updateTicketStatus = (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  Ticket.findByIdAndUpdate(id, { status }, { new: true })
    .then(() => {
      return next();
    })
    .catch((error) => {
      return next({
        log: 'Error: Couldn\t update ticket status.',
        message: {
          error: `ticketController.updateTicketStatus error: ${error}`,
        },
      });
    });
};

module.exports = ticketController;
