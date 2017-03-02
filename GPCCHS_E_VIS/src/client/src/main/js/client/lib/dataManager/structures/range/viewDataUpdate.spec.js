import { freezeMe } from '../../../common/test';
import { viewRangeRemove, viewRangeAdd, getExtremValue, scanForMinAndMax } from './viewDataUpdate';

describe('dataManager/range/viewDataUpdate', () => {
  const state = {
    index: [0, 1, 2, 3],
    columns: [
      { x: 0, ep1: { x: 0, value: 100.1 }, ep2: { x: 0, value: 200.1 } },
      { x: 1, ep1: { x: 1, value: 100.2 } },
      { x: 2, ep1: { x: 2, value: 100.3 } },
      { x: 3, ep1: { x: 3, value: 100.4 } },
    ],
    min: { ep1: 100.1, ep2: 200.1 },
    minTime: { ep1: 0, ep2: 0 },
    max: { ep1: 100.4, ep2: 200.1 },
    maxTime: { ep1: 3, ep2: 0 },
  };

  describe('viewRangeRemove', () => {
    it('should support empty state', () => {
      const frozen = Object.freeze({});
      viewRangeRemove(frozen, 10, 20).should.equal(frozen);
      const otherFrozen = Object.freeze({ index: [] });
      viewRangeRemove(otherFrozen, 10, 20).should.equal(otherFrozen);
    });
    it('should support nothing to keep', () => {
      viewRangeRemove(freezeMe(state), -2, 0).should.eql(
        { index: [],
          columns: [],
          min: { ep1: 100.1, ep2: 200.1 },
          minTime: { ep1: 0, ep2: 0 },
          max: { ep1: 100.4, ep2: 200.1 },
          maxTime: { ep1: 3, ep2: 0 },
        });
      viewRangeRemove(freezeMe(state), 3, 5).should.eql(
        { index: [],
          columns: [],
          min: { ep1: 100.1, ep2: 200.1 },
          minTime: { ep1: 0, ep2: 0 },
          max: { ep1: 100.4, ep2: 200.1 },
          maxTime: { ep1: 3, ep2: 0 },
        });
      viewRangeRemove(freezeMe(state), 2, 1).should.eql(
        { index: [],
          columns: [],
          min: { ep1: 100.1, ep2: 200.1 },
          minTime: { ep1: 0, ep2: 0 },
          max: { ep1: 100.4, ep2: 200.1 },
          maxTime: { ep1: 3, ep2: 0 },
        });
    });
    it('should support partial keeping', () => {
      viewRangeRemove(freezeMe(state), 1, 2).should.eql({
        index: [1, 2],
        columns: [
          { x: 1, ep1: { x: 1, value: 100.2 } },
          { x: 2, ep1: { x: 2, value: 100.3 } },
        ],
        min: { ep1: 100.1, ep2: 200.1 },
        minTime: { ep1: 0, ep2: 0 },
        max: { ep1: 100.4, ep2: 200.1 },
        maxTime: { ep1: 3, ep2: 0 },
      });
      viewRangeRemove(freezeMe(state), 0, 1).index.should.eql([0, 1]);
      viewRangeRemove(freezeMe(state), -1, 1).index.should.eql([0, 1]);
      viewRangeRemove(freezeMe(state), 1, 3).index.should.eql([1, 2, 3]);
      viewRangeRemove(freezeMe(state), 1, 5).index.should.eql([1, 2, 3]);
    });
    it('should support keep everything', () => {
      viewRangeRemove(freezeMe(state), 0, 3).index.should.eql([0, 1, 2, 3]);
    });
  });
  describe('viewRangeAdd', () => {
    it('should ignore empty payloads call', () => {
      const previousState = freezeMe(state);
      const newState = viewRangeAdd(previousState, {});
      newState.should.equal(previousState);
    });
    it('should support empty state', () => {
      viewRangeAdd(freezeMe({}), {
        10: { ep1: { x: 1, value: 0.1 } },
        11: { ep1: { x: 2, value: 0.1 } },
        min: { ep1: 0.1 },
        minTime: { ep1: 10 },
        max: { ep1: 0.1 },
        maxTime: { ep1: 11 },
      }).should.eql({
        index: [10, 11],
        columns: [
          { x: 10, ep1: { x: 1, value: 0.1 } },
          { x: 11, ep1: { x: 2, value: 0.1 } },
        ],
        min: { ep1: 0.1 },
        minTime: { ep1: 10 },
        max: { ep1: 0.1 },
        maxTime: { ep1: 11 },
      });
    });
    describe('should add points', () => {
      it('one point in middle', () => {
        viewRangeAdd(Object.freeze({
          index: [1, 4],
          columns: [
            { x: 1, ep1: { x: 1, value: 101 } },
            { x: 4, ep1: { x: 4, value: 104 } },
          ],
          min: { ep1: 101 },
          minTime: { ep1: 1 },
          max: { ep1: 104 },
          maxTime: { ep1: 4 },
        }), {
          3: { ep1: { x: 3, value: 103 } },
          min: { ep1: 103 },
          minTime: { ep1: 3 },
          max: { ep1: 103 },
          maxTime: { ep1: 3 },
        }).should.eql({
          index: [1, 3, 4],
          columns: [
            { x: 1, ep1: { x: 1, value: 101 } },
            { x: 3, ep1: { x: 3, value: 103 } },
            { x: 4, ep1: { x: 4, value: 104 } },
          ],
          min: { ep1: 101 },
          minTime: { ep1: 1 },
          max: { ep1: 104 },
          maxTime: { ep1: 4 },
        });
      });
      it('points everywhere', () => {
        viewRangeAdd(Object.freeze({
          index: [1, 2, 4, 8, 10],
          columns: [
            { x: 1, ep1: { x: 1, value: 100.1 } },
            { x: 2, ep2: { x: 2, value: 200.1 } },
            { x: 4, ep1: { x: 4, value: 100.4 } },
            { x: 8, ep1: { x: 8, value: 100.8 } },
            { x: 10, ep1: { x: 10, value: 100.1 } },
          ],
          min: { ep1: 100.1, ep2: 200.1 },
          minTime: { ep1: 1, ep2: 2 },
          max: { ep1: 100.8, ep2: 200.1 },
          maxTime: { ep1: 8, ep2: 2 },
        }), {
          0: { ep1: { x: 0, value: 104 } },
          1: { ep2: { x: 1, value: 204 } },
          9: { ep1: { x: 9, value: 108 } },
          11: { ep1: { x: 11, value: 111 } },
          min: { ep1: 104, ep2: 204 },
          minTime: { ep1: 0, ep2: 1 },
          max: { ep1: 111, ep2: 204 },
          maxTime: { ep1: 11, ep2: 1 },
        }).should.eql({
          index: [0, 1, 2, 4, 8, 9, 10, 11],
          columns: [
            { x: 0, ep1: { x: 0, value: 104 } },
            { x: 1, ep1: { x: 1, value: 100.1 }, ep2: { x: 1, value: 204 } },
            { x: 2, ep2: { x: 2, value: 200.1 } },
            { x: 4, ep1: { x: 4, value: 100.4 } },
            { x: 8, ep1: { x: 8, value: 100.8 } },
            { x: 9, ep1: { x: 9, value: 108 } },
            { x: 10, ep1: { x: 10, value: 100.1 } },
            { x: 11, ep1: { x: 11, value: 111 } },
          ],
          min: { ep1: 100.1, ep2: 200.1 },
          minTime: { ep1: 1, ep2: 2 },
          max: { ep1: 111, ep2: 204 },
          maxTime: { ep1: 11, ep2: 1 },
        });
      });
    });
    describe('getExtremValue isMin', () => {
      it('isMin and new values are inferior', () => {
        const thisState = Object.freeze({
          index: [1, 10],
          columns: [
            { x: 1, ep1: { x: 1, value: 100.1 }, ep2: { x: 1, value: 200.1 } },
            { x: 10, ep1: { x: 10, value: 100.10 } },
          ],
          min: { ep1: 100.1, ep2: 200.1 },
          minTime: { ep1: 1, ep2: 1 },
          max: { ep1: 104, ep2: 200.1 },
          maxTime: { ep1: 4, ep2: 1 },
        });
        getExtremValue(thisState, 'ep1', { ep1: 90 }, { ep1: 0 }, true).should.eql({
          index: [1, 10],
          columns: [
            { x: 1, ep1: { x: 1, value: 100.1 }, ep2: { x: 1, value: 200.1 } },
            { x: 10, ep1: { x: 10, value: 100.10 } },
          ],
          min: { ep1: 90, ep2: 200.1 },
          minTime: { ep1: 0, ep2: 1 },
          max: { ep1: 104, ep2: 200.1 },
          maxTime: { ep1: 4, ep2: 1 },
        });
      });
      it('!isMin and new values are superior', () => {
        const thisState = Object.freeze({
          index: [1, 10],
          columns: [
            { x: 1, ep1: { x: 1, value: 100.1 }, ep2: { x: 1, value: 200.1 } },
            { x: 10, ep1: { x: 10, value: 100.10 } },
          ],
          min: { ep1: 100.1, ep2: 200.1 },
          minTime: { ep1: 1, ep2: 1 },
          max: { ep1: 104, ep2: 200.1 },
          maxTime: { ep1: 4, ep2: 1 },
        });
        getExtremValue(thisState, 'ep1', { ep1: 300 }, { ep1: 5 }, false).should.eql({
          index: [1, 10],
          columns: [
            { x: 1, ep1: { x: 1, value: 100.1 }, ep2: { x: 1, value: 200.1 } },
            { x: 10, ep1: { x: 10, value: 100.10 } },
          ],
          min: { ep1: 100.1, ep2: 200.1 },
          minTime: { ep1: 1, ep2: 1 },
          max: { ep1: 300, ep2: 200.1 },
          maxTime: { ep1: 5, ep2: 1 },
        });
      });
      it('no min in state', () => {
        const thisState = Object.freeze({
          index: [1, 10],
          columns: [
            { x: 1, ep1: { x: 1, value: 100.1 }, ep2: { x: 1, value: 200.1 } },
            { x: 10, ep1: { x: 10, value: 100.10 } },
          ],
          min: { ep2: 200.1 },
          minTime: { ep2: 1 },
          max: { ep1: 104, ep2: 200.1 },
          maxTime: { ep1: 4, ep2: 1 },
        });
        getExtremValue(thisState, 'ep1', { ep1: 102 }, { ep1: 0 }, true).should.eql({
          index: [1, 10],
          columns: [
            { x: 1, ep1: { x: 1, value: 100.1 }, ep2: { x: 1, value: 200.1 } },
            { x: 10, ep1: { x: 10, value: 100.10 } },
          ],
          min: { ep1: 100.1, ep2: 200.1 },
          minTime: { ep1: 1, ep2: 1 },
          max: { ep1: 104, ep2: 200.1 },
          maxTime: { ep1: 4, ep2: 1 },
        });
      });
      it('no max in state', () => {
        const thisState = Object.freeze({
          index: [1, 10],
          columns: [
            { x: 1, ep1: { x: 1, value: 100.1 }, ep2: { x: 1, value: 200.1 } },
            { x: 10, ep1: { x: 10, value: 100.10 } },
          ],
          min: { ep1: 100.1, ep2: 200.1 },
          minTime: { ep1: 1, ep2: 1 },
          max: { ep2: 200.1 },
          maxTime: { ep2: 1 },
        });
        getExtremValue(thisState, 'ep1', { ep1: 105 }, { ep1: 5 }, false).should.eql({
          index: [1, 10],
          columns: [
            { x: 1, ep1: { x: 1, value: 100.1 }, ep2: { x: 1, value: 200.1 } },
            { x: 10, ep1: { x: 10, value: 100.10 } },
          ],
          min: { ep1: 100.1, ep2: 200.1 },
          minTime: { ep1: 1, ep2: 1 },
          max: { ep1: 105, ep2: 200.1 },
          maxTime: { ep1: 5, ep2: 1 },
        });
      });
    });
  });
  let stateScan;
  beforeEach(() => {
    stateScan = {
      index: [1, 2, 4, 8, 10],
      columns: [
        { x: 1, ep1: { x: 1, value: 100.1 } },
        { x: 2, ep2: { x: 2, value: 200.1 } },
        { x: 4, ep1: { x: 4, value: 100.4 } },
        { x: 8, ep1: { x: 8, value: 100.8 } },
        { x: 10, ep1: { x: 10, value: 100.1 } },
      ],
      min: { ep1: 100.1, ep2: 200.1 },
      minTime: { ep1: 10, ep2: 2 },
      max: { ep1: 100.8, ep2: 200.1 },
      maxTime: { ep1: 8, ep2: 2 },
    };
  });
  describe('scanForMinAndMax', () => {
    it('nothing to change', () => {
      scanForMinAndMax(Object.freeze(stateScan)).should.equal(stateScan);
    });
    it('min to update', () => {
      stateScan.minTime.ep1 = 0;
      scanForMinAndMax(Object.freeze(stateScan)).should.eql(
        {
          index: [1, 2, 4, 8, 10],
          columns: [
            { x: 1, ep1: { x: 1, value: 100.1 } },
            { x: 2, ep2: { x: 2, value: 200.1 } },
            { x: 4, ep1: { x: 4, value: 100.4 } },
            { x: 8, ep1: { x: 8, value: 100.8 } },
            { x: 10, ep1: { x: 10, value: 100.1 } },
          ],
          min: { ep1: 100.1, ep2: 200.1 },
          minTime: { ep1: 10, ep2: 2 },
          max: { ep1: 100.8, ep2: 200.1 },
          maxTime: { ep1: 8, ep2: 2 },
        });
    });
    it('max to update', () => {
      stateScan.maxTime.ep1 = 15;
      scanForMinAndMax(Object.freeze(stateScan)).should.eql(
        {
          index: [1, 2, 4, 8, 10],
          columns: [
            { x: 1, ep1: { x: 1, value: 100.1 } },
            { x: 2, ep2: { x: 2, value: 200.1 } },
            { x: 4, ep1: { x: 4, value: 100.4 } },
            { x: 8, ep1: { x: 8, value: 100.8 } },
            { x: 10, ep1: { x: 10, value: 100.1 } },
          ],
          min: { ep1: 100.1, ep2: 200.1 },
          minTime: { ep1: 10, ep2: 2 },
          max: { ep1: 100.8, ep2: 200.1 },
          maxTime: { ep1: 8, ep2: 2 },
        });
    });
  });
});
