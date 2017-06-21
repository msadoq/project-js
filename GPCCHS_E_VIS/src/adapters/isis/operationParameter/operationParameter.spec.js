// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./operationParameter');
const { getOperationParameter } = require('../stubs');



describe('protobuf/isis/operationParameter/OperationParameter', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/OperationParameter.proto`, { keepCase: true })
    .lookup('operationParameter.protobuf.OperationParameter');
  const fixture = getOperationParameter();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      name: { type: 'string', value: fixture.name },
      timestamp: { type: 'finetime', value: fixture.timestamp },
      value: { type: 'double', symbol: fixture.value.toString() },
    });
    
    
  });
});
