const { Router } = require('express');
const connectedDataModel = require('../../models/connectedData');
const _ = require('lodash');
const ApiError = require('../../utils/apiError');

const router = new Router();


router.get('/',
(req, res, next) => {
  const localId = _.get(req, 'query.localId');
  if (typeof localId === 'undefined') {
    next(new ApiError(400, 'invalid JSON', '/query/localId'));
  }
  const connectedData = connectedDataModel.getByDataId(localId);

  let response =
    '<!DOCTYPE html>' +
    '<html>' +
    ' <head>' +
    '   <meta charset="utf-8" http-equiv="refresh" content="5"/>' +
    '   <title>Connected Data</title>' +
    ' </head>' +
    ' <body>' +
    `   <h1>CONNECTED DATA ${localId}</h1>` +
    '   <h3>Data Id</h3>' +
    '   <ul>' +
    `     <li>Catalog: ${connectedData.dataId.catalog}</li>` +
    `     <li>Com Object: ${connectedData.dataId.comObject}</li>` +
    `     <li>Parameter Name: ${connectedData.dataId.parameterName}</li>` +
    `     <li>Session Id: ${connectedData.dataId.sessionId}</li>` +
    `     <li>Domain Id: ${connectedData.dataId.domainId}</li>` +
    '   </ul>' +
    '   <h3>Received Intervals</h3>' +
    '   <ul>';

  _.each(connectedData.intervals, (interval) => {
    response += `     <li>[ ${interval[0]} , ${interval[1]} ]</li>`;
  });

  response +=
    '   </ul>' +
    '   <h3>Requested Intervals</h3>' +
    '   <ul>';

  _.each(connectedData.requested, (interval) => {
    response += `     <li>[ ${interval[0]} , ${interval[1]} ]</li>`;
  });

  response +=
    '   </ul>' +
    '   <h3>Window Ids</h3>' +
    '   <ul>';

  _.each(connectedData.windows, (windowId) => {
    response += `     <li>${windowId}</li>`;
  });

  response +=
    '   <br />' +
    '   <a href="/debug/connectedData">Back</a>' +
    ' </body>' +
    '</html>';

  res.send(response);
});

module.exports = router;
