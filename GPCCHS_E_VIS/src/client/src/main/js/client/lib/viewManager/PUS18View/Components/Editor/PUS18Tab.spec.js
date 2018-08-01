import PUS18Tab from 'viewManager/PUS18View/Components/Editor/PUS18Tab';
import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';

const propsStub = {
  panels: {},
  updateViewPanels: () => {},
  viewId: '1838f507-156b-4734-bf6d-69d0e96b39b8',
};

describe('PUS18Tab :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(PUS18Tab, propsStub, stateTest);
  });
});

