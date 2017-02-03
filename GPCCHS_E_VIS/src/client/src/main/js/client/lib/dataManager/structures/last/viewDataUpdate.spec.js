import viewDataUpdate from './viewDataUpdate';

describe('dataManager/structures/last', () => {
  describe('viewDataUpdate', () => {
    it('should ignore payloads', () => {
      const frozen = Object.freeze({ });
      viewDataUpdate(frozen, 'myViewId', { index: {}, values: {} }).should.equal(frozen);
    });
    it('should add', () => {
      const frozen = Object.freeze({ });
      viewDataUpdate(frozen, 'myViewId', { index: { myEntryPoint: 10 }, values: {} }).should.eql({
        myViewId: {
          index: { myEntryPoint: 10 },
          values: {},
        },
      });
      viewDataUpdate(frozen, 'myViewId', { index: {}, values: { myEntryPoint: 10 } }).should.eql({
        myViewId: {
          index: {},
          values: { myEntryPoint: 10 },
        },
      });
      viewDataUpdate(frozen, 'myViewId', { index: { myEntryPoint: 15 }, values: { myEntryPoint: 300 } })
      .should.eql({
        myViewId: {
          index: { myEntryPoint: 15 },
          values: { myEntryPoint: 300 },
        },
      });
    });
    it('should update', () => {
      const state = Object.freeze({
        myViewId: {
          index: { myEntryPoint: 10 },
          values: { myEntryPoint: 150 },
        },
      });
      viewDataUpdate(state, 'myViewId',
      { index: { myEntryPoint: 20 }, values: { myEntryPoint: 300 } }).should.eql({
        myViewId: {
          index: { myEntryPoint: 20 },
          values: { myEntryPoint: 300 },
        },
      });
    });
    it('should preserve other values', () => {
      const state = Object.freeze({
        myViewId: {
          index: { myEntryPoint: 10, myOther: 20 },
          values: { myEntryPoint: 150, myOther: 200 },
        },
      });
      viewDataUpdate(state, 'myViewId',
      { index: { myEntryPoint: 20 }, values: { myEntryPoint: 300 } }).should.eql({
        myViewId: {
          index: { myEntryPoint: 20, myOther: 20 },
          values: { myEntryPoint: 300, myOther: 200 },
        },
      });
    });
  });
});
