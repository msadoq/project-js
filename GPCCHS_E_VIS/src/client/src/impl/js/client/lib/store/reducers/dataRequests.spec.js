/* eslint no-unused-expressions: 0 */
import reducer from './dataRequests';
import * as actions from '../actions/dataRequests';

describe('store:reducers:dataRequests', () => {
  describe('addRequests', () => {
    it('initial state', () => {
      reducer(undefined, {}).should.be.an('object').that.is.empty;
    });

    const state = Object.freeze({
      myRemoteId: [[0, 5]],
      myOtherId: [[5, 10], [15, 20]],
      unChanged: [[1, 2]],
    });

    it('unknow action', () => {
      reducer(state, { type: 'unknown' }).should.eql(state);
    });
    it('simple', () => {
      reducer({}, actions.addRequests({
        myRemoteId: { intervals: [[0, 5]] },
        myOtherId: { intervals: [[5, 10], [15, 20]] },
        unChanged: { intervals: [[1, 2]] },
      })).should.eql(state);
    });
    it('complex', () => {
      reducer(state, actions.addRequests({
        myRemoteId: { intervals: [[2, 3]] },
        myOtherId: { intervals: [[4, 6], [9, 15], [25, 30]] },
        otherOne: { intervals: [[17, 20]] },
        empty: { intervals: [] },
      })).should.eql({
        myRemoteId: [[0, 5]],
        myOtherId: [[4, 20], [25, 30]],
        otherOne: [[17, 20]],
        empty: [],
        unChanged: [[1, 2]],
      });
    });
  });
  describe('removeRequests', () => {
    const state = Object.freeze({
      myRemoteId: [[0, 5]],
      myOtherId: [[5, 10], [15, 20]],
      unChanged: [[1, 2]],
    });

    it('complex', () => {
      const myState = reducer({}, actions.addRequests({
        myRemoteId: { intervals: [[0, 15]] },
        myOtherId: { intervals: [[0, 3], [5, 10], [13, 25]] },
        unChanged: { intervals: [[1, 2]] },
        toRemove: { intervals: [[0, 42]] },
      }));
      reducer(myState, actions.removeRequests({
        myRemoteId: { intervals: [[5, 15]] },
        myOtherId: { intervals: [[0, 3], [13, 15], [20, 25]] },
        toRemove: { intervals: [[0, 42]] },
      })).should.eql(state);
    });
  });
});
