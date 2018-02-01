// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./tCPhysicalParameter');
const stub = require('./tCPhysicalParameter.stub')();

const tCDetailType = require('./tCDetailType');

describe('protobuf/isis/tcHistory/TCPhysicalParameter', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/TCPhysicalParameter.proto`, { keepCase: true })
    .lookup('tcHistory.protobuf.TCPhysicalParameter');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      argumentIdentifier: { type: 'identifier', value: stub.argumentIdentifier },
      value: { type: 'double', symbol: stub.value.toString() },
      valueIsRaw: { type: 'boolean', value: stub.valueIsRaw },
      tcDetailsType: { type: 'enum', value: stub.tcDetailsType, symbol: tCDetailType[stub.tcDetailsType] },
      pusHeader: {
        versionNumber: { type: 'uoctet', value: stub.pusHeader.versionNumber },
        sequenceCount: (typeof stub.pusHeader.sequenceCount === 'undefined')
          ? null
          : { type: 'uinteger', value: stub.pusHeader.sequenceCount },
        sourceId: (typeof stub.pusHeader.sourceId === 'undefined')
          ? null
          : { type: 'uinteger', value: stub.pusHeader.sourceId },
        serviceType: { type: 'uoctet', value: stub.pusHeader.serviceType },
        serviceSubType: { type: 'uoctet', value: stub.pusHeader.serviceSubType },
        subCounter: { type: 'uoctet', value: stub.pusHeader.subCounter },
        destinationId: { type: 'uoctet', value: stub.pusHeader.destinationId },
        time: { type: 'finetime', value: stub.pusHeader.time },
      },
      rawPacket: { type: 'blob', value: stub.rawPacket },
    });
    
  });
});
