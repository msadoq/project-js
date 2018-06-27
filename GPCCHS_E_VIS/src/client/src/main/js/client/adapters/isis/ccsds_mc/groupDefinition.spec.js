// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./groupDefinition');
const stub = require('./groupDefinition.stub')();



describe('protobuf/isis/ccsds_mc/GroupDefinition', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/GroupDefinition.proto`, { keepCase: true })
    .lookup('ccsds_mc.protobuf.GroupDefinition');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      name: { type: 'identifier', value: stub.name },
      description: { type: 'string', value: stub.description },
      objectType: {
        area: { type: 'ushort', value: stub.objectType.area },
        service: { type: 'ushort', value: stub.objectType.service },
        version: { type: 'uoctet', value: stub.objectType.version },
        number: { type: 'ushort', value: stub.objectType.number },
      },
      domain: { type: 'ushort', value: stub.domain },
    });
    expect(decoded.instanceIds).toHaveLength(stub.instanceIds.length);
    for (let i = 0; i < stub.instanceIds.length; i += 1) {
      expect(decoded.instanceIds[i]).toMatchObject({
        type: 'long',
        symbol: `${stub.instanceIds[i]}`,
      });
    }
  });
});
