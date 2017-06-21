// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./pusParameter');
const { getPusParameter } = require('../stubs');



describe('protobuf/isis/pusGroundModel/PusParameter', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/PusParameter.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.PusParameter');
  const fixture = getPusParameter();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      parameterId: { type: 'uinteger', value: fixture.parameterId },
      parameterName: { type: 'string', value: fixture.parameterName },
      value: { type: 'double', symbol: fixture.value.toString() },
    });
    
    
  });
});
