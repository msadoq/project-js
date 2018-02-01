// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./compositeFilter');
const stub = require('./compositeFilter.stub')();



describe('protobuf/isis/ccsds_com/CompositeFilter', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/CompositeFilter.proto`, { keepCase: true })
    .lookup('ccsds_com.protobuf.CompositeFilter');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      fieldName: { type: 'string', value: stub.fieldName },
      type: { type: 'uinteger', value: stub.type },
      fieldValue: { type: 'double', symbol: stub.fieldValue.toString() },
    });
    
  });
});
