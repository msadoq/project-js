import { freezeMe } from '../../../common/test';
import { viewRangeRemove, viewRangeAdd, getExtremValue, scanForMinAndMax } from './viewDataUpdate';

describe('dataManager/range/viewDataUpdate', () => {
  const state = {
    indexes: { ep1: [0, 1, 2, 3], ep2: [0] },
    lines: {
      ep1: [
        { masterTime: 0, x: 0, value: 100.1 },
        { masterTime: 1, x: 1, value: 100.2 },
        { masterTime: 2, x: 2, value: 100.3 },
        { masterTime: 3, x: 3, value: 100.4 },
      ],
      ep2: [
        { masterTime: 0, x: 0, value: 200.1 },
      ] },
    min: { ep1: 100.1, ep2: 200.1 },
    minTime: { ep1: 0, ep2: 0 },
    max: { ep1: 100.4, ep2: 200.1 },
    maxTime: { ep1: 3, ep2: 0 },
  };

  describe('viewRangeRemove', () => {
    it('should support empty state', () => {
      const frozen = freezeMe({});
      viewRangeRemove(frozen, 10, 20).should.equal(frozen);
      const otherFrozen = freezeMe({ indexes: {} });
      viewRangeRemove(otherFrozen, 10, 20).should.equal(otherFrozen);
    });
    it('should support nothing to keep', () => {
      viewRangeRemove(freezeMe(state), -3, -1).should.eql(
        { indexes: {},
          lines: {},
          min: { ep1: 100.1, ep2: 200.1 },
          minTime: { ep1: 0, ep2: 0 },
          max: { ep1: 100.4, ep2: 200.1 },
          maxTime: { ep1: 3, ep2: 0 },
        });
      viewRangeRemove(freezeMe(state), 4, 6).should.eql(
        { indexes: {},
          lines: {},
          min: { ep1: 100.1, ep2: 200.1 },
          minTime: { ep1: 0, ep2: 0 },
          max: { ep1: 100.4, ep2: 200.1 },
          maxTime: { ep1: 3, ep2: 0 },
        });
      viewRangeRemove(freezeMe(state), 2, 1).should.eql(
        { indexes: {},
          lines: {},
          min: { ep1: 100.1, ep2: 200.1 },
          minTime: { ep1: 0, ep2: 0 },
          max: { ep1: 100.4, ep2: 200.1 },
          maxTime: { ep1: 3, ep2: 0 },
        });
    });
    it('should support partial keeping', () => {
      viewRangeRemove(freezeMe(state), 1, 2).should.eql({
        indexes: { ep1: [1, 2] },
        lines: { ep1: [
          { masterTime: 1, x: 1, value: 100.2 },
          { masterTime: 2, x: 2, value: 100.3 },
        ] },
        min: { ep1: 100.1, ep2: 200.1 },
        minTime: { ep1: 0, ep2: 0 },
        max: { ep1: 100.4, ep2: 200.1 },
        maxTime: { ep1: 3, ep2: 0 },
      });
      viewRangeRemove(freezeMe(state), 0, 1).indexes.ep1.should.eql([0, 1]);
      viewRangeRemove(freezeMe(state), -1, 1).indexes.ep1.should.eql([0, 1]);
      viewRangeRemove(freezeMe(state), 1, 3).indexes.ep1.should.eql([1, 2, 3]);
      viewRangeRemove(freezeMe(state), 1, 5).indexes.ep1.should.eql([1, 2, 3]);
    });
    it('should support keep everything', () => {
      viewRangeRemove(freezeMe(state), 0, 3).indexes.ep1.should.eql([0, 1, 2, 3]);
    });
  });
  describe('viewRangeAdd', () => {
    it('should ignore empty payloads call', () => {
      const previousState = freezeMe(state);
      const newState = viewRangeAdd(previousState, {});
      newState.should.equal(previousState);
    });
    it('should support empty state', () => {
      viewRangeAdd(freezeMe({}), { ep1: {
        10: { x: 1, value: 0.1 },
        11: { x: 2, value: 0.1 } },
        min: { ep1: 0.1 },
        minTime: { ep1: 10 },
        max: { ep1: 0.1 },
        maxTime: { ep1: 11 },
      }).should.eql({
        indexes: { ep1: [10, 11] },
        lines: {
          ep1: [
          { masterTime: 10, x: 1, value: 0.1 },
          { masterTime: 11, x: 2, value: 0.1 },
          ] },
        min: { ep1: 0.1 },
        minTime: { ep1: 10 },
        max: { ep1: 0.1 },
        maxTime: { ep1: 11 },
      });
    });
    describe('should add points', () => {
      it('one point in middle', () => {
        viewRangeAdd(freezeMe({
          indexes: { ep1: [1, 4] },
          lines: {
            ep1: [
            { masterTime: 1, x: 1, value: 101 },
            { masterTime: 4, x: 4, value: 104 },
            ] },
          min: { ep1: 101 },
          minTime: { ep1: 1 },
          max: { ep1: 104 },
          maxTime: { ep1: 4 },
        }), {
          ep1: { 3: { x: 3, value: 103 } },
          min: { ep1: 103 },
          minTime: { ep1: 3 },
          max: { ep1: 103 },
          maxTime: { ep1: 3 },
        }).should.eql({
          indexes: { ep1: [1, 3, 4] },
          lines: {
            ep1: [
            { masterTime: 1, x: 1, value: 101 },
            { masterTime: 3, x: 3, value: 103 },
            { masterTime: 4, x: 4, value: 104 },
            ] },
          min: { ep1: 101 },
          minTime: { ep1: 1 },
          max: { ep1: 104 },
          maxTime: { ep1: 4 },
        });
      });
      it('points everywhere', () => {
        viewRangeAdd(freezeMe({
          indexes: { ep1: [1, 4, 8, 10], ep2: [2] },
          lines: {
            ep1: [
            { masterTime: 1, x: 1, value: 100.1 },
            { masterTime: 4, x: 4, value: 100.4 },
            { masterTime: 8, x: 8, value: 100.8 },
            { masterTime: 10, x: 10, value: 100.1 },
            ],
            ep2: [
            { masterTime: 2, x: 2, value: 200.1 },
            ] },
          min: { ep1: 100.1, ep2: 200.1 },
          minTime: { ep1: 1, ep2: 2 },
          max: { ep1: 100.8, ep2: 200.1 },
          maxTime: { ep1: 8, ep2: 2 },
        }), { ep1: {
          0: { x: 0, value: 104 },
          9: { x: 9, value: 108 },
          10: { x: 10, value: 110 },
          11: { x: 11, value: 111 },
        },
          ep2: {
            1: { x: 1, value: 204 },
          },
          min: { ep1: 104, ep2: 204 },
          minTime: { ep1: 0, ep2: 1 },
          max: { ep1: 111, ep2: 204 },
          maxTime: { ep1: 11, ep2: 1 },
        }).should.eql({
          indexes: { ep1: [0, 1, 4, 8, 9, 10, 11], ep2: [1, 2] },
          lines: {
            ep1: [
            { masterTime: 0, x: 0, value: 104 },
            { masterTime: 1, x: 1, value: 100.1 },
            { masterTime: 4, x: 4, value: 100.4 },
            { masterTime: 8, x: 8, value: 100.8 },
            { masterTime: 9, x: 9, value: 108 },
            { masterTime: 10, x: 10, value: 110 },
            { masterTime: 11, x: 11, value: 111 },
            ],
            ep2: [
            { masterTime: 1, x: 1, value: 204 },
            { masterTime: 2, x: 2, value: 200.1 },
            ],
          },
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
          indexes: { ep1: [1, 10], ep2: [1] },
          lines: {
            ep1: [
            { masterTime: 1, x: 1, value: 100.1 },
            { masterTime: 10, x: 10, value: 100.10 },
            ],
            ep2: [
              { masterTime: 1, x: 1, value: 200.1 },
            ] },
          min: { ep1: 100.1, ep2: 200.1 },
          minTime: { ep1: 1, ep2: 1 },
          max: { ep1: 104, ep2: 200.1 },
          maxTime: { ep1: 4, ep2: 1 },
        });
        getExtremValue(thisState, 'ep1', { ep1: 90 }, { ep1: 0 }, true).should.eql({
          indexes: { ep1: [1, 10], ep2: [1] },
          lines: {
            ep1: [
            { masterTime: 1, x: 1, value: 100.1 },
            { masterTime: 10, x: 10, value: 100.10 },
            ],
            ep2: [
              { masterTime: 1, x: 1, value: 200.1 },
            ] },
          min: { ep1: 90, ep2: 200.1 },
          minTime: { ep1: 0, ep2: 1 },
          max: { ep1: 104, ep2: 200.1 },
          maxTime: { ep1: 4, ep2: 1 },
        });
      });
      it('!isMin and new values are superior', () => {
        const thisState = Object.freeze({
          indexes: { ep1: [1, 10], ep2: [1] },
          lines: {
            ep1: [
            { masterTime: 1, x: 1, value: 100.1 },
            { masterTime: 10, x: 10, value: 100.10 },
            ],
            ep2: [
              { masterTime: 1, x: 1, value: 200.1 },
            ] },
          min: { ep1: 100.1, ep2: 200.1 },
          minTime: { ep1: 1, ep2: 1 },
          max: { ep1: 104, ep2: 200.1 },
          maxTime: { ep1: 4, ep2: 1 },
        });
        getExtremValue(thisState, 'ep1', { ep1: 300 }, { ep1: 5 }, false).should.eql({
          indexes: { ep1: [1, 10], ep2: [1] },
          lines: {
            ep1: [
            { masterTime: 1, x: 1, value: 100.1 },
            { masterTime: 10, x: 10, value: 100.10 },
            ],
            ep2: [
              { masterTime: 1, x: 1, value: 200.1 },
            ] },
          min: { ep1: 100.1, ep2: 200.1 },
          minTime: { ep1: 1, ep2: 1 },
          max: { ep1: 300, ep2: 200.1 },
          maxTime: { ep1: 5, ep2: 1 },
        });
      });
      it('no min in state', () => {
        const thisState = Object.freeze({
          indexes: { ep1: [1, 10], ep2: [1] },
          lines: {
            ep1: [
            { masterTime: 1, x: 1, value: 100.1 },
            { masterTime: 10, x: 10, value: 100.10 },
            ],
            ep2: [
              { masterTime: 1, x: 1, value: 200.1 },
            ] },
          min: { ep2: 200.1 },
          minTime: { ep2: 1 },
          max: { ep1: 104, ep2: 200.1 },
          maxTime: { ep1: 4, ep2: 1 },
        });
        getExtremValue(thisState, 'ep1', { ep1: 102 }, { ep1: 0 }, true).should.eql({
          indexes: { ep1: [1, 10], ep2: [1] },
          lines: {
            ep1: [
            { masterTime: 1, x: 1, value: 100.1 },
            { masterTime: 10, x: 10, value: 100.10 },
            ],
            ep2: [
              { masterTime: 1, x: 1, value: 200.1 },
            ] },
          min: { ep1: 100.1, ep2: 200.1 },
          minTime: { ep1: 1, ep2: 1 },
          max: { ep1: 104, ep2: 200.1 },
          maxTime: { ep1: 4, ep2: 1 },
        });
      });
      it('no max in state', () => {
        const thisState = Object.freeze({
          indexes: { ep1: [1, 10], ep2: [1] },
          lines: {
            ep1: [
            { masterTime: 1, x: 1, value: 100.1 },
            { masterTime: 10, x: 10, value: 100.10 },
            ],
            ep2: [
              { masterTime: 1, x: 1, value: 200.1 },
            ] },
          min: { ep1: 100.1, ep2: 200.1 },
          minTime: { ep1: 1, ep2: 1 },
          max: { ep2: 200.1 },
          maxTime: { ep2: 1 },
        });
        getExtremValue(thisState, 'ep1', { ep1: 105 }, { ep1: 5 }, false).should.eql({
          indexes: { ep1: [1, 10], ep2: [1] },
          lines: {
            ep1: [
            { masterTime: 1, x: 1, value: 100.1 },
            { masterTime: 10, x: 10, value: 100.10 },
            ],
            ep2: [
              { masterTime: 1, x: 1, value: 200.1 },
            ] },
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
      indexes: { ep1: [1, 4, 8, 10], ep2: [2] },
      lines: {
        ep1: [
        { masterTime: 1, x: 1, value: 100.1 },
        { masterTime: 4, x: 4, value: 100.4 },
        { masterTime: 8, x: 8, value: 100.8 },
        { masterTime: 10, x: 10, value: 100.10 },
        ],
        ep2: [
          { masterTime: 2, x: 2, value: 200.1 },
        ] },
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
          indexes: { ep1: [1, 4, 8, 10], ep2: [2] },
          lines: {
            ep1: [
            { masterTime: 1, x: 1, value: 100.1 },
            { masterTime: 4, x: 4, value: 100.4 },
            { masterTime: 8, x: 8, value: 100.8 },
            { masterTime: 10, x: 10, value: 100.10 },
            ],
            ep2: [
              { masterTime: 2, x: 2, value: 200.1 },
            ] },
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
          indexes: { ep1: [1, 4, 8, 10], ep2: [2] },
          lines: {
            ep1: [
            { masterTime: 1, x: 1, value: 100.1 },
            { masterTime: 4, x: 4, value: 100.4 },
            { masterTime: 8, x: 8, value: 100.8 },
            { masterTime: 10, x: 10, value: 100.10 },
            ],
            ep2: [
              { masterTime: 2, x: 2, value: 200.1 },
            ] },
          min: { ep1: 100.1, ep2: 200.1 },
          minTime: { ep1: 10, ep2: 2 },
          max: { ep1: 100.8, ep2: 200.1 },
          maxTime: { ep1: 8, ep2: 2 },
        });
    });
  });
});
