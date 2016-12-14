const { Router } = require('express');
const _each = require('lodash/each');

const { getAllTimebasedDataModelRemoteIds, getTimebasedDataModel } = require('../../models/timebasedDataFactory');


const router = new Router();


router.get('/',
(req, res) => {
  const tbdModels = getAllTimebasedDataModelRemoteIds();

  let response =
    '<!DOCTYPE html>' +
    '<html>' +
    ' <head>' +
    '   <meta charset="utf-8" http-equiv="refresh" content="5"/>' +
    '   <title>Timebased Data Models</title>' +
    ' </head>' +
    ' <body>' +
    '   <h1>TIMEBASED DATA MODELS</h1>' +
    '   <ul>';

  _each(tbdModels, (remoteId) => {
    const model = getTimebasedDataModel(remoteId);
    if (!model) {
      return;
    }
    response += `     <li>${remoteId} --- ${model.count()} element(s)</a></li>`;
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
