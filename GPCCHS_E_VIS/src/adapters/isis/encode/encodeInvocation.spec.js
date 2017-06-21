// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./encodeInvocation');
const { getEncodeInvocation } = require('../stubs');

const encodedType = require('./encodedType');
const inputType = require('./inputType');

describe('protobuf/isis/encode/EncodeInvocation', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/EncodeInvocation.proto`, { keepCase: true })
    .lookup('encode.protobuf.EncodeInvocation');
  const fixture = getEncodeInvocation();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      definitionId: { type: 'long', symbol: `${fixture.definitionId}` },
      inputType: { type: 'enum', value: fixture.inputType, symbol: inputType[fixture.inputType] },
      encodingAction: {
        sourceId: (typeof fixture.encodingAction.sourceId === 'undefined')
          ? null
          : { type: 'uinteger', value: fixture.encodingAction.sourceId },
        isForSending: (typeof fixture.encodingAction.isForSending === 'undefined')
          ? null
          : { type: 'boolean', value: fixture.encodingAction.isForSending },
        countOverwriteFlag: (typeof fixture.encodingAction.countOverwriteFlag === 'undefined')
          ? null
          : { type: 'boolean', value: fixture.encodingAction.countOverwriteFlag },
        preencryptedFlag: (typeof fixture.encodingAction.preencryptedFlag === 'undefined')
          ? null
          : { type: 'boolean', value: fixture.encodingAction.preencryptedFlag },
        ackField: (typeof fixture.encodingAction.ackField === 'undefined')
          ? null
          : { type: 'uinteger', value: fixture.encodingAction.ackField },
      },
      encodedType: { type: 'enum', value: fixture.encodedType, symbol: encodedType[fixture.encodedType] },
    });
    
    
  });
});
