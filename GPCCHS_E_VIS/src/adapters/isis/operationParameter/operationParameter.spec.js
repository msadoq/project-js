// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
require('../../../utils/test');
const stubData = require('../stubs');

const protobuf = require('../../../protobuf');




describe('protobuf/isis/operationParameter/OperationParameter', () => {
  const fixture = stubData.getOperationParameter();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('isis.operationParameter.OperationParameter', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('isis.operationParameter.OperationParameter', buffer);
    json.should.be.an('object').that.have.properties({
      name: { type: 'string', value: fixture.name },
      timestamp: { type: 'finetime', value: fixture.timestamp },
      value: { type: 'double', symbol: fixture.value.toString() },
    });
    
    
  });
});

