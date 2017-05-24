// Produced by Acceleo JavaScript Generator 1.1.0
require('../../../../utils/test');
const stubData = require('../../../stubs/index');

const protobuf = require('../../../index');


describe('protobuf/lpisis/pusGroundModel/Pus144Model', () => {
  const fixture = stubData.getPus144Model();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.pusGroundModel.Pus144Model', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.pusGroundModel.Pus144Model', buffer);
    json.should.be.an('object').that.have.properties({
      groundDate: { type: 'time', value: fixture.groundDate },
      apid: { type: 'uinteger', value: fixture.apid },
      noOfOnBoardFiles: { type: 'uinteger', value: fixture.noOfOnBoardFiles },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: fixture.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: fixture.pusElement.lastUpdateTime },
      },
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

