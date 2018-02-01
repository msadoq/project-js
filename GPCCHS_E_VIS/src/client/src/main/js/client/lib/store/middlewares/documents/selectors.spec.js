// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Closing window now display a save wizard (documents middleware)
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Add 2 selectors in documents middlewares selectors
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import { freezeMe } from 'common/jest';

import {
  getModifiedPageIdsByWindowIds,
  getModifiedViewIdsByWindowIds,
} from './selectors';

describe('store:middlewares:documents:selectors', () => {
  const stateWithSavedPagesAnsViews = freezeMe({
    windows: {
      w1: { uuid: 'w1', pages: ['p1', 'p2'] },
      w2: { uuid: 'w2', pages: ['p3', 'p4'] },
    },
    pages: {
      p1: { uuid: 'p1', views: ['v1', 'v2'] },
      p2: { uuid: 'p2', views: ['v3', 'v4'] },
      p3: { uuid: 'p3', views: ['v5', 'v6'] },
      p4: { uuid: 'p4', views: ['v7', 'v8'] },
    },
    views: {
      v1: { uuid: 'v1' },
      v2: { uuid: 'v2' },
      v3: { uuid: 'v3' },
      v4: { uuid: 'v4' },
      v5: { uuid: 'v5' },
      v6: { uuid: 'v6' },
      v7: { uuid: 'v7' },
      v8: { uuid: 'v8' },
    },
  });
  const stateWithUnsavedPagesAnsViews = _.pipe(
    _.set('pages.p1.isModified', 'true'),
    _.set('pages.p2.isModified', 'true'),
    _.set('pages.p3.isModified', 'true'),
    _.set('views.v1.isModified', 'true'),
    _.set('views.v2.isModified', 'true'),
    _.set('views.v7.isModified', 'true'),
    _.set('views.v8.isModified', 'true')
  )(stateWithSavedPagesAnsViews);

  describe('getModifiedPageIdsByWindowIds', () => {
    test('return an empty array', () => {
      const state = stateWithSavedPagesAnsViews;
      expect(getModifiedPageIdsByWindowIds(state, { windowIds: ['w1', 'w1'] })).toEqual([]);
    });
    test('return an array with w1 modified page ids', () => {
      const state = stateWithUnsavedPagesAnsViews;
      expect(getModifiedPageIdsByWindowIds(state, { windowIds: ['w2'] })).toEqual(['p3']);
    });
    test('return an array with all modified page ids', () => {
      const state = stateWithUnsavedPagesAnsViews;
      expect(getModifiedPageIdsByWindowIds(state, { windowIds: ['w1', 'w2'] })).toEqual(['p1', 'p2', 'p3']);
    });
  });
  describe('getModifiedViewIdsByWindowIds', () => {
    test('return an empty array', () => {
      const state = stateWithSavedPagesAnsViews;
      expect(getModifiedViewIdsByWindowIds(state, { windowIds: ['w1', 'w2'] })).toEqual([]);
    });
    test('return an array with w1 modified view ids', () => {
      const state = stateWithUnsavedPagesAnsViews;
      expect(getModifiedViewIdsByWindowIds(state, { windowIds: ['w1'] }))
        .toEqual(['v1', 'v2']);
    });
    test('return an array with all modified view ids', () => {
      const state = stateWithUnsavedPagesAnsViews;
      expect(getModifiedViewIdsByWindowIds(state, { windowIds: ['w1', 'w2'] }))
        .toEqual(['v1', 'v2', 'v7', 'v8']);
    });
  });
});
