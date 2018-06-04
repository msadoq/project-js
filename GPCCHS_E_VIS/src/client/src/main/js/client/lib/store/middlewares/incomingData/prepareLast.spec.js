// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 18/08/2017 : Update multiple test and implementation
// VERSION : 1.1.2 : DM : #6700 : 21/08/2017 : Fix some tests and remove some old code
// END-HISTORY
// ====================================================================

import configureMockStore from 'redux-mock-store';
import * as types from 'store/types';
import lokiManager from 'serverProcess/models/lokiKnownRangesData';
import { getStubData } from 'utils/stubs';
import prepareLast from './prepareLast';

const { mockRegister, mockLoadStubs } = require('../../../common/jest');

mockRegister();
mockLoadStubs();
const dataStub = getStubData();
const mockStore = configureMockStore([prepareLast(lokiManager)]);

describe('store:middlewares:prepareLast', () => {
  const t1 = 1420106790820;
  const t2 = 1420106790830;

  const timestamp1 = dataStub.getTimestampProtobuf({ ms: t1 });
  const timestamp2 = dataStub.getTimestampProtobuf({ ms: t2 });

  const rp1 = dataStub.getReportingParameter();
  const rp2 = dataStub.getReportingParameter();

  const protoRp1 = dataStub.getReportingParameterProtobuf(rp1);
  const protoRp2 = dataStub.getReportingParameterProtobuf(rp2);

  const deprotoRp1 = dataStub.getReportingParameterDeProtobuf(protoRp1);
  const deprotoRp2 = dataStub.getReportingParameterDeProtobuf(protoRp2);

  const incomingLastData = () => ({
    type: types.INCOMING_LAST_DATA,
    payload: {
      tbdId: 'Reporting.STAT_SU_PID<ReportingParameter>:1:1',
      dataId: { comObject: 'ReportingParameter' },
      peers: [timestamp1, protoRp1, timestamp2, protoRp2],
    },
  });

  test('Receive last data', () => {
    const store = mockStore();
    store.dispatch(incomingLastData());
    const actions = store.getActions();
    const data = {
      lasts: {
        'Reporting.STAT_SU_PID<ReportingParameter>:1:1': {},
      },
    };
    data.lasts['Reporting.STAT_SU_PID<ReportingParameter>:1:1'][t1] = deprotoRp1;
    data.lasts['Reporting.STAT_SU_PID<ReportingParameter>:1:1'][t2] = deprotoRp2;
    const expectedPayload = {
      type: 'NEW_DATA',
      payload: {
        data,
      },
    };
    expect(actions[1])
      .toMatchObject(expectedPayload);
  });
});
