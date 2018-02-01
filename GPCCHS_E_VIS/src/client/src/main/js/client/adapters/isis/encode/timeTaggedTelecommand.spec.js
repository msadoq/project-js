// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./timeTaggedTelecommand');
const stub = require('./timeTaggedTelecommand.stub')();



describe('protobuf/isis/encode/TimeTaggedTelecommand', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/TimeTaggedTelecommand.proto`, { keepCase: true })
    .lookup('encode.protobuf.TimeTaggedTelecommand');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      ackField: { type: 'uinteger', value: stub.ackField },
      sourceId: { type: 'uinteger', value: stub.sourceId },
      subScheduledId: { type: 'uinteger', value: stub.subScheduledId },
    });
    expect(decoded.definitionIds).toHaveLength(stub.definitionIds.length);
    for (let i = 0; i < stub.definitionIds.length; i += 1) {
      expect(decoded.definitionIds[i]).toMatchObject({
        type: 'identifier',
        value: stub.definitionIds[i],
      });
    }
    expect(decoded.dates).toHaveLength(stub.dates.length);
    for (let i = 0; i < stub.dates.length; i += 1) {
      expect(decoded.dates[i]).toMatchObject({
        type: 'time',
        value: stub.dates[i],
      });
    }
    expect(decoded.rawValues).toHaveLength(stub.rawValues.length);
    for (let i = 0; i < stub.rawValues.length; i += 1) {
      expect(decoded.rawValues[i]).toMatchObject({
        type: 'blob',
        value: stub.rawValues[i],
      });
    }
  });
});
