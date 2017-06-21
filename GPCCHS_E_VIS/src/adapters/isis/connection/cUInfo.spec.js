// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./cUInfo');
const { getCUInfo } = require('../stubs');



describe('protobuf/isis/connection/CUInfo', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/CUInfo.proto`, { keepCase: true })
    .lookup('connection.protobuf.CUInfo');
  const fixture = getCUInfo();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      isSLE: { type: 'boolean', value: fixture.isSLE },
      reconnectionNumber: (typeof fixture.reconnectionNumber === 'undefined')
        ? null
        : { type: 'integer', value: fixture.reconnectionNumber },
      reconnectionDelay: (typeof fixture.reconnectionDelay === 'undefined')
        ? null
        : { type: 'integer', value: fixture.reconnectionDelay },
      name: { type: 'string', value: fixture.name },
      sicFile: (typeof fixture.sicFile === 'undefined')
        ? null
        : { type: 'string', value: fixture.sicFile },
    });
    
    
  });
});
