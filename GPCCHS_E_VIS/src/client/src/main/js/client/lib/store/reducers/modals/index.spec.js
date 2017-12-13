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
