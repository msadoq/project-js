const { Router } = require('express');

const subscriptionsModel = require('../../models/subscriptions');
const connectedDataModel = require('../../models/connectedData');
const { getAllTimebasedDataModelRemoteIds } = require('../../models/timebasedDataFactory');
const { getDomains } = require('../../utils/domains');
const perfTool = require('../../utils/performanceTool');


const {
  each: _each,
} = require('lodash');

const router = new Router();

router.get('/',
  (req, res) => {
    const domains = getDomains();
    const cdNb = connectedDataModel.count();
    const tbModels = getAllTimebasedDataModelRemoteIds();
    const subNb = subscriptionsModel.count();
    const avgTime = perfTool.getAvgTime();
    const avgMemoryUsage = perfTool.getAvgMemoryUsage();

    let htmlDomains = '';
    _each(domains, (domain) => {
      htmlDomains += `       <li>${domain.name}</li>`;
    });

    const response =
      '<!DOCTYPE html>' +
      '<html>' +
      ' <head>' +
      '   <meta charset="utf-8" http-equiv="refresh" content="5"/>' +
      '   <title>Debug</title>' +
      ' </head>' +
      ' <body>' +
      '   <h1>DEBUG</h1>' +
      '   <h2>Monitoring</h2>' +
      ((perfTool.isInited() === false)
        ? 'MONITORING OFF'
        : ('     <h3>Average time between two eventloop ticks</h3>' +
          '     <ul>' +
          `       <li>${convertTime(avgTime)}</li>` +
          '     </ul>' +
          '     <h3>Average memory usage</h3>' +
          '     <ul>' +
          `       <li>RSS: ${convertBytes(avgMemoryUsage.rss)}</li>` +
          `       <li>Heap Total: ${convertBytes(avgMemoryUsage.heapTotal)}</li>` +
          `       <li>Heap Used: ${convertBytes(avgMemoryUsage.heapUsed)}</li>` +
          '     </ul>')) +
      '   <h2>Domains</h2>' +
      '     <ul>' +
      ((htmlDomains === '') ? 'no domains retrieved' : htmlDomains) +
      '     </ul>' +
      '   <h2>Models</h2>' +
      '     <ul>' +
      `       <li><a href="/debug/timebasedData/">timebasedData</a>: ${tbModels.length} model(s)</li>` +
      `       <li><a href="/debug/connectedData/">connectedData</a>: ${cdNb} element(s)</li>` +
      `       <li><a href="/debug/subscriptions/">subscriptions</a>: ${subNb} element(s)</li>` +
      '     </ul>' +
      ' </body>' +
      '</html>';

    res.send(response);
  });

module.exports = router;
