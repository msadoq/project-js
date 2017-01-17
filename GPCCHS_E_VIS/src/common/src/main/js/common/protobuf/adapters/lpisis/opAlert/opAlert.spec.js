// Generated file
require('../../../../utils/test');
const stubData = require('../../../../stubs/data');

const protobuf = require('../../../index');

const alertingWay = require('./alertingWay');
const status = require('./status');

describe('protobuf/lpisis/opAlert/OpAlert', () => {
  const fixture = stubData.getOpAlert();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.opAlert.OpAlert', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.opAlert.OpAlert', buffer);
    json.should.be.an('object').that.have.properties({
      alertDate: { type: 'time', value: fixture.alertDate },
      specificAttributes: {
        name: { type: 'identifier', value: fixture.specificAttributes.name },
        value: { type: 'double', value: fixture.specificAttributes.value },
      },
      closingNeeded: { type: 'boolean', value: fixture.closingNeeded },
      answerID: { type: 'ulong', value: fixture.answerID },
      systemDate: { type: 'time', value: fixture.systemDate },
      mission: { type: 'string', value: fixture.mission },
      satellite: { type: 'ulong', value: fixture.satellite },
      status: { type: 'enum', value: fixture.status, symbol: status[fixture.status] },
      lastCallDate: { type: 'time', value: fixture.lastCallDate },
      opAlertClosingData: (typeof fixture.opAlertClosingData === 'undefined') 
        ? null 
        : {
          closingWay: { type: 'enum', value: fixture.opAlertClosingData.closingWay, symbol: alertingWay[fixture.opAlertClosingData.closingWay] },
          closingDate: { type: 'time', value: fixture.opAlertClosingData.closingDate },
        },
    });
    json.opAlertConfiguration.should.be.an('array').that.have.lengthOf(fixture.opAlertConfiguration.length);
    for (let i = 0; i < fixture.opAlertConfiguration.length; i += 1) {
      json.opAlertConfiguration[i].should.be.an('object').that.have.properties({
        numberCalls: { type: 'integer', value: fixture.opAlertConfiguration[i].numberCalls },
        alertingWay: { type: 'enum', value: fixture.opAlertConfiguration[i].alertingWay, symbol: alertingWay[fixture.opAlertConfiguration[i].alertingWay] },
        maxNumberRetries: { type: 'integer', value: fixture.opAlertConfiguration[i].maxNumberRetries },
        delayRetries: { type: 'duration', value: fixture.opAlertConfiguration[i].delayRetries },
      });
      
    }
  });
});

