import { isView, getOpenExtensionsFilters, getSaveExtensionsFilters } from './utils';
import views from '../../../viewManager';

describe('store:middlewares:documents:utils', () => {
  describe('isView', () => {
    test('returns true if doctype is a valid name', () => {
      expect(isView('PlotView')).toBe(true);
      expect(isView('TextView')).toBe(true);
      expect(isView('UnknownView')).toBe(true);
    });
    test('returns false if doctype is not a valid name', () => {
      expect(isView()).toBe(false);
      expect(isView('W00T')).toBe(false);
    });
  });

  describe('getOpenExtensionsFilters', () => {
    test('returns a workspace open filter', () => {
      expect(getOpenExtensionsFilters('WorkSpace')).toEqual([
        { name: 'WorkSpace', extensions: ['viws'] },
      ]);
    });
    test('returns a page open filter', () => {
      expect(getOpenExtensionsFilters('Page')).toEqual([
        { name: 'Page', extensions: ['vipg'] },
      ]);
    });
    test('returns a view open filter', () => {
      expect(getOpenExtensionsFilters()).toMatchSnapshot();
    });
  });

  describe('getSaveExtensionsFilters', () => {
    test('returns a workspace save filter', () => {
      expect(getSaveExtensionsFilters('WorkSpace')).toEqual([
        { name: 'WorkSpace', extensions: ['viws'] },
      ]);
    });
    test('returns a page save filter', () => {
      expect(getSaveExtensionsFilters('Page')).toEqual([
        { name: 'Page', extensions: ['vipg'] },
      ]);
    });
    test('returns a view save filter', () => {
      const allViewsFilters = Object.keys(views).map(getSaveExtensionsFilters);
      expect(allViewsFilters).toMatchSnapshot();
    });
  });
});
