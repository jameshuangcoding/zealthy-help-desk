require('dotenv').config();

const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['new', 'in-progress', 'resolved'] },
});

module.exports = mongoose.model('Ticket', ticketSchema);
