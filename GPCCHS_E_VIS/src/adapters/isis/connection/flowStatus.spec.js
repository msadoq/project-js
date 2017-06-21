// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./flowStatus');
const { getFlowStatus } = require('../stubs');

const cUState = require('./cUState');
const processState = require('./processState');
const synthesisState = require('./synthesisState');

describe('protobuf/isis/connection/FlowStatus', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/FlowStatus.proto`, { keepCase: true })
    .lookup('connection.protobuf.FlowStatus');
  const fixture = getFlowStatus();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      status: {
        state: { type: 'enum', value: fixture.status.state, symbol: synthesisState[fixture.status.state] },
      },
    });
    
    
  });
});
