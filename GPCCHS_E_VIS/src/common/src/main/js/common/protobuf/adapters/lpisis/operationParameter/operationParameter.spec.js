// Produced by Acceleo JavaScript Generator 1.1.0
require('../../../../utils/test');
const stubData = require('../.././index');

const protobuf = require('../../../index');


describe('protobuf/lpisis/operationParameter/OperationParameter', () => {
  const fixture = stubData.getOperationParameter();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.operationParameter.OperationParameter', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.operationParameter.OperationParameter', buffer);
    json.should.be.an('object').that.have.properties({
      name: { type: 'string', value: fixture.name },
      timestamp: { type: 'finetime', value: fixture.timestamp },
      value: { type: 'double', symbol: fixture.value.toString() },
    });
  });
});

