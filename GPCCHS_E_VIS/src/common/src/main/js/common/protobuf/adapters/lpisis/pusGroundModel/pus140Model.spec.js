// Produced by Acceleo JavaScript Generator 1.1.0
require('../../../../utils/test');
const stubData = require('../../../stubs/index');

const protobuf = require('../../../index');


describe('protobuf/lpisis/pusGroundModel/Pus140Model', () => {
  const fixture = stubData.getPus140Model();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.pusGroundModel.Pus140Model', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.pusGroundModel.Pus140Model', buffer);
    json.should.be.an('object').that.have.properties({
      groundDate: { type: 'time', value: fixture.groundDate },
      apid: { type: 'uinteger', value: fixture.apid },
      noOfParameters: { type: 'uinteger', value: fixture.noOfParameters },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: fixture.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: fixture.pusElement.lastUpdateTime },
      },
    });
    json.pus140Parameter.should.be.an('array').that.have.lengthOf(fixture.pus140Parameter.length);
    for (let i = 0; i < fixture.pus140Parameter.length; i += 1) {
      json.pus140Parameter[i].should.be.an('object').that.have.properties({
        parameterId: { type: 'uinteger', value: fixture.pus140Parameter[i].parameterId },
        apid: { type: 'uinteger', value: fixture.pus140Parameter[i].apid },
        currentValue: { type: 'double', symbol: fixture.pus140Parameter[i].currentValue.toString() },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: fixture.pus140Parameter[i].pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: fixture.pus140Parameter[i].pusElement.lastUpdateTime },
        },
      });
    }
  });
});

