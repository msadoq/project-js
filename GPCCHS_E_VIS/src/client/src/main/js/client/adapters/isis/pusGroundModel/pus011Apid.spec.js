// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus011Apid');
const stub = require('./pus011Apid.stub')();



describe('protobuf/isis/pusGroundModel/Pus011Apid', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus011Apid.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus011Apid');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      status: { type: 'uinteger', value: stub.status },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: stub.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: stub.pusElement.lastUpdateTime },
      },
      apid: { type: 'uinteger', value: stub.apid },
    });
    
  });
});
