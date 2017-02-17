/* eslint no-unused-expressions: 0 */
// import _omit from 'lodash/omit';
import { freezeArgs } from '../../common/test';
import * as actions from '../actions/timebarTimelines';
import timebarTimelinesReducer from './timebarTimelines';
// import * as types from '../types';

const reducer = freezeArgs(timebarTimelinesReducer);

describe('store:timebarTimelines:reducer', () => {
  it('add timebar: emptyState', () => {
    reducer(undefined, actions.addTimebar('tb1')).should.eql({ tb1: [] });
  });
  it('add timebar: State ok', () => {
    reducer({ tb1: ['tl1'] }, actions.addTimebar('tb2')).should.eql({ tb1: ['tl1'], tb2: [] });
  });
  it('add timebar: state with timebar', () => {
    const state = { tb1: ['tl1'], tb2: [] };
    reducer(state, actions.addTimebar('tb2')).should.equal(state);
  });
  it('add timeline: emptyState', () => {
    reducer(undefined, actions.mountTimeline('tb1', 'tl1')).should.eql({ tb1: ['tl1'] });
  });
  it('add timeline: State with TB', () => {
    const newState = reducer({ tb1: ['tl1'] }, actions.mountTimeline('tb1', 'tl2'));
    newState.should.eql({ tb1: ['tl1', 'tl2'] });
  });
  it('add timeline: State with TL', () => {
    reducer({ tb1: ['tl1'] }, actions.mountTimeline('tb1', 'tl1')).should.eql({ tb1: ['tl1'] });
  });
  it('remove timebar: emptyState', () => {
    reducer(undefined, actions.removeTimebar('tb1')).should.eql({});
  });
  it('remove timebar: State ok', () => {
    reducer({ tb1: ['tl1'], tb2: ['tl2'] }, actions.removeTimebar('tb1')).should.eql({ tb2: ['tl2'] });
  });
  it('remove timebar: state without timebar', () => {
    const state = { tb1: ['tl1'], tb2: [] };
    reducer(state, actions.removeTimebar('tb32')).should.equal(state);
  });
  it('remove timeline: emptyState', () => {
    reducer(undefined, actions.unmountTimeline('tb1', 'tl1')).should.eql({ });
  });
  it('remove timeline: State with TB', () => {
    reducer({ tb1: ['tl1', 'tl2'] }, actions.unmountTimeline('tb1', 'tl2')).should.eql({ tb1: ['tl1'] });
  });
  it('remove timeline: State without TL', () => {
    const state = { tb1: ['tl1'], tb2: [] };
    reducer(state, actions.unmountTimeline('tb1', 'tl2')).should.eql(state);
  });
});
