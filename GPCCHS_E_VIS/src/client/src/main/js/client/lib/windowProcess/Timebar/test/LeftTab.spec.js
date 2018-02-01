// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #6670 : 13/06/2017 : Fix Timebar jest snapshots .
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// END-HISTORY
// ====================================================================

import React from 'react';
import renderer from 'react-test-renderer';
import TimebarFixture from '../../../../test/__mocks__/Timebar';
import TimelinesFixture from '../../../../test/__mocks__/Timelines';
import SessionsFixture from '../../../../test/__mocks__/Sessions';
import LeftTab from '../LeftTab/LeftTab';

const propsStub = {
  addAndMountTimeline: () => null,
  unmountTimeline: () => null,
  onTimelinesVerticalScroll: () => null,
  updateId: () => null,
  updateMasterId: () => null,
  updateOffset: () => null,
  createNewTimeline: () => null,
  removeTimeline: () => null,
  mountPageTimebar: () => null,
  unmountPageTimebar: () => null,
  updateSessionName: () => null,
  updateColor: () => null,
  collapseTimebar: () => null,
  timelines: TimelinesFixture,
  sessions: SessionsFixture,
  timebarUuid: TimebarFixture.timebarUuid,
  timebarName: TimebarFixture.id,
  pageId: 'rezter-456789',
  masterId: TimebarFixture.masterId,
  verticalScroll: 0,
  openModal: () => {},
};

test('Lefttab renders correctly', () => {
  const tree = renderer.create(
    <LeftTab
      {...propsStub}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
