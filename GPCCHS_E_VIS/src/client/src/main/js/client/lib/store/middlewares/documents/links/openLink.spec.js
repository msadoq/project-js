import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import createOpenLinkMiddleware from './openLink';

describe('middlewares/createOpenLinkMiddleware', () => {
  const documentManager = {
    openPage: payload => ({ type: 'OPEN_PAGE', payload }),
    openView: (payload, pageId) => ({ type: 'OPEN_VIEW', payload: { ...payload, pageId } }),
    readDocumentType: ({ path }, cb) => {
      if (path === '/page' || path === '/p1') {
        return cb(null, 'Page');
      }
      if (path === '/textview' || path === '/v2') {
        return cb(null, 'TextView');
      }
      if (path === '/error') {
        return cb(new Error('Error readDocumentType'));
      }
      return cb(null, 'unknownType');
    },
  };

  const mockStore = configureMockStore([thunk, createOpenLinkMiddleware(documentManager)]);
  const store = mockStore({
    timebars: { tb1: {} },
    windows: { w1: { pages: ['p1'] } },
    hsc: { focusWindow: 'w1' },
    views: {
      v1: {
        uuid: 'v1',
        absolutePath: '/path/to/view.json',
        links: [
          { path: '/page' },
          { path: '/textview' },
          { path: '/error' },
          { path: '/v2' },
          { path: '/p1' },
          { path: '/unknown' },
        ],
      },
      v2: {
        uuid: 'v2',
        absolutePath: '/v2',
      },
    },
    pages: {
      p1: {
        views: ['v2'],
        uuid: 'p1',
        absolutePath: '/p1',
      },
    },
  });
  afterEach(() => {
    store.clearActions();
  });

  const openLink = linkId => ({
    type: 'WS_ASK_OPEN_LINK',
    payload: {
      viewId: 'v1',
      linkId,
    },
  });

  test('open a page', () => {
    store.dispatch(openLink(0));
    expect(store.getActions()).toMatchSnapshot();
  });
  test('open a view', () => {
    store.dispatch(openLink(1));
    expect(store.getActions()).toMatchSnapshot();
  });
  test('Error : Message on readDocumentType error', () => {
    store.dispatch(openLink(2));
    expect(store.getActions()).toMatchSnapshot();
  });
  test('Error : Message on unknown link', () => {
    store.dispatch(openLink(999));
    expect(store.getActions()).toMatchSnapshot();
  });
  test('Error: Message on type error', () => {
    store.dispatch(openLink(5));
    expect(store.getActions()).toMatchSnapshot();
  });
  test('open a linked view already opened (focus)', () => {
    store.dispatch(openLink(3));
    expect(store.getActions()).toMatchSnapshot();
  });
  test('open a linked page already opened (focus)', () => {
    store.dispatch(openLink(4));
    expect(store.getActions()).toMatchSnapshot();
  });
  test('Other action', () => {
    const otherActions = { type: 'WS_OTHER_ACTION' };
    store.dispatch(otherActions);
    expect(store.getActions()).toEqual([{ type: 'WS_OTHER_ACTION' }]);
  });
});
