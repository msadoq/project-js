// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 31/07/2017 : Add pubsub controller and its test
// VERSION : 1.1.2 : DM : #6700 : 31/07/2017 : Modify pubSub Controller to send dataId decoded
// VERSION : 1.1.2 : FA : #7578 : 24/08/2017 : Add robustness code on dataId retrieval
// END-HISTORY
// ====================================================================

import configureMockStore from 'redux-mock-store';
import flattenDataId from '../../../common/flattenDataId';

const { mockRegister, mockLoadStubs } = require('../../../common/jest');
const { getStubData } = require('../../../utils/stubs');

mockRegister();
mockLoadStubs();

const mockStore = configureMockStore();
const { encode, decode } = require('../../../utils/adapters');
const makeOnPubSubData = require('./pubSubController');

const onPubSubData = makeOnPubSubData(500);
const dataStub = getStubData();

describe('controllers/pubSub', () => {
  let store;
  const getStore = () => store;
  const myDataId = dataStub.getDataId();

  const myDataIdProto = encode('dc.dataControllerUtils.DataId', myDataId);
  const myDataIdDecoded = decode('dc.dataControllerUtils.DataId', myDataIdProto);

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
        data: {
          [flattenDataId(myDataId)]: {
            dataId: myDataIdDecoded,
            payloadBuffers: [timestamp1, protoRp1, timestamp2, protoRp2],
          },
        },
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
