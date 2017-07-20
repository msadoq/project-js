import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import _omit from 'lodash/omit';
// import createOpenLinkMiddleware from './openLink';

describe.skip('middlewares/createOpenLinkMiddleware', () => {
  const documentManager = {
    openPage: ({ absolutePath }) => ({ type: 'OPEN_PAGE', absolutePath }),
    openView: ({ absolutePath }) => ({ type: 'OPEN_VIEW', absolutePath }),
    readDocumentType: (payload, cb) => cb(payload.error, payload.type),
  };

  const mockStore = configureMockStore([thunk, createOpenLinkMiddleware(documentManager)]);
  const store = mockStore({
    timebars: { tb1: {} },
    windows: { w1: {} },
    hsc: { focusWindow: 'w1' },
  });
  afterEach(() => {
    store.clearActions();
  });

  const openLink = type => ({
    type: 'WS_OPEN_LINK',
    payload: {
      windowId: 'w1',
      absolutePath: 'myPath',
      type,
    },
  });

  test('open a page', () => {
    store.dispatch(openLink('Page'));
    expect(store.getActions()).toMatchSnapshot();
  });
  const removeUuid = actions => [{ ...actions[0],
    payload: {
      ...actions[0].payload,
      page: _omit(actions[0].payload.page, 'uuid'),
    },
  }, ...actions[1]];

  test('open a view', () => {
    store.dispatch(openLink('PlotView'));
    expect(removeUuid(store.getActions())).toMatchSnapshot();
    store.clearActions();
    store.dispatch(openLink('TextView'));
    expect(removeUuid(store.getActions())).toMatchSnapshot();
    store.clearActions();
    store.dispatch(openLink('MimicView'));
    expect(removeUuid(store.getActions())).toMatchSnapshot();
    store.clearActions();
    store.dispatch(openLink('DynamiucView'));
    expect(removeUuid(store.getActions())).toMatchSnapshot();
  });
  test('Message on type error', () => {
    store.dispatch(openLink('InvalidType'));
    expect(store.getActions()).toMatchSnapshot();
  });
  test('Other action', () => {
    const otherActions = { type: 'WS_OTHER_ACTION' };
    store.dispatch(otherActions);
    expect(store.getActions()).toEqual([{ type: 'WS_OTHER_ACTION' }]);
  });
});
