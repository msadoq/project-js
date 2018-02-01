// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./ack');
const stub = require('./ack.stub')();



describe('protobuf/isis/ackRequest/Ack', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Ack.proto`, { keepCase: true })
    .lookup('ackRequest.protobuf.Ack');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      ackDate: { type: 'time', value: stub.ackDate },
      acknowledger: {
        login: { type: 'string', value: stub.acknowledger.login },
        password: { type: 'string', value: stub.acknowledger.password },
        profile: { type: 'string', value: stub.acknowledger.profile },
        userTime: { type: 'time', value: stub.acknowledger.userTime },
      },
    });
    
  });
});
