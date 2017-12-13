// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #6670 : 13/06/2017 : Fix Timebar jest snapshots .
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : DM : #6700 : 29/06/2017 : Fix TimeSetter test snapshot .
// END-HISTORY
// ====================================================================

import React from 'react';
import renderer from 'react-test-renderer';
import TimebarFixture from '../../../../test/__mocks__/Timebar';
import TimeSetter from '../TimeSetter/TimeSetter';

const propsStub = {
  visuWindow: TimebarFixture.visuWindow,
  slideWindow: TimebarFixture.slideWindow,
  timebarUuid: TimebarFixture.timebarUuid,
  timebarMode: TimebarFixture.mode,
  isPlaying: TimebarFixture.isPlaying,
  timebarRulerResolution: TimebarFixture.rulerResolution,
  cancelRemoveMessage: () => null,
  updateCursors: () => null,
  updateDefaultWidth: () => null,
  pause: () => null,
  jump: () => null,
  updateViewport: () => null,
  removeMessage: () => null,
  messages: [],
  cursor: 'lower',
};

test('Timesetter renders correctly', () => {
  const tree = renderer.create(
    <TimeSetter
      {...propsStub}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
