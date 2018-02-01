// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./isisFilterSet');
const stub = require('./isisFilterSet.stub')();



describe('protobuf/isis/queries/IsisFilterSet', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/IsisFilterSet.proto`, { keepCase: true })
    .lookup('queries.protobuf.IsisFilterSet');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      mapFunction: { type: 'string', value: stub.mapFunction },
    });
    expect(decoded.compositeFilter).toHaveLength(stub.compositeFilter.length);
    for (let i = 0; i < stub.compositeFilter.length; i += 1) {
      expect(decoded.compositeFilter[i]).toMatchObject({
        fieldName: { type: 'string', value: stub.compositeFilter[i].fieldName },
        type: { type: 'uinteger', value: stub.compositeFilter[i].type },
        fieldValue: { type: 'double', symbol: stub.compositeFilter[i].fieldValue.toString() },
      });
      
    }
    expect(decoded.functionAttributes).toHaveLength(stub.functionAttributes.length);
    for (let i = 0; i < stub.functionAttributes.length; i += 1) {
      expect(decoded.functionAttributes[i]).toMatchObject({
        name: { type: 'identifier', value: stub.functionAttributes[i].name },
        value: { type: 'double', symbol: stub.functionAttributes[i].value.toString() },
      });
      
    }
  });
});
