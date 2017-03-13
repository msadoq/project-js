/* eslint no-unused-expressions: "off" */
import _ from 'lodash/fp';
import _find from 'lodash/find';
import * as actions from '../../actions/views';
import * as types from '../../types';
import viewsReducer from '.././views';
import { freezeArgs } from '../../../common/test';

const reducer = freezeArgs(viewsReducer);

describe('store:views:reducer', () => {
  describe('set modified', () => {
    const state = {
      myView: {
        isModified: false,
        configuration: {
          title: 'myView',
        },
      },
    };
    it('set isModified to true', () => {
      const s = reducer(state, actions.setModified('myView', true));
      s.myView.isModified.should.equal(true);
    });
    it('does nothing when view is unknown', () => {
      const s = reducer(state, actions.setModified('unknownView', true));
      s.myView.isModified.should.equal(false);
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
    it('set oId', () => {
      const s = reducer(state, {
        type: types.WS_VIEW_SET_OID,
        payload: {
          viewId: 'view1',
          oid: 'yolo',
        },
      });
      s.should.not.be.eql(state);
      s.view1.oId.should.be.eql('yolo');
    });
  });

  const stateViews = {
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
  };
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
      state.plot1.isModified.should.be.true;
    });
    it('Grid', () => {
      const grid = { grid: '3' };
      const state = reducer(stateViews, actions.updateGrid('plot1', 1, grid));
      state.plot1.configuration.grids[1].should.deep.equal(grid);
      state.plot1.isModified.should.be.true;
    });
    it('Link', () => {
      const link = { l: '3' };
      const state = reducer(stateViews, actions.updateLink('plot1', 1, link));
      state.plot1.configuration.links[1].should.deep.equal(link);
      state.plot1.isModified.should.be.true;
    });
    it('Marker', () => {
      const marker = { m: '3' };
      const state = reducer(stateViews, actions.updateMarker('plot1', 0, marker));
      state.plot1.configuration.markers[0].should.deep.equal(marker);
      state.plot1.isModified.should.be.true;
    });
    it('Procedure', () => {
      const proc = { p: '3' };
      const state = reducer(stateViews, actions.updateProcedure('plot1', 0, proc));
      state.plot1.configuration.procedures[0].should.deep.equal(proc);
      state.plot1.isModified.should.be.true;
    });
    it('defaultRatio', () => {
      const newRatio = { length: 60, width: 50 };
      const state = reducer(stateViews, actions.updateRatio('plot1', newRatio));
      state.plot1.configuration.defaultRatio.should.deep.equal(newRatio);
      state.plot1.isModified.should.be.true;
    });
    it('title', () => {
      const state = reducer(stateViews, actions.updateTitle('plot1', 'new Title'));
      state.plot1.configuration.title.should.deep.equal('new Title');
      state.plot1.isModified.should.be.true;
    });
    it('title style', () => {
      const style = { bold: true };
      const state = reducer(stateViews, actions.updateTitleStyle('plot1', style));
      state.plot1.configuration.titleStyle.should.deep.equal(style);
      state.plot1.isModified.should.be.true;
    });
    it('bg color', () => {
      const state = reducer(stateViews, actions.updateBgColor('plot1', '#FFFFAA'));
      state.plot1.configuration.backgroundColor.should.deep.equal('#FFFFAA');
      state.plot1.isModified.should.be.true;
    });
    it('Legend', () => {
      const state = reducer(stateViews, actions.updateLegend('plot1', 'new Legend'));
      state.plot1.configuration.legend.should.deep.equal('new Legend');
      state.plot1.isModified.should.be.true;
    });
    it('content', () => {
      const state = reducer(stateViews, actions.updateContent('text1', 'new content'));
      state.text1.configuration.content.should.deep.equal('new content');
      state.text1.isModified.should.be.true;
    });
  });
  describe('Add element in array', () => {
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
    it('addEntryPoint: text view', () => {
      const action = {
        type: types.WS_VIEW_ADD_ENTRYPOINT,
        payload: {
          viewId: 'text1',
          entryPoint: { name: 'ep2', connectedData: {} },
        },
      };
      const state = reducer(stateViews, action);
      state.text1.configuration.entryPoints[1].should.have.properties(
        { name: 'ep2', connectedData: { timeline: '*', domain: '*' } });
      state.text1.isModified.should.be.true;
    });
    it('addEntryPoint: text view', () => {
      const action = {
        type: types.WS_VIEW_ADD_ENTRYPOINT,
        payload: {
          viewId: 'text1',
          entryPoint: { name: 'ep2', connectedData: { timeline: 't1', domain: 'd1' } },
        },
      };
      const state = reducer(stateViews, action);
      state.text1.configuration.entryPoints[1].should.have.properties(
        { name: 'ep2', connectedData: { timeline: 't1', domain: 'd1' } });
      state.text1.isModified.should.be.true;
    });
    it('addEntryPoint: plot view', () => {
      const action = {
        type: types.WS_VIEW_ADD_ENTRYPOINT,
        payload: {
          viewId: 'plot1',
          entryPoint: {
            name: 'ep2',
            connectedDataX: { timeline: 't1', domain: 'd1', unit: 's', axisId: 'axis1' },
            connectedDataY: { timeline: 't2', domain: 'd2', unit: 'w' } },
        },
      };
      const state = reducer(stateViews, action);
      state.plot1.configuration.entryPoints[2].should.have.properties({
        name: 'ep2',
        connectedDataX: { timeline: 't1', domain: 'd1', unit: 's', axisId: 'axis1' },
        connectedDataY: { timeline: 't2', domain: 'd2', unit: 'w', axisId: 'axis2' } });
      state.plot1.isModified.should.be.true;
    });
    it('addEntryPoint: plot view', () => {
      const action = {
        type: types.WS_VIEW_ADD_ENTRYPOINT,
        payload: {
          viewId: 'plot1',
          entryPoint: {
            name: 'ep2',
            connectedDataX: { timeline: 't1', domain: 'd1', unit: 'f' },
            connectedDataY: { domain: 'd2', unit: 'w' } },
        },
      };
      const state = reducer(stateViews, action);
      const axisId = _find(state.plot1.configuration.axes, axis => axis.unit === 'f').id;
      state.plot1.configuration.entryPoints[2].should.have.properties({
        name: 'ep2',
        connectedDataX: { timeline: 't1', domain: 'd1', unit: 'f', axisId },
        connectedDataY: { timeline: '*', domain: 'd2', unit: 'w', axisId: 'axis2' } });
      state.plot1.configuration.axes[axisId].label.should.equal('ep2');
      state.plot1.isModified.should.be.true;
    });
  });
  it('reload view', () => {
    const myView = {
      isModified: true,
      title: 'myView',
      type: 'PlotView',
      configuration: { axes: { a1: { label: 'axis1', unit: 's' } } },
    };
    const action = { type: types.WS_VIEW_RELOAD, payload: { viewId: 'plot1', view: myView } };
    const state = reducer(stateViews, action);

    state.plot1.should.deep.equal(_.set('isModified', false, myView));
  });
  it('updateShowYAxes', () => {
    const state = reducer(stateViews, actions.updateShowYAxes('plot1', 'right'));
    state.plot1.configuration.showYAxes.should.eql('right');
  });
  it('close_workspace', () => {
    const newState = reducer({ myView: { id: 'Id' } }, { type: types.HSC_CLOSE_WORKSPACE });
    newState.should.be.an('object').that.is.empty;
  });
});
