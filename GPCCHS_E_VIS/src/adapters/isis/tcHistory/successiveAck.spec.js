// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./successiveAck');
const { getSuccessiveAck } = require('../stubs');

const ackEnum = require('./ackEnum');

describe('protobuf/isis/tcHistory/SuccessiveAck', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/SuccessiveAck.proto`, { keepCase: true })
    .lookup('tcHistory.protobuf.SuccessiveAck');
  const fixture = getSuccessiveAck();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      scdCop1Ack: { type: 'enum', value: fixture.scdCop1Ack, symbol: ackEnum[fixture.scdCop1Ack] },
      cop1Ack: { type: 'enum', value: fixture.cop1Ack, symbol: ackEnum[fixture.cop1Ack] },
      stationAck: { type: 'enum', value: fixture.stationAck, symbol: ackEnum[fixture.stationAck] },
      missionFailure: { type: 'enum', value: fixture.missionFailure, symbol: ackEnum[fixture.missionFailure] },
      executionComplete: { type: 'enum', value: fixture.executionComplete, symbol: ackEnum[fixture.executionComplete] },
      acceptance: { type: 'enum', value: fixture.acceptance, symbol: ackEnum[fixture.acceptance] },
      scdCop1AckRcvDate: (typeof fixture.scdCop1AckRcvDate === 'undefined')
        ? null
        : { type: 'time', value: fixture.scdCop1AckRcvDate },
      cop1AckRcvDate: (typeof fixture.cop1AckRcvDate === 'undefined')
        ? null
        : { type: 'time', value: fixture.cop1AckRcvDate },
      stationAckRcvDate: (typeof fixture.stationAckRcvDate === 'undefined')
        ? null
        : { type: 'time', value: fixture.stationAckRcvDate },
      missionFailureRcvDate: (typeof fixture.missionFailureRcvDate === 'undefined')
        ? null
        : { type: 'time', value: fixture.missionFailureRcvDate },
      executionCompleteRcvDate: (typeof fixture.executionCompleteRcvDate === 'undefined')
        ? null
        : { type: 'time', value: fixture.executionCompleteRcvDate },
      acceptanceRcvDate: (typeof fixture.acceptanceRcvDate === 'undefined')
        ? null
        : { type: 'time', value: fixture.acceptanceRcvDate },
      executionStartRcvDate: (typeof fixture.executionStartRcvDate === 'undefined')
        ? null
        : { type: 'time', value: fixture.executionStartRcvDate },
      executionStart: (typeof fixture.executionStart === 'undefined')
        ? null
        : { type: 'enum', value: fixture.executionStart, symbol: ackEnum[fixture.executionStart] },
    });
    
    
  });
});
