// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 28/02/2017 : store/reducers/*.spec.js : spliting between plurial
//  and singular specs.
// VERSION : 1.1.2 : DM : #3622 : 10/03/2017 : store collapsed & maximized bool in page layout
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Fix view reloading . .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Move reloadView in documentManager .
// VERSION : 1.1.2 : DM : #3622 : 14/03/2017 : Move general variables at top level of a view
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : PlotView: x axis is always time/s , not editable.
//  Newly created Ep always stick to time axis or create one.
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Add some eslint relaxation rules
// VERSION : 1.1.2 : DM : #5828 : 04/04/2017 : plot view entry point update
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : Remove old configuration reducer .
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : Add configurationReducer.spec for PlotView .
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : Add domainName and sessionName on view, window, page
//  and hsc in store
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Add domainName and sessionName on view, window, page
//  and hsc in store
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of
//  tests
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Fix jest tests in store/reducers
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Migrate merged new tests in jest
// VERSION : 1.1.2 : DM : #6785 : 12/06/2017 : activate links in views .
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js
//  in jest/index.js
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0.1 : FA : #11627 : 13/04/2018 : deal with multidomain sat colors
// VERSION : 2.0.0.3 : FA : ISIS-FT-3174 : 30/05/2018 : disable background color on view header for
//  multisat handle
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import * as actions from 'store/actions/views';
import { freezeArgs } from 'common/jest';
import viewsReducer from '../views';

const reducer = freezeArgs(viewsReducer);

describe('store:reducer:views', () => {
  describe('set modified', () => {
    const state = {
      myView: {
        isModified: false,
        configuration: {
          title: 'myView',
        },
      },
    };
    test('set isModified to true', () => {
      const s = reducer(state, actions.setModified('myView', true));
      expect(s.myView.isModified).toBe(true);
    });
    test('does nothing when view is unknown', () => {
      const s = reducer(state, actions.setModified('unknownView', true));
      expect(s.myView.isModified).toBe(false);
    });
  });
  describe('update', () => {
    const state = {
      view1: {
        type: 'DynamicView',
        configuration: {
          oName: 'oldValue',
          title: 'my plot',
        },
        absolutePath: '/data/oldPath',
        path: '/data/oldPath',
        isModified: false,
      },
    };
    test('Path', () => {
      const s = reducer(state, {
        type: 'WS_VIEW_UPDATEPATH',
        payload: {
          viewId: 'view1',
          newPath: '/data/newPath',
        },
      });
      expect(s.view1.path).toBe('/data/newPath');
      expect(s.view1.isModified).toBe(true);
      expect(s.view1.configuration.title).toBe('my plot');
    });
    test('absolute Path', () => {
      const s = reducer(state, {
        type: 'WS_VIEW_UPDATE_ABSOLUTEPATH',
        payload: {
          viewId: 'view1',
          newPath: '/data/newPath',
        },
      });
      expect(s.view1.absolutePath).toBe('/data/newPath');
      expect(s.view1.isModified).toBe(true);
      expect(s.view1.configuration.title).toBe('my plot');
    });
    test('set oId', () => {
      const s = reducer(state, {
        type: 'WS_VIEW_SET_OID',
        payload: {
          viewId: 'view1',
          oid: 'yolo',
        },
      });
      expect(s).not.toEqual(state);
      expect(s.view1.oId).toEqual('yolo');
    });
  });

  const stateViews = {
    plot1: {
      type: 'PlotView',
      links: [{ l: '1' }, { l: '2' }],
      procedures: [{ p: '1' }, { p: '2' }],
      defaultRatio: {
        length: 50,
        width: 50,
      },
      title: 'Plotview 4 parameters',
      titleStyle: { bold: false },
      backgroundColor: '#FFFFFF',
      showLinks: false,
      configuration: {
        type: 'PlotView',
        entryPoints: [{
          name: 'ATT_BC_REVTCOUNT4',
          connectedData: { axisId: 'axis2' },
        }, {
          name: 'ATT_BC_REVTCOUNT3',
          connectedData: { axisId: 'axis3' },
        }],
        axes: {
          time: { label: 'Time', unit: 's', id: 'time' },
          axis2: { label: '2', unit: 'w', id: 'axis2' },
          axis3: { label: '3', unit: 'p', id: 'axis3' } },
        grids: [{ grid: '1' }, { grid: '2' }],
        legend: 'old Legend',
        markers: [{ m: '1' }, { m: '2' }],
        showYAxes: 'left',
      },
      // path: 'views/plot1.json',
      // absolutePath: '/data/work/views/plot1.json',
    },
    text1: {
      type: 'TextView',
      configuration: {
        type: 'TextView',
        title: 'my view',
        content: 'old content',
        entryPoints: [
          {
            name: 'ep1',
            connectedData: {},
          },
        ],
      },
    },
  };
  describe('update action', () => {
    test('Link', () => {
      const link = { l: '3' };
      const state = reducer(stateViews, actions.updateLink('plot1', 1, link));
      expect(state.plot1.links[1]).toEqual(link);
      expect(state.plot1.isModified).toBe(true);
    });
    test('ShowLinks', () => {
      const state = reducer(stateViews, actions.updateShowLinks('plot1', true));
      expect(state.plot1.showLinks).toBe(true);
    });
    test('Procedure', () => {
      const proc = { p: '3' };
      const state = reducer(stateViews, actions.updateProcedure('plot1', 0, proc));
      expect(state.plot1.procedures[0]).toEqual(proc);
      expect(state.plot1.isModified).toBe(true);
    });
    test('defaultRatio', () => {
      const newRatio = { length: 60, width: 50 };
      const state = reducer(stateViews, actions.updateRatio('plot1', newRatio));
      expect(state.plot1.defaultRatio).toEqual(newRatio);
      expect(state.plot1.isModified).toBe(true);
    });
    test('title', () => {
      const state = reducer(stateViews, actions.updateTitle('plot1', 'new Title'));
      expect(state.plot1.title).toEqual('new Title');
      expect(state.plot1.isModified).toBe(true);
    });
    test('title style', () => {
      const style = { bold: true };
      const state = reducer(stateViews, actions.updateTitleStyle('plot1', style));
      expect(state.plot1.titleStyle).toEqual(style);
      expect(state.plot1.isModified).toBe(true);
    });
  });
  describe('Add element in array', () => {
    test('link', () => {
      const link = { l: '3' };
      const state = reducer(stateViews, actions.addLink('plot1', link));
      expect(state.plot1.links).toEqual([{ l: '1' }, { l: '2' }, { l: '3' }]);
    });
    test('procedure', () => {
      const proc = { p: '3' };
      const state = reducer(stateViews, actions.addProcedure('plot1', proc));
      expect(state.plot1.procedures).toEqual([{ p: '1' }, { p: '2' }, { p: '3' }]);
    });
  });
  describe('Remove element in array', () => {
    test('link', () => {
      const state = reducer(stateViews, actions.removeLink('plot1', 1));
      expect(state.plot1.links).toEqual([{ l: '1' }]);
    });
    test('procedure', () => {
      const state = reducer(stateViews, actions.removeProcedure('plot1', 0));
      expect(state.plot1.procedures).toEqual([{ p: '2' }]);
    });
  });
  test('reload view', () => {
    const myView = {
      domain: 'toto-domain',
      domainName: 'toto-domain-name',
      isModified: true,
      sampling: {
        samplingLock: 'off',
        samplingStatus: 'off',
        zoomState: 'out',
      },
      session: '',
      sessionName: 'toto-session-name',
      title: 'myView',
      type: 'PlotView',
      showLinks: false,
    };
    const action = { type: 'WS_VIEW_RELOAD', payload: { viewId: 'plot1', view: myView } };
    const state = reducer(stateViews, action);

    expect(state.plot1).toEqual(_.set('isModified', false, myView));
  });
  describe('toggle sampling', () => {
    test('from sampling off off out', () => {
      const stateWithPlotViewWithSamplingOffOffOut = {
        ...stateViews,
        plot1: {
          ...stateViews.plot1,
          sampling: {
            samplingLock: 'off',
            samplingStatus: 'off',
            zoomState: 'out',
          },
        },
      };
      const action = { type: 'TOGGLE_SAMPLING_STATUS', payload: { viewId: 'plot1' } };
      const state = reducer(stateWithPlotViewWithSamplingOffOffOut, action);
      expect(state.plot1.sampling.samplingLock).toBe('off');
      expect(state.plot1.sampling.samplingStatus).toBe('on');
      expect(state.plot1.sampling.zoomState).toBe('out');
    });
    test('from sampling off on out', () => {
      const stateWithPlotViewWithSamplingOffOffOut = {
        ...stateViews,
        plot1: {
          ...stateViews.plot1,
          sampling: {
            samplingLock: 'off',
            samplingStatus: 'on',
            zoomState: 'out',
          },
        },
      };
      const action = { type: 'TOGGLE_SAMPLING_STATUS', payload: { viewId: 'plot1' } };
      const state = reducer(stateWithPlotViewWithSamplingOffOffOut, action);
      expect(state.plot1.sampling.samplingLock).toBe('off');
      expect(state.plot1.sampling.samplingStatus).toBe('off');
      expect(state.plot1.sampling.zoomState).toBe('out');
    });
    test('from sampling on off out', () => {
      const stateWithPlotViewWithSamplingOffOffOut = {
        ...stateViews,
        plot1: {
          ...stateViews.plot1,
          sampling: {
            samplingLock: 'on',
            samplingStatus: 'off',
            zoomState: 'out',
          },
        },
      };
      const action = { type: 'TOGGLE_SAMPLING_STATUS', payload: { viewId: 'plot1' } };
      const state = reducer(stateWithPlotViewWithSamplingOffOffOut, action);
      expect(state.plot1.sampling.samplingLock).toBe('on');
      expect(state.plot1.sampling.samplingStatus).toBe('on');
      expect(state.plot1.sampling.zoomState).toBe('out');
    });
    test('from sampling on on out', () => {
      const stateWithPlotViewWithSamplingOffOffOut = {
        ...stateViews,
        plot1: {
          ...stateViews.plot1,
          sampling: {
            samplingLock: 'on',
            samplingStatus: 'on',
            zoomState: 'out',
          },
        },
      };
      const action = { type: 'TOGGLE_SAMPLING_STATUS', payload: { viewId: 'plot1' } };
      const state = reducer(stateWithPlotViewWithSamplingOffOffOut, action);
      expect(state.plot1.sampling.samplingLock).toBe('on');
      expect(state.plot1.sampling.samplingStatus).toBe('on');
      expect(state.plot1.sampling.zoomState).toBe('out');
    });


    test('from sampling off off in', () => {
      const stateWithPlotViewWithSamplingOffOffIn = {
        ...stateViews,
        plot1: {
          ...stateViews.plot1,
          sampling: {
            samplingLock: 'off',
            samplingStatus: 'off',
            zoomState: 'in',
          },
        },
      };
      const action = { type: 'TOGGLE_SAMPLING_STATUS', payload: { viewId: 'plot1' } };
      const state = reducer(stateWithPlotViewWithSamplingOffOffIn, action);
      expect(state.plot1.sampling.samplingLock).toBe('off');
      expect(state.plot1.sampling.samplingStatus).toBe('on');
      expect(state.plot1.sampling.zoomState).toBe('in');
    });
    test('from sampling off on in', () => {
      const stateWithPlotViewWithSamplingOffOffIn = {
        ...stateViews,
        plot1: {
          ...stateViews.plot1,
          sampling: {
            samplingLock: 'off',
            samplingStatus: 'on',
            zoomState: 'in',
          },
        },
      };
      const action = { type: 'TOGGLE_SAMPLING_STATUS', payload: { viewId: 'plot1' } };
      const state = reducer(stateWithPlotViewWithSamplingOffOffIn, action);
      expect(state.plot1.sampling.samplingLock).toBe('off');
      expect(state.plot1.sampling.samplingStatus).toBe('off');
      expect(state.plot1.sampling.zoomState).toBe('in');
    });
    test('from sampling on off in', () => {
      const stateWithPlotViewWithSamplingOffOffIn = {
        ...stateViews,
        plot1: {
          ...stateViews.plot1,
          sampling: {
            samplingLock: 'on',
            samplingStatus: 'off',
            zoomState: 'in',
          },
        },
      };
      const action = { type: 'TOGGLE_SAMPLING_STATUS', payload: { viewId: 'plot1' } };
      const state = reducer(stateWithPlotViewWithSamplingOffOffIn, action);
      expect(state.plot1.sampling.samplingLock).toBe('on');
      expect(state.plot1.sampling.samplingStatus).toBe('on');
      expect(state.plot1.sampling.zoomState).toBe('in');
    });
    test('from sampling on on in', () => {
      const stateWithPlotViewWithSamplingOffOffIn = {
        ...stateViews,
        plot1: {
          ...stateViews.plot1,
          sampling: {
            samplingLock: 'on',
            samplingStatus: 'on',
            zoomState: 'in',
          },
        },
      };
      const action = { type: 'TOGGLE_SAMPLING_STATUS', payload: { viewId: 'plot1' } };
      const state = reducer(stateWithPlotViewWithSamplingOffOffIn, action);
      expect(state.plot1.sampling.samplingLock).toBe('on');
      expect(state.plot1.sampling.samplingStatus).toBe('on');
      expect(state.plot1.sampling.zoomState).toBe('in');
    });

    test('from sampling on ***** in', () => {
      const initialState = {
        ...stateViews,
        plot1: {
          ...stateViews.plot1,
          sampling: {
            samplingLock: 'on',
            samplingStatus: '*****',
            zoomState: 'out',
          },
        },
      };
      const expectedResult = {
        ...stateViews,
        plot1: {
          ...stateViews.plot1,
          sampling: {
            samplingLock: 'on',
            samplingStatus: 'on',
            zoomState: 'out',
          },
        },
      };
      const action = { type: 'TOGGLE_SAMPLING_STATUS', payload: { viewId: 'plot1' } };
      const state = reducer(initialState, action);
      expect(state).toEqual(expectedResult);
    });
    test('from sampling off ***** in', () => {
      const initialState = {
        ...stateViews,
        plot1: {
          ...stateViews.plot1,
          sampling: {
            samplingLock: 'off',
            samplingStatus: '*****',
            zoomState: 'out',
          },
        },
      };
      const expectedResult = {
        ...stateViews,
        plot1: {
          ...stateViews.plot1,
          sampling: {
            samplingLock: 'off',
            samplingStatus: '*****',
            zoomState: 'out',
          },
        },
      };
      const action = { type: 'TOGGLE_SAMPLING_STATUS', payload: { viewId: 'plot1' } };
      const state = reducer(initialState, action);
      expect(state).toEqual(expectedResult);
    });
    test('from sampling ***** on out', () => {
      const initialState = {
        ...stateViews,
        plot1: {
          ...stateViews.plot1,
          sampling: {
            samplingLock: '*****',
            samplingStatus: 'on',
            zoomState: 'out',
          },
        },
      };
      const expectedResult = {
        ...stateViews,
        plot1: {
          ...stateViews.plot1,
          sampling: {
            samplingLock: '*****',
            samplingStatus: 'on',
            zoomState: 'out',
          },
        },
      };
      const action = { type: 'TOGGLE_SAMPLING_STATUS', payload: { viewId: 'plot1' } };
      const state = reducer(initialState, action);
      expect(state).toEqual(expectedResult);
    });
    test('from sampling ***** of out', () => {
      const initialState = {
        ...stateViews,
        plot1: {
          ...stateViews.plot1,
          sampling: {
            samplingLock: '*****',
            samplingStatus: 'off',
            zoomState: 'out',
          },
        },
      };
      const expectedResult = {
        ...stateViews,
        plot1: {
          ...stateViews.plot1,
          sampling: {
            samplingLock: '*****',
            samplingStatus: 'off',
            zoomState: 'out',
          },
        },
      };
      const action = { type: 'TOGGLE_SAMPLING_STATUS', payload: { viewId: 'plot1' } };
      const state = reducer(initialState, action);
      expect(state).toEqual(expectedResult);
    });
  });

  describe('toggle zoom state', () => {
    test('from sampling off off out', () => {
      const stateWithPlotViewWithSamplingOffOffOut = {
        ...stateViews,
        plot1: {
          ...stateViews.plot1,
          sampling: {
            samplingLock: 'off',
            samplingStatus: 'off',
            zoomState: 'out',
          },
        },
      };
      const action = { type: 'TOGGLE_ZOOM_STATE', payload: { viewId: 'plot1' } };
      const state = reducer(stateWithPlotViewWithSamplingOffOffOut, action);
      expect(state.plot1.sampling.samplingLock).toBe('off');
      expect(state.plot1.sampling.samplingStatus).toBe('off');
      expect(state.plot1.sampling.zoomState).toBe('in');
    });
    test('from sampling off on out', () => {
      const stateWithPlotViewWithSamplingOffOnOut = {
        ...stateViews,
        plot1: {
          ...stateViews.plot1,
          sampling: {
            samplingLock: 'off',
            samplingStatus: 'on',
            zoomState: 'out',
          },
        },
      };
      const action = { type: 'TOGGLE_ZOOM_STATE', payload: { viewId: 'plot1' } };
      const state = reducer(stateWithPlotViewWithSamplingOffOnOut, action);
      expect(state.plot1.sampling.samplingLock).toBe('off');
      expect(state.plot1.sampling.samplingStatus).toBe('on');
      expect(state.plot1.sampling.zoomState).toBe('in');
    });
    test('from sampling on on out', () => {
      const stateWithPlotViewWithSamplingOffOffOut = {
        ...stateViews,
        plot1: {
          ...stateViews.plot1,
          sampling: {
            samplingLock: 'on',
            samplingStatus: 'on',
            zoomState: 'out',
          },
        },
      };
      const action = { type: 'TOGGLE_ZOOM_STATE', payload: { viewId: 'plot1' } };
      const state = reducer(stateWithPlotViewWithSamplingOffOffOut, action);
      expect(state.plot1.sampling.samplingLock).toBe('on');
      expect(state.plot1.sampling.samplingStatus).toBe('on');
      expect(state.plot1.sampling.zoomState).toBe('in');
    });
    test('from sampling off off in', () => {
      const stateWithPlotViewWithSamplingOffOffIn = {
        ...stateViews,
        plot1: {
          ...stateViews.plot1,
          sampling: {
            samplingLock: 'off',
            samplingStatus: 'off',
            zoomState: 'in',
          },
        },
      };
      const action = { type: 'TOGGLE_ZOOM_STATE', payload: { viewId: 'plot1' } };
      const state = reducer(stateWithPlotViewWithSamplingOffOffIn, action);
      expect(state.plot1.sampling.samplingLock).toBe('off');
      expect(state.plot1.sampling.samplingStatus).toBe('off');
      expect(state.plot1.sampling.zoomState).toBe('out');
    });
    test('from sampling off on in', () => {
      const stateWithPlotViewWithSamplingOffOnIn = {
        ...stateViews,
        plot1: {
          ...stateViews.plot1,
          sampling: {
            samplingLock: 'off',
            samplingStatus: 'on',
            zoomState: 'in',
          },
        },
      };
      const action = { type: 'TOGGLE_ZOOM_STATE', payload: { viewId: 'plot1' } };
      const state = reducer(stateWithPlotViewWithSamplingOffOnIn, action);
      expect(state.plot1.sampling.samplingLock).toBe('off');
      expect(state.plot1.sampling.samplingStatus).toBe('on');
      expect(state.plot1.sampling.zoomState).toBe('out');
    });
    test('from sampling on on in', () => {
      const stateWithPlotViewWithSamplingOnOnIn = {
        ...stateViews,
        plot1: {
          ...stateViews.plot1,
          sampling: {
            samplingLock: 'on',
            samplingStatus: 'on',
            zoomState: 'in',
          },
        },
      };
      const action = { type: 'TOGGLE_ZOOM_STATE', payload: { viewId: 'plot1' } };
      const state = reducer(stateWithPlotViewWithSamplingOnOnIn, action);
      expect(state.plot1.sampling.samplingLock).toBe('on');
      expect(state.plot1.sampling.samplingStatus).toBe('on');
      expect(state.plot1.sampling.zoomState).toBe('out');
    });
  });

  test('close_workspace', () => {
    const newState = reducer({ myView: { id: 'Id' } }, { type: 'HSC_CLOSE_WORKSPACE' });
    expect(newState).toEqual({});
  });
  test('should update sessionName', () => {
    const newState = reducer({ v1: {} }, actions.updateSessionName('v1', 'mySession'));
    expect(newState.v1).toEqual({ sessionName: 'mySession', isModified: true });
    expect(reducer(newState, actions.updateSessionName('v1', null))).toEqual({ v1: { isModified: true } });
  });
  test('should update domainName', () => {
    const newState = reducer({ v1: {} }, actions.updateDomainName('v1', 'myDomain'));
    expect(newState.v1).toEqual({ domainName: 'myDomain', isModified: true });
    expect(reducer(newState, actions.updateDomainName('v1', null))).toEqual({ v1: { isModified: true } });
  });
});

