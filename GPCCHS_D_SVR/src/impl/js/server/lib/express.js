const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const contentType = require('./middlewares/contentType');
const linker = require('./middlewares/linker');
const attachValidated = require('./middlewares/attachValidated');
const errorHandler = require('./routes/error');
const ApiError = require('./utils/apiError');

const app = express();

if (process.env.HTTP_LOGS === '1') {
  app.use(logger('dev'));
}

app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(contentType);
app.use(linker);
app.use(attachValidated);

app.use('/api/', require('./routes/index'));
app.use('/api/', require('./routes/subscriptions'));
app.use('/api/documents/', require('./routes/documents/pages'));
app.use('/api/documents/', require('./routes/documents/views'));
app.use('/api/documents/', require('./routes/documents/workspaces'));

app.use((req, res, next) => next(new ApiError(404, 'Not Found')));
app.use(errorHandler);

module.exports = app;
