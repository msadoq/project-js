// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 24/07/2017 : Add retrieveMIddleware test skeleton implementation
// VERSION : 1.1.2 : DM : #6700 : 21/08/2017 : Update retrieve range and last test
// END-HISTORY
// ====================================================================

import configureMockStore from 'redux-mock-store';
import retrieveLast from './retrieveLast';
import * as types from '../../types';
import { /* getLastRecords , */ addRecords } from '../../../serverProcess/models/lokiKnownRangesData';
import { GETLASTTYPE_GET_LAST } from '../../../constants';

let mockResultIpc = {};
let counter = 0;
const mockIpc = { dc: { requestTimebasedQuery: (tbdId, dataId, intervals, args) => {
  mockResultIpc = {
    tbdId,
    dataId,
    intervals,
    args,
  };
  counter += 1;
  return counter;
} } };
const mockStore = configureMockStore([retrieveLast(mockIpc)]);

const store1 = {
  knownRanges: {
    tbdId1: {
      flatDataId: 'flatDataId1',
      filters: [],
      intervals: [[10, 20], [30, 40]],
    },
  },
};

describe('store:middlewares:retrieveLast', () => {
  beforeEach(() => {
    mockResultIpc = {};
  });

  const neededLastData1 = {
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
  };

  const neededLastData2 = {
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
      intervals: [[12, 18]],
      filters: [],
    },
  };

  const neededLastData3 = {
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
      intervals: [[31, 37]],
      filters: [],
    },
  };

  const viewsNeedLastData = neededLastData => ({
    type: types.VIEWS_NEED_LAST,
    payload: { neededLastData },
  });
  test('Is not in interval', () => {
    const store = mockStore(store1);
    store.dispatch(viewsNeedLastData(neededLastData1));
    const actions = store.getActions();

    expect(actions.length).toEqual(1);
    expect(mockResultIpc).toMatchObject({
      tbdId: 'tbdId1',
      dataId: {
        catalog: 'Reporting',
        parameterName: 'TMMGT_BC_VIRTCHAN3',
        comObject: 'ReportingParameter',
        domainId: 4,
        domain: 'fr.cnes.isis.simupus',
        sessionName: 'Master',
        sessionId: 0,
      },
      intervals: [4, 6],
      args: {
        getLastType: GETLASTTYPE_GET_LAST,
        filters: [],
      },
    });
  });

  test('Is in interval but no value attached', () => {
    const store = mockStore(store1);
    addRecords('tbdId1', [{
      timestamp: 2,
      payload: '2',
    }]);
    store.dispatch(viewsNeedLastData(neededLastData2));
    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    expect(mockResultIpc).toMatchObject({
      tbdId: 'tbdId1',
      dataId: {
        catalog: 'Reporting',
        parameterName: 'TMMGT_BC_VIRTCHAN3',
        comObject: 'ReportingParameter',
        domainId: 4,
        domain: 'fr.cnes.isis.simupus',
        sessionName: 'Master',
        sessionId: 0,
      },
      intervals: [12, 18],
      args: {
        getLastType: GETLASTTYPE_GET_LAST,
        filters: [],
      },
    });
  });

  test('Is in interval and value is present', () => {
    const store = mockStore(store1);
    addRecords('tbdId1', [{
      timestamp: 33,
      payload: '33',
    },
    {
      timestamp: 35,
      payload: '35',
    },
    {
      timestamp: 38,
      payload: '38',
    }]);
    store.dispatch(viewsNeedLastData(neededLastData3));
    const actions = store.getActions();
    expect(actions.length).toEqual(2);
    expect(actions[1]).toMatchObject({
      type: 'NEW_DATA',
      payload: { data: { tbdId1: { 35: '35' } } },
    });
  });
});
