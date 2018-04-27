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
import _set from 'lodash/fp/set';
import stateTest from 'common/jest/stateTest';
import * as types from 'store/types';
import * as actions from './views';

const initialState = freezeMe({
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
  entryPoints: {
    e1: {
      connectedData: {
        axisId: 'axis_1',
      },
    },
  },
  axes: {
    axis_1: { label: 'AXIS1', id: 'axis_1', unit: 'volts' },
    axis_2: { label: 'AXIS2', id: 'axis_2', unit: 'seconds' },
  },
});

describe('store:actions:views', () => {
  const referenceStore = mockStore(initialState);
  const emptyEntryPoint = {
    connectedData: {},
  };
  const entryPoint = {
    connectedData: { timeline: 1, domain: 2 },
  };

  afterEach(() => {
    referenceStore.clearActions();
  });

  describe('touchViewConfiguration', () => {
    test('should dispatch', () => {
      referenceStore.dispatch(actions.touchViewConfiguration('textview'));
      expect(referenceStore.getActions()).toEqual([
        {
          type: 'WS_VIEW_TOUCH',
          payload: { viewId: 'textview' },
        },
      ]);
    });
  });

  describe('isAxisReferencedByEntryPoint', () => {
    test('should return false if axis is referenced by no entrypoint', () => {
      expect(
        actions.isAxisReferencedByEntryPoint('axis_2', referenceStore.getState().entryPoints)
      ).toBeFalsy();
    });
    test('should return true if axis is referenced by at least one entrypoint', () => {
      expect(
        actions.isAxisReferencedByEntryPoint('axis_1', referenceStore.getState().entryPoints)
      ).toBeTruthy();
    });
  });

  describe('user removes axis', () => {
    test('should dispatch', () => {
      referenceStore.dispatch(
        actions.removeAxis('plotview', 'axis_2', referenceStore.getState().entryPoints)
      );
      expect(referenceStore.getActions()).toEqual([
        {
          type: 'WS_VIEW_REMOVE_AXIS',
          payload: {
            axisId: 'axis_2',
            viewId: 'plotview',
          },
        },
      ]);
    });
  });

  describe('update path', () => {
    describe('updatePath', () => {
      test('should dispatch', () => {
        referenceStore.dispatch(actions.updatePath('textview', '/folder1/newPath'));
        expect(referenceStore.getActions()).toEqual([
          {
            type: 'WS_VIEW_UPDATEPATH',
            payload: { viewId: 'textview', newPath: '/folder1/newPath' },
          },
        ]);
      });
      test('should dispatch when newPath is falsy', () => {
        referenceStore.dispatch(actions.updatePath('textview', ''));
        expect(referenceStore.getActions()).toEqual([
          {
            type: 'WS_VIEW_UPDATEPATH',
            payload: { viewId: 'textview', newPath: '' },
          },
        ]);
      });
      test('should not dispatch when view is unknow', () => {
        referenceStore.dispatch(actions.updatePath('unknown_view', '/folder1/newPath'));
        expect(referenceStore.getActions()).toEqual([]);
      });
      test('should not dispatch when newPath and oldPath are the same', () => {
        referenceStore.dispatch(actions.updatePath('textview', '/../folder1/oldPath'));
        expect(referenceStore.getActions()).toEqual([]);
      });
    });

    describe('updateAbsolutePath', () => {
      test('should dispatch', () => {
        referenceStore.dispatch(actions.updateAbsolutePath('textview', 'folder1/newPath'));
        expect(referenceStore.getActions()).toEqual([
          {
            type: 'WS_VIEW_UPDATE_ABSOLUTEPATH',
            payload: { viewId: 'textview', newPath: 'folder1/newPath' },
          },
        ]);
      });
      test('should not dispatch when newPath is falsy', () => {
        referenceStore.dispatch(actions.updateAbsolutePath('textview', ''));
        expect(referenceStore.getActions()).toEqual([
          {
            type: 'WS_VIEW_UPDATE_ABSOLUTEPATH',
            payload: { viewId: 'textview', newPath: '' },
          },
        ]);
      });
      test('should not dispatch when view is unknow', () => {
        referenceStore.dispatch(actions.updateAbsolutePath('unknown_view', 'folder1/newPath'));
        expect(referenceStore.getActions()).toEqual([]);
      });
      test('should not dispatch when newPath and oldPath are the same', () => {
        referenceStore.dispatch(actions.updateAbsolutePath('textview', '/../folder1/oldPath'));
        expect(referenceStore.getActions()).toEqual([]);
      });
    });
  });
  describe('addEntryPoint', () => {
    test('should works with a TextView, with empty entryPoint', () => {
      referenceStore.dispatch(actions.addEntryPoint('textview', emptyEntryPoint));
      expect(referenceStore.getActions()).toMatchObject([
        {
          type: 'WS_VIEW_ADD_ENTRYPOINT',
          payload: {
            viewId: 'textview',
            entryPoint: {
              name: 'textEP',
              stateColors: [],
              connectedData: {
                formula: '',
                unit: 's',
                digits: 5,
                format: 'decimal',
                filter: [],
                domain: '*',
                timeline: '*',
                provider: '*',
                convertFrom: '',
                convertTo: '',
              },
            },
          },
        },
        {
          type: '@@redux-form/CHANGE',
        },
      ]);
      expect(referenceStore.getActions()[0].payload.entryPoint.id).toBeAnUuid();
    });

    test('should works with a TextView, with entryPoint', () => {
      referenceStore.dispatch(actions.addEntryPoint('textview', entryPoint));
      expect(referenceStore.getActions()).toMatchObject([
        {
          type: 'WS_VIEW_ADD_ENTRYPOINT',
          payload: {
            viewId: 'textview',
            entryPoint: {
              name: 'textEP',
              stateColors: [],
              connectedData: {
                formula: '',
                unit: 's',
                digits: 5,
                format: 'decimal',
                filter: [],
                domain: 2,
                timeline: 1,
                provider: '*',
                convertFrom: '',
                convertTo: '',
              },
            },
          },
        },
        {
          type: '@@redux-form/CHANGE',
        },
      ]);
      expect(referenceStore.getActions()[0].payload.entryPoint.id).toBeAnUuid();
    });
    test('should works with a PlotView, with empty entryPoint', () => {
      referenceStore.dispatch(actions.addEntryPoint('plotview', emptyEntryPoint));
      expect(referenceStore.getActions()).toMatchObject([
        {
          type: 'WS_VIEW_ADD_ENTRYPOINT',
          payload: {
            viewId: 'plotview',
            entryPoint: {
              name: 'plotEP',
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
              stateColors: [],
            },
          },
        },
      ]);
      const firstAction = referenceStore.getActions()[0];
      expect(firstAction.payload.entryPoint.id).toBeAnUuid();
      expect(firstAction.payload.entryPoint.objectStyle.curveColor).toBeAnHexadecimalValue();
    });
    test('should works with a PlotView, with entryPoint', () => {
      referenceStore.dispatch(actions.addEntryPoint('plotview', entryPoint));
      expect(referenceStore.getActions()).toMatchObject([
        {
          type: 'WS_VIEW_ADD_ENTRYPOINT',
          payload: {
            viewId: 'plotview',
            entryPoint: {
              name: 'plotEP',
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
              stateColors: [],
            },
          },
        },
      ]);
      const firstAction = referenceStore.getActions()[0];
      expect(firstAction.payload.entryPoint.id).toBeAnUuid();
      expect(firstAction.payload.entryPoint.objectStyle.curveColor).toBeAnHexadecimalValue();
    });
  });
  describe('dropEntryPoint', () => {
    test('should works with a TextView, with empty entryPoint', () => {
      referenceStore.dispatch(actions.dropEntryPoint('textview', emptyEntryPoint));
      expect(referenceStore.getActions()).toMatchObject([
        {
          type: 'WS_VIEW_ADD_ENTRYPOINT',
          payload: {
            viewId: 'textview',
            entryPoint: {
              name: 'textEP',
              stateColors: [],
              connectedData: {
                formula: '',
                unit: 's',
                digits: 5,
                format: 'decimal',
                filter: [],
                domain: '*',
                timeline: '*',
                provider: '*',
                convertFrom: '',
                convertTo: '',
              },
            },
          },
        },
        {
          type: '@@redux-form/CHANGE',
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
      expect(referenceStore.getActions()[0].payload.entryPoint.id).toBeAnUuid();
    });
    test('should works with a TextView, with entryPoint', () => {
      referenceStore.dispatch(actions.dropEntryPoint('textview', entryPoint));
      expect(referenceStore.getActions()).toMatchObject([
        {
          type: 'WS_VIEW_ADD_ENTRYPOINT',
          payload: {
            viewId: 'textview',
            entryPoint: {
              name: 'textEP',
              stateColors: [],
              connectedData: {
                formula: '',
                unit: 's',
                digits: 5,
                format: 'decimal',
                filter: [],
                domain: 2,
                timeline: 1,
                convertFrom: '',
                convertTo: '',
                provider: '*',
              },
            },
          },
        },
        {
          type: '@@redux-form/CHANGE',
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
      expect(referenceStore.getActions()[0].payload.entryPoint.id).toBeAnUuid();
    });
    test('should works with a PlotView, with empty entryPoint', () => {
      referenceStore.dispatch(actions.dropEntryPoint('plotview', emptyEntryPoint));
      expect(referenceStore.getActions()).toMatchObject([
        {
          type: 'WS_VIEW_ADD_ENTRYPOINT',
          payload: {
            viewId: 'plotview',
            entryPoint: {
              name: 'plotEP',
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
              stateColors: [],
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
      const firstAction = referenceStore.getActions()[0];
      expect(firstAction.payload.entryPoint.id).toBeAnUuid();
      expect(firstAction.payload.entryPoint.objectStyle.curveColor).toBeAnHexadecimalValue();
    });
    test('should works with a PlotView, with entryPoint', () => {
      referenceStore.dispatch(actions.dropEntryPoint('plotview', entryPoint));
      expect(referenceStore.getActions()).toMatchObject([
        {
          type: 'WS_VIEW_ADD_ENTRYPOINT',
          payload: {
            viewId: 'plotview',
            entryPoint: {
              name: 'plotEP',
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
              stateColors: [],
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
      const firstAction = referenceStore.getActions()[0];
      expect(firstAction.payload.entryPoint.id).toBeAnUuid();
      expect(firstAction.payload.entryPoint.objectStyle.curveColor).toBeAnHexadecimalValue();
    });
  });
  describe('focusView', () => {
    test('focusView when view exists', () => {
      referenceStore.dispatch(actions.focusView('textview'));
      expect(referenceStore.getActions()).toEqual([
        {
          type: 'WS_WINDOW_PAGE_FOCUS',
          payload: { windowId: 'w1', pageId: 'pageWithLayout' },
        },
      ]);
    });
    test('focusView with unknown view', () => {
      referenceStore.dispatch(actions.focusView('unknownView'));
      expect(referenceStore.getActions()).toEqual([]);
    });
  });
  describe('updateTableCols', () => {
    const store = mockStore(stateTest);
    test('updateTableCols when view exists', () => {
      store.dispatch(actions.updateTableCols('groundAlarm1', [{
        title: 'timestamp',
        value: 'timestamp',
        position: 0,
        displayed: true,
        group: 0,
      }]));
      expect(store.getActions()).toEqual([
        {
          type: types.WS_VIEW_UPDATE_TABLE_COLS,
          payload: {
            viewId: 'groundAlarm1',
            cols: [{
              title: 'timestamp',
              value: 'timestamp',
              position: 0,
              displayed: true,
              group: 0,
            }],
          },
        },
      ]);
    });
  });
});
