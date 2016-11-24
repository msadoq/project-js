/* eslint no-unused-expressions: 0 */
import * as actions from '../actions/views';
import reducer,
{
  updateObject,
  updateArray,
  addElementInArray,
  removeElementInArray
} from './views';
import { freezeMe } from '../../common/test';

describe('store:views', () => {
  describe('actions & reducer', () => {
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
          actions.add('myViewId', 'plot', { setting: 'value' })
        );
        state.myViewId.should.eql({
          type: 'plot',
          configuration: { setting: 'value' },
          absolutePath: undefined,
          path: undefined,
          oId: undefined,
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
          isModified: false,
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
  });
  describe('update', () => {
    const state = {
      view1: {
        type: 'plot',
        configuration: {
          oName: 'oldValue',
        },
        absolutePath: '/data/oldPath',
        isModified: false,
      }
    };
    freezeMe(state);
    it('absolute Path', () => {
      const s = reducer(state, actions.updateAbsolutePath('view1', '/data/newPath'));
      s.view1.absolutePath.should.equal('/data/newPath');
      s.view1.isModified.should.equal(true);
    });
    it('absolute Path: no change', () => {
      reducer(state, actions.updateAbsolutePath('view1', '/data/oldPath')).should.equal(state);
    });
    it('object ok', () => {
      const action = {
        payload: {
          viewId: 'view1',
          pName: 'newValue',
        }
      };
      updateObject(state, action, 'oName', 'pName').should.deep.equal({
        view1: {
          type: 'plot',
          isModified: true,
          absolutePath: '/data/oldPath',
          configuration: {
            oName: 'newValue',
          },
        }
      });
    });
    it('object: invalid view', () => {
      const action = {
        payload: {
          viewId: 'view2',
          pName: 'newValue',
        }
      };
      updateObject(state, action, 'oName', 'pName').should.equal(state);
    });
    it('object: invalid view type', () => {
      const action = {
        payload: {
          viewId: 'view1',
          pName: 'newValue',
        }
      };
      updateObject(state, action, 'oName', 'pName', 'text').should.equal(state);
    });
    it('object: valid view type', () => {
      const action = {
        payload: {
          viewId: 'view1',
          pName: 'newValue',
        }
      };
      updateObject(state, action, 'oName', 'pName', 'plot').should.deep.equal({
        view1: {
          type: 'plot',
          isModified: true,
          absolutePath: '/data/oldPath',
          configuration: {
            oName: 'newValue',
          },
        }
      });
    });
    it('object: invalid paramName', () => {
      const action = {
        payload: {
          viewId: 'view1',
          pName: 'newValue',
        }
      };
      updateObject(state, action, 'oName', 'paramName').should.equal(state);
    });
    const stateArray = {
      view1: {
        type: 'plot',
        configuration: {
          oName: ['oldValue1', 'oldValue2']
        },
      }
    };
    freezeMe(stateArray);

    it('array element ok', () => {
      const action = {
        payload: {
          viewId: 'view1',
          pName: 'newValue',
          index: 0,
        }
      };
      updateArray(stateArray, action, 'oName', 'pName').should.deep.equal({
        view1: {
          type: 'plot',
          isModified: true,
          configuration: {
            oName: ['newValue', 'oldValue2']
          },
        }
      });
    });
    it('array: invalid view id', () => {
      const action = {
        payload: {
          viewId: 'view2',
          pName: 'newValue',
          index: 0,
        }
      };
      updateArray(stateArray, action, 'oName', 'pName').should.equal(stateArray);
    });
    it('array: invalid index', () => {
      const action = {
        payload: {
          viewId: 'view1',
          pName: 'newValue',
          index: 2,
        }
      };
      updateArray(stateArray, action, 'oName', 'pName').should.equal(stateArray);
    });
    it('array: invalid paramName', () => {
      const action = {
        payload: {
          viewId: 'view1',
          pName: 'newValue',
          index: 0,
        }
      };
      updateArray(stateArray, action, 'oName', 'paramName').should.equal(stateArray);
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
          width: 50
        },
        entryPoints: [{ name: 'ATT_BC_REVTCOUNT4' }],
        axes: [{ axisx: '1' }, { axisx: '2' }],
        grids: [{ grid: '1' }, { grid: '2' }],
        title: 'Plotview 4 parameters',
        titleStyle: { bold: false },
        plotBackgroundColour: '#FFFFFF',
        legend: 'old Legend',
        markers: [{ m: '1' }, { m: '2' }],
      },
      // path: 'views/plot1.json',
      // absolutePath: '/data/work/views/plot1.json',
    },
    text1: {
      type: 'TextView',
      configuration: {
        type: 'TextView',
        content: 'old content',
      }
    }
  };
  freezeMe(stateViews);
  describe('update action', () => {
    it('Entry Point', () => {
      const newEp = {
        name: 'new EP',
        connectedDataX: { formula: 'cdx' },
        connectedDataY: { formula: 'cdY' },
        lineStyle: 'Continuous',
        pointsStyle: 'None',
        curveColour: '#DF013A',
        stateColours: [],
      };
      const state = reducer(stateViews, actions.updateEntryPoint('plot1', 0, newEp));
      state.plot1.configuration.entryPoints[0].should.deep.equal(newEp);
    });
    it('Axis', () => {
      const axis = { axisx: '3' };
      const state = reducer(stateViews, actions.updateAxis('plot1', 1, axis));
      state.plot1.configuration.axes[1].should.deep.equal(axis);
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
    it('bg colour', () => {
      const state = reducer(stateViews, actions.updateBgColor('plot1', '#FFFFAA'));
      state.plot1.configuration.plotBackgroundColour.should.deep.equal('#FFFFAA');
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
      const stateArray = {
        view1: {
          type: 'plot',
          configuration: {
            oName: ['oldValue1', 'oldValue2']
          },
        }
      };
      freezeMe(stateArray);

      const action = {
        payload: {
          viewId: 'view1',
          pName: 'newValue',
        }
      };
      addElementInArray(stateArray, action, 'oName', 'pName').should.deep.equal({
        view1: {
          type: 'plot',
          isModified: true,
          configuration: {
            oName: ['oldValue1', 'oldValue2', 'newValue'],
          },
        }
      });
    });
    it('axis', () => {
      const axis = { axisx: '3' };
      const state = reducer(stateViews, actions.addAxis('plot1', axis));
      state.plot1.configuration.axes.should.deep.equal(
        [{ axisx: '1' }, { axisx: '2' }, { axisx: '3' }]);
    });
    it('entry point', () => {
      const ep = { name: 'new ep' };
      const state = reducer(stateViews, actions.addEntryPoint('plot1', ep));
      state.plot1.configuration.entryPoints.should.deep.equal(
        [{ name: 'ATT_BC_REVTCOUNT4' }, { name: 'new ep' }]);
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
    const stateArray = {
      view1: {
        type: 'plot',
        configuration: {
          oName: ['oldValue1', 'oldValue2']
        },
      }
    };
    freezeMe(stateArray);

    it('general ok', () => {
      const action = {
        payload: {
          viewId: 'view1',
          pName: 'newValue',
          index: 0,
        }
      };
      removeElementInArray(stateArray, action, 'oName').should.deep.equal({
        view1: {
          type: 'plot',
          isModified: true,
          configuration: {
            oName: ['oldValue2'],
          },
        }
      });
    });
    it('general - invalid index', () => {
      const action = {
        payload: {
          viewId: 'view1',
          pName: 'newValue',
          index: 3,
        }
      };
      removeElementInArray(stateArray, action, 'oName').should.equal(stateArray);
    });
    it('general - invalid view ID', () => {
      const action = {
        payload: {
          viewId: 'view2',
          pName: 'newValue',
          index: 0,
        }
      };
      removeElementInArray(stateArray, action, 'oName').should.equal(stateArray);
    });
    it('axis', () => {
      const state = reducer(stateViews, actions.removeAxis('plot1', 0));
      state.plot1.configuration.axes.should.deep.equal([{ axisx: '2' }]);
    });
    it('entry point', () => {
      const state = reducer(stateViews, actions.removeEntryPoint('plot1', 0));
      state.plot1.configuration.entryPoints.should.deep.equal([]);
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
});
