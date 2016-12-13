/* eslint no-unused-expressions: 0 */
import _ from 'lodash';
import { should, getStore } from '../../common/test';
import * as actions from '../actions/timebars';
import reducer from './timebars';

describe('store:timebars:reducer', () => {
  it('initial state', () => {
    reducer(undefined, {}).should.be.an('object').that.is.empty;
  });
  it('unknown action', () => {
    reducer({ myTimebarId: { id: 'Id' } }, {})
      .should.eql({ myTimebarId: { id: 'Id' } });
  });
  describe('add', () => {
    it('add', () => {
      const fixture = {
        id: 'Id',
        visuWindow: { lower: 10 },
        slideWindow: { lower: 20 },
        rulerResolution: 100,
        speed: 10,
        masterId: 'OtherId',
        timelines: ['myTimelineId']
      };
      const state = reducer(
        undefined,
        actions.add('myTimebarId', fixture)
      );
      state.myTimebarId.should.have.properties(
        _.omit(state.myTimebarId, ['extUpperBound', 'rulerStart'])
      );
      state.myTimebarId.should.have.property('extUpperBound');
      state.myTimebarId.should.have.property('rulerStart');
    });
    it('add empty', () => {
      const state = reducer(
        undefined,
        actions.add('myTimebarId')
      );
      state.myTimebarId.should.have.properties({
        id: null,
        rulerResolution: 2250,
        speed: 1,
        mode: 'Normal',
        masterId: null,
        timelines: []
      });
      state.myTimebarId.should.have.property('extUpperBound');
      state.myTimebarId.should.have.property('rulerStart');
      state.myTimebarId.should.have.property('visuWindow');
      state.myTimebarId.should.have.property('slideWindow');
      state.myTimebarId.visuWindow.lower.should.be.below(state.myTimebarId.slideWindow.lower);
      state.myTimebarId.slideWindow.lower.should.be.below(state.myTimebarId.visuWindow.current);
      state.myTimebarId.visuWindow.current.should.be.below(state.myTimebarId.slideWindow.upper);
      state.myTimebarId.slideWindow.upper.should.be.below(state.myTimebarId.visuWindow.upper);
    });
  });
  describe('remove', () => {
    it('remove', () => {
      const state = reducer(
        { myTimebarId: { id: 'Id' } },
        actions.remove('myTimebarId')
      );
      state.should.not.have.property('myTimebarId');
    });
    it('remove unknown', () => {
      const state = reducer(
        { myTimebarId: { id: 'Id' } },
        actions.remove('foo')
      );
      state.should.have.property('myTimebarId');
    });
  });
  describe('update', () => {
    let state;
    let dispatch;
    let getState;
    before(() => {
      const store = getStore({
        timebars: {
          myTimebarId: {
            id: 'Id',
            visuWindow: { lower: 10, upper: 20, current: 15 },
            slideWindow: { lower: 11, upper: 19 },
            rulerResolution: 100,
            speed: 10,
            mode: 'Normal',
            masterId: 'OtherId',
            timelines: ['myTimelineId', 'myTimelineId3']
          }
        },
      });
      getState = store.getState;
      state = getState();
      dispatch = store.dispatch;
    });
    it('id', () => {
      const newState = reducer(state.timebars, actions.updateId('myTimebarId', 'newId'));
      newState.should.have.property('myTimebarId');
      newState.myTimebarId.should.have.property('id');
      newState.myTimebarId.id.should.equal('newId');
    });
    it('visuWindow', () => {
      dispatch(actions.updateCursors(
        'myTimebarId',
        {
          lower: 5,
          upper: 40,
          current: 18,
        },
        null
      ));
      const timebars = getState().timebars;
      //  5, 40, 30));
      timebars.should.have.property('myTimebarId');
      timebars.myTimebarId.should.have.property('visuWindow');
      timebars.myTimebarId.visuWindow.should.have.property('lower');
      timebars.myTimebarId.visuWindow.lower.should.equal(5);
      timebars.myTimebarId.visuWindow.should.have.property('upper');
      timebars.myTimebarId.visuWindow.upper.should.equal(40);
      timebars.myTimebarId.visuWindow.should.have.property('current');
      timebars.myTimebarId.visuWindow.current.should.equal(18);
    });
    it('visuWindow should fail', () => {
      dispatch(actions.updateCursors('myTimebarId', { lower: 12 }, null));
      const timebars = getState().timebars;
      timebars.should.have.property('myTimebarId');
      timebars.myTimebarId.should.have.property('visuWindow');
      timebars.myTimebarId.visuWindow.should.have.property('lower');
      timebars.myTimebarId.visuWindow.lower.should.equal(5);
      getState().messages['timeSetter-myTimebarId'].length.should.equal(1);
    });
    it('slideWindow should fail', () => {
      dispatch(actions.updateCursors('myTimebarId', null, { upper: 50 }));
      const timebars = getState().timebars;
      timebars.should.have.property('myTimebarId');
      timebars.myTimebarId.should.have.property('slideWindow');
      timebars.myTimebarId.slideWindow.should.have.property('upper');
      timebars.myTimebarId.slideWindow.upper.should.equal(19);
      getState().messages['timeSetter-myTimebarId'].length.should.equal(2);
    });
    it('should be immutable with same data', () => {
      const oldState = reducer(state.timebars, actions.updateCursors(
        'myTimebarId',
        {
          lower: 5,
          upper: 40,
          current: 30,
        }
        )
      );

      const newState = reducer(oldState, actions.updateCursors(
        'myTimebarId',
        {
          lower: 5,
          upper: 40,
          current: 30
        }
        )
      );

      newState.should.equal(oldState);
    });
    it('speed', () => {
      const newState = reducer(state.timebars, actions.updateSpeed('myTimebarId', 20));
      newState.should.have.property('myTimebarId');
      newState.myTimebarId.speed.should.equal(20);
    });
    it('defaultWidth', () => {
      const newState = reducer(state.timebars, actions.updateDefaultWidth('myTimebarId', 10005));
      newState.should.have.property('myTimebarId');
      newState.myTimebarId.should.have.property('visuWindow');
      newState.myTimebarId.visuWindow.should.have.property('defaultWidth');
      newState.myTimebarId.visuWindow.defaultWidth.should.equal(10005);
    });
    it('masterId', () => {
      const newState = reducer(state.timebars, actions.updateMasterId('myTimebarId', 'myTlId'));
      newState.should.have.property('myTimebarId');
      newState.myTimebarId.should.have.property('masterId');
      newState.myTimebarId.masterId.should.equal('myTlId');
    });
    it('mode to Extensible', () => {
      dispatch(actions.updateMode('myTimebarId', 'Extensible'));
      const timebars = getState().timebars;
      timebars.should.have.property('myTimebarId');
      timebars.myTimebarId.mode.should.equal('Extensible');
      timebars.myTimebarId.slideWindow.upper.should.be.above(
        timebars.myTimebarId.visuWindow.upper
      );
    });
    it('mode to Fixed', () => {
      dispatch(actions.updateMode('myTimebarId', 'Fixed'));
      const timebars = getState().timebars;
      timebars.should.have.property('myTimebarId');
      timebars.myTimebarId.mode.should.equal('Fixed');
      timebars.myTimebarId.slideWindow.upper.should.be.below(
        timebars.myTimebarId.visuWindow.upper
      );
    });
    it('mount timeline', () => {
      const newState = reducer(state.timebars, actions.mountTimeline('myTimebarId', 'myTimelineId2'));
      newState.should.have.property('myTimebarId');
      newState.myTimebarId.should.have.property('timelines');
      newState.myTimebarId.timelines.should.have.length(3);
      newState.myTimebarId.timelines.should.deep.equal(['myTimelineId', 'myTimelineId3', 'myTimelineId2']);
    });
    it('unmount timeline', () => {
      const newState = reducer(state.timebars, actions.unmountTimeline('myTimebarId', 'myTimelineId'));
      newState.should.have.property('myTimebarId');
      newState.myTimebarId.should.have.property('timelines');
      newState.myTimebarId.timelines.should.have.length(1);
      newState.myTimebarId.timelines.should.deep.equal(['myTimelineId3']);
    });
  });
  describe('Compound actions', () => {
    it('add and mount timeline', () => {
      const { dispatch, getState } = getStore({
        timebars: {
          myTimebarId: {
            id: 'Id',
            visuWindow: { lower: 10, upper: 20, current: 15 },
            slideWindow: { lower: 20, upper: 30 },
            rulerResolution: 100,
            speed: 10,
            masterId: 'OtherId',
            timelines: ['myTimelineId', 'myTimelineId3']
          } },
        timelines: {
          myTimelineId: { id: 'tl1' },
          myTimelineId2: { id: 'tl2' },
          myTimelineId3: { id: 'tl3' },
        } });

      const fixture = {
        id: 'Id',
        offset: 10,
        kind: 'DataSet',
        sessionId: 100
      };
      dispatch(actions.addAndMountTimeline('myTimebarId', fixture));
      getState().timebars.myTimebarId.timelines.should.be.an('array').with.length(3);
      _.forEach(getState().timebars.myTimebarId.timelines, (tlId) => {
        should.exist(getState().timelines[tlId]);
      });
    });
    it('remove and unmount timeline', () => {
      const { dispatch, getState } = getStore({
        timebars: {
          myTimebarId: {
            id: 'Id',
            visuWindow: { lower: 10, upper: 20, current: 15 },
            slideWindow: { lower: 20, upper: 30 },
            rulerResolution: 100,
            speed: 10,
            masterId: 'OtherId',
            timelines: ['myTimelineId', 'myTimelineId3']
          } },
        timelines: {
          myTimelineId: { id: 'tl1' },
          myTimelineId2: { id: 'tl2' },
          myTimelineId3: { id: 'tl3' },
        } });
      dispatch(actions.unmountAndRemoveTimeline('myTimebarId', 'myTimelineId'));
      getState().timebars.myTimebarId.timelines.should.be.an('array').with.length(1);
      getState().timelines.should.not.keys('myTimelineId');
    });
  });
});
