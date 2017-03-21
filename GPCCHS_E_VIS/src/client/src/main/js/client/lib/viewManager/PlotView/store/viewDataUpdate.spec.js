import { freezeMe } from '../../../common/test';
import { viewRangeAdd, getExtremValue, selectDataPerView, selectEpData } from './viewDataUpdate';

describe('viewManager/PlotView/store/viewDataUpdate', () => {
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
        const frozen = freezeMe({
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
        });
        viewRangeAdd(frozen, {
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
        const frozen = freezeMe({
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
        });
        viewRangeAdd(frozen, { ep1: {
          0: { x: 0, value: 104 },
          9: { x: 9, value: 108 },
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
            { masterTime: 10, x: 10, value: 100.1 },
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
  describe('data selection', () => {
    const payload = { rId1: {}, rId2: {}, rId3: {} };
    for (let j = 10; j < 21; j += 1) {
      payload.rId1[j] = {
        val1: { type: 'uinteger', value: (j * 10) + 1 },
        val2: { type: 'uinteger', value: (j * 10) + 2 },
        val3: { type: 'uinteger', value: (j * 10) + 3 },
        referenceTimestamp: { type: 'time', value: j },
        time: { type: 'time', value: j + 0.2 },
      };

      payload.rId2[j] = payload.rId1[j];
      payload.rId3[j] = payload.rId1[j];
    }

    const intervals = {
      rId1: {
        local1: { expectedInterval: [10, 15] },
        local2: { expectedInterval: [12, 16] },
        local4: { expectedInterval: [1001, 1005] },
      },
      rId2: {
        local3: { expectedInterval: [14, 18] },
      },
      rId3: {
        local5: { expectedInterval: [10, 20] },
        local6: { expectedInterval: [18, 20] },
        local7: { expectedInterval: [10, 20] },
      },
    };
    const viewDataMap = {
      plot1: {
        type: 'PlotView',
        entryPoints: {
          ep1: {
            remoteId: 'rId1',
            fieldX: 'time',
            fieldY: 'val1',
            offset: 0,
            localId: 'local1',
            stateColors: [
              {
                color: '#0000FF',
                condition: {
                  field: 'val3',
                  operator: '>',
                  operand: '1',
                },
              },
            ],
          },
        },
      },
      plot2: {
        type: 'PlotView',
        entryPoints: {
          ep2: {
            remoteId: 'rId1',
            fieldX: 'time',
            fieldY: 'val2',
            offset: 2,
            localId: 'local2',
            stateColors: [
              {
                color: '#0000FF',
                condition: {
                  field: 'val3',
                  operator: '>',
                  operand: '1',
                },
              },
            ],
          },
          ep3: {
            remoteId: 'rId2',
            fieldX: 'time',
            fieldY: 'val2',
            offset: 0,
            localId: 'local3',
          },
        },
      },
      plot3: {
        type: 'PlotView',
        entryPoints: {
          ep1: {
            remoteId: 'rId1',
            fieldX: 'time',
            fieldY: 'val1',
            offset: -987,
            localId: 'local4',
          },
        },
      },
      text1: {
        type: 'TextView',
        entryPoints: {
          ep4: {
            remoteId: 'rId3',
            field: 'val3',
            offset: 0,
            localId: 'local5',
          },
        },
      },
      text2: {
        type: 'TextView',
        entryPoints: {
          ep5: {
            remoteId: 'rId3',
            field: 'val3',
            offset: 0,
            localId: 'local6',
          },
          ep6: {
            remoteId: 'rId3',
            field: 'val3',
            offset: 0,
            localId: 'local7',
          },
        },
      },
    };
    describe('selectDataPerView', () => {
      it('empty state', () => {
        const bag = selectDataPerView(viewDataMap.plot1, intervals, payload);
        bag.should.have.all.keys(['ep1', 'min', 'max', 'minTime', 'maxTime']);

        const bag2 = selectDataPerView(viewDataMap.plot2, intervals, payload);
        bag2.should.have.all.keys(['ep2', 'ep3', 'min', 'max', 'minTime', 'maxTime']);
        bag2.ep2.should.have.keys('14', '15', '16', '17', '18');
      });
      it('viewMap undefined', () => {
        const newState = selectDataPerView(viewDataMap.plot4, intervals, payload);
        Object.keys(newState).length.should.eql(0);
      });
      it('no payload', () => {
        const newState = selectDataPerView(viewDataMap.plot1, intervals, {});
        Object.keys(newState).length.should.eql(0);
      });
    });
    describe('selectEpData', () => {
      it('undefined state', () => {
        const newState = selectEpData(payload.rId1, viewDataMap.plot1.entryPoints.ep1,
          'ep1', undefined, intervals);
        newState.ep1['10'].should.eql({ x: 10.2, value: 101, symbol: undefined, color: '#0000FF' });
        newState.ep1['15'].should.eql({ x: 15.2, value: 151, symbol: undefined, color: '#0000FF' });
      });
      it('empty state', () => {
        const newState = selectEpData(payload.rId1, viewDataMap.plot1.entryPoints.ep1,
          'ep1', {}, intervals);
        newState.ep1['10'].should.eql({ x: 10.2, value: 101, symbol: undefined, color: '#0000FF' });
        newState.ep1['15'].should.eql({ x: 15.2, value: 151, symbol: undefined, color: '#0000FF' });
      });
      it('state not empty', () => {
        const oldState = { ep10: {
          10: { x: 11.5, col1: 101 },
          12.5: { x: 12.5, value: 102 },
        },
          min: { ep10: 101 },
          max: { ep10: 102 },
          minTime: { ep10: 10 },
          maxTime: { ep10: 12.5 },
        };
        const newState = selectEpData(payload.rId1, viewDataMap.plot1.entryPoints.ep1,
          'ep1', oldState, intervals);
        newState.ep1.should.eql({ 10: { x: 10.2, value: 101, color: '#0000FF', symbol: undefined },
          11: { color: '#0000FF', symbol: undefined, value: 111, x: 11.2 },
          12: { color: '#0000FF', symbol: undefined, value: 121, x: 12.2 },
          13: { color: '#0000FF', symbol: undefined, value: 131, x: 13.2 },
          14: { color: '#0000FF', symbol: undefined, value: 141, x: 14.2 },
          15: { x: 15.2, value: 151, color: '#0000FF', symbol: undefined } });
        newState.min.should.eql({ ep10: 101, ep1: 101 });
        newState.max.should.eql({ ep10: 102, ep1: 151 });
        newState.minTime.should.eql({ ep10: 10, ep1: 10 });
        newState.maxTime.should.eql({ ep10: 12.5, ep1: 15 });
      });
      it('no change', () => {
        const oldState = { ep1: { 10: { x: 1001.5, col1: 101 },
          11: { x: 1002.5, value: 102 } },
          min: { ep1: 101 },
          max: { ep1: 102 },
          minTime: { ep1: 10 },
          maxTime: { ep1: 11 },
        };
        const newState = selectEpData(payload.rId1, viewDataMap.plot3.entryPoints.ep1,
          'ep1', oldState, intervals);
        newState.should.deep.equal({});
      });
    });
  });
});
