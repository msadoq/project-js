import configureMockStore from 'redux-mock-store';
import { sendProductLog } from '../../actions/hsc';
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
