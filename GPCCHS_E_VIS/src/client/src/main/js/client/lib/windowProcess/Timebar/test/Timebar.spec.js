// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #6670 : 13/06/2017 : Fix Timebar jest snapshots .
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// END-HISTORY
// ====================================================================

import React from 'react';
import renderer from 'react-test-renderer';
import TimelinesFixture from '../../../../test/__mocks__/Timelines';
import TimebarFixture from '../../../../test/__mocks__/Timebar';
import Timebar from '../Timebar/Timebar';

const propsStub = {
  retrieveFormattedFullDateEl: () => null,
  toggleTimesetter: () => null,
  onVerticalScroll: () => null,
  updateCursors: () => null,
  updateViewport: () => null,
  pause: () => null,
  play: () => null,
  jump: () => null,
  setRealTime: () => null,
  openModal: () => null,
  isPlaying: true,
  visuWindow: TimebarFixture.visuWindow,
  slideWindow: TimebarFixture.slideWindow,
  viewport: {
    lower: 1480417084354,
    upper: 1480417204665,
  },
  timelines: TimelinesFixture,
  timebarSpeed: TimebarFixture.speed,
  timebarRealTime: TimebarFixture.realTime,
  timebarMode: TimebarFixture.mode,
  timebarUuid: TimebarFixture.timebarUuid,
  verticalScroll: 0,
  widthPx: 900,
};

test('Timebar renders correctly', () => {
  const tree = renderer.create(
    <Timebar {...propsStub} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
