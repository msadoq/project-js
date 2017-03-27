// Produced by Acceleo JavaScript Generator 1.1.0
require('../../../../utils/test');
const stubData = require('../../../../stubs/data');

const protobuf = require('../../../index');



describe('protobuf/lpisis/pusGroundModel/Pus005Model', () => {
  const fixture = stubData.getPus005Model();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.pusGroundModel.Pus005Model', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.pusGroundModel.Pus005Model', buffer);
    json.should.be.an('object').that.have.properties({
      apid: { type: 'uinteger', value: fixture.apid },
      groundDate: { type: 'time', value: fixture.groundDate },
      noMonitoringEvents: { type: 'uinteger', value: fixture.noMonitoringEvents },
      noEventReports: { type: 'uinteger', value: fixture.noEventReports },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: fixture.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: fixture.pusElement.lastUpdateTime },
      },
    });
    json.pus005OnBoardEvent.should.be.an('array').that.have.lengthOf(fixture.pus005OnBoardEvent.length);
    for (let i = 0; i < fixture.pus005OnBoardEvent.length; i += 1) {
      json.pus005OnBoardEvent[i].should.be.an('object').that.have.properties({
        reportId: { type: 'uinteger', value: fixture.pus005OnBoardEvent[i].reportId },
        onBoardStatus: { type: 'uinteger', value: fixture.pus005OnBoardEvent[i].onBoardStatus },
        alarmLevel: { type: 'string', value: fixture.pus005OnBoardEvent[i].alarmLevel },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: fixture.pus005OnBoardEvent[i].pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: fixture.pus005OnBoardEvent[i].pusElement.lastUpdateTime },
        },
      });
      
    }
  });
});

