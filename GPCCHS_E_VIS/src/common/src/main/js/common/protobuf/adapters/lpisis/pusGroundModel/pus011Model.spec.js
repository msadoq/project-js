// Produced by Acceleo JavaScript Generator 1.1.0
require('../../../../utils/test');
const stubData = require('../../../../stubs/data');

const protobuf = require('../../../index');



describe('protobuf/lpisis/pusGroundModel/Pus011Model', () => {
  const fixture = stubData.getPus011Model();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.pusGroundModel.Pus011Model', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.pusGroundModel.Pus011Model', buffer);
    json.should.be.an('object').that.have.properties({
      maxNoTc: { type: 'uinteger', value: fixture.maxNoTc },
      scheduleStatus: { type: 'uinteger', value: fixture.scheduleStatus },
      apid: { type: 'uinteger', value: fixture.apid },
      noCommands: { type: 'uinteger', value: fixture.noCommands },
      noSubSchedule: { type: 'uinteger', value: fixture.noSubSchedule },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: fixture.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: fixture.pusElement.lastUpdateTime },
      },
      groundDate: { type: 'time', value: fixture.groundDate },
    });
    json.enabledApids.should.be.an('array').that.have.lengthOf(fixture.enabledApids.length);
    for (let i = 0; i < fixture.enabledApids.length; i += 1) {
      json.enabledApids[i].should.have.properties({
        type: 'uinteger',
        value: fixture.enabledApids[i],
      });
    }
    json.disabledApids.should.be.an('array').that.have.lengthOf(fixture.disabledApids.length);
    for (let i = 0; i < fixture.disabledApids.length; i += 1) {
      json.disabledApids[i].should.have.properties({
        type: 'uinteger',
        value: fixture.disabledApids[i],
      });
    }
  });
});

