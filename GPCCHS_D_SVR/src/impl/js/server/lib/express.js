const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('./routes/error');
const ApiError = require('./utils/apiError');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/', require('./routes/index'));

app.use((req, res, next) => next(new ApiError(404, 'Not Found')));
app.use(errorHandler);

module.exports = app;
