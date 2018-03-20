// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./pus144OnboardFiles');
const { getPus144OnboardFiles } = require('../stubs');



describe('protobuf/isis/pusGroundModel/Pus144OnboardFiles', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus144OnboardFiles.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus144OnboardFiles');
  const fixture = getPus144OnboardFiles();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      partitionId: { type: 'string', value: fixture.partitionId },
      fileProtectionStatus: { type: 'string', value: fixture.fileProtectionStatus },
      fileId: { type: 'uinteger', value: fixture.fileId },
      fileAddress: { type: 'string', value: fixture.fileAddress },
      fileSize: { type: 'uinteger', value: fixture.fileSize },
      uploadedFileChecksum: { type: 'string', value: fixture.uploadedFileChecksum },
      fileType: { type: 'string', value: fixture.fileType },
      fileMode: { type: 'string', value: fixture.fileMode },
      fileCreationTime: { type: 'time', value: fixture.fileCreationTime },
      computedFileChecksum: { type: 'string', value: fixture.computedFileChecksum },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: fixture.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: fixture.pusElement.lastUpdateTime },
      },
      isFileSizeSet: { type: 'boolean', value: fixture.isFileSizeSet },
    });
    
    
  });
});
