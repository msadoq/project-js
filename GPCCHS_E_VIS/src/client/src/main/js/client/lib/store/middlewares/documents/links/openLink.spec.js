// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Move openLink middleware in documents
//  middleware
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 20/07/2017 : Reimplement openLink middleware . .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Rewrite openLink middleware unit tests
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Rename all create* middleware by make*
// VERSION : 1.1.2 : FA : #7145 : 25/07/2017 : Use askOpenLink action creator in openLink unit
//  tests
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { askOpenLink } from 'store/actions/links';
import makeOpenLinkMiddleware from './openLink';

describe('middlewares/makeOpenLinkMiddleware', () => {
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

  const mockStore = configureMockStore([thunk, makeOpenLinkMiddleware(documentManager)]);
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

  const openLink = linkId => askOpenLink('v1', linkId);

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
