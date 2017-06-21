// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./pus011CommandParameter');
const { getPus011CommandParameter } = require('../stubs');



describe('protobuf/isis/pusGroundModel/Pus011CommandParameter', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus011CommandParameter.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus011CommandParameter');
  const fixture = getPus011CommandParameter();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      parameterName: { type: 'string', value: fixture.parameterName },
      parameterValue: { type: 'double', symbol: fixture.parameterValue.toString() },
    });
    
    
  });
});
