// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./opAlertClosingData');
const stub = require('./opAlertClosingData.stub')();

const closingWay = require('./closingWay');

describe('protobuf/isis/opAlert/OpAlertClosingData', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/OpAlertClosingData.proto`, { keepCase: true })
    .lookup('opAlert.protobuf.OpAlertClosingData');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      closingUser: {
        login: { type: 'string', value: stub.closingUser.login },
        password: { type: 'string', value: stub.closingUser.password },
        profile: { type: 'string', value: stub.closingUser.profile },
        userTime: { type: 'time', value: stub.closingUser.userTime },
      },
      closingDate: { type: 'time', value: stub.closingDate },
      closingWay: { type: 'enum', value: stub.closingWay, symbol: closingWay[stub.closingWay] },
    });
    
  });
});
