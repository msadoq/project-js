/* eslint prefer-template:0 */

const { Router } = require('express');
// eslint-disable-next-line no-underscore-dangle
const _each = require('lodash/each');
// eslint-disable-next-line no-underscore-dangle
const _floor = require('lodash/floor');
// eslint-disable-next-line no-underscore-dangle
const _round = require('lodash/round');

// eslint-disable-next-line import/no-extraneous-dependencies
const monitoring = require('common/monitoring');

const { getDomains } = require('../../utils/domains');

const subscriptionsModel = require('../../models/subscriptions');
const connectedDataModel = require('../../models/connectedData');
const { getAllTimebasedDataModelRemoteIds } = require('../../models/timebasedDataFactory');


const router = new Router();

const GIGA_BYTES = Math.pow(2, 30);
const MEGA_BYTES = Math.pow(2, 20);
const KILO_BYTES = Math.pow(2, 10);

const convertBytes = (value) => {
  const gigaValue = value / GIGA_BYTES;
  if (_floor(gigaValue) > 0) {
    return `${_round(gigaValue, 1)} GB (${value} bytes)`;
  }
  const megaValue = value / MEGA_BYTES;
  if (_floor(megaValue) > 0) {
    return `${_round(megaValue, 1)} MB (${value} bytes)`;
  }
  const kiloValue = value / KILO_BYTES;
  if (_floor(kiloValue) > 0) {
    return `${_round(kiloValue, 1)} kB (${value} bytes)`;
  }
  return `${value} bytes`;
};

router.get('/',
  (req, res) => {
    const domains = getDomains();
    const cdNb = connectedDataModel.count();
    const tbModels = getAllTimebasedDataModelRemoteIds();
    const subNb = subscriptionsModel.count();
    const avgTime = monitoring.getAverageTime();
    const memUsage = monitoring.getMemoryUsage();

    let htmlDomains = '';
    _each(domains, (domain) => {
      htmlDomains += `       <li>${domain.name}</li>`;
    });

    const profilingOff = (typeof avgTime === 'undefined' || typeof memUsage === 'undefined');

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
      ((profilingOff === true)
        ? 'MONITORING OFF'
        : ('     <h3>Average time between two eventloop ticks</h3>' +
          '     <ul>' +
          `       <li>${avgTime} ms</li>` +
          '     </ul>' +
          '     <h3>Average memory usage</h3>' +
          '     <ul>' +
          `       <li>RSS: ${convertBytes(memUsage.rss)}</li>` +
          `       <li>Heap Total: ${convertBytes(memUsage.heapTotal)}</li>` +
          `       <li>Heap Used: ${convertBytes(memUsage.heapUsed)}</li>` +
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
