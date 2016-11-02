import selectLastValue, { lastValue } from './lastValue';


describe('data/map/lastValue', () => {
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
  describe('lastValue', () => {
    it('state undefined', () => {
      const newState = lastValue(payload.rId1, viewDataMap.text1.entryPoints.ep4, 'ep4', undefined);
      newState.timestamp.should.equal(20);
      newState.value.should.equal(203);
    });
    it('state with value > current', () => {
      const oldState = { index: {}, values: {} };
      oldState.index.ep4 = 22;
      oldState.values.ep4 = 22;
      const newState = lastValue(payload.rId1, viewDataMap.text1.entryPoints.ep4, 'ep4', oldState);
      newState.timestamp.should.equal(20);
      newState.value.should.equal(203);
    });
    it('state with value < current', () => {
      const oldState = { index: {}, values: {} };
      oldState.index.ep4 = 18.5;
      oldState.values.ep4 = 22;
      const newState = lastValue(payload.rId1, viewDataMap.text1.entryPoints.ep4, 'ep4', oldState);
      newState.timestamp.should.equal(20);
      newState.value.should.equal(203);
    });
    it('state with value = current', () => {
      const oldState = { index: {}, values: {} };
      oldState.index.ep4 = 20;
      oldState.values.ep4 = 22;
      const newState = lastValue(payload.rId1, viewDataMap.text1.entryPoints.ep4, 'ep4', oldState);
      newState.timestamp.should.equal(20);
      newState.value.should.equal(203);
    });
  });
  describe('selectLastValue', () => {
    it('state empty', () => {
      const newState = selectLastValue({}, payload, 'text1', viewDataMap.text1.entryPoints);
      newState.index.ep4.should.equal(20);
      newState.values.ep4.should.equal(203);
      newState.dataLayout.should.equal('last');
    });
    it('state undefined', () => {
      const newState = selectLastValue(undefined, payload, 'text1', viewDataMap.text1.entryPoints);
      newState.index.ep4.should.equal(20);
      newState.values.ep4.should.equal(203);
      newState.dataLayout.should.equal('last');
    });
    it('multiple entry points', () => {
      const newState = selectLastValue({}, payload, 'text2', viewDataMap.text2.entryPoints);
      newState.index.ep6.should.equal(20);
      newState.values.ep6.should.equal(203);
      newState.index.ep5.should.equal(20);
      newState.values.ep5.should.equal(203);
      newState.dataLayout.should.equal('last');
    });
  });
});
