// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./pus013Ldt');
const { getPus013Ldt } = require('../stubs');



describe('protobuf/isis/pusGroundModel/Pus013Ldt', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus013Ldt.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus013Ldt');
  const fixture = getPus013Ldt();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      startTime: { type: 'time', value: fixture.startTime },
      endTime: { type: 'time', value: fixture.endTime },
      transferType: { type: 'uinteger', value: fixture.transferType },
      lduId: { type: 'uinteger', value: fixture.lduId },
      status: { type: 'uinteger', value: fixture.status },
      size: { type: 'uinteger', value: fixture.size },
      remainingSize: { type: 'integer', value: fixture.remainingSize },
      percent: { type: 'uinteger', value: fixture.percent },
      failureCode: { type: 'uinteger', value: fixture.failureCode },
      fileId: { type: 'uinteger', value: fixture.fileId },
      partitionId: { type: 'uinteger', value: fixture.partitionId },
      fileChecksum: { type: 'string', value: fixture.fileChecksum },
      fileTypeCode: { type: 'uinteger', value: fixture.fileTypeCode },
      noLDTParts: { type: 'uinteger', value: fixture.noLDTParts },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: fixture.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: fixture.pusElement.lastUpdateTime },
      },
    });
    
    json.pUS013LdtPart.should.be.an('array').that.have.lengthOf(fixture.pUS013LdtPart.length);
    for (let i = 0; i < fixture.pUS013LdtPart.length; i += 1) {
      json.pUS013LdtPart[i].should.be.an('object').that.have.properties({
        status: { type: 'uinteger', value: fixture.pUS013LdtPart[i].status },
        partSize: { type: 'uinteger', value: fixture.pUS013LdtPart[i].partSize },
        partId: { type: 'uinteger', value: fixture.pUS013LdtPart[i].partId },
        sourceId: { type: 'uinteger', value: fixture.pUS013LdtPart[i].sourceId },
        commandApid: { type: 'uinteger', value: fixture.pUS013LdtPart[i].commandApid },
        sequenceCount: { type: 'uinteger', value: fixture.pUS013LdtPart[i].sequenceCount },
        serviceDataUnit: { type: 'blob', value: fixture.pUS013LdtPart[i].serviceDataUnit },
      });
      
    }
  });
});
