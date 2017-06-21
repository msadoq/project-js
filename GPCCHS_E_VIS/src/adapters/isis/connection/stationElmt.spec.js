// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./stationElmt');
const { getStationElmt } = require('../stubs');



describe('protobuf/isis/connection/StationElmt', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/StationElmt.proto`, { keepCase: true })
    .lookup('connection.protobuf.StationElmt');
  const fixture = getStationElmt();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      stationId: { type: 'string', value: fixture.stationId },
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
