import configureMockStore from 'redux-mock-store';
import * as types from 'store/types';
import lokiManager from 'serverProcess/models/lokiObsoleteEventData';
import retrieveObsoleteEvent from './retrieveObsoleteEvent';

const { mockRegister, mockLoadStubs } = require('../../../common/jest');

mockRegister();
mockLoadStubs();

const mockIpc = { dc: { requestTimebasedQuery: () => {} } };
const mockStore = configureMockStore([retrieveObsoleteEvent(mockIpc)]);

const store1 = {
  ObsoleteEvents: {
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

describe('store:middlewares:retrieveObsoleteEvent', () => {
  const store = mockStore(store1);
  const neededObsoleteEventData = {
    'TMMGT_BC_VIRTCHAN3:0:4:::':
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

  const viewsNeedObsoleteEventData = () => ({
    type: types.VIEWS_NEED_OBSOLETE_EVENT,
    payload: { neededObsoleteEventData },
  });

  test('Need obsolete data', () => {
    lokiManager.addRecord('TMMGT_BC_VIRTCHAN3:0:4:::', { timestamp: 3, payload: '3' });
    lokiManager.addRecord('TMMGT_BC_VIRTCHAN3:0:4:::', { timestamp: 4, payload: '4' });
    lokiManager.addRecord('TMMGT_BC_VIRTCHAN3:0:4:::', { timestamp: 5, payload: '5' });
    lokiManager.addRecord('TMMGT_BC_VIRTCHAN3:0:4:::', { timestamp: 6, payload: '6' });
    lokiManager.addRecord('TMMGT_BC_VIRTCHAN3:0:4:::', { timestamp: 7, payload: '7' });
    lokiManager.addRecord('TMMGT_BC_VIRTCHAN3:0:4:::', { timestamp: 8, payload: '8' });

    store.dispatch(viewsNeedObsoleteEventData());
    const actions = store.getActions();
    expect(actions[1]).toMatchObject({
      type: 'NEW_DATA',
      payload: { data: { 'TMMGT_BC_VIRTCHAN3:0:4:::': { 4: '4', 5: '5', 6: '6' } } },
    });
  });
});
