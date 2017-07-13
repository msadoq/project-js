import { freezeMe } from '../../../common/jest';

import {
  getPageIdsByWindowIds,
  getViewIdsByWindowIds,
} from './selectors';

describe('store:middlewares:documents:selectors', () => {
  describe('getPageIdsByWindowIds', () => {
    test('return an empty array', () => {
      const state = freezeMe({
        windows: {
          w1: { pages: [] },
          w2: { pages: [] },
        },
      });
      expect(getPageIdsByWindowIds(state, { windowIds: ['w1', 'w1'] })).toEqual([]);
    });
    test('return an array with w1 page ids', () => {
      const state = freezeMe({
        windows: {
          w1: { pages: ['p1', 'p2'] },
          w2: { pages: ['p3', 'p4'] },
        },
      });
      expect(getPageIdsByWindowIds(state, { windowIds: ['w1'] })).toEqual(['p1', 'p2']);
    });
    test('return an array with w1 page ids', () => {
      const state = freezeMe({
        windows: {
          w1: { pages: ['p1', 'p2'] },
          w2: { pages: ['p3', 'p4'] },
        },
      });
      expect(getPageIdsByWindowIds(state, { windowIds: ['w1', 'w2'] })).toEqual(['p1', 'p2', 'p3', 'p4']);
    });
  });
  describe('getViewIdsByWindowIds', () => {
    test('return an empty array', () => {
      const state = freezeMe({
        windows: {
          w1: { pages: ['p1', 'p2'] },
          w2: { pages: ['p3', 'p4'] },
        },
        pages: {
          p1: { views: [] },
          p2: { views: [] },
          p3: { views: [] },
          p4: { views: [] },
        },
      });
      expect(getViewIdsByWindowIds(state, { windowIds: ['w1', 'w2'] })).toEqual([]);
    });
    test('return an array with w1 view ids', () => {
      const state = freezeMe({
        windows: {
          w1: { pages: ['p1', 'p2'] },
          w2: { pages: ['p3', 'p4'] },
        },
        pages: {
          p1: { views: ['v1', 'v2'] },
          p2: { views: ['v3', 'v4'] },
          p3: { views: ['v5', 'v6'] },
          p4: { views: ['v7', 'v8'] },
        },
      });
      expect(getViewIdsByWindowIds(state, { windowIds: ['w1'] }))
        .toEqual(['v1', 'v2', 'v3', 'v4']);
    });
    test('return an array of view ids', () => {
      const state = freezeMe({
        windows: {
          w1: { pages: ['p1', 'p2'] },
          w2: { pages: ['p3', 'p4'] },
        },
        pages: {
          p1: { views: ['v1', 'v2'] },
          p2: { views: ['v3', 'v4'] },
          p3: { views: ['v5', 'v6'] },
          p4: { views: ['v7', 'v8'] },
        },
      });
      expect(getViewIdsByWindowIds(state, { windowIds: ['w1', 'w2'] }))
        .toEqual(['v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7', 'v8']);
    });
  });
});
