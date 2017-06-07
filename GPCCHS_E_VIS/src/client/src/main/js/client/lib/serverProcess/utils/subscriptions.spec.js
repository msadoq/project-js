const { should } = require('../../common/test');
const {
  createAddSubscriptionMessage,
  createDeleteSubscriptionMessage,
  unsubscribeAll,
  resetSubId,
} = require('./subscriptions');
const connectedDataModel = require('../models/connectedData');
const dataStub = require('common/protobuf/stubs');
const registeredCallbacks = require('../../utils/callbacks');
const { testHandler, getTestHandlerArgs, resetTestHandlerArgs } = require('./test');

describe('utils/subscriptions', () => {
  beforeEach(() => {
    connectedDataModel.cleanup();
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

    expect(registeredCallbacks.get(subId)).toBeDefined();
    expect(registeredCallbacks.get(subId2)).toBeDefined();

    expect(typeof message).toBe('object')
      .that.has.properties({
        subId,
        args,
      });
    expect(typeof message2).toBe('object')
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

    expect(typeof message).toBe('object')
      .that.has.properties({
        subId,
        args,
      });
    expect(typeof message2).toBe('object')
      .that.has.properties({
        subId: subId2,
        args: args2,
      });
  });
  it('unsubscribeAll', () => {
    const myDataId = dataStub.getDataId({ parameterName: 'myParam' });
    const myDataId2 = dataStub.getDataId({ parameterName: 'myParam2' });
    connectedDataModel.addRecord(myDataId);
    connectedDataModel.addRecord(myDataId2);

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

    expect(messages).be.an('array').toHaveLength(2);
    expect(messages[0]).toEqual(args);
    expect(messages[1]).toEqual(args2);
  });
});
