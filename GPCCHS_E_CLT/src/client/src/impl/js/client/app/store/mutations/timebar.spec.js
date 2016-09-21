/* eslint no-unused-expressions: 0 */
import _ from 'lodash';
import { should, getStore } from '../../utils/test';
import * as actions from './timebarActions';
import reducer, {
  getTimebar,
} from './timebarReducer';

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
  });
  describe('selectors', () => {
    it('getTimebar', () => {
      const { getState } = getStore({
        timebars: {
          myTimebarId: { id: 'Id' },
        },
      });
      getTimebar(getState(), 'myTimebarId').should.have.property('id', 'Id');
      should.not.exist(getTimebar(getState(), 'unknownId'));
    });
  });
});
