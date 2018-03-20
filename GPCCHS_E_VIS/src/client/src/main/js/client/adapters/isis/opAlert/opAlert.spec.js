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
const adapter = require('./opAlert');
const { getOpAlert } = require('../stubs');

const closingWay = require('./closingWay');
const status = require('./status');

describe('protobuf/isis/opAlert/OpAlert', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/OpAlert.proto`, { keepCase: true })
    .lookup('opAlert.protobuf.OpAlert');
  const fixture = getOpAlert();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      onCallOperator: { type: 'string', value: fixture.onCallOperator },
      specificAttributes: {
        name: { type: 'identifier', value: fixture.specificAttributes.name },
        value: { type: 'double', symbol: fixture.specificAttributes.value.toString() },
      },
      closingNeeded: { type: 'boolean', value: fixture.closingNeeded },
      alertConfiguration: {
        maxNumberRetriesPhone: { type: 'integer', value: fixture.alertConfiguration.maxNumberRetriesPhone },
        delayRetriesPhone: { type: 'duration', value: fixture.alertConfiguration.delayRetriesPhone },
        maxNumberRetriesAudio: { type: 'identifier', value: fixture.alertConfiguration.maxNumberRetriesAudio },
        delayRetriesAudio: { type: 'duration', value: fixture.alertConfiguration.delayRetriesAudio },
        maxNumberRetriesEmail: { type: 'integer', value: fixture.alertConfiguration.maxNumberRetriesEmail },
        delayRetriesEmail: { type: 'duration', value: fixture.alertConfiguration.delayRetriesEmail },
        maxNumberRetriesSms: { type: 'integer', value: fixture.alertConfiguration.maxNumberRetriesSms },
        delayRetriesSms: { type: 'duration', value: fixture.alertConfiguration.delayRetriesSms },
      },
      status: { type: 'enum', value: fixture.status, symbol: status[fixture.status] },
      lastCallDate: { type: 'time', value: fixture.lastCallDate },
      alertClosingData: (typeof fixture.alertClosingData === 'undefined')
        ? null
        : {
          closingUser: { type: 'string', value: fixture.alertClosingData.closingUser },
          closingDate: { type: 'time', value: fixture.alertClosingData.closingDate },
          closingWay: { type: 'enum', value: fixture.alertClosingData.closingWay, symbol: closingWay[fixture.alertClosingData.closingWay] },
        },
      numberCalls: { type: 'integer', value: fixture.numberCalls },
      creationDate: { type: 'time', value: fixture.creationDate },
      satellite: { type: 'ulong', symbol: `${fixture.satellite}` },
    });
    
    
  });
});
