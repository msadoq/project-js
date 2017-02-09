/* eslint no-unused-expressions: 0 */
import _find from 'lodash/find';
import * as actions from '../../actions/views';
import * as types from '../../types';
import reducer, {
  updateConfiguration,
  updateConfigurationArray,
  addElementInConfigurationArray,
  removeElementInConfigurationArray,
  addEntryPoint,
} from './index';
import {
  addNewAxis,
  getAxisId,
} from './axis';
import { freezeMe, should, getStore } from '../../../common/test';

describe('store:views:reducer', () => {
  it('initial state', () => {
    reducer(undefined, {}).should.be.an('object').that.is.empty;
  });
  it('unknown action', () => {
    reducer({ myViewId: { title: 'Title' } }, {})
      .should.eql({ myViewId: { title: 'Title' } });
  });
  describe('add', () => {
    it('add', () => {
      const state = reducer(
        undefined,
        actions.add('myViewId', 'plot', { setting: 'value' }, 'path', 'old', 'absolutePath', false)
      );
      state.myViewId.should.eql({
        type: 'plot',
        configuration: { setting: 'value' },
        absolutePath: 'absolutePath',
        path: 'path',
        oId: 'old',
        isModified: false,
      });
    });
    it('add empty', () => {
      const state = reducer(
        undefined,
        actions.add('myViewId')
      );
      state.myViewId.should.eql({
        type: null,
        configuration: {
          title: null,
        },
        absolutePath: undefined,
        path: undefined,
        oId: undefined,
        isModified: true,
      });
    });
  });
  describe('remove', () => {
    it('remove', () => {
      const state = reducer(
        { myViewId: { title: 'Title' } },
        actions.remove('myViewId')
      );
      state.should.not.have.property('myViewId');
    });
    it('remove unknown', () => {
      const state = reducer(
        { myViewId: { title: 'Title' } },
        actions.remove('foo')
      );
      state.should.have.property('myViewId');
    });
  });
  describe('set modified', () => {
    const state = {
      myView: {
        isModified: false,
        configuration: {
          title: 'myView',
        },
      },
    };
    const s = reducer(state, actions.setModified('myView', true));
    s.myView.isModified.should.equal(true);
  });
  describe('set collapsed', () => {
    const state = {
      myView: {
        configuration: {
          collapsed: false,
        },
      },
    };
    const s = reducer(state, actions.setCollapsed('myView', true));
    s.myView.configuration.collapsed.should.equal(true);
  });
  describe('set collapsed and updateLayout', () => {
    let dispatch;
    let getState;
    before(() => {
      const store = getStore({
        pages: {
          myPage: {
            layout: [
              {
                h: 5,
                w: 5,
                maxH: undefined,
                maxW: undefined,
                minW: 3,
                minH: 3,
                i: 'myView',
              },
            ],
          },
        },
        views: {
          myView: {
            configuration: {
              collapsed: false,
            },
          },
        },
      });
      getState = store.getState;
      dispatch = store.dispatch;
    });
    it('collapses / expands and updates layout', () => {
      dispatch(actions.setCollapsedAndUpdateLayout('myPage', 'myView', true));
      let newState = getState();
      newState.pages.myPage.layout[0].should.deep.equal({
        h: 1,
        w: 3,
        maxH: 5,
        maxW: 5,
        minW: 3,
        minH: 3,
        i: 'myView',
      });
      newState.views.myView.configuration.collapsed.should.equal(true);
      dispatch(actions.setCollapsedAndUpdateLayout('myPage', 'myView', false));
      newState = getState();
      newState.pages.myPage.layout[0].should.deep.equal({
        h: 5,
        w: 5,
        maxH: undefined,
        maxW: undefined,
        minW: 3,
        minH: 3,
        i: 'myView',
      });
      newState.views.myView.configuration.collapsed.should.equal(false);
    });
  });
  describe('update', () => {
    const state = freezeMe({
      view1: {
        type: 'plot',
        configuration: {
          oName: 'oldValue',
          title: 'my plot',
        },
        absolutePath: '/data/oldPath',
        path: '/data/oldPath',
        isModified: false,
      },
    });
    it('Path', () => {
      const s = reducer(state, {
        type: types.WS_VIEW_UPDATEPATH,
        payload: {
          viewId: 'view1',
          newPath: '/data/newPath',
        },
      });
      s.view1.path.should.equal('/data/newPath');
      s.view1.isModified.should.equal(true);
      s.view1.configuration.title.should.equal('my plot');
    });
    it('absolute Path', () => {
      const s = reducer(state, {
        type: types.WS_VIEW_UPDATE_ABSOLUTEPATH,
        payload: {
          viewId: 'view1',
          newPath: '/data/newPath',
        },
      });
      s.view1.absolutePath.should.equal('/data/newPath');
      s.view1.isModified.should.equal(true);
      s.view1.configuration.title.should.equal('my plot');
    });
    it('object ok', () => {
      const action = {
        payload: {
          viewId: 'view1',
          pName: 'newValue',
        },
      };
      updateConfiguration(state, action, 'oName', 'pName').should.deep.equal({
        view1: {
          type: 'plot',
          isModified: true,
          absolutePath: '/data/oldPath',
          path: '/data/oldPath',
          configuration: {
            oName: 'newValue',
            title: 'my plot',
          },
        },
      });
    });
    it('object: invalid view', () => {
      const action = {
        payload: {
          viewId: 'view2',
          pName: 'newValue',
        },
      };
      updateConfiguration(state, action, 'oName', 'pName').should.equal(state);
    });
    it('object: invalid view type', () => {
      const action = {
        payload: {
          viewId: 'view1',
          pName: 'newValue',
        },
      };
      updateConfiguration(state, action, 'oName', 'pName', 'text').should.equal(state);
    });
    it('object: valid view type', () => {
      const action = {
        payload: {
          viewId: 'view1',
          pName: 'newValue',
        },
      };
      updateConfiguration(state, action, 'oName', 'pName', 'plot').should.deep.equal({
        view1: {
          type: 'plot',
          isModified: true,
          absolutePath: '/data/oldPath',
          path: '/data/oldPath',
          configuration: {
            oName: 'newValue',
            title: 'my plot',
          },
        },
      });
    });
    const stateArray = freezeMe({
      view1: {
        type: 'plot',
        configuration: {
          oName: ['oldValue1', 'oldValue2'],
          title: 'my plot',
        },
      },
    });

    it('array element ok', () => {
      const action = {
        payload: {
          viewId: 'view1',
          pName: 'newValue',
          index: 0,
        },
      };
      updateConfigurationArray(stateArray, action, 'oName', 'pName').should.deep.equal({
        view1: {
          type: 'plot',
          isModified: true,
          configuration: {
            oName: ['newValue', 'oldValue2'],
            title: 'my plot',
          },
        },
      });
    });
    it('array: invalid view id', () => {
      const action = {
        payload: {
          viewId: 'view2',
          pName: 'newValue',
          index: 0,
        },
      };
      updateConfigurationArray(stateArray, action, 'oName', 'pName').should.equal(stateArray);
    });
    it('array: invalid index', () => {
      const action = {
        payload: {
          viewId: 'view1',
          pName: 'newValue',
          index: 2,
        },
      };
      updateConfigurationArray(stateArray, action, 'oName', 'pName').should.equal(stateArray);
    });
    it('array: invalid paramName', () => {
      const action = {
        payload: {
          viewId: 'view1',
          pName: 'newValue',
          index: 0,
        },
      };
      updateConfigurationArray(stateArray, action, 'oName', 'paramName').should.equal(stateArray);
    });
  });

  const stateViews = freezeMe({
    plot1: {
      type: 'PlotView',
      configuration: {
        type: 'PlotView',
        links: [{ l: '1' }, { l: '2' }],
        procedures: [{ p: '1' }, { p: '2' }],
        defaultRatio: {
          length: 50,
          width: 50,
        },
        entryPoints: [{
          name: 'ATT_BC_REVTCOUNT4',
          connectedDataX: { axisId: 'axis1' },
          connectedDataY: { axisId: 'axis2' },
        }, {
          name: 'ATT_BC_REVTCOUNT3',
          connectedDataX: { axisId: 'axis1' },
          connectedDataY: { axisId: 'axis3' },
        }],
        axes: {
          axis1: { label: '1', unit: 's', id: 'axis1' },
          axis2: { label: '2', unit: 'w', id: 'axis2' },
          axis3: { label: '3', unit: 'p', id: 'axis3' } },
        grids: [{ grid: '1' }, { grid: '2' }],
        title: 'Plotview 4 parameters',
        titleStyle: { bold: false },
        backgroundColor: '#FFFFFF',
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
  });
  describe('update action', () => {
    it('Entry Point', () => {
      const newEp = {
        name: 'new EP',
        connectedDataX: { formula: 'cdx', axisId: 'axis1' },
        connectedDataY: { formula: 'cdY', axisId: 'axis2' },
        objectStyle: {
          line: { style: 'Continuous', size: 4 },
          points: { style: 'None', size: 5 },
          curveColor: '#DF013A',
        },
        stateColors: [],
      };
      const state = reducer(stateViews, actions.updateEntryPoint('plot1', 0, newEp));
      state.plot1.configuration.entryPoints[0].should.deep.equal(newEp);
    });
    it('Grid', () => {
      const grid = { grid: '3' };
      const state = reducer(stateViews, actions.updateGrid('plot1', 1, grid));
      state.plot1.configuration.grids[1].should.deep.equal(grid);
    });
    it('Link', () => {
      const link = { l: '3' };
      const state = reducer(stateViews, actions.updateLink('plot1', 1, link));
      state.plot1.configuration.links[1].should.deep.equal(link);
    });
    it('Marker', () => {
      const marker = { m: '3' };
      const state = reducer(stateViews, actions.updateMarker('plot1', 0, marker));
      state.plot1.configuration.markers[0].should.deep.equal(marker);
    });
    it('Procedure', () => {
      const proc = { p: '3' };
      const state = reducer(stateViews, actions.updateProcedure('plot1', 0, proc));
      state.plot1.configuration.procedures[0].should.deep.equal(proc);
    });
    it('defaultRatio', () => {
      const newRatio = { length: 60, width: 50 };
      const state = reducer(stateViews, actions.updateRatio('plot1', newRatio));
      state.plot1.configuration.defaultRatio.should.deep.equal(newRatio);
    });
    it('title', () => {
      const state = reducer(stateViews, actions.updateTitle('plot1', 'new Title'));
      state.plot1.configuration.title.should.deep.equal('new Title');
    });
    it('title style', () => {
      const style = { bold: true };
      const state = reducer(stateViews, actions.updateTitleStyle('plot1', style));
      state.plot1.configuration.titleStyle.should.deep.equal(style);
    });
    it('bg color', () => {
      const state = reducer(stateViews, actions.updateBgColor('plot1', '#FFFFAA'));
      state.plot1.configuration.backgroundColor.should.deep.equal('#FFFFAA');
    });
    it('Legend', () => {
      const state = reducer(stateViews, actions.updateLegend('plot1', 'new Legend'));
      state.plot1.configuration.legend.should.deep.equal('new Legend');
    });
    it('content', () => {
      const state = reducer(stateViews, actions.updateContent('text1', 'new content'));
      state.text1.configuration.content.should.deep.equal('new content');
    });
  });
  describe('Add element in array', () => {
    it('general', () => {
      const stateArray = freezeMe({
        view1: {
          type: 'plot',
          configuration: {
            oName: ['oldValue1', 'oldValue2'],
            title: 'my view',
          },
        },
      });

      const action = {
        payload: {
          viewId: 'view1',
          pName: 'newValue',
        },
      };
      addElementInConfigurationArray(stateArray, action, 'oName', 'pName').should.deep.equal({
        view1: {
          type: 'plot',
          isModified: true,
          configuration: {
            oName: ['oldValue1', 'oldValue2', 'newValue'],
            title: 'my view',
          },
        },
      });
    });
    it('grid', () => {
      const grid = { grid: '3' };
      const state = reducer(stateViews, actions.addGrid('plot1', grid));
      state.plot1.configuration.grids.should.deep.equal(
        [{ grid: '1' }, { grid: '2' }, { grid: '3' }]);
    });
    it('link', () => {
      const link = { l: '3' };
      const state = reducer(stateViews, actions.addLink('plot1', link));
      state.plot1.configuration.links.should.deep.equal(
        [{ l: '1' }, { l: '2' }, { l: '3' }]);
    });
    it('marker', () => {
      const marker = { m: '3' };
      const state = reducer(stateViews, actions.addMarker('plot1', marker));
      state.plot1.configuration.markers.should.deep.equal(
        [{ m: '1' }, { m: '2' }, { m: '3' }]);
    });
    it('procedure', () => {
      const proc = { p: '3' };
      const state = reducer(stateViews, actions.addProcedure('plot1', proc));
      state.plot1.configuration.procedures.should.deep.equal(
        [{ p: '1' }, { p: '2' }, { p: '3' }]);
    });
  });
  describe('Remove element in array', () => {
    const stateArray = freezeMe({
      view1: {
        type: 'plot',
        configuration: {
          oName: ['oldValue1', 'oldValue2'],
          title: 'my view',
        },
      },
    });

    it('general ok', () => {
      const action = {
        payload: {
          viewId: 'view1',
          pName: 'newValue',
          index: 0,
        },
      };
      removeElementInConfigurationArray(stateArray, action, 'oName').should.deep.equal({
        view1: {
          type: 'plot',
          isModified: true,
          configuration: {
            oName: ['oldValue2'],
            title: 'my view',
          },
        },
      });
    });
    it('general - invalid index', () => {
      const action = {
        payload: {
          viewId: 'view1',
          pName: 'newValue',
          index: 3,
        },
      };
      removeElementInConfigurationArray(stateArray, action, 'oName').should.equal(stateArray);
    });
    it('general - invalid view ID', () => {
      const action = {
        payload: {
          viewId: 'view2',
          pName: 'newValue',
          index: 0,
        },
      };
      removeElementInConfigurationArray(stateArray, action, 'oName').should.equal(stateArray);
    });
    it('entry point', () => {
      const state = reducer(stateViews, actions.removeEntryPoint('plot1', 0));
      state.plot1.configuration.entryPoints.should.deep.equal([{
        name: 'ATT_BC_REVTCOUNT3',
        connectedDataX: { axisId: 'axis1' },
        connectedDataY: { axisId: 'axis3' },
      }]);
      state.plot1.configuration.axes.should.deep.equal({
        axis1: { label: '1', unit: 's', id: 'axis1' },
        axis3: { label: '3', unit: 'p', id: 'axis3' },
      });
    });
    it('grid', () => {
      const state = reducer(stateViews, actions.removeGrid('plot1', 1));
      state.plot1.configuration.grids.should.deep.equal([{ grid: '1' }]);
    });
    it('link', () => {
      const state = reducer(stateViews, actions.removeLink('plot1', 1));
      state.plot1.configuration.links.should.deep.equal([{ l: '1' }]);
    });
    it('marker', () => {
      const state = reducer(stateViews, actions.removeMarker('plot1', 1));
      state.plot1.configuration.markers.should.deep.equal([{ m: '1' }]);
    });
    it('procedure', () => {
      const state = reducer(stateViews, actions.removeProcedure('plot1', 0));
      state.plot1.configuration.procedures.should.deep.equal([{ p: '2' }]);
    });
  });
  describe('axis', () => {
    it('remove axis', () => {
      const state = reducer(stateViews, actions.removeAxis('plot1', 'axis2'));
      state.plot1.configuration.axes.should.deep.equal(
        { axis1: { label: '1', unit: 's', id: 'axis1' },
          axis3: { label: '3', unit: 'p', id: 'axis3' } });
    });
    it('add axis', () => {
      const axis = { label: 'axis4', unit: 's' };
      const state = reducer(stateViews, actions.addAxis('plot1', axis));
      const keys = Object.keys(state.plot1.configuration.axes);
      keys.should.have.length(4);
      state.plot1.configuration.axes[keys[0]].should.deep.equal({ label: '1', unit: 's', id: 'axis1' });
      state.plot1.configuration.axes[keys[1]].should.deep.equal({ label: '2', unit: 'w', id: 'axis2' });
      state.plot1.configuration.axes[keys[2]].should.deep.equal({ label: '3', unit: 'p', id: 'axis3' });
      state.plot1.configuration.axes[keys[3]].should.deep.equal({ label: 'axis4', unit: 's', id: keys[3] });
    });
    it('update axis', () => {
      const axis = { label: '3', unit: 'z' };
      const state = reducer(stateViews, actions.updateAxis('plot1', 'axis1', axis));
      state.plot1.configuration.axes.axis1.should.deep.equal(Object.assign({}, axis, { id: 'axis1' }));
    });
  });
  describe('add entry point', () => {
    it('addNewAxis: valid axis', () => {
      const state = { plot1: { configuration: { axes: { a1: { label: 'axis1', unit: 's' } } } } };
      const newState = addNewAxis(state, 'plot1', { label: 'axis2', unit: 'v', id: 'a2' });
      Object.keys(newState.plot1.configuration.axes).should.have.length(2);
      newState.should.not.equal(state);
    });
    it('addNewAxis: invalid axis', () => {
      const state = { plot1: { configuration: { axes: { a1: { label: 'axis1', unit: 's' } } } } };
      addNewAxis(state, 'plot1', undefined).should.equal(state);
    });
    it('getAxisId: valid id', () => {
      const connectedData = { axisId: 'axis2' };
      getAxisId('epName', connectedData, stateViews.plot1).should.equal('axis2');
    });
    it('getAxisId by unit', () => {
      const connectedData = { unit: 's' };
      getAxisId('epName', connectedData, stateViews.plot1).should.equal('axis1');
    });
    it('getAxisId: unknown unit', () => {
      const connectedData = { unit: 'a' };
      const index = getAxisId('epName', connectedData, stateViews.plot1);
      should.not.exist(index);
    });
    it('addEntryPoint: invalid viewId', () => {
      const action = { payload: {
        viewId: 'plot2',
        entryPoint: {},
      } };
      addEntryPoint(stateViews, action).should.equal(stateViews);
    });
    it('addEntryPoint: text view', () => {
      const action = { payload: {
        viewId: 'text1',
        entryPoint: { name: 'ep2', connectedData: {} },
      } };
      const state = addEntryPoint(stateViews, action);
      state.text1.configuration.entryPoints[1].should.have.properties(
        { name: 'ep2', connectedData: { timeline: '*', domain: '*' } });
    });
    it('addEntryPoint: text view', () => {
      const action = { payload: {
        viewId: 'text1',
        entryPoint: { name: 'ep2', connectedData: { timeline: 't1', domain: 'd1' } },
      } };
      const state = addEntryPoint(stateViews, action);
      state.text1.configuration.entryPoints[1].should.have.properties(
        { name: 'ep2', connectedData: { timeline: 't1', domain: 'd1' } });
    });
    it('addEntryPoint: plot view', () => {
      const action = { payload: {
        viewId: 'plot1',
        entryPoint: {
          name: 'ep2',
          connectedDataX: { timeline: 't1', domain: 'd1', unit: 's', axisId: 'axis1' },
          connectedDataY: { timeline: 't2', domain: 'd2', unit: 'w' } },
      } };
      const state = addEntryPoint(stateViews, action);
      state.plot1.configuration.entryPoints[2].should.have.properties({
        name: 'ep2',
        connectedDataX: { timeline: 't1', domain: 'd1', unit: 's', axisId: 'axis1' },
        connectedDataY: { timeline: 't2', domain: 'd2', unit: 'w', axisId: 'axis2' } });
    });
    it('addEntryPoint: plot view', () => {
      const action = { payload: {
        viewId: 'plot1',
        entryPoint: {
          name: 'ep2',
          connectedDataX: { timeline: 't1', domain: 'd1', unit: 'f' },
          connectedDataY: { domain: 'd2', unit: 'w' } },
      } };
      const state = addEntryPoint(stateViews, action);
      const axisId = _find(state.plot1.configuration.axes, axis => axis.unit === 'f').id;
      state.plot1.configuration.entryPoints[2].should.have.properties({
        name: 'ep2',
        connectedDataX: { timeline: 't1', domain: 'd1', unit: 'f', axisId },
        connectedDataY: { timeline: '*', domain: 'd2', unit: 'w', axisId: 'axis2' } });
      state.plot1.configuration.axes[axisId].label.should.equal('ep2');
    });
  });
  describe('reload view', () => {
    const conf = { axes: { a1: { label: 'axis1', unit: 's' } } };
    const state = reducer(stateViews, actions.reloadView('plot1', conf));
    state.plot1.configuration.should.deep.equal(conf);
  });
  describe('updateShowYAxes', () => {
    const state = reducer(stateViews, actions.updateShowYAxes('plot1', 'right'));
    state.plot1.configuration.showYAxes.should.eql('right');
  });
  describe('close_workspace', () => {
    const newState = reducer({ myView: { id: 'Id' } }, { type: types.HSC_CLOSE_WORKSPACE });
    newState.should.be.an('object').that.is.empty;
  });
});
