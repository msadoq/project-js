import moment from 'moment';
import reducer from './viewData';
import { removeAllData, updateViewData } from '../actions/viewData';
import * as types from '../types';


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

  describe('DATA_REMOVE_ALL_VIEWDATA', () => {
    const state = Object.freeze({
      myViewId: {
        index: { myEntryPoint: 10 },
        values: { myEntryPoint: 150 },
      }
    });
    reducer(Object.freeze(state), removeAllData()).should.deep.equal({});
  });
  describe('HSC_CLOSE_WORKSPACE', () => {
    const state = Object.freeze({
      myViewId: {
        index: { myEntryPoint: 10 },
        values: { myEntryPoint: 150 },
      }
    });
    reducer(Object.freeze(state), { type: types.HSC_CLOSE_WORKSPACE })
    .should.be.an('object').that.is.empty;
  });


  describe('DATA_UPDATE_VIEWDATA', () => {
    it('empty viewData', () => { // oldViewMap', 'newViewMap',  'dataToInject'
      reducer(Object.freeze({ }), updateViewData({}, {}, {}))
      .should.eql({ });
    });
    let newViewMap;
    let oldViewMap;
    let dataToInject;
    before('', () => {
      oldViewMap = {
        text: {
          type: 'TextView',
          entryPoints: {
            ep1: {
              remoteId: 'rId1',
              field: 'time',
              expectedInterval: [5, 9],
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
              expectedInterval: [7, 10],
            },
          },
        }
      };
      newViewMap = {
        text: {
          type: 'TextView',
          entryPoints: {
            ep1: {
              remoteId: 'rId1',
              field: 'time',
              expectedInterval: [5, 10],
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
              expectedInterval: [8, 12],
            },
          },
        }
      };
      dataToInject = { rId1: {}, rId2: {} };
      for (let j = 1; j < 21; j += 1) {
        dataToInject.rId1[j] = {
          val1: { type: 'uinteger', value: (j * 10) + 1 },
          val2: { type: 'uinteger', value: (j * 10) + 2 },
          val3: { type: 'uinteger', value: (j * 10) + 3 },
          referenceTimestamp: { type: 'time', value: j },
          time: { type: 'time', value: j + 0.2 }
        };

        dataToInject.rId2[j] = dataToInject.rId1[j];
      }
    });
    it('valid viewData with empty state', () => {
      const val = reducer(Object.freeze({ }), updateViewData({}, newViewMap, dataToInject));
      val.should.eql({
        text: {
          index: { ep1: 10 },
          values: { ep1: { value: moment(10.2).format('YYYY-MM-DD HH[:]mm[:]ss[.]SSS'), monit: undefined } }
        },
        plot: {
          index: [8, 9, 10, 11, 12],
          columns: [
            { x: 8, ep2: { monit: undefined, value: 82, x: 8.2 } },
            { x: 9, ep2: { monit: undefined, value: 92, x: 9.2 } },
            { x: 10, ep2: { monit: undefined, value: 102, x: 10.2 } },
            { x: 11, ep2: { monit: undefined, value: 112, x: 11.2 } },
            { x: 12, ep2: { monit: undefined, value: 122, x: 12.2 } },
          ]
        }
      });
    });
    it('valid viewData with state', () => {
      const state = { text: {
        index: { ep1: 9 },
        values: { ep1: { value: moment(9.2).format('YYYY-MM-DD HH[:]mm[:]ss[.]SSS'), monit: undefined } }
      },
        plot: {
          index: [7, 8, 9, 10],
          columns: [
            { x: 7, ep2: { monit: undefined, value: 72, x: 7.2 } },
            { x: 8, ep2: { monit: undefined, value: 82, x: 8.2 } },
            { x: 9, ep2: { monit: undefined, value: 92, x: 9.2 } },
            { x: 10, ep2: { monit: undefined, value: 102, x: 10.2 } },
          ]
        } };

      reducer(Object.freeze(state), updateViewData(oldViewMap, newViewMap, dataToInject))
      .should.eql({
        text: {
          index: { ep1: 10 },
          values: { ep1: { value: moment(10.2).format('YYYY-MM-DD HH[:]mm[:]ss[.]SSS'), monit: undefined } }
        },
        plot: {
          index: [8, 9, 10, 11, 12],
          columns: [
            { x: 8, ep2: { monit: undefined, value: 82, x: 8.2 } },
            { x: 9, ep2: { monit: undefined, value: 92, x: 9.2 } },
            { x: 10, ep2: { monit: undefined, value: 102, x: 10.2 } },
            { x: 11, ep2: { monit: undefined, value: 112, x: 11.2 } },
            { x: 12, ep2: { monit: undefined, value: 122, x: 12.2 } },
          ]
        }
      });
    });
  });
});
