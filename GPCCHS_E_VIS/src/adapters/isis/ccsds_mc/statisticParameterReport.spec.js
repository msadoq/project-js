// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./statisticParameterReport');
const { getStatisticParameterReport } = require('../stubs');



describe('protobuf/isis/ccsds_mc/StatisticParameterReport', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/StatisticParameterReport.proto`, { keepCase: true })
    .lookup('ccsds_mc.protobuf.StatisticParameterReport');
  const fixture = getStatisticParameterReport();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      parameterId: {
        domaineId: { type: 'ushort', value: fixture.parameterId.domaineId },
        uid: { type: 'long', symbol: `${fixture.parameterId.uid}` },
      },
      parameterType: (typeof fixture.parameterType === 'undefined')
        ? null
        : {
          area: { type: 'ushort', value: fixture.parameterType.area },
          service: { type: 'ushort', value: fixture.parameterType.service },
          version: { type: 'uoctet', value: fixture.parameterType.version },
          number: { type: 'ushort', value: fixture.parameterType.number },
        },
    });
    
    json.values.should.be.an('array').that.have.lengthOf(fixture.values.length);
    for (let i = 0; i < fixture.values.length; i += 1) {
      json.values[i].should.be.an('object').that.have.properties({
        function: { type: 'long', symbol: `${fixture.values[i].function}` },
      });
      json.values[i].value.should.be.an('array').that.have.lengthOf(fixture.values[i].value.length);
      for (let ii = 0; ii < fixture.values[i].value.length; ii += 1) {
        json.values[i].value[ii].should.be.an('object').that.have.properties({
          startTime: (typeof fixture.values[i].value[ii].startTime === 'undefined')
            ? null
            : { type: 'time', value: fixture.values[i].value[ii].startTime },
          endTime: (typeof fixture.values[i].value[ii].endTime === 'undefined')
            ? null
            : { type: 'time', value: fixture.values[i].value[ii].endTime },
          valueTime: (typeof fixture.values[i].value[ii].valueTime === 'undefined')
            ? null
            : { type: 'time', value: fixture.values[i].value[ii].valueTime },
          value: (typeof fixture.values[i].value[ii].value === 'undefined')
            ? null
            : { type: 'double', symbol: fixture.values[i].value[ii].value.toString() },
          sampleCount: { type: 'uinteger', value: fixture.values[i].value[ii].sampleCount },
          timestamp: { type: 'time', value: fixture.values[i].value[ii].timestamp },
        });
        
      }
    }
  });
});
