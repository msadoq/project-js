// Produced by Acceleo JavaScript Generator 1.1.0
require('../../../../utils/test');
const stubData = require('../../../../stubs/data');

const protobuf = require('../../../index');


describe('protobuf/lpisis/lifeCycle/LifeCycleStatus', () => {
  const fixture = stubData.getLifeCycleStatus();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.lifeCycle.LifeCycleStatus', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.lifeCycle.LifeCycleStatus', buffer);
    json.should.be.an('object').that.have.properties({
      status: { type: 'ulong', symbol: `${fixture.status}` },
      statusTime: { type: 'time', value: fixture.statusTime },
    });
  });
});

