// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./uCPReport');
const stub = require('./uCPReport.stub')();



describe('protobuf/isis/connection/UCPReport', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/UCPReport.proto`, { keepCase: true })
    .lookup('connection.protobuf.UCPReport');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      date: { type: 'time', value: stub.date },
    });
    expect(decoded.parameters).toHaveLength(stub.parameters.length);
    for (let i = 0; i < stub.parameters.length; i += 1) {
      expect(decoded.parameters[i]).toMatchObject({
        name: { type: 'string', value: stub.parameters[i].name },
        value: { type: 'double', symbol: stub.parameters[i].value.toString() },
      });
      
    }
  });
});
