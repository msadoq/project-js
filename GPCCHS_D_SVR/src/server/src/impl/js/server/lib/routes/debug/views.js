const { Router } = require('express');
const viewsModel = require('../../models/views');
const _ = require('lodash');

const router = new Router();

router.get('/',
(req, res) => {
  const views = viewsModel.getAll();

  let response =
    '<!DOCTYPE html>' +
    '<html>' +
    ' <head>' +
    '   <meta charset="utf-8" http-equiv="refresh" content="5"/>' +
    '   <title>Views</title>' +
    ' </head>' +
    ' <body>' +
    '   <h1>VIEWS</h1>' +
    '   <ul>';

  _.each(views, (view) => {
    response += `     <li>${view.viewId}</li>`;
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
