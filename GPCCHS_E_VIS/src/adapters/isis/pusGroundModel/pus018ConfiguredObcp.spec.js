// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./pus018ConfiguredObcp');
const { getPus018ConfiguredObcp } = require('../stubs');



describe('protobuf/isis/pusGroundModel/Pus018ConfiguredObcp', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus018ConfiguredObcp.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus018ConfiguredObcp');
  const fixture = getPus018ConfiguredObcp();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      id: { type: 'uinteger', value: fixture.id },
      hkParamNameForName: { type: 'string', value: fixture.hkParamNameForName },
      hkParamNameForId: { type: 'string', value: fixture.hkParamNameForId },
      hkParamNameForStatus: { type: 'string', value: fixture.hkParamNameForStatus },
      hkParamNameForPriority: { type: 'string', value: fixture.hkParamNameForPriority },
      hkParamNameForStepId: { type: 'string', value: fixture.hkParamNameForStepId },
      status: { type: 'uinteger', value: fixture.status },
      stepId: { type: 'uinteger', value: fixture.stepId },
      priority: { type: 'uinteger', value: fixture.priority },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: fixture.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: fixture.pusElement.lastUpdateTime },
      },
    });
    
    
  });
});
