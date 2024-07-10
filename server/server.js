const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT;

const ticketRouter = require('./routes/ticketRouter.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/ticket', ticketRouter);

// catch-all to handle 404 errors for undefined routes
app.use('*', (req, res) => {
  res.status(404).send('Page not found.');
});

// error handler
app.use(() => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { error: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, { log: `${error}` });
  console.log('Log:', errorObj.log);
  res.status(errorObj.status).send(errorObj.message);
});

// uncomment for DEV
// app.listen(PORT, () => {
//   console.log(`Listening on PORT ${PORT}`);
// });

// uncomment for PROD
module.exports.handler = serverless(app);
