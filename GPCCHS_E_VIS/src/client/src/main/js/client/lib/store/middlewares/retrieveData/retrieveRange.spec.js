import configureMockStore from 'redux-mock-store';
import retrieveRange from './retrieveRange';
import * as types from '../../types';
import { add } from '../../../serverProcess/models/registeredArchiveQueriesSingleton';
import lokiManager from '../../../serverProcess/models/lokiKnownRangesData';

const { mockRegister, mockLoadStubs } = require('../../../common/jest');

mockRegister();
mockLoadStubs();

const mockIpc = { dc: { requestTimebasedQuery: () => {} } };
const mockStore = configureMockStore([retrieveRange(mockIpc)]);

const store1 = {
  knownRanges: {
    tbdId1: {
      flatDataId: 'flatDataId1',
      filters: [],
      intervals: [[10, 20]],
    },
    tbdId2: {
      flatDataId: 'flatDataId2',
      filters: [],
      intervals: [[10, 20], [1420106790800, 1420106790850]],
    },
  },
};

describe('store:middlewares:retrieveRange', () => {
  const store = mockStore(store1);

  const neededRangeData = {
    tbdId1:
    {
      dataId:
      {
        catalog: 'Reporting',
        parameterName: 'TMMGT_BC_VIRTCHAN3',
        comObject: 'ReportingParameter',
        domainId: 4,
        domain: 'fr.cnes.isis.simupus',
        sessionName: 'Master',
        sessionId: 0,
      },
      intervals: [[4, 6]],
      filters: [],
    },
    tbdId2:
    {
      dataId:
      {
        catalog: 'Reporting',
        parameterName: 'ATT_BC_REVTCOUNT1',
        comObject: 'ReportingParameter',
        domainId: 1,
        domain: 'fr.cnes.isis',
        sessionName: 'Master',
        sessionId: 0,
      },
      intervals: [[10, 20]],
      filters: [],
    },
  };

  const viewsNeedRangeData = () => ({
    type: types.VIEWS_NEED_RANGE,
    payload: { neededRangeData },
  });


  test('dummy test [retrieveRange]', () => {
    // expect(store.getActions()).toMatchSnapshot();
  });

  test('Need range data', () => {
    lokiManager.addRecord('tbdId1', { timestamp: 3, payload: '3' });
    lokiManager.addRecord('tbdId1', { timestamp: 4, payload: '4' });
    lokiManager.addRecord('tbdId1', { timestamp: 5, payload: '5' });
    lokiManager.addRecord('tbdId1', { timestamp: 6, payload: '6' });
    lokiManager.addRecord('tbdId1', { timestamp: 7, payload: '7' });
    lokiManager.addRecord('tbdId1', { timestamp: 8, payload: '8' });

    store.dispatch(viewsNeedRangeData());
    const actions = store.getActions();
    expect(actions[0]).toMatchObject({
      type: 'NEW_DATA',
      payload: { data: { tbdId1: { 4: '4', 5: '5', 6: '6' } } },
    });
    expect(actions[1]).toMatchObject({
      type: 'WS_KNOWNINTERVAL_ADD',
      payload: {
        dataId:
        {
          catalog: 'Reporting',
          parameterName: 'TMMGT_BC_VIRTCHAN3',
          comObject: 'ReportingParameter',
          domainId: 4,
          domain: 'fr.cnes.isis.simupus',
          sessionName: 'Master',
          sessionId: 0,
        },
        intervals: [[4, 6]],
        tbdId: 'tbdId1',
      },
    });
  });
});
