
import configureMockStore from 'redux-mock-store';
import retrieveRange from './retrieveRange';

import { add } from '../../../serverProcess/models/registeredArchiveQueriesSingleton';

import viewsNeedRange from '../../actions/retrieveData';

import { getStubData } from '../../../utils/stubs';

const { mockRegister, mockLoadStubs } = require('../../../common/jest');

mockRegister();
mockLoadStubs();
const dataStub = getStubData();
const mockStore = configureMockStore([retrieveRange()]);

describe('store:middlewares:retrieveRange', () => {
  const store = mockStore();

  /* const viewsNeedRangeData = () => ({
    type: types.VIEWS_NEED_RANGE,
    payload: {
      tbdId: 'Reporting.STAT_SU_PID<ReportingParameter>:1:1',
      dataId: { comObject: 'ReportingParameter' },
      peers: [timestamp1, protoRp1, timestamp2, protoRp2],
    },
  }); */

  test('dummy test [retrieveRange]', () => {
    expect(store.getActions()).toMatchSnapshot();
  });
});
