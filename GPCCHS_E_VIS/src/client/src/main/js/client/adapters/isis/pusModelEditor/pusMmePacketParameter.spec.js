// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pusMmePacketParameter');
const stub = require('./pusMmePacketParameter.stub')();



describe('protobuf/isis/pusModelEditor/PusMmePacketParameter', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/PusMmePacketParameter.proto`, { keepCase: true })
    .lookup('pusModelEditor.protobuf.PusMmePacketParameter');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      parameterId: { type: 'uinteger', value: stub.parameterId },
      parameterName: { type: 'string', value: stub.parameterName },
      parameterOrder: { type: 'uinteger', value: stub.parameterOrder },
      parameterFilteredStatus: { type: 'string', value: stub.parameterFilteredStatus },
      uniqueId: { type: 'ulong', symbol: `${stub.uniqueId}` },
      lastUpdateModeParameterId: { type: 'uinteger', value: stub.lastUpdateModeParameterId },
      lastUpdateTimeParameterId: { type: 'string', value: stub.lastUpdateTimeParameterId },
      lastUpdateModeFilteredStatus: { type: 'uinteger', value: stub.lastUpdateModeFilteredStatus },
      lastUpdateTimeFilteredStatus: { type: 'string', value: stub.lastUpdateTimeFilteredStatus },
    });
    
  });
});
