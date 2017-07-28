import configureMockStore from 'redux-mock-store';

const { mockRegister, mockLoadStubs } = require('../../../common/jest');
const { getStubData } = require('../../../utils/stubs');

mockRegister();
mockLoadStubs();

const { encode } = require('../../../utils/adapters');
const onArchiveData = require('./archiveController');

const mockStore = configureMockStore();


const { add,
  get,
  remove,
  clear } = require('../../models/registeredArchiveQueriesSingleton');

const dataStub = getStubData();


describe('controllers/archive', () => {
  const myQueryProto = encode('dc.dataControllerUtils.String', { string: 'myQueryId' });
  const protobufTrue = encode('dc.dataControllerUtils.Boolean', { boolean: true });
  const protobufFalse = encode('dc.dataControllerUtils.Boolean', { boolean: false });

  const t1 = 1420106790820;
  const t2 = 1420106790830;

  const timestamp1 = dataStub.getTimestampProtobuf({ ms: t1 });
  const timestamp2 = dataStub.getTimestampProtobuf({ ms: t2 });

  const rp1 = dataStub.getReportingParameter();
  const rp2 = dataStub.getReportingParameter();

  const protoRp1 = dataStub.getReportingParameterProtobuf(rp1);
  const protoRp2 = dataStub.getReportingParameterProtobuf(rp2);

  beforeEach(() => clear());
  test('Received data RANGE not lastQuery', () => {
    add('myQueryId', 'myTbdId', 'RANGE', 'myDataId');
    const store = mockStore({});
    const getStore = () => store;

    const args = [myQueryProto, {}, protobufFalse, timestamp1, protoRp1, timestamp2, protoRp2];
    onArchiveData(args, getStore, { get, remove });

    const actions = store.getActions();
    const data = {};
    data[timestamp1] = protoRp1;
    data[timestamp2] = protoRp2;
    const expectedPayload = {
      type: 'INCOMING_RANGE_DATA',
      payload: {
        tbdId: 'myTbdId',
        dataId: 'myDataId',
        peers: [timestamp1, protoRp1, timestamp2, protoRp2],
      },
    };
    expect(actions).toContainEqual(expectedPayload);
    expect(get('myQueryId')).toBeDefined();
  });

  test('Received data RANGE lastQuery', () => {
    add('myQueryId', 'myTbdId', 'RANGE', 'myDataId');
    const store = mockStore({});
    const getStore = () => store;

    const args = [myQueryProto, {}, protobufTrue, timestamp1, protoRp1, timestamp2, protoRp2];
    onArchiveData(args, getStore, { get, remove });

    const actions = store.getActions();
    const data = {};
    data[timestamp1] = protoRp1;
    data[timestamp2] = protoRp2;
    const expectedPayload = {
      type: 'INCOMING_RANGE_DATA',
      payload: {
        tbdId: 'myTbdId',
        dataId: 'myDataId',
        peers: [timestamp1, protoRp1, timestamp2, protoRp2],
      },
    };
    expect(actions).toContainEqual(expectedPayload);
    expect(get('myQueryId')).not.toBeDefined();
  });

  test('Received data LAST lastQuery', () => {
    add('myQueryId', 'myTbdId', 'LAST', 'myDataId');
    const store = mockStore({});
    const getStore = () => store;

    const args = [myQueryProto, {}, protobufTrue, timestamp1, protoRp1, timestamp2, protoRp2];
    onArchiveData(args, getStore, { get, remove });

    const actions = store.getActions();
    const data = {};
    data[timestamp1] = protoRp1;
    data[timestamp2] = protoRp2;
    const expectedPayload = {
      type: 'INCOMING_LAST_DATA',
      payload: {
        tbdId: 'myTbdId',
        dataId: 'myDataId',
        peers: [timestamp1, protoRp1, timestamp2, protoRp2],
      },
    };
    expect(actions).toContainEqual(expectedPayload);
    expect(get('myQueryId')).not.toBeDefined();
  });

  test('Received data LAST not lastQuery', () => {
    add('myQueryId', 'myTbdId', 'LAST', 'myDataId');
    const store = mockStore({});
    const getStore = () => store;

    const args = [myQueryProto, {}, protobufFalse, timestamp1, protoRp1, timestamp2, protoRp2];
    onArchiveData(args, getStore, { get, remove });

    const actions = store.getActions();
    const data = {};
    data[timestamp1] = protoRp1;
    data[timestamp2] = protoRp2;
    const expectedPayload = {
      type: 'INCOMING_LAST_DATA',
      payload: {
        tbdId: 'myTbdId',
        dataId: 'myDataId',
        peers: [timestamp1, protoRp1, timestamp2, protoRp2],
      },
    };
    expect(actions).toContainEqual(expectedPayload);
    expect(get('myQueryId')).toBeDefined();
  });
});
