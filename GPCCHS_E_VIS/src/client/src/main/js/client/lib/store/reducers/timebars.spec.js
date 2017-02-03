/* eslint no-unused-expressions: 0 */
import _ from 'lodash';
import { should, getStore } from '../../common/test';
import * as actions from '../actions/timebars';
import reducer from './timebars';
import * as types from '../types';

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
        realTime: false,
        masterId: 'OtherId',
        timelines: ['myTimelineId'],
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
        timelines: [],
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
            visuWindow: {
              lower: 200,
              upper: 400,
              current: 300,
              defaultWidth: 600,
            },
            slideWindow: { lower: 250, upper: 350 },
            rulerResolution: 100,
            speed: 10,
            realTime: false,
            mode: 'Normal',
            masterId: 'OtherId',
            timelines: ['myTimelineId', 'myTimelineId3'],
          },
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
          lower: 198,
          upper: 403,
          current: 306,
        },
        null
      ));
      const timebars = getState().timebars;
      //  5, 40, 30));
      timebars.should.have.property('myTimebarId');
      timebars.myTimebarId.should.have.property('visuWindow');
      timebars.myTimebarId.visuWindow.should.have.property('lower');
      timebars.myTimebarId.visuWindow.lower.should.equal(198);
      timebars.myTimebarId.visuWindow.should.have.property('upper');
      timebars.myTimebarId.visuWindow.upper.should.equal(403);
      timebars.myTimebarId.visuWindow.should.have.property('current');
      timebars.myTimebarId.visuWindow.current.should.equal(306);
    });
    it('visuWindow should fail', () => {
      dispatch(actions.updateCursors('myTimebarId', { lower: 290 }, null));
      const timebars = getState().timebars;
      timebars.should.have.property('myTimebarId');
      timebars.myTimebarId.should.have.property('visuWindow');
      timebars.myTimebarId.visuWindow.should.have.property('lower');
      timebars.myTimebarId.visuWindow.lower.should.equal(198);
      getState().messages['timeSetter-myTimebarId'].length.should.equal(1);
    });
    it('slideWindow should fail', () => {
      dispatch(actions.updateCursors('myTimebarId', null, { upper: 450 }));
      const timebars = getState().timebars;
      timebars.should.have.property('myTimebarId');
      timebars.myTimebarId.should.have.property('slideWindow');
      timebars.myTimebarId.slideWindow.should.have.property('upper');
      timebars.myTimebarId.slideWindow.upper.should.equal(350);
      getState().messages['timeSetter-myTimebarId'].length.should.equal(2);
    });
    it('should be immutable with same data', () => {
      dispatch(actions.updateCursors(
        'myTimebarId',
        {
          lower: 5,
          upper: 40,
          current: 30,
        }
        )
      );
      const oldState = getState().timebars;
      dispatch(actions.updateCursors(
        'myTimebarId',
        {
          lower: 5,
          upper: 40,
          current: 30,
        }
        )
      );
      const newState = getState().timebars;
      newState.should.equal(oldState);
    });
    it('speed', () => {
      dispatch(actions.updateSpeed('myTimebarId', 20));
      const newState = getState().timebars;
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
    it('realTime', () => {
      const newState = reducer(state.timebars, actions.setRealTime('myTimebarId', true));
      newState.should.have.property('myTimebarId');
      newState.myTimebarId.should.have.property('realTime');
      newState.myTimebarId.realTime.should.equal(true);
    });
    it('jump', () => {
      const visuWindow = getState().timebars.myTimebarId.visuWindow;
      dispatch(actions.jump('myTimebarId', 2));
      const timebars = getState().timebars;
      timebars.should.have.property('myTimebarId');
      timebars.myTimebarId.visuWindow.lower.should.equal(visuWindow.lower + 2);
      timebars.myTimebarId.visuWindow.upper.should.equal(visuWindow.upper + 2);
      timebars.myTimebarId.visuWindow.current.should.equal(visuWindow.current + 2);
    });
    it('restore Width', () => {
      dispatch(actions.restoreWidth('myTimebarId'));
      const timebars = getState().timebars;
      timebars.should.have.property('myTimebarId');
      (timebars.myTimebarId.visuWindow.upper - timebars.myTimebarId.visuWindow.lower).should.equal(
        600
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
  describe('switch modes', () => {
    let state;
    let dispatch;
    let getState;
    before(() => {
      const store = getStore({
        timebars: {
          myTimebarId: {
            id: 'Id',
            visuWindow: {
              lower: 200,
              upper: 400,
              current: 300,
              defauttWidth: 600,
            },
            slideWindow: { lower: 250, upper: 350 },
          },
        },
      });
      getState = store.getState;
      state = getState();
      dispatch = store.dispatch;
    });
    it('mode to Extensible', () => {
      state.timebars.myTimebarId.slideWindow.upper.should.be.below(
        state.timebars.myTimebarId.visuWindow.upper
      );
      dispatch(actions.switchToExtensibleMode('myTimebarId'));
      const timebars = getState().timebars;
      timebars.should.have.property('myTimebarId');
      timebars.myTimebarId.mode.should.equal('Extensible');
      timebars.myTimebarId.slideWindow.upper.should.be.above(
        timebars.myTimebarId.visuWindow.upper
      );
    });
    it('mode to Fixed', () => {
      dispatch(actions.switchToFixedMode('myTimebarId'));
      const timebars = getState().timebars;
      timebars.should.have.property('myTimebarId');
      timebars.myTimebarId.mode.should.equal('Fixed');
      timebars.myTimebarId.slideWindow.upper.should.be.below(
        timebars.myTimebarId.visuWindow.upper
      );
    });
    it('mode to Normal', () => {
      let timebars = getState().timebars;
      const slideUpper = timebars.myTimebarId.slideWindow.upper;
      dispatch(actions.switchToNormalMode('myTimebarId'));
      timebars = getState().timebars;
      timebars.should.have.property('myTimebarId');
      timebars.myTimebarId.mode.should.equal('Normal');
      timebars.myTimebarId.slideWindow.upper.should.equal(slideUpper);
    });
    it('close_workspace', () => {
      const newState = reducer(state.timebars, { type: types.HSC_CLOSE_WORKSPACE });
      newState.should.be.an('object').that.is.empty;
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
            timelines: ['myTimelineId', 'myTimelineId3'],
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
        sessionId: 100,
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
            timelines: ['myTimelineId', 'myTimelineId3'],
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
  describe('handlePlay action', () => {
    let store;
    let dispatch;
    let getState;
    const initStore = (playingTimebarId) => {
      store = getStore({
        hsc: {
          playingTimebarId,
        },
        timebars: {
          myTimebarId: {
            id: 'Id',
            mode: 'Normal',
            visuWindow: {
              lower: 1420106400000,
              upper: 1420106700000,
              current: 1420106500000,
            },
            slideWindow: {
              lower: 1420106430000,
              upper: 1420106700500, // visuWindow.upper + 500
            },
            speed: 1,
          },
        },
      });
      getState = store.getState;
      dispatch = store.dispatch;
    };

    it('(Normal mode) - should move 377ms', () => {
      initStore('myTimebarId');
      const state = getState();
      const offset = 377;
      const vw = state.timebars.myTimebarId.visuWindow;
      const newCurrent = vw.current + offset;
      dispatch(actions.handlePlay(newCurrent - vw.current, 0));

      const newState = getState();
      newState.timebars.myTimebarId.visuWindow.should.eql({
        lower: vw.lower,
        upper: vw.upper,
        current: newCurrent,
      });
      newState.timebars.myTimebarId.slideWindow.should.eql({
        lower: Math.trunc((vw.lower + newCurrent) / 2),
        upper: Math.trunc((vw.current + vw.upper + offset) / 2),
      });
    });
    it('(Normal mode) - should fail moving 377ms because timebar not found', () => {
      initStore('myTimebarId02');
      const state = getState();
      const offset = 377;
      const vw = state.timebars.myTimebarId.visuWindow;
      const sw = state.timebars.myTimebarId.slideWindow;
      const newCurrent = vw.current + offset;
      dispatch(actions.handlePlay(
        vw.current,
        newCurrent,
        0
      ));

      const newState = getState();
      newState.timebars.myTimebarId.visuWindow.should.eql({
        lower: vw.lower,
        upper: vw.upper,
        current: vw.current,
      });
      newState.timebars.myTimebarId.slideWindow.should.eql({
        lower: sw.lower,
        upper: sw.upper,
      });
    });
  });
});
