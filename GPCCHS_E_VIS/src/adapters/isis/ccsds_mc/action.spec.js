// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./action');
const stub = require('./action.stub')();



describe('protobuf/isis/ccsds_mc/Action', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Action.proto`, { keepCase: true })
    .lookup('ccsds_mc.protobuf.Action');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      stageStartedRequired: { type: 'boolean', value: stub.stageStartedRequired },
      stageProgressRequired: { type: 'boolean', value: stub.stageProgressRequired },
      stageCompletedRequired: { type: 'boolean', value: stub.stageCompletedRequired },
      delay: (typeof stub.delay === 'undefined')
        ? null
        : { type: 'uinteger', value: stub.delay },
      tCID: { type: 'long', symbol: `${stub.tCID}` },
    });
    expect(decoded.argumentValues).toHaveLength(stub.argumentValues.length);
    for (let i = 0; i < stub.argumentValues.length; i += 1) {
      expect(decoded.argumentValues[i]).toMatchObject({
        value: { type: 'double', symbol: stub.argumentValues[i].value.toString() },
      });
      
    }
    expect(decoded.argumentIds).toHaveLength(stub.argumentIds.length);
    for (let i = 0; i < stub.argumentIds.length; i += 1) {
      expect(decoded.argumentIds[i]).toMatchObject({
        type: 'long',
        symbol: `${stub.argumentIds[i]}`,
      });
    }
    expect(decoded.isConvertedValues).toHaveLength(stub.isConvertedValues.length);
    for (let i = 0; i < stub.isConvertedValues.length; i += 1) {
      expect(decoded.isConvertedValues[i]).toMatchObject({
        type: 'boolean',
        value: stub.isConvertedValues[i],
      });
    }
  });
});
