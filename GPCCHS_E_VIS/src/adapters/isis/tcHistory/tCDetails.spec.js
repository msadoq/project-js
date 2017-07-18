// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./tCDetails');
const stub = require('./tCDetails.stub')();

const tCDetailType = require('./tCDetailType');

describe('protobuf/isis/tcHistory/TCDetails', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/TCDetails.proto`, { keepCase: true })
    .lookup('tcHistory.protobuf.TCDetails');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      tcDetailType: { type: 'enum', value: stub.tcDetailType, symbol: tCDetailType[stub.tcDetailType] },
      value: (typeof stub.value === 'undefined')
        ? null
        : { type: 'double', symbol: stub.value.toString() },
      valueIsRaw: (typeof stub.valueIsRaw === 'undefined')
        ? null
        : { type: 'boolean', value: stub.valueIsRaw },
      apId: (typeof stub.apId === 'undefined')
        ? null
        : { type: 'uinteger', value: stub.apId },
      sourceId: (typeof stub.sourceId === 'undefined')
        ? null
        : { type: 'uinteger', value: stub.sourceId },
      sequenceCount: (typeof stub.sequenceCount === 'undefined')
        ? null
        : { type: 'uinteger', value: stub.sequenceCount },
      serviceType: (typeof stub.serviceType === 'undefined')
        ? null
        : { type: 'uinteger', value: stub.serviceType },
      serviceSubType: (typeof stub.serviceSubType === 'undefined')
        ? null
        : { type: 'uinteger', value: stub.serviceSubType },
      rawPacket: (typeof stub.rawPacket === 'undefined')
        ? null
        : { type: 'blob', value: stub.rawPacket },
    });
    expect(decoded.argumentIds).toHaveLength(stub.argumentIds.length);
    for (let i = 0; i < stub.argumentIds.length; i += 1) {
      expect(decoded.argumentIds[i]).toMatchObject({
        type: 'identifier',
        value: stub.argumentIds[i],
      });
    }
  });
});
