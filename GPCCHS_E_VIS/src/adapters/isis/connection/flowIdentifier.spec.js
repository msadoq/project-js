// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./flowIdentifier');
const { getFlowIdentifier } = require('../stubs');



describe('protobuf/isis/connection/FlowIdentifier', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/FlowIdentifier.proto`, { keepCase: true })
    .lookup('connection.protobuf.FlowIdentifier');
  const fixture = getFlowIdentifier();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      flowID: { type: 'long', symbol: `${fixture.flowID}` },
      spacecraftID: { type: 'string', value: fixture.spacecraftID },
      stationID: { type: 'string', value: fixture.stationID },
      flowInfo: (typeof fixture.flowInfo === 'undefined')
        ? null
        : {
          name: { type: 'string', value: fixture.flowInfo.name },
          isDefault: { type: 'boolean', value: fixture.flowInfo.isDefault },
        },
    });
    
    
  });
});
