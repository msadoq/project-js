// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Implement ui/dialog reducer . .
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Add getDialog selector in store/reducers/ui/dialog
// VERSION : 1.1.2 : FA : #7145 : 26/07/2017 : Change openModal action, it now have a default dialogId
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

import { freezeArgs } from 'common/jest';
import { openDialog, dialogClosed } from 'store/actions/ui';
import dialogReducer, { getAllDialogs, getDialog } from './dialog';

const reducer = freezeArgs(dialogReducer);

describe('store:reducers:ui:dialog', () => {
  const dialogState = {
    dummyWindow: { myDialog: { type: 'message', options: {} } },
    otherWindow: { myOtherDialog: { type: 'save', options: {} } },
  };

  describe('reducer', () => {
    describe('open dialog', () => {
      test('add a dialog box', () => {
        const nextState = reducer({}, openDialog('w1', 'message', { params: true }));
        expect(nextState).toEqual({
          w1: { default: { type: 'message', options: { params: true } } },
        });
      });
      test('add a dialog box without options', () => {
        const nextState = reducer({}, openDialog('w1', 'message'));
        expect(nextState).toEqual({
          w1: { default: { type: 'message', options: {} } },
        });
      });
      test('does nothing if dialog box already exist', () => {
        const nextState = reducer(dialogState, openDialog('dummyWindow', 'message', {}, 'myDialog'));
        expect(nextState).toBe(dialogState);
      });
      test('does nothing when no windowId', () => {
        const nextState = reducer(dialogState, openDialog(null, 'message'));
        expect(nextState).toBe(dialogState);
      });
      test('does nothing when no type', () => {
        const nextState = reducer(dialogState, openDialog('dummyWindow', null));
        expect(nextState).toBe(dialogState);
      });
    });

    describe('close dialog', () => {
      test('remove a dialog box with falsy choice', () => {
        const nextState = reducer(dialogState, dialogClosed('dummyWindow', 0, {}, 'myDialog'));
        expect(nextState).toEqual({
          otherWindow: { myOtherDialog: { type: 'save', options: {} } },
        });
      });
      test('remove a dialog box with no choice', () => {
        const nextState = reducer(dialogState, dialogClosed('dummyWindow', undefined, {}, 'myDialog'));
        expect(nextState).toEqual({
          otherWindow: { myOtherDialog: { type: 'save', options: {} } },
        });
      });
      test('does nothing if windowId does not exist', () => {
        const nextState = reducer(dialogState, dialogClosed('unknownWindow', 0));
        expect(nextState).toBe(dialogState);
      });
      test('does nothing if dialogId does not exist', () => {
        const nextState = reducer(dialogState, dialogClosed('dummyWindow', 0, {}, 'unknownDialogId'));
        expect(nextState).toBe(dialogState);
      });
    });
  });

  describe('selectors', () => {
    test('getAllDialogs', () => {
      expect(getAllDialogs({ ui: { dialog: dialogState } })).toBe(dialogState);
    });
    test('getDialog', () => {
      const state = { ui: { dialog: dialogState } };
      const dialog = getDialog(state, { windowId: 'dummyWindow', dialogId: 'myDialog' });
      expect(dialog).toBe(dialogState.dummyWindow.myDialog);
    });
  });
});
