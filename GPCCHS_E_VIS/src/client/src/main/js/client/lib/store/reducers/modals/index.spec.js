/* eslint no-unused-expressions: 0 */
import { freezeArgs, getStore } from '../../../common/test';
import * as actions from '../../actions/modals';
import modalsReducer from '.';

const reducer = freezeArgs(modalsReducer);

describe('store:modals:reducer', () => {
  it('initial state', () => {
    reducer(undefined, {}).should.eql({});
  });

  describe('opens modal', () => {
    it('should open', () => {
      reducer(undefined, actions.open('myId', { type: 'openTimeline', timebarUuid: 'aaa-bbb' }))
        .should.eql({ myId: { type: 'openTimeline', timebarUuid: 'aaa-bbb', opened: true } });
    });
  });

  describe('closes modal', () => {
    it('should close', () => {
      reducer(
        {
          myId: { type: 'openTimeline', timebarUuid: 'aaa-bbb', opened: true }
        },
        actions.close('myId')
      ).should.eql({ myId: { type: 'openTimeline', timebarUuid: 'aaa-bbb', opened: false } });
    });
  });
});
