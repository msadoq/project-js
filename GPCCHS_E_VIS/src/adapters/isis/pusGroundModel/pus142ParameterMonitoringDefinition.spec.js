// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./pus142ParameterMonitoringDefinition');
const { getPus142ParameterMonitoringDefinition } = require('../stubs');



describe('protobuf/isis/pusGroundModel/Pus142ParameterMonitoringDefinition', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus142ParameterMonitoringDefinition.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus142ParameterMonitoringDefinition');
  const fixture = getPus142ParameterMonitoringDefinition();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      paramMonId: { type: 'uinteger', value: fixture.paramMonId },
    });
    
    
  });
});
