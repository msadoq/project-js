// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./operation');
const stub = require('./operation.stub')();

const activityRequest = require('./activityRequest');
const operationCriticality = require('./operationCriticality');
const operationStatus = require('./operationStatus');

describe('protobuf/isis/soo/Operation', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Operation.proto`, { keepCase: true })
    .lookup('soo.protobuf.Operation');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      operationId: { type: 'long', symbol: `${stub.operationId}` },
      earliestStartDate: (typeof stub.earliestStartDate === 'undefined')
        ? null
        : { type: 'time', value: stub.earliestStartDate },
      latestStartDate: (typeof stub.latestStartDate === 'undefined')
        ? null
        : { type: 'time', value: stub.latestStartDate },
      expected_duration: { type: 'duration', value: stub.expected_duration },
      foreseenDate: (typeof stub.foreseenDate === 'undefined')
        ? null
        : { type: 'time', value: stub.foreseenDate },
      label: { type: 'string', value: stub.label },
      description: { type: 'string', value: stub.description },
      target: { type: 'string', value: stub.target },
      domain: { type: 'string', value: stub.domain },
      executor: { type: 'string', value: stub.executor },
      criticality: { type: 'enum', value: stub.criticality, symbol: operationCriticality[stub.criticality] },
      operationStatus: { type: 'enum', value: stub.operationStatus, symbol: operationStatus[stub.operationStatus] },
      result: (typeof stub.result === 'undefined')
        ? null
        : {
          confirmationStatus: { type: 'string', value: stub.result.confirmationStatus },
          duration: { type: 'duration', value: stub.result.duration },
          executionStatus: { type: 'string', value: stub.result.executionStatus },
          detailedStatus: { type: 'string', value: stub.result.detailedStatus },
          exceptionDetails: { type: 'string', value: stub.result.exceptionDetails },
          startDatetime: { type: 'time', value: stub.result.startDatetime },
          endDatetime: { type: 'time', value: stub.result.endDatetime },
        },
      hostname: { type: 'string', value: stub.hostname },
      functionalChain: {
        name: { type: 'string', value: stub.functionalChain.name },
        activity: { type: 'enum', value: stub.functionalChain.activity, symbol: activityRequest[stub.functionalChain.activity] },
        creationDate: { type: 'time', value: stub.functionalChain.creationDate },
      },
      activity: { type: 'enum', value: stub.activity, symbol: activityRequest[stub.activity] },
    });
    expect(decoded.arguments).toHaveLength(stub.arguments.length);
    for (let i = 0; i < stub.arguments.length; i += 1) {
      expect(decoded.arguments[i]).toMatchObject({
        type: 'string',
        value: stub.arguments[i],
      });
    }
    expect(decoded.options).toHaveLength(stub.options.length);
    for (let i = 0; i < stub.options.length; i += 1) {
      expect(decoded.options[i]).toMatchObject({
        name: { type: 'identifier', value: stub.options[i].name },
        value: { type: 'double', symbol: stub.options[i].value.toString() },
      });
      
    }
    expect(decoded.statuses).toHaveLength(stub.statuses.length);
    for (let i = 0; i < stub.statuses.length; i += 1) {
      expect(decoded.statuses[i]).toMatchObject({
        operationStatus: { type: 'enum', value: stub.statuses[i].operationStatus, symbol: operationStatus[stub.statuses[i].operationStatus] },
        occurenceDate: { type: 'time', value: stub.statuses[i].occurenceDate },
      });
      
    }
  });
});
