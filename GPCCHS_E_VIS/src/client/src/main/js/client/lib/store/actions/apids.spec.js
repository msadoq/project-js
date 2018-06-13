import { mockStore } from 'common/jest';
import * as actions from './apids';
import {
  WS_APIDS_ASK,
  WS_APIDS_ADD,
} from '../types';

describe('store:actions:editor', () => {
  const state = {};
  test('dispatch a "WS_APIDS_ASK"', () => {
    const store = mockStore(state);
    store.dispatch(actions.askApids('domainId', 'sessionId'));
    expect(store.getActions()).toMatchObject([
      { payload: { domainId: 'domainId', sessionId: 'sessionId' }, type: WS_APIDS_ASK },
    ]);
  });
  test('dispatch a "WS_APIDS_ADD"', () => {
    const store = mockStore(state);
    store.dispatch(actions.addApids('domainId-sessionId', []));
    expect(store.getActions()).toMatchObject([
      { payload: { tupleId: 'domainId-sessionId', apids: [] }, type: WS_APIDS_ADD },
    ]);
  });
});
