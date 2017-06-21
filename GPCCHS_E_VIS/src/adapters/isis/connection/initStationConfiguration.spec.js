// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./initStationConfiguration');
const { getInitStationConfiguration } = require('../stubs');



describe('protobuf/isis/connection/InitStationConfiguration', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/InitStationConfiguration.proto`, { keepCase: true })
    .lookup('connection.protobuf.InitStationConfiguration');
  const fixture = getInitStationConfiguration();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      identifier: {
        spacecraftID: { type: 'string', value: fixture.identifier.spacecraftID },
        stationID: { type: 'string', value: fixture.identifier.stationID },
      },
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
    });
    
    
  });
});
