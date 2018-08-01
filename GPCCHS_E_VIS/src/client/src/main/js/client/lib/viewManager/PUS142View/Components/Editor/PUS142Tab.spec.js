import PUS142Tab from 'viewManager/PUS142View/Components/Editor/PUS142Tab';
import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';

const propsStub = {
  panels: {},
  updateViewPanels: () => {},
  viewId: '1838f507-156b-4734-bf6d-69d0e96b39b8',
};

describe('PUS142Tab :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(PUS142Tab, propsStub, stateTest);
  });
});

