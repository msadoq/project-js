
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { askRemoveEntryPoint } from 'store/actions/views';
import makeOnUserAction from './makeOnUserAction';

const mockStore = configureMockStore([thunk, makeOnUserAction()]);

describe('store:serverProcess:middlewares:user:onUserAction', () => {
  test('display confirmation message before removing entry point', () => {
    const store = mockStore({
      views: {
        plotview: {
          uuid: 'plotview',
          type: 'PlotView',
        },
      },
      entryPoints: [
        {
          id: 'a-0',
          name: 'ATT_BC_REVTCOUNT4',
          connectedData: { axisId: 'axis2' },
        },
        {
          id: 'a-1',
          name: 'ATT_BC_REVTCOUNT3',
          connectedData: { axisId: 'axis3' },
        },
      ],
    });

    store.dispatch(askRemoveEntryPoint('plotview', {
      id: 'a-0',
      name: 'ATT_BC_REVTCOUNT4',
      connectedData: { axisId: 'axis2' },
    }));
    expect(store.getActions()).toMatchSnapshot();
  });
});
