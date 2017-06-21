// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./stationIdentifier');
const { getStationIdentifier } = require('../stubs');



describe('protobuf/isis/connection/StationIdentifier', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/StationIdentifier.proto`, { keepCase: true })
    .lookup('connection.protobuf.StationIdentifier');
  const fixture = getStationIdentifier();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      spacecraftID: { type: 'string', value: fixture.spacecraftID },
      stationID: { type: 'string', value: fixture.stationID },
    });
    
    
  });
});
