// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./pus011EncapsulatingTc');
const { getPus011EncapsulatingTc } = require('../stubs');



describe('protobuf/isis/pusGroundModel/Pus011EncapsulatingTc', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus011EncapsulatingTc.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus011EncapsulatingTc');
  const fixture = getPus011EncapsulatingTc();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      sourceId: { type: 'uinteger', value: fixture.sourceId },
      commandApid: { type: 'uinteger', value: fixture.commandApid },
      sequenceCount: { type: 'uinteger', value: fixture.sequenceCount },
    });
    
    
  });
});
