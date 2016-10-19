const { Router } = require('express');

const subscriptionsModel = require('../../models/subscriptions');
const connectedDataModel = require('../../models/connectedData');
const { getAllTimebasedDataModelRemoteIds } = require('../../models/timebasedDataFactory');
const { getDomains } = require('../../utils/domains');
const perfTool = require('../../utils/performanceTool');

const {
  floor: _floor,
  round: _round,
  each: _each,
} = require('lodash');

const router = new Router();

const convertBytes = (value) => {
  const gigaValue = value / 1e9;
  if (_floor(gigaValue) > 0) {
    return `${_round(gigaValue, 1)} Gb (${value} bytes)`;
  }
  const megaValue = value / 1e6;
  if (_floor(megaValue) > 0) {
    return `${_round(megaValue, 1)} Mb (${value} bytes)`;
  }
  const kiloValue = value / 1e3;
  if (_floor(kiloValue) > 0) {
    return `${_round(kiloValue, 1)} kb (${value} bytes)`;
  }
  return `${value} bytes`;
};

const convertTime = (hrTime) => {
  if (hrTime[0] * 1e9 > hrTime[1]) {
    const hourValue = hrTime[0] / 3600;
    if (_floor(hourValue) > 0) {
      const minValue = (hrTime[0] % 3600) / 60;
      const minString = (minValue > 0) ? ` ${_round(minValue)} m` : '';
      return `${_floor(hourValue)} h${minString} (${hrTime[0]} seconds)`;
    }

    const minValue = hrTime[0] / 60;
    if (_floor(minValue) > 0) {
      const secValue = hrTime[0] % 60;
      const secString = (secValue > 0) ? ` ${secValue} s` : '';
      return `${_floor(minValue)} m${secString} (${hrTime[0]} seconds)`;
    }

    return `${hrTime[0]} seconds`;
  }

  const milliValue = hrTime[1] / 1e6;
  if (_floor(milliValue) > 0) {
    return `${_round(milliValue, 1)} ms (${hrTime[1]} nanoseconds)`;
  }
  const microValue = hrTime[1] / 1e3;
  if (_floor(microValue) > 0) {
    return `${_round(microValue, 1)} µs (${hrTime[1]} nanoseconds)`;
  }
  return `${hrTime[1]} nanoseconds`;
};

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
