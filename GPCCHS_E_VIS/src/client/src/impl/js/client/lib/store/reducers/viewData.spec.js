import { cleanRangeData, updateRangeData } from './viewData';

describe('reducers/viewData', () => {
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

  const viewDataMap = {
    plot1: {
      type: 'PlotView',
      entryPoints: {
        ep1: {
          remoteId: 'rId1',
          fieldX: 'time',
          fieldY: 'val1',
          expectedInterval: [10, 15],
          offset: 0,
        }
      },
    },
    plot2: {
      type: 'PlotView',
      entryPoints: {
        ep2: {
          remoteId: 'rId1',
          fieldX: 'time',
          fieldY: 'val2',
          expectedInterval: [12, 16],
          offset: 2,
        },
        ep3: {
          remoteId: 'rId2',
          fieldX: 'time',
          fieldY: 'val2',
          expectedInterval: [14, 18],
          offset: 0,
        }
      },
    },
    plot3: {
      type: 'PlotView',
      entryPoints: {
        ep1: {
          remoteId: 'rId1',
          fieldX: 'time',
          fieldY: 'val1',
          expectedInterval: [1001, 1005],
          offset: -987,
        }
      },
    },
    text1: {
      type: 'TextView',
      entryPoints: {
        ep4: {
          remoteId: 'rId1',
          field: 'val3',
          expectedInterval: [10, 20],
          offset: 0,
        }
      }
    },
    text2: {
      type: 'TextView',
      entryPoints: {
        ep5: {
          remoteId: 'rId1',
          field: 'val3',
          expectedInterval: [18, 20],
          offset: 0,
        },
        ep6: {
          remoteId: 'rId2',
          field: 'val3',
          expectedInterval: [12, 20],
          offset: 0,
        }
      },
    },
  };
  const viewMap2 = {
    hist1: {
      type: 'HitoryView',
      entryPoints: {
        ep1: {
          remoteId: 'rId1',
          fieldX: 'time',
          fieldY: 'val1',
          expectedInterval: [10, 15],
          offset: 0,
        }
      },
    },
  };

  const state = { viewData: {
    plot2: {
      index: [10, 14],
      columns: [{ x: 10, ep5: { x: 10.2, value: 100 }, ep3: { x: 12.2, value: 25 } },
                { x: 14, ep5: { x: 10.7, value: 100 }, ep3: { x: 12.7, value: 25 } }],
    },
    text2: {
      index: { ep2: 18, ep3: 21 },
      values: { ep2: 1, ep3: 3 },
    },
  } };


  describe('cleanRangeData', () => {
    // cleanRangeData(viewSubState, ep, epName)
    it('empty state', () => {
      const state1 = {};
      const cleanedState = cleanRangeData(state1, viewDataMap.plot1.entryPoints.ep1, 'ep1');
      cleanedState.should.equal(state1);
    });
    it('no data to keep', () => {
      const tmpState = { index: [0, 1, 2, 3],
      columns: { 0: { ep1: { x: 0, value: 0.1 } },
        1: { ep1: { x: 0, value: 0.1 } },
        2: { ep1: { x: 0, value: 0.1 } },
        3: { ep1: { x: 0, value: 0.1 } },
        },
      };
      const action = { type: 'DATA_IMPORT_VIEWDATA', payload: { lower: 10, upper: 15 } };
      const cleanedState = cleanRangeData(tmpState, action);
      cleanedState.index.should.have.length(0);
      cleanedState.columns.should.have.length(0);
    });
    it('interval to keep', () => {
      const tmpState = { index: [8.5, 9.5, 10.5, 11.5],
        columns: [
          { x: 8.5, ep1: { x: 0, value: 0.1 } },
          { x: 9.5, ep1: { x: 0, value: 0.1 } },
          { x: 10.5, ep1: { x: 1, value: 0.1 } },
          { x: 11.5, ep1: { x: 2, value: 0.1 } },
        ],
      };
      const action = { type: 'DATA_IMPORT_VIEWDATA', payload: { lower: 10, upper: 15 } };

      const cleanedState = cleanRangeData(tmpState, action);
      cleanedState.index.should.deep.equal([10.5, 11.5]);
      cleanedState.columns[0].should.deep.equal({ x: 10.5, ep1: { x: 1, value: 0.1 } });
      cleanedState.columns[1].should.deep.equal({ x: 11.5, ep1: { x: 2, value: 0.1 } });
    });
    it('whole interval to keep', () => {
      const tmpState = { index: [10, 11, 14],
      columns: [
        { x: 10, ep1: { x: 1, value: 0.1 } },
        { x: 11, ep1: { x: 2, value: 0.1 } },
        { x: 14, ep1: { x: 3, value: 0.1 } },
        ],
      };
      const action = { type: 'DATA_IMPORT_VIEWDATA', payload: { lower: 10, upper: 15 } };
      const cleanedState = cleanRangeData(tmpState, action);
      cleanedState.index.should.deep.equal([10, 11, 14]);
      cleanedState.columns[0].should.deep.equal({ x: 10, ep1: { x: 1, value: 0.1 } });
      cleanedState.columns[1].should.deep.equal({ x: 11, ep1: { x: 2, value: 0.1 } });
      cleanedState.columns[2].should.deep.equal({ x: 14, ep1: { x: 3, value: 0.1 } });
    });
  });
  describe('updateRangeData', () => {
    it('no payload', () => {
      const tmpState = {};
      const action = { type: 'DATA_IMPORT_VIEWDATA', payload: {} };
      const newState = updateRangeData(tmpState, action);
      newState.should.equal(tmpState);
    });
    it('state empty', () => {
      const action = { type: 'DATA_IMPORT_VIEWDATA',
      payload: {
        10: { ep1: { x: 1, value: 0.1 } },
        11: { ep1: { x: 2, value: 0.1 } },
      } };
      // newState[masterTime][epName] =
      //   { x: value.payload[ep.fieldX], value: value.payload[ep.fieldY] };
      const newState = updateRangeData({}, action);
      newState.index.should.deep.equal([10, 11]);
      newState.columns[0].should.deep.equal({ x: 10, ep1: { x: 1, value: 0.1 } });
      newState.columns[1].should.deep.equal({ x: 11, ep1: { x: 2, value: 0.1 } });
    });
    it('state not empty', () => {
      const oldState = { index: [1, 101, 104],
      columns: [
        { x: 1, ep1: { x: 1, value: 0.1 } },
        { x: 101, ep1: { x: 2, value: 0.1 } },
        { x: 104, ep1: { x: 3, value: 0.1 } },
        ],
      };

      const action = { type: 'DATA_IMPORT_VIEWDATA',
      payload: {
        10: { ep1: { x: 1, value: 0.1 } },
        11: { ep1: { x: 2, value: 0.1 } },
      } };
      // newState[masterTime][epName] =
      //   { x: value.payload[ep.fieldX], value: value.payload[ep.fieldY] };
      const newState = updateRangeData(oldState, action);
      newState.index.should.deep.equal([1, 10, 11, 101, 104]);
      newState.columns[0].should.deep.equal({ x: 1, ep1: { x: 1, value: 0.1 } });
      newState.columns[1].should.deep.equal({ x: 10, ep1: { x: 1, value: 0.1 } });
      newState.columns[2].should.deep.equal({ x: 11, ep1: { x: 2, value: 0.1 } });
      newState.columns[3].should.deep.equal({ x: 101, ep1: { x: 2, value: 0.1 } });
      newState.columns[4].should.deep.equal({ x: 104, ep1: { x: 3, value: 0.1 } });
    });
  });
});
