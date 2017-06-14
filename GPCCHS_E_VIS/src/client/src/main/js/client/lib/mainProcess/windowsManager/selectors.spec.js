import _ from 'lodash/fp';
import { freezeMe, testMemoization } from '../../common/test';
import { getEditorWindowTitle, getWindowsTitle } from './selectors';

describe('windowsManager:selectors', () => {
  describe('coreEditor', () => {
    const state = freezeMe({
      editor: { title: 'EDITOR_TITLE' },
      views: { v1: { title: 'VIEW', configuration: true } },
    });
    test('should returns editor window title', () => {
      expect(getEditorWindowTitle(state, { viewId: 'v1' })).toEqual('EDITOR_TITLE - VIEW');
    });
    test('should returns empty title on unknown view', () => {
      expect(getEditorWindowTitle(state, { viewId: 'unknown_view' })).toEqual('');
    });
  });
  describe('getWindowsTitle', () => {
    const state = {
      hsc: {
        isModified: true,
      },
      windows: {
        w1: { title: 'First window' },
        w2: { title: 'Second window' },
      },
    };
    test('returns windows titles with star', () => {
      expect(getWindowsTitle(state)).toEqual({
        w1: 'First window * - VIMA',
        w2: 'Second window * - VIMA',
      });
    });
    test('returns windows titles without star', () => {
      expect(getWindowsTitle(_.set('hsc.isModified', false, state))).toEqual({
        w1: 'First window - VIMA',
        w2: 'Second window - VIMA',
      });
    });
    test('should memoize', () => {
      testMemoization(getWindowsTitle, state);
    });
    test('should support empty windows list', () => {
      expect(getWindowsTitle({ windows: {} })).toEqual({});
    });
  });
});
