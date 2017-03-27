// Produced by Acceleo JavaScript Generator 1.1.0
require('../../../../utils/test');
const stubData = require('../../../../stubs/data');

const protobuf = require('../../../index');



describe('protobuf/lpisis/groundAlarm/GroundMonitoringAlarm', () => {
  const fixture = stubData.getGroundMonitoringAlarm();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.groundAlarm.GroundMonitoringAlarm', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.groundAlarm.GroundMonitoringAlarm', buffer);
    json.should.be.an('object').that.have.properties({
      creationDate: { type: 'time', value: fixture.creationDate },
      paramUid: { type: 'long', symbol: `${fixture.paramUid}` },
      updateDate: { type: 'time', value: fixture.updateDate },
      closingDate: { type: 'time', value: fixture.closingDate },
      hasAckRequest: { type: 'boolean', value: fixture.hasAckRequest },
      alarmId: { type: 'long', symbol: `${fixture.alarmId}` },
      isNominal: { type: 'boolean', value: fixture.isNominal },
    });
    json.transitions.should.be.an('array').that.have.lengthOf(fixture.transitions.length);
    for (let i = 0; i < fixture.transitions.length; i += 1) {
      json.transitions[i].should.be.an('object').that.have.properties({
        onboardDate: { type: 'time', value: fixture.transitions[i].onboardDate },
        groundDate: { type: 'time', value: fixture.transitions[i].groundDate },
        convertedValue: { type: 'double', value: fixture.transitions[i].convertedValue },
        extractedValue: { type: 'double', value: fixture.transitions[i].extractedValue },
        rawValue: { type: 'double', value: fixture.transitions[i].rawValue },
        monitoringState: { type: 'string', value: fixture.transitions[i].monitoringState },
      });
      
    }
  });
});

