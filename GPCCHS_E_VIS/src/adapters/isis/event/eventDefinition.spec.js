// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./eventDefinition');
const stub = require('./eventDefinition.stub')();



describe('protobuf/isis/event/EventDefinition', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/EventDefinition.proto`, { keepCase: true })
    .lookup('event.protobuf.EventDefinition');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      name: { type: 'identifier', value: stub.name },
    });
    expect(decoded.pattern).toHaveLength(stub.pattern.length);
    for (let i = 0; i < stub.pattern.length; i += 1) {
      expect(decoded.pattern[i]).toMatchObject({
        name: { type: 'identifier', value: stub.pattern[i].name },
        value: { type: 'double', symbol: stub.pattern[i].value.toString() },
      });
      
    }
  });
});
