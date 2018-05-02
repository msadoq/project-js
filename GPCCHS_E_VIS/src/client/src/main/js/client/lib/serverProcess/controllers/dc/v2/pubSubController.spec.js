// ====================================================================
// HISTORY
// VERSION : 2.0.0 : FA : ISIS-FT-2159 : 20/03/2018 : Update unit tests and stubs for provider
//  field and fix parseEntryPoint calls in all views
// END-HISTORY
// ====================================================================

import configureMockStore from 'redux-mock-store';
import flattenDataId from 'common/flattenDataId';

const { mockRegister, mockLoadStubs } = require('../../../../common/jest');
const { getStubData } = require('../../../../utils/stubs');

mockRegister();
mockLoadStubs();

const mockStore = configureMockStore();
const makeOnPubSubData = require('./pubSubController');

const onPubSubData = makeOnPubSubData(500);
const dataStub = getStubData();

describe('controllers/pubSub', () => {
  let store;
  const getStore = () => store;
  const myDataId = dataStub.getDataId();

  const override = {
    objectName: myDataId.comObject,
    catalogName: myDataId.catalog,
    sessionId: myDataId.sessionId,
    domainId: myDataId.domainId,
    itemName: myDataId.parameterName,
  };

  const ADETimebasedSubscription = dataStub.getADETimebasedSubscriptionProtobuf(override);

  const t1 = 1420106790820;
  const t2 = 1420106790830;

  const timestamp1 = dataStub.getTimestampProtobuf({ ms: t1 });
  const timestamp2 = dataStub.getTimestampProtobuf({ ms: t2 });

  const rp1 = dataStub.getReportingParameter();
  const rp2 = dataStub.getReportingParameter();

  const protoRp1 = dataStub.getReportingParameterProtobuf(rp1);
  const protoRp2 = dataStub.getReportingParameterProtobuf(rp2);

  const protoADEPayload1 = dataStub.getADEPayloadProtobuf({
    payload: protoRp1,
    providerId: 0,
    comObjectType: myDataId.comObject,
    instanceOid: 0,
  });

  const protoADEPayload2 = dataStub.getADEPayloadProtobuf({
    payload: protoRp2,
    providerId: 0,
    comObjectType: myDataId.comObject,
    instanceOid: 0,
  });

  test('Received pubSub data', () => {
    store = mockStore({});
    const buffers = [
      ADETimebasedSubscription,
      timestamp1,
      protoADEPayload1,
      timestamp2,
      protoADEPayload2,
    ];
    onPubSubData({ buffers }, getStore);

    const actions = store.getActions();
    const expectedPayload = {
      type: 'INCOMING_PUBSUB_DATA',
      payload: {
        data: {
          [flattenDataId(myDataId)]: {
            dataId: myDataId,
            payloadBuffers: [timestamp1, protoADEPayload1, timestamp2, protoADEPayload2],
          },
        },
      },
    };
    expect(actions).toContainEqual(expectedPayload);
  });

  test('Received odd-numbered pubSub data', () => {
    store = mockStore({});
    const buffers = [
      ADETimebasedSubscription,
      timestamp1,
      protoADEPayload1,
      timestamp2,
      protoADEPayload2,
    ];
    onPubSubData({ buffers }, getStore);

    const actions = store.getActions();
    expect(actions).toEqual([]);
  });
});
