import u from 'updeep';
import map, { getPerRangeTbdIdMap, getPerLastTbdIdMap, getPerViewMap } from './map';
import state from '../common/jest/stateTest';

global.testConfig.DEFAULT_FIELD = JSON.stringify({ ReportingParameter: 'extractedValue' });
global.testConfig.FORECAST = 5000;

describe('data:map', () => {
  test('memoization map', () => {
    map.resetRecomputations();
    getPerRangeTbdIdMap.resetRecomputations();
    getPerLastTbdIdMap.resetRecomputations();
    getPerViewMap.resetRecomputations();
    expect(map.recomputations()).toEqual(0);
    map(state);
    expect(map.recomputations()).toEqual(1);
    map(state);
    expect(map.recomputations()).toEqual(1);
    const newState = u({ timebars: { tb1: { visuWindow: { lower: 1420106790838 } } } }, state);
    map(newState);
    // Only intervals have to be recomputed
    expect(map.recomputations()).toEqual(2);
    expect(getPerRangeTbdIdMap.recomputations()).toEqual(1);
    expect(getPerLastTbdIdMap.recomputations()).toEqual(1);
    expect(getPerViewMap.recomputations()).toEqual(1);
  });
  test('should compute dataMap', () => {
    const r = map(state);
    expect(r).toMatchSnapshot();
  });
});
