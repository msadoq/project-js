// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./tCHistory');
const stub = require('./tCHistory.stub')();

const ackEnum = require('./ackEnum');
const sendTypeEnum = require('./sendTypeEnum');

describe('protobuf/isis/tcHistory/TCHistory', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/TCHistory.proto`, { keepCase: true })
    .lookup('tcHistory.protobuf.TCHistory');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      sendingDate: { type: 'time', value: stub.sendingDate },
      tcInProgress: { type: 'boolean', value: stub.tcInProgress },
      tcId: { type: 'integer', value: stub.tcId },
      tcSourceId: { type: 'uinteger', value: stub.tcSourceId },
      historyName: { type: 'string', value: stub.historyName },
      sendType: { type: 'enum', value: stub.sendType, symbol: sendTypeEnum[stub.sendType] },
      tcNums: { type: 'uinteger', value: stub.tcNums },
      expectedAck: {
        acceptance: { type: 'boolean', value: stub.expectedAck.acceptance },
        executionComplete: { type: 'boolean', value: stub.expectedAck.executionComplete },
        executionStart: { type: 'boolean', value: stub.expectedAck.executionStart },
      },
      successiveAck: {
        scdCop1Ack: { type: 'enum', value: stub.successiveAck.scdCop1Ack, symbol: ackEnum[stub.successiveAck.scdCop1Ack] },
        cop1Ack: { type: 'enum', value: stub.successiveAck.cop1Ack, symbol: ackEnum[stub.successiveAck.cop1Ack] },
        stationAck: { type: 'enum', value: stub.successiveAck.stationAck, symbol: ackEnum[stub.successiveAck.stationAck] },
        missionFailure: { type: 'enum', value: stub.successiveAck.missionFailure, symbol: ackEnum[stub.successiveAck.missionFailure] },
        executionComplete: { type: 'enum', value: stub.successiveAck.executionComplete, symbol: ackEnum[stub.successiveAck.executionComplete] },
        acceptance: { type: 'enum', value: stub.successiveAck.acceptance, symbol: ackEnum[stub.successiveAck.acceptance] },
        scdCop1AckRcvDate: (typeof stub.successiveAck.scdCop1AckRcvDate === 'undefined')
          ? null
          : { type: 'time', value: stub.successiveAck.scdCop1AckRcvDate },
        cop1AckRcvDate: (typeof stub.successiveAck.cop1AckRcvDate === 'undefined')
          ? null
          : { type: 'time', value: stub.successiveAck.cop1AckRcvDate },
        stationAckRcvDate: (typeof stub.successiveAck.stationAckRcvDate === 'undefined')
          ? null
          : { type: 'time', value: stub.successiveAck.stationAckRcvDate },
        missionFailureRcvDate: (typeof stub.successiveAck.missionFailureRcvDate === 'undefined')
          ? null
          : { type: 'time', value: stub.successiveAck.missionFailureRcvDate },
        executionCompleteRcvDate: (typeof stub.successiveAck.executionCompleteRcvDate === 'undefined')
          ? null
          : { type: 'time', value: stub.successiveAck.executionCompleteRcvDate },
        acceptanceRcvDate: (typeof stub.successiveAck.acceptanceRcvDate === 'undefined')
          ? null
          : { type: 'time', value: stub.successiveAck.acceptanceRcvDate },
        executionStartRcvDate: (typeof stub.successiveAck.executionStartRcvDate === 'undefined')
          ? null
          : { type: 'time', value: stub.successiveAck.executionStartRcvDate },
        executionStart: (typeof stub.successiveAck.executionStart === 'undefined')
          ? null
          : { type: 'enum', value: stub.successiveAck.executionStart, symbol: ackEnum[stub.successiveAck.executionStart] },
      },
    });
    
  });
});
