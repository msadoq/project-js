// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./processFullState');
const { getProcessFullState } = require('../stubs');

const processState = require('./processState');

describe('protobuf/isis/connection/ProcessFullState', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/ProcessFullState.proto`, { keepCase: true })
    .lookup('connection.protobuf.ProcessFullState');
  const fixture = getProcessFullState();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      processState: { type: 'enum', value: fixture.processState, symbol: processState[fixture.processState] },
      processId: { type: 'long', symbol: `${fixture.processId}` },
      functionOId: { type: 'string', value: fixture.functionOId },
    });
    
    
  });
});
