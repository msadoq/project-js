// Produced by Acceleo JavaScript Generator 1.1.0
require('../../../../utils/test');
const stubData = require('../../../../stubs/data');

const protobuf = require('../../../index');



describe('protobuf/lpisis/pusGroundModel/Pus019Model', () => {
  const fixture = stubData.getPus019Model();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.pusGroundModel.Pus019Model', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.pusGroundModel.Pus019Model', buffer);
    json.should.be.an('object').that.have.properties({
      serviceStatus: { type: 'uinteger', value: fixture.serviceStatus },
      noOfEventActions: { type: 'uinteger', value: fixture.noOfEventActions },
      groundDate: { type: 'time', value: fixture.groundDate },
      apid: { type: 'uinteger', value: fixture.apid },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: fixture.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: fixture.pusElement.lastUpdateTime },
      },
    });
    json.pus19EventAction.should.be.an('array').that.have.lengthOf(fixture.pus19EventAction.length);
    for (let i = 0; i < fixture.pus19EventAction.length; i += 1) {
      json.pus19EventAction[i].should.be.an('object').that.have.properties({
        apid: { type: 'uinteger', value: fixture.pus19EventAction[i].apid },
        rid: { type: 'uinteger', value: fixture.pus19EventAction[i].rid },
        actionStatus: { type: 'uinteger', value: fixture.pus19EventAction[i].actionStatus },
        actionTcPacketHeader: { type: 'blob', value: fixture.pus19EventAction[i].actionTcPacketHeader },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: fixture.pus19EventAction[i].pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: fixture.pus19EventAction[i].pusElement.lastUpdateTime },
        },
      });
      
    }
  });
});

