const { Router } = require('express');
const _each = require('lodash/each');

const connectedDataModel = require('../../models/connectedData');


const router = new Router();


router.get('/',
(req, res) => {
  const connectedData = connectedDataModel.getAll();

  let response =
    '<!DOCTYPE html>' +
    '<html>' +
    ' <head>' +
    '   <meta charset="utf-8" http-equiv="refresh" content="5"/>' +
    '   <title>Connected Data</title>' +
    ' </head>' +
    ' <body>' +
    '   <h1>CONNECTED DATA</h1>' +
    '   <ul>';

  _each(connectedData, (datum) => {
    const link = res.linker('debug/remoteId/', { remoteId: datum.remoteId });
    response += `     <li><a href=${link}>${datum.remoteId}</a></li>`;
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
