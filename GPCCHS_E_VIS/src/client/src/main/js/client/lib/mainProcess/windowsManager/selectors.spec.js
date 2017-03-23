import { freezeMe, testMemoization } from '../../common/test';
import { getEditorWindowTitle, getWindowsTitle } from './selectors';

describe('windowsManager:selectors', () => {
  describe('coreEditor', () => {
    const state = freezeMe({
      editor: { title: 'EDITOR_TITLE' },
      views: { v1: { title: 'VIEW', configuration: true } },
    });
    it('should returns editor window title', () => {
      getEditorWindowTitle(state, { viewId: 'v1' }).should.be.eql('EDITOR_TITLE - VIEW');
    });
    it('should returns empty title on unknown view', () => {
      getEditorWindowTitle(state, { viewId: 'unknown_view' }).should.be.eql('');
    });
  });
  describe('getWindowsTitle', () => {
    const state = {
      windows: {
        notModified: { title: 'Not modified', isModified: false },
        modified: { title: 'Modified', isModified: true },
        noField: { title: 'No field' },
      },
    };
    it('should returns windows titles', () => {
      getWindowsTitle(state).should.eql({
        notModified: 'Not modified - VIMA',
        modified: 'Modified * - VIMA',
        noField: 'No field - VIMA',
      });
    });
    it('should memoize', () => {
      testMemoization(getWindowsTitle, state);
    });
    it('should support empty windows list', () => {
      getWindowsTitle({ windows: {} }).should.eql({});
    });
  });
});
