/* eslint no-unused-expressions: 0 */
import _ from 'lodash';
import { should, getStore } from '../../common/test';
import * as actions from '../actions/timebars';
import reducer from './timebars';

describe('store:timebar', () => {
  describe('actions & reducer', () => {
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
          playingState: 'play',
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
          visuWindow: {},
          slideWindow: {},
          rulerResolution: 11250,
          speed: 1,
          playingState: 'pause',
          masterId: null,
          timelines: []
        });
        state.myTimebarId.should.have.property('extUpperBound');
        state.myTimebarId.should.have.property('rulerStart');
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
      before(() => {
        state = getStore({
          timebars: {
            myTimebarId: {
              id: 'Id',
              visuWindow: { lower: 10, upper: 20, current: 15 },
              slideWindow: { lower: 20, upper: 30 },
              rulerResolution: 100,
              speed: 10,
              playingState: 'play',
              masterId: 'OtherId',
              timelines: ['myTimelineId', 'myTimelineId3']
            } },
          timelines: {
            myTimelineId: { id: 'tl1' },
            myTimelineId2: { id: 'tl2' },
            myTimelineId3: { id: 'tl3' },
          } }).getState();
      });
      it('id', () => {
        const newState = reducer(state.timebars, actions.updateId('myTimebarId', 'newId'));
        newState.should.have.property('myTimebarId');
        newState.myTimebarId.should.have.property('id');
        newState.myTimebarId.id.should.equal('newId');
      });
      it('visuWindow', () => {
        const newState = reducer(state.timebars, actions.updateVisuWindow('myTimebarId',
         5, 40, 30));
        newState.should.have.property('myTimebarId');
        newState.myTimebarId.should.have.property('visuWindow');
        newState.myTimebarId.visuWindow.should.have.property('lower');
        newState.myTimebarId.visuWindow.lower.should.equal(5);
        newState.myTimebarId.visuWindow.should.have.property('upper');
        newState.myTimebarId.visuWindow.upper.should.equal(40);
        newState.myTimebarId.visuWindow.should.have.property('current');
        newState.myTimebarId.visuWindow.current.should.equal(30);
      });
      it('speed', () => {
        const newState = reducer(state.timebars, actions.updateSpeed('myTimebarId', 20));
        newState.should.have.property('myTimebarId');
        newState.myTimebarId.speed.should.equal(20);
      });
      it('playing state', () => {
        const newState = reducer(state.timebars, actions.updatePlayingState('myTimebarId', 'pause'));
        newState.should.have.property('myTimebarId');
        newState.myTimebarId.should.have.property('playingState');
        newState.myTimebarId.playingState.should.equal('pause');
      });
      it('masterId', () => {
        const newState = reducer(state.timebars, actions.updateMasterId('myTimebarId', 'myTlId'));
        newState.should.have.property('myTimebarId');
        newState.myTimebarId.should.have.property('masterId');
        newState.myTimebarId.masterId.should.equal('myTlId');
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
              playingState: 'play',
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
              playingState: 'play',
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
});
