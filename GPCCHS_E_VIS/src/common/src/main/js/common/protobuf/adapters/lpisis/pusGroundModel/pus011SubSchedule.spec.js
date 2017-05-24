// Produced by Acceleo JavaScript Generator 1.1.0
require('../../../../utils/test');
const stubData = require('../../../stubs/index');

const protobuf = require('../../../index');


describe('protobuf/lpisis/pusGroundModel/Pus011SubSchedule', () => {
  const fixture = stubData.getPus011SubSchedule();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.pusGroundModel.Pus011SubSchedule', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.pusGroundModel.Pus011SubSchedule', buffer);
    json.should.be.an('object').that.have.properties({
      ssId: { type: 'uinteger', value: fixture.ssId },
      status: { type: 'uinteger', value: fixture.status },
      executionTimeFirstTc: { type: 'ulong', symbol: `${fixture.executionTimeFirstTc}` },
      apid: { type: 'uinteger', value: fixture.apid },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: fixture.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: fixture.pusElement.lastUpdateTime },
      },
      groundDate: { type: 'time', value: fixture.groundDate },
    });
  });
});

