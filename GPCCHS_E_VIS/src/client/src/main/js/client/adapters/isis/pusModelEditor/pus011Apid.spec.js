// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus011Apid');
const stub = require('./pus011Apid.stub')();



describe('protobuf/isis/pusModelEditor/Pus011Apid', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus011Apid.proto`, { keepCase: true })
    .lookup('pusModelEditor.protobuf.Pus011Apid');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      apid: { type: 'uinteger', value: stub.apid },
      lastUpdateModeApid: { type: 'uinteger', value: stub.lastUpdateModeApid },
      lastUpdateTimeApid: { type: 'string', value: stub.lastUpdateTimeApid },
      status: { type: 'uinteger', value: stub.status },
      serviceApid: { type: 'uinteger', value: stub.serviceApid },
      serviceApidName: { type: 'string', value: stub.serviceApidName },
      apidName: { type: 'string', value: stub.apidName },
      uniqueId: { type: 'ulong', symbol: `${stub.uniqueId}` },
    });
    
  });
});
