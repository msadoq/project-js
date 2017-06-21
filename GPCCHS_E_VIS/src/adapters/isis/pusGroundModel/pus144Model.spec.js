// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./pus144Model');
const { getPus144Model } = require('../stubs');



describe('protobuf/isis/pusGroundModel/Pus144Model', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus144Model.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus144Model');
  const fixture = getPus144Model();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      groundDate: { type: 'time', value: fixture.groundDate },
      apid: { type: 'uinteger', value: fixture.apid },
      noOfOnBoardFiles: { type: 'uinteger', value: fixture.noOfOnBoardFiles },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: fixture.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: fixture.pusElement.lastUpdateTime },
      },
      status: { type: 'uinteger', value: fixture.status },
    });
    
    json.pus144OnboardFiles.should.be.an('array').that.have.lengthOf(fixture.pus144OnboardFiles.length);
    for (let i = 0; i < fixture.pus144OnboardFiles.length; i += 1) {
      json.pus144OnboardFiles[i].should.be.an('object').that.have.properties({
        partitionId: { type: 'uinteger', value: fixture.pus144OnboardFiles[i].partitionId },
        fileProtectionStatus: { type: 'uinteger', value: fixture.pus144OnboardFiles[i].fileProtectionStatus },
        fileId: { type: 'uinteger', value: fixture.pus144OnboardFiles[i].fileId },
        fileAddress: { type: 'uinteger', value: fixture.pus144OnboardFiles[i].fileAddress },
        fileSize: { type: 'uinteger', value: fixture.pus144OnboardFiles[i].fileSize },
        uploadedFileChecksum: { type: 'uinteger', value: fixture.pus144OnboardFiles[i].uploadedFileChecksum },
        fileType: { type: 'string', value: fixture.pus144OnboardFiles[i].fileType },
        fileMode: { type: 'uinteger', value: fixture.pus144OnboardFiles[i].fileMode },
        fileCreationTime: { type: 'time', value: fixture.pus144OnboardFiles[i].fileCreationTime },
        computedFileChecksum: { type: 'uinteger', value: fixture.pus144OnboardFiles[i].computedFileChecksum },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: fixture.pus144OnboardFiles[i].pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: fixture.pus144OnboardFiles[i].pusElement.lastUpdateTime },
        },
      });
      
    }
  });
});
