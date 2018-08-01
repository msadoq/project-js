import PUS144Tab from 'viewManager/PUS144View/Components/Editor/PUS144Tab';
import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';

const propsStub = {
  panels: {},
  updateViewPanels: () => {},
  viewId: '1838f507-156b-4734-bf6d-69d0e96b39b8',
};

describe('PUS144Tab :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(PUS144Tab, propsStub, stateTest);
  });
});

