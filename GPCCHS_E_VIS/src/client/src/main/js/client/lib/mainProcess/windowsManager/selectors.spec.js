import _ from 'lodash/fp';
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
      hsc: {
        isModified: true,
      },
      windows: {
        w1: { title: 'First window' },
        w2: { title: 'Second window' },
      },
    };
    it('returns windows titles with star', () => {
      getWindowsTitle(state).should.eql({
        w1: 'First window * - VIMA',
        w2: 'Second window * - VIMA',
      });
    });
    it('returns windows titles without star', () => {
      getWindowsTitle(_.set('hsc.isModified', false, state)).should.eql({
        w1: 'First window - VIMA',
        w2: 'Second window - VIMA',
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
