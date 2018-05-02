// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7435 : 14/09/2017 : Add getDefaultFolder in documents utils
// VERSION : 1.1.2 : FA : #7435 : 14/09/2017 : Rename documents/doctypes in documents/utils .
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import parameters from 'common/configurationManager';
import views from 'viewManager';
import { getDefaultFolder, isView, getOpenExtensionsFilters, getSaveExtensionsFilters } from './utils';

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

  describe('getDefaultFolder', () => {
    test('returns workspace folder', () => {
      expect(getDefaultFolder({ hsc: { folder: '/a/path' } })).toBe('/a/path');
    });
    test('returns ISIS_DOCUMENTS_ROOT as fallback', () => {
      expect(getDefaultFolder()).toBe(parameters.get('ISIS_DOCUMENTS_ROOT'));
    });
  });
});
