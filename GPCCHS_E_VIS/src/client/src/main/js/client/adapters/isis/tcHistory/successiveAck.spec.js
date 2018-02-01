// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./successiveAck');
const stub = require('./successiveAck.stub')();

const ackEnum = require('./ackEnum');

describe('protobuf/isis/tcHistory/SuccessiveAck', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/SuccessiveAck.proto`, { keepCase: true })
    .lookup('tcHistory.protobuf.SuccessiveAck');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      scdCop1Ack: { type: 'enum', value: stub.scdCop1Ack, symbol: ackEnum[stub.scdCop1Ack] },
      cop1Ack: { type: 'enum', value: stub.cop1Ack, symbol: ackEnum[stub.cop1Ack] },
      stationAck: { type: 'enum', value: stub.stationAck, symbol: ackEnum[stub.stationAck] },
      missionFailure: { type: 'enum', value: stub.missionFailure, symbol: ackEnum[stub.missionFailure] },
      executionComplete: { type: 'enum', value: stub.executionComplete, symbol: ackEnum[stub.executionComplete] },
      acceptance: { type: 'enum', value: stub.acceptance, symbol: ackEnum[stub.acceptance] },
      scdCop1AckRcvDate: (typeof stub.scdCop1AckRcvDate === 'undefined')
        ? null
        : { type: 'time', value: stub.scdCop1AckRcvDate },
      cop1AckRcvDate: (typeof stub.cop1AckRcvDate === 'undefined')
        ? null
        : { type: 'time', value: stub.cop1AckRcvDate },
      stationAckRcvDate: (typeof stub.stationAckRcvDate === 'undefined')
        ? null
        : { type: 'time', value: stub.stationAckRcvDate },
      missionFailureRcvDate: (typeof stub.missionFailureRcvDate === 'undefined')
        ? null
        : { type: 'time', value: stub.missionFailureRcvDate },
      executionCompleteRcvDate: (typeof stub.executionCompleteRcvDate === 'undefined')
        ? null
        : { type: 'time', value: stub.executionCompleteRcvDate },
      acceptanceRcvDate: (typeof stub.acceptanceRcvDate === 'undefined')
        ? null
        : { type: 'time', value: stub.acceptanceRcvDate },
      executionStartRcvDate: (typeof stub.executionStartRcvDate === 'undefined')
        ? null
        : { type: 'time', value: stub.executionStartRcvDate },
      executionStart: (typeof stub.executionStart === 'undefined')
        ? null
        : { type: 'enum', value: stub.executionStart, symbol: ackEnum[stub.executionStart] },
    });
    
  });
});
