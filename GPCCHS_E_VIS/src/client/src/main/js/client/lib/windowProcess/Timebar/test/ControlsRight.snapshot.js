import React from 'react';
import renderer from 'react-test-renderer';
import TimebarFixture from '../../../../test/__mocks__/Timebar';
import ControlsRight from '../ControlsRight';

const propsStub = {
  play: () => null,
  switchToFixedMode: () => null,
  switchToExtensibleMode: () => null,
  switchToRealtimeMode: () => null,
  switchToNormalMode: () => null,
  currentSessionExists: true,
  masterTimelineExists: true,
  masterSessionId: 0,
  timebarRealTime: TimebarFixture.realTime,
  timebarMode: TimebarFixture.mode,
  timebarUuid: TimebarFixture.timebarUuid,
};

test('Controls renders correctly', () => {
  const tree = renderer.create(
    <ControlsRight {...propsStub} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
