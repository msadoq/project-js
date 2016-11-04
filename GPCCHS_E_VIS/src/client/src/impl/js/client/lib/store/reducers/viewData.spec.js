import { freezeMe } from '../../common/test';
import reducer, { viewRangeRemove, viewRangeAdd, viewLast } from './viewData';
import { importPayload, removeAllData } from '../actions/viewData';

describe.only('reducers/viewData', () => {
  const payload = { rId1: {}, rId2: {} };
  for (let j = 10; j < 21; j += 1) {
    payload.rId1[j] = {
      val1: (j * 10) + 1,
      val2: (j * 10) + 2,
      val3: (j * 10) + 3,
      referenceTimestamp: j,
      time: j + 0.2
    };

    payload.rId2[j] = payload.rId1[j];
  }

  describe('DATA_IMPORT_VIEWDATA', () => {
    it('should handle empty action', () => {
      reducer(Object.freeze({}), importPayload({})).should.eql({});
      reducer(Object.freeze({}), importPayload({ myViewId: {} })).should.eql({});
    });
    describe('last structure', () => {
      it('should add value', () => {
        const frozen = Object.freeze({});
        const r = reducer(frozen, importPayload({
          myViewId: {
            structureType: 'last',
            index: { myEntryPoint: 15 },
            values: { myEntryPoint: 300 },
          }
        }));
        r.should.eql({
          myViewId: {
            index: { myEntryPoint: 15 },
            values: { myEntryPoint: 300 },
          }
        });
      });
      it('should replace value', () => {
        const frozen = Object.freeze({
          myViewId: {
            index: { myEntryPoint: 10 },
            values: { myEntryPoint: 250 },
          },
        });
        const r = reducer(frozen, importPayload({
          myViewId: {
            structureType: 'last',
            index: { myEntryPoint: 15 },
            values: { myEntryPoint: 300 },
          }
        }));
        r.should.eql({
          myViewId: {
            index: { myEntryPoint: 15 },
            values: { myEntryPoint: 300 },
          }
        });
      });
      it('should respect other values', () => {
        const frozen = Object.freeze({
          myViewId: {
            index: { myEntryPoint: 10 },
            values: { myEntryPoint: 250 },
          },
          myOtherViewId: {
            index: { myEntryPoint: 5 },
            values: { myEntryPoint: 125 },
          },
        });
        const r = reducer(frozen, importPayload({
          myViewId: {
            structureType: 'last',
            index: { myEntryPoint: 15 },
            values: { myEntryPoint: 300 },
          }
        }));
        r.should.eql({
          myViewId: {
            index: { myEntryPoint: 15 },
            values: { myEntryPoint: 300 },
          },
          myOtherViewId: {
            index: { myEntryPoint: 5 },
            values: { myEntryPoint: 125 },
          },
        });
      });
    });
    describe('range structure', () => {

    });
  });
  describe('DATA_REMOVE_ALL_VIEWDATA', () => {
    // TODO DATA_REMOVE_ALL_VIEWDATA
  });

  describe('viewLast', () => {
    it('should ignore payloads', () => {
      const state = Object.freeze({});
      viewLast(state, 'myViewId', {}, {}).should.equal(state);
    });
    it('should add', () => {
      const state = Object.freeze({});
      viewLast(state, 'myViewId', { myEntryPoint: 10 }, {}).should.eql({
        myViewId: {
          index: { myEntryPoint: 10 },
          values: {},
        }
      });
      viewLast(state, 'myViewId', {}, { myEntryPoint: 10 }).should.eql({
        myViewId: {
          index: {},
          values: { myEntryPoint: 10 },
        }
      });
    });
    it('should update', () => {
      const state = Object.freeze({
        myViewId: {
          index: { myEntryPoint: 10 },
          values: { myEntryPoint: 150 },
        }
      });
      viewLast(state, 'myViewId', { myEntryPoint: 20 }, { myEntryPoint: 300 }).should.eql({
        myViewId: {
          index: { myEntryPoint: 20 },
          values: { myEntryPoint: 300 },
        }
      });
    });
    it('should preserve other values', () => {
      const state = Object.freeze({
        myViewId: {
          index: { myEntryPoint: 10, myOther: 20 },
          values: { myEntryPoint: 150, myOther: 200 },
        }
      });
      viewLast(state, 'myViewId', { myEntryPoint: 20 }, { myEntryPoint: 300 }).should.eql({
        myViewId: {
          index: { myEntryPoint: 20, myOther: 20 },
          values: { myEntryPoint: 300, myOther: 200 },
        }
      });
    });
  });

  const state = {
    index: [0, 1, 2, 3],
    columns: [
      { x: 0, ep1: { x: 0, value: 100.1 }, ep2: { x: 0, value: 200.1 } },
      { x: 1, ep1: { x: 1, value: 100.2 } },
      { x: 2, ep1: { x: 2, value: 100.3 } },
      { x: 3, ep1: { x: 3, value: 100.4 } },
    ],
  };

  describe('viewRangeRemove', () => {
    it('should support empty state', () => {
      const frozen = Object.freeze({});
      viewRangeRemove(frozen, 10, 20).should.equal(frozen);
      const otherFrozen = Object.freeze({ index: [] });
      viewRangeRemove(otherFrozen, 10, 20).should.equal(otherFrozen);
    });
    it('should support nothing to keep', () => {
      viewRangeRemove(freezeMe(state), -2, 0).should.eql({ index: [], columns: [] });
      viewRangeRemove(freezeMe(state), 3, 5).should.eql({ index: [], columns: [] });
      viewRangeRemove(freezeMe(state), 2, 1).should.eql({ index: [], columns: [] });
    });
    it('should support partial keeping', () => {
      viewRangeRemove(freezeMe(state), 1, 2).should.eql({
        index: [1, 2],
        columns: [
          { x: 1, ep1: { x: 1, value: 100.2 } },
          { x: 2, ep1: { x: 2, value: 100.3 } },
        ],
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
      }).should.eql({
        index: [10, 11],
        columns: [
          { x: 10, ep1: { x: 1, value: 0.1 } },
          { x: 11, ep1: { x: 2, value: 0.1 } },
        ],
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
        }), {
          3: { ep1: { x: 3, value: 103 } },
        }).should.eql({
          index: [1, 3, 4],
          columns: [
            { x: 1, ep1: { x: 1, value: 101 } },
            { x: 3, ep1: { x: 3, value: 103 } },
            { x: 4, ep1: { x: 4, value: 104 } },
          ],
        });
      });
      it('update existing', () => {
        viewRangeAdd(Object.freeze({
          index: [1, 4],
          columns: [
            { x: 1, ep1: { x: 1, value: 101 }, ep2: { x: 1, value: 201 } },
            { x: 4, ep1: { x: 4, value: 104 } },
          ],
        }), {
          1: { ep2: { x: 1, value: 2002 } },
          4: { ep1: { x: 4, value: 1004 } },
        }).should.eql({
          index: [1, 4],
          columns: [
            { x: 1, ep1: { x: 1, value: 101 }, ep2: { x: 1, value: 2002 } },
            { x: 4, ep1: { x: 4, value: 1004 } },
          ],
        });
      });
      it('points everywhere', () => {
        viewRangeAdd(Object.freeze({
          index: [1, 4, 8, 10],
          columns: [
            { x: 1, ep1: { x: 1, value: 100.1 }, ep2: { x: 1, value: 200.1 } },
            { x: 4, ep1: { x: 4, value: 100.4 } },
            { x: 8, ep1: { x: 8, value: 100.8 } },
            { x: 10, ep1: { x: 10, value: 100.10 } },
          ],
        }), {
          0: { ep1: { x: 0, value: 104 } },
          1: { ep2: { x: 1, value: 204 } },
          8: { ep1: { x: 8, value: 108 } },
          10: { ep1: { x: 10, value: 110 } },
          11: { ep1: { x: 11, value: 111 } },
        }).should.eql({
          index: [0, 1, 4, 8, 10, 11],
          columns: [
            { x: 0, ep1: { x: 0, value: 104 } },
            { x: 1, ep1: { x: 1, value: 100.1 }, ep2: { x: 1, value: 204 } },
            { x: 4, ep1: { x: 4, value: 100.4 } },
            { x: 8, ep1: { x: 8, value: 108 } },
            { x: 10, ep1: { x: 10, value: 110 } },
            { x: 11, ep1: { x: 11, value: 111 } },
          ],
        });
      });
    });
  });
});
