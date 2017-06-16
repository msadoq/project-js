import _ from 'lodash/fp';
import sinon from 'sinon';
import { mockStore, freezeMe } from '../common/jest';
import readView from './readView';
import * as readPageApi from './readPage';
import * as io from './io';
import * as actions from './actions';

describe('documentManager:actions', () => {
  let stub;
  beforeEach(() => {
    stub = { restore: _.noop };
  });
  afterEach(() => {
    stub.restore();
  });

  describe('reloadView', () => {
    test('reload view', () => {
      const store = mockStore();
      stub = sinon.stub(readView, 'simpleReadView').callsFake((viewInfo, cb) => {
        cb(null, { some: 'properties' });
      });
      store.dispatch(actions.reloadView('myViewId', '/absolute/path'));
      expect(store.getActions()).toMatchObject([
        {
          type: 'WS_VIEW_RELOAD',
          payload: { viewId: 'myViewId', view: { some: 'properties', uuid: 'myViewId' } },
        },
        {
          type: 'WS_MESSAGE_ADD',
          payload: {
            containerId: 'myViewId',
            type: 'success',
            messages: [{ content: 'View reloaded' }],
          },
        },
      ]);
    });
    test('invalid view file', () => {
      const store = mockStore();
      stub = sinon.stub(readView, 'simpleReadView').callsFake((viewInfo, cb) => {
        cb(new Error());
      });
      store.dispatch(actions.reloadView('myViewId', '/absolute/path'));
      expect(store.getActions()).toMatchObject([
        {
          type: 'WS_MESSAGE_ADD',
          payload: {
            containerId: 'myViewId',
            type: 'danger',
            messages: [
              {
                content: 'Invalid View file selected',
              },
            ],
          },
        },
      ]);
    });
  });

  describe('openView', () => {
    test('dispatches a message in case of error', () => {
      const store = mockStore();
      stub = sinon.stub(readView, 'simpleReadView').callsFake((viewInfo, cb) => {
        cb(null, { error: 'Error' });
      });
      store.dispatch(actions.openView('viewInfo'));
      expect(store.getActions()).toMatchObject([
        {
          type: 'WS_MESSAGE_ADD',
          payload: {
            containerId: 'global',
            type: 'danger',
            messages: [{ content: 'Error' }],
          },
        },
      ]);
    });
    test('dispatches a WS_VIEW_OPEN when view is loaded', () => {
      const store = mockStore();
      stub = sinon.stub(readView, 'simpleReadView').callsFake((viewInfo, cb) => {
        cb(null, { value: { title: 'my view' } });
      });
      store.dispatch(actions.openView('viewInfo', 'myPageId'));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_VIEW_OPEN',
          payload: {
            pageId: 'myPageId',
            view: { title: 'my view' },
          },
        },
      ]);
    });
  });

  describe('openPage', () => {
    test('dispatches a global error message in case of error', () => {
      const store = mockStore();
      stub = sinon.stub(readPageApi, 'readPageAndViews').callsFake((pageInfo, cb) => {
        cb(null, { views: [{ error: 'Error view' }], pages: [{ error: 'Error page' }] });
      });
      store.dispatch(actions.openPage('page_info'));
      expect(store.getActions()).toMatchObject([
        {
          type: 'WS_MESSAGE_ADD',
          payload: {
            containerId: 'global',
            type: 'danger',
            messages: [{ content: 'Error view' }, { content: 'Error page' }],
          },
        },
      ]);
    });

    test('opens Page', (done) => {
      const store = mockStore(freezeMe({}));
      stub = sinon.stub(readPageApi, 'readPageAndViews').callsFake((pageInfo, cb) => {
        cb(null, {
          views: [{ value: { type: 'TextView' } }],
          pages: [{ value: { windowId: 'windowId', type: 'Page' } }],
        });
      });
      store.dispatch(actions.openPage('page_info'));
      expect(store.getActions()).toMatchSnapshot();
      done();
    });
  });

  describe('openPageOrView', () => {
    test('open a page', () => {
      const store = mockStore();
      stub = sinon.stub(readPageApi, 'readPageAndViews').callsFake((pageInfo, cb) => {
        cb(null, {
          views: [{ value: { type: 'TextView' } }],
          pages: [{ value: { windowId: 'windowId', type: 'Page' } }],
        });
      });
      const stubReadDocumentType = sinon.stub(io, 'readDocumentType').callsFake((docInfo, cb) => {
        cb(null, 'Page');
      });
      store.dispatch(actions.openPageOrView('page_info'));
      expect(store.getActions()).toMatchSnapshot();
      stubReadDocumentType.restore();
    });
    test('open a view in a blank page', () => {
      const store = mockStore(
        freezeMe({
          hsc: { focusWindow: 'w1' },
          windows: { w1: { focusedPage: 'p1' } },
        })
      );
      stub = sinon.stub(readView, 'simpleReadView').callsFake((viewInfo, cb) => {
        cb(null, { value: { title: 'my view' } });
      });
      const stubReadDocumentType = sinon.stub(io, 'readDocumentType').callsFake((docInfo, cb) => {
        cb(null, 'TextView');
      });
      store.dispatch(actions.openPageOrView('view_info'));

      const actionsWithoutUuids = _.unset('[0].payload.page.uuid', store.getActions());
      expect(actionsWithoutUuids).toMatchSnapshot();
      expect(store.getActions()[0].payload.page.uuid).toBeAnUuid();
      stubReadDocumentType.restore();
    });
    test('give an error when readDocument failed', () => {
      const store = mockStore(freezeMe({}));
      const stubReadDocumentType = sinon.stub(io, 'readDocumentType').callsFake((docInfo, cb) => {
        cb(new Error('an error'));
      });
      store.dispatch(actions.openPageOrView());
      expect(store.getActions()).toMatchObject([
        {
          type: 'WS_MESSAGE_ADD',
          payload: {
            containerId: 'global',
            type: 'danger',
            messages: [{ content: 'an error' }],
          },
        },
      ]);
      stubReadDocumentType.restore();
    });
    test('give an error when view type is unknown', () => {
      const store = mockStore(freezeMe({}));
      const stubReadDocumentType = sinon.stub(io, 'readDocumentType').callsFake((docInfo, cb) => {
        cb(null, 'A Type');
      });
      store.dispatch(actions.openPageOrView());
      expect(store.getActions()).toMatchObject([
        {
          type: 'WS_MESSAGE_ADD',
          payload: {
            containerId: 'global',
            type: 'danger',
            messages: [{ content: 'Error, unknown type \'A Type\'' }],
          },
        },
      ]);
      stubReadDocumentType.restore();
    });
  });

  describe('openWorkspace', () => {
    test('open workspace');
    test('open workspace with errors');
    test('do not open workspace because error');
  });

  describe('openBlankWorkspace', () => {
    test('close current workspace, then open a freshly new created workspace', () => {
      const store = mockStore();
      store.dispatch(actions.openBlankWorkspace());
      const workspaceOpenPayload = store.getActions()[1].payload;
      const firstTimebar = workspaceOpenPayload.timebars[0];
      expect(firstTimebar.visuWindow).toHaveKeys(['lower', 'upper', 'current']);
      expect(firstTimebar.slideWindow).toHaveKeys(['lower', 'upper']);
      expect(firstTimebar).toHaveKeys(['rulerStart']);
      expect(workspaceOpenPayload.windows[0].pages[0]).toBeAnUuid();
      expect(workspaceOpenPayload.windows[0].uuid).toBeAnUuid();
      expect(workspaceOpenPayload.timebars[0].uuid).toBeAnUuid();
      expect(workspaceOpenPayload.pages[0].uuid).toBeAnUuid();
      expect(workspaceOpenPayload.pages[0].timebarUuid).toBeAnUuid();
      expect(store.getActions()).toMatchObject([
        { type: 'HSC_CLOSE_WORKSPACE', payload: {} },
        {
          type: 'WS_WORKSPACE_OPEN',
          payload: {
            windows: [
              {
                title: 'Unknown',
                type: 'documentWindow',
                geometry: { w: 1200, h: 900, x: 10, y: 10 },
              },
            ],
            timebars: [
              {
                type: 'timeBarConfiguration',
                id: 'TB1',
                mode: 'Normal',
                rulerResolution: 11250,
                speed: 1,
                offsetFromUTC: 0,
                timelines: [],
              },
            ],
            pages: [
              {
                type: 'Page',
                title: 'Unknown',
                hideBorders: false,
                timebarId: 'TB1',
              },
            ],
          },
        },
      ]);
    });
  });
});
