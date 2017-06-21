// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./pus013LdtPart');
const { getPus013LdtPart } = require('../stubs');



describe('protobuf/isis/pusGroundModel/Pus013LdtPart', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus013LdtPart.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus013LdtPart');
  const fixture = getPus013LdtPart();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      status: { type: 'uinteger', value: fixture.status },
      partSize: { type: 'uinteger', value: fixture.partSize },
      partId: { type: 'uinteger', value: fixture.partId },
      sourceId: { type: 'uinteger', value: fixture.sourceId },
      commandApid: { type: 'uinteger', value: fixture.commandApid },
      sequenceCount: { type: 'uinteger', value: fixture.sequenceCount },
      serviceDataUnit: { type: 'blob', value: fixture.serviceDataUnit },
    });
    
    
  });
});
