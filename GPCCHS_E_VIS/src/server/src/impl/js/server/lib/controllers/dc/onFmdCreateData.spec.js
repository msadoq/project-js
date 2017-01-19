const dataStub = require('common/stubs/data');

const { testHandler, getTestHandlerArgs, resetTestHandlerArgs } = require('../../utils/test');


const onFmdCreateData = require('./onFmdCreateData');


describe('controllers/client/onFmdCreateData', () => {
  beforeEach(() => {
    resetTestHandlerArgs();
  });
  it('success', () => {
    const myQueryId = 'myQueryId';
    const myQueryIdProto = dataStub.getStringProtobuf(myQueryId);
    const mySuccessProto = dataStub.getSuccessStatusProtobuf();
    const myFileInfo = dataStub.getFMDFileInfo();
    const myFileInfoProto = dataStub.getFMDFileInfoProtobuf(myFileInfo);
    // launch test
    onFmdCreateData(testHandler, myQueryIdProto, mySuccessProto, myFileInfoProto);
    // check data
    const message = getTestHandlerArgs();
    message.should.be.an('array')
      .that.has.lengthOf(2);
    message[0].should.equal(myQueryId);
    message[1].should.be.an('object')
      .that.have.properties(myFileInfo);
  });
  it('error', () => {
    const myQueryId = 'myQueryId';
    const myQueryIdProto = dataStub.getStringProtobuf(myQueryId);
    const myErrorProto = dataStub.getErrorStatusProtobuf();
    const myReason = 'myReason';
    const myReasonProto = dataStub.getStringProtobuf(myReason);
    // launch test
    onFmdCreateData(testHandler, myQueryIdProto, myErrorProto, myReasonProto);
    // check data
    const message = getTestHandlerArgs();
    message.should.be.an('array')
      .that.has.lengthOf(2);
    message[0].should.equal(myQueryId);
    message[1].should.be.an('object')
      .that.have.properties({
        err: myReason,
      });
  });
});
