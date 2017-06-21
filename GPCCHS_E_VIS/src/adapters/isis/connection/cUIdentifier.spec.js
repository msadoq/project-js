// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./cUIdentifier');
const { getCUIdentifier } = require('../stubs');



describe('protobuf/isis/connection/CUIdentifier', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/CUIdentifier.proto`, { keepCase: true })
    .lookup('connection.protobuf.CUIdentifier');
  const fixture = getCUIdentifier();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      cUID: { type: 'long', symbol: `${fixture.cUID}` },
      channelName: { type: 'string', value: fixture.channelName },
      spacecraftID: { type: 'string', value: fixture.spacecraftID },
      stationID: { type: 'string', value: fixture.stationID },
      flowID: { type: 'long', symbol: `${fixture.flowID}` },
      cUInfo: (typeof fixture.cUInfo === 'undefined')
        ? null
        : {
          isSLE: { type: 'boolean', value: fixture.cUInfo.isSLE },
          reconnectionNumber: (typeof fixture.cUInfo.reconnectionNumber === 'undefined')
            ? null
            : { type: 'integer', value: fixture.cUInfo.reconnectionNumber },
          reconnectionDelay: (typeof fixture.cUInfo.reconnectionDelay === 'undefined')
            ? null
            : { type: 'integer', value: fixture.cUInfo.reconnectionDelay },
          name: { type: 'string', value: fixture.cUInfo.name },
          sicFile: (typeof fixture.cUInfo.sicFile === 'undefined')
            ? null
            : { type: 'string', value: fixture.cUInfo.sicFile },
        },
    });
    
    
  });
});
