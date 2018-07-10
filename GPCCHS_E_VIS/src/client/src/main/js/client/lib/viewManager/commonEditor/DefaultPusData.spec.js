import DefaultPusData from 'viewManager/commonEditor/DefaultPusData';
import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';
import { VM_VIEW_PUS11 } from 'viewManager/constants';

const propsStub = {
  viewId: 'text1',
  pageId: 'page1',
  change: () => {},
  selectedDomainName: 'fr.cnes.isis.simupus',
  selectedTimelineId: 'tl1',
  pusType: VM_VIEW_PUS11,
};

describe('DefaultPusData :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(DefaultPusData, propsStub, stateTest);
  });
});
