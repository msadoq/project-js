// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./rawData');
const stub = require('./rawData.stub')();

const securityStatus = require('./securityStatus');

describe('protobuf/isis/rawData/RawData', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/RawData.proto`, { keepCase: true })
    .lookup('rawData.protobuf.RawData');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      rawData: { type: 'blob', value: stub.rawData },
      securityStatus: { type: 'enum', value: stub.securityStatus, symbol: securityStatus[stub.securityStatus] },
    });
    
  });
});
