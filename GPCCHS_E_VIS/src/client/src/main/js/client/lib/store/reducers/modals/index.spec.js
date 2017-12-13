// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 12/04/2017 : New GenericModal component displayed or not displayed at root (Window.js) AddTimeline and EditTimeline forms displayed through it.
// VERSION : 1.1.2 : DM : #5828 : 13/04/2017 : EntryPoint addition now uses GenericModal. General refacto of default EntryPoints props, set in viewManager's setDefaultEntryPoint for text, plot and Dynamic.
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js in jest/index.js
// END-HISTORY
// ====================================================================

/* eslint no-unused-expressions: 0 */
import { freezeArgs } from 'common/jest';
import * as actions from 'store/actions/modals';
import modalsReducer from '.';

const reducer = freezeArgs(modalsReducer);

describe('store:modals:reducer', () => {
  test('initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  describe('opens modal', () => {
    test('should open', () => {
      expect(
        reducer(undefined, actions.open('myId', { type: 'openTimeline', timebarUuid: 'aaa-bbb' }))
      ).toEqual({ myId: { type: 'openTimeline', timebarUuid: 'aaa-bbb', opened: true } });
    });
  });

  describe('closes modal', () => {
    test('should close', () => {
      expect(reducer(
        {
          myId: { type: 'openTimeline', timebarUuid: 'aaa-bbb', opened: true },
        },
        actions.close('myId')
      )).toEqual({ myId: { type: 'openTimeline', timebarUuid: 'aaa-bbb', opened: false } });
    });
  });
});
