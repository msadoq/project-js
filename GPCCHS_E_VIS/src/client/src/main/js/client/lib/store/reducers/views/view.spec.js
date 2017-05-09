/* eslint no-unused-expressions: "off" */
import _ from 'lodash/fp';
import * as actions from '../../actions/views';
import * as types from '../../types';
import viewsReducer from '../views';
import { freezeArgs } from '../../../common/test';

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
      links: [{ l: '1' }, { l: '2' }],
      procedures: [{ p: '1' }, { p: '2' }],
      defaultRatio: {
        length: 50,
        width: 50,
      },
      title: 'Plotview 4 parameters',
      titleStyle: { bold: false },
      backgroundColor: '#FFFFFF',
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
    it('Link', () => {
      const link = { l: '3' };
      const state = reducer(stateViews, actions.updateLink('plot1', 1, link));
      state.plot1.links[1].should.deep.equal(link);
      state.plot1.isModified.should.be.true;
    });
    it('Procedure', () => {
      const proc = { p: '3' };
      const state = reducer(stateViews, actions.updateProcedure('plot1', 0, proc));
      state.plot1.procedures[0].should.deep.equal(proc);
      state.plot1.isModified.should.be.true;
    });
    it('defaultRatio', () => {
      const newRatio = { length: 60, width: 50 };
      const state = reducer(stateViews, actions.updateRatio('plot1', newRatio));
      state.plot1.defaultRatio.should.deep.equal(newRatio);
      state.plot1.isModified.should.be.true;
    });
    it('title', () => {
      const state = reducer(stateViews, actions.updateTitle('plot1', 'new Title'));
      state.plot1.title.should.deep.equal('new Title');
      state.plot1.isModified.should.be.true;
    });
    it('title style', () => {
      const style = { bold: true };
      const state = reducer(stateViews, actions.updateTitleStyle('plot1', style));
      state.plot1.titleStyle.should.deep.equal(style);
      state.plot1.isModified.should.be.true;
    });
    it('bg color', () => {
      const state = reducer(stateViews, actions.updateBgColor('plot1', '#FFFFAA'));
      state.plot1.backgroundColor.should.deep.equal('#FFFFAA');
      state.plot1.isModified.should.be.true;
    });
  });
  describe('Add element in array', () => {
    it('link', () => {
      const link = { l: '3' };
      const state = reducer(stateViews, actions.addLink('plot1', link));
      state.plot1.links.should.deep.equal(
        [{ l: '1' }, { l: '2' }, { l: '3' }]);
    });
    it('procedure', () => {
      const proc = { p: '3' };
      const state = reducer(stateViews, actions.addProcedure('plot1', proc));
      state.plot1.procedures.should.deep.equal(
        [{ p: '1' }, { p: '2' }, { p: '3' }]);
    });
  });
  describe('Remove element in array', () => {
    it('link', () => {
      const state = reducer(stateViews, actions.removeLink('plot1', 1));
      state.plot1.links.should.deep.equal([{ l: '1' }]);
    });
    it('procedure', () => {
      const state = reducer(stateViews, actions.removeProcedure('plot1', 0));
      state.plot1.procedures.should.deep.equal([{ p: '2' }]);
    });
  });
  it('reload view', () => {
    const myView = {
      isModified: true,
      title: 'myView',
      type: 'PlotView',
    };
    const action = { type: types.WS_VIEW_RELOAD, payload: { viewId: 'plot1', view: myView } };
    const state = reducer(stateViews, action);

    state.plot1.should.deep.equal(_.set('isModified', false, myView));
  });
  it('close_workspace', () => {
    const newState = reducer({ myView: { id: 'Id' } }, { type: types.HSC_CLOSE_WORKSPACE });
    newState.should.be.an('object').that.is.empty;
  });
  it('should update sessionName', () => {
    const newState = reducer({ v1: {} }, actions.updateSessionName('v1', 'mySession'));
    newState.v1.should.eql({ sessionName: 'mySession', isModified: true });
    reducer(newState, actions.updateSessionName('v1', null))
      .should.eql({ v1: { isModified: true } });
  });
  it('should update domainName', () => {
    const newState = reducer({ v1: {} }, actions.updateDomainName('v1', 'myDomain'));
    newState.v1.should.eql({ domainName: 'myDomain', isModified: true });
    reducer(newState, actions.updateDomainName('v1', null))
      .should.eql({ v1: { isModified: true } });
  });
});
