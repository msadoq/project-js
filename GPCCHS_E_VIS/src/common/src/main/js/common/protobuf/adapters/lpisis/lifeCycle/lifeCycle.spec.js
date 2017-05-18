// Produced by Acceleo JavaScript Generator 1.1.0
require('../../../../utils/test');
const stubData = require('../../../../stubs/data');

const protobuf = require('../../../index');


describe('protobuf/lpisis/lifeCycle/LifeCycle', () => {
  const fixture = stubData.getLifeCycle();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.lifeCycle.LifeCycle', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.lifeCycle.LifeCycle', buffer);
    json.should.be.an('object').that.have.properties({
      launchingParameters: { type: 'double', symbol: fixture.launchingParameters.toString() },
      launchingTime: { type: 'time', value: fixture.launchingTime },
    });
  });
});

