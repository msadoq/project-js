// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #6670 : 13/06/2017 : Fix Timebar jest snapshots .
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Fix Timebar broken tests .
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

import React from 'react';
import renderer from 'react-test-renderer';
import TimebarFixture from '../../../../test/__mocks__/Timebar';
import ControlsLeft from '../Controls/ControlsLeft';

const propsStub = {
  enableRealTime: true,
  updateSpeed: () => null,
  toggleTimesetter: () => null,
  pause: () => null,
  play: () => null,
  restoreWidth: () => null,
  goNow: () => null,
  jump: () => null,
  openModal: () => null,
  isPlaying: true,
  currentSessionExists: false,
  masterSessionId: 0,
  timebarSpeed: TimebarFixture.speed,
  timebarMode: TimebarFixture.mode,
  timebarUuid: TimebarFixture.timebarUuid,
  messages: [],
};

test('Controls renders correctly', () => {
  const tree = renderer.create(
    <ControlsLeft {...propsStub} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
