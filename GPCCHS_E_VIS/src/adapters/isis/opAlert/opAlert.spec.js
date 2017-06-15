// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
require('../../../utils/test');
const stubData = require('../stubs');

const protobuf = require('../../../protobuf');

const { decodeRaw } = require('../types');

const closingWay = require('./closingWay');
const status = require('./status');

describe('protobuf/isis/opAlert/OpAlert', () => {
  const fixture = stubData.getOpAlert();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('isis.opAlert.OpAlert', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('isis.opAlert.OpAlert', buffer);
    json.should.be.an('object').that.have.properties({
      alertDate: { type: 'time', value: fixture.alertDate },
      specificAttributes: {
        name: { type: 'identifier', value: fixture.specificAttributes.name },
        value: { type: 'double', symbol: fixture.specificAttributes.value.toString() },
      },
      closingNeeded: { type: 'boolean', value: fixture.closingNeeded },
      systemDate: { type: 'time', value: fixture.systemDate },
      mission: { type: 'string', value: fixture.mission },
      satellite: { type: 'ulong', symbol: `${fixture.satellite}` },
      status: { type: 'enum', value: fixture.status, symbol: status[fixture.status] },
      lastCallDate: { type: 'time', value: fixture.lastCallDate },
      opAlertClosingData: (typeof fixture.opAlertClosingData === 'undefined') 
        ? null 
        : {
          closingDate: { type: 'time', value: fixture.opAlertClosingData.closingDate },
          closingWay: { type: 'enum', value: fixture.opAlertClosingData.closingWay, symbol: closingWay[fixture.opAlertClosingData.closingWay] },
        },
    });
    decodeRaw(json.target).should.be.an('object').that.have.properties({
      login: { type: 'string', value: fixture.target.login },
      password: { type: 'string', value: fixture.target.password },
      profile: { type: 'string', value: fixture.target.profile },
      userTime: { type: 'time', value: fixture.target.userTime },
    });
    
    decodeRaw(json.callingUser).should.be.an('object').that.have.properties({
      login: { type: 'string', value: fixture.callingUser.login },
      password: { type: 'string', value: fixture.callingUser.password },
      profile: { type: 'string', value: fixture.callingUser.profile },
      userTime: { type: 'time', value: fixture.callingUser.userTime },
    });
    decodeRaw(json.opAlertClosingData.closingUser).should.be.an('object').that.have.properties({
      login: { type: 'string', value: fixture.opAlertClosingData.closingUser.login },
      password: { type: 'string', value: fixture.opAlertClosingData.closingUser.password },
      profile: { type: 'string', value: fixture.opAlertClosingData.closingUser.profile },
      userTime: { type: 'time', value: fixture.opAlertClosingData.closingUser.userTime },
    });
    
    
    json.opAlertConfiguration.should.be.an('array').that.have.lengthOf(fixture.opAlertConfiguration.length);
    for (let i = 0; i < fixture.opAlertConfiguration.length; i += 1) {
      json.opAlertConfiguration[i].should.be.an('object').that.have.properties({
        numberCalls: { type: 'integer', value: fixture.opAlertConfiguration[i].numberCalls },
        alertByPHONE: { type: 'boolean', value: fixture.opAlertConfiguration[i].alertByPHONE },
        alertByAUDIO: { type: 'boolean', value: fixture.opAlertConfiguration[i].alertByAUDIO },
        alertByEMAIL: { type: 'boolean', value: fixture.opAlertConfiguration[i].alertByEMAIL },
        alertBySMS: { type: 'boolean', value: fixture.opAlertConfiguration[i].alertBySMS },
        maxNumberRetries: { type: 'integer', value: fixture.opAlertConfiguration[i].maxNumberRetries },
        delayRetries: { type: 'duration', value: fixture.opAlertConfiguration[i].delayRetries },
      });
      
    }
  });
});

