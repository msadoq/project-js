const { registerProtobuf } = require('../../common/jest');

registerProtobuf();

const {
  createAddSubscriptionMessage,
  createDeleteSubscriptionMessage,
  unsubscribeAll,
  resetSubId,
} = require('./subscriptions');
const connectedDataModel = require('../models/connectedData');
const dataStub = require('common/protobuf/stubs');
const registeredCallbacks = require('../../common/callbacks');

describe('utils/subscriptions', () => {
  beforeEach(() => {
    connectedDataModel.cleanup();
    resetSubId();
    registeredCallbacks.clear();
  });

  test('createAddSubscriptionMessage', () => {
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
    expect(message).toBeAnObject();
    expect(message2).toBeAnObject();

    expect(message).toMatchObject({
      subId,
      args,
    });

    expect(message2).toMatchObject({
      subId: subId2,
      args: args2,
    });
  });
  test('createDeleteSubscriptionMessage', () => {
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
    expect(message).toBeAnObject();
    expect(message2).toBeAnObject();

    expect(message).toMatchObject({
      subId,
      args,
    });

    expect(message2).toMatchObject({
      subId: subId2,
      args: args2,
    });
  });
  test('should unsubscribeAll method', (done) => {
    const myDataId = dataStub.getDataId({ parameterName: 'myParam' });
    const myDataId2 = dataStub.getDataId({ parameterName: 'myParam2' });
    connectedDataModel.addRecord(myDataId);
    connectedDataModel.addRecord(myDataId2);

    const calls = [];
    const check = arg => calls.push(arg);

    unsubscribeAll(check);
    const args1 = [
      dataStub.getTimebasedSubscriptionHeaderProtobuf(),
      dataStub.getStringProtobuf('sub1'),
      dataStub.getDataIdProtobuf(myDataId),
      dataStub.getDeleteActionProtobuf(),
    ];
    const args2 = [
      dataStub.getTimebasedSubscriptionHeaderProtobuf(),
      dataStub.getStringProtobuf('sub2'),
      dataStub.getDataIdProtobuf(myDataId2),
      dataStub.getDeleteActionProtobuf(),
    ];

    expect(calls[0]).toMatchObject(args1);
    expect(calls[1]).toMatchObject(args2);
    done();
  });
});
