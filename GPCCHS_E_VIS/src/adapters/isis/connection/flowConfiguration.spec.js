// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./flowConfiguration');
const { getFlowConfiguration } = require('../stubs');



describe('protobuf/isis/connection/FlowConfiguration', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/FlowConfiguration.proto`, { keepCase: true })
    .lookup('connection.protobuf.FlowConfiguration');
  const fixture = getFlowConfiguration();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      reconnectionDelay: (typeof fixture.reconnectionDelay === 'undefined')
        ? null
        : { type: 'integer', value: fixture.reconnectionDelay },
      reconnectionNumber: (typeof fixture.reconnectionNumber === 'undefined')
        ? null
        : { type: 'integer', value: fixture.reconnectionNumber },
    });
    
    json.configurationFiles.should.be.an('array').that.have.lengthOf(fixture.configurationFiles.length);
    for (let i = 0; i < fixture.configurationFiles.length; i += 1) {
      json.configurationFiles[i].should.have.properties({
        type: 'uri',
        value: fixture.configurationFiles[i],
      });
    }
  });
});
