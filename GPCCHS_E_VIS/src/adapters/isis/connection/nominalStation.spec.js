// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./nominalStation');
const { getNominalStation } = require('../stubs');



describe('protobuf/isis/connection/NominalStation', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/NominalStation.proto`, { keepCase: true })
    .lookup('connection.protobuf.NominalStation');
  const fixture = getNominalStation();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      identifier: (typeof fixture.identifier === 'undefined')
        ? null
        : {
          spacecraftID: { type: 'string', value: fixture.identifier.spacecraftID },
          stationID: { type: 'string', value: fixture.identifier.stationID },
        },
      nominal: { type: 'boolean', value: fixture.nominal },
    });
    
    
  });
});
