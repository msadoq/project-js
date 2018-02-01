// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 17/02/2017 : Test all views thunks .
// VERSION : 1.1.2 : DM : #3622 : 17/02/2017 : Write tests about setCollapsedAndUpdateLayout thunk in actions/views
// VERSION : 1.1.2 : DM : #3622 : 20/02/2017 : Fix addEntryPoint tests in views.spec.js
// VERSION : 1.1.2 : FA : #5475 : 22/02/2017 : Debug ifPathChanged higher order action creator
// VERSION : 1.1.2 : DM : #3622 : 22/02/2017 : Add dropEntrypoint thunk in actions/views
// VERSION : 1.1.2 : DM : #3622 : 03/03/2017 : Work on Maximize and collapse bugs
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Fix missing generated id to entryPoints
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Refacto some selectors . .
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Cleanup React components tree and props
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Cleanup React components tree and props
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Fix few broken unit tests
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Migrate merged new tests in jest
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Fix jest tests in store/actions
// VERSION : 1.1.2 : DM : #6785 : 12/06/2017 : activate links in views .
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js in jest/index.js
// END-HISTORY
// ====================================================================

import { mockStore, freezeMe } from 'common/jest';
import * as actions from './views';

const defaultStateColor = [
  {
    color: 'orangered',
    condition: {
      field: 'monitoringState',
      operand: 'alarm',
      operator: '=',
    },
  },
  {
    color: 'red',
    condition: {
      field: 'monitoringState',
      operand: 'critical',
      operator: '=',
    },
  },
  {
    color: 'white',
    condition: {
      field: 'monitoringState',
      operand: 'info',
      operator: '=',
    },
  },
  {
    color: 'grey',
    condition: {
      field: 'monitoringState',
      operand: 'outOfRange',
      operator: '=',
    },
  },
  {
    color: 'darkred',
    condition: {
      field: 'monitoringState',
      operand: 'severe',
      operator: '=',
    },
  },
  {
    color: 'orange',
    condition: {
      field: 'monitoringState',
      operand: 'warning',
      operator: '=',
    },
  },
  {
    color: 'lightgrey',
    condition: {
      field: 'monitoringState',
      operand: 'nonsignificant',
      operator: '=',
    },
  },
  {
    color: 'tan',
    condition: {
      field: 'monitoringState',
      operand: 'obsolete',
      operator: '=',
    },
  },
];

describe('store:actions:views', () => {
  const state = freezeMe({
    domains: [{ name: 'fr.cnes.isis' }],
    windows: {
      w1: {
        pages: ['pageWithLayout', 'emptyPage'],
      },
    },
    views: {
      textview: {
        uuid: 'textview',
        type: 'TextView',
        configuration: { collapsed: false },
        path: '/folder1/oldPath',
        absolutePath: '/folder1/oldPath',
      },
      plotview: {
        uuid: 'plotview',
        type: 'PlotView',
      },
    },
    pages: {
      pageWithLayout: {
        uuid: 'pageWithLayout',
        views: ['textview'],
        timebarUuid: 'tb1',
        layout: [
          {
            i: 'textview',
            maxH: 100,
            maxW: 100,
            x: 0,
            y: 0,
            h: 3,
            w: 5,
          },
          {
            i: 'unknown',
            maxH: 100,
            maxW: 100,
            x: 0,
            y: 0,
            h: 3,
            w: 5,
          },
        ],
      },
      emptyPage: {
        uuid: 'emptyPage',
        views: ['plotview'],
        timebarUuid: 'unknownTimbarId',
      },
    },
    timebars: {
      tb1: {
        masterId: 'masterId',
      },
    },
  });
  const store = mockStore(state);
  const emptyEntryPoint = {
    connectedData: {},
  };
  const entryPoint = {
    connectedData: { timeline: 1, domain: 2 },
  };

  afterEach(() => {
    store.clearActions();
  });

  describe('touchViewConfiguration', () => {
    test('should dispatch', () => {
      store.dispatch(actions.touchViewConfiguration('textview'));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_VIEW_TOUCH',
          payload: { viewId: 'textview' },
        },
      ]);
    });
  });

  describe('update path', () => {
    describe('updatePath', () => {
      test('should dispatch', () => {
        store.dispatch(actions.updatePath('textview', '/folder1/newPath'));
        expect(store.getActions()).toEqual([
          {
            type: 'WS_VIEW_UPDATEPATH',
            payload: { viewId: 'textview', newPath: '/folder1/newPath' },
          },
        ]);
      });
      test('should dispatch when newPath is falsy', () => {
        store.dispatch(actions.updatePath('textview', ''));
        expect(store.getActions()).toEqual([
          {
            type: 'WS_VIEW_UPDATEPATH',
            payload: { viewId: 'textview', newPath: '' },
          },
        ]);
      });
      test('should not dispatch when view is unknow', () => {
        store.dispatch(actions.updatePath('unknown_view', '/folder1/newPath'));
        expect(store.getActions()).toEqual([]);
      });
      test('should not dispatch when newPath and oldPath are the same', () => {
        store.dispatch(actions.updatePath('textview', '/../folder1/oldPath'));
        expect(store.getActions()).toEqual([]);
      });
    });

    describe('updateAbsolutePath', () => {
      test('should dispatch', () => {
        store.dispatch(actions.updateAbsolutePath('textview', 'folder1/newPath'));
        expect(store.getActions()).toEqual([
          {
            type: 'WS_VIEW_UPDATE_ABSOLUTEPATH',
            payload: { viewId: 'textview', newPath: 'folder1/newPath' },
          },
        ]);
      });
      test('should not dispatch when newPath is falsy', () => {
        store.dispatch(actions.updateAbsolutePath('textview', ''));
        expect(store.getActions()).toEqual([
          {
            type: 'WS_VIEW_UPDATE_ABSOLUTEPATH',
            payload: { viewId: 'textview', newPath: '' },
          },
        ]);
      });
      test('should not dispatch when view is unknow', () => {
        store.dispatch(actions.updateAbsolutePath('unknown_view', 'folder1/newPath'));
        expect(store.getActions()).toEqual([]);
      });
      test('should not dispatch when newPath and oldPath are the same', () => {
        store.dispatch(actions.updateAbsolutePath('textview', '/../folder1/oldPath'));
        expect(store.getActions()).toEqual([]);
      });
    });
  });
  describe('addEntryPoint', () => {
    test.skip('should works with a TexView, with empty entryPoint', () => {
      store.dispatch(actions.addEntryPoint('textview', emptyEntryPoint));
      expect(store.getActions()).toMatchObject([
        {
          type: 'WS_VIEW_ADD_ENTRYPOINT',
          payload: {
            viewId: 'textview',
            entryPoint: {
              name: 'NewEntryPoint',
              connectedData: {
                formula: '',
                unit: 's',
                digits: 5,
                format: 'decimal',
                filter: [],
                domain: '*',
                timeline: '*',
              },
            },
          },
        },
      ]);
      expect(store.getActions()[0].payload.entryPoint.id).toBeAnUuid();
    });
    test.skip('should works with a TexView, with entryPoint', () => {
      store.dispatch(actions.addEntryPoint('textview', entryPoint));
      expect(store.getActions()).toMatchObject([
        {
          type: 'WS_VIEW_ADD_ENTRYPOINT',
          payload: {
            viewId: 'textview',
            entryPoint: {
              name: 'NewEntryPoint',
              connectedData: {
                formula: '',
                unit: 's',
                digits: 5,
                format: 'decimal',
                filter: [],
                domain: 2,
                timeline: 1,
              },
            },
          },
        },
      ]);
      expect(store.getActions()[0].payload.entryPoint.id).toBeAnUuid();
    });
    test.skip('should works with a PlotView, with empty entryPoint', () => {
      store.dispatch(actions.addEntryPoint('plotview', emptyEntryPoint));
      expect(store.getActions()).toMatchObject([
        {
          type: 'WS_VIEW_ADD_ENTRYPOINT',
          payload: {
            viewId: 'plotview',
            entryPoint: {
              name: 'NewEntryPoint',
              connectedData: {
                domain: '*',
                timeline: '*',
                formula: '',
                fieldX: 'onboardDate',
                unit: 'V',
                digits: 5,
                format: 'decimal',
                filter: [],
              },
              objectStyle: {
                line: { style: 'Continuous', size: 3 },
                points: { style: 'None', size: 3 },
              },
              stateColors: defaultStateColor,
            },
          },
        },
      ]);
      const firstAction = store.getActions()[0];
      expect(firstAction.payload.entryPoint.id).toBeAnUuid();
      expect(firstAction.payload.entryPoint.objectStyle.curveColor).toBeAnHexadecimalValue();
    });
    test.skip('should works with a TexView, with entryPoint', () => {
      store.dispatch(actions.addEntryPoint('plotview', entryPoint));
      expect(store.getActions()).toMatchObject([
        {
          type: 'WS_VIEW_ADD_ENTRYPOINT',
          payload: {
            viewId: 'plotview',
            entryPoint: {
              name: 'NewEntryPoint',
              connectedData: {
                domain: 2,
                timeline: 1,
                formula: '',
                fieldX: 'onboardDate',
                unit: 'V',
                digits: 5,
                format: 'decimal',
                filter: [],
              },
              objectStyle: {
                line: { style: 'Continuous', size: 3 },
                points: { style: 'None', size: 3 },
              },
              stateColors: defaultStateColor,
            },
          },
        },
      ]);
      const firstAction = store.getActions()[0];
      expect(firstAction.payload.entryPoint.id).toBeAnUuid();
      expect(firstAction.payload.entryPoint.objectStyle.curveColor).toBeAnHexadecimalValue();
    });
  });
  describe('dropEntryPoint', () => {
    test.skip('should works with a TexView, with empty entryPoint', () => {
      store.dispatch(actions.dropEntryPoint('textview', emptyEntryPoint));
      expect(store.getActions()).toMatchObject([
        {
          type: 'WS_VIEW_ADD_ENTRYPOINT',
          payload: {
            viewId: 'textview',
            entryPoint: {
              name: 'NewEntryPoint',
              connectedData: {
                formula: '',
                unit: 's',
                digits: 5,
                format: 'decimal',
                filter: [],
                domain: '*',
                timeline: '*',
              },
            },
          },
        },
        {
          type: 'WS_PAGE_PANELS_MINIMIZE_EDITOR',
          payload: { pageId: 'pageWithLayout', isMinimized: false },
        },
        {
          type: 'WS_PAGE_PANELS_RESIZE_EDITOR',
          payload: { pageId: 'pageWithLayout', size: 350 },
        },
        {
          type: 'WS_PAGE_PANELS_LOAD_IN_EDITOR',
          payload: { pageId: 'pageWithLayout', viewId: 'textview' },
        },
      ]);
      expect(store.getActions()[0].payload.entryPoint.id).toBeAnUuid();
    });
    test.skip('should works with a TexView, with entryPoint', () => {
      store.dispatch(actions.dropEntryPoint('textview', entryPoint));
      expect(store.getActions()).toMatchObject([
        {
          type: 'WS_VIEW_ADD_ENTRYPOINT',
          payload: {
            viewId: 'textview',
            entryPoint: {
              name: 'NewEntryPoint',
              connectedData: {
                formula: '',
                unit: 's',
                digits: 5,
                format: 'decimal',
                filter: [],
                domain: 2,
                timeline: 1,
              },
            },
          },
        },
        {
          type: 'WS_PAGE_PANELS_MINIMIZE_EDITOR',
          payload: { pageId: 'pageWithLayout', isMinimized: false },
        },
        {
          type: 'WS_PAGE_PANELS_RESIZE_EDITOR',
          payload: { pageId: 'pageWithLayout', size: 350 },
        },
        {
          type: 'WS_PAGE_PANELS_LOAD_IN_EDITOR',
          payload: { pageId: 'pageWithLayout', viewId: 'textview' },
        },
      ]);
      expect(store.getActions()[0].payload.entryPoint.id).toBeAnUuid();
    });
    test.skip('should works with a PlotView, with empty entryPoint', () => {
      store.dispatch(actions.dropEntryPoint('plotview', emptyEntryPoint));
      expect(store.getActions()).toMatchObject([
        {
          type: 'WS_VIEW_ADD_ENTRYPOINT',
          payload: {
            viewId: 'plotview',
            entryPoint: {
              name: 'NewEntryPoint',
              connectedData: {
                domain: '*',
                timeline: '*',
                formula: '',
                fieldX: 'onboardDate',
                unit: 'V',
                digits: 5,
                format: 'decimal',
                filter: [],
              },
              objectStyle: {
                line: { style: 'Continuous', size: 3 },
                points: { style: 'None', size: 3 },
              },
              stateColors: defaultStateColor,
            },
          },
        },
        {
          type: 'WS_PAGE_PANELS_MINIMIZE_EDITOR',
          payload: { pageId: 'emptyPage', isMinimized: false },
        },
        {
          type: 'WS_PAGE_PANELS_RESIZE_EDITOR',
          payload: { pageId: 'emptyPage', size: 350 },
        },
        {
          type: 'WS_PAGE_PANELS_LOAD_IN_EDITOR',
          payload: { pageId: 'emptyPage', viewId: 'plotview' },
        },
      ]);
      const firstAction = store.getActions()[0];
      expect(firstAction.payload.entryPoint.id).toBeAnUuid();
      expect(firstAction.payload.entryPoint.objectStyle.curveColor).toBeAnHexadecimalValue();
    });
    test.skip('should works with a TexView, with entryPoint', () => {
      store.dispatch(actions.dropEntryPoint('plotview', entryPoint));
      expect(store.getActions()).toMatchObject([
        {
          type: 'WS_VIEW_ADD_ENTRYPOINT',
          payload: {
            viewId: 'plotview',
            entryPoint: {
              name: 'NewEntryPoint',
              connectedData: {
                domain: 2,
                timeline: 1,
                formula: '',
                fieldX: 'onboardDate',
                unit: 'V',
                digits: 5,
                format: 'decimal',
                filter: [],
              },
              objectStyle: {
                line: { style: 'Continuous', size: 3 },
                points: { style: 'None', size: 3 },
              },
              stateColors: defaultStateColor,
            },
          },
        },
        {
          type: 'WS_PAGE_PANELS_MINIMIZE_EDITOR',
          payload: { pageId: 'emptyPage', isMinimized: false },
        },
        {
          type: 'WS_PAGE_PANELS_RESIZE_EDITOR',
          payload: { pageId: 'emptyPage', size: 350 },
        },
        {
          type: 'WS_PAGE_PANELS_LOAD_IN_EDITOR',
          payload: { pageId: 'emptyPage', viewId: 'plotview' },
        },
      ]);
      const firstAction = store.getActions()[0];
      expect(firstAction.payload.entryPoint.id).toBeAnUuid();
      expect(firstAction.payload.entryPoint.objectStyle.curveColor).toBeAnHexadecimalValue();
    });
  });
  describe('focusView', () => {
    test('focusView when view exists', () => {
      store.dispatch(actions.focusView('textview'));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_WINDOW_PAGE_FOCUS',
          payload: { windowId: 'w1', pageId: 'pageWithLayout' },
        },
      ]);
    });
    test('focusView with unknown view', () => {
      store.dispatch(actions.focusView('unknownView'));
      expect(store.getActions()).toEqual([]);
    });
  });
});
