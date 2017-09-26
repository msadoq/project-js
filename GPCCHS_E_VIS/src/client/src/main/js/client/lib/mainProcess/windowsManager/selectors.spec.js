// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Move getEditorWindowTitle from selectors/editor to windowsManager/selectors
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Move getWindowsTitle in windowsManager/selectors .
// VERSION : 1.1.2 : DM : #5828 : 12/04/2017 : Move isModified from state.windows to state.hsc
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js in jest/index.js
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import { freezeMe, testMemoization } from '../../common/jest';
import { getEditorWindowTitle, getWindowsTitle } from './selectors';

describe('windowsManager:selectors', () => {
  describe('coreEditor', () => {
    const state = freezeMe({
      editor: { title: 'EDITOR_TITLE' },
      views: { v1: { title: 'VIEW', configuration: true } },
    });
    test('should returns editor window title', () => {
      expect(getEditorWindowTitle(state, { viewId: 'v1' })).toEqual('Code editor - VIEW');
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
