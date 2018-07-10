// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 24/02/2017 : Refactoring of dataMap generation using reselect
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Fix few broken unit tests
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : converts long to string to ensure precision
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : Replace sessionId by sessionName in timeline
//  definition
// VERSION : 1.1.2 : DM : #5828 : 04/04/2017 : plot view entry point update
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : Use new configuration selector in dataManager
// VERSION : 1.1.2 : DM : #5828 : 12/04/2017 : DataMap simplification : removing structureType
// VERSION : 1.1.2 : DM : #5828 : 14/04/2017 : Move filter application in main process
// VERSION : 1.1.2 : DM : #5828 : 19/04/2017 : remove unused masterSessionId from perViewData
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : remove domain and session on window apply domain and
//  session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : remove domain and session on window apply domain and
//  session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of
//  tests
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Cleanup client/ file organization and test helper
//  modules
// VERSION : 1.1.2 : DM : #6700 : 21/07/2017 : Separate perTdbId by structure type in dataMap
// VERSION : 1.1.2 : DM : #6700 : 04/08/2017 : Update unit tests and add view reducers to action
//  viewData_clean
// VERSION : 1.1.2 : DM : #6700 : 04/08/2017 : update unit tests . .
// VERSION : 2.0.0.2 : FA : #11628 : 18/04/2018 : core implementation of dealing with sessions
// VERSION : 2.0.0.2 : FA : #11628 : 18/04/2018 : fix tests + clean code
// VERSION : 2.0.0.3 : FA : ISIS-FT-3086 : 15/05/2018 : editor's form bug on reintialize
// VERSION : 2.0.0.3 : FA : ISIS-FT-3086 : 30/05/2018 : editor's form bug on reintialize
// END-HISTORY
// ====================================================================

import _cloneDeep from 'lodash/cloneDeep';
import { get } from 'common/configurationManager';
import makeGetPerViewData from './perViewData';
import state from '../common/jest/stateTest';

const WILDCARD = get('WILDCARD_CHARACTER');

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

  test('should keep all entrypoints when wildcard at every level', () => {
    const localState = _cloneDeep(state);
    const { entryPoints } = localState.PlotViewConfiguration.plot1;
    entryPoints.forEach((e) => {
      e.connectedData.timeline = WILDCARD;
    });
    localState.views.plot1.sessionName = WILDCARD;
    localState.pages.page1.sessionName = WILDCARD;
    localState.hsc.sessionName = WILDCARD;

    const map = makeGetPerViewData()(localState, { viewId: 'plot1', timebarUuid: 'tb1', pageId: 'page1' });
    expect(Object.keys(map.entryPoints).length).toEqual(entryPoints.length);
  });

  test('should keep only entrypoints whose session is consistent with master session, every intermediate level\'s session being wildcard', () => {
    const localState = _cloneDeep(state);
    localState.timelines.truc = { // add a fake timeline not associated to 'Master' session
      color: null,
      id: 'truc',
      kind: 'Session',
      offset: 0,
      sessionName: 'Session #42',
      uuid: 'tl1',
    };
    const { entryPoints } = localState.PlotViewConfiguration.plot1;
    entryPoints.forEach((e) => {
      e.connectedData.timeline = 'truc';
    }); // a session which does not match
    entryPoints[0].connectedData.timeline = 'Session 1'; // timeline associated to 'Master' session
    entryPoints[1].connectedData.timeline = WILDCARD;
    localState.views.plot1.sessionName = WILDCARD;
    localState.pages.page1.sessionName = WILDCARD;
    localState.hsc.sessionName = WILDCARD;

    const map = makeGetPerViewData()(localState, { viewId: 'plot1', timebarUuid: 'tb1', pageId: 'page1' });
    expect(Object.keys(map.entryPoints).length).toEqual(2);
  });
  test('should take no entryPoints when plot session is different from masterSession', () => {
    const localState = _cloneDeep(state);
    const { entryPoints } = localState.PlotViewConfiguration.plot1;
    entryPoints.forEach((e) => {
      e.connectedData.timeline = WILDCARD;
    });
    localState.views.plot1.sessionName = 'Master';
    localState.pages.page1.sessionName = WILDCARD;
    localState.hsc.sessionName = WILDCARD;
    localState.timebars.tb1.masterId = 'Session du bois';

    const map = makeGetPerViewData()(localState, { viewId: 'plot1', timebarUuid: 'tb1', pageId: 'page1' });
    expect(Object.keys(map.entryPoints).length).toEqual(0);
  });
  test('should take all entryPoints when plot session is equal to masterSession', () => {
    const localState = _cloneDeep(state);
    const { entryPoints } = localState.PlotViewConfiguration.plot1;
    entryPoints.forEach((e) => {
      e.connectedData.timeline = WILDCARD;
    });
    localState.views.plot1.sessionName = 'Master';
    localState.pages.page1.sessionName = WILDCARD;
    localState.hsc.sessionName = WILDCARD;
    localState.timebars.tb1.masterId = 'Session 1';

    const map = makeGetPerViewData()(localState, { viewId: 'plot1', timebarUuid: 'tb1', pageId: 'page1' });
    expect(Object.keys(map.entryPoints).length).toEqual(3);
  });
  test('should take no entryPoints when page session is different from masterSession', () => {
    const localState = _cloneDeep(state);
    const { entryPoints } = localState.PlotViewConfiguration.plot1;
    entryPoints.forEach((e) => {
      e.connectedData.timeline = WILDCARD;
    });
    localState.views.plot1.sessionName = WILDCARD;
    localState.pages.page1.sessionName = 'truc';
    localState.hsc.sessionName = WILDCARD;

    const map = makeGetPerViewData()(localState, { viewId: 'plot1', timebarUuid: 'tb1', pageId: 'page1' });
    expect(Object.keys(map.entryPoints).length).toEqual(0);
  });
  test('should take no entryPoints when hsc session is different from masterSession', () => {
    const localState = _cloneDeep(state);
    const { entryPoints } = localState.PlotViewConfiguration.plot1;
    entryPoints.forEach((e) => {
      e.connectedData.timeline = WILDCARD;
    });
    localState.views.plot1.sessionName = WILDCARD;
    localState.pages.page1.sessionName = WILDCARD;
    localState.hsc.sessionName = 'truc';

    const map = makeGetPerViewData()(localState, { viewId: 'plot1', timebarUuid: 'tb1', pageId: 'page1' });
    expect(Object.keys(map.entryPoints).length).toEqual(0);
  });
  test('should consider no hsc.sessionName as a wildcard', () => {
    const localState = _cloneDeep(state);
    const { entryPoints } = localState.PlotViewConfiguration.plot1;
    entryPoints.forEach((e) => {
      e.connectedData.timeline = WILDCARD;
    });
    localState.views.plot1.sessionName = WILDCARD;
    localState.pages.page1.sessionName = WILDCARD;
    delete localState.hsc.sessionName;

    const map = makeGetPerViewData()(localState, { viewId: 'plot1', timebarUuid: 'tb1', pageId: 'page1' });
    expect(Object.keys(map.entryPoints).length).toEqual(3);
  });
});
