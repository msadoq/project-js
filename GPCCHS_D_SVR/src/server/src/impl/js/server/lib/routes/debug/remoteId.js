const { Router } = require('express');
const connectedDataModel = require('../../models/connectedData');
const _ = require('lodash');
const ApiError = require('../../utils/apiError');

const router = new Router();

router.get('/',
(req, res, next) => {
  const remoteId = _.get(req, 'query.remoteId');
  if (typeof remoteId === 'undefined') {
    next(new ApiError(400, 'invalid JSON', '/query/remoteId'));
  }
  const connectedData = connectedDataModel.getByRemoteId(remoteId);

  let response =
    '<!DOCTYPE html>' +
    '<html>' +
    ' <head>' +
    '   <meta charset="utf-8" http-equiv="refresh" content="5"/>' +
    '   <title>Connected Data</title>' +
    ' </head>' +
    ' <body>' +
    `   <h2>RemoteId ${remoteId}</h1>` +
    '   <h3>Received Intervals</h3>' +
    '   <ul>';

  _.each(connectedData.intervals.received, (interval) => {
    response += `     <li>[ ${interval[0]} , ${interval[1]} ]</li>`;
  });

  response +=
    '   </ul>' +
    '   <h3>Requested Intervals</h3>' +
    '   <ul>';

  _.each(connectedData.intervals.requested, (interval) => {
    response += `     <li>[ ${interval[0]} , ${interval[1]} ]</li>`;
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
