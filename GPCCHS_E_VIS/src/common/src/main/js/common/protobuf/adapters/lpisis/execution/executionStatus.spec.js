// Produced by Acceleo JavaScript Generator 1.1.0
require('../../../../utils/test');
const stubData = require('../../../stubs/index');

const protobuf = require('../../../index');


describe('protobuf/lpisis/execution/ExecutionStatus', () => {
  const fixture = stubData.getExecutionStatus();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.execution.ExecutionStatus', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.execution.ExecutionStatus', buffer);
    json.should.be.an('object').that.have.properties({
      status: { type: 'integer', value: fixture.status },
      statusTime: { type: 'time', value: fixture.statusTime },
    });
  });
});

