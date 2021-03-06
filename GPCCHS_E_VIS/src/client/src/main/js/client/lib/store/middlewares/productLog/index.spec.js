// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7145 : 04/08/2017 : Add unit test for productLog middleware
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import configureMockStore from 'redux-mock-store';
import { sendProductLog } from 'store/actions/hsc';
import makeProductLogMiddleware from './';

const fakeSendProductLog = x => x;
const mockStore = configureMockStore([makeProductLogMiddleware(fakeSendProductLog)]);

describe('mainProcess:store:middlewares:wikiHelper', () => {
  const store = mockStore({});

  beforeEach(() => {
  });

  afterEach(() => {
    store.clearActions();
  });

  test('propagate unknown action', () => {
    store.dispatch({ type: 'DUMMY_ACTION' });
    expect(store.getActions()).toEqual([{ type: 'DUMMY_ACTION' }]);
  });

  test('send product logs', () => {
    store.dispatch(sendProductLog(1337, '1', '2', '3'));
    expect(store.getActions()).toMatchSnapshot();
  });
});
