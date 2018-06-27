// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./tCFile');
const stub = require('./tCFile.stub')();



describe('protobuf/isis/tcHistory/TCFile', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/TCFile.proto`, { keepCase: true })
    .lookup('tcHistory.protobuf.TCFile');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      encodingDate: (typeof stub.encodingDate === 'undefined')
        ? null
        : { type: 'time', value: stub.encodingDate },
      pusHeader: (typeof stub.pusHeader === 'undefined')
        ? null
        : {
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
      fileReference: { type: 'string', value: stub.fileReference },
      rawPacket: (typeof stub.rawPacket === 'undefined')
        ? null
        : { type: 'blob', value: stub.rawPacket },
      partition: { type: 'string', value: stub.partition },
      tcId: (typeof stub.tcId === 'undefined')
        ? null
        : { type: 'integer', value: stub.tcId },
      generatedProcedure: { type: 'string', value: stub.generatedProcedure },
      tcSourceId: (typeof stub.tcSourceId === 'undefined')
        ? null
        : { type: 'uinteger', value: stub.tcSourceId },
      sequenceCount: (typeof stub.sequenceCount === 'undefined')
        ? null
        : { type: 'ulong', symbol: `${stub.sequenceCount}` },
      fileUri: { type: 'string', value: stub.fileUri },
      fileType: { type: 'string', value: stub.fileType },
      fileChecksum: { type: 'ulong', symbol: `${stub.fileChecksum}` },
    });
    expect(decoded.tc13).toHaveLength(stub.tc13.length);
    for (let i = 0; i < stub.tc13.length; i += 1) {
      expect(decoded.tc13[i]).toMatchObject({
        type: 'blob',
        value: stub.tc13[i],
      });
    }
    expect(decoded.parameterPhysicalValue).toHaveLength(stub.parameterPhysicalValue.length);
    for (let i = 0; i < stub.parameterPhysicalValue.length; i += 1) {
      expect(decoded.parameterPhysicalValue[i]).toMatchObject({
        type: 'string',
        value: stub.parameterPhysicalValue[i],
      });
    }
  });
});
