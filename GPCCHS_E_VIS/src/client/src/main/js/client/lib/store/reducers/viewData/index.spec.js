import moment from 'moment';
import viewDataReducer from '.';
import { removeAllData, updateViewData } from '../../actions/viewData';
import * as types from '../../types';
import { freezeArgs } from '../../../common/test';

const reducer = freezeArgs(viewDataReducer);

describe('store:viewData:reducer', () => {
  const payload = { rId1: {}, rId2: {} };
  for (let j = 10; j < 21; j += 1) {
    payload.rId1[j] = {
      val1: (j * 10) + 1,
      val2: (j * 10) + 2,
      val3: (j * 10) + 3,
      referenceTimestamp: j,
      time: j + 0.2,
    };

    payload.rId2[j] = payload.rId1[j];
  }

  it('DATA_REMOVE_ALL_VIEWDATA', () => {
    const state = Object.freeze({
      myViewId: {
        index: { myEntryPoint: 10 },
        values: { myEntryPoint: 150 },
      },
    });
    reducer(Object.freeze(state), removeAllData()).should.deep.equal({});
  });
  it('HSC_CLOSE_WORKSPACE', () => {
    const state = Object.freeze({
      myViewId: {
        index: { myEntryPoint: 10 },
        values: { myEntryPoint: 150 },
      },
    });
    // eslint-disable-next-line no-unused-expressions
    reducer(Object.freeze(state), { type: types.HSC_CLOSE_WORKSPACE })
      .should.be.an('object').that.is.empty;
  });


  describe('DATA_UPDATE_VIEWDATA', () => {
    it('empty viewData', () => { // oldViewMap', 'newViewMap',  'dataToInject'
      reducer(Object.freeze({ }), updateViewData({}, {}, {}, {}, {}))
      .should.eql({ });
    });
    let newViewMap;
    let oldViewMap;
    let dataToInject;
    let oldIntervals;
    let newIntervals;
    before('', () => {
      oldViewMap = {
        text: {
          type: 'TextView',
          entryPoints: {
            ep1: {
              remoteId: 'rId1',
              field: 'time',
              localId: 'local1',
            },
          },
        },
        plot: {
          type: 'PlotView',
          entryPoints: {
            ep2: {
              remoteId: 'rId2',
              fieldX: 'time',
              fieldY: 'val2',
              offset: 0,
              localId: 'local2',
            },
          },
        },
      };
      oldIntervals = {
        rId1: { local1: { expectedInterval: [5, 9] } },
        rId2: { local2: { expectedInterval: [7, 10] } },
      };
      newViewMap = {
        text: {
          type: 'TextView',
          entryPoints: {
            ep1: {
              remoteId: 'rId1',
              field: 'time',
              localId: 'local1',
            },
            ep4: {
              remoteId: 'rId2',
              field: 'val4',
              localId: 'local4',
            },
          },
        },
        plot: {
          type: 'PlotView',
          entryPoints: {
            ep2: {
              remoteId: 'rId1',
              fieldX: 'time',
              fieldY: 'val2',
              offset: 0,
              localId: 'local2',
            },
            ep3: {
              remoteId: 'rId2',
              fieldX: 'time',
              fieldY: 'val4',
              offset: 0,
              localId: 'local3',
            },
          },
        },
      };
      newIntervals = {
        rId1: {
          local1: { expectedInterval: [5, 10] },
          local2: { expectedInterval: [8, 12] },
        },
        rId2: {
          local4: { expectedInterval: [5, 10] },
          local3: { expectedInterval: [8, 12] },
        },
      };
      dataToInject = { rId1: {}, rId2: {} };
      for (let j = 1; j < 21; j += 1) {
        dataToInject.rId1[j] = {
          val1: { type: 'uinteger', value: (j * 10) + 1 },
          val2: { type: 'uinteger', value: (j * 10) + 2 },
          val3: { type: 'uinteger', value: (j * 10) + 3 },
          val4: { type: 'enum', value: j, symbol: 'val'.concat(j) },
          referenceTimestamp: { type: 'time', value: j },
          time: { type: 'time', value: j + 0.2 },
        };
        if (j % 2) {
          dataToInject.rId2[j] = dataToInject.rId1[j];
        }
      }
    });
    it('valid viewData with empty state', () => {
      const val = reducer(Object.freeze({ }), updateViewData({}, newViewMap,
        oldIntervals, newIntervals, dataToInject));
      val.should.eql({
        text: {
          index: { ep1: 10, ep4: 9 },
          values: {
            ep1: { value: moment(10.2).format('YYYY-MM-DD HH[:]mm[:]ss[.]SSS') },
            ep4: { value: 'val9' } },
        },
        plot: {
          indexes: { ep2: [8, 9, 10, 11, 12], ep3: [9, 11] },
          lines: { ep2: [
            { masterTime: 8, value: 82, x: 8.2, symbol: undefined },
            { masterTime: 9, value: 92, x: 9.2, symbol: undefined },
            { masterTime: 10, value: 102, x: 10.2, symbol: undefined },
            { masterTime: 11, value: 112, x: 11.2, symbol: undefined },
            { masterTime: 12, value: 122, x: 12.2, symbol: undefined },
          ],
            ep3: [
            { masterTime: 9, value: 9, x: 9.2, symbol: 'val9' },
            { masterTime: 11, value: 11, x: 11.2, symbol: 'val11' },
            ] },
          min: { ep2: 82, ep3: 9 },
          max: { ep2: 122, ep3: 11 },
          minTime: { ep2: 8, ep3: 9 },
          maxTime: { ep2: 12, ep3: 11 },
        },
      });
    });
    it('valid viewData with state', () => {
      const state = { text: {
        index: { ep1: 9, ep4: 9 },
        values: {
          ep1: { value: moment(9.2).format('YYYY-MM-DD HH[:]mm[:]ss[.]SSS') },
          ep4: { value: 'val9', monit: undefined } },
      },
        plot: {
          indexes: { ep2: [7, 8, 9, 10], ep3: [7, 9] },
          lines: { ep2: [
            { masterTime: 7, value: 72, x: 7.2, symbol: undefined },
            { masterTime: 8, value: 82, x: 8.2, symbol: undefined },
            { masterTime: 9, value: 92, x: 9.2, symbol: undefined },
            { masterTime: 10, value: 102, x: 10.2, symbol: undefined },
          ],
            ep3: [
            { masterTime: 7, value: 7, x: 7.2, symbol: 'val7' },
            { masterTime: 9, value: 9, x: 9.2, symbol: 'val9' },
            ] },
          min: { ep2: 72, ep3: 7 },
          max: { ep2: 122, ep3: 11 },
          minTime: { ep2: 7, ep3: 7 },
          maxTime: { ep2: 10, ep3: 9 },
        } };

      reducer(Object.freeze(state), updateViewData(oldViewMap, newViewMap,
        oldIntervals, newIntervals, dataToInject))
      .should.eql({
        text: {
          index: { ep1: 10, ep4: 9 },
          values: {
            ep1: { value: moment(10.2).format('YYYY-MM-DD HH[:]mm[:]ss[.]SSS') },
            ep4: { value: 'val9' } },
        },
        plot: {
          indexes: { ep2: [8, 9, 10, 11, 12], ep3: [9, 11] },
          lines: { ep2: [
            { masterTime: 8, value: 82, x: 8.2, symbol: undefined },
            { masterTime: 9, value: 92, x: 9.2, symbol: undefined },
            { masterTime: 10, value: 102, x: 10.2, symbol: undefined },
            { masterTime: 11, value: 112, x: 11.2, symbol: undefined },
            { masterTime: 12, value: 122, x: 12.2, symbol: undefined },
          ],
            ep3: [
            { masterTime: 9, value: 9, x: 9.2, symbol: 'val9' },
            { masterTime: 11, value: 11, x: 11.2, symbol: 'val11' },
            ] },
          min: { ep2: 82, ep3: 9 },
          max: { ep2: 122, ep3: 11 },
          minTime: { ep2: 8, ep3: 9 },
          maxTime: { ep2: 12, ep3: 11 },
        },
      });
    });
  });
});
