import _ from 'lodash/fp';
import sinon from 'sinon';
import { mockStore, freezeMe } from '../../common/jest';
import readView from './readView';
import * as readPageApi from './readPage';
import * as readWorkspaceApi from './readWorkspace';
import * as actions from './actions';

jest.mock('../ipc');

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
      const store = mockStore({ views: { myViewId: { absolutePath: '/an/absolute/path' } } });
      stub = sinon.stub(readView, 'simpleReadView').callsFake((viewInfo, cb) => {
        cb(null, { value: { some: 'properties' } });
      });
      store.dispatch(actions.reloadView('myViewId'));
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
      const store = mockStore({ views: { myViewId: { absolutePath: '/an/absolute/path' } } });
      stub = sinon.stub(readView, 'simpleReadView').callsFake((viewInfo, cb) => {
        cb(new Error());
      });
      store.dispatch(actions.reloadView('myViewId'));
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
    test('dispatches a WS_VIEW_OPENED when view is loaded', () => {
      const store = mockStore();
      stub = sinon.stub(readView, 'simpleReadView').callsFake((viewInfo, cb) => {
        cb(null, { value: { title: 'my view' } });
      });
      store.dispatch(actions.openView('viewInfo', 'myPageId'));
      expect(store.getActions()).toMatchSnapshot();
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

  describe('openWorkspace', () => {
    const readedWorkspaceFixture = {
      type: 'WorkSpace',
      windows: [
        {
          type: 'documentWindow',
          title: 'Unknown',
          geometry: {
            w: 1200,
            h: 900,
            x: 12,
            y: 484,
          },
          pages: [],
          uuid: 'a527fdd3-a228-4773-b1e9-a09e62e2bbf2',
        },
      ],
      timebars: [
        {
          id: 'TB1',
          rulerResolution: 11250,
          speed: 1,
          masterId: 'tl1',
          mode: 'Normal',
          timelines: ['df63e8e7-cb0e-4af5-a271-3b1783617d94'],
          uuid: 'e9ab5b2f-e813-41bd-ae8a-b3121ebddb77',
        },
      ],
      absolutePath:
        '/data/work/gitRepositories/LPISIS/GPCCHS/GPCCHS_E_VIS/src/client/src/main/js/client/data/ws.json',
      timelines: [
        {
          id: 'tl1',
          offset: 0,
          kind: 'session',
          sessionName: 'Master',
          color: '#393b79',
          uuid: 'df63e8e7-cb0e-4af5-a271-3b1783617d94',
        },
      ],
      pages: [
        {
          value: {
            type: 'Page',
            title: 'Unknown',
            views: [],
            path:
              '/pages/little.json',
            timebarId: 'TB1',
            uuid: 'add811db-9c39-447a-b826-d26e55c6cc93',
            timebarUuid: 'e9ab5b2f-e813-41bd-ae8a-b3121ebddb77',
            windowId: 'a527fdd3-a228-4773-b1e9-a09e62e2bbf2',
            workspaceFolder:
              '/data/work/gitRepositories/LPISIS/GPCCHS/GPCCHS_E_VIS/src/client/src/main/js/client/data',
            isModified: false,
            absolutePath:
              '/data/work/gitRepositories/LPISIS/GPCCHS/GPCCHS_E_VIS/src/client/src/main/js/client/data/pages/little.json',
          },
        },
      ],
      views: [
        {
          value: {
            path: '/views/empty.text.json',
            geometry: {
              x: 0,
              y: 0,
              w: 5,
              h: 5,
            },
            hideBorders: false,
            windowState: 'Normalized',
            uuid: 'a4b02e15-6d11-42f3-8e6c-bc3ad04d3d92',
            pageUuid: 'add811db-9c39-447a-b826-d26e55c6cc93',
            pageFolder:
              '/data/work/gitRepositories/LPISIS/GPCCHS/GPCCHS_E_VIS/src/client/src/main/js/client/data/pages',
            type: 'TextView',
            defaultRatio: {
              length: 5,
              width: 5,
            },
            links: [],
            title: 'Collapsed view',
            configuration: {
              content: 'STAT_SU_EXIT_CODE: {{STAT_SU_EXIT_CODE}}',
              entryPoints: [
                {
                  name: 'STAT_SU_EXIT_CODE',
                  connectedData: {
                    formula: 'Reporting.STAT_SU_EXIT_CODE<ReportingParameter>',
                    unit: 's',
                    digits: 5,
                    format: 'decimal',
                    filter: [],
                    domain: 'fr.cnes.isis',
                    timeline: '*',
                  },
                  id: '2e378f9a-93c4-4bbb-b457-1ee656c15a23',
                },
              ],
            },
            titleStyle: {
              font: 'Arial',
              size: 12,
              bold: false,
              italic: false,
              underline: false,
              strikeOut: false,
              align: 'left',
              color: '#ffffff',
              bgColor: '#f44336',
            },
            isModified: false,
            absolutePath:
              '/data/work/gitRepositories/LPISIS/GPCCHS/GPCCHS_E_VIS/src/client/src/main/js/client/data/views/empty.text.json',
          },
        },
      ],
    };
    const initialState = {
      sessions: [{
        delta: 0,
        id: 0,
        missionEpoch: 110,
        name: 'Master',
        timestamp: {
          ms: 1497626439672,
          ps: 0,
        },
      }],
    };
    const removeUuids = _.pipe(
      _.update('windows', _.map(_.unset('uuid'))),
      _.update('timebars', _.map(_.pipe(
        _.unset('uuid'),
        _.set('pages', [])
      ))),
      _.update('timelines', _.map(_.unset('uuid'))),
      _.update('pages', _.map(_.pipe(
        _.unset('uuid'),
        _.unset('timebarUuid'),
        _.unset('windowId')
      ))),
      _.update('views', _.map(_.pipe(
        _.unset('uuid'),
        _.unset('pageUuid')
      )))
    );
    test('open workspace', (done) => {
      const store = mockStore(initialState);
      const stubReadWorkspace = sinon.stub(readWorkspaceApi, 'readWorkspacePagesAndViews').callsFake((info, cb) => {
        cb(null, readedWorkspaceFixture);
      });
      store.dispatch(actions.openWorkspace({ absolutePath: '/fake/absolute/path' }, (err) => {
        const actionsWithoutUuids = _.update('[2].payload', removeUuids, store.getActions());
        expect(err).not.toBeAnError();
        expect(actionsWithoutUuids).toMatchSnapshot();
        stubReadWorkspace.restore();
        done();
      }));
    });
    test('open workspace without session in store', (done) => {
      const store = mockStore(freezeMe({}));
      const stubReadWorkspace = sinon.stub(readWorkspaceApi, 'readWorkspacePagesAndViews').callsFake((info, cb) => {
        cb(null, readedWorkspaceFixture);
      });
      store.dispatch(actions.openWorkspace({ absolutePath: '/fake/absolute/path' }, (err) => {
        const actionsWithoutUuids = _.update('[2].payload', removeUuids, store.getActions());
        expect(err).not.toBeAnError();
        expect(actionsWithoutUuids).toMatchSnapshot();
        stubReadWorkspace.restore();
        done();
      }));
    });
    test('open workspace without timebar masterId', (done) => {
      const store = mockStore(freezeMe({}));
      const stubReadWorkspace = sinon.stub(readWorkspaceApi, 'readWorkspacePagesAndViews').callsFake((info, cb) => {
        const fixture = _.unset('timebars[0].masterId', readedWorkspaceFixture);
        cb(null, fixture);
      });
      store.dispatch(actions.openWorkspace({ absolutePath: '/fake/absolute/path' }, (err) => {
        const actionsWithoutUuids = _.update('[2].payload', removeUuids, store.getActions());
        expect(err).not.toBeAnError();
        expect(actionsWithoutUuids).toMatchSnapshot();
        stubReadWorkspace.restore();
        done();
      }));
    });
    test('open workspace without timeline id', (done) => {
      const store = mockStore(freezeMe({}));
      const stubReadWorkspace = sinon.stub(readWorkspaceApi, 'readWorkspacePagesAndViews').callsFake((info, cb) => {
        const fixture = _.unset('timelines[0].id', readedWorkspaceFixture);
        cb(null, fixture);
      });
      store.dispatch(actions.openWorkspace({ absolutePath: '/fake/absolute/path' }, (err) => {
        const actionsWithoutUuids = _.update('[2].payload', removeUuids, store.getActions());
        expect(err).not.toBeAnError();
        expect(actionsWithoutUuids).toMatchSnapshot();
        stubReadWorkspace.restore();
        done();
      }));
    });
    test('do not open workspace because error', (done) => {
      const store = mockStore(freezeMe({}));
      const stubReadWorkspace = sinon.stub(readWorkspaceApi, 'readWorkspacePagesAndViews').callsFake((info, cb) => {
        cb(new Error('an error'));
      });
      store.dispatch(actions.openWorkspace({ absolutePath: '/fake/absolute/path' }, (errors) => {
        setImmediate(() => {
          const actionsWithoutUuids = _.unset('[2].payload.messages[0].uuid', store.getActions());
          expect(errors).toHaveLength(1);
          expect(errors[0]).toBeAnError();
          expect(actionsWithoutUuids).toMatchSnapshot();
          stubReadWorkspace.restore();
          done();
        });
      }));
    });
  });
});
