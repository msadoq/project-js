const { should } = require('../utils/test');
// const protobuf = require('./index');
// const stubData = require('../stubs/data');
const onConnectedDataOpen = require('./onConnectedDataOpen');

describe.only('controllers:onConnectedDataOpen', () => {
  it('subscribe', () => {
    console.log(
      onConnectedDataOpen({}, {
        formula: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>.convertedValue',
        domain: '.*',
        timeline: 'Session 1',
        // filter: [],
      })
    );
  });
});
