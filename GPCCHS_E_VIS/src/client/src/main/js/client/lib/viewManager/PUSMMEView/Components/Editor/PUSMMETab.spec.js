import PUSMMETab from 'viewManager/PUSMMEView/Components/Editor/PUSMMETab';
import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';

const propsStub = {
  panels: {},
  updateViewPanels: () => {},
  viewId: '1838f507-156b-4734-bf6d-69d0e96b39b8',
};

describe('PUSMMETab :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(PUSMMETab, propsStub, stateTest);
  });
});

