import configureMockStore from 'redux-mock-store';
import * as types from 'store/types';

import makeWikiHelperMiddleware from './';

let urlOpened = null;
let fakeUrl = null;
const fakeGetUrl = () => fakeUrl;

const fakeOpen = (path) => {
  if (path === 'http://error') {
    return Promise.reject(new Error('an error has occured'));
  }
  urlOpened = path;
  return Promise.resolve(true);
};

const mockStore = configureMockStore([makeWikiHelperMiddleware(fakeOpen, fakeGetUrl)]);

describe('mainProcess:store:middlewares:wikiHelper', () => {
  const store = mockStore({});

  beforeEach(() => {
    urlOpened = null;
    fakeUrl = null;
  });

  afterEach(() => {
    store.clearActions();
  });

  test('propagate unknown action', () => {
    store.dispatch({ type: 'DUMMY_ACTION' });
    expect(store.getActions()).toEqual([{ type: 'DUMMY_ACTION' }]);
  });

  test('no url provided', () => {
    store.dispatch({ type: types.HSC_OPEN_WIKI_HELPER });
    expect(store.getActions()).toMatchSnapshot();
  });

  test('catch error if failing to open', (done) => {
    fakeUrl = 'http://error';
    store.dispatch({ type: types.HSC_OPEN_WIKI_HELPER });
    setImmediate(() => {
      expect(store.getActions()).toMatchSnapshot();
      done();
    });
  });

  test('open url (http)', () => {
    fakeUrl = 'http://google.fr';
    store.dispatch({ type: types.HSC_OPEN_WIKI_HELPER });
    expect(store.getActions()).toMatchSnapshot();
    expect(urlOpened).toBe(fakeUrl);
  });

  test('open url (https)', () => {
    fakeUrl = 'https://google.fr';
    store.dispatch({ type: types.HSC_OPEN_WIKI_HELPER });
    expect(store.getActions()).toMatchSnapshot();
    expect(urlOpened).toBe(fakeUrl);
  });

  test('open url (without protocol)', () => {
    fakeUrl = 'google.fr';
    store.dispatch({ type: types.HSC_OPEN_WIKI_HELPER });
    expect(store.getActions()).toMatchSnapshot();
    expect(urlOpened).toBe(`http://${fakeUrl}`);
  });
});
