// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./indexedValue');
const { getIndexedValue } = require('../stubs');



describe('protobuf/isis/ccsds_mal/IndexedValue', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/IndexedValue.proto`, { keepCase: true })
    .lookup('ccsds_mal.protobuf.IndexedValue');
  const fixture = getIndexedValue();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      _index: { type: 'ushort', value: fixture._index },
      _value: { type: 'double', symbol: fixture._value.toString() },
    });
    
    
  });
});
