// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./initFlowConfiguration');
const { getInitFlowConfiguration } = require('../stubs');



describe('protobuf/isis/connection/InitFlowConfiguration', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/InitFlowConfiguration.proto`, { keepCase: true })
    .lookup('connection.protobuf.InitFlowConfiguration');
  const fixture = getInitFlowConfiguration();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      configuration: (typeof fixture.configuration === 'undefined')
        ? null
        : {
          reconnectionDelay: (typeof fixture.configuration.reconnectionDelay === 'undefined')
            ? null
            : { type: 'integer', value: fixture.configuration.reconnectionDelay },
          reconnectionNumber: (typeof fixture.configuration.reconnectionNumber === 'undefined')
            ? null
            : { type: 'integer', value: fixture.configuration.reconnectionNumber },
        },
      identifier: {
        flowID: { type: 'long', symbol: `${fixture.identifier.flowID}` },
        spacecraftID: { type: 'string', value: fixture.identifier.spacecraftID },
        stationID: { type: 'string', value: fixture.identifier.stationID },
        flowInfo: (typeof fixture.identifier.flowInfo === 'undefined')
          ? null
          : {
            name: { type: 'string', value: fixture.identifier.flowInfo.name },
            isDefault: { type: 'boolean', value: fixture.identifier.flowInfo.isDefault },
          },
      },
    });
    
    
  });
});
