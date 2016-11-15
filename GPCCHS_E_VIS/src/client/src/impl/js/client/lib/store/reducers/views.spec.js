/* eslint no-unused-expressions: 0 */
import * as actions from '../actions/views';
import reducer from './views';

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
  describe('update element', () => {
    const stateViews = {
      plot1: {
        type: 'PlotView',
        configuration: {
          type: 'PlotView',
          links: [],
          procedures: [],
          defaultRatio: {
            length: 50,
            width: 50
          },
          entryPoints: [
            { name: 'ATT_BC_REVTCOUNT4',
             connectedDataX:
              { formula: 'Reporting.ATT_BC_REVTCOUNT4<ReportingParameter>.groundDate' },
             connectedDataY:
              { formula: 'Reporting.ATT_BC_REVTCOUNT4<ReportingParameter>.extractedValue' }
            }
          ],
          axes: [],
          grids: [],
          title: 'Plotview 4 parameters',
          titleStyle: {},
          plotBackgroundColour: '#FFFFFF',
          legend: {},
          markers: [],
        },
        path: 'views/plot1.json',
        absolutePath: '/data/work/views/plot1.json',
      }
    };

    it('array', () => {
      const newEp = { name: 'new EP',
       connectedDataX: { formula: 'cdx' },
       connectedDataY: { formula: 'cdY' },
       lineStyle: 'Continuous',
       pointsStyle: 'None',
       curveColour: '#DF013A',
       stateColours: [] };
      const state = reducer(stateViews, actions.updateEntryPoint('plot1', 0, newEp));
      state.plot1.configuration.entryPoints[0].should.deep.equal(newEp);
    });
    it('object', () => {
      const state = reducer(stateViews, actions.updateTitle('plot1', 'new Title'));
      state.plot1.configuration.title.should.deep.equal('new Title');
    });
  });
});
