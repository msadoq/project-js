
// import _cloneDeep from 'lodash/cloneDeep';
import makeGetPerViewData from './perViewData';
import state from '../common/jest/stateTest';

describe('dataManager/perViewData', () => {
  test('text view', () => {
    const map = makeGetPerViewData()(state, { viewId: 'text1', timebarUuid: 'tb1', pageId: 'page1' });
    expect(map).toMatchSnapshot();
  });
  test('plot view', () => {
    const map = makeGetPerViewData()(state, { viewId: 'plot1', timebarUuid: 'tb1' });
    expect(map).toMatchSnapshot();
  });
  test('dynamic view', () => {
    const map = makeGetPerViewData()(state, { viewId: 'dynamic1', timebarUuid: 'tb1' });
    expect(map).toMatchSnapshot();
  });
  test('memoization', () => {
    const map = makeGetPerViewData();
    map(state, { viewId: 'text1', timebarUuid: 'tb1' });
    expect(map.recomputations()).toEqual(1);
    map(state, { viewId: 'text1', timebarUuid: 'tb1' });
    expect(map.recomputations()).toEqual(1);
    map(state, { viewId: 'plot1', timebarUuid: 'tb1' });
    expect(map.recomputations()).toEqual(2);
  });
});
