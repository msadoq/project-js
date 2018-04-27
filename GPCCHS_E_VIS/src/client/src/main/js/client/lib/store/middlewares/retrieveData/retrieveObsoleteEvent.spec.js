import configureMockStore from 'redux-mock-store';
import * as types from 'store/types';
import { GETLASTTYPE_GET_LAST } from 'constants';
import retrieveObsoleteEvent from './retrieveObsoleteEvent';

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
const mockStore = configureMockStore([retrieveObsoleteEvent(mockIpc)]);

const store1 = {
  Events: {},
};

describe('store:middlewares:retrieveObsoleteEvent', () => {
  beforeEach(() => {
    mockResultIpc = {};
  });

  const neededObsoleteEventData1 = {
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

  const neededObsoleteEventData2 = {
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

  const neededObsoleteEventData3 = {
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

  const viewsNeedObsoleteEventData = neededObsoleteEventData => ({
    type: types.VIEWS_NEED_OBSOLETE_EVENT,
    payload: { neededObsoleteEventData },
  });
  test('Is not in interval', () => {
    const store = mockStore(store1);
    store.dispatch(viewsNeedObsoleteEventData(neededObsoleteEventData1));
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
});
