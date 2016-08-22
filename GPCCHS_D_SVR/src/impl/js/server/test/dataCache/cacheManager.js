/*const { chai, should } = require('../lib/utils/test');

const { open, close, send } = require('../../../lib/io/zmq');
const { jsonCache } = require('../../../lib/io/loki');

const { init, createNewSubscription } = require('../../../lib/dataCache/cacheManager');

describe('cacheManager', () => {
  beforeEach(() => {
    open({
      gpccdcpush: {
        type: 'push',
        url: process.env.ZMQ_GPCCDCPUSH,
        handler: payload => console.log('received', payload), // TODO
      },
    }, () => {
      debug.info('Test binded.');
    });
  });
  afterEach(() => {
    close();
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
        lower: 1420675200000,
        upper: 1430675200000,
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
    send('gpccdcpush', JSON.stringify(subs));

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
        lower: 1420675200000,
        upper: 1420685200000,
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
