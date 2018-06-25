// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./opAlert');
const stub = require('./opAlert.stub')();

const closingWay = require('./closingWay');
const status = require('./status');

describe('protobuf/isis/opAlert/OpAlert', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/OpAlert.proto`, { keepCase: true })
    .lookup('opAlert.protobuf.OpAlert');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      onCallOperator: { type: 'string', value: stub.onCallOperator },
      specificAttributes: {
        name: { type: 'identifier', value: stub.specificAttributes.name },
        value: { type: 'double', symbol: stub.specificAttributes.value.toString() },
      },
      closingNeeded: { type: 'boolean', value: stub.closingNeeded },
      alertConfiguration: {
        maxNumberRetriesPhone: { type: 'integer', value: stub.alertConfiguration.maxNumberRetriesPhone },
        delayRetriesPhone: { type: 'duration', value: stub.alertConfiguration.delayRetriesPhone },
        maxNumberRetriesAudio: { type: 'identifier', value: stub.alertConfiguration.maxNumberRetriesAudio },
        delayRetriesAudio: { type: 'duration', value: stub.alertConfiguration.delayRetriesAudio },
        maxNumberRetriesEmail: { type: 'integer', value: stub.alertConfiguration.maxNumberRetriesEmail },
        delayRetriesEmail: { type: 'duration', value: stub.alertConfiguration.delayRetriesEmail },
        maxNumberRetriesSms: { type: 'integer', value: stub.alertConfiguration.maxNumberRetriesSms },
        delayRetriesSms: { type: 'duration', value: stub.alertConfiguration.delayRetriesSms },
      },
      status: { type: 'enum', value: stub.status, symbol: status[stub.status] },
      lastCallDate: { type: 'time', value: stub.lastCallDate },
      alertClosingData: (typeof stub.alertClosingData === 'undefined')
        ? null
        : {
          closingUser: { type: 'string', value: stub.alertClosingData.closingUser },
          closingDate: { type: 'time', value: stub.alertClosingData.closingDate },
          closingWay: { type: 'enum', value: stub.alertClosingData.closingWay, symbol: closingWay[stub.alertClosingData.closingWay] },
        },
      numberCalls: { type: 'integer', value: stub.numberCalls },
      creationDate: { type: 'time', value: stub.creationDate },
      satellite: { type: 'ulong', symbol: `${stub.satellite}` },
    });
    
  });
});
