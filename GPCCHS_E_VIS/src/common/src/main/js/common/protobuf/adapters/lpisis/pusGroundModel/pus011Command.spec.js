// Produced by Acceleo JavaScript Generator 1.1.0
require('../../../../utils/test');
const stubData = require('../../../../stubs/data');

const protobuf = require('../../../index');


describe('protobuf/lpisis/pusGroundModel/Pus011Command', () => {
  const fixture = stubData.getPus011Command();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.pusGroundModel.Pus011Command', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.pusGroundModel.Pus011Command', buffer);
    json.should.be.an('object').that.have.properties({
      commandApid: { type: 'uinteger', value: fixture.commandApid },
      commandBinaryProfile: { type: 'blob', value: fixture.commandBinaryProfile },
      commandGroundStatus: { type: 'uinteger', value: fixture.commandGroundStatus },
      commandName: { type: 'string', value: fixture.commandName },
      commandSequenceCount: { type: 'uinteger', value: fixture.commandSequenceCount },
      commandStatus: { type: 'uinteger', value: fixture.commandStatus },
      currentExecutionTime: { type: 'time', value: fixture.currentExecutionTime },
      initialExecutionTime: { type: 'time', value: fixture.initialExecutionTime },
      commandSourceId: { type: 'uinteger', value: fixture.commandSourceId },
      ssId: { type: 'uinteger', value: fixture.ssId },
      totalTimeShiftOffset: { type: 'integer', value: fixture.totalTimeShiftOffset },
      pus011EncapsulatingTc: {
        sourceId: { type: 'uinteger', value: fixture.pus011EncapsulatingTc.sourceId },
        commandApid: { type: 'uinteger', value: fixture.pus011EncapsulatingTc.commandApid },
        sequenceCount: { type: 'uinteger', value: fixture.pus011EncapsulatingTc.sequenceCount },
      },
      invalidBinaryTcDetected: { type: 'boolean', value: fixture.invalidBinaryTcDetected },
      apid: { type: 'uinteger', value: fixture.apid },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: fixture.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: fixture.pusElement.lastUpdateTime },
      },
      groundDate: { type: 'time', value: fixture.groundDate },
    });
    json.pus011CommandParameters.should.be.an('array').that.have.lengthOf(fixture.pus011CommandParameters.length);
    for (let i = 0; i < fixture.pus011CommandParameters.length; i += 1) {
      json.pus011CommandParameters[i].should.be.an('object').that.have.properties({
        parameterName: { type: 'string', value: fixture.pus011CommandParameters[i].parameterName },
        parameterValue: { type: 'double', symbol: fixture.pus011CommandParameters[i].parameterValue.toString() },
      });
    }
    json.pUS011TimeShift.should.be.an('array').that.have.lengthOf(fixture.pUS011TimeShift.length);
    for (let i = 0; i < fixture.pUS011TimeShift.length; i += 1) {
      json.pUS011TimeShift[i].should.be.an('object').that.have.properties({
        applicationTime: { type: 'time', value: fixture.pUS011TimeShift[i].applicationTime },
        timeShiftOffset: { type: 'integer', value: fixture.pUS011TimeShift[i].timeShiftOffset },
      });
    }
  });
});

