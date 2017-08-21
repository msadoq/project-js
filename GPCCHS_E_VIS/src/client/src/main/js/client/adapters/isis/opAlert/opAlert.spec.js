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
      alertDate: { type: 'time', value: stub.alertDate },
      target: {
        login: { type: 'string', value: stub.target.login },
        password: { type: 'string', value: stub.target.password },
        profile: { type: 'string', value: stub.target.profile },
        userTime: { type: 'time', value: stub.target.userTime },
      },
      specificAttributes: {
        name: { type: 'identifier', value: stub.specificAttributes.name },
        value: { type: 'double', symbol: stub.specificAttributes.value.toString() },
      },
      closingNeeded: { type: 'boolean', value: stub.closingNeeded },
      callingUser: {
        login: { type: 'string', value: stub.callingUser.login },
        password: { type: 'string', value: stub.callingUser.password },
        profile: { type: 'string', value: stub.callingUser.profile },
        userTime: { type: 'time', value: stub.callingUser.userTime },
      },
      systemDate: { type: 'time', value: stub.systemDate },
      mission: { type: 'string', value: stub.mission },
      satellite: { type: 'ulong', symbol: `${stub.satellite}` },
      status: { type: 'enum', value: stub.status, symbol: status[stub.status] },
      lastCallDate: { type: 'time', value: stub.lastCallDate },
      opAlertClosingData: (typeof stub.opAlertClosingData === 'undefined')
        ? null
        : {
          closingUser: {
            login: { type: 'string', value: stub.opAlertClosingData.closingUser.login },
            password: { type: 'string', value: stub.opAlertClosingData.closingUser.password },
            profile: { type: 'string', value: stub.opAlertClosingData.closingUser.profile },
            userTime: { type: 'time', value: stub.opAlertClosingData.closingUser.userTime },
          },
          closingDate: { type: 'time', value: stub.opAlertClosingData.closingDate },
          closingWay: { type: 'enum', value: stub.opAlertClosingData.closingWay, symbol: closingWay[stub.opAlertClosingData.closingWay] },
        },
    });
    expect(decoded.opAlertConfiguration).toHaveLength(stub.opAlertConfiguration.length);
    for (let i = 0; i < stub.opAlertConfiguration.length; i += 1) {
      expect(decoded.opAlertConfiguration[i]).toMatchObject({
        numberCalls: { type: 'integer', value: stub.opAlertConfiguration[i].numberCalls },
        alertByPHONE: { type: 'boolean', value: stub.opAlertConfiguration[i].alertByPHONE },
        alertByAUDIO: { type: 'boolean', value: stub.opAlertConfiguration[i].alertByAUDIO },
        alertByEMAIL: { type: 'boolean', value: stub.opAlertConfiguration[i].alertByEMAIL },
        alertBySMS: { type: 'boolean', value: stub.opAlertConfiguration[i].alertBySMS },
        maxNumberRetries: { type: 'integer', value: stub.opAlertConfiguration[i].maxNumberRetries },
        delayRetries: { type: 'duration', value: stub.opAlertConfiguration[i].delayRetries },
      });
      
    }
  });
});
