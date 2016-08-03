/* const debug = require('../../../lib/io/debug')('test:dataCache:cacheManager');
const { chai, should } = require('../../utils');

const { bindPushSockets, disconnectSockets, subscriptionPushSocket } = require('../../../lib/io/zmq');
const { jsonCache } = require('../../../lib/io/loki');

const { init, createNewSubscription } = require('../../../lib/dataCache/lib/cacheManager');

describe('cacheManager', () => {
  beforeEach(() => {
    bindPushSockets(() => {
      debug.info('Test binded.');
    });
  });
  afterEach(() => {
    disconnectSockets(() => {
      debug.info('Test disconnected');
    });
  });

  it('onMessage', (done) => {
    const subs = [{
      subId: 1,
      dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
      field: 'rawValue',
      domainId: 0,
      timeLineType: 'session',
      sessionId: 1,
      setFileName: '',
      subscriptionState: 'play',
      visuSpeed: 0,
      visuWindow: {
        dInf: 1420675200000,
        dSup: 1430675200000,
      },
      filter: [
        {
          dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
          field: 'rawValue',
          operator: 'OP_GT',
          value: 25,
        }, {
          dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
          field: 'rawValue',
          operator: 'OP_LT',
          value: 75,
        },
      ],
    }];
    subscriptionPushSocket.send(JSON.stringify(subs));

    setTimeout(done, 1500);
  });

  it('createNewSubscription', (done) => {
    const sub = {
      dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
      field: 'rawValue',
      domainId: 0,
      timeLineType: 'session',
      sessionId: 1,
      setFileName: '',
      subscriptionState: 'play',
      visuSpeed: 0,
      visuWindow: {
        dInf: 1420675200000,
        dSup: 1420685200000,
      },
      filter: [
        {
          dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
          field: 'rawValue',
          operator: 'OP_GT',
          value: 25,
        }, {
          dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
          field: 'rawValue',
          operator: 'OP_LT',
          value: 75,
        },
      ],
    };
    createNewSubscription(sub);
    setTimeout(done, 1500);
  });
});*/
