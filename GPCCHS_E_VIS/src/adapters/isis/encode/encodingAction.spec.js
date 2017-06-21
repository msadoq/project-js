// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./encodingAction');
const { getEncodingAction } = require('../stubs');



describe('protobuf/isis/encode/EncodingAction', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/EncodingAction.proto`, { keepCase: true })
    .lookup('encode.protobuf.EncodingAction');
  const fixture = getEncodingAction();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      sourceId: (typeof fixture.sourceId === 'undefined')
        ? null
        : { type: 'uinteger', value: fixture.sourceId },
      isForSending: (typeof fixture.isForSending === 'undefined')
        ? null
        : { type: 'boolean', value: fixture.isForSending },
      countOverwriteFlag: (typeof fixture.countOverwriteFlag === 'undefined')
        ? null
        : { type: 'boolean', value: fixture.countOverwriteFlag },
      preencryptedFlag: (typeof fixture.preencryptedFlag === 'undefined')
        ? null
        : { type: 'boolean', value: fixture.preencryptedFlag },
      ackField: (typeof fixture.ackField === 'undefined')
        ? null
        : { type: 'uinteger', value: fixture.ackField },
    });
    
    json.argumentValues.should.be.an('array').that.have.lengthOf(fixture.argumentValues.length);
    for (let i = 0; i < fixture.argumentValues.length; i += 1) {
      json.argumentValues[i].should.be.an('object').that.have.properties({
        value: { type: 'double', symbol: fixture.argumentValues[i].value.toString() },
      });
      
    }
    json.argumentDefinitions.should.be.an('array').that.have.lengthOf(fixture.argumentDefinitions.length);
    for (let i = 0; i < fixture.argumentDefinitions.length; i += 1) {
      json.argumentDefinitions[i].should.have.properties({
        type: 'identifier',
        value: fixture.argumentDefinitions[i],
      });
    }
    json.isConvertedValues.should.be.an('array').that.have.lengthOf(fixture.isConvertedValues.length);
    for (let i = 0; i < fixture.isConvertedValues.length; i += 1) {
      json.isConvertedValues[i].should.have.properties({
        type: 'boolean',
        value: fixture.isConvertedValues[i],
      });
    }
  });
});
