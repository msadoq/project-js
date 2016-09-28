const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const linker = require('./middlewares/linker');
const errorHandler = require('./routes/error');
const ApiError = require('./utils/apiError');

const app = express();

if (process.env.HTTP_LOGS === '1') {
  app.use(logger('dev'));
}

app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(linker);

app.use('/debug/', require('./routes/debug/index'));
app.use('/debug/connectedData/', require('./routes/debug/connectedData'));
app.use('/debug/localId/', require('./routes/debug/localId'));
app.use('/debug/views/', require('./routes/debug/views'));
app.use((req, res, next) => next(new ApiError(404, 'Not Found')));
app.use(errorHandler);

module.exports = app;
