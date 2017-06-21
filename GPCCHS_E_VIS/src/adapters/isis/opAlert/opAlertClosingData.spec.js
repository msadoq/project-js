// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./opAlertClosingData');
const { getOpAlertClosingData } = require('../stubs');

const closingWay = require('./closingWay');

describe('protobuf/isis/opAlert/OpAlertClosingData', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/OpAlertClosingData.proto`, { keepCase: true })
    .lookup('opAlert.protobuf.OpAlertClosingData');
  const fixture = getOpAlertClosingData();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      closingUser: {
        login: { type: 'string', value: fixture.closingUser.login },
        password: { type: 'string', value: fixture.closingUser.password },
        profile: { type: 'string', value: fixture.closingUser.profile },
        userTime: { type: 'time', value: fixture.closingUser.userTime },
      },
      closingDate: { type: 'time', value: fixture.closingDate },
      closingWay: { type: 'enum', value: fixture.closingWay, symbol: closingWay[fixture.closingWay] },
    });
    
    
  });
});
