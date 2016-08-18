const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', require('./routes/index'));
app.use('/api', require('./routes/subscriptions'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handler
app.use((err, req, res) => {
  res.status(err.status || 500).render('error', {
    message: err.message,
    error: (app.get('env') === 'development') ?
      err :
      {}, // no stack-trace outside development
  });
});

module.exports = app;
