// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./parameter');
const { getParameter } = require('../stubs');

const validityState = require('../ccsds_mc/validityState');

describe('protobuf/isis/ccsds_mc_aggregation/Parameter', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Parameter.proto`, { keepCase: true })
    .lookup('ccsds_mc_aggregation.protobuf.Parameter');
  const fixture = getParameter();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      definition: {
        objectType: {
          area: { type: 'ushort', value: fixture.definition.objectType.area },
          service: { type: 'ushort', value: fixture.definition.objectType.service },
          version: { type: 'uoctet', value: fixture.definition.objectType.version },
          number: { type: 'ushort', value: fixture.definition.objectType.number },
        },
        objectKey: {
          domaineId: { type: 'ushort', value: fixture.definition.objectKey.domaineId },
          uid: { type: 'long', symbol: `${fixture.definition.objectKey.uid}` },
        },
      },
      extractedValue: { type: 'double', symbol: fixture.extractedValue.toString() },
      rawValue: { type: 'double', symbol: fixture.rawValue.toString() },
      convertedValue: { type: 'double', symbol: fixture.convertedValue.toString() },
      triggerCounter: { type: 'ushort', value: fixture.triggerCounter },
      monitoringState: { type: 'string', value: fixture.monitoringState },
      validityState: { type: 'enum', value: fixture.validityState, symbol: validityState[fixture.validityState] },
    });
    
    
  });
});
