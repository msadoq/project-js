// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./stationList');
const { getStationList } = require('../stubs');



describe('protobuf/isis/connection/StationList', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/StationList.proto`, { keepCase: true })
    .lookup('connection.protobuf.StationList');
  const fixture = getStationList();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      
    });
    
    json.stationElmts.should.be.an('array').that.have.lengthOf(fixture.stationElmts.length);
    for (let i = 0; i < fixture.stationElmts.length; i += 1) {
      json.stationElmts[i].should.be.an('object').that.have.properties({
        stationId: { type: 'string', value: fixture.stationElmts[i].stationId },
        configuration: (typeof fixture.stationElmts[i].configuration === 'undefined')
          ? null
          : {
            reconnectionDelay: (typeof fixture.stationElmts[i].configuration.reconnectionDelay === 'undefined')
              ? null
              : { type: 'integer', value: fixture.stationElmts[i].configuration.reconnectionDelay },
            reconnectionNumber: (typeof fixture.stationElmts[i].configuration.reconnectionNumber === 'undefined')
              ? null
              : { type: 'integer', value: fixture.stationElmts[i].configuration.reconnectionNumber },
          },
      });
      
    }
  });
});
