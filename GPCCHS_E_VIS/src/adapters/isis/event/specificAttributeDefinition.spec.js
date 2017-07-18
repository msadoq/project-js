// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./specificAttributeDefinition');
const stub = require('./specificAttributeDefinition.stub')();



describe('protobuf/isis/event/SpecificAttributeDefinition', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/SpecificAttributeDefinition.proto`, { keepCase: true })
    .lookup('event.protobuf.SpecificAttributeDefinition');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      name: { type: 'identifier', value: stub.name },
      type: { type: 'ulong', symbol: `${stub.type}` },
      workingUnit: { type: 'string', value: stub.workingUnit },
      displayUnit: { type: 'string', value: stub.displayUnit },
      format: { type: 'string', value: stub.format },
    });
    
  });
});
