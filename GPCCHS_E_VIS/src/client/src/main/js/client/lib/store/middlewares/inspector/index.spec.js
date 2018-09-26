// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7145 : 04/08/2017 : Move inspector middleware in a folder
// VERSION : 2.0.0 : DM : #5806 : 15/11/2017 : Implement open inspector for a specific gma
//  parameter
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from 'store/types';
import makeInspectorMiddleware from './';


const mockStore = configureMockStore([thunk, makeInspectorMiddleware()]);

const askOpenInspector = (epId = 'myEp', catalog = 'Reporting', parameterName = 'param') => ({
  type: types.HSC_ASK_OPEN_INSPECTOR,
  payload: {
    pageId: 'p1',
    viewId: 'v1',
    type: 'MimicView',
    options: {
      epName: 'ep',
      epId,
      dataId: {
        parameterName,
        catalog,
        sessionId: 'sessionId',
        domainId: 'domainId',
      },
      field: 'field',
    },
  },
});

describe('store:serverProcess:middlewares:inspector', () => {
  const store = mockStore({ inspector: { generalData: { epId: 'ep1' } } });

  afterEach(() => {
    store.clearActions();
  });

  test('open inspector', () => {
    store.dispatch(askOpenInspector('ep1'));
    expect(store.getActions()).toMatchSnapshot();
  });
});
