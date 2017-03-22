import { freezeMe } from '../../common/test';
import { getEditorWindowTitle } from './selectors';

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
});
