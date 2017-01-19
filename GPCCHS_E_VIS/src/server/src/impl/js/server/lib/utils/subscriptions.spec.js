const { should } = require('../utils/test');
const {
  createAddSubscriptionMessage,
  createDeleteSubscriptionMessage,
  unsubscribeAll,
  resetSubId,
} = require('./subscriptions');
const registeredCallbacks = require('common/callbacks');
const subscriptionsModel = require('../models/subscriptions');
const dataStub = require('common/stubs/data');
const { testHandler, getTestHandlerArgs, resetTestHandlerArgs } = require('./test');

describe('utils/subscriptions', () => {
  beforeEach(() => {
    resetSubId();
    resetTestHandlerArgs();
    registeredCallbacks.clear();
  });

  it('createAddSubscriptionMessage', () => {
    const myDataId = dataStub.getDataId({ parameterName: 'myParam' });
    const myDataId2 = dataStub.getDataId({ parameterName: 'myParam2' });

    const message = createAddSubscriptionMessage(myDataId);
    const message2 = createAddSubscriptionMessage(myDataId2);

    const subId = 'sub1';
    const subId2 = 'sub2';

    const args = [
      dataStub.getTimebasedSubscriptionHeaderProtobuf(),
      dataStub.getStringProtobuf(subId),
      dataStub.getDataIdProtobuf(myDataId),
      dataStub.getAddActionProtobuf(),
    ];
    const args2 = [
      dataStub.getTimebasedSubscriptionHeaderProtobuf(),
      dataStub.getStringProtobuf(subId2),
      dataStub.getDataIdProtobuf(myDataId2),
      dataStub.getAddActionProtobuf(),
    ];

    should.exist(registeredCallbacks.get(subId));
    should.exist(registeredCallbacks.get(subId2));

    message.should.be.an('object')
      .that.has.properties({
        subId,
        args,
      });
    message2.should.be.an('object')
      .that.has.properties({
        subId: subId2,
        args: args2,
      });
  });
  it('createDeleteSubscriptionMessage', () => {
    const myDataId = dataStub.getDataId({ parameterName: 'myParam' });
    const myDataId2 = dataStub.getDataId({ parameterName: 'myParam2' });

    const message = createDeleteSubscriptionMessage(myDataId);
    const message2 = createDeleteSubscriptionMessage(myDataId2);

    const subId = 'sub1';
    const subId2 = 'sub2';

    const args = [
      dataStub.getTimebasedSubscriptionHeaderProtobuf(),
      dataStub.getStringProtobuf(subId),
      dataStub.getDataIdProtobuf(myDataId),
      dataStub.getDeleteActionProtobuf(),
    ];
    const args2 = [
      dataStub.getTimebasedSubscriptionHeaderProtobuf(),
      dataStub.getStringProtobuf(subId2),
      dataStub.getDataIdProtobuf(myDataId2),
      dataStub.getDeleteActionProtobuf(),
    ];

    message.should.be.an('object')
      .that.has.properties({
        subId,
        args,
      });
    message2.should.be.an('object')
      .that.has.properties({
        subId: subId2,
        args: args2,
      });
  });
  it('unsubscribeAll', () => {
    const myDataId = dataStub.getDataId({ parameterName: 'myParam' });
    const myDataId2 = dataStub.getDataId({ parameterName: 'myParam2' });

    subscriptionsModel.addRecord(myDataId);
    subscriptionsModel.addRecord(myDataId2);

    unsubscribeAll(testHandler);
    const messages = getTestHandlerArgs();

    const subId = 'sub1';
    const subId2 = 'sub2';

    const args = [
      dataStub.getTimebasedSubscriptionHeaderProtobuf(),
      dataStub.getStringProtobuf(subId),
      dataStub.getDataIdProtobuf(myDataId),
      dataStub.getDeleteActionProtobuf(),
    ];
    const args2 = [
      dataStub.getTimebasedSubscriptionHeaderProtobuf(),
      dataStub.getStringProtobuf(subId2),
      dataStub.getDataIdProtobuf(myDataId2),
      dataStub.getDeleteActionProtobuf(),
    ];

    messages.should.be.an('array')
      .that.has.lengthOf(2);
    messages[0].should.deep.equal(args);
    messages[1].should.deep.equal(args2);

    const subscriptions = subscriptionsModel.getAll();
    subscriptions.should.be.an('array').that.has.lengthOf(0);
  });
});
