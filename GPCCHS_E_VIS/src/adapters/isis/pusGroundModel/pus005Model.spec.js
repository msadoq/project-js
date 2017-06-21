// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./pus005Model');
const { getPus005Model } = require('../stubs');



describe('protobuf/isis/pusGroundModel/Pus005Model', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus005Model.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus005Model');
  const fixture = getPus005Model();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      apid: { type: 'uinteger', value: fixture.apid },
      groundDate: { type: 'time', value: fixture.groundDate },
      noMonitoringEvents: { type: 'uinteger', value: fixture.noMonitoringEvents },
      noEventReports: { type: 'uinteger', value: fixture.noEventReports },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: fixture.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: fixture.pusElement.lastUpdateTime },
      },
      status: { type: 'uinteger', value: fixture.status },
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
        reportIdLabel: { type: 'string', value: fixture.pus005OnBoardEvent[i].reportIdLabel },
      });
      
    }
  });
});
