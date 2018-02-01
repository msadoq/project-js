// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./ackRequest');
const stub = require('./ackRequest.stub')();



describe('protobuf/isis/ackRequest/AckRequest', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/AckRequest.proto`, { keepCase: true })
    .lookup('ackRequest.protobuf.AckRequest');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      ackRequestDate: { type: 'time', value: stub.ackRequestDate },
      systemDate: { type: 'time', value: stub.systemDate },
      ack: (typeof stub.ack === 'undefined')
        ? null
        : {
          ackDate: { type: 'time', value: stub.ack.ackDate },
          acknowledger: {
            login: { type: 'string', value: stub.ack.acknowledger.login },
            password: { type: 'string', value: stub.ack.acknowledger.password },
            profile: { type: 'string', value: stub.ack.acknowledger.profile },
            userTime: { type: 'time', value: stub.ack.acknowledger.userTime },
          },
        },
      comment: { type: 'string', value: stub.comment },
    });
    
  });
});
