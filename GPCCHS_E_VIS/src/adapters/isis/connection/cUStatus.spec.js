// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./cUStatus');
const { getCUStatus } = require('../stubs');

const cUState = require('./cUState');

describe('protobuf/isis/connection/CUStatus', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/CUStatus.proto`, { keepCase: true })
    .lookup('connection.protobuf.CUStatus');
  const fixture = getCUStatus();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      state: { type: 'enum', value: fixture.state, symbol: cUState[fixture.state] },
      sLEReport: (typeof fixture.sLEReport === 'undefined')
        ? null
        : { type: 'blob', value: fixture.sLEReport },
    });
    
    
  });
});
