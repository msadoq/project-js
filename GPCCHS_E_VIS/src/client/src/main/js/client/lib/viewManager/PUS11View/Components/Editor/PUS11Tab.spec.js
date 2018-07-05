import PUS11Tab from 'viewManager/PUS11View/Components/Editor/PUS11Tab';
import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';

const propsStub = {
  panels: {},
  updateViewPanels: () => {},
  viewId: '1838f507-156b-4734-bf6d-69d0e96b39b8',
};

describe('PUS11Tab :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(PUS11Tab, propsStub, stateTest);
  });
});

