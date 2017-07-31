import configureMockStore from 'redux-mock-store';

const { mockRegister, mockLoadStubs } = require('../../../common/jest');
const { getStubData } = require('../../../utils/stubs');

mockRegister();
mockLoadStubs();

const mockStore = configureMockStore();
const { encode } = require('../../../utils/adapters');
const onPubSubData = require('./pubSubController');

const dataStub = getStubData();

describe('controllers/pubSub', () => {
  let store;
  const getStore = () => store;
  const myDataId = dataStub.getDataId();

  const myDataIdProto = encode('dc.dataControllerUtils.DataId', myDataId);

  const t1 = 1420106790820;
  const t2 = 1420106790830;

  const timestamp1 = dataStub.getTimestampProtobuf({ ms: t1 });
  const timestamp2 = dataStub.getTimestampProtobuf({ ms: t2 });

  const rp1 = dataStub.getReportingParameter();
  const rp2 = dataStub.getReportingParameter();

  const protoRp1 = dataStub.getReportingParameterProtobuf(rp1);
  const protoRp2 = dataStub.getReportingParameterProtobuf(rp2);

  test('Received pubSub data', () => {
    store = mockStore({});
    const args = [{}, myDataIdProto, timestamp1, protoRp1, timestamp2, protoRp2];
    onPubSubData(args, getStore);

    const actions = store.getActions();
    const expectedPayload = {
      type: 'INCOMING_PUBSUB_DATA',
      payload: {
        dataId: myDataIdProto,
        peers: [timestamp1, protoRp1, timestamp2, protoRp2],
      },
    };
    expect(actions).toContainEqual(expectedPayload);
  });

  test('Received odd-numbered pubSub data', () => {
    store = mockStore({});
    const args = [{}, myDataIdProto, timestamp1, protoRp1, timestamp2, protoRp2, timestamp1];
    onPubSubData(args, getStore);

    const actions = store.getActions();
    expect(actions).toEqual([]);
  });
});
