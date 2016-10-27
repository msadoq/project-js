const { Router } = require('express');
const subscriptionsModel = require('../../models/subscriptions');
const {
  each: _each,
  isEmpty: _isEmpty,
} = require('lodash');

const router = new Router();

router.get('/',
(req, res) => {
  const subscriptions = subscriptionsModel.getAll();

  let response =
    '<!DOCTYPE html>' +
    '<html>' +
    ' <head>' +
    '   <meta charset="utf-8" http-equiv="refresh" content="5"/>' +
    '   <title>Subscriptions</title>' +
    ' </head>' +
    ' <body>' +
    '   <h1>VIEWS</h1>' +
    '   <ul>';

  _each(subscriptions, (subscription) => {
    response += `     <li>${subscription.flatDataId}</li>`;
    if (_isEmpty(subscription.filters)) {
      return;
    }
    response += '     <ul>';
    _each(subscription.filters, (filter, remoteId) => {
      const link = res.linker('debug/remoteId/', { remoteId });
      response += `     <li><a href=${link}>${remoteId}</a></li>`;
    });
    response += '     </ul>';
  });

  response +=
    '   </ul>' +
    '   <br />' +
    '   <a href="/debug/">Back</a>' +
    ' </body>' +
    '</html>';

  res.send(response);
});

module.exports = router;
