// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./groupOfOperation');
const { getGroupOfOperation } = require('../stubs');

const activityRequest = require('./activityRequest');
const operationCriticality = require('./operationCriticality');
const operationStatus = require('./operationStatus');

describe('protobuf/isis/soo/GroupOfOperation', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/GroupOfOperation.proto`, { keepCase: true })
    .lookup('soo.protobuf.GroupOfOperation');
  const fixture = getGroupOfOperation();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      operationId: { type: 'long', symbol: `${fixture.operationId}` },
      earliest_start_date: (typeof fixture.earliest_start_date === 'undefined')
        ? null
        : { type: 'time', value: fixture.earliest_start_date },
      latest_start_date: (typeof fixture.latest_start_date === 'undefined')
        ? null
        : { type: 'time', value: fixture.latest_start_date },
      layer: (typeof fixture.layer === 'undefined')
        ? null
        : { type: 'string', value: fixture.layer },
      expected_duration: { type: 'duration', value: fixture.expected_duration },
      foreseenDate: (typeof fixture.foreseenDate === 'undefined')
        ? null
        : { type: 'time', value: fixture.foreseenDate },
      label: { type: 'string', value: fixture.label },
      description: { type: 'string', value: fixture.description },
      target: { type: 'string', value: fixture.target },
      domain: { type: 'string', value: fixture.domain },
      executor: { type: 'string', value: fixture.executor },
      criticality: { type: 'enum', value: fixture.criticality, symbol: operationCriticality[fixture.criticality] },
      operationStatus: { type: 'enum', value: fixture.operationStatus, symbol: operationStatus[fixture.operationStatus] },
      result: (typeof fixture.result === 'undefined')
        ? null
        : {
          confirmationStatus: { type: 'string', value: fixture.result.confirmationStatus },
          duration: { type: 'duration', value: fixture.result.duration },
          executionStatus: { type: 'string', value: fixture.result.executionStatus },
          detailedStatus: { type: 'string', value: fixture.result.detailedStatus },
          exceptionDetails: { type: 'string', value: fixture.result.exceptionDetails },
          startDatetime: { type: 'time', value: fixture.result.startDatetime },
          endDatetime: { type: 'time', value: fixture.result.endDatetime },
        },
      hostname: { type: 'string', value: fixture.hostname },
      functionalChain: { type: 'blob', value: fixture.functionalChain },
      activity: { type: 'enum', value: fixture.activity, symbol: activityRequest[fixture.activity] },
    });
    
    json.operation.should.be.an('array').that.have.lengthOf(fixture.operation.length);
    for (let i = 0; i < fixture.operation.length; i += 1) {
      json.operation[i].should.have.properties({
        type: 'blob',
        value: fixture.operation[i],
      });
    }
    json.arguments.should.be.an('array').that.have.lengthOf(fixture.arguments.length);
    for (let i = 0; i < fixture.arguments.length; i += 1) {
      json.arguments[i].should.have.properties({
        type: 'string',
        value: fixture.arguments[i],
      });
    }
    json.options.should.be.an('array').that.have.lengthOf(fixture.options.length);
    for (let i = 0; i < fixture.options.length; i += 1) {
      json.options[i].should.be.an('object').that.have.properties({
        name: { type: 'identifier', value: fixture.options[i].name },
        value: { type: 'double', symbol: fixture.options[i].value.toString() },
      });
      
    }
    json.statuses.should.be.an('array').that.have.lengthOf(fixture.statuses.length);
    for (let i = 0; i < fixture.statuses.length; i += 1) {
      json.statuses[i].should.be.an('object').that.have.properties({
        operationStatus: { type: 'enum', value: fixture.statuses[i].operationStatus, symbol: operationStatus[fixture.statuses[i].operationStatus] },
        occurenceDate: { type: 'time', value: fixture.statuses[i].occurenceDate },
      });
      
    }
  });
});
