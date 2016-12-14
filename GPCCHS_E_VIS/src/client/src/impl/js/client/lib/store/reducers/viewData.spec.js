import reducer from './viewData';
import { /* importPayload, */ removeAllData, updateViewData } from '../actions/viewData';

describe('store:viewData:reducer', () => {
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

  // describe('DATA_IMPORT_VIEWDATA', () => {
  //   describe('last structure', () => {
  //     it('should add value', () => {
  //       const frozen = Object.freeze({});
  //       const r = reducer(frozen, importPayload({
  //         myViewId: {
  //           structureType: 'last',
  //           index: { myEntryPoint: 15 },
  //           values: { myEntryPoint: 300 },
  //         }
  //       }));
  //       r.should.eql({
  //         myViewId: {
  //           index: { myEntryPoint: 15 },
  //           values: { myEntryPoint: 300 },
  //         }
  //       });
  //     });
  //     it('should replace value', () => {
  //       const frozen = Object.freeze({
  //         myViewId: {
  //           index: { myEntryPoint: 10 },
  //           values: { myEntryPoint: 250 },
  //         },
  //       });
  //       const r = reducer(frozen, importPayload({
  //         myViewId: {
  //           structureType: 'last',
  //           index: { myEntryPoint: 15 },
  //           values: { myEntryPoint: 300 },
  //         }
  //       }));
  //       r.should.eql({
  //         myViewId: {
  //           index: { myEntryPoint: 15 },
  //           values: { myEntryPoint: 300 },
  //         }
  //       });
  //     });
  //     it('should respect other values', () => {
  //       const frozen = Object.freeze({
  //         myViewId: {
  //           index: { myEntryPoint: 10 },
  //           values: { myEntryPoint: 250 },
  //         },
  //         myOtherViewId: {
  //           index: { myEntryPoint: 5 },
  //           values: { myEntryPoint: 125 },
  //         },
  //       });
  //       const r = reducer(frozen, importPayload({
  //         myViewId: {
  //           structureType: 'last',
  //           index: { myEntryPoint: 15 },
  //           values: { myEntryPoint: 300 },
  //         }
  //       }));
  //       r.should.eql({
  //         myViewId: {
  //           index: { myEntryPoint: 15 },
  //           values: { myEntryPoint: 300 },
  //         },
  //         myOtherViewId: {
  //           index: { myEntryPoint: 5 },
  //           values: { myEntryPoint: 125 },
  //         },
  //       });
  //     });
  //   });
  //   describe('range structure', () => {
  //
  //   });
  // });
  describe('DATA_REMOVE_ALL_VIEWDATA', () => {
    const state = Object.freeze({
      myViewId: {
        index: { myEntryPoint: 10 },
        values: { myEntryPoint: 150 },
      }
    });
    reducer(Object.freeze(state), removeAllData()).should.deep.equal({});
  });


  describe('DATA_UPDATE_VIEWDATA', () => {
    it('empty viewData', () => {
      reducer(Object.freeze({ myViewId: {}, myOtherView: {} }), updateViewData({}))
      .should.eql({ });
    });
    it('valid viewData', () => {
      reducer(Object.freeze({ myViewId: {}, myOtherView: {} }),
      updateViewData({ myViewId1: {}, myOtherView1: {} }))
      .should.eql({ myViewId1: {}, myOtherView1: {} });
    });
  });
});
