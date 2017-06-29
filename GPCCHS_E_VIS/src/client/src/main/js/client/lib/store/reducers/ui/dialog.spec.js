import { freezeArgs } from '../../../common/jest';
import { openDialog, dialogClosed } from '../../actions/ui';
import dialogReducer, { getAllDialogs } from './dialog';

const reducer = freezeArgs(dialogReducer);

describe('store:reducers:ui:dialog', () => {
  const state = {
    dummyWindow: { myDialog: { type: 'message', options: {} } },
    otherWindow: { myOtherDialog: { type: 'save', options: {} } },
  };

  describe('reducer', () => {
    describe('open dialog', () => {
      test('add a dialog box', () => {
        const nextState = reducer({}, openDialog('w1', 'myDialog', 'message', { params: true }));
        expect(nextState).toEqual({
          w1: { myDialog: { type: 'message', options: { params: true } } },
        });
      });
      test('add a dialog box without options', () => {
        const nextState = reducer({}, openDialog('w1', 'myDialog', 'message'));
        expect(nextState).toEqual({
          w1: { myDialog: { type: 'message', options: {} } },
        });
      });
      test('does nothing if dialog box already exist', () => {
        const nextState = reducer(state, openDialog('dummyWindow', 'myDialog', 'message'));
        expect(nextState).toBe(state);
      });
      test('does nothing when no windowId', () => {
        const nextState = reducer(state, openDialog(null, 'myDialog', 'message'));
        expect(nextState).toBe(state);
      });
      test('does nothing when no dialogId', () => {
        const nextState = reducer(state, openDialog('dummyWindow', null, 'message'));
        expect(nextState).toBe(state);
      });
      test('does nothing when no type', () => {
        const nextState = reducer(state, openDialog('dummyWindow', 'myDialog', null));
        expect(nextState).toBe(state);
      });
    });

    describe('close dialog', () => {
      test('remove a dialog box with falsy choice', () => {
        const nextState = reducer(state, dialogClosed('dummyWindow', 'myDialog', 0));
        expect(nextState).toEqual({
          otherWindow: { myOtherDialog: { type: 'save', options: {} } },
        });
      });
      test('remove a dialog box with no choice', () => {
        const nextState = reducer(state, dialogClosed('dummyWindow', 'myDialog'));
        expect(nextState).toEqual({
          otherWindow: { myOtherDialog: { type: 'save', options: {} } },
        });
      });
      test('does nothing if windowId does not exist', () => {
        const nextState = reducer(state, dialogClosed('unknownWindow', 'myDialog', 0));
        expect(nextState).toBe(state);
      });
      test('does nothing if dialogId does not exist', () => {
        const nextState = reducer(state, dialogClosed('dummyWindow', 'unknownDialog', 0));
        expect(nextState).toBe(state);
      });
    });
  });

  describe('selectors', () => {
    test('getAllDialogs', () => {
      expect(getAllDialogs({ ui: { dialog: state } })).toBe(state);
    });
  });
});
